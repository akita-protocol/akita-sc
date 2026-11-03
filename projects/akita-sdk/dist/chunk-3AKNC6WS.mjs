import {
  makeErrorTranslator
} from "./chunk-2AEP6DTX.mjs";
import {
  BaseSDK
} from "./chunk-S34CQKA6.mjs";
import {
  ENV_VAR_NAMES,
  emptySigner
} from "./chunk-W2PKBBWA.mjs";

// src/staking-pool/index.ts
import { microAlgo as microAlgo2 } from "@algorandfoundation/algokit-utils";

// src/generated/StakingPoolClient.ts
import { ABIStructType, getStructValueFromTupleValue } from "@algorandfoundation/algokit-utils/abi";
import { AppClient as _AppClient } from "@algorandfoundation/algokit-utils/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/app-factory";
var APP_SPEC = { "name": "StakingPool", "structs": { "ObjectC3416591": [{ "name": "valid", "type": "bool" }, { "name": "balance", "type": "uint64" }], "RootKey": [{ "name": "address", "type": "address" }, { "name": "name", "type": "string" }], "AddRewardParams": [{ "name": "asset", "type": "uint64" }, { "name": "distribution", "type": "uint8" }, { "name": "rate", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "winnerCount", "type": "uint64" }], "EntryData": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }, { "name": "quantity", "type": "uint64" }, { "name": "gateArgs", "type": "byte[][]" }, { "name": "disqualified", "type": "bool" }], "EntryKey": [{ "name": "address", "type": "address" }, { "name": "asset", "type": "uint64" }], "RaffleCursor": [{ "name": "ticket", "type": "uint64" }, { "name": "stake", "type": "uint64" }, { "name": "disbursed", "type": "uint64" }], "Reward": [{ "name": "asset", "type": "uint64" }, { "name": "distribution", "type": "uint8" }, { "name": "rate", "type": "uint64" }, { "name": "expiration", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "qualifiedStakers", "type": "uint64" }, { "name": "qualifiedStake", "type": "uint64" }, { "name": "royaltyAmount", "type": "uint64" }, { "name": "winnerCount", "type": "uint64" }, { "name": "winningTickets", "type": "uint64[]" }, { "name": "raffleCursor", "type": "RaffleCursor" }, { "name": "vrfFailureCount", "type": "uint64" }, { "name": "phase", "type": "uint8" }, { "name": "disbursementCursor", "type": "uint64" }, { "name": "activeDisbursementId", "type": "uint64" }, { "name": "activeDisbursementRoundStart", "type": "uint64" }, { "name": "lastDisbursementTimestamp", "type": "uint64" }], "StakingPoolMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "uniques", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }, { "name": "rewards", "type": "uint64" }, { "name": "disbursements", "type": "uint64" }], "StakingPoolState": [{ "name": "status", "type": "uint8" }, { "name": "title", "type": "string" }, { "name": "type", "type": "uint8" }, { "name": "signupTimestamp", "type": "uint64" }, { "name": "startTimestamp", "type": "uint64" }, { "name": "allowLateSignups", "type": "bool" }, { "name": "endTimestamp", "type": "uint64" }, { "name": "maxEntries", "type": "uint64" }, { "name": "entryCount", "type": "uint64" }, { "name": "rewardCount", "type": "uint64" }, { "name": "stakeKey", "type": "RootKey" }, { "name": "minimumStakeAmount", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "creator", "type": "address" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "title" }, { "type": "uint8", "name": "type" }, { "type": "address", "name": "creator" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "marketplace" }, { "type": "(address,string)", "struct": "RootKey", "name": "stakeKey" }, { "type": "uint64", "name": "minimumStakeAmount" }, { "type": "bool", "name": "allowLateSignups" }, { "type": "uint64", "name": "gateID" }, { "type": "uint64", "name": "maxEntries" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "uint64", "name": "akitaRoyalty" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Completes factory-only initialization with the creator-specific royalty.", "events": [], "recommendations": {} }, { "name": "delete", "args": [{ "type": "address", "name": "caller" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa, it may also require the akita dao escrow to opt in", "events": [], "recommendations": {} }, { "name": "addReward", "args": [{ "type": "pay", "name": "payment" }, { "type": "(uint64,uint8,uint64,uint64,uint64,uint64)", "struct": "AddRewardParams", "name": "reward" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "addRewardAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "(uint64,uint8,uint64,uint64,uint64,uint64)", "struct": "AddRewardParams", "name": "reward" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "finalize", "args": [{ "type": "uint64", "name": "signupTimestamp" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "(uint64,uint64,byte[32][])[]", "name": "entries" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "enter", "args": [{ "type": "pay", "name": "payment" }, { "type": "(uint64,uint64,byte[32][])[]", "name": "entries" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "startDisbursement", "args": [{ "type": "uint64", "name": "rewardID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [{ "type": "uint64", "name": "rewardID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "disburseRewards", "args": [{ "type": "uint64", "name": "rewardID" }, { "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "finalizeDistribution", "args": [{ "type": "uint64", "name": "rewardID" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "check", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "(bool,uint64)", "struct": "ObjectC3416591" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gateCheck", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "address" }, { "type": "uint64", "name": "asset" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "enterCost", "args": [{ "type": "address", "name": "address", "desc": "The address that will be entering" }, { "type": "(uint64,uint64,byte[32][])[]", "name": "entries", "desc": "The entries being added" }], "returns": { "type": "uint64", "desc": "The entry box MBR plus any app-scoped SOFT stake MBR" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Calculates the total cost required to enter the pool", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "signUpsOpen", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether sign ups are open" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the pool is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isEntered", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool", "desc": "a boolean indicating if the address has entered the staking pool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getState", "args": [], "returns": { "type": "(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address)", "struct": "StakingPoolState" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "uint64", "name": "winningTickets" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64)", "struct": "StakingPoolMBRData", "desc": "the mbr created for each boxmap entry" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 12, "bytes": 10 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "status": { "keyType": "AVMString", "valueType": "uint8", "key": "c3RhdHVz", "desc": "the status the pool is in" }, "title": { "keyType": "AVMString", "valueType": "AVMString", "key": "dGl0bGU=", "desc": "title of the staking pool" }, "type": { "keyType": "AVMString", "valueType": "uint8", "key": "dHlwZQ==", "desc": "the method of staking to be used for the pool" }, "signupTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c2lnbnVwX3RpbWVzdGFtcA==", "desc": "the timestamp when sign ups for the pool are allowed" }, "allowLateSignups": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWxsb3dfbGF0ZV9zaWdudXBz", "desc": "whether signups are allowed after the staking pool begins" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "the timestamp when the pool starts" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "the timestamp when the pool ends" }, "maxEntries": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWF4X2VudHJpZXM=", "desc": "the maximum entries allowed for the pool" }, "entryID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfY291bnQ=", "desc": "the number of entries in a pool" }, "rewardID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmV3YXJkX2NvdW50", "desc": "the number of rewards for the pool" }, "stakeKey": { "keyType": "AVMString", "valueType": "RootKey", "key": "c3Rha2Vfa2V5", "desc": "the name for the meta merkle asset group to validate staking\nstake key can be empty if distribution !== DistributionTypePercentage" }, "minimumStakeAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluaW11bV9zdGFrZV9hbW91bnQ=", "desc": "minimum stake amount" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate id of the pool" }, "creator": { "keyType": "AVMString", "valueType": "address", "key": "Y3JlYXRvcg==", "desc": "the address of the creator of the staking pool" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "marketplace is pool creation side marketplace" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfcm95YWx0eQ==", "desc": "the akita royalty for the pool" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "salt for randomness" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "entries": { "keyType": "uint64", "valueType": "EntryData", "desc": "indexed entries for efficient iteration", "prefix": "ZQ==" }, "uniques": { "keyType": "address", "valueType": "uint64", "desc": "the number of unique asset entries by address", "prefix": "dQ==" }, "entriesByAddress": { "keyType": "EntryKey", "valueType": "uint64", "desc": "the entries in the pool", "prefix": "YQ==" }, "rewards": { "keyType": "uint64", "valueType": "Reward", "desc": "the rewards for this staking pool", "prefix": "cg==" }, "disbursements": { "keyType": "uint64", "valueType": "AVMBytes", "desc": "the disbursements this pool as created & finalized", "prefix": "ZA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2923, 4872, 5049, 7793], "errorMessage": "Box must have value" }, { "pc": [850, 1542, 2740, 3149, 5879, 5984, 6535, 6833, 7423], "errorMessage": "Bytes has valid prefix" }, { "pc": [1253], "errorMessage": "ERR:CODE" }, { "pc": [1900], "errorMessage": "ERR:COFZ" }, { "pc": [3405], "errorMessage": "ERR:DNOI" }, { "pc": [4757], "errorMessage": "ERR:DNRF" }, { "pc": [2620], "errorMessage": "ERR:DWNO" }, { "pc": [6203, 6644], "errorMessage": "ERR:EEXS" }, { "pc": [2326], "errorMessage": "ERR:FGTE" }, { "pc": [1232], "errorMessage": "ERR:FODE" }, { "pc": [1197], "errorMessage": "ERR:FOIN" }, { "pc": [1335, 6906], "errorMessage": "ERR:FORB" }, { "pc": [6557], "errorMessage": "ERR:FSVF" }, { "pc": [2232], "errorMessage": "ERR:GINS" }, { "pc": [2468], "errorMessage": "ERR:GIST" }, { "pc": [7330], "errorMessage": "ERR:IDPH" }, { "pc": [2044], "errorMessage": "ERR:IETT" }, { "pc": [1396, 1410, 6314, 6335, 7095, 7122], "errorMessage": "ERR:IPAY" }, { "pc": [5759], "errorMessage": "ERR:IPTC" }, { "pc": [7600, 7612], "errorMessage": "ERR:IRBD" }, { "pc": [7507], "errorMessage": "ERR:IRSD" }, { "pc": [1982], "errorMessage": "ERR:ISTT" }, { "pc": [1959], "errorMessage": "ERR:ISUT" }, { "pc": [2015], "errorMessage": "ERR:ISZL" }, { "pc": [5624], "errorMessage": "ERR:IUPG" }, { "pc": [1818, 1833, 1842], "errorMessage": "ERR:IXFR" }, { "pc": [7058], "errorMessage": "ERR:MEGR" }, { "pc": [6934], "errorMessage": "ERR:NALG" }, { "pc": [5552, 5595, 5667], "errorMessage": "ERR:NDAO" }, { "pc": [5703], "errorMessage": "ERR:NEFD" }, { "pc": [1575], "errorMessage": "ERR:NESC" }, { "pc": [2909], "errorMessage": "ERR:NRTD" }, { "pc": [1922], "errorMessage": "ERR:PMBD" }, { "pc": [6300], "errorMessage": "ERR:PMER" }, { "pc": [1286], "errorMessage": "ERR:PNDE" }, { "pc": [2507], "errorMessage": "ERR:PNLV" }, { "pc": [6460], "errorMessage": "ERR:QBMS" }, { "pc": [2574], "errorMessage": "ERR:RAID" }, { "pc": [7025], "errorMessage": "ERR:RMGW" }, { "pc": [7081], "errorMessage": "ERR:RMGZ" }, { "pc": [2523, 2869, 4723, 7271], "errorMessage": "ERR:RNFD" }, { "pc": [6972], "errorMessage": "ERR:SKYR" }, { "pc": [6260], "errorMessage": "ERR:SUNO" }, { "pc": [6609], "errorMessage": "ERR:UBLO" }, { "pc": [4698], "errorMessage": "ERR:URRT" }, { "pc": [6859], "errorMessage": "ERR:USLO" }, { "pc": [1598], "errorMessage": "ERR:WESC" }, { "pc": [7351], "errorMessage": "ERR:WTAE" }, { "pc": [3315, 3619], "errorMessage": "IPCT" }, { "pc": [3608], "errorMessage": "IPOA" }, { "pc": [5685, 6874], "errorMessage": "account funded" }, { "pc": [1348, 1371, 1661, 1677, 2672, 3260, 3358, 3384, 3416, 5213, 5544, 5587, 5659, 6036, 6085, 6659], "errorMessage": "application exists" }, { "pc": [1237, 1258, 1270, 1327, 1343, 1361, 1366, 1434, 1467, 1653, 1884, 1905, 1940, 1996, 2196, 2217, 2236, 2244, 2453, 2582, 2625, 2647, 2980, 2988, 3038, 3080, 3103, 3200, 3236, 3310, 3353, 3379, 3411, 3529, 3537, 3695, 3805, 3813, 3924, 4019, 4027, 4144, 4255, 4263, 4761, 4923, 4940, 4948, 5031, 5203, 5208, 5295, 5300, 5305, 5310, 5315, 5320, 5325, 5330, 5334, 5341, 5348, 5353, 5358, 5363, 5537, 5580, 5599, 5652, 5727, 5737, 5817, 5833, 5936, 5944, 6020, 6213, 6265, 6272, 6284, 6340, 6358, 6369, 6444, 6480, 6711, 6898, 6951, 7037, 7127, 7368, 7380, 7833, 7845, 7854, 7864, 7875, 7884, 7894, 7907, 7919, 7930, 7939], "errorMessage": "check GlobalState exists" }, { "pc": [2529, 2535, 2544, 2552, 2753, 2759, 2765, 2771, 2780, 2786, 2796, 2803, 2876, 2882, 2928, 2938, 2945, 2952, 2960, 2966, 3020, 3027, 3093, 3098, 3177, 3479, 3486, 3497, 3505, 3513, 3520, 3577, 3585, 3593, 3670, 3679, 3706, 3712, 3730, 3737, 3745, 3756, 3763, 3769, 3850, 3857, 3908, 3935, 3941, 3959, 3966, 3977, 3985, 3991, 4003, 4068, 4075, 4128, 4155, 4161, 4195, 4202, 4213, 4221, 4227, 4239, 4281, 4310, 4346, 4355, 4362, 4369, 4471, 4477, 4552, 4561, 4567, 4595, 4607, 4621, 4651, 4660, 4729, 4734, 4806, 4812, 4818, 4827, 4833, 4839, 4844, 5067, 5774, 5782, 5790, 5801, 5922, 7277, 7283, 7292, 7301, 7309, 7449, 7457, 7815], "errorMessage": "index out of bounds" }, { "pc": [2137, 2397, 5128], "errorMessage": "invalid array encoding" }, { "pc": [853, 922, 936, 1004, 1077, 1545, 2105, 2165, 2367, 2425, 4499, 4522, 5098, 5156, 5526, 5564, 6141, 6278, 6374, 7426], "errorMessage": "invalid array length header" }, { "pc": [1026], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [943, 5571], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1554], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [2192, 2448, 5179], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/staking-pool/types.ts::StakeEntry>" }, { "pc": [963, 981, 1212, 4855, 4908, 5091, 5272], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1017, 1036, 1045, 1054, 1176, 1318, 1856, 1865, 1874, 2488, 2817, 2838, 2848, 4706, 4863, 4916, 5198, 5455, 5645], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [954], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [6540], "errorMessage": "invalid number of bytes for bool" }, { "pc": [859, 7432], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1009], "errorMessage": "invalid number of bytes for smart_contracts/meta-merkles/types.ts::RootKey" }, { "pc": [1767, 1806], "errorMessage": "invalid number of bytes for smart_contracts/staking-pool/types.ts::AddRewardParams" }, { "pc": [5989, 6838], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::Stake" }, { "pc": [5885], "errorMessage": "invalid number of bytes for smart_contracts/staking/types.ts::StakeCheck" }, { "pc": [1082, 5531], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [972], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [2745, 3154], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1069, 5518], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [996], "errorMessage": "invalid tail pointer at index 1 of (uint8[32],(len+utf8[]))" }, { "pc": [2161, 2421, 5152], "errorMessage": "invalid tail pointer at index 2 of (uint64,uint64,(len+uint8[32][]))" }, { "pc": [2145, 2405, 5136], "errorMessage": "invalid tail pointer for (len+(uint64,uint64,(len+uint8[32][]))[])" }, { "pc": [991, 1064, 2156, 2416, 5147, 5513], "errorMessage": "invalid tuple encoding" }, { "pc": [2096, 4896], "errorMessage": "transaction type is appl" }, { "pc": [1795], "errorMessage": "transaction type is axfer" }, { "pc": [1310, 1758, 1783, 2085, 2360], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgNjM2NDEzNjIyMzg0Njc5MzAwNSAyNTMwMCAxMzIgMTQ0MjY5NTA0MDg4ODk2MzQwNyAxNDQyNjk1MDQwODg4OTYzNDA5IDQyOTQ5NjcyOTUgMTgzNDAwIDU5NzAwIDM0OTAwIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJlbnRyeV9jb3VudCIgMHgxNTFmN2M3NSAweDAwICJ0eXBlIiAweDAwMDAgImFhbCIgMHgwYSAiYWtpdGFfZXNjcm93IiAiZW5kX3RpbWVzdGFtcCIgMHgxNCAiZSIgInN0YXJ0X3RpbWVzdGFtcCIgInN0YXR1cyIgMHgxZSAiYWxsb3dfbGF0ZV9zaWdudXBzIiAiY3JlYXRvciIgImdhdGVfaWQiICJFUlI6SVBBWSIgIm1heF9lbnRyaWVzIiAid2FsbGV0IiAweDgwICJyIiAic2lnbnVwX3RpbWVzdGFtcCIgInJld2FyZF9jb3VudCIgInN0YWtlX2tleSIgIkVSUjpSTkZEIiAiYSIgInUiICJ0aXRsZSIgIm1pbmltdW1fc3Rha2VfYW1vdW50IiAiRVJSOklYRlIiIDB4MjggIkVSUjpOREFPIiAweDcxYjk1N2FmICJvYWwiICJzYWx0IiAiYWtpdGFfcm95YWx0eSIgIkVSUjpGT1JCIiAicGFsIiAiY29udHJvbGxlZF9hZGRyZXNzIiAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCAweDAwMDAwMDAwMDAwMDAwMDAwMCAweGQ0MDE2MmFmICJFUlI6RUVYUyIgIkVSUjpJUkJEIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gc2lnbnVwVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlTaWdudXBUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDIzIC8vICJzaWdudXBfdGltZXN0YW1wIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyBhbGxvd0xhdGVTaWdudXBzID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUFsbG93TGF0ZVNpZ251cHMgfSkKICAgIGJ5dGVjIDE1IC8vICJhbGxvd19sYXRlX3NpZ251cHMiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTIgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDkgLy8gImVuZF90aW1lc3RhbXAiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTY2CiAgICAvLyByZXdhcmRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5UmV3YXJkQ291bnQgfSkKICAgIGJ5dGVjIDI0IC8vICJyZXdhcmRfY291bnQiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEzOS0xNDMKICAgIC8vIGV4cG9ydCBjbGFzcyBTdGFraW5nUG9vbCBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VTdGFraW5nUG9vbCwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweGFiOGIyMTNhIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJkZWxldGUoYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX2RlbGV0ZV9yb3V0ZUA0IG1haW5fdXBkYXRlX3JvdXRlQDUKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEzOS0xNDMKICAgIC8vIGV4cG9ydCBjbGFzcyBTdGFraW5nUG9vbCBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VTdGFraW5nUG9vbCwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzMgogICAgcHVzaGJ5dGVzcyAweDFiY2RlNTJkIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJpbml0KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBieXRlYyAzNCAvLyBtZXRob2QgImFkZFJld2FyZChwYXksKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpKXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4YTAwY2NlYzYgMHgxODFlODI5MSAweGZkY2ZkZmY2IDB4YjgyZWQxYjMgMHhhOTQxOGQzNyAweGZjNjk5Y2IzIDB4NmU3NmIyY2EgMHhjZGIwYWM2YSAweGIyMjNkMzVkIDB4YmM1OGFkMDkgMHgwNzdhMGZmMiAweDMzZjc4ODA4IDB4NTkyZWUzNDEgMHg4ZmE0YTE2MCAweGUzMzc3MzQyIDB4OWEyZjIxYjQgMHhhNGIzZTc4OSAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAvLyBtZXRob2QgImFkZFJld2FyZEFzYShwYXksYXhmZXIsKHVpbnQ2NCx1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpKXZvaWQiLCBtZXRob2QgImZpbmFsaXplKHVpbnQ2NCx1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkRW50ZXIocGF5LGFwcGwsKHVpbnQ2NCx1aW50NjQsYnl0ZVszMl1bXSlbXSl2b2lkIiwgbWV0aG9kICJlbnRlcihwYXksKHVpbnQ2NCx1aW50NjQsYnl0ZVszMl1bXSlbXSl2b2lkIiwgbWV0aG9kICJzdGFydERpc2J1cnNlbWVudCh1aW50NjQpdm9pZCIsIG1ldGhvZCAicmFmZmxlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkaXNidXJzZVJld2FyZHModWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJmaW5hbGl6ZURpc3RyaWJ1dGlvbih1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2hlY2soYWRkcmVzcyx1aW50NjQpKGJvb2wsdWludDY0KSIsIG1ldGhvZCAiZ2F0ZUNoZWNrKGFwcGwsYWRkcmVzcyx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZW50ZXJDb3N0KGFkZHJlc3MsKHVpbnQ2NCx1aW50NjQsYnl0ZVszMl1bXSlbXSl1aW50NjQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJzaWduVXBzT3BlbigpYm9vbCIsIG1ldGhvZCAiaXNMaXZlKClib29sIiwgbWV0aG9kICJpc0VudGVyZWQoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRTdGF0ZSgpKHVpbnQ4LHN0cmluZyx1aW50OCx1aW50NjQsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHN0cmluZyksdWludDY0LHVpbnQ2NCxhZGRyZXNzKSIsIG1ldGhvZCAibWJyKHVpbnQ2NCkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGluaXQgb3B0SW4gYWRkUmV3YXJkIGFkZFJld2FyZEFzYSBmaW5hbGl6ZSBnYXRlZEVudGVyIGVudGVyIHN0YXJ0RGlzYnVyc2VtZW50IHJhZmZsZSBkaXNidXJzZVJld2FyZHMgZmluYWxpemVEaXN0cmlidXRpb24gY2hlY2sgZ2F0ZUNoZWNrIGVudGVyQ29zdCBvcHRJbkNvc3Qgc2lnblVwc09wZW4gaXNMaXZlIGlzRW50ZXJlZCBnZXRTdGF0ZSBtYnIgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDMwCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEzOS0xNDMKICAgIC8vIGV4cG9ydCBjbGFzcyBTdGFraW5nUG9vbCBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VTdGFraW5nUG9vbCwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzIDB4NjQ0OTUxZjEgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ4LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLChhZGRyZXNzLHN0cmluZyksdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKbWFpbl9kZWxldGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NjQKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGV0ZQoKCi8vIF9wdXlhX2xpYi5hcmM0LmR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQoYXJyYXk6IGJ5dGVzLCBpbmRleDogdWludDY0KSAtPiBieXRlczoKZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudDoKICAgIHByb3RvIDIgMQogICAgZnJhbWVfZGlnIC0yCiAgICBleHRyYWN0IDIgMAogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18zIC8vIDIKICAgICoKICAgIGRpZyAyCiAgICBzd2FwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDIKICAgIGxlbgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZHVwCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZGlnIDUKICAgIHN3YXAKICAgIGV4dHJhY3RfdWludDE2CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgLQogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjpfX3BjZzMyT3V0cHV0KHN0YXRlOiB1aW50NjQpIC0+IHVpbnQ2NDoKX19wY2czMk91dHB1dDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBfX3BjZzMyT3V0cHV0KHN0YXRlOiBQQ0czMlNUQVRFKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMAogICAgLy8gY29uc3QgeG9yc2hpZnRlZCA9IF9fbWFza1RvVWludDMyKG9wLnNocihvcC5zaHIoc3RhdGUsIDE4KSBeIHN0YXRlLCAyNykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTgKICAgIHNocgogICAgZnJhbWVfZGlnIC0xCiAgICBeCiAgICBwdXNoaW50IDI3CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTAgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMQogICAgLy8gY29uc3Qgcm90ID0gb3Auc2hyKHN0YXRlLCA1OSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA1OQogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICBkdXAyCiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIHN3YXAKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHB1c2hpbnQgMzEKICAgICYKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgc2hsCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE5CiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDEwIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHwKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTzogdWludDY0LCBhZGRyZXNzOiBieXRlcykgLT4gdWludDY0OgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24sIGFkZHJlc3M6IEFjY291bnQpOiBBcHBsaWNhdGlvbiB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyAzNSAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIHN3YXAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIGIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNwbGl0T3B0SW5Db3VudChha2l0YURBTzogdWludDY0LCBlc2Nyb3c6IGJ5dGVzLCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnNwbGl0T3B0SW5Db3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgZXNjcm93OiBBY2NvdW50LCBhc3NldDogQXNzZXQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOAogICAgLy8gbGV0IGNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDAKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAzCiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQxCiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3CiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL21ici50czo6RnVuZGVySW5mbwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDM0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKHVpbnQ4WzMyXSwobGVuK3V0ZjhbXSkpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDM2CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvbWV0YS1tZXJrbGVzL3R5cGVzLnRzOjpSb290S2V5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMgogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gc3RhdHVzID0gR2xvYmFsU3RhdGU8U3Rha2luZ1Bvb2xTdGF0dXM+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlTdGF0dXMgfSkKICAgIGJ5dGVjIDEzIC8vICJzdGF0dXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODM4CiAgICAvLyB0aGlzLnN0YXR1cy52YWx1ZSA9IFBvb2xTdGF0dXNEcmFmdAogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gdGl0bGUgPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlUaXRsZSB9KQogICAgYnl0ZWMgMjkgLy8gInRpdGxlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gdGhpcy50aXRsZS52YWx1ZSA9IHRpdGxlCiAgICB1bmNvdmVyIDEyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gdHlwZSA9IEdsb2JhbFN0YXRlPFN0YWtpbmdQb29sU3Rha2luZ1R5cGU+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlUeXBlIH0pCiAgICBieXRlYyA0IC8vICJ0eXBlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg0MAogICAgLy8gdGhpcy50eXBlLnZhbHVlID0gdHlwZQogICAgdW5jb3ZlciAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5Q3JlYXRvciB9KQogICAgYnl0ZWMgMTYgLy8gImNyZWF0b3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODQxCiAgICAvLyB0aGlzLmNyZWF0b3IudmFsdWUgPSBjcmVhdG9yCiAgICB1bmNvdmVyIDEwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2NoaWxkLnRzOjExCiAgICAvLyBmdW5kZXIgPSBHbG9iYWxTdGF0ZTxGdW5kZXJJbmZvPih7IGtleTogR2xvYmFsU3RhdGVLZXlGdW5kZXIgfSkKICAgIHB1c2hieXRlcyAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg0MgogICAgLy8gdGhpcy5mdW5kZXIudmFsdWUgPSBjbG9uZShmdW5kZXIpCiAgICB1bmNvdmVyIDkKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgcHVzaGJ5dGVzICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NDMKICAgIC8vIHRoaXMubWFya2V0cGxhY2UudmFsdWUgPSBtYXJrZXRwbGFjZQogICAgdW5jb3ZlciA4CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gc3Rha2VLZXkgPSBHbG9iYWxTdGF0ZTxSb290S2V5Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3Rha2VLZXkgfSkKICAgIGJ5dGVjIDI1IC8vICJzdGFrZV9rZXkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODQ1CiAgICAvLyB0aGlzLnN0YWtlS2V5LnZhbHVlID0gY2xvbmUoc3Rha2VLZXkpCiAgICB1bmNvdmVyIDcKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBtaW5pbXVtU3Rha2VBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlNaW5pbXVtU3Rha2VBbW91bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJtaW5pbXVtX3N0YWtlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NDYKICAgIC8vIHRoaXMubWluaW11bVN0YWtlQW1vdW50LnZhbHVlID0gbWluaW11bVN0YWtlQW1vdW50CiAgICB1bmNvdmVyIDYKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyBhbGxvd0xhdGVTaWdudXBzID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUFsbG93TGF0ZVNpZ251cHMgfSkKICAgIGJ5dGVjIDE1IC8vICJhbGxvd19sYXRlX3NpZ251cHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyB0aGlzLmFsbG93TGF0ZVNpZ251cHMudmFsdWUgPSBhbGxvd0xhdGVTaWdudXBzCiAgICB1bmNvdmVyIDUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDE3IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg0OAogICAgLy8gdGhpcy5nYXRlSUQudmFsdWUgPSBnYXRlSUQKICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIG1heEVudHJpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlNYXhFbnRyaWVzIH0pCiAgICBieXRlYyAxOSAvLyAibWF4X2VudHJpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODQ5CiAgICAvLyB0aGlzLm1heEVudHJpZXMudmFsdWUgPSBtYXhFbnRyaWVzCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTg1CiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM8MzI+Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgMzYgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyB0aGlzLnNhbHQudmFsdWUgPSBUeG4udHhJZAogICAgdHhuIFR4SUQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg1MwogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5pbml0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NTkKICAgIC8vIGluaXQoYWtpdGFSb3lhbHR5OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NjAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9GQUNUT1JZX09OTFlfSU5JVCkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpGT0lOIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZPSU4KCmluaXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlBa2l0YVJveWFsdHkgfSkKICAgIGJ5dGVjIDM3IC8vICJha2l0YV9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg2MQogICAgLy8gdGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPSBha2l0YVJveWFsdHkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODU5CiAgICAvLyBpbml0KGFraXRhUm95YWx0eTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5kZWxldGVbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODY0CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfRkFDVE9SWV9PTkxZX0RFTEVURSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkZPREUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Rk9ERQoKZGVsZXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGNhbGxlciA9PT0gdGhpcy5jcmVhdG9yLnZhbHVlLCBFUlJfQ1JFQVRPUl9PTkxZX0RFTEVURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTc3CiAgICAvLyBjcmVhdG9yID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUNyZWF0b3IgfSkKICAgIGJ5dGVjIDE2IC8vICJjcmVhdG9yIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGNhbGxlciA9PT0gdGhpcy5jcmVhdG9yLnZhbHVlLCBFUlJfQ1JFQVRPUl9PTkxZX0RFTEVURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6Q09ERSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDT0RFCgpkZWxldGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODY4CiAgICAvLyBpZiAodGhpcy5zdGF0dXMudmFsdWUgIT09IFBvb2xTdGF0dXNEcmFmdCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHN0YXR1cyA9IEdsb2JhbFN0YXRlPFN0YWtpbmdQb29sU3RhdHVzPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3RhdHVzIH0pCiAgICBieXRlYyAxMyAvLyAic3RhdHVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg2OAogICAgLy8gaWYgKHRoaXMuc3RhdHVzLnZhbHVlICE9PSBQb29sU3RhdHVzRHJhZnQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18zIC8vIDB4MDAKICAgICE9CiAgICBieiBkZWxldGVfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODY5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfUE9PTF9OT1RfRFJBRlRfT1JfRU5ERUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDkgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODY5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfUE9PTF9OT1RfRFJBRlRfT1JfRU5ERUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYm56IGRlbGV0ZV9hZnRlcl9pZl9lbHNlQDkKICAgIHB1c2hieXRlcyAiRVJSOlBOREUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UE5ERQoKZGVsZXRlX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4NzQtODc2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg3NQogICAgLy8gLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODc0LTg3NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg3NC04NzYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg2NAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4ODYKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4ODcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIEVSUl9GT1JCSURERU4pCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3NwogICAgLy8gY3JlYXRvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlDcmVhdG9yIH0pCiAgICBieXRlYyAxNiAvLyAiY3JlYXRvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4ODcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIEVSUl9GT1JCSURERU4pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzggLy8gIkVSUjpGT1JCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZPUkIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg4OQogICAgLy8gbGV0IG9wdGluTUJSOiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg5MgogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODkyCiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKGFzc2V0KSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODkzCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4OTMKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODkzCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyA0CiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjg5NAogICAgLy8gb3B0aW5NQlIgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogY291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCgpvcHRJbl9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMTggLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm9wdEluX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBvcHRpbk1CUiArIHJld2FyZHNNQlIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBndHhucyBBbW91bnQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4OTcKICAgIC8vIGNvbnN0IHJld2FyZHNNQlI6IHVpbnQ2NCA9IHRoaXMucmV3YXJkc01icihXaW5uZXJDb3VudENhcCkgKiAyCiAgICBpbnRjIDExIC8vIDE4MzQwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBvcHRpbk1CUiArIHJld2FyZHNNQlIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICArCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxOCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTAyLTkwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTA0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5MDUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkwMi05MDcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkwMi05MDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDIwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAzOSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE4CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjEKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgNAogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDIwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweDNhYjI4OTViIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGFkZHJlc3MsYm9vbClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MQogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9hY2NvdW50L3R5cGVzLnRzOjpFc2Nyb3dJbmZvPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBFUlJfRVNDUk9XX0RPRVNfTk9UX0VYSVNUKQogICAgZXh0cmFjdCA2IDQxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxMgogICAgcHVzaGJ5dGVzICJFUlI6TkVTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpORVNDCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjIKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgRVJSX1dST05HX0VTQ1JPV19GT1JfT1BFUkFUSU9OKQogICAgdW5jb3ZlciAzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6V0VTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXRVNDCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMwCiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMQogICAgLy8gW10KICAgIGJ5dGVjIDUgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUtMTM5CiAgICAvLyBjb25zdCBvcHRJbkNvdW50ID0gc3BsaXRPcHRJbkNvdW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0CiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgY292ZXIgNAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0MQogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OS0xNTIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHdhbGxldCwKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDgKICAgIC8vIFthc3NldC5pZF0sCiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDcKICAgIC8vIHRydWUsCiAgICBieXRlYyAyMSAvLyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODg2CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkUmV3YXJkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkxMwogICAgLy8gYWRkUmV3YXJkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgcmV3YXJkOiBBZGRSZXdhcmRQYXJhbXMpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvdHlwZXMudHM6OkFkZFJld2FyZFBhcmFtcwogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZAogICAgcG9wCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgphZGRSZXdhcmRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyBhZGRSZXdhcmRBc2EocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgcmV3YXJkOiBBZGRSZXdhcmRQYXJhbXMpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBsZW4KICAgIHB1c2hpbnQgNDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvdHlwZXMudHM6OkFkZFJld2FyZFBhcmFtcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhZGRSZXdhcmRBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMxIC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgphZGRSZXdhcmRBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gQXNzZXQocmV3YXJkLmFzc2V0KSwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkdXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZGlnIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIGJueiBhZGRSZXdhcmRBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDMxIC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgphZGRSZXdhcmRBc2FfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID4gMCwgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBndHhucyBBc3NldEFtb3VudAogICAgYm56IGFkZFJld2FyZEFzYV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMzEgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmFkZFJld2FyZEFzYV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NTAKICAgIC8vIHRoaXMuYWRkUmV3YXJkKHBheW1lbnQsIHJld2FyZCkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk0NQogICAgLy8gYWRkUmV3YXJkQXNhKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIHJld2FyZDogQWRkUmV3YXJkUGFyYW1zKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5maW5hbGl6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmZpbmFsaXplOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk1MwogICAgLy8gZmluYWxpemUoc2lnbnVwVGltZXN0YW1wOiB1aW50NjQsIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsIGVuZFRpbWVzdGFtcDogdWludDY0KSB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5jcmVhdG9yLnZhbHVlLCBFUlJfQ1JFQVRPUl9PTkxZX0ZJTkFMSVpFKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIGNyZWF0b3IgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5Q3JlYXRvciB9KQogICAgYnl0ZWMgMTYgLy8gImNyZWF0b3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5jcmVhdG9yLnZhbHVlLCBFUlJfQ1JFQVRPUl9PTkxZX0ZJTkFMSVpFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogZmluYWxpemVfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOkNPRloiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q09GWgoKZmluYWxpemVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdGF0dXMudmFsdWUgPT09IFBvb2xTdGF0dXNEcmFmdCwgRVJSX1BPT0xfTVVTVF9CRV9EUkFGVCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBzdGF0dXMgPSBHbG9iYWxTdGF0ZTxTdGFraW5nUG9vbFN0YXR1cz4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVN0YXR1cyB9KQogICAgYnl0ZWMgMTMgLy8gInN0YXR1cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN0YXR1cy52YWx1ZSA9PT0gUG9vbFN0YXR1c0RyYWZ0LCBFUlJfUE9PTF9NVVNUX0JFX0RSQUZUKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgPT0KICAgIGJueiBmaW5hbGl6ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6UE1CRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQTUJECgpmaW5hbGl6ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NTcKICAgIC8vIHNpZ251cFRpbWVzdGFtcCA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgfHwgKHNpZ251cFRpbWVzdGFtcCA9PT0gMCAmJiB0aGlzLmFsbG93TGF0ZVNpZ251cHMudmFsdWUpLAogICAgZGlnIDEKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgID4KICAgIGJueiBmaW5hbGl6ZV9ib29sX3RydWVAOAogICAgZGlnIDEKICAgIGJueiBmaW5hbGl6ZV9ib29sX2ZhbHNlQDkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyBhbGxvd0xhdGVTaWdudXBzID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUFsbG93TGF0ZVNpZ251cHMgfSkKICAgIGJ5dGVjIDE1IC8vICJhbGxvd19sYXRlX3NpZ251cHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTU3CiAgICAvLyBzaWdudXBUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IChzaWdudXBUaW1lc3RhbXAgPT09IDAgJiYgdGhpcy5hbGxvd0xhdGVTaWdudXBzLnZhbHVlKSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBmaW5hbGl6ZV9ib29sX2ZhbHNlQDkKCmZpbmFsaXplX2Jvb2xfdHJ1ZUA4OgogICAgaW50Y18xIC8vIDEKCmZpbmFsaXplX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTU2LTk1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBzaWdudXBUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIHx8IChzaWdudXBUaW1lc3RhbXAgPT09IDAgJiYgdGhpcy5hbGxvd0xhdGVTaWdudXBzLnZhbHVlKSwKICAgIC8vICAgRVJSX0lOVkFMSURfU0lHTlVQX1RJTUVTVEFNUAogICAgLy8gKQogICAgYm56IGZpbmFsaXplX2FmdGVyX2Fzc2VydEAxMgogICAgcHVzaGJ5dGVzICJFUlI6SVNVVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1VUCgpmaW5hbGl6ZV9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTYxCiAgICAvLyBpZiAoc3RhcnRUaW1lc3RhbXAgIT09IDApIHsKICAgIGR1cAogICAgYnogZmluYWxpemVfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk2MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXJ0VGltZXN0YW1wID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgRVJSX0lOVkFMSURfU1RBUlRfVElNRVNUQU1QKQogICAgZHVwCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBibnogZmluYWxpemVfYWZ0ZXJfaWZfZWxzZUAxNgogICAgcHVzaGJ5dGVzICJFUlI6SVNUVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU1RUCgpmaW5hbGl6ZV9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk2NQogICAgLy8gaWYgKHN0YXJ0VGltZXN0YW1wID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBmaW5hbGl6ZV9hZnRlcl9pZl9lbHNlQDI0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NjYKICAgIC8vIGxvZ2dlZEFzc2VydChzaWdudXBUaW1lc3RhbXAgPT09IDAgJiYgdGhpcy5hbGxvd0xhdGVTaWdudXBzLnZhbHVlLCBFUlJfSU5WQUxJRF9TVEFSVF9aRVJPX1JFUVVJUkVTX0xBVEUpCiAgICBkdXAKICAgIGJueiBmaW5hbGl6ZV9ib29sX2ZhbHNlQDIwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gYWxsb3dMYXRlU2lnbnVwcyA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlBbGxvd0xhdGVTaWdudXBzIH0pCiAgICBieXRlYyAxNSAvLyAiYWxsb3dfbGF0ZV9zaWdudXBzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNpZ251cFRpbWVzdGFtcCA9PT0gMCAmJiB0aGlzLmFsbG93TGF0ZVNpZ251cHMudmFsdWUsIEVSUl9JTlZBTElEX1NUQVJUX1pFUk9fUkVRVUlSRVNfTEFURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBmaW5hbGl6ZV9ib29sX2ZhbHNlQDIwCiAgICBpbnRjXzEgLy8gMQoKZmluYWxpemVfYm9vbF9tZXJnZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NjYKICAgIC8vIGxvZ2dlZEFzc2VydChzaWdudXBUaW1lc3RhbXAgPT09IDAgJiYgdGhpcy5hbGxvd0xhdGVTaWdudXBzLnZhbHVlLCBFUlJfSU5WQUxJRF9TVEFSVF9aRVJPX1JFUVVJUkVTX0xBVEUpCiAgICBibnogZmluYWxpemVfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBwdXNoYnl0ZXMgIkVSUjpJU1pMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklTWkwKCmZpbmFsaXplX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NjcKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAoKZmluYWxpemVfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NzAKICAgIC8vIGlmIChlbmRUaW1lc3RhbXAgIT09IDApIHsKICAgIGRpZyAyCiAgICBieiBmaW5hbGl6ZV9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTcxCiAgICAvLyBsb2dnZWRBc3NlcnQoZW5kVGltZXN0YW1wID4gKHN0YXJ0VGltZXN0YW1wICsgMTApLCBFUlJfSU5WQUxJRF9FTkRfVElNRVNUQU1QKQogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICArCiAgICBkaWcgMwogICAgPAogICAgYm56IGZpbmFsaXplX2FmdGVyX2lmX2Vsc2VAMjgKICAgIHB1c2hieXRlcyAiRVJSOklFVFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SUVUVAoKZmluYWxpemVfYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIHNpZ251cFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U2lnbnVwVGltZXN0YW1wIH0pCiAgICBieXRlYyAyMyAvLyAic2lnbnVwX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NzQKICAgIC8vIHRoaXMuc2lnbnVwVGltZXN0YW1wLnZhbHVlID0gc2lnbnVwVGltZXN0YW1wCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDEyIC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTc1CiAgICAvLyB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlID0gc3RhcnRUaW1lc3RhbXAKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5NzYKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID0gZW5kVGltZXN0YW1wCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gc3RhdHVzID0gR2xvYmFsU3RhdGU8U3Rha2luZ1Bvb2xTdGF0dXM+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlTdGF0dXMgfSkKICAgIGJ5dGVjIDEzIC8vICJzdGF0dXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTc3CiAgICAvLyB0aGlzLnN0YXR1cy52YWx1ZSA9IFBvb2xTdGF0dXNGaW5hbAogICAgYnl0ZWMgNyAvLyAweDBhCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk1MwogICAgLy8gZmluYWxpemUoc2lnbnVwVGltZXN0YW1wOiB1aW50NjQsIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsIGVuZFRpbWVzdGFtcDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpmaW5hbGl6ZV9ib29sX2ZhbHNlQDIwOgogICAgaW50Y18wIC8vIDAKICAgIGIgZmluYWxpemVfYm9vbF9tZXJnZUAyMQoKZmluYWxpemVfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgZmluYWxpemVfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuZ2F0ZWRFbnRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkRW50ZXI6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTgwLTk4NAogICAgLy8gZ2F0ZWRFbnRlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgZW50cmllczogU3Rha2VFbnRyeVtdLAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18zIC8vIDIKICAgICoKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBjb3ZlciAzCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKCmdhdGVkRW50ZXJfZm9yX2hlYWRlckAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk4MC05ODQKICAgIC8vIGdhdGVkRW50ZXIoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIGVudHJpZXM6IFN0YWtlRW50cnlbXSwKICAgIC8vICk6IHZvaWQgewogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogZ2F0ZWRFbnRlcl9hZnRlcl9mb3JANAogICAgZHVwCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZGlnIDMKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBlbmNvZGluZwogICAgZHVwCiAgICB1bmNvdmVyIDYKICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBmb3IgKGxlbisodWludDY0LHVpbnQ2NCwobGVuK3VpbnQ4WzMyXVtdKSlbXSkKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAyIG9mICh1aW50NjQsdWludDY0LChsZW4rdWludDhbMzJdW10pKQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgMjAKICAgICsKICAgICsKICAgIGNvdmVyIDMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGdhdGVkRW50ZXJfZm9yX2hlYWRlckAxCgpnYXRlZEVudGVyX2FmdGVyX2ZvckA0OgogICAgcG9wCiAgICBidXJ5IDEKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTgwLTk4NAogICAgLy8gZ2F0ZWRFbnRlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgZW50cmllczogU3Rha2VFbnRyeVtdLAogICAgLy8gKTogdm9pZCB7CiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC90eXBlcy50czo6U3Rha2VFbnRyeT4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk4NQogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQzCiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGJueiBnYXRlZEVudGVyX2FmdGVyX2lmX2Vsc2VAMjUKICAgIGJ1cnkgMQogICAgYnVyeSA1CgpnYXRlZEVudGVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6b3JpZ2luT3JAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTg4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgIT09IDAsIEVSUl9HQVRFX0lEX05PVF9TRVQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAxNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5ODgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSAhPT0gMCwgRVJSX0dBVEVfSURfTk9UX1NFVCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZ2F0ZWRFbnRlcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6R0lOUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpHSU5TCgpnYXRlZEVudGVyX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDE3IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGJ1cnkgNgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGRpZyAxCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVkRW50ZXJfYm9vbF9mYWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTAKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGR1cAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBnYXRlZEVudGVyX2Jvb2xfZmFsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjUxCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGR1cAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUxCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVkRW50ZXJfYm9vbF9mYWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTIKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZHVwCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDQzOTIyNjU1IC8vIG1ldGhvZCAibXVzdENoZWNrKGFkZHJlc3MsdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDktMjUyCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgYnogZ2F0ZWRFbnRlcl9ib29sX2ZhbHNlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1MwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBkdXAKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZGlnIDUKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OS0yNTMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVkRW50ZXJfYm9vbF9mYWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTQKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGR1cAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkaWcgNAogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ5LTI1NAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogZ2F0ZWRFbnRlcl9ib29sX2ZhbHNlQDE5CiAgICBpbnRjXzEgLy8gMQoKZ2F0ZWRFbnRlcl9ib29sX21lcmdlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYm56IGdhdGVkRW50ZXJfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRFbnRlcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU5CiAgICAvLyByZXR1cm4gZGVjb2RlQXJjNDxHYXRlQXJncz4oZ2F0ZVR4bi5hcHBBcmdzKDMpKQogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyB0aGlzLmNyZWF0ZVBvb2xFbnRyaWVzKHBheW1lbnQsIGVudHJpZXMsIGdldEdhdGVBcmdzKGdhdGVUeG4pKQogICAgY2FsbHN1YiBjcmVhdGVQb29sRW50cmllcwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTgwLTk4NAogICAgLy8gZ2F0ZWRFbnRlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgZW50cmllczogU3Rha2VFbnRyeVtdLAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnYXRlZEVudGVyX2Jvb2xfZmFsc2VAMTk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBnYXRlZEVudGVyX2Jvb2xfbWVyZ2VAMjAKCmdhdGVkRW50ZXJfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjcKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgYnl0ZWMgNDAgLy8gImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgZ2F0ZWRFbnRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDI2CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5lbnRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk5NAogICAgLy8gZW50ZXIocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBlbnRyaWVzOiBTdGFrZUVudHJ5W10pOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgc3dhcAogICAgZHVwCiAgICBsZW4KICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzAgLy8gMAoKZW50ZXJfZm9yX2hlYWRlckAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk5NAogICAgLy8gZW50ZXIocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBlbnRyaWVzOiBTdGFrZUVudHJ5W10pOiB2b2lkIHsKICAgIGR1cAogICAgZGlnIDUKICAgIDwKICAgIGJ6IGVudGVyX2FmdGVyX2ZvckA0CiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGVuY29kaW5nCiAgICBkdXAKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGZvciAobGVuKyh1aW50NjQsdWludDY0LChsZW4rdWludDhbMzJdW10pKVtdKQogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDE4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDIgb2YgKHVpbnQ2NCx1aW50NjQsKGxlbit1aW50OFszMl1bXSkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzMgogICAgKgogICAgcHVzaGludCAyMAogICAgKwogICAgKwogICAgY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZW50ZXJfZm9yX2hlYWRlckAxCgplbnRlcl9hZnRlcl9mb3JANDoKICAgIHBvcG4gMgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5OTQKICAgIC8vIGVudGVyKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgZW50cmllczogU3Rha2VFbnRyeVtdKTogdm9pZCB7CiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvdHlwZXMudHM6OlN0YWtlRW50cnk+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTk1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIEVSUl9HQVRFX0lEX1NFVCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDE3IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBFUlJfR0FURV9JRF9TRVQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZW50ZXJfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOkdJU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6R0lTVAoKZW50ZXJfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTk2CiAgICAvLyB0aGlzLmNyZWF0ZVBvb2xFbnRyaWVzKHBheW1lbnQsIGVudHJpZXMsIFtdKQogICAgYnl0ZWMgNSAvLyAweDAwMDAKICAgIGNhbGxzdWIgY3JlYXRlUG9vbEVudHJpZXMKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk5NAogICAgLy8gZW50ZXIocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBlbnRyaWVzOiBTdGFrZUVudHJ5W10pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnN0YXJ0RGlzYnVyc2VtZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKc3RhcnREaXNidXJzZW1lbnQ6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjk5OQogICAgLy8gc3RhcnREaXNidXJzZW1lbnQocmV3YXJkSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwMDAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfUE9PTF9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5pc0xpdmUKICAgIGJueiBzdGFydERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6UE5MViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQTkxWCgpzdGFydERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDAxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZXdhcmRzKHJld2FyZElEKS5leGlzdHMsIEVSUl9SRVdBUkRfTk9UX0ZPVU5EKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gcmV3YXJkcyA9IEJveE1hcDx1aW50NjQsIFJld2FyZD4oeyBrZXlQcmVmaXg6IFBvb2xCb3hQcmVmaXhSZXdhcmRzIH0pCiAgICBieXRlYyAyMiAvLyAiciIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmV3YXJkcyhyZXdhcmRJRCkuZXhpc3RzLCBFUlJfUkVXQVJEX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN0YXJ0RGlzYnVyc2VtZW50X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyNiAvLyAiRVJSOlJORkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Uk5GRAoKc3RhcnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAwMwogICAgLy8gY29uc3QgeyBwaGFzZSwgaW50ZXJ2YWwsIGxhc3REaXNidXJzZW1lbnRUaW1lc3RhbXAsIGV4cGlyYXRpb24gfSA9IHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUKICAgIGR1cG4gMgogICAgcHVzaGludCA5OQogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBkaWcgMQogICAgcHVzaGludCAxMjQKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA2CiAgICBzd2FwCiAgICBwdXNoaW50IDE3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDA1CiAgICAvLyBsb2dnZWRBc3NlcnQocGhhc2UgPT09IERpc2J1cnNlbWVudFBoYXNlSWRsZSwgRVJSX1JFV0FSRF9BTFJFQURZX0lOX0RJU0JVUlNFTUVOVCkKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBieXRlY18zIC8vIDB4MDAKICAgID09CiAgICBibnogc3RhcnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOlJBSUQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UkFJRAoKc3RhcnREaXNidXJzZW1lbnRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyByZXR1cm4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtICgoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtIHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUpICUgaW50ZXJ2YWwpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDEyIC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyByZXR1cm4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtICgoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtIHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUpICUgaW50ZXJ2YWwpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLQogICAgdW5jb3ZlciA1CiAgICAlCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gcmV0dXJuIGxhdGVzdFdpbmRvd1N0YXJ0ICE9PSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wICYmIGxhc3QgPCBsYXRlc3RXaW5kb3dTdGFydAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgIT0KICAgIGJ6IHN0YXJ0RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMTUKICAgIGRpZyA0CiAgICBkaWcgNAogICAgPAogICAgYnogc3RhcnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAxNQogICAgaW50Y18xIC8vIDEKCnN0YXJ0RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudmFsaWRXaW5kb3coaW50ZXJ2YWwsIGxhc3REaXNidXJzZW1lbnRUaW1lc3RhbXApLCBFUlJfRElTVFJJQlVUSU9OX1dJTkRPV19OT1RfT1BFTikKICAgIGJueiBzdGFydERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6RFdOTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpEV05PCgpzdGFydERpc2J1cnNlbWVudF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDA5CiAgICAvLyBgJHt0aGlzLnRpdGxlLnZhbHVlfSAtIFJld2FyZHNgLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHRpdGxlID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5VGl0bGUgfSkKICAgIGJ5dGVjIDI5IC8vICJ0aXRsZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDA5CiAgICAvLyBgJHt0aGlzLnRpdGxlLnZhbHVlfSAtIFJld2FyZHNgLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hieXRlcyAiIC0gUmV3YXJkcyIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwMTEKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBleHBpcmF0aW9uCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICB1bmNvdmVyIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1OTIKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkucmV3YXJkcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1OTIKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkucmV3YXJkcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTkyCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnJld2FyZHMpCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIGNvbnN0IHJld2FyZE1CUjogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIEJ5dGVzKHRpdGxlKS5sZW5ndGgpCiAgICBkaWcgMgogICAgbGVuCiAgICBwdXNoaW50IDQwMAogICAgZGlnIDEKICAgICoKICAgIHB1c2hpbnQgNDE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIHJlY2VpdmVyOiByZXdhcmRzQXBwLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYwMC02MDkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHRpdGxlLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICcnLAogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTk1LTU5OAogICAgLy8gY29uc3QgbWJyUGF5bWVudCA9IGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiByZXdhcmRzQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogcmV3YXJkTUJSLAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2MDAtNjA5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgbWJyUGF5bWVudCwKICAgIC8vICAgICB0aXRsZSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICAnJywKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2MDQKICAgIC8vIHRpdGxlLAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjA2CiAgICAvLyBleHBpcmF0aW9uLAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYwMC02MDkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHRpdGxlLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICcnLAogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDFjOWViYmRiIC8vIG1ldGhvZCAiY3JlYXRlRGlzYnVyc2VtZW50KHBheSxzdHJpbmcsdWludDY0LHVpbnQ2NCxzdHJpbmcpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjA3CiAgICAvLyAnJywKICAgIGJ5dGVjIDUgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYwMC02MDkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBtYnJQYXltZW50LAogICAgLy8gICAgIHRpdGxlLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgICcnLAogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDE0CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnF1YWxpZmllZFN0YWtlcnMgPSAwCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgZGlnIDQKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAxNQogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5xdWFsaWZpZWRTdGFrZSA9IDAKICAgIGR1cAogICAgcHVzaGludCA0MQogICAgZGlnIDQKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAxNgogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5yb3lhbHR5QW1vdW50ID0gMAogICAgZHVwCiAgICBwdXNoaW50IDQ5CiAgICB1bmNvdmVyIDQKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAxNwogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5waGFzZSA9IERpc2J1cnNlbWVudFBoYXNlUHJlcGFyYXRpb24KICAgIGR1cAogICAgcHVzaGludCA5OQogICAgYnl0ZWMgNyAvLyAweDBhCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwMTgKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuZGlzYnVyc2VtZW50Q3Vyc29yID0gMSAvLyBFbnRyeSBJRHMgc3RhcnQgYXQgMQogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDEwMAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwMTkKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuYWN0aXZlRGlzYnVyc2VtZW50SUQgPSBkaXNidXJzZW1lbnRJRAogICAgZHVwCiAgICBwdXNoaW50IDEwOAogICAgdW5jb3ZlciAzCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwMjAKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuYWN0aXZlRGlzYnVyc2VtZW50Um91bmRTdGFydCA9IEdsb2JhbC5yb3VuZAogICAgZ2xvYmFsIFJvdW5kCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCAxMTYKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDIxCiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLmxhc3REaXNidXJzZW1lbnRUaW1lc3RhbXAgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpdG9iCiAgICBwdXNoaW50IDEyNAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5OTkKICAgIC8vIHN0YXJ0RGlzYnVyc2VtZW50KHJld2FyZElEOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnN0YXJ0RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMTU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzdGFydERpc2J1cnNlbWVudF9ib29sX21lcmdlQDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVbcm91dGluZ10oKSAtPiB2b2lkOgpyYWZmbGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAyNAogICAgLy8gcmFmZmxlKHJld2FyZElEOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGUKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmRpc2J1cnNlUmV3YXJkc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmRpc2J1cnNlUmV3YXJkczoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNjUKICAgIC8vIGRpc2J1cnNlUmV3YXJkcyhyZXdhcmRJRDogdWludDY0LCBpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmV3YXJkcyhyZXdhcmRJRCkuZXhpc3RzLCBFUlJfUkVXQVJEX05PVF9GT1VORCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIHJld2FyZHMgPSBCb3hNYXA8dWludDY0LCBSZXdhcmQ+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4UmV3YXJkcyB9KQogICAgYnl0ZWMgMjIgLy8gInIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJld2FyZHMocmV3YXJkSUQpLmV4aXN0cywgRVJSX1JFV0FSRF9OT1RfRk9VTkQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI2IC8vICJFUlI6Uk5GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTkZECgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA2OQogICAgLy8gY29uc3QgeyBwaGFzZSwgZGlzdHJpYnV0aW9uLCB3aW5uaW5nVGlja2V0cyB9ID0gY2xvbmUodGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZSkKICAgIGRpZyAxCiAgICBkdXAKICAgIHB1c2hpbnQgOTkKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ1cnkgMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDcxCiAgICAvLyBpZiAocGhhc2UgIT09IERpc2J1cnNlbWVudFBoYXNlUHJlcGFyYXRpb24pIHsKICAgIGJ5dGVjIDcgLy8gMHgwYQogICAgIT0KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDcyCiAgICAvLyBsb2dnZWRBc3NlcnQocGhhc2UgPT09IERpc2J1cnNlbWVudFBoYXNlQWxsb2NhdGlvbiwgRVJSX05PVF9SRUFEWV9UT19ESVNCVVJTRSkKICAgIGR1cAogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIGJueiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA3CiAgICBwdXNoYnl0ZXMgIkVSUjpOUlREIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5SVEQKCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA3MQogICAgLy8gaWYgKHBoYXNlICE9PSBEaXNidXJzZW1lbnRQaGFzZVByZXBhcmF0aW9uKSB7CiAgICBieXRlYyA3IC8vIDB4MGEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDc1CiAgICAvLyBpZiAocGhhc2UgPT09IERpc2J1cnNlbWVudFBoYXNlUHJlcGFyYXRpb24pIHsKICAgID09CiAgICBieiBkaXNidXJzZVJld2FyZHNfZWxzZV9ib2R5QDkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI2MQogICAgLy8gY29uc3QgcmV3YXJkID0gY2xvbmUodGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZSkKICAgIGR1cG4gMgogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgMgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjEtMjYyCiAgICAvLyBjb25zdCByZXdhcmQgPSBjbG9uZSh0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlKQogICAgLy8gY29uc3QgeyBkaXNidXJzZW1lbnRDdXJzb3IsIGRpc3RyaWJ1dGlvbiwgcmF0ZSwgYXNzZXQsIGFjdGl2ZURpc2J1cnNlbWVudElELCB3aW5uZXJDb3VudCB9ID0gcmV3YXJkCiAgICBkdXAKICAgIHB1c2hpbnQgMTAwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIGNvbnN0IHsgZGlzYnVyc2VtZW50Q3Vyc29yLCBkaXN0cmlidXRpb24sIHJhdGUsIGFzc2V0LCBhY3RpdmVEaXNidXJzZW1lbnRJRCwgd2lubmVyQ291bnQgfSA9IHJld2FyZAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjYxLTI2MgogICAgLy8gY29uc3QgcmV3YXJkID0gY2xvbmUodGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZSkKICAgIC8vIGNvbnN0IHsgZGlzYnVyc2VtZW50Q3Vyc29yLCBkaXN0cmlidXRpb24sIHJhdGUsIGFzc2V0LCBhY3RpdmVEaXNidXJzZW1lbnRJRCwgd2lubmVyQ291bnQgfSA9IHJld2FyZAogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidXJ5IDIwCiAgICBkdXAKICAgIHB1c2hpbnQgOQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyBjb25zdCB7IGRpc2J1cnNlbWVudEN1cnNvciwgZGlzdHJpYnV0aW9uLCByYXRlLCBhc3NldCwgYWN0aXZlRGlzYnVyc2VtZW50SUQsIHdpbm5lckNvdW50IH0gPSByZXdhcmQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjEtMjYyCiAgICAvLyBjb25zdCByZXdhcmQgPSBjbG9uZSh0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlKQogICAgLy8gY29uc3QgeyBkaXNidXJzZW1lbnRDdXJzb3IsIGRpc3RyaWJ1dGlvbiwgcmF0ZSwgYXNzZXQsIGFjdGl2ZURpc2J1cnNlbWVudElELCB3aW5uZXJDb3VudCB9ID0gcmV3YXJkCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIGNvbnN0IHsgZGlzYnVyc2VtZW50Q3Vyc29yLCBkaXN0cmlidXRpb24sIHJhdGUsIGFzc2V0LCBhY3RpdmVEaXNidXJzZW1lbnRJRCwgd2lubmVyQ291bnQgfSA9IHJld2FyZAogICAgYnRvaQogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI2MS0yNjIKICAgIC8vIGNvbnN0IHJld2FyZCA9IGNsb25lKHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUpCiAgICAvLyBjb25zdCB7IGRpc2J1cnNlbWVudEN1cnNvciwgZGlzdHJpYnV0aW9uLCByYXRlLCBhc3NldCwgYWN0aXZlRGlzYnVyc2VtZW50SUQsIHdpbm5lckNvdW50IH0gPSByZXdhcmQKICAgIGR1cAogICAgcHVzaGludCAxMDgKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnVyeSAyMwogICAgcHVzaGludCA1NwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyBjb25zdCB7IGRpc2J1cnNlbWVudEN1cnNvciwgZGlzdHJpYnV0aW9uLCByYXRlLCBhc3NldCwgYWN0aXZlRGlzYnVyc2VtZW50SUQsIHdpbm5lckNvdW50IH0gPSByZXdhcmQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjMKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjQKICAgIC8vIGxldCB0b3RhbDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjYKICAgIC8vIGlmICgoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KSA+IHRoaXMuZW50cnlJRC52YWx1ZSkgewogICAgZGlnIDgKICAgICsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjYKICAgIC8vIGlmICgoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KSA+IHRoaXMuZW50cnlJRC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDk1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSB0aGlzLmVudHJ5SUQudmFsdWUgLSBkaXNidXJzZW1lbnRDdXJzb3IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHRoaXMuZW50cnlJRC52YWx1ZSAtIGRpc2J1cnNlbWVudEN1cnNvcgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxNwogICAgLQogICAgYnVyeSA4CgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA5NToKICAgIGRpZyAxNgoKZGlzYnVyc2VSZXdhcmRzX3doaWxlX3RvcEA5NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNzAKICAgIC8vIGZvciAobGV0IGlkID0gZGlzYnVyc2VtZW50Q3Vyc29yOyBpZCA8IChkaXNidXJzZW1lbnRDdXJzb3IgKyBpdGVyYXRpb25BbW91bnQpOyBpZCsrKSB7CiAgICBkaWcgMTcKICAgIGRpZyA5CiAgICArCiAgICBkaWcgMQogICAgPgogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDEwOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI3MQogICAgLy8gY29uc3QgeyBkaXNxdWFsaWZpZWQsIHF1YW50aXR5IH0gPSBjbG9uZSh0aGlzLmVudHJpZXMoaWQpLnZhbHVlKQogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDExIC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNzEKICAgIC8vIGNvbnN0IHsgZGlzcXVhbGlmaWVkLCBxdWFudGl0eSB9ID0gY2xvbmUodGhpcy5lbnRyaWVzKGlkKS52YWx1ZSkKICAgIGR1cAogICAgcHVzaGludCA1MAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBzd2FwCiAgICBwdXNoaW50IDQwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNzIKICAgIC8vIGlmIChkaXNxdWFsaWZpZWQpIHsKICAgIGJueiBkaXNidXJzZVJld2FyZHNfYmxvY2tAMTA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyBpZiAodGhpcy50eXBlLnZhbHVlID09PSBQT09MX1NUQUtJTkdfVFlQRV9OT05FKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gdHlwZSA9IEdsb2JhbFN0YXRlPFN0YWtpbmdQb29sU3Rha2luZ1R5cGU+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlUeXBlIH0pCiAgICBieXRlYyA0IC8vICJ0eXBlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gaWYgKHRoaXMudHlwZS52YWx1ZSA9PT0gUE9PTF9TVEFLSU5HX1RZUEVfTk9ORSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgPT0KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19lbHNlX2JvZHlAMTAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTc1CiAgICAvLyByZXR1cm4geyB2YWxpZDogdHJ1ZSwgYmFsYW5jZTogMCB9CiAgICBwdXNoYnl0ZXMgMHg4MDAwMDAwMDAwMDAwMDAwMDAKCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuZ2V0U3Rha2VWYWx1ZUAxMDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyBjb25zdCB7IHZhbGlkIH0gPSB0aGlzLmdldFN0YWtlVmFsdWUoaWQpCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mjc4CiAgICAvLyBpZiAoIXZhbGlkKSB7CiAgICBieiBkaXNidXJzZVJld2FyZHNfYmxvY2tAMTA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjgyCiAgICAvLyBjb3VudCArPSAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gdG90YWwgKz0gcXVhbnRpdHkKICAgIHVuY292ZXIgMgogICAgZGlnIDExCiAgICArCiAgICBjb3ZlciAyCgpkaXNidXJzZVJld2FyZHNfYmxvY2tAMTA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI3MAogICAgLy8gZm9yIChsZXQgaWQgPSBkaXNidXJzZW1lbnRDdXJzb3I7IGlkIDwgKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCk7IGlkKyspIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGRpc2J1cnNlUmV3YXJkc193aGlsZV90b3BAOTYKCmRpc2J1cnNlUmV3YXJkc19lbHNlX2JvZHlAMTAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU3NgogICAgLy8gfSBlbHNlIGlmICh0aGlzLnR5cGUudmFsdWUgPT09IFBPT0xfU1RBS0lOR19UWVBFX0hFQVJUQkVBVCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHR5cGUgPSBHbG9iYWxTdGF0ZTxTdGFraW5nUG9vbFN0YWtpbmdUeXBlPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5VHlwZSB9KQogICAgYnl0ZWMgNCAvLyAidHlwZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIH0gZWxzZSBpZiAodGhpcy50eXBlLnZhbHVlID09PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA3MQogICAgLy8gaWYgKHBoYXNlICE9PSBEaXNidXJzZW1lbnRQaGFzZVByZXBhcmF0aW9uKSB7CiAgICBieXRlYyA3IC8vIDB4MGEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIH0gZWxzZSBpZiAodGhpcy50eXBlLnZhbHVlID09PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQpIHsKICAgID09CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NzcKICAgIC8vIGNvbnN0IHsgYWRkcmVzcywgYXNzZXQgfSA9IHRoaXMuZW50cmllcyhpZCkudmFsdWUKICAgIGRpZyAyMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU3OS01ODIKICAgIC8vIGNvbnN0IGF2ZyA9IGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmdldEhlYXJ0YmVhdEF2ZXJhZ2U+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nLAogICAgLy8gICBhcmdzOiBbYWRkcmVzcywgYXNzZXQsIHRydWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcsCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU3OS01ODIKICAgIC8vIGNvbnN0IGF2ZyA9IGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmdldEhlYXJ0YmVhdEF2ZXJhZ2U+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nLAogICAgLy8gICBhcmdzOiBbYWRkcmVzcywgYXNzZXQsIHRydWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGM2ZmQwY2E1IC8vIG1ldGhvZCAiZ2V0SGVhcnRiZWF0QXZlcmFnZShhZGRyZXNzLHVpbnQ2NCxib29sKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1ODEKICAgIC8vIGFyZ3M6IFthZGRyZXNzLCBhc3NldCwgdHJ1ZV0sCiAgICBieXRlYyAyMSAvLyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU3OS01ODIKICAgIC8vIGNvbnN0IGF2ZyA9IGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmdldEhlYXJ0YmVhdEF2ZXJhZ2U+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nLAogICAgLy8gICBhcmdzOiBbYWRkcmVzcywgYXNzZXQsIHRydWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1ODQKICAgIC8vIHJldHVybiB7IHZhbGlkOiB0cnVlLCBiYWxhbmNlOiBhdmcgfQogICAgaXRvYgogICAgYnl0ZWMgMjEgLy8gMHg4MAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyBjb25zdCB7IHZhbGlkIH0gPSB0aGlzLmdldFN0YWtlVmFsdWUoaWQpCiAgICBiIGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuZ2V0U3Rha2VWYWx1ZUAxMDQKCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDEwMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIHJldHVybiB0aGlzLmNoZWNrQnlJRChpZCkKICAgIGR1cAogICAgY2FsbHN1YiBjaGVja0J5SUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIGNvbnN0IHsgdmFsaWQgfSA9IHRoaXMuZ2V0U3Rha2VWYWx1ZShpZCkKICAgIGIgZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5nZXRTdGFrZVZhbHVlQDEwNAoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDEwODoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gcmV3YXJkLnF1YWxpZmllZFN0YWtlcnMgKz0gY291bnQKICAgIGRpZyA2CiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgICsKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgcmVwbGFjZTIgMzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyODcKICAgIC8vIHJld2FyZC5xdWFsaWZpZWRTdGFrZSArPSB0b3RhbAogICAgZHVwCiAgICBwdXNoaW50IDQxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICArCiAgICBpdG9iCiAgICByZXBsYWNlMiA0MQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI4OQogICAgLy8gaWYgKHRoaXMuZW50cnlJRC52YWx1ZSA9PT0gZGlzYnVyc2VtZW50Q3Vyc29yKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mjg5CiAgICAvLyBpZiAodGhpcy5lbnRyeUlELnZhbHVlID09PSBkaXNidXJzZW1lbnRDdXJzb3IpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTUKICAgID09CiAgICBieiBkaXNidXJzZVJld2FyZHNfZWxzZV9ib2R5QDEyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI5MQogICAgLy8gcmV3YXJkLnBoYXNlID0gRGlzYnVyc2VtZW50UGhhc2VBbGxvY2F0aW9uCiAgICBzd2FwCiAgICBieXRlYyAxMCAvLyAweDE0CiAgICByZXBsYWNlMiA5OQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI5MgogICAgLy8gcmV3YXJkLmRpc2J1cnNlbWVudEN1cnNvciA9IDEgLy8gRW50cnkgSURzIHN0YXJ0IGF0IDEKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICByZXBsYWNlMiAxMDAKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gbGV0IGFsbG9jYXRpb25Db3VudCA9IHJld2FyZC5xdWFsaWZpZWRTdGFrZXJzCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gaWYgKGRpc3RyaWJ1dGlvbiA9PT0gRGlzdHJpYnV0aW9uVHlwZVNodWZmbGUpIHsKICAgIGRpZyAyMQogICAgYnl0ZWMgMzIgLy8gMHgyOAogICAgPT0KICAgIGJueiBkaXNidXJzZVJld2FyZHNfaWZfYm9keUAxMTAKICAgIGJ1cnkgMQogICAgZHVwCgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnJld2FyZHMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnJld2FyZHMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYxMwogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5yZXdhcmRzKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9uQ291bnQKICAgIGludGMgNiAvLyAyNTMwMAogICAgKgogICAgZHVwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyBpZiAobWJyQW1vdW50ID09PSAwKSB7CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmZ1bmRSZXdhcmRNYnJDcmVkaXRzQDExMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYyMC02MjkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmZ1bmRNYnJDcmVkaXRzPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgZGlzYnVyc2VtZW50SUQsCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiByZXdhcmRzQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudCwKICAgIC8vICAgICB9KSwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjI1CiAgICAvLyByZWNlaXZlcjogcmV3YXJkc0FwcC5hZGRyZXNzLAogICAgZGlnIDcKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEzCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYyNC02MjcKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiByZXdhcmRzQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50LAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjIwLTYyOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuZnVuZE1ickNyZWRpdHM+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBkaXNidXJzZW1lbnRJRCwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHJld2FyZHNBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50LAogICAgLy8gICAgIH0pLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2NjYxMjA1YSAvLyBtZXRob2QgImZ1bmRNYnJDcmVkaXRzKHVpbnQ2NCxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMjEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5mdW5kUmV3YXJkTWJyQ3JlZGl0c0AxMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjE3CiAgICAvLyBpZiAoZGlzdHJpYnV0aW9uID09PSBEaXN0cmlidXRpb25UeXBlRmxhdCkgewogICAgZGlnIDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyByZXdhcmQucGhhc2UgPSBEaXNidXJzZW1lbnRQaGFzZUFsbG9jYXRpb24KICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMTcKICAgIC8vIGlmIChkaXN0cmlidXRpb24gPT09IERpc3RyaWJ1dGlvblR5cGVGbGF0KSB7CiAgICA9PQogICAgYm56IGRpc2J1cnNlUmV3YXJkc19pZl9ib2R5QDExNAogICAgcG9wCiAgICBzd2FwCgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBhbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGFraXRhUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzcgLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBhbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjIzCiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBibnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMTE3CiAgICBwb3AKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnBheUFraXRhUm95YWx0eUAxMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwNQogICAgLy8gcmV3YXJkLnJveWFsdHlBbW91bnQgPSB0aGlzLnBheUFraXRhUm95YWx0eSgKICAgIC8vICAgZGlzdHJpYnV0aW9uLAogICAgLy8gICByYXRlLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgcmV3YXJkLnF1YWxpZmllZFN0YWtlcnMKICAgIC8vICkKICAgIGl0b2IKICAgIHJlcGxhY2UyIDQ5CgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzExCiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlID0gY2xvbmUocmV3YXJkKQogICAgZGlnIDEKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDY1CiAgICAvLyBkaXNidXJzZVJld2FyZHMocmV3YXJkSUQ6IHVpbnQ2NCwgaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDExNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMjgKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZGlnIDIKICAgIGJueiBkaXNidXJzZVJld2FyZHNfZWxzZV9ib2R5QDExOQogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMjktMjM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjIzMQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMjktMjMzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjI5LTIzNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwNQogICAgLy8gcmV3YXJkLnJveWFsdHlBbW91bnQgPSB0aGlzLnBheUFraXRhUm95YWx0eSgKICAgIC8vICAgZGlzdHJpYnV0aW9uLAogICAgLy8gICByYXRlLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgcmV3YXJkLnF1YWxpZmllZFN0YWtlcnMKICAgIC8vICkKICAgIGIgZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5wYXlBa2l0YVJveWFsdHlAMTIzCgpkaXNidXJzZVJld2FyZHNfZWxzZV9ib2R5QDExOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBFUlJfREFPX05PVF9PUFRFRF9JTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjM2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgRVJSX0RBT19OT1RfT1BURURfSU4pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEyMQogICAgcHVzaGJ5dGVzICJFUlI6RE5PSSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpETk9JCgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfYXNzZXJ0QDEyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMzgtMjQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjQwCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDggLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNDAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjM4LTI0MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjIzOC0yNDQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwNQogICAgLy8gcmV3YXJkLnJveWFsdHlBbW91bnQgPSB0aGlzLnBheUFraXRhUm95YWx0eSgKICAgIC8vICAgZGlzdHJpYnV0aW9uLAogICAgLy8gICByYXRlLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgcmV3YXJkLnF1YWxpZmllZFN0YWtlcnMKICAgIC8vICkKICAgIGIgZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5wYXlBa2l0YVJveWFsdHlAMTIzCgpkaXNidXJzZVJld2FyZHNfaWZfYm9keUAxMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyBhbW91bnQgKj0gcXVhbGlmaWVkU3Rha2VycwogICAgdW5jb3ZlciAyCiAgICAqCiAgICBiIGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDExNQoKZGlzYnVyc2VSZXdhcmRzX2lmX2JvZHlAMTEwOgogICAgc3dhcAogICAgYiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMTEKCmRpc2J1cnNlUmV3YXJkc19lbHNlX2JvZHlAMTI0OgogICAgcG9wCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjMwOAogICAgLy8gcmV3YXJkLmRpc2J1cnNlbWVudEN1cnNvciArPSBpdGVyYXRpb25BbW91bnQKICAgIGR1cAogICAgcHVzaGludCAxMDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgcmVwbGFjZTIgMTAwCiAgICBiIGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDEyNQoKZGlzYnVyc2VSZXdhcmRzX2Vsc2VfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNzkKICAgIC8vIGNhc2UgRGlzdHJpYnV0aW9uVHlwZVBlcmNlbnRhZ2U6IHsKICAgIGRpZyAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNzEKICAgIC8vIGlmIChwaGFzZSAhPT0gRGlzYnVyc2VtZW50UGhhc2VQcmVwYXJhdGlvbikgewogICAgYnl0ZWMgNyAvLyAweDBhCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA3OQogICAgLy8gY2FzZSBEaXN0cmlidXRpb25UeXBlUGVyY2VudGFnZTogewogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDc5LTEwODIKICAgIC8vIGNhc2UgRGlzdHJpYnV0aW9uVHlwZVBlcmNlbnRhZ2U6IHsKICAgIC8vICAgdGhpcy5jcmVhdGVQZXJjZW50YWdlRGlzYnVyc2VtZW50KHJld2FyZElELCBpdGVyYXRpb25BbW91bnQpCiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyB9ID0gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMTAwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSAxNAogICAgZHVwCiAgICBwdXNoaW50IDEwOAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICBkdXAKICAgIHB1c2hpbnQgNDEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSAxMQogICAgZHVwCiAgICBwdXNoaW50IDQ5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgOQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBpZiAoKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCkgPiB0aGlzLmVudHJ5SUQudmFsdWUpIHsKICAgIGRpZyA2CiAgICArCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBpZiAoKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCkgPiB0aGlzLmVudHJ5SUQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA4MwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjMyNQogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gdGhpcy5lbnRyeUlELnZhbHVlIC0gZGlzYnVyc2VtZW50Q3Vyc29yCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSB0aGlzLmVudHJ5SUQudmFsdWUgLSBkaXNidXJzZW1lbnRDdXJzb3IKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTUKICAgIC0KICAgIGJ1cnkgNgoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAODM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBjb25zdCBhY3R1YWxBbW91bnQ6IHVpbnQ2NCA9IGFtb3VudCAtIHJveWFsdHlBbW91bnQKICAgIHN3YXAKICAgIC0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozMjkKICAgIC8vIGxldCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSA9IFtdCiAgICBieXRlYyA1IC8vIDB4MDAwMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjMzMAogICAgLy8gbGV0IHN1bTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIGRpZyAxNQoKZGlzYnVyc2VSZXdhcmRzX3doaWxlX3RvcEA4NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozMzIKICAgIC8vIGZvciAobGV0IGlkID0gZGlzYnVyc2VtZW50Q3Vyc29yOyBpZCA8IChkaXNidXJzZW1lbnRDdXJzb3IgKyBpdGVyYXRpb25BbW91bnQpOyBpZCsrKSB7CiAgICBkaWcgMTYKICAgIGRpZyA4CiAgICArCiAgICBkdXAKICAgIGRpZyAyCiAgICA+CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfd2hpbGVAODkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gY29uc3QgeyBkaXNxdWFsaWZpZWQsIHF1YW50aXR5LCBhZGRyZXNzIH0gPSB0aGlzLmVudHJpZXMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMTEgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIGNvbnN0IHsgZGlzcXVhbGlmaWVkLCBxdWFudGl0eSwgYWRkcmVzcyB9ID0gdGhpcy5lbnRyaWVzKGlkKS52YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDUwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGRpZyAxCiAgICBwdXNoaW50IDQwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgMTMKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBwdXNoaW50IDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnVyeSAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjMzNAogICAgLy8gaWYgKGRpc3F1YWxpZmllZCkgewogICAgYm56IGRpc2J1cnNlUmV3YXJkc19ibG9ja0A4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTMKICAgIC8vIGFzc2VydChhIDwgYiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRV9PRl9BUkdTKQogICAgZGlnIDEwCiAgICBkdXAKICAgIGRpZyAxNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICA8CiAgICBhc3NlcnQgLy8gSVBPQQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTQKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgRElWSVNPUiksIGIpCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBtdWx3CiAgICB1bmNvdmVyIDIKICAgIGRpdncKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDUKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGFsbG9jYXRpb25zLnB1c2goeyBhZGRyZXNzLCBhbW91bnQ6IGluZGl2aWR1YWxBbW91bnQgfSkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDI2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGFsbG9jYXRpb25zLnB1c2goeyBhZGRyZXNzLCBhbW91bnQ6IGluZGl2aWR1YWxBbW91bnQgfSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBzdW0gKz0gaW5kaXZpZHVhbEFtb3VudAogICAgdW5jb3ZlciA0CiAgICArCiAgICBjb3ZlciAzCgpkaXNidXJzZVJld2FyZHNfYmxvY2tAODg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyBmb3IgKGxldCBpZCA9IGRpc2J1cnNlbWVudEN1cnNvcjsgaWQgPCAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KTsgaWQrKykgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZGlzYnVyc2VSZXdhcmRzX3doaWxlX3RvcEA4NAoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDg5OgogICAgYnVyeSAxCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5kaXNidXJzZW1lbnRDdXJzb3IgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBkaWcgNQogICAgZHVwCiAgICBwdXNoaW50IDEwMAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgOAogICAgKwogICAgaXRvYgogICAgcHVzaGludCAxMDAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzQ1CiAgICAvLyB0aGlzLmNyZWF0ZVJld2FyZEFsbG9jYXRpb25zKGFjdGl2ZURpc2J1cnNlbWVudElELCBhc3NldCwgYWxsb2NhdGlvbnMsIHN1bSkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBjcmVhdGVSZXdhcmRBbGxvY2F0aW9ucwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBpZiAodGhpcy5lbnRyeUlELnZhbHVlID09PSAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gaWYgKHRoaXMuZW50cnlJRC52YWx1ZSA9PT0gKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUucGhhc2UgPSBEaXNidXJzZW1lbnRQaGFzZUZpbmFsaXphdGlvbgogICAgZHVwbiAyCiAgICBwdXNoaW50IDk5CiAgICBieXRlYyAxNCAvLyAweDFlCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5kaXNidXJzZW1lbnRDdXJzb3IgPSAxIC8vIEVudHJ5IElEcyBzdGFydCBhdCAxCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgcHVzaGludCAxMDAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBiIGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDMyCgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDgzCiAgICAvLyBjYXNlIERpc3RyaWJ1dGlvblR5cGVGbGF0OiB7CiAgICBkaWcgMTcKICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA4My0xMDg2CiAgICAvLyBjYXNlIERpc3RyaWJ1dGlvblR5cGVGbGF0OiB7CiAgICAvLyAgIHRoaXMuY3JlYXRlRmxhdERpc2J1cnNlbWVudChyZXdhcmRJRCwgaXRlcmF0aW9uQW1vdW50KQogICAgLy8gICBicmVhawogICAgLy8gfQogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gfSA9IHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUKICAgIGR1cG4gMgogICAgcHVzaGludCAxMDgKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDEwMAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDEzCiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDkKICAgIGR1cAogICAgcHVzaGludCA0OQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMQogICAgcHVzaGludCA5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IChxdWFsaWZpZWRTdGFrZXJzICogYW1vdW50KSAtIHJveWFsdHlBbW91bnQKICAgIGRpZyAyCiAgICAqCiAgICBzd2FwCiAgICAtCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBsZXQgYWRqdXN0ZWRBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyBpZiAocXVhbGlmaWVkU3Rha2VycyA+IDApIHsKICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDY5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBhZGp1c3RlZEFtb3VudCA9IHRvdGFsIC8gcXVhbGlmaWVkU3Rha2VycwogICAgZHVwCiAgICBkaWcgOQogICAgLwogICAgYnVyeSAxOAoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VANjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyB0aGlzLmFzc2VydFJld2FyZEJhbGFuY2UoYXNzZXQsIHRvdGFsKQogICAgZGlnIDEKICAgIHN3YXAKICAgIGNhbGxzdWIgYXNzZXJ0UmV3YXJkQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gaWYgKChkaXNidXJzZW1lbnRDdXJzb3IgKyBpdGVyYXRpb25BbW91bnQpID4gdGhpcy5lbnRyeUlELnZhbHVlKSB7CiAgICBkaWcgMTIKICAgIGRpZyA0CiAgICArCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzcxCiAgICAvLyBpZiAoKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCkgPiB0aGlzLmVudHJ5SUQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA3MQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM3MgogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gdGhpcy5lbnRyeUlELnZhbHVlIC0gZGlzYnVyc2VtZW50Q3Vyc29yCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSB0aGlzLmVudHJ5SUQudmFsdWUgLSBkaXNidXJzZW1lbnRDdXJzb3IKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTMKICAgIC0KICAgIGJ1cnkgNAoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VANzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mzc1CiAgICAvLyBsZXQgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10gPSBbXQogICAgYnl0ZWMgNSAvLyAweDAwMDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozNzYKICAgIC8vIGxldCBzdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBkaWcgMTQKCmRpc2J1cnNlUmV3YXJkc193aGlsZV90b3BANzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyBmb3IgKGxldCBpZCA9IGRpc2J1cnNlbWVudEN1cnNvcjsgaWQgPCAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KTsgaWQrKykgewogICAgZGlnIDE1CiAgICBkaWcgNwogICAgKwogICAgZHVwCiAgICBkaWcgMgogICAgPgogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDc3CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGNvbnN0IHsgZGlzcXVhbGlmaWVkLCBhZGRyZXNzIH0gPSB0aGlzLmVudHJpZXMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMTEgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGNvbnN0IHsgZGlzcXVhbGlmaWVkLCBhZGRyZXNzIH0gPSB0aGlzLmVudHJpZXMoaWQpLnZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNTAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidXJ5IDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzgwCiAgICAvLyBpZiAoZGlzcXVhbGlmaWVkKSB7CiAgICBibnogZGlzYnVyc2VSZXdhcmRzX2Jsb2NrQDc2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBhbGxvY2F0aW9ucy5wdXNoKHsgYWRkcmVzcywgYW1vdW50OiBhZGp1c3RlZEFtb3VudCB9KQogICAgZGlnIDE5CiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyAyNQogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBhbGxvY2F0aW9ucy5wdXNoKHsgYWRkcmVzcywgYW1vdW50OiBhZGp1c3RlZEFtb3VudCB9KQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozODUKICAgIC8vIHN1bSArPSBhZGp1c3RlZEFtb3VudAogICAgdW5jb3ZlciA0CiAgICArCiAgICBjb3ZlciAzCgpkaXNidXJzZVJld2FyZHNfYmxvY2tANzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyBmb3IgKGxldCBpZCA9IGRpc2J1cnNlbWVudEN1cnNvcjsgaWQgPCAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KTsgaWQrKykgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZGlzYnVyc2VSZXdhcmRzX3doaWxlX3RvcEA3MgoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDc3OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLmRpc2J1cnNlbWVudEN1cnNvciA9IG5ld0N1cnNvclZhbHVlCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyA2CiAgICBwdXNoaW50IDEwMAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gdGhpcy5jcmVhdGVSZXdhcmRBbGxvY2F0aW9ucyhhY3RpdmVEaXNidXJzZW1lbnRJRCwgYXNzZXQsIGFsbG9jYXRpb25zLCBzdW0pCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgY3JlYXRlUmV3YXJkQWxsb2NhdGlvbnMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjM5MgogICAgLy8gaWYgKHRoaXMuZW50cnlJRC52YWx1ZSA9PT0gbmV3Q3Vyc29yVmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIGlmICh0aGlzLmVudHJ5SUQudmFsdWUgPT09IG5ld0N1cnNvclZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnBoYXNlID0gRGlzYnVyc2VtZW50UGhhc2VGaW5hbGl6YXRpb24KICAgIGR1cG4gMgogICAgcHVzaGludCA5OQogICAgYnl0ZWMgMTQgLy8gMHgxZQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czozOTQKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuZGlzYnVyc2VtZW50Q3Vyc29yID0gMSAvLyBFbnRyeSBJRHMgc3RhcnQgYXQgMQogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIHB1c2hpbnQgMTAwCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzMgoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA4NwogICAgLy8gY2FzZSBEaXN0cmlidXRpb25UeXBlRXZlbjogewogICAgZGlnIDE3CiAgICBieXRlYyAxNCAvLyAweDFlCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwODctMTA5MAogICAgLy8gY2FzZSBEaXN0cmlidXRpb25UeXBlRXZlbjogewogICAgLy8gICB0aGlzLmNyZWF0ZUV2ZW5EaXNidXJzZW1lbnQocmV3YXJkSUQsIGl0ZXJhdGlvbkFtb3VudCkKICAgIC8vICAgYnJlYWsKICAgIC8vIH0KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDIxCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIH0gPSB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlCiAgICBkdXBuIDIKICAgIHB1c2hpbnQgMTA4CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAxMDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDE0CiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA5CiAgICBkdXAKICAgIHB1c2hpbnQgNDkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQwOAogICAgLy8gY29uc3QgYWN0dWFsU3VtOiB1aW50NjQgPSByYXRlIC0gcm95YWx0eUFtb3VudAogICAgc3dhcAogICAgLQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDA5CiAgICAvLyB0aGlzLmFzc2VydFJld2FyZEJhbGFuY2UoYXNzZXQsIGFjdHVhbFN1bSkKICAgIGNhbGxzdWIgYXNzZXJ0UmV3YXJkQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gaWYgKChkaXNidXJzZW1lbnRDdXJzb3IgKyBpdGVyYXRpb25BbW91bnQpID4gdGhpcy5lbnRyeUlELnZhbHVlKSB7CiAgICBkaWcgNQogICAgKwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gaWYgKChkaXNidXJzZW1lbnRDdXJzb3IgKyBpdGVyYXRpb25BbW91bnQpID4gdGhpcy5lbnRyeUlELnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VANTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHRoaXMuZW50cnlJRC52YWx1ZSAtIGRpc2J1cnNlbWVudEN1cnNvcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gdGhpcy5lbnRyeUlELnZhbHVlIC0gZGlzYnVyc2VtZW50Q3Vyc29yCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDE0CiAgICAtCiAgICBidXJ5IDUKCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDU3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQxNQogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSBhY3R1YWxTdW0gLyBxdWFsaWZpZWRTdGFrZXJzCiAgICBkaWcgOAogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQxNgogICAgLy8gbGV0IGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdID0gW10KICAgIGJ5dGVjIDUgLy8gMHgwMDAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDE3CiAgICAvLyBsZXQgYWxsb2NTdW06IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCiAgICBkaWcgMTUKCmRpc2J1cnNlUmV3YXJkc193aGlsZV90b3BANTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDE4CiAgICAvLyBmb3IgKGxldCBpZCA9IGRpc2J1cnNlbWVudEN1cnNvcjsgaWQgPCAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KTsgaWQrKykgewogICAgZGlnIDE2CiAgICBkaWcgOAogICAgKwogICAgZHVwCiAgICBkaWcgMgogICAgPgogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDYzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGNvbnN0IHsgZGlzcXVhbGlmaWVkLCBhZGRyZXNzIH0gPSB0aGlzLmVudHJpZXMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMTEgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGNvbnN0IHsgZGlzcXVhbGlmaWVkLCBhZGRyZXNzIH0gPSB0aGlzLmVudHJpZXMoaWQpLnZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNTAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hpbnQgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidXJ5IDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBpZiAoZGlzcXVhbGlmaWVkKSB7CiAgICBibnogZGlzYnVyc2VSZXdhcmRzX2Jsb2NrQDYyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBhbGxvY2F0aW9ucy5wdXNoKHsgYWRkcmVzcywgYW1vdW50IH0pCiAgICBkaWcgMQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMjYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQyNAogICAgLy8gYWxsb2NhdGlvbnMucHVzaCh7IGFkZHJlc3MsIGFtb3VudCB9KQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIGFsbG9jU3VtICs9IGFtb3VudAogICAgdW5jb3ZlciA1CiAgICArCiAgICBjb3ZlciA0CgpkaXNidXJzZVJld2FyZHNfYmxvY2tANjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDE4CiAgICAvLyBmb3IgKGxldCBpZCA9IGRpc2J1cnNlbWVudEN1cnNvcjsgaWQgPCAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KTsgaWQrKykgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZGlzYnVyc2VSZXdhcmRzX3doaWxlX3RvcEA1OAoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX3doaWxlQDYzOgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MjkKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuZGlzYnVyc2VtZW50Q3Vyc29yID0gbmV3Q3Vyc29yVmFsdWUKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDYKICAgIHB1c2hpbnQgMTAwCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyB0aGlzLmNyZWF0ZVJld2FyZEFsbG9jYXRpb25zKGFjdGl2ZURpc2J1cnNlbWVudElELCBhc3NldCwgYWxsb2NhdGlvbnMsIGFsbG9jU3VtKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIGNyZWF0ZVJld2FyZEFsbG9jYXRpb25zCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0MzIKICAgIC8vIGlmICh0aGlzLmVudHJ5SUQudmFsdWUgPT09IG5ld0N1cnNvclZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBpZiAodGhpcy5lbnRyeUlELnZhbHVlID09PSBuZXdDdXJzb3JWYWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5waGFzZSA9IERpc2J1cnNlbWVudFBoYXNlRmluYWxpemF0aW9uCiAgICBkdXBuIDIKICAgIHB1c2hpbnQgOTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDg3CiAgICAvLyBjYXNlIERpc3RyaWJ1dGlvblR5cGVFdmVuOiB7CiAgICBieXRlYyAxNCAvLyAweDFlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDMzCiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnBoYXNlID0gRGlzYnVyc2VtZW50UGhhc2VGaW5hbGl6YXRpb24KICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDM0CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLmRpc2J1cnNlbWVudEN1cnNvciA9IDEgLy8gRW50cnkgSURzIHN0YXJ0IGF0IDEKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBwdXNoaW50IDEwMAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGIgZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMzIKCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwOTEKICAgIC8vIGNhc2UgRGlzdHJpYnV0aW9uVHlwZVNodWZmbGU6IHsKICAgIGRpZyAxNwogICAgYnl0ZWMgMzIgLy8gMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDkxLTEwOTgKICAgIC8vIGNhc2UgRGlzdHJpYnV0aW9uVHlwZVNodWZmbGU6IHsKICAgIC8vICAgaWYgKHdpbm5pbmdUaWNrZXRzLmxlbmd0aCA9PT0gMCkgewogICAgLy8gICAgIHRoaXMucmFmZmxlKHJld2FyZElEKQogICAgLy8gICB9IGVsc2UgewogICAgLy8gICAgIHRoaXMuY3JlYXRlU2h1ZmZsZURpc2J1cnNlbWVudChyZXdhcmRJRCwgaXRlcmF0aW9uQW1vdW50KQogICAgLy8gICB9CiAgICAvLyAgIGJyZWFrCiAgICAvLyB9CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwOTIKICAgIC8vIGlmICh3aW5uaW5nVGlja2V0cy5sZW5ndGggPT09IDApIHsKICAgIGRpZyAxCiAgICBpbnRjIDcgLy8gMTMyCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGJueiBkaXNidXJzZVJld2FyZHNfZWxzZV9ib2R5QDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA5MwogICAgLy8gdGhpcy5yYWZmbGUocmV3YXJkSUQpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlCiAgICBiIGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDMyCgpkaXNidXJzZVJld2FyZHNfZWxzZV9ib2R5QDI2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDQ4CiAgICAvLyB9ID0gY2xvbmUodGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZSkKICAgIGR1cG4gMgogICAgcHVzaGludCAxMDgKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDEwMAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMTQKICAgIGR1cAogICAgcHVzaGludCA1NwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgNDkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gY29uc3QgYWN0dWFsU3VtOiB1aW50NjQgPSBzdW0gLSByb3lhbHR5QW1vdW50CiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIHRoaXMuYXNzZXJ0UmV3YXJkQmFsYW5jZShhc3NldCwgYWN0dWFsU3VtKQogICAgY2FsbHN1YiBhc3NlcnRSZXdhcmRCYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBpZiAoKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCkgPiB0aGlzLmVudHJ5SUQudmFsdWUpIHsKICAgIGRpZyA2CiAgICArCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBpZiAoKGRpc2J1cnNlbWVudEN1cnNvciArIGl0ZXJhdGlvbkFtb3VudCkgPiB0aGlzLmVudHJ5SUQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gdGhpcy5lbnRyeUlELnZhbHVlIC0gZGlzYnVyc2VtZW50Q3Vyc29yCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDU0CiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSB0aGlzLmVudHJ5SUQudmFsdWUgLSBkaXNidXJzZW1lbnRDdXJzb3IKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTUKICAgIC0KICAgIGJ1cnkgNgoKZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDU4CiAgICAvLyBpZiAod2lubmVyQ291bnQgPiAwKSB7CiAgICBkaWcgMQogICAgYm56IGRpc2J1cnNlUmV3YXJkc19pZl9ib2R5QDM2CgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NjIKICAgIC8vIGxldCB7IHN0YWtlLCB0aWNrZXQsIGRpc2J1cnNlZCB9ID0gcmFmZmxlQ3Vyc29yCiAgICBkaWcgNAogICAgZHVwCiAgICBwdXNoaW50cyA2NyAyNAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGJ1cnkgMTAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDcKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBsZXQgY3VycmVudFRpY2tldCA9IHRpY2tldHNbdGlja2V0XQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHB1c2hpbnQgMTM0CiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGxldCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSA9IFtdCiAgICBieXRlYyA1IC8vIDB4MDAwMAogICAgY292ZXIgNAogICAgYnVyeSAyMAogICAgZGlnIDE3CiAgICBidXJ5IDE2CgpkaXNidXJzZVJld2FyZHNfd2hpbGVfdG9wQDM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gZm9yIChsZXQgaSA9IGRpc2J1cnNlbWVudEN1cnNvcjsgaSA8IChkaXNidXJzZW1lbnRDdXJzb3IgKyBpdGVyYXRpb25BbW91bnQpOyBpKyspIHsKICAgIGRpZyAxNwogICAgZGlnIDkKICAgICsKICAgIGRpZyAxNgogICAgPgogICAgYnogZGlzYnVyc2VSZXdhcmRzX2Jsb2NrQDUwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDY5CiAgICAvLyBjb25zdCB7IGRpc3F1YWxpZmllZCwgYWRkcmVzcywgYXNzZXQsIHF1YW50aXR5IH0gPSB0aGlzLmVudHJpZXMoaSkudmFsdWUKICAgIGRpZyAxNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFBvb2xCb3hQcmVmaXhFbnRyaWVzIH0pCiAgICBieXRlYyAxMSAvLyAiZSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ2OQogICAgLy8gY29uc3QgeyBkaXNxdWFsaWZpZWQsIGFkZHJlc3MsIGFzc2V0LCBxdWFudGl0eSB9ID0gdGhpcy5lbnRyaWVzKGkpLnZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNTAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgYnVyeSAxOAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ1cnkgMjcKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDIyCiAgICBwdXNoaW50IDQwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGN1cnJlbnRSYW5nZUVuZCA9IGN1cnJlbnRSYW5nZVN0YXJ0ICsgcXVhbnRpdHkKICAgIGRpZyAyMAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIGlmIChjdXJyZW50VGlja2V0ID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIGN1cnJlbnRUaWNrZXQgPD0gY3VycmVudFJhbmdlRW5kKSB7CiAgICBkaWcgMjAKICAgIDw9CiAgICBieiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA0OAogICAgZGlnIDE5CiAgICBkaWcgMQogICAgPD0KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDQ4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NzMKICAgIC8vIGlmICghZGlzcXVhbGlmaWVkKSB7CiAgICBkaWcgMTYKICAgIGJueiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA0MwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gYWxsb2NhdGlvbnMucHVzaCh7IGFkZHJlc3MsIGFtb3VudCB9KQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMjYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gYWxsb2NhdGlvbnMucHVzaCh7IGFkZHJlc3MsIGFtb3VudCB9KQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGRpc2J1cnNlZCsrCiAgICB1bmNvdmVyIDUKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciA1CgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA0MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGlmICh0aWNrZXQgPT09IHRpY2tldHMubGVuZ3RoIC0gMSkgewogICAgZGlnIDcKICAgIGludGMgNyAvLyAxMzIKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyA1CiAgICA9PQogICAgYnogZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VANDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIGlmICh3aW5uZXJDb3VudCAhPT0gZGlzYnVyc2VkKSB7CiAgICBkaWcgMQogICAgZGlnIDYKICAgICE9CiAgICBieiBkaXNidXJzZVJld2FyZHNfYmxvY2tANTAKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuZGlzYnVyc2VtZW50Q3Vyc29yID0gMSAvLyBFbnRyeSBJRHMgc3RhcnQgYXQgMQogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGRpZyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgMTAwCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDgyLTQ4NgogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5yYWZmbGVDdXJzb3IgPSB7CiAgICAvLyAgIHRpY2tldDogMCwKICAgIC8vICAgc3Rha2U6IDAsCiAgICAvLyAgIGRpc2J1cnNlZDogMCwKICAgIC8vIH0KICAgIGR1cAogICAgcHVzaGludCA2NwogICAgYnl0ZWMgNDEgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDg3CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLndpbm5pbmdUaWNrZXRzID0gW10KICAgIGR1cAogICAgYm94X2dldAogICAgcG9wCiAgICBkdXAKICAgIHB1c2hpbnQgNjUKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgZXh0cmFjdDMKICAgIGJ5dGVjIDUgLy8gMHgwMDAwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIHRoaXMuY3JlYXRlUmV3YXJkQWxsb2NhdGlvbnMoYWN0aXZlRGlzYnVyc2VtZW50SUQsIGFzc2V0LCBhbGxvY2F0aW9ucywgYW1vdW50ICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgdW5jb3ZlciAyCiAgICAqCiAgICB1bmNvdmVyIDIKICAgIGRpZyAxNgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgY3JlYXRlUmV3YXJkQWxsb2NhdGlvbnMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwOTUKICAgIC8vIHRoaXMuY3JlYXRlU2h1ZmZsZURpc2J1cnNlbWVudChyZXdhcmRJRCwgaXRlcmF0aW9uQW1vdW50KQogICAgYiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzMgoKZGlzYnVyc2VSZXdhcmRzX2Jsb2NrQDUwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUwNQogICAgLy8gdGhpcy5jcmVhdGVSZXdhcmRBbGxvY2F0aW9ucyhhY3RpdmVEaXNidXJzZW1lbnRJRCwgYXNzZXQsIGFsbG9jYXRpb25zLCBhbW91bnQgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHVuY292ZXIgMgogICAgKgogICAgdW5jb3ZlciA2CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGNyZWF0ZVJld2FyZEFsbG9jYXRpb25zCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MDcKICAgIC8vIGlmICh3aW5uZXJDb3VudCA9PT0gZGlzYnVyc2VkKSB7CiAgICBkaWcgMgogICAgPT0KICAgIGJ6IGRpc2J1cnNlUmV3YXJkc19lbHNlX2JvZHlANTIKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUwOAogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5waGFzZSA9IERpc2J1cnNlbWVudFBoYXNlRmluYWxpemF0aW9uCiAgICBkdXBuIDIKICAgIHB1c2hpbnQgOTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDg3CiAgICAvLyBjYXNlIERpc3RyaWJ1dGlvblR5cGVFdmVuOiB7CiAgICBieXRlYyAxNCAvLyAweDFlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTA4CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnBoYXNlID0gRGlzYnVyc2VtZW50UGhhc2VGaW5hbGl6YXRpb24KICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLmRpc2J1cnNlbWVudEN1cnNvciA9IDEgLy8gRW50cnkgSURzIHN0YXJ0IGF0IDEKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCAxMDAKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MTAtNTE0CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnJhZmZsZUN1cnNvciA9IHsKICAgIC8vICAgdGlja2V0OiAwLAogICAgLy8gICBzdGFrZTogMCwKICAgIC8vICAgZGlzYnVyc2VkOiAwLAogICAgLy8gfQogICAgZHVwCiAgICBwdXNoaW50IDY3CiAgICBieXRlYyA0MSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUud2lubmluZ1RpY2tldHMgPSBbXQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgcHVzaGludCA2NQogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICBleHRyYWN0MwogICAgYnl0ZWMgNSAvLyAweDAwMDAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgYiBkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAzMgoKZGlzYnVyc2VSZXdhcmRzX2Vsc2VfYm9keUA1MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MTcKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUuZGlzYnVyc2VtZW50Q3Vyc29yICs9IGl0ZXJhdGlvbkFtb3VudAogICAgZGlnIDIKICAgIGR1cAogICAgcHVzaGludCAxMDAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDUKICAgICsKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDEwMAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUxOAogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5yYWZmbGVDdXJzb3IgPSB7IHRpY2tldCwgc3Rha2UsIGRpc2J1cnNlZCB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBkaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgcHVzaGludCA2NwogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGIgZGlzYnVyc2VSZXdhcmRzX2FmdGVyX2lmX2Vsc2VAMzIKCmRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDQ3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ5NAogICAgLy8gaXRlcmF0aW9uQW1vdW50IC09IGkKICAgIGRpZyA4CiAgICBkaWcgMTYKICAgIC0KICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gdGlja2V0KysKICAgIHVuY292ZXIgNAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gY3VycmVudFRpY2tldCA9IHRpY2tldHNbdGlja2V0XQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHB1c2hpbnQgMTM0CiAgICArCiAgICBkaWcgOAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5kaXNidXJzZW1lbnRDdXJzb3IgPSAxIC8vIEVudHJ5IElEcyBzdGFydCBhdCAxCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgcHVzaGludCAxMDAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBpID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0OTkKICAgIC8vIHN0YWtlID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MDAKICAgIC8vIGN1cnJlbnRSYW5nZUVuZCA9IDAKICAgIGludGNfMCAvLyAwCgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUA0ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MDIKICAgIC8vIGN1cnJlbnRSYW5nZVN0YXJ0ID0gY3VycmVudFJhbmdlRW5kICsgMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIGZvciAobGV0IGkgPSBkaXNidXJzZW1lbnRDdXJzb3I7IGkgPCAoZGlzYnVyc2VtZW50Q3Vyc29yICsgaXRlcmF0aW9uQW1vdW50KTsgaSsrKSB7CiAgICBkaWcgMTUKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDE2CiAgICBiIGRpc2J1cnNlUmV3YXJkc193aGlsZV90b3BAMzgKCmRpc2J1cnNlUmV3YXJkc19pZl9ib2R5QDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjQ1OQogICAgLy8gYW1vdW50ID0gYWN0dWFsU3VtIC8gd2lubmVyQ291bnQKICAgIGRpZyAxCiAgICAvCiAgICBiIGRpc2J1cnNlUmV3YXJkc19hZnRlcl9pZl9lbHNlQDM3CgpkaXNidXJzZVJld2FyZHNfYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoZmFsc2UsIEVSUl9VTktOT1dOX1JFV0FSRF9SQVRFX1RZUEUpCiAgICBwdXNoYnl0ZXMgIkVSUjpVUlJUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlVSUlQKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmZpbmFsaXplRGlzdHJpYnV0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZmluYWxpemVEaXN0cmlidXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEwNgogICAgLy8gZmluYWxpemVEaXN0cmlidXRpb24ocmV3YXJkSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJld2FyZHMocmV3YXJkSUQpLmV4aXN0cywgRVJSX1JFV0FSRF9OT1RfRk9VTkQpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyByZXdhcmRzID0gQm94TWFwPHVpbnQ2NCwgUmV3YXJkPih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeFJld2FyZHMgfSkKICAgIGJ5dGVjIDIyIC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTA3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZXdhcmRzKHJld2FyZElEKS5leGlzdHMsIEVSUl9SRVdBUkRfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZmluYWxpemVEaXN0cmlidXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI2IC8vICJFUlI6Uk5GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTkZECgpmaW5hbGl6ZURpc3RyaWJ1dGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTA4CiAgICAvLyBjb25zdCB7IHBoYXNlLCBhY3RpdmVEaXNidXJzZW1lbnRJRCB9ID0gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZQogICAgZHVwbiAyCiAgICBwdXNoaW50IDk5CiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMTA4CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgY292ZXIgMgogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMDkKICAgIC8vIGxvZ2dlZEFzc2VydChwaGFzZSA9PT0gRGlzYnVyc2VtZW50UGhhc2VGaW5hbGl6YXRpb24sIEVSUl9ESVNCVVJTRU1FTlRfTk9UX1JFQURZX0ZPUl9GSU5BTElaQVRJT04pCiAgICBieXRlYyAxNCAvLyAweDFlCiAgICA9PQogICAgYm56IGZpbmFsaXplRGlzdHJpYnV0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpETlJGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkROUkYKCmZpbmFsaXplRGlzdHJpYnV0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY3MgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5yZXdhcmRzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY3MgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5yZXdhcmRzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2NzIKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkucmV3YXJkcykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY3NC02NzcKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmZpbmFsaXplRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbZGlzYnVyc2VtZW50SURdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NTQyNGE1OTEgLy8gbWV0aG9kICJmaW5hbGl6ZURpc2J1cnNlbWVudCh1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTEzCiAgICAvLyB0aGlzLmRpc2J1cnNlbWVudHMoYWN0aXZlRGlzYnVyc2VtZW50SUQpLmNyZWF0ZSgpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBkaXNidXJzZW1lbnRzID0gQm94TWFwPHVpbnQ2NCwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RGlzYnVyc2VtZW50cyB9KQogICAgcHVzaGJ5dGVzICJkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTExMwogICAgLy8gdGhpcy5kaXNidXJzZW1lbnRzKGFjdGl2ZURpc2J1cnNlbWVudElEKS5jcmVhdGUoKQogICAgaW50Y18wIC8vIDAKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMTUKICAgIC8vIHRoaXMucmV3YXJkcyhyZXdhcmRJRCkudmFsdWUucGhhc2UgPSBEaXNidXJzZW1lbnRQaGFzZUlkbGUKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgOTkKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTE2CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLmFjdGl2ZURpc2J1cnNlbWVudElEID0gMAogICAgZHVwCiAgICBwdXNoaW50IDEwOAogICAgZGlnIDMKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTExNwogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5hY3RpdmVEaXNidXJzZW1lbnRSb3VuZFN0YXJ0ID0gMAogICAgZHVwCiAgICBwdXNoaW50IDExNgogICAgZGlnIDMKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTExOAogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5kaXNidXJzZW1lbnRDdXJzb3IgPSAxIC8vIEVudHJ5IElEcyBzdGFydCBhdCAxCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgMTAwCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTExOQogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS5xdWFsaWZpZWRTdGFrZXJzID0gMAogICAgZHVwCiAgICBwdXNoaW50IDMzCiAgICBkaWcgMwogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTIwCiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnF1YWxpZmllZFN0YWtlID0gMAogICAgZHVwCiAgICBwdXNoaW50IDQxCiAgICBkaWcgMwogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTIxCiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnJveWFsdHlBbW91bnQgPSAwCiAgICBwdXNoaW50IDQ5CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEwNgogICAgLy8gZmluYWxpemVEaXN0cmlidXRpb24ocmV3YXJkSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuY2hlY2tbcm91dGluZ10oKSAtPiB2b2lkOgpjaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTI0CiAgICAvLyBjaGVjayhhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogeyB2YWxpZDogYm9vbGVhbiwgYmFsYW5jZTogdWludDY0IH0gewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMjUKICAgIC8vIGNvbnN0IGtleTogRW50cnlLZXkgPSB7IGFkZHJlc3MsIGFzc2V0IH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxFbnRyeUtleSwgdWludDY0Pih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDI3IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEyNgogICAgLy8gY29uc3QgaWQgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3Moa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTI3CiAgICAvLyByZXR1cm4gdGhpcy5jaGVja0J5SUQoaWQpCiAgICBjYWxsc3ViIGNoZWNrQnlJRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMjQKICAgIC8vIGNoZWNrKGFkZHJlc3M6IEFjY291bnQsIGFzc2V0OiB1aW50NjQpOiB7IHZhbGlkOiBib29sZWFuLCBiYWxhbmNlOiB1aW50NjQgfSB7CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5nYXRlQ2hlY2tbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlQ2hlY2s6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzMAogICAgLy8gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzMQogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzMQogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgYm56IGdhdGVDaGVja19hZnRlcl9pZl9lbHNlQDE2CiAgICBwb3AKICAgIGRpZyAyCiAgICBidXJ5IDUKCmdhdGVDaGVja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMzQKICAgIC8vIGNvbnN0IHBhc3NlcyA9IHNvZnRHYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTM0CiAgICAvLyBjb25zdCBwYXNzZXMgPSBzb2Z0R2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTcgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzNAogICAgLy8gY29uc3QgcGFzc2VzID0gc29mdEdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGJ1cnkgNgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGRpZyAxCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNC0yMjUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNQogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZHVwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI0LTIyNQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVDaGVja19ib29sX2ZhbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBkdXAKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI0LTIyNgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjcKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLmNoZWNrPigpICYmCiAgICBkdXAKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4MjAwZjc0MjEgLy8gbWV0aG9kICJjaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSlib29sIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI0LTIyNwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5jaGVjaz4oKSAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGR1cAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkaWcgNQogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI0LTIyOAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5jaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjkKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGR1cAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkaWcgNAogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI0LTIyOQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5jaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUAxMgogICAgaW50Y18xIC8vIDEKCmdhdGVDaGVja19ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjMtMjMwCiAgICAvLyBhc3NlcnQoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUuY2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzIKICAgIC8vIHJldHVybiBkZWNvZGVBcmM0PGJvb2xlYW4+KG9wLmV4dHJhY3QoZ2F0ZVR4bi5sYXN0TG9nLCA0KSkKICAgIGd0eG5zIExhc3RMb2cKICAgIGV4dHJhY3QgNCAwCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzNQogICAgLy8gaWYgKCFwYXNzZXMgJiYgdGhpcy50eXBlLnZhbHVlICE9PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQpIHsKICAgIGJueiBnYXRlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gdHlwZSA9IEdsb2JhbFN0YXRlPFN0YWtpbmdQb29sU3Rha2luZ1R5cGU+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlUeXBlIH0pCiAgICBieXRlYyA0IC8vICJ0eXBlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMzUKICAgIC8vIGlmICghcGFzc2VzICYmIHRoaXMudHlwZS52YWx1ZSAhPT0gUE9PTF9TVEFLSU5HX1RZUEVfSEVBUlRCRUFUKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNyAvLyAweDBhCiAgICAhPQogICAgYnogZ2F0ZUNoZWNrX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExMzYKICAgIC8vIGNvbnN0IGtleTogRW50cnlLZXkgPSB7IGFkZHJlc3MsIGFzc2V0IH0KICAgIGR1cAogICAgaXRvYgogICAgZGlnIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxFbnRyeUtleSwgdWludDY0Pih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDI3IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzNwogICAgLy8gY29uc3QgaWQgPSB0aGlzLmVudHJpZXNCeUFkZHJlc3Moa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTM4CiAgICAvLyB0aGlzLmVudHJpZXMoaWQpLnZhbHVlLmRpc3F1YWxpZmllZCA9IHRydWUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMTEgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTM4CiAgICAvLyB0aGlzLmVudHJpZXMoaWQpLnZhbHVlLmRpc3F1YWxpZmllZCA9IHRydWUKICAgIGR1cAogICAgcHVzaGludCA1MAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCA1MAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCmdhdGVDaGVja19hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTEzMAogICAgLy8gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBhZGRyZXNzOiBBY2NvdW50LCBhc3NldDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUAxMjoKICAgIGludGNfMCAvLyAwCiAgICBiIGdhdGVDaGVja19ib29sX21lcmdlQDEzCgpnYXRlQ2hlY2tfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY3CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIGJ5dGVjIDQwIC8vICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTMyCiAgICAvLyBjb25zdCBvcmlnaW4gPSBvcmlnaW5Pcih3YWxsZXQsIGFkZHJlc3MpCiAgICBiIGdhdGVDaGVja19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDE3CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5lbnRlckNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgplbnRlckNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE1MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIGludGNfMCAvLyAwCgplbnRlckNvc3RfZm9yX2hlYWRlckAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgZHVwCiAgICBkaWcgNQogICAgPAogICAgYnogZW50ZXJDb3N0X2FmdGVyX2ZvckA0CiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGVuY29kaW5nCiAgICBkdXAKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGZvciAobGVuKyh1aW50NjQsdWludDY0LChsZW4rdWludDhbMzJdW10pKVtdKQogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDE4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDIgb2YgKHVpbnQ2NCx1aW50NjQsKGxlbit1aW50OFszMl1bXSkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAzMgogICAgKgogICAgcHVzaGludCAyMAogICAgKwogICAgKwogICAgY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgZW50ZXJDb3N0X2Zvcl9oZWFkZXJAMQoKZW50ZXJDb3N0X2FmdGVyX2ZvckA0OgogICAgcG9wbiAyCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaW50Y18zIC8vIDIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL3R5cGVzLnRzOjpTdGFrZUVudHJ5PgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTIKICAgIC8vIHJldHVybiB0aGlzLmdldEVudGVyQ29zdChhZGRyZXNzLCBlbnRyaWVzKQogICAgY2FsbHN1YiBnZXRFbnRlckNvc3QKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNTcKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA4IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE1NwogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE1OAogICAgLy8gcmV0dXJuIChHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSkgKyAodGhpcy5yZXdhcmRzTWJyKFdpbm5lckNvdW50Q2FwKSAqIDIpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgICsKICAgICoKICAgIGludGMgMTEgLy8gMTgzNDAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbltyb3V0aW5nXSgpIC0+IHZvaWQ6CnNpZ25VcHNPcGVuOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNjIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnNpZ25VcHNPcGVuCiAgICBieXRlY18zIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuaXNMaXZlW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExODEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmlzTGl2ZQogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmlzRW50ZXJlZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzRW50ZXJlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTkxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTIKICAgIC8vIHVuaXF1ZXMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUG9vbEdsb2JhbFN0YXRlS2V5VW5pcXVlcyB9KQogICAgYnl0ZWMgMjggLy8gInUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTkzCiAgICAvLyByZXR1cm4gdGhpcy51bmlxdWVzKGFkZHJlc3MpLmV4aXN0czsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExOTEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmdldFN0YXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U3RhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE5OQogICAgLy8gc3RhdHVzOiB0aGlzLnN0YXR1cy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBzdGF0dXMgPSBHbG9iYWxTdGF0ZTxTdGFraW5nUG9vbFN0YXR1cz4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVN0YXR1cyB9KQogICAgYnl0ZWMgMTMgLy8gInN0YXR1cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTk5CiAgICAvLyBzdGF0dXM6IHRoaXMuc3RhdHVzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjAwCiAgICAvLyB0aXRsZTogdGhpcy50aXRsZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyB0aXRsZSA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVRpdGxlIH0pCiAgICBieXRlYyAyOSAvLyAidGl0bGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTIwMAogICAgLy8gdGl0bGU6IHRoaXMudGl0bGUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDEKICAgIC8vIHR5cGU6IHRoaXMudHlwZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyB0eXBlID0gR2xvYmFsU3RhdGU8U3Rha2luZ1Bvb2xTdGFraW5nVHlwZT4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVR5cGUgfSkKICAgIGJ5dGVjIDQgLy8gInR5cGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTIwMQogICAgLy8gdHlwZTogdGhpcy50eXBlLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjAyCiAgICAvLyBzaWdudXBUaW1lc3RhbXA6IHRoaXMuc2lnbnVwVGltZXN0YW1wLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIHNpZ251cFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U2lnbnVwVGltZXN0YW1wIH0pCiAgICBieXRlYyAyMyAvLyAic2lnbnVwX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjAyCiAgICAvLyBzaWdudXBUaW1lc3RhbXA6IHRoaXMuc2lnbnVwVGltZXN0YW1wLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjAzCiAgICAvLyBhbGxvd0xhdGVTaWdudXBzOiB0aGlzLmFsbG93TGF0ZVNpZ251cHMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gYWxsb3dMYXRlU2lnbnVwcyA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlBbGxvd0xhdGVTaWdudXBzIH0pCiAgICBieXRlYyAxNSAvLyAiYWxsb3dfbGF0ZV9zaWdudXBzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDMKICAgIC8vIGFsbG93TGF0ZVNpZ251cHM6IHRoaXMuYWxsb3dMYXRlU2lnbnVwcy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTIwNAogICAgLy8gc3RhcnRUaW1lc3RhbXA6IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAxMiAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDQKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjA1CiAgICAvLyBlbmRUaW1lc3RhbXA6IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA5IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDUKICAgIC8vIGVuZFRpbWVzdGFtcDogdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDYKICAgIC8vIG1heEVudHJpZXM6IHRoaXMubWF4RW50cmllcy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBtYXhFbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5TWF4RW50cmllcyB9KQogICAgYnl0ZWMgMTkgLy8gIm1heF9lbnRyaWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDYKICAgIC8vIG1heEVudHJpZXM6IHRoaXMubWF4RW50cmllcy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTIwNwogICAgLy8gZW50cnlDb3VudDogKHRoaXMuZW50cnlJRC52YWx1ZSAtIDEpLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDcKICAgIC8vIGVudHJ5Q291bnQ6ICh0aGlzLmVudHJ5SUQudmFsdWUgLSAxKSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDgKICAgIC8vIHJld2FyZENvdW50OiAodGhpcy5yZXdhcmRJRC52YWx1ZSAtIDEpLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIHJld2FyZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlSZXdhcmRDb3VudCB9KQogICAgYnl0ZWMgMjQgLy8gInJld2FyZF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjA4CiAgICAvLyByZXdhcmRDb3VudDogKHRoaXMucmV3YXJkSUQudmFsdWUgLSAxKSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDkKICAgIC8vIHN0YWtlS2V5OiB0aGlzLnN0YWtlS2V5LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHN0YWtlS2V5ID0gR2xvYmFsU3RhdGU8Um9vdEtleT4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVN0YWtlS2V5IH0pCiAgICBieXRlYyAyNSAvLyAic3Rha2Vfa2V5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMDkKICAgIC8vIHN0YWtlS2V5OiB0aGlzLnN0YWtlS2V5LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjEwCiAgICAvLyBtaW5pbXVtU3Rha2VBbW91bnQ6IHRoaXMubWluaW11bVN0YWtlQW1vdW50LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIG1pbmltdW1TdGFrZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleU1pbmltdW1TdGFrZUFtb3VudCB9KQogICAgYnl0ZWMgMzAgLy8gIm1pbmltdW1fc3Rha2VfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMTAKICAgIC8vIG1pbmltdW1TdGFrZUFtb3VudDogdGhpcy5taW5pbXVtU3Rha2VBbW91bnQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEyMTEKICAgIC8vIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAxNyAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjExCiAgICAvLyBnYXRlSUQ6IHRoaXMuZ2F0ZUlELnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjEyCiAgICAvLyBjcmVhdG9yOiB0aGlzLmNyZWF0b3IudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3NwogICAgLy8gY3JlYXRvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlDcmVhdG9yIH0pCiAgICBieXRlYyAxNiAvLyAiY3JlYXRvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMjEyCiAgICAvLyBjcmVhdG9yOiB0aGlzLmNyZWF0b3IudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExOTgtMTIxMwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgc3RhdHVzOiB0aGlzLnN0YXR1cy52YWx1ZSwKICAgIC8vICAgdGl0bGU6IHRoaXMudGl0bGUudmFsdWUsCiAgICAvLyAgIHR5cGU6IHRoaXMudHlwZS52YWx1ZSwKICAgIC8vICAgc2lnbnVwVGltZXN0YW1wOiB0aGlzLnNpZ251cFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgYWxsb3dMYXRlU2lnbnVwczogdGhpcy5hbGxvd0xhdGVTaWdudXBzLnZhbHVlLAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgbWF4RW50cmllczogdGhpcy5tYXhFbnRyaWVzLnZhbHVlLAogICAgLy8gICBlbnRyeUNvdW50OiAodGhpcy5lbnRyeUlELnZhbHVlIC0gMSksCiAgICAvLyAgIHJld2FyZENvdW50OiAodGhpcy5yZXdhcmRJRC52YWx1ZSAtIDEpLAogICAgLy8gICBzdGFrZUtleTogdGhpcy5zdGFrZUtleS52YWx1ZSwKICAgIC8vICAgbWluaW11bVN0YWtlQW1vdW50OiB0aGlzLm1pbmltdW1TdGFrZUFtb3VudC52YWx1ZSwKICAgIC8vICAgZ2F0ZUlEOiB0aGlzLmdhdGVJRC52YWx1ZSwKICAgIC8vICAgY3JlYXRvcjogdGhpcy5jcmVhdG9yLnZhbHVlLAogICAgLy8gfQogICAgZGlnIDEyCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDEzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTMKICAgIHB1c2hieXRlcyAweDAwNjcKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAxMDMKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgMTQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxMwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDExCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMTMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICB1bmNvdmVyIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgOQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE5NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9iYXNlLnRzOjpCYXNlU3Rha2luZ1Bvb2wubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9iYXNlLnRzOjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvYmFzZS50czo5CiAgICAvLyByZXR1cm4gTWluUG9vbFJld2FyZHNNQlIgKyAoQm94Q29zdFBlckJ5dGUgKiBQb29sUmV3YXJkV2lubmluZ1RpY2tldEJ5dGVzICogd2lubmluZ1RpY2tldHMpCiAgICBwdXNoaW50IDMyMDAKICAgICoKICAgIGludGMgMTIgLy8gNTk3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvYmFzZS50czoxNS0yMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZW50cmllczogUG9vbEVudHJpZXNNQlIsCiAgICAvLyAgIHVuaXF1ZXM6IFBvb2xVbmlxdWVzTUJSLAogICAgLy8gICBlbnRyaWVzQnlBZGRyZXNzOiBQb29sRW50cmllc0J5QWRkcmVzc01CUiwKICAgIC8vICAgcmV3YXJkczogdGhpcy5yZXdhcmRzTWJyKHdpbm5pbmdUaWNrZXRzKSwKICAgIC8vICAgZGlzYnVyc2VtZW50czogUG9vbERpc2J1cnNlbWVudFNNQlIKICAgIC8vIH0KICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDYyZDQwMDAwMDAwMDAwMDA0OWQ0MDAwMDAwMDAwMDAwNjJkNAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2Jhc2UudHM6MjAKICAgIC8vIGRpc2J1cnNlbWVudHM6IFBvb2xEaXNidXJzZW1lbnRTTUJSCiAgICBwdXNoaW50IDYxMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvYmFzZS50czoxNS0yMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZW50cmllczogUG9vbEVudHJpZXNNQlIsCiAgICAvLyAgIHVuaXF1ZXM6IFBvb2xVbmlxdWVzTUJSLAogICAgLy8gICBlbnRyaWVzQnlBZGRyZXNzOiBQb29sRW50cmllc0J5QWRkcmVzc01CUiwKICAgIC8vICAgcmV3YXJkczogdGhpcy5yZXdhcmRzTWJyKHdpbm5pbmdUaWNrZXRzKSwKICAgIC8vICAgZGlzYnVyc2VtZW50czogUG9vbERpc2J1cnNlbWVudFNNQlIKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9iYXNlLnRzOjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzMgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgOCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODYKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDIwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMzkgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVVQRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJVVBHCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgcHVzaGJ5dGVzICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyMCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMyAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hc3NlcnRSZXdhcmRCYWxhbmNlKGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRSZXdhcmRCYWxhbmNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI1MAogICAgLy8gcHJpdmF0ZSBhc3NlcnRSZXdhcmRCYWxhbmNlKGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogYXNzZXJ0UmV3YXJkQmFsYW5jZV9lbHNlX2JvZHlAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gYmFsYW5jZSA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAoKYXNzZXJ0UmV3YXJkQmFsYW5jZV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyBsb2dnZWRBc3NlcnQoYmFsYW5jZSA+PSBhbW91bnQsIEVSUl9OT1RfRU5PVUdIX0ZVTkRTKQogICAgZnJhbWVfZGlnIC0xCiAgICA+PQogICAgYm56IGFzc2VydFJld2FyZEJhbGFuY2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOk5FRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVGRAoKYXNzZXJ0UmV3YXJkQmFsYW5jZV9hZnRlcl9hc3NlcnRANToKICAgIHJldHN1YgoKYXNzZXJ0UmV3YXJkQmFsYW5jZV9lbHNlX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIGJhbGFuY2UgPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBhc3NldClbMF0KICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBiIGFzc2VydFJld2FyZEJhbGFuY2VfYWZ0ZXJfaWZfZWxzZUAzCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5jaGVja0J5SUQoaWQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmNoZWNrQnlJRDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIHByaXZhdGUgY2hlY2tCeUlEKGlkOiB1aW50NjQpOiB7IHZhbGlkOiBib29sZWFuLCBiYWxhbmNlOiB1aW50NjQgfSB7CiAgICBwcm90byAxIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTI0CiAgICAvLyB0aGlzLnR5cGUudmFsdWUgIT09IFBPT0xfU1RBS0lOR19UWVBFX05PTkUgJiYgdGhpcy50eXBlLnZhbHVlICE9PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gdHlwZSA9IEdsb2JhbFN0YXRlPFN0YWtpbmdQb29sU3Rha2luZ1R5cGU+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlUeXBlIH0pCiAgICBieXRlYyA0IC8vICJ0eXBlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUyNAogICAgLy8gdGhpcy50eXBlLnZhbHVlICE9PSBQT09MX1NUQUtJTkdfVFlQRV9OT05FICYmIHRoaXMudHlwZS52YWx1ZSAhPT0gUE9PTF9TVEFLSU5HX1RZUEVfSEVBUlRCRUFULAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgIT0KICAgIGJ6IGNoZWNrQnlJRF9ib29sX2ZhbHNlQDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyB0eXBlID0gR2xvYmFsU3RhdGU8U3Rha2luZ1Bvb2xTdGFraW5nVHlwZT4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVR5cGUgfSkKICAgIGJ5dGVjIDQgLy8gInR5cGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTI0CiAgICAvLyB0aGlzLnR5cGUudmFsdWUgIT09IFBPT0xfU1RBS0lOR19UWVBFX05PTkUgJiYgdGhpcy50eXBlLnZhbHVlICE9PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNyAvLyAweDBhCiAgICAhPQogICAgYnogY2hlY2tCeUlEX2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKCmNoZWNrQnlJRF9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTIzLTUyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICB0aGlzLnR5cGUudmFsdWUgIT09IFBPT0xfU1RBS0lOR19UWVBFX05PTkUgJiYgdGhpcy50eXBlLnZhbHVlICE9PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQsCiAgICAvLyAgIEVSUl9JTlZBTElEX1BPT0xfVFlQRV9GT1JfQ0hFQ0sKICAgIC8vICkKICAgIGJueiBjaGVja0J5SURfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOklQVEMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBUQwoKY2hlY2tCeUlEX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gY29uc3QgeyBkaXNxdWFsaWZpZWQsIGFkZHJlc3MsIGFzc2V0LCBxdWFudGl0eSB9ID0gdGhpcy5lbnRyaWVzKGlkKS52YWx1ZQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDExIC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gY29uc3QgeyBkaXNxdWFsaWZpZWQsIGFkZHJlc3MsIGFzc2V0LCBxdWFudGl0eSB9ID0gdGhpcy5lbnRyaWVzKGlkKS52YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDUwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGludCAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGNvdmVyIDIKICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgY292ZXIgNAogICAgYnRvaQogICAgY292ZXIgMgogICAgc3dhcAogICAgcHVzaGludCA0MAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBpZiAoZGlzcXVhbGlmaWVkKSB7CiAgICBieiBjaGVja0J5SURfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTMxCiAgICAvLyByZXR1cm4geyB2YWxpZDogZmFsc2UsIGJhbGFuY2U6IDAgfQogICAgYnl0ZWMgNDIgLy8gMHgwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjaGVja0J5SURfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gaWYgKHRoaXMudHlwZS52YWx1ZSA9PT0gUE9PTF9TVEFLSU5HX1RZUEVfU09GVCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHR5cGUgPSBHbG9iYWxTdGF0ZTxTdGFraW5nUG9vbFN0YWtpbmdUeXBlPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5VHlwZSB9KQogICAgYnl0ZWMgNCAvLyAidHlwZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MzQKICAgIC8vIGlmICh0aGlzLnR5cGUudmFsdWUgPT09IFBPT0xfU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxMCAvLyAweDE0CiAgICA9PQogICAgYnogY2hlY2tCeUlEX2Vsc2VfYm9keUAxMwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTM1LTUzOAogICAgLy8gY29uc3QgY2hlY2sgPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jaGVja3BvaW50QXBwU29mdFN0YWtlPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIC8vICAgYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWRkcmVzcywgYXNzZXRdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIGFyZ3M6IFtHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQuaWQsIGFkZHJlc3MsIGFzc2V0XSwKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1MzYKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTM1LTUzOAogICAgLy8gY29uc3QgY2hlY2sgPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jaGVja3BvaW50QXBwU29mdFN0YWtlPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIC8vICAgYXJnczogW0dsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZC5pZCwgYWRkcmVzcywgYXNzZXRdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDViZmRlODAyIC8vIG1ldGhvZCAiY2hlY2twb2ludEFwcFNvZnRTdGFrZSh1aW50NjQsYWRkcmVzcyx1aW50NjQpKGJvb2wsdWludDY0KSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA5CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Rha2luZy90eXBlcy50czo6U3Rha2VDaGVjawogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU0MAogICAgLy8gaWYgKGNoZWNrLnZhbGlkKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgYnogY2hlY2tCeUlEX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NDEKICAgIC8vIHJldHVybiBjaGVjawogICAgZnJhbWVfZGlnIDAKICAgIGV4dHJhY3QgNSA4CiAgICBieXRlY18zIC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgMgogICAgc2V0Yml0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjaGVja0J5SURfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NjAKICAgIC8vIHRoaXMuZW50cmllcyhpZCkudmFsdWUuZGlzcXVhbGlmaWVkID0gdHJ1ZQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgcHVzaGludCA1MAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCA1MAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIHJldHVybiB7IHZhbGlkOiBmYWxzZSwgYmFsYW5jZTogMCB9CiAgICBieXRlYyA0MiAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNoZWNrQnlJRF9lbHNlX2JvZHlAMTM6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU0NC01NTMKICAgIC8vIGNvbnN0IGluZm8gPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5nZXRJbmZvPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFkZHJlc3MsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgYXNzZXQ6IGFzc2V0LAogICAgLy8gICAgICAgdHlwZTogdGhpcy50eXBlLnZhbHVlLAogICAgLy8gICAgIH0sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gdHlwZTogdGhpcy50eXBlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHR5cGUgPSBHbG9iYWxTdGF0ZTxTdGFraW5nUG9vbFN0YWtpbmdUeXBlPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5VHlwZSB9KQogICAgYnl0ZWMgNCAvLyAidHlwZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NTAKICAgIC8vIHR5cGU6IHRoaXMudHlwZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTQ4LTU1MQogICAgLy8gewogICAgLy8gICBhc3NldDogYXNzZXQsCiAgICAvLyAgIHR5cGU6IHRoaXMudHlwZS52YWx1ZSwKICAgIC8vIH0sCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NDUKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NDUKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnN0YWtpbmcsCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjU0NC01NTMKICAgIC8vIGNvbnN0IGluZm8gPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5nZXRJbmZvPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFkZHJlc3MsCiAgICAvLyAgICAgewogICAgLy8gICAgICAgYXNzZXQ6IGFzc2V0LAogICAgLy8gICAgICAgdHlwZTogdGhpcy50eXBlLnZhbHVlLAogICAgLy8gICAgIH0sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgYnl0ZWMgNDMgLy8gbWV0aG9kICJnZXRJbmZvKGFkZHJlc3MsKHVpbnQ2NCx1aW50OCkpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N0YWtpbmcvdHlwZXMudHM6OlN0YWtlCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NTUKICAgIC8vIGlmIChpbmZvLmFtb3VudCA+PSBxdWFudGl0eSkgewogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICA8PQogICAgYnogY2hlY2tCeUlEX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo1NTYKICAgIC8vIHJldHVybiB7IHZhbGlkOiB0cnVlLCBiYWxhbmNlOiBpbmZvLmFtb3VudCB9CiAgICBmcmFtZV9kaWcgMwogICAgaXRvYgogICAgYnl0ZWMgMjEgLy8gMHg4MAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2hlY2tCeUlEX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNoZWNrQnlJRF9ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmNyZWF0ZVJld2FyZEFsbG9jYXRpb25zKGRpc2J1cnNlbWVudElEOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIGFsbG9jYXRpb25zOiBieXRlcywgc3VtOiB1aW50NjQpIC0+IGJ5dGVzOgpjcmVhdGVSZXdhcmRBbGxvY2F0aW9uczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2MzItNjM3CiAgICAvLyBwcml2YXRlIGNyZWF0ZVJld2FyZEFsbG9jYXRpb25zKAogICAgLy8gICBkaXNidXJzZW1lbnRJRDogdWludDY0LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwKICAgIC8vICAgc3VtOiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjM5CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnJld2FyZHMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjM5CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnJld2FyZHMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjYzOQogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5yZXdhcmRzKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYm56IGNyZWF0ZVJld2FyZEFsbG9jYXRpb25zX2Vsc2VfYm9keUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjQzLTY1MwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlVXNlckFsbG9jYXRpb25zPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiByZXdhcmRzQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHN1bSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBkaXNidXJzZW1lbnRJRCwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjQ3CiAgICAvLyByZWNlaXZlcjogcmV3YXJkc0FwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjQ2LTY0OQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IHJld2FyZHNBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBzdW0sCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2NDMtNjUzCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVVc2VyQWxsb2NhdGlvbnM+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHJld2FyZHNBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogc3VtLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGRpc2J1cnNlbWVudElELAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8gZGlzYnVyc2VtZW50SUQsCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY0My02NTMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZVVzZXJBbGxvY2F0aW9ucz4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmV3YXJkc0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBzdW0sCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgZGlzYnVyc2VtZW50SUQsCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NTY1NmFjZjkgLy8gbWV0aG9kICJjcmVhdGVVc2VyQWxsb2NhdGlvbnMocGF5LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNyZWF0ZVJld2FyZEFsbG9jYXRpb25zX2FmdGVyX2lmX2Vsc2VANzoKICAgIGZyYW1lX2RpZyAtMgogICAgcmV0c3ViCgpjcmVhdGVSZXdhcmRBbGxvY2F0aW9uc19lbHNlX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2NTYtNjY3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnM+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgICAgYXNzZXRSZWNlaXZlcjogcmV3YXJkc0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgZGlzYnVyc2VtZW50SUQsCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gYXNzZXRSZWNlaXZlcjogcmV3YXJkc0FwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY1OS02NjMKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IHJld2FyZHNBcHAuYWRkcmVzcywKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgYXNzZXRBbW91bnQ6IHN1bSwKICAgIC8vIH0pLAogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2NTYtNjY3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVBc2FVc2VyQWxsb2NhdGlvbnM+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgICAgYXNzZXRSZWNlaXZlcjogcmV3YXJkc0FwcC5hZGRyZXNzLAogICAgLy8gICAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgZGlzYnVyc2VtZW50SUQsCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjY0CiAgICAvLyBkaXNidXJzZW1lbnRJRCwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NjU2LTY2NwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IHJld2FyZHNBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGRpc2J1cnNlbWVudElELAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGY2MmNkYzJiIC8vIG1ldGhvZCAiY3JlYXRlQXNhVXNlckFsbG9jYXRpb25zKGF4ZmVyLHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgY3JlYXRlUmV3YXJkQWxsb2NhdGlvbnNfYWZ0ZXJfaWZfZWxzZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5nZXRFbnRlckNvc3QoYWRkcmVzczogYnl0ZXMsIGVudHJpZXM6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgpnZXRFbnRlckNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBwcml2YXRlIGdldEVudGVyQ29zdChhZGRyZXNzOiBBY2NvdW50LCBlbnRyaWVzOiBTdGFrZUVudHJ5W10pOiB1aW50NjQgewogICAgcHJvdG8gMiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBsZXQgdG90YWw6IHVpbnQ2NCA9IFBvb2xFbnRyaWVzTUJSICogZW50cmllcy5sZW5ndGgKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgaW50YyA2IC8vIDI1MzAwCiAgICBkaWcgMQogICAgKgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gaWYgKGVudHJpZXMubGVuZ3RoID4gMCAmJiAhdGhpcy51bmlxdWVzKGFkZHJlc3MpLmV4aXN0cykgewogICAgYnogZ2V0RW50ZXJDb3N0X2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gdW5pcXVlcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBQb29sR2xvYmFsU3RhdGVLZXlVbmlxdWVzIH0pCiAgICBieXRlYyAyOCAvLyAidSIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBpZiAoZW50cmllcy5sZW5ndGggPiAwICYmICF0aGlzLnVuaXF1ZXMoYWRkcmVzcykuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRFbnRlckNvc3RfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzA5CiAgICAvLyB0b3RhbCArPSBQb29sVW5pcXVlc01CUgogICAgcHVzaGludCAxODkwMAogICAgKwoKZ2V0RW50ZXJDb3N0X2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzAgLy8gMAoKZ2V0RW50ZXJDb3N0X3doaWxlX3RvcEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxMgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHsKICAgIGR1cAogICAgZnJhbWVfZGlnIDAKICAgIDwKICAgIGJ6IGdldEVudGVyQ29zdF9hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxMwogICAgLy8gY29uc3Qga2V5OiBFbnRyeUtleSA9IHsgYWRkcmVzcywgYXNzZXQ6IGVudHJpZXNbaV0uYXNzZXQgfQogICAgZnJhbWVfZGlnIC0xCiAgICBkaWcgMQogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBleHRyYWN0IDAgOAogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTQKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8RW50cnlLZXksIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFBvb2xCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyAyNyAvLyAiYSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmVudHJpZXNCeUFkZHJlc3Moa2V5KS5leGlzdHMsIEVSUl9FTlRSWV9BTFJFQURZX0VYSVNUUykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0RW50ZXJDb3N0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA0NCAvLyAiRVJSOkVFWFMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RUVYUwoKZ2V0RW50ZXJDb3N0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gdG90YWwgKz0gUG9vbEVudHJpZXNCeUFkZHJlc3NNQlIKICAgIHN3YXAKICAgIGludGMgNiAvLyAyNTMwMAogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gaWYgKHRoaXMudHlwZS52YWx1ZSA9PT0gUE9PTF9TVEFLSU5HX1RZUEVfU09GVCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIHR5cGUgPSBHbG9iYWxTdGF0ZTxTdGFraW5nUG9vbFN0YWtpbmdUeXBlPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5VHlwZSB9KQogICAgYnl0ZWMgNCAvLyAidHlwZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MTcKICAgIC8vIGlmICh0aGlzLnR5cGUudmFsdWUgPT09IFBPT0xfU1RBS0lOR19UWVBFX1NPRlQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxMCAvLyAweDE0CiAgICA9PQogICAgYnogZ2V0RW50ZXJDb3N0X2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxOAogICAgLy8gdG90YWwgKz0gQXBwU3Rha2VzTUJSCiAgICBzd2FwCiAgICBpbnRjIDEzIC8vIDM0OTAwCiAgICArCiAgICBzd2FwCgpnZXRFbnRlckNvc3RfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjcxMgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGdldEVudGVyQ29zdF93aGlsZV90b3BANAoKZ2V0RW50ZXJDb3N0X2FmdGVyX3doaWxlQDEwOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyByZXR1cm4gdG90YWwKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmNyZWF0ZVBvb2xFbnRyaWVzKHBheW1lbnQ6IHVpbnQ2NCwgZW50cmllczogYnl0ZXMsIGdhdGVBcmdzOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpjcmVhdGVQb29sRW50cmllczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MjQKICAgIC8vIHByaXZhdGUgY3JlYXRlUG9vbEVudHJpZXMocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBlbnRyaWVzOiBTdGFrZUVudHJ5W10sIGdhdGVBcmdzOiBHYXRlQXJncyk6IHZvaWQgewogICAgcHJvdG8gMyAyCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNpZ25VcHNPcGVuKCksIEVSUl9TSUdOVVBTX05PVF9PUEVOKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnNpZ25VcHNPcGVuCiAgICBibnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOlNVTk8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U1VOTwoKY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBpZiAodGhpcy5tYXhFbnRyaWVzLnZhbHVlICE9PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gbWF4RW50cmllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleU1heEVudHJpZXMgfSkKICAgIGJ5dGVjIDE5IC8vICJtYXhfZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MjcKICAgIC8vIGlmICh0aGlzLm1heEVudHJpZXMudmFsdWUgIT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjcmVhdGVQb29sRW50cmllc19hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MjkKICAgIC8vICh0aGlzLmVudHJ5SUQudmFsdWUgLSAxKSArIGVudHJpZXMubGVuZ3RoIDw9IHRoaXMubWF4RW50cmllcy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MjkKICAgIC8vICh0aGlzLmVudHJ5SUQudmFsdWUgLSAxKSArIGVudHJpZXMubGVuZ3RoIDw9IHRoaXMubWF4RW50cmllcy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgKwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIG1heEVudHJpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlNYXhFbnRyaWVzIH0pCiAgICBieXRlYyAxOSAvLyAibWF4X2VudHJpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyAodGhpcy5lbnRyeUlELnZhbHVlIC0gMSkgKyBlbnRyaWVzLmxlbmd0aCA8PSB0aGlzLm1heEVudHJpZXMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MjgtNzMxCiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgICh0aGlzLmVudHJ5SUQudmFsdWUgLSAxKSArIGVudHJpZXMubGVuZ3RoIDw9IHRoaXMubWF4RW50cmllcy52YWx1ZSwKICAgIC8vICAgRVJSX1BPT0xfTUFYX0VOVFJJRVNfUkVBQ0hFRAogICAgLy8gKQogICAgYm56IGNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2lmX2Vsc2VANgogICAgcHVzaGJ5dGVzICJFUlI6UE1FUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQTUVSCgpjcmVhdGVQb29sRW50cmllc19hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzM0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVQb29sRW50cmllc19hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMTggLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjczNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID49IHRoaXMuZ2V0RW50ZXJDb3N0KFR4bi5zZW5kZXIsIGVudHJpZXMpLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBbW91bnQKICAgIHR4biBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBnZXRFbnRlckNvc3QKICAgIGZyYW1lX2J1cnkgLTIKICAgID49CiAgICBibnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAxOCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjczNwogICAgLy8gY29uc3QgeyBhZGRyZXNzLCBuYW1lIH0gPSB0aGlzLnN0YWtlS2V5LnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gc3Rha2VLZXkgPSBHbG9iYWxTdGF0ZTxSb290S2V5Pih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3Rha2VLZXkgfSkKICAgIGJ5dGVjIDI1IC8vICJzdGFrZV9rZXkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzM3CiAgICAvLyBjb25zdCB7IGFkZHJlc3MsIG5hbWUgfSA9IHRoaXMuc3Rha2VLZXkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjczOAogICAgLy8gY29uc3Qgc3Rha2luZyA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjczOAogICAgLy8gY29uc3Qgc3Rha2luZyA9IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5zdGFraW5nKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MzgKICAgIC8vIGNvbnN0IHN0YWtpbmcgPSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkuc3Rha2luZykKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjczOQogICAgLy8gY29uc3QgcG9vbFR5cGUgPSB0aGlzLnR5cGUudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTUyCiAgICAvLyB0eXBlID0gR2xvYmFsU3RhdGU8U3Rha2luZ1Bvb2xTdGFraW5nVHlwZT4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVR5cGUgfSkKICAgIGJ5dGVjIDQgLy8gInR5cGUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBjb25zdCBwb29sVHlwZSA9IHRoaXMudHlwZS52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NDEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzAgLy8gMAoKY3JlYXRlUG9vbEVudHJpZXNfd2hpbGVfdG9wQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc0MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHsKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICBkaWcgMQogICAgPgogICAgYnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfd2hpbGVANDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIGNvbnN0IHsgYXNzZXQsIHF1YW50aXR5LCBwcm9vZiB9ID0gY2xvbmUoZW50cmllc1tpXSkKICAgIGZyYW1lX2RpZyAtMgogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBkdXAKICAgIGV4dHJhY3QgMCA4CiAgICBjb3ZlciA2CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIGZyYW1lX2RpZyAtMgogICAgZGlnIDEKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgNwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDYKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGxvZ2dlZEFzc2VydChxdWFudGl0eSA+PSB0aGlzLm1pbmltdW1TdGFrZUFtb3VudC52YWx1ZSwgRVJSX1FVQU5USVRZX0JFTE9XX01JTl9TVEFLRSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBtaW5pbXVtU3Rha2VBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlNaW5pbXVtU3Rha2VBbW91bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJtaW5pbXVtX3N0YWtlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGxvZ2dlZEFzc2VydChxdWFudGl0eSA+PSB0aGlzLm1pbmltdW1TdGFrZUFtb3VudC52YWx1ZSwgRVJSX1FVQU5USVRZX0JFTE9XX01JTl9TVEFLRSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+PQogICAgYm56IGNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2Fzc2VydEAxNgogICAgcHVzaGJ5dGVzICJFUlI6UUJNUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpRQk1TCgpjcmVhdGVQb29sRW50cmllc19hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyBpZiAoYWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBkaWcgNQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc0Ni03NTUKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYWRkcmVzcywKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNRVJLTEVfVFJFRV9UWVBFX0FTU0VULAogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NTEKICAgIC8vIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldCkpKSwKICAgIGRpZyAyCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc1MwogICAgLy8gTUVSS0xFX1RSRUVfVFlQRV9BU1NFVCwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS5tZXRhTWVya2xlcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc0Ni03NTUKICAgIC8vIGNvbnN0IHZlcmlmaWVkID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmeT4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYWRkcmVzcywKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICBNRVJLTEVfVFJFRV9UWVBFX0FTU0VULAogICAgLy8gICBdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDJiZjNjYzVhIC8vIG1ldGhvZCAidmVyaWZ5KGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzJdLGJ5dGVbMzJdW10sdWludDY0KWJvb2wiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGxvZ2dlZEFzc2VydCh2ZXJpZmllZCwgRVJSX0ZBSUxFRF9TVEFLRV9WRVJJRlkpCiAgICBibnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUAyMQogICAgcHVzaGJ5dGVzICJFUlI6RlNWRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGU1ZGCgpjcmVhdGVQb29sRW50cmllc19hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKHBvb2xUeXBlID09PSBQT09MX1NUQUtJTkdfVFlQRV9IRUFSVEJFQVQpIHsKICAgIGRpZyAxCiAgICBieXRlYyA3IC8vIDB4MGEKICAgID09CiAgICBieiBjcmVhdGVQb29sRW50cmllc19hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzY0CiAgICAvLyBpZiAoYXNzZXQgIT09IDApIHsKICAgIGRpZyAyCiAgICBieiBjcmVhdGVQb29sRW50cmllc19lbHNlX2JvZHlAMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIChbYmFsYW5jZSwgb3B0ZWRJbl0gPSBBc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKFR4bi5zZW5kZXIsIGFzc2V0KSkKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGNvdmVyIDQKICAgIGZyYW1lX2J1cnkgMgoKY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NzAKICAgIC8vIGxvZ2dlZEFzc2VydChvcHRlZEluICYmIGJhbGFuY2UgPj0gcXVhbnRpdHksIEVSUl9VU0VSX0JBTEFOQ0VfVE9PX0xPVykKICAgIHVuY292ZXIgMwogICAgYnogY3JlYXRlUG9vbEVudHJpZXNfYm9vbF9mYWxzZUAyOAogICAgZnJhbWVfZGlnIDIKICAgIGRpZyA1CiAgICA+PQogICAgYnogY3JlYXRlUG9vbEVudHJpZXNfYm9vbF9mYWxzZUAyOAogICAgaW50Y18xIC8vIDEKCmNyZWF0ZVBvb2xFbnRyaWVzX2Jvb2xfbWVyZ2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyBsb2dnZWRBc3NlcnQob3B0ZWRJbiAmJiBiYWxhbmNlID49IHF1YW50aXR5LCBFUlJfVVNFUl9CQUxBTkNFX1RPT19MT1cpCiAgICBibnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUAzMgogICAgcHVzaGJ5dGVzICJFUlI6VUJMTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpVQkxPCgpjcmVhdGVQb29sRW50cmllc19hZnRlcl9pZl9lbHNlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc3NAogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NzMtNzc2CiAgICAvLyBjb25zdCBhS2V5ID0gewogICAgLy8gICBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgLy8gICBhc3NldCwKICAgIC8vIH0KICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NzcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5lbnRyaWVzQnlBZGRyZXNzKGFLZXkpLmV4aXN0cywgRVJSX0VOVFJZX0FMUkVBRFlfRVhJU1RTKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEVudHJ5S2V5LCB1aW50NjQ+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgMjcgLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmVudHJpZXNCeUFkZHJlc3MoYUtleSkuZXhpc3RzLCBFUlJfRU5UUllfQUxSRUFEWV9FWElTVFMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2Fzc2VydEAzNAogICAgYnl0ZWMgNDQgLy8gIkVSUjpFRVhTIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkVFWFMKCmNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2Fzc2VydEAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NzkKICAgIC8vIGlmIChwb29sVHlwZSA9PT0gUE9PTF9TVEFLSU5HX1RZUEVfU09GVCkgewogICAgZGlnIDIKICAgIGJ5dGVjIDEwIC8vIDB4MTQKICAgID09CiAgICBieiBjcmVhdGVQb29sRW50cmllc19lbHNlX2JvZHlAMzgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3ODAtNzg5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jb21taXRBcHBTb2Z0U3Rha2U+KHsKICAgIC8vICAgYXBwSWQ6IHN0YWtpbmcsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogc3Rha2luZy5hZGRyZXNzLCBhbW91bnQ6IEFwcFN0YWtlc01CUiB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0LAogICAgLy8gICAgIHF1YW50aXR5LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc4MwogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IHN0YWtpbmcuYWRkcmVzcywgYW1vdW50OiBBcHBTdGFrZXNNQlIgfSksCiAgICBkaWcgNAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjIDEzIC8vIDM0OTAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc4MC03ODkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmNvbW1pdEFwcFNvZnRTdGFrZT4oewogICAgLy8gICBhcHBJZDogc3Rha2luZywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBzdGFraW5nLmFkZHJlc3MsIGFtb3VudDogQXBwU3Rha2VzTUJSIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXQsCiAgICAvLyAgICAgcXVhbnRpdHksCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3ODQKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3ODAtNzg5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5jb21taXRBcHBTb2Z0U3Rha2U+KHsKICAgIC8vICAgYXBwSWQ6IHN0YWtpbmcsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoeyByZWNlaXZlcjogc3Rha2luZy5hZGRyZXNzLCBhbW91bnQ6IEFwcFN0YWtlc01CUiB9KSwKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0LAogICAgLy8gICAgIHF1YW50aXR5LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4MGQwMzdjODkgLy8gbWV0aG9kICJjb21taXRBcHBTb2Z0U3Rha2UocGF5LGFkZHJlc3MsdWludDY0LHVpbnQ2NCxib29sKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3ODcKICAgIC8vIHRydWUsCiAgICBieXRlYyAyMSAvLyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc4MC03ODkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmNvbW1pdEFwcFNvZnRTdGFrZT4oewogICAgLy8gICBhcHBJZDogc3Rha2luZywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBzdGFraW5nLmFkZHJlc3MsIGFtb3VudDogQXBwU3Rha2VzTUJSIH0pLAogICAgLy8gICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXQsCiAgICAvLyAgICAgcXVhbnRpdHksCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMDQKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5lbnRyeUlELnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyBjb25zdCBpZCA9IHRoaXMuZW50cnlJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIHRoaXMuZW50cnlJRC52YWx1ZSArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyBlbnRyeUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIHRoaXMuZW50cnlJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gYWRkcmVzczogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MDYtODEyCiAgICAvLyB0aGlzLmVudHJpZXMoZW50cnlJRCkudmFsdWUgPSB7CiAgICAvLyAgIGFkZHJlc3M6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBxdWFudGl0eSwKICAgIC8vICAgZ2F0ZUFyZ3M6IGNsb25lKGdhdGVBcmdzKSwKICAgIC8vICAgZGlzcXVhbGlmaWVkOiBmYWxzZQogICAgLy8gfQogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDMzMDAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MDYKICAgIC8vIHRoaXMuZW50cmllcyhlbnRyeUlEKS52YWx1ZSA9IHsKICAgIHN3YXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBQb29sQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMTEgLy8gImUiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODA2LTgxMgogICAgLy8gdGhpcy5lbnRyaWVzKGVudHJ5SUQpLnZhbHVlID0gewogICAgLy8gICBhZGRyZXNzOiBUeG4uc2VuZGVyLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgcXVhbnRpdHksCiAgICAvLyAgIGdhdGVBcmdzOiBjbG9uZShnYXRlQXJncyksCiAgICAvLyAgIGRpc3F1YWxpZmllZDogZmFsc2UKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhhS2V5KS52YWx1ZSA9IGVudHJ5SUQKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gdW5pcXVlcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBQb29sR2xvYmFsU3RhdGVLZXlVbmlxdWVzIH0pCiAgICBieXRlYyAyOCAvLyAidSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MTUKICAgIC8vIGlmICghdGhpcy51bmlxdWVzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gdW5pcXVlcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBQb29sR2xvYmFsU3RhdGVLZXlVbmlxdWVzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MTUKICAgIC8vIGlmICghdGhpcy51bmlxdWVzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUA0NgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gdW5pcXVlcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBQb29sR2xvYmFsU3RhdGVLZXlVbmlxdWVzIH0pCiAgICBieXRlYyAyOCAvLyAidSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MTYKICAgIC8vIHRoaXMudW5pcXVlcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGVudHJpZXMubGVuZ3RoICAvLyBvciBhbnkgbm9uLXplcm8gdmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxOTIKICAgIC8vIHVuaXF1ZXMgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUG9vbEdsb2JhbFN0YXRlS2V5VW5pcXVlcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6ODE2CiAgICAvLyB0aGlzLnVuaXF1ZXMoVHhuLnNlbmRlcikudmFsdWUgPSBlbnRyaWVzLmxlbmd0aCAgLy8gb3IgYW55IG5vbi16ZXJvIHZhbHVlCiAgICBmcmFtZV9kaWcgMQogICAgaXRvYgogICAgYm94X3B1dAoKY3JlYXRlUG9vbEVudHJpZXNfYWZ0ZXJfaWZfZWxzZUA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NDEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBjcmVhdGVQb29sRW50cmllc193aGlsZV90b3BAMTMKCmNyZWF0ZVBvb2xFbnRyaWVzX2Vsc2VfYm9keUAzODoKICAgIHVuY292ZXIgNwogICAgcG9wCiAgICB1bmNvdmVyIDcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc5MAogICAgLy8gfSBlbHNlIGlmIChwb29sVHlwZSAhPT0gUE9PTF9TVEFLSU5HX1RZUEVfTk9ORSkgewogICAgZGlnIDIKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgIT0KICAgIGJ6IGNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2lmX2Vsc2VANDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3OTEtODAwCiAgICAvLyBjb25zdCBzdGFrZUluZm8gPSBhYmlDYWxsPHR5cGVvZiBTdGFraW5nLnByb3RvdHlwZS5nZXRJbmZvPih7CiAgICAvLyAgIGFwcElkOiBzdGFraW5nLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICB7CiAgICAvLyAgICAgICBhc3NldCwKICAgIC8vICAgICAgIHR5cGU6IHBvb2xUeXBlLAogICAgLy8gICAgIH0sCiAgICAvLyAgIF0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc5NAogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3OTUtNzk4CiAgICAvLyB7CiAgICAvLyAgIGFzc2V0LAogICAgLy8gICB0eXBlOiBwb29sVHlwZSwKICAgIC8vIH0sCiAgICBkaWcgMgogICAgZGlnIDQKICAgIGNvbmNhdAogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc5MS04MDAKICAgIC8vIGNvbnN0IHN0YWtlSW5mbyA9IGFiaUNhbGw8dHlwZW9mIFN0YWtpbmcucHJvdG90eXBlLmdldEluZm8+KHsKICAgIC8vICAgYXBwSWQ6IHN0YWtpbmcsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgIHsKICAgIC8vICAgICAgIGFzc2V0LAogICAgLy8gICAgICAgdHlwZTogcG9vbFR5cGUsCiAgICAvLyAgICAgfSwKICAgIC8vICAgXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBieXRlYyA0MyAvLyBtZXRob2QgImdldEluZm8oYWRkcmVzcywodWludDY0LHVpbnQ4KSkodWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N0YWtpbmcvdHlwZXMudHM6OlN0YWtlCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIGxvZ2dlZEFzc2VydChzdGFrZUluZm8uYW1vdW50ID49IHF1YW50aXR5LCBFUlJfVVNFUl9TVEFLRV9UT09fTE9XKQogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyA2CiAgICA+PQogICAgYm56IGNyZWF0ZVBvb2xFbnRyaWVzX2FmdGVyX2lmX2Vsc2VANDQKICAgIHB1c2hieXRlcyAiRVJSOlVTTE8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VVNMTwoKY3JlYXRlUG9vbEVudHJpZXNfYm9vbF9mYWxzZUAyODoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZVBvb2xFbnRyaWVzX2Jvb2xfbWVyZ2VAMjkKCmNyZWF0ZVBvb2xFbnRyaWVzX2Vsc2VfYm9keUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3NjcKICAgIC8vIG9wdGVkSW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjc2OAogICAgLy8gYmFsYW5jZSA9IFR4bi5zZW5kZXIuYmFsYW5jZQogICAgdHhuIFNlbmRlcgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgYiBjcmVhdGVQb29sRW50cmllc19hZnRlcl9pZl9lbHNlQDI1CgpjcmVhdGVQb29sRW50cmllc19hZnRlcl93aGlsZUA0NzoKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmQocGF5bWVudDogdWludDY0LCByZXdhcmQ6IGJ5dGVzKSAtPiBieXRlczoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTEzCiAgICAvLyBhZGRSZXdhcmQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCByZXdhcmQ6IEFkZFJld2FyZFBhcmFtcyk6IHZvaWQgewogICAgcHJvdG8gMiAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5MTQKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIEVSUl9GT1JCSURERU4pCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE3NwogICAgLy8gY3JlYXRvciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlDcmVhdG9yIH0pCiAgICBieXRlYyAxNiAvLyAiY3JlYXRvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5MTQKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmNyZWF0b3IudmFsdWUsIEVSUl9GT1JCSURERU4pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMzggLy8gIkVSUjpGT1JCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZPUkIKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkxNQogICAgLy8gaWYgKFR4bi5hcHBsaWNhdGlvbkFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuYWRkUmV3YXJkKSkgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMzQgLy8gbWV0aG9kICJhZGRSZXdhcmQocGF5LCh1aW50NjQsdWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSl2b2lkIgogICAgPT0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkxNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHJld2FyZC5hc3NldCA9PT0gMCwgRVJSX05PVF9BTEdPKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2lmX2Vsc2VANgogICAgcHVzaGJ5dGVzICJFUlI6TkFMRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOQUxHCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Njg2CiAgICAvLyBpZiAocmV3YXJkLmRpc3RyaWJ1dGlvbiA9PT0gRGlzdHJpYnV0aW9uVHlwZVBlcmNlbnRhZ2UpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4IDEKICAgIGR1cAogICAgYnl0ZWMgNyAvLyAweDBhCiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYWZ0ZXJfaWZfZWxzZUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VLZXkudmFsdWUuYWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfU1RBS0VfS0VZX1JFUVVJUkVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHN0YWtlS2V5ID0gR2xvYmFsU3RhdGU8Um9vdEtleT4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVN0YWtlS2V5IH0pCiAgICBieXRlYyAyNSAvLyAic3Rha2Vfa2V5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Rha2VLZXkudmFsdWUuYWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfU1RBS0VfS0VZX1JFUVVJUkVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGV4dHJhY3QgMCAzMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2lmX2Vsc2VAMTgKICAgIHB1c2hieXRlcyAiRVJSOlNLWVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0tZUgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGlmIChyZXdhcmQuZGlzdHJpYnV0aW9uID09PSBEaXN0cmlidXRpb25UeXBlU2h1ZmZsZSkgewogICAgZHVwCiAgICBieXRlYyAzMiAvLyAweDI4CiAgICA9PQogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYWZ0ZXJfaWZfZWxzZUAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjY5MwogICAgLy8gcmV3YXJkLndpbm5lckNvdW50ID4gMCAmJiByZXdhcmQucmF0ZSA+IHJld2FyZC53aW5uZXJDb3VudCAmJiByZXdhcmQud2lubmVyQ291bnQgPD0gV2lubmVyQ291bnRDYXAsCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMzMKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYm9vbF9mYWxzZUAyMwogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgMAogICAgPgogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYm9vbF9mYWxzZUAyMwogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgMTAKICAgIDw9CiAgICBieiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9ib29sX2ZhbHNlQDIzCiAgICBpbnRjXzEgLy8gMQoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYm9vbF9tZXJnZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo2OTItNjk1CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIHJld2FyZC53aW5uZXJDb3VudCA+IDAgJiYgcmV3YXJkLnJhdGUgPiByZXdhcmQud2lubmVyQ291bnQgJiYgcmV3YXJkLndpbm5lckNvdW50IDw9IFdpbm5lckNvdW50Q2FwLAogICAgLy8gICBFUlJfUkFURV9NVVNUX0JFX0dSRUFURVJfVEhBTl9XSU5ORVJfQ09VTlQKICAgIC8vICkKICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9hZnRlcl9pZl9lbHNlQDI2CiAgICBwdXNoYnl0ZXMgIkVSUjpSTUdXIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlJNR1cKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6Njk5CiAgICAvLyBpZiAocmV3YXJkLmRpc3RyaWJ1dGlvbiA9PT0gRGlzdHJpYnV0aW9uVHlwZUV2ZW4pIHsKICAgIGR1cAogICAgYnl0ZWMgMTQgLy8gMHgxZQogICAgPT0KICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2lmX2Vsc2VAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1heEVudHJpZXMudmFsdWUgPD0gcmV3YXJkLnJhdGUsIEVSUl9NQVhfRU5UUklFU19DQU5OT1RfQkVfR1JFQVRFUl9USEFOX1JBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gbWF4RW50cmllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleU1heEVudHJpZXMgfSkKICAgIGJ5dGVjIDE5IC8vICJtYXhfZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLm1heEVudHJpZXMudmFsdWUgPD0gcmV3YXJkLnJhdGUsIEVSUl9NQVhfRU5UUklFU19DQU5OT1RfQkVfR1JFQVRFUl9USEFOX1JBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDkKICAgIGV4dHJhY3RfdWludDY0CiAgICA8PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2lmX2Vsc2VAMjkKICAgIHB1c2hieXRlcyAiRVJSOk1FR1IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUVHUgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYWZ0ZXJfaWZfZWxzZUAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo3MDMKICAgIC8vIGxvZ2dlZEFzc2VydChyZXdhcmQucmF0ZSA+IDAsIEVSUl9SQVRFX01VU1RfQkVfR1JFQVRFUl9USEFOX1pFUk8pCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgOQogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2Fzc2VydEAzMQogICAgcHVzaGJ5dGVzICJFUlI6Uk1HWiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTUdaCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9hZnRlcl9hc3NlcnRAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTIxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDE4IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmFkZFJld2FyZF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPj0gdGhpcy5yZXdhcmRzTWJyKHJld2FyZC53aW5uZXJDb3VudCksIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDMzCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2Jhc2UudHM6OQogICAgLy8gcmV0dXJuIE1pblBvb2xSZXdhcmRzTUJSICsgKEJveENvc3RQZXJCeXRlICogUG9vbFJld2FyZFdpbm5pbmdUaWNrZXRCeXRlcyAqIHdpbm5pbmdUaWNrZXRzKQogICAgcHVzaGludCAzMjAwCiAgICAqCiAgICBpbnRjIDEyIC8vIDU5NzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPj0gdGhpcy5yZXdhcmRzTWJyKHJld2FyZC53aW5uZXJDb3VudCksIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICA+PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTggLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMTAKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZXdhcmRJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIHJld2FyZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlSZXdhcmRDb3VudCB9KQogICAgYnl0ZWMgMjQgLy8gInJld2FyZF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMTAKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5yZXdhcmRJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHRoaXMucmV3YXJkSUQudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gcmV3YXJkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVJld2FyZENvdW50IH0pCiAgICBieXRlYyAyNCAvLyAicmV3YXJkX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gdGhpcy5yZXdhcmRJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkyNgogICAgLy8gLi4uY2xvbmUocmV3YXJkKSwKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAwIDgKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAxNyA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMjUgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gd2lubmluZ1RpY2tldHM6IFtdIGFzIHVpbnQ2NFtdLAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5MjUtOTQyCiAgICAvLyB0aGlzLnJld2FyZHMoaWQpLnZhbHVlID0gewogICAgLy8gICAuLi5jbG9uZShyZXdhcmQpLAogICAgLy8gICBxdWFsaWZpZWRTdGFrZXJzOiAwLAogICAgLy8gICBxdWFsaWZpZWRTdGFrZTogMCwKICAgIC8vICAgcm95YWx0eUFtb3VudDogMCwKICAgIC8vICAgd2lubmluZ1RpY2tldHM6IFtdIGFzIHVpbnQ2NFtdLAogICAgLy8gICByYWZmbGVDdXJzb3I6IHsKICAgIC8vICAgICB0aWNrZXQ6IDAsCiAgICAvLyAgICAgc3Rha2U6IDAsCiAgICAvLyAgICAgZGlzYnVyc2VkOiAwCiAgICAvLyAgIH0sCiAgICAvLyAgIHZyZkZhaWx1cmVDb3VudDogMCwKICAgIC8vICAgcGhhc2U6IERpc2J1cnNlbWVudFBoYXNlSWRsZSwKICAgIC8vICAgZGlzYnVyc2VtZW50Q3Vyc29yOiAxLAogICAgLy8gICBhY3RpdmVEaXNidXJzZW1lbnRJRDogMCwKICAgIC8vICAgYWN0aXZlRGlzYnVyc2VtZW50Um91bmRTdGFydDogMCwKICAgIC8vICAgbGFzdERpc2J1cnNlbWVudFRpbWVzdGFtcDogMAogICAgLy8gfQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwODQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkzNwogICAgLy8gcGhhc2U6IERpc2J1cnNlbWVudFBoYXNlSWRsZSwKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkyNS05NDIKICAgIC8vIHRoaXMucmV3YXJkcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIC4uLmNsb25lKHJld2FyZCksCiAgICAvLyAgIHF1YWxpZmllZFN0YWtlcnM6IDAsCiAgICAvLyAgIHF1YWxpZmllZFN0YWtlOiAwLAogICAgLy8gICByb3lhbHR5QW1vdW50OiAwLAogICAgLy8gICB3aW5uaW5nVGlja2V0czogW10gYXMgdWludDY0W10sCiAgICAvLyAgIHJhZmZsZUN1cnNvcjogewogICAgLy8gICAgIHRpY2tldDogMCwKICAgIC8vICAgICBzdGFrZTogMCwKICAgIC8vICAgICBkaXNidXJzZWQ6IDAKICAgIC8vICAgfSwKICAgIC8vICAgdnJmRmFpbHVyZUNvdW50OiAwLAogICAgLy8gICBwaGFzZTogRGlzYnVyc2VtZW50UGhhc2VJZGxlLAogICAgLy8gICBkaXNidXJzZW1lbnRDdXJzb3I6IDEsCiAgICAvLyAgIGFjdGl2ZURpc2J1cnNlbWVudElEOiAwLAogICAgLy8gICBhY3RpdmVEaXNidXJzZW1lbnRSb3VuZFN0YXJ0OiAwLAogICAgLy8gICBsYXN0RGlzYnVyc2VtZW50VGltZXN0YW1wOiAwCiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIGRpc2J1cnNlbWVudEN1cnNvcjogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTI1LTk0MgogICAgLy8gdGhpcy5yZXdhcmRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgLi4uY2xvbmUocmV3YXJkKSwKICAgIC8vICAgcXVhbGlmaWVkU3Rha2VyczogMCwKICAgIC8vICAgcXVhbGlmaWVkU3Rha2U6IDAsCiAgICAvLyAgIHJveWFsdHlBbW91bnQ6IDAsCiAgICAvLyAgIHdpbm5pbmdUaWNrZXRzOiBbXSBhcyB1aW50NjRbXSwKICAgIC8vICAgcmFmZmxlQ3Vyc29yOiB7CiAgICAvLyAgICAgdGlja2V0OiAwLAogICAgLy8gICAgIHN0YWtlOiAwLAogICAgLy8gICAgIGRpc2J1cnNlZDogMAogICAgLy8gICB9LAogICAgLy8gICB2cmZGYWlsdXJlQ291bnQ6IDAsCiAgICAvLyAgIHBoYXNlOiBEaXNidXJzZW1lbnRQaGFzZUlkbGUsCiAgICAvLyAgIGRpc2J1cnNlbWVudEN1cnNvcjogMSwKICAgIC8vICAgYWN0aXZlRGlzYnVyc2VtZW50SUQ6IDAsCiAgICAvLyAgIGFjdGl2ZURpc2J1cnNlbWVudFJvdW5kU3RhcnQ6IDAsCiAgICAvLyAgIGxhc3REaXNidXJzZW1lbnRUaW1lc3RhbXA6IDAKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyB3aW5uaW5nVGlja2V0czogW10gYXMgdWludDY0W10sCiAgICBieXRlYyA1IC8vIDB4MDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjkyNS05NDIKICAgIC8vIHRoaXMucmV3YXJkcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIC4uLmNsb25lKHJld2FyZCksCiAgICAvLyAgIHF1YWxpZmllZFN0YWtlcnM6IDAsCiAgICAvLyAgIHF1YWxpZmllZFN0YWtlOiAwLAogICAgLy8gICByb3lhbHR5QW1vdW50OiAwLAogICAgLy8gICB3aW5uaW5nVGlja2V0czogW10gYXMgdWludDY0W10sCiAgICAvLyAgIHJhZmZsZUN1cnNvcjogewogICAgLy8gICAgIHRpY2tldDogMCwKICAgIC8vICAgICBzdGFrZTogMCwKICAgIC8vICAgICBkaXNidXJzZWQ6IDAKICAgIC8vICAgfSwKICAgIC8vICAgdnJmRmFpbHVyZUNvdW50OiAwLAogICAgLy8gICBwaGFzZTogRGlzYnVyc2VtZW50UGhhc2VJZGxlLAogICAgLy8gICBkaXNidXJzZW1lbnRDdXJzb3I6IDEsCiAgICAvLyAgIGFjdGl2ZURpc2J1cnNlbWVudElEOiAwLAogICAgLy8gICBhY3RpdmVEaXNidXJzZW1lbnRSb3VuZFN0YXJ0OiAwLAogICAgLy8gICBsYXN0RGlzYnVyc2VtZW50VGltZXN0YW1wOiAwCiAgICAvLyB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo5MjUKICAgIC8vIHRoaXMucmV3YXJkcyhpZCkudmFsdWUgPSB7CiAgICBzd2FwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyByZXdhcmRzID0gQm94TWFwPHVpbnQ2NCwgUmV3YXJkPih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeFJld2FyZHMgfSkKICAgIGJ5dGVjIDIyIC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OTI1LTk0MgogICAgLy8gdGhpcy5yZXdhcmRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgLi4uY2xvbmUocmV3YXJkKSwKICAgIC8vICAgcXVhbGlmaWVkU3Rha2VyczogMCwKICAgIC8vICAgcXVhbGlmaWVkU3Rha2U6IDAsCiAgICAvLyAgIHJveWFsdHlBbW91bnQ6IDAsCiAgICAvLyAgIHdpbm5pbmdUaWNrZXRzOiBbXSBhcyB1aW50NjRbXSwKICAgIC8vICAgcmFmZmxlQ3Vyc29yOiB7CiAgICAvLyAgICAgdGlja2V0OiAwLAogICAgLy8gICAgIHN0YWtlOiAwLAogICAgLy8gICAgIGRpc2J1cnNlZDogMAogICAgLy8gICB9LAogICAgLy8gICB2cmZGYWlsdXJlQ291bnQ6IDAsCiAgICAvLyAgIHBoYXNlOiBEaXNidXJzZW1lbnRQaGFzZUlkbGUsCiAgICAvLyAgIGRpc2J1cnNlbWVudEN1cnNvcjogMSwKICAgIC8vICAgYWN0aXZlRGlzYnVyc2VtZW50SUQ6IDAsCiAgICAvLyAgIGFjdGl2ZURpc2J1cnNlbWVudFJvdW5kU3RhcnQ6IDAsCiAgICAvLyAgIGxhc3REaXNidXJzZW1lbnRUaW1lc3RhbXA6IDAKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5hZGRSZXdhcmRfYm9vbF9mYWxzZUAyMzoKICAgIGludGNfMCAvLyAwCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuYWRkUmV3YXJkX2Jvb2xfbWVyZ2VAMjQKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZShyZXdhcmRJRDogdWludDY0KSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDI0CiAgICAvLyByYWZmbGUocmV3YXJkSUQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDI1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZXdhcmRzKHJld2FyZElEKS5leGlzdHMsIEVSUl9SRVdBUkRfTk9UX0ZPVU5EKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyByZXdhcmRzID0gQm94TWFwPHVpbnQ2NCwgUmV3YXJkPih7IGtleVByZWZpeDogUG9vbEJveFByZWZpeFJld2FyZHMgfSkKICAgIGJ5dGVjIDIyIC8vICJyIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDI1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZXdhcmRzKHJld2FyZElEKS5leGlzdHMsIEVSUl9SRVdBUkRfTk9UX0ZPVU5EKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDI2IC8vICJFUlI6Uk5GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTkZECgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDMzCiAgICAvLyB9ID0gY2xvbmUodGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZSkKICAgIGR1cG4gMgogICAgcHVzaGludCA5OQogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkaWcgMQogICAgcHVzaGludCAxMTYKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgY292ZXIgMwogICAgZGlnIDEKICAgIHB1c2hpbnQgOTEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgY292ZXIgMwogICAgZGlnIDEKICAgIHB1c2hpbnQgNDEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgY292ZXIgMwogICAgc3dhcAogICAgcHVzaGludCA1NwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDM1CiAgICAvLyBsb2dnZWRBc3NlcnQocGhhc2UgPT09IERpc2J1cnNlbWVudFBoYXNlQWxsb2NhdGlvbiwgRVJSX0lOVkFMSURfRElTQlVSU0VNRU5UX1BIQVNFKQogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6SURQSCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJRFBICgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDM2CiAgICAvLyBsb2dnZWRBc3NlcnQod2lubmluZ1RpY2tldHMubGVuZ3RoID09PSAwLCBFUlJfV0lOTklOR19USUNLRVRTX0FMUkVBRFlfRVhJU1QpCiAgICBkdXAKICAgIGludGMgNyAvLyAxMzIKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOldUQUUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V1RBRQoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTAzOAogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gYWN0aXZlRGlzYnVyc2VtZW50Um91bmRTdGFydCArIDEgKyAoNCAqIHZyZkZhaWx1cmVDb3VudCkKICAgIHVuY292ZXIgMwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHB1c2hpbnQgNAogICAgdW5jb3ZlciA0CiAgICAqCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA0MC0xMDQzCiAgICAvLyBjb25zdCBzZWVkID0gYWJpQ2FsbDx0eXBlb2YgUmFuZG9tbmVzc0JlYWNvbi5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgLy8gICBhcmdzOiBbcm91bmRUb1VzZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA0MgogICAgLy8gYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE4NQogICAgLy8gc2FsdCA9IEdsb2JhbFN0YXRlPGJ5dGVzPDMyPj4oeyBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDM2IC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNDIKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBieXRlYyAzNSAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNDEKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDQwLTEwNDMKICAgIC8vIGNvbnN0IHNlZWQgPSBhYmlDYWxsPHR5cGVvZiBSYW5kb21uZXNzQmVhY29uLnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICAvLyAgIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDE4OTM5MmM1IC8vIG1ldGhvZCAiZ2V0KHVpbnQ2NCxieXRlW10pYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDQ1CiAgICAvLyBpZiAoc2VlZC5sZW5ndGggPT09IDApIHsKICAgIGxlbgogICAgZHVwCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfaWZfZWxzZUA5CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDQ2CiAgICAvLyB0aGlzLnJld2FyZHMocmV3YXJkSUQpLnZhbHVlLnZyZkZhaWx1cmVDb3VudCArPSAxCiAgICBkdXAKICAgIHB1c2hpbnQgOTEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgOTEKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA0NwogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDUxCiAgICAvLyBjb25zdCBybmdTdGF0ZSA9IHBjZzY0SW5pdChzZWVkLnNsaWNlKDAsIDE2KSkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTYKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxNgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTcKICAgIC8vIGxvZ2dlZEFzc2VydChzZWVkLmxlbmd0aCA9PT0gMTYsIEVSUl9JTlZBTElEX1JBTkRPTV9TRUVEKQogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2FmdGVyX2Fzc2VydEAzOQogICAgcHVzaGJ5dGVzICJFUlI6SVJTRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUlNECgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9hc3NlcnRAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OAogICAgLy8gY29uc3Qgc3RhdGUgPSBfX3BjZzMyU3RlcCgwLCBpbmNyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA1IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDggLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk5CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhzdGF0ZSwgaW5pdGlhbFN0YXRlKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA1IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIHVuY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OQogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDUgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxOS0yMgogICAgLy8gcmV0dXJuIFsKICAgIC8vICAgICBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIC8vIF0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA1NQogICAgLy8gaWYgKHVwcGVyQm91bmQgPCBNQVhfVUlOVDY0KSB7CiAgICBkaWcgMQogICAgaW50YyAxNCAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgPAogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2lmX2JvZHlAMTAKICAgIHN3YXAKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgRHluYW1pY0FycmF5PGFyYzQuVWludDY0PigpCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgZnJhbWVfYnVyeSAwCiAgICBieXRlYyA1IC8vIDB4MDAwMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0MwogICAgLy8gaWYgKHVwcGVyQm91bmQgIT09IDApIHsKICAgIGR1cAogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfZWxzZV9ib2R5QDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ0CiAgICAvLyBsb2dnZWRBc3NlcnQodXBwZXJCb3VuZCA+IDEsIEVSUl9JTlZBTElEX1JBTkRPTV9CT1VORFMpCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfYXNzZXJ0QDIxCiAgICBieXRlYyA0NSAvLyAiRVJSOklSQkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJCRAoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfYXNzZXJ0QDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgRVJSX0lOVkFMSURfUkFORE9NX0JPVU5EUykKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMDU5CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgd2lubmVyQ291bnQpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgRVJSX0lOVkFMSURfUkFORE9NX0JPVU5EUykKICAgID4KICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9pZl9lbHNlQDI3CiAgICBieXRlYyA0NSAvLyAiRVJSOklSQkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJCRAoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfaWZfZWxzZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIGR1cG4gMgogICAgfgogICAgaW50Y18xIC8vIDEKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NAogICAgLy8gY29uc3QgdGhyZXNob2xkOiB1aW50NjQgPSBfX3VpbnQ2NFR3b3MoYWJzb2x1dGVCb3VuZCkgJSBhYnNvbHV0ZUJvdW5kCiAgICBzd2FwCiAgICAlCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9kaWcgMQoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfd2hpbGVfdG9wQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBkaWcgMwogICAgZnJhbWVfZGlnIDIKICAgIDwKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2FmdGVyX3doaWxlQDM0CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV93aGlsZV90b3BAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNSAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGludGMgOCAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDcKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfdGVybmFyeV9mYWxzZUA0MgogICAgcHVzaGludCAyODg1MzkwMDgxNzc3OTI2ODE4CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV90ZXJuYXJ5X21lcmdlQDQzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBzd2FwCiAgICBkdXAKICAgIGludGMgNSAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEzCiAgICAvLyByZXR1cm4gW1tuZXdTdGF0ZTEsIG5ld1N0YXRlMl0sIG9wLnNobChfX3BjZzMyT3V0cHV0KHN0YXRlWzBdKSwgMzIpIHwgX19wY2czMk91dHB1dChzdGF0ZVsxXSldCiAgICB1bmNvdmVyIDYKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBjYWxsc3ViIF9fcGNnMzJPdXRwdXQKICAgIHB1c2hpbnQgMzIKICAgIHNobAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIF9fcGNnMzJPdXRwdXQKICAgIHwKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1OAogICAgLy8gY29uc3QgW25ld1N0YXRlLCBjYW5kaWRhdGVdID0gX19wY2c2NFVuYm91bmRlZFJhbmRvbShzdGF0ZSkKICAgIGR1cAogICAgZXh0cmFjdCAwIDE2CiAgICBjb3ZlciA1CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYwCiAgICAvLyBpZiAoY2FuZGlkYXRlID49IHRocmVzaG9sZCkgewogICAgZGlnIDcKICAgID49CiAgICBieiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBkaWcgMQogICAgJQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjEwNTkKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCB3aW5uZXJDb3VudCkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICArCiAgICBpdG9iCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDQKICAgIGIgc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfd2hpbGVfdG9wQDI4CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9pZl9lbHNlQDMyOgogICAgcG9wCiAgICB1bmNvdmVyIDQKICAgIGIgc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfd2hpbGVfdG9wQDMwCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIGIgc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfdGVybmFyeV9tZXJnZUA0MwoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfYWZ0ZXJfd2hpbGVAMzQ6CiAgICBidXJ5IDEKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjY4CiAgICAvLyByZXR1cm4gW3N0YXRlLCByZXN1bHRdCiAgICBwdXNoYnl0ZXMgMHgwMDEyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA2MQogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS53aW5uaW5nVGlja2V0cyA9IGRlY29kZUFyYzQ8dWludDY0W10+KHJuZ1Jlc3VsdFsxXS5ieXRlcykKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDY1CiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIGV4dHJhY3QzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGRpZyAxCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA2MgogICAgLy8gdGhpcy5yZXdhcmRzKHJld2FyZElEKS52YWx1ZS52cmZGYWlsdXJlQ291bnQgPSAwCiAgICBwdXNoaW50IDkxCiAgICBmcmFtZV9kaWcgMAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5yYWZmbGVfZWxzZV9ib2R5QDI0OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjUxCiAgICAvLyBhYnNvbHV0ZUJvdW5kID0gb3AuYnRvaShCeXRlcyhCaWdVaW50KDIgKiogNjQpIC0gQmlnVWludChsb3dlckJvdW5kKSkpCiAgICBpbnRjIDE0IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjcKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wucmFmZmxlX2lmX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTA1NgogICAgLy8gdXBwZXJCb3VuZCArPSAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnJhZmZsZV9hZnRlcl9pZl9lbHNlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3BlbigpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3BlbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY1CiAgICAvLyB0aGlzLnN0YXR1cy52YWx1ZSAhPT0gUG9vbFN0YXR1c0RyYWZ0ICYmCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gc3RhdHVzID0gR2xvYmFsU3RhdGU8U3Rha2luZ1Bvb2xTdGF0dXM+KHsga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlTdGF0dXMgfSkKICAgIGJ5dGVjIDEzIC8vICJzdGF0dXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE2NQogICAgLy8gdGhpcy5zdGF0dXMudmFsdWUgIT09IFBvb2xTdGF0dXNEcmFmdCAmJgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gMHgwMAogICAgIT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY1LTExNjYKICAgIC8vIHRoaXMuc3RhdHVzLnZhbHVlICE9PSBQb29sU3RhdHVzRHJhZnQgJiYKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIHx8IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID09PSAwKSAmJgogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY2CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSB8fCB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9PT0gMCkgJiYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY2CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSB8fCB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9PT0gMCkgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuc2lnblVwc09wZW5fYW5kX2NvbnRkQDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY2CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSB8fCB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9PT0gMCkgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9ib29sX2ZhbHNlQDgKCnNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuc2lnblVwc09wZW5fYW5kX2NvbnRkQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE2OQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnNpZ251cFRpbWVzdGFtcC52YWx1ZSAmJgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIHNpZ251cFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U2lnbnVwVGltZXN0YW1wIH0pCiAgICBieXRlYyAyMyAvLyAic2lnbnVwX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY5CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc2lnbnVwVGltZXN0YW1wLnZhbHVlICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY5LTExNzAKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zaWdudXBUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnNpZ25VcHNPcGVuX29yX2NvbnRkQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTcwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBQb29sR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTIgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTcwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTY5LTExNzAKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zaWdudXBUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9ib29sX3RydWVANwoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9vcl9jb250ZEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNzMKICAgIC8vIHRoaXMuYWxsb3dMYXRlU2lnbnVwcy52YWx1ZSAmJgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIGFsbG93TGF0ZVNpZ251cHMgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5QWxsb3dMYXRlU2lnbnVwcyB9KQogICAgYnl0ZWMgMTUgLy8gImFsbG93X2xhdGVfc2lnbnVwcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTczCiAgICAvLyB0aGlzLmFsbG93TGF0ZVNpZ251cHMudmFsdWUgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE3My0xMTc0CiAgICAvLyB0aGlzLmFsbG93TGF0ZVNpZ251cHMudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTc0CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDEyIC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE3NAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTczLTExNzQKICAgIC8vIHRoaXMuYWxsb3dMYXRlU2lnbnVwcy52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLnNpZ25VcHNPcGVuX2Jvb2xfZmFsc2VAOAoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9ib29sX3RydWVANzoKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE2NC0xMTc3CiAgICAvLyByZXR1cm4gKAogICAgLy8gICB0aGlzLnN0YXR1cy52YWx1ZSAhPT0gUG9vbFN0YXR1c0RyYWZ0ICYmCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIHx8IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID09PSAwKSAmJgogICAgLy8gICAoCiAgICAvLyAgICAgKAogICAgLy8gICAgICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnNpZ251cFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICAgICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUKICAgIC8vICAgICApIHx8CiAgICAvLyAgICAgKAogICAgLy8gICAgICAgdGhpcy5hbGxvd0xhdGVTaWdudXBzLnZhbHVlICYmCiAgICAvLyAgICAgICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUKICAgIC8vICAgICApCiAgICAvLyAgICkKICAgIC8vICkKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5zaWduVXBzT3Blbl9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExNjQtMTE3NwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgdGhpcy5zdGF0dXMudmFsdWUgIT09IFBvb2xTdGF0dXNEcmFmdCAmJgogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSB8fCB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9PT0gMCkgJiYKICAgIC8vICAgKAogICAgLy8gICAgICgKICAgIC8vICAgICAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zaWdudXBUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vICAgICAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICAvLyAgICAgKSB8fAogICAgLy8gICAgICgKICAgIC8vICAgICAgIHRoaXMuYWxsb3dMYXRlU2lnbnVwcy52YWx1ZSAmJgogICAgLy8gICAgICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICAvLyAgICAgKQogICAgLy8gICApCiAgICAvLyApCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmlzTGl2ZSgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5pc0xpdmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE4NAogICAgLy8gdGhpcy5zdGF0dXMudmFsdWUgIT09IFBvb2xTdGF0dXNEcmFmdCAmJgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHN0YXR1cyA9IEdsb2JhbFN0YXRlPFN0YWtpbmdQb29sU3RhdHVzPih7IGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3RhdHVzIH0pCiAgICBieXRlYyAxMyAvLyAic3RhdHVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExODQKICAgIC8vIHRoaXMuc3RhdHVzLnZhbHVlICE9PSBQb29sU3RhdHVzRHJhZnQgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18zIC8vIDB4MDAKICAgICE9CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE4NC0xMTg1CiAgICAvLyB0aGlzLnN0YXR1cy52YWx1ZSAhPT0gUG9vbFN0YXR1c0RyYWZ0ICYmCiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlKSAmJgogICAgYnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5pc0xpdmVfYm9vbF9mYWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE4NQogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSkgJiYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDEyIC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE4NQogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSkgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExODQtMTE4NQogICAgLy8gdGhpcy5zdGF0dXMudmFsdWUgIT09IFBvb2xTdGF0dXNEcmFmdCAmJgogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSkgJiYKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czo6U3Rha2luZ1Bvb2wuaXNMaXZlX2Jvb2xfZmFsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExODYKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIHx8IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID09PSAwKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUG9vbEdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA5IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExODYKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIHx8IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID09PSAwKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDw9CiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5pc0xpdmVfYm9vbF90cnVlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFBvb2xHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvY29udHJhY3QuYWxnby50czoxMTg2CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSB8fCB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9PT0gMCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjpTdGFraW5nUG9vbC5pc0xpdmVfYm9vbF9mYWxzZUA1CgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmlzTGl2ZV9ib29sX3RydWVANDoKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6MTE4My0xMTg3CiAgICAvLyByZXR1cm4gKAogICAgLy8gICB0aGlzLnN0YXR1cy52YWx1ZSAhPT0gUG9vbFN0YXR1c0RyYWZ0ICYmCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUpICYmCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIHx8IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID09PSAwKQogICAgLy8gKQogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2NvbnRyYWN0LmFsZ28udHM6OlN0YWtpbmdQb29sLmlzTGl2ZV9ib29sX2ZhbHNlQDU6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9jb250cmFjdC5hbGdvLnRzOjExODMtMTE4NwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgdGhpcy5zdGF0dXMudmFsdWUgIT09IFBvb2xTdGF0dXNEcmFmdCAmJgogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlKSAmJgogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSB8fCB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9PT0gMCkKICAgIC8vICkKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAPAAEIAqCNBq3+1eTUhf2oWNTFAYQBz4Keu+/v3oIU0YKeu+/v3oIU/////w/omAu00gPUkAL///////////8BJi4JYWtpdGFfZGFvC2VudHJ5X2NvdW50BBUffHUBAAR0eXBlAgAAA2FhbAEKDGFraXRhX2VzY3Jvdw1lbmRfdGltZXN0YW1wARQBZQ9zdGFydF90aW1lc3RhbXAGc3RhdHVzAR4SYWxsb3dfbGF0ZV9zaWdudXBzB2NyZWF0b3IHZ2F0ZV9pZAhFUlI6SVBBWQttYXhfZW50cmllcwZ3YWxsZXQBgAFyEHNpZ251cF90aW1lc3RhbXAMcmV3YXJkX2NvdW50CXN0YWtlX2tleQhFUlI6Uk5GRAFhAXUFdGl0bGUUbWluaW11bV9zdGFrZV9hbW91bnQIRVJSOklYRlIBKAhFUlI6TkRBTwRxuVevA29hbARzYWx0DWFraXRhX3JveWFsdHkIRVJSOkZPUkIDcGFsEmNvbnRyb2xsZWRfYWRkcmVzcxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAAAAAAAAABNQBYq8IRVJSOkVFWFMIRVJSOklSQkQxGEAAFycXImcnDyJnJwwiZycJImcpI2cnGCNnggIEq4shOgTqkYDdNhoAjgIAzQDBMRkURDEYQQCqggIEG83lLQQ5Tq6yJyKCFASgDM7GBBgegpEE/c/f9gS4LtGzBKlBjTcE/GmcswRudrLKBM2wrGoEsiPTXQS8WK0JBAd6D/IEM/eICARZLuNBBI+koWAE4zdzQgSaLyG0BKSz54kEroTL2AQz6SyUBIVN7eA2GgCOFwHsAnAEMARJBJQFdAaKBwkIVQhjD7YQShBuETYRohHPEd0R6xIGEqMS2xNhAAEAI0OABGRJUfE2GgCOAQDuADEZgQQSMRgQREIS9TEZgQUSMRgQREIB5ooCAYv+VwIAi/4iWYv/JQtLAkxZSwIVi/8jCEklC0sFTFlPBE8CCU1SiYoBAYv/gRKRi/8bgRuRIQoai/+BO5FKkUwcIx5FAYEfGk8CTJAhChoZiYoCAYv+JyNlSIEYW7GyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQqEkRJIlklCEwVEkRXBgBJFUlOAkEAB4sAJBNBAARIIkyJF0L/+ooDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiTYaAUkiWSUISwEVEkRXAgA2GgJJFSMSRDYaA0kVgSASRDYaBEkVgSgSRDYaBUkVgSASRDYaBkkVSwGBIFlJgSISREsCTEsCUiJZgSQIEkQ2GgdJFSQSRBc2GghJFSMSRCJTNhoJSRUkEkQXNhoKSRUkEkQXNhoLSRUkEkQXNhoMSRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJw0rZycdTwxnJwRPC2cnEE8KZ4AGZnVuZGVyTwlngAttYXJrZXRwbGFjZU8IZycZTwdnJx5PBmcnD08FZycRTwRnJxNPA2cnJDEXZyhPAmcnCExnI0M2GgFJFSQSRBcyDjIJEkAADIAIRVJSOkZPSU6wACclTGcjQzYaAUkVgSASRDEAMgkSQAAMgAhFUlI6Rk9ERbAAIicQZUQSQAAMgAhFUlI6Q09ERbAAIicNZUQrE0EAFzIHIicJZUQNQAAMgAhFUlI6UE5ERbAAsTIJsgkjshAisgGzI0MxFiMJSTgQIxJENhoBSRUkEkQXTDEAIicQZUQSQAAEJyawADIQTCInCGVEJVtyCERLA3AARQFAABoiKGVEIicIZUQlW3IIREsEiP4VMhALTwIITEk4BzIKEkAABCcSsAA4CEwhCwgSQAAEJxKwALEyCksBshEishKyFIEEshAisgGzIihlREknFGVITgJJJydlSElXCAhOAyRbTgQiJwhlTElOAk4EREkiWUsBFVJJTgRXAgBMJxRlSEyxIxZOA0kVFlcGAkxQgAQAAQACTFBMshiABDqyiVuyGrIagQayECKyAbO0PklXBABLAVcABCoSREkiWYEpCyUITBUSRFcGKSJbSUAADIAIRVJSOk5FU0OwAE8DJVtJTwISQAAMgAhFUlI6V0VTQ7AAsU8FSbIYgARa3zOPshpPBbIaTwOyGk8DshqACgABAAAAAAAAAACyGicFshqBBrIQIrIBIihlRE8CSU4CcghETwRJTgSI/PAyEAu2THIIRLIHsggjshAisgG2SwEWTBaAAgABTFBPA7IYgARoNeO8shpMshonFbIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBsyNDMRYjCUk4ECMSRDYaAUkVgSkSRIgT/EgjQzEWJQlJOBAjEkQxFiMJRwI4EIEEEkQ2GgFJTgMVgSkSRDgUMgoSQAAEJx+wAEk4EUsCIlsSQAAEJx+wADgSQAAEJx+wAIgTsUgjQzYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEF04CMQAiJxBlRBJAAAyACEVSUjpDT0ZasAAiJw1lRCsSQAAMgAhFUlI6UE1CRLAASwEyBw1AAA1LAUAAhSInD2VEQQB9I0AADIAIRVJSOklTVVSwAElBABNJMgcNQAAMgAhFUlI6SVNUVLAASUAAH0hJQABJIicPZURBAEEjQAAMgAhFUlI6SVNaTLAAMgdLAkEAFkmBCghLAwxAAAyACEVSUjpJRVRUsAAnF08CZycMTGcnCUxnJw0nB2cjQyJC/7wiQv+AIoAAMRYlCUk4ECMSRDEWIwlJOBCBBhJENhoBSU4CSSJZSU4DJQtOAkkVTgNXAgBMIklLBgxBADNJJQtLA0lPAllJTwZJTgQSREsBFVJJFUsBgRBZSYESEkRMUiJZgSALgRQICE4DIwhC/8ZIRQFPA0hMJQhPAhJEIihlRDEAiPqISTEATEAAhEUBRQUiJxFlREAADIAIRVJSOkdJTlOwACIoZUQiJxFlTEUGREsBOBhMJwZlSIEoWxJBAExJOBlAAEZJOBuBBBJBAD1JORoAgARDkiZVEkEAL0k5GgFLBRJBACVJORoCSwQWEkEAGiNAAAyACEVSUjpGR1RFsAA5GgOIDz9GAiNDIkL/40gnKGVIRQVC/3YxFiMJSTgQIxJENhoBRwIiWUlOAiULTEkVTgJXAgAiSUsFDEEAM0klC0sCSU8CWUlPBUlOBBJESwEVUkkVSwGBEFlJgRISRExSIlmBIAuBFAgITgIjCEL/xkYCTwJIJQgSRCInEWVEQQAMgAhFUlI6R0lTVLAAJwWIDrJGAiNDgABJNhoBSRUkEkQXiBUiQAAMgAhFUlI6UE5MVrAAFicWTFBJvUUBQAAEJxqwAEcCgWMjuksBgRkkuhdOA0sBgXwkuhdFBkyBESS6F0wiFkwrEkAADIAIRVJSOlJBSUSwADIHSSInDGVECU8FGAlJRQUyBxNBANFLBEsEDEEAySNAAAyACEVSUjpEV05PsAAiJx1lRIAKIC0gUmV3YXJkc1AyB08DCCIoZUQnBmVIJFtLAhWBkANLAQuB5MUCCEsCcghEsbIHsggjshAisgG2FlcGAk8DUE8CFk8CshiABByeu9uyGkyyGksBshqyGicFshqBBrIQIrIBs7Q+SVcEAExXAAQqEkRJFSQSRE8CSYEhSwS7SYEpSwS7SYExTwS7SYFjJwe7IxZLAYFkTwK7SYFsTwO7MgYWSwGBdE8CuzIHFoF8TLsjQyJC/zQ2GgFJFSQSRBeIEUkjQyJHA4AARww2GgFJFSQSRBdJNhoCSRUkEkQXTgIWJxZMUElOAr1FAUAABCcasABLAUmBYyO6SU8CJCO6RRQnBxNBABNJJwoSQAAMgAhFUlI6TlJURLAAJwcSQQImSEcCvkxOAkRJgWQkuhdJTgJFDkkkI7pFFEmBCSS6F04DSSIkuhdOBEmBbCS6RReBOSS6F0wiTCJOAksICCIpZUQNQQAJIillREsRCUUISxBLEUsJCEsBDUEApEkWJwtMUElFGEmBMiO6IlNMgSgkuhdFDUAAJSInBGVEKxJBACCACYAAAAAAAAAAACJTQQALTCMITE8CSwsITgIjCEL/sCInBGVEJwcSQQBNSxZJIoEgukyBICS6sSIoZUQnBmVIIluyGIAExv0MpbIaTLIashonFbIagQayECKyAbO0PklXBABMVwAEKhJESRUkEkQXFicVTFBC/5NJiAnzQv+MSEsGgSEkuhcIFk8DTFwhSYEpW08CCBZcKUwiKWVESw8SQQDxTCcKXGMjFlxkSU4CgSFbSxUnIBJAANZFAUkiKGVEJwZlSCRbRQkhBgtJRQ1BACqxSwdJcghESw2yCLIHI7IQIrIBtrIYgARmYSBashpLFbIagQayECKyAbNLFCcKEkAAhkhMIiclZURJIQQORB0hBJdJQAAQSEUBIhZcMUsBSbxITL8jQ0sCQAAeTwJIsSInCGVEJVtyCERLAbIIsgcjshAisgGzQv/RIicIZUQlW3IIREsDcABFAUAADIAIRVJSOkROT0mwALEiJwhlRCVbcghETwOyEUsBshKyFIEEshAisgGzQv+STwILQv92TEL/KUhFAUUBSYFkW0sDCBZcZEL/eUsRJwcSQQDySEcCIiS6F0xJgWQkuhdJTgJFDkmBbCS6F04DSYEpJLoXRQtJgTEkuhdOAoEJJLoXTEsGCCIpZUQNQQAJIillREsPCUUGTAlMJwVMIk4CSw9LEEsICElLAg1BAF1ISRYnC0xQSYEyI7oiU0sBgSgkuhdFDUwigSC6RRpAADdLCklLDklOAwxEIQQdTwKXSSEEDkRLBR0hBJdJFksaTFBPBEkiWSMIFlcGAFwATFBOA08ECE4DIwhC/5dFAU8ESEsFSYFkJLoXSwgIFoFkTLtPBE8CTwNPBIgJE0giKWVEEkH+lkcCgWMnDrsjFoFkTLtC/oZLEScKEkEA3UhHAoFsJLoXTEmBZCS6F0UNSYEhJLoXSU4CRQlJgTEkuhdLAYEJJLoXTwIiJLoXTgNLAgtMCUwiRRNBAAZJSwkKRRJLAUyIB1RLDEsECCIpZUQNQQAJIillREsNCUUEJwVMIk4CSw5LD0sHCElLAg1BADtISRYnC0xQSYEyI7oiU0wigSC6RRlAAB5LE0kWSxlMUE8ESSJZIwgWVwYAXABMUE4DTwQITgMjCEL/uUUBSRZLBoFkTwK7TwRPAk8DTwSICC5IIillRBJB/bFHAoFjJw67IxaBZEy7Qv2hSxEnDhJBANRIRwKBbCS6F0xJgWQkuhdJTgJFDkmBISS6F0UJSYExJLoXSwEiJLoXSU4CTgRPAoEJJLoXTAlJTgOIBnxLBQgiKWVEDUEACSIpZURLDglFBUsICicFTgIiTgNLD0sQSwgISUsCDUEAO0hJFicLTFBJgTIjuiJTTCKBILpFGkAAHksBSRZLGkxQTwVJIlkjCBZXBgBcAExQTgRPBQhOBCMIQv+5RQFFAUkWSwaBZE8Cu08ETwJPA08EiAdSSCIpZUQSQfzVRwKBYycOuyMWgWRMu0L8xUsRJyASQQICSwEhByW6F0AABogL9UL8rUhHAoFsJLoXTEmBZCS6F0lOAkUOSYE5JLoXTgJJgTEkuhdLASIkuhdJTgJOBU8CgQkkuhdMCUlOA4gFkEsGCCIpZUQNQQAJIillREsPCUUGSwFAAZdLBEmDAkMYukkkW0lOA0UKSSJbSU4CTgeBEFtOByQLgYYBCCS6F0UTJwVOBEUUSxFFEEsRSwkISxANQQC3Sw8WJwtMUEmBMiO6IlNFEkkigSC6RRtJgSAkuhdFFoEoJLoXSxRJTwIITEsUDkEBHEsTSwEOQQEUSEsQQAAdSRZLGkxQTwRJIlkjCBZXBgBcAExQTgNPBSMITgVLByEHJboXIwlLBRJBALdLAUsGE0EAREUBRQFPAkhPAkgjFksESU4CgWRPArtJgUMnKbtJvkhJgUFZIkxYJwVQSwG8SL9MSSJZTwILTwJLEE8DTwOIBdxIQvtkTwNJIllPAgtPBk8ETwNPA4gFxUhLAhJBAC1GAkcCgWMnDrsjFksBgWRPArtJgUMnKbtJvkhJgUFZIkxYJwVQSwG8SL9C+x1LAkmBZCS6F0sFCBZLAYFkTwK7TBZLBRZQTwIWUIFDTLtC+vlLCEsQCUUJTwQjCElOBSQLgYYBCEsISU8CJLoXRRQjFoFkTLsiRRAiRQoiIwhFFEsPIwhFEEL+m0sBCkL+Y4AIRVJSOlVSUlSwADYaAUkVJBJEFxYnFkxQSb1FAUAABCcasABHAoFjI7pMgWwkuklOAhdMJw4SQAAMgAhFUlI6RE5SRrAAIihlRCcGZUgkW7GyGIAEVCSlkbIaTLIagQayECKyAbMWgAFkTFAiuUgiFkxJgWMru0mBbEsDu0mBdEsDuyMWSwGBZE8Cu0mBIUsDu0mBKUsDu4ExTwK7I0M2GgFJFYEgEkQ2GgJJFSQSRBcWUCcbTFC+RBeIA0YqTFCwI0MigAAxFiMJSTgQgQYSRDYaAUlOAkkVgSASRDYaAkkVJBJEF04CIihlREyI7+JJQACOSEsCRQUiKGVEIicRZUxFBkRLATgYTCcGZUiBKFsSQQBpSTgZQABjSTgbgQQSQQBaSTkaAIAEIA90IRJBAExJORoBSwUSQQBCSTkaAksEFhJBADcjRDg+VwQAIlNAACkiJwRlRCcHE0EAHkkWSwJMUCcbTFC+RBcWJwtMUEmBMiO6IiNUgTJMuyNDIkL/xicoZUhFBUL/bjYaAUkVgSASRDYaAkcCIllJTgIlC0xJFU4CVwIAIklLBQxBADNJJQtLAklPAllJTwVJTgQSREsBFVJJFUsBgRBZSYESEkRMUiJZgSALgRQICE4CIwhC/8ZGAk8CSCUIEkSIA7hIFipMULAjQzYaAUkVJBJEFyIoZUQiJwhlRCVbcghETwKI7xMyECNPAggLIQsIFipMULAjQ4gKHisiTwJUKkxQsCNDiApaKyJPAlQqTFCwI0M2GgFJFYEgEkQnHExQvUUBKyJPAlQqTFCwI0MiJw1lRCInHWVEIicEZUQiJxdlRCInD2VEIicMZUQiJwllRCInE2VEIillRCMJIicYZUQjCSInGWVEIiceZUQiJxFlRCInEGVESwwVFlcGAk8NUE8NgAIAZ1BLARWBZwhMTw5QTw0WUE8LFlArIk8NVFBPChZQTwkWUE8IFlBPBxZQTBZXBgJQTwQWUE8DFlBPAlBMUExQKkxQsCNDNhoBSRUkEkQXgYAZCyEMCBaAGAAAAAAAAGLUAAAAAAAASdQAAAAAAABi1ExQgdQvFlAqTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJxRlSHIIRBJAAAQnIbAAJwhMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcUZUhyCEQSQAAEJyGwACIoZUQnJ2VIgRBbMg0SQAAMgAhFUlI6SVVQR7AAgAd2ZXJzaW9uTGcjQzYaAUkVJBJEFzEAIihlRCcUZUhyCEQSQAAEJyGwAChMZyNDigIAi/5AABgyCnMARIv/D0AADIAIRVJSOk5FRkSwAIkyCov+cABIQv/jigEBIkmAAEkiJwRlRCsTQQEVIicEZUQnBxNBAQojQAAMgAhFUlI6SVBUQ7AAi/8WJwtMUEmMAUmBMiO6IlNLASKBILpOAksBgSAkuklOBBdOAkyBKCS6F04CQQAFJyqMAIkiJwRlRCcKEkEAaEYCsTIIFiIoZUQnBmVIIluyGIAEW/3oArIashqyGrIagQayECKyAbO0PkmMAElXBABMVwAEKhJESRWBCRJEIlNJjAJBAA+LAFcFCCsiiwJUTFCMAImLAUmBMiO6IiNUgTJMuycqjACJTwNIsSInBGVETBZMUCIoZUQnBmVIIluyGCcrshpPArIashqBBrIQIrIBs7Q+SVcEAEsBVwAEKhJEFYEgEkSBBFtJjAMOQf+liwMWJxVMUIwAiSJC/vOKBAEiKGVEJwZlSCRbi/1AADGxSXIIRIv/sgiyByOyECKyAbaL/BZMshiABFZWrPmyGrIai/6yGoEGshAisgGzi/6JsUlyCESL/7ISi/2yEbIUgQSyECKyAbaL/BZMshiABPYs3CuyGrIai/6yGoEGshAisgGzQv/HigICi/8iWUkhBksBC0xBABAnHIv+UL1FAUAABYHUkwEIIkmLAAxBADaL/0sBiOqnVwAIi/5MUCcbTFC9RQFBAAQnLLAATCEGCEwiJwRlRCcKEkEABUwhDQhMIwhC/8NIi/9PAomKAwIigABJiAYvQAAMgAhFUlI6U1VOT7AAIicTZURBACAiKWVEIwmL/iJZCCInE2VEDkAADIAIRVJSOlBNRVKwAIv9OAcyChJAAAQnErAAi/04CDEAi/6I/0GM/g9AAAQnErAAIicZZURJVwAgTEmBIFlLARVSTCIoZUQnBmVIIlsiJwRlRCKL/iJZSYwBSwENQQHui/5LAUlOAojp1ElXAAhOBiJbTgOL/ksBiOnDSVcICE4HJFtJTgJOBov+TIjpsEmBEFlLARVSjAAiJx5lRA9AAAyACEVSUjpRQk1TsABLBTIDE0EAWbFLAhYBASMWIihlRCcGZUiBSFuyGIAEK/PMWrIaSweyGksKshpMshqLALIashqBBrIQIrIBs7Q+SVcEAExXAAQqEkRJFSMSRCJTQAAMgAhFUlI6RlNWRrAASwEnBxJBACxLAkEBJTEASwNwAE4EjAJPA0EBEosCSwUPQQEKI0AADIAIRVJSOlVCTE+wADEATwMWSU4DUElXACBMVyAIUCcbTFBJTgS9RQFBAAQnLLAASwInChJBAH2xSwRJcghEIQ2yCLIHI7IQIrIBtjEATLIYgAQNA3yJshqyGk8IshpPB7IaJxWyGoEGshAisgGzIillREkjCClMZzEATwNQTwYWUIADADMAUIv/UEwWJwtLAVBJvEhPAr9PA0y/JxwxAFC9RQFAAAknHDEAUIsBFr8jCEL+aU8HSE8HSEsCKxNB/62xMQBLAksEUEsGshgnK7IaTLIashqBBrIQIrIBs7Q+SVcEAEsBVwAEKhJEFYEgEkSBBFtLBg9A/3SACEVSUjpVU0xPsAAiQv7zI04DMQBzAEyMAkRC/teL/ov/jAGMAImKAgGAADEAIicQZUQSQAAEJyawADYaACciEkEAE4v/IltBAAyACEVSUjpOQUxHsACL/1cIAUknBxJBABoiJxllRFcAIDIDE0AADIAIRVJSOlNLWVKwAEknIBJBAC6L/4EhW0mMAEEA/Iv/gQlbiwANQQDxiwCBCg5BAOkjQAAMgAhFUlI6Uk1HV7AASScOEkEAGiInE2VEi/+BCVsOQAAMgAhFUlI6TUVHUrAAi/+BCVtJTgJAAAyACEVSUjpSTUdasACL/jgHMgoSQAAEJxKwAIv+OAiL/4EhW0lOAoGAGQshDAgPQAAEJxKwACInGGVESSMIJxhMZ4v/VwAIi/9XEQiL/1cZCCIWTwNPBlBPBhZQTwNQTwJQSwFQSwFQSwFQTwMWUIAaAIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQSwFQK1AjFlBLAVBLAVBMUCcFUEwWJxZMUEm8SEy/i/9MiSJC/xSKAQAiSYAAi/8WJxZMUEm9RQFAAAQnGrAARwKBYyO6SwGBdCS6F04DSwGBWyS6F04DSwGBKSS6F04DTIE5JLoXjAInChJAAAyACEVSUjpJRFBIsABJIQcluhdBAAyACEVSUjpXVEFFsABPAyMIgQRPBAsIsRYiJyRlREkVFlcGAkxQIihlRCcjZUgiW7IYgAQYk5LFshpMshqyGoEGshAisgGztD5JVwQASwFXAAQqEkRJIlklCEwVEkRXBgBJTgIVSUAAD0hJgVskuhcjCBaBW0y7iSJLAQ8iSwJPAk2BEEsCD4EQTwNPAk1PA04CUklOAhWBEBJAAAyACEVSUjpJUlNEsABMSSJbIiEFHUUBSSEIHkUBTwIeRQEhBR1FASEIHk4CSE8CJFtMIQkeRQEeRQEhBR1FASEJHkUBTBZMFlCMAUsBIQ4MQAD1TCIWjAAnBU4CSUEA4kkjDUAABCctsAAjCUkjDUAABCctsABHAhwjHkUBTBhOAyJOAosBSwOLAgxBAIRJIltJTgYhBR1FASEIHklOAk4HSEwkW0xAAGSBooW89t7fvYUoTEkhBR1FAU8CHkUBTwYWTBZQTwaI5OeBIJBPAojk3xkWUElXABBOBYEQW0lLBw9BACJLARgjCBZPBEkiWSMIFlcGAFwATFBOA08CIwhOAk8EQv9/SE8EQv+BIQlC/6FFAU8CSIACABJQTwJQSYEQWUsBFVJLAb5ESYFBWSJMWExQSwG8SEsBTL+BW4sAu4lIIQ5C/y5MIwhC/wYiJw1lRCsTQQA+MgciJwllRA5AAAgiJwllREAAKzIHIicXZUQPQQALMgciJwxlRAxAABMiJw9lREEADTIHIicMZUQPQQACI4kiiSInDWVEKxNBACAyByInDGVED0EAFTIHIicJZUQOQAAIIicJZURAAAIjiSKJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue = class {
  constructor(value) {
    this.value = value;
  }
  value;
  asByteArray() {
    return this.value;
  }
  asString() {
    return this.value !== void 0 ? Buffer.from(this.value).toString("utf-8") : void 0;
  }
};
var StakingPoolParamsFactory = class _StakingPoolParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint8,address,(address,uint64),address,(address,string),uint64,bool,uint64,uint64,uint64,(string,uint64))void":
            return _StakingPoolParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the StakingPool smart contract using the create(string,uint8,address,(address,uint64),address,(address,string),uint64,bool,uint64,uint64,uint64,(string,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,uint8,address,(address,uint64),address,(address,string),uint64,bool,uint64,uint64,uint64,(string,uint64))void",
          args: Array.isArray(params.args) ? params.args : [params.args.title, params.args.type, params.args.creator, params.args.funder, params.args.marketplace, params.args.stakeKey, params.args.minimumStakeAmount, params.args.allowLateSignups, params.args.gateId, params.args.maxEntries, params.args.akitaDao, params.args.akitaDaoEscrow]
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
            return _StakingPoolParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the StakingPool smart contract using the update(string)void ABI method
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
   * Gets available delete ABI call param factories
   */
  static get delete() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "delete":
          case "delete(address)void":
            return _StakingPoolParamsFactory.delete.delete(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the StakingPool smart contract using the delete(address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      delete(params) {
        return {
          ...params,
          method: "delete(address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.caller]
        };
      }
    };
  }
  /**
   * Constructs a no op call for the init(uint64)void ABI method
   *
   * Completes factory-only initialization with the creator-specific royalty.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static init(params) {
    return {
      ...params,
      method: "init(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.akitaRoyalty]
    };
  }
  /**
   * Constructs a no op call for the optIn(pay,uint64)void ABI method
   *
   * optin tells the contract to opt into an asa, it may also require the akita dao escrow to opt in
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
   * Constructs a no op call for the addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addReward(params) {
    return {
      ...params,
      method: "addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.reward]
    };
  }
  /**
   * Constructs a no op call for the addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addRewardAsa(params) {
    return {
      ...params,
      method: "addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.reward]
    };
  }
  /**
   * Constructs a no op call for the finalize(uint64,uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static finalize(params) {
    return {
      ...params,
      method: "finalize(uint64,uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.signupTimestamp, params.args.startTimestamp, params.args.endTimestamp]
    };
  }
  /**
   * Constructs a no op call for the gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEnter(params) {
    return {
      ...params,
      method: "gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.entries]
    };
  }
  /**
   * Constructs a no op call for the enter(pay,(uint64,uint64,byte[32][])[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static enter(params) {
    return {
      ...params,
      method: "enter(pay,(uint64,uint64,byte[32][])[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.entries]
    };
  }
  /**
   * Constructs a no op call for the startDisbursement(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static startDisbursement(params) {
    return {
      ...params,
      method: "startDisbursement(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.rewardId]
    };
  }
  /**
   * Constructs a no op call for the raffle(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static raffle(params) {
    return {
      ...params,
      method: "raffle(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.rewardId]
    };
  }
  /**
   * Constructs a no op call for the disburseRewards(uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static disburseRewards(params) {
    return {
      ...params,
      method: "disburseRewards(uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.rewardId, params.args.iterationAmount]
    };
  }
  /**
   * Constructs a no op call for the finalizeDistribution(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static finalizeDistribution(params) {
    return {
      ...params,
      method: "finalizeDistribution(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.rewardId]
    };
  }
  /**
   * Constructs a no op call for the check(address,uint64)(bool,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static check(params) {
    return {
      ...params,
      method: "check(address,uint64)(bool,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the gateCheck(appl,address,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gateCheck(params) {
    return {
      ...params,
      method: "gateCheck(appl,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.address, params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the enterCost(address,(uint64,uint64,byte[32][])[])uint64 ABI method
   *
   * Calculates the total cost required to enter the pool
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static enterCost(params) {
    return {
      ...params,
      method: "enterCost(address,(uint64,uint64,byte[32][])[])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.entries]
    };
  }
  /**
   * Constructs a no op call for the optInCost(uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optInCost(params) {
    return {
      ...params,
      method: "optInCost(uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the signUpsOpen()bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static signUpsOpen(params) {
    return {
      ...params,
      method: "signUpsOpen()bool",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the isLive()bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isLive(params) {
    return {
      ...params,
      method: "isLive()bool",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the isEntered(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isEntered(params) {
    return {
      ...params,
      method: "isEntered(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getState(params) {
    return {
      ...params,
      method: "getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the mbr(uint64)(uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr(uint64)(uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.winningTickets]
    };
  }
  /**
   * Constructs a no op call for the updateAkitaDAOEscrow((string,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDaoEscrow(params) {
    return {
      ...params,
      method: "updateAkitaDAOEscrow((string,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.config]
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
var StakingPoolFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `StakingPoolFactory`
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
    return new StakingPoolClient(this.appFactory.getAppClientById(params));
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
    return new StakingPoolClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the StakingPool smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b, _c;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? StakingPoolParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? StakingPoolParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0,
      deleteParams: ((_c = params.deleteParams) == null ? void 0 : _c.method) ? StakingPoolParamsFactory.delete._resolveByMethod(params.deleteParams) : params.deleteParams ? params.deleteParams : void 0
    });
    return { result: result.result, appClient: new StakingPoolClient(result.appClient) };
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
       * Creates a new instance of the StakingPool smart contract using the create(string,uint8,address,(address,uint64),address,(address,string),uint64,bool,uint64,uint64,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(StakingPoolParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the StakingPool smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(StakingPoolParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available deployDelete methods
     */
    deployDelete: {
      /**
       * Deletes an existing instance of the StakingPool smart contract using the delete(address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      delete: (params) => {
        return this.appFactory.params.deployDelete(StakingPoolParamsFactory.delete.delete(params));
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
       * Creates a new instance of the StakingPool smart contract using the create(string,uint8,address,(address,uint64),address,(address,string),uint64,bool,uint64,uint64,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(StakingPoolParamsFactory.create.create(params));
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
       * Creates a new instance of the StakingPool smart contract using an ABI method call using the create(string,uint8,address,(address,uint64),address,(address,string),uint64,bool,uint64,uint64,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(StakingPoolParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new StakingPoolClient(result.appClient) };
      }
    }
  };
};
var StakingPoolClient = class _StakingPoolClient {
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
   * Returns a new `StakingPoolClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _StakingPoolClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `StakingPoolClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _StakingPoolClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the StakingPool smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(StakingPoolParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the StakingPool smart contract using the `delete(address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      delete: (params) => {
        return this.appClient.params.delete(StakingPoolParamsFactory.delete.delete(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the StakingPool smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the StakingPool smart contract using the `init(uint64)void` ABI method.
     *
     * Completes factory-only initialization with the creator-specific royalty.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    init: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.init(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa, it may also require the akita dao escrow to opt in
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optIn: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addReward: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.addReward(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addRewardAsa: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.addRewardAsa(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `finalize(uint64,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    finalize: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.finalize(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEnter: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.gatedEnter(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `enter(pay,(uint64,uint64,byte[32][])[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    enter: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.enter(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `startDisbursement(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    startDisbursement: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.startDisbursement(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `raffle(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    raffle: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.raffle(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `disburseRewards(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    disburseRewards: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.disburseRewards(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `finalizeDistribution(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    finalizeDistribution: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.finalizeDistribution(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `check(address,uint64)(bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    check: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.check(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `gateCheck(appl,address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gateCheck: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.gateCheck(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `enterCost(address,(uint64,uint64,byte[32][])[])uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Calculates the total cost required to enter the pool
     *
     * @param params The params for the smart contract call
     * @returns The call params: The entry box MBR plus any app-scoped SOFT stake MBR
     */
    enterCost: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.enterCost(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `signUpsOpen()bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean of whether sign ups are open
     */
    signUpsOpen: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolParamsFactory.signUpsOpen(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `isLive()bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean of whether the pool is live
     */
    isLive: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolParamsFactory.isLive(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `isEntered(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean indicating if the address has entered the staking pool
     */
    isEntered: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.isEntered(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getState: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolParamsFactory.getState(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: the mbr created for each boxmap entry
     */
    mbr: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(StakingPoolParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolParamsFactory.opUp(params));
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
       * Updates an existing instance of the StakingPool smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(StakingPoolParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the StakingPool smart contract using the `delete(address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      delete: (params) => {
        return this.appClient.createTransaction.delete(StakingPoolParamsFactory.delete.delete(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the StakingPool smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the StakingPool smart contract using the `init(uint64)void` ABI method.
     *
     * Completes factory-only initialization with the creator-specific royalty.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    init: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.init(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa, it may also require the akita dao escrow to opt in
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optIn: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addReward: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.addReward(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addRewardAsa: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.addRewardAsa(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `finalize(uint64,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    finalize: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.finalize(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEnter: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.gatedEnter(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `enter(pay,(uint64,uint64,byte[32][])[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    enter: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.enter(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `startDisbursement(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    startDisbursement: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.startDisbursement(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `raffle(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    raffle: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.raffle(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `disburseRewards(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    disburseRewards: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.disburseRewards(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `finalizeDistribution(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    finalizeDistribution: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.finalizeDistribution(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `check(address,uint64)(bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    check: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.check(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `gateCheck(appl,address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gateCheck: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.gateCheck(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `enterCost(address,(uint64,uint64,byte[32][])[])uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Calculates the total cost required to enter the pool
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: The entry box MBR plus any app-scoped SOFT stake MBR
     */
    enterCost: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.enterCost(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `signUpsOpen()bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean of whether sign ups are open
     */
    signUpsOpen: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.signUpsOpen(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `isLive()bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean of whether the pool is live
     */
    isLive: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.isLive(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `isEntered(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean indicating if the address has entered the staking pool
     */
    isEntered: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.isEntered(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getState: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.getState(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: the mbr created for each boxmap entry
     */
    mbr: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the StakingPool smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolParamsFactory.opUp(params));
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
       * Updates an existing instance of the StakingPool smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(StakingPoolParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the StakingPool smart contract using the `delete(address)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      delete: async (params) => {
        const result = await this.appClient.send.delete(StakingPoolParamsFactory.delete.delete(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the StakingPool smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the StakingPool smart contract using the `init(uint64)void` ABI method.
     *
     * Completes factory-only initialization with the creator-specific royalty.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    init: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.init(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `optIn(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa, it may also require the akita dao escrow to opt in
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optIn: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addReward: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.addReward(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addRewardAsa: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.addRewardAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `finalize(uint64,uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    finalize: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.finalize(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEnter: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.gatedEnter(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `enter(pay,(uint64,uint64,byte[32][])[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    enter: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.enter(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `startDisbursement(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    startDisbursement: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.startDisbursement(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `raffle(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    raffle: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.raffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `disburseRewards(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    disburseRewards: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.disburseRewards(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `finalizeDistribution(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    finalizeDistribution: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.finalizeDistribution(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `check(address,uint64)(bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    check: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.check(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `gateCheck(appl,address,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gateCheck: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.gateCheck(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `enterCost(address,(uint64,uint64,byte[32][])[])uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * Calculates the total cost required to enter the pool
     *
     * @param params The params for the smart contract call
     * @returns The call result: The entry box MBR plus any app-scoped SOFT stake MBR
     */
    enterCost: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.enterCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `signUpsOpen()bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean of whether sign ups are open
     */
    signUpsOpen: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.signUpsOpen(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `isLive()bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean of whether the pool is live
     */
    isLive: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.isLive(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `isEntered(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean indicating if the address has entered the staking pool
     */
    isEntered: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.isEntered(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getState: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.getState(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: the mbr created for each boxmap entry
     */
    mbr: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.mbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPool smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolParamsFactory.opUp(params));
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
    return new _StakingPoolClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `enterCost(address,(uint64,uint64,byte[32][])[])uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * Calculates the total cost required to enter the pool
   *
   * @param params The params for the smart contract call
   * @returns The call result: The entry box MBR plus any app-scoped SOFT stake MBR
   */
  async enterCost(params) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.enterCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `optInCost(uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `signUpsOpen()bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: a boolean of whether sign ups are open
   */
  async signUpsOpen(params = { args: [] }) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.signUpsOpen(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `isLive()bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: a boolean of whether the pool is live
   */
  async isLive(params = { args: [] }) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.isLive(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `isEntered(address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: a boolean indicating if the address has entered the staking pool
   */
  async isEntered(params) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.isEntered(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getState(params = { args: [] }) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.getState(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPool smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: the mbr created for each boxmap entry
   */
  async mbr(params) {
    const result = await this.appClient.send.call(StakingPoolParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current StakingPool app
   */
  state = {
    /**
     * Methods to access global state for the current StakingPool app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          status: result.status,
          title: result.title,
          type: result.type,
          signupTimestamp: result.signupTimestamp,
          allowLateSignups: result.allowLateSignups,
          startTimestamp: result.startTimestamp,
          endTimestamp: result.endTimestamp,
          maxEntries: result.maxEntries,
          entryId: result.entryID,
          rewardId: result.rewardID,
          stakeKey: result.stakeKey,
          minimumStakeAmount: result.minimumStakeAmount,
          gateId: result.gateID,
          creator: result.creator,
          marketplace: result.marketplace,
          marketplaceRoyalties: result.marketplaceRoyalties,
          akitaRoyalty: result.akitaRoyalty,
          salt: new BinaryStateValue(result.salt),
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO,
          funder: result.funder
        };
      },
      /**
       * Get the current value of the status key in global state
       */
      status: async () => {
        return await this.appClient.state.global.getValue("status");
      },
      /**
       * Get the current value of the title key in global state
       */
      title: async () => {
        return await this.appClient.state.global.getValue("title");
      },
      /**
       * Get the current value of the type key in global state
       */
      type: async () => {
        return await this.appClient.state.global.getValue("type");
      },
      /**
       * Get the current value of the signupTimestamp key in global state
       */
      signupTimestamp: async () => {
        return await this.appClient.state.global.getValue("signupTimestamp");
      },
      /**
       * Get the current value of the allowLateSignups key in global state
       */
      allowLateSignups: async () => {
        return await this.appClient.state.global.getValue("allowLateSignups");
      },
      /**
       * Get the current value of the startTimestamp key in global state
       */
      startTimestamp: async () => {
        return await this.appClient.state.global.getValue("startTimestamp");
      },
      /**
       * Get the current value of the endTimestamp key in global state
       */
      endTimestamp: async () => {
        return await this.appClient.state.global.getValue("endTimestamp");
      },
      /**
       * Get the current value of the maxEntries key in global state
       */
      maxEntries: async () => {
        return await this.appClient.state.global.getValue("maxEntries");
      },
      /**
       * Get the current value of the entryID key in global state
       */
      entryId: async () => {
        return await this.appClient.state.global.getValue("entryID");
      },
      /**
       * Get the current value of the rewardID key in global state
       */
      rewardId: async () => {
        return await this.appClient.state.global.getValue("rewardID");
      },
      /**
       * Get the current value of the stakeKey key in global state
       */
      stakeKey: async () => {
        return await this.appClient.state.global.getValue("stakeKey");
      },
      /**
       * Get the current value of the minimumStakeAmount key in global state
       */
      minimumStakeAmount: async () => {
        return await this.appClient.state.global.getValue("minimumStakeAmount");
      },
      /**
       * Get the current value of the gateID key in global state
       */
      gateId: async () => {
        return await this.appClient.state.global.getValue("gateID");
      },
      /**
       * Get the current value of the creator key in global state
       */
      creator: async () => {
        return await this.appClient.state.global.getValue("creator");
      },
      /**
       * Get the current value of the marketplace key in global state
       */
      marketplace: async () => {
        return await this.appClient.state.global.getValue("marketplace");
      },
      /**
       * Get the current value of the marketplaceRoyalties key in global state
       */
      marketplaceRoyalties: async () => {
        return await this.appClient.state.global.getValue("marketplaceRoyalties");
      },
      /**
       * Get the current value of the akitaRoyalty key in global state
       */
      akitaRoyalty: async () => {
        return await this.appClient.state.global.getValue("akitaRoyalty");
      },
      /**
       * Get the current value of the salt key in global state
       */
      salt: async () => {
        return new BinaryStateValue(await this.appClient.state.global.getValue("salt"));
      },
      /**
       * Get the current value of the akitaDAOEscrow key in global state
       */
      akitaDaoEscrow: async () => {
        return await this.appClient.state.global.getValue("akitaDAOEscrow");
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
      },
      /**
       * Get the current value of the funder key in global state
       */
      funder: async () => {
        return await this.appClient.state.global.getValue("funder");
      }
    },
    /**
     * Methods to access box state for the current StakingPool app
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
       * Get values from the entries map in box state
       */
      entries: {
        /**
         * Get all current values of the entries map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("entries");
        },
        /**
         * Get a current value of the entries map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("entries", key);
        }
      },
      /**
       * Get values from the uniques map in box state
       */
      uniques: {
        /**
         * Get all current values of the uniques map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("uniques");
        },
        /**
         * Get a current value of the uniques map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("uniques", key);
        }
      },
      /**
       * Get values from the entriesByAddress map in box state
       */
      entriesByAddress: {
        /**
         * Get all current values of the entriesByAddress map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("entriesByAddress");
        },
        /**
         * Get a current value of the entriesByAddress map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("entriesByAddress", key);
        }
      },
      /**
       * Get values from the rewards map in box state
       */
      rewards: {
        /**
         * Get all current values of the rewards map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("rewards");
        },
        /**
         * Get a current value of the rewards map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("rewards", key);
        }
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
      }
    }
  };
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a init(uint64)void method call against the StakingPool contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the StakingPool contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a addReward(pay,(uint64,uint8,uint64,uint64,uint64,uint64))void method call against the StakingPool contract
       */
      addReward(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addReward(params)));
        return this;
      },
      /**
       * Add a addRewardAsa(pay,axfer,(uint64,uint8,uint64,uint64,uint64,uint64))void method call against the StakingPool contract
       */
      addRewardAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addRewardAsa(params)));
        return this;
      },
      /**
       * Add a finalize(uint64,uint64,uint64)void method call against the StakingPool contract
       */
      finalize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.finalize(params)));
        return this;
      },
      /**
       * Add a gatedEnter(pay,appl,(uint64,uint64,byte[32][])[])void method call against the StakingPool contract
       */
      gatedEnter(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnter(params)));
        return this;
      },
      /**
       * Add a enter(pay,(uint64,uint64,byte[32][])[])void method call against the StakingPool contract
       */
      enter(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.enter(params)));
        return this;
      },
      /**
       * Add a startDisbursement(uint64)void method call against the StakingPool contract
       */
      startDisbursement(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.startDisbursement(params)));
        return this;
      },
      /**
       * Add a raffle(uint64)void method call against the StakingPool contract
       */
      raffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.raffle(params)));
        return this;
      },
      /**
       * Add a disburseRewards(uint64,uint64)void method call against the StakingPool contract
       */
      disburseRewards(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.disburseRewards(params)));
        return this;
      },
      /**
       * Add a finalizeDistribution(uint64)void method call against the StakingPool contract
       */
      finalizeDistribution(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.finalizeDistribution(params)));
        return this;
      },
      /**
       * Add a check(address,uint64)(bool,uint64) method call against the StakingPool contract
       */
      check(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.check(params)));
        return this;
      },
      /**
       * Add a gateCheck(appl,address,uint64)void method call against the StakingPool contract
       */
      gateCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gateCheck(params)));
        return this;
      },
      /**
       * Add a enterCost(address,(uint64,uint64,byte[32][])[])uint64 method call against the StakingPool contract
       */
      enterCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.enterCost(params)));
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the StakingPool contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a signUpsOpen()bool method call against the StakingPool contract
       */
      signUpsOpen(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.signUpsOpen(params)));
        return this;
      },
      /**
       * Add a isLive()bool method call against the StakingPool contract
       */
      isLive(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isLive(params)));
        return this;
      },
      /**
       * Add a isEntered(address)bool method call against the StakingPool contract
       */
      isEntered(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isEntered(params)));
        return this;
      },
      /**
       * Add a getState()(uint8,string,uint8,uint64,uint64,bool,uint64,uint64,uint64,uint64,(address,string),uint64,uint64,address) method call against the StakingPool contract
       */
      getState(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getState(params)));
        return this;
      },
      /**
       * Add a mbr(uint64)(uint64,uint64,uint64,uint64,uint64) method call against the StakingPool contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the StakingPool contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the StakingPool contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the StakingPool contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
      get delete() {
        return {
          delete: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.delete(params)));
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the StakingPool contract
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

// src/staking-pool/errors.ts
var STAKING_POOL_ERROR_MESSAGES = {
  // --- Reward validation --------------------------------------------------
  SKYR: "Stake key required",
  RMGZ: "Rate must be greater than zero",
  RMGW: "Rate must be greater than winner count",
  MEGR: "Max entries cannot be greater than rate",
  // --- Disbursement state -------------------------------------------------
  NEFD: "Not enough funds",
  NRTD: "Not ready to disburse",
  IDPH: "Invalid disbursement phase",
  WTAE: "Winning tickets already exist",
  IPTC: "Invalid pool type for check",
  DNRF: "Disbursement not ready for finalization",
  RNFD: "Reward does not exist",
  RAID: "Reward is already in a disbursement phase",
  DWNO: "Distribution window is not open",
  URRT: "Unknown reward rate type",
  // --- Pool lifecycle -----------------------------------------------------
  PMBD: "Pool must be in draft state",
  PNDE: "Pool must be in draft or ended",
  PNLV: "Pool is not live",
  SUNO: "Pool signups are not open",
  PMER: "Pool has reached maximum entries",
  FOIN: "Only the factory can init the pool",
  FODE: "Only the factory can delete the pool",
  CODE: "Only the creator can delete the pool",
  COFZ: "Only the creator can finalize the pool",
  // --- Finalize timestamps ------------------------------------------------
  ISUT: "Signup timestamp must be zero (with late signups) or in the future",
  ISTT: "Start timestamp must be zero or in the future",
  ISZL: "If the start timestamp is zero, signup must be zero and allowLateSignups must be true",
  IETT: "End timestamp must be zero or after the start timestamp + 10",
  // --- Asset / opt-in -----------------------------------------------------
  NALG: "Must be an Algo asset",
  MBAS: "Must be an ASA",
  DNOI: "DAO is not opted in to the asset",
  // --- Entry validation ---------------------------------------------------
  QBMS: "Quantity is less than minimum stake amount",
  EEXS: "Address already has an entry for this asset",
  FSVF: "Failed to verify stake requirements",
  UBLO: "User does not have minimum balance",
  USLO: "User does not have enough staked",
  // --- Gate ---------------------------------------------------------------
  GINS: "Gate id is not set",
  GIST: "Gate id is set",
  // --- Staking-pool plugin ------------------------------------------------
  NVPL: "Not a valid staking pool"
};
var translateStakingPoolError = makeErrorTranslator(STAKING_POOL_ERROR_MESSAGES);

// src/generated/StakingPoolFactoryClient.ts
import { ABIStructType as ABIStructType2, getStructValueFromTupleValue as getStructValueFromTupleValue2 } from "@algorandfoundation/algokit-utils/abi";
import { AppClient as _AppClient2 } from "@algorandfoundation/algokit-utils/app-client";
import { AppFactory as _AppFactory2 } from "@algorandfoundation/algokit-utils/app-factory";
var APP_SPEC2 = { "name": "StakingPoolFactory", "structs": { "RootKey": [{ "name": "address", "type": "address" }, { "name": "name", "type": "string" }], "StakingPoolMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "uniques", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }, { "name": "rewards", "type": "uint64" }, { "name": "disbursements", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPool", "args": [{ "type": "pay", "name": "payment" }, { "type": "string", "name": "title" }, { "type": "uint8", "name": "type" }, { "type": "address", "name": "marketplace" }, { "type": "(address,string)", "struct": "RootKey", "name": "stakeKey" }, { "type": "uint64", "name": "minimumStakeAmount" }, { "type": "bool", "name": "allowLateSignups" }, { "type": "uint64", "name": "gateID" }, { "type": "uint64", "name": "maxEntries" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deletePool", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPoolCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mbr", "args": [{ "type": "uint64", "name": "winningTickets" }], "returns": { "type": "(uint64,uint64,uint64,uint64,uint64)", "struct": "StakingPoolMBRData", "desc": "the mbr created for each boxmap entry" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [760], "errorMessage": "Box must have value" }, { "pc": [361, 1015, 1253, 1985], "errorMessage": "Bytes has valid prefix" }, { "pc": [661, 1705], "errorMessage": "ERR:CNST" }, { "pc": [1694], "errorMessage": "ERR:ICOR" }, { "pc": [697, 709], "errorMessage": "ERR:IPAY" }, { "pc": [1836], "errorMessage": "ERR:IPMA" }, { "pc": [1810], "errorMessage": "ERR:IPMR" }, { "pc": [2353], "errorMessage": "ERR:IUPG" }, { "pc": [1327], "errorMessage": "ERR:NCRE" }, { "pc": [1550, 1576, 1735, 2282, 2324, 2388], "errorMessage": "ERR:NDAO" }, { "pc": [2018], "errorMessage": "ERR:NESC" }, { "pc": [2041], "errorMessage": "ERR:WESC" }, { "pc": [1119], "errorMessage": "IPCT" }, { "pc": [721, 744, 896, 1190, 1309, 1568, 1727, 1784, 2106, 2122, 2215, 2274, 2316, 2380, 2405], "errorMessage": "application exists" }, { "pc": [715, 739, 790, 796, 948, 971, 1075, 1408, 1562, 1721, 1774, 1778, 1880, 1911, 2098, 2205, 2210, 2268, 2310, 2328, 2374, 2399, 2415], "errorMessage": "check GlobalState exists" }, { "pc": [364, 433, 447, 463, 504, 552, 605, 1174, 1507, 1598, 1988, 2257, 2294], "errorMessage": "invalid array length header" }, { "pc": [630], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [454, 470, 558, 1514, 1605, 2301], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1997], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [579], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [481, 620, 640, 650, 1304, 1451, 1525, 1590, 1759, 2200, 2367], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [568], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [370], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [610], "errorMessage": "invalid number of bytes for smart_contracts/meta-merkles/types.ts::RootKey" }, { "pc": [509, 2262], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1020, 1258], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [496, 2249], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [597], "errorMessage": "invalid tail pointer at index 1 of (uint8[32],(len+utf8[]))" }, { "pc": [491, 592, 2244], "errorMessage": "invalid tuple encoding" }, { "pc": [543, 1751], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA0MDk2IDEyNDIwMDAgMTAwMDAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJiYyIgIndhbGxldCIgMHgxNTFmN2M3NSAiYWtpdGFfZXNjcm93IiAiRVJSOk5EQU8iIDB4YzUzYjMyY2MgInZlcnNpb24iICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIiAiRVJSOkNOU1QiICJFUlI6SVBBWSIgInN0YWtpbmdfZmVlcyIgInNhbCIgMHgwMDAxICJwYWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxOC0yNAogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgU3Rha2luZ1Bvb2xGYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Rha2luZ1Bvb2wsIEZhY3RvcnlDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE4LTI0CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBTdGFraW5nUG9vbEZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdGFraW5nUG9vbCwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIwCiAgICBwdXNoYnl0ZXNzIDB4MmIyNWFjODkgMHhjNzQ3OGY5ZCAweDQ3MGM2ZWQ3IDB4YTRiM2U3ODkgLy8gbWV0aG9kICJuZXdQb29sKHBheSxzdHJpbmcsdWludDgsYWRkcmVzcywoYWRkcmVzcyxzdHJpbmcpLHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJkZWxldGVQb29sKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJuZXdQb29sQ29zdCgpdWludDY0IiwgbWV0aG9kICJtYnIodWludDY0KSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KSIKICAgIGJ5dGVjIDYgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgLy8gbWV0aG9kICJsb2FkQm94ZWRDb250cmFjdCh1aW50NjQsYnl0ZVtdKXZvaWQiLCBtZXRob2QgImRlbGV0ZUJveGVkQ29udHJhY3QoKXZvaWQiLCBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAib3B0SW5Db3N0KHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG5ld1Bvb2wgZGVsZXRlUG9vbCBuZXdQb29sQ29zdCBtYnIgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE4CiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTgtMjQKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN0YWtpbmdQb29sRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVN0YWtpbmdQb29sLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweDgxMTUzNjI4IC8vIG1ldGhvZCAiY3JlYXRlKHN0cmluZyxzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0SUQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnJlZmVycmVyT3JaZXJvQWRkcmVzczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICByZXRzdWIKCnJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pZl9lbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTczLTE3NgogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzUKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgcHVzaGJ5dGVzICJyZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTczLTE3NgogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIHN3YXAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIGIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNwbGl0T3B0SW5Db3VudChha2l0YURBTzogdWludDY0LCBlc2Nyb3c6IGJ5dGVzLCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnNwbGl0T3B0SW5Db3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgZXNjcm93OiBBY2NvdW50LCBhc3NldDogQXNzZXQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOAogICAgLy8gbGV0IGNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDAKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAzCiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQxCiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDQKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3CiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo6U3Rha2luZ1Bvb2xGYWN0b3J5LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjUyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjU0CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo1NQogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo1NgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjUyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjpTdGFraW5nUG9vbEZhY3RvcnkubmV3UG9vbFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1Bvb2w6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6NjItNzIKICAgIC8vIG5ld1Bvb2woCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgdHlwZTogU3Rha2luZ1R5cGUsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBzdGFrZUtleTogUm9vdEtleSwKICAgIC8vICAgbWluaW11bVN0YWtlQW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGFsbG93TGF0ZVNpZ251cHM6IGJvb2xlYW4sCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXhFbnRyaWVzOiB1aW50NjQsCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50OFszMl0sKGxlbit1dGY4W10pKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzYKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9tZXRhLW1lcmtsZXMvdHlwZXMudHM6OlJvb3RLZXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6NzQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld1Bvb2xfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDkgLy8gIkVSUjpDTlNUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkNOU1QKCm5ld1Bvb2xfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo3OS04MQogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcG9vbC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHBvb2wuZ2xvYmFsQnl0ZXMpCiAgICBpbnRjIDUgLy8gMTI0MjAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6ODMKICAgIC8vIGNvbnN0IHJlZnVuZGFibGVNQlI6IHVpbnQ2NCA9IGNoaWxkQ3JlYXRpb25NQlIgKyBHbG9iYWwubWluQmFsYW5jZQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyBjb25zdCBjcmVhdGlvbkZlZSA9IHRoaXMucG9vbENyZWF0aW9uRmVlKCkKICAgIGNhbGxzdWIgcG9vbENyZWF0aW9uRmVlCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjg3CiAgICAvLyBsZXQgcmVmZXJyYWxNYnI6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo4OAogICAgLy8gaWYgKGNyZWF0aW9uRmVlID4gMCkgewogICAgYm56IG5ld1Bvb2xfaWZfYm9keUA0CiAgICBkdXAKICAgIGJ1cnkgMTQKCm5ld1Bvb2xfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6OTMtOTQKICAgIC8vIGNyZWF0aW9uRmVlICsKICAgIC8vIHJlZnVuZGFibGVNQlIgKwogICAgZGlnIDIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjkzLTk1CiAgICAvLyBjcmVhdGlvbkZlZSArCiAgICAvLyByZWZ1bmRhYmxlTUJSICsKICAgIC8vIHJlZmVycmFsTWJyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo5OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdQb29sX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAxMCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbmV3UG9vbF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjk5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRvdGFsTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDIKICAgIGd0eG5zIEFtb3VudAogICAgPT0KICAgIGJueiBuZXdQb29sX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxMCAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbmV3UG9vbF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjM3CiAgICAvLyBpZiAoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czozNwogICAgLy8gaWYgKFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYnogbmV3UG9vbF9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czozOAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCgpuZXdQb29sX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6OlN0YWtpbmdQb29sRmFjdG9yeS5wb29sUm95YWx0eUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjEwNAogICAgLy8gaWYgKGxlZnRvdmVyID4gMCkgewogICAgZGlnIDEyCiAgICBieiBuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjEwNS0xMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTA3CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMDcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEzCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTA1LTEwOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjEwNS0xMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCm5ld1Bvb2xfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMTQKICAgIC8vIGNvbnN0IGFwcHJvdmFsU2l6ZSA9IHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyBjb25zdCBjaHVuazEgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCgwLCA0MDk2KQogICAgaW50Y18wIC8vIDAKICAgIGludGMgNCAvLyA0MDk2CiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTE2CiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgc3dhcAogICAgaW50YyA0IC8vIDQwOTYKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMTYKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBpbnRjIDQgLy8gNDA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTE4LTEzNwogICAgLy8gY29uc3QgbmV3UG9vbEFwcCA9IHBvb2wuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICB0aXRsZSwKICAgIC8vICAgICAgIHR5cGUsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiByZWZ1bmRhYmxlTUJSIH0sCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHN0YWtlS2V5LAogICAgLy8gICAgICAgbWluaW11bVN0YWtlQW1vdW50LAogICAgLy8gICAgICAgYWxsb3dMYXRlU2lnbnVwcywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1heEVudHJpZXMsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZQogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBwb29sLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMjMKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMjQKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcmVmdW5kYWJsZU1CUiB9LAogICAgdW5jb3ZlciA0CiAgICBndHhucyBTZW5kZXIKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMzEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMzEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTMyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTMyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6NzYKICAgIC8vIGNvbnN0IHBvb2wgPSBjb21waWxlQXJjNChTdGFraW5nUG9vbCkKICAgIHB1c2hpbnQgMTAKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtQnl0ZVNsaWNlCiAgICBwdXNoaW50IDEyCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bVVpbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjExOC0xMzcKICAgIC8vIGNvbnN0IG5ld1Bvb2xBcHAgPSBwb29sLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgdGl0bGUsCiAgICAvLyAgICAgICB0eXBlLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcmVmdW5kYWJsZU1CUiB9LAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICBzdGFrZUtleSwKICAgIC8vICAgICAgIG1pbmltdW1TdGFrZUFtb3VudCwKICAgIC8vICAgICAgIGFsbG93TGF0ZVNpZ251cHMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXhFbnRyaWVzLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcG9vbC5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxMzYKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICBwdXNoaW50IDMKICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjc2CiAgICAvLyBjb25zdCBwb29sID0gY29tcGlsZUFyYzQoU3Rha2luZ1Bvb2wpCiAgICBwdXNoYnl0ZXMgYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTE4LTEzNwogICAgLy8gY29uc3QgbmV3UG9vbEFwcCA9IHBvb2wuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICB0aXRsZSwKICAgIC8vICAgICAgIHR5cGUsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiByZWZ1bmRhYmxlTUJSIH0sCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHN0YWtlS2V5LAogICAgLy8gICAgICAgbWluaW11bVN0YWtlQW1vdW50LAogICAgLy8gICAgICAgYWxsb3dMYXRlU2lnbnVwcywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1heEVudHJpZXMsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZQogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBwb29sLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBwdXNoYnl0ZXMgMHg2NDQ5NTFmMSAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDgsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsKGFkZHJlc3Msc3RyaW5nKSx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjExOC0xMzkKICAgIC8vIGNvbnN0IG5ld1Bvb2xBcHAgPSBwb29sLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgdGl0bGUsCiAgICAvLyAgICAgICB0eXBlLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogcmVmdW5kYWJsZU1CUiB9LAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICBzdGFrZUtleSwKICAgIC8vICAgICAgIG1pbmltdW1TdGFrZUFtb3VudCwKICAgIC8vICAgICAgIGFsbG93TGF0ZVNpZ251cHMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXhFbnRyaWVzLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcG9vbC5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTQxLTE0NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKG5ld1Bvb2xBcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNDMKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihuZXdQb29sQXBwLmlkKS5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNDQKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE0MS0xNDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihuZXdQb29sQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNDEtMTQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXBwbGljYXRpb24obmV3UG9vbEFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNDgKICAgIC8vIHBvb2wuY2FsbC5pbml0KHsgYXBwSWQ6IG5ld1Bvb2xBcHAuaWQsIGFyZ3M6IFtha2l0YVJveWFsdHldIH0pCiAgICBpdHhuX2JlZ2luCiAgICBzd2FwCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDFiY2RlNTJkIC8vIG1ldGhvZCAiaW5pdCh1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjYyLTcyCiAgICAvLyBuZXdQb29sKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIHR5cGU6IFN0YWtpbmdUeXBlLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgc3Rha2VLZXk6IFJvb3RLZXksCiAgICAvLyAgIG1pbmltdW1TdGFrZUFtb3VudDogdWludDY0LAogICAgLy8gICBhbGxvd0xhdGVTaWdudXBzOiBib29sZWFuLAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWF4RW50cmllczogdWludDY0LAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1Bvb2xfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjQxCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0U3Rha2luZ0ZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjQxCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0U3Rha2luZ0ZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4CiAgICAvLyBjb25zdCBbc3Rha2luZ0ZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTdGFraW5nRmVlcykpCiAgICBkdXAKICAgIGJ5dGVjIDExIC8vICJzdGFraW5nX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBieXRlYyAxMiAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6NDIKICAgIC8vIGNvbnN0IHsgaW1wYWN0OiBpbXBhY3RBcHAgfSA9IGdldEFraXRhU29jaWFsQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjQzCiAgICAvLyBsZXQgaW1wYWN0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6NDQKICAgIC8vIGlmIChpbXBhY3RBcHAgIT09IDApIHsKICAgIGJ6IG5ld1Bvb2xfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6NDUKICAgIC8vIGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjQ1CiAgICAvLyBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyAxMiAvLyAic2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzcKICAgIC8vIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM2LTEzOQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZDU3NGJiMTAgLy8gbWV0aG9kICJnZXRVc2VySW1wYWN0KGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBidXJ5IDE0CgpuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo0NwogICAgLy8gcmV0dXJuIGltcGFjdFJhbmdlKGltcGFjdCwgZmVlcy5pbXBhY3RUYXhNaW4sIGZlZXMuaW1wYWN0VGF4TWF4KQogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgZGlnIDE0CiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogbmV3UG9vbF90ZXJuYXJ5X2ZhbHNlQDE5CiAgICBkaWcgMTQKICAgIGludGNfMSAvLyAxCiAgICAtCgpuZXdQb29sX3Rlcm5hcnlfbWVyZ2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAKICAgIC8KICAgIC0KICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjEwMgogICAgLy8gY29uc3QgYWtpdGFSb3lhbHR5ID0gdGhpcy5wb29sUm95YWx0eSgpCiAgICBiIG5ld1Bvb2xfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo6U3Rha2luZ1Bvb2xGYWN0b3J5LnBvb2xSb3lhbHR5QDIxCgpuZXdQb29sX3Rlcm5hcnlfZmFsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgbmV3UG9vbF90ZXJuYXJ5X21lcmdlQDIwCgpuZXdQb29sX2lmX2JvZHlANDoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6ODkKICAgIC8vICh7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBjcmVhdGlvbkZlZSkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czo4OQogICAgLy8gKHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGNyZWF0aW9uRmVlKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA4CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU8sIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDkKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldCkKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxMgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZGlnIDEKICAgIGJ6IG5ld1Bvb2xfYWZ0ZXJfaWZfZWxzZUAzNAogICAgZHVwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMzQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgKICAgIC8vIGNvbnN0IFt3YWxsZXRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0RmVlcykpCiAgICBkaWcgMgogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE0CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNiAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMgogICAgbXVsdwogICAgaW50YyA2IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxNwogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMjcKICAgIGRpZyAxCiAgICBieiBuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE4CiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDE0CgpuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIGR1cAogICAgcHVzaGludCA2MDQ4MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI2CiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGRpZyAxNQogICAgZHVwCiAgICBpdG9iCiAgICB1bmNvdmVyIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTMgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgNQogICAgcHVzaGJ5dGVzICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzNgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOQogICAgLy8gbGV0IGNvc3Q6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNDE3MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQxLTU1MgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDYKICAgIC8vIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIGRpZyAxCiAgICBkaWcgNQogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ0LTU0NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDEtNTUyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDgKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDkKICAgIC8vIGV4cGlyYXRpb24sCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MS01NTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4N2I3ZGM1ZmMgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTMKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjEtNjI5CiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBleHRyYWN0IDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKCm5ld1Bvb2xfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50QDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6ODkKICAgIC8vICh7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBjcmVhdGlvbkZlZSkpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxNAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBiIG5ld1Bvb2xfYWZ0ZXJfaWZfZWxzZUA1CgpuZXdQb29sX2FmdGVyX2lmX2Vsc2VAMzQ6CiAgICBwb3AKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzQKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGR1cAogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6ODkKICAgIC8vICh7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBjcmVhdGlvbkZlZSkpCiAgICBiIG5ld1Bvb2xfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50QDM1CgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6OlN0YWtpbmdQb29sRmFjdG9yeS5kZWxldGVQb29sW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlUG9vbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE1MwogICAgLy8gZGVsZXRlUG9vbChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTU0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfQ1JFQVRPUikKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZVBvb2xfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOk5DUkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkNSRQoKZGVsZXRlUG9vbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDcxCiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGR1cAogICAgcHVzaGJ5dGVzICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNTYKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNTgtMTYyCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBTdGFraW5nUG9vbC5wcm90b3R5cGUuZGVsZXRlPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbgogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE2MAogICAgLy8gYXJnczogW1R4bi5zZW5kZXJdLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTYxCiAgICAvLyBvbkNvbXBsZXRpb246IE9uQ29tcGxldGVBY3Rpb24uRGVsZXRlQXBwbGljYXRpb24KICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNTgtMTYyCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBTdGFraW5nUG9vbC5wcm90b3R5cGUuZGVsZXRlPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbVHhuLnNlbmRlcl0sCiAgICAvLyAgIG9uQ29tcGxldGlvbjogT25Db21wbGV0ZUFjdGlvbi5EZWxldGVBcHBsaWNhdGlvbgogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGFiOGIyMTNhIC8vIG1ldGhvZCAiZGVsZXRlKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE2NC0xNjYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE2NC0xNjUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNjQtMTY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgcmVjZWl2ZXIsIGFtb3VudCB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNTMKICAgIC8vIGRlbGV0ZVBvb2woYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6OlN0YWtpbmdQb29sRmFjdG9yeS5uZXdQb29sQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1Bvb2xDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTc2LTE3OAogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcG9vbC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHBvb2wuZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNSAvLyAxMjQyMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxNzkKICAgIC8vIEdsb2JhbC5taW5CYWxhbmNlCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTc2LTE3OQogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcG9vbC5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHBvb2wuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIEdsb2JhbC5taW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxODIKICAgIC8vIGxldCByZWZlcnJhbE1icjogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE4MwogICAgLy8gY29uc3QgY3JlYXRpb25GZWUgPSB0aGlzLnBvb2xDcmVhdGlvbkZlZSgpCiAgICBjYWxsc3ViIHBvb2xDcmVhdGlvbkZlZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxODQKICAgIC8vIGlmIChjcmVhdGlvbkZlZSA+IDApIHsKICAgIGJ6IG5ld1Bvb2xDb3N0X2FmdGVyX2lmX2Vsc2VAMwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czoxODUKICAgIC8vIHJlZmVycmFsTWJyID0gcmVmZXJyYWxGZWUodGhpcy5ha2l0YURBTy52YWx1ZSwgMCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE4NQogICAgLy8gcmVmZXJyYWxNYnIgPSByZWZlcnJhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCAwKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTk3CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU8sIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldCkKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMAogICAgLy8gaWYgKHJlZmVycmVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IG5ld1Bvb2xDb3N0X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDEKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAoKbmV3UG9vbENvc3RfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MTg5LTE5MAogICAgLy8gY3JlYXRpb25GZWUgKwogICAgLy8gcmVmdW5kYWJsZU1CUiArCiAgICB1bmNvdmVyIDIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE4OS0xOTEKICAgIC8vIGNyZWF0aW9uRmVlICsKICAgIC8vIHJlZnVuZGFibGVNQlIgKwogICAgLy8gcmVmZXJyYWxNYnIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE3MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdQb29sQ29zdF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMwogICAgLy8gbGV0IGNvc3Q6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9uc0xlbmd0aCkKICAgIHB1c2hpbnQgNjcwMDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjE4NQogICAgLy8gcmVmZXJyYWxNYnIgPSByZWZlcnJhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCAwKQogICAgYiBuZXdQb29sQ29zdF9hZnRlcl9pZl9lbHNlQDMKCgovLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2Jhc2UudHM6OkJhc2VTdGFraW5nUG9vbC5tYnJbcm91dGluZ10oKSAtPiB2b2lkOgptYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2Jhc2UudHM6MTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9iYXNlLnRzOjkKICAgIC8vIHJldHVybiBNaW5Qb29sUmV3YXJkc01CUiArIChCb3hDb3N0UGVyQnl0ZSAqIFBvb2xSZXdhcmRXaW5uaW5nVGlja2V0Qnl0ZXMgKiB3aW5uaW5nVGlja2V0cykKICAgIHB1c2hpbnQgMzIwMAogICAgKgogICAgcHVzaGludCA1OTcwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9iYXNlLnRzOjE1LTIxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBlbnRyaWVzOiBQb29sRW50cmllc01CUiwKICAgIC8vICAgdW5pcXVlczogUG9vbFVuaXF1ZXNNQlIsCiAgICAvLyAgIGVudHJpZXNCeUFkZHJlc3M6IFBvb2xFbnRyaWVzQnlBZGRyZXNzTUJSLAogICAgLy8gICByZXdhcmRzOiB0aGlzLnJld2FyZHNNYnIod2lubmluZ1RpY2tldHMpLAogICAgLy8gICBkaXNidXJzZW1lbnRzOiBQb29sRGlzYnVyc2VtZW50U01CUgogICAgLy8gfQogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwNjJkNDAwMDAwMDAwMDAwMDQ5ZDQwMDAwMDAwMDAwMDA2MmQ0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvYmFzZS50czoyMAogICAgLy8gZGlzYnVyc2VtZW50czogUG9vbERpc2J1cnNlbWVudFNNQlIKICAgIHB1c2hpbnQgNjEwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9iYXNlLnRzOjE1LTIxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBlbnRyaWVzOiBQb29sRW50cmllc01CUiwKICAgIC8vICAgdW5pcXVlczogUG9vbFVuaXF1ZXNNQlIsCiAgICAvLyAgIGVudHJpZXNCeUFkZHJlc3M6IFBvb2xFbnRyaWVzQnlBZGRyZXNzTUJSLAogICAgLy8gICByZXdhcmRzOiB0aGlzLnJld2FyZHNNYnIod2lubmluZ1RpY2tldHMpLAogICAgLy8gICBkaXNidXJzZW1lbnRzOiBQb29sRGlzYnVyc2VtZW50U01CUgogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2Jhc2UudHM6MTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQzCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NAogICAgLy8gaWYgKCF0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0NgogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmNyZWF0ZSh7IHNpemUgfSkKICAgIHN3YXAKICAgIGJveF9jcmVhdGUKICAgIHBvcAoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDIKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNSAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXNpemUoc2l6ZSkKICAgIHN3YXAKICAgIGJveF9yZXNpemUKICAgIGIgaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyCiAgICAvCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTcKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTgKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1OAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGRpZyAyCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny01OAogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU5CiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgZGlnIDIKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU5CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYwCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGRpZyAyCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYwCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYxCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGRpZyAyCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDYgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ni02MwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBFUlJfSU5WQUxJRF9DQUxMX09SREVSKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6SUNPUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQ09SCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgOSAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY1CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVwbGFjZShvZmZzZXQsIGRhdGEpCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5kZWxldGVCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgpkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcwCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjgKICAgIC8vIGRlbGV0ZUJveGVkQ29udHJhY3QoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NAogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTYKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNCAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk2CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlRfUkVDRUlWRVIpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOklQTVIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNUgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksIEVSUl9JTlZBTElEX1BBWU1FTlRfQU1PVU5UKQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICBkaWcgMwogICAgKwogICAgKgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVBNQSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUE1BCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDItMjA4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gaWYgKGNvdW50ID4gMCAmJiBlc2Nyb3cubmFtZSAhPT0gJycpIHsKICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDE0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTgKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIxCiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweDNhYjI4OTViIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGFkZHJlc3MsYm9vbClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MQogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9hY2NvdW50L3R5cGVzLnRzOjpFc2Nyb3dJbmZvPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBFUlJfRVNDUk9XX0RPRVNfTk9UX0VYSVNUKQogICAgZXh0cmFjdCA2IDQxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxMgogICAgcHVzaGJ5dGVzICJFUlI6TkVTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpORVNDCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjIKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgRVJSX1dST05HX0VTQ1JPV19GT1JfT1BFUkFUSU9OKQogICAgZGlnIDYKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjpXRVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldFU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzAKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMxCiAgICAvLyBbXQogICAgcHVzaGJ5dGVzIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNC0xMzMKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM3CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM1LTEzOQogICAgLy8gY29uc3Qgb3B0SW5Db3VudCA9IHNwbGl0T3B0SW5Db3VudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldAogICAgLy8gKQogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgNAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0MQogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OS0xNTIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHdhbGxldCwKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDgKICAgIC8vIFthc3NldC5pZF0sCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlYyAxMyAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA0IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDQgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAxNCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBFUlJfSU5WQUxJRF9VUEdSQURFKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJVVBHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklVUEcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA3IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjpTdGFraW5nUG9vbEZhY3RvcnkucG9vbENyZWF0aW9uRmVlKCkgLT4gdWludDY0Ogpwb29sQ3JlYXRpb25GZWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Rha2luZy1wb29sL2ZhY3RvcnkuYWxnby50czozMAogICAgLy8gaWYgKFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MzAKICAgIC8vIGlmIChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcykgewogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJ6IHBvb2xDcmVhdGlvbkZlZV9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjMxCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKcG9vbENyZWF0aW9uRmVlX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjMzCiAgICAvLyByZXR1cm4gZ2V0U3Rha2luZ0ZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuY3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdGFraW5nLXBvb2wvZmFjdG9yeS5hbGdvLnRzOjMzCiAgICAvLyByZXR1cm4gZ2V0U3Rha2luZ0ZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuY3JlYXRpb25GZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4CiAgICAvLyBjb25zdCBbc3Rha2luZ0ZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTdGFraW5nRmVlcykpCiAgICBieXRlYyAxMSAvLyAic3Rha2luZ19mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N0YWtpbmctcG9vbC9mYWN0b3J5LmFsZ28udHM6MzMKICAgIC8vIHJldHVybiBnZXRTdGFraW5nRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5jcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIAoAgkOdLoI0GJg8JYWtpdGFfZGFvAmJjBndhbGxldAQVH3x1DGFraXRhX2VzY3JvdwhFUlI6TkRBTwTFOzLMB3ZlcnNpb24WY2hpbGRfY29udHJhY3RfdmVyc2lvbghFUlI6Q05TVAhFUlI6SVBBWQxzdGFraW5nX2ZlZXMDc2FsAgABA3BhbIAE6pGA3TYaAI4BAHQxGRREMRhBAF2CBAQrJayJBMdHj50ERwxu1wSks+eJJwaCBwTcothiBNNGsaQEOU6usgQz94gIBK6Ey9gEM+kslASFTe3gNhoAjgwBFAQTBHAEpgTgBTEFtgXPB5MHvQg6AAEAI0OABIEVNig2GgCOAQCsADEZgQQSMRgQREIH1ooBATIDi/9AAAGJSIv/gAhyZWZlcnJlcmVIiYoCAYv+gANvYWxlSIEYW7GyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQrEkRJIlklCEwVEkRXBgBJFUlOAkEAB4sAJBNBAARIIkyJF0L/+ooDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiTYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIANhoDSRUkEkQXNhoESRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJwdPBGcnCE8DZyhPAmcnBExnI0OAAEcCMRYjCUk4ECMSRDYaAUlOAkkiWSUITBUSRDYaAklOAhUjEkQ2GgNJTgIVgSASRDYaBElOAkkVSwGBIFlJgSISRE8CTEsCUiJZgSQIEkQ2GgVJTgIVJBJENhoGSU4CFSMSRDYaB0lOAhUkEkQ2GghJTgIVJBJEKb1FAUAABCcJsAAhBTIBCIgGvEkiTgJAAYNJRQ5LAggISwI4BzIKEkAABCcKsABLAjgIEkAABCcKsAAxACIoZUQqZUhyCEQSQQDbIk4CSwxBABixIicEZUQlW3IIREsNsgiyByOyECKyAbMpvUQpIiEEukwhBAkpIQRPArqxMQBPBDgATwQWUCIoZUQWIicEZUSBCrI1gQyyNCKyGYEDsjiABAuBAUOyQk8FskBPBLJAgARkSVHxshpPDLIaTwuyGk8DshpPArIaTwiyGk8HshpPBrIaTwWyGk8EshpPA7IaTLIashqBBrIQIrIBs7cAPbFJcghEMgGyCLIHI7IQIrIBs7FMFiKyGUsBshiABBvN5S2yGrIagQayECKyAbMWK0xQsCNDIihlREknC2VITCcMZUiBEFsiRQ9BADgiKGVEMQCxTCcMZUiBEFuyGIAE1XS7ELIashqBBrIQIrIBs7Q+SVcEAExXAAQrEkRJFSQSRBdFDkkkW0yBEFtLDiMNQQAWSw4jCUxJTwMJTwILgegHCglOAkL+tSNC/+pFASIoZUxJTgJOA0QxAIj8/Yj830sBQQDFSTIDE0EAvksCgAt3YWxsZXRfZmVlc2VIJFtJIQYOREsCHSEGl0lFD0AACEsBQQADI0UOMgdJgYD1JAhLD0kWTwRMUCcNTFBPBYADYWFsZUgkW0sBIlmB1MUBC4HkxQIIsUsBcghESwFLBQiyCLIHI7IQIrIBtk8FFk8FFk8DshiABHt9xfyyGkyyGrIaTLIagQayECKyAbO0PklXBABMVwAEKxJESRUkEkQXFkwWUFcICEsCTwIJFkxQSSJbRQ4kW0xC/aJIRQFJFiIWUEL/6jYaAUkVJBJEF0lyB0QyChJAAAyACEVSUjpOQ1JFsABJgAZmdW5kZXJlSElXACBMgSBbsTEAgQWyGU8DshiABKuLITqyGrIagQayECKyAbOxsgiyByOyECKyAbMjQyEFMgEIIogD40lBABZFASIoZUQxAIj7sIj7kjIDEkEADSJMTwIICBYrTFCwI0OBuIsETEL/7TYaAUkVJBJEF4GAGQuBtNIDCBaAGAAAAAAAAGLUAAAAAAAASdQAAAAAAABi1ExQgdQvFlArTFCwI0M2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXTCcITGcpvUUBQAASMQAyCRJAAAQnBbAAKUy5SCNDMQAiKGVEKmVIcghEEkAABCcFsAApTNNC/+Q2GgFJFSQSRBdJNhoCSSJZJQhLARUSRFcCAEyB8A8KMRZMCSMJSU4DOBCBBhJBAFFLAjgYMggSQQBHSwI4G4EDEkEAPUsCOBlAADZLAjkaACcGEkEAK0sCOAAxABJBACEjQAAMgAhFUlI6SUNPUrAAKb1FAUAABCcJsAApTgK7I0MiQv/cMQAiKGVEKmVIcghEEkAABCcFsAApvEgjQzEWIwlHAjgQIxJENhoBSRUkEkQXSU4DIicEZUxJTgJOBUQiKGVETCVbcghETwKI+o9MOAcyChJAAAyACEVSUjpJUE1SsABMOAgyECNLAwgLEkAADIAIRVJSOklQTUGwALEyCksDshEishKyFIEEshAisgGzQQFLRwIiWUsBFVJXAgCAABNBAToiKGVESSplSExJJw5lSElXCAhOAiRbTgMiJwRlTElOAkUHREkiWUsBFVJJTgJXAgBMKmVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEKxJESSJZgSkLJQhMFRJEVwYpIltJQAAMgAhFUlI6TkVTQ7AASwYlW0lPAhJAAAyACEVSUjpXRVNDsACxTwRJshiABFrfM4+yGk8EshpPArIaTwKyGoAKAAEAAAAAAAAAALIagAIAALIagQayECKyASIoZURPAklOAnIIREsGSU4EiPlKMhALtkxyCESyB7III7IQIrIBtksBFkwWJw1MUE8DshiABGg147yyGkyyGoABgLIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBsyNDNhoBSRUkEkQXIihlRCInBGVEJVtyCERPAoj44DIQI08CCAsWK0xQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCplSHIIRBJAAAQnBbAAJwRMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCplSHIIRBJAAAQnBbAAIihlRCcOZUiBEFsyDRJAAAyACEVSUjpJVVBHsAAnB0xnI0M2GgFJFSQSRBcxACIoZUQqZUhyCEQSQAAEJwWwAChMZyNDMQAiKGVEKmVIcghEEkEAAiKJIihlRCcLZUgiW4k=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue2 = class {
  constructor(value) {
    this.value = value;
  }
  value;
  asByteArray() {
    return this.value;
  }
  asString() {
    return this.value !== void 0 ? Buffer.from(this.value).toString("utf-8") : void 0;
  }
};
var StakingPoolFactoryParamsFactory = class _StakingPoolFactoryParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,string,uint64,(string,uint64))void":
            return _StakingPoolFactoryParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the StakingPoolFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,string,uint64,(string,uint64))void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.childVersion, params.args.akitaDao, params.args.akitaDaoEscrow]
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
            return _StakingPoolFactoryParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the StakingPoolFactory smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPool(params) {
    return {
      ...params,
      method: "newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.title, params.args.type, params.args.marketplace, params.args.stakeKey, params.args.minimumStakeAmount, params.args.allowLateSignups, params.args.gateId, params.args.maxEntries]
    };
  }
  /**
   * Constructs a no op call for the deletePool(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deletePool(params) {
    return {
      ...params,
      method: "deletePool(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.appId]
    };
  }
  /**
   * Constructs a no op call for the newPoolCost()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPoolCost(params) {
    return {
      ...params,
      method: "newPoolCost()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the mbr(uint64)(uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr(uint64)(uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.winningTickets]
    };
  }
  /**
   * Constructs a no op call for the initBoxedContract(string,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static initBoxedContract(params) {
    return {
      ...params,
      method: "initBoxedContract(string,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.size]
    };
  }
  /**
   * Constructs a no op call for the loadBoxedContract(uint64,byte[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static loadBoxedContract(params) {
    return {
      ...params,
      method: "loadBoxedContract(uint64,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.offset, params.args.data]
    };
  }
  /**
   * Constructs a no op call for the deleteBoxedContract()void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteBoxedContract(params) {
    return {
      ...params,
      method: "deleteBoxedContract()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
     * Constructs a no op call for the optIn(pay,uint64)void ABI method
     *
    * optIn opts this contract into `asset`. When this contract has a
    named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
    also opts the escrow and every revenue-split recipient in through
    the revenue-manager plugin — so downstream methods (subscribe,
    list, etc.) can transfer to the escrow without doing the plugin-
    rekey dance mid-group.
    
    Payment must cover:
     - this contract's own opt-in (1 × assetOptInMinBalance), plus
     - each downstream opt-in the escrow still needs.
    `splitOptInCount` returns 0 once the escrow is already opted in, so
    the charge collapses to just 1 × assetOptInMinBalance on repeat
    calls and the escrow branch becomes a no-op.
  
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
   * Constructs a no op call for the optInCost(uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optInCost(params) {
    return {
      ...params,
      method: "optInCost(uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the updateAkitaDAOEscrow((string,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDaoEscrow(params) {
    return {
      ...params,
      method: "updateAkitaDAOEscrow((string,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.config]
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
var StakingPoolFactoryFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `StakingPoolFactoryFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {
    this.appFactory = new _AppFactory2({
      ...params,
      appSpec: APP_SPEC2
    });
  }
  /** The name of the app (from the ARC-32 / ARC-56 app spec or override). */
  get appName() {
    return this.appFactory.appName;
  }
  /** The ARC-56 app spec being used */
  get appSpec() {
    return APP_SPEC2;
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
    return new StakingPoolFactoryClient(this.appFactory.getAppClientById(params));
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
    return new StakingPoolFactoryClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the StakingPoolFactory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? StakingPoolFactoryParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? StakingPoolFactoryParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new StakingPoolFactoryClient(result.appClient) };
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
       * Creates a new instance of the StakingPoolFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(StakingPoolFactoryParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the StakingPoolFactory smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(StakingPoolFactoryParamsFactory.update.update(params));
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
       * Creates a new instance of the StakingPoolFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(StakingPoolFactoryParamsFactory.create.create(params));
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
       * Creates a new instance of the StakingPoolFactory smart contract using an ABI method call using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(StakingPoolFactoryParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new StakingPoolFactoryClient(result.appClient) };
      }
    }
  };
};
var StakingPoolFactoryClient = class _StakingPoolFactoryClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  appClient;
  constructor(appClientOrParams) {
    this.appClient = appClientOrParams instanceof _AppClient2 ? appClientOrParams : new _AppClient2({
      ...appClientOrParams,
      appSpec: APP_SPEC2
    });
  }
  /**
   * Returns a new `StakingPoolFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _StakingPoolFactoryClient(await _AppClient2.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `StakingPoolFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _StakingPoolFactoryClient(await _AppClient2.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
       * Updates an existing instance of the StakingPoolFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(StakingPoolFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the StakingPoolFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newPool: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.newPool(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `deletePool(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deletePool: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.deletePool(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `newPoolCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newPoolCost: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.newPoolCost(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: the mbr created for each boxmap entry
     */
    mbr: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initBoxedContract: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    loadBoxedContract: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the StakingPoolFactory smart contract using the `optIn(pay,uint64)void` ABI method.
         *
        * optIn opts this contract into `asset`. When this contract has a
        named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
        also opts the escrow and every revenue-split recipient in through
        the revenue-manager plugin — so downstream methods (subscribe,
        list, etc.) can transfer to the escrow without doing the plugin-
        rekey dance mid-group.
        
        Payment must cover:
         - this contract's own opt-in (1 × assetOptInMinBalance), plus
         - each downstream opt-in the escrow still needs.
        `splitOptInCount` returns 0 once the escrow is already opted in, so
        the charge collapses to just 1 × assetOptInMinBalance on repeat
        calls and the escrow branch becomes a no-op.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    optIn: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(StakingPoolFactoryParamsFactory.opUp(params));
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
       * Updates an existing instance of the StakingPoolFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(StakingPoolFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the StakingPoolFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newPool: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.newPool(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `deletePool(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deletePool: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.deletePool(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `newPoolCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newPoolCost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.newPoolCost(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: the mbr created for each boxmap entry
     */
    mbr: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initBoxedContract: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    loadBoxedContract: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the StakingPoolFactory smart contract using the `optIn(pay,uint64)void` ABI method.
         *
        * optIn opts this contract into `asset`. When this contract has a
        named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
        also opts the escrow and every revenue-split recipient in through
        the revenue-manager plugin — so downstream methods (subscribe,
        list, etc.) can transfer to the escrow without doing the plugin-
        rekey dance mid-group.
        
        Payment must cover:
         - this contract's own opt-in (1 × assetOptInMinBalance), plus
         - each downstream opt-in the escrow still needs.
        `splitOptInCount` returns 0 once the escrow is already opted in, so
        the charge collapses to just 1 × assetOptInMinBalance on repeat
        calls and the escrow branch becomes a no-op.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    optIn: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(StakingPoolFactoryParamsFactory.opUp(params));
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
       * Updates an existing instance of the StakingPoolFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(StakingPoolFactoryParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the StakingPoolFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newPool: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.newPool(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `deletePool(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deletePool: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.deletePool(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `newPoolCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newPoolCost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.newPoolCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: the mbr created for each boxmap entry
     */
    mbr: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.mbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initBoxedContract: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.initBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    loadBoxedContract: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.loadBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteBoxedContract: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.deleteBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the StakingPoolFactory smart contract using the `optIn(pay,uint64)void` ABI method.
         *
        * optIn opts this contract into `asset`. When this contract has a
        named escrow configured (`akitaDAOEscrow.value.name !== ''`), it
        also opts the escrow and every revenue-split recipient in through
        the revenue-manager plugin — so downstream methods (subscribe,
        list, etc.) can transfer to the escrow without doing the plugin-
        rekey dance mid-group.
        
        Payment must cover:
         - this contract's own opt-in (1 × assetOptInMinBalance), plus
         - each downstream opt-in the escrow still needs.
        `splitOptInCount` returns 0 once the escrow is already opted in, so
        the charge collapses to just 1 × assetOptInMinBalance on repeat
        calls and the escrow branch becomes a no-op.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    optIn: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the StakingPoolFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.opUp(params));
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
    return new _StakingPoolFactoryClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the StakingPoolFactory smart contract using the `newPoolCost()uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newPoolCost(params = { args: [] }) {
    const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.newPoolCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPoolFactory smart contract using the `mbr(uint64)(uint64,uint64,uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: the mbr created for each boxmap entry
   */
  async mbr(params) {
    const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the StakingPoolFactory smart contract using the `optInCost(uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(StakingPoolFactoryParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Methods to access state for the current StakingPoolFactory app
   */
  state = {
    /**
     * Methods to access global state for the current StakingPoolFactory app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          childContractVersion: result.childContractVersion,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the childContractVersion key in global state
       */
      childContractVersion: async () => {
        return await this.appClient.state.global.getValue("childContractVersion");
      },
      /**
       * Get the current value of the akitaDAOEscrow key in global state
       */
      akitaDaoEscrow: async () => {
        return await this.appClient.state.global.getValue("akitaDAOEscrow");
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
     * Methods to access box state for the current StakingPoolFactory app
     */
    box: {
      /**
       * Get all current keyed values from box state
       */
      getAll: async () => {
        const result = await this.appClient.state.box.getAll();
        return {
          boxedContract: new BinaryStateValue2(result.boxedContract)
        };
      },
      /**
       * Get the current value of the boxedContract key in box state
       */
      boxedContract: async () => {
        return new BinaryStateValue2(await this.appClient.state.box.getValue("boxedContract"));
      }
    }
  };
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a newPool(pay,string,uint8,address,(address,string),uint64,bool,uint64,uint64)uint64 method call against the StakingPoolFactory contract
       */
      newPool(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPool(params)));
        return this;
      },
      /**
       * Add a deletePool(uint64)void method call against the StakingPoolFactory contract
       */
      deletePool(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deletePool(params)));
        return this;
      },
      /**
       * Add a newPoolCost()uint64 method call against the StakingPoolFactory contract
       */
      newPoolCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPoolCost(params)));
        return this;
      },
      /**
       * Add a mbr(uint64)(uint64,uint64,uint64,uint64,uint64) method call against the StakingPoolFactory contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the StakingPoolFactory contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the StakingPoolFactory contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the StakingPoolFactory contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the StakingPoolFactory contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the StakingPoolFactory contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the StakingPoolFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the StakingPoolFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the StakingPoolFactory contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
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
       * Add a clear state call to the StakingPoolFactory contract
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

// src/staking-pool/factory.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
var StakingPoolFactorySDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: StakingPoolFactoryFactory, ...params }, ENV_VAR_NAMES.STAKING_POOL_FACTORY_APP_ID);
  }
  /**
   * Creates a new staking pool via the factory and returns a StakingPoolSDK instance.
   * @returns StakingPoolSDK for the newly created pool
   */
  async new({
    sender,
    signer,
    title,
    type,
    marketplace,
    stakeKey,
    minimumStakeAmount,
    allowLateSignups = false,
    gateId = 0n,
    maxEntries = 0n
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const poolCost = await this.cost(sendParams);
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(poolCost),
      receiver: this.client.appAddress
    });
    const group = this.client.newGroup();
    group.newPool({
      ...sendParams,
      args: {
        payment,
        title,
        type,
        marketplace,
        stakeKey,
        minimumStakeAmount,
        allowLateSignups,
        gateId,
        maxEntries
      }
    });
    const result = await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    const appId = result.returns[0];
    if (appId === void 0) {
      throw new Error("Failed to create new staking pool");
    }
    return new StakingPoolSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
  }
  /**
   * Gets a StakingPoolSDK instance for an existing pool.
   * Note: Cannot be static as it requires instance properties (algorand, sendParams).
   * @param appId - The app ID of the pool
   * @returns StakingPoolSDK for the specified pool
   */
  get({ appId }) {
    return new StakingPoolSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
  }
  /**
   * Gets the cost to create a new staking pool.
   */
  async cost(params) {
    const sendParams = this.getSendParams({
      sender: this.readerAccount,
      signer: emptySigner,
      ...params
    });
    const cost = await this.client.newPoolCost({
      ...sendParams,
      args: {}
    });
    return cost;
  }
  /**
   * Deletes a pool created by this factory.
   */
  async deletePool({ sender, signer, appId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.deletePool({
      ...sendParams,
      args: { appId }
    });
  }
  /**
   * Gets MBR (Minimum Balance Requirement) data for pool operations.
   */
  async getMbr({ winningTickets }) {
    return await this.client.mbr({ args: { winningTickets } });
  }
};
async function newStakingPool({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...poolParams
}) {
  const factory = new StakingPoolFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.new(poolParams);
}

// src/staking-pool/types.ts
var PoolStatus = /* @__PURE__ */ ((PoolStatus2) => {
  PoolStatus2[PoolStatus2["Draft"] = 0] = "Draft";
  PoolStatus2[PoolStatus2["Final"] = 10] = "Final";
  return PoolStatus2;
})(PoolStatus || {});
var StakingPoolStakingType = /* @__PURE__ */ ((StakingPoolStakingType2) => {
  StakingPoolStakingType2[StakingPoolStakingType2["NONE"] = 0] = "NONE";
  StakingPoolStakingType2[StakingPoolStakingType2["HEARTBEAT"] = 10] = "HEARTBEAT";
  StakingPoolStakingType2[StakingPoolStakingType2["SOFT"] = 20] = "SOFT";
  StakingPoolStakingType2[StakingPoolStakingType2["HARD"] = 30] = "HARD";
  StakingPoolStakingType2[StakingPoolStakingType2["LOCK"] = 40] = "LOCK";
  return StakingPoolStakingType2;
})(StakingPoolStakingType || {});
var DistributionType = /* @__PURE__ */ ((DistributionType2) => {
  DistributionType2[DistributionType2["Percentage"] = 10] = "Percentage";
  DistributionType2[DistributionType2["Flat"] = 20] = "Flat";
  DistributionType2[DistributionType2["Even"] = 30] = "Even";
  DistributionType2[DistributionType2["Shuffle"] = 40] = "Shuffle";
  return DistributionType2;
})(DistributionType || {});
var DisbursementPhase = /* @__PURE__ */ ((DisbursementPhase2) => {
  DisbursementPhase2[DisbursementPhase2["Idle"] = 0] = "Idle";
  DisbursementPhase2[DisbursementPhase2["Preparation"] = 10] = "Preparation";
  DisbursementPhase2[DisbursementPhase2["Allocation"] = 20] = "Allocation";
  DisbursementPhase2[DisbursementPhase2["Finalization"] = 30] = "Finalization";
  return DisbursementPhase2;
})(DisbursementPhase || {});

// src/staking-pool/index.ts
var StakingPoolSDK = class extends BaseSDK {
  constructor(params) {
    super({ factory: StakingPoolFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the pool.
   */
  async getState() {
    const { return: state } = await this.client.send.getState({ args: {} });
    if (state === void 0) {
      throw new Error("Failed to get pool state");
    }
    return state;
  }
  /**
   * Checks if pool signups are currently open.
   */
  async signUpsOpen() {
    const isOpen = await this.client.signUpsOpen();
    return isOpen ?? false;
  }
  /**
   * Checks if the pool is currently live (active).
   */
  async isLive() {
    const isLive = await this.client.isLive();
    return isLive ?? false;
  }
  /**
   * Checks if an address is entered in the pool.
   */
  async isEntered({ address }) {
    const entered = await this.client.isEntered({ args: { address } });
    return entered ?? false;
  }
  /**
   * Checks eligibility and stake amount for an address/asset combination.
   */
  async check({ address, asset }) {
    const { return: result } = await this.client.send.check({
      args: { address, asset },
      extraFee: microAlgo2(1e3)
    });
    if (result === void 0) {
      throw new Error("Failed to check eligibility");
    }
    return {
      isEligible: result.valid,
      stake: result.balance
    };
  }
  async gateCheck({ gateTxn, address, asset }) {
    const group = this.client.newGroup();
    group.gateCheck({ ...this.getSendParams(), args: { gateTxn, address, asset } });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Gets MBR data for the pool based on winning tickets count.
   */
  async getMbr({ winningTickets }) {
    const { return: mbrData } = await this.client.send.mbr({ args: { winningTickets } });
    if (mbrData === void 0) {
      throw new Error("Failed to get MBR data");
    }
    return mbrData;
  }
  async getReward(rewardId) {
    const reward = await this.client.state.box.rewards.value(rewardId);
    if (reward === void 0) {
      throw new Error("Failed to get reward");
    }
    return reward;
  }
  async getRewards() {
    const rewards = await this.client.state.box.rewards.getMap();
    return new Map(Array.from(rewards.entries()).map(([key, value]) => [Number(key), value]));
  }
  // ========== Write Methods ==========
  /**
   * Initializes the pool after creation.
   */
  async init(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.init({
      ...sendParams,
      args: { akitaRoyalty: 0n }
    });
  }
  /**
   * Opts the pool contract into an asset.
   */
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = await this.client.optInCost({ args: { asset } });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo2(cost),
      receiver: this.client.appAddress
    });
    const group = this.client.newGroup();
    group.optIn({
      ...sendParams,
      args: {
        payment,
        asset
      }
    });
    return await group.send({ ...sendParams });
  }
  /**
   * Adds a reward to the pool.
   */
  async addReward({ sender, signer, reward, amount }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.getMbr({ winningTickets: reward.winnerCount });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo2(mbrData.rewards),
      receiver: this.client.appAddress
    });
    const assetXfer = this.client.algorand.createTransaction.assetTransfer({
      ...sendParams,
      amount: BigInt(amount),
      assetId: BigInt(reward.asset),
      receiver: this.client.appAddress
    });
    await this.client.send.addRewardAsa({
      ...sendParams,
      args: {
        payment,
        assetXfer,
        reward
      }
    });
  }
  /**
   * Finalizes the pool with signup, start, and end timestamps.
   */
  async finalize({ sender, signer, signupTimestamp, startTimestamp, endTimestamp }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.finalize({
      ...sendParams,
      args: {
        signupTimestamp,
        startTimestamp,
        endTimestamp
      }
    });
  }
  /**
   * Gets the cost to enter the pool for a given address and set of assets.
   * This calls the contract's enterCost method, which accounts for entry box MBR
   * and any app-scoped SOFT stake MBR.
   */
  async enterCost({ address, assets }) {
    return await this.client.enterCost({
      args: {
        address,
        entries: assets.map((asset) => [BigInt(asset), 0n, []])
      }
    });
  }
  /**
   * Enters the pool with specified entries.
   */
  async enter({ sender, signer, entries, gateTxn }) {
    const assets = entries.map(({ asset }) => BigInt(asset));
    if (new Set(assets).size !== assets.length) {
      throw new Error("Each asset can only be entered once per staking pool request");
    }
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const paymentAmount = await this.enterCost({
      address: sendParams.sender.toString(),
      assets
    });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo2(paymentAmount),
      receiver: this.client.appAddress
    });
    const formattedEntries = entries.map((e) => [
      e.asset,
      e.amount,
      e.proofs ?? []
    ]);
    const isGated = gateTxn !== void 0;
    if (isGated) {
      const group = this.client.newGroup();
      group.gatedEnter({
        ...sendParams,
        args: {
          payment,
          gateTxn,
          entries: formattedEntries
        }
      });
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    } else {
      const group = this.client.newGroup();
      group.enter({
        ...sendParams,
        args: {
          payment,
          entries: formattedEntries
        }
      });
      await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    }
  }
  /**
   * Starts the disbursement phase for a reward.
   */
  async startDisbursement({ sender, signer, rewardId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.startDisbursement({
      ...sendParams,
      args: { rewardId }
    });
  }
  /**
   * Runs a raffle for a raffle-type reward.
   */
  async raffle({ sender, signer, rewardId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.raffle({
      ...sendParams,
      args: { rewardId }
    });
  }
  /**
   * Disburses rewards to participants.
   */
  async disburseRewards({ sender, signer, rewardId, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.disburseRewards({
      ...sendParams,
      args: {
        rewardId,
        iterationAmount
      }
    });
  }
  /**
   * Finalizes the distribution for a reward.
   */
  async finalizeDistribution({ sender, signer, rewardId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.finalizeDistribution({
      ...sendParams,
      args: { rewardId }
    });
  }
  /**
   * Updates the Akita DAO escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, config }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { config }
    });
  }
  /**
   * Updates the Akita DAO reference.
   */
  async updateAkitaDAO({ sender, signer, akitaDao }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDao({
      ...sendParams,
      args: { akitaDao }
    });
  }
};

export {
  STAKING_POOL_ERROR_MESSAGES,
  translateStakingPoolError,
  StakingPoolFactorySDK,
  newStakingPool,
  PoolStatus,
  StakingPoolStakingType,
  DistributionType,
  DisbursementPhase,
  StakingPoolSDK
};
//# sourceMappingURL=chunk-3AKNC6WS.mjs.map
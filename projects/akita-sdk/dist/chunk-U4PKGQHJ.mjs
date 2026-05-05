import {
  ValueMap
} from "./chunk-2ZPJXFUS.mjs";
import {
  convertToUnixTimestamp
} from "./chunk-5F555WJV.mjs";
import {
  makeErrorTranslator
} from "./chunk-2AEP6DTX.mjs";
import {
  BaseSDK
} from "./chunk-JNYFBSSA.mjs";
import {
  ENV_VAR_NAMES
} from "./chunk-X7YBMTJD.mjs";

// src/subscriptions/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { microAlgos } from "@algorandfoundation/algokit-utils";

// src/generated/SubscriptionsClient.ts
import { ABIStructType, getStructValueFromTupleValue } from "@algorandfoundation/algokit-utils/abi";
import { AppClient as _AppClient } from "@algorandfoundation/algokit-utils/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/app-factory";
var APP_SPEC = { "name": "Subscriptions", "structs": { "BlockListKey": [{ "name": "address", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "Service": [{ "name": "status", "type": "uint8" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "passes", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }], "ServicesKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionInfo": [{ "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionInfoWithDetails": [{ "name": "recipient", "type": "address" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "serviceId", "type": "uint64" }, { "name": "status", "type": "uint8" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "passes", "type": "address[]" }], "SubscriptionInfoWithExistence": [{ "name": "exists", "type": "bool" }, { "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment", "desc": "The payment for the service creation" }, { "type": "uint64", "name": "interval", "desc": "The interval in seconds" }, { "type": "uint64", "name": "asset", "desc": "The asa to be used for the subscription" }, { "type": "uint64", "name": "amount", "desc": "The amount of the asa to be used for the subscription" }, { "type": "uint64", "name": "passes", "desc": "The number of accounts the subscription can be shared with" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "newService creates a new service for a merchant", "events": [], "recommendations": {} }, { "name": "setServiceDescription", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "activateService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "activateService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "pauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "pauseService pauses a service for a merchant\nit does not shutdown pre-existing subscriptions\nit simply prevents new subscriptions from being created\nfor a specific service", "events": [], "recommendations": {} }, { "name": "unpauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unpauseService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "shutdownService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "shutdownService permanently shuts down an service for a merchant\nit also shutsdown pre-existing subscriptions", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "payment", "desc": "The payment to cover mbr for blocking" }, { "type": "address", "name": "blocked", "desc": "The address to be blocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "block blacklists an address for a merchant", "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "blocked", "desc": "The address to be unblocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unblock removes an address from a merchants blocks", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deposit", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "depositAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unsubscribe", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "triggerPayment", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "streakCheck", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setPasses", "args": [{ "type": "uint64", "name": "id" }, { "type": "address[]", "name": "addresses" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "triggerList", "args": [{ "type": "(address,uint64[])[]", "name": "req" }], "returns": { "type": "bool[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "address", "desc": "The address to be checked" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "isBlocked checks if an address is blocked for a merchant", "events": [], "recommendations": {} }, { "name": "isShutdown", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "serviceIsActive checks if an service is shutdown", "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "blockCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getService", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])", "struct": "Service" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServicesByAddress", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "start" }, { "type": "uint64", "name": "windowSize" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfoWithExistence" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionWithDetails", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", "struct": "SubscriptionInfoWithDetails" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFirstSubscription", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServiceList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "subscriptions": { "keyType": "SubscriptionKey", "valueType": "SubscriptionInfo", "prefix": "cw==" }, "subscriptionslist": { "keyType": "address", "valueType": "uint64", "desc": "A counter for each addresses subscription id", "prefix": "bA==" }, "services": { "keyType": "ServicesKey", "valueType": "Service", "desc": "services is a map of services a specific merchant has\ndenoted by the merchant address + index of the offer as a key\n32 + 8 = 40 bytes\n120 bytes total -> (2500 + (400 * 121)) = 0.050500", "prefix": "bw==" }, "serviceslist": { "keyType": "address", "valueType": "uint64", "prefix": "bQ==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "blocks allow merchants to specify which addresses cannot subscribe\nkey will be merchant address + blocked address\n32 + 32 = 64 bytes\n65 bytes total -> (2500 + (400 * 64)) = 0.028500", "prefix": "Yg==" }, "passes": { "keyType": "SubscriptionKey", "valueType": "address[]", "prefix": "cA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1632, 2173, 2331, 2372, 3403, 3431, 3489, 3530, 3595, 3652, 3727, 3924, 4108, 4894, 4971, 5254, 5365, 5409, 5477, 5825, 5860, 6596, 6665, 6813, 7666, 7862, 8017], "errorMessage": "Box must have value" }, { "pc": [803, 1184, 1316, 6128], "errorMessage": "Bytes has valid prefix" }, { "pc": [3413, 3504, 7131, 7574], "errorMessage": "ERR:ASAM" }, { "pc": [2236], "errorMessage": "ERR:BDLN" }, { "pc": [4248, 6858, 7221], "errorMessage": "ERR:BLKD" }, { "pc": [2279], "errorMessage": "ERR:BOFS" }, { "pc": [7855], "errorMessage": "ERR:CTRG" }, { "pc": [2868, 3185, 4008], "errorMessage": "ERR:FGTE" }, { "pc": [2107], "errorMessage": "ERR:GIOB" }, { "pc": [3e3, 3330], "errorMessage": "ERR:HGTE" }, { "pc": [3526], "errorMessage": "ERR:IARE" }, { "pc": [1827, 1844, 2634, 2649, 3427, 6955, 6981, 7378, 7395], "errorMessage": "ERR:IPAY" }, { "pc": [5975], "errorMessage": "ERR:IPMA" }, { "pc": [5948], "errorMessage": "ERR:IPMR" }, { "pc": [1984, 1995, 2048, 2166, 7905], "errorMessage": "ERR:ISEQ" }, { "pc": [6501], "errorMessage": "ERR:IUPG" }, { "pc": [7409, 7426], "errorMessage": "ERR:IXFR" }, { "pc": [1663, 2786, 2948, 3103, 3278], "errorMessage": "ERR:MAMT" }, { "pc": [1675, 2798, 2960, 3115, 3290], "errorMessage": "ERR:MINV" }, { "pc": [1695], "errorMessage": "ERR:MXPS" }, { "pc": [6428, 6472, 6538], "errorMessage": "ERR:NDAO" }, { "pc": [3616], "errorMessage": "ERR:NEFN" }, { "pc": [6163], "errorMessage": "ERR:NESC" }, { "pc": [4137], "errorMessage": "ERR:NODN" }, { "pc": [1770, 1793, 7335], "errorMessage": "ERR:NOPT" }, { "pc": [2806, 3123, 3945], "errorMessage": "ERR:NSVC" }, { "pc": [4204], "errorMessage": "ERR:PCOF" }, { "pc": [2197, 2394, 2443, 2493, 2551, 2828, 2986, 3145, 3316, 3968, 4160, 4807, 4891, 5677, 7102, 7540], "errorMessage": "ERR:SDNE" }, { "pc": [2457, 7117, 7555], "errorMessage": "ERR:SNAC" }, { "pc": [2029], "errorMessage": "ERR:SNAV" }, { "pc": [2212, 2408], "errorMessage": "ERR:SNDR" }, { "pc": [2516], "errorMessage": "ERR:SNPA" }, { "pc": [2565, 4184], "errorMessage": "ERR:SSHD" }, { "pc": [1720], "errorMessage": "ERR:TTLG" }, { "pc": [2620], "errorMessage": "ERR:UABL" }, { "pc": [3400, 3486, 3586, 3718, 3921, 4105, 5362, 5400], "errorMessage": "ERR:UDNE" }, { "pc": [2693], "errorMessage": "ERR:UNBL" }, { "pc": [6188], "errorMessage": "ERR:WESC" }, { "pc": [1037, 6708, 6749], "errorMessage": "IPCT" }, { "pc": [6572, 6583], "errorMessage": "Length must be 16" }, { "pc": [966, 1120, 1214, 1231, 1237, 1340, 1780, 1855, 5922, 6251, 6267, 6360, 6420, 6464, 6530, 6992, 7323, 7346, 7935, 8054], "errorMessage": "application exists" }, { "pc": [1724, 1775, 1797, 1850, 2839, 2851, 3156, 3168, 3979, 3991, 4709, 4736, 4842, 5912, 5916, 6020, 6053, 6243, 6350, 6355, 6413, 6457, 6476, 6523, 6688, 6926, 6987, 7289, 7318, 7341, 7930, 8049], "errorMessage": "check GlobalState exists" }, { "pc": [4228, 4446], "errorMessage": "index access is out of bounds" }, { "pc": [2202, 2398, 2413, 2447, 2463, 2497, 2521, 2555, 2570, 2834, 2992, 3151, 3322, 3444, 3543, 3663, 3759, 3974, 4166, 4171, 4673, 4813, 5683, 5691, 5744, 5751, 5758, 6639, 6675, 7107, 7123, 7138, 7145, 7153, 7161, 7180, 7545, 7561, 7581, 7588, 7596, 7604, 7623, 7765, 8031, 8038, 8140], "errorMessage": "index out of bounds" }, { "pc": [4317], "errorMessage": "invalid array encoding" }, { "pc": [806, 1096, 1422, 1436, 1477, 1573, 2080, 4070, 4287, 4345, 4403, 6131, 6402, 6441], "errorMessage": "invalid array length header" }, { "pc": [4082], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [1443, 1580, 2087, 6448], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [6140], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [4368], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/subscriptions/types.ts::TriggerListRequest>" }, { "pc": [1567, 2591, 2664, 2746, 2908, 3063, 3238, 4608, 4617, 4648, 4759, 4866, 4915, 5782, 5811, 5846], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1592], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [1609], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 3>" }, { "pc": [1454, 1521, 1530, 1539, 1548, 1557, 2073, 2423, 2473, 2531, 2754, 2764, 2774, 2916, 2926, 2936, 3071, 3081, 3091, 3246, 3256, 3266, 3370, 3465, 3555, 3564, 3697, 4060, 4656, 4704, 4767, 4776, 4874, 4923, 4933, 5897, 6345, 6516], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1600], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [812], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [3906, 4025, 4040, 5127, 5347, 5385], "errorMessage": "invalid number of bytes for smart_contracts/subscriptions/types.ts::SubscriptionKey" }, { "pc": [1482, 6407], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1189, 1321], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1469, 6394], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [4341], "errorMessage": "invalid tail pointer at index 1 of (uint8[32],(len+uint64[]))" }, { "pc": [4325], "errorMessage": "invalid tail pointer for (len+(uint8[32],(len+uint64[]))[])" }, { "pc": [1464, 4336, 6389], "errorMessage": "invalid tuple encoding" }, { "pc": [2737, 3054, 3896], "errorMessage": "transaction type is appl" }, { "pc": [3043, 3229, 3457], "errorMessage": "transaction type is axfer" }, { "pc": [1513, 2582, 2726, 2899, 3032, 3218, 3362, 5889], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgMTg5MDAgNjA1MDAgNDc5NDAwIDY3MDAwIDYyNTAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iIDB4MTUxZjdjNzUgIm8iICIiICJFUlI6U0RORSIgInMiICJha2l0YV9lc2Nyb3ciICJFUlI6SVBBWSIgIkVSUjpVRE5FIiAiYiIgIm0iIDB4MDAwMCAweDAwICJsIiAiRVJSOk1BTVQiICJFUlI6TUlOViIgIkVSUjpJU0VRIiAweDE0IDB4MjggIndhbGxldCIgIkVSUjpBU0FNIiAicCIgImFhbCIgInN1YnNjcmlwdGlvbl9mZWVzIiAiRVJSOk5PUFQiIDB4MGEgIkVSUjpTTkFDIiAiRVJSOk5TVkMiICJFUlI6RkdURSIgIkVSUjpCTEtEIiAiRVJSOk5EQU8iIDB4OWIwZjg5ZDYgMHgxNzk1YTBkMCAweGM4ODM1MTMwIDB4MjgxYjg5MWIgMHgzOTRlYWViMiAweDAwMDEgInZlcnNpb24iICJFUlI6U05EUiIgIkVSUjpTU0hEIiAiRVJSOkhHVEUiICJwYWwiICJFUlI6SVhGUiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTctMTAzCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Vic2NyaXB0aW9ucywgQWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTctMTAzCiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Vic2NyaXB0aW9ucywgQWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbikgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEA0NwogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJuZXdTZXJ2aWNlKHBheSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10pdWludDY0IgogICAgYnl0ZWMgMzIgLy8gbWV0aG9kICJzZXRTZXJ2aWNlRGVzY3JpcHRpb24odWludDY0LGJ5dGVbXSl2b2lkIgogICAgYnl0ZWMgMzMgLy8gbWV0aG9kICJhY3RpdmF0ZVNlcnZpY2UoKXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4MTdjODczMGIgMHg0Y2RmMGNkNyAweDg3ZTA1NWM2IDB4YjU5YzhhNTQgMHhhZWViYjM3OCAweDUzNTVkYTZkIDB4MTBmMDBjM2EgMHhhNjhlNjk2MyAweGIxMGEzMDZlIDB4ZjIzNTViNTUgMHgxYWM0YTc1OCAweGUzYWViMjVjIDB4ZWFhYWE0ZDMgLy8gbWV0aG9kICJwYXVzZVNlcnZpY2UodWludDY0KXZvaWQiLCBtZXRob2QgInVucGF1c2VTZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJzaHV0ZG93blNlcnZpY2UodWludDY0KXZvaWQiLCBtZXRob2QgImJsb2NrKHBheSxhZGRyZXNzKXZvaWQiLCBtZXRob2QgInVuYmxvY2soYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZFN1YnNjcmliZShwYXksYXBwbCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAic3Vic2NyaWJlKHBheSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZUFzYShwYXksYXhmZXIsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImRlcG9zaXQocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJkZXBvc2l0QXNhKGF4ZmVyLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ3aXRoZHJhdyh1aW50NjQsdWludDY0KXZvaWQiLCBtZXRob2QgInVuc3Vic2NyaWJlKHVpbnQ2NCl2b2lkIgogICAgYnl0ZWMgMzQgLy8gbWV0aG9kICJnYXRlZFRyaWdnZXJQYXltZW50KGFwcGwsKGFkZHJlc3MsdWludDY0KSl2b2lkIgogICAgcHVzaGJ5dGVzcyAweGMzZDlmMWRjIDB4YzBmZjI3MzAgMHgyNzUyMDNhZiAweDEyNjlkODdlIDB4NDMwMzY2OGUgMHgwZDZhNDdhMyAweDFkYzc4MzcxIDB4MDlhMzE1OGUgMHhmOTk5NjNkNCAweGQ0YjE2ZTdhIDB4NzRkZWY1OWEgMHgyNWI4MTJhNyAweDk2OWNlZDliIDB4MzNkOGU1YWQgMHg2MDNkNzI5NyAweGRmZTYwMmNmIDB4ZDhhNmM1MjMgLy8gbWV0aG9kICJ0cmlnZ2VyUGF5bWVudCgoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInN0cmVha0NoZWNrKChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAic2V0UGFzc2VzKHVpbnQ2NCxhZGRyZXNzW10pdm9pZCIsIG1ldGhvZCAidHJpZ2dlckxpc3QoKGFkZHJlc3MsdWludDY0W10pW10pYm9vbFtdIiwgbWV0aG9kICJpc0Jsb2NrZWQoYWRkcmVzcyxhZGRyZXNzKWJvb2wiLCBtZXRob2QgImlzU2h1dGRvd24oYWRkcmVzcyx1aW50NjQpYm9vbCIsIG1ldGhvZCAibmV3U2VydmljZUNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3U3Vic2NyaXB0aW9uQ29zdChhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJibG9ja0Nvc3QoKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0U2VydmljZShhZGRyZXNzLHVpbnQ2NCkodWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSkiLCBtZXRob2QgImdldFNlcnZpY2VzQnlBZGRyZXNzKGFkZHJlc3MsdWludDY0LHVpbnQ2NCkodWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSlbXSIsIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uKChhZGRyZXNzLHVpbnQ2NCkpKGJvb2wsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm11c3RHZXRTdWJzY3JpcHRpb24oKGFkZHJlc3MsdWludDY0KSkoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzKChhZGRyZXNzLHVpbnQ2NCkpKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDgsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10sdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzc1tdKSIsIG1ldGhvZCAiaXNGaXJzdFN1YnNjcmlwdGlvbihhZGRyZXNzKWJvb2wiLCBtZXRob2QgImdldFNlcnZpY2VMaXN0KGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnZXRTdWJzY3JpcHRpb25MaXN0KGFkZHJlc3MpdWludDY0IgogICAgYnl0ZWMgMzUgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgLy8gbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbmV3U2VydmljZSBzZXRTZXJ2aWNlRGVzY3JpcHRpb24gYWN0aXZhdGVTZXJ2aWNlIHBhdXNlU2VydmljZSB1bnBhdXNlU2VydmljZSBzaHV0ZG93blNlcnZpY2UgYmxvY2sgdW5ibG9jayBnYXRlZFN1YnNjcmliZSBzdWJzY3JpYmUgZ2F0ZWRTdWJzY3JpYmVBc2Egc3Vic2NyaWJlQXNhIGRlcG9zaXQgZGVwb3NpdEFzYSB3aXRoZHJhdyB1bnN1YnNjcmliZSBnYXRlZFRyaWdnZXJQYXltZW50IHRyaWdnZXJQYXltZW50IHN0cmVha0NoZWNrIHNldFBhc3NlcyB0cmlnZ2VyTGlzdCBpc0Jsb2NrZWQgaXNTaHV0ZG93biBuZXdTZXJ2aWNlQ29zdCBuZXdTdWJzY3JpcHRpb25Db3N0IG1haW5fYmxvY2tDb3N0X3JvdXRlQDMyIGdldFNlcnZpY2UgZ2V0U2VydmljZXNCeUFkZHJlc3MgZ2V0U3Vic2NyaXB0aW9uIG11c3RHZXRTdWJzY3JpcHRpb24gZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHMgaXNGaXJzdFN1YnNjcmlwdGlvbiBnZXRTZXJ2aWNlTGlzdCBnZXRTdWJzY3JpcHRpb25MaXN0IG9wdEluIG9wdEluQ29zdCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVANDUKICAgIGVycgoKbWFpbl9vcFVwX3JvdXRlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fYmxvY2tDb3N0X3JvdXRlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwM2Q1NAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDQ3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5Ny0xMDMKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHg1YWQ5ZjRjNiAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBfcHV5YV9saWIuYXJjNC5keW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50KGFycmF5OiBieXRlcywgaW5kZXg6IHVpbnQ2NCkgLT4gYnl0ZXM6CmR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQ6CiAgICBwcm90byAyIDEKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgc3dhcAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAyCiAgICBsZW4KICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgaW50Y18zIC8vIDIKICAgICoKICAgIGRpZyA1CiAgICBzd2FwCiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgIC0KICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6b3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0SUQ6IHVpbnQ2NCkgLT4gYnl0ZXM6Cm9yaWdpbk9yVHhuU2VuZGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBvcmlnaW5PclR4blNlbmRlcih3YWxsZXRJRDogQXBwbGljYXRpb24pOiBBY2NvdW50IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQzCiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IG9yaWdpbk9yVHhuU2VuZGVyX2FmdGVyX2lmX2Vsc2VAMwogICAgZnJhbWVfZGlnIDAKCm9yaWdpbk9yVHhuU2VuZGVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6b3JpZ2luT3JANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTUwCiAgICAvLyByZXR1cm4gb3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBzd2FwCiAgICByZXRzdWIKCm9yaWdpbk9yVHhuU2VuZGVyX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjcKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgcHVzaGJ5dGVzICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgYiBvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0SUQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnJlZmVycmVyT3JaZXJvQWRkcmVzczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lmX2Vsc2VAMwogICAgZnJhbWVfZGlnIDAKCnJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgc3dhcAogICAgcmV0c3ViCgpyZWZlcnJlck9yWmVyb0FkZHJlc3NfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NQogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICBwdXNoYnl0ZXMgInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBiIHJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTzogdWludDY0LCBhZGRyZXNzOiBieXRlcykgLT4gdWludDY0OgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24sIGFkZHJlc3M6IEFjY291bnQpOiBBcHBsaWNhdGlvbiB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoYnl0ZXMgIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQKICAgIC8vIHJldHVybiBnZXRPdGhlckFwcExpc3QoYWtpdGFEQU8pLmVzY3JvdwogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTg2LTE4OQogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTEKICAgIC8vIGlmIChCeXRlcyhkYXRhKS5sZW5ndGggPT09IDAgfHwgQnl0ZXMoZGF0YSkubGVuZ3RoICE9PSA4KSB7CiAgICBsZW4KICAgIGR1cAogICAgYnogZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2lmX2JvZHlANgogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICAhPQogICAgYnogZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANwoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2lmX2JvZHlANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTkyCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MgogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGdldFdhbGxldElEKGVzY3Jvd0ZhY3RvcnksIGFkZHJlc3MpKQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5NQogICAgLy8gcmV0dXJuIGJ0b2koZGF0YSkKICAgIGZyYW1lX2RpZyAwCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MgogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGdldFdhbGxldElEKGVzY3Jvd0ZhY3RvcnksIGFkZHJlc3MpKQogICAgYiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2F0ZUNoZWNrKGdhdGVUeG46IHVpbnQ2NCwgYWtpdGFEQU86IHVpbnQ2NCwgY2FsbGVyOiBieXRlcywgaWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpnYXRlQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdhdGVDaGVjayhnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjYWxsZXI6IEFjY291bnQsIGlkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyAyMiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNAogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM1CiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM2CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18xIC8vIDEKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzcKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMyAvLyAyCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzItMjM5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMyLTIzOQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmFsRmVlKGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVmZXJyYWxGZWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU4MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlZmVycmFsRmVlKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODEKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXQpCiAgICBjYWxsc3ViIHJlZmVycmVyT3JaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODQKICAgIC8vIGlmIChyZWZlcnJlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiByZWZlcnJhbEZlZV9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpyZWZlcnJhbEZlZV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDIyIC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ4NgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg3CiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zTGVuZ3RoKQogICAgaW50YyA4IC8vIDY3MDAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg5CiAgICAvLyBpZiAoYXNzZXQgIT09IDAgJiYgIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcmVmZXJyYWxGZWVfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHJlZmVycmFsRmVlX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0ODcKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDggLy8gNjcwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkwCiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnJlZmVycmFsRmVlX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg4CiAgICAvLyByZXR1cm4gY29zdEluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU8sIGFzc2V0LCAxKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MgogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC0zCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTMKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldCkKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5NgogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDYKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBjb25zdCBbd2FsbGV0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldEZlZXMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTgKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAxCiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMgogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAzCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA4CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOQogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBwdXNoaW50IDYwNDgwMAogICAgKwogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxMAogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMwogICAgaXRvYgogICAgZnJhbWVfZGlnIDYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzYgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDIyIC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIzCiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDQxNzAwCiAgICArCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI0CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfZWxzZV9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjkKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzAKICAgIC8vIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI4LTUzMQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzIKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDdiN2RjNWZjIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NwogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDUtNjEzCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBleHRyYWN0IDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTUKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2RpZyAzCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50X2Vsc2VfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTM4CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGZyYW1lX2RpZyA0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTQKICAgIGZyYW1lX2RpZyAxCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1MwogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyA0CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYyLTU3NAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2NgogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2NS01NjgKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY5CiAgICAvLyB0cmFuc2ZlclR4biwKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTItNTU2CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzAKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGFmMWExNGYyIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDEKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDIwCgpzZW5kUmVmZXJyYWxQYXltZW50X2lmX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOQogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDQKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDUKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0My01NDYKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDcKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgYnl0ZWMgMzUgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYxOAogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IGFtb3VudCwgcmVmZXJyYWxNYnI6IDAgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNwbGl0T3B0SW5Db3VudChha2l0YURBTzogdWludDY0LCBlc2Nyb3c6IGJ5dGVzLCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnNwbGl0T3B0SW5Db3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgZXNjcm93OiBBY2NvdW50LCBhc3NldDogQXNzZXQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMgogICAgLy8gbGV0IGNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjQKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAzCiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyOAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjMxCiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDgwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAzNyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDgzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U2VydmljZToKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDIKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDAtNTEyCiAgICAvLyBuZXdTZXJ2aWNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwYXNzZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHBheW91dEFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIGJhbm5lckltYWdlOiBDSUQsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LAogICAgLy8gICBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4KICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzNgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzY+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxMCAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyBjb25zdCBuZWVkc1NlcnZpY2VzTGlzdEJveE1iciA9ICF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxMwogICAgLy8gY29uc3QgbmVlZHNTZXJ2aWNlc0xpc3RCb3hNYnIgPSAhdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgMTAgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxNAogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld1NlcnZpY2VJRChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTYtMTk4CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICAvLyAgID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUKICAgIC8vICAgOiAxCiAgICBieiBuZXdTZXJ2aWNlX3Rlcm5hcnlfZmFsc2VANDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyA/IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpuZXdTZXJ2aWNlX3Rlcm5hcnlfbWVyZ2VANDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5OQogICAgLy8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUgPSBpZCArIDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGRpZyAyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxNQogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBidXJ5IDI1CiAgICBjb25jYXQKICAgIGJ1cnkgMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTE4CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID49IE1JTl9BTU9VTlQsIEVSUl9NSU5fQU1PVU5UX0lTX1RIUkVFKQogICAgZGlnIDkKICAgIHB1c2hpbnQgNAogICAgPj0KICAgIGJueiBuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNCAvLyAiRVJSOk1BTVQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUFNVAoKbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyBsb2dnZWRBc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBFUlJfTUlOX0lOVEVSVkFMX0lTX1NJWFRZKQogICAgZGlnIDExCiAgICBwdXNoaW50IDYwCiAgICA+PQogICAgYm56IG5ld1NlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE1IC8vICJFUlI6TUlOViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNSU5WCgpuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZXMgPD0gTUFYX1BBU1NFUywgRVJSX01BWF9QQVNTRVNfSVNfRklWRSkKICAgIGRpZyA4CiAgICBwdXNoaW50IDUKICAgIDw9CiAgICBibnogbmV3U2VydmljZV9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6TVhQUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNWFBTCgpuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjMKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyh0aXRsZSkubGVuZ3RoIDw9IE1BWF9USVRMRV9MRU5HVEgsIEVSUl9USVRMRV9UT09fTE9ORykKICAgIGRpZyA1CiAgICBsZW4KICAgIGR1cAogICAgYnVyeSAxNQogICAgcHVzaGludCAxMjgKICAgIDw9CiAgICBibnogbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6VFRMRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpUVExHCgpuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgzCiAgICAvLyBjb25zdCBbc3Vic2NyaXB0aW9uRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1N1YnNjcmlwdGlvbkZlZXMpKQogICAgYnl0ZWMgMjMgLy8gInN1YnNjcmlwdGlvbl9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjgKICAgIC8vIGxldCByZXF1aXJlZEFtb3VudDogdWludDY0ID0gc2VydmljZUNyZWF0aW9uRmVlICsgY29zdHMuc2VydmljZXMKICAgIGludGMgOSAvLyA2MjUwMAogICAgKwogICAgYnVyeSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjkKICAgIC8vIGlmIChuZWVkc1NlcnZpY2VzTGlzdEJveE1icikgewogICAgZGlnIDEKICAgIGJueiBuZXdTZXJ2aWNlX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyByZXF1aXJlZEFtb3VudCArPSBjb3N0cy5zZXJ2aWNlc2xpc3QKICAgIGRpZyAxNQogICAgaW50YyA1IC8vIDE4OTAwCiAgICArCiAgICBidXJ5IDE2CgpuZXdTZXJ2aWNlX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzMgogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMTAKICAgIGJ6IG5ld1NlcnZpY2VfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgRVJSX05PVF9PUFRFRF9JTikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDI0IC8vICJFUlI6Tk9QVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT1BUCgpuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgRVJSX05PVF9PUFRFRF9JTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSksIEVSUl9OT1RfT1BURURfSU4pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDE3CiAgICBieXRlYyAyNCAvLyAiRVJSOk5PUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9QVAoKbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDEKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0LCBzZXJ2aWNlQ3JlYXRpb25GZWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXQsIHNlcnZpY2VDcmVhdGlvbkZlZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTEKICAgIGRpZyAxNgogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxOQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDcgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCm5ld1NlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbE1iciwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxMgogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMTYKICAgIGRpZyAxOAogICAgKwogICAgPT0KICAgIGJueiBuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0Ni01NTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0OAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDgKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDE4CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDYtNTUwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0Ni01NTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NTMtNTY2CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXR1czogU2VydmljZVN0YXR1c0RyYWZ0LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgcGFzc2VzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIHBheW91dEFkZHJlc3MsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBkZXNjcmlwdGlvbjogJycsCiAgICAvLyAgIGJhbm5lckltYWdlLAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlLAogICAgLy8gICBoaWdobGlnaHRDb2xvcgogICAgLy8gfQogICAgZGlnIDExCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU1NAogICAgLy8gc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICBieXRlYyAyNSAvLyAweDBhCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU1My01NjYKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBwYXNzZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgcGF5b3V0QWRkcmVzcywKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJywKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yCiAgICAvLyB9CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMTAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDkKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDcKICAgIGNvbmNhdAogICAgZGlnIDE0CiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZGlnIDcKICAgIGNvbmNhdAogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MDA3NQogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDExNwogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGNvbmNhdAogICAgZGlnIDYKICAgIGNvbmNhdAogICAgZGlnIDUKICAgIGNvbmNhdAogICAgZGlnIDQKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAxMSAvLyAweDAwMDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgZGlnIDIzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTUzLTU2NgogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIHBhc3NlcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBwYXlvdXRBZGRyZXNzLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb246ICcnLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1NgogICAgLy8gbGV0IGFjdGl2YXRlZCA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IChUeG4uZ3JvdXBJbmRleCArIDEpOyBpIDwgR2xvYmFsLmdyb3VwU2l6ZTsgaSArPSAxKSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTkKCm5ld1NlcnZpY2Vfd2hpbGVfdG9wQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IChUeG4uZ3JvdXBJbmRleCArIDEpOyBpIDwgR2xvYmFsLmdyb3VwU2l6ZTsgaSArPSAxKSB7CiAgICBkaWcgMTgKICAgIGdsb2JhbCBHcm91cFNpemUKICAgIDwKICAgIGJ6IG5ld1NlcnZpY2VfYmxvY2tAMzUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyBpZiAodHhuLnR5cGUgIT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwpIHsKICAgIGRpZyAxOAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgIT0KICAgIGJueiBuZXdTZXJ2aWNlX2Jsb2NrQDMzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLCBFUlJfSU5WQUxJRF9TRVFVRU5DRSkKICAgIGRpZyAxOAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IG5ld1NlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDI3CiAgICBieXRlYyAxNiAvLyAiRVJSOklTRVEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVNFUQoKbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCwgRVJSX0lOVkFMSURfU0VRVUVOQ0UpCiAgICBkaWcgMTgKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgYnogbmV3U2VydmljZV9hZnRlcl9hc3NlcnRAMjkKICAgIGJ5dGVjIDE2IC8vICJFUlI6SVNFUSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU0VRCgpuZXdTZXJ2aWNlX2FmdGVyX2Fzc2VydEAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBpZiAodHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuYWN0aXZhdGVTZXJ2aWNlKSkgewogICAgZGlnIDE4CiAgICBpbnRjXzAgLy8gMAogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGR1cAogICAgYnVyeSAyMgogICAgYnl0ZWMgMzMgLy8gbWV0aG9kICJhY3RpdmF0ZVNlcnZpY2UoKXZvaWQiCiAgICA9PQogICAgYnogbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gYWN0aXZhdGVkID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMjAKCm5ld1NlcnZpY2VfYmxvY2tAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFjdGl2YXRlZCwgRVJSX1NFUlZJQ0VfTk9UX0FDVElWQVRFRCkKICAgIGRpZyAxOQogICAgYm56IG5ld1NlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM3CiAgICBwdXNoYnl0ZXMgIkVSUjpTTkFWIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNOQVYKCm5ld1NlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDAtNTEyCiAgICAvLyBuZXdTZXJ2aWNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwYXNzZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHBheW91dEFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIGJhbm5lckltYWdlOiBDSUQsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LAogICAgLy8gICBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4KICAgIC8vICk6IHVpbnQ2NCB7CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIGRpZyAyMwogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1NlcnZpY2VfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDcyCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuc2V0U2VydmljZURlc2NyaXB0aW9uKSwgRVJSX0lOVkFMSURfU0VRVUVOQ0UpCiAgICBkaWcgMjAKICAgIGJ5dGVjIDMyIC8vIG1ldGhvZCAic2V0U2VydmljZURlc2NyaXB0aW9uKHVpbnQ2NCxieXRlW10pdm9pZCIKICAgID09CiAgICBibnogbmV3U2VydmljZV9ibG9ja0AzMwogICAgYnl0ZWMgMTYgLy8gIkVSUjpJU0VRIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklTRVEKCm5ld1NlcnZpY2VfYmxvY2tAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gKFR4bi5ncm91cEluZGV4ICsgMSk7IGkgPCBHbG9iYWwuZ3JvdXBTaXplOyBpICs9IDEpIHsKICAgIGRpZyAxOAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTkKICAgIGIgbmV3U2VydmljZV93aGlsZV90b3BAMjMKCm5ld1NlcnZpY2VfdGVybmFyeV9mYWxzZUA0MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIG5ld1NlcnZpY2VfdGVybmFyeV9tZXJnZUA0MgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2V0U2VydmljZURlc2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0U2VydmljZURlc2NyaXB0aW9uOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3MwogICAgLy8gc2V0U2VydmljZURlc2NyaXB0aW9uKG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLmdyb3VwSW5kZXggPiAwLCBFUlJfR1JPVVBfSU5ERVhfT1VUX09GX0JPVU5EUykKICAgIHR4biBHcm91cEluZGV4CiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpHSU9CIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkdJT0IKCnNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc1CiAgICAvLyBjb25zdCBwcmV2aW91c0NhbGxzOiB1aW50NjQgPSBvZmZzZXQgLyBNQVhfREVTQ1JJUFRJT05fQ0hVTktfU0laRQogICAgZGlnIDEKICAgIHB1c2hpbnQgMjAzNAogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIGNvbnN0IG5ld1NlcnZpY2VUeG5JbmRleDogdWludDY0ID0gVHhuLmdyb3VwSW5kZXggLSAxIC0gcHJldmlvdXNDYWxscwogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODAtNTgxCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJgogICAgLy8gdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIGJ6IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgxCiAgICAvLyB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgZGlnIDMKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgwLTU4MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYKICAgIC8vIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICBieiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBkaWcgMwogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4MC01ODIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmCiAgICAvLyB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLm5ld1NlcnZpY2UpLAogICAgZGlnIDMKICAgIGludGNfMCAvLyAwCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJuZXdTZXJ2aWNlKHBheSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10pdWludDY0IgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgwLTU4MwogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYKICAgIC8vIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLm5ld1NlcnZpY2UpLAogICAgYnogc2V0U2VydmljZURlc2NyaXB0aW9uX2Jvb2xfZmFsc2VAOAogICAgaW50Y18xIC8vIDEKCnNldFNlcnZpY2VEZXNjcmlwdGlvbl9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3OS01ODUKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYKICAgIC8vICAgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vICAgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLm5ld1NlcnZpY2UpLAogICAgLy8gICBFUlJfSU5WQUxJRF9TRVFVRU5DRQogICAgLy8gKQogICAgYm56IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDE2IC8vICJFUlI6SVNFUSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU0VRCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxMCAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg3CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikudmFsdWUgLSAxCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS52YWx1ZSAtIDEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCnNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNEcmFmdCwgRVJSX1NFUlZJQ0VfSVNfTk9UX0RSQUZUKQogICAgZGlnIDQKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDI1IC8vIDB4MGEKICAgID09CiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgMzggLy8gIkVSUjpTTkRSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNORFIKCnNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KG9mZnNldCArIGRhdGEubGVuZ3RoIDw9IE1BWF9ERVNDUklQVElPTl9MRU5HVEgsIEVSUl9CQURfREVTQ1JJUFRJT05fTEVOR1RIKQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAyCiAgICArCiAgICBwdXNoaW50IDMxNTEKICAgIDw9CiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxNwogICAgcHVzaGJ5dGVzICJFUlI6QkRMTiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCRExOCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIGxldCBkZXNjQnl0ZXMgPSBCeXRlcyh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuZGVzY3JpcHRpb24pCiAgICBkaWcgNAogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGR1cDIKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk2CiAgICAvLyBsb2dnZWRBc3NlcnQob2Zmc2V0IDw9IGRlc2NCeXRlcy5sZW5ndGgsIEVSUl9CQURfT0ZGU0VUKQogICAgbGVuCiAgICBkdXAKICAgIGJ1cnkgNAogICAgZGlnIDIKICAgID49CiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxOQogICAgcHVzaGJ5dGVzICJFUlI6Qk9GUyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCT0ZTCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIGlmIChvZmZzZXQgPCBkZXNjQnl0ZXMubGVuZ3RoKSB7CiAgICBkaWcgMQogICAgZGlnIDMKICAgIDwKICAgIGJ6IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gZGVzY0J5dGVzID0gZGVzY0J5dGVzLnNsaWNlKDAsIG9mZnNldCkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDMKICAgIGR1cAogICAgZGlnIDMKICAgID49CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgNwogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgYnVyeSA2CgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjAyCiAgICAvLyB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuZGVzY3JpcHRpb24gPSBTdHJpbmcoZGVzY0J5dGVzLmNvbmNhdChkYXRhKSkKICAgIGRpZyA1CiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZGlnIDEKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgcHVzaGludCA3NQogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NzMKICAgIC8vIHNldFNlcnZpY2VEZXNjcmlwdGlvbihvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldFNlcnZpY2VEZXNjcmlwdGlvbl9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5hY3RpdmF0ZVNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgphY3RpdmF0ZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDEwIC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS52YWx1ZSAtIDEKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwOQogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLnZhbHVlIC0gMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMQogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGFjdGl2YXRlU2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOlNETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0RORQoKYWN0aXZhdGVTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzRHJhZnQsIEVSUl9TRVJWSUNFX0lTX05PVF9EUkFGVCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWMgMjUgLy8gMHgwYQogICAgPT0KICAgIGJueiBhY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDM4IC8vICJFUlI6U05EUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTTkRSCgphY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNBY3RpdmUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDE3IC8vIDB4MTQKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwOAogICAgLy8gYWN0aXZhdGVTZXJ2aWNlKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMucGF1c2VTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKcGF1c2VTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIHBhdXNlU2VydmljZShpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyNwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOlNETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0RORQoKcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzQWN0aXZlLCBFUlJfU0VSVklDRV9JU19OT1RfQUNUSVZFKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxNyAvLyAweDE0CiAgICA9PQogICAgYm56IHBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjYgLy8gIkVSUjpTTkFDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNOQUMKCnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjMzCiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c1BhdXNlZAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzIDB4MWUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gcGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVucGF1c2VTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5wYXVzZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0MQogICAgLy8gdW5wYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDIKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOlNETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0RORQoKdW5wYXVzZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNQYXVzZWQsIEVSUl9TRVJWSUNFX0lTX05PVF9QQVVTRUQpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHB1c2hieXRlcyAweDFlCiAgICA9PQogICAgYm56IHVucGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpTTlBBIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNOUEEKCnVucGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPSBTZXJ2aWNlU3RhdHVzQWN0aXZlCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxNyAvLyAweDE0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIHVucGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNodXRkb3duU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNodXRkb3duU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU3CiAgICAvLyBzaHV0ZG93blNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NTgKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzaHV0ZG93blNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCnNodXRkb3duU2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyAhPT0gU2VydmljZVN0YXR1c1NodXRkb3duLCBFUlJfU0VSVklDRV9JU19TSFVURE9XTikKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWMgMTggLy8gMHgyOAogICAgIT0KICAgIGJueiBzaHV0ZG93blNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDM5IC8vICJFUlI6U1NIRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTU0hECgpzaHV0ZG93blNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTggLy8gMHgyOAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU3CiAgICAvLyBzaHV0ZG93blNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgpibG9jazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzQKICAgIC8vIGNvbnN0IGJveEtleSA9IHRoaXMuZ2V0QmxvY2tLZXkoVHhuLnNlbmRlciwgYmxvY2tlZCkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDkgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5ibG9ja3MoYm94S2V5KS5leGlzdHMsIEVSUl9VU0VSX0FMUkVBRFlfQkxPQ0tFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYmxvY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOlVBQkwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VUFCTAoKYmxvY2tfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBibG9ja19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKYmxvY2tfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBjb3N0cy5ibG9ja3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBwdXNoaW50IDE1NzAwCiAgICA9PQogICAgYm56IGJsb2NrX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpibG9ja19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyB0aGlzLmJsb2Nrcyhib3hLZXkpLmNyZWF0ZSgpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgp1bmJsb2NrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTAKICAgIC8vIHVuYmxvY2soYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGNvbnN0IGJveEtleSA9IHRoaXMuZ2V0QmxvY2tLZXkoVHhuLnNlbmRlciwgYmxvY2tlZCkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDkgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJsb2Nrcyhib3hLZXkpLmV4aXN0cywgRVJSX1VTRVJfTk9UX0JMT0NLRUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bmJsb2NrX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpVTkJMIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlVOQkwKCnVuYmxvY2tfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5NgogICAgLy8gdGhpcy5ibG9ja3MoYm94S2V5KS5kZWxldGUoKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzAwLTcwMwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogY29zdHMuYmxvY2tzCiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDEKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDIKICAgIC8vIGFtb3VudDogY29zdHMuYmxvY2tzCiAgICBwdXNoaW50IDE1NzAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDAtNzAzCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBjb3N0cy5ibG9ja3MKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTAKICAgIC8vIHVuYmxvY2soYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRTdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFN1YnNjcmliZToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwNi03MTMKICAgIC8vIGdhdGVkU3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzE1CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID49IE1JTl9BTU9VTlQsIEVSUl9NSU5fQU1PVU5UX0lTX1RIUkVFKQogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IGdhdGVkU3Vic2NyaWJlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxNCAvLyAiRVJSOk1BTVQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUFNVAoKZ2F0ZWRTdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgRVJSX01JTl9JTlRFUlZBTF9JU19TSVhUWSkKICAgIGRpZyAxCiAgICBwdXNoaW50IDYwCiAgICA+PQogICAgYm56IGdhdGVkU3Vic2NyaWJlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxNSAvLyAiRVJSOk1JTlYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUlOVgoKZ2F0ZWRTdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2VJRCAhPT0gMCwgRVJSX05PVF9BX1NFUlZJQ0UpCiAgICBkdXAKICAgIGJueiBnYXRlZFN1YnNjcmliZV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMjcgLy8gIkVSUjpOU1ZDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5TVkMKCmdhdGVkU3Vic2NyaWJlX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MjAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzIwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2F0ZWRTdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCmdhdGVkU3Vic2NyaWJlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MjEKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBkaWcgNgogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyMwogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyMwogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI0CiAgICAvLyBjb25zdCBvcmlnaW4gPSBvcmlnaW5PclR4blNlbmRlcih3YWxsZXQpCiAgICBjYWxsc3ViIG9yaWdpbk9yVHhuU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA3CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZFN1YnNjcmliZV9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDI4IC8vICJFUlI6RkdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpGR1RFCgpnYXRlZFN1YnNjcmliZV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gcmV0dXJuIHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKHBheW1lbnQsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlEKQogICAgZGlnIDUKICAgIGRpZyA0CiAgICBkaWcgNAogICAgZGlnIDQKICAgIGRpZyA0CiAgICBjYWxsc3ViIGNyZWF0ZVN1YnNjcmlwdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDYtNzEzCiAgICAvLyBnYXRlZFN1YnNjcmliZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Vic2NyaWJlOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzMwLTczNgogICAgLy8gc3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFtb3VudCA+PSBNSU5fQU1PVU5ULCBFUlJfTUlOX0FNT1VOVF9JU19USFJFRSkKICAgIHB1c2hpbnQgNAogICAgPj0KICAgIGJueiBzdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE0IC8vICJFUlI6TUFNVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQU1UCgpzdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgRVJSX01JTl9JTlRFUlZBTF9JU19TSVhUWSkKICAgIGRpZyAxCiAgICBwdXNoaW50IDYwCiAgICA+PQogICAgYm56IHN1YnNjcmliZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTUgLy8gIkVSUjpNSU5WIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1JTlYKCnN1YnNjcmliZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyBpZiAoc2VydmljZUlEICE9PSAwKSB7CiAgICBkdXAKICAgIGJ6IHN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCnN1YnNjcmliZV9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ0CiAgICAvLyBjb25zdCBnYXRlSUQgPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLmdhdGVJRAogICAgZGlnIDUKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlSUQgPT09IDAsIEVSUl9IQVNfR0FURSkKICAgIGJ6IHN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDExCiAgICBieXRlYyA0MCAvLyAiRVJSOkhHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEdURQoKc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0OAogICAgLy8gcmV0dXJuIHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKHBheW1lbnQsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlEKQogICAgZGlnIDQKICAgIGRpZyA0CiAgICBkaWcgNAogICAgZGlnIDQKICAgIGRpZyA0CiAgICBjYWxsc3ViIGNyZWF0ZVN1YnNjcmlwdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MzAtNzM2CiAgICAvLyBzdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRTdWJzY3JpYmVBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFN1YnNjcmliZUFzYToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1MS03NTkKICAgIC8vIGdhdGVkU3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjEKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPj0gTUlOX0FNT1VOVCwgRVJSX01JTl9BTU9VTlRfSVNfVEhSRUUpCiAgICBwdXNoaW50IDQKICAgID49CiAgICBibnogZ2F0ZWRTdWJzY3JpYmVBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE0IC8vICJFUlI6TUFNVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNQU1UCgpnYXRlZFN1YnNjcmliZUFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzYzCiAgICAvLyBsb2dnZWRBc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBFUlJfTUlOX0lOVEVSVkFMX0lTX1NJWFRZKQogICAgZGlnIDEKICAgIHB1c2hpbnQgNjAKICAgID49CiAgICBibnogZ2F0ZWRTdWJzY3JpYmVBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE1IC8vICJFUlI6TUlOViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpNSU5WCgpnYXRlZFN1YnNjcmliZUFzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY1CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZUlEICE9PSAwLCBFUlJfTk9UX0FfU0VSVklDRSkKICAgIGR1cAogICAgYm56IGdhdGVkU3Vic2NyaWJlQXNhX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyNyAvLyAiRVJSOk5TVkMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlNWQwoKZ2F0ZWRTdWJzY3JpYmVBc2FfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnYXRlZFN1YnNjcmliZUFzYV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgNCAvLyAiRVJSOlNETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0RORQoKZ2F0ZWRTdWJzY3JpYmVBc2FfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NwogICAgLy8gY29uc3QgZ2F0ZUlEID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5nYXRlSUQKICAgIGRpZyA3CiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY5CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY5CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzAKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzcxCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDcKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGdhdGVkU3Vic2NyaWJlQXNhX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjggLy8gIkVSUjpGR1RFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZHVEUKCmdhdGVkU3Vic2NyaWJlQXNhX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzczLTc4MAogICAgLy8gcmV0dXJuIHRoaXMuY3JlYXRlQXNhU3Vic2NyaXB0aW9uKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHJlY2lwaWVudCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgc2VydmljZUlECiAgICAvLyApCiAgICBkaWcgNgogICAgZGlnIDYKICAgIGRpZyA1CiAgICBkaWcgNQogICAgZGlnIDUKICAgIGRpZyA1CiAgICBjYWxsc3ViIGNyZWF0ZUFzYVN1YnNjcmlwdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTEtNzU5CiAgICAvLyBnYXRlZFN1YnNjcmliZUFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN1YnNjcmliZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN1YnNjcmliZUFzYToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4My03OTAKICAgIC8vIHN1YnNjcmliZUFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzkyCiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID49IE1JTl9BTU9VTlQsIEVSUl9NSU5fQU1PVU5UX0lTX1RIUkVFKQogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IHN1YnNjcmliZUFzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTQgLy8gIkVSUjpNQU1UIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1BTVQKCnN1YnNjcmliZUFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyBsb2dnZWRBc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBFUlJfTUlOX0lOVEVSVkFMX0lTX1NJWFRZKQogICAgZGlnIDEKICAgIHB1c2hpbnQgNjAKICAgID49CiAgICBibnogc3Vic2NyaWJlQXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxNSAvLyAiRVJSOk1JTlYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUlOVgoKc3Vic2NyaWJlQXNhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3OTYKICAgIC8vIGlmIChzZXJ2aWNlSUQgIT09IDApIHsKICAgIGR1cAogICAgYnogc3Vic2NyaWJlQXNhX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgNAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN1YnNjcmliZUFzYV9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgNCAvLyAiRVJSOlNETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U0RORQoKc3Vic2NyaWJlQXNhX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBkaWcgNgogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVJRCA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgYnogc3Vic2NyaWJlQXNhX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGJ5dGVjIDQwIC8vICJFUlI6SEdURSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpIR1RFCgpzdWJzY3JpYmVBc2FfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODAyLTgwOQogICAgLy8gcmV0dXJuIHRoaXMuY3JlYXRlQXNhU3Vic2NyaXB0aW9uKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHJlY2lwaWVudCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgc2VydmljZUlECiAgICAvLyApCiAgICBkaWcgNQogICAgZGlnIDUKICAgIGRpZyA1CiAgICBkaWcgNQogICAgZGlnIDUKICAgIGRpZyA1CiAgICBjYWxsc3ViIGNyZWF0ZUFzYVN1YnNjcmlwdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODMtNzkwCiAgICAvLyBzdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmRlcG9zaXRbcm91dGluZ10oKSAtPiB2b2lkOgpkZXBvc2l0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGRlcG9zaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIGNvbnN0IHN1YktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgRVJSX1NVQlNDUklQVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDctMTA5CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA4IC8vICJFUlI6VURORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpVRE5FCgpkZXBvc2l0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTcKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTkKICAgIC8vIGxvZ2dlZEFzc2VydChzdWIuYXNzZXQgPT09IDAsIEVSUl9BU0FfTUlTTUFUQ0gpCiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnogZGVwb3NpdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjAgLy8gIkVSUjpBU0FNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFTQU0KCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA3IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpkZXBvc2l0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlLmVzY3Jvd2VkICs9IHBheW1lbnQuYW1vdW50CiAgICBkdXBuIDIKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIGd0eG5zIEFtb3VudAogICAgKwogICAgaXRvYgogICAgcHVzaGludCA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBkZXBvc2l0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5kZXBvc2l0QXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVwb3NpdEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI2CiAgICAvLyBkZXBvc2l0QXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI3CiAgICAvLyBjb25zdCBzdWJLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNy0xMDkKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgRVJSX1NVQlNDUklQVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpVRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlVETkUKCmRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzMQogICAgLy8gY29uc3QgeyBhc3NldCB9ID0gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0ID09PSBhc3NldFhmZXIueGZlckFzc2V0LmlkLCBFUlJfQVNBX01JU01BVENIKQogICAgZGlnIDIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgPT0KICAgIGJueiBkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyMCAvLyAiRVJSOkFTQU0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QVNBTQoKZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM1CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9BU1NFVF9SRUNFSVZFUikKICAgIGRpZyAxCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjpJQVJFIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklBUkUKCmRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUuZXNjcm93ZWQgKz0gYXNzZXRYZmVyLmFzc2V0QW1vdW50CiAgICBkdXBuIDIKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDk2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGRlcG9zaXRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMud2l0aGRyYXdbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhdzoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0MAogICAgLy8gd2l0aGRyYXcoaWQ6IFN1YnNjcmlwdGlvbklELCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDEKICAgIC8vIGNvbnN0IHN1YktleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3LTEwOQogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBFUlJfU1VCU0NSSVBUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpVRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlVETkUKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDUKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoc3ViLmVzY3Jvd2VkID49IGFtb3VudCwgRVJSX05PVF9FTk9VR0hfRlVORFMpCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDIKICAgID49CiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOk5FRk4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVGTgoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0OQogICAgLy8gaWYgKHN1Yi5hc3NldCAhPT0gMCkgewogICAgZGlnIDMKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNAogICAgYnogd2l0aGRyYXdfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODUwLTg1NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODUwLTg1NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTAtODU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZS5lc2Nyb3dlZCAtPSBhbW91bnQKICAgIGR1cG4gMgogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgLQogICAgaXRvYgogICAgcHVzaGludCA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQwCiAgICAvLyB3aXRoZHJhdyhpZDogU3Vic2NyaXB0aW9uSUQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp3aXRoZHJhd19lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU4LTg2MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2MAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU4LTg2MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU4LTg2MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVuc3Vic2NyaWJlOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gdW5zdWJzY3JpYmUoaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3MAogICAgLy8gY29uc3Qgc3ViS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDctMTA5CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bnN1YnNjcmliZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgOCAvLyAiRVJSOlVETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VURORQoKdW5zdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3NAogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA4CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGxldCBtYnJSZWZ1bmQ6IHVpbnQ2NCA9IGNvc3RzLnN1YnNjcmlwdGlvbnMKICAgIGludGMgNiAvLyA2MDUwMAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3OAogICAgLy8gaWYgKHN1Yi5zZXJ2aWNlSUQgPiAwKSB7CiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDMKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzkKICAgIC8vIGNvbnN0IHsgcGFzc2VzIH0gPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogc3ViLnJlY2lwaWVudCwgaWQ6IHN1Yi5zZXJ2aWNlSUQgfSkudmFsdWUKICAgIGRpZyA1CiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAyCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgOQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBjb25zdCB7IHBhc3NlcyB9ID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHN1Yi5yZWNpcGllbnQsIGlkOiBzdWIuc2VydmljZUlEIH0pLnZhbHVlCiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgwCiAgICAvLyBpZiAocGFzc2VzID4gMCAmJiB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmV4aXN0cykgewogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA4CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMjEgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgwCiAgICAvLyBpZiAocGFzc2VzID4gMCAmJiB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgxCiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmRlbGV0ZSgpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMjEgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgxCiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBtYnJSZWZ1bmQgKz0gY29zdHMucGFzc2VzCiAgICBpbnRjIDcgLy8gNDc5NDAwCiAgICBidXJ5IDUKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODg2CiAgICAvLyBpZiAoc3ViLmFzc2V0ICE9PSAwKSB7CiAgICBkaWcgNQogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA1CiAgICBieiB1bnN1YnNjcmliZV9lbHNlX2JvZHlAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODg3CiAgICAvLyBpZiAoc3ViLmVzY3Jvd2VkID4gMCkgewogICAgZGlnIDUKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNAogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODgtODk0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5MAogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgNAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODgtODkzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4OC04OTQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4OTctOTAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IG1iclJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4OTctOTAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IG1iclJlZnVuZAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4OTctOTAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IG1iclJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTIKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmRlbGV0ZSgpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NjkKICAgIC8vIHVuc3Vic2NyaWJlKGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKdW5zdWJzY3JpYmVfZWxzZV9ib2R5QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDQtOTA5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZCArIG1iclJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA2CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyBhbW91bnQ6IHN1Yi5lc2Nyb3dlZCArIG1iclJlZnVuZAogICAgZGlnIDYKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNgogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA0LTkwOAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQgKyBtYnJSZWZ1bmQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA0LTkwOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQgKyBtYnJSZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nYXRlZFRyaWdnZXJQYXltZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRUcmlnZ2VyUGF5bWVudDoKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTE1CiAgICAvLyBnYXRlZFRyaWdnZXJQYXltZW50KGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNy0xMDkKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgRVJSX1NVQlNDUklQVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpVRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlVETkUKCmdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxOQogICAgLy8gY29uc3QgeyBzZXJ2aWNlSUQsIHJlY2lwaWVudCB9ID0gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA2CiAgICBleHRyYWN0IDAgMzIKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjEKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlSUQgIT09IDAsIEVSUl9OT1RfQV9TRVJWSUNFKQogICAgYm56IGdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDI3IC8vICJFUlI6TlNWQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOU1ZDCgpnYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkaWcgMwogICAgaXRvYgogICAgZGlnIDUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA0IC8vICJFUlI6U0RORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTRE5FCgpnYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjMKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBkaWcgNQogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI2CiAgICAvLyBjb25zdCBvcmlnaW4gPSBvcmlnaW5PclR4blNlbmRlcih3YWxsZXQpCiAgICBjYWxsc3ViIG9yaWdpbk9yVHhuU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA1CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBnYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyOCAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRUcmlnZ2VyUGF5bWVudF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyB0aGlzLnRyaWdnZXJQYXltZW50KGtleSkKICAgIGRpZyAxCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTUKICAgIC8vIGdhdGVkVHJpZ2dlclBheW1lbnQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnRyaWdnZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MzIKICAgIC8vIHRyaWdnZXJQYXltZW50KGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50CiAgICBwb3AKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN0cmVha0NoZWNrW3JvdXRpbmddKCkgLT4gdm9pZDoKc3RyZWFrQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTgKICAgIC8vIHN0cmVha0NoZWNrKGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDE5CiAgICAvLyB0aGlzLnVwZGF0ZVN0cmVhayhrZXksIDApCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiB1cGRhdGVTdHJlYWsKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDE4CiAgICAvLyBzdHJlYWtDaGVjayhrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2V0UGFzc2VzW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UGFzc2VzOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjIKICAgIC8vIHNldFBhc3NlcyhpZDogU3Vic2NyaXB0aW9uSUQsIGFkZHJlc3NlczogQWNjb3VudFtdKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCAzMgogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFjY291bnQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjMKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbnNLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3LTEwOQogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25zS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDggLy8gIkVSUjpVRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlVETkUKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNwogICAgLy8gY29uc3QgeyBzZXJ2aWNlSUQsIHJlY2lwaWVudCB9ID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbnNLZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGV4dHJhY3QgMCAzMgogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjkKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlSUQgPiAwLCBFUlJfTk9fRE9OQVRJT05TKQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6Tk9ETiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT0ROCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzEKICAgIC8vIGNvbnN0IHNlcnZpY2VLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgZGlnIDQKICAgIGl0b2IKICAgIGRpZyA4CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNQogICAgLy8gY29uc3QgeyBzdGF0dXMsIHBhc3NlcyB9ID0gdGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS52YWx1ZQogICAgZGlnIDgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgc3dhcAogICAgcHVzaGludCAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXR1cyAhPT0gU2VydmljZVN0YXR1c1NodXRkb3duLCBFUlJfU0VSVklDRV9JU19TSFVURE9XTikKICAgIGJ5dGVjIDE4IC8vIDB4MjgKICAgICE9CiAgICBibnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAzOSAvLyAiRVJSOlNTSEQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U1NIRAoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM4CiAgICAvLyBsb2dnZWRBc3NlcnQocGFzc2VzID49IGFkZHJlc3Nlcy5sZW5ndGgsIEVSUl9QQVNTX0NPVU5UX09WRVJGTE9XKQogICAgZGlnIDUKICAgIGRpZyAzCiAgICA+PQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOlBDT0YiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UENPRgoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNwoKc2V0UGFzc2VzX3doaWxlX3RvcEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDYKICAgIGRpZyAzCiAgICA8CiAgICBieiBzZXRQYXNzZXNfYWZ0ZXJfd2hpbGVAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwgYWRkcmVzc2VzW2ldKSkuZXhpc3RzLCBFUlJfQkxPQ0tFRCkKICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDcKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZGlnIDgKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDkgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwgYWRkcmVzc2VzW2ldKSkuZXhpc3RzLCBFUlJfQkxPQ0tFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgMjkgLy8gIkVSUjpCTEtEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJMS0QKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyA2CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA3CiAgICBiIHNldFBhc3Nlc193aGlsZV90b3BAMTIKCnNldFBhc3Nlc19hZnRlcl93aGlsZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0NAogICAgLy8gdGhpcy5wYXNzZXMoeyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9KS52YWx1ZSA9IGNsb25lKGFkZHJlc3NlcykKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBwYXNzZXMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBBY2NvdW50W10+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UGFzc2VzIH0pCiAgICBieXRlYyAyMSAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ0CiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0pLnZhbHVlID0gY2xvbmUoYWRkcmVzc2VzKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGRpZyA0CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjIKICAgIC8vIHNldFBhc3NlcyhpZDogU3Vic2NyaXB0aW9uSUQsIGFkZHJlc3NlczogQWNjb3VudFtdKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnRyaWdnZXJMaXN0OgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgc3dhcAogICAgZHVwCiAgICBsZW4KICAgIHN3YXAKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzAgLy8gMAoKdHJpZ2dlckxpc3RfZm9yX2hlYWRlckAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGR1cAogICAgZGlnIDUKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX2ZvckA0CiAgICBkdXBuIDIKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgMwogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGVuY29kaW5nCiAgICBkdXAKICAgIGRpZyA3CiAgICBkdXAKICAgIGNvdmVyIDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgZm9yIChsZW4rKHVpbnQ4WzMyXSwobGVuK3VpbnQ2NFtdKSlbXSkKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50OFszMl0sKGxlbit1aW50NjRbXSkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHB1c2hpbnQgMzYKICAgICsKICAgICsKICAgIGJ1cnkgNQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQogICAgYiB0cmlnZ2VyTGlzdF9mb3JfaGVhZGVyQDEKCnRyaWdnZXJMaXN0X2FmdGVyX2ZvckA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGRpZyAzCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6VHJpZ2dlckxpc3RSZXF1ZXN0PgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUxCiAgICAvLyBjb25zdCByZXN1bHRzOiBib29sZWFuW10gPSBbXQogICAgYnl0ZWMgMTEgLy8gMHgwMDAwCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZXEubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDEyCgp0cmlnZ2VyTGlzdF93aGlsZV90b3BANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlcS5sZW5ndGg7IGkgKz0gMSkgewogICAgZGlnIDExCiAgICBkaWcgNQogICAgPAogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDExCgp0cmlnZ2VyTGlzdF93aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIGRpZyA1CiAgICBkaWcgMTIKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGRpZyAxMQogICAgPgogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1My0xMDU0CiAgICAvLyBmb3IgKGxldCBqOiB1aW50NjQgPSAwOyBqIDwgcmVxW2ldLmlkcy5sZW5ndGg7IGogKz0gMSkgewogICAgLy8gICBjb25zdCBrZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogcmVxW2ldLmFkZHJlc3MsIGlkOiByZXFbaV0uaWRzW2pdIH0KICAgIGRpZyA1CiAgICBkdXAKICAgIGRpZyAxMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjYWxsc3ViIGR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMTIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTQKICAgIC8vIGNvbnN0IGtleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiByZXFbaV0uYWRkcmVzcywgaWQ6IHJlcVtpXS5pZHNbal0gfQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTUKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNhblRyaWdnZXIoa2V5KSkKICAgIGNhbGxzdWIgY2FuVHJpZ2dlcgogICAgcG9wCiAgICBieXRlYyAxMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ1cnkgMTcKICAgIGRpZyAxNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgYnVyeSAxNgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTUKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNhblRyaWdnZXIoa2V5KSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIHJlcGxhY2UyIDAKICAgIGJ1cnkgMTgKICAgIHN3YXAKICAgIHB1c2hpbnQgNwogICAgKwogICAgaW50Y18yIC8vIDgKICAgIC8KICAgIGR1cAogICAgYnVyeSAxNQogICAgc3dhcAogICAgcHVzaGludCA3CiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgLwogICAgZHVwCiAgICBidXJ5IDExCiAgICA8CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl9pZl9lbHNlQDE0CiAgICBkaWcgOAogICAgZGlnIDEzCiAgICAtCiAgICBiemVybwogICAgZGlnIDE2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMTYKCnRyaWdnZXJMaXN0X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMAogICAgZGlnIDEzCiAgICBwdXNoaW50IDE2CiAgICArCiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDU1CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jYW5UcmlnZ2VyKGtleSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA4Cgp0cmlnZ2VyTGlzdF93aGlsZV90b3BAMTU6CiAgICBkaWcgNgogICAgZGlnIDgKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDE3CiAgICBkaWcgMTYKICAgIGRpZyAxMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBnZXRiaXQKICAgIGRpZyAxNwogICAgZGlnIDkKICAgIGR1cAogICAgY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ1cnkgMTgKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1NQogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTAKICAgIGIgdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDE1Cgp0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIGRpZyAxMAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTEKICAgIGRpZyAxNQogICAgYnVyeSAxNQogICAgYiB0cmlnZ2VyTGlzdF93aGlsZV90b3BAOAoKdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZXEubGVuZ3RoOyBpICs9IDEpIHsKICAgIGRpZyAxMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTIKICAgIGIgdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDYKCnRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgZGlnIDE1CiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaXNCbG9ja2VkW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNCbG9ja2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2OAogICAgLy8gcmV0dXJuIHRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkoYWRkcmVzcywgYmxvY2tlZCkpLmV4aXN0cwogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgOSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY4CiAgICAvLyByZXR1cm4gdGhpcy5ibG9ja3ModGhpcy5nZXRCbG9ja0tleShhZGRyZXNzLCBibG9ja2VkKSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyAxMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmlzU2h1dGRvd25bcm91dGluZ10oKSAtPiB2b2lkOgppc1NodXRkb3duOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3NwogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLmV4aXN0cyAmJgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3Ny0xMDc4CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGJ6IGlzU2h1dGRvd25fYm9vbF9mYWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzgKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxOCAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3LTEwNzgKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS5leGlzdHMgJiYKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYnogaXNTaHV0ZG93bl9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgppc1NodXRkb3duX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyAxMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmlzU2h1dGRvd25fYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNTaHV0ZG93bl9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1NlcnZpY2VDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U2VydmljZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg0CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg0CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAyMyAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODQKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4NwogICAgLy8gbGV0IHJlcXVpcmVkQW1vdW50OiB1aW50NjQgPSBzZXJ2aWNlQ3JlYXRpb25GZWUgKyBjb3N0cy5zZXJ2aWNlcwogICAgaW50YyA5IC8vIDYyNTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDEwIC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg4CiAgICAvLyBpZiAoIXRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4OAogICAgLy8gaWYgKCF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld1NlcnZpY2VDb3N0X2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg5CiAgICAvLyByZXF1aXJlZEFtb3VudCArPSBjb3N0cy5zZXJ2aWNlc2xpc3QKICAgIGludGMgNSAvLyAxODkwMAogICAgKwoKbmV3U2VydmljZUNvc3RfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDkyCiAgICAvLyBjb25zdCByZWZlcnJhbENvc3QgPSByZWZlcnJhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5MgogICAgLy8gY29uc3QgcmVmZXJyYWxDb3N0ID0gcmVmZXJyYWxGZWUodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDIKICAgIGNhbGxzdWIgcmVmZXJyYWxGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5NAogICAgLy8gcmV0dXJuIHJlcXVpcmVkQW1vdW50ICsgcmVmZXJyYWxDb3N0CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubmV3U3Vic2NyaXB0aW9uQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1N1YnNjcmlwdGlvbkNvc3Q6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA0CiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA2IC8vIDYwNTAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDcKICAgIC8vIGlmICghaXNEb25hdGlvbikgewogICAgYnogbmV3U3Vic2NyaXB0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOAogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgNAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld1N1YnNjcmlwdGlvbkNvc3RfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCm5ld1N1YnNjcmlwdGlvbkNvc3RfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTQKICAgIC8vIGlmIChzZXJ2aWNlLnBhc3NlcyA+IDApIHsKICAgIGRpZyA0CiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ6IG5ld1N1YnNjcmlwdGlvbkNvc3RfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTUKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5wYXNzZXMKICAgIGludGMgNyAvLyA0Nzk0MDAKICAgIGJ1cnkgMQoKbmV3U3Vic2NyaXB0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxMyAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTExOQogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTkKICAgIC8vIGlmICghdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld1N1YnNjcmlwdGlvbkNvc3RfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjAKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5zdWJzY3JpcHRpb25zbGlzdAogICAgZHVwCiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIGJ1cnkgMQoKbmV3U3Vic2NyaXB0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjMKICAgIC8vIGNvbnN0IHJlZmVycmFsQ29zdCA9IHJlZmVycmFsRmVlKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIzCiAgICAvLyBjb25zdCByZWZlcnJhbENvc3QgPSByZWZlcnJhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgY2FsbHN1YiByZWZlcnJhbEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTI4CiAgICAvLyByZXR1cm4gbWJyQW1vdW50ICsgcmVmZXJyYWxDb3N0CiAgICBkaWcgMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTM2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzOAogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzcywgaWQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTM5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6U0RORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTRE5FCgpnZXRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQwCiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U2VydmljZXNCeUFkZHJlc3Nbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTZXJ2aWNlc0J5QWRkcmVzczoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ1CiAgICAvLyBjb25zdCBzZXJ2aWNlczogU2VydmljZVtdID0gW10KICAgIGJ5dGVjIDExIC8vIDB4MDAwMAogICAgc3dhcAoKZ2V0U2VydmljZXNCeUFkZHJlc3Nfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IHN0YXJ0OyBpIDwgc3RhcnQgKyB3aW5kb3dTaXplOyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMwogICAgKwogICAgZGlnIDEKICAgID4KICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2Jsb2NrQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0NwogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzcywgaWQ6IGkgfQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgNQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ4CiAgICAvLyBpZiAodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDkKICAgIC8vIHNlcnZpY2VzLnB1c2godGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlKQogICAgZGlnIDEwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGJ5dGVzIDB4MDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDEwCiAgICBkaWcgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ5CiAgICAvLyBzZXJ2aWNlcy5wdXNoKHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgYnVyeSAxMQogICAgc3dhcAogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgMTMKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBidXJ5IDgKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDYKCmdldFNlcnZpY2VzQnlBZGRyZXNzX2Zvcl9oZWFkZXJAMTA6CiAgICBkaWcgNQogICAgZGlnIDgKICAgIDwKICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2FmdGVyX2ZvckAxMgogICAgZGlnIDExCiAgICBkaWcgNgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICBkaWcgMTAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAxMAogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGJ1cnkgNgogICAgYiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEwCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTI6CiAgICBkaWcgMTEKICAgIGxlbgogICAgYnVyeSA3CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA2CgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEzOgogICAgZGlnIDUKICAgIGludGNfMyAvLyAyCiAgICA8CiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTUKICAgIGRpZyA5CiAgICBkaWcgNgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDgKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICBkaWcgMTAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAxMAogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGJ1cnkgNgogICAgYiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEzCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTU6CiAgICBkaWcgMTEKICAgIGRpZyA4CiAgICBkaWcgOAogICAgc3Vic3RyaW5nMwogICAgZGlnIDkKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEwCiAgICBleHRyYWN0IDIgMAogICAgY29uY2F0CiAgICBidXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0NgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gc3RhcnQ7IGkgPCBzdGFydCArIHdpbmRvd1NpemU7IGkgKz0gMSkgewogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGdldFNlcnZpY2VzQnlBZGRyZXNzX3doaWxlX3RvcEAyCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgZGlnIDIKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3LTEwOQogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1OQogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2MC0xMTcyCiAgICAvLyByZXR1cm4gewogICAgLy8gICBleGlzdHM6IGZhbHNlLAogICAgLy8gICByZWNpcGllbnQ6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc2VydmljZUlEOiAwLAogICAgLy8gICBzdGFydERhdGU6IDAsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgaW50ZXJ2YWw6IDAsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gICBnYXRlSUQ6IDAsCiAgICAvLyAgIGxhc3RQYXltZW50OiAwLAogICAgLy8gICBzdHJlYWs6IDAsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gfQogICAgcHVzaGJ5dGVzIGJhc2UzMihBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEpCgpnZXRTdWJzY3JpcHRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbkA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzcKICAgIC8vIC4uLnRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIGRpZyAyCiAgICBleHRyYWN0IDQwIDgKICAgIGRpZyAzCiAgICBleHRyYWN0IDQ4IDgKICAgIGRpZyA0CiAgICBleHRyYWN0IDU2IDgKICAgIGRpZyA1CiAgICBleHRyYWN0IDY0IDgKICAgIGRpZyA2CiAgICBleHRyYWN0IDcyIDgKICAgIGRpZyA3CiAgICBleHRyYWN0IDgwIDgKICAgIGRpZyA4CiAgICBleHRyYWN0IDg4IDgKICAgIHVuY292ZXIgOQogICAgZXh0cmFjdCA5NiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzUtMTE3OAogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZXhpc3RzOiB0cnVlLAogICAgLy8gICAuLi50aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSwKICAgIC8vIH0KICAgIHB1c2hieXRlcyAweDgwCiAgICB1bmNvdmVyIDEwCiAgICBjb25jYXQKICAgIHVuY292ZXIgOQogICAgY29uY2F0CiAgICB1bmNvdmVyIDgKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBnZXRTdWJzY3JpcHRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbkA0CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5tdXN0R2V0U3Vic2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldFN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDctMTA5CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTgzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBFUlJfU1VCU0NSSVBUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldFN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgOCAvLyAiRVJSOlVETkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6VURORQoKbXVzdEdldFN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4NAogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsczoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDExCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3LTEwOQogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgRVJSX1NVQlNDUklQVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA4IC8vICJFUlI6VURORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpVRE5FCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5MQogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTkzCiAgICAvLyBsZXQgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzID0gU2VydmljZVN0YXR1c05vbmUKICAgIGJ5dGVjIDEyIC8vIDB4MDAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk0CiAgICAvLyBsZXQgcGF5b3V0QWRkcmVzczogQWNjb3VudCA9IHN1Yi5yZWNpcGllbnQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5NQogICAgLy8gbGV0IHRpdGxlOiBzdHJpbmcgPSAnJwogICAgYnl0ZWNfMyAvLyAiIgogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTYKICAgIC8vIGxldCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGJ1cnkgMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5NwogICAgLy8gbGV0IGJhbm5lckltYWdlOiBDSUQgPSBvcC5iemVybygzNikKICAgIHB1c2hpbnQgMzYKICAgIGJ6ZXJvCiAgICBidXJ5IDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTgKICAgIC8vIGxldCBoaWdobGlnaHRNZXNzYWdlOiBVaW50OCA9IEhpZ2hsaWdodE1lc3NhZ2VOb25lCiAgICBieXRlYyAxMiAvLyAweDAwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTkKICAgIC8vIGxldCBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4gPSBCeXRlcygnMDAwJykudG9GaXhlZCh7IGxlbmd0aDogMyB9KQogICAgcHVzaGJ5dGVzICIwMDAiCiAgICBidXJ5IDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDAKICAgIC8vIGlmIChzdWIuc2VydmljZUlEICE9PSAwKSB7CiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDQKICAgIGJueiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19pZl9ib2R5QDQKICAgIGRpZyA3CiAgICBidXJ5IDcKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwOQogICAgLy8gbGV0IHBhc3NlczogQWNjb3VudFtdID0gW10KICAgIGJ5dGVjIDExIC8vIDB4MDAwMAogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMjEgLy8gInAiCiAgICBkaWcgMgogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxMAogICAgLy8gaWYgKHRoaXMucGFzc2VzKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxMQogICAgLy8gcGFzc2VzID0gWy4uLnBhc3NlcywgLi4udGhpcy5wYXNzZXMoa2V5KS52YWx1ZV0KICAgIGRpZyA5CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwOQogICAgLy8gbGV0IHBhc3NlczogQWNjb3VudFtdID0gW10KICAgIGJ5dGVjIDExIC8vIDB4MDAwMAogICAgc3dhcAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDkKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTUKICAgIC8vIC4uLnN1YiwKICAgIGRpZyA0CiAgICBkdXAKICAgIGV4dHJhY3QgNDAgOAogICAgZGlnIDEKICAgIGV4dHJhY3QgNDggOAogICAgZGlnIDIKICAgIGV4dHJhY3QgNTYgOAogICAgZGlnIDMKICAgIGV4dHJhY3QgNjQgOAogICAgZGlnIDQKICAgIGV4dHJhY3QgNzIgOAogICAgZGlnIDUKICAgIGV4dHJhY3QgODAgOAogICAgZGlnIDYKICAgIGV4dHJhY3QgODggOAogICAgdW5jb3ZlciA3CiAgICBleHRyYWN0IDk2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxNC0xMjI0CiAgICAvLyByZXR1cm4gewogICAgLy8gICAuLi5zdWIsCiAgICAvLyAgIHN0YXR1cywKICAgIC8vICAgcGF5b3V0QWRkcmVzcywKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IsCiAgICAvLyAgIHBhc3NlcwogICAgLy8gfQogICAgZGlnIDE1CiAgICB1bmNvdmVyIDgKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIGRpZyA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBjb25jYXQKICAgIGRpZyAxMAogICAgY29uY2F0CiAgICBkaWcgNwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwYjcKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAxODMKICAgICsKICAgIGRpZyAxOQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgKwogICAgc3dhcAogICAgZGlnIDIxCiAgICBjb25jYXQKICAgIGRpZyAxOAogICAgY29uY2F0CiAgICBkaWcgMTkKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTg3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2lmX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMQogICAgLy8gY29uc3Qgc2VydmljZUtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHN1Yi5yZWNpcGllbnQsIGlkOiBzdWIuc2VydmljZUlEIH0KICAgIGRpZyAyCiAgICBpdG9iCiAgICBkaWcgOAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKTsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA0IC8vICJFUlI6U0RORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTRE5FCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMwogICAgLy8gKHsgc3RhdHVzLCBwYXlvdXRBZGRyZXNzLCB0aXRsZSwgZGVzY3JpcHRpb24sIGJhbm5lckltYWdlLCBoaWdobGlnaHRNZXNzYWdlLCBoaWdobGlnaHRDb2xvciB9ID0gY2xvbmUodGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS52YWx1ZSkpCiAgICBkaWcgMTAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnVyeSA3CiAgICBkdXAKICAgIHB1c2hpbnRzIDQxIDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDkKICAgIGR1cAogICAgcHVzaGludCAxMTcKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNwogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgNgogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGR1cDIKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAyCiAgICBjb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgMTYKICAgIGR1cAogICAgcHVzaGludHMgNzcgMzYKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidXJ5IDE3CiAgICBkdXAKICAgIHB1c2hpbnQgMTEzCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ1cnkgMTQKICAgIHB1c2hpbnRzIDExNCAzCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnVyeSAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA0CiAgICAvLyBpZiAocGF5b3V0QWRkcmVzcyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9pZl9lbHNlQDkKICAgIGRpZyA3CiAgICBidXJ5IDcKICAgIGIgZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pc0ZpcnN0U3Vic2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNGaXJzdFN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyNwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMgogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxMyAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjI5CiAgICAvLyByZXR1cm4gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyNwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyAxMiAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2VMaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U2VydmljZUxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxMCAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzQKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U2VydmljZUxpc3RfdGVybmFyeV9mYWxzZUAzCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0U2VydmljZUxpc3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM0CiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbkxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb25MaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDEzIC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzOQogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCmdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM5CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk2CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NgogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDQKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIGRpZyAzCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwNAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgZHVwCiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIGRpZyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDQxIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTgKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGJ1cnkgMTIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjAKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjEKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgYnVyeSAxMQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDE5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBidXJ5IDEzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweGEyNDAzZGRmIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgOQogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9hY2NvdW50L3R5cGVzLnRzOjpFc2Nyb3dJbmZvPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBFUlJfRVNDUk9XX0RPRVNfTk9UX0VYSVNUKQogICAgZXh0cmFjdCA2IDkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDkKICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOk5FU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkVTQwoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIyCiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIEVSUl9XUk9OR19FU0NST1dfRk9SX09QRVJBVElPTikKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA3CiAgICBkaWcgOAogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMTQKICAgIHB1c2hieXRlcyAiRVJSOldFU0MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0VTQwoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA0CiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzAKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMxCiAgICAvLyBbXQogICAgYnl0ZWMgMTEgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGRpZyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNS0xMzkKICAgIC8vIGNvbnN0IG9wdEluQ291bnQgPSBzcGxpdE9wdEluQ291bnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXQKICAgIC8vICkKICAgIGRpZyA2CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDEKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDMtMTU0CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MAogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDktMTUyCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ2CiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ4CiAgICAvLyBbYXNzZXQuaWRdLAogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgMzYgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODYKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGJ5dGVjIDQxIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIEVSUl9JTlZBTElEX1VQR1JBREUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOklVUEciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVVQRwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDM3IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzAgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN0YXJ0RGF0ZTogdWludDY0LCBpbnRlcnZhbDogdWludDY0KSAtPiB1aW50NjQ6CmdldExhdGVzdFdpbmRvd1N0YXJ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIHByaXZhdGUgZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3RhcnREYXRlOiB1aW50NjQsIGludGVydmFsOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNwogICAgLy8gcmV0dXJuIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSAoKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBzdGFydERhdGUpICUgaW50ZXJ2YWwpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICAlCiAgICAtCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldEJsb2NrS2V5KGFkZHJlc3M6IGJ5dGVzLCBibG9ja2VkOiBieXRlcykgLT4gYnl0ZXM6CmdldEJsb2NrS2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXZhdGUgZ2V0QmxvY2tLZXkoYWRkcmVzczogQWNjb3VudCwgYmxvY2tlZDogQWNjb3VudCk6IEJsb2NrTGlzdEtleSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyBhZGRyZXNzOiBhZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIGZyYW1lX2RpZyAtMgogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MwogICAgLy8gYmxvY2tlZDogYmxvY2tlZC5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICBmcmFtZV9kaWcgLTEKICAgIHN1YnN0cmluZyAwIDE2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDEtMTQ0CiAgICAvLyByZXR1cm4gewogICAgLy8gICBhZGRyZXNzOiBhZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIC8vICAgYmxvY2tlZDogYmxvY2tlZC5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICAvLyB9CiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudXBkYXRlU3RyZWFrKGtleTogYnl0ZXMsIGVsc2VTdHJlYWs6IHVpbnQ2NCkgLT4gYnl0ZXM6CnVwZGF0ZVN0cmVhazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ3CiAgICAvLyBwcml2YXRlIHVwZGF0ZVN0cmVhayhrZXk6IFN1YnNjcmlwdGlvbktleSwgZWxzZVN0cmVhazogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3LTEwOQogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBjb25zdCBjdXJyZW50V2luZG93U3RhcnQ6IHVpbnQ2NCA9IHRoaXMuZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3ViLnN0YXJ0RGF0ZSwgc3ViLmludGVydmFsKQogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRMYXRlc3RXaW5kb3dTdGFydAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gY29uc3QgbGFzdFdpbmRvd1N0YXJ0OiB1aW50NjQgPSBjdXJyZW50V2luZG93U3RhcnQgLSBzdWIuaW50ZXJ2YWwKICAgIHN3YXAKICAgIC0KICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MwogICAgLy8gaWYgKHN1Yi5sYXN0UGF5bWVudCA8IGxhc3RXaW5kb3dTdGFydCkgewogICAgcHVzaGludCA4MAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA8CiAgICBieiB1cGRhdGVTdHJlYWtfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuc3RyZWFrID0gZWxzZVN0cmVhawogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCA4OAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHJldHVybgogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBpZiAoc3ViLmxhc3RQYXltZW50ID49IGxhc3RXaW5kb3dTdGFydCAmJiAhKHN1Yi5sYXN0UGF5bWVudCA+PSBjdXJyZW50V2luZG93U3RhcnQpKSB7CiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfZGlnIDIKICAgID49CiAgICBieiB1cGRhdGVTdHJlYWtfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfZGlnIDEKICAgID49CiAgICBibnogdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLnN0cmVhayArPSAxCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDg4CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VANToKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIHByaXZhdGUgZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCk6IEFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2OAogICAgLy8gY29uc3QgZmVlcyA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY4CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAyMyAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBsZXQgYWtpdGFGZWU6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gaWYgKGZlZXMucGF5bWVudFBlcmNlbnRhZ2UgPiAwKSB7CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBpZiAoYWtpdGFGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3NAogICAgLy8gYWtpdGFGZWUgPSAyCiAgICBpbnRjXzMgLy8gMgogICAgZnJhbWVfYnVyeSAyCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBsZXQgdHJpZ2dlckZlZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzkKICAgIC8vIGlmIChmZWVzLnRyaWdnZXJQZXJjZW50YWdlID4gMCkgewogICAgZnJhbWVfZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMwogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gaWYgKHRyaWdnZXJGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMAogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyB0cmlnZ2VyRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIGNvbnN0IGxlZnRPdmVyOiB1aW50NjQgPSBhbW91bnQgLSAoYWtpdGFGZWUgKyB0cmlnZ2VyRmVlKQogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE4OC0xOTIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFraXRhRmVlOiBha2l0YUZlZSwKICAgIC8vICAgdHJpZ2dlckZlZTogdHJpZ2dlckZlZSwKICAgIC8vICAgbGVmdE92ZXI6IGxlZnRPdmVyLAogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1N1YnNjcmlwdGlvbklEKGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6Cm5ld1N1YnNjcmlwdGlvbklEOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDMKICAgIC8vIHByaXZhdGUgbmV3U3Vic2NyaXB0aW9uSUQoYWRkcmVzczogQWNjb3VudCk6IFN1YnNjcmlwdGlvbklEIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgMTMgLy8gImwiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA0LTIwNgogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICAvLyAgID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZQogICAgLy8gICA6IDEKICAgIGJ6IG5ld1N1YnNjcmlwdGlvbklEX3Rlcm5hcnlfZmFsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZQogICAgZnJhbWVfZGlnIDAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpuZXdTdWJzY3JpcHRpb25JRF90ZXJuYXJ5X21lcmdlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA9IGlkICsgMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyByZXR1cm4gaWQKICAgIHN3YXAKICAgIHJldHN1YgoKbmV3U3Vic2NyaXB0aW9uSURfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgbmV3U3Vic2NyaXB0aW9uSURfdGVybmFyeV9tZXJnZUAzCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jcmVhdGVTdWJzY3JpcHRpb24ocGF5bWVudDogdWludDY0LCByZWNpcGllbnQ6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCwgc2VydmljZUlEOiB1aW50NjQpIC0+IHVpbnQ2NDoKY3JlYXRlU3Vic2NyaXB0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMTEtMjE3CiAgICAvLyBwcml2YXRlIGNyZWF0ZVN1YnNjcmlwdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDUgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxOAogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTQKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDkgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzLCBFUlJfQkxPQ0tFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyOSAvLyAiRVJSOkJMS0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkxLRAoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMjIKICAgIC8vIGxldCBnYXRlSUQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjI1CiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA2IC8vIDYwNTAwCiAgICBmcmFtZV9idXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjI5CiAgICAvLyBpZiAoIWlzRG9uYXRpb24pIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9pZl9ib2R5QDMKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfYnVyeSAyCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDEzIC8vICJsIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIGNvbnN0IG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIgPSAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIGNvbnN0IG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIgPSAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbklEID0gdGhpcy5uZXdTdWJzY3JpcHRpb25JRChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBuZXdTdWJzY3JpcHRpb25JRAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU1CiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25LZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQ6IHN1YnNjcmlwdGlvbklEIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8gaWYgKG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIpIHsKICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5zdWJzY3JpcHRpb25zbGlzdAogICAgZnJhbWVfZGlnIDYKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgZnJhbWVfYnVyeSA2CgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIGNvbnN0IGFraXRhRmVlczogdWludDY0ID0gYW1vdW50cy5ha2l0YUZlZSArIGFtb3VudHMudHJpZ2dlckZlZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFraXRhRmVlcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYyCiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBha2l0YUZlZXMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA1CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTgKICAgIGJ5dGVjIDcgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID49IChhbW91bnQgKyBtYnJBbW91bnQgKyByZWZlcnJhbE1iciksIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIDYKICAgICsKICAgIGZyYW1lX2RpZyA3CiAgICArCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMTAKICAgID49CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjY3LTI3MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2Ny0yNzEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2Ny0yNzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc0LTI3OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3NwogICAgLy8gYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzQtMjc4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzQtMjc5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NQogICAgLy8gY29uc3QgcGF5bWVudERpZmZlcmVuY2U6IHVpbnQ2NCA9IHBheW1lbnQuYW1vdW50IC0gKGFtb3VudCArIG1ickFtb3VudCArIHJlZmVycmFsTWJyKQogICAgZnJhbWVfZGlnIDkKICAgIGZyYW1lX2RpZyAxMAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyOTAKICAgIC8vIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODctMjk4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZDogcGF5bWVudERpZmZlcmVuY2UsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI5MwogICAgLy8gYXNzZXQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODctMjk4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZDogcGF5bWVudERpZmZlcmVuY2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyOTYKICAgIC8vIHN0cmVhazogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4Ny0yOTgKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkOiBwYXltZW50RGlmZmVyZW5jZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNy0xMDkKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIGZyYW1lX2RpZyAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg3LTI5OAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQ6IHBheW1lbnREaWZmZXJlbmNlLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMDAKICAgIC8vIHJldHVybiBzdWJzY3JpcHRpb25JRAogICAgZnJhbWVfZGlnIDgKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjcmVhdGVTdWJzY3JpcHRpb25faWZfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzAKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0IC8vICJFUlI6U0RORSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTRE5FCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2Uuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzQWN0aXZlLCBFUlJfU0VSVklDRV9JU19OT1RfQUNUSVZFKQogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDE3IC8vIDB4MTQKICAgID09CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyNiAvLyAiRVJSOlNOQUMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6U05BQwoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzgKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlLmFzc2V0ID09PSAwLCBFUlJfQVNBX01JU01BVENIKQogICAgZnJhbWVfZGlnIDEKICAgIHB1c2hpbnQgOQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDIwIC8vICJFUlI6QVNBTSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBU0FNCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0MAogICAgLy8gYW1vdW50ID0gc2VydmljZS5hbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIHB1c2hpbnQgMTcKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfYnVyeSAtMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIGludGVydmFsID0gc2VydmljZS5pbnRlcnZhbAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IC0yCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0MgogICAgLy8gZ2F0ZUlEID0gc2VydmljZS5nYXRlSUQKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ0CiAgICAvLyBpZiAoc2VydmljZS5wYXlvdXRBZGRyZXNzICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIHB1c2hpbnRzIDQxIDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxMQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9idXJ5IDIKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIGlmIChzZXJ2aWNlLnBhc3NlcyA+IDApIHsKICAgIGZyYW1lX2RpZyAxCiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnBhc3NlcwogICAgaW50YyA3IC8vIDQ3OTQwMAogICAgZnJhbWVfYnVyeSA2CiAgICBiIGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jcmVhdGVBc2FTdWJzY3JpcHRpb24obWJyUGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgcmVjaXBpZW50OiBieXRlcywgYW1vdW50OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQsIHNlcnZpY2VJRDogdWludDY0KSAtPiB1aW50NjQ6CmNyZWF0ZUFzYVN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzAzLTMxMAogICAgLy8gcHJpdmF0ZSBjcmVhdGVBc2FTdWJzY3JpcHRpb24oCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDYgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTQKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDkgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzEzCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzLCBFUlJfQkxPQ0tFRCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyOSAvLyAiRVJSOkJMS0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QkxLRAoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMTUKICAgIC8vIGxldCBnYXRlSUQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA2IC8vIDYwNTAwCiAgICBmcmFtZV9idXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyBpZiAoIWlzRG9uYXRpb24pIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9pZl9ib2R5QDMKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfYnVyeSAyCgpjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDEzIC8vICJsIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIGNvbnN0IG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIgPSAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIGNvbnN0IG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIgPSAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbklEID0gdGhpcy5uZXdTdWJzY3JpcHRpb25JRChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBuZXdTdWJzY3JpcHRpb25JRAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQ4CiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWJzY3JpcHRpb25JRCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTAKICAgIC8vIGlmIChuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyKSB7CiAgICBibnogY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMuc3Vic2NyaXB0aW9uc2xpc3QKICAgIGZyYW1lX2RpZyA2CiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIGZyYW1lX2J1cnkgNgoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NAogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU1CiAgICAvLyBjb25zdCBha2l0YUZlZXM6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGFGZWUgKyBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU2CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LmlkLCBha2l0YUZlZXMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgYWtpdGFGZWVzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgOQogICAgc3dhcAogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA1CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihhc3NldFhmZXIueGZlckFzc2V0KSwgRVJSX05PVF9PUFRFRF9JTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKGFzc2V0WGZlci54ZmVyQXNzZXQpLCBFUlJfTk9UX09QVEVEX0lOKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlYyAyNCAvLyAiRVJSOk5PUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Tk9QVAoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY0LTM3MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgNQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIDkKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY0LTM2OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjQtMzcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNzMKICAgIC8vIGxvZ2dlZEFzc2VydChtYnJQYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtNgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDcgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3NAogICAgLy8gbG9nZ2VkQXNzZXJ0KG1iclBheW1lbnQuYW1vdW50ID09PSBtYnJBbW91bnQgKyByZWZlcnJhbE1iciwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGZyYW1lX2RpZyAtNgogICAgZ3R4bnMgQW1vdW50CiAgICBmcmFtZV9kaWcgNgogICAgZnJhbWVfZGlnIDcKICAgICsKICAgID09CiAgICBibnogY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc3CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgNDIgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSBhbW91bnQsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEwCiAgICBmcmFtZV9kaWcgLTMKICAgID49CiAgICBibnogY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyNwogICAgYnl0ZWMgNDIgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MC0zODYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIDkKICAgIGR1cAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgwLTM4NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgwLTM4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5MgogICAgLy8gY29uc3QgcGF5bWVudERpZmZlcmVuY2U6IHVpbnQ2NCA9IGFzc2V0WGZlci5hc3NldEFtb3VudCAtIGFtb3VudAogICAgZnJhbWVfZGlnIDEwCiAgICBmcmFtZV9kaWcgLTMKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk3CiAgICAvLyBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMgogICAgLy8gbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk0LTQwNQogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQ6IHBheW1lbnREaWZmZXJlbmNlLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDMKICAgIC8vIHN0cmVhazogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NC00MDUKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkOiBwYXltZW50RGlmZmVyZW5jZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNy0xMDkKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTQtNDA1CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZDogcGF5bWVudERpZmZlcmVuY2UsCiAgICAvLyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gcmV0dXJuIHN1YnNjcmlwdGlvbklECiAgICBmcmFtZV9kaWcgOAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9pZl9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyMwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQgLy8gIkVSUjpTRE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNETkUKCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNBY3RpdmUsIEVSUl9TRVJWSUNFX0lTX05PVF9BQ1RJVkUpCiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWMgMTcgLy8gMHgxNAogICAgPT0KICAgIGJueiBjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDI2IC8vICJFUlI6U05BQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTTkFDCgpjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2UuYXNzZXQgPT09IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsIEVSUl9BU0FfTUlTTUFUQ0gpCiAgICBmcmFtZV9kaWcgMQogICAgcHVzaGludCA5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtNQogICAgZ3R4bnMgWGZlckFzc2V0CiAgICA9PQogICAgYm56IGNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMjAgLy8gIkVSUjpBU0FNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFTQU0KCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMzCiAgICAvLyBhbW91bnQgPSBzZXJ2aWNlLmFtb3VudAogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgcHVzaGludCAxNwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IC0zCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzNAogICAgLy8gaW50ZXJ2YWwgPSBzZXJ2aWNlLmludGVydmFsCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgLTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM1CiAgICAvLyBnYXRlSUQgPSBzZXJ2aWNlLmdhdGVJRAogICAgZHVwCiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzcKICAgIC8vIGlmIChzZXJ2aWNlLnBheW91dEFkZHJlc3MgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgcHVzaGludHMgNDEgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IGNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDExCiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2J1cnkgMgoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MQogICAgLy8gaWYgKHNlcnZpY2UucGFzc2VzID4gMCkgewogICAgZnJhbWVfZGlnIDEKICAgIHB1c2hpbnQgMjUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnogY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMucGFzc2VzCiAgICBpbnRjIDcgLy8gNDc5NDAwCiAgICBmcmFtZV9idXJ5IDYKICAgIGIgY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTQKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNhblRyaWdnZXIoa2V5OiBieXRlcykgLT4gdWludDY0LCBieXRlczoKY2FuVHJpZ2dlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEwCiAgICAvLyBwcml2YXRlIGNhblRyaWdnZXIoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNy0xMDkKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MjMKICAgIC8vIH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgZnJhbWVfZGlnIDgKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDEKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNgogICAgZHVwCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA1CiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDcKICAgIGR1cAogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgZHVwCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAzCiAgICBwdXNoaW50IDQ4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNQogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIGtleS5hZGRyZXNzKQogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDAgMzIKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDkgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyBpZiAodGhpcy5ibG9ja3MoYmxvY2tzS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzQtNDM4CiAgICAvLyBzZXJ2aWNlSUQgPiAwICYmCiAgICAvLyAoCiAgICAvLyAgICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgLy8gICB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICAvLyApCiAgICBmcmFtZV9kaWcgNgogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyAhdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMgfHwKICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNhblRyaWdnZXJfaWZfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNwogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgZnJhbWVfZGlnIDAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDE4IC8vIDB4MjgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNi00MzcKICAgIC8vICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDgKCmNhblRyaWdnZXJfaWZfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NDAKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gaWYgKGxhc3RQYXltZW50ID49IHRoaXMuZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3RhcnREYXRlLCBpbnRlcnZhbCkpIHsKICAgIGZyYW1lX2RpZyA3CiAgICBmcmFtZV9kaWcgNAogICAgY2FsbHN1YiBnZXRMYXRlc3RXaW5kb3dTdGFydAogICAgZnJhbWVfZGlnIDUKICAgIDw9CiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ1CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ4CiAgICAvLyBpZiAoYW1vdW50ID4gZXNjcm93ZWQpIHsKICAgIGZyYW1lX2RpZyAyCiAgICBmcmFtZV9kaWcgMwogICAgPgogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50KGtleTogYnl0ZXMpIC0+IGJ5dGVzOgpzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MzIKICAgIC8vIHRyaWdnZXJQYXltZW50KGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBwcm90byAxIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MzQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmNhblRyaWdnZXIoa2V5KSwgRVJSX0NBTk5PVF9UUklHR0VSKQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblRyaWdnZXIKICAgIGZyYW1lX2J1cnkgLTEKICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjpDVFJHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkNUUkcKCnNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNy0xMDkKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0MgogICAgLy8gfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGZyYW1lX2J1cnkgMwogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICBkdXAKICAgIHB1c2hpbnQgNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDQKICAgIGR1cAogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNQogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyBpZiAoZ2F0ZUlEICE9PSAwKSB7CiAgICBieiBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uYXBwbGljYXRpb25BcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmdhdGVkVHJpZ2dlclBheW1lbnQpLCBFUlJfSU5WQUxJRF9TRVFVRU5DRSkKICAgIGludGNfMCAvLyAwCiAgICB0eG5hcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDM0IC8vIG1ldGhvZCAiZ2F0ZWRUcmlnZ2VyUGF5bWVudChhcHBsLChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKICAgID09CiAgICBibnogc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDE2IC8vICJFUlI6SVNFUSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJU0VRCgpzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ5CiAgICAvLyBpZiAoc2VydmljZUlEICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgNgogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRfaWZfYm9keUA5CiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfYnVyeSAyCgpzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2MAogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBmcmFtZV9kaWcgNAogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2MgogICAgLy8gaWYgKGlzQXNhKSB7CiAgICBmcmFtZV9kaWcgNQogICAgYnogc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9lbHNlX2JvZHlAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTY1LTk3MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2OQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTY1LTk3MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjUtOTcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzMtOTc5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc1CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzcKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3My05NzgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzMtOTc5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MS05ODcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTgxLTk4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MS05ODcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gdGhpcy51cGRhdGVTdHJlYWsoa2V5LCAxKQogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB1cGRhdGVTdHJlYWsKICAgIGZyYW1lX2J1cnkgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3LTEwOQogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxNAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuZXNjcm93ZWQgLT0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIDQKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDk2CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTUKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLmxhc3RQYXltZW50ID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaXRvYgogICAgcHVzaGludCA4MAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRfZWxzZV9ib2R5QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTAtOTk1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MgogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTMKICAgIC8vIGFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkwLTk5NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MC05OTUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5Ny0xMDAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTk5CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMAogICAgLy8gYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5Ny0xMDAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTctMTAwMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA0LTEwMDkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA3CiAgICAvLyBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIDIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwNC0xMDA4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA0LTEwMDkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9hZnRlcl9pZl9lbHNlQDIzCgpzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2lmX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTUwCiAgICAvLyBjb25zdCBzZXJ2aWNlS2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1MQogICAgLy8gaWYgKHRoaXMuc2VydmljZXMoc2VydmljZUtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2lmX2JvZHlAMTAKICAgIGZyYW1lX2RpZyAzCiAgICBmcmFtZV9idXJ5IDIKICAgIGIgc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9hZnRlcl9pZl9lbHNlQDE0CgpzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2lmX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gY29uc3QgcGF5b3V0QWRkcmVzcyA9IHRoaXMuc2VydmljZXMoc2VydmljZUtleSkudmFsdWUucGF5b3V0QWRkcmVzcwogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnRzIDQxIDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTUzCiAgICAvLyBpZiAocGF5b3V0QWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBibnogc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9pZl9ib2R5QDExCiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfYnVyeSAyCiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAoKc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9pZl9ib2R5QDExOgogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2J1cnkgMgogICAgYiBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTQK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAKAAEIAqCNBtSTAdTYA6ihHbiLBKToAyYrCWFraXRhX2RhbwQVH3x1AW8ACEVSUjpTRE5FAXMMYWtpdGFfZXNjcm93CEVSUjpJUEFZCEVSUjpVRE5FAWIBbQIAAAEAAWwIRVJSOk1BTVQIRVJSOk1JTlYIRVJSOklTRVEBFAEoBndhbGxldAhFUlI6QVNBTQFwA2FhbBFzdWJzY3JpcHRpb25fZmVlcwhFUlI6Tk9QVAEKCEVSUjpTTkFDCEVSUjpOU1ZDCEVSUjpGR1RFCEVSUjpCTEtECEVSUjpOREFPBJsPidYEF5Wg0ATIg1EwBCgbiRsEOU6usgIAAQd2ZXJzaW9uCEVSUjpTTkRSCEVSUjpTU0hECEVSUjpIR1RFA3BhbAhFUlI6SVhGUoAE6pGA3TYaAI4BATgxGRREMRhBASEnHycgJyGCDQQXyHMLBEzfDNcEh+BVxgS1nIpUBK7rs3gEU1XabQQQ8Aw6BKaOaWMEsQowbgTyNVtVBBrEp1gE466yXATqqqTTJyKCEQTD2fHcBMD/JzAEJ1IDrwQSadh+BEMDZo4EDWpHowQdx4NxBAmjFY4E+Zlj1ATUsW56BHTe9ZoEJbgSpwSWnO2bBDPY5a0EYD1ylwTf5gLPBNimxSMnI4IEBDP3iAgEroTL2AQz6SyUBIVN7eA2GgCOJwOKBb4G7gcgB1IHjAe9CBAITAj5CX0KOArJCycLigwVDNsNYQ1wDYAOYw+oD9AQCRA+AAMQqhDVEa8SixKsFD4UWxR+FKEWchacFx0AAQAjQ4AMFR98dQAAAAAAAD1UsCNDgARa2fTGNhoAjgEDJgAxGYEEEjEYEERCFqaKAgGL/lcCAIv+IlmL/yULSwJMWUsCFYv/IwhJJQtLBUxZTwRPAglNUomKAQExAIv/QAAEiwBMiYv/gBJjb250cm9sbGVkX2FkZHJlc3NlSEL/44oBATIDi/9AAASLAEyJi/+ACHJlZmVycmVyZUhC/+2KAgGL/oADb2FsZUiBGFuxshiABDwabzOyGov/shqBBrIQIrIBs7Q+SVcEAEsBVwAEKRJESSJZJQhMFRJEVwYASRVJQQAHiwEkE0EABCKMAImLABdC//eKBAGL/DgYi/0nFmVIgShbEkEAOYv8OBlAADKL/DgbgQQSQQAoi/wiwhqABEOSJlUSQQAZi/wjwhqL/hJBAA6L/CXCGov/FhJBAAIjiSKJigIBK0mL/jEAiP9OiP8sMgMSQQAEIowAiYv+JxZlSCRbjAEhCIwAi/9BABWLAXIIRIv/cABFAUAAByEIMhAIjACJigMBIitHBIv9MQCI/wqI/uiL/0EBc4sGMgMTQQFri/2AC3dhbGxldF9mZWVzZUgkW0khBA5Ei/8dIQSXSYwDQAAIi/9BAAMjjAMyB4wFMgeBgPUkCIwCiwMWiwZMUCckTFBJjACL/ScWZUgkW4wEIlmB1MUBC4HkxQIIjAGL/kAAYLGLBElyCESLAYsDCLIIsgcjshAisgG2iwUWiwIWTwKyGIAEe33F/LIaTLIashqLALIagQayECKyAbO0PklXBABMVwAEKRJESRUkEkQXFosBFlBXCAiL/4sDCRZMUIwAiYsEcghEi/5wAEUBQQBpiwGLBElyCESxSwFyCESLAbIIsgcjshAisgG2i/6yEYsDshKyFIEEshAisgG2iwUWiwIWTwKyGIAErxoU8rIaTLIashqLALIagQayECKyAbO0PklXBABMVwAEKRJESRUkEkQXTIwBQv92iwEyEAixiwRJcghEMhCyCLIHI7IQIrIBtov+FkyyGCcjshqyGoEGshAisgGzQv9pi/8WIhZQjACJigMBIov+i/9wAEUBQAAai/2ADnJldmVudWVfc3BsaXRzZUgiWSMIjACLAEyJNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVSwEiWUmBChJESwJMSwJSIlmBDAgSRCclTwNnKE8CZycGTGcjQyJHAitHBjEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFYEgEkQ2GgdJIlklCEsBFRJEVwIANhoISRWBJBJENhoJSRUjEkQ2GgpJFYEDEkQnCjEAUL1FAScKMQBQSb1FAUEBrEm+RBdJIwgWSwJMvzEATBZJRRlQRRZLCYEED0AABCcOsABLC4E8D0AABCcPsABLCIEFDkAADIAIRVJSOk1YUFOwAEsFFUlFD4GAAQ5AAAyACEVSUjpUVExHsAAiKGVEJxdlSCJbSUUQIQkIRRBLAUAAB0sPIQUIRRBLCkEAJjIKSwtwAEUBQAAEJxiwACInBmVEJVtyCERLC3AARQFAAAQnGLAAIihlREsLSxCI/MtJIltFEyRbRRFLDDgHMgoSQAAEJwewAEsMOAhLEEsSCBJAAAQnB7AAsSInBmVEJVtyCERLErIIsgcjshAisgGzSwsWJxlMUEsLFlBLChZQSwkWUEsIFlBLB1BLDhZXBgJLB1BMgAIAdVBLARWBdQgWVwYCUEsGUEsFUEsEUExQJwtQKksXUEm8SEy/IkUUMRYjCEUTSxIyBAxBADRLEjgQgQYTQABOSxI4GDIIEkAABCcQsABLEjgZQQAEJxCwAEsSIsIaSUUWJyESQQAbI0UUSxNAAAyACEVSUjpTTkFWsAApSxdQsCNDSxQnIBJAAAQnELAASxIjCEUTQv+XI0L+VCJJK0k2GgFJFSQSRBc2GgJJIlklCEsBFRJEVwIAMRZAAAyACEVSUjpHSU9CsABLAYHyDwoxFiMJTAlJRQU4EIEGEkEA50sDOBgyCBJBAN1LAzgZQADWSwMiwhonHxJBAMsjQAAEJxCwACcKMQBQvkQXIwkxAEwWUCpMUElFBr1FAUAABCcEsABLBCIjuicZEkAABCcmsABJFUsCCIHPGA5AAAyACEVSUjpCRExOsABLBEmBSyW6F0oluhclCLpXAgBJRQcVSUUESwIPQAAMgAhFUlI6Qk9GU7AASwFLAwxBACAiSwNJTgIPIksCTwJNSwNJSwMPTE8DTwJNSwdOAlJFBksFSwFQSwVJTgK+REsBFRZXBgJPAlBLAYFLWU8CIk8CWExQSwG8SL8jQyJC/zInCjEAUL5EFyMJMQBMFlAqTFBJvUUBQAAEJwSwAEkiI7onGRJAAAQnJrAASSInEbsjQzYaAUkVJBJEFzEATBZQKkxQSb1FAUAABCcEsABJIiO6JxESQAAEJxqwAEkigAEeuyNDNhoBSRUkEkQXMQBMFlAqTFBJvUUBQAAEJwSwAEkiI7qAAR4SQAAMgAhFUlI6U05QQbAASSInEbsjQzYaAUkVJBJEFzEATBZQKkxQSb1FAUAABCcEsABJIiO6JxITQAAEJyewAEkiJxK7I0MxFiMJSTgQIxJENhoBSRWBIBJEMQBMiA95JwlMUEm9RQFBAAyACEVSUjpVQUJMsABLATgHMgoSQAAEJwewAEsBOAiB1HoSQAAEJwewAEkiuUgjQzYaAUkVgSASRDEATIgPMCcJTFBJvUUBQAAMgAhFUlI6VU5CTLAASbxIsTEAgdR6sgiyByOyECKyAbMjQyIxFiUJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFYEgEkQ2GgJJFSQSRBdJNhoDSRUkEkQXTDYaBEkVJBJEF0yBBA9AAAQnDrAASwGBPA9AAAQnD7AASUAABCcbsABJFksETFAqTFBJRQi9RQFAAAQnBLAASwaBISS6FyIoZUQxAIj304j3iCIoZURLB0xPAk8DiPgZQAAEJxywAEsFSwRLBEsESwSID2sWKUxQsCNDIjEWIwlJOBAjEkQ2GgFJFYEgEkQ2GgJJFSQSRBdJNhoDSRUkEkQXTDYaBEkVJBJEF0yBBA9AAAQnDrAASwGBPA9AAAQnD7AASUEAJEkWSwRMUCpMUElFB71FAUAABCcEsABLBYEhJLoXQQAEJyiwAEsESwRLBEsESwSIDucWKUxQsCNDIjEWgQMJSTgQIxJEMRYlCUk4EIEEEkQxFiMJSTgQgQYSRDYaAUkVgSASRDYaAkkVJBJEF0k2GgNJFSQSRBdMNhoESRUkEkQXTIEED0AABCcOsABLAYE8D0AABCcPsABJQAAEJxuwAEkWSwRMUCpMUElFCb1FAUAABCcEsABLB4EhJLoXIihlRDEAiPaWiPZLIihlREsHTE8CTwOI9txAAAQnHLAASwZLBksFSwVLBUsFiA+XFilMULAjQyIxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFYEgEkQ2GgJJFSQSRBdJNhoDSRUkEkQXTDYaBEkVJBJEF0yBBA9AAAQnDrAASwGBPA9AAAQnD7AASUEAJEkWSwRMUCpMUElFCL1FAUAABCcEsABLBoEhJLoXQQAEJyiwAEsFSwVLBUsFSwVLBYgPBhYpTFCwI0MxFiMJSTgQIxJENhoBSRUkEkQXMQBMFlBJVwAgTFcgCFAnBUxQSb1FAUAABCcIsABJvkSBQFtBAAQnFLAASwE4BzIKEkAABCcHsABHAr5EgWBbSwM4CAgWgWBMuyNDMRYjCUk4EIEEEkQ2GgFJFSQSRBcxAEwWUCcFTFBJvUUBQAAEJwiwAEm+RIFAW0sCOBESQAAEJxSwAEsBOBQyChJAAAyACEVSUjpJQVJFsABHAr5EgWBbSwM4EggWgWBMuyNDIis2GgFJFSQSRBc2GgJJFSQSRBdMMQBMFlAnBUxQSb1FAUAABCcIsABJvkxJTgJFBkSBYFtLAg9AAAyACEVSUjpORUZOsABLA4FAW0lFBEEAJrExAEsCshJLA7IRshSBBLIQIrIBs0cCvkSBYFtLAwkWgWBMuyNDsTEASwKyCLIHI7IQIrIBs0L/3CJJK0cDNhoBSRUkEkQXMQBMFlAnBUxQSb1FAUAABCcIsABJvkxJTgJFCEQhBkUGgSBbSUUDQQA1SwVXACBLAhZJRQlQKkxQgRkkuhdBAB4xAEsHUCcVTFC9RQFBAA8xAEsHUCcVTFC8SCEHRQVLBYFAW0lFBUEANUsFgWBbSUUEQQAVsTEASwOyEksEshGyFIEEshAisgGzsTEASwWyCLIHI7IQIrIBs0m8SCNDsTEASwaBYFtLBgiyCLIHI7IQIrIBs0L/4iJJKzEWIwlJOBCBBhJENhoBRwIVgSgSRCcFTFBJvUUBQAAEJwiwAEm+REmBIFtJTgJFBlcAIEUGQAAEJxuwAEsDFksFTFAqTFBJRQe9RQFAAAQnBLAASwWBISS6FyIoZUQxAIjzX4jzFCIoZURLBUxPAk8DiPOlQAAEJxywAEsBiA7jSCNDNhoBSRWBKBJEiA7USCNDNhoBSRWBKBJEIogJ7UgjQyJJK0cCNhoBSRUkEkQXNhoCSU4CSSJZSU4DgSALJQhMFRJEMQBMFklOAlAnBUxQSb1FAUAABCcIsABJvkRJgSBbSU4CRQdXACBFCUAADIAIRVJSOk5PRE6wAEsEFksITFAqTFBJRQq9RQFAAAQnBLAASwhJIiO6TIEZJLoXRQcnEhNAAAQnJ7AASwVLAw9AAAyACEVSUjpQQ09GsAAiRQdLBksDDEEAKksDVwIASweBIAuBIFhLCEyICRQnCUxQvUUBQQAEJx2wAEsGIwhFB0L/zjEASwJQJxVMUEm8SEsEvyNDIkcCK0cHNhoBRwIiWUlOAiULTEkVTFcCACJJSwUMQQA1RwIlC0sDSU8CWUlLB0lOBBJESwEVUkkVSwGBIFlJgSISRExSIlkkC4EkCAhFBSMIRQFC/8RLAyUISwMSRCcLRQ8iRQxLC0sFDEEA0SJFC0sFSwyI8VRJgSBZSwEVUiJZSwsNQQCuSwVJSw1JTgOI8TlXACBMTwKI8TBJgSBZSwEVUlcCAEsMJAskWFCIDHBIJwwiTwJURRFLDkkiWUlFEEkjCEkWVwYATwNMXABFEkyBBwgkCklFD0yBBwgkCklFCwxBAAxLCEsNCa9LEExQRRAiRQpLDYEQCElFCCMIRQhLBksIDEEAH0sQSwpJTgJTSxFLCUlOA08CVEUSIwhFCCMIRQpC/9lLCiMIRQtLD0UPQv87SwsjCEUMQv8nKUsPULAjQzYaAUkVgSASRDYaAkkVgSASRIgHkicJTFC9RQEnDCJPAlQpTFCwI0M2GgFJFYEgEkQ2GgJJFSQSRBcWUCpMUEm9RQFBABdJIiO6JxISQQANIycMIk8CVClMULAjQyJC//A2GgFJFSQSRBciKGVEJxdlSCJbIQkIJwoxAFC9RQFAAAMhBQgiKGVESwKI8RAIFilMULAjQyI2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBdJIQZMQQAlSwEWSwRMUCpMUElFBr1FAUAABCcEsABLBIEZJLoXQQAEIQdFAScNMQBQvUUBQAAGSSEFCEUBIihlREsDiPCmSwEIFilMULAjQzYaAUkVgSASRDYaAkkVJBJEFxZQKkxQSb1FAUAABCcEsABJvkQpTFCwI0MiRwMrRwI2GgFJFYEgEkQ2GgJJFSQSRBdJNhoDSRUkEkQXTCcLTEsDSwMISwENQQCiSRZLBUxQKkxQSUUMvUUBQQCQSwq+RIACAAJMUEUKSwFJIllJIwgWVwYARQtMVwIARQ0lC0UIIkUGSwVLCAxBABtLC0sGSU4CWSUIFlcGAEsKTFBFCiUIRQZC/91LCxVFByJFBksFJQxBABxLCUsGSU4CWUsICBZXBgBLCkxQRQolCEUGQv/dSwtLCEsIUksJTFBLClcCAFBFAkkjCEUBQv9TKUsCULAjQzYaAUkVgSgSRCcFTFBJvUUBQABxgGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApTFCwI0NJvkRJVwAgSwFXIAhLAlcoCEsDVzAISwRXOAhLBVdACEsGV0gISwdXUAhLCFdYCE8JV2AIgAGATwpQTwlQTwhQTwdQTwZQTwVQTwRQTwNQTwJQTFBC/6M2GgFJFYEoEkQnBUxQSb1FAUAABCcIsABJvkQpTFCwI0MiRwsrNhoBRwIVgSgSRCcFTFBJvUUBQAAEJwiwAEm+TElOAkUHRCcMRQdJVwAgRQkrRQUrRQ+BJK9FECcMRQ2AAzAwMEUOgSBbSUUEQADMSwdFBycLRQknFUsCUElFC71FAUEAGksJSb5EVwIATCIluhcWVwYAJwtMXABMUEUJSwRJVygISwFXMAhLAlc4CEsDV0AISwRXSAhLBVdQCEsGV1gITwdXYAhLD08IUE8HUE8GUE8FUE8EUEsGFlBLCVBLClBLB0kVFlcGAkxQTIACALdQSwEVgbcBCEsTSRUWVwYCTFBLARZXBgJPA0xQSwEVTwMITEsVUEsSUEsTUE8GUE8FUE8EUEwWVwYCUE8CUExQSwlQKUxQsCNDSwIWSwhMUCpMUElFDL1FAUAABCcEsABLCkkiI7pFB0mDAikguklOAkUJSYF1JboXJQhLAYF1TwK6VwIARQZJgUsluhdKJboXJQhLAk4CulcCAEUQSYMCTSS6RRFJgXEjukUOgwJyA7pFDjIDEkH+yEsHRQdC/sE2GgFJFYEgEkQnDUxQvUUBFCcMIk8CVClMULAjQzYaAUkVgSASRCcKTFBJvUUBQQALSb5EFxYpTFCwI0MiQv/1NhoBSRWBIBJEJw1MUEm9RQFBAAtJvkQXFilMULAjQyJC//UiRwIrRwMxFiMJRwI4ECMSRDYaAUkVJBJEF0lOAiInBmVMSU4CTgREIihlREwlW3IIRE8CiO5CTDgHMgoSQAAMgAhFUlI6SVBNUrAASwM4CDIQI0sDCAsSQAAMgAhFUlI6SVBNQbAAsTIKSwOyESKyErIUgQSyECKyAbNJQQFQSwFJIllLARVSVwIAKxNBAT8iKGVESScTZUhFBkknKWVISVcICEUMJFtFCCInBmVMSU4CRQVESSJZSwEVUklFC1cCAEwnE2VITLEjFkUNSRUWVwYCTFCABAABAAJMUEyyGIAEokA937IashqBBrIQIrIBs7Q+SVcEAEsBVwAEKRJESSJZgQkLJQhMFRJEVwYJIltJRQlAAAyACEVSUjpORVNDsABLASVbSUUHSwgSQAAMgAhFUlI6V0VTQ7AAsUsESbIYgARa3zOPshpLCrIaSwuyGksJshqACgABAAAAAAAAAACyGicLshqBBrIQIrIBIihlREsHSU4CcghESwZJTgSI7PYyEAu2THIIRLIHsggjshAisgG2SwEWTBYnJExQSwmyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVEIicGZUQlW3IIRE8CiOyMMhAjTwIICxYpTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJxNlSHIIRBJAAAQnHrAAJwZLAWcjQzYaAUkiWSUISwEVEkRXAgAxACIoZUQnE2VIcghEEkAABCcesAAiKGVEJyllSIEQWzINEkAADIAIRVJSOklVUEewACclSwFnI0M2GgFJFSQSRBcxACIoZUQnE2VIcghEEkAABCcesAAoSwFnI0OKAgEyB0mL/gmL/xgJiYoCAYv+UQAQSRWBEBJEi/9RABBJFYEQEkRQiYoCAScFi/5QSb5ESYEoW0sBgThbTEsBiP+9SU4DTAlJTwKBUFtJTwIMQQAPi/8WiwCBWE8Cu4v+jACJiwOLAg9BABeLA4sBD0AAD4sASb5EgVhbIwgWgVhMu4v+jACJigEBKyIoZUQnF2VISSJMJFtJQQAbiwNJIQQORIv/HSEEl0mMAkAACIv/QQADJYwCIowAiwGBEFtJjANBABuLA0khBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjACLAkmLAElOAwiL/0wJTBZPAhZQTBZQjACJigEBJw2L/1BJvUUBQQAPiwC+RBdJIwgWiwBMv0yJI0L/8ooFASJHAytHBov8MQCI/uInCUxQvUUBQQAEJx2wACKMBCEGjAaL/0AA0Yv8jAInDTEAUL1FATEAiP+jSYwIMQBMFlCMA0AAB4sGIQUIjAaL/Yj/GEmMAEkiW0wkWwgiKGVEIk8CiOjDSSJbjAUkW4wHi/s4BzIKEkAABCcHsACL+zgISYwJi/2LBgiLBwhJjAoPQAAEJwewALEiJwZlRCVbcghEiwWyCLIHI7IQIrIBs7GLAIEQW7IIiwKyByOyECKyAbOLCYsKCTIHSYv/Fov8TFBPAhZQi/0WUIv+FlAiFlCLBBZQTBZQIxZQTBZQJwWLA1BMv4sIjACJi/8Wi/xMUCpMUEmMAb1FAUAABCcEsACLASIjuicREkAABCcasACLAYEJJLoXQQAEJxSwAIsBSYERJLoXjP1JIyS6F4z+SYEhJLoXjASDAikgukmMAjIDE0AABIv8jAKLAYEZJLoXQf7KIQeMBkL+w4oGASJHAytHBov8MQCI/XcnCUxQvUUBQQAEJx2wACKMBCEGjAaL/0ABHIv8jAInDTEAUL1FATEAiP44SYwIMQBMFlCMA0AAB4sGIQUIjAaL/Yj9rUmMAEkiW0wkWwgiKGVEi/s4EUmMCUxLAU8DiOdPSSJbjAUkW4wHIicGZUQlW3IIRExwAEUBQAAEJxiwALEiJwZlRCVbcghEiwWyEosJshGyFIEEshAisgGzi/o4BzIKEkAABCcHsACL+jgIiwaLBwgSQAAEJwewAIv7OBQyChJAAAQnKrAAi/s4EkmMCov9D0AABCcqsACxiwCBEFuyEosJSbIRiwKyFIEEshAisgGziwqL/QkyB0mL/xaL/ExQTwIWUIv9FlCL/hZQTwMWUIsEFlBMFlAjFlBMFlCLA0lXACBMVyAIUCcFTFBMv4sIjACJi/8Wi/xMUCpMUEmMAb1FAUAABCcEsACLASIjuicREkAABCcasACLAYEJJLoXi/s4ERJAAAQnFLAAiwFJgREkuheM/UkjJLoXjP5JgSEkuheMBIMCKSC6SYwCMgMTQAAEi/yMAosBgRkkuhdB/nohB4wGQv5zigECIkkrRwUnBYv/UEm9RQFAAAgii/+MAYwAiYsIvkRJVwAgSU4CjAFJgSBbjAZJgVBbjAVJgShbjAdJgThbjARJgWBbjAOBMFuMAov/VwAgiPt4JwlMUL1FAUEACCKL/4wBjACJiwZBACaLBhaLAUxQKkxQSYwAvUUBQQALiwAiI7onEhJBAAgii/+MAYwAiYsHiwSI+yaLBQ5BAAgii/+MAYwAiYsCiwMNQQAIIov/jAGMAIkji/+MAYwAiYoBASJHAytHAov/iP80jP9AAAyACEVSUjpDVFJHsAAnBYv/UL5ESVcAIIwDSYEgW4wGSYEwW4wESYFAW4wFgUhbQQANIsAaJyISQAAEJxCwAIsGQADFiwOMAosEiPspiwVBAHexIicGZUQlW3IIREsBIluyEosFSU4DshGyFIEEshAisgGzsTEASwEkW7ISSwKyEbIUgQSyECKyAbOxgRBbshKyEYsCshSBBLIQIrIBs4v/I4j6coz/JwWL/1BJvkSBYFuLBAkWSwGBYE8CuzIHFoFQTLuL/4wAibEiJwZlRCVbcghESwEiW7IIsgcjshAisgGzsTEASwEkW7IIsgcjshAisgGzsYEQW7IIiwKyByOyECKyAbNC/5aLBhaLA0xQKkxQSYwAvUUBQAAHiwOMAkL/JYsAgwIpILpJjAEyAxNAAAeLA4wCQv8OiwGMAkL/Bw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
function ServiceFromTuple(abiTuple) {
  const abiStructType = ABIStructType.fromStruct("Service", APP_SPEC.structs);
  return getStructValueFromTupleValue(abiStructType, abiTuple);
}
var SubscriptionsParamsFactory = class _SubscriptionsParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,uint64,(string,uint64))void":
            return _SubscriptionsParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Subscriptions smart contract using the create(string,uint64,(string,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,uint64,(string,uint64))void",
          args: Array.isArray(params.args) ? params.args : [params.args.version, params.args.akitaDao, params.args.akitaDaoEscrow]
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
            return _SubscriptionsParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Subscriptions smart contract using the update(string)void ABI method
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
   * Constructs a no op call for the newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64 ABI method
   *
   * newService creates a new service for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newService(params) {
    return {
      ...params,
      method: "newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.interval, params.args.asset, params.args.amount, params.args.passes, params.args.gateId, params.args.payoutAddress, params.args.title, params.args.bannerImage, params.args.highlightMessage, params.args.highlightColor]
    };
  }
  /**
   * Constructs a no op call for the setServiceDescription(uint64,byte[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setServiceDescription(params) {
    return {
      ...params,
      method: "setServiceDescription(uint64,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.offset, params.args.data]
    };
  }
  /**
   * Constructs a no op call for the activateService()void ABI method
   *
   * activateService activates an service for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static activateService(params) {
    return {
      ...params,
      method: "activateService()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
     * Constructs a no op call for the pauseService(uint64)void ABI method
     *
    * pauseService pauses a service for a merchant
    it does not shutdown pre-existing subscriptions
    it simply prevents new subscriptions from being created
    for a specific service
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static pauseService(params) {
    return {
      ...params,
      method: "pauseService(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
   * Constructs a no op call for the unpauseService(uint64)void ABI method
   *
   * unpauseService activates an service for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unpauseService(params) {
    return {
      ...params,
      method: "unpauseService(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
     * Constructs a no op call for the shutdownService(uint64)void ABI method
     *
    * shutdownService permanently shuts down an service for a merchant
    it also shutsdown pre-existing subscriptions
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static shutdownService(params) {
    return {
      ...params,
      method: "shutdownService(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
   * Constructs a no op call for the block(pay,address)void ABI method
   *
   * block blacklists an address for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static block(params) {
    return {
      ...params,
      method: "block(pay,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.blocked]
    };
  }
  /**
   * Constructs a no op call for the unblock(address)void ABI method
   *
   * unblock removes an address from a merchants blocks
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unblock(params) {
    return {
      ...params,
      method: "unblock(address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.blocked]
    };
  }
  /**
   * Constructs a no op call for the gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedSubscribe(params) {
    return {
      ...params,
      method: "gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the subscribe(pay,address,uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static subscribe(params) {
    return {
      ...params,
      method: "subscribe(pay,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedSubscribeAsa(params) {
    return {
      ...params,
      method: "gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.gateTxn, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static subscribeAsa(params) {
    return {
      ...params,
      method: "subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the deposit(pay,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deposit(params) {
    return {
      ...params,
      method: "deposit(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.id]
    };
  }
  /**
   * Constructs a no op call for the depositAsa(axfer,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static depositAsa(params) {
    return {
      ...params,
      method: "depositAsa(axfer,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer, params.args.id]
    };
  }
  /**
   * Constructs a no op call for the withdraw(uint64,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static withdraw(params) {
    return {
      ...params,
      method: "withdraw(uint64,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.amount]
    };
  }
  /**
   * Constructs a no op call for the unsubscribe(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static unsubscribe(params) {
    return {
      ...params,
      method: "unsubscribe(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
   * Constructs a no op call for the gatedTriggerPayment(appl,(address,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedTriggerPayment(params) {
    return {
      ...params,
      method: "gatedTriggerPayment(appl,(address,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.key]
    };
  }
  /**
   * Constructs a no op call for the triggerPayment((address,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static triggerPayment(params) {
    return {
      ...params,
      method: "triggerPayment((address,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.key]
    };
  }
  /**
   * Constructs a no op call for the streakCheck((address,uint64))void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static streakCheck(params) {
    return {
      ...params,
      method: "streakCheck((address,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.key]
    };
  }
  /**
   * Constructs a no op call for the setPasses(uint64,address[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setPasses(params) {
    return {
      ...params,
      method: "setPasses(uint64,address[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.addresses]
    };
  }
  /**
   * Constructs a no op call for the triggerList((address,uint64[])[])bool[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static triggerList(params) {
    return {
      ...params,
      method: "triggerList((address,uint64[])[])bool[]",
      args: Array.isArray(params.args) ? params.args : [params.args.req]
    };
  }
  /**
   * Constructs a no op call for the isBlocked(address,address)bool ABI method
   *
   * isBlocked checks if an address is blocked for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isBlocked(params) {
    return {
      ...params,
      method: "isBlocked(address,address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.blocked]
    };
  }
  /**
   * Constructs a no op call for the isShutdown(address,uint64)bool ABI method
   *
   * serviceIsActive checks if an service is shutdown
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isShutdown(params) {
    return {
      ...params,
      method: "isShutdown(address,uint64)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.id]
    };
  }
  /**
   * Constructs a no op call for the newServiceCost(uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newServiceCost(params) {
    return {
      ...params,
      method: "newServiceCost(uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
   * Constructs a no op call for the newSubscriptionCost(address,uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newSubscriptionCost(params) {
    return {
      ...params,
      method: "newSubscriptionCost(address,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.recipient, params.args.asset, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the blockCost()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static blockCost(params) {
    return {
      ...params,
      method: "blockCost()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getService(params) {
    return {
      ...params,
      method: "getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.id]
    };
  }
  /**
   * Constructs a no op call for the getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getServicesByAddress(params) {
    return {
      ...params,
      method: "getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.start, params.args.windowSize]
    };
  }
  /**
   * Constructs a no op call for the getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getSubscription(params) {
    return {
      ...params,
      method: "getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.key]
    };
  }
  /**
   * Constructs a no op call for the mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mustGetSubscription(params) {
    return {
      ...params,
      method: "mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : [params.args.key]
    };
  }
  /**
   * Constructs a no op call for the getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getSubscriptionWithDetails(params) {
    return {
      ...params,
      method: "getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])",
      args: Array.isArray(params.args) ? params.args : [params.args.key]
    };
  }
  /**
   * Constructs a no op call for the isFirstSubscription(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static isFirstSubscription(params) {
    return {
      ...params,
      method: "isFirstSubscription(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getServiceList(address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getServiceList(params) {
    return {
      ...params,
      method: "getServiceList(address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getSubscriptionList(address)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getSubscriptionList(params) {
    return {
      ...params,
      method: "getSubscriptionList(address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
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
var SubscriptionsFactory = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  appFactory;
  /**
   * Creates a new instance of `SubscriptionsFactory`
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
    return new SubscriptionsClient(this.appFactory.getAppClientById(params));
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
    return new SubscriptionsClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Subscriptions smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? SubscriptionsParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? SubscriptionsParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new SubscriptionsClient(result.appClient) };
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
       * Creates a new instance of the Subscriptions smart contract using the create(string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(SubscriptionsParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Subscriptions smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(SubscriptionsParamsFactory.update.update(params));
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
       * Creates a new instance of the Subscriptions smart contract using the create(string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(SubscriptionsParamsFactory.create.create(params));
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
       * Creates a new instance of the Subscriptions smart contract using an ABI method call using the create(string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(SubscriptionsParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new SubscriptionsClient(result.appClient) };
      }
    }
  };
};
var SubscriptionsClient = class _SubscriptionsClient {
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
   * Returns a new `SubscriptionsClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _SubscriptionsClient(await _AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `SubscriptionsClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _SubscriptionsClient(await _AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the Subscriptions smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(SubscriptionsParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Subscriptions smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` ABI method.
     *
     * newService creates a new service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setServiceDescription(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setServiceDescription: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.setServiceDescription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `activateService()void` ABI method.
     *
     * activateService activates an service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    activateService: (params = { args: [] }) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.activateService(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `pauseService(uint64)void` ABI method.
         *
        * pauseService pauses a service for a merchant
        it does not shutdown pre-existing subscriptions
        it simply prevents new subscriptions from being created
        for a specific service
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    pauseService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.pauseService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unpauseService(uint64)void` ABI method.
     *
     * unpauseService activates an service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unpauseService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.unpauseService(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `shutdownService(uint64)void` ABI method.
         *
        * shutdownService permanently shuts down an service for a merchant
        it also shutsdown pre-existing subscriptions
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    shutdownService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.shutdownService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `block(pay,address)void` ABI method.
     *
     * block blacklists an address for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    block: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.block(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unblock(address)void` ABI method.
     *
     * unblock removes an address from a merchants blocks
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unblock: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.unblock(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedSubscribe: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedSubscribe(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    subscribe: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.subscribe(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedSubscribeAsa: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedSubscribeAsa(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    subscribeAsa: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.subscribeAsa(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `deposit(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deposit: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.deposit(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `depositAsa(axfer,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    depositAsa: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.depositAsa(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `withdraw(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    withdraw: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.withdraw(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unsubscribe(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    unsubscribe: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.unsubscribe(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedTriggerPayment: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedTriggerPayment(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerPayment((address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    triggerPayment: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.triggerPayment(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `streakCheck((address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    streakCheck: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.streakCheck(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setPasses(uint64,address[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setPasses: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.setPasses(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerList((address,uint64[])[])bool[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    triggerList: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.triggerList(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isBlocked(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * isBlocked checks if an address is blocked for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isBlocked: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.isBlocked(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isShutdown(address,uint64)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * serviceIsActive checks if an service is shutdown
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isShutdown: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.isShutdown(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newServiceCost: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newServiceCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newSubscriptionCost: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newSubscriptionCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `blockCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    blockCost: (params = { args: [] }) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.blockCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getServicesByAddress: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getServicesByAddress(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getSubscription: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getSubscription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mustGetSubscription: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.mustGetSubscription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getSubscriptionWithDetails: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getSubscriptionWithDetails(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isFirstSubscription(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    isFirstSubscription: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.isFirstSubscription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getServiceList(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getServiceList: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getServiceList(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionList(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getSubscriptionList: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getSubscriptionList(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.params.call(SubscriptionsParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.opUp(params));
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
       * Updates an existing instance of the Subscriptions smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(SubscriptionsParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Subscriptions smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` ABI method.
     *
     * newService creates a new service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setServiceDescription(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setServiceDescription: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.setServiceDescription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `activateService()void` ABI method.
     *
     * activateService activates an service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    activateService: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.activateService(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `pauseService(uint64)void` ABI method.
         *
        * pauseService pauses a service for a merchant
        it does not shutdown pre-existing subscriptions
        it simply prevents new subscriptions from being created
        for a specific service
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    pauseService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.pauseService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unpauseService(uint64)void` ABI method.
     *
     * unpauseService activates an service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unpauseService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.unpauseService(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `shutdownService(uint64)void` ABI method.
         *
        * shutdownService permanently shuts down an service for a merchant
        it also shutsdown pre-existing subscriptions
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    shutdownService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.shutdownService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `block(pay,address)void` ABI method.
     *
     * block blacklists an address for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    block: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.block(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unblock(address)void` ABI method.
     *
     * unblock removes an address from a merchants blocks
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unblock: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.unblock(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedSubscribe: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedSubscribe(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    subscribe: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.subscribe(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedSubscribeAsa: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedSubscribeAsa(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    subscribeAsa: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.subscribeAsa(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `deposit(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deposit: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.deposit(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `depositAsa(axfer,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    depositAsa: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.depositAsa(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `withdraw(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    withdraw: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.withdraw(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unsubscribe(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    unsubscribe: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.unsubscribe(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedTriggerPayment: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedTriggerPayment(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerPayment((address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    triggerPayment: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.triggerPayment(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `streakCheck((address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    streakCheck: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.streakCheck(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setPasses(uint64,address[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setPasses: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.setPasses(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerList((address,uint64[])[])bool[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    triggerList: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.triggerList(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isBlocked(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * isBlocked checks if an address is blocked for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isBlocked: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.isBlocked(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isShutdown(address,uint64)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * serviceIsActive checks if an service is shutdown
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isShutdown: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.isShutdown(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newServiceCost: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newServiceCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newSubscriptionCost: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newSubscriptionCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `blockCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    blockCost: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.blockCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getServicesByAddress: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getServicesByAddress(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getSubscription: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getSubscription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mustGetSubscription: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.mustGetSubscription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getSubscriptionWithDetails: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getSubscriptionWithDetails(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isFirstSubscription(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    isFirstSubscription: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.isFirstSubscription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getServiceList(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getServiceList: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getServiceList(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionList(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getSubscriptionList: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getSubscriptionList(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.opUp(params));
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
       * Updates an existing instance of the Subscriptions smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(SubscriptionsParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Subscriptions smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` ABI method.
     *
     * newService creates a new service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newService(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setServiceDescription(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setServiceDescription: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.setServiceDescription(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `activateService()void` ABI method.
     *
     * activateService activates an service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    activateService: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.activateService(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `pauseService(uint64)void` ABI method.
         *
        * pauseService pauses a service for a merchant
        it does not shutdown pre-existing subscriptions
        it simply prevents new subscriptions from being created
        for a specific service
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    pauseService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.pauseService(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unpauseService(uint64)void` ABI method.
     *
     * unpauseService activates an service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unpauseService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.unpauseService(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `shutdownService(uint64)void` ABI method.
         *
        * shutdownService permanently shuts down an service for a merchant
        it also shutsdown pre-existing subscriptions
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    shutdownService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.shutdownService(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `block(pay,address)void` ABI method.
     *
     * block blacklists an address for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    block: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.block(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unblock(address)void` ABI method.
     *
     * unblock removes an address from a merchants blocks
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unblock: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.unblock(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedSubscribe: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedSubscribe(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    subscribe: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.subscribe(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedSubscribeAsa: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedSubscribeAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    subscribeAsa: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.subscribeAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `deposit(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deposit: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.deposit(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `depositAsa(axfer,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    depositAsa: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.depositAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `withdraw(uint64,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    withdraw: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.withdraw(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `unsubscribe(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    unsubscribe: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.unsubscribe(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedTriggerPayment: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedTriggerPayment(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerPayment((address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    triggerPayment: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.triggerPayment(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `streakCheck((address,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    streakCheck: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.streakCheck(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setPasses(uint64,address[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setPasses: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.setPasses(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerList((address,uint64[])[])bool[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    triggerList: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.triggerList(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isBlocked(address,address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * isBlocked checks if an address is blocked for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isBlocked: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.isBlocked(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isShutdown(address,uint64)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * serviceIsActive checks if an service is shutdown
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isShutdown: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.isShutdown(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newServiceCost: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServiceCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newSubscriptionCost: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newSubscriptionCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `blockCost()uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    blockCost: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.blockCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getService(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getServicesByAddress: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getServicesByAddress(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getSubscription: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getSubscription(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mustGetSubscription: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.mustGetSubscription(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getSubscriptionWithDetails: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getSubscriptionWithDetails(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `isFirstSubscription(address)bool` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    isFirstSubscription: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.isFirstSubscription(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getServiceList(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getServiceList: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getServiceList(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionList(address)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getSubscriptionList: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getSubscriptionList(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `optIn(pay,uint64)void` ABI method.
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
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `optInCost(uint64)uint64` ABI method.
     * 
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.opUp(params));
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
    return new _SubscriptionsClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `triggerList((address,uint64[])[])bool[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async triggerList(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.triggerList(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `isBlocked(address,address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * isBlocked checks if an address is blocked for a merchant
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isBlocked(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.isBlocked(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `isShutdown(address,uint64)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * serviceIsActive checks if an service is shutdown
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isShutdown(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.isShutdown(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newServiceCost(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServiceCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newSubscriptionCost(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.newSubscriptionCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `blockCost()uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async blockCost(params = { args: [] }) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.blockCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getService(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getService(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getServicesByAddress(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getServicesByAddress(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getSubscription(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getSubscription(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mustGetSubscription(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.mustGetSubscription(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getSubscriptionWithDetails(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getSubscriptionWithDetails(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `isFirstSubscription(address)bool` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async isFirstSubscription(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.isFirstSubscription(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getServiceList(address)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getServiceList(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getServiceList(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getSubscriptionList(address)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getSubscriptionList(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getSubscriptionList(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `optInCost(uint64)uint64` ABI method.
   * 
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Subscriptions app
   */
  state = {
    /**
     * Methods to access global state for the current Subscriptions app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO
        };
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
     * Methods to access box state for the current Subscriptions app
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
       * Get values from the subscriptions map in box state
       */
      subscriptions: {
        /**
         * Get all current values of the subscriptions map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("subscriptions");
        },
        /**
         * Get a current value of the subscriptions map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("subscriptions", key);
        }
      },
      /**
       * Get values from the subscriptionslist map in box state
       */
      subscriptionslist: {
        /**
         * Get all current values of the subscriptionslist map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("subscriptionslist");
        },
        /**
         * Get a current value of the subscriptionslist map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("subscriptionslist", key);
        }
      },
      /**
       * Get values from the services map in box state
       */
      services: {
        /**
         * Get all current values of the services map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("services");
        },
        /**
         * Get a current value of the services map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("services", key);
        }
      },
      /**
       * Get values from the serviceslist map in box state
       */
      serviceslist: {
        /**
         * Get all current values of the serviceslist map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("serviceslist");
        },
        /**
         * Get a current value of the serviceslist map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("serviceslist", key);
        }
      },
      /**
       * Get values from the blocks map in box state
       */
      blocks: {
        /**
         * Get all current values of the blocks map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("blocks");
        },
        /**
         * Get a current value of the blocks map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("blocks", key);
        }
      },
      /**
       * Get values from the passes map in box state
       */
      passes: {
        /**
         * Get all current values of the passes map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("passes");
        },
        /**
         * Get a current value of the passes map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("passes", key);
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
       * Add a newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64 method call against the Subscriptions contract
       */
      newService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newService(params)));
        return this;
      },
      /**
       * Add a setServiceDescription(uint64,byte[])void method call against the Subscriptions contract
       */
      setServiceDescription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setServiceDescription(params)));
        return this;
      },
      /**
       * Add a activateService()void method call against the Subscriptions contract
       */
      activateService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.activateService(params)));
        return this;
      },
      /**
       * Add a pauseService(uint64)void method call against the Subscriptions contract
       */
      pauseService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.pauseService(params)));
        return this;
      },
      /**
       * Add a unpauseService(uint64)void method call against the Subscriptions contract
       */
      unpauseService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unpauseService(params)));
        return this;
      },
      /**
       * Add a shutdownService(uint64)void method call against the Subscriptions contract
       */
      shutdownService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.shutdownService(params)));
        return this;
      },
      /**
       * Add a block(pay,address)void method call against the Subscriptions contract
       */
      block(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.block(params)));
        return this;
      },
      /**
       * Add a unblock(address)void method call against the Subscriptions contract
       */
      unblock(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unblock(params)));
        return this;
      },
      /**
       * Add a gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribe(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribe(params)));
        return this;
      },
      /**
       * Add a subscribe(pay,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribe(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribe(params)));
        return this;
      },
      /**
       * Add a gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribeAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribeAsa(params)));
        return this;
      },
      /**
       * Add a subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribeAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribeAsa(params)));
        return this;
      },
      /**
       * Add a deposit(pay,uint64)void method call against the Subscriptions contract
       */
      deposit(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deposit(params)));
        return this;
      },
      /**
       * Add a depositAsa(axfer,uint64)void method call against the Subscriptions contract
       */
      depositAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.depositAsa(params)));
        return this;
      },
      /**
       * Add a withdraw(uint64,uint64)void method call against the Subscriptions contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        return this;
      },
      /**
       * Add a unsubscribe(uint64)void method call against the Subscriptions contract
       */
      unsubscribe(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unsubscribe(params)));
        return this;
      },
      /**
       * Add a gatedTriggerPayment(appl,(address,uint64))void method call against the Subscriptions contract
       */
      gatedTriggerPayment(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedTriggerPayment(params)));
        return this;
      },
      /**
       * Add a triggerPayment((address,uint64))void method call against the Subscriptions contract
       */
      triggerPayment(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.triggerPayment(params)));
        return this;
      },
      /**
       * Add a streakCheck((address,uint64))void method call against the Subscriptions contract
       */
      streakCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.streakCheck(params)));
        return this;
      },
      /**
       * Add a setPasses(uint64,address[])void method call against the Subscriptions contract
       */
      setPasses(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setPasses(params)));
        return this;
      },
      /**
       * Add a triggerList((address,uint64[])[])bool[] method call against the Subscriptions contract
       */
      triggerList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.triggerList(params)));
        return this;
      },
      /**
       * Add a isBlocked(address,address)bool method call against the Subscriptions contract
       */
      isBlocked(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isBlocked(params)));
        return this;
      },
      /**
       * Add a isShutdown(address,uint64)bool method call against the Subscriptions contract
       */
      isShutdown(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isShutdown(params)));
        return this;
      },
      /**
       * Add a newServiceCost(uint64)uint64 method call against the Subscriptions contract
       */
      newServiceCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newServiceCost(params)));
        return this;
      },
      /**
       * Add a newSubscriptionCost(address,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      newSubscriptionCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newSubscriptionCost(params)));
        return this;
      },
      /**
       * Add a blockCost()uint64 method call against the Subscriptions contract
       */
      blockCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.blockCost(params)));
        return this;
      },
      /**
       * Add a getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3]) method call against the Subscriptions contract
       */
      getService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getService(params)));
        return this;
      },
      /**
       * Add a getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[] method call against the Subscriptions contract
       */
      getServicesByAddress(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getServicesByAddress(params)));
        return this;
      },
      /**
       * Add a getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the Subscriptions contract
       */
      getSubscription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscription(params)));
        return this;
      },
      /**
       * Add a mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the Subscriptions contract
       */
      mustGetSubscription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetSubscription(params)));
        return this;
      },
      /**
       * Add a getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[]) method call against the Subscriptions contract
       */
      getSubscriptionWithDetails(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscriptionWithDetails(params)));
        return this;
      },
      /**
       * Add a isFirstSubscription(address)bool method call against the Subscriptions contract
       */
      isFirstSubscription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isFirstSubscription(params)));
        return this;
      },
      /**
       * Add a getServiceList(address)uint64 method call against the Subscriptions contract
       */
      getServiceList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getServiceList(params)));
        return this;
      },
      /**
       * Add a getSubscriptionList(address)uint64 method call against the Subscriptions contract
       */
      getSubscriptionList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscriptionList(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Subscriptions contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the Subscriptions contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Subscriptions contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Subscriptions contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Subscriptions contract
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
       * Add a clear state call to the Subscriptions contract
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

// src/subscriptions/utils.ts
function hexColorToBytes(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return new Uint8Array([r, g, b]);
}
function bytesToHexColor(bytes) {
  return "#" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function validateHexColor(hexColor) {
  const normalized = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;
  if (!/^[0-9A-Fa-f]{6}$/.test(normalized)) {
    throw new Error("Invalid hex color. Must be in the format RRGGBB (6 hexadecimal digits, with or without a leading #).");
  }
}

// src/subscriptions/constants.ts
var ServiceStatus = /* @__PURE__ */ ((ServiceStatus2) => {
  ServiceStatus2[ServiceStatus2["None"] = 0] = "None";
  ServiceStatus2[ServiceStatus2["Draft"] = 10] = "Draft";
  ServiceStatus2[ServiceStatus2["Active"] = 20] = "Active";
  ServiceStatus2[ServiceStatus2["Paused"] = 30] = "Paused";
  ServiceStatus2[ServiceStatus2["Shutdown"] = 40] = "Shutdown";
  return ServiceStatus2;
})(ServiceStatus || {});
var HighlightMessage = /* @__PURE__ */ ((HighlightMessage2) => {
  HighlightMessage2[HighlightMessage2["None"] = 0] = "None";
  HighlightMessage2[HighlightMessage2["BestValue"] = 1] = "BestValue";
  HighlightMessage2[HighlightMessage2["Popular"] = 2] = "Popular";
  HighlightMessage2[HighlightMessage2["New"] = 3] = "New";
  HighlightMessage2[HighlightMessage2["LimitedOffer"] = 4] = "LimitedOffer";
  HighlightMessage2[HighlightMessage2["Recommended"] = 5] = "Recommended";
  HighlightMessage2[HighlightMessage2["Trending"] = 6] = "Trending";
  HighlightMessage2[HighlightMessage2["StaffPick"] = 7] = "StaffPick";
  HighlightMessage2[HighlightMessage2["TopRated"] = 8] = "TopRated";
  HighlightMessage2[HighlightMessage2["EditorChoice"] = 9] = "EditorChoice";
  HighlightMessage2[HighlightMessage2["HotDeal"] = 10] = "HotDeal";
  HighlightMessage2[HighlightMessage2["Seasonal"] = 11] = "Seasonal";
  HighlightMessage2[HighlightMessage2["FlashSale"] = 12] = "FlashSale";
  HighlightMessage2[HighlightMessage2["Exclusive"] = 13] = "Exclusive";
  HighlightMessage2[HighlightMessage2["LimitedEdition"] = 14] = "LimitedEdition";
  HighlightMessage2[HighlightMessage2["EarlyAccess"] = 15] = "EarlyAccess";
  return HighlightMessage2;
})(HighlightMessage || {});
var MAX_DESCRIPTION_LENGTH = 3151;
var MAX_DESCRIPTION_CHUNK_SIZE = 2034;
var MAX_LOAD_DESCRIPTION_CHUNK_SIZE = 2026;

// src/subscriptions/errors.ts
var SUBSCRIPTIONS_ERROR_MESSAGES = {
  // --- Input validation ---------------------------------------------------
  MAMT: "Minimum amount is 3 base units",
  MINV: "Minimum interval is 60 seconds",
  MXPS: "Maximum number of passes is five",
  TTLG: "Title exceeds maximum length",
  BDLN: "Description length exceeds maximum",
  BOFS: "Invalid description offset",
  BWIN: "Invalid payment window",
  // --- Services -----------------------------------------------------------
  SIAZ: "Service indexes are always above zero",
  SDNE: "Service does not exist",
  SNDR: "Service offering is not in draft status",
  SNAC: "Service offering is not active",
  SNPA: "Service offering is not paused",
  SSHD: "Service offering is shutdown",
  SNAV: "Service not activated",
  NSVC: "Not a service",
  // --- Subscriptions ------------------------------------------------------
  UDNE: "Subscription does not exist",
  CTRG: "Cannot trigger payment at this time",
  NEFN: "Not enough funds in escrow",
  NODN: "Donations aren't applicable to passes",
  PCOF: "More addresses than available passes",
  // --- Blocking -----------------------------------------------------------
  UABL: "User is already blocked",
  UNBL: "User is not blocked",
  // --- Group / call-order -------------------------------------------------
  GIOB: "Group index out of bounds",
  ISEQ: "Invalid sequence of calls in group",
  // --- Subscriptions plugin -----------------------------------------------
  DNIT: "Description has not been initialized"
};
var translateSubscriptionsError = makeErrorTranslator(SUBSCRIPTIONS_ERROR_MESSAGES);

// src/subscriptions/index.ts
var toBigInt = (value) => typeof value === "bigint" ? value : BigInt(Math.floor(value));
var toSeconds = (value, unit) => {
  const normalized = toBigInt(value);
  return unit === "milliseconds" ? normalized / 1000n : normalized;
};
var SubscriptionsSDK = class extends BaseSDK {
  serviceMapKeyGenerator = ({ address, id }) => `${address}${id}`;
  services = new ValueMap(this.serviceMapKeyGenerator);
  constructor(params) {
    super({ factory: SubscriptionsFactory, ...params }, ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID);
  }
  /**
   * Get the cost to create a new service from the contract
   */
  async newServiceCost({ sender, signer, asset = 0n } = {}) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.newServiceCost({ ...sendParams, args: { asset } });
  }
  async blockCost({ sender, signer } = {}) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.blockCost({ ...sendParams, args: [] });
  }
  /**
   * Get the cost to create a new subscription from the contract
   */
  async newSubscriptionCost({ sender, signer, recipient, asset = 0n, serviceId = 0n }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.newSubscriptionCost({ ...sendParams, args: { recipient, asset, serviceId } });
  }
  /**
   * Get the cost to opt the contract into an asset
   */
  async optInCost({ sender, signer, asset }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.optInCost({ ...sendParams, args: { asset } });
  }
  /**
   * Opt the Subscriptions contract (and its rev_subscriptions escrow) into an
   * asset. Must be called directly by an EOA — NOT via `SubscriptionsPlugin.optIn`
   * — because `Subscriptions.optIn` rekeys to the revenue-manager plugin
   * internally and plugin rekeys cannot be nested.
   *
   * The contract's `optIn` fans out a lot of inner app calls (contract's own
   * asset opt-in, rekey to revenue-manager, `RevenueManager.optIn`, MBR
   * payment, rekey-back, plus nested opt-ins per split recipient), which
   * blows through the reference-slot budget of a single app call. We pad the
   * group with opUp calls so `populateAppCallResources` has enough slots.
   *
   * @param asset     The asset ID to opt into
   * @param opUpCount Number of opUp calls to add for reference slots (default 3)
   */
  async optIn({
    sender,
    signer,
    asset,
    opUpCount = 3
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const optInCost = await this.optInCost({ ...sendParams, asset });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(optInCost),
      receiver: this.client.appAddress.toString()
    });
    const group = this.client.newGroup();
    group.optIn({
      ...sendParams,
      args: {
        payment,
        asset: BigInt(asset)
      },
      // Covers every inner fee for:
      //   - the contract's own asset opt-in (1 inner)
      //   - the composed arc58_rekeyToPlugin + RevenueManager.optIn + MBR
      //     payment + arc58_verifyAuthAddress group (4 inners)
      //   - nested inners those app calls emit (rekey payments, escrow opt-in
      //     assetTransfer, rekey-back)
      // 15× minFee is comfortably over-budget; any surplus is retained by the
      // block, which is cheap insurance against flow additions.
      extraFee: microAlgos(15000n)
    });
    for (let i = 0; i < opUpCount; i++) {
      group.opUp({
        ...sendParams,
        args: {},
        maxFee: microAlgos(1e3),
        ...i > 0 ? { note: String(i) } : {}
      });
    }
    await group.send({
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true
    });
  }
  /**
   * Check if the contract is opted into a specific asset
   */
  async isOptedInToAsset(asset) {
    var _a;
    const assetId = BigInt(asset);
    if (assetId === 0n) {
      return true;
    }
    try {
      const appAddress = this.client.appAddress.toString();
      const algod = this.client.algorand.client.algod;
      const response = await algod.accountAssetInformation(appAddress, assetId);
      return !!response.assetHolding;
    } catch (error) {
      if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 404) {
        return false;
      }
      console.warn("[SubscriptionsSDK] Error checking asset opt-in:", error);
      return false;
    }
  }
  async isBlocked({ sender, signer, address, blocked }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.isBlocked({ ...sendParams, args: { address, blocked } });
  }
  async isShutdown({ sender, signer, address, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.isShutdown({ ...sendParams, args: { address, id } });
  }
  async getServices() {
    const rawServices = await this.client.state.box.services.getMap();
    const transformedEntries = Array.from(rawServices.entries()).map(([key, value]) => [
      key,
      {
        ...value,
        highlightColor: bytesToHexColor(value.highlightColor)
      }
    ]);
    this.services = new ValueMap(
      this.serviceMapKeyGenerator,
      new Map(transformedEntries)
    );
    return this.services;
  }
  async getService({ sender, address, id }) {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.getService({ ...sendParams, args: { address, id } });
    return {
      ...result,
      highlightColor: bytesToHexColor(result.highlightColor)
    };
  }
  async getServicesByAddress({ sender, address, start = 0n, windowSize = 20n }) {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.getServicesByAddress({ ...sendParams, args: { address, start, windowSize } });
    const tuples = result;
    return tuples.map((tuple) => {
      const result2 = ServiceFromTuple(tuple);
      return {
        ...result2,
        highlightColor: bytesToHexColor(result2.highlightColor)
      };
    });
  }
  async getSubscription({ sender, address, id }) {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.mustGetSubscription({ ...sendParams, args: { key: { address, id } } });
    return {
      ...result,
      lastPayment: convertToUnixTimestamp(result.lastPayment)
    };
  }
  async getSubscriptionWithDetails({ sender, address, id }) {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.getSubscriptionWithDetails({ ...sendParams, args: { key: { address, id } } });
    return {
      ...result,
      highlightColor: bytesToHexColor(result.highlightColor),
      lastPayment: convertToUnixTimestamp(result.lastPayment)
    };
  }
  /**
   * Compute paid-up status and current payment window for a subscription.
   *
   * Defaults align with SDK-returned data:
   * - startDate: seconds (on-chain)
   * - interval: seconds (on-chain)
   * - lastPayment: milliseconds (SDK converts it)
   * - now: milliseconds (Date.now())
   */
  getSubscriptionStatus(subscription, options = {}) {
    const {
      now = Date.now(),
      nowUnit = "milliseconds",
      startDateUnit = "seconds",
      lastPaymentUnit = "milliseconds",
      intervalUnit = "seconds"
    } = options;
    const nowSec = toSeconds(now, nowUnit);
    const startSec = toSeconds(subscription.startDate, startDateUnit);
    const lastPaymentSec = toSeconds(subscription.lastPayment, lastPaymentUnit);
    const intervalSec = toSeconds(subscription.interval, intervalUnit);
    if (intervalSec <= 0n || nowSec < startSec) {
      return {
        paidUp: false,
        windowStart: startSec,
        now: nowSec,
        startDate: startSec,
        lastPayment: lastPaymentSec,
        interval: intervalSec
      };
    }
    const windowStart = nowSec - (nowSec - startSec) % intervalSec;
    return {
      paidUp: lastPaymentSec >= windowStart,
      windowStart,
      now: nowSec,
      startDate: startSec,
      lastPayment: lastPaymentSec,
      interval: intervalSec
    };
  }
  /**
   * Convenience wrapper for paid-up boolean.
   */
  isSubscriptionPaidUp(subscription, options = {}) {
    return this.getSubscriptionStatus(subscription, options).paidUp;
  }
  async isFirstSubscription({ sender, address }) {
    const sendParams = this.getReaderSendParams({ sender });
    return await this.client.isFirstSubscription({ ...sendParams, args: { address } });
  }
  async getSubscriptionList({ sender, address }) {
    const sendParams = this.getReaderSendParams({ sender });
    return await this.client.getSubscriptionList({ ...sendParams, args: { address } });
  }
  async getServiceList({ sender, address }) {
    const sendParams = this.getReaderSendParams({ sender });
    return await this.client.getServiceList({ ...sendParams, args: { address } });
  }
  async newService({ sender, signer, asset = 0n, passes = 0n, gateId = 0n, ...rest }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    validateHexColor(rest.highlightColor);
    const highlightColor = hexColorToBytes(rest.highlightColor);
    const isAsaService = asset !== 0n;
    const needsOptIn = isAsaService && !await this.isOptedInToAsset(asset);
    const paymentAmount = await this.newServiceCost({ ...sendParams, asset });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress.toString()
    });
    if (rest.description.length === 0) {
      throw new Error("Description cannot be empty");
    }
    const group = this.client.newGroup();
    if (needsOptIn) {
      const optInCost = await this.optInCost({ ...sendParams, asset });
      const optInPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(optInCost),
        receiver: this.client.appAddress.toString()
      });
      group.optIn({
        ...sendParams,
        args: {
          payment: optInPayment,
          asset: BigInt(asset)
        }
      });
    }
    group.newService({
      ...sendParams,
      args: {
        payment,
        asset,
        passes,
        gateId,
        ...rest,
        highlightColor
      }
    });
    if (rest.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(`Description length exceeds maximum of ${MAX_DESCRIPTION_LENGTH} characters`);
    }
    if (rest.description.length > MAX_DESCRIPTION_CHUNK_SIZE) {
      group.setServiceDescription({
        ...sendParams,
        args: {
          offset: 0n,
          data: Buffer.from(rest.description).subarray(0, MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
      group.setServiceDescription({
        ...sendParams,
        args: {
          offset: BigInt(MAX_DESCRIPTION_CHUNK_SIZE),
          data: Buffer.from(rest.description).subarray(MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
    } else {
      group.setServiceDescription({
        ...sendParams,
        args: {
          offset: 0n,
          data: Buffer.from(rest.description)
        }
      });
    }
    group.activateService({
      ...sendParams,
      args: []
    });
    const result = await group.send({ ...sendParams });
    const returnIndex = needsOptIn ? 1 : 0;
    return result.returns[returnIndex];
  }
  async pauseService({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.pauseService({
      ...sendParams,
      args: { id }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async shutdownService({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.shutdownService({
      ...sendParams,
      args: { id }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async block({ sender, signer, block }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const paymentAmount = await this.blockCost({ sender, signer });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress.toString()
    });
    const group = this.client.newGroup();
    group.block({
      ...sendParams,
      args: {
        payment,
        blocked: block
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async unblock({ sender, signer, blocked }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.unblock({
      ...sendParams,
      args: { blocked }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async subscribe({
    sender,
    signer,
    asset = 0n,
    serviceId = 0n,
    initialDepositAmount = 0n,
    amount,
    interval,
    recipient,
    gateTxn
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const isAlgoSubscription = asset === 0n;
    const isGated = gateTxn !== void 0;
    const needsOptIn = !await this.isOptedInToAsset(asset);
    const subscribeCost = await this.newSubscriptionCost({
      ...sendParams,
      recipient,
      asset,
      serviceId
    });
    const paymentAmount = isAlgoSubscription ? BigInt(amount) + subscribeCost + BigInt(initialDepositAmount) : subscribeCost;
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
      receiver: this.client.appAddress.toString()
      // Convert Address to string to avoid instanceof issues
    });
    const group = this.client.newGroup();
    if (needsOptIn) {
      const optInCost = await this.optInCost({ ...sendParams, asset });
      const optInPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(optInCost),
        receiver: this.client.appAddress.toString()
      });
      group.optIn({
        ...sendParams,
        args: {
          payment: optInPayment,
          asset: BigInt(asset)
        }
      });
    }
    if (isAlgoSubscription) {
      if (isGated) {
        group.gatedSubscribe({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            amount,
            interval: BigInt(interval),
            recipient,
            serviceId
          }
        });
      } else {
        group.subscribe({
          ...sendParams,
          args: {
            payment,
            amount,
            interval: BigInt(interval),
            recipient,
            serviceId
          }
        });
      }
    } else {
      const assetTransfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount) + BigInt(initialDepositAmount),
        assetId: asset,
        receiver: this.client.appAddress.toString()
      });
      if (isGated) {
        group.gatedSubscribeAsa({
          ...sendParams,
          args: {
            payment,
            gateTxn,
            amount,
            interval: BigInt(interval),
            recipient,
            serviceId
          }
        });
      } else {
        group.subscribeAsa({
          ...sendParams,
          args: {
            payment,
            assetXfer: assetTransfer,
            amount,
            interval: BigInt(interval),
            recipient,
            serviceId
          }
        });
      }
    }
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3),
      note: "1"
    });
    const result = await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    const returnIndex = needsOptIn ? 1 : 0;
    const subscriptionId = result.returns[returnIndex];
    if (subscriptionId === void 0) {
      throw new Error("Subscription failed, no subscription ID returned");
    }
    return subscriptionId;
  }
  async unsubscribe({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.unsubscribe({
      ...sendParams,
      args: { id: BigInt(id) }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async deposit({ sender, signer, asset = 0n, amount, id }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.client.newGroup();
    if (asset !== 0n) {
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(asset),
        receiver: this.client.appAddress.toString()
      });
      group.depositAsa({
        ...sendParams,
        args: {
          assetXfer,
          id: BigInt(id)
        }
      });
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: microAlgo(amount),
        receiver: this.client.appAddress.toString()
      });
      group.deposit({
        ...sendParams,
        args: {
          payment,
          id: BigInt(id)
        }
      });
    }
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async withdraw({
    sender,
    signer,
    asset = 0n,
    amount,
    id
  }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.withdraw({
      ...sendParams,
      args: {
        amount: BigInt(amount),
        id: BigInt(id)
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async triggerPayment({ sender, signer, address, id, gateTxn }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    if (gateTxn !== void 0) {
      group.gatedTriggerPayment({
        ...sendParams,
        args: {
          gateTxn,
          key: { address, id }
        }
      });
    } else {
      group.triggerPayment({
        ...sendParams,
        args: { key: { address, id } }
      });
    }
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async setPasses({ sender, signer, id, passes }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.setPasses({
      ...sendParams,
      args: {
        id: BigInt(id),
        addresses: passes
      }
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: microAlgos(1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
};

export {
  hexColorToBytes,
  bytesToHexColor,
  validateHexColor,
  ServiceStatus,
  HighlightMessage,
  MAX_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_CHUNK_SIZE,
  MAX_LOAD_DESCRIPTION_CHUNK_SIZE,
  SUBSCRIPTIONS_ERROR_MESSAGES,
  translateSubscriptionsError,
  SubscriptionsSDK
};
//# sourceMappingURL=chunk-U4PKGQHJ.mjs.map
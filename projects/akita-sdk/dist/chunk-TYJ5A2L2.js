"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class; var _class2; var _class3;

var _chunk56YZPYCLjs = require('./chunk-56YZPYCL.js');


var _chunkT5TIVGPAjs = require('./chunk-T5TIVGPA.js');


var _chunkPMAUR73Vjs = require('./chunk-PMAUR73V.js');

// src/subscriptions/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');


// src/generated/SubscriptionsClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Subscriptions", "structs": { "BlockListKey": [{ "name": "address", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "Service": [{ "name": "status", "type": "uint8" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "passes", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }], "ServicesKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionInfo": [{ "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionInfoWithDetails": [{ "name": "recipient", "type": "address" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "serviceId", "type": "uint64" }, { "name": "status", "type": "uint8" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "passes", "type": "address[]" }], "SubscriptionInfoWithExistence": [{ "name": "exists", "type": "bool" }, { "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "uint64", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment", "desc": "The payment for the service creation" }, { "type": "uint64", "name": "interval", "desc": "The interval in seconds" }, { "type": "uint64", "name": "asset", "desc": "The asa to be used for the subscription" }, { "type": "uint64", "name": "amount", "desc": "The amount of the asa to be used for the subscription" }, { "type": "uint64", "name": "passes", "desc": "The number of accounts the subscription can be shared with" }, { "type": "uint64", "name": "gateID" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "newService creates a new service for a merchant", "events": [], "recommendations": {} }, { "name": "setServiceDescription", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "activateService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "activateService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "pauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "pauseService pauses a service for a merchant\nit does not shutdown pre-existing subscriptions\nit simply prevents new subscriptions from being created\nfor a specific service", "events": [], "recommendations": {} }, { "name": "unpauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unpauseService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "shutdownService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "shutdownService permanently shuts down an service for a merchant\nit also shutsdown pre-existing subscriptions", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "payment", "desc": "The payment to cover mbr for blocking" }, { "type": "address", "name": "blocked", "desc": "The address to be blocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "block blacklists an address for a merchant", "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "blocked", "desc": "The address to be unblocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unblock removes an address from a merchants blocks", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deposit", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "depositAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unsubscribe", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "triggerPayment", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "streakCheck", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setPasses", "args": [{ "type": "uint64", "name": "id" }, { "type": "address[]", "name": "addresses" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "triggerList", "args": [{ "type": "(address,uint64[])[]", "name": "req" }], "returns": { "type": "bool[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "address", "desc": "The address to be checked" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "isBlocked checks if an address is blocked for a merchant", "events": [], "recommendations": {} }, { "name": "isShutdown", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "serviceIsActive checks if an service is shutdown", "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "blockCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getService", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])", "struct": "Service" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServicesByAddress", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "start" }, { "type": "uint64", "name": "windowSize" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfoWithExistence" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionWithDetails", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", "struct": "SubscriptionInfoWithDetails" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFirstSubscription", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServiceList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 1 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow to use" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "subscriptions": { "keyType": "SubscriptionKey", "valueType": "SubscriptionInfo", "prefix": "cw==" }, "subscriptionslist": { "keyType": "address", "valueType": "uint64", "desc": "A counter for each addresses subscription id", "prefix": "bA==" }, "services": { "keyType": "ServicesKey", "valueType": "Service", "desc": "services is a map of services a specific merchant has\ndenoted by the merchant address + index of the offer as a key\n32 + 8 = 40 bytes\n120 bytes total -> (2500 + (400 * 121)) = 0.050500", "prefix": "bw==" }, "serviceslist": { "keyType": "address", "valueType": "uint64", "prefix": "bQ==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "blocks allow merchants to specify which addresses cannot subscribe\nkey will be merchant address + blocked address\n32 + 32 = 64 bytes\n65 bytes total -> (2500 + (400 * 64)) = 0.028500", "prefix": "Yg==" }, "passes": { "keyType": "SubscriptionKey", "valueType": "address[]", "prefix": "cA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2789, 2859, 5576, 5857], "errorMessage": "Asset mismatch" }, { "pc": [1432, 1859, 1963, 2004, 2963, 4097, 4393, 4660, 4907, 4941, 5281, 5350, 5500, 6184, 6359, 6487], "errorMessage": "Box must have value" }, { "pc": [627, 1011, 1142, 6660], "errorMessage": "Bytes has valid prefix" }, { "pc": [6352], "errorMessage": "Cannot trigger payment at this time" }, { "pc": [1900], "errorMessage": "Description length exceeds maximum" }, { "pc": [3366], "errorMessage": "Donations aren't applicable to passes" }, { "pc": [6680], "errorMessage": "Escrow does not exist" }, { "pc": [2361, 2607, 3263], "errorMessage": "Gate check failed" }, { "pc": [1806], "errorMessage": "Group index out of bounds" }, { "pc": [5144], "errorMessage": "Invalid app upgrade" }, { "pc": [2867], "errorMessage": "Invalid asset receiver" }, { "pc": [1923], "errorMessage": "Invalid description offset" }, { "pc": [1597, 2195, 2797, 5009, 5698, 6012], "errorMessage": "Invalid payment" }, { "pc": [865, 5394, 5436], "errorMessage": "Invalid percentage" }, { "pc": [1723, 1728, 1759, 1852], "errorMessage": "Invalid sequence of calls in group" }, { "pc": [6031], "errorMessage": "Invalid transfer" }, { "pc": [5232, 5268], "errorMessage": "Length must be 16" }, { "pc": [1469], "errorMessage": "Maximum number of passes is five" }, { "pc": [1457, 2307, 2429, 2553, 2687], "errorMessage": "Minimum amount is 3 base units" }, { "pc": [1463, 2313, 2434, 2559, 2692], "errorMessage": "Minimum interval is 60 seconds" }, { "pc": [3393], "errorMessage": "More addresses than available passes" }, { "pc": [2315, 2561, 3220], "errorMessage": "Not a service" }, { "pc": [2930], "errorMessage": "Not enough funds in escrow" }, { "pc": [1527], "errorMessage": "Not opted into asset" }, { "pc": [183], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [500], "errorMessage": "OnCompletion must be UpdateApplication && can only call when not creating" }, { "pc": [5093, 5133, 5174], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [1878, 2020, 2056, 2093, 2130, 2329, 2451, 2575, 2709, 3231, 3376, 3943, 4018, 4571, 5560, 5837], "errorMessage": "Service does not exist" }, { "pc": [1746], "errorMessage": "Service not activated" }, { "pc": [2064, 5568, 5845], "errorMessage": "Service offering is not active" }, { "pc": [1886, 2028], "errorMessage": "Service offering is not in draft status" }, { "pc": [2102], "errorMessage": "Service offering is not paused" }, { "pc": [2138, 3391], "errorMessage": "Service offering is shutdown" }, { "pc": [2780, 2846, 2920, 3023, 3350, 4494, 4523], "errorMessage": "Subscription does not exist" }, { "pc": [3430, 5537, 5814], "errorMessage": "This account is blocked by the recipient" }, { "pc": [2458, 2716], "errorMessage": "This has a gate" }, { "pc": [1480], "errorMessage": "Title exceeds maximum length" }, { "pc": [2178], "errorMessage": "User is already blocked" }, { "pc": [2223], "errorMessage": "User is not blocked" }, { "pc": [6689], "errorMessage": "Wrong escrow for this operation" }, { "pc": [793, 948, 1041, 1058, 1064, 1166, 1534, 1605, 3861, 4983, 5050, 5091, 5129, 5172, 5706, 5975, 6130, 6405, 6521, 6741, 6763, 6841], "errorMessage": "application exists" }, { "pc": [1484, 1531, 1562, 1602, 2338, 2350, 2584, 2596, 3240, 3252, 3823, 3858, 3880, 3976, 4976, 4980, 5043, 5047, 5084, 5121, 5165, 5374, 5661, 5703, 5944, 5972, 6127, 6402, 6518, 6581, 6684, 6760, 6838], "errorMessage": "check GlobalState exists" }, { "pc": [3415, 3512, 3565], "errorMessage": "index access is out of bounds" }, { "pc": [6673], "errorMessage": "invalid number of bytes for (len+(uint64,bool1)[])" }, { "pc": [3332], "errorMessage": "invalid number of bytes for (len+uint8[32][])" }, { "pc": [637, 1799], "errorMessage": "invalid number of bytes for (len+uint8[])" }, { "pc": [1269, 1380, 5112], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [3198, 3278, 3293, 4266, 4485, 4514], "errorMessage": "invalid number of bytes for (uint8[32],uint64)" }, { "pc": [1016, 1147, 1280, 1289, 1329, 1338, 1347, 1356, 1365, 1783, 2042, 2079, 2116, 2282, 2291, 2300, 2397, 2407, 2419, 2528, 2537, 2546, 2655, 2665, 2677, 2756, 2831, 2890, 2899, 3007, 3308, 3770, 3818, 3911, 3920, 4007, 4049, 4059, 4971, 5038, 5077, 5158], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1400], "errorMessage": "invalid number of bytes for uint8" }, { "pc": [2162, 2208, 2274, 2389, 2520, 2647, 3724, 3732, 3762, 3903, 3999, 4041, 4865, 4893, 4927], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [1392], "errorMessage": "invalid number of bytes for uint8[36]" }, { "pc": [1409], "errorMessage": "invalid number of bytes for uint8[3]" }, { "pc": [4809, 4826], "errorMessage": "invalid size" }, { "pc": [4667], "errorMessage": "max array length exceeded" }, { "pc": [2266, 2512, 3189], "errorMessage": "transaction type is appl" }, { "pc": [2501, 2639, 2823], "errorMessage": "transaction type is axfer" }, { "pc": [1321, 2154, 2255, 2381, 2489, 2628, 2748, 4963], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMTAwMDAwIDE4OTAwIDYwNTAwIDQ3OTQwMCA2MDYwMCA0OTcwMAogICAgYnl0ZWNibG9jayAweDE1MWY3Yzc1ICJha2l0YV9kYW8iICJvIiAiYWtpdGFfZXNjcm93IiAicyIgImIiICJtIiAweDAwMDAgMHgwMCAibCIgMHgxNCAweDI4ICJ3YWxsZXQiICJwIiAiYWFsIiAic3Vic2NyaXB0aW9uX2ZlZXMiIDB4MGEgMHg4MCAweDRiZDYyMWQ4IDB4MTc5NWEwZDAgMHhjODgzNTEzMCAweDI4MWI4OTFiIDB4Mzk0ZWFlYjIgMHgwMDAxICJ2ZXJzaW9uIiAicmV2X3N1YnNjcmlwdGlvbnMiICJwYWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBleHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9ucyBleHRlbmRzIGNsYXNzZXMoQmFzZVN1YnNjcmlwdGlvbnMsIEFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2CiAgICAvLyBleHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9ucyBleHRlbmRzIGNsYXNzZXMoQmFzZVN1YnNjcmlwdGlvbnMsIEFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEA0NwogICAgYnl0ZWMgMTggLy8gbWV0aG9kICJuZXdTZXJ2aWNlKHBheSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdKXVpbnQ2NCIKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAic2V0U2VydmljZURlc2NyaXB0aW9uKHVpbnQ2NCxieXRlW10pdm9pZCIKICAgIGJ5dGVjIDIwIC8vIG1ldGhvZCAiYWN0aXZhdGVTZXJ2aWNlKCl2b2lkIgogICAgcHVzaGJ5dGVzcyAweDE3Yzg3MzBiIDB4NGNkZjBjZDcgMHg4N2UwNTVjNiAweGI1OWM4YTU0IDB4YWVlYmIzNzggMHg1MzU1ZGE2ZCAweDEwZjAwYzNhIDB4YTY4ZTY5NjMgMHhiMTBhMzA2ZSAweGYyMzU1YjU1IDB4MWFjNGE3NTggMHhlM2FlYjI1YyAweGVhYWFhNGQzIC8vIG1ldGhvZCAicGF1c2VTZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnBhdXNlU2VydmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAic2h1dGRvd25TZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJibG9jayhwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1bmJsb2NrKGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmUocGF5LGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImdhdGVkU3Vic2NyaWJlQXNhKHBheSxheGZlcixhcHBsLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJzdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJkZXBvc2l0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGVwb3NpdEFzYShheGZlcix1aW50NjQpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXcodWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnN1YnNjcmliZSh1aW50NjQpdm9pZCIKICAgIGJ5dGVjIDIxIC8vIG1ldGhvZCAiZ2F0ZWRUcmlnZ2VyUGF5bWVudChhcHBsLChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhjM2Q5ZjFkYyAweGMwZmYyNzMwIDB4Mjc1MjAzYWYgMHgxMjY5ZDg3ZSAweDQzMDM2NjhlIDB4MGQ2YTQ3YTMgMHgxZGM3ODM3MSAweDA5YTMxNThlIDB4Zjk5OTYzZDQgMHgxYTEzNmY3YyAweGUyZDM3MDBhIDB4MjViODEyYTcgMHg5NjljZWQ5YiAweDJmZmM5NmQ1IDB4NjAzZDcyOTcgMHhkZmU2MDJjZiAweGQ4YTZjNTIzIC8vIG1ldGhvZCAidHJpZ2dlclBheW1lbnQoKGFkZHJlc3MsdWludDY0KSl2b2lkIiwgbWV0aG9kICJzdHJlYWtDaGVjaygoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInNldFBhc3Nlcyh1aW50NjQsYWRkcmVzc1tdKXZvaWQiLCBtZXRob2QgInRyaWdnZXJMaXN0KChhZGRyZXNzLHVpbnQ2NFtdKVtdKWJvb2xbXSIsIG1ldGhvZCAiaXNCbG9ja2VkKGFkZHJlc3MsYWRkcmVzcylib29sIiwgbWV0aG9kICJpc1NodXRkb3duKGFkZHJlc3MsdWludDY0KWJvb2wiLCBtZXRob2QgIm5ld1NlcnZpY2VDb3N0KHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm5ld1N1YnNjcmlwdGlvbkNvc3QoYWRkcmVzcyx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiYmxvY2tDb3N0KCl1aW50NjQiLCBtZXRob2QgImdldFNlcnZpY2UoYWRkcmVzcyx1aW50NjQpKHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsc3RyaW5nLHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdKSIsIG1ldGhvZCAiZ2V0U2VydmljZXNCeUFkZHJlc3MoYWRkcmVzcyx1aW50NjQsdWludDY0KSh1aW50OCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHN0cmluZyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSlbXSIsIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uKChhZGRyZXNzLHVpbnQ2NCkpKGJvb2wsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm11c3RHZXRTdWJzY3JpcHRpb24oKGFkZHJlc3MsdWludDY0KSkoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzKChhZGRyZXNzLHVpbnQ2NCkpKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDgsc3RyaW5nLHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3NbXSkiLCBtZXRob2QgImlzRmlyc3RTdWJzY3JpcHRpb24oYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRTZXJ2aWNlTGlzdChhZGRyZXNzKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uTGlzdChhZGRyZXNzKXVpbnQ2NCIKICAgIGJ5dGVjIDIyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgcHVzaGJ5dGVzcyAweDMzZjc4ODA4IDB4MWVhZDIwYTkgMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAib3B0SW5Db3N0KHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG5ld1NlcnZpY2Ugc2V0U2VydmljZURlc2NyaXB0aW9uIGFjdGl2YXRlU2VydmljZSBwYXVzZVNlcnZpY2UgdW5wYXVzZVNlcnZpY2Ugc2h1dGRvd25TZXJ2aWNlIGJsb2NrIHVuYmxvY2sgZ2F0ZWRTdWJzY3JpYmUgc3Vic2NyaWJlIGdhdGVkU3Vic2NyaWJlQXNhIHN1YnNjcmliZUFzYSBkZXBvc2l0IGRlcG9zaXRBc2Egd2l0aGRyYXcgdW5zdWJzY3JpYmUgZ2F0ZWRUcmlnZ2VyUGF5bWVudCB0cmlnZ2VyUGF5bWVudCBzdHJlYWtDaGVjayBzZXRQYXNzZXMgdHJpZ2dlckxpc3QgaXNCbG9ja2VkIGlzU2h1dGRvd24gbmV3U2VydmljZUNvc3QgbmV3U3Vic2NyaXB0aW9uQ29zdCBtYWluX2Jsb2NrQ29zdF9yb3V0ZUAzMiBnZXRTZXJ2aWNlIGdldFNlcnZpY2VzQnlBZGRyZXNzIGdldFN1YnNjcmlwdGlvbiBtdXN0R2V0U3Vic2NyaXB0aW9uIGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzIGlzRmlyc3RTdWJzY3JpcHRpb24gZ2V0U2VydmljZUxpc3QgZ2V0U3Vic2NyaXB0aW9uTGlzdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDQ1CiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA0NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQzCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2Jsb2NrQ29zdF9yb3V0ZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMDNkNTQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEA0NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYKICAgIC8vIGV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Vic2NyaXB0aW9ucywgQWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbikgewogICAgcHVzaGJ5dGVzIDB4ODhjOTQwZjggLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHVpbnQ2NCx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIG11c3QgYmUgVXBkYXRlQXBwbGljYXRpb24gJiYgY2FuIG9ubHkgY2FsbCB3aGVuIG5vdCBjcmVhdGluZwogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PclR4blNlbmRlcih3YWxsZXRJRDogdWludDY0KSAtPiBieXRlczoKb3JpZ2luT3JUeG5TZW5kZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICBmcmFtZV9kaWcgMAoKb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PckA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIHN3YXAKICAgIHJldHN1YgoKb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjUtMTY4CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NwogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBwdXNoYnl0ZXMgImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY1LTE2OAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTUwCiAgICAvLyByZXR1cm4gb3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIG9yaWdpbk9yVHhuU2VuZGVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6b3JpZ2luT3JANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXRJRDogdWludDY0KSAtPiBieXRlczoKcmVmZXJyZXJPclplcm9BZGRyZXNzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0SUQ6IEFwcGxpY2F0aW9uKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiByZWZlcnJlck9yWmVyb0FkZHJlc3NfYWZ0ZXJfaWZfZWxzZUAzCiAgICBmcmFtZV9kaWcgMAoKcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBzd2FwCiAgICByZXRzdWIKCnJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc1CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3My0xNzYKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGIgcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NAogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0IC8vIDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODYtMTg5CiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4W10pCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBiIGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnYXRlQ2hlY2soZ2F0ZVR4bjogdWludDY0LCBha2l0YURBTzogdWludDY0LCBjYWxsZXI6IGJ5dGVzLCBpZDogdWludDY0KSAtPiB1aW50NjQ6CmdhdGVDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGNhbGxlcjogQWNjb3VudCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDE0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MCAvLyA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM0CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzUKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQgLy8gNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMSAvLyAxCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzOAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC00CiAgICBwdXNoaW50IDIgLy8gMgogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzOAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMyLTIzOQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMi0yMzkKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJhbEZlZShha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJlZmVycmFsRmVlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWZlcnJhbEZlZShha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODEKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTgyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXQpCiAgICBjYWxsc3ViIHJlZmVycmVyT3JaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODQKICAgIC8vIGlmIChyZWZlcnJlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiByZWZlcnJhbEZlZV9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpyZWZlcnJhbEZlZV9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDE0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ4NgogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg3CiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zTGVuZ3RoKQogICAgaW50YyA4IC8vIDYwNjAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDg5CiAgICAvLyBpZiAoYXNzZXQgIT09IDAgJiYgIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcmVmZXJyYWxGZWVfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHJlZmVycmFsRmVlX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0ODcKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDggLy8gNjA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDkwCiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnJlZmVycmFsRmVlX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTg4CiAgICAvLyByZXR1cm4gY29zdEluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU8sIGFzc2V0LCAxKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkyCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8oYWtpdGFEQU8sIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MwogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0KQogICAgY2FsbHN1YiByZWZlcnJlck9yWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTk2CiAgICAvLyBpZiAoYW1vdW50ID4gMCAmJiByZWZlcnJlciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgNgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgKICAgIC8vIGNvbnN0IFt3YWxsZXRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0RmVlcykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAid2FsbGV0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5OAogICAgLy8gY29uc3QgeyByZWZlcnJlclBlcmNlbnRhZ2UgfSA9IGdldFdhbGxldEZlZXMoYWtpdGFEQU8pCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIEludmFsaWQgcGVyY2VudGFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMQogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDIKICAgIC8vIHJlZmVycmFsRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMwoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDkKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgcHVzaGludCA2MDQ4MDAgLy8gNjA0ODAwCiAgICArCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEwCiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAzCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAyMyAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgMTQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIwCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjMKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDI1MzAwIC8vIDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDM1MzAwIC8vIDM1MzAwCiAgICArCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI0CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfZWxzZV9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjkKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzAKICAgIC8vIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI4LTUzMQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzIKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4N2I3ZGM1ZmMgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGdpdHhuIDEgTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzcKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIGl0b2IKICAgIGZyYW1lX2RpZyAxCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA1LTYxMwogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE1CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9kaWcgMwogICAgLQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc2VuZFJlZmVycmFsUGF5bWVudF9lbHNlX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOAogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBmcmFtZV9kaWcgNAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDE0CiAgICBmcmFtZV9kaWcgMQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgNAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2Mi01NzQKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjYKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjUtNTY4CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2OQogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAzCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUyLTU1NgogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0IC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzAKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2Mi01NzQKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YWYxYTE0ZjIgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGdpdHhuIDIgTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICBiIHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKc2VuZFJlZmVycmFsUGF5bWVudF9pZl9ib2R5QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzkKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ0CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyA0CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ1CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDMtNTQ2CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAtNTQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ3CiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAtNTQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBieXRlYyAyMiAvLyBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTUKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTgKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjIKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI0CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjUKICAgIC8vIGNvdW50ICs9IDEKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyOAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgKwogICAgZnJhbWVfYnVyeSAwCgpzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEKICAgIC8vIHJldHVybiBjb3VudAogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDI0IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NjYKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGFraXRhREFPRXNjcm93CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U2VydmljZToKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDIKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwNy01MTgKICAgIC8vIG5ld1NlcnZpY2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIHBhc3NlczogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgYmFubmVySW1hZ2U6IENJRCwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZTogVWludDgsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yOiBieXRlczwzPgogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDM2IC8vIDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszNl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMgLy8gMwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbM10KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgNiAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTE5CiAgICAvLyBjb25zdCBuZWVkc1NlcnZpY2VzTGlzdEJveE1iciA9ICF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUxOQogICAgLy8gY29uc3QgbmVlZHNTZXJ2aWNlc0xpc3RCb3hNYnIgPSAhdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgNiAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3U2VydmljZUlEKFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE4OQogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE4OS0xOTEKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIC8vICAgPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZQogICAgLy8gICA6IDEKICAgIGJ6IG5ld1NlcnZpY2VfdGVybmFyeV9mYWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCm5ld1NlcnZpY2VfdGVybmFyeV9tZXJnZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkyCiAgICAvLyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZSA9IGlkICsgMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZGlnIDIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgMjIKICAgIGNvbmNhdAogICAgYnVyeSAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjQKICAgIC8vIGFzc2VydChhbW91bnQgPj0gTUlOX0FNT1VOVCwgRVJSX01JTl9BTU9VTlRfSVNfVEhSRUUpCiAgICBkaWcgOAogICAgcHVzaGludCA0IC8vIDQKICAgID49CiAgICBhc3NlcnQgLy8gTWluaW11bSBhbW91bnQgaXMgMyBiYXNlIHVuaXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNgogICAgLy8gYXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgRVJSX01JTl9JTlRFUlZBTF9JU19TSVhUWSkKICAgIGRpZyAxMAogICAgcHVzaGludCA2MCAvLyA2MAogICAgPj0KICAgIGFzc2VydCAvLyBNaW5pbXVtIGludGVydmFsIGlzIDYwIHNlY29uZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI4CiAgICAvLyBhc3NlcnQocGFzc2VzIDw9IE1BWF9QQVNTRVMsIEVSUl9NQVhfUEFTU0VTX0lTX0ZJVkUpCiAgICBkaWcgNwogICAgcHVzaGludCA1IC8vIDUKICAgIDw9CiAgICBhc3NlcnQgLy8gTWF4aW11bSBudW1iZXIgb2YgcGFzc2VzIGlzIGZpdmUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyBhc3NlcnQoQnl0ZXModGl0bGUpLmxlbmd0aCA8PSBNQVhfVElUTEVfTEVOR1RILCBFUlJfVElUTEVfVE9PX0xPTkcpCiAgICBkaWcgNQogICAgbGVuCiAgICBkdXAKICAgIGJ1cnkgMTQKICAgIHB1c2hpbnQgMTI4IC8vIDEyOAogICAgPD0KICAgIGFzc2VydCAvLyBUaXRsZSBleGNlZWRzIG1heGltdW0gbGVuZ3RoCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzMQogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTMxCiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAxNSAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzMQogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gbGV0IHJlcXVpcmVkQW1vdW50OiB1aW50NjQgPSBzZXJ2aWNlQ3JlYXRpb25GZWUgKyBjb3N0cy5zZXJ2aWNlcwogICAgaW50YyA5IC8vIDQ5NzAwCiAgICArCiAgICBidXJ5IDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNQogICAgLy8gaWYgKG5lZWRzU2VydmljZXNMaXN0Qm94TWJyKSB7CiAgICBkaWcgMQogICAgYm56IG5ld1NlcnZpY2VfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gcmVxdWlyZWRBbW91bnQgKz0gY29zdHMuc2VydmljZXNsaXN0CiAgICBkaWcgMTQKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgYnVyeSAxNQoKbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBkaWcgOQogICAgYnogbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM5CiAgICAvLyBhc3NlcnQoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSksIEVSUl9OT1RfT1BURURfSU4pCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDEwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gTm90IG9wdGVkIGludG8gYXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyBpZiAoIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDEKICAgIC8vIGlmICghdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBuZXdTZXJ2aWNlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIHJlcXVpcmVkQW1vdW50ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZGlnIDE0CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIGJ1cnkgMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKEFraXRhREFPRXNjcm93QWNjb3VudFN1YnNjcmlwdGlvbnMsIEFzc2V0KGFzc2V0KSwgMCkKICAgIGJ5dGVjIDI1IC8vICJyZXZfc3Vic2NyaXB0aW9ucyIKICAgIGRpZyAxMAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQKICAgIHBvcAoKbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0NwogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXQsIHNlcnZpY2VDcmVhdGlvbkZlZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldCwgc2VydmljZUNyZWF0aW9uRmVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMTYKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDktNTU2CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHJlcXVpcmVkQW1vdW50ICsgcmVmZXJyYWxNYnIsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAxNAogICAgZHVwCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0OS01NTYKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbE1iciwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NTMKICAgIC8vIGFtb3VudDogcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbE1iciwKICAgIGRpZyAxOQogICAgdW5jb3ZlciAzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0OS01NTYKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbE1iciwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU1OC01NjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTYwCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NjAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTU4LTU2MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU1OC01NjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2NS01NzcKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBwYXNzZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJywKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yCiAgICAvLyB9CiAgICBkaWcgMTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY2CiAgICAvLyBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIGJ5dGVjIDE2IC8vIDB4MGEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY1LTU3NwogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIHBhc3NlcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb246ICcnLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IKICAgIC8vIH0KICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgOQogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgOAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNwogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMTMKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBkaWcgNwogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDU1CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgODUgLy8gODUKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIGRpZyA2CiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBjb25jYXQKICAgIGRpZyA0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgNyAvLyAweDAwMDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgZGlnIDIwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY1LTU3NwogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIHBhc3NlcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb246ICcnLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NAogICAgLy8gbGV0IGFjdGl2YXRlZCA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IChUeG4uZ3JvdXBJbmRleCArIDEpOyBpIDwgR2xvYmFsLmdyb3VwU2l6ZTsgaSArPSAxKSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMTYKCm5ld1NlcnZpY2Vfd2hpbGVfdG9wQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gKFR4bi5ncm91cEluZGV4ICsgMSk7IGkgPCBHbG9iYWwuZ3JvdXBTaXplOyBpICs9IDEpIHsKICAgIGRpZyAxNQogICAgZ2xvYmFsIEdyb3VwU2l6ZQogICAgPAogICAgYnogbmV3U2VydmljZV9ibG9ja0AxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGlmICh0eG4udHlwZSAhPT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCkgewogICAgZGlnIDE1CiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIDYKICAgICE9CiAgICBibnogbmV3U2VydmljZV9ibG9ja0AxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIGFzc2VydCh0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCwgRVJSX0lOVkFMSURfU0VRVUVOQ0UpCiAgICBkaWcgMTUKICAgIGR1cAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgYXNzZXJ0IC8vIEludmFsaWQgc2VxdWVuY2Ugb2YgY2FsbHMgaW4gZ3JvdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDgzCiAgICAvLyBhc3NlcnQodHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wLCBFUlJfSU5WQUxJRF9TRVFVRU5DRSkKICAgIGR1cAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gSW52YWxpZCBzZXF1ZW5jZSBvZiBjYWxscyBpbiBncm91cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIGlmICh0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5hY3RpdmF0ZVNlcnZpY2UpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGR1cAogICAgYnVyeSAxOQogICAgYnl0ZWMgMjAgLy8gbWV0aG9kICJhY3RpdmF0ZVNlcnZpY2UoKXZvaWQiCiAgICA9PQogICAgYnogbmV3U2VydmljZV9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gYWN0aXZhdGVkID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgMTcKCm5ld1NlcnZpY2VfYmxvY2tAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5MwogICAgLy8gYXNzZXJ0KGFjdGl2YXRlZCwgRVJSX1NFUlZJQ0VfTk9UX0FDVElWQVRFRCkKICAgIGRpZyAxNgogICAgYXNzZXJ0IC8vIFNlcnZpY2Ugbm90IGFjdGl2YXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDctNTE4CiAgICAvLyBuZXdTZXJ2aWNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwYXNzZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIGJhbm5lckltYWdlOiBDSUQsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LAogICAgLy8gICBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4KICAgIC8vICk6IHVpbnQ2NCB7CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIGRpZyAyMAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1NlcnZpY2VfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBhc3NlcnQodHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuc2V0U2VydmljZURlc2NyaXB0aW9uKSwgRVJSX0lOVkFMSURfU0VRVUVOQ0UpCiAgICBkaWcgMTcKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAic2V0U2VydmljZURlc2NyaXB0aW9uKHVpbnQ2NCxieXRlW10pdm9pZCIKICAgID09CiAgICBhc3NlcnQgLy8gSW52YWxpZCBzZXF1ZW5jZSBvZiBjYWxscyBpbiBncm91cAoKbmV3U2VydmljZV9ibG9ja0AxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAoVHhuLmdyb3VwSW5kZXggKyAxKTsgaSA8IEdsb2JhbC5ncm91cFNpemU7IGkgKz0gMSkgewogICAgZGlnIDE1CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxNgogICAgYiBuZXdTZXJ2aWNlX3doaWxlX3RvcEA5CgpuZXdTZXJ2aWNlX3Rlcm5hcnlfZmFsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MQogICAgLy8gOiAxCiAgICBpbnRjXzEgLy8gMQogICAgYiBuZXdTZXJ2aWNlX3Rlcm5hcnlfbWVyZ2VAMjEKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNldFNlcnZpY2VEZXNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldFNlcnZpY2VEZXNjcmlwdGlvbjoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyBzZXRTZXJ2aWNlRGVzY3JpcHRpb24ob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdWludDhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gYXNzZXJ0KFR4bi5ncm91cEluZGV4ID4gMCwgRVJSX0dST1VQX0lOREVYX09VVF9PRl9CT1VORFMpCiAgICB0eG4gR3JvdXBJbmRleAogICAgYXNzZXJ0IC8vIEdyb3VwIGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg2CiAgICAvLyBjb25zdCBwcmV2aW91c0NhbGxzOiB1aW50NjQgPSBvZmZzZXQgLyBNQVhfREVTQ1JJUFRJT05fQ0hVTktfU0laRQogICAgcHVzaGludCAyMDM0IC8vIDIwMzQKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg3CiAgICAvLyBjb25zdCBuZXdTZXJ2aWNlVHhuSW5kZXg6IHVpbnQ2NCA9IFR4bi5ncm91cEluZGV4IC0gMSAtIHByZXZpb3VzQ2FsbHMKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgc3dhcAogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTkxLTU5MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwgJiYKICAgIC8vIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkICYmCiAgICBieiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIGR1cAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTEtNTkyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJgogICAgLy8gdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIGJ6IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9ib29sX2ZhbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGR1cAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MS01OTMKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsICYmCiAgICAvLyB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgLy8gdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2Jvb2xfZmFsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLm5ld1NlcnZpY2UpLAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDE4IC8vIG1ldGhvZCAibmV3U2VydmljZShwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSl1aW50NjQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTEtNTk0CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJgogICAgLy8gdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQgJiYKICAgIC8vIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMubmV3U2VydmljZSksCiAgICBieiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKc2V0U2VydmljZURlc2NyaXB0aW9uX2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTkwLTU5NgogICAgLy8gYXNzZXJ0KAogICAgLy8gICB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCAmJgogICAgLy8gICB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCAmJgogICAgLy8gICB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMubmV3U2VydmljZSksCiAgICAvLyAgIEVSUl9JTlZBTElEX1NFUVVFTkNFCiAgICAvLyApCiAgICBhc3NlcnQgLy8gSW52YWxpZCBzZXF1ZW5jZSBvZiBjYWxscyBpbiBncm91cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyA2IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS52YWx1ZSAtIDEKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5OAogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLnZhbHVlIC0gMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwMQogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTZXJ2aWNlIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwMgogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNEcmFmdCwgRVJSX1NFUlZJQ0VfSVNfTk9UX0RSQUZUKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBieXRlYyAxNiAvLyAweDBhCiAgICA9PQogICAgYXNzZXJ0IC8vIFNlcnZpY2Ugb2ZmZXJpbmcgaXMgbm90IGluIGRyYWZ0IHN0YXR1cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MDMKICAgIC8vIGFzc2VydChvZmZzZXQgKyBkYXRhLmxlbmd0aCA8PSBNQVhfREVTQ1JJUFRJT05fTEVOR1RILCBFUlJfQkFEX0RFU0NSSVBUSU9OX0xFTkdUSCkKICAgIGRpZyAyCiAgICBsZW4KICAgIGRpZyA0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIHB1c2hpbnQgMzE1MSAvLyAzMTUxCiAgICA8PQogICAgYXNzZXJ0IC8vIERlc2NyaXB0aW9uIGxlbmd0aCBleGNlZWRzIG1heGltdW0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjA1CiAgICAvLyBsZXQgZGVzY0J5dGVzID0gQnl0ZXModGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlLmRlc2NyaXB0aW9uKQogICAgYm94X2dldAogICAgcG9wCiAgICBkdXAKICAgIHB1c2hpbnQgNDMgLy8gNDMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwNwogICAgLy8gYXNzZXJ0KG9mZnNldCA8PSBkZXNjQnl0ZXMubGVuZ3RoLCBFUlJfQkFEX09GRlNFVCkKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDcKICAgIGR1cDIKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBkZXNjcmlwdGlvbiBvZmZzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjA5CiAgICAvLyBpZiAob2Zmc2V0IDwgZGVzY0J5dGVzLmxlbmd0aCkgewogICAgPAogICAgYnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIGRlc2NCeXRlcyA9IGRlc2NCeXRlcy5zbGljZSgwLCBvZmZzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyA1CiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwoKc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuZGVzY3JpcHRpb24gPSBTdHJpbmcoZGVzY0J5dGVzLmNvbmNhdChkYXRhKSkKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIGRpZyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBwdXNoaW50IDQzIC8vIDQzCiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0MwogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NAogICAgLy8gc2V0U2VydmljZURlc2NyaXB0aW9uKG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc2V0U2VydmljZURlc2NyaXB0aW9uX2Jvb2xfZmFsc2VANjoKICAgIGludGNfMCAvLyAwCiAgICBiIHNldFNlcnZpY2VEZXNjcmlwdGlvbl9ib29sX21lcmdlQDcKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmFjdGl2YXRlU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFjdGl2YXRlU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgNiAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIwCiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikudmFsdWUgLSAxCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjAKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS52YWx1ZSAtIDEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjIKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTZXJ2aWNlIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNEcmFmdCwgRVJSX1NFUlZJQ0VfSVNfTk9UX0RSQUZUKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBieXRlYyAxNiAvLyAweDBhCiAgICA9PQogICAgYXNzZXJ0IC8vIFNlcnZpY2Ugb2ZmZXJpbmcgaXMgbm90IGluIGRyYWZ0IHN0YXR1cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPSBTZXJ2aWNlU3RhdHVzQWN0aXZlCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE5CiAgICAvLyBhY3RpdmF0ZVNlcnZpY2UoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5wYXVzZVNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpwYXVzZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzNwogICAgLy8gcGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzOAogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFNlcnZpY2UgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQyCiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c0FjdGl2ZSwgRVJSX1NFUlZJQ0VfSVNfTk9UX0FDVElWRSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIGFzc2VydCAvLyBTZXJ2aWNlIG9mZmVyaW5nIGlzIG5vdCBhY3RpdmUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c1BhdXNlZAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAweDFlCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIHBhdXNlU2VydmljZShpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51bnBhdXNlU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVucGF1c2VTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIHVucGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1MwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFNlcnZpY2UgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU4CiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1BhdXNlZCwgRVJSX1NFUlZJQ0VfSVNfTk9UX1BBVVNFRCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgcHVzaGJ5dGVzIDB4MWUKICAgID09CiAgICBhc3NlcnQgLy8gU2VydmljZSBvZmZlcmluZyBpcyBub3QgcGF1c2VkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNBY3RpdmUKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxMCAvLyAweDE0CiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIHVucGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNodXRkb3duU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNodXRkb3duU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjY4CiAgICAvLyBzaHV0ZG93blNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjY5CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzEKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU2VydmljZSBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzMKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzICE9PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24sIEVSUl9TRVJWSUNFX0lTX1NIVVRET1dOKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBieXRlYyAxMSAvLyAweDI4CiAgICAhPQogICAgYXNzZXJ0IC8vIFNlcnZpY2Ugb2ZmZXJpbmcgaXMgc2h1dGRvd24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc1CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTEgLy8gMHgyOAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjY4CiAgICAvLyBzaHV0ZG93blNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgpibG9jazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NQogICAgLy8gY29uc3QgYm94S2V5ID0gdGhpcy5nZXRCbG9ja0tleShUeG4uc2VuZGVyLCBibG9ja2VkKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2ODgKICAgIC8vIGFzc2VydCghdGhpcy5ibG9ja3MoYm94S2V5KS5leGlzdHMsIEVSUl9VU0VSX0FMUkVBRFlfQkxPQ0tFRCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAhCiAgICBhc3NlcnQgLy8gVXNlciBpcyBhbHJlYWR5IGJsb2NrZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkxLTY5OAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBjb3N0cy5ibG9ja3MsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTQKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5MS02OTgKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogY29zdHMuYmxvY2tzLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBhbW91bnQ6IGNvc3RzLmJsb2NrcywKICAgIHB1c2hpbnQgMTU3MDAgLy8gMTU3MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkxLTY5OAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBjb3N0cy5ibG9ja3MsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIHRoaXMuYmxvY2tzKGJveEtleSkuY3JlYXRlKCkKICAgIGludGNfMCAvLyAwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgp1bmJsb2NrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDcKICAgIC8vIHVuYmxvY2soYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gY29uc3QgYm94S2V5ID0gdGhpcy5nZXRCbG9ja0tleShUeG4uc2VuZGVyLCBibG9ja2VkKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIGFzc2VydCh0aGlzLmJsb2Nrcyhib3hLZXkpLmV4aXN0cywgRVJSX1VTRVJfTk9UX0JMT0NLRUQpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFVzZXIgaXMgbm90IGJsb2NrZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzEzCiAgICAvLyB0aGlzLmJsb2Nrcyhib3hLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzE3LTcyMAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogY29zdHMuYmxvY2tzCiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTgKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTkKICAgIC8vIGFtb3VudDogY29zdHMuYmxvY2tzCiAgICBwdXNoaW50IDE1NzAwIC8vIDE1NzAwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTctNzIwCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBjb3N0cy5ibG9ja3MKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDcKICAgIC8vIHVuYmxvY2soYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRTdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFN1YnNjcmliZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzIzLTczMAogICAgLy8gZ2F0ZWRTdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MzIKICAgIC8vIGFzc2VydChhbW91bnQgPj0gTUlOX0FNT1VOVCwgRVJSX01JTl9BTU9VTlRfSVNfVEhSRUUpCiAgICBkaWcgMgogICAgcHVzaGludCA0IC8vIDQKICAgID49CiAgICBhc3NlcnQgLy8gTWluaW11bSBhbW91bnQgaXMgMyBiYXNlIHVuaXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczNAogICAgLy8gYXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgRVJSX01JTl9JTlRFUlZBTF9JU19TSVhUWSkKICAgIGRpZyAxCiAgICBwdXNoaW50IDYwIC8vIDYwCiAgICA+PQogICAgYXNzZXJ0IC8vIE1pbmltdW0gaW50ZXJ2YWwgaXMgNjAgc2Vjb25kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MzYKICAgIC8vIGFzc2VydChzZXJ2aWNlSUQgIT09IDAsIEVSUl9OT1RfQV9TRVJWSUNFKQogICAgZHVwCiAgICBhc3NlcnQgLy8gTm90IGEgc2VydmljZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFNlcnZpY2UgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM4CiAgICAvLyBjb25zdCBnYXRlSUQgPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLmdhdGVJRAogICAgcHVzaGludCAzMyAvLyAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gY29uc3Qgd2FsbGV0ID0gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQxCiAgICAvLyBjb25zdCBvcmlnaW4gPSBvcmlnaW5PclR4blNlbmRlcih3YWxsZXQpCiAgICBjYWxsc3ViIG9yaWdpbk9yVHhuU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0MgogICAgLy8gYXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyBhc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNwogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBhc3NlcnQgLy8gR2F0ZSBjaGVjayBmYWlsZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ0CiAgICAvLyByZXR1cm4gdGhpcy5jcmVhdGVTdWJzY3JpcHRpb24ocGF5bWVudCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQpCiAgICBjYWxsc3ViIGNyZWF0ZVN1YnNjcmlwdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MjMtNzMwCiAgICAvLyBnYXRlZFN1YnNjcmliZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Vic2NyaWJlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDctNzUzCiAgICAvLyBzdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBhc3NlcnQoYW1vdW50ID49IE1JTl9BTU9VTlQsIEVSUl9NSU5fQU1PVU5UX0lTX1RIUkVFKQogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDQgLy8gNAogICAgPj0KICAgIGFzc2VydCAvLyBNaW5pbXVtIGFtb3VudCBpcyAzIGJhc2UgdW5pdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU3CiAgICAvLyBhc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBFUlJfTUlOX0lOVEVSVkFMX0lTX1NJWFRZKQogICAgc3dhcAogICAgcHVzaGludCA2MCAvLyA2MAogICAgPj0KICAgIGFzc2VydCAvLyBNaW5pbXVtIGludGVydmFsIGlzIDYwIHNlY29uZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU5CiAgICAvLyBpZiAoc2VydmljZUlEICE9PSAwKSB7CiAgICBieiBzdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MAogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MAogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU2VydmljZSBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjEKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBwdXNoaW50IDMzIC8vIDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyBhc3NlcnQoZ2F0ZUlEID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICAhCiAgICBhc3NlcnQgLy8gVGhpcyBoYXMgYSBnYXRlCgpzdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIHJldHVybiB0aGlzLmNyZWF0ZVN1YnNjcmlwdGlvbihwYXltZW50LCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCkKICAgIGRpZyA0CiAgICBkaWcgNAogICAgZGlnIDQKICAgIGRpZyA0CiAgICBkaWcgNAogICAgY2FsbHN1YiBjcmVhdGVTdWJzY3JpcHRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ3LTc1MwogICAgLy8gc3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdhdGVkU3Vic2NyaWJlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRTdWJzY3JpYmVBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2OC03NzYKICAgIC8vIGdhdGVkU3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMyAvLyAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3OAogICAgLy8gYXNzZXJ0KGFtb3VudCA+PSBNSU5fQU1PVU5ULCBFUlJfTUlOX0FNT1VOVF9JU19USFJFRSkKICAgIGRpZyAyCiAgICBwdXNoaW50IDQgLy8gNAogICAgPj0KICAgIGFzc2VydCAvLyBNaW5pbXVtIGFtb3VudCBpcyAzIGJhc2UgdW5pdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyBhc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBFUlJfTUlOX0lOVEVSVkFMX0lTX1NJWFRZKQogICAgZGlnIDEKICAgIHB1c2hpbnQgNjAgLy8gNjAKICAgID49CiAgICBhc3NlcnQgLy8gTWluaW11bSBpbnRlcnZhbCBpcyA2MCBzZWNvbmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gYXNzZXJ0KHNlcnZpY2VJRCAhPT0gMCwgRVJSX05PVF9BX1NFUlZJQ0UpCiAgICBkdXAKICAgIGFzc2VydCAvLyBOb3QgYSBzZXJ2aWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MwogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgaXRvYgogICAgZGlnIDQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MwogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU2VydmljZSBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODQKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBwdXNoaW50IDMzIC8vIDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg2CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg2CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODcKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg4CiAgICAvLyBhc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODgKICAgIC8vIGFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciA3CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGFzc2VydCAvLyBHYXRlIGNoZWNrIGZhaWxlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3OTAtNzk3CiAgICAvLyByZXR1cm4gdGhpcy5jcmVhdGVBc2FTdWJzY3JpcHRpb24oCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgcmVjaXBpZW50LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBzZXJ2aWNlSUQKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlQXNhU3Vic2NyaXB0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2OC03NzYKICAgIC8vIGdhdGVkU3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaWJlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Vic2NyaWJlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDAtODA3CiAgICAvLyBzdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwOQogICAgLy8gYXNzZXJ0KGFtb3VudCA+PSBNSU5fQU1PVU5ULCBFUlJfTUlOX0FNT1VOVF9JU19USFJFRSkKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA0IC8vIDQKICAgID49CiAgICBhc3NlcnQgLy8gTWluaW11bSBhbW91bnQgaXMgMyBiYXNlIHVuaXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxMQogICAgLy8gYXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgRVJSX01JTl9JTlRFUlZBTF9JU19TSVhUWSkKICAgIHN3YXAKICAgIHB1c2hpbnQgNjAgLy8gNjAKICAgID49CiAgICBhc3NlcnQgLy8gTWluaW11bSBpbnRlcnZhbCBpcyA2MCBzZWNvbmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxMwogICAgLy8gaWYgKHNlcnZpY2VJRCAhPT0gMCkgewogICAgYnogc3Vic2NyaWJlQXNhX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGl0b2IKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFNlcnZpY2UgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE1CiAgICAvLyBjb25zdCBnYXRlSUQgPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLmdhdGVJRAogICAgcHVzaGludCAzMyAvLyAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gYXNzZXJ0KGdhdGVJRCA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgIQogICAgYXNzZXJ0IC8vIFRoaXMgaGFzIGEgZ2F0ZQoKc3Vic2NyaWJlQXNhX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE5LTgyNgogICAgLy8gcmV0dXJuIHRoaXMuY3JlYXRlQXNhU3Vic2NyaXB0aW9uKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHJlY2lwaWVudCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgc2VydmljZUlECiAgICAvLyApCiAgICBkaWcgNQogICAgZGlnIDUKICAgIGRpZyA1CiAgICBkaWcgNQogICAgZGlnIDUKICAgIGRpZyA1CiAgICBjYWxsc3ViIGNyZWF0ZUFzYVN1YnNjcmlwdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDAtODA3CiAgICAvLyBzdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmRlcG9zaXRbcm91dGluZ10oKSAtPiB2b2lkOgpkZXBvc2l0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjkKICAgIC8vIGRlcG9zaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODMwCiAgICAvLyBjb25zdCBzdWJLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzIKICAgIC8vIGFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwLTEwMgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzMgogICAgLy8gYXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgRVJSX1NVQlNDUklQVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU3Vic2NyaXB0aW9uIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIGFzc2VydChzdWIuYXNzZXQgPT09IDAsIEVSUl9BU0FfTUlTTUFUQ0gpCiAgICBkdXAKICAgIHB1c2hpbnQgNjQgLy8gNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAhCiAgICBhc3NlcnQgLy8gQXNzZXQgbWlzbWF0Y2gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM4LTg0MgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDAKICAgIC8vIHsgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzIH0sCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzgtODQyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgeyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ0CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZS5lc2Nyb3dlZCArPSBwYXltZW50LmFtb3VudAogICAgcHVzaGludCA5NiAvLyA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDk2IC8vIDk2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjkKICAgIC8vIGRlcG9zaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmRlcG9zaXRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpkZXBvc2l0QXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDcKICAgIC8vIGRlcG9zaXRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBjb25zdCBzdWJLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTAKICAgIC8vIGFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFN1YnNjcmlwdGlvbiBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBwdXNoaW50IDY0IC8vIDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTQKICAgIC8vIGFzc2VydChhc3NldCA9PT0gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgRVJSX0FTQV9NSVNNQVRDSCkKICAgIGRpZyAzCiAgICBndHhucyBYZmVyQXNzZXQKICAgID09CiAgICBhc3NlcnQgLy8gQXNzZXQgbWlzbWF0Y2gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU2CiAgICAvLyBhc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9BU1NFVF9SRUNFSVZFUikKICAgIGRpZyAyCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBJbnZhbGlkIGFzc2V0IHJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg1OAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUuZXNjcm93ZWQgKz0gYXNzZXRYZmVyLmFzc2V0QW1vdW50CiAgICBwdXNoaW50IDk2IC8vIDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBndHhucyBBc3NldEFtb3VudAogICAgKwogICAgaXRvYgogICAgcHVzaGludCA5NiAvLyA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBkZXBvc2l0QXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLndpdGhkcmF3W3JvdXRpbmddKCkgLT4gdm9pZDoKd2l0aGRyYXc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg2MQogICAgLy8gd2l0aGRyYXcoaWQ6IFN1YnNjcmlwdGlvbklELCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NjIKICAgIC8vIGNvbnN0IHN1YktleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwLTEwMgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY0CiAgICAvLyBhc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBFUlJfU1VCU0NSSVBUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTdWJzY3JpcHRpb24gZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NjgKICAgIC8vIGFzc2VydChzdWIuZXNjcm93ZWQgPj0gYW1vdW50LCBFUlJfTk9UX0VOT1VHSF9GVU5EUykKICAgIGR1cAogICAgcHVzaGludCA5NiAvLyA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgPj0KICAgIGFzc2VydCAvLyBOb3QgZW5vdWdoIGZ1bmRzIGluIGVzY3JvdwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzAKICAgIC8vIGlmIChzdWIuYXNzZXQgIT09IDApIHsKICAgIHB1c2hpbnQgNjQgLy8gNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ6IHdpdGhkcmF3X2Vsc2VfYm9keUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3MS04NzcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODczCiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3MS04NzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgcHVzaGludCA0IC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzEtODc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODcKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlLmVzY3Jvd2VkIC09IGFtb3VudAogICAgZGlnIDEKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYgLy8gOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgNAogICAgLQogICAgaXRvYgogICAgcHVzaGludCA5NiAvLyA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODYxCiAgICAvLyB3aXRoZHJhdyhpZDogU3Vic2NyaXB0aW9uSUQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp3aXRoZHJhd19lbHNlX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc5LTg4NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4MQogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc5LTg4MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODc5LTg4NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDYKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5zdWJzY3JpYmU6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyB1bnN1YnNjcmliZShpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5MQogICAgLy8gY29uc3Qgc3ViS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAtMTAyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4OTMKICAgIC8vIGFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTdWJzY3JpcHRpb24gZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk1CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5OAogICAgLy8gbGV0IG1iclJlZnVuZDogdWludDY0ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA2IC8vIDYwNTAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5OQogICAgLy8gaWYgKHN1Yi5zZXJ2aWNlSUQgPiAwKSB7CiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDAKICAgIC8vIGNvbnN0IHsgcGFzc2VzIH0gPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogc3ViLnJlY2lwaWVudCwgaWQ6IHN1Yi5zZXJ2aWNlSUQgfSkudmFsdWUKICAgIGRpZyAyCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBpdG9iCiAgICBkdXAKICAgIGJ1cnkgOQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAwCiAgICAvLyBjb25zdCB7IHBhc3NlcyB9ID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHN1Yi5yZWNpcGllbnQsIGlkOiBzdWIuc2VydmljZUlEIH0pLnZhbHVlCiAgICBwdXNoaW50IDI1IC8vIDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBpZiAocGFzc2VzID4gMCAmJiB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmV4aXN0cykgewogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA2CiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTMgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBpZiAocGFzc2VzID4gMCAmJiB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAyCiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmRlbGV0ZSgpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTMgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAyCiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWIuc2VydmljZUlEIH0pLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAzCiAgICAvLyBtYnJSZWZ1bmQgKz0gY29zdHMucGFzc2VzCiAgICBpbnRjIDcgLy8gNDc5NDAwCiAgICBidXJ5IDIKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyBpZiAoc3ViLmFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMgogICAgcHVzaGludCA2NCAvLyA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA3CiAgICBieiB1bnN1YnNjcmliZV9lbHNlX2JvZHlAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA4CiAgICAvLyBpZiAoc3ViLmVzY3Jvd2VkID4gMCkgewogICAgZGlnIDIKICAgIHB1c2hpbnQgOTYgLy8gOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDktOTE1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMQogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDktOTE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA5LTkxNQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxOC05MjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogbWJyUmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxOC05MjIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogbWJyUmVmdW5kCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxOC05MjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogbWJyUmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZGVsZXRlKCkKICAgIGRpZyAzCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyB1bnN1YnNjcmliZShpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnVuc3Vic2NyaWJlX2Vsc2VfYm9keUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI1LTkzMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQgKyBtYnJSZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyOAogICAgLy8gYW1vdW50OiBzdWIuZXNjcm93ZWQgKyBtYnJSZWZ1bmQKICAgIGRpZyAzCiAgICBwdXNoaW50IDk2IC8vIDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNS05MjkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkICsgbWJyUmVmdW5kCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNS05MzAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkICsgbWJyUmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRUcmlnZ2VyUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkVHJpZ2dlclBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzNgogICAgLy8gZ2F0ZWRUcmlnZ2VyUGF5bWVudChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwga2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MCAvLyA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKHVpbnQ4WzMyXSx1aW50NjQpCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyBhc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDAKICAgIC8vIGNvbnN0IHsgc2VydmljZUlELCByZWNpcGllbnQgfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0MgogICAgLy8gYXNzZXJ0KHNlcnZpY2VJRCAhPT0gMCwgRVJSX05PVF9BX1NFUlZJQ0UpCiAgICBkaWcgMQogICAgYXNzZXJ0IC8vIE5vdCBhIHNlcnZpY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTZXJ2aWNlIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NAogICAgLy8gY29uc3QgZ2F0ZUlEID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5nYXRlSUQKICAgIHB1c2hpbnQgMzMgLy8gMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyh0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0NwogICAgLy8gY29uc3Qgb3JpZ2luID0gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0KQogICAgY2FsbHN1YiBvcmlnaW5PclR4blNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDgKICAgIC8vIGFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0OAogICAgLy8gYXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDQKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYXNzZXJ0IC8vIEdhdGUgY2hlY2sgZmFpbGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gdGhpcy50cmlnZ2VyUGF5bWVudChrZXkpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MzYKICAgIC8vIGdhdGVkVHJpZ2dlclBheW1lbnQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnRyaWdnZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIHRyaWdnZXJQYXltZW50KGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MCAvLyA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKHVpbnQ4WzMyXSx1aW50NjQpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnQKICAgIHBvcAogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3RyZWFrQ2hlY2tbcm91dGluZ10oKSAtPiB2b2lkOgpzdHJlYWtDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNwogICAgLy8gc3RyZWFrQ2hlY2soa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwIC8vIDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAodWludDhbMzJdLHVpbnQ2NCkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyOAogICAgLy8gdGhpcy51cGRhdGVTdHJlYWsoa2V5LCAwKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgdXBkYXRlU3RyZWFrCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNwogICAgLy8gc3RyZWFrQ2hlY2soa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNldFBhc3Nlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldFBhc3NlczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzMQogICAgLy8gc2V0UGFzc2VzKGlkOiBTdWJzY3JpcHRpb25JRCwgYWRkcmVzc2VzOiBBY2NvdW50W10pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgdW5jb3ZlciAyCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdWludDhbMzJdW10pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzIKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbnNLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAtMTAyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNAogICAgLy8gYXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25zS2V5KS5leGlzdHMsIEVSUl9TVUJTQ1JJUFRJT05fRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFN1YnNjcmlwdGlvbiBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM2CiAgICAvLyBjb25zdCB7IHNlcnZpY2VJRCwgcmVjaXBpZW50IH0gPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uc0tleSkudmFsdWUpCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZXh0cmFjdCAwIDMyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzOAogICAgLy8gYXNzZXJ0KHNlcnZpY2VJRCA+IDAsIEVSUl9OT19ET05BVElPTlMpCiAgICBkdXAKICAgIGFzc2VydCAvLyBEb25hdGlvbnMgYXJlbid0IGFwcGxpY2FibGUgdG8gcGFzc2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDAKICAgIC8vIGNvbnN0IHNlcnZpY2VLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MgogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoc2VydmljZUtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU2VydmljZSBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ0CiAgICAvLyBjb25zdCB7IHN0YXR1cywgcGFzc2VzIH0gPSB0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLnZhbHVlCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QKICAgIHN3YXAKICAgIHB1c2hpbnQgMjUgLy8gMjUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ2CiAgICAvLyBhc3NlcnQoc3RhdHVzICE9PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24sIEVSUl9TRVJWSUNFX0lTX1NIVVRET1dOKQogICAgc3dhcAogICAgYnl0ZWMgMTEgLy8gMHgyOAogICAgIT0KICAgIGFzc2VydCAvLyBTZXJ2aWNlIG9mZmVyaW5nIGlzIHNodXRkb3duCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDcKICAgIC8vIGFzc2VydChwYXNzZXMgPj0gYWRkcmVzc2VzLmxlbmd0aCwgRVJSX1BBU1NfQ09VTlRfT1ZFUkZMT1cpCiAgICA8PQogICAgYXNzZXJ0IC8vIE1vcmUgYWRkcmVzc2VzIHRoYW4gYXZhaWxhYmxlIHBhc3NlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKc2V0UGFzc2VzX3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA0CiAgICA8CiAgICBieiBzZXRQYXNzZXNfYWZ0ZXJfd2hpbGVANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUwCiAgICAvLyBhc3NlcnQoIXRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBhZGRyZXNzZXNbaV0pKS5leGlzdHMsIEVSUl9CTE9DS0VEKQogICAgZGlnIDQKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzMgLy8gMzIKICAgICoKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkaWcgMwogICAgc3dhcAogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUwCiAgICAvLyBhc3NlcnQoIXRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBhZGRyZXNzZXNbaV0pKS5leGlzdHMsIEVSUl9CTE9DS0VEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAhCiAgICBhc3NlcnQgLy8gVGhpcyBhY2NvdW50IGlzIGJsb2NrZWQgYnkgdGhlIHJlY2lwaWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIHNldFBhc3Nlc193aGlsZV90b3BAMgoKc2V0UGFzc2VzX2FmdGVyX3doaWxlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTMKICAgIC8vIHRoaXMucGFzc2VzKHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfSkudmFsdWUgPSBjbG9uZShhZGRyZXNzZXMpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTMgLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1MwogICAgLy8gdGhpcy5wYXNzZXMoeyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9KS52YWx1ZSA9IGNsb25lKGFkZHJlc3NlcykKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBkaWcgNQogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDMxCiAgICAvLyBzZXRQYXNzZXMoaWQ6IFN1YnNjcmlwdGlvbklELCBhZGRyZXNzZXM6IEFjY291bnRbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlckxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgp0cmlnZ2VyTGlzdDoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDYwCiAgICAvLyBjb25zdCByZXN1bHRzOiBib29sZWFuW10gPSBbXQogICAgYnl0ZWMgNyAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2MQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlcS5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCnRyaWdnZXJMaXN0X3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDYxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVxLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIGRpZyAxCiAgICA+CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjIKICAgIC8vIGZvciAobGV0IGo6IHVpbnQ2NCA9IDA7IGogPCByZXFbaV0uaWRzLmxlbmd0aDsgaiArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA4Cgp0cmlnZ2VyTGlzdF93aGlsZV90b3BANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2MgogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIGRpZyAyCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAyIC8vIDIKICAgICoKICAgIGRpZyAxCiAgICBzd2FwCiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZHVwCiAgICBidXJ5IDEyCiAgICBkaWcgMTQKICAgIGRpZyAxCiAgICAtIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZGlnIDMKICAgIGxlbgogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDIgLy8gMgogICAgKgogICAgZGlnIDQKICAgIHN3YXAKICAgIGV4dHJhY3RfdWludDE2CiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBidXJ5IDE3CiAgICBkdXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgYnVyeSAxNgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgOAogICAgPgogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDYyLTEwNjMKICAgIC8vIGZvciAobGV0IGo6IHVpbnQ2NCA9IDA7IGogPCByZXFbaV0uaWRzLmxlbmd0aDsgaiArPSAxKSB7CiAgICAvLyAgIGNvbnN0IGtleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiByZXFbaV0uYWRkcmVzcywgaWQ6IHJlcVtpXS5pZHNbal0gfQogICAgZGlnIDE1CiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxNQogICAgZXh0cmFjdCAyIDAKICAgIGRpZyA5CiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDYzCiAgICAvLyBjb25zdCBrZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogcmVxW2ldLmFkZHJlc3MsIGlkOiByZXFbaV0uaWRzW2pdIH0KICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY0CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jYW5UcmlnZ2VyKGtleSkpCiAgICBjYWxsc3ViIGNhblRyaWdnZXIKICAgIHBvcAogICAgYnl0ZWMgOCAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ1cnkgMTQKICAgIGRpZyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBidXJ5IDEzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgcmVwbGFjZTIgMAogICAgYnVyeSAxNQogICAgc3dhcAogICAgcHVzaGludCA3IC8vIDcKICAgICsKICAgIGludGNfMiAvLyA4CiAgICAvCiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIHN3YXAKICAgIHB1c2hpbnQgNyAvLyA3CiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgLwogICAgZHVwCiAgICBidXJ5IDgKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX2lmX2Vsc2VAMTAKICAgIGRpZyA1CiAgICBkaWcgMTAKICAgIC0KICAgIGJ6ZXJvCiAgICBkaWcgMTMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAxMwoKdHJpZ2dlckxpc3RfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDcKICAgIGRpZyAxMAogICAgcHVzaGludCAxNiAvLyAxNgogICAgKwogICAgZHVwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgNQoKdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDExOgogICAgZGlnIDMKICAgIGRpZyA1CiAgICA8CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxMwogICAgZGlnIDEzCiAgICBkaWcgNwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBnZXRiaXQKICAgIGRpZyAxNAogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ1cnkgMTUKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NAogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18yIC8vIDgKICAgICsKICAgIGJ1cnkgNwogICAgYiB0cmlnZ2VyTGlzdF93aGlsZV90b3BAMTEKCnRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDYyCiAgICAvLyBmb3IgKGxldCBqOiB1aW50NjQgPSAwOyBqIDwgcmVxW2ldLmlkcy5sZW5ndGg7IGogKz0gMSkgewogICAgZGlnIDcKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDgKICAgIGRpZyAxMgogICAgYnVyeSAyCiAgICBiIHRyaWdnZXJMaXN0X3doaWxlX3RvcEA0Cgp0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUA2OgogICAgZGlnIDgKICAgIGJ1cnkgMQogICAgYiB0cmlnZ2VyTGlzdF93aGlsZV90b3BAMgoKdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaXNCbG9ja2VkW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNCbG9ja2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzcKICAgIC8vIHJldHVybiB0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KGFkZHJlc3MsIGJsb2NrZWQpKS5leGlzdHMKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDUgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3NwogICAgLy8gcmV0dXJuIHRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkoYWRkcmVzcywgYmxvY2tlZCkpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgOCAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmlzU2h1dGRvd25bcm91dGluZ10oKSAtPiB2b2lkOgppc1NodXRkb3duOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDgzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4NgogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLmV4aXN0cyAmJgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg2CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4Ni0xMDg3CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGJ6IGlzU2h1dGRvd25fYm9vbF9mYWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODcKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBieXRlYyAxMSAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg2LTEwODcKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS5leGlzdHMgJiYKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYnogaXNTaHV0ZG93bl9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgppc1NodXRkb3duX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyA4IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaXNTaHV0ZG93bl9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBpc1NodXRkb3duX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubmV3U2VydmljZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdTZXJ2aWNlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDkzCiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDkzCiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAxNSAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTMKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5NgogICAgLy8gbGV0IHJlcXVpcmVkQW1vdW50OiB1aW50NjQgPSBzZXJ2aWNlQ3JlYXRpb25GZWUgKyBjb3N0cy5zZXJ2aWNlcwogICAgaW50YyA5IC8vIDQ5NzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDYgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTcKICAgIC8vIGlmICghdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyBpZiAoIXRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbmV3U2VydmljZUNvc3RfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTgKICAgIC8vIHJlcXVpcmVkQW1vdW50ICs9IGNvc3RzLnNlcnZpY2VzbGlzdAogICAgZHVwCiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIGJ1cnkgMQoKbmV3U2VydmljZUNvc3RfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTAwCiAgICAvLyBpZiAoYXNzZXQgIT09IDAgJiYgIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZGlnIDEKICAgIGJ6IG5ld1NlcnZpY2VDb3N0X2FmdGVyX2lmX2Vsc2VANgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTAwCiAgICAvLyBpZiAoYXNzZXQgIT09IDAgJiYgIXRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAyCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IG5ld1NlcnZpY2VDb3N0X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTAxCiAgICAvLyByZXF1aXJlZEFtb3VudCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGR1cAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBidXJ5IDEKCm5ld1NlcnZpY2VDb3N0X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwNAogICAgLy8gY29uc3QgcmVmZXJyYWxDb3N0ID0gcmVmZXJyYWxGZWUodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDQKICAgIC8vIGNvbnN0IHJlZmVycmFsQ29zdCA9IHJlZmVycmFsRmVlKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAyCiAgICBjYWxsc3ViIHJlZmVycmFsRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDYKICAgIC8vIHJldHVybiByZXF1aXJlZEFtb3VudCArIHJlZmVycmFsQ29zdAogICAgZGlnIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTdWJzY3JpcHRpb25Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U3Vic2NyaXB0aW9uQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwOQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTYKICAgIC8vIGxldCBtYnJBbW91bnQgPSBjb3N0cy5zdWJzY3JpcHRpb25zCiAgICBpbnRjIDYgLy8gNjA1MDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTExOQogICAgLy8gaWYgKCFpc0RvbmF0aW9uKSB7CiAgICBieiBuZXdTdWJzY3JpcHRpb25Db3N0X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIwCiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgZGlnIDEKICAgIGl0b2IKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIyCiAgICAvLyBhc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIFNlcnZpY2UgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyNgogICAgLy8gaWYgKHNlcnZpY2UucGFzc2VzID4gMCkgewogICAgcHVzaGludCAyNSAvLyAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBieiBuZXdTdWJzY3JpcHRpb25Db3N0X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTI3CiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMucGFzc2VzCiAgICBpbnRjIDcgLy8gNDc5NDAwCiAgICBidXJ5IDEKCm5ld1N1YnNjcmlwdGlvbkNvc3RfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgOSAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzMQogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzEKICAgIC8vIGlmICghdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld1N1YnNjcmlwdGlvbkNvc3RfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzIKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5zdWJzY3JpcHRpb25zbGlzdAogICAgZHVwCiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIGJ1cnkgMQoKbmV3U3Vic2NyaXB0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzUKICAgIC8vIGNvbnN0IHJlZmVycmFsQ29zdCA9IHJlZmVycmFsRmVlKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTM1CiAgICAvLyBjb25zdCByZWZlcnJhbENvc3QgPSByZWZlcnJhbEZlZSh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgY2FsbHN1YiByZWZlcnJhbEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQwCiAgICAvLyByZXR1cm4gbWJyQW1vdW50ICsgcmVmZXJyYWxDb3N0CiAgICBkaWcgMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1MAogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzcywgaWQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1MQogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTZXJ2aWNlIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTIKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2VzQnlBZGRyZXNzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U2VydmljZXNCeUFkZHJlc3M6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1NwogICAgLy8gY29uc3Qgc2VydmljZXM6IFNlcnZpY2VbXSA9IFtdCiAgICBieXRlYyA3IC8vIDB4MDAwMAogICAgc3dhcAoKZ2V0U2VydmljZXNCeUFkZHJlc3Nfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IHN0YXJ0OyBpIDwgc3RhcnQgKyB3aW5kb3dTaXplOyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMwogICAgKwogICAgZGlnIDEKICAgID4KICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2Jsb2NrQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1OQogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzcywgaWQ6IGkgfQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgNQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTYwCiAgICAvLyBpZiAodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjEKICAgIC8vIHNlcnZpY2VzLnB1c2godGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlKQogICAgZGlnIDExCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZGlnIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMTIKICAgIGV4dHJhY3QgMiAwCiAgICBidXJ5IDE1CiAgICBwdXNoYnl0ZXMgMHgwMDAyCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgYnVyeSAxMQogICAgcHVzaGJ5dGVzIDB4CiAgICBidXJ5IDEyCiAgICBwdXNoaW50IDIgLy8gMgogICAgKgogICAgYnVyeSA2CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA3CgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEwOgogICAgZGlnIDYKICAgIGRpZyA2CiAgICA8CiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTIKICAgIGRpZyAxMgogICAgZGlnIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZGlnIDEyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMTIKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBidXJ5IDcKICAgIGIgZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMAoKZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDEyOgogICAgZGlnIDEyCiAgICBsZW4KICAgIGJ1cnkgOAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNwoKZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMzoKICAgIGRpZyA2CiAgICBwdXNoaW50IDIgLy8gMgogICAgPAogICAgYnogZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDE1CiAgICBkaWcgOQogICAgZGlnIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyA5CiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZGlnIDEyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMTIKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBidXJ5IDcKICAgIGIgZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMwoKZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDE1OgogICAgZGlnIDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2MQogICAgLy8gc2VydmljZXMucHVzaCh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGRpZyAxMQogICAgY29uY2F0CiAgICBkaWcgMTMKICAgIGRpZyA3CiAgICBkaWcgMTAKICAgIHN1YnN0cmluZzMKICAgIGNvbmNhdAogICAgZGlnIDEwCiAgICBleHRyYWN0IDIgMAogICAgY29uY2F0CiAgICBidXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1OAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gc3RhcnQ7IGkgPCBzdGFydCArIHdpbmRvd1NpemU7IGkgKz0gMSkgewogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGdldFNlcnZpY2VzQnlBZGRyZXNzX3doaWxlX3RvcEAyCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgZGlnIDIKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAgLy8gNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yICh1aW50OFszMl0sdWludDY0KQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAtMTAyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTcxCiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTcyLTExODQKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGV4aXN0czogZmFsc2UsCiAgICAvLyAgIHJlY2lwaWVudDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzZXJ2aWNlSUQ6IDAsCiAgICAvLyAgIHN0YXJ0RGF0ZTogMCwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICBpbnRlcnZhbDogMCwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIGdhdGVJRDogMCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IDAsCiAgICAvLyAgIHN0cmVhazogMCwKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyB9CiAgICBwdXNoYnl0ZXMgYmFzZTMyKEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQSkKCmdldFN1YnNjcmlwdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4OQogICAgLy8gLi4udGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUsCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgZGlnIDIKICAgIGV4dHJhY3QgNDAgOAogICAgZGlnIDMKICAgIGV4dHJhY3QgNDggOAogICAgZGlnIDQKICAgIGV4dHJhY3QgNTYgOAogICAgZGlnIDUKICAgIGV4dHJhY3QgNjQgOAogICAgZGlnIDYKICAgIGV4dHJhY3QgNzIgOAogICAgZGlnIDcKICAgIGV4dHJhY3QgODAgOAogICAgZGlnIDgKICAgIGV4dHJhY3QgODggOAogICAgdW5jb3ZlciA5CiAgICBleHRyYWN0IDk2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4Ny0xMTkwCiAgICAvLyByZXR1cm4gewogICAgLy8gICBleGlzdHM6IHRydWUsCiAgICAvLyAgIC4uLnRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLAogICAgLy8gfQogICAgYnl0ZWMgMTcgLy8gMHg4MAogICAgdW5jb3ZlciAxMAogICAgY29uY2F0CiAgICB1bmNvdmVyIDkKICAgIGNvbmNhdAogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTY5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25ANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubXVzdEdldFN1YnNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAgLy8gNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yICh1aW50OFszMl0sdWludDY0KQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAtMTAyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5NQogICAgLy8gYXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgRVJSX1NVQlNDUklQVElPTl9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU3Vic2NyaXB0aW9uIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTYKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsczoKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA0MCAvLyA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKHVpbnQ4WzMyXSx1aW50NjQpCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAxCiAgICAvLyBhc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBFUlJfU1VCU0NSSVBUSU9OX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTdWJzY3JpcHRpb24gZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMwogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUpCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA1CiAgICAvLyBsZXQgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzID0gU2VydmljZVN0YXR1c05vbmUKICAgIGJ5dGVjIDggLy8gMHgwMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA2CiAgICAvLyBsZXQgdGl0bGU6IHN0cmluZyA9ICcnCiAgICBwdXNoYnl0ZXMgIiIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwNwogICAgLy8gbGV0IGRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnJwogICAgcHVzaGJ5dGVzICIiCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDgKICAgIC8vIGxldCBiYW5uZXJJbWFnZTogQ0lEID0gb3AuYnplcm8oMzYpCiAgICBwdXNoaW50IDM2IC8vIDM2CiAgICBiemVybwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA5CiAgICAvLyBsZXQgaGlnaGxpZ2h0TWVzc2FnZTogVWludDggPSBIaWdobGlnaHRNZXNzYWdlTm9uZQogICAgYnl0ZWMgOCAvLyAweDAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTAKICAgIC8vIGxldCBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4gPSBCeXRlcygnMDAwJykudG9GaXhlZCh7IGxlbmd0aDogMyB9KQogICAgcHVzaGJ5dGVzICIwMDAiCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTEKICAgIC8vIGlmIChzdWIuc2VydmljZUlEICE9PSAwKSB7CiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ6IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjEyCiAgICAvLyBjb25zdCBzZXJ2aWNlS2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogc3ViLnJlY2lwaWVudCwgaWQ6IHN1Yi5zZXJ2aWNlSUQgfQogICAgZGlnIDcKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTMKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLmV4aXN0cywgRVJSX1NFUlZJQ0VfRE9FU19OT1RfRVhJU1QpOwogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTZXJ2aWNlIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTQKICAgIC8vICh7IHN0YXR1cywgdGl0bGUsIGRlc2NyaXB0aW9uLCBiYW5uZXJJbWFnZSwgaGlnaGxpZ2h0TWVzc2FnZSwgaGlnaGxpZ2h0Q29sb3IgfSA9IGNsb25lKHRoaXMuc2VydmljZXMoc2VydmljZUtleSkudmFsdWUpKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBwb3AKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgYnVyeSA5CiAgICBkaWcgMQogICAgcHVzaGludCA0MSAvLyA0MQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAyCiAgICBwdXNoaW50IDQzIC8vIDQzCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDMKICAgIHVuY292ZXIgMgogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBidXJ5IDkKICAgIGRpZyAyCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGJ1cnkgNgogICAgZHVwCiAgICBwdXNoaW50cyA0NSAzNiAvLyA0NSwgMzYKICAgIGJveF9leHRyYWN0CiAgICBidXJ5IDUKICAgIGR1cAogICAgcHVzaGludCA4MSAvLyA4MQogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBidXJ5IDQKICAgIHB1c2hpbnRzIDgyIDMgLy8gODIsIDMKICAgIGJveF9leHRyYWN0CiAgICBidXJ5IDIKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxNwogICAgLy8gbGV0IHBhc3NlczogQWNjb3VudFtdID0gW10KICAgIGJ5dGVjIDcgLy8gMHgwMDAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTMgLy8gInAiCiAgICBkaWcgOQogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxOAogICAgLy8gaWYgKHRoaXMucGFzc2VzKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjE5CiAgICAvLyBwYXNzZXMgPSBbLi4ucGFzc2VzLCAuLi50aGlzLnBhc3NlcyhrZXkpLnZhbHVlXQogICAgZGlnIDEwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxNwogICAgLy8gbGV0IHBhc3NlczogQWNjb3VudFtdID0gW10KICAgIGJ5dGVjIDcgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTkKICAgIC8vIHBhc3NlcyA9IFsuLi5wYXNzZXMsIC4uLnRoaXMucGFzc2VzKGtleSkudmFsdWVdCiAgICBzd2FwCiAgICBjb25jYXQgLy8gb24gZXJyb3I6IG1heCBhcnJheSBsZW5ndGggZXhjZWVkZWQKICAgIGR1cAogICAgZXh0cmFjdCAyIDAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICAvCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgcmVwbGFjZTIgMAogICAgYnVyeSAxMAoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIzCiAgICAvLyAuLi5zdWIsCiAgICBkaWcgNwogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDQwIDgKICAgIGRpZyAyCiAgICBleHRyYWN0IDQ4IDgKICAgIGRpZyAzCiAgICBleHRyYWN0IDU2IDgKICAgIGRpZyA0CiAgICBleHRyYWN0IDY0IDgKICAgIGRpZyA1CiAgICBleHRyYWN0IDcyIDgKICAgIGRpZyA2CiAgICBleHRyYWN0IDgwIDgKICAgIGRpZyA3CiAgICBleHRyYWN0IDg4IDgKICAgIHVuY292ZXIgOAogICAgZXh0cmFjdCA5NiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMjItMTIzMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgLi4uc3ViLAogICAgLy8gICBzdGF0dXMsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBkZXNjcmlwdGlvbiwKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yLAogICAgLy8gICBwYXNzZXMKICAgIC8vIH0KICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBkaWcgNAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgMTAKICAgIGNvbmNhdAogICAgZGlnIDkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDk3CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMTUxIC8vIDE1MQogICAgKwogICAgZGlnIDEwCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgdW5jb3ZlciAzCiAgICArCiAgICBkaWcgMTAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDM2IC8vIDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgc2l6ZQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBjb25jYXQKICAgIGRpZyA4CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCAzIC8vIDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBzaXplCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaXNGaXJzdFN1YnNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzRmlyc3RTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyA5IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzYKICAgIC8vIHJldHVybiAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDggLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTZXJ2aWNlTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFNlcnZpY2VMaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyA2IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0MQogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLmV4aXN0cyA/IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCmdldFNlcnZpY2VMaXN0X3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzOQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18wIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDEKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGdldFNlcnZpY2VMaXN0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN1YnNjcmlwdGlvbkxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyA5IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0NgogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCmdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjQ0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjQ2CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUyCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUyCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NC0xNjEKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU3CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU0LTE2MQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIHVuY292ZXIgMwogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTgKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDQKICAgICsKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NC0xNjEKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYzLTE2OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2NQogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2NgogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMtMTY4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMtMTY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MAogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3NAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3NAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzQKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTc1CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTcyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QudXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNwogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzOAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzkKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBhcHAKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgMTIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgMjYgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyBhc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYXNzZXJ0IC8vIEludmFsaWQgYXBwIHVwZ3JhZGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAyNCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUzCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDEyIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDAKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN0YXJ0RGF0ZTogdWludDY0LCBpbnRlcnZhbDogdWludDY0KSAtPiB1aW50NjQ6CmdldExhdGVzdFdpbmRvd1N0YXJ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIHByaXZhdGUgZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3RhcnREYXRlOiB1aW50NjQsIGludGVydmFsOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gcmV0dXJuIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSAoKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBzdGFydERhdGUpICUgaW50ZXJ2YWwpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICAlCiAgICAtCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldEJsb2NrS2V5KGFkZHJlc3M6IGJ5dGVzLCBibG9ja2VkOiBieXRlcykgLT4gYnl0ZXM6CmdldEJsb2NrS2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzMKICAgIC8vIHByaXZhdGUgZ2V0QmxvY2tLZXkoYWRkcmVzczogQWNjb3VudCwgYmxvY2tlZDogQWNjb3VudCk6IEJsb2NrTGlzdEtleSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM1CiAgICAvLyBhZGRyZXNzOiBhZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIGZyYW1lX2RpZyAtMgogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBibG9ja2VkOiBibG9ja2VkLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIGZyYW1lX2RpZyAtMQogICAgbGVuCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGZyYW1lX2RpZyAtMQogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0LTEzNwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYWRkcmVzczogYWRkcmVzcy5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICAvLyAgIGJsb2NrZWQ6IGJsb2NrZWQuYnl0ZXMuc2xpY2UoMCwgMTYpLnRvRml4ZWQoeyBsZW5ndGg6IDE2IH0pLAogICAgLy8gfQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVwZGF0ZVN0cmVhayhrZXk6IGJ5dGVzLCBlbHNlU3RyZWFrOiB1aW50NjQpIC0+IGJ5dGVzOgp1cGRhdGVTdHJlYWs6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gcHJpdmF0ZSB1cGRhdGVTdHJlYWsoa2V5OiBTdWJzY3JpcHRpb25LZXksIGVsc2VTdHJlYWs6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxCiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MwogICAgLy8gY29uc3QgY3VycmVudFdpbmRvd1N0YXJ0OiB1aW50NjQgPSB0aGlzLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN1Yi5zdGFydERhdGUsIHN1Yi5pbnRlcnZhbCkKICAgIGR1cAogICAgcHVzaGludCA0MCAvLyA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBwdXNoaW50IDU2IC8vIDU2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgZ2V0TGF0ZXN0V2luZG93U3RhcnQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIGNvbnN0IGxhc3RXaW5kb3dTdGFydDogdWludDY0ID0gY3VycmVudFdpbmRvd1N0YXJ0IC0gc3ViLmludGVydmFsCiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGlmIChzdWIubGFzdFBheW1lbnQgPCBsYXN0V2luZG93U3RhcnQpIHsKICAgIHB1c2hpbnQgODAgLy8gODAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPAogICAgYnogdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLnN0cmVhayA9IGVsc2VTdHJlYWsKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hpbnQgODggLy8gODgKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ5CiAgICAvLyByZXR1cm4KICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gaWYgKHN1Yi5sYXN0UGF5bWVudCA+PSBsYXN0V2luZG93U3RhcnQgJiYgIShzdWIubGFzdFBheW1lbnQgPj0gY3VycmVudFdpbmRvd1N0YXJ0KSkgewogICAgZnJhbWVfZGlnIDMKICAgIGZyYW1lX2RpZyAyCiAgICA+PQogICAgYnogdXBkYXRlU3RyZWFrX2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIDMKICAgIGZyYW1lX2RpZyAxCiAgICA+PQogICAgYm56IHVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5zdHJlYWsgKz0gMQogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgODggLy8gODgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCA4OCAvLyA4OAogICAgc3dhcAogICAgYm94X3JlcGxhY2UKCnVwZGF0ZVN0cmVha19hZnRlcl9pZl9lbHNlQDU6CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRBbW91bnRzKGFtb3VudDogdWludDY0KSAtPiBieXRlczoKZ2V0QW1vdW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBwcml2YXRlIGdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpOiBBbW91bnRzIHsKICAgIHByb3RvIDEgMQogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gY29uc3QgZmVlcyA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAxNSAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBsZXQgYWtpdGFGZWU6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2NAogICAgLy8gaWYgKGZlZXMucGF5bWVudFBlcmNlbnRhZ2UgPiAwKSB7CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJbnZhbGlkIHBlcmNlbnRhZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIGlmIChha2l0YUZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyBha2l0YUZlZSA9IDIKICAgIHB1c2hpbnQgMiAvLyAyCiAgICBmcmFtZV9idXJ5IDIKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIGxldCB0cmlnZ2VyRmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gaWYgKGZlZXMudHJpZ2dlclBlcmNlbnRhZ2UgPiAwKSB7CiAgICBmcmFtZV9kaWcgMQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJbnZhbGlkIHBlcmNlbnRhZ2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzQKICAgIC8vIGlmICh0cmlnZ2VyRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gdHJpZ2dlckZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBjb25zdCBsZWZ0T3ZlcjogdWludDY0ID0gYW1vdW50IC0gKGFraXRhRmVlICsgdHJpZ2dlckZlZSkKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODEtMTg1CiAgICAvLyByZXR1cm4gewogICAgLy8gICBha2l0YUZlZTogYWtpdGFGZWUsCiAgICAvLyAgIHRyaWdnZXJGZWU6IHRyaWdnZXJGZWUsCiAgICAvLyAgIGxlZnRPdmVyOiBsZWZ0T3ZlciwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTdWJzY3JpcHRpb25JRChhZGRyZXNzOiBieXRlcykgLT4gdWludDY0OgpuZXdTdWJzY3JpcHRpb25JRDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyBwcml2YXRlIG5ld1N1YnNjcmlwdGlvbklEKGFkZHJlc3M6IEFjY291bnQpOiBTdWJzY3JpcHRpb25JRCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDkgLy8gImwiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk3LTE5OQogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICAvLyAgID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZQogICAgLy8gICA6IDEKICAgIGJ6IG5ld1N1YnNjcmlwdGlvbklEX3Rlcm5hcnlfZmFsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZQogICAgZnJhbWVfZGlnIDAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpuZXdTdWJzY3JpcHRpb25JRF90ZXJuYXJ5X21lcmdlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA9IGlkICsgMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyByZXR1cm4gaWQKICAgIHN3YXAKICAgIHJldHN1YgoKbmV3U3Vic2NyaXB0aW9uSURfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTkKICAgIC8vIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgbmV3U3Vic2NyaXB0aW9uSURfdGVybmFyeV9tZXJnZUAzCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jcmVhdGVTdWJzY3JpcHRpb24ocGF5bWVudDogdWludDY0LCByZWNpcGllbnQ6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCwgc2VydmljZUlEOiB1aW50NjQpIC0+IHVpbnQ2NDoKY3JlYXRlU3Vic2NyaXB0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDQtMjEwCiAgICAvLyBwcml2YXRlIGNyZWF0ZVN1YnNjcmlwdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDUgMQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIGNvbnN0IGJsb2Nrc0tleSA9IHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC00CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMwogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyA1IC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gYXNzZXJ0KCF0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmV4aXN0cywgRVJSX0JMT0NLRUQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgICEKICAgIGFzc2VydCAvLyBUaGlzIGFjY291bnQgaXMgYmxvY2tlZCBieSB0aGUgcmVjaXBpZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gbGV0IGdhdGVJRDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA2IC8vIDYwNTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIyMQogICAgLy8gaWYgKCFpc0RvbmF0aW9uKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjIyCiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gYXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIEVSUl9TRVJWSUNFX0RPRVNfTk9UX0VYSVNUKQogICAgZHVwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBTZXJ2aWNlIGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIyOAogICAgLy8gYXNzZXJ0KHNlcnZpY2Uuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzQWN0aXZlLCBFUlJfU0VSVklDRV9JU19OT1RfQUNUSVZFKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBieXRlYyAxMCAvLyAweDE0CiAgICA9PQogICAgYXNzZXJ0IC8vIFNlcnZpY2Ugb2ZmZXJpbmcgaXMgbm90IGFjdGl2ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzAKICAgIC8vIGFzc2VydChzZXJ2aWNlLmFzc2V0ID09PSAwLCBFUlJfQVNBX01JU01BVENIKQogICAgZHVwCiAgICBwdXNoaW50IDkgLy8gOQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICAhCiAgICBhc3NlcnQgLy8gQXNzZXQgbWlzbWF0Y2gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjMyCiAgICAvLyBhbW91bnQgPSBzZXJ2aWNlLmFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDE3IC8vIDE3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgLTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjMzCiAgICAvLyBpbnRlcnZhbCA9IHNlcnZpY2UuaW50ZXJ2YWwKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZnJhbWVfYnVyeSAtMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzQKICAgIC8vIGdhdGVJRCA9IHNlcnZpY2UuZ2F0ZUlECiAgICBkdXAKICAgIHB1c2hpbnQgMzMgLy8gMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gaWYgKHNlcnZpY2UucGFzc2VzID4gMCkgewogICAgcHVzaGludCAyNSAvLyAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNwogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnBhc3NlcwogICAgaW50YyA3IC8vIDQ3OTQwMAogICAgZnJhbWVfYnVyeSAzCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgOSAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQxCiAgICAvLyBjb25zdCBuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyID0gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQxCiAgICAvLyBjb25zdCBuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyID0gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQyCiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25JRCA9IHRoaXMubmV3U3Vic2NyaXB0aW9uSUQoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgbmV3U3Vic2NyaXB0aW9uSUQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0MwogICAgLy8gY29uc3Qgc3Vic2NyaXB0aW9uS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWJzY3JpcHRpb25JRCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDQKICAgIC8vIGlmIChuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyKSB7CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5zdWJzY3JpcHRpb25zbGlzdAogICAgZnJhbWVfZGlnIDMKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgZnJhbWVfYnVyeSAzCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHMoYW1vdW50KQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ5CiAgICAvLyBjb25zdCBha2l0YUZlZXM6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGFGZWUgKyBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MAogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgMCwgYWtpdGFGZWVzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTAKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFraXRhRmVlcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUyLTI2MQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB7CiAgICAvLyAgICAgICBncmVhdGVyVGhhbkVxOiAoYW1vdW50ICsgbWJyQW1vdW50ICsgcmVmZXJyYWxNYnIpCiAgICAvLyAgICAgfSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1Mi0yNjEKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogewogICAgLy8gICAgICAgZ3JlYXRlclRoYW5FcTogKGFtb3VudCArIG1ickFtb3VudCArIHJlZmVycmFsTWJyKQogICAgLy8gICAgIH0sCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBmcmFtZV9kaWcgLTUKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIGdyZWF0ZXJUaGFuRXE6IChhbW91bnQgKyBtYnJBbW91bnQgKyByZWZlcnJhbE1icikKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIDMKICAgICsKICAgIHVuY292ZXIgMwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTItMjYxCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHsKICAgIC8vICAgICAgIGdyZWF0ZXJUaGFuRXE6IChhbW91bnQgKyBtYnJBbW91bnQgKyByZWZlcnJhbE1icikKICAgIC8vICAgICB9LAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBkdXAyCiAgICA+PQogICAgdW5jb3ZlciAzCiAgICAmJgogICAgYXNzZXJ0IC8vIEludmFsaWQgcGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjMtMjY4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjUKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2My0yNjcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYzLTI2OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3MC0yNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiByZWNpcGllbnQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzAtMjc0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcmVjaXBpZW50LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzAtMjc1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcmVjaXBpZW50LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4MQogICAgLy8gY29uc3QgcGF5bWVudERpZmZlcmVuY2U6IHVpbnQ2NCA9IHBheW1lbnQuYW1vdW50IC0gKGFtb3VudCArIG1ickFtb3VudCArIHJlZmVycmFsTWJyKQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjkxCiAgICAvLyBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODMtMjk0CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZDogcGF5bWVudERpZmZlcmVuY2UsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4OQogICAgLy8gYXNzZXQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODMtMjk0CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZDogcGF5bWVudERpZmZlcmVuY2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyOTIKICAgIC8vIHN0cmVhazogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4My0yOTQKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkOiBwYXltZW50RGlmZmVyZW5jZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIGZyYW1lX2RpZyAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjgzLTI5NAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQ6IHBheW1lbnREaWZmZXJlbmNlLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyOTYKICAgIC8vIHJldHVybiBzdWJzY3JpcHRpb25JRAogICAgZnJhbWVfZGlnIDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jcmVhdGVBc2FTdWJzY3JpcHRpb24obWJyUGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgcmVjaXBpZW50OiBieXRlcywgYW1vdW50OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQsIHNlcnZpY2VJRDogdWludDY0KSAtPiB1aW50NjQ6CmNyZWF0ZUFzYVN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjk5LTMwNgogICAgLy8gcHJpdmF0ZSBjcmVhdGVBc2FTdWJzY3JpcHRpb24oCiAgICAvLyAgIG1iclBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDYgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzA3CiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtNAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMDkKICAgIC8vIGFzc2VydCghdGhpcy5ibG9ja3MoYmxvY2tzS2V5KS5leGlzdHMsIEVSUl9CTE9DS0VEKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAhCiAgICBhc3NlcnQgLy8gVGhpcyBhY2NvdW50IGlzIGJsb2NrZWQgYnkgdGhlIHJlY2lwaWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMTEKICAgIC8vIGxldCBnYXRlSUQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxNAogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLnN1YnNjcmlwdGlvbnMKICAgIGludGMgNiAvLyA2MDUwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMTcKICAgIC8vIGlmICghaXNEb25hdGlvbikgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBFUlJfU0VSVklDRV9ET0VTX05PVF9FWElTVCkKICAgIGR1cAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gU2VydmljZSBkb2VzIG5vdCBleGlzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGFzc2VydChzZXJ2aWNlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c0FjdGl2ZSwgRVJSX1NFUlZJQ0VfSVNfTk9UX0FDVElWRSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgYnl0ZWMgMTAgLy8gMHgxNAogICAgPT0KICAgIGFzc2VydCAvLyBTZXJ2aWNlIG9mZmVyaW5nIGlzIG5vdCBhY3RpdmUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI2CiAgICAvLyBhc3NlcnQoc2VydmljZS5hc3NldCA9PT0gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgRVJSX0FTQV9NSVNNQVRDSCkKICAgIGR1cAogICAgcHVzaGludCA5IC8vIDkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBYZmVyQXNzZXQKICAgID09CiAgICBhc3NlcnQgLy8gQXNzZXQgbWlzbWF0Y2gKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBhbW91bnQgPSBzZXJ2aWNlLmFtb3VudAogICAgZHVwCiAgICBwdXNoaW50IDE3IC8vIDE3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgLTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBpbnRlcnZhbCA9IHNlcnZpY2UuaW50ZXJ2YWwKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZnJhbWVfYnVyeSAtMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIGdhdGVJRCA9IHNlcnZpY2UuZ2F0ZUlECiAgICBkdXAKICAgIHB1c2hpbnQgMzMgLy8gMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMgogICAgLy8gaWYgKHNlcnZpY2UucGFzc2VzID4gMCkgewogICAgcHVzaGludCAyNSAvLyAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBieiBjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnBhc3NlcwogICAgaW50YyA3IC8vIDQ3OTQwMAogICAgZnJhbWVfYnVyeSA3CgpjcmVhdGVBc2FTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgOSAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM3CiAgICAvLyBjb25zdCBuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyID0gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM3CiAgICAvLyBjb25zdCBuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyID0gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25JRCA9IHRoaXMubmV3U3Vic2NyaXB0aW9uSUQoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgbmV3U3Vic2NyaXB0aW9uSUQKICAgIGR1cAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzOQogICAgLy8gY29uc3Qgc3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZDogc3Vic2NyaXB0aW9uSUQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQxCiAgICAvLyBpZiAobmVlZHNTdWJzY3JpcHRpb25zTGlzdEJveE1icikgewogICAgYm56IGNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMuc3Vic2NyaXB0aW9uc2xpc3QKICAgIGZyYW1lX2RpZyA3CiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIGZyYW1lX2J1cnkgNwoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQ1CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIGNvbnN0IGFraXRhRmVlczogdWludDY0ID0gYW1vdW50cy5ha2l0YUZlZSArIGFtb3VudHMudHJpZ2dlckZlZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsIGFraXRhRmVlcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LmlkLCBha2l0YUZlZXMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBYZmVyQXNzZXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSA1CiAgICBzd2FwCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MuaXNPcHRlZEluKGFzc2V0WGZlci54ZmVyQXNzZXQpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gaWYgKCF0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MuaXNPcHRlZEluKGFzc2V0WGZlci54ZmVyQXNzZXQpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVBc2FTdWJzY3JpcHRpb25fZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBBa2l0YURBT0VzY3Jvd0FjY291bnRTdWJzY3JpcHRpb25zLAogICAgYnl0ZWMgMjUgLy8gInJldl9zdWJzY3JpcHRpb25zIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTAtMzU0CiAgICAvLyB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKAogICAgLy8gICBBa2l0YURBT0VzY3Jvd0FjY291bnRTdWJzY3JpcHRpb25zLAogICAgLy8gICBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICBsZWZ0b3ZlcgogICAgLy8gKQogICAgZnJhbWVfZGlnIDUKICAgIGZyYW1lX2RpZyAyCiAgICBjYWxsc3ViIG9wdEFraXRhRXNjcm93SW5BbmRTZW5kCiAgICBwb3AKCmNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjYtMzczCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ickFtb3VudCArIHJlZmVycmFsTWJyLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTYKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2OQogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY2LTM3MwogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIG1iclBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBtYnJBbW91bnQgKyByZWZlcnJhbE1iciwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIGZyYW1lX2RpZyAtNgogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gYW1vdW50OiBtYnJBbW91bnQgKyByZWZlcnJhbE1iciwKICAgIGZyYW1lX2RpZyA3CiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjYtMzczCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgbWJyUGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1ickFtb3VudCArIHJlZmVycmFsTWJyLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc2LTM4NQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiB7CiAgICAvLyAgICAgICBncmVhdGVyVGhhbkVxOiBhbW91bnQsCiAgICAvLyAgICAgfQogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9UUkFOU0ZFUgogICAgLy8gKQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNzYtMzg1CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHsKICAgIC8vICAgICAgIGdyZWF0ZXJUaGFuRXE6IGFtb3VudCwKICAgIC8vICAgICB9CiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICA9PQogICAgZnJhbWVfZGlnIC01CiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9kaWcgLTMKICAgID49CiAgICB1bmNvdmVyIDIKICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCB0cmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODctMzkzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNpcGllbnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTEKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICBmcmFtZV9kaWcgMAogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODctMzkyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNpcGllbnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4Ny0zOTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2lwaWVudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIGNvbnN0IHBheW1lbnREaWZmZXJlbmNlOiB1aW50NjQgPSBhc3NldFhmZXIuYXNzZXRBbW91bnQgLSBhbW91bnQKICAgIGZyYW1lX2RpZyAtMwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDQKICAgIC8vIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDA5CiAgICAvLyBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDEtNDEyCiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZDogcGF5bWVudERpZmZlcmVuY2UsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gc3RyZWFrOiAxLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDAxLTQxMgogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQ6IHBheW1lbnREaWZmZXJlbmNlLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDAxCiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwLTEwMgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMS00MTIKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkOiBwYXltZW50RGlmZmVyZW5jZSwKICAgIC8vIH0KICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE0CiAgICAvLyByZXR1cm4gc3Vic2NyaXB0aW9uSUQKICAgIGZyYW1lX2RpZyA0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY3JlYXRlQXNhU3Vic2NyaXB0aW9uX2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTYtMzYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgNQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTYtMzYxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgcHVzaGludCA0IC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTYtMzYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUFzYVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jYW5UcmlnZ2VyKGtleTogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CmNhblRyaWdnZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxNwogICAgLy8gcHJpdmF0ZSBjYW5UcmlnZ2VyKGtleTogU3Vic2NyaXB0aW9uS2V5KTogYm9vbGVhbiB7CiAgICBwcm90byAxIDIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMC0xMDIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE4CiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgZnJhbWVfZGlnIDgKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDEKICAgIGR1cAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICBkdXAKICAgIHB1c2hpbnQgODAgLy8gODAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDUKICAgIGR1cAogICAgcHVzaGludCA0MCAvLyA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNwogICAgZHVwCiAgICBwdXNoaW50IDU2IC8vIDU2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA0CiAgICBkdXAKICAgIHB1c2hpbnQgOTYgLy8gOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDMKICAgIHB1c2hpbnQgNDggLy8gNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwga2V5LmFkZHJlc3MpCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCAzMgogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgNSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIGlmICh0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0MS00NDUKICAgIC8vIHNlcnZpY2VJRCA+IDAgJiYKICAgIC8vICgKICAgIC8vICAgIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICAvLyAgIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIC8vICkKICAgIGZyYW1lX2RpZyA2CiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NDMKICAgIC8vICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgZnJhbWVfZGlnIDYKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyAhdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMgfHwKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY2FuVHJpZ2dlcl9pZl9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ0CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdAogICAgYnl0ZWMgMTEgLy8gMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQzLTQ0NAogICAgLy8gIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAOAoKY2FuVHJpZ2dlcl9pZl9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0NwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDUxCiAgICAvLyBpZiAobGFzdFBheW1lbnQgPj0gdGhpcy5nZXRMYXRlc3RXaW5kb3dTdGFydChzdGFydERhdGUsIGludGVydmFsKSkgewogICAgZnJhbWVfZGlnIDcKICAgIGZyYW1lX2RpZyA0CiAgICBjYWxsc3ViIGdldExhdGVzdFdpbmRvd1N0YXJ0CiAgICBmcmFtZV9kaWcgNQogICAgPD0KICAgIGJ6IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTIKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIGlmIChhbW91bnQgPiBlc2Nyb3dlZCkgewogICAgZnJhbWVfZGlnIDIKICAgIGZyYW1lX2RpZyAzCiAgICA+CiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDU5CiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnQoa2V5OiBieXRlcykgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1MwogICAgLy8gdHJpZ2dlclBheW1lbnQoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTUKICAgIC8vIGFzc2VydCh0aGlzLmNhblRyaWdnZXIoa2V5KSwgRVJSX0NBTk5PVF9UUklHR0VSKQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblRyaWdnZXIKICAgIGZyYW1lX2J1cnkgLTEKICAgIGFzc2VydCAvLyBDYW5ub3QgdHJpZ2dlciBwYXltZW50IGF0IHRoaXMgdGltZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAtMTAyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNDggLy8gNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNjQgLy8gNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDcyIC8vIDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjQKICAgIC8vIGlmIChnYXRlSUQgIT09IDApIHsKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2NQogICAgLy8gYXNzZXJ0KFR4bi5hcHBsaWNhdGlvbkFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuZ2F0ZWRUcmlnZ2VyUGF5bWVudCkpCiAgICBpbnRjXzAgLy8gMAogICAgdHhuYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyAyMSAvLyBtZXRob2QgImdhdGVkVHJpZ2dlclBheW1lbnQoYXBwbCwoYWRkcmVzcyx1aW50NjQpKXZvaWQiCiAgICA9PQogICAgYXNzZXJ0CgpzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTY5CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGZyYW1lX2RpZyAxCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTcxCiAgICAvLyBpZiAoaXNBc2EpIHsKICAgIGZyYW1lX2RpZyAyCiAgICBieiBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50X2Vsc2VfYm9keUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NC05ODAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzgKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NC05NzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NC05ODAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTgyLTk4OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4NAogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODItOTg3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgcHVzaGludCA0IC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODItOTg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MC05OTYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2lwaWVudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTQKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkwLTk5NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjaXBpZW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkwLTk5NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjaXBpZW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDIxCiAgICAvLyB0aGlzLnVwZGF0ZVN0cmVhayhrZXksIDEpCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHVwZGF0ZVN0cmVhawogICAgZnJhbWVfYnVyeSAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAtMTAyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDIzCiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5lc2Nyb3dlZCAtPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYgLy8gOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgMQogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgOTYgLy8gOTYKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUubGFzdFBheW1lbnQgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpdG9iCiAgICBwdXNoaW50IDgwIC8vIDgwCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTk5LTEwMDQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAxCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAxCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMgogICAgLy8gYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTktMTAwMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTk5LTEwMDQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwNi0xMDExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwOAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDkKICAgIC8vIGFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA2LTEwMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDYtMTAxMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDEzLTEwMTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiByZWNpcGllbnQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDE2CiAgICAvLyBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxMy0xMDE3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcmVjaXBpZW50LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDEzLTEwMTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiByZWNpcGllbnQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudF9hZnRlcl9pZl9lbHNlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0Lm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKG5hbWU6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgwCiAgICAvLyBwcm90ZWN0ZWQgb3B0QWtpdGFFc2Nyb3dJbkFuZFNlbmQobmFtZTogc3RyaW5nLCBhc3NldDogQXNzZXQsIGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgMTIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDI2IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MwogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBkaWcgMgogICAgYnl0ZWMgMTIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjcwLTczCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NzIKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgZnJhbWVfZGlnIC0zCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjcwLTczCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgcHVzaGJ5dGVzIDB4YTI0MDNkZGYgLy8gbWV0aG9kICJhcmM1OF9nZXRFc2Nyb3dzKHN0cmluZ1tdKSh1aW50NjQsYm9vbClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzAgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCA5IC8vIDkKICAgICoKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rKHVpbnQ2NCxib29sMSlbXSkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjc1CiAgICAvLyBhc3NlcnQoZXNjcm93LmlkICE9PSAwLCBFUlJfRVNDUk9XX0RPRVNfTk9UX0VYSVNUKQogICAgZXh0cmFjdCA2IDkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBhc3NlcnQgLy8gRXNjcm93IGRvZXMgbm90IGV4aXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NgogICAgLy8gYXNzZXJ0KGlkID09PSB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NgogICAgLy8gYXNzZXJ0KGlkID09PSB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgID09CiAgICBhc3NlcnQgLy8gV3JvbmcgZXNjcm93IGZvciB0aGlzIG9wZXJhdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODgtOTcKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hieXRlcyAweDU4MmZmMzgyIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsYm9vbCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MgogICAgLy8gdHJ1ZSwKICAgIGJ5dGVjIDE3IC8vIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTQKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUKICAgIC8vIFtdCiAgICBieXRlYyA3IC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4LTk3CiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDEKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk5LTEwMwogICAgLy8gY29uc3Qgb3B0SW5Db3VudCA9IHNwbGl0T3B0SW5Db3VudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICBhc3NldAogICAgLy8gKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDUKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNy0xMTgKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTMtMTE2CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNy0xMTgKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwCiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEyCiAgICAvLyBbYXNzZXQuaWRdLAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBieXRlYyAyMyAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA3LTExOAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTIKICAgIC8vIHRydWUsCiAgICBieXRlYyAxNyAvLyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA3LTExOAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsgYXBwSWQ6IHdhbGxldCB9KQogICAgaXR4bl9uZXh0CiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIyCiAgICAvLyBpZiAoYW1vdW50ID4gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBvcHRBa2l0YUVzY3Jvd0luQW5kU2VuZF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMy0xMjkKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI1CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEyOAogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCm9wdEFraXRhRXNjcm93SW5BbmRTZW5kX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMgogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzQKICAgIC8vIHJldHVybiBtYnJBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAKAAEIIKCNBtSTAdTYA6ihHbjZA6SEAyYbBBUffHUJYWtpdGFfZGFvAW8MYWtpdGFfZXNjcm93AXMBYgFtAgAAAQABbAEUASgGd2FsbGV0AXADYWFsEXN1YnNjcmlwdGlvbl9mZWVzAQoBgARL1iHYBBeVoNAEyINRMAQoG4kbBDlOrrICAAEHdmVyc2lvbhFyZXZfc3Vic2NyaXB0aW9ucwNwYWyABOqRgN02GgCOAQE4MRkURDEYQQEhJxInEycUgg0EF8hzCwRM3wzXBIfgVcYEtZyKVASu67N4BFNV2m0EEPAMOgSmjmljBLEKMG4E8jVbVQQaxKdYBOOuslwE6qqk0ycVghEEw9nx3ATA/ycwBCdSA68EEmnYfgRDA2aOBA1qR6MEHceDcQQJoxWOBPmZY9QEGhNvfATi03AKBCW4EqcElpztmwQv/JbVBGA9cpcE3+YCzwTYpsUjJxaCBAQz94gIBB6tIKkEM+kslASFTe3gNhoAjicDTwUjBgQGKQZOBnMGlwbPBvsHegflCHAI6QkzCXkJ6gqhCvwLCwsbC7UMuwzhDRkNbgADDc4N8Q7YD7MPzREwEUwRbhGQEd0SBBJVAAEAI0OADBUffHUAAAAAAAA9VLAjQ4AEiMlA+DYaAI4BAv0AMRmBBBIxGBBEQhHzigEBMQCL/0AABIsATImL/4ASY29udHJvbGxlZF9hZGRyZXNzZUhC/+OKAQEyA4v/QAAEiwBMiYv/gAhyZWZlcnJlcmVIQv/tigIBi/6AA29hbGVIgRhbsYAEPBpvM7Iai/+yGrIYgQayECKyAbO0PklXBABLAVcABCgSREkiWYECCEwVEkRXBgBJFUlBAAeLASQTQQAEIowAiYsAF0L/94oEAYv8OBiL/ScOZUiBKFsSQQA6i/w4GUAAM4v8OBuBBBJBACmL/CLCGoAEQ5ImVRJBABqL/CPCGov+EkEAD4v8gQLCGov/FhJBAAIjiSKJigIBgABJi/4xAIj/S4j/KTIDEkEABCKMAImL/icOZUgkW4wBIQiMAIv/QQAViwFyCESL/3AARQFAAAchCDIQCIwAiYoDASKAAEcEi/0xAIj/Boj+5Iv/QQFwiwYyAxNBAWiL/YALd2FsbGV0X2ZlZXNlSCRbSSEEDkSL/x0hBJdJjANAAAiL/0EAAyOMAzIHjAUyB4GA9SQIjAKLAxaLBkxQJxdMUEmMAIv9Jw5lSCRbjAQiWYHUxQELgeSTAgiMAYv+QABfsYsESXIIRIsBiwMIsgiyByOyECKyAbaLBRaLAhaABHt9xfyyGkyyGrIaiwCyGrIYgQayECKyAbO3AT5JVwQATFcABCgSREkVJBJEFxaLARZQVwgIi/+LAwkWTFCMAImLBHIIRIv+cABFAUEAaIsBiwRJcghEsUsBcghEiwGyCLIHI7IQIrIBtov+shGLA7ISshSBBLIQIrIBtosFFosCFoAErxoU8rIaTLIashqLALIashiBBrIQIrIBs7cCPklXBABMVwAEKBJESRUkEkQXTIwBQv93iwEyEAixiwRJcghEMhCyCLIHI7IQIrIBtov+FicWshqyGrIYgQayECKyAbNC/2uL/xYiFlCMAImKAwEii/6L/3AARQFAABqL/YAOcmV2ZW51ZV9zcGxpdHNlSCJZIwiMAIsATIk2GgFJIlmBAghLARUSRFcCADYaAkkVJBJEFzYaA0kVJBJEFycYTwNnKU8CZytMZyNDIkcCgABHBDEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJIlmBAghLARUSRFcCADYaB0kVgSQSRDYaCEkVIxJENhoJSRWBAxJEJwYxAFC9RQEnBjEAUEm9RQFBAVNJvkQXSSMIFksCTL8xAEwWSUUWUEUTSwiBBA9ESwqBPA9ESweBBQ5ESwUVSUUOgYABDkQiKWVEJw9lSCJbSUUPIQkIRQ9LAUAAB0sOIQUIRQ9LCUEAKzIKSwpJTgJwAEUBRCIrZURyCERMcABFAUAAEEsOMhAIRQ8nGUsKIogTmUgiKWVESwpJTgJLEIj9BkkiW0wkW0sOSTgHMgoSTDgISxNPAwgSEESxIitlRHIIRLIHsggjshAisgGzSwsWJxBMUEwWUEsJFlBLCBZQSwcWUEsNFlcGAksHUEyAAgBVUEsBFYFVCBZXBgJQSwZQSwVQSwRQTFAnB1AqSxRQSbxITL8iRRExFiMIRRBLDzIEDEEAJ0sPOBCBBhNAAC1LD0k4GDIIEkRJOBkURCLCGklFEycUEkEADSNFEUsQRChLFFCwI0NLEScTEkRLDyMIRRBC/7gjQv6tIoAANhoBSRUkEkQXSTYaAkkiWYECCEsBFRJEVwIATDEWRIHyDwoxFiMJTAlJOBCBBhJBAKhJOBgyCBJBAJ9JOBlAAJlJIsIaJxISQQCPI0QnBjEAUL5EFyMJMQBMFlAqTFBJRQZJvUUBREkiI7onEBJESwIVSwRJTgMIgc8YDkS+SEmBK1lLARVSVwIASU4CFUlFB0oORAxBABoiSwVJTgIPIksCTwJNSwVJSwMPTE8DTwJNUksCUEsFSU4CvkRLARUWVwYCTwJQSwGBK1lPAiJPAlhMUEsBvEi/I0MiQv9uJwYxAFC+RBcjCTEATBZQKkxQSb1FAURJIiO6JxASRCInCrsjQzYaAUkVJBJEFzEATBZQKkxQSb1FAURJIiO6JwoSRCKAAR67I0M2GgFJFSQSRBcxAEwWUCpMUEm9RQFESSIjuoABHhJEIicKuyNDNhoBSRUkEkQXMQBMFlAqTFBJvUUBREkiI7onCxNEIicLuyNDMRYjCUk4ECMSRDYaAUkVJRJEMQBMiAvRJwVMUEm9RQEUREsBOAcyChJPAjgIgdR6EhBEIrlII0M2GgFJFSUSRDEATIgLoycFTFBJvUUBRLxIsTEAgdR6sgiyByOyECKyAbMjQzEWgQIJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFSUSRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEF0sCgQQPREsBgTwPRElESRZLBExQKkxQSb1FAUSBISS6FyIpZUQxAIj5GIj4zSIpZURPB0xPAk8DiPlfRIgMTxYoTFCwI0MxFiMJSTgQIxJENhoBSRUlEkQ2GgJJFSQSRBdJNhoDSRUkEkQXSU4CNhoESRUkEkQXSU4DTwKBBA9ETIE8D0RBABVJFksETFAqTFBJvUUBRIEhJLoXFERLBEsESwRLBEsEiAvkFihMULAjQzEWgQMJSTgQIxJEMRaBAglJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFSUSRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEF0sCgQQPREsBgTwPRElESRZLBExQKkxQSb1FAUSBISS6FyIpZUQxAIj4Ioj31yIpZURPB0xPAk8DiPhpRIgMaxYoTFCwI0MxFoECCUk4ECMSRDEWIwlJOBCBBBJENhoBSRUlEkQ2GgJJFSQSRBdJNhoDSRUkEkQXSU4CNhoESRUkEkQXSU4DTwKBBA9ETIE8D0RBABVJFksETFAqTFBJvUUBRIEhJLoXFERLBUsFSwVLBUsFSwWIC/IWKExQsCNDMRYjCUk4ECMSRDYaAUkVJBJEFzEATBZQSVcAIExXIAhQJwRMUEm9RQFESb5ISYFAWxRESwI4BzIKEkSBYFtPAjgICBaBYEy7I0MxFiMJSTgQgQQSRDYaAUkVJBJEFzEATBZQJwRMUEm9RQFESb5ISYFAW0sDOBESREsCOBQyChJEgWBbTwI4EggWgWBMuyNDNhoBSRUkEkQXNhoCSRUkEkQXSU8CMQBMFlAnBExQSU4CSb1FAUS+SEmBYFtPAg9EgUBbSUEAJ7ExAEsDshJLAbIRshSBBLIQIrIBs0sBSb5EgWBbSwQJFoFgTLsjQ7ExAEsDsgiyByOyECKyAbNC/9sigABJNhoBSRUkEkQXMQBMFlAnBExQRwK9RQFEvkhJIQZMJVtJQQA1SwJXACBLARZJRQlQKkxQgRkkuhdBAB4xAEsHUCcNTFC9RQFBAA8xAEsHUCcNTFC8SCEHRQJLAoFAW0lFB0EANksCgWBbSUUGQQAVsTEASwWyEksGshGyFIEEshAisgGzsTEASwKyCLIHI7IQIrIBs0sDvEgjQ7ExAEsDgWBbSwMIsgiyByOyECKyAbNC/+ExFiMJSTgQgQYSRDYaAUkVgSgSRCcESwFQSb1FAUS+SEklW0xXACBLAURMFlAqTFBJvUUBRIEhJLoXIillRDEAiPWSiPVHIillRE8ETE8CTwOI9dlEiAwDSCNDNhoBSRWBKBJEiAv0SCNDNhoBSRWBKBJEIogHtUgjQzYaAUkVJBJEFzYaAklOAkkiWUlOA0klC4ECCE8CFRJEMQBPAhZJTgNQJwRMUEm9RQFEvkhJJVtMVwAgSU4CTgNJRBZQKkxQSb1FAURJIiO6TIEZJLoXTCcLE0QORCJJSwQMQQAkSwRXAgBLAUlOAiULJVhLA0yIBuwnBUxQvUUBFEQjCEUBQv/VMQBLA1AnDUxQSbxISwW/I0MiRwOAAEcINhoBJwciSwIiWUlFDUsBDUEA5SJFCEsCVwIASwFJTgKBAgtLAUxZTwIjCElFDEsOSwEJSwMVTwKBAgtLBExZTwJNUklFEUklWUsBFVJJRRAiWUsIDUEAmUsPVwAgSw9XAgBLCSQLJFhQiAoWSCcIIk8CVEUOSwFJIllJRQ1JIwhJFlcGAE8DTFwARQ9MgQcIJApJRQxMgQcIJApJRQgMQQAMSwVLCgmvSw1MUEUNIkUHSwqBEAhJRQUjCEUFSwNLBQxBAB9LDUsHSU4CU0sOSwZJTgNPAlRFDyMIRQUkCEUHQv/ZSwcjCEUISwxFAkL/JUsIRQFC/w4oSwJQsCNDNhoBSRUlEkQ2GgJJFSUSRIgFsicFTFC9RQEnCCJPAlQoTFCwI0M2GgFJFSUSRDYaAkkVJBJEFxZQKkxQSb1FAUEAF0kiI7onCxJBAA0jJwgiTwJUKExQsCNDIkL/8DYaAUkVJBJEFyIpZUQnD2VIIlshCQgnBjEAUL1FAUAABkkhBQhFAUsBQQAWIitlRHIIREsCcABFAUAABkkyEAhFASIpZURLAojzuksBCBYoTFCwI0M2GgFJFSUSRDYaAkkVJBJEFzYaA0kVJBJEF0khBkxBABtLARZLBExQKkxQSb1FAUSBGSS6F0EABCEHRQEnCTEAUL1FAUAABkkhBQhFASIpZURLA4jzWksBCBYoTFCwI0M2GgFJFSUSRDYaAkkVJBJEFxZQKkxQSb1FAUS+SChMULAjQyJHA4AARwM2GgFJFSUSRDYaAkkVJBJEF0k2GgNJFSQSRBdMJwdMSwNLAwhLAQ1BAK9JFksFTFAqTFBJRQ29RQFBAJ1LC75ESwJJIllJTgJFDFcCAEUPgAIAAk8CUEULgABFDIECC0UGIkUHSwZLBgxBAB1LDEsHSU4CWYECCBZXBgJLDExQRQyBAghFB0L/20sMFUUIIkUHSwaBAgxBAB1LCUsHSU4CWUsJCBZXBgJLDExQRQyBAghFB0L/20sIIwgWVwYCSwtQSw1LB0sKUlBLClcCAFBFAkkjCEUBQv9GKEsCULAjQzYaAUkVgSgSRCcETFBJvUUBQABxgGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoTFCwI0NJvkRJVwAgSwFXIAhLAlcoCEsDVzAISwRXOAhLBVdACEsGV0gISwdXUAhLCFdYCE8JV2AIJxFPClBPCVBPCFBPB1BPBlBPBVBPBFBPA1BPAlBMUEL/pDYaAUkVgSgSRCcETFBJvUUBRL5IKExQsCNDIkk2GgFHAhWBKBJEJwRMUEm9RQFEvkhJJwhMgABMgABMgSSvTCcITIADMDAwTCVbSUEAVEsHVwAgSwEWUCpMUEm9RQFESb5ITEkiI7pFCUsBgSlZSwKBK1lLA08CSwJSVwIARQlLAhVPA04CUlcCAEUGSYMCLSS6RQVJgVEjukUEgwJSA7pFAicHRQonDUsJUElFDL1FAUEAGksKvkRXAgAnB0xQSVcCABUlChZXBgJcAEUKSwdJVwAgSwFXKAhLAlcwCEsDVzgISwRXQAhLBVdICEsGV1AISwdXWAhPCFdgCE8ITwhQTwdQTwZQTwVQTwRQSwQWUEsKUEsJSRUWVwYCTFBMgAIAl1BLARWBlwEISwpJFRZXBgJMUEsBFlcGAk8DTFBLARVPAwhLCkkVgSQSRE8CTFBLCVBLCElOAhWBAxJETFBPBlBPBVBPBFBMFlcGAlBPAlBMUEsKUChMULAjQzYaAUkVJRJEJwlMUL1FARQnCCJPAlQoTFCwI0M2GgFJFSUSRCcGTFBJvUUBQQALSb5EFxYoTFCwI0MiQv/1NhoBSRUlEkQnCUxQSb1FAUEAC0m+RBcWKExQsCNDIkL/9TEWIwlJOBAjEkQ2GgFJFSQSRBciKWVEIitlRHIIREsCiPE+SwI4BzIKEk8DOAgyECNPBAgLEhBEsTIKTLIRIrISshSBBLIQIrIBsyNDNhoBSRUkEkQXIillRCIrZURyCERPAojw+zIQI08CCAsWKExQsCNDNhoBSRUkEkQXMQAiKWVEJwxlSHIIRBJEK0xnI0M2GgFJIlmBAghLARUSRFcCADEAIillREknDGVIcghETwISRCcaZUiBEFsyDRJEJxhMZyNDNhoBSRUkEkQXMQAiKWVEJwxlSHIIRBJEKUxnI0OKAgEyB0mL/gmL/xgJiYoCAYv+FSJLAQ8iSwJPAk2BEEsCD4EQTwNPAk2L/k4CUkkVgRASRIv/FSJLAQ8iSwJPAk2BEEsCD4EQTwNPAk2L/04CUkkVgRASRFCJigIBJwSL/lBJvkRJgShbSwGBOFtMSwGI/4tJTgNMCUlPAoFQW0lPAgxBAA+L/xaLAIFYTwK7i/6MAImLA4sCD0EAF4sDiwEPQAAPiwBJvkSBWFsjCBaBWEy7i/6MAImKAQGAACIpZUQnD2VISSJMJFtJQQAciwNJIQQORIv/HSEEl0mMAkAACYv/QQAEgQKMAiKMAIsBgRBbSYwDQQAbiwNJIQQORIv/HSEEl0mMAEAACIv/QQADI4wAiwJJiwBJTgMIi/9MCUwWTwIWUEwWUIwAiYoBAScJi/9QSb1FAUEAD4sAvkQXSSMIFosATL9MiSNC//KKBQEigACL/DEAiP6xJwVMUL1FARREIiEGi/9BAEKL/xaL/ExQKkxQSb1FAURJIiO6JwoSREmBCSS6FxRESYERJLoXjP1JIyS6F4z+SYEhJLoXjAKBGSS6F0EABCEHjAMnCTEAUL1FATEAiP9xSYwBMQBMFlCMAEAAB4sDIQUIjAOL/Yj+5EkiW0sBJFsIIillRCJPAojtB0kiW0wkW4v7OAcyChKL+zgIi/2LAwhPAwhKD08DEESxIitlRHIIRE8DsgiyByOyECKyAbOxTwKBEFuyCIv8sgcjshAisgGzCTIHSYv/Fov8TFBPAhZQi/0WUIv+FlAiFlCLAhZQTBZQIxZQTBZQJwSLAFBMv4sBjACJigYBIkmAAEcDi/wxAIj9nCcFTFC9RQEURCIhBov/QQBGi/8Wi/xMUCpMUEm9RQFESSIjuicKEkRJgQkkuheL+zgREkRJgREkuheM/UkjJLoXjP5JgSEkuheMBoEZJLoXQQAEIQeMBycJMQBQvUUBMQCI/lhJjAQxAEwWUIwBQAAHiwchBQiMB4v9iP3LSYwASSJbTCRbCCIpZUSL+zgRSYwFTEsBTwOI6+NJIluMAiRbjAMiK2VEcghETHAARQFAAIsnGYsFiwKIAkZIi/o4BzIKEov6OAiLB4sDCBIQRIv7OBQyChKL+zgSSYv9D08CEESxiwCBEFuyEosFSU4CshGL/LIUgQSyECKyAbOL/QkyB0mL/xaL/ExQTwIWUIv9FlCL/hZQTwMWUIsGFlBMFlAjFlBMFlCLAUlXACBMVyAIUCcETFBMv4sEjACJsSIrZURyCESLArISiwWyEbIUgQSyECKyAbNC/2KKAQIiSYAARwUnBIv/UEm9RQFAAAgii/+MAYwAiYsIvkRJVwAgSU4CjAFJJVuMBkmBUFuMBUmBKFuMB0mBOFuMBEmBYFuMA4EwW4wCi/9XACCI++4nBUxQvUUBQQAIIov/jAGMAImLBkEAJosGFosBTFAqTFBJjAC9RQFBAAuLACIjuicLEkEACCKL/4wBjACJiweLBIj7nIsFDkEACCKL/4wBjACJiwKLAw1BAAgii/+MAYwAiSOL/4wBjACJigEBi/+I/zqM/0QnBIv/UL5ESVcAIExJgTBbTEmBQFtMgUhbQQAHIsAaJxUSRIsBiPv9iwJBAHSxIitlRHIIREsBIluyEosCSU4DshGyFIEEshAisgGzsTEASwEkW7ISSwKyEbIUgQSyECKyAbOxgRBbshKyEYsAshSBBLIQIrIBs4v/I4j7SYz/JwSL/1BJvkSBYFuLAQkWSwGBYE8CuzIHFoFQTLuL/4wAibEiK2VEcghESwEiW7IIsgcjshAisgGzsTEASwEkW7IIsgcjshAisgGzsYEQW7IIiwCyByOyECKyAbNC/5mKAwEiKWVESScMZUhMSScaZUhJVwgITCRbSwInDGVIsYv9FRZXBgKL/VCABAABAAJLAVCABKJAPd+yGrIaTLIYgQayECKyAbO0PklXBABLAVcABCgSREkiWYEJC4ECCEwVEkRXBgkiW0lEIitlRExLARJEsYAEWC/zgrIaTwOyGicRshpMshqACgABAAAAAAAAAACyGicHshpLA7IYgQayECKyAXIIRE8CTIv+iOpdMhALSU4DtiIrZURyCESyB7III7IQIrIBtksBFov+FicXTFCABGg147yyGkyyGicRshqyGrIYgQayECKyAbaABGzD9gayGrIYgQayECKyAYv/QQAZtiIrZURyCESL/rIRi/+yErIUgQSyECKyAbOLAEyJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
function ServiceFromTuple(abiTuple) {
  return _apparc56.getABIStructFromABITuple.call(void 0, abiTuple, APP_SPEC.structs.Service, APP_SPEC.structs);
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
          case "create(string,uint64,uint64)void":
            return _SubscriptionsParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Subscriptions smart contract using the create(string,uint64,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,uint64,uint64)void",
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
   * Constructs a no op call for the newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64 ABI method
   *
   * newService creates a new service for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newService(params) {
    return {
      ...params,
      method: "newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.interval, params.args.asset, params.args.amount, params.args.passes, params.args.gateId, params.args.title, params.args.bannerImage, params.args.highlightMessage, params.args.highlightColor]
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
   * Constructs a no op call for the getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getService(params) {
    return {
      ...params,
      method: "getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])",
      args: Array.isArray(params.args) ? params.args : [params.args.address, params.args.id]
    };
  }
  /**
   * Constructs a no op call for the getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[] ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getServicesByAddress(params) {
    return {
      ...params,
      method: "getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]",
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
   * Constructs a no op call for the getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[]) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getSubscriptionWithDetails(params) {
    return {
      ...params,
      method: "getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])",
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
   * Constructs a no op call for the updateAkitaDAOEscrow(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateAkitaDaoEscrow(params) {
    return {
      ...params,
      method: "updateAkitaDAOEscrow(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.app]
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
var SubscriptionsFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `SubscriptionsFactory`
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
  __init() {this.params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the Subscriptions smart contract using the create(string,uint64,uint64)void ABI method.
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
       * Creates a new instance of the Subscriptions smart contract using the create(string,uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(SubscriptionsParamsFactory.create.create(params));
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
       * Creates a new instance of the Subscriptions smart contract using an ABI method call using the create(string,uint64,uint64)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(SubscriptionsParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new SubscriptionsClient(result.appClient) };
      }
    }
  }}
}, _class);
var SubscriptionsClient = (_class2 = class _SubscriptionsClient {
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
   * Returns a new `SubscriptionsClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _SubscriptionsClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `SubscriptionsClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _SubscriptionsClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]` ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the Subscriptions smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
  }}
  /**
   * Clone this app client with different params
   *
   * @param params The params to use for the the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])` ABI method.
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
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]` ABI method.
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
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])` ABI method.
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
  __init7() {this.state = {
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
  }}
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64 method call against the Subscriptions contract
       */
      newService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newService(params)));
        resultMappers.push((v) => client.decodeReturnValue("newService(pay,uint64,uint64,uint64,uint64,uint64,string,byte[36],uint8,byte[3])uint64", v));
        return this;
      },
      /**
       * Add a setServiceDescription(uint64,byte[])void method call against the Subscriptions contract
       */
      setServiceDescription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setServiceDescription(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a activateService()void method call against the Subscriptions contract
       */
      activateService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.activateService(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a pauseService(uint64)void method call against the Subscriptions contract
       */
      pauseService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.pauseService(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a unpauseService(uint64)void method call against the Subscriptions contract
       */
      unpauseService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unpauseService(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a shutdownService(uint64)void method call against the Subscriptions contract
       */
      shutdownService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.shutdownService(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a block(pay,address)void method call against the Subscriptions contract
       */
      block(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.block(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a unblock(address)void method call against the Subscriptions contract
       */
      unblock(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unblock(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribe(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribe(params)));
        resultMappers.push((v) => client.decodeReturnValue("gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a subscribe(pay,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribe(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribe(params)));
        resultMappers.push((v) => client.decodeReturnValue("subscribe(pay,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribeAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribeAsa(params)));
        resultMappers.push((v) => client.decodeReturnValue("gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribeAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribeAsa(params)));
        resultMappers.push((v) => client.decodeReturnValue("subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a deposit(pay,uint64)void method call against the Subscriptions contract
       */
      deposit(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deposit(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a depositAsa(axfer,uint64)void method call against the Subscriptions contract
       */
      depositAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.depositAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a withdraw(uint64,uint64)void method call against the Subscriptions contract
       */
      withdraw(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.withdraw(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a unsubscribe(uint64)void method call against the Subscriptions contract
       */
      unsubscribe(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.unsubscribe(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedTriggerPayment(appl,(address,uint64))void method call against the Subscriptions contract
       */
      gatedTriggerPayment(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedTriggerPayment(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a triggerPayment((address,uint64))void method call against the Subscriptions contract
       */
      triggerPayment(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.triggerPayment(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a streakCheck((address,uint64))void method call against the Subscriptions contract
       */
      streakCheck(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.streakCheck(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setPasses(uint64,address[])void method call against the Subscriptions contract
       */
      setPasses(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setPasses(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a triggerList((address,uint64[])[])bool[] method call against the Subscriptions contract
       */
      triggerList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.triggerList(params)));
        resultMappers.push((v) => client.decodeReturnValue("triggerList((address,uint64[])[])bool[]", v));
        return this;
      },
      /**
       * Add a isBlocked(address,address)bool method call against the Subscriptions contract
       */
      isBlocked(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isBlocked(params)));
        resultMappers.push((v) => client.decodeReturnValue("isBlocked(address,address)bool", v));
        return this;
      },
      /**
       * Add a isShutdown(address,uint64)bool method call against the Subscriptions contract
       */
      isShutdown(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isShutdown(params)));
        resultMappers.push((v) => client.decodeReturnValue("isShutdown(address,uint64)bool", v));
        return this;
      },
      /**
       * Add a newServiceCost(uint64)uint64 method call against the Subscriptions contract
       */
      newServiceCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newServiceCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("newServiceCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a newSubscriptionCost(address,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      newSubscriptionCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newSubscriptionCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("newSubscriptionCost(address,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a blockCost()uint64 method call against the Subscriptions contract
       */
      blockCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.blockCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("blockCost()uint64", v));
        return this;
      },
      /**
       * Add a getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3]) method call against the Subscriptions contract
       */
      getService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getService(params)));
        resultMappers.push((v) => client.decodeReturnValue("getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])", v));
        return this;
      },
      /**
       * Add a getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[] method call against the Subscriptions contract
       */
      getServicesByAddress(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getServicesByAddress(params)));
        resultMappers.push((v) => client.decodeReturnValue("getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,string,string,byte[36],uint8,byte[3])[]", v));
        return this;
      },
      /**
       * Add a getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the Subscriptions contract
       */
      getSubscription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscription(params)));
        resultMappers.push((v) => client.decodeReturnValue("getSubscription((address,uint64))(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64) method call against the Subscriptions contract
       */
      mustGetSubscription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mustGetSubscription(params)));
        resultMappers.push((v) => client.decodeReturnValue("mustGetSubscription((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[]) method call against the Subscriptions contract
       */
      getSubscriptionWithDetails(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscriptionWithDetails(params)));
        resultMappers.push((v) => client.decodeReturnValue("getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", v));
        return this;
      },
      /**
       * Add a isFirstSubscription(address)bool method call against the Subscriptions contract
       */
      isFirstSubscription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isFirstSubscription(params)));
        resultMappers.push((v) => client.decodeReturnValue("isFirstSubscription(address)bool", v));
        return this;
      },
      /**
       * Add a getServiceList(address)uint64 method call against the Subscriptions contract
       */
      getServiceList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getServiceList(params)));
        resultMappers.push((v) => client.decodeReturnValue("getServiceList(address)uint64", v));
        return this;
      },
      /**
       * Add a getSubscriptionList(address)uint64 method call against the Subscriptions contract
       */
      getSubscriptionList(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscriptionList(params)));
        resultMappers.push((v) => client.decodeReturnValue("getSubscriptionList(address)uint64", v));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the Subscriptions contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the Subscriptions contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("optInCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow(uint64)void method call against the Subscriptions contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Subscriptions contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Subscriptions contract
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

// src/utils.ts
function convertToUnixTimestamp(timestamp) {
  return timestamp * 1000n;
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

// src/subscriptions/index.ts
var toBigInt = (value) => typeof value === "bigint" ? value : BigInt(Math.floor(value));
var toSeconds = (value, unit) => {
  const normalized = toBigInt(value);
  return unit === "milliseconds" ? normalized / 1000n : normalized;
};
var SubscriptionsSDK = (_class3 = class extends _chunkT5TIVGPAjs.BaseSDK {
  __init8() {this.serviceMapKeyGenerator = ({ address, id }) => `${address}${id}`}
  __init9() {this.services = new (0, _chunk56YZPYCLjs.ValueMap)(this.serviceMapKeyGenerator)}
  constructor(params) {
    super({ factory: SubscriptionsFactory, ...params }, _chunkPMAUR73Vjs.ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID);_class3.prototype.__init8.call(this);_class3.prototype.__init9.call(this);;
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
      const response = await algod.accountAssetInformation(appAddress, assetId).do();
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
    this.services = new (0, _chunk56YZPYCLjs.ValueMap)(
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
      amount: _algokitutils.microAlgo.call(void 0, paymentAmount),
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
        amount: _algokitutils.microAlgo.call(void 0, optInCost),
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async block({ sender, signer, block }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const paymentAmount = await this.blockCost({ sender, signer });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, paymentAmount),
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
      amount: _algokitutils.microAlgo.call(void 0, paymentAmount),
      receiver: this.client.appAddress.toString()
      // Convert Address to string to avoid instanceof issues
    });
    const group = this.client.newGroup();
    if (needsOptIn) {
      const optInCost = await this.optInCost({ ...sendParams, asset });
      const optInPayment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, optInCost),
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
    });
    group.opUp({
      ...sendParams,
      args: {},
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3),
      note: "1"
    });
    console.log("group built:", (await (await group.composer()).build()).transactions);
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
        amount: _algokitutils.microAlgo.call(void 0, amount),
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
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
      maxFee: _algokitutils.microAlgos.call(void 0, 1e3)
    });
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
}, _class3);











exports.hexColorToBytes = hexColorToBytes; exports.bytesToHexColor = bytesToHexColor; exports.validateHexColor = validateHexColor; exports.ServiceStatus = ServiceStatus; exports.HighlightMessage = HighlightMessage; exports.MAX_DESCRIPTION_LENGTH = MAX_DESCRIPTION_LENGTH; exports.MAX_DESCRIPTION_CHUNK_SIZE = MAX_DESCRIPTION_CHUNK_SIZE; exports.MAX_LOAD_DESCRIPTION_CHUNK_SIZE = MAX_LOAD_DESCRIPTION_CHUNK_SIZE; exports.SubscriptionsSDK = SubscriptionsSDK;
//# sourceMappingURL=chunk-TYJ5A2L2.js.map
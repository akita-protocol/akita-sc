"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class; var _class2; var _class3;



var _chunk6PXDU6U7js = require('./chunk-6PXDU6U7.js');


var _chunkAP6ZTMSTjs = require('./chunk-AP6ZTMST.js');


var _chunkMZHAP7IAjs = require('./chunk-MZHAP7IA.js');



var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkBB4CUEDUjs = require('./chunk-BB4CUEDU.js');



var _chunkBZZOJWPRjs = require('./chunk-BZZOJWPR.js');

// src/subscriptions/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');


// src/generated/SubscriptionsClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Subscriptions", "structs": { "BlockListKey": [{ "name": "address", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "Service": [{ "name": "status", "type": "uint8" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "passes", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }], "ServicesKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionInfo": [{ "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionInfoWithDetails": [{ "name": "recipient", "type": "address" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "serviceId", "type": "uint64" }, { "name": "status", "type": "uint8" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "passes", "type": "address[]" }], "SubscriptionInfoWithExistence": [{ "name": "exists", "type": "bool" }, { "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionPrincipal": [{ "name": "wallet", "type": "uint64" }, { "name": "principal", "type": "address" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "GateCtx": [{ "name": "principal", "type": "address" }, { "name": "wallet", "type": "uint64" }, { "name": "spender", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment", "desc": "The payment for the service creation" }, { "type": "uint64", "name": "interval", "desc": "The interval in seconds" }, { "type": "uint64", "name": "asset", "desc": "The asa to be used for the subscription" }, { "type": "uint64", "name": "amount", "desc": "The amount of the asa to be used for the subscription" }, { "type": "uint64", "name": "passes", "desc": "The number of accounts the subscription can be shared with" }, { "type": "uint64", "name": "gateID", "desc": "The gate to be used for the subscription" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account.\nThe referral cut goes to the verified wallet's referrer (no registry lookup)." }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "newService creates a new service for a merchant", "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "passes" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "setServiceDescription", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateServiceTitle", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateServiceHighlight", "args": [{ "type": "uint64", "name": "id", "desc": "the service id" }, { "type": "uint8", "name": "highlightMessage", "desc": "the highlight label (`HighlightMessage*`, 0 = none)" }, { "type": "byte[3]", "name": "highlightColor", "desc": "the highlight colour (3 bytes)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "updateServiceHighlight changes the highlight label and colour of one of the sender's services", "events": [], "recommendations": {} }, { "name": "setFeaturedService", "args": [{ "type": "pay", "name": "payment", "desc": "the storage payment to this app" }, { "type": "uint64", "name": "id", "desc": "an existing, not shut down service of the sender" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "setFeaturedService picks the sender's service that apps show front and center.\nThe first call creates the featured box: `payment` covers `FeaturedServiceMBR` (plus the payer\nrecord when someone else pays). Later calls only change the id and take a 0 ALGO payment.", "events": [], "recommendations": {} }, { "name": "clearFeaturedService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "clearFeaturedService removes the sender's featured service and returns the storage to whoever paid it", "events": [], "recommendations": {} }, { "name": "activateService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "activateService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "pauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "pauseService pauses a service for a merchant\nit does not shutdown pre-existing subscriptions\nit simply prevents new subscriptions from being created\nfor a specific service", "events": [], "recommendations": {} }, { "name": "unpauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unpauseService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "shutdownService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "shutdownService permanently shuts down an service for a merchant\nit also shutsdown pre-existing subscriptions", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "payment", "desc": "The payment to cover mbr for blocking" }, { "type": "address", "name": "blocked", "desc": "The address to be blocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "block blacklists an address for a merchant", "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "blocked", "desc": "The address to be unblocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unblock removes an address from a merchants blocks", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through\n`Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified\nwallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the referral cut goes to the verified wallet's referrer" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Subscribe to an ungated ALGO service (or donate with `serviceID` 0).", "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).", "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`subscribe` for an ASA service (`payment` covers the MBR exactly).", "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "deposit", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "depositAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unsubscribe", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the\ncaller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only\nselects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must\nbe `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.", "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the\nsubscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "triggerPayment", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).", "events": [], "recommendations": {} }, { "name": "adoptPrincipal", "args": [{ "type": "pay", "name": "payment" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the\nregistry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the\nPhase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly\n`SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).", "events": [], "recommendations": {} }, { "name": "streakCheck", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Resets the streak of a subscription that missed a payment window. Never increments it\n(audit SG-02): only payments grow a streak.", "events": [], "recommendations": {} }, { "name": "setPasses", "args": [{ "type": "uint64", "name": "id" }, { "type": "address[]", "name": "addresses" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearOrphanPasses", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes a pass box left behind by a subscription that was cancelled before the SG-08\nfix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:\nwhether the owner was already refunded cannot be determined on-chain.", "events": [], "recommendations": {} }, { "name": "triggerList", "args": [{ "type": "(address,uint64[])[]", "name": "req" }], "returns": { "type": "bool[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "address", "desc": "The address to be checked" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "isBlocked checks if an address is blocked for a merchant", "events": [], "recommendations": {} }, { "name": "isShutdown", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "serviceIsActive checks if an service is shutdown", "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the\nstored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral\ndisbursement MBR when the wallet has a referrer.", "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "triggerGateCtx", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(address,uint64,address)", "struct": "GateCtx" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code\n(`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the\nfollowing target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.", "events": [], "recommendations": {} }, { "name": "blockCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getService", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])", "struct": "Service" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getFeaturedService", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "the creator's featured service id, 0 when none is set", "events": [], "recommendations": {} }, { "name": "getServicesByAddress", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "start" }, { "type": "uint64", "name": "windowSize" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfoWithExistence" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionWithDetails", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", "struct": "SubscriptionInfoWithDetails" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFirstSubscription", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServiceList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "passesRepricedAt": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGFzc2VzX3JlcHJpY2VkX2F0", "desc": "Subscriptions that started before this timestamp paid the legacy pass MBR\n(`LegacyPassesMBR`) and get it back on unsubscribe (audit SG-08 / decision SG-K).\nSet once, lazily, by the first subscribe / unsubscribe after the upgrade." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "subscriptions": { "keyType": "SubscriptionKey", "valueType": "SubscriptionInfo", "prefix": "cw==" }, "subscriptionslist": { "keyType": "address", "valueType": "uint64", "desc": "A counter for each addresses subscription id", "prefix": "bA==" }, "services": { "keyType": "ServicesKey", "valueType": "Service", "desc": "services is a map of services a specific merchant has\ndenoted by the merchant address + index of the offer as a key\n32 + 8 = 40 bytes\n120 bytes total -> (2500 + (400 * 121)) = 0.050500", "prefix": "bw==" }, "serviceslist": { "keyType": "address", "valueType": "uint64", "prefix": "bQ==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "blocks allow merchants to specify which addresses cannot subscribe\nkey will be merchant address + blocked address\n32 + 32 = 64 bytes\n65 bytes total -> (2500 + (400 * 64)) = 0.028500", "prefix": "Yg==" }, "passes": { "keyType": "SubscriptionKey", "valueType": "address[]", "prefix": "cA==" }, "principals": { "keyType": "SubscriptionKey", "valueType": "SubscriptionPrincipal", "desc": "Stored principal pair `(W, principal)` of a gated subscription made through a verified wallet\n(principal resolution \xA76.4, Q11). Written by the hinted gated subscribe methods (or backfilled by\n`adoptPrincipal`), re-checked at trigger time without reading any wallet global, deleted and\nrefunded by `unsubscribe`. 'i' + 32 + 8 = 41 byte key, 40 byte value \u2192 `SubscriptionPrincipalMBR`.", "prefix": "aQ==" }, "featured": { "keyType": "address", "valueType": "uint64", "desc": "The service a creator wants shown front and center, keyed by creator. Absent (or 0) means none.\nKept apart from `services` / `serviceslist` so deployed boxes keep their layout.\n'f' + 32 = 33 byte key, 8 byte value \u2192 `FeaturedServiceMBR`, refunded to its payer on clear.", "prefix": "Zg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3049, 3146, 3478, 4654, 4723, 4781, 4832, 4893, 4946, 5021, 5488, 5621, 5718, 6615, 6643, 6723, 6993, 7103, 7145, 7212, 7570, 7605, 8542, 9133, 9593, 9654, 9899, 10033, 10083, 10118, 10271], "errorMessage": "Box must have value" }, { "pc": [1462, 2352, 2486, 7848], "errorMessage": "Bytes has valid prefix" }, { "pc": [4664, 4796, 9044], "errorMessage": "ERR:errAsam" }, { "pc": [2957], "errorMessage": "ERR:errBdln" }, { "pc": [5862, 8487], "errorMessage": "ERR:errBlkd" }, { "pc": [3002], "errorMessage": "ERR:errBofs" }, { "pc": [9891], "errorMessage": "ERR:errCtrg" }, { "pc": [5353, 5428, 9403, 9481], "errorMessage": "ERR:errFgte" }, { "pc": [3330], "errorMessage": "ERR:errFshd" }, { "pc": [9572], "errorMessage": "ERR:errHgte" }, { "pc": [1833], "errorMessage": "ERR:errHnbd" }, { "pc": [1737], "errorMessage": "ERR:errHnwl" }, { "pc": [1756], "errorMessage": "ERR:errHtop" }, { "pc": [4829], "errorMessage": "ERR:errIare" }, { "pc": [4720, 8906, 8929], "errorMessage": "ERR:errIpay" }, { "pc": [1140, 7698], "errorMessage": "ERR:errIpma" }, { "pc": [1126, 7680], "errorMessage": "ERR:errIpmr" }, { "pc": [1251, 4678], "errorMessage": "ERR:errIpms" }, { "pc": [9934, 10605, 10616, 10630], "errorMessage": "ERR:errIseq" }, { "pc": [8225], "errorMessage": "ERR:errIupg" }, { "pc": [1340, 1855], "errorMessage": "ERR:errIwlt" }, { "pc": [8766, 8781], "errorMessage": "ERR:errIxfr" }, { "pc": [9315, 10299], "errorMessage": "ERR:errMamt" }, { "pc": [9327, 10311], "errorMessage": "ERR:errMinv" }, { "pc": [10334], "errorMessage": "ERR:errMxps" }, { "pc": [1089, 1290, 4692], "errorMessage": "ERR:errNcls" }, { "pc": [1276], "errorMessage": "ERR:errNclw" }, { "pc": [8150, 8193, 8261], "errorMessage": "ERR:errNdao" }, { "pc": [4917], "errorMessage": "ERR:errNefn" }, { "pc": [7884], "errorMessage": "ERR:errNesc" }, { "pc": [3430], "errorMessage": "ERR:errNfsv" }, { "pc": [5509], "errorMessage": "ERR:errNgtd" }, { "pc": [5571], "errorMessage": "ERR:errNlwl" }, { "pc": [5748], "errorMessage": "ERR:errNodn" }, { "pc": [8707, 10398, 10421], "errorMessage": "ERR:errNopt" }, { "pc": [1103, 1304, 4706], "errorMessage": "ERR:errNrky" }, { "pc": [9341, 9611], "errorMessage": "ERR:errNsvc" }, { "pc": [5821], "errorMessage": "ERR:errPcof" }, { "pc": [5538], "errorMessage": "ERR:errPexs" }, { "pc": [2929, 3130, 3252, 3306, 3500, 3560, 3609, 3669, 5767, 6613, 7425, 9014, 9540, 9628, 10755], "errorMessage": "ERR:errSdne" }, { "pc": [3574, 9028], "errorMessage": "ERR:errSnac" }, { "pc": [10664], "errorMessage": "ERR:errSnav" }, { "pc": [3526], "errorMessage": "ERR:errSndr" }, { "pc": [3635], "errorMessage": "ERR:errSnpa" }, { "pc": [3683, 5789], "errorMessage": "ERR:errSshd" }, { "pc": [3143, 10351], "errorMessage": "ERR:errTtlg" }, { "pc": [3740], "errorMessage": "ERR:errUabl" }, { "pc": [4651, 4778, 4886, 5012, 5486, 5618, 5716, 5913, 5925, 7101, 7137, 9591], "errorMessage": "ERR:errUdne" }, { "pc": [3826], "errorMessage": "ERR:errUnbl" }, { "pc": [7910], "errorMessage": "ERR:errWesc" }, { "pc": [8294, 8305], "errorMessage": "Length must be 16" }, { "pc": [1362], "errorMessage": "account funded" }, { "pc": [1345, 1367, 2151, 2285, 2382, 2398, 2404, 2507, 7662, 7973, 7989, 8082, 8142, 8185, 8253, 8628, 8692, 8718, 8940, 9965, 10145, 10408, 10435, 10477], "errorMessage": "application exists" }, { "pc": [2737, 5088, 5320, 5335, 5393, 5411, 5542, 6359, 6464, 6526, 6564, 7652, 7656, 7741, 7773, 7965, 8072, 8077, 8135, 8178, 8197, 8246, 8349, 8618, 8623, 8687, 8713, 8935, 9290, 9358, 9380, 9436, 9458, 9697, 9737, 9843, 9960, 10140, 10355, 10403, 10425, 10430, 10472, 10687, 10714], "errorMessage": "check GlobalState exists" }, { "pc": [2209, 8372, 8411], "errorMessage": "errIpct" }, { "pc": [5842, 6088], "errorMessage": "index access is out of bounds" }, { "pc": [3258, 3263, 3309, 3504, 3530, 3564, 3579, 3613, 3639, 3673, 3687, 4736, 4845, 4957, 5053, 5660, 5771, 5776, 6316, 7429, 7437, 7490, 7497, 7504, 9018, 9033, 9050, 9057, 9065, 9073, 9090, 9231, 9544, 9632, 10079, 10097, 10104, 10128, 10224, 10760, 10766], "errorMessage": "index out of bounds" }, { "pc": [5968], "errorMessage": "invalid array encoding" }, { "pc": [1465, 1651, 2264, 2557, 2598, 2688, 2824, 2899, 3097, 5681, 5938, 5996, 6045, 7851, 8124, 8162], "errorMessage": "invalid array length header" }, { "pc": [5693], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [2564, 2695, 2831, 2906, 3107, 8169], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [7860], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [6015], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/subscriptions/types.ts::TriggerListRequest>" }, { "pc": [2682, 2818, 3708, 3794, 3889, 3987, 4064, 4145, 4239, 4354, 4447, 4545, 6251, 6260, 6291, 6402, 6496, 6588, 6630, 6667, 7528, 7557, 7592], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [2707, 2843], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [2724, 2860, 3233], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 3>" }, { "pc": [2575, 2636, 2645, 2654, 2663, 2672, 2732, 2772, 2781, 2790, 2799, 2808, 2882, 2891, 3087, 3211, 3283, 3540, 3589, 3649, 3897, 3906, 3915, 3924, 3995, 4004, 4013, 4072, 4081, 4090, 4099, 4153, 4162, 4171, 4247, 4256, 4265, 4274, 4362, 4371, 4380, 4455, 4464, 4473, 4482, 4553, 4562, 4571, 4621, 4757, 4855, 4864, 4990, 5311, 5671, 6299, 6346, 6354, 6380, 6410, 6420, 6429, 6504, 6513, 6559, 6596, 6675, 6685, 7637, 8067, 8239], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [2715, 2851, 3222], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [1471], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5303, 5380, 5444, 5471, 5603, 5899, 6551, 6866, 7086, 7122], "errorMessage": "invalid number of bytes for smart_contracts/subscriptions/types.ts::SubscriptionKey" }, { "pc": [2603, 8129], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [2357, 2491], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [2590, 8116], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [5992], "errorMessage": "invalid tail pointer at index 1 of (uint8[32],(len+uint64[]))" }, { "pc": [5976], "errorMessage": "invalid tail pointer for (len+(uint8[32],(len+uint64[]))[])" }, { "pc": [2585, 5987, 8111], "errorMessage": "invalid tuple encoding" }, { "pc": [3880, 3978, 4230, 4345, 5294, 5371, 9376, 9454], "errorMessage": "transaction type is appl" }, { "pc": [4219, 4334, 4438, 4536, 4749, 8501, 8682], "errorMessage": "transaction type is axfer" }, { "pc": [2628, 2764, 3275, 3699, 3869, 3967, 4055, 4136, 4208, 4323, 4427, 4525, 4613, 5461, 7629], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgMTg5MDAgMjg1MDAgNjA1MDAgMzQ5MDAgNzk4MDAgMTQ0MjAwIDEzNzg5MDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAibyIgIiIgIkVSUjplcnJTZG5lIiAicyIgImFraXRhX2VzY3JvdyIgIkVSUjplcnJVZG5lIiAiYWFsIiAweDAwICJmIiAweDI4ICJiIiAweDAwMDAgIm0iICJsIiAid2FsbGV0IiAweDE0ICJwIiAicGFzc2VzX3JlcHJpY2VkX2F0IiAiaSIgIkVSUjplcnJGZ3RlIiAiRVJSOmVycklzZXEiICJFUlI6ZXJyTmNscyIgIkVSUjplcnJOcmt5IiAicmVmZXJyZXIiICJFUlI6ZXJyQXNhbSIgIkVSUjplcnJJcGF5IiAiRVJSOmVyck5kYW8iICJzdWJzY3JpcHRpb25fZmVlcyIgIkVSUjplcnJOb3B0IiAweGM4ODM1MTMwIDB4Mzk0ZWFlYjIgImFwcElEIiAiRVJSOmVycklwbXIiICJFUlI6ZXJySXBtYSIgIkVSUjplcnJJcG1zIiAiY29udHJvbGxlZF9hZGRyZXNzIiAiRVJSOmVyckl3bHQiIDB4MDAwMSAidmVyc2lvbiIgIkVSUjplcnJUdGxnIiAiRVJSOmVyclNuYWMiICJFUlI6ZXJyU3NoZCIgIkVSUjplcnJCbGtkIiAicGFsIiAiRVJSOmVyckl4ZnIiICJFUlI6ZXJyTWFtdCIgIkVSUjplcnJNaW52IiAiRVJSOmVyck5zdmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDQKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzEtMTM3CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Vic2NyaXB0aW9ucywgQWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbikgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEA2MwogICAgcHVzaGJ5dGVzcyAweDQ2OGViZTYzIDB4OWIwZjg5ZDYgMHgzNjZkNWIyNyAweDliYTAyMGI2IDB4YWM1OTJhZGQgMHg1MDUxNzdmOCAweDgzZjU2YzQ2IC8vIG1ldGhvZCAibmV3U2VydmljZShwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm5ld1NlcnZpY2UocGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSl1aW50NjQiLCBtZXRob2QgInNldFNlcnZpY2VEZXNjcmlwdGlvbih1aW50NjQsdWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVTZXJ2aWNlVGl0bGUodWludDY0LHN0cmluZyl2b2lkIiwgbWV0aG9kICJ1cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0KHVpbnQ2NCx1aW50OCxieXRlWzNdKXZvaWQiLCBtZXRob2QgInNldEZlYXR1cmVkU2VydmljZShwYXksdWludDY0KXZvaWQiLCBtZXRob2QgImNsZWFyRmVhdHVyZWRTZXJ2aWNlKCl2b2lkIgogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJhY3RpdmF0ZVNlcnZpY2UoKXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4MTdjODczMGIgMHg0Y2RmMGNkNyAweDg3ZTA1NWM2IDB4YjU5YzhhNTQgMHhhZWViYjM3OCAweDcyOTFjMDhlIDB4NTM1NWRhNmQgMHhhMDQ3YzdmNyAweDEwZjAwYzNhIDB4NzcyNDVhODQgMHhhNjhlNjk2MyAweDRjYjE1NWVlIDB4YjEwYTMwNmUgMHhmMjM1NWI1NSAweDFhYzRhNzU4IDB4ZTNhZWIyNWMgMHhlYWFhYTRkMyAweDE3NjUzODdkIDB4MjgxYjg5MWIgMHhjM2Q5ZjFkYyAweDU5NGViYTFkIDB4YzBmZjI3MzAgMHgyNzUyMDNhZiAweDE5YTU0OGZhIDB4MTI2OWQ4N2UgMHg0MzAzNjY4ZSAweDBkNmE0N2EzIDB4MjIwNzA3OGUgMHgxZGM3ODM3MSAweGIxYmFjMmNiIDB4MDlhMzE1OGUgMHg5OTJmOTg5MiAweGY5OTk2M2Q0IDB4ZDRiMTZlN2EgMHhiMTZiYWFjMyAweDc0ZGVmNTlhIDB4MjViODEyYTcgMHg5NjljZWQ5YiAweDMzZDhlNWFkIDB4NjAzZDcyOTcgMHhkZmU2MDJjZiAweGQ4YTZjNTIzIC8vIG1ldGhvZCAicGF1c2VTZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnBhdXNlU2VydmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAic2h1dGRvd25TZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJibG9jayhwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1bmJsb2NrKGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmUocGF5LGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJnYXRlZFN1YnNjcmliZShwYXksYXBwbCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAic3Vic2NyaWJlKHBheSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImdhdGVkU3Vic2NyaWJlQXNhKHBheSxheGZlcixhcHBsLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZUFzYShwYXksYXhmZXIsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJzdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJkZXBvc2l0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGVwb3NpdEFzYShheGZlcix1aW50NjQpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXcodWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnN1YnNjcmliZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRUcmlnZ2VyUGF5bWVudChhcHBsLChhZGRyZXNzLHVpbnQ2NCksdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkVHJpZ2dlclBheW1lbnQoYXBwbCwoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInRyaWdnZXJQYXltZW50KChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAiYWRvcHRQcmluY2lwYWwocGF5LChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAic3RyZWFrQ2hlY2soKGFkZHJlc3MsdWludDY0KSl2b2lkIiwgbWV0aG9kICJzZXRQYXNzZXModWludDY0LGFkZHJlc3NbXSl2b2lkIiwgbWV0aG9kICJjbGVhck9ycGhhblBhc3NlcygoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInRyaWdnZXJMaXN0KChhZGRyZXNzLHVpbnQ2NFtdKVtdKWJvb2xbXSIsIG1ldGhvZCAiaXNCbG9ja2VkKGFkZHJlc3MsYWRkcmVzcylib29sIiwgbWV0aG9kICJpc1NodXRkb3duKGFkZHJlc3MsdWludDY0KWJvb2wiLCBtZXRob2QgIm5ld1NlcnZpY2VDb3N0KHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTZXJ2aWNlQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTdWJzY3JpcHRpb25Db3N0KGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTdWJzY3JpcHRpb25Db3N0KGFkZHJlc3MsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInRyaWdnZXJHYXRlQ3R4KChhZGRyZXNzLHVpbnQ2NCksdWludDY0KShhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzKSIsIG1ldGhvZCAiYmxvY2tDb3N0KCl1aW50NjQiLCBtZXRob2QgImdldFNlcnZpY2UoYWRkcmVzcyx1aW50NjQpKHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10pIiwgbWV0aG9kICJnZXRGZWF0dXJlZFNlcnZpY2UoYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgImdldFNlcnZpY2VzQnlBZGRyZXNzKGFkZHJlc3MsdWludDY0LHVpbnQ2NCkodWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSlbXSIsIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uKChhZGRyZXNzLHVpbnQ2NCkpKGJvb2wsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm11c3RHZXRTdWJzY3JpcHRpb24oKGFkZHJlc3MsdWludDY0KSkoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzKChhZGRyZXNzLHVpbnQ2NCkpKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDgsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10sdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzc1tdKSIsIG1ldGhvZCAiaXNGaXJzdFN1YnNjcmlwdGlvbihhZGRyZXNzKWJvb2wiLCBtZXRob2QgImdldFNlcnZpY2VMaXN0KGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnZXRTdWJzY3JpcHRpb25MaXN0KGFkZHJlc3MpdWludDY0IgogICAgYnl0ZWMgMzIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgLy8gbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbmV3U2VydmljZSBsZWdhY3lOZXdTZXJ2aWNlIHNldFNlcnZpY2VEZXNjcmlwdGlvbiB1cGRhdGVTZXJ2aWNlVGl0bGUgdXBkYXRlU2VydmljZUhpZ2hsaWdodCBzZXRGZWF0dXJlZFNlcnZpY2UgY2xlYXJGZWF0dXJlZFNlcnZpY2UgYWN0aXZhdGVTZXJ2aWNlIHBhdXNlU2VydmljZSB1bnBhdXNlU2VydmljZSBzaHV0ZG93blNlcnZpY2UgYmxvY2sgdW5ibG9jayBnYXRlZFN1YnNjcmliZSBsZWdhY3lHYXRlZFN1YnNjcmliZSBzdWJzY3JpYmUgbGVnYWN5U3Vic2NyaWJlIGdhdGVkU3Vic2NyaWJlQXNhIGxlZ2FjeUdhdGVkU3Vic2NyaWJlQXNhIHN1YnNjcmliZUFzYSBsZWdhY3lTdWJzY3JpYmVBc2EgZGVwb3NpdCBkZXBvc2l0QXNhIHdpdGhkcmF3IHVuc3Vic2NyaWJlIGdhdGVkVHJpZ2dlclBheW1lbnQgbGVnYWN5R2F0ZWRUcmlnZ2VyUGF5bWVudCB0cmlnZ2VyUGF5bWVudCBhZG9wdFByaW5jaXBhbCBzdHJlYWtDaGVjayBzZXRQYXNzZXMgY2xlYXJPcnBoYW5QYXNzZXMgdHJpZ2dlckxpc3QgaXNCbG9ja2VkIGlzU2h1dGRvd24gbmV3U2VydmljZUNvc3QgbGVnYWN5TmV3U2VydmljZUNvc3QgbmV3U3Vic2NyaXB0aW9uQ29zdCBsZWdhY3lOZXdTdWJzY3JpcHRpb25Db3N0IHRyaWdnZXJHYXRlQ3R4IG1haW5fYmxvY2tDb3N0X3JvdXRlQDQ3IGdldFNlcnZpY2UgZ2V0RmVhdHVyZWRTZXJ2aWNlIGdldFNlcnZpY2VzQnlBZGRyZXNzIGdldFN1YnNjcmlwdGlvbiBtdXN0R2V0U3Vic2NyaXB0aW9uIGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzIGlzRmlyc3RTdWJzY3JpcHRpb24gZ2V0U2VydmljZUxpc3QgZ2V0U3Vic2NyaXB0aW9uTGlzdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDYxCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA2MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9ibG9ja0Nvc3Rfcm91dGVANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDAzZDU0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BANjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHg1YWQ5ZjRjNiAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gX3B1eWFfbGliLmFyYzQuZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudChhcnJheTogYnl0ZXMsIGluZGV4OiB1aW50NjQpIC0+IGJ5dGVzOgpkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50OgogICAgcHJvdG8gMiAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZGlnIDIKICAgIHN3YXAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgNQogICAgc3dhcAogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICAtCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldCh3YWxsZXQ6IHVpbnQ2NCwgd2FsbGV0RmFjdG9yeTogdWludDY0KSAtPiB1aW50NjQ6CmlzR2VudWluZVdhbGxldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gaXNHZW51aW5lV2FsbGV0KHdhbGxldDogdWludDY0LCB3YWxsZXRGYWN0b3J5OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogaXNHZW51aW5lV2FsbGV0X2lmX2JvZHlAMgogICAgZnJhbWVfZGlnIC0xCiAgICBibnogaXNHZW51aW5lV2FsbGV0X2FmdGVyX2lmX2Vsc2VAMwoKaXNHZW51aW5lV2FsbGV0X2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAzCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICByZXRzdWIKCmlzR2VudWluZVdhbGxldF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBpc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc0CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChvcC5pdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlYyAzMyAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBpc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKaXNHZW51aW5lV2FsbGV0X2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgc3dhcAogICAgcmV0c3ViCgppc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNHZW51aW5lV2FsbGV0X2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6Om93bnNBdFJlc3Qod2FsbGV0RmFjdG9yeTogdWludDY0LCB3YWxsZXQ6IHVpbnQ2NCwgYWNjb3VudDogYnl0ZXMpIC0+IHVpbnQ2NDoKb3duc0F0UmVzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjUyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gb3duc0F0UmVzdCh3YWxsZXRGYWN0b3J5OiB1aW50NjQsIHdhbGxldDogdWludDY0LCBhY2NvdW50OiBBY2NvdW50KTogYm9vbGVhbiB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjUzCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBpc0dlbnVpbmVXYWxsZXQKICAgIGJueiBvd25zQXRSZXN0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNTQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKb3duc0F0UmVzdF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc5CiAgICAvLyBjb25zdCBbYWRkcmVzc10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI1NwogICAgLy8gaWYgKGFjY291bnQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJ6IG93bnNBdFJlc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI1OAogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgcmV0c3ViCgpvd25zQXRSZXN0X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNjAKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGFjY291bnQpID09PSB3YWxsZXRBZGRyZXNzCiAgICA9PQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6Z2F0ZUN0eChwOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpnYXRlQ3R4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czozMDMKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnYXRlQ3R4KHA6IFByaW5jaXBhbCk6IEdhdGVDdHggewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNzIgMzIKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFBsYWluUGF5bWVudCh0eG46IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0UGxhaW5QYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFBsYWluUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjphc3NlcnRFeGFjdFBheW1lbnQodHhuOiB1aW50NjQsIHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEV4YWN0UGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRFeGFjdFBheW1lbnQodHhuOiBndHhuLlBheW1lbnRUeG4sIHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQodHhuKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWNlaXZlciA9PT0gcmVjZWl2ZXIsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICBibnogYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzNCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMzUgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiB2b2lkOgpyZWNvcmRQYXllcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA1CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVjb3JkUGF5ZXIocmVjb3JkOiBieXRlcywgcGF5ZXI6IEFjY291bnQsIG93bmVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA2CiAgICAvLyBpZiAocGF5ZXIgIT09IG93bmVyKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IHJlY29yZFBheWVyX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgcHVzaGJ5dGVzICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNwogICAgLy8gb3AuQm94LnB1dChwYXllclJlY29yZEtleShyZWNvcmQpLCBwYXllci5ieXRlcykKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X3B1dAoKcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVsZWFzZURlcG9zaXQocmVjb3JkOiBieXRlcywgb3duZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnJlbGVhc2VEZXBvc2l0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBbQWNjb3VudCwgdWludDY0XSB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0zCiAgICBzaGEyNTYKICAgIHB1c2hieXRlcyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MgogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChrZXkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKCFzcG9uc29yZWQpIHsKICAgIGJueiByZWxlYXNlRGVwb3NpdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgNiAvLyAyODUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZGlnIDEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiByZWxlYXNlRGVwb3NpdF9ib29sX3RydWVAOAogICAgZHVwCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X2Jvb2xfZmFsc2VAOQoKcmVsZWFzZURlcG9zaXRfYm9vbF90cnVlQDg6CiAgICBpbnRjXzEgLy8gMQoKcmVsZWFzZURlcG9zaXRfYm9vbF9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ4CiAgICAvLyByZXR1cm4gW2NhblJlY2VpdmVBbGdvKEFjY291bnQocGF5ZXIpLCB0b3RhbCkgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyLCB0b3RhbF0KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANAogICAgc3dhcAoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANDoKICAgIGJ1cnkgMQogICAgZnJhbWVfZGlnIC0yCiAgICBiIHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfbWVyZ2VANQoKcmVsZWFzZURlcG9zaXRfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVsZWFzZURlcG9zaXRfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFNhZmVBc3NldFRyYW5zZmVyKHR4bjogdWludDY0LCBzZW5kZXI6IGJ5dGVzKSAtPiB2b2lkOgphc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIHNlbmRlcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzNiAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRTZW5kZXIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3Cgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQ6IHVpbnQ2NCwgb3I6IGJ5dGVzKSAtPiBieXRlczoKbGVnYWN5T3JpZ2luT3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyMAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElEOiBBcHBsaWNhdGlvbiwgb3I6IEFjY291bnQpOiBBY2NvdW50IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMjEKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogbGVnYWN5T3JpZ2luT3JfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyMgogICAgLy8gcmV0dXJuIG9yCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKbGVnYWN5T3JpZ2luT3JfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzUxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUwCiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIGJ5dGVjIDM3IC8vICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0OC0zNTEKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBieiBsZWdhY3lPcmlnaW5Pcl9ib29sX2ZhbHNlQDEwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGxlZ2FjeU9yaWdpbk9yX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpsZWdhY3lPcmlnaW5Pcl9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTIKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYm56IGxlZ2FjeU9yaWdpbk9yX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMzggLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmxlZ2FjeU9yaWdpbk9yX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzI1CiAgICAvLyBpZiAob3JpZ2luICE9PSB3YWxsZXRJRC5hZGRyZXNzICYmIG9yaWdpbiAhPT0gVHhuLnNlbmRlciAmJiBvcmlnaW4uYXV0aEFkZHJlc3MgIT09IHdhbGxldElELmFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEKICAgICE9CiAgICBieiBsZWdhY3lPcmlnaW5Pcl9hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgdHhuIFNlbmRlcgogICAgIT0KICAgIGJ6IGxlZ2FjeU9yaWdpbk9yX2FmdGVyX2lmX2Vsc2VANgogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGxlZ2FjeU9yaWdpbk9yX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMjYKICAgIC8vIHJldHVybiBvcgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICByZXRzdWIKCmxlZ2FjeU9yaWdpbk9yX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzI4CiAgICAvLyByZXR1cm4gb3JpZ2luCiAgICByZXRzdWIKCmxlZ2FjeU9yaWdpbk9yX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsZWdhY3lPcmlnaW5Pcl9ib29sX21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldElEOiB1aW50NjQpIC0+IGJ5dGVzOgpyZWZlcnJlck9yWmVyb0FkZHJlc3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXRJRDogQXBwbGljYXRpb24pOiBBY2NvdW50IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDMKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM2CiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQzCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgcmV0c3ViCgpyZWZlcnJlck9yWmVyb0FkZHJlc3NfYWZ0ZXJfaWZfZWxzZUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1Ny0zNjAKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzU5CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIGJ5dGVjIDI1IC8vICJyZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzU3LTM2MAogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQzCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0T2YoYWtpdGFEQU86IHVpbnQ2NCwgYWRkcmVzczogYnl0ZXMpIC0+IHVpbnQ2NDoKbGVnYWN5V2FsbGV0T2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4NgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeVdhbGxldE9mKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjIxCiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGJ5dGVzICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNgogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODcKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk1LTM5OAogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MDAKICAgIC8vIGlmIChCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MDEKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODcKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmxlZ2FjeVdhbGxldE9mX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDA0CiAgICAvLyBjb25zdCB3YWxsZXQgPSBidG9pKGRhdGEpCiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzcxCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2lmX2JvZHlAMTAKICAgIGZyYW1lX2RpZyAxCiAgICBibnogbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaWZfZWxzZUAxMQoKbGVnYWN5V2FsbGV0T2ZfaWZfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzcyCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQwNQogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzg3CiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA3CgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNzQKICAgIC8vIGNvbnN0IFtjcmVhdG9yLCBleGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcENyZWF0b3Iod2FsbGV0KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzc1CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY2CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChpdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGJ5dGVjIDMzIC8vICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNzUKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzcyh3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBsZWdhY3lXYWxsZXRPZl9ib29sX2ZhbHNlQDE0CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MDUKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxNgoKbGVnYWN5V2FsbGV0T2ZfYm9vbF9mYWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQwNQogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2F0ZUNoZWNrKGdhdGVUeG46IHVpbnQ2NCwgYWtpdGFEQU86IHVpbnQ2NCwgY2FsbGVyOiBieXRlcywgaWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpnYXRlQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdhdGVDaGVjayhnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjYWxsZXI6IEFjY291bnQsIGlkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDktNDUwCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1MAogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5LTQ1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDUxCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDktNDUxCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDUyCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5LTQ1MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDUzCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0OS00NTMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU0CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDktNDU0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDgtNDU1CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ4LTQ1NQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNwbGl0T3B0SW5Db3VudChha2l0YURBTzogdWludDY0LCBlc2Nyb3c6IGJ5dGVzLCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnNwbGl0T3B0SW5Db3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODkxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgZXNjcm93OiBBY2NvdW50LCBhc3NldDogQXNzZXQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5MgogICAgLy8gbGV0IGNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTQKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcyCiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5OAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODk1CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTAxCiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwcmluY2lwYWxPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpwcmluY2lwYWxPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTI5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsT2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBoaW50OiB1aW50NjQpOiBQcmluY2lwYWwgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MzAKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEyCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTMKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjE0CiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgY29uY2F0CgpwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzMAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBpc0dlbnVpbmVXYWxsZXQKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTU0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludE5vdFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhud2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG53bAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY2CiAgICAvLyBsZXQgdmlhUGx1Z2luID0gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NwogICAgLy8gaWYgKGNhbGxlckFwcCAhPT0gaGludCkgewogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MQogICAgLy8gY29uc3QgW3NwZW5kaW5nLCBzcGVuZGluZ0V4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1NQRU5ESU5HKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJzcGVuZGluZ19hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzIKICAgIC8vIGlmICghKHNwZW5kaW5nRXhpc3RzICYmIHNwZW5kaW5nLmxlbmd0aCA9PT0gMzIgJiYgc3BlbmRpbmcgPT09IHNlbmRlci5ieXRlcyAmJiBzZW5kZXIgIT09IGNhbGxlckFkZHIpKSB7CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDEyCiAgICBmcmFtZV9kaWcgMAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxMgogICAgZnJhbWVfZGlnIDAKICAgIGRpZyAxCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxMgogICAgZHVwCiAgICBmcmFtZV9kaWcgMQogICAgIT0KICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzCgpwcmluY2lwYWxPZl9pZl9ib2R5QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90Qm91bmQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhuYmQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3OAogICAgLy8gdmlhUGx1Z2luID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRCeXRlcywgY29udHJvbGxlZEV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX0NPTlRST0xMRUQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAzNyAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNwoKcHJpbmNpcGFsT2ZfaWZfYm9keUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIGJ5dGVjIDM4IC8vICJFUlI6ZXJySXdsdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJd2x0CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMTkKICAgIC8vIGlmIChjb250cm9sbGVkID09PSBzcGVuZGVyKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjAKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MQogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXMsIHJlZmVycmVyRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfUkVGRVJSRVIpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAyNSAvLyAicmVmZXJyZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAyNwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDI3CiAgICBjb3ZlciAzCgpwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTYKICAgIC8vIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICBkaWcgMgogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzZWxlY3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzMAogICAgc3dhcAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk0LTIwMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiBoaW50LAogICAgLy8gICBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyLAogICAgLy8gICB2aWFQbHVnaW4sCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIwOS0yMTYKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsQ3R4KAogICAgLy8gICB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBoaW50LAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhAMzIKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzA6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzEKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMjc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDI4CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjIKICAgIC8vIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCB3YWxsZXRFeGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMwogICAgLy8gaWYgKCF3YWxsZXRFeGlzdHMpIHsKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDI0CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjYKICAgIC8vIGlmIChjb250cm9sbGVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMjQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihjb250cm9sbGVkKSA9PT0gd2FsbGV0QWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAyNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnF1b3RlUmVmZXJyZXJPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpxdW90ZVJlZmVycmVyT2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzOQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHF1b3RlUmVmZXJyZXJPZihha2l0YURBTzogQXBwbGljYXRpb24sIGhpbnQ6IHVpbnQ2NCk6IEFjY291bnQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0MAogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDAKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNhbGxzdWIgaXNHZW51aW5lV2FsbGV0CiAgICBibnogcXVvdGVSZWZlcnJlck9mX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDEKICAgIC8vIHJldHVybiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwoKcXVvdGVSZWZlcnJlck9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cXVvdGVSZWZlcnJlckA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NDAKICAgIC8vIHJldHVybiBxdW90ZVJlZmVycmVyKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcmV0c3ViCgpxdW90ZVJlZmVycmVyT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDMKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjUgLy8gInJlZmVycmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjQ0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogcXVvdGVSZWZlcnJlck9mX3Rlcm5hcnlfZmFsc2VANgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBxdW90ZVJlZmVycmVyT2ZfdGVybmFyeV9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0MAogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICByZXRzdWIKCnF1b3RlUmVmZXJyZXJPZl90ZXJuYXJ5X2ZhbHNlQDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjQ0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0MAogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBiIHF1b3RlUmVmZXJyZXJPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnF1b3RlUmVmZXJyZXJAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdhdGVDaGVja0N0eChnYXRlVHhuOiB1aW50NjQsIGFraXRhREFPOiB1aW50NjQsIGN0eDogYnl0ZXMsIGlkOiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CmdhdGVDaGVja0N0eDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTczCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrQ3R4KGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGN0eDogR2F0ZUN0eCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3NS05NzYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTc2CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzUtOTc2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzcKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3NS05NzcKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzgKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg5YjE0N2QyYyAvLyBtZXRob2QgIm11c3RDaGVja0ZvcigoYWRkcmVzcyx1aW50NjQsYWRkcmVzcyksdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzUtOTc4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTc5CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAtMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTc1LTk3OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODAKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3NS05ODAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCgpnYXRlQ2hlY2tDdHhfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzQtOTgxCiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCmdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgYiBnYXRlQ2hlY2tDdHhfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyYWxGZWVUbyhha2l0YURBTzogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVmZXJyYWxGZWVUbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTg4CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVmZXJyYWxGZWVUbyhha2l0YURBTzogQXBwbGljYXRpb24sIHJlZmVycmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4OQogICAgLy8gaWYgKHJlZmVycmVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogcmVmZXJyYWxGZWVUb19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTkwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpyZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzI0CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MjUKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDkgLy8gNzk4MDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MjcKICAgIC8vIGlmIChhc3NldCAhPT0gMCAmJiAhQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiByZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MjUKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDkgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzI4CiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnJlZmVycmFsRmVlVG9fYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTMKICAgIC8vIHJldHVybiBjb3N0SW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTywgYXNzZXQsIDEpCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50VG8oYWtpdGFEQU86IHVpbnQ2NCwgcmVmZXJyZXI6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcmVjbGFpbVRvOiBieXRlcykgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnRUbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwMgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnRUbyhha2l0YURBTzogQXBwbGljYXRpb24sIHJlZmVycmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcmVjbGFpbVRvOiBBY2NvdW50KTogUmVmZXJyYWxQYXltZW50SW5mbyB7CiAgICBwcm90byA1IDEKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwNAogICAgLy8gaWYgKGFtb3VudCA+IDAgJiYgcmVmZXJyZXIgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgLTQKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMwCiAgICAvLyBjb25zdCBbd2FsbGV0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldEZlZXMpKQogICAgZnJhbWVfZGlnIC01CiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDA2CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzcKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjc4CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0yCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDA5CiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEwCiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTcKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgZHVwCiAgICBwdXNoaW50IDI1OTIwMDAKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxOAogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMAogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDM5IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTUKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYyCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY1CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyNTMwMAogICAgKgogICAgcHVzaGludCA1NDUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjcKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0zCiAgICBibnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2Vsc2VfYm9keUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjgtNzgwCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzIKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgc3dhcAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3MwogICAgLy8gYW1vdW50OiBtYnIgKyBzdW0KICAgIGRpZyAyCiAgICBmcmFtZV9kaWcgMAogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzcxLTc3NAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY4LTc4MAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzUKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzYKICAgIC8vIGV4cGlyYXRpb24sCiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2OC03ODAKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkY2FjMDkzNSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MjIKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEzLTEwMjIKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHJlY2xhaW1UbwogICAgLy8gKQogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAyNAogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IChhbW91bnQgLSByZWZlcnJhbEZlZSksIHJlZmVycmFsTWJyIH0KICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIDAKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50VG9fZWxzZV9ib2R5QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODIKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19pZl9ib2R5QDE0CiAgICBkdXAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDYtODE5CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MTAKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA5LTgxMgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODEzCiAgICAvLyB0cmFuc2ZlclR4biwKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTYtODAwCiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDYtODE5CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgxNAogICAgLy8gdGltZVRvVW5sb2NrLAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgxNQogICAgLy8gZXhwaXJhdGlvbiwKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA2LTgxOQogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGEzYTE2Y2FhIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10sYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUAyMAoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2lmX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4MwogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGR1cAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4NC03OTMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg4CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAyCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg5CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODctNzkwCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODQtNzkzCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzkxCiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4NC03OTMKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGJ5dGVjIDMyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUAxNQoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAyNwogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IGFtb3VudCwgcmVmZXJyYWxNYnI6IDAgfQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODUwCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNDAgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg1MgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTQKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg1MAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1NlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzAtODgzCiAgICAvLyBuZXdTZXJ2aWNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwYXNzZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHBheW91dEFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIGJhbm5lckltYWdlOiBDSUQsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LAogICAgLy8gICBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4sCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMz4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4NAogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4NAogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4NQogICAgLy8gcmV0dXJuIHRoaXMubmV3U2VydmljZUltcGwocGF5bWVudCwgaW50ZXJ2YWwsIGFzc2V0LCBhbW91bnQsIHBhc3NlcywgZ2F0ZUlELCBwYXlvdXRBZGRyZXNzLCB0aXRsZSwgYmFubmVySW1hZ2UsIGhpZ2hsaWdodE1lc3NhZ2UsIGhpZ2hsaWdodENvbG9yLCBwLnJlZmVycmVyKQogICAgZXh0cmFjdCAxMDQgMzIKICAgIGNhbGxzdWIgbmV3U2VydmljZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODcwLTg4MwogICAgLy8gbmV3U2VydmljZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcGFzc2VzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBwYXlvdXRBZGRyZXNzOiBBY2NvdW50LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICBiYW5uZXJJbWFnZTogQ0lELAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlOiBVaW50OCwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzPDM+LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeU5ld1NlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lOZXdTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODkKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3U2VydmljZScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwMwogICAgLy8gcmV0dXJuIHRoaXMubmV3U2VydmljZUltcGwocGF5bWVudCwgaW50ZXJ2YWwsIGFzc2V0LCBhbW91bnQsIHBhc3NlcywgZ2F0ZUlELCBwYXlvdXRBZGRyZXNzLCB0aXRsZSwgYmFubmVySW1hZ2UsIGhpZ2hsaWdodE1lc3NhZ2UsIGhpZ2hsaWdodENvbG9yLCB0aGlzLmxlZ2FjeVJlZmVycmVyKCkpCiAgICBjYWxsc3ViIGxlZ2FjeVJlZmVycmVyCiAgICBjYWxsc3ViIG5ld1NlcnZpY2VJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg4OQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICduZXdTZXJ2aWNlJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2V0U2VydmljZURlc2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0U2VydmljZURlc2NyaXB0aW9uOgogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDYKICAgIC8vIHNldFNlcnZpY2VEZXNjcmlwdGlvbihpZDogU2VydmljZUlELCBvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwNwogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KG9mZnNldCArIGRhdGEubGVuZ3RoIDw9IE1BWF9ERVNDUklQVElPTl9MRU5HVEgsIGVyckJhZERlc2NyaXB0aW9uTGVuZ3RoKQogICAgZGlnIDEKICAgIGxlbgogICAgZGlnIDMKICAgICsKICAgIHB1c2hpbnQgMzE1MQogICAgPD0KICAgIGJueiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckJkbG4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmRsbgoKc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTIKICAgIC8vIGxldCBkZXNjQnl0ZXMgPSBCeXRlcyh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuZGVzY3JpcHRpb24pCiAgICBkdXBuIDIKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZHVwMgogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyBsb2dnZWRBc3NlcnQob2Zmc2V0IDw9IGRlc2NCeXRlcy5sZW5ndGgsIGVyckJhZE9mZnNldCkKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDYKICAgIGRpZyA0CiAgICA+PQogICAgYm56IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm9mcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCb2ZzCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxNgogICAgLy8gaWYgKG9mZnNldCA8IGRlc2NCeXRlcy5sZW5ndGgpIHsKICAgIGRpZyAzCiAgICBkaWcgNQogICAgPAogICAgYnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTcKICAgIC8vIGRlc2NCeXRlcyA9IGRlc2NCeXRlcy5zbGljZSgwLCBvZmZzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyA1CiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgdW5jb3ZlciA0CiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBjb3ZlciAyCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5kZXNjcmlwdGlvbiA9IFN0cmluZyhkZXNjQnl0ZXMuY29uY2F0KGRhdGEpKQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGRpZyAxCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHB1c2hpbnQgNzUKICAgIGV4dHJhY3RfdWludDE2CiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA2CiAgICAvLyBzZXRTZXJ2aWNlRGVzY3JpcHRpb24oaWQ6IFNlcnZpY2VJRCwgb2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51cGRhdGVTZXJ2aWNlVGl0bGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVTZXJ2aWNlVGl0bGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyMwogICAgLy8gdXBkYXRlU2VydmljZVRpdGxlKGlkOiBTZXJ2aWNlSUQsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVwZGF0ZVNlcnZpY2VUaXRsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKdXBkYXRlU2VydmljZVRpdGxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjcKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyh0aXRsZSkubGVuZ3RoIDw9IE1BWF9USVRMRV9MRU5HVEgsIGVyclRpdGxlVG9vTG9uZykKICAgIHN3YXAKICAgIGxlbgogICAgcHVzaGludCAxMjgKICAgIDw9CiAgICBibnogdXBkYXRlU2VydmljZVRpdGxlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MSAvLyAiRVJSOmVyclR0bGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVHRsZwoKdXBkYXRlU2VydmljZVRpdGxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjkKICAgIC8vIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS50aXRsZSA9IHRpdGxlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNzMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBleHRyYWN0MwogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBwdXNoaW50IDc1CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDMKICAgIGxlbgogICAgdW5jb3ZlciA0CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgLQogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDQKICAgICsKICAgIHN3YXAKICAgIC0KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICByZXBsYWNlMiA3NQogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjMKICAgIC8vIHVwZGF0ZVNlcnZpY2VUaXRsZShpZDogU2VydmljZUlELCB0aXRsZTogc3RyaW5nKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlU2VydmljZUhpZ2hsaWdodDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyB1cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0KGlkOiBTZXJ2aWNlSUQsIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LCBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM5CiAgICAvLyBjb25zdCBrZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgp1cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDMKICAgIC8vIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5oaWdobGlnaHRNZXNzYWdlID0gaGlnaGxpZ2h0TWVzc2FnZQogICAgZHVwCiAgICBwdXNoaW50IDExMwogICAgdW5jb3ZlciA0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDQKICAgIC8vIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5oaWdobGlnaHRDb2xvciA9IGhpZ2hsaWdodENvbG9yCiAgICBwdXNoaW50IDExNAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIHVwZGF0ZVNlcnZpY2VIaWdobGlnaHQoaWQ6IFNlcnZpY2VJRCwgaGlnaGxpZ2h0TWVzc2FnZTogVWludDgsIGhpZ2hsaWdodENvbG9yOiBieXRlczwzPik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2V0RmVhdHVyZWRTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0RmVhdHVyZWRTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTQKICAgIC8vIHNldEZlYXR1cmVkU2VydmljZShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTUKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2V0RmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzZXRGZWF0dXJlZFNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5zdGF0dXMgIT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93biwgZXJyRmVhdHVyZWRTaHV0ZG93bikKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDExIC8vIDB4MjgKICAgICE9CiAgICBibnogc2V0RmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGc2hkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZzaGQKCnNldEZlYXR1cmVkU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJmIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIGlmICh0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1OQogICAgLy8gaWYgKHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHNldEZlYXR1cmVkU2VydmljZV9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjAKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgMCkKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAoKc2V0RmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJmIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjYKICAgIC8vIHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikudmFsdWUgPSBpZAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2NgogICAgLy8gdGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS52YWx1ZSA9IGlkCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1NAogICAgLy8gc2V0RmVhdHVyZWRTZXJ2aWNlKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc2V0RmVhdHVyZWRTZXJ2aWNlX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRmVhdHVyZWRTZXJ2aWNlTUJSICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEZlYXR1cmVkU2VydmljZU1CUiArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA2IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEZlYXR1cmVkU2VydmljZU1CUiArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSkKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJmIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjMKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjMKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIGIgc2V0RmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2lmX2Vsc2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY2xlYXJGZWF0dXJlZFNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhckZlYXR1cmVkU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJmIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyTm9GZWF0dXJlZFNlcnZpY2UpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTczCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS5leGlzdHMsIGVyck5vRmVhdHVyZWRTZXJ2aWNlKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYXJGZWF0dXJlZFNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyck5mc3YiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmZzdgoKY2xlYXJGZWF0dXJlZFNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBieXRlYyAxMCAvLyAiZiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc1CiAgICAvLyB0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmRlbGV0ZSgpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc1CiAgICAvLyB0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJmIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzcKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgYW1vdW50XSA9IHJlbGVhc2VEZXBvc2l0KHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikua2V5LCBUeG4uc2VuZGVyLCBGZWF0dXJlZFNlcnZpY2VNQlIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc3CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIGFtb3VudF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmtleSwgVHhuLnNlbmRlciwgRmVhdHVyZWRTZXJ2aWNlTUJSKQogICAgdHhuIFNlbmRlcgogICAgaW50YyA1IC8vIDE4OTAwCiAgICBjYWxsc3ViIHJlbGVhc2VEZXBvc2l0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc5CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTcyCiAgICAvLyBjbGVhckZlYXR1cmVkU2VydmljZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmFjdGl2YXRlU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFjdGl2YXRlU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgMTQgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLnZhbHVlIC0gMQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikudmFsdWUgLSAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg4CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCmFjdGl2YXRlU2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c0RyYWZ0LCBlcnJTZXJ2aWNlSXNOb3REcmFmdCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcHVzaGJ5dGVzIDB4MGEKICAgID09CiAgICBibnogYWN0aXZhdGVTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJTbmRyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuZHIKCmFjdGl2YXRlU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkzCiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c0FjdGl2ZQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDE3IC8vIDB4MTQKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4NQogICAgLy8gYWN0aXZhdGVTZXJ2aWNlKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMucGF1c2VTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKcGF1c2VTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAzCiAgICAvLyBwYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA0CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpwYXVzZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzQWN0aXZlLCBlcnJTZXJ2aWNlSXNOb3RBY3RpdmUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDE3IC8vIDB4MTQKICAgID09CiAgICBibnogcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MiAvLyAiRVJSOmVyclNuYWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25hYwoKcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDEwCiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c1BhdXNlZAogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAweDFlCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDAzCiAgICAvLyBwYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudW5wYXVzZVNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgp1bnBhdXNlU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxOAogICAgLy8gdW5wYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDE5CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdW5wYXVzZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnVucGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDI0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1BhdXNlZCwgZXJyU2VydmljZUlzTm90UGF1c2VkKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBwdXNoYnl0ZXMgMHgxZQogICAgPT0KICAgIGJueiB1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU25wYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbnBhCgp1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNgogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNBY3RpdmUKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxNyAvLyAweDE0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDE4CiAgICAvLyB1bnBhdXNlU2VydmljZShpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zaHV0ZG93blNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpzaHV0ZG93blNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzQKICAgIC8vIHNodXRkb3duU2VydmljZShpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzUKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzaHV0ZG93blNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnNodXRkb3duU2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgIT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93biwgZXJyU2VydmljZUlzU2h1dGRvd24pCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDExIC8vIDB4MjgKICAgICE9CiAgICBibnogc2h1dGRvd25TZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MyAvLyAiRVJSOmVyclNzaGQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU3NoZAoKc2h1dGRvd25TZXJ2aWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQxCiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyAhPT0gU2VydmljZVN0YXR1c1NodXRkb3duLCBlcnJTZXJ2aWNlSXNTaHV0ZG93bikKICAgIGJ5dGVjIDExIC8vIDB4MjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzNAogICAgLy8gc2h1dGRvd25TZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmJsb2NrW3JvdXRpbmddKCkgLT4gdm9pZDoKYmxvY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDkKICAgIC8vIGJsb2NrKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTEKICAgIC8vIGNvbnN0IGJveEtleSA9IHRoaXMuZ2V0QmxvY2tLZXkoVHhuLnNlbmRlciwgYmxvY2tlZCkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmJsb2Nrcyhib3hLZXkpLmV4aXN0cywgZXJyVXNlckFscmVhZHlCbG9ja2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBibG9ja19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyVWFibCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVYWJsCgpibG9ja19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1NwogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBjb3N0cy5ibG9ja3MgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGd0eG5zIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDU3CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGNvc3RzLmJsb2NrcyArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA2IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1NwogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBjb3N0cy5ibG9ja3MgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikpCiAgICBwdXNoaW50IDE1NzAwCiAgICArCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDU5CiAgICAvLyB0aGlzLmJsb2Nrcyhib3hLZXkpLmNyZWF0ZSgpCiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2MAogICAgLy8gcmVjb3JkUGF5ZXIodGhpcy5ibG9ja3MoYm94S2V5KS5rZXksIHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRQYXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgp1bmJsb2NrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY3CiAgICAvLyB1bmJsb2NrKGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2OAogICAgLy8gY29uc3QgYm94S2V5ID0gdGhpcy5nZXRCbG9ja0tleShUeG4uc2VuZGVyLCBibG9ja2VkKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgMTIgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDcxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ibG9ja3MoYm94S2V5KS5leGlzdHMsIGVyclVzZXJOb3RCbG9ja2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdW5ibG9ja19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyVW5ibCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVbmJsCgp1bmJsb2NrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDczCiAgICAvLyB0aGlzLmJsb2Nrcyhib3hLZXkpLmRlbGV0ZSgpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc3CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIGFtb3VudF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLmJsb2Nrcyhib3hLZXkpLmtleSwgVHhuLnNlbmRlciwgY29zdHMuYmxvY2tzKQogICAgdHhuIFNlbmRlcgogICAgcHVzaGludCAxNTcwMAogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzkKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY3CiAgICAvLyB1bmJsb2NrKGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdhdGVkU3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRTdWJzY3JpYmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODgtMTA5NgogICAgLy8gZ2F0ZWRTdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA5NwogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCBmYWxzZSwgMCwgdHJ1ZSwgZ2F0ZVR4bi5ncm91cEluZGV4LCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgd2FsbGV0LCBmYWxzZSkKICAgIHVuY292ZXIgNQogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA2CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg4LTEwOTYKICAgIC8vIGdhdGVkU3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lHYXRlZFN1YnNjcmliZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkU3Vic2NyaWJlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTAxCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkU3Vic2NyaWJlJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTEwCiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIGZhbHNlLCAwLCB0cnVlLCBnYXRlVHhuLmdyb3VwSW5kZXgsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCAwLCB0cnVlKQogICAgdW5jb3ZlciA0CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDUKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwMQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFN1YnNjcmliZScgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN1YnNjcmliZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN1YnNjcmliZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTExNy0xMTI0CiAgICAvLyBzdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjUKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgZmFsc2UsIDAsIGZhbHNlLCAwLCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgd2FsbGV0LCBmYWxzZSkKICAgIHVuY292ZXIgNQogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTExNy0xMTI0CiAgICAvLyBzdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5U3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5U3Vic2NyaWJlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTI5CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ3N1YnNjcmliZScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTM3CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIGZhbHNlLCAwLCBmYWxzZSwgMCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIDAsIHRydWUpCiAgICB1bmNvdmVyIDQKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyOQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdzdWJzY3JpYmUnIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nYXRlZFN1YnNjcmliZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkU3Vic2NyaWJlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQxLTExNTAKICAgIC8vIGdhdGVkU3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1MQogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCB0cnVlLCBhc3NldFhmZXIuZ3JvdXBJbmRleCwgdHJ1ZSwgZ2F0ZVR4bi5ncm91cEluZGV4LCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgd2FsbGV0LCBmYWxzZSkKICAgIHVuY292ZXIgNgogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA2CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDcKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDMKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDEtMTE1MAogICAgLy8gZ2F0ZWRTdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lHYXRlZFN1YnNjcmliZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkU3Vic2NyaWJlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU1CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkU3Vic2NyaWJlQXNhJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2NQogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCB0cnVlLCBhc3NldFhmZXIuZ3JvdXBJbmRleCwgdHJ1ZSwgZ2F0ZVR4bi5ncm91cEluZGV4LCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgMCwgdHJ1ZSkKICAgIHVuY292ZXIgNQogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA1CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDYKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDMKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1NQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFN1YnNjcmliZUFzYScgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN1YnNjcmliZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnN1YnNjcmliZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2OS0xMTc3CiAgICAvLyBzdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTc4CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIHRydWUsIGFzc2V0WGZlci5ncm91cEluZGV4LCBmYWxzZSwgMCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIHdhbGxldCwgZmFsc2UpCiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNgogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2OS0xMTc3CiAgICAvLyBzdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeVN1YnNjcmliZUFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeVN1YnNjcmliZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4MgogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdzdWJzY3JpYmVBc2EnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5MQogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCB0cnVlLCBhc3NldFhmZXIuZ3JvdXBJbmRleCwgZmFsc2UsIDAsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCAwLCB0cnVlKQogICAgdW5jb3ZlciA0CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDUKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4MgogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdzdWJzY3JpYmVBc2EnIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5kZXBvc2l0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVwb3NpdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5NAogICAgLy8gZGVwb3NpdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTUKICAgIC8vIGNvbnN0IHN1YktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBleHRyYWN0IDMyIDgKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpkZXBvc2l0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk5CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZSkKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN1Yi5hc3NldCA9PT0gMCwgZXJyQXNhTWlzbWF0Y2gpCiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnogZGVwb3NpdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJBc2FtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFzYW0KCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDMKICAgIC8vIGFzc2VydFNhZmVQYXltZW50KHBheW1lbnQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICA9PQogICAgYm56IGRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyAzNiAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKZGVwb3NpdF9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGRpZyAxCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZGVwb3NpdF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5CgpkZXBvc2l0X2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZGVwb3NpdF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDYKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlLmVzY3Jvd2VkICs9IHBheW1lbnQuYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgOTYKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTQKICAgIC8vIGRlcG9zaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmRlcG9zaXRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpkZXBvc2l0QXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA5CiAgICAvLyBkZXBvc2l0QXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxMAogICAgLy8gY29uc3Qgc3ViS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjEyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjE0CiAgICAvLyBjb25zdCB7IGFzc2V0IH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxNgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0ID09PSBhc3NldFhmZXIueGZlckFzc2V0LmlkLCBlcnJBc2FNaXNtYXRjaCkKICAgIGRpZyAyCiAgICBndHhucyBYZmVyQXNzZXQKICAgID09CiAgICBibnogZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMjYgLy8gIkVSUjplcnJBc2FtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFzYW0KCmRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTgKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjE5CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkQXNzZXRSZWNlaXZlcikKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVycklhcmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFyZQoKZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyMQogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUuZXNjcm93ZWQgKz0gYXNzZXRYZmVyLmFzc2V0QW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBndHhucyBBc3NldEFtb3VudAogICAgKwogICAgaXRvYgogICAgcHVzaGludCA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwOQogICAgLy8gZGVwb3NpdEFzYShhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy53aXRoZHJhd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CndpdGhkcmF3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjI0CiAgICAvLyB3aXRoZHJhdyhpZDogU3Vic2NyaXB0aW9uSUQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMjUKICAgIC8vIGNvbnN0IHN1YktleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCndpdGhkcmF3X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjI5CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZSkKICAgIGR1cAogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzEKICAgIC8vIGxvZ2dlZEFzc2VydChzdWIuZXNjcm93ZWQgPj0gYW1vdW50LCBlcnJOb3RFbm91Z2hGdW5kcykKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgPj0KICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmVmbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZWZuCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzMwogICAgLy8gaWYgKHN1Yi5hc3NldCAhPT0gMCkgewogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnogd2l0aGRyYXdfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzNC0xMjQwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM0LTEyMzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzNC0xMjQwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI1MAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUuZXNjcm93ZWQgLT0gYW1vdW50CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBwdXNoaW50IDk2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjI0CiAgICAvLyB3aXRoZHJhdyhpZDogU3Vic2NyaXB0aW9uSUQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp3aXRoZHJhd19lbHNlX2JvZHlAODoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjQyLTEyNDcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjQ0CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjQyLTEyNDYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDItMTI0NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVuc3Vic2NyaWJlOgogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNTMKICAgIC8vIHVuc3Vic2NyaWJlKGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjU0CiAgICAvLyBjb25zdCBzdWJLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdW5zdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCnVuc3Vic2NyaWJlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjU4CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZSkKICAgIGR1cAogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjYwCiAgICAvLyB0aGlzLmVuc3VyZVBhc3Nlc1JlcHJpY2VkKCkKICAgIGNhbGxzdWIgZW5zdXJlUGFzc2VzUmVwcmljZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2MgogICAgLy8gbGV0IG1iclJlZnVuZDogdWludDY0ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA3IC8vIDYwNTAwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjMKICAgIC8vIGlmIChzdWIuc2VydmljZUlEID4gMCkgewogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2NAogICAgLy8gY29uc3QgeyBwYXNzZXMgfSA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiBzdWIucmVjaXBpZW50LCBpZDogc3ViLnNlcnZpY2VJRCB9KS52YWx1ZQogICAgZGlnIDMKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjQKICAgIC8vIGNvbnN0IHsgcGFzc2VzIH0gPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogc3ViLnJlY2lwaWVudCwgaWQ6IHN1Yi5zZXJ2aWNlSUQgfSkudmFsdWUKICAgIHB1c2hpbnQgMjUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjY3CiAgICAvLyBpZiAocGFzc2VzID4gMCkgewogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA3CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHBhc3NlcyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIEFjY291bnRbXT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQYXNzZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJwIgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjY4CiAgICAvLyB0aGlzLnBhc3NlcyhzdWJLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2OQogICAgLy8gbWJyUmVmdW5kICs9IHRoaXMucGFzc2VzQ2hhcmdlZChzdWIuc3RhcnREYXRlKQogICAgZGlnIDIKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjM0CiAgICAvLyBpZiAodGhpcy5wYXNzZXNSZXByaWNlZEF0Lmhhc1ZhbHVlICYmIHN0YXJ0RGF0ZSA8IHRoaXMucGFzc2VzUmVwcmljZWRBdC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBwYXNzZXNSZXByaWNlZEF0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogU3Vic2NyaXB0aW9uc0dsb2JhbFN0YXRlS2V5UGFzc2VzUmVwcmljZWRBdCB9KQogICAgYnl0ZWMgMTkgLy8gInBhc3Nlc19yZXByaWNlZF9hdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjM0CiAgICAvLyBpZiAodGhpcy5wYXNzZXNSZXByaWNlZEF0Lmhhc1ZhbHVlICYmIHN0YXJ0RGF0ZSA8IHRoaXMucGFzc2VzUmVwcmljZWRBdC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyOAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBwYXNzZXNSZXByaWNlZEF0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogU3Vic2NyaXB0aW9uc0dsb2JhbFN0YXRlS2V5UGFzc2VzUmVwcmljZWRBdCB9KQogICAgYnl0ZWMgMTkgLy8gInBhc3Nlc19yZXByaWNlZF9hdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjM0CiAgICAvLyBpZiAodGhpcy5wYXNzZXNSZXByaWNlZEF0Lmhhc1ZhbHVlICYmIHN0YXJ0RGF0ZSA8IHRoaXMucGFzc2VzUmVwcmljZWRBdC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA4CiAgICA+CiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gcmV0dXJuIExlZ2FjeVBhc3Nlc01CUgogICAgcHVzaGludCA0MTg5MDAKCnVuc3Vic2NyaWJlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5wYXNzZXNDaGFyZ2VkQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjYyCiAgICAvLyBsZXQgbWJyUmVmdW5kOiB1aW50NjQgPSBjb3N0cy5zdWJzY3JpcHRpb25zCiAgICBpbnRjIDcgLy8gNjA1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2OQogICAgLy8gbWJyUmVmdW5kICs9IHRoaXMucGFzc2VzQ2hhcmdlZChzdWIuc3RhcnREYXRlKQogICAgKwogICAgY292ZXIgMgoKdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIHByaW5jaXBhbHMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25QcmluY2lwYWw+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UHJpbmNpcGFscyB9KQogICAgYnl0ZWMgMjAgLy8gImkiCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjczCiAgICAvLyBpZiAodGhpcy5wcmluY2lwYWxzKHN1YktleSkuZGVsZXRlKCkpIHsKICAgIGJveF9kZWwKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjc0CiAgICAvLyBtYnJSZWZ1bmQgKz0gU3Vic2NyaXB0aW9uUHJpbmNpcGFsTUJSCiAgICBzd2FwCiAgICBpbnRjIDggLy8gMzQ5MDAKICAgICsKICAgIHN3YXAKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI3OAogICAgLy8gY29uc3QgW3JlY2VpdmVyLCByZWZ1bmRdID0gcmVsZWFzZURlcG9zaXQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkua2V5LCBUeG4uc2VuZGVyLCBtYnJSZWZ1bmQpCiAgICBkdXAKICAgIHR4biBTZW5kZXIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODAKICAgIC8vIGlmIChzdWIuYXNzZXQgIT09IDApIHsKICAgIGRpZyAyCiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDkKICAgIGJ6IHVuc3Vic2NyaWJlX2Vsc2VfYm9keUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjgxCiAgICAvLyBpZiAoc3ViLmVzY3Jvd2VkID4gMCkgewogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDcKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI4Mi0xMjg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI4Mi0xMjg3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODItMTI4OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTEtMTI5NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjkxLTEyOTUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTEtMTI5NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMyMgogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjUzCiAgICAvLyB1bnN1YnNjcmliZShpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnVuc3Vic2NyaWJlX2Vsc2VfYm9keUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI5NwogICAgLy8gfSBlbHNlIGlmIChyZWNlaXZlciA9PT0gVHhuLnNlbmRlcikgewogICAgZGlnIDMKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBieiB1bnN1YnNjcmliZV9lbHNlX2JvZHlAMTgKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTgtMTMwMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQgKyByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMDAKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzAxCiAgICAvLyBhbW91bnQ6IHN1Yi5lc2Nyb3dlZCArIHJlZnVuZAogICAgdW5jb3ZlciAzCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjk4LTEzMDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkICsgcmVmdW5kCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTgtMTMwMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQgKyByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDI0Cgp1bnN1YnNjcmliZV9lbHNlX2JvZHlAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMDUKICAgIC8vIGlmIChzdWIuZXNjcm93ZWQgPiAwKSB7CiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA2LTEzMTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA4CiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA2LTEzMTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMDYtMTMxMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMxNC0xMzE5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMTQtMTMxOAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMxNC0xMzE5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjQKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNwogICAgLy8gcmV0dXJuIHRoaXMubWJyKCkucGFzc2VzCiAgICBwdXNoaW50IDgzNzAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjkKICAgIC8vIG1iclJlZnVuZCArPSB0aGlzLnBhc3Nlc0NoYXJnZWQoc3ViLnN0YXJ0RGF0ZSkKICAgIGIgdW5zdWJzY3JpYmVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnBhc3Nlc0NoYXJnZWRAMjkKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdhdGVkVHJpZ2dlclBheW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFRyaWdnZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzMxCiAgICAvLyBnYXRlZFRyaWdnZXJQYXltZW50KGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBrZXk6IFN1YnNjcmlwdGlvbktleSwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzMyCiAgICAvLyBjb25zdCBnYXRlSUQgPSB0aGlzLnRyaWdnZXJHYXRlSUQoa2V5KQogICAgc3dhcAogICAgY2FsbHN1YiB0cmlnZ2VyR2F0ZUlECiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMzMKICAgIC8vIGNvbnN0IGN0eCA9IHRoaXMudHJpZ2dlckN0eChrZXksIHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzMzCiAgICAvLyBjb25zdCBjdHggPSB0aGlzLnRyaWdnZXJDdHgoa2V5LCBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgY2FsbHN1YiB0cmlnZ2VyQ3R4CiAgICBwb3AKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBjdHgsIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzM0CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrQ3R4KGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIGN0eCwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVja0N0eAogICAgcG9wCiAgICBibnogZ2F0ZWRUcmlnZ2VyUGF5bWVudF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjEgLy8gIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCmdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMzYKICAgIC8vIHRoaXMudHJpZ2dlckltcGwoa2V5LCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdHJpZ2dlckltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzMxCiAgICAvLyBnYXRlZFRyaWdnZXJQYXltZW50KGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBrZXk6IFN1YnNjcmlwdGlvbktleSwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeUdhdGVkVHJpZ2dlclBheW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZFRyaWdnZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQzCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkVHJpZ2dlclBheW1lbnQnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0NQogICAgLy8gY29uc3QgZ2F0ZUlEID0gdGhpcy50cmlnZ2VyR2F0ZUlEKGtleSkKICAgIGNhbGxzdWIgdHJpZ2dlckdhdGVJRAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNDcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0NwogICAgLy8gY29uc3Qgd2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQ4CiAgICAvLyBjb25zdCBvcmlnaW4gPSBsZWdhY3lPcmlnaW5Pcih3YWxsZXQsIGtleS5hZGRyZXNzKQogICAgc3dhcAogICAgY2FsbHN1YiBsZWdhY3lPcmlnaW5PcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNDkKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogbGVnYWN5R2F0ZWRUcmlnZ2VyUGF5bWVudF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjEgLy8gIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCmxlZ2FjeUdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNTEKICAgIC8vIHRoaXMudHJpZ2dlckltcGwoa2V5LCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgdHJpZ2dlckltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQzCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkVHJpZ2dlclBheW1lbnQnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnRyaWdnZXJQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzU1CiAgICAvLyB0cmlnZ2VyUGF5bWVudChrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM1NgogICAgLy8gdGhpcy50cmlnZ2VySW1wbChrZXksIGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgdHJpZ2dlckltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzU1CiAgICAvLyB0cmlnZ2VyUGF5bWVudChrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuYWRvcHRQcmluY2lwYWxbcm91dGluZ10oKSAtPiB2b2lkOgphZG9wdFByaW5jaXBhbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2NQogICAgLy8gYWRvcHRQcmluY2lwYWwocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzY2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5nYXRlSUQgIT09IDAsIGVyck5vdEdhdGVkKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBibnogYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyck5ndGQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmd0ZAoKYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gcHJpbmNpcGFscyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvblByaW5jaXBhbD4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQcmluY2lwYWxzIH0pCiAgICBieXRlYyAyMCAvLyAiaSIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzY4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucHJpbmNpcGFscyhrZXkpLmV4aXN0cywgZXJyUHJpbmNpcGFsRXhpc3RzKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBhZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGV4cyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQZXhzCgphZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM3MAogICAgLy8gY29uc3Qgd2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzcwCiAgICAvLyBjb25zdCB3YWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBleHRyYWN0IDAgMzIKICAgIGR1cAogICAgY292ZXIgMwogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzIKICAgIC8vIGxvZ2dlZEFzc2VydCh3YWxsZXQuaWQgIT09IDAsIGVyck5vTGVnYWN5V2FsbGV0KQogICAgYm56IGFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJObHdsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5sd2wKCmFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzc0CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIFN1YnNjcmlwdGlvblByaW5jaXBhbE1CUikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGludGMgOCAvLyAzNDkwMAogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM3NgogICAgLy8gdGhpcy5wcmluY2lwYWxzKGtleSkudmFsdWUgPSB7IHdhbGxldDogd2FsbGV0LmlkLCBwcmluY2lwYWw6IGxlZ2FjeU9yaWdpbk9yKHdhbGxldCwga2V5LmFkZHJlc3MpIH0KICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGxlZ2FjeU9yaWdpbk9yCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2NQogICAgLy8gYWRvcHRQcmluY2lwYWwocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3RyZWFrQ2hlY2tbcm91dGluZ10oKSAtPiB2b2lkOgpzdHJlYWtDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM4MwogICAgLy8gc3RyZWFrQ2hlY2soa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN0cmVha0NoZWNrX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpzdHJlYWtDaGVja19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM4NQogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODYKICAgIC8vIGNvbnN0IGN1cnJlbnRXaW5kb3dTdGFydDogdWludDY0ID0gdGhpcy5nZXRMYXRlc3RXaW5kb3dTdGFydChzdWIuc3RhcnREYXRlLCBzdWIuaW50ZXJ2YWwpCiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjYWxsc3ViIGdldExhdGVzdFdpbmRvd1N0YXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODcKICAgIC8vIGlmIChzdWIubGFzdFBheW1lbnQgPCB0aGlzLmdldFByZXZpb3VzV2luZG93U3RhcnQoY3VycmVudFdpbmRvd1N0YXJ0LCBzdWIuaW50ZXJ2YWwpKSB7CiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgODAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgZ2V0UHJldmlvdXNXaW5kb3dTdGFydAogICAgPAogICAgYnogc3RyZWFrQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODgKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLnN0cmVhayA9IDAKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA4OAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKc3RyZWFrQ2hlY2tfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzgzCiAgICAvLyBzdHJlYWtDaGVjayhrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2V0UGFzc2VzW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0UGFzc2VzOgogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzkyCiAgICAvLyBzZXRQYXNzZXMoaWQ6IFN1YnNjcmlwdGlvbklELCBhZGRyZXNzZXM6IEFjY291bnRbXSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhY2NvdW50PgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzkzCiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25zS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgNAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uc0tleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5NwogICAgLy8gY29uc3QgeyBzZXJ2aWNlSUQsIHJlY2lwaWVudCB9ID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbnNLZXkpLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2VJRCA+IDAsIGVyck5vRG9uYXRpb25zKQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTm9kbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb2RuCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDEKICAgIC8vIGNvbnN0IHNlcnZpY2VLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgaXRvYgogICAgZGlnIDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoc2VydmljZUtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDUKICAgIC8vIGNvbnN0IHsgc3RhdHVzLCBwYXNzZXMgfSA9IHRoaXMuc2VydmljZXMoc2VydmljZUtleSkudmFsdWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgc3dhcAogICAgcHVzaGludCAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXR1cyAhPT0gU2VydmljZVN0YXR1c1NodXRkb3duLCBlcnJTZXJ2aWNlSXNTaHV0ZG93bikKICAgIGJ5dGVjIDExIC8vIDB4MjgKICAgICE9CiAgICBibnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA0MyAvLyAiRVJSOmVyclNzaGQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU3NoZAoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDA5CiAgICAvLyBsb2dnZWRBc3NlcnQocGFzc2VzID4gMCAmJiBwYXNzZXMgPj0gYWRkcmVzc2VzLmxlbmd0aCwgZXJyUGFzc0NvdW50T3ZlcmZsb3cpCiAgICBkaWcgNAogICAgYnogc2V0UGFzc2VzX2Jvb2xfZmFsc2VAMTIKICAgIGRpZyA0CiAgICBkaWcgMgogICAgPj0KICAgIGJ6IHNldFBhc3Nlc19ib29sX2ZhbHNlQDEyCiAgICBpbnRjXzEgLy8gMQoKc2V0UGFzc2VzX2Jvb2xfbWVyZ2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZXMgPiAwICYmIHBhc3NlcyA+PSBhZGRyZXNzZXMubGVuZ3RoLCBlcnJQYXNzQ291bnRPdmVyZmxvdykKICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDE1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQY29mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBjb2YKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MTEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpzZXRQYXNzZXNfd2hpbGVfdG9wQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDExCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAzCiAgICA8CiAgICBieiBzZXRQYXNzZXNfYWZ0ZXJfd2hpbGVAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwgYWRkcmVzc2VzW2ldKSkuZXhpc3RzLCBlcnJCbG9ja2VkKQogICAgZGlnIDMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgKgogICAgcHVzaGludCAzMgogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICBkaWcgMgogICAgc3dhcAogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgMTIgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwgYWRkcmVzc2VzW2ldKSkuZXhpc3RzLCBlcnJCbG9ja2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyA0NCAvLyAiRVJSOmVyckJsa2QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmxrZAoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxMQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgc2V0UGFzc2VzX3doaWxlX3RvcEAxNgoKc2V0UGFzc2VzX2FmdGVyX3doaWxlQDIwOgogICAgcG9wbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MTUKICAgIC8vIHRoaXMucGFzc2VzKHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfSkudmFsdWUgPSBjbG9uZShhZGRyZXNzZXMpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTggLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxNQogICAgLy8gdGhpcy5wYXNzZXMoeyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9KS52YWx1ZSA9IGNsb25lKGFkZHJlc3NlcykKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTIKICAgIC8vIHNldFBhc3NlcyhpZDogU3Vic2NyaXB0aW9uSUQsIGFkZHJlc3NlczogQWNjb3VudFtdKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpzZXRQYXNzZXNfYm9vbF9mYWxzZUAxMjoKICAgIGludGNfMCAvLyAwCiAgICBiIHNldFBhc3Nlc19ib29sX21lcmdlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jbGVhck9ycGhhblBhc3Nlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyT3JwaGFuUGFzc2VzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDIzCiAgICAvLyBjbGVhck9ycGhhblBhc3NlcyhrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MjQKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNsZWFyT3JwaGFuUGFzc2VzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpjbGVhck9ycGhhblBhc3Nlc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBwYXNzZXMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBBY2NvdW50W10+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UGFzc2VzIH0pCiAgICBieXRlYyAxOCAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDI1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wYXNzZXMoa2V5KS5kZWxldGUoKSwgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2RlbAogICAgYm56IGNsZWFyT3JwaGFuUGFzc2VzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpjbGVhck9ycGhhblBhc3Nlc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQyMwogICAgLy8gY2xlYXJPcnBoYW5QYXNzZXMoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJMaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKdHJpZ2dlckxpc3Q6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgc3dhcAogICAgZHVwCiAgICBsZW4KICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICBpbnRjXzAgLy8gMAoKdHJpZ2dlckxpc3RfZm9yX2hlYWRlckAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGR1cAogICAgZGlnIDYKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX2ZvckA0CiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGVuY29kaW5nCiAgICBkdXAKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciA0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGZvciAobGVuKyh1aW50OFszMl0sKGxlbit1aW50NjRbXSkpW10pCiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMzQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAodWludDhbMzJdLChsZW4rdWludDY0W10pKQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBwdXNoaW50IDM2CiAgICArCiAgICArCiAgICBjb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiB0cmlnZ2VyTGlzdF9mb3JfaGVhZGVyQDEKCnRyaWdnZXJMaXN0X2FmdGVyX2ZvckA0OgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaW50Y18zIC8vIDIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6VHJpZ2dlckxpc3RSZXF1ZXN0PgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMyCiAgICAvLyBjb25zdCByZXN1bHRzOiBib29sZWFuW10gPSBbXQogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZXEubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgp0cmlnZ2VyTGlzdF93aGlsZV90b3BANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzMwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlcS5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgNAogICAgPAogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNAogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCgp0cmlnZ2VyTGlzdF93aGlsZV90b3BAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNAogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMQogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZGlnIDMKICAgID4KICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzQtMTQzNQogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIC8vICAgY29uc3Qga2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IHJlcVtpXS5hZGRyZXNzLCBpZDogcmVxW2ldLmlkc1tqXSB9CiAgICBkaWcgMwogICAgZHVwCiAgICBkaWcgMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjYWxsc3ViIGR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBkaWcgNAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNQogICAgLy8gY29uc3Qga2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IHJlcVtpXS5hZGRyZXNzLCBpZDogcmVxW2ldLmlkc1tqXSB9CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNgogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgY2FsbHN1YiBjYW5UcmlnZ2VyCiAgICBwb3AKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBidXJ5IDkKICAgIHN3YXAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDM2CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jYW5UcmlnZ2VyKGtleSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZHVwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICByZXBsYWNlMiAwCiAgICBjb3ZlciA0CiAgICBzd2FwCiAgICBwdXNoaW50IDcKICAgICsKICAgIGludGNfMiAvLyA4CiAgICAvCiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIHN3YXAKICAgIHB1c2hpbnQgNwogICAgKwogICAgaW50Y18yIC8vIDgKICAgIC8KICAgIGR1cAogICAgYnVyeSAxMAogICAgPAogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfaWZfZWxzZUAxNAogICAgZGlnIDcKICAgIGRpZyA5CiAgICAtCiAgICBiemVybwogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDIKCnRyaWdnZXJMaXN0X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgdW5jb3ZlciA0CiAgICBwdXNoaW50IDE2CiAgICArCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNgogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgOAoKdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDE1OgogICAgZGlnIDMKICAgIGRpZyA4CiAgICA8CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxNwogICAgZGlnIDEwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgZ2V0Yml0CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNQogICAgZHVwCiAgICBjb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgY292ZXIgNAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNgogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGNvdmVyIDIKICAgIGIgdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDE1Cgp0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxNzoKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDM0CiAgICAvLyBmb3IgKGxldCBqOiB1aW50NjQgPSAwOyBqIDwgcmVxW2ldLmlkcy5sZW5ndGg7IGogKz0gMSkgewogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgYiB0cmlnZ2VyTGlzdF93aGlsZV90b3BAOAoKdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTA6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVxLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiB0cmlnZ2VyTGlzdF93aGlsZV90b3BANgoKdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTE6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pc0Jsb2NrZWRbcm91dGluZ10oKSAtPiB2b2lkOgppc0Jsb2NrZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NDcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDQ5CiAgICAvLyByZXR1cm4gdGhpcy5ibG9ja3ModGhpcy5nZXRCbG9ja0tleShhZGRyZXNzLCBibG9ja2VkKSkuZXhpc3RzCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyAxMiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDQ5CiAgICAvLyByZXR1cm4gdGhpcy5ibG9ja3ModGhpcy5nZXRCbG9ja0tleShhZGRyZXNzLCBibG9ja2VkKSkuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ0NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaXNTaHV0ZG93bltyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzU2h1dGRvd246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU4CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NTgKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS5leGlzdHMgJiYKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU4LTE0NTkKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS5leGlzdHMgJiYKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYnogaXNTaHV0ZG93bl9ib29sX2ZhbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ1OQogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDExIC8vIDB4MjgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NTgtMTQ1OQogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLmV4aXN0cyAmJgogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBieiBpc1NodXRkb3duX2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCmlzU2h1dGRvd25fYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppc1NodXRkb3duX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIGlzU2h1dGRvd25fYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTZXJ2aWNlQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1NlcnZpY2VDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NjYKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VDb3N0KHF1b3RlUmVmZXJyZXJPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2NgogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZUNvc3QocXVvdGVSZWZlcnJlck9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBxdW90ZVJlZmVycmVyT2YKICAgIGNhbGxzdWIgc2VydmljZUNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lOZXdTZXJ2aWNlQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeU5ld1NlcnZpY2VDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDcwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUsIG5hbWU6ICduZXdTZXJ2aWNlQ29zdCcgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NzIKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VDb3N0KHRoaXMubGVnYWN5UmVmZXJyZXIoKSkKICAgIGNhbGxzdWIgbGVnYWN5UmVmZXJyZXIKICAgIGNhbGxzdWIgc2VydmljZUNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ3MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlLCBuYW1lOiAnbmV3U2VydmljZUNvc3QnIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTdWJzY3JpcHRpb25Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U3Vic2NyaXB0aW9uQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4NwogICAgLy8gY29uc3QgW21ickFtb3VudCwgZ2F0ZUlEXSA9IHRoaXMuc3Vic2NyaXB0aW9uTWJyKHJlY2lwaWVudCwgc2VydmljZUlEKQogICAgY292ZXIgMgogICAgY2FsbHN1YiBzdWJzY3JpcHRpb25NYnIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4OAogICAgLy8gY29uc3QgcHJpbmNpcGFsTWJyOiB1aW50NjQgPSB3YWxsZXQgIT09IDAgJiYgZ2F0ZUlEICE9PSAwID8gU3Vic2NyaXB0aW9uUHJpbmNpcGFsTUJSIDogMAogICAgYnogbmV3U3Vic2NyaXB0aW9uQ29zdF9ib29sX2ZhbHNlQDQKICAgIGRpZyAzCiAgICBieiBuZXdTdWJzY3JpcHRpb25Db3N0X2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCm5ld1N1YnNjcmlwdGlvbkNvc3RfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDg4CiAgICAvLyBjb25zdCBwcmluY2lwYWxNYnI6IHVpbnQ2NCA9IHdhbGxldCAhPT0gMCAmJiBnYXRlSUQgIT09IDAgPyBTdWJzY3JpcHRpb25QcmluY2lwYWxNQlIgOiAwCiAgICBpbnRjIDggLy8gMzQ5MDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4OQogICAgLy8gcmV0dXJuIG1ickFtb3VudCArIHByaW5jaXBhbE1iciArIHJlZmVycmFsRmVlVG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcXVvdGVSZWZlcnJlck9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCksIGFzc2V0KQogICAgKwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4OQogICAgLy8gcmV0dXJuIG1ickFtb3VudCArIHByaW5jaXBhbE1iciArIHJlZmVycmFsRmVlVG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcXVvdGVSZWZlcnJlck9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCksIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHF1b3RlUmVmZXJyZXJPZgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlZmVycmFsRmVlVG8KICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdTdWJzY3JpcHRpb25Db3N0X2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld1N1YnNjcmlwdGlvbkNvc3RfYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lOZXdTdWJzY3JpcHRpb25Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5TmV3U3Vic2NyaXB0aW9uQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ5MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlLCBuYW1lOiAnbmV3U3Vic2NyaXB0aW9uQ29zdCcgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ5OQogICAgLy8gY29uc3QgW21ickFtb3VudF0gPSB0aGlzLnN1YnNjcmlwdGlvbk1icihyZWNpcGllbnQsIHNlcnZpY2VJRCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY2FsbHN1YiBzdWJzY3JpcHRpb25NYnIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAwCiAgICAvLyByZXR1cm4gbWJyQW1vdW50ICsgcmVmZXJyYWxGZWVUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmxlZ2FjeVJlZmVycmVyKCksIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwMAogICAgLy8gcmV0dXJuIG1ickFtb3VudCArIHJlZmVycmFsRmVlVG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5sZWdhY3lSZWZlcnJlcigpLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIGxlZ2FjeVJlZmVycmVyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcmVmZXJyYWxGZWVUbwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDkzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUsIG5hbWU6ICduZXdTdWJzY3JpcHRpb25Db3N0JyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlckdhdGVDdHhbcm91dGluZ10oKSAtPiB2b2lkOgp0cmlnZ2VyR2F0ZUN0eDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTEwCiAgICAvLyByZXR1cm4gdGhpcy50cmlnZ2VyQ3R4KGtleSwgcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTAKICAgIC8vIHJldHVybiB0aGlzLnRyaWdnZXJDdHgoa2V5LCBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGNhbGxzdWIgdHJpZ2dlckN0eAogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MDgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTIwCiAgICAvLyBjb25zdCBrZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzLCBpZCB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0U2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKZ2V0U2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUyMgogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUxOAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRGZWF0dXJlZFNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRGZWF0dXJlZFNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgYnl0ZWMgMTAgLy8gImYiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTI4CiAgICAvLyByZXR1cm4gdGhpcy5mZWF0dXJlZChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLmZlYXR1cmVkKGFkZHJlc3MpLnZhbHVlIDogMAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRGZWF0dXJlZFNlcnZpY2VfdGVybmFyeV9mYWxzZUAzCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQoKZ2V0RmVhdHVyZWRTZXJ2aWNlX3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUyNgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRGZWF0dXJlZFNlcnZpY2VfdGVybmFyeV9mYWxzZUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjgKICAgIC8vIHJldHVybiB0aGlzLmZlYXR1cmVkKGFkZHJlc3MpLmV4aXN0cyA/IHRoaXMuZmVhdHVyZWQoYWRkcmVzcykudmFsdWUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBnZXRGZWF0dXJlZFNlcnZpY2VfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTZXJ2aWNlc0J5QWRkcmVzc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFNlcnZpY2VzQnlBZGRyZXNzOgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzMQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzMwogICAgLy8gY29uc3Qgc2VydmljZXM6IFNlcnZpY2VbXSA9IFtdCiAgICBieXRlYyAxMyAvLyAweDAwMDAKCmdldFNlcnZpY2VzQnlBZGRyZXNzX3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTM0CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSBzdGFydDsgaSA8IHN0YXJ0ICsgd2luZG93U2l6ZTsgaSArPSAxKSB7CiAgICBkaWcgMwogICAgZGlnIDMKICAgICsKICAgIGRpZyAyCiAgICA+CiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzUKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3MsIGlkOiBpIH0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgNQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzYKICAgIC8vIGlmICh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2Jsb2NrQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzNwogICAgLy8gc2VydmljZXMucHVzaCh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUpCiAgICBkaWcgNgogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hieXRlcyAweDAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTM3CiAgICAvLyBzZXJ2aWNlcy5wdXNoKHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgY292ZXIgMwogICAgc3dhcAogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA5CgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEwOgogICAgZGlnIDgKICAgIGRpZyAyCiAgICA8CiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTIKICAgIGR1cAogICAgZGlnIDkKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdF91aW50MTYKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgdW5jb3ZlciA1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDQKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBidXJ5IDkKICAgIGIgZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMAoKZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDEyOgogICAgZHVwCiAgICBsZW4KICAgIGNvdmVyIDMKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDEwCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEzOgogICAgZGlnIDkKICAgIGludGNfMyAvLyAyCiAgICA8CiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTUKICAgIGRpZyA1CiAgICBkaWcgMTAKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyA1CiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgdW5jb3ZlciA2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDUKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBidXJ5IDEwCiAgICBiIGdldFNlcnZpY2VzQnlBZGRyZXNzX2Zvcl9oZWFkZXJAMTMKCmdldFNlcnZpY2VzQnlBZGRyZXNzX2FmdGVyX2ZvckAxNToKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgc3Vic3RyaW5nMwogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTM0CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSBzdGFydDsgaSA8IHN0YXJ0ICsgd2luZG93U2l6ZTsgaSArPSAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgYiBnZXRTZXJ2aWNlc0J5QWRkcmVzc193aGlsZV90b3BAMgoKZ2V0U2VydmljZXNCeUFkZHJlc3NfYmxvY2tAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzMQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25bcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU0NwogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTQ4LTE1NjAKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGV4aXN0czogZmFsc2UsCiAgICAvLyAgIHJlY2lwaWVudDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzZXJ2aWNlSUQ6IDAsCiAgICAvLyAgIHN0YXJ0RGF0ZTogMCwKICAgIC8vICAgYW1vdW50OiAwLAogICAgLy8gICBpbnRlcnZhbDogMCwKICAgIC8vICAgYXNzZXQ6IDAsCiAgICAvLyAgIGdhdGVJRDogMCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IDAsCiAgICAvLyAgIHN0cmVhazogMCwKICAgIC8vICAgZXNjcm93ZWQ6IDAsCiAgICAvLyB9CiAgICBwdXNoYnl0ZXMgYmFzZTMyKEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQSkKCmdldFN1YnNjcmlwdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU2NQogICAgLy8gLi4udGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUsCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBleHRyYWN0IDMyIDgKICAgIGRpZyAyCiAgICBleHRyYWN0IDQwIDgKICAgIGRpZyAzCiAgICBleHRyYWN0IDQ4IDgKICAgIGRpZyA0CiAgICBleHRyYWN0IDU2IDgKICAgIGRpZyA1CiAgICBleHRyYWN0IDY0IDgKICAgIGRpZyA2CiAgICBleHRyYWN0IDcyIDgKICAgIGRpZyA3CiAgICBleHRyYWN0IDgwIDgKICAgIGRpZyA4CiAgICBleHRyYWN0IDg4IDgKICAgIHVuY292ZXIgOQogICAgZXh0cmFjdCA5NiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NjMtMTU2NgogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZXhpc3RzOiB0cnVlLAogICAgLy8gICAuLi50aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSwKICAgIC8vIH0KICAgIHB1c2hieXRlcyAweDgwCiAgICB1bmNvdmVyIDEwCiAgICBjb25jYXQKICAgIHVuY292ZXIgOQogICAgY29uY2F0CiAgICB1bmNvdmVyIDgKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NDUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYiBnZXRTdWJzY3JpcHRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbkA0CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5tdXN0R2V0U3Vic2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKbXVzdEdldFN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU2OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTcxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtdXN0R2V0U3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgptdXN0R2V0U3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTcyCiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsczoKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU3NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTc3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NzkKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlKQogICAgYm94X2dldAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTgxCiAgICAvLyBsZXQgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzID0gU2VydmljZVN0YXR1c05vbmUKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTgyCiAgICAvLyBsZXQgcGF5b3V0QWRkcmVzczogQWNjb3VudCA9IHN1Yi5yZWNpcGllbnQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1ODMKICAgIC8vIGxldCB0aXRsZTogc3RyaW5nID0gJycKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4NAogICAgLy8gbGV0IGRlc2NyaXB0aW9uOiBzdHJpbmcgPSAnJwogICAgYnl0ZWNfMyAvLyAiIgogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTg1CiAgICAvLyBsZXQgYmFubmVySW1hZ2U6IENJRCA9IG9wLmJ6ZXJvKDM2KQogICAgcHVzaGludCAzNgogICAgYnplcm8KICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4NwogICAgLy8gbGV0IGhpZ2hsaWdodENvbG9yOiBieXRlczwzPiA9IEJ5dGVzKCcwMDAnKS50b0ZpeGVkKHsgbGVuZ3RoOiAzIH0pCiAgICBwdXNoYnl0ZXMgIjAwMCIKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4OAogICAgLy8gaWYgKHN1Yi5zZXJ2aWNlSUQgIT09IDApIHsKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJueiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19pZl9ib2R5QDQKICAgIGRpZyA2CiAgICBjb3ZlciAzCiAgICBkaWcgMgogICAgYnVyeSAxMQoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTk3CiAgICAvLyBsZXQgcGFzc2VzOiBBY2NvdW50W10gPSBbXQogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTggLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTk4CiAgICAvLyBpZiAodGhpcy5wYXNzZXMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTk5CiAgICAvLyBwYXNzZXMgPSBbLi4ucGFzc2VzLCAuLi50aGlzLnBhc3NlcyhrZXkpLnZhbHVlXQogICAgZGlnIDExCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5NwogICAgLy8gbGV0IHBhc3NlczogQWNjb3VudFtdID0gW10KICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgc3dhcAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDExCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjAzCiAgICAvLyAuLi5zdWIsCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgZXh0cmFjdCA0MCA4CiAgICBkaWcgMQogICAgZXh0cmFjdCA0OCA4CiAgICBkaWcgMgogICAgZXh0cmFjdCA1NiA4CiAgICBkaWcgMwogICAgZXh0cmFjdCA2NCA4CiAgICBkaWcgNAogICAgZXh0cmFjdCA3MiA4CiAgICBkaWcgNQogICAgZXh0cmFjdCA4MCA4CiAgICBkaWcgNgogICAgZXh0cmFjdCA4OCA4CiAgICB1bmNvdmVyIDcKICAgIGV4dHJhY3QgOTYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjAyLTE2MTIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIC4uLnN1YiwKICAgIC8vICAgc3RhdHVzLAogICAgLy8gICBwYXlvdXRBZGRyZXNzLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb24sCiAgICAvLyAgIGJhbm5lckltYWdlLAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlLAogICAgLy8gICBoaWdobGlnaHRDb2xvciwKICAgIC8vICAgcGFzc2VzCiAgICAvLyB9CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOAogICAgY29uY2F0CiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICBkaWcgOQogICAgY29uY2F0CiAgICB1bmNvdmVyIDgKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMGI3CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMTgzCiAgICArCiAgICB1bmNvdmVyIDkKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICB1bmNvdmVyIDMKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgOQogICAgY29uY2F0CiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU3NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19pZl9ib2R5QDQ6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4OQogICAgLy8gY29uc3Qgc2VydmljZUtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHN1Yi5yZWNpcGllbnQsIGlkOiBzdWIuc2VydmljZUlEIH0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpOwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkxCiAgICAvLyAoeyBzdGF0dXMsIHBheW91dEFkZHJlc3MsIHRpdGxlLCBkZXNjcmlwdGlvbiwgYmFubmVySW1hZ2UsIGhpZ2hsaWdodE1lc3NhZ2UsIGhpZ2hsaWdodENvbG9yIH0gPSBjbG9uZSh0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLnZhbHVlKSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgY292ZXIgNQogICAgZHVwCiAgICBwdXNoaW50cyA0MSAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA4CiAgICBkdXAKICAgIHB1c2hpbnQgMTE3CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgcHVzaGludCAxMTcKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA3CiAgICBkdXAKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZHVwMgogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDIKICAgIGNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgNwogICAgZHVwCiAgICBwdXNoaW50cyA3NyAzNgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGNvdmVyIDYKICAgIGR1cAogICAgcHVzaGludCAxMTMKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgY292ZXIgNQogICAgcHVzaGludHMgMTE0IDMKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OTIKICAgIC8vIGlmIChwYXlvdXRBZGRyZXNzID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAOQogICAgZGlnIDIKICAgIGJ1cnkgMTEKICAgIGIgZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pc0ZpcnN0U3Vic2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNGaXJzdFN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYxNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxNSAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjE3CiAgICAvLyByZXR1cm4gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYxNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U2VydmljZUxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTZXJ2aWNlTGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYyMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDE0IC8vICJtIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYyMgogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLmV4aXN0cyA/IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0U2VydmljZUxpc3RfdGVybmFyeV9mYWxzZUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MjIKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGdldFNlcnZpY2VMaXN0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN1YnNjcmlwdGlvbkxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MjUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjI3CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTdWJzY3JpcHRpb25MaXN0X3Rlcm5hcnlfZmFsc2VAMwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCmdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjI1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9mYWxzZUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MjcKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLmV4aXN0cyA/IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykudmFsdWUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBnZXRTdWJzY3JpcHRpb25MaXN0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODcKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4OQogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTAKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDMKICAgICsKICAgICoKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDM1IC8vICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk4CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwOAogICAgLy8gaWYgKGNvdW50ID4gMCAmJiBlc2Nyb3cubmFtZSAhPT0gJycpIHsKICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBieXRlY18zIC8vICIiCiAgICAhPQogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlYyAxNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMTYKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDQ1IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODgKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlYyAxNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgZGlnIDYKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldlc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDQKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDItMTA2CiAgICAvLyBjb25zdCBvcHRJbkNvdW50ID0gc3BsaXRPcHRJbkNvdW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0CiAgICAvLyApCiAgICBkaWcgNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA4CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTcKICAgIC8vIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE2LTExOQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMwogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNQogICAgLy8gW2Fzc2V0LmlkXSwKICAgIHN3YXAKICAgIGl0b2IKICAgIGJ5dGVjIDM5IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIzCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsgYXBwSWQ6IHdhbGxldCB9KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM1CiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCm9wdEluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE2CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTYgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjggLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjggLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNDUgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZGVjb2RlQXJjNDxQbHVnaW5BcHBMaXN0PihwbHVnaW5zKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBlcnJJbnZhbGlkVXBncmFkZSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXVwZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJdXBnCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDQwIC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyOCAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRMYXRlc3RXaW5kb3dTdGFydChzdGFydERhdGU6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCkgLT4gdWludDY0OgpnZXRMYXRlc3RXaW5kb3dTdGFydDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBwcml2YXRlIGdldExhdGVzdFdpbmRvd1N0YXJ0KHN0YXJ0RGF0ZTogdWludDY0LCBpbnRlcnZhbDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIHJldHVybiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gKChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIC0gc3RhcnREYXRlKSAlIGludGVydmFsKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgZHVwCiAgICBmcmFtZV9kaWcgLTIKICAgIC0KICAgIGZyYW1lX2RpZyAtMQogICAgJQogICAgLQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRCbG9ja0tleShhZGRyZXNzOiBieXRlcywgYmxvY2tlZDogYnl0ZXMpIC0+IGJ5dGVzOgpnZXRCbG9ja0tleToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBwcml2YXRlIGdldEJsb2NrS2V5KGFkZHJlc3M6IEFjY291bnQsIGJsb2NrZWQ6IEFjY291bnQpOiBCbG9ja0xpc3RLZXkgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwMAogICAgLy8gYWRkcmVzczogYWRkcmVzcy5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICBmcmFtZV9kaWcgLTIKICAgIHN1YnN0cmluZyAwIDE2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDEKICAgIC8vIGJsb2NrZWQ6IGJsb2NrZWQuYnl0ZXMuc2xpY2UoMCwgMTYpLnRvRml4ZWQoeyBsZW5ndGg6IDE2IH0pLAogICAgZnJhbWVfZGlnIC0xCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk5LTIwMgogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYWRkcmVzczogYWRkcmVzcy5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICAvLyAgIGJsb2NrZWQ6IGJsb2NrZWQuYnl0ZXMuc2xpY2UoMCwgMTYpLnRvRml4ZWQoeyBsZW5ndGg6IDE2IH0pLAogICAgLy8gfQogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFByZXZpb3VzV2luZG93U3RhcnQoY3VycmVudFdpbmRvd1N0YXJ0OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2V0UHJldmlvdXNXaW5kb3dTdGFydDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyBwcml2YXRlIGdldFByZXZpb3VzV2luZG93U3RhcnQoY3VycmVudFdpbmRvd1N0YXJ0OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gcmV0dXJuIGN1cnJlbnRXaW5kb3dTdGFydCA+PSBpbnRlcnZhbCA/IGN1cnJlbnRXaW5kb3dTdGFydCAtIGludGVydmFsIDogMAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgID49CiAgICBieiBnZXRQcmV2aW91c1dpbmRvd1N0YXJ0X3Rlcm5hcnlfZmFsc2VAMgogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIC0KICAgIHJldHN1YgoKZ2V0UHJldmlvdXNXaW5kb3dTdGFydF90ZXJuYXJ5X2ZhbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gcmV0dXJuIGN1cnJlbnRXaW5kb3dTdGFydCA+PSBpbnRlcnZhbCA/IGN1cnJlbnRXaW5kb3dTdGFydCAtIGludGVydmFsIDogMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZW5zdXJlUGFzc2VzUmVwcmljZWQoKSAtPiB2b2lkOgplbnN1cmVQYXNzZXNSZXByaWNlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBpZiAoIXRoaXMucGFzc2VzUmVwcmljZWRBdC5oYXNWYWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBwYXNzZXNSZXByaWNlZEF0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogU3Vic2NyaXB0aW9uc0dsb2JhbFN0YXRlS2V5UGFzc2VzUmVwcmljZWRBdCB9KQogICAgYnl0ZWMgMTkgLy8gInBhc3Nlc19yZXByaWNlZF9hdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBpZiAoIXRoaXMucGFzc2VzUmVwcmljZWRBdC5oYXNWYWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYm56IGVuc3VyZVBhc3Nlc1JlcHJpY2VkX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIHBhc3Nlc1JlcHJpY2VkQXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBTdWJzY3JpcHRpb25zR2xvYmFsU3RhdGVLZXlQYXNzZXNSZXByaWNlZEF0IH0pCiAgICBieXRlYyAxOSAvLyAicGFzc2VzX3JlcHJpY2VkX2F0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDQKICAgIC8vIHRoaXMucGFzc2VzUmVwcmljZWRBdC52YWx1ZSA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGFwcF9nbG9iYWxfcHV0CgplbnN1cmVQYXNzZXNSZXByaWNlZF9hZnRlcl9pZl9lbHNlQDI6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIHByaXZhdGUgZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCk6IEFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gY29uc3QgZmVlcyA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gY29uc3QgZmVlcyA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0NQogICAgLy8gY29uc3QgW3N1YnNjcmlwdGlvbkZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTdWJzY3JpcHRpb25GZWVzKSkKICAgIGJ5dGVjIDI5IC8vICJzdWJzY3JpcHRpb25fZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTEKICAgIC8vIGxldCBha2l0YUZlZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUyCiAgICAvLyBpZiAoZmVlcy5wYXltZW50UGVyY2VudGFnZSA+IDApIHsKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzcKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3OAogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyBpZiAoYWtpdGFGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1NQogICAgLy8gYWtpdGFGZWUgPSAyCiAgICBpbnRjXzMgLy8gMgogICAgZnJhbWVfYnVyeSAxCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyBsZXQgdHJpZ2dlckZlZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIGlmIChmZWVzLnRyaWdnZXJQZXJjZW50YWdlID4gMCkgewogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjc3CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzgKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2MgogICAgLy8gaWYgKHRyaWdnZXJGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMAogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYzCiAgICAvLyB0cmlnZ2VyRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjcKICAgIC8vIGNvbnN0IGxlZnRPdmVyOiB1aW50NjQgPSBhbW91bnQgLSAoYWtpdGFGZWUgKyB0cmlnZ2VyRmVlKQogICAgZnJhbWVfZGlnIDEKICAgIGR1cAogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgY292ZXIgMwogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2OS0yNzMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFraXRhRmVlOiBha2l0YUZlZSwKICAgIC8vICAgdHJpZ2dlckZlZTogdHJpZ2dlckZlZSwKICAgIC8vICAgbGVmdE92ZXI6IGxlZnRPdmVyLAogICAgLy8gfQogICAgc3dhcAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNyZWF0ZVN1YnNjcmlwdGlvbihwYXltZW50OiB1aW50NjQsIGFzYTogdWludDY0LCB4ZmVyOiB1aW50NjQsIHJlY2lwaWVudDogYnl0ZXMsIGFtb3VudDogdWludDY0LCBpbnRlcnZhbDogdWludDY0LCBzZXJ2aWNlSUQ6IHVpbnQ2NCwgcmVmZXJyZXI6IGJ5dGVzLCB3YWxsZXQ6IHVpbnQ2NCwgcHJpbmNpcGFsOiBieXRlcykgLT4gdWludDY0OgpjcmVhdGVTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMwMy0zMTQKICAgIC8vIHByaXZhdGUgY3JlYXRlU3Vic2NyaXB0aW9uKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzYTogYm9vbGVhbiwKICAgIC8vICAgeGZlcjogdWludDY0LAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgcmVmZXJyZXI6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0LAogICAgLy8gICBwcmluY2lwYWw6IEFjY291bnQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBwcm90byAxMCAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18zIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE1CiAgICAvLyB0aGlzLmVuc3VyZVBhc3Nlc1JlcHJpY2VkKCkKICAgIGNhbGxzdWIgZW5zdXJlUGFzc2VzUmVwcmljZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE2CiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtNwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgMTIgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzLCBlcnJCbG9ja2VkKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDQ0IC8vICJFUlI6ZXJyQmxrZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbGtkCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyMAogICAgLy8gbGV0IGdhdGVJRDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBjb25zdCBhc3NldDogdWludDY0ID0gYXNhID8gZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKHhmZXIpLnhmZXJBc3NldC5pZCA6IDAKICAgIGZyYW1lX2RpZyAtOQogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfZmFsc2VANAogICAgZnJhbWVfZGlnIC04CiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIGZyYW1lX2RpZyAtOAogICAgZ3R4bnMgWGZlckFzc2V0CgpjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGxldCBtYnJBbW91bnQgPSBjb3N0cy5zdWJzY3JpcHRpb25zCiAgICBpbnRjIDcgLy8gNjA1MDAKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMjcKICAgIC8vIGlmIChzZXJ2aWNlSUQgIT09IDApIHsKICAgIGZyYW1lX2RpZyAtNAogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9pZl9ib2R5QDYKICAgIGZyYW1lX2RpZyAtNwogICAgZnJhbWVfYnVyeSAwCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDE1IC8vICJsIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIGNvbnN0IG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIgPSAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIGNvbnN0IG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIgPSAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGZyYW1lX2J1cnkgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxNSAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25JRCA9IHRoaXMubmV3U3Vic2NyaXB0aW9uSUQoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NQogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg1LTI4NwogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICAvLyAgID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZQogICAgLy8gICA6IDEKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X2ZhbHNlQDQ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gPyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBjb3ZlciAyCgpjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9tZXJnZUA0ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjg4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlID0gaWQgKyAxCiAgICBkaWcgMgogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gY29uc3Qgc3Vic2NyaXB0aW9uS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkOiBzdWJzY3JpcHRpb25JRCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTQKICAgIC8vIGlmIChuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyKSB7CiAgICBmcmFtZV9kaWcgMgogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NQogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnN1YnNjcmlwdGlvbnNsaXN0CiAgICBmcmFtZV9kaWcgMwogICAgaW50YyA1IC8vIDE4OTAwCiAgICArCiAgICBmcmFtZV9idXJ5IDMKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTgKICAgIC8vIGNvbnN0IHN0b3Jlc1ByaW5jaXBhbCA9IHdhbGxldCAhPT0gMCAmJiBnYXRlSUQgIT09IDAKICAgIGZyYW1lX2RpZyAtMgogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2Jvb2xfZmFsc2VAMjIKICAgIGRpZyAyCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYm9vbF9mYWxzZUAyMgogICAgaW50Y18xIC8vIDEKICAgIGNvdmVyIDMKCmNyZWF0ZVN1YnNjcmlwdGlvbl9ib29sX21lcmdlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTkKICAgIC8vIGlmIChzdG9yZXNQcmluY2lwYWwpIHsKICAgIGRpZyAzCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjAKICAgIC8vIG1ickFtb3VudCArPSBTdWJzY3JpcHRpb25QcmluY2lwYWxNQlIKICAgIGZyYW1lX2RpZyAzCiAgICBpbnRjIDggLy8gMzQ5MDAKICAgICsKICAgIGZyYW1lX2J1cnkgMwoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBmcmFtZV9kaWcgLTYKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2NAogICAgLy8gY29uc3QgYWtpdGFGZWVzOiB1aW50NjQgPSBhbW91bnRzLmFraXRhRmVlICsgYW1vdW50cy50cmlnZ2VyRmVlCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgYXNzZXQsIGFraXRhRmVlcywgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgYXNzZXQsIGFraXRhRmVlcywgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIGFzc2V0LCBha2l0YUZlZXMsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTMKICAgIGRpZyA0CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50VG8KICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA0CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBjb25zdCByZXF1aXJlZDogdWludDY0ID0gbWJyQW1vdW50ICsgcmVmZXJyYWxNYnIgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAzCiAgICArCiAgICBmcmFtZV9kaWcgLTEwCiAgICBndHhucyBTZW5kZXIKICAgIGR1cAogICAgY292ZXIgNgogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDYgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIGNvbnN0IHJlcXVpcmVkOiB1aW50NjQgPSBtYnJBbW91bnQgKyByZWZlcnJhbE1iciArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgKwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNzIKICAgIC8vIGlmIChhc2EpIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2Vsc2VfYm9keUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNzMKICAgIC8vIGNvbnN0IGFzc2V0WGZlciA9IGd0eG4uQXNzZXRUcmFuc2ZlclR4bih4ZmVyKQogICAgZnJhbWVfZGlnIC04CiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oYXNzZXRYZmVyLnhmZXJBc3NldCksIGVyck5vdE9wdGVkSW4pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihhc3NldFhmZXIueGZlckFzc2V0KSwgZXJyTm90T3B0ZWRJbikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtOAogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjgKICAgIGJ5dGVjIDMwIC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0CgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODAtMzg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MC0zODUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MC0zODYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgcmVxdWlyZWQpCiAgICBmcmFtZV9kaWcgLTEwCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciA1CiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtOAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTMKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtOAogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzMQogICAgYnl0ZWMgNDYgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSBhbW91bnQsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtOAogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgZnJhbWVfZGlnIC02CiAgICA+PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzMKICAgIGJ5dGVjIDQ2IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTYtNDAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDAwCiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgdW5jb3ZlciA2CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5Ni00MDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTYtNDAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gZXNjcm93ZWQgPSBhc3NldFhmZXIuYXNzZXRBbW91bnQgLSBhbW91bnQKICAgIGZyYW1lX2RpZyAtNgogICAgLQoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VANDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzMAogICAgLy8gc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNy00MzgKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTcKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyBzdHJlYWs6IDEsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MjctNDM4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIGZyYW1lX2RpZyAxCiAgICBjb25jYXQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNy00MzgKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkLAogICAgLy8gfQogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NDAKICAgIC8vIGlmIChzdG9yZXNQcmluY2lwYWwpIHsKICAgIHVuY292ZXIgMwogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VANDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQxCiAgICAvLyB0aGlzLnByaW5jaXBhbHMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsgd2FsbGV0LCBwcmluY2lwYWwgfQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIHByaW5jaXBhbHMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25QcmluY2lwYWw+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UHJpbmNpcGFscyB9KQogICAgYnl0ZWMgMjAgLy8gImkiCiAgICBmcmFtZV9kaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0MQogICAgLy8gdGhpcy5wcmluY2lwYWxzKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7IHdhbGxldCwgcHJpbmNpcGFsIH0KICAgIHN3YXAKICAgIGJveF9wdXQKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDQ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRQYXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIHJldHVybiBzdWJzY3JpcHRpb25JRAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNyZWF0ZVN1YnNjcmlwdGlvbl9lbHNlX2JvZHlAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gYXNzZXJ0UGxhaW5QYXltZW50KHBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTEwCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTEwCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzNwogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID49IChhbW91bnQgKyByZXF1aXJlZCksIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMAogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIGNvdmVyIDkKICAgIGZyYW1lX2RpZyAtNgogICAgdW5jb3ZlciA1CiAgICArCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzOQogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxMC00MTUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEwLTQxNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEwLTQxNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MTctNDIyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIHVuY292ZXIgNgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MTctNDIxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MTctNDIyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNAogICAgLy8gZXNjcm93ZWQgPSBwYXltZW50LmFtb3VudCAtIChhbW91bnQgKyByZXF1aXJlZCkKICAgIHVuY292ZXIgNgogICAgc3dhcAogICAgLQogICAgYiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0MgoKY3JlYXRlU3Vic2NyaXB0aW9uX2Jvb2xfZmFsc2VAMjI6CiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMwogICAgYiBjcmVhdGVTdWJzY3JpcHRpb25fYm9vbF9tZXJnZUAyMwoKY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfZmFsc2VANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NwogICAgLy8gOiAxCiAgICBpbnRjXzEgLy8gMQogICAgY292ZXIgMgogICAgYiBjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9tZXJnZUA0OAoKY3JlYXRlU3Vic2NyaXB0aW9uX2lmX2JvZHlANjoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMjgKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2Uuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzQWN0aXZlLCBlcnJTZXJ2aWNlSXNOb3RBY3RpdmUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDE3IC8vIDB4MTQKICAgID09CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNDIgLy8gIkVSUjplcnJTbmFjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuYWMKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2UuYXNzZXQgPT09IGFzc2V0LCBlcnJBc2FNaXNtYXRjaCkKICAgIGR1cAogICAgcHVzaGludCA5CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyAyCiAgICA9PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyQXNhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBc2FtCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzgKICAgIC8vIGFtb3VudCA9IHNlcnZpY2UuYW1vdW50CiAgICBkdXBuIDIKICAgIHB1c2hpbnQgMTcKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfYnVyeSAtNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGludGVydmFsID0gc2VydmljZS5pbnRlcnZhbAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IC01CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gZ2F0ZUlEID0gc2VydmljZS5nYXRlSUQKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MgogICAgLy8gaWYgKHNlcnZpY2UucGF5b3V0QWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBwdXNoaW50cyA0MSAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTQKICAgIGZyYW1lX2RpZyAtNwogICAgZnJhbWVfYnVyeSAwCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQ2CiAgICAvLyBpZiAoc2VydmljZS5wYXNzZXMgPiAwKSB7CiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnBhc3NlcwogICAgaW50YyAxMCAvLyAxNDQyMDAKICAgIGZyYW1lX2J1cnkgMwogICAgYiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNwoKY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfZmFsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzIxCiAgICAvLyBjb25zdCBhc3NldDogdWludDY0ID0gYXNhID8gZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKHhmZXIpLnhmZXJBc3NldC5pZCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNhblRyaWdnZXIoa2V5OiBieXRlcykgLT4gdWludDY0LCBieXRlczoKY2FuVHJpZ2dlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ5CiAgICAvLyBwcml2YXRlIGNhblRyaWdnZXIoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiBib29sZWFuIHsKICAgIHByb3RvIDEgMgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ1MQogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDYyCiAgICAvLyB9ID0gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDEKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMgogICAgZHVwCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDU2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgZHVwCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgcHVzaGludCA0OAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY0CiAgICAvLyBjb25zdCBibG9ja3NLZXkgPSB0aGlzLmdldEJsb2NrS2V5KHJlY2lwaWVudCwga2V5LmFkZHJlc3MpCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCAzMgogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgMTIgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBpZiAodGhpcy5ibG9ja3MoYmxvY2tzS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY4CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzMtNDc3CiAgICAvLyBzZXJ2aWNlSUQgPiAwICYmCiAgICAvLyAoCiAgICAvLyAgICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgLy8gICB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICAvLyApCiAgICBmcmFtZV9kaWcgMgogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyAhdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMgfHwKICAgIGZyYW1lX2RpZyAyCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNhblRyaWdnZXJfaWZfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgZnJhbWVfZGlnIDAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDExIC8vIDB4MjgKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NS00NzYKICAgIC8vICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDgKCmNhblRyaWdnZXJfaWZfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzkKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4MwogICAgLy8gaWYgKGxhc3RQYXltZW50ID49IHRoaXMuZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3RhcnREYXRlLCBpbnRlcnZhbCkpIHsKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdldExhdGVzdFdpbmRvd1N0YXJ0CiAgICB1bmNvdmVyIDMKICAgIDw9CiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg3CiAgICAvLyBpZiAoYW1vdW50ID4gZXNjcm93ZWQpIHsKICAgIDwKICAgIGJ6IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0OTEKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lSZWZlcnJlcigpIC0+IGJ5dGVzOgpsZWdhY3lSZWZlcnJlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgbGVnYWN5V2FsbGV0T2YKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN1YnNjcmliZUltcGwocGF5bWVudDogdWludDY0LCBhc2E6IHVpbnQ2NCwgeGZlcjogdWludDY0LCBnYXRlZDogdWludDY0LCBnYXRlOiB1aW50NjQsIHJlY2lwaWVudDogYnl0ZXMsIGFtb3VudDogdWludDY0LCBpbnRlcnZhbDogdWludDY0LCBzZXJ2aWNlSUQ6IHVpbnQ2NCwgd2FsbGV0OiB1aW50NjQsIGxlZ2FjeTogdWludDY0KSAtPiB1aW50NjQ6CnN1YnNjcmliZUltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2Mi01NzQKICAgIC8vIHByaXZhdGUgc3Vic2NyaWJlSW1wbCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc2E6IGJvb2xlYW4sCiAgICAvLyAgIHhmZXI6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZWQ6IGJvb2xlYW4sCiAgICAvLyAgIGdhdGU6IHVpbnQ2NCwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0LAogICAgLy8gICBsZWdhY3k6IGJvb2xlYW4KICAgIC8vICk6IHVpbnQ2NCB7CiAgICBwcm90byAxMSAxCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFtb3VudCA+PSBNSU5fQU1PVU5ULCBlcnJNaW5BbW91bnRJc1RocmVlKQogICAgZnJhbWVfZGlnIC01CiAgICBwdXNoaW50IDQKICAgID49CiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9hc3NlcnRAMTUKICAgIGJ5dGVjIDQ3IC8vICJFUlI6ZXJyTWFtdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYW10CgpzdWJzY3JpYmVJbXBsX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyBsb2dnZWRBc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBlcnJNaW5JbnRlcnZhbElzU2l4dHkpCiAgICBmcmFtZV9kaWcgLTQKICAgIHB1c2hpbnQgNjAKICAgID49CiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9hc3NlcnRAMTcKICAgIGJ5dGVjIDQ4IC8vICJFUlI6ZXJyTWludiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNaW52CgpzdWJzY3JpYmVJbXBsX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM3CiAgICAvLyBpZiAoZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtOAogICAgYnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2VJRCAhPT0gMCwgZXJyTm90QVNlcnZpY2UpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMjAKICAgIGJ5dGVjIDQ5IC8vICJFUlI6ZXJyTnN2YyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOc3ZjCgpzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gaWYgKHNlcnZpY2VJRCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0zCiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNoZWNrU3Vic2NyaWJlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NzcKICAgIC8vIGlmIChsZWdhY3kpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc4CiAgICAvLyBjb25zdCBsZWdhY3lXYWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc4CiAgICAvLyBjb25zdCBsZWdhY3lXYWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgbGVnYWN5V2FsbGV0T2YKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBpZiAoZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtOAogICAgYnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGd0eG4uQXBwbGljYXRpb25DYWxsVHhuKGdhdGUpLCB0aGlzLmFraXRhREFPLnZhbHVlLCBsZWdhY3lPcmlnaW5PclR4blNlbmRlcihsZWdhY3lXYWxsZXQpLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4oZ2F0ZSksIHRoaXMuYWtpdGFEQU8udmFsdWUsIGxlZ2FjeU9yaWdpbk9yVHhuU2VuZGVyKGxlZ2FjeVdhbGxldCksIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzIKICAgIC8vIHJldHVybiBsZWdhY3lPcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGRpZyAxCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGxlZ2FjeU9yaWdpbk9yCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhndHhuLkFwcGxpY2F0aW9uQ2FsbFR4bihnYXRlKSwgdGhpcy5ha2l0YURBTy52YWx1ZSwgbGVnYWN5T3JpZ2luT3JUeG5TZW5kZXIobGVnYWN5V2FsbGV0KSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGZyYW1lX2RpZyAtNwogICAgY292ZXIgMgogICAgZnJhbWVfZGlnIDAKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrCiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDUKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyRmd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGZ3RlCgpzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyByZXR1cm4gdGhpcy5jcmVhdGVTdWJzY3JpcHRpb24ocGF5bWVudCwgYXNhLCB4ZmVyLCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldCksIDAsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGNhbGxzdWIgcmVmZXJyZXJPclplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGZyYW1lX2RpZyAtMTEKICAgIGZyYW1lX2RpZyAtMTAKICAgIGZyYW1lX2RpZyAtOQogICAgZnJhbWVfZGlnIC02CiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfZGlnIC0zCiAgICB1bmNvdmVyIDgKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDkKICAgIGNhbGxzdWIgY3JlYXRlU3Vic2NyaXB0aW9uCiAgICBzd2FwCiAgICByZXRzdWIKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODUKICAgIC8vIGNvbnN0IHAgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODUKICAgIC8vIGNvbnN0IHAgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gaWYgKGdhdGVkKSB7CiAgICBmcmFtZV9kaWcgLTgKICAgIGJ6IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4oZ2F0ZSksIHRoaXMuYWtpdGFEQU8udmFsdWUsIGdhdGVDdHgocCksIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChndHhuLkFwcGxpY2F0aW9uQ2FsbFR4bihnYXRlKSwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwKSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIGdhdGVDdHgKICAgIGNvdmVyIDIKICAgIGZyYW1lX2RpZyAtNwogICAgY292ZXIgMgogICAgZnJhbWVfZGlnIDAKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrQ3R4CiAgICBwb3AKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyRmd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGZ3RlCgpzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gcmV0dXJuIHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKHBheW1lbnQsIGFzYSwgeGZlciwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIHAucmVmZXJyZXIsIHAud2FsbGV0LCBwLnByaW5jaXBhbCkKICAgIGR1cAogICAgZXh0cmFjdCAxMDQgMzIKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9kaWcgLTExCiAgICBmcmFtZV9kaWcgLTEwCiAgICBmcmFtZV9kaWcgLTkKICAgIGZyYW1lX2RpZyAtNgogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTQKICAgIGZyYW1lX2RpZyAtMwogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgY2FsbHN1YiBjcmVhdGVTdWJzY3JpcHRpb24KICAgIHN3YXAKICAgIHJldHN1YgoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgZnJhbWVfZGlnIC02CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnN1YnNjcmliZUltcGxfYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDYKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGlmICghZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtOAogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNoZWNrU3Vic2NyaWJlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVJRCA9PT0gMCwgZXJySGFzR2F0ZSkKICAgIGZyYW1lX2RpZyAwCiAgICBieiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jaGVja1N1YnNjcmliZUAyOAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySGd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIZ3RlCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyR2F0ZUlEKGtleTogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CnRyaWdnZXJHYXRlSUQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gcHJpdmF0ZSB0cmlnZ2VyR2F0ZUlEKGtleTogU3Vic2NyaXB0aW9uS2V5KTogdWludDY0IHsKICAgIHByb3RvIDEgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdHJpZ2dlckdhdGVJRF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKdHJpZ2dlckdhdGVJRF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyBjb25zdCB7IHNlcnZpY2VJRCwgcmVjaXBpZW50IH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTk5CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZUlEICE9PSAwLCBlcnJOb3RBU2VydmljZSkKICAgIGJueiB0cmlnZ2VyR2F0ZUlEX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA0OSAvLyAiRVJSOmVyck5zdmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnN2YwoKdHJpZ2dlckdhdGVJRF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjAwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdHJpZ2dlckdhdGVJRF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKdHJpZ2dlckdhdGVJRF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjAxCiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5nYXRlSUQKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfZGlnIC0xCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJDdHgoa2V5OiBieXRlcywgcDogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlcywgYnl0ZXM6CnRyaWdnZXJDdHg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gcHJpdmF0ZSB0cmlnZ2VyQ3R4KGtleTogU3Vic2NyaXB0aW9uS2V5LCBwOiBQcmluY2lwYWwpOiBHYXRlQ3R4IHsKICAgIHByb3RvIDIgMwogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIHByaW5jaXBhbHMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25QcmluY2lwYWw+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UHJpbmNpcGFscyB9KQogICAgYnl0ZWMgMjAgLy8gImkiCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxNwogICAgLy8gaWYgKHRoaXMucHJpbmNpcGFscyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiB0cmlnZ2VyQ3R4X2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxOAogICAgLy8gY29uc3Qgc3RvcmVkID0gY2xvbmUodGhpcy5wcmluY2lwYWxzKGtleSkudmFsdWUpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIGlmIChwLndhbGxldCAhPT0gMCAmJiBwLndhbGxldCA9PT0gc3RvcmVkLndhbGxldCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICBieiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VANgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIwCiAgICAvLyByZXR1cm4gZ2F0ZUN0eChwKQogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGdhdGVDdHgKICAgIGZyYW1lX2J1cnkgLTEKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgcmV0c3ViCgp0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIyCiAgICAvLyB3YWxsZXQgPSBzdG9yZWQud2FsbGV0CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjMKICAgIC8vIHByaW5jaXBhbCA9IGF0UmVzdFByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzLCBzdG9yZWQud2FsbGV0LCBzdG9yZWQucHJpbmNpcGFsKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBwcmluY2lwYWwgPSBhdFJlc3RQcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcywgc3RvcmVkLndhbGxldCwgc3RvcmVkLnByaW5jaXBhbCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMCAzMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjb3ZlciA0CiAgICBzd2FwCiAgICBleHRyYWN0IDggMzIKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTUwCiAgICAvLyByZXR1cm4gYXRSZXN0UHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhY2NvdW50LCB3YWxsZXQsIHN0b3JlZCkKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI3MQogICAgLy8gaWYgKHN0b3JlZCA9PT0gYWNjb3VudCkgewogICAgPT0KICAgIGJ6IHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUAxMwogICAgcG9wCiAgICBidXJ5IDEKICAgIHN3YXAKCnRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIHdhbGxldDogb3duc0F0UmVzdE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCwga2V5LmFkZHJlc3MpID8gd2FsbGV0IDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gd2FsbGV0OiBvd25zQXRSZXN0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0LCBrZXkuYWRkcmVzcykgPyB3YWxsZXQgOiAwLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgc3dhcAogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NDUKICAgIC8vIHJldHVybiBvd25zQXRSZXN0KGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCB3YWxsZXQsIGFjY291bnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGRpZyAzCiAgICBjYWxsc3ViIG93bnNBdFJlc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyB3YWxsZXQ6IG93bnNBdFJlc3RPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQsIGtleS5hZGRyZXNzKSA/IHdhbGxldCA6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzMS02MzYKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHByaW5jaXBhbCwKICAgIC8vICAgLy8gdGhlIHdhbGxldCBvbmx5IGNvdW50cyB3aGlsZSBpdCBvd25zIHRoZSBzdWJzY3JpYmVyIGF0IHJlc3QgKG5vIHdhbGxldC1nbG9iYWwgcmVhZHMpCiAgICAvLyAgIHdhbGxldDogb3duc0F0UmVzdE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCwga2V5LmFkZHJlc3MpID8gd2FsbGV0IDogMCwKICAgIC8vICAgc3BlbmRlcjoga2V5LmFkZHJlc3MsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCnRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6Mjc0CiAgICAvLyBpZiAoIW93bnNBdFJlc3Qod2FsbGV0RmFjdG9yeSwgd2FsbGV0LCBhY2NvdW50KSkgewogICAgZGlnIDEKICAgIGRpZyA0CiAgICBjYWxsc3ViIG93bnNBdFJlc3QKICAgIGJueiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAMTUKICAgIGJ1cnkgMQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NTAKICAgIC8vIHJldHVybiBhdFJlc3RQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFjY291bnQsIHdhbGxldCwgc3RvcmVkKQogICAgYiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAOAoKdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo3OQogICAgLy8gY29uc3QgW2FkZHJlc3NdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBwb3AKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNzgKICAgIC8vIGlmIChzdG9yZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGRpZyAzCiAgICA9PQogICAgYnogdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI3OQogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyA/IHN0b3JlZCA6IGFjY291bnQKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NTAKICAgIC8vIHJldHVybiBhdFJlc3RQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFjY291bnQsIHdhbGxldCwgc3RvcmVkKQogICAgYiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAOAoKdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjgxCiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihzdG9yZWQpID09PSB3YWxsZXRBZGRyZXNzID8gc3RvcmVkIDogYWNjb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgdW5jb3ZlciAzCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTUwCiAgICAvLyByZXR1cm4gYXRSZXN0UHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhY2NvdW50LCB3YWxsZXQsIHN0b3JlZCkKICAgIGIgdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDgKCnRyaWdnZXJDdHhfZWxzZV9ib2R5QDc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjI2CiAgICAvLyBjb25zdCBsZWdhY3lXYWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gY29uc3QgbGVnYWN5V2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjYWxsc3ViIGxlZ2FjeVdhbGxldE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyOAogICAgLy8gcHJpbmNpcGFsID0gbGVnYWN5T3JpZ2luT3IobGVnYWN5V2FsbGV0LCBrZXkuYWRkcmVzcykKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGxlZ2FjeU9yaWdpbk9yCiAgICBiIHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VySW1wbChrZXk6IGJ5dGVzLCBnYXRlZDogdWludDY0KSAtPiBieXRlczoKdHJpZ2dlckltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY0NAogICAgLy8gcHJpdmF0ZSB0cmlnZ2VySW1wbChrZXk6IFN1YnNjcmlwdGlvbktleSwgZ2F0ZWQ6IGJvb2xlYW4pOiB2b2lkIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmNhblRyaWdnZXIoa2V5KSwgZXJyQ2Fubm90VHJpZ2dlcikKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBjYW5UcmlnZ2VyCiAgICBmcmFtZV9idXJ5IC0yCiAgICBibnogdHJpZ2dlckltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOmVyckN0cmciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3RyZwoKdHJpZ2dlckltcGxfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU0CiAgICAvLyB9ID0gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDQ4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBpZiAoZ2F0ZUlEICE9PSAwKSB7CiAgICBieiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjU3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZWQsIGVyckludmFsaWRTZXF1ZW5jZSkKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAOAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJc2VxIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzZXEKCnRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYxCiAgICAvLyBpZiAoc2VydmljZUlEICE9PSAwKSB7CiAgICBkaWcgMgogICAgYm56IHRyaWdnZXJJbXBsX2lmX2JvZHlAOQogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIHVuY292ZXIgMgoKdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGRpZyAyCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc0CiAgICAvLyBpZiAoaXNBc2EpIHsKICAgIGRpZyAyCiAgICBieiB0cmlnZ2VySW1wbF9lbHNlX2JvZHlAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc3LTY4MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4MQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3Ny02ODIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc3LTY4MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njg1LTY5MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njg5CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2ODUtNjkwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njg1LTY5MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTMtNjk5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njk3CiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkzLTY5OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5My02OTkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUpCiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjE3CiAgICAvLyBjb25zdCBjdXJyZW50V2luZG93U3RhcnQ6IHVpbnQ2NCA9IHRoaXMuZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3ViLnN0YXJ0RGF0ZSwgc3ViLmludGVydmFsKQogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRMYXRlc3RXaW5kb3dTdGFydAogICAgZHVwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxOAogICAgLy8gY29uc3QgbGFzdFdpbmRvd1N0YXJ0OiB1aW50NjQgPSB0aGlzLmdldFByZXZpb3VzV2luZG93U3RhcnQoY3VycmVudFdpbmRvd1N0YXJ0LCBzdWIuaW50ZXJ2YWwpCiAgICBzd2FwCiAgICBjYWxsc3ViIGdldFByZXZpb3VzV2luZG93U3RhcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyBpZiAoc3ViLmxhc3RQYXltZW50IDwgbGFzdFdpbmRvd1N0YXJ0KSB7CiAgICBzd2FwCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIDwKICAgIGJ6IHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMjgKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjIyCiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5zdHJlYWsgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgZGlnIDIKICAgIHB1c2hpbnQgODgKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCnRyaWdnZXJJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pbmNyZW1lbnRTdHJlYWtPblBheW1lbnRAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcyNgogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuZXNjcm93ZWQgLT0gYW1vdW50CiAgICBzd2FwCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBkaWcgMQogICAgcHVzaGludCA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MjcKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLmxhc3RQYXltZW50ID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaXRvYgogICAgcHVzaGludCA4MAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGZyYW1lX2RpZyAtMgogICAgcmV0c3ViCgp0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMjcKICAgIC8vIGlmIChzdWIubGFzdFBheW1lbnQgPCBjdXJyZW50V2luZG93U3RhcnQpIHsKICAgIHVuY292ZXIgMwogICAgPAogICAgYnogdHJpZ2dlckltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmluY3JlbWVudFN0cmVha09uUGF5bWVudEAzMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMjgKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLnN0cmVhayArPSAxCiAgICBkaWcgMQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDg4CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYiB0cmlnZ2VySW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaW5jcmVtZW50U3RyZWFrT25QYXltZW50QDMxCgp0cmlnZ2VySW1wbF9lbHNlX2JvZHlAMTk6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDItNzA3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwNAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDUKICAgIC8vIGFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzAyLTcwNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwMi03MDcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwOS03MTQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIGFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDktNzEzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDktNzE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxNi03MjEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTkKICAgIC8vIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxNi03MjAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxNi03MjEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAyMwoKdHJpZ2dlckltcGxfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjIKICAgIC8vIGNvbnN0IHNlcnZpY2VLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBkaWcgMwogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjMKICAgIC8vIGlmICh0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdHJpZ2dlckltcGxfaWZfYm9keUAxMAogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIGIgdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAxNAoKdHJpZ2dlckltcGxfaWZfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjY0CiAgICAvLyBjb25zdCBwYXlvdXRBZGRyZXNzID0gdGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS52YWx1ZS5wYXlvdXRBZGRyZXNzCiAgICBwdXNoaW50cyA0MSAzMgogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjUKICAgIC8vIGlmIChwYXlvdXRBZGRyZXNzICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiB0cmlnZ2VySW1wbF9pZl9ib2R5QDExCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDE0Cgp0cmlnZ2VySW1wbF9pZl9ib2R5QDExOgogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIGIgdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubmV3U2VydmljZUltcGwocGF5bWVudDogdWludDY0LCBpbnRlcnZhbDogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcGFzc2VzOiB1aW50NjQsIGdhdGVJRDogdWludDY0LCBwYXlvdXRBZGRyZXNzOiBieXRlcywgdGl0bGU6IGJ5dGVzLCBiYW5uZXJJbWFnZTogYnl0ZXMsIGhpZ2hsaWdodE1lc3NhZ2U6IGJ5dGVzLCBoaWdobGlnaHRDb2xvcjogYnl0ZXMsIHJlZmVycmVyOiBieXRlcykgLT4gdWludDY0OgpuZXdTZXJ2aWNlSW1wbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzMxLTc0NAogICAgLy8gcHJpdmF0ZSBuZXdTZXJ2aWNlSW1wbCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcGFzc2VzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBwYXlvdXRBZGRyZXNzOiBBY2NvdW50LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICBiYW5uZXJJbWFnZTogQ0lELAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlOiBVaW50OCwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzPDM+LAogICAgLy8gICByZWZlcnJlcjogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDEyIDEKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxNCAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyBjb25zdCBuZWVkc1NlcnZpY2VzTGlzdEJveE1iciA9ICF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gY29uc3QgbmVlZHNTZXJ2aWNlc0xpc3RCb3hNYnIgPSAhdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgMTQgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld1NlcnZpY2VJRChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzctMjc5CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICAvLyAgID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUKICAgIC8vICAgOiAxCiAgICBieiBuZXdTZXJ2aWNlSW1wbF90ZXJuYXJ5X2ZhbHNlQDM3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3OAogICAgLy8gPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQoKbmV3U2VydmljZUltcGxfdGVybmFyeV9tZXJnZUAzODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjgwCiAgICAvLyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZSA9IGlkICsgMQogICAgZHVwbiAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFtb3VudCA+PSBNSU5fQU1PVU5ULCBlcnJNaW5BbW91bnRJc1RocmVlKQogICAgZnJhbWVfZGlnIC05CiAgICBwdXNoaW50IDQKICAgID49CiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDQ3IC8vICJFUlI6ZXJyTWFtdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYW10CgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzUyCiAgICAvLyBsb2dnZWRBc3NlcnQoaW50ZXJ2YWwgPj0gTUlOX0lOVEVSVkFMLCBlcnJNaW5JbnRlcnZhbElzU2l4dHkpCiAgICBmcmFtZV9kaWcgLTExCiAgICBwdXNoaW50IDYwCiAgICA+PQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA0OCAvLyAiRVJSOmVyck1pbnYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWludgoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBhc3NlcyA8PSBNQVhfUEFTU0VTLCBlcnJNYXhQYXNzZXNJc0ZpdmUpCiAgICBmcmFtZV9kaWcgLTgKICAgIHB1c2hpbnQgNQogICAgPD0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRANgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTXhwcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNeHBzCgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXModGl0bGUpLmxlbmd0aCA8PSBNQVhfVElUTEVfTEVOR1RILCBlcnJUaXRsZVRvb0xvbmcpCiAgICBmcmFtZV9kaWcgLTUKICAgIGxlbgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDEyOAogICAgPD0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgNDEgLy8gIkVSUjplcnJUdGxnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclR0bGcKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDUKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAyOSAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1NwogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MAogICAgLy8gbGV0IHJlcXVpcmVkQW1vdW50OiB1aW50NjQgPSBzZXJ2aWNlQ3JlYXRpb25GZWUgKyBjb3N0cy5zZXJ2aWNlcwogICAgaW50YyAxMSAvLyAxMzc4OTAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKG5lZWRzU2VydmljZXNMaXN0Qm94TWJyKSB7CiAgICBmcmFtZV9kaWcgMgogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyByZXF1aXJlZEFtb3VudCArPSBjb3N0cy5zZXJ2aWNlc2xpc3QKICAgIHN3YXAKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgc3dhcAoKbmV3U2VydmljZUltcGxfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY0CiAgICAvLyBpZiAoYXNzZXQgIT09IDApIHsKICAgIGZyYW1lX2RpZyAtMTAKICAgIGJ6IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSksIGVyck5vdE9wdGVkSW4pCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZnJhbWVfZGlnIC0xMAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDMwIC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0CgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSksIGVyck5vdE9wdGVkSW4pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBlcnJOb3RPcHRlZEluKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xMAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9pZl9lbHNlQDE2CiAgICBieXRlYyAzMCAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKbmV3U2VydmljZUltcGxfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCAwLCBzZXJ2aWNlQ3JlYXRpb25GZWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzUKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIDAsIHNlcnZpY2VDcmVhdGlvbkZlZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzUKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIDAsIHNlcnZpY2VDcmVhdGlvbkZlZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgNgogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnRUbwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzcKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbE1icikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgMgogICAgKwogICAgZnJhbWVfZGlnIC0xMgogICAgY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc5LTc4NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzgxCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzktNzgzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3OS03ODQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODYtNzk5CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXR1czogU2VydmljZVN0YXR1c0RyYWZ0LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgcGFzc2VzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIHBheW91dEFkZHJlc3MsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBkZXNjcmlwdGlvbjogJycsCiAgICAvLyAgIGJhbm5lckltYWdlLAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlLAogICAgLy8gICBoaWdobGlnaHRDb2xvcgogICAgLy8gfQogICAgZnJhbWVfZGlnIC0xMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODcKICAgIC8vIHN0YXR1czogU2VydmljZVN0YXR1c0RyYWZ0LAogICAgcHVzaGJ5dGVzIDB4MGEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg2LTc5OQogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIHBhc3NlcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBwYXlvdXRBZGRyZXNzLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb246ICcnLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IKICAgIC8vIH0KICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xMAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTkKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC04CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTYKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgZnJhbWVfZGlnIC01CiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwNzUKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAxMTcKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4Ni03OTkKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBwYXNzZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgcGF5b3V0QWRkcmVzcywKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJywKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yCiAgICAvLyB9CiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIGxldCBhY3RpdmF0ZWQgPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IChUeG4uZ3JvdXBJbmRleCArIDEpOyBpIDwgR2xvYmFsLmdyb3VwU2l6ZTsgaSArPSAxKSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGZyYW1lX2J1cnkgMQoKbmV3U2VydmljZUltcGxfd2hpbGVfdG9wQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IChUeG4uZ3JvdXBJbmRleCArIDEpOyBpIDwgR2xvYmFsLmdyb3VwU2l6ZTsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgMQogICAgZ2xvYmFsIEdyb3VwU2l6ZQogICAgPAogICAgYnogbmV3U2VydmljZUltcGxfYmxvY2tAMzEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyBpZiAodHhuLnR5cGUgIT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2CiAgICAhPQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2Jsb2NrQDI5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkLCBlcnJJbnZhbGlkU2VxdWVuY2UpCiAgICBmcmFtZV9kaWcgMQogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyMwogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJc2VxIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzZXEKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wLCBlcnJJbnZhbGlkU2VxdWVuY2UpCiAgICBmcmFtZV9kaWcgMQogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICBieiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjUKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXNlcSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc2VxCgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIsIGVyckludmFsaWRTZXF1ZW5jZSkKICAgIGZyYW1lX2RpZyAxCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDI3CiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklzZXEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXNlcQoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDgKICAgIC8vIGlmICh0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5hY3RpdmF0ZVNlcnZpY2UpKSB7CiAgICBmcmFtZV9kaWcgMQogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyAzMSAvLyBtZXRob2QgImFjdGl2YXRlU2VydmljZSgpdm9pZCIKICAgID09CiAgICBieiBuZXdTZXJ2aWNlSW1wbF9ibG9ja0AyOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDkKICAgIC8vIGFjdGl2YXRlZCA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCm5ld1NlcnZpY2VJbXBsX2Jsb2NrQDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIGxvZ2dlZEFzc2VydChhY3RpdmF0ZWQsIGVyclNlcnZpY2VOb3RBY3RpdmF0ZWQpCiAgICBmcmFtZV9kaWcgMAogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAzMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU25hdiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmF2CgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gcmV0dXJuIGlkCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKbmV3U2VydmljZUltcGxfYmxvY2tAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gKFR4bi5ncm91cEluZGV4ICsgMSk7IGkgPCBHbG9iYWwuZ3JvdXBTaXplOyBpICs9IDEpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZnJhbWVfYnVyeSAxCiAgICBiIG5ld1NlcnZpY2VJbXBsX3doaWxlX3RvcEAxOQoKbmV3U2VydmljZUltcGxfdGVybmFyeV9mYWxzZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc5CiAgICAvLyA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIG5ld1NlcnZpY2VJbXBsX3Rlcm5hcnlfbWVyZ2VAMzgKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNlcnZpY2VDb3N0KHJlZmVycmVyOiBieXRlcykgLT4gdWludDY0OgpzZXJ2aWNlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODA3CiAgICAvLyBwcml2YXRlIHNlcnZpY2VDb3N0KHJlZmVycmVyOiBBY2NvdW50KTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDUKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAyOSAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwOAogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTEKICAgIC8vIGxldCByZXF1aXJlZEFtb3VudDogdWludDY0ID0gc2VydmljZUNyZWF0aW9uRmVlICsgY29zdHMuc2VydmljZXMKICAgIGludGMgMTEgLy8gMTM3ODkwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxNCAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBpZiAoIXRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBpZiAoIXRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2VydmljZUNvc3RfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxMwogICAgLy8gcmVxdWlyZWRBbW91bnQgKz0gY29zdHMuc2VydmljZXNsaXN0CiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKCnNlcnZpY2VDb3N0X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE3CiAgICAvLyByZXR1cm4gcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbEZlZVRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCAwKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE3CiAgICAvLyByZXR1cm4gcmVxdWlyZWRBbW91bnQgKyByZWZlcnJhbEZlZVRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCAwKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmZXJyYWxGZWVUbwogICAgKwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zdWJzY3JpcHRpb25NYnIocmVjaXBpZW50OiBieXRlcywgc2VydmljZUlEOiB1aW50NjQpIC0+IGJ5dGVzOgpzdWJzY3JpcHRpb25NYnI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyMQogICAgLy8gcHJpdmF0ZSBzdWJzY3JpcHRpb25NYnIocmVjaXBpZW50OiBBY2NvdW50LCBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCk6IFt1aW50NjQsIHVpbnQ2NF0gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyMwogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLnN1YnNjcmlwdGlvbnMKICAgIGludGMgNyAvLyA2MDUwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjQKICAgIC8vIGxldCBnYXRlSUQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyNgogICAgLy8gaWYgKHNlcnZpY2VJRCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfaWZfZWxzZUA2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI3CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN1YnNjcmlwdGlvbk1icl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzEtODMyCiAgICAvLyBjb25zdCBzZXJ2aWNlID0gY2xvbmUodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlKQogICAgLy8gZ2F0ZUlEID0gc2VydmljZS5nYXRlSUQKICAgIGR1cAogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzMgogICAgLy8gZ2F0ZUlEID0gc2VydmljZS5nYXRlSUQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM0CiAgICAvLyBpZiAoc2VydmljZS5wYXNzZXMgPiAwKSB7CiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ6IHN1YnNjcmlwdGlvbk1icl9hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM1CiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMucGFzc2VzCiAgICBpbnRjIDEwIC8vIDE0NDIwMAogICAgZnJhbWVfYnVyeSAwCgpzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gImwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gaWYgKCF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDAKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5zdWJzY3JpcHRpb25zbGlzdAogICAgZnJhbWVfZGlnIDAKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgZnJhbWVfYnVyeSAwCgpzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDUKICAgIC8vIHJldHVybiBbbWJyQW1vdW50LCBnYXRlSURdCiAgICBmcmFtZV9kaWcgMAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAMAAEIAqCNBtSTAdTeAdTYA9SQArjvBMjmCNSUVCYyCWFraXRhX2RhbwQVH3x1AW8AC0VSUjplcnJTZG5lAXMMYWtpdGFfZXNjcm93C0VSUjplcnJVZG5lA2FhbAEAAWYBKAFiAgAAAW0BbAZ3YWxsZXQBFAFwEnBhc3Nlc19yZXByaWNlZF9hdAFpC0VSUjplcnJGZ3RlC0VSUjplcnJJc2VxC0VSUjplcnJOY2xzC0VSUjplcnJOcmt5CHJlZmVycmVyC0VSUjplcnJBc2FtC0VSUjplcnJJcGF5C0VSUjplcnJOZGFvEXN1YnNjcmlwdGlvbl9mZWVzC0VSUjplcnJOb3B0BMiDUTAEOU6usgVhcHBJRAtFUlI6ZXJySXBtcgtFUlI6ZXJySXBtYQtFUlI6ZXJySXBtcxJjb250cm9sbGVkX2FkZHJlc3MLRVJSOmVyckl3bHQCAAEHdmVyc2lvbgtFUlI6ZXJyVHRsZwtFUlI6ZXJyU25hYwtFUlI6ZXJyU3NoZAtFUlI6ZXJyQmxrZANwYWwLRVJSOmVyckl4ZnILRVJSOmVyck1hbXQLRVJSOmVyck1pbnYLRVJSOmVyck5zdmOABOqRgN02GgCOAQGxMRkURDEYQQGaggcERo6+YwSbD4nWBDZtWycEm6AgtgSsWSrdBFBRd/gEg/VsRicfgioEF8hzCwRM3wzXBIfgVcYEtZyKVASu67N4BHKRwI4EU1XabQSgR8f3BBDwDDoEdyRahASmjmljBEyxVe4EsQowbgTyNVtVBBrEp1gE466yXATqqqTTBBdlOH0EKBuJGwTD2fHcBFlOuh0EwP8nMAQnUgOvBBmlSPoEEmnYfgRDA2aOBA1qR6MEIgcHjgQdx4NxBLG6wssECaMVjgSZL5iSBPmZY9QE1LFuegSxa6rDBHTe9ZoEJbgSpwSWnO2bBDPY5a0EYD1ylwTf5gLPBNimxSMnIIIEBDP3iAgEroTL2AQz6SyUBIVN7eA2GgCONwbVB10H1AiiCR4JXAnnCioKZwqYCtQLBAtkC64MEAxoDLkNAA1zDdwOPg6WDx0PihAOET4RixHWEeYSdRK5E5wTwhT9FSUVXhWAFZQV8hYpAAMWThZ4FpsXZBhAGGAZ+hoXGjoaXRwWHEAcwgABACNDgAwVH3x1AAAAAAAAPVSwI0OABFrZ9MY2GgCOAQZxADEZgQQSMRgQREIcSYoCAYv+VwIAi/4iWYv/JQtLAkxZSwIVi/8jCEklC0sFTFlPBE8CCU1SiYoCASKL/kEABYv/QAADIkyJi/5yB0yMAEEAEYv/FichTFADiwASQQADI0yJIkL/+ooDAYv+i/2I/8ZAAAIiiYv+cghISYv/EkEAB3MCSDIDEomL/3MCSBKJigECi/9XCCCL/1cACIv/V0ggTgJQTFCL/4mKAQCL/zgJMgMSQAAEJxewAIv/OCAyAxJAAAQnGLAAiYoDAIv9iP/Yi/04B4v+EkAABCcisACL/TgIi/8SQAAEJyOwAImKAwCL/ov/E0EAC4v9AYABJExQi/6/iYoDAYv9AYABJExQSb5AAAqL/xaL/kxQjACJTLxIi/8hBghLAXMARQFAAAdJMgEPQQAQI0EABUxMFlCJRQGL/kL/9SJC/+2KAgCL/jgAi/8SQAAEJySwAIv+OBMyAxJAAA+AC0VSUjplcnJOY2x3sACL/jgVMgMSQAAEJxewAIv+OCAyAxJAAAQnGLAAiYoCAYv+QAADi/+Ji/4nJWVBADRJFYEgEkEALCNAAAQnJrAAi/5yCERLARNBABhJMQATQQARSXMCRIv+cghEE0EABIv/TImJIkL/0YoBATIDi/9AAAGJSIv/JxllSImKAgEii/6AA29hbGVIgRhbi/4nCGVIgVhbTLGyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQpEkRJIlklCEwVEkRXBgBJFSQTQQAFSCKMAIkXSUEABYsBQAAIIiJOAk1C/+tJcgdMjABBABKLARYnIUxQA4sAEkEABCNC/94iQv/aigQBi/w4GIv9JwhlSIEoWxJBADmL/DgZQAAyi/w4G4EEEkEAKIv8ORoAgARDkiZVEkEAGYv8ORoBi/4SQQAOi/w5GgKL/xYSQQACI4kiiYoDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiYoCASKL/icIZUiBWFsxADINMg5OA4v/QAAbSEUBMgNJIhZPA0lOAlBPA1BMUExQJwlQjACJi/9PA4j9BkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAEEAGIsAFYEgEkEAD4sASwESQQAHSYsBE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nJWVBAAhJFYEgEkAABCcmsABJSwISQQBII0yL/ycZZUEANkkVgSASQQAuTgNLAksBTwNJTgNNTEEAF0yL/xZPAlBMUExQTFAnCSJPA1RQQv8uRQEyA0L/40gyA04DQv/Mi/9yCExOAkAAB0UBIkxC/6lJSwISQQALTHMCSDIDEkxC/5dJcwJITwISTEL/jIoCAYv+JwhlSIFYW4v/TIj770AAAzIDiYv/JxllQQAJSRWBIBJBAAGJSDIDQv/oigQCi/w4GIv9JwhlSIEoWxJBADuL/DgZQAA0i/w4G4EEEkEAKov8ORoAgASbFH0sEkEAG4v8ORoBi/4SQQAQi/w5GgKL/xYSQQAEI4v+iSJC//mKAwErSYv+MgMSQQAEIowAiYv9JwhlSCRbjAEhCYwAi/9BABWLAXIIRIv/cABFAUAAByEJMhAIjACJigUBK4v+QQFui/wyAxNBAWaL+4ALd2FsbGV0X2ZlZXNlSCRbSSEEDkSL/h0hBJdJjABAAAiL/kEAAyOMADIHSYGAmp4BCEyLABaL/ExQJydMUElOA4v7JwhlSCRbTCJZgdTFAQuB5KkDCIv9QABisUxJcghESwKLAAiyCLIHI7IQIrIBtk8CFk8DFk8CshiABNysCTWyGkyyGrIaTLIai/+yGoEGshAisgGztD5JVwQATFcABCkSREkVJBJEF0xMFkwWUFcICIv+iwAJFkxQTIlLAXIIRIv9cABFAUEAaUlPAklyCESxSwFyCERPBLIIsgcjshAisgG2i/2yEYsAshKyFIEEshAisgG2TwIWTwMWTwKyGIAEo6FsqrIaTLIashpMshqL/7IagQayECKyAbO0PklXBABMVwAEKRJESRUkEkQXTEL/d0kyEAixSwJJcghEMhCyCLIHI7IQIrIBtov9FkyyGCcgshqyGoEGshAisgGzQv9pi/4WIhZQTIk2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXNhoDSRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJyhPA2coTwJnJwZMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEFzYaBkkVgSASRDYaB0kiWSUISwEVEkRXAgA2GghJFYEkEkQ2GglJFSMSRDYaCkkVgQMSRDYaC0kVJBJEFyIoZURMiPvGV2ggiB1IFilMULAjQzEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFYEgEkQ2GgdJIlklCEsBFRJEVwIANhoISRWBJBJENhoJSRUjEkQ2GgpJFYEDEkSIGReIHNEWKUxQsCNDKzYaAUkVJBJEFzYaAkkVJBJEF0w2GgNJIlklCEsBFRJEVwIATDEATBZQKkxQSb1FAUAABCcEsABLARVLAwiBzxgOQAAPgAtFUlI6ZXJyQmRsbrAARwKBSyW6F0oluhclCLpXAgBJTgMVSUUGSwQPQAAPgAtFUlI6ZXJyQm9mc7AASwNLBQxBACAiSwVJTgIPIksCTwJNSwVJSwMPTE8DTwJNTwROAlJOAk4CUEsBvkRLARUWVwYCTwJQSwGBS1lPAiJPAlhMUEsBvEi/I0M2GgFJFSQSRBc2GgJJTgJJIlklCEsBFUlOBBJEVwIATDEATBZQKkxQSb1FAUAABCcEsABMFYGAAQ5AAAQnKbAASb5ESYFJWUsBIksCWE8FUEsCgUtZSwMVTwRLAk8CUk8CTFBLAU8DCU8CTwQITAkWVwYCXEtLAbxIvyNDNhoBSRUkEkQXNhoCSU4CFSMSRDYaA0lOAhWBAxJEMQBMFlAqTFBJvUUBQAAEJwSwAEmBcU8Eu4FyTwK7I0MxFiMJSTgQIxJENhoBSRUkEkQXMQBMFklOAlAqTFBJvUUBQAAEJwSwACIjuicLE0AAD4ALRVJSOmVyckZzaGSwACcKMQBQvUUBQQASMgpPAkwiiPc6JwoxAFBMvyNDMgpPAkk4AEkxABIhBiJPAk0hBQhPAk8DTwKI9xQnCjEAUDEATE4CiPcsQv/KJwoxAFC9RQFAAA+AC0VSUjplcnJOZnN2sAAnCjEAULxIJwoxAFAxACEFiPcTSVcAIEyBIFuxsgiyByOyECKyAbMjQycOMQBQvkQXIwkxAEwWUCpMUEm9RQFAAAQnBLAASSIjuoABChJAAA+AC0VSUjplcnJTbmRysAAiJxG7I0M2GgFJFSQSRBcxAEwWUCpMUEm9RQFAAAQnBLAASSIjuicREkAABCcqsAAigAEeuyNDNhoBSRUkEkQXMQBMFlAqTFBJvUUBQAAEJwSwAEkiI7qAAR4SQAAPgAtFUlI6ZXJyU25wYbAAIicRuyNDNhoBSRUkEkQXMQBMFlAqTFBJvUUBQAAEJwSwAEkiI7onCxNAAAQnK7AAIicLuyNDMRYjCUk4ECMSRDYaAUkVgSASRDEATIgR1icMTFBJvUUBQQAPgAtFUlI6ZXJyVWFibLAAMgpPAkk4AEkxABIhBiJPAk2B1HoITwJPA08CiPWWTEkiuUgxAExOAoj1riNDNhoBSRWBIBJEMQBMiBGAJwxMUEm9RQFAAA+AC0VSUjplcnJVbmJssABJvEgxAIHUeoj1j0lXACBMgSBbsbIIsgcjshAisgGzI0MxFiUJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBdPBTgWTwYiSSNPBE8JTwlPCU8JTwkiiBTlFilMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQYSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEF08EOBZPBSJJI08ETwhPCE8ITwgiI4gUjRYpTFCwI0MxFiMJSTgQIxJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXTwUiRwNPCU8JTwlPCU8JIogUPBYpTFCwI0MxFiMJSTgQIxJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXTwQiRwNPCE8ITwhPCCIjiBP1FilMULAjQzEWgQMJSTgQIxJEMRYlCUk4EIEEEkQxFiMJSTgQgQYSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEF08GOBZPBjgWTwcjTwMjTwRPCU8JTwlPCU8JIogTghYpTFCwI0MxFoEDCUk4ECMSRDEWJQlJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBdPBTgWTwU4Fk8GI08DI08ETwhPCE8ITwgiI4gTGRYpTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBdPBTgWTwYjTwIiSU8JTwlPCU8JTwkiiBK3FilMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEF08EOBZPBSNPAiJJTwhPCE8ITwgiI4gSXxYpTFCwI0MxFiMJSTgQIxJENhoBSRUkEkQXMQBMFlBJVwAgTFcgCFAnBUxQSb1FAUAABCcHsABJvkSBQFtBAAQnGrAAMQBLAjgAEkAABCcksABLATgJMgMSQAAEJxewAEsBOCAyAxJAAAQnGLAASwE4BzIKEkAABCcbsABJvkSBYFtPAjgICBaBYEy7I0MxFiMJSTgQgQQSRDYaAUkVJBJEFzEATBZQJwVMUEm9RQFAAAQnB7AASb5EgUBbSwI4ERJAAAQnGrAAMQBLAklPAojyDDgUMgoSQAAPgAtFUlI6ZXJySWFyZbAASb5EgWBbTwI4EggWgWBMuyNDNhoBSRUkEkQXNhoCSRUkEkQXTDEATBZQJwVMUEm9RQFAAAQnB7AASb5MSU8CRIFgW0sDD0AAD4ALRVJSOmVyck5lZm6wAIFAW0lBACOxMQBLA7ISshSyEYEEshAisgGzSb5EgWBbTwIJFoFgTLsjQ0ixMQBLArIIsgcjshAisgGzQv/cK0cENhoBSRUkEkQXMQBMFlBJJwVMUEm9RQFAAAQnB7AASb5MSU4CTgREiAzmIQdOA4EgW0lFBkEAQksDVwAgSwUWUCpMUIEZJLoXQQAuTwJIJxJLAlC8SEsCgShbRQgiJxNlRQFBAMEiJxNlREsIDUEAtoHUyBkhBwhOAicUTwJQvEEABUwhCAhMSTEATwOI8IdJVwAgTgOBIFtMSwKBQFtJRQlBADJPAoFgW0lFB0EAFbExAEsGshJLB7IRshSBBLIQIrIBs7FMsghMsgcjshAisgGzvEgjQ0sDMQASQQAcTwNIsTEATwOBYFtPAwiyCLIHI7IQIrIBs0L/2E8CgWBbSUUGQQAQsTEASwWyCLIHI7IQIrIBs7FMsghMsgcjshAisgGzQv+sgfSNBUL/RzEWIwlJOBCBBhJENhoBSRWBKBJENhoCSRUkEkQXTIgQoCIoZURPA4jxrogQ1EhOAyIoZURPA0xPAk8DiPMKSEAABCcVsAAjiBGaSCNDMRYjCUk4EIEGEkQ2GgFJFYEoEkSIEF1JTgJOA0wiKGVETFcAIExLAYjwXEyI7/oiKGVETwNMTwJPA4jw0kAABCcVsAAjiBFPSCNDNhoBSRWBKBJEIogRP0gjQzEWIwlJOBAjEkQ2GgFHAhWBKBJEJwVMUEm9RQFAAAQnB7AAvkSBSFtAAA+AC0VSUjplcnJOZ3RksAAnFEsBUElOA71FAUEAD4ALRVJSOmVyclBleHOwACIoZURMVwAgSU4DiO/HSUAAD4ALRVJSOmVyck5sd2ywADIKTwJMIQiI7oNJTwKI70ZMFkxQvyNDNhoBSRWBKBJEJwVMUEm9RQFAAAQnB7AASb5ESYEoW0sBgThbTEsBiApGTwKBUFtMTwKICmQMQQAJIhZLAYFYTwK7I0MrNhoBSRUkEkQXNhoCSU4CSSJZSU4DgSALJQhMFRJEMQBMFklOBFAnBUxQSb1FAUAABCcHsAC+REmBIFtJTwJXACBOAkAAD4ALRVJSOmVyck5vZG6wABZLAUxQKkxQSb1FAUAABCcEsABJIiO6TIEZJLoXRQYnCxNAAAQnK7AASwRBAFtLBEsCD0EAUyNAAA+AC0VSUjplcnJQY29msAAiSUsDDEEAJksDVwIASwGBIAuBIFhLAkyICYAnDExQvUUBQQAEJyywACMIQv/TRgMxAEsCUCcSTFBJvEhMvyNDIkL/qjYaAUcCFYEoEkQnBUxQvUUBQQAEJwewACcSTFC8QAAEJwewACNDIitHAjYaAUcCIllJTgMlC0xJFU4CVwIAIklLBgxBADJJJQtLAklPAllJTwVJTgQSREsBFVJJFUsBgSBZSYEiEkRMUiJZJAuBJAgITgIjCEL/x0YCJQgSRCcNIklLBAxBANIiTgJLA0sBiOwASYEgWUsBFVIiWUsDDUEAsEsDSUsCSU4DiOvlVwAgTE8CiOvcSYEgWUsBFVJXAgBLBCQLJFhQiAvFSCcJIk8CVEUJTEkiWUlOBEkjCEkWVwYATwNMXABOBEyBBwgkCklFC0yBBwgkCklFCgxBAAxLB0sJCa9PA0xQTgIiTgJPBIEQCElOBCMIRQhLA0sIDEEAH0sKTwNJTgJTTwVPBUlOA08CVE4EIwhOAyMITgJC/9lPAkhPAkhMIwhMTwJMQv85TwJIIwhC/ydIKUxQsCNDNhoBSRWBIBJENhoCSRWBIBJEiAfhJwxMUL1FAScJIk8CVClMULAjQzYaAUkVgSASRDYaAkkVJBJEFxZQKkxQSb1FAUEAF0kiI7onCxJBAA0jJwkiTwJUKUxQsCNDIkL/8DYaARUkEkQ2GgJJFSQSRBciKGVETIju4YgQ2hYpTFCwI0M2GgEVJBJEiAtXiBDGFilMULAjQzYaAUkVgSASRDYaAkkVJBJEF0w2GgNJFSQSRBc2GgRJFSQSRBdJTgNOAogQvEkiW04CJFtOBEEAIUsDQQAcIyEICwgiKGVESU8DiO52TwOI7vMIFilMULAjQyJC/+E2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBdPAkyIEGoiWyIoZUSICsVPA4juuAgWKUxQsCNDNhoBSRWBKBJENhoCSRUkEkQXIihlREyI7NOIC/lGAilMULAjQzYaAUkVgSASRDYaAkkVJBJEFxZQKkxQSb1FAUAABCcEsAC+RClMULAjQzYaAUkVgSASRCcKTFBJvUUBQQAKvkQXFilMULAjQ0giQv/0Iis2GgFJFYEgEkQ2GgJJFSQSRBdJNhoDSRUkEkQXTCcNSwNLAwhLAg1BAJdLARZLBUxQKkxQSUUIvUUBQQCESwa+RIACAAJMUE4CSSJZSSMIFlcGAE4DTFcCAEwlC0wiRQlLCEsCDEEAGklLCUlOAlklCBZXBgBPBUxQTgQlCEUJQv/eSRVOAyJFCksJJQxBABxLBUsKSU4CWUsFCBZXBgBPBkxQTgUlCEUKQv/dTE8DUk8CTFBPAlcCAFBMIwhMQv9eKUxQsCNDNhoBSRWBKBJEJwVMUEm9RQFAAHJIgGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApTFCwI0O+RElXACBLAVcgCEsCVygISwNXMAhLBFc4CEsFV0AISwZXSAhLB1dQCEsIV1gITwlXYAiAAYBPClBPCVBPCFBPB1BPBlBPBVBPBFBPA1BPAlBMUEL/pDYaAUkVgSgSRCcFTFBJvUUBQAAEJwewAL5EKUxQsCNDIkcCNhoBRwIVgSgSRCcFTFBJvUUBQAAEJwewAL5MSU4CTgNEJwlOA0lXACBOAitOBStOBYEkr04EgAMwMDBOA4EgW0lOAkAAz0sGTgNLAkULJw1FDCcSTFBJRQ29RQFBABpLC0m+RFcCAEwiJboXFlcGACcNTFwATFBFC08ESVcoCEsBVzAISwJXOAhLA1dACEsEV0gISwVXUAhLBldYCE8HV2AITwlPCFBPB1BPBlBPBVBPBFBPBBZQTwdQSwlQTwhJFRZXBgJMUEyAAgC3UEsBFYG3AQhPCUkVFlcGAkxQSwEWVwYCTwNMUEsBFU8DCExPCVBPB1BPB1BPBlBPBVBPBFBMFlcGAlBPAlBMUEsCUClMULAjQ08DSE8ESE8ESE8ESE8ESEsBFksDTFAqTFBJvUUBQAAEJwSwAEkiI7pOBUmDAikguklOAkUISYF1JboXJQhLAYF1TwK6VwIATgdJgUsluhdKJboXJQhLAk4CulcCAE4HSYMCTSS6TgZJgXEjuk4FgwJyA7pOBTIDEkH+vksCRQtC/rc2GgFJFYEgEkQnD0xQvUUBFCcJIk8CVClMULAjQzYaAUkVgSASRCcOTFBJvUUBQQAKvkQXFilMULAjQ0giQv/0NhoBSRWBIBJEJw9MUEm9RQFBAAq+RBcWKUxQsCNDSCJC//QxFiMJRwI4ECMSRDYaAUkVJBJEF0lOAyInBmVMSU4CTgVEIihlREwlW3IIRE8CiOhbTDgHMgoSQAAEJyKwAEw4CDIQI0sDCAsSQAAEJyOwALEyCksDshEishKyFIEEshAisgGzQQFQRwIiWUsBFVJXAgArE0EBQCIoZURJJxBlSExJJy1lSElXCAhOAiRbTgMiJwZlTElOAkUHREkiWUsBFVJJTgJXAgBMJxBlSEyxIxZOAkkVFlcGAkxQgAQAAQACTFBMshiABDqyiVuyGrIagQayECKyAbO0PklXBABLAVcABCkSREkiWYEpCyUITBUSRFcGKSJbSUAAD4ALRVJSOmVyck5lc2OwAEsGJVtJTwISQAAPgAtFUlI6ZXJyV2VzY7AAsU8ESbIYgARa3zOPshpPBLIaTwKyGk8CshqACgABAAAAAAAAAACyGicNshqBBrIQIrIBIihlRE8CSU4CcghESwZJTgSI5yEyEAu2THIIRLIHsggjshAisgG2SwEWTBYnJ0xQTwOyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVEIicGZUQlW3IIRE8CiOa3MhAjTwIICxYpTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJxBlSHIIRBJAAAQnHLAAJwZMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcQZUhyCEQSQAAEJxywACIoZUQnLWVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJyhMZyNDNhoBSRUkEkQXMQAiKGVEJxBlSHIIRBJAAAQnHLAAKExnI0OKAgEyB0mL/gmL/xgJiYoCAYv+UQAQSRWBEBJEi/9RABBJFYEQEkRQiYoCAYv+i/8PQQAGi/6L/wmJIokiJxNlRQFAAAUnEzIHZ4mKAQErIihlRCcdZUhJIk4CJFtJTgJBABuLAkkhBA5Ei/8dIQSXSYwBQAAIi/9BAAMljAEijACBEFtJjAJBABuLAkkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjACLAUmLAElOAwiL/0wJTBZPAhZQTBZQjACJigoBIkkrSYj/dIv5MQCI/z8nDExQvUUBQQAEJyywACKL90ECYIv4OBCBBBJEi/g4ESEHjAOL/EAB3Yv5jAAnDzEAUL2MAkgnDzEAUEm9RQFBAb5JvkQXTgJLAkkjCBZPAky/MQBMFlCMAYsCQAAHiwMhBQiMA4v+QQGQSwJBAYsjTgNLA0EAB4sDIQgIjAOL+oj++UlOBUkiW0wkWwgiKGVEIicGZUQlW3IIREyL/UsETwRPBIjmuEkiW04EJFuLAwiL9jgASU4GMQASIQYiTwJNCE4Di/dBANWL+DgQgQQSRCInBmVEJVtyCESL+DgRcABFAUAABCcesACxIicGZUQlW3IIRE8FshJLAbIRshSBBLIQIrIBs4v2MgpPBYjiJ4v4MQCI4qKL+DgUMgoSQAAEJy6wAIv4OBJJi/oPQAAEJy6wALFPBoEQW7ISSwGyEYsAshSBBLIQIrIBs4v6CTIHSYv8Fov5TFBPAhZQi/oWUIv7FlBPAxZQTwQWUEwWUCMWUEwWUCcFiwFQSU8Cv08DQQANi/4Wi/9QJxSLAVBMvzEATE8DTwKI4cGMAImL9ojhdIv2OAcyChJAAAQnG7AAi/Y4CElOCYv6TwUISU4CD0AABCcbsACxIicGZUQlW3IIRE8FsgiyByOyECKyAbOxTwaBEFuyCIsAsgcjshAisgGzTwZMCUL/VSJOA0L+ciNOAkL+QkUBi/wWi/lMUCpMUEm9RQFAAAQnBLAASSIjuicREkAABCcqsABJgQkkuhdLAhJAAAQnGrAARwKBESS6F4z6SSMkuheM+0mBISS6F04DgwIpILpJjAAyAxNAAASL+YwAgRkkuhdB/cAhCowDQv25IkL9qIoBAiJJKycFi/9QSb1FAUAACCKL/4wBjACJvkRJVwAgSU4CjAFJgSBbjAJJgVBbTgJJgShbTgJJgThbTgJJgWBbTgKBMFtMi/9XACCI/HgnDExQvUUBQQAIIov/jAGMAImLAkEAJosCFosBTFAqTFBJjAC9RQFBAAuLACIjuicLEkEACCKL/4wBjACJTwNPA4j8Jk8DDkEACCKL/4wBjACJDEEACCKL/4wBjACJI4v/jAGMAIkiKGVEMQCI4SiI4RKJigsBK4v7gQQPQAAEJy+wAIv8gTwPQAAEJzCwAIv4QQAJi/1AAAQnMbAAi/1AAK0ijACL/0EATiIoZUQxAIjg5Iv4QQAji/k4EIEGEkQiKGVESwExAIjgbov5TgKLAIjhS0AABCcVsACI4KYyA4v1i/aL94v6i/uL/Iv9TwgiTwmI/DJMiSIoZUSL/ojhmov4QQAji/k4EIEGEkQiKGVETIjfIE4Ci/lOAosAiOLqSEAABCcVsABJV2ggSwEiW08CVwggi/WL9ov3i/qL+4v8i/1PCU8JTwmI+9tMiYv9Fov6TFAqTFBJvUUBQAAEJwSwAIEhJLoXjACL+ED/NYsAQf8wgAtFUlI6ZXJySGd0ZbAAigECJwWL/1BJvUUBQAAEJwewAL5ESYEgW0lPAlcAIExAAAQnMbAATBZQKkxQSb1FAUAABCcEsACBISS6F4v/iYoCAysnFIv+UEm9RQFBALq+RIv/IltJjABBABlJIluLABJBABCL/4jeSIz/i/6L/08ETwSJSSJbTCIoZUSL/lcAIElOA04ETFcIIElOAk4EJwhlSIFYW04CEkEAMUhFAUwiKGVEi/5XACBMJwhlSIFYW08DSU4CSwOI3c0iTgJNFk8CTFBMUIv+i/9PA4lLAUsEiN20QAAGRQFMQv/DSXIISElLAxJBABBzAkgyAxJPA08DTwJNQv+oTwJJcwJITwISTwNOAk1C/5dIIihlRIv+VwAgTEsBiN75SU8CiN6VQv9+igIBi/6I/QKM/kAAD4ALRVJSOmVyckN0cmewACcFi/5QSb5ESVcAIExJgSBbTEmBMFtMSYFAW0yBSFtBAAmL/0AABCcWsABLAkABAU8CSE8CSwKI+bhLAkEAsbEiJwZlRCVbcghESwEiW7ISTwNJTgOyEbIUgQSyECKyAbOxMQBLASRbshJLArIRshSBBLIQIrIBs7GBEFuyErIRshSBBLIQIrIBs0sBvkRJgShbSwGBOFtMSwGI+QpJTgVMiPksTIFQW0lPAgxBAClITwJIIxZLAoFYTwK7TEm+RIFgW08CCRZLAYFgTwK7MgcWgVBMu4v+iU8DDEH/3ksBSb5EgVhbIwgWgVhMu0L/zE8CSLEiJwZlRCVbcghESwEiW7IIsgcjshAisgGzsTEASwEkW7IIsgcjshAisgGzsYEQW7IIsgcjshAisgGzQv9ZTwIWSwNMUCpMUEm9RQFAAAZITwJC/u2DAikgukkyAxNAAAZITwJC/ttPA0hC/tWKDAErSScOMQBQvUUBJw4xAFBJvUUBQQGYSb5EF0cCIwgWTwNMvzEATBZQTIv3gQQPQAAEJy+wAIv1gTwPQAAEJzCwAIv4gQUOQAAPgAtFUlI6ZXJyTXhwc7AAi/sVSU4CgYABDkAABCcpsAAiKGVEJx1lSCJbSU4CIQsITIsCQAAFTCEFCEyL9kEAJjIKi/ZwAEUBQAAEJx6wACInBmVEJVtyCESL9nAARQFAAAQnHrAAIihlRCInBmVEJVtyCERMi/8iTwZPBIjfqkkiW0wkWzIKTwRPAgiL9E4CiNtusSInBmVEJVtyCESyB7III7IQIrIBs4v1FoABCkxQi/YWUIv3FlCL+BZQi/kWUIv6UE8CFlcGAov7UEyAAgB1UEsBFYF1CBZXBgJQi/xQi/1Qi/5QTFAnDVAqTwNQSbxITL8ijAAxFiMIjAGLATIEDEEAP4sBOBCBBhNAAEyLATgYMggSQAAEJxawAIsBOBlBAAQnFrAAiwE4ADEAEkAABCcWsACLATkaACcfEkEAGiOMAIsAQAAPgAtFUlI6ZXJyU25hdrAAjACJiwEjCIwBQv+ZI0L+aIoBASIoZUQnHWVIIlshCwgnDjEAUL1FAUAAAyEFCCIoZUSL/yKI3l4IiYoCASEHIov/QQApSIv/Fov+TFAqTFBJvUUBQAAEJwSwAEmBISS6F0yBGSS6F0EABCEKjAAnDzEAUL1FAUAAB4sAIQUIjACLABZMFlBMiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * Constructs a no op call for the newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64 ABI method
   *
   * newService creates a new service for a merchant
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64(params) {
    return {
      ...params,
      method: "newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.interval, params.args.asset, params.args.amount, params.args.passes, params.args.gateId, params.args.payoutAddress, params.args.title, params.args.bannerImage, params.args.highlightMessage, params.args.highlightColor, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64 ABI method
   *
   * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64(params) {
    return {
      ...params,
      method: "newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.interval, params.args.asset, params.args.amount, params.args.passes, params.args.gateId, params.args.payoutAddress, params.args.title, params.args.bannerImage, params.args.highlightMessage, params.args.highlightColor]
    };
  }
  /**
   * Constructs a no op call for the setServiceDescription(uint64,uint64,byte[])void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static setServiceDescription(params) {
    return {
      ...params,
      method: "setServiceDescription(uint64,uint64,byte[])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.offset, params.args.data]
    };
  }
  /**
   * Constructs a no op call for the updateServiceTitle(uint64,string)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateServiceTitle(params) {
    return {
      ...params,
      method: "updateServiceTitle(uint64,string)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.title]
    };
  }
  /**
   * Constructs a no op call for the updateServiceHighlight(uint64,uint8,byte[3])void ABI method
   *
   * updateServiceHighlight changes the highlight label and colour of one of the sender's services
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static updateServiceHighlight(params) {
    return {
      ...params,
      method: "updateServiceHighlight(uint64,uint8,byte[3])void",
      args: Array.isArray(params.args) ? params.args : [params.args.id, params.args.highlightMessage, params.args.highlightColor]
    };
  }
  /**
     * Constructs a no op call for the setFeaturedService(pay,uint64)void ABI method
     *
    * setFeaturedService picks the sender's service that apps show front and center.
    The first call creates the featured box: `payment` covers `FeaturedServiceMBR` (plus the payer
    record when someone else pays). Later calls only change the id and take a 0 ALGO payment.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static setFeaturedService(params) {
    return {
      ...params,
      method: "setFeaturedService(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.id]
    };
  }
  /**
   * Constructs a no op call for the clearFeaturedService()void ABI method
   *
   * clearFeaturedService removes the sender's featured service and returns the storage to whoever paid it
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static clearFeaturedService(params) {
    return {
      ...params,
      method: "clearFeaturedService()void",
      args: Array.isArray(params.args) ? params.args : []
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
     * Constructs a no op call for the gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64 ABI method
     *
    * Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through
    `Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified
    wallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64 ABI method
   *
   * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedSubscribePayApplAddressUint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the subscribe(pay,address,uint64,uint64,uint64,uint64)uint64 ABI method
   *
   * Subscribe to an ungated ALGO service (or donate with `serviceID` 0).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static subscribePayAddressUint64Uint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "subscribe(pay,address,uint64,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the subscribe(pay,address,uint64,uint64,uint64)uint64 ABI method
   *
   * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static subscribePayAddressUint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "subscribe(pay,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64 ABI method
   *
   * `gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.gateTxn, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64 ABI method
   *
   * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.gateTxn, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId]
    };
  }
  /**
   * Constructs a no op call for the subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64 ABI method
   *
   * `subscribe` for an ASA service (`payment` covers the MBR exactly).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.recipient, params.args.amount, params.args.interval, params.args.serviceId, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64 ABI method
   *
   * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64(params) {
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
     * Constructs a no op call for the gatedTriggerPayment(appl,(address,uint64),uint64)void ABI method
     *
    * Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the
    caller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only
    selects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must
    be `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedTriggerPaymentApplAddressUint64Uint64Void(params) {
    return {
      ...params,
      method: "gatedTriggerPayment(appl,(address,uint64),uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.key, params.args.wallet]
    };
  }
  /**
     * Constructs a no op call for the gatedTriggerPayment(appl,(address,uint64))void ABI method
     *
    * LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the
    subscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedTriggerPaymentApplAddressUint64Void(params) {
    return {
      ...params,
      method: "gatedTriggerPayment(appl,(address,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.key]
    };
  }
  /**
   * Constructs a no op call for the triggerPayment((address,uint64))void ABI method
   *
   * Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).
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
     * Constructs a no op call for the adoptPrincipal(pay,(address,uint64))void ABI method
     *
    * Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the
    registry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the
    Phase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly
    `SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static adoptPrincipal(params) {
    return {
      ...params,
      method: "adoptPrincipal(pay,(address,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.key]
    };
  }
  /**
     * Constructs a no op call for the streakCheck((address,uint64))void ABI method
     *
    * Resets the streak of a subscription that missed a payment window. Never increments it
    (audit SG-02): only payments grow a streak.
  
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
     * Constructs a no op call for the clearOrphanPasses((address,uint64))void ABI method
     *
    * Deletes a pass box left behind by a subscription that was cancelled before the SG-08
    fix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:
    whether the owner was already refunded cannot be determined on-chain.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static clearOrphanPasses(params) {
    return {
      ...params,
      method: "clearOrphanPasses((address,uint64))void",
      args: Array.isArray(params.args) ? params.args : [params.args.key]
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
   * Constructs a no op call for the newServiceCost(uint64,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newServiceCostUint64Uint64Uint64(params) {
    return {
      ...params,
      method: "newServiceCost(uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the newServiceCost(uint64)uint64 ABI method
   *
   * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newServiceCostUint64Uint64(params) {
    return {
      ...params,
      method: "newServiceCost(uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.asset]
    };
  }
  /**
     * Constructs a no op call for the newSubscriptionCost(address,uint64,uint64,uint64)uint64 ABI method
     *
    * Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the
    stored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral
    disbursement MBR when the wallet has a referrer.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static newSubscriptionCostAddressUint64Uint64Uint64Uint64(params) {
    return {
      ...params,
      method: "newSubscriptionCost(address,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.recipient, params.args.asset, params.args.serviceId, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the newSubscriptionCost(address,uint64,uint64)uint64 ABI method
   *
   * LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newSubscriptionCostAddressUint64Uint64Uint64(params) {
    return {
      ...params,
      method: "newSubscriptionCost(address,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.recipient, params.args.asset, params.args.serviceId]
    };
  }
  /**
     * Constructs a no op call for the triggerGateCtx((address,uint64),uint64)(address,uint64,address) ABI method
     *
    * The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code
    (`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the
    following target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static triggerGateCtx(params) {
    return {
      ...params,
      method: "triggerGateCtx((address,uint64),uint64)(address,uint64,address)",
      args: Array.isArray(params.args) ? params.args : [params.args.key, params.args.wallet]
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
   * Constructs a no op call for the getFeaturedService(address)uint64 ABI method
   *
   * the creator's featured service id, 0 when none is set
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getFeaturedService(params) {
    return {
      ...params,
      method: "getFeaturedService(address)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
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
       * Creates a new instance of the Subscriptions smart contract using the create(string,uint64,(string,uint64))void ABI method.
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
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64` ABI method.
     *
     * newService creates a new service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setServiceDescription(uint64,uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    setServiceDescription: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.setServiceDescription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateServiceTitle(uint64,string)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateServiceTitle: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.updateServiceTitle(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateServiceHighlight(uint64,uint8,byte[3])void` ABI method.
     *
     * updateServiceHighlight changes the highlight label and colour of one of the sender's services
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateServiceHighlight: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.updateServiceHighlight(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `setFeaturedService(pay,uint64)void` ABI method.
         *
        * setFeaturedService picks the sender's service that apps show front and center.
        The first call creates the featured box: `payment` covers `FeaturedServiceMBR` (plus the payer
        record when someone else pays). Later calls only change the id and take a 0 ALGO payment.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    setFeaturedService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.setFeaturedService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `clearFeaturedService()void` ABI method.
     *
     * clearFeaturedService removes the sender's featured service and returns the storage to whoever paid it
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    clearFeaturedService: (params = { args: [] }) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.clearFeaturedService(params));
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
         * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64` ABI method.
         *
        * Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through
        `Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified
        wallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedSubscribePayApplAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * Subscribe to an ungated ALGO service (or donate with `serviceID` 0).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    subscribePayAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.subscribePayAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    subscribePayAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.subscribePayAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * `gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * `subscribe` for an ASA service (`payment` covers the MBR exactly).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64(params));
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
         * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64),uint64)void` ABI method.
         *
        * Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the
        caller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only
        selects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must
        be `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedTriggerPaymentApplAddressUint64Uint64Void: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedTriggerPaymentApplAddressUint64Uint64Void(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64))void` ABI method.
         *
        * LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the
        subscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedTriggerPaymentApplAddressUint64Void: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.gatedTriggerPaymentApplAddressUint64Void(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerPayment((address,uint64))void` ABI method.
     *
     * Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    triggerPayment: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.triggerPayment(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `adoptPrincipal(pay,(address,uint64))void` ABI method.
         *
        * Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the
        registry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the
        Phase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly
        `SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    adoptPrincipal: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.adoptPrincipal(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `streakCheck((address,uint64))void` ABI method.
         *
        * Resets the streak of a subscription that missed a payment window. Never increments it
        (audit SG-02): only payments grow a streak.
    
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
         * Makes a call to the Subscriptions smart contract using the `clearOrphanPasses((address,uint64))void` ABI method.
         *
        * Deletes a pass box left behind by a subscription that was cancelled before the SG-08
        fix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:
        whether the owner was already refunded cannot be determined on-chain.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    clearOrphanPasses: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.clearOrphanPasses(params));
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
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newServiceCostUint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newServiceCostUint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64,uint64)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the
        stored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral
        disbursement MBR when the wallet has a referrer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    newSubscriptionCostAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newSubscriptionCostAddressUint64Uint64Uint64: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `triggerGateCtx((address,uint64),uint64)(address,uint64,address)` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code
        (`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the
        following target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    triggerGateCtx: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.triggerGateCtx(params));
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
     * Makes a call to the Subscriptions smart contract using the `getFeaturedService(address)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * the creator's featured service id, 0 when none is set
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getFeaturedService: (params) => {
      return this.appClient.params.call(SubscriptionsParamsFactory.getFeaturedService(params));
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
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64` ABI method.
     *
     * newService creates a new service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setServiceDescription(uint64,uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    setServiceDescription: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.setServiceDescription(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateServiceTitle(uint64,string)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateServiceTitle: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.updateServiceTitle(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateServiceHighlight(uint64,uint8,byte[3])void` ABI method.
     *
     * updateServiceHighlight changes the highlight label and colour of one of the sender's services
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateServiceHighlight: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.updateServiceHighlight(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `setFeaturedService(pay,uint64)void` ABI method.
         *
        * setFeaturedService picks the sender's service that apps show front and center.
        The first call creates the featured box: `payment` covers `FeaturedServiceMBR` (plus the payer
        record when someone else pays). Later calls only change the id and take a 0 ALGO payment.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    setFeaturedService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.setFeaturedService(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `clearFeaturedService()void` ABI method.
     *
     * clearFeaturedService removes the sender's featured service and returns the storage to whoever paid it
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    clearFeaturedService: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.clearFeaturedService(params));
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
         * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64` ABI method.
         *
        * Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through
        `Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified
        wallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedSubscribePayApplAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * Subscribe to an ungated ALGO service (or donate with `serviceID` 0).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    subscribePayAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.subscribePayAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    subscribePayAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.subscribePayAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * `gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * `subscribe` for an ASA service (`payment` covers the MBR exactly).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64(params));
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
         * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64),uint64)void` ABI method.
         *
        * Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the
        caller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only
        selects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must
        be `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedTriggerPaymentApplAddressUint64Uint64Void: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedTriggerPaymentApplAddressUint64Uint64Void(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64))void` ABI method.
         *
        * LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the
        subscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedTriggerPaymentApplAddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.gatedTriggerPaymentApplAddressUint64Void(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerPayment((address,uint64))void` ABI method.
     *
     * Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    triggerPayment: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.triggerPayment(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `adoptPrincipal(pay,(address,uint64))void` ABI method.
         *
        * Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the
        registry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the
        Phase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly
        `SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    adoptPrincipal: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.adoptPrincipal(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `streakCheck((address,uint64))void` ABI method.
         *
        * Resets the streak of a subscription that missed a payment window. Never increments it
        (audit SG-02): only payments grow a streak.
    
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
         * Makes a call to the Subscriptions smart contract using the `clearOrphanPasses((address,uint64))void` ABI method.
         *
        * Deletes a pass box left behind by a subscription that was cancelled before the SG-08
        fix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:
        whether the owner was already refunded cannot be determined on-chain.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    clearOrphanPasses: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.clearOrphanPasses(params));
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
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newServiceCostUint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newServiceCostUint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64,uint64)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the
        stored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral
        disbursement MBR when the wallet has a referrer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    newSubscriptionCostAddressUint64Uint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newSubscriptionCostAddressUint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64(params));
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `triggerGateCtx((address,uint64),uint64)(address,uint64,address)` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code
        (`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the
        following target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    triggerGateCtx: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.triggerGateCtx(params));
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
     * Makes a call to the Subscriptions smart contract using the `getFeaturedService(address)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * the creator's featured service id, 0 when none is set
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getFeaturedService: (params) => {
      return this.appClient.createTransaction.call(SubscriptionsParamsFactory.getFeaturedService(params));
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
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64` ABI method.
     *
     * newService creates a new service for a merchant
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `setServiceDescription(uint64,uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    setServiceDescription: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.setServiceDescription(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateServiceTitle(uint64,string)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateServiceTitle: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.updateServiceTitle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `updateServiceHighlight(uint64,uint8,byte[3])void` ABI method.
     *
     * updateServiceHighlight changes the highlight label and colour of one of the sender's services
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateServiceHighlight: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.updateServiceHighlight(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `setFeaturedService(pay,uint64)void` ABI method.
         *
        * setFeaturedService picks the sender's service that apps show front and center.
        The first call creates the featured box: `payment` covers `FeaturedServiceMBR` (plus the payer
        record when someone else pays). Later calls only change the id and take a 0 ALGO payment.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    setFeaturedService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.setFeaturedService(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `clearFeaturedService()void` ABI method.
     *
     * clearFeaturedService removes the sender's featured service and returns the storage to whoever paid it
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    clearFeaturedService: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.clearFeaturedService(params));
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
         * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64` ABI method.
         *
        * Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through
        `Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified
        wallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedSubscribePayApplAddressUint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * Subscribe to an ungated ALGO service (or donate with `serviceID` 0).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    subscribePayAddressUint64Uint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.subscribePayAddressUint64Uint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribe(pay,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    subscribePayAddressUint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.subscribePayAddressUint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * `gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64` ABI method.
     *
     * `subscribe` for an ASA service (`payment` covers the MBR exactly).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64` ABI method.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64(params));
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
         * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64),uint64)void` ABI method.
         *
        * Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the
        caller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only
        selects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must
        be `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedTriggerPaymentApplAddressUint64Uint64Void: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedTriggerPaymentApplAddressUint64Uint64Void(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `gatedTriggerPayment(appl,(address,uint64))void` ABI method.
         *
        * LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the
        subscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedTriggerPaymentApplAddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.gatedTriggerPaymentApplAddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `triggerPayment((address,uint64))void` ABI method.
     *
     * Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    triggerPayment: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.triggerPayment(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `adoptPrincipal(pay,(address,uint64))void` ABI method.
         *
        * Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the
        registry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the
        Phase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly
        `SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    adoptPrincipal: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.adoptPrincipal(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `streakCheck((address,uint64))void` ABI method.
         *
        * Resets the streak of a subscription that missed a payment window. Never increments it
        (audit SG-02): only payments grow a streak.
    
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
         * Makes a call to the Subscriptions smart contract using the `clearOrphanPasses((address,uint64))void` ABI method.
         *
        * Deletes a pass box left behind by a subscription that was cancelled before the SG-08
        fix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:
        whether the owner was already refunded cannot be determined on-chain.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    clearOrphanPasses: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.clearOrphanPasses(params));
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
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newServiceCostUint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newServiceCostUint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64,uint64)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the
        stored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral
        disbursement MBR when the wallet has a referrer.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    newSubscriptionCostAddressUint64Uint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newSubscriptionCostAddressUint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Subscriptions smart contract using the `triggerGateCtx((address,uint64),uint64)(address,uint64,address)` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code
        (`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the
        following target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    triggerGateCtx: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.triggerGateCtx(params));
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
     * Makes a call to the Subscriptions smart contract using the `getFeaturedService(address)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * the creator's featured service id, 0 when none is set
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getFeaturedService: async (params) => {
      const result = await this.appClient.send.call(SubscriptionsParamsFactory.getFeaturedService(params));
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
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `newServiceCost(uint64,uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newServiceCostUint64Uint64Uint64(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64Uint64(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `newServiceCost(uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newServiceCostUint64Uint64(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.newServiceCostUint64Uint64(params));
    return result.return;
  }
  /**
     * Makes a readonly (simulated) call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the
    stored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral
    disbursement MBR when the wallet has a referrer.
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async newSubscriptionCostAddressUint64Uint64Uint64Uint64(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64Uint64(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `newSubscriptionCost(address,uint64,uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newSubscriptionCostAddressUint64Uint64Uint64(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.newSubscriptionCostAddressUint64Uint64Uint64(params));
    return result.return;
  }
  /**
     * Makes a readonly (simulated) call to the Subscriptions smart contract using the `triggerGateCtx((address,uint64),uint64)(address,uint64,address)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code
    (`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the
    following target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async triggerGateCtx(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.triggerGateCtx(params));
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
   * Makes a readonly (simulated) call to the Subscriptions smart contract using the `getFeaturedService(address)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * the creator's featured service id, 0 when none is set
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getFeaturedService(params) {
    const result = await this.appClient.send.call(SubscriptionsParamsFactory.getFeaturedService(params));
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
          passesRepricedAt: result.passesRepricedAt,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO
        };
      },
      /**
       * Get the current value of the passesRepricedAt key in global state
       */
      passesRepricedAt: async () => {
        return await this.appClient.state.global.getValue("passesRepricedAt");
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
      },
      /**
       * Get values from the principals map in box state
       */
      principals: {
        /**
         * Get all current values of the principals map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("principals");
        },
        /**
         * Get a current value of the principals map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("principals", key);
        }
      },
      /**
       * Get values from the featured map in box state
       */
      featured: {
        /**
         * Get all current values of the featured map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("featured");
        },
        /**
         * Get a current value of the featured map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("featured", key);
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
       * Add a newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64 method call against the Subscriptions contract
       */
      newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3],uint64)uint64", v));
        return this;
      },
      /**
       * Add a newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64 method call against the Subscriptions contract
       */
      newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newService(pay,uint64,uint64,uint64,uint64,uint64,address,string,byte[36],uint8,byte[3])uint64", v));
        return this;
      },
      /**
       * Add a setServiceDescription(uint64,uint64,byte[])void method call against the Subscriptions contract
       */
      setServiceDescription(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setServiceDescription(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateServiceTitle(uint64,string)void method call against the Subscriptions contract
       */
      updateServiceTitle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateServiceTitle(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateServiceHighlight(uint64,uint8,byte[3])void method call against the Subscriptions contract
       */
      updateServiceHighlight(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateServiceHighlight(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setFeaturedService(pay,uint64)void method call against the Subscriptions contract
       */
      setFeaturedService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setFeaturedService(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a clearFeaturedService()void method call against the Subscriptions contract
       */
      clearFeaturedService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.clearFeaturedService(params)));
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
       * Add a gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("gatedSubscribe(pay,appl,address,uint64,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribePayApplAddressUint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("gatedSubscribe(pay,appl,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a subscribe(pay,address,uint64,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribePayAddressUint64Uint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribePayAddressUint64Uint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("subscribe(pay,address,uint64,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a subscribe(pay,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribePayAddressUint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribePayAddressUint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("subscribe(pay,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("gatedSubscribeAsa(pay,axfer,appl,address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("subscribeAsa(pay,axfer,address,uint64,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a subscribeAsa(pay,axfer,address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64(params)));
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
       * Add a gatedTriggerPayment(appl,(address,uint64),uint64)void method call against the Subscriptions contract
       */
      gatedTriggerPaymentApplAddressUint64Uint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedTriggerPaymentApplAddressUint64Uint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedTriggerPayment(appl,(address,uint64))void method call against the Subscriptions contract
       */
      gatedTriggerPaymentApplAddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedTriggerPaymentApplAddressUint64Void(params)));
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
       * Add a adoptPrincipal(pay,(address,uint64))void method call against the Subscriptions contract
       */
      adoptPrincipal(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.adoptPrincipal(params)));
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
       * Add a clearOrphanPasses((address,uint64))void method call against the Subscriptions contract
       */
      clearOrphanPasses(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.clearOrphanPasses(params)));
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
       * Add a newServiceCost(uint64,uint64)uint64 method call against the Subscriptions contract
       */
      newServiceCostUint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newServiceCostUint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newServiceCost(uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newServiceCost(uint64)uint64 method call against the Subscriptions contract
       */
      newServiceCostUint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newServiceCostUint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newServiceCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a newSubscriptionCost(address,uint64,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      newSubscriptionCostAddressUint64Uint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newSubscriptionCostAddressUint64Uint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newSubscriptionCost(address,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newSubscriptionCost(address,uint64,uint64)uint64 method call against the Subscriptions contract
       */
      newSubscriptionCostAddressUint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newSubscriptionCostAddressUint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newSubscriptionCost(address,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a triggerGateCtx((address,uint64),uint64)(address,uint64,address) method call against the Subscriptions contract
       */
      triggerGateCtx(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.triggerGateCtx(params)));
        resultMappers.push((v) => client.decodeReturnValue("triggerGateCtx((address,uint64),uint64)(address,uint64,address)", v));
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
       * Add a getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3]) method call against the Subscriptions contract
       */
      getService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getService(params)));
        resultMappers.push((v) => client.decodeReturnValue("getService(address,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])", v));
        return this;
      },
      /**
       * Add a getFeaturedService(address)uint64 method call against the Subscriptions contract
       */
      getFeaturedService(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getFeaturedService(params)));
        resultMappers.push((v) => client.decodeReturnValue("getFeaturedService(address)uint64", v));
        return this;
      },
      /**
       * Add a getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[] method call against the Subscriptions contract
       */
      getServicesByAddress(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getServicesByAddress(params)));
        resultMappers.push((v) => client.decodeReturnValue("getServicesByAddress(address,uint64,uint64)(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]", v));
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
       * Add a getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[]) method call against the Subscriptions contract
       */
      getSubscriptionWithDetails(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getSubscriptionWithDetails(params)));
        resultMappers.push((v) => client.decodeReturnValue("getSubscriptionWithDetails((address,uint64))(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", v));
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
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Subscriptions contract
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

// src/subscriptions/constants.ts
var ServiceStatus = /* @__PURE__ */ ((ServiceStatus2) => {
  ServiceStatus2[ServiceStatus2["None"] = 0] = "None";
  ServiceStatus2[ServiceStatus2["Draft"] = 10] = "Draft";
  ServiceStatus2[ServiceStatus2["Active"] = 20] = "Active";
  ServiceStatus2[ServiceStatus2["Paused"] = 30] = "Paused";
  ServiceStatus2[ServiceStatus2["Shutdown"] = 40] = "Shutdown";
  return ServiceStatus2;
})(ServiceStatus || {});
var HighlightMessage = /* @__PURE__ */ ((HighlightMessage3) => {
  HighlightMessage3[HighlightMessage3["None"] = 0] = "None";
  HighlightMessage3[HighlightMessage3["BestValue"] = 1] = "BestValue";
  HighlightMessage3[HighlightMessage3["Popular"] = 2] = "Popular";
  HighlightMessage3[HighlightMessage3["New"] = 3] = "New";
  HighlightMessage3[HighlightMessage3["LimitedOffer"] = 4] = "LimitedOffer";
  HighlightMessage3[HighlightMessage3["Recommended"] = 5] = "Recommended";
  HighlightMessage3[HighlightMessage3["Trending"] = 6] = "Trending";
  HighlightMessage3[HighlightMessage3["StaffPick"] = 7] = "StaffPick";
  HighlightMessage3[HighlightMessage3["TopRated"] = 8] = "TopRated";
  HighlightMessage3[HighlightMessage3["EditorChoice"] = 9] = "EditorChoice";
  HighlightMessage3[HighlightMessage3["HotDeal"] = 10] = "HotDeal";
  HighlightMessage3[HighlightMessage3["Seasonal"] = 11] = "Seasonal";
  HighlightMessage3[HighlightMessage3["FlashSale"] = 12] = "FlashSale";
  HighlightMessage3[HighlightMessage3["Exclusive"] = 13] = "Exclusive";
  HighlightMessage3[HighlightMessage3["LimitedEdition"] = 14] = "LimitedEdition";
  HighlightMessage3[HighlightMessage3["EarlyAccess"] = 15] = "EarlyAccess";
  return HighlightMessage3;
})(HighlightMessage || {});
var MAX_DESCRIPTION_LENGTH = 3151;
var MAX_DESCRIPTION_CHUNK_SIZE = 2034;
var MAX_LOAD_DESCRIPTION_CHUNK_SIZE = 2026;
var SUBSCRIPTION_PRINCIPAL_MBR = 34900n;
var FEATURED_SERVICE_MBR = 18900n;

// src/subscriptions/errors.ts
var SUBSCRIPTIONS_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
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
  // --- Principal resolution (stored pair, adoptPrincipal) ------------------
  PEXS: "Subscription already has a stored principal",
  NLWL: "Subscriber has no registered Akita wallet to adopt",
  NGTD: "Subscription is not gated",
  // --- Featured service ---------------------------------------------------
  NFSV: "No featured service is set",
  FSHD: "A shut down service cannot be featured",
  // --- Blocking -----------------------------------------------------------
  UABL: "User is already blocked",
  UNBL: "User is not blocked",
  // --- Group / call-order -------------------------------------------------
  GIOB: "Group index out of bounds",
  ISEQ: "Invalid sequence of calls in group",
  // --- Subscriptions plugin -----------------------------------------------
  DNIT: "Description has not been initialized"
});
var translateSubscriptionsError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, SUBSCRIPTIONS_ERROR_MESSAGES);

// src/subscriptions/index.ts
var toBigInt = (value) => typeof value === "bigint" ? value : BigInt(Math.floor(value));
var toSeconds = (value, unit) => {
  const normalized = toBigInt(value);
  return unit === "milliseconds" ? normalized / 1000n : normalized;
};
var directGateCtx = (sender) => ({ principal: sender, wallet: 0n, spender: sender });
var resolveGateTxn = async (gateTxn, ctx) => typeof gateTxn === "function" ? await gateTxn(ctx) : gateTxn;
var assertDirectHint = (wallet, legacy) => {
  if (!legacy && wallet !== 0n) {
    throw new Error("Subscriptions: a top-level call cannot carry a wallet hint (errHtop); wallets act through the subscriptions plugin");
  }
};
var SubscriptionsSDK = (_class3 = class extends _chunkBB4CUEDUjs.BaseSDK {
  __init8() {this.serviceMapKeyGenerator = ({ address, id }) => `${address}${id}`}
  __init9() {this.services = new (0, _chunkMZHAP7IAjs.ValueMap)(this.serviceMapKeyGenerator)}
  constructor(params) {
    super({ factory: SubscriptionsFactory, ...params }, _chunkBZZOJWPRjs.ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID);_class3.prototype.__init8.call(this);_class3.prototype.__init9.call(this);;
  }
  /**
   * Get the cost to create a new service from the contract (the hinted `newServiceCost(asset, wallet)`;
   * `legacy` quotes the pre-hint selector, which uses the registry referrer).
   */
  async newServiceCost({ sender, signer, asset = 0n, wallet = 0n, legacy = false } = {}) {
    const sendParams = this.getSendParams({ sender, signer });
    if (legacy) {
      return await this.client.newServiceCostUint64Uint64({ ...sendParams, args: { asset } });
    }
    return await this.client.newServiceCostUint64Uint64Uint64({ ...sendParams, args: { asset, wallet } });
  }
  async blockCost({ sender, signer } = {}) {
    const sendParams = this.getSendParams({ sender, signer });
    return await this.client.blockCost({ ...sendParams, args: [] });
  }
  /**
   * Get the cost to create a new subscription from the contract (box MBR + referral MBR, plus
   * `SUBSCRIPTION_PRINCIPAL_MBR` when `wallet != 0` and the service is gated). `legacy` quotes the
   * pre-hint selector (registry referrer, no stored principal).
   */
  async newSubscriptionCost({ sender, signer, recipient, asset = 0n, serviceId = 0n, wallet = 0n, legacy = false }) {
    const sendParams = this.getSendParams({ sender, signer });
    if (legacy) {
      return await this.client.newSubscriptionCostAddressUint64Uint64Uint64({ ...sendParams, args: { recipient, asset, serviceId } });
    }
    return await this.client.newSubscriptionCostAddressUint64Uint64Uint64Uint64({ ...sendParams, args: { recipient, asset, serviceId, wallet } });
  }
  /**
   * The `GateCtx` a hinted `gatedTriggerPayment(gateTxn, key, wallet)` sent by `sender` will assert
   * (readonly; the contract runs the same code). `wallet` is the CALLER's own hint, never the subscriber's.
   */
  async triggerGateCtx({ sender, address, id, wallet = 0n }) {
    const sendParams = this.getReaderSendParams({ sender });
    const ctx = await this.client.triggerGateCtx({ ...sendParams, args: { key: { address, id: BigInt(id) }, wallet } });
    return { principal: ctx.principal, wallet: ctx.wallet, spender: ctx.spender };
  }
  /**
   * The stored principal pair `(wallet, principal)` of a gated subscription, or undefined if it has none
   * (a legacy subscription, a plain subscriber, or an ungated service).
   */
  async getStoredPrincipal({ address, id }) {
    try {
      const value = await this.client.state.box.principals.value({ address, id: BigInt(id) });
      return value === void 0 ? void 0 : { wallet: value.wallet, principal: value.principal };
    } catch (e) {
      return void 0;
    }
  }
  /**
   * Backfill (Q13) the stored principal of a legacy gated subscription from the escrow-factory registry.
   * Permissionless; the caller pays `SUBSCRIPTION_PRINCIPAL_MBR` (refunded to the subscriber on unsubscribe).
   */
  async adoptPrincipal({ sender, signer, address, id }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, SUBSCRIPTION_PRINCIPAL_MBR),
      receiver: this.client.appAddress.toString()
    });
    await this.client.send.adoptPrincipal({
      ...sendParams,
      args: { payment, key: { address, id: BigInt(id) } },
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
      maxFee: _algokitutils.microAlgo.call(void 0, 1e4)
    });
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
   * @param asset The asset ID to opt into
   */
  async optIn({
    sender,
    signer,
    asset
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const optInCost = await this.optInCost({ ...sendParams, asset });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, optInCost),
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
      extraFee: _algokitutils.microAlgos.call(void 0, 15000n)
    });
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
        highlightColor: _chunk6PXDU6U7js.bytesToHexColor.call(void 0, value.highlightColor)
      }
    ]);
    this.services = new (0, _chunkMZHAP7IAjs.ValueMap)(
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
      highlightColor: _chunk6PXDU6U7js.bytesToHexColor.call(void 0, result.highlightColor)
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
        highlightColor: _chunk6PXDU6U7js.bytesToHexColor.call(void 0, result2.highlightColor)
      };
    });
  }
  async getSubscription({ sender, address, id }) {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.mustGetSubscription({ ...sendParams, args: { key: { address, id } } });
    return {
      ...result,
      lastPayment: _chunkAP6ZTMSTjs.convertToUnixTimestamp.call(void 0, result.lastPayment)
    };
  }
  async getSubscriptionWithDetails({ sender, address, id }) {
    const sendParams = this.getReaderSendParams({ sender });
    const result = await this.client.getSubscriptionWithDetails({ ...sendParams, args: { key: { address, id } } });
    return {
      ...result,
      highlightColor: _chunk6PXDU6U7js.bytesToHexColor.call(void 0, result.highlightColor),
      lastPayment: _chunkAP6ZTMSTjs.convertToUnixTimestamp.call(void 0, result.lastPayment)
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
  async newService({ sender, signer, asset = 0n, passes = 0n, gateId = 0n, wallet = 0n, legacy = false, ...rest }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);
    _chunk6PXDU6U7js.validateHexColor.call(void 0, rest.highlightColor);
    const highlightColor = _chunk6PXDU6U7js.hexColorToBytes.call(void 0, rest.highlightColor);
    const isAsaService = asset !== 0n;
    const needsOptIn = isAsaService && !await this.isOptedInToAsset(asset);
    const paymentAmount = await this.newServiceCost({ ...sendParams, asset, wallet, legacy });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, paymentAmount),
      receiver: this.client.appAddress.toString()
    });
    if (rest.description.length === 0) {
      throw new Error("Description cannot be empty");
    }
    const group = this.client.newGroup();
    const currentServiceList = await this.getServiceList({
      sender: sendParams.sender.toString(),
      address: sendParams.sender.toString()
    });
    const serviceId = currentServiceList === 0n ? 1n : currentServiceList;
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
    const { description: _description, ...serviceArgs } = rest;
    if (legacy) {
      group.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64({
        ...sendParams,
        args: { payment, asset, passes, gateId, ...serviceArgs, highlightColor }
      });
    } else {
      group.newServicePayUint64Uint64Uint64Uint64Uint64AddressStringByte_36Uint8Byte_3Uint64Uint64({
        ...sendParams,
        args: { payment, asset, passes, gateId, ...serviceArgs, highlightColor, wallet }
      });
    }
    if (rest.description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(`Description length exceeds maximum of ${MAX_DESCRIPTION_LENGTH} characters`);
    }
    if (rest.description.length > MAX_DESCRIPTION_CHUNK_SIZE) {
      group.setServiceDescription({
        ...sendParams,
        args: {
          id: serviceId,
          offset: 0n,
          data: Buffer.from(rest.description).subarray(0, MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
      group.setServiceDescription({
        ...sendParams,
        args: {
          id: serviceId,
          offset: BigInt(MAX_DESCRIPTION_CHUNK_SIZE),
          data: Buffer.from(rest.description).subarray(MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
    } else {
      group.setServiceDescription({
        ...sendParams,
        args: {
          id: serviceId,
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
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async updateServiceTitle({ sender, signer, id, title }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.client.send.updateServiceTitle({
      ...sendParams,
      args: { id, title }
    });
  }
  /** Change the highlight label and colour (`#rrggbb`) of one of the sender's services. */
  async updateServiceHighlight({ sender, signer, id, highlightMessage, highlightColor }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    _chunk6PXDU6U7js.validateHexColor.call(void 0, highlightColor);
    await this.client.send.updateServiceHighlight({
      ...sendParams,
      args: { id, highlightMessage: Number(highlightMessage), highlightColor: _chunk6PXDU6U7js.hexColorToBytes.call(void 0, highlightColor) }
    });
  }
  /** The creator's featured (front and center) service id, or 0n when none is set. */
  async getFeaturedService({ sender, address }) {
    const sendParams = this.getReaderSendParams({ sender });
    return await this.client.getFeaturedService({ ...sendParams, args: { address } });
  }
  /**
   * What `setFeaturedService` costs: 0 once the creator has a featured box, otherwise its MBR
   * (plus the payer record when `payer` is not the creator).
   */
  async featuredServiceCost({ sender, creator, payer }) {
    const current = await this.getFeaturedService({ sender, address: creator });
    if (current !== 0n) {
      return 0n;
    }
    return FEATURED_SERVICE_MBR + (payer !== void 0 && payer !== creator ? _chunkBZZOJWPRjs.PAYER_RECORD_MBR : 0n);
  }
  /** Pick which of the sender's services apps show front and center. */
  async setFeaturedService({ sender, signer, id }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const amount = await this.featuredServiceCost({ sender: sendParams.sender.toString(), creator: sendParams.sender.toString() });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, amount),
      receiver: this.client.appAddress.toString()
    });
    await this.client.send.setFeaturedService({
      ...sendParams,
      args: { payment, id }
    });
  }
  /** Remove the sender's featured service; the storage goes back to whoever paid it. */
  async clearFeaturedService({ sender, signer } = {}) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    await this.client.send.clearFeaturedService({
      ...sendParams,
      args: [],
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true
    });
  }
  async updateServiceDescription({ sender, signer, id, description }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(`Description length exceeds maximum of ${MAX_DESCRIPTION_LENGTH} characters`);
    }
    const group = this.client.newGroup();
    const descriptionBytes = Buffer.from(description);
    for (let offset = 0; offset < descriptionBytes.length || offset === 0; offset += MAX_DESCRIPTION_CHUNK_SIZE) {
      group.setServiceDescription({
        ...sendParams,
        args: {
          id,
          offset: BigInt(offset),
          data: descriptionBytes.subarray(offset, offset + MAX_DESCRIPTION_CHUNK_SIZE)
        }
      });
    }
    await group.send({ ...sendParams });
  }
  async updateServiceMetadata({
    sender,
    signer,
    id,
    title,
    description
  }) {
    if (title !== void 0) {
      await this.updateServiceTitle({ sender, signer, id, title });
    }
    if (description !== void 0) {
      await this.updateServiceDescription({ sender, signer, id, description });
    }
  }
  async shutdownService({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.shutdownService({
      ...sendParams,
      args: { id }
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
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  async unblock({ sender, signer, blocked }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    group.unblock({
      ...sendParams,
      args: { blocked }
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
    gateTxn,
    wallet = 0n,
    legacy = false
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);
    const isAlgoSubscription = asset === 0n;
    const isGated = gateTxn !== void 0;
    const needsOptIn = !await this.isOptedInToAsset(asset);
    const subscribeCost = await this.newSubscriptionCost({
      ...sendParams,
      recipient,
      asset,
      serviceId,
      wallet,
      legacy
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
    const gate = isGated ? await resolveGateTxn(gateTxn, directGateCtx(sendParams.sender.toString())) : void 0;
    if (isAlgoSubscription) {
      const common = { payment, amount, interval: BigInt(interval), recipient, serviceId };
      if (isGated && legacy) {
        group.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate } });
      } else if (isGated) {
        group.gatedSubscribePayApplAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate, wallet } });
      } else if (legacy) {
        group.subscribePayAddressUint64Uint64Uint64Uint64({ ...sendParams, args: common });
      } else {
        group.subscribePayAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, wallet } });
      }
    } else {
      const assetTransfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount) + BigInt(initialDepositAmount),
        assetId: asset,
        receiver: this.client.appAddress.toString()
      });
      const common = { payment, assetXfer: assetTransfer, amount, interval: BigInt(interval), recipient, serviceId };
      if (isGated && legacy) {
        group.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate } });
      } else if (isGated) {
        group.gatedSubscribeAsaPayAxferApplAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, gateTxn: gate, wallet } });
      } else if (legacy) {
        group.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64({ ...sendParams, args: common });
      } else {
        group.subscribeAsaPayAxferAddressUint64Uint64Uint64Uint64Uint64({ ...sendParams, args: { ...common, wallet } });
      }
    }
    const result = await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
    const returnIndex = (needsOptIn ? 1 : 0) + (isGated ? 1 : 0);
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
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Trigger the payment for subscription `{ address, id }`.
   *
   * For a gated service pass `gateTxn`. Eligibility is always re-checked for the SUBSCRIBER, never the
   * keeper. Hinted (default): `Gate.mustCheckFor(ctx, gateId, args)` with `ctx = triggerGateCtx(...)`;
   * pass a builder `(ctx) => gate.build.mustCheckFor({ ctx, gateId, args })` and the SDK fetches `ctx`.
   * `wallet` is the keeper's OWN hint (0n for a keeper acting as itself). `legacy`: the pre-hint selector,
   * whose `Gate.mustCheck` caller is the subscriber's registry origin.
   */
  async triggerPayment({ sender, signer, address, id, gateTxn, wallet = 0n, legacy = false }) {
    var _a;
    const sendParams = this.getSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);
    const group = this.client.newGroup();
    const key = { address, id };
    if (gateTxn !== void 0 && legacy) {
      if (typeof gateTxn === "function") {
        throw new Error("Subscriptions: a legacy gated trigger needs a prebuilt Gate.mustCheck txn");
      }
      group.gatedTriggerPaymentApplAddressUint64Void({
        ...sendParams,
        args: { gateTxn, key }
      });
    } else if (gateTxn !== void 0) {
      const gate = typeof gateTxn === "function" ? await gateTxn(await this.triggerGateCtx({ sender: (_a = sendParams.sender) == null ? void 0 : _a.toString(), address, id, wallet })) : gateTxn;
      group.gatedTriggerPaymentApplAddressUint64Uint64Void({
        ...sendParams,
        args: { gateTxn: gate, key, wallet }
      });
    } else {
      group.triggerPayment({
        ...sendParams,
        args: { key: { address, id } }
      });
    }
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
    await group.send({ populateAppCallResources: true, coverAppCallInnerTransactionFees: true });
  }
  /**
   * Delete a pass box orphaned by a subscription cancelled before the pass-key fix. Anyone may
   * call it; the freed MBR stays in the contract.
   */
  async clearOrphanPasses({ sender, signer, address, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.clearOrphanPasses({
      ...sendParams,
      args: { key: { address, id: BigInt(id) } },
      populateAppCallResources: true
    });
  }
}, _class3);













exports.ServiceStatus = ServiceStatus; exports.HighlightMessage = HighlightMessage; exports.MAX_DESCRIPTION_LENGTH = MAX_DESCRIPTION_LENGTH; exports.MAX_DESCRIPTION_CHUNK_SIZE = MAX_DESCRIPTION_CHUNK_SIZE; exports.MAX_LOAD_DESCRIPTION_CHUNK_SIZE = MAX_LOAD_DESCRIPTION_CHUNK_SIZE; exports.SUBSCRIPTION_PRINCIPAL_MBR = SUBSCRIPTION_PRINCIPAL_MBR; exports.FEATURED_SERVICE_MBR = FEATURED_SERVICE_MBR; exports.SUBSCRIPTIONS_ERROR_MESSAGES = SUBSCRIPTIONS_ERROR_MESSAGES; exports.translateSubscriptionsError = translateSubscriptionsError; exports.directGateCtx = directGateCtx; exports.SubscriptionsSDK = SubscriptionsSDK;
//# sourceMappingURL=chunk-FXNHDHRS.js.map
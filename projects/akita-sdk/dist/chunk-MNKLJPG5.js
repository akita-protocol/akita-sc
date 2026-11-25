"use strict";Object.defineProperty(exports, "__esModule", {value: true}); var _class; var _class2; var _class3;



var _chunk6PXDU6U7js = require('./chunk-6PXDU6U7.js');


var _chunkAP6ZTMSTjs = require('./chunk-AP6ZTMST.js');



var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkVAC3L4E5js = require('./chunk-VAC3L4E5.js');


var _chunkIYEXWXKNjs = require('./chunk-IYEXWXKN.js');



var _chunkAJTZ5O5Ajs = require('./chunk-AJTZ5O5A.js');

// src/subscriptions/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');


// src/generated/SubscriptionsClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Subscriptions", "structs": { "BlockListKey": [{ "name": "address", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "Service": [{ "name": "status", "type": "uint8" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "passes", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }], "ServicesKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionInfo": [{ "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionInfoWithDetails": [{ "name": "recipient", "type": "address" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "serviceId", "type": "uint64" }, { "name": "status", "type": "uint8" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "passes", "type": "address[]" }], "SubscriptionInfoWithExistence": [{ "name": "exists", "type": "bool" }, { "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionPrincipal": [{ "name": "wallet", "type": "uint64" }, { "name": "principal", "type": "address" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "GateCtx": [{ "name": "principal", "type": "address" }, { "name": "wallet", "type": "uint64" }, { "name": "spender", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment", "desc": "The payment for the service creation" }, { "type": "uint64", "name": "interval", "desc": "The interval in seconds" }, { "type": "uint64", "name": "asset", "desc": "The asa to be used for the subscription" }, { "type": "uint64", "name": "amount", "desc": "The amount of the asa to be used for the subscription" }, { "type": "uint64", "name": "passes", "desc": "The number of accounts the subscription can be shared with" }, { "type": "uint64", "name": "gateID", "desc": "The gate to be used for the subscription" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account.\nThe referral cut goes to the verified wallet's referrer (no registry lookup)." }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "newService creates a new service for a merchant", "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "passes" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "setServiceDescription", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateServiceTitle", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateServiceHighlight", "args": [{ "type": "uint64", "name": "id", "desc": "the service id" }, { "type": "uint8", "name": "highlightMessage", "desc": "the highlight label (`HighlightMessage*`, 0 = none)" }, { "type": "byte[3]", "name": "highlightColor", "desc": "the highlight colour (3 bytes)" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "updateServiceHighlight changes the highlight label and colour of one of the sender's services", "events": [], "recommendations": {} }, { "name": "setFeaturedService", "args": [{ "type": "pay", "name": "payment", "desc": "the storage payment to this app" }, { "type": "uint64", "name": "id", "desc": "an existing, not shut down service of the sender" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "setFeaturedService picks the sender's service that apps show front and center.\nThe first call creates the featured box: `payment` covers `FeaturedServiceMBR` (plus the payer\nrecord when someone else pays). Later calls only change the id and take a 0 ALGO payment.", "events": [], "recommendations": {} }, { "name": "clearFeaturedService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "clearFeaturedService removes the sender's featured service and returns the storage to whoever paid it", "events": [], "recommendations": {} }, { "name": "activateService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "activateService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "pauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "pauseService pauses a service for a merchant\nit does not shutdown pre-existing subscriptions\nit simply prevents new subscriptions from being created\nfor a specific service", "events": [], "recommendations": {} }, { "name": "unpauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unpauseService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "shutdownService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "shutdownService permanently shuts down an service for a merchant\nit also shutsdown pre-existing subscriptions", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "payment", "desc": "The payment to cover mbr for blocking" }, { "type": "address", "name": "blocked", "desc": "The address to be blocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "block blacklists an address for a merchant", "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "blocked", "desc": "The address to be unblocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unblock removes an address from a merchants blocks", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through\n`Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified\nwallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the referral cut goes to the verified wallet's referrer" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Subscribe to an ungated ALGO service (or donate with `serviceID` 0).", "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).", "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`subscribe` for an ASA service (`payment` covers the MBR exactly).", "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "deposit", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "depositAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unsubscribe", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the\ncaller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only\nselects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must\nbe `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.", "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the\nsubscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "triggerPayment", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).", "events": [], "recommendations": {} }, { "name": "adoptPrincipal", "args": [{ "type": "pay", "name": "payment" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the\nregistry answer `(legacyWalletOf(key.address), legacyOriginAtRestOr(...))` into `principals` once, so the\nPhase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly\n`SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).", "events": [], "recommendations": {} }, { "name": "streakCheck", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Resets the streak of a subscription that missed a payment window. Never increments it\n(audit SG-02): only payments grow a streak.", "events": [], "recommendations": {} }, { "name": "setPasses", "args": [{ "type": "uint64", "name": "id" }, { "type": "address[]", "name": "addresses" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearOrphanPasses", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes a pass box left behind by a subscription that was cancelled before the SG-08\nfix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:\nwhether the owner was already refunded cannot be determined on-chain.", "events": [], "recommendations": {} }, { "name": "triggerList", "args": [{ "type": "(address,uint64[])[]", "name": "req" }], "returns": { "type": "bool[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "address", "desc": "The address to be checked" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "isBlocked checks if an address is blocked for a merchant", "events": [], "recommendations": {} }, { "name": "isShutdown", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "serviceIsActive checks if an service is shutdown", "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the\nstored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral\ndisbursement MBR when the wallet has a referrer.", "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "triggerGateCtx", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(address,uint64,address)", "struct": "GateCtx" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code\n(`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the\nfollowing target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.", "events": [], "recommendations": {} }, { "name": "blockCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getService", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])", "struct": "Service" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getFeaturedService", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "the creator's featured service id, 0 when none is set", "events": [], "recommendations": {} }, { "name": "getServicesByAddress", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "start" }, { "type": "uint64", "name": "windowSize" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfoWithExistence" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionWithDetails", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", "struct": "SubscriptionInfoWithDetails" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFirstSubscription", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServiceList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "passesRepricedAt": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGFzc2VzX3JlcHJpY2VkX2F0", "desc": "Subscriptions that started before this timestamp paid the legacy pass MBR\n(`LegacyPassesMBR`) and get it back on unsubscribe (audit SG-08 / decision SG-K).\nSet once, lazily, by the first subscribe / unsubscribe after the upgrade." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "subscriptions": { "keyType": "SubscriptionKey", "valueType": "SubscriptionInfo", "prefix": "cw==" }, "subscriptionslist": { "keyType": "address", "valueType": "uint64", "desc": "A counter for each addresses subscription id", "prefix": "bA==" }, "services": { "keyType": "ServicesKey", "valueType": "Service", "desc": "services is a map of services a specific merchant has\ndenoted by the merchant address + index of the offer as a key\n32 + 8 = 40 bytes\n120 bytes total -> (2500 + (400 * 121)) = 0.050500", "prefix": "bw==" }, "serviceslist": { "keyType": "address", "valueType": "uint64", "prefix": "bQ==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "blocks allow merchants to specify which addresses cannot subscribe\nkey will be merchant address + blocked address\n32 + 32 = 64 bytes\n65 bytes total -> (2500 + (400 * 64)) = 0.028500", "prefix": "Yg==" }, "passes": { "keyType": "SubscriptionKey", "valueType": "address[]", "prefix": "cA==" }, "principals": { "keyType": "SubscriptionKey", "valueType": "SubscriptionPrincipal", "desc": "Stored principal pair `(W, principal)` of a gated subscription made through a verified wallet\n(principal resolution \xA76.4, Q11). Written by the hinted gated subscribe methods (or backfilled by\n`adoptPrincipal`), re-checked at trigger time without reading any wallet global, deleted and\nrefunded by `unsubscribe`. 'i' + 32 + 8 = 41 byte key, 40 byte value \u2192 `SubscriptionPrincipalMBR`.", "prefix": "aQ==" }, "featured": { "keyType": "address", "valueType": "uint64", "desc": "The service a creator wants shown front and center, keyed by creator. Absent (or 0) means none.\nKept apart from `services` / `serviceslist` so deployed boxes keep their layout.\n'f' + 32 = 33 byte key, 8 byte value \u2192 `FeaturedServiceMBR`, refunded to its payer on clear.", "prefix": "Zg==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3005, 3102, 3434, 4610, 4679, 4737, 4788, 4849, 4902, 4977, 5444, 5577, 5674, 6571, 6599, 6679, 6949, 7059, 7101, 7168, 7526, 7561, 8509, 9100, 9610, 9671, 9916, 10050, 10100, 10135, 10288], "errorMessage": "Box must have value" }, { "pc": [1463, 2308, 2442, 7811], "errorMessage": "Bytes has valid prefix" }, { "pc": [4620, 4752, 9011], "errorMessage": "ERR:errAsam" }, { "pc": [2913], "errorMessage": "ERR:errBdln" }, { "pc": [5818, 8454], "errorMessage": "ERR:errBlkd" }, { "pc": [2958], "errorMessage": "ERR:errBofs" }, { "pc": [9908], "errorMessage": "ERR:errCtrg" }, { "pc": [5309, 5384, 9375, 9498], "errorMessage": "ERR:errFgte" }, { "pc": [3286], "errorMessage": "ERR:errFshd" }, { "pc": [9589], "errorMessage": "ERR:errHgte" }, { "pc": [1789], "errorMessage": "ERR:errHnbd" }, { "pc": [1693], "errorMessage": "ERR:errHnwl" }, { "pc": [1712], "errorMessage": "ERR:errHtop" }, { "pc": [4785], "errorMessage": "ERR:errIare" }, { "pc": [4676, 8873, 8896], "errorMessage": "ERR:errIpay" }, { "pc": [1140, 7661], "errorMessage": "ERR:errIpma" }, { "pc": [1126, 7642], "errorMessage": "ERR:errIpmr" }, { "pc": [1251, 4634], "errorMessage": "ERR:errIpms" }, { "pc": [9951, 10622, 10633, 10647], "errorMessage": "ERR:errIseq" }, { "pc": [8192], "errorMessage": "ERR:errIupg" }, { "pc": [1395, 1811], "errorMessage": "ERR:errIwlt" }, { "pc": [8733, 8748], "errorMessage": "ERR:errIxfr" }, { "pc": [9282, 10316], "errorMessage": "ERR:errMamt" }, { "pc": [9294, 10328], "errorMessage": "ERR:errMinv" }, { "pc": [10351], "errorMessage": "ERR:errMxps" }, { "pc": [1089, 1290, 4648], "errorMessage": "ERR:errNcls" }, { "pc": [1276], "errorMessage": "ERR:errNclw" }, { "pc": [8117, 8160, 8228], "errorMessage": "ERR:errNdao" }, { "pc": [4873], "errorMessage": "ERR:errNefn" }, { "pc": [7847], "errorMessage": "ERR:errNesc" }, { "pc": [3386], "errorMessage": "ERR:errNfsv" }, { "pc": [5465], "errorMessage": "ERR:errNgtd" }, { "pc": [5527], "errorMessage": "ERR:errNlwl" }, { "pc": [5704], "errorMessage": "ERR:errNodn" }, { "pc": [8674, 10415, 10438], "errorMessage": "ERR:errNopt" }, { "pc": [1103, 1304, 4662], "errorMessage": "ERR:errNrky" }, { "pc": [9308, 9628], "errorMessage": "ERR:errNsvc" }, { "pc": [5777], "errorMessage": "ERR:errPcof" }, { "pc": [5494], "errorMessage": "ERR:errPexs" }, { "pc": [2885, 3086, 3208, 3262, 3456, 3516, 3565, 3625, 5723, 6569, 7381, 8981, 9557, 9645, 10772], "errorMessage": "ERR:errSdne" }, { "pc": [3530, 8995], "errorMessage": "ERR:errSnac" }, { "pc": [10681], "errorMessage": "ERR:errSnav" }, { "pc": [3482], "errorMessage": "ERR:errSndr" }, { "pc": [3591], "errorMessage": "ERR:errSnpa" }, { "pc": [3639, 5745], "errorMessage": "ERR:errSshd" }, { "pc": [3099, 10368], "errorMessage": "ERR:errTtlg" }, { "pc": [3696], "errorMessage": "ERR:errUabl" }, { "pc": [4607, 4734, 4842, 4968, 5442, 5574, 5672, 5869, 5881, 7057, 7093, 9608], "errorMessage": "ERR:errUdne" }, { "pc": [3782], "errorMessage": "ERR:errUnbl" }, { "pc": [7873], "errorMessage": "ERR:errWesc" }, { "pc": [8261, 8272], "errorMessage": "Length must be 16" }, { "pc": [1335, 9431], "errorMessage": "account funded" }, { "pc": [1327, 1340, 2107, 2241, 2338, 2354, 2360, 2463, 7619, 7935, 7953, 8048, 8109, 8152, 8220, 8595, 8659, 8685, 8907, 9416, 9436, 9982, 10162, 10425, 10452, 10494], "errorMessage": "application exists" }, { "pc": [2693, 5044, 5276, 5291, 5349, 5367, 5498, 6315, 6420, 6482, 6520, 7608, 7614, 7704, 7736, 7930, 8038, 8043, 8102, 8145, 8164, 8213, 8316, 8585, 8590, 8654, 8680, 8902, 9257, 9325, 9350, 9453, 9475, 9714, 9754, 9860, 9977, 10157, 10372, 10420, 10442, 10447, 10489, 10704, 10731], "errorMessage": "check GlobalState exists" }, { "pc": [2165, 8339, 8378], "errorMessage": "errIpct" }, { "pc": [5798, 6044], "errorMessage": "index access is out of bounds" }, { "pc": [3214, 3219, 3265, 3460, 3486, 3520, 3535, 3569, 3595, 3629, 3643, 4692, 4801, 4913, 5009, 5616, 5727, 5732, 6272, 7385, 7393, 7446, 7453, 7460, 8985, 9e3, 9017, 9024, 9032, 9040, 9057, 9198, 9561, 9649, 10096, 10114, 10121, 10145, 10241, 10777, 10783], "errorMessage": "index out of bounds" }, { "pc": [5924], "errorMessage": "invalid array encoding" }, { "pc": [1466, 2220, 2513, 2554, 2644, 2780, 2855, 3053, 5637, 5894, 5952, 6001, 7814, 8091, 8129], "errorMessage": "invalid array length header" }, { "pc": [5649], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [2520, 2651, 2787, 2862, 3063, 8136], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [7823], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [5971], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/subscriptions/types.ts::TriggerListRequest>" }, { "pc": [2638, 2774, 3664, 3750, 3845, 3943, 4020, 4101, 4195, 4310, 4403, 4501, 6207, 6216, 6247, 6358, 6452, 6544, 6586, 6623, 7484, 7513, 7548], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [2663, 2799], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [2680, 2816, 3189], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 3>" }, { "pc": [2531, 2592, 2601, 2610, 2619, 2628, 2688, 2728, 2737, 2746, 2755, 2764, 2838, 2847, 3043, 3167, 3239, 3496, 3545, 3605, 3853, 3862, 3871, 3880, 3951, 3960, 3969, 4028, 4037, 4046, 4055, 4109, 4118, 4127, 4203, 4212, 4221, 4230, 4318, 4327, 4336, 4411, 4420, 4429, 4438, 4509, 4518, 4527, 4577, 4713, 4811, 4820, 4946, 5267, 5627, 6255, 6302, 6310, 6336, 6366, 6376, 6385, 6460, 6469, 6515, 6552, 6631, 6641, 7593, 8031, 8206], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [2671, 2807, 3178], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [1472], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5259, 5336, 5400, 5427, 5559, 5855, 6507, 6822, 7042, 7078], "errorMessage": "invalid number of bytes for smart_contracts/subscriptions/types.ts::SubscriptionKey" }, { "pc": [2559, 8096], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [2313, 2447], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [2546, 8083], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [5948], "errorMessage": "invalid tail pointer at index 1 of (uint8[32],(len+uint64[]))" }, { "pc": [5932], "errorMessage": "invalid tail pointer for (len+(uint8[32],(len+uint64[]))[])" }, { "pc": [2541, 5943, 8078], "errorMessage": "invalid tuple encoding" }, { "pc": [3836, 3934, 4186, 4301, 5250, 5327, 9343, 9471], "errorMessage": "transaction type is appl" }, { "pc": [4175, 4290, 4394, 4492, 4705, 8468, 8649], "errorMessage": "transaction type is axfer" }, { "pc": [2584, 2720, 3231, 3655, 3825, 3923, 4011, 4092, 4164, 4279, 4383, 4481, 4569, 5417, 7585], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgMTg5MDAgMjg1MDAgNjA1MDAgMzQ5MDAgNzk4MDAgMTQ0MjAwIDEzNzg5MDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAibyIgIiIgIkVSUjplcnJTZG5lIiAicyIgImFraXRhX2VzY3JvdyIgIkVSUjplcnJVZG5lIiAiYWFsIiAweDAwICJmIiAweDI4ICJiIiAweDAwMDAgIm0iICJsIiAid2FsbGV0IiAweDE0ICJwIiAicGFzc2VzX3JlcHJpY2VkX2F0IiAiaSIgIkVSUjplcnJGZ3RlIiAiRVJSOmVycklzZXEiICJFUlI6ZXJyTmNscyIgIkVSUjplcnJOcmt5IiAicmVmZXJyZXIiICJFUlI6ZXJyQXNhbSIgIkVSUjplcnJJcGF5IiAiRVJSOmVyck5kYW8iICJzdWJzY3JpcHRpb25fZmVlcyIgIkVSUjplcnJOb3B0IiAweGM4ODM1MTMwIDB4Mzk0ZWFlYjIgImFwcElEIiAiRVJSOmVycklwbXIiICJFUlI6ZXJySXBtYSIgIkVSUjplcnJJcG1zIiAiY29udHJvbGxlZF9hZGRyZXNzIiAiRVJSOmVyckl3bHQiIDB4MDAwMSAidmVyc2lvbiIgIkVSUjplcnJUdGxnIiAiRVJSOmVyclNuYWMiICJFUlI6ZXJyU3NoZCIgIkVSUjplcnJCbGtkIiAicGFsIiAiRVJSOmVyckl4ZnIiICJFUlI6ZXJyTWFtdCIgIkVSUjplcnJNaW52IiAiRVJSOmVyck5zdmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDQKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzEtMTM3CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zIGV4dGVuZHMgY2xhc3NlcyhCYXNlU3Vic2NyaXB0aW9ucywgQWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbikgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEA2MwogICAgcHVzaGJ5dGVzcyAweDQ2OGViZTYzIDB4OWIwZjg5ZDYgMHgzNjZkNWIyNyAweDliYTAyMGI2IDB4YWM1OTJhZGQgMHg1MDUxNzdmOCAweDgzZjU2YzQ2IC8vIG1ldGhvZCAibmV3U2VydmljZShwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm5ld1NlcnZpY2UocGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSl1aW50NjQiLCBtZXRob2QgInNldFNlcnZpY2VEZXNjcmlwdGlvbih1aW50NjQsdWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVTZXJ2aWNlVGl0bGUodWludDY0LHN0cmluZyl2b2lkIiwgbWV0aG9kICJ1cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0KHVpbnQ2NCx1aW50OCxieXRlWzNdKXZvaWQiLCBtZXRob2QgInNldEZlYXR1cmVkU2VydmljZShwYXksdWludDY0KXZvaWQiLCBtZXRob2QgImNsZWFyRmVhdHVyZWRTZXJ2aWNlKCl2b2lkIgogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJhY3RpdmF0ZVNlcnZpY2UoKXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4MTdjODczMGIgMHg0Y2RmMGNkNyAweDg3ZTA1NWM2IDB4YjU5YzhhNTQgMHhhZWViYjM3OCAweDcyOTFjMDhlIDB4NTM1NWRhNmQgMHhhMDQ3YzdmNyAweDEwZjAwYzNhIDB4NzcyNDVhODQgMHhhNjhlNjk2MyAweDRjYjE1NWVlIDB4YjEwYTMwNmUgMHhmMjM1NWI1NSAweDFhYzRhNzU4IDB4ZTNhZWIyNWMgMHhlYWFhYTRkMyAweDE3NjUzODdkIDB4MjgxYjg5MWIgMHhjM2Q5ZjFkYyAweDU5NGViYTFkIDB4YzBmZjI3MzAgMHgyNzUyMDNhZiAweDE5YTU0OGZhIDB4MTI2OWQ4N2UgMHg0MzAzNjY4ZSAweDBkNmE0N2EzIDB4MjIwNzA3OGUgMHgxZGM3ODM3MSAweGIxYmFjMmNiIDB4MDlhMzE1OGUgMHg5OTJmOTg5MiAweGY5OTk2M2Q0IDB4ZDRiMTZlN2EgMHhiMTZiYWFjMyAweDc0ZGVmNTlhIDB4MjViODEyYTcgMHg5NjljZWQ5YiAweDMzZDhlNWFkIDB4NjAzZDcyOTcgMHhkZmU2MDJjZiAweGQ4YTZjNTIzIC8vIG1ldGhvZCAicGF1c2VTZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnBhdXNlU2VydmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAic2h1dGRvd25TZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJibG9jayhwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1bmJsb2NrKGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmUocGF5LGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJnYXRlZFN1YnNjcmliZShwYXksYXBwbCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAic3Vic2NyaWJlKHBheSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImdhdGVkU3Vic2NyaWJlQXNhKHBheSxheGZlcixhcHBsLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZUFzYShwYXksYXhmZXIsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJzdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJkZXBvc2l0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGVwb3NpdEFzYShheGZlcix1aW50NjQpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXcodWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnN1YnNjcmliZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRUcmlnZ2VyUGF5bWVudChhcHBsLChhZGRyZXNzLHVpbnQ2NCksdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkVHJpZ2dlclBheW1lbnQoYXBwbCwoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInRyaWdnZXJQYXltZW50KChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAiYWRvcHRQcmluY2lwYWwocGF5LChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAic3RyZWFrQ2hlY2soKGFkZHJlc3MsdWludDY0KSl2b2lkIiwgbWV0aG9kICJzZXRQYXNzZXModWludDY0LGFkZHJlc3NbXSl2b2lkIiwgbWV0aG9kICJjbGVhck9ycGhhblBhc3NlcygoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInRyaWdnZXJMaXN0KChhZGRyZXNzLHVpbnQ2NFtdKVtdKWJvb2xbXSIsIG1ldGhvZCAiaXNCbG9ja2VkKGFkZHJlc3MsYWRkcmVzcylib29sIiwgbWV0aG9kICJpc1NodXRkb3duKGFkZHJlc3MsdWludDY0KWJvb2wiLCBtZXRob2QgIm5ld1NlcnZpY2VDb3N0KHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTZXJ2aWNlQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTdWJzY3JpcHRpb25Db3N0KGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTdWJzY3JpcHRpb25Db3N0KGFkZHJlc3MsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInRyaWdnZXJHYXRlQ3R4KChhZGRyZXNzLHVpbnQ2NCksdWludDY0KShhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzKSIsIG1ldGhvZCAiYmxvY2tDb3N0KCl1aW50NjQiLCBtZXRob2QgImdldFNlcnZpY2UoYWRkcmVzcyx1aW50NjQpKHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10pIiwgbWV0aG9kICJnZXRGZWF0dXJlZFNlcnZpY2UoYWRkcmVzcyl1aW50NjQiLCBtZXRob2QgImdldFNlcnZpY2VzQnlBZGRyZXNzKGFkZHJlc3MsdWludDY0LHVpbnQ2NCkodWludDgsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxzdHJpbmcsYnl0ZVszNl0sdWludDgsYnl0ZVszXSlbXSIsIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uKChhZGRyZXNzLHVpbnQ2NCkpKGJvb2wsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm11c3RHZXRTdWJzY3JpcHRpb24oKGFkZHJlc3MsdWludDY0KSkoYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzKChhZGRyZXNzLHVpbnQ2NCkpKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDgsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10sdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzc1tdKSIsIG1ldGhvZCAiaXNGaXJzdFN1YnNjcmlwdGlvbihhZGRyZXNzKWJvb2wiLCBtZXRob2QgImdldFNlcnZpY2VMaXN0KGFkZHJlc3MpdWludDY0IiwgbWV0aG9kICJnZXRTdWJzY3JpcHRpb25MaXN0KGFkZHJlc3MpdWludDY0IgogICAgYnl0ZWMgMzIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgLy8gbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbmV3U2VydmljZSBsZWdhY3lOZXdTZXJ2aWNlIHNldFNlcnZpY2VEZXNjcmlwdGlvbiB1cGRhdGVTZXJ2aWNlVGl0bGUgdXBkYXRlU2VydmljZUhpZ2hsaWdodCBzZXRGZWF0dXJlZFNlcnZpY2UgY2xlYXJGZWF0dXJlZFNlcnZpY2UgYWN0aXZhdGVTZXJ2aWNlIHBhdXNlU2VydmljZSB1bnBhdXNlU2VydmljZSBzaHV0ZG93blNlcnZpY2UgYmxvY2sgdW5ibG9jayBnYXRlZFN1YnNjcmliZSBsZWdhY3lHYXRlZFN1YnNjcmliZSBzdWJzY3JpYmUgbGVnYWN5U3Vic2NyaWJlIGdhdGVkU3Vic2NyaWJlQXNhIGxlZ2FjeUdhdGVkU3Vic2NyaWJlQXNhIHN1YnNjcmliZUFzYSBsZWdhY3lTdWJzY3JpYmVBc2EgZGVwb3NpdCBkZXBvc2l0QXNhIHdpdGhkcmF3IHVuc3Vic2NyaWJlIGdhdGVkVHJpZ2dlclBheW1lbnQgbGVnYWN5R2F0ZWRUcmlnZ2VyUGF5bWVudCB0cmlnZ2VyUGF5bWVudCBhZG9wdFByaW5jaXBhbCBzdHJlYWtDaGVjayBzZXRQYXNzZXMgY2xlYXJPcnBoYW5QYXNzZXMgdHJpZ2dlckxpc3QgaXNCbG9ja2VkIGlzU2h1dGRvd24gbmV3U2VydmljZUNvc3QgbGVnYWN5TmV3U2VydmljZUNvc3QgbmV3U3Vic2NyaXB0aW9uQ29zdCBsZWdhY3lOZXdTdWJzY3JpcHRpb25Db3N0IHRyaWdnZXJHYXRlQ3R4IG1haW5fYmxvY2tDb3N0X3JvdXRlQDQ3IGdldFNlcnZpY2UgZ2V0RmVhdHVyZWRTZXJ2aWNlIGdldFNlcnZpY2VzQnlBZGRyZXNzIGdldFN1YnNjcmlwdGlvbiBtdXN0R2V0U3Vic2NyaXB0aW9uIGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzIGlzRmlyc3RTdWJzY3JpcHRpb24gZ2V0U2VydmljZUxpc3QgZ2V0U3Vic2NyaXB0aW9uTGlzdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDYxCiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA2MToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9ibG9ja0Nvc3Rfcm91dGVANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDAzZDU0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BANjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMS0xMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHg1YWQ5ZjRjNiAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gX3B1eWFfbGliLmFyYzQuZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudChhcnJheTogYnl0ZXMsIGluZGV4OiB1aW50NjQpIC0+IGJ5dGVzOgpkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50OgogICAgcHJvdG8gMiAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZGlnIDIKICAgIHN3YXAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgNQogICAgc3dhcAogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICAtCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldCh3YWxsZXQ6IHVpbnQ2NCwgd2FsbGV0RmFjdG9yeTogdWludDY0KSAtPiB1aW50NjQ6CmlzR2VudWluZVdhbGxldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gaXNHZW51aW5lV2FsbGV0KHdhbGxldDogdWludDY0LCB3YWxsZXRGYWN0b3J5OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogaXNHZW51aW5lV2FsbGV0X2lmX2JvZHlAMgogICAgZnJhbWVfZGlnIC0xCiAgICBibnogaXNHZW51aW5lV2FsbGV0X2FmdGVyX2lmX2Vsc2VAMwoKaXNHZW51aW5lV2FsbGV0X2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAzCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICByZXRzdWIKCmlzR2VudWluZVdhbGxldF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBpc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc0CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChvcC5pdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlYyAzMyAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBpc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKaXNHZW51aW5lV2FsbGV0X2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgc3dhcAogICAgcmV0c3ViCgppc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNHZW51aW5lV2FsbGV0X2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6Om93bnNBdFJlc3Qod2FsbGV0RmFjdG9yeTogdWludDY0LCB3YWxsZXQ6IHVpbnQ2NCwgYWNjb3VudDogYnl0ZXMpIC0+IHVpbnQ2NDoKb3duc0F0UmVzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjUyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gb3duc0F0UmVzdCh3YWxsZXRGYWN0b3J5OiB1aW50NjQsIHdhbGxldDogdWludDY0LCBhY2NvdW50OiBBY2NvdW50KTogYm9vbGVhbiB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjUzCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBpc0dlbnVpbmVXYWxsZXQKICAgIGJueiBvd25zQXRSZXN0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNTQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKb3duc0F0UmVzdF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc5CiAgICAvLyBjb25zdCBbYWRkcmVzc10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI1NwogICAgLy8gaWYgKGFjY291bnQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJ6IG93bnNBdFJlc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI1OAogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgcmV0c3ViCgpvd25zQXRSZXN0X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNjAKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGFjY291bnQpID09PSB3YWxsZXRBZGRyZXNzCiAgICA9PQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6Z2F0ZUN0eChwOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpnYXRlQ3R4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czozMDMKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnYXRlQ3R4KHA6IFByaW5jaXBhbCk6IEdhdGVDdHggewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNzIgMzIKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFBsYWluUGF5bWVudCh0eG46IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0UGxhaW5QYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFBsYWluUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjphc3NlcnRFeGFjdFBheW1lbnQodHhuOiB1aW50NjQsIHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEV4YWN0UGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRFeGFjdFBheW1lbnQodHhuOiBndHhuLlBheW1lbnRUeG4sIHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQodHhuKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWNlaXZlciA9PT0gcmVjZWl2ZXIsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICBibnogYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzNCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMzUgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiB2b2lkOgpyZWNvcmRQYXllcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA1CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVjb3JkUGF5ZXIocmVjb3JkOiBieXRlcywgcGF5ZXI6IEFjY291bnQsIG93bmVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA2CiAgICAvLyBpZiAocGF5ZXIgIT09IG93bmVyKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IHJlY29yZFBheWVyX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgcHVzaGJ5dGVzICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNwogICAgLy8gb3AuQm94LnB1dChwYXllclJlY29yZEtleShyZWNvcmQpLCBwYXllci5ieXRlcykKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X3B1dAoKcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVsZWFzZURlcG9zaXQocmVjb3JkOiBieXRlcywgb3duZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnJlbGVhc2VEZXBvc2l0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBbQWNjb3VudCwgdWludDY0XSB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0zCiAgICBzaGEyNTYKICAgIHB1c2hieXRlcyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MgogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChrZXkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKCFzcG9uc29yZWQpIHsKICAgIGJueiByZWxlYXNlRGVwb3NpdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgNiAvLyAyODUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZGlnIDEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiByZWxlYXNlRGVwb3NpdF9ib29sX3RydWVAOAogICAgZHVwCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X2Jvb2xfZmFsc2VAOQoKcmVsZWFzZURlcG9zaXRfYm9vbF90cnVlQDg6CiAgICBpbnRjXzEgLy8gMQoKcmVsZWFzZURlcG9zaXRfYm9vbF9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ4CiAgICAvLyByZXR1cm4gW2NhblJlY2VpdmVBbGdvKEFjY291bnQocGF5ZXIpLCB0b3RhbCkgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyLCB0b3RhbF0KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANAogICAgc3dhcAoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANDoKICAgIGJ1cnkgMQogICAgZnJhbWVfZGlnIC0yCiAgICBiIHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfbWVyZ2VANQoKcmVsZWFzZURlcG9zaXRfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVsZWFzZURlcG9zaXRfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFNhZmVBc3NldFRyYW5zZmVyKHR4bjogdWludDY0LCBzZW5kZXI6IGJ5dGVzKSAtPiB2b2lkOgphc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIHNlbmRlcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzNiAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRTZW5kZXIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3Cgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luQXRSZXN0T3Iod2FsbGV0SUQ6IHVpbnQ2NCwgb3I6IGJ5dGVzKSAtPiBieXRlczoKbGVnYWN5T3JpZ2luQXRSZXN0T3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMzMQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeU9yaWdpbkF0UmVzdE9yKHdhbGxldElEOiBBcHBsaWNhdGlvbiwgb3I6IEFjY291bnQpOiBBY2NvdW50IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzIKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogbGVnYWN5T3JpZ2luQXRSZXN0T3JfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMzMwogICAgLy8gcmV0dXJuIG9yCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKbGVnYWN5T3JpZ2luQXRSZXN0T3JfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzUKICAgIC8vIGNvbnN0IG9yaWdpbiA9IGdldE9yaWdpbkFjY291bnQod2FsbGV0SUQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgZ2V0T3JpZ2luQWNjb3VudAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMzNgogICAgLy8gaWYgKG9yaWdpbiAhPT0gd2FsbGV0SUQuYWRkcmVzcyAmJiBvcmlnaW4uYXV0aEFkZHJlc3MgIT09IHdhbGxldElELmFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGxlZ2FjeU9yaWdpbkF0UmVzdE9yX2FmdGVyX2lmX2Vsc2VANQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGxlZ2FjeU9yaWdpbkF0UmVzdE9yX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzcKICAgIC8vIHJldHVybiBvcgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICByZXRzdWIKCmxlZ2FjeU9yaWdpbkF0UmVzdE9yX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM5CiAgICAvLyByZXR1cm4gb3JpZ2luCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJlck9yWmVyb0FkZHJlc3Mod2FsbGV0SUQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnJlZmVycmVyT3JaZXJvQWRkcmVzczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUzCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1NAogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDcKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogcmVmZXJyZXJPclplcm9BZGRyZXNzX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTQKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICByZXRzdWIKCnJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pZl9lbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY4LTM3MQogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNzAKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgYnl0ZWMgMjUgLy8gInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjgtMzcxCiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTQKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRPcmlnaW5BY2NvdW50KHdhbGxldElEOiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRPcmlnaW5BY2NvdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTgKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnZXRPcmlnaW5BY2NvdW50KHdhbGxldElEOiBBcHBsaWNhdGlvbik6IEFjY291bnQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1OS0zNjIKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjEKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgYnl0ZWMgMzcgLy8gImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzU5LTM2MgogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzYzCiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIGNvbnRyb2xsZWRBY2NvdW50Qnl0ZXMubGVuZ3RoID09PSAzMiwgZXJySW52YWxpZFdhbGxldCkKICAgIGJ6IGdldE9yaWdpbkFjY291bnRfYm9vbF9mYWxzZUAzCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGdldE9yaWdpbkFjY291bnRfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQoKZ2V0T3JpZ2luQWNjb3VudF9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBibnogZ2V0T3JpZ2luQWNjb3VudF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMzggLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmdldE9yaWdpbkFjY291bnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2NAogICAgLy8gcmV0dXJuIEFjY291bnQoY29udHJvbGxlZEFjY291bnRCeXRlcykKICAgIHJldHN1YgoKZ2V0T3JpZ2luQWNjb3VudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBnZXRPcmlnaW5BY2NvdW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeVdhbGxldE9mKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmxlZ2FjeVdhbGxldE9mOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTcKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBsZWdhY3lXYWxsZXRPZihha2l0YURBTzogQXBwbGljYXRpb24sIGFkZHJlc3M6IEFjY291bnQpOiBBcHBsaWNhdGlvbiB7CiAgICBwcm90byAyIDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyMQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hieXRlcyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjYKICAgIC8vIHJldHVybiBnZXRPdGhlckFwcExpc3QoYWtpdGFEQU8pLmVzY3JvdwogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQwNi00MDkKICAgIC8vIGNvbnN0IGRhdGEgPSBhYmlDYWxsPHR5cGVvZiBFc2Nyb3dGYWN0b3J5LnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGVzY3Jvd0ZhY3RvcnksCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4M2MxYTZmMzMgLy8gbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDExCiAgICAvLyBpZiAoQnl0ZXMoZGF0YSkubGVuZ3RoICE9PSA4KSB7CiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICAhPQogICAgYnogbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaWZfZWxzZUA2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDEyCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQxNQogICAgLy8gY29uc3Qgd2FsbGV0ID0gYnRvaShkYXRhKQogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MgogICAgLy8gaWYgKHdhbGxldCA9PT0gMCB8fCB3YWxsZXRGYWN0b3J5ID09PSAwKSB7CiAgICBieiBsZWdhY3lXYWxsZXRPZl9pZl9ib2R5QDEwCiAgICBmcmFtZV9kaWcgMQogICAgYm56IGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lmX2Vsc2VAMTEKCmxlZ2FjeVdhbGxldE9mX2lmX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MTYKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBiIGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANwoKbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzg1CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4NgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBieiBsZWdhY3lXYWxsZXRPZl9ib29sX2ZhbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM3NwogICAgLy8gcmV0dXJuIEFjY291bnQob3Auc2hhNTEyXzI1NihCeXRlcygnYXBwSUQnKS5jb25jYXQoaXRvYihhcHBJZCkpKSkKICAgIGZyYW1lX2RpZyAxCiAgICBpdG9iCiAgICBieXRlYyAzMyAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzg2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogbGVnYWN5V2FsbGV0T2ZfYm9vbF9mYWxzZUAxNAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDE2CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTYKCmxlZ2FjeVdhbGxldE9mX2Jvb2xfZmFsc2VAMTQ6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MTYKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxNgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdhdGVDaGVjayhnYXRlVHhuOiB1aW50NjQsIGFraXRhREFPOiB1aW50NjQsIGNhbGxlcjogYnl0ZXMsIGlkOiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2F0ZUNoZWNrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTgKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnYXRlQ2hlY2soZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFraXRhREFPOiBBcHBsaWNhdGlvbiwgY2FsbGVyOiBBY2NvdW50LCBpZDogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byA0IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDYwCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDYwCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDYwLTQ2MQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NjEKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2MC00NjEKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2MgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDYwLTQ2MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2MwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2MC00NjMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2NAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NjAtNDY0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ2NQogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDYwLTQ2NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU5LTQ2NgogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1OS00NjYKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwcmluY2lwYWxPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpwcmluY2lwYWxPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTM3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsT2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBoaW50OiB1aW50NjQpOiBQcmluY2lwYWwgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MzgKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEyCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTMKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjE0CiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgY29uY2F0CgpwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzOAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBpc0dlbnVpbmVXYWxsZXQKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTU0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludE5vdFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhud2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG53bAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY2CiAgICAvLyBsZXQgdmlhUGx1Z2luID0gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NwogICAgLy8gaWYgKGNhbGxlckFwcCAhPT0gaGludCkgewogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MQogICAgLy8gY29uc3QgW3NwZW5kaW5nLCBzcGVuZGluZ0V4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1NQRU5ESU5HKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJzcGVuZGluZ19hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzIKICAgIC8vIGlmICghKHNwZW5kaW5nRXhpc3RzICYmIHNwZW5kaW5nLmxlbmd0aCA9PT0gMzIgJiYgc3BlbmRpbmcgPT09IHNlbmRlci5ieXRlcyAmJiBzZW5kZXIgIT09IGNhbGxlckFkZHIpKSB7CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDEyCiAgICBmcmFtZV9kaWcgMAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxMgogICAgZnJhbWVfZGlnIDAKICAgIGRpZyAxCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxMgogICAgZHVwCiAgICBmcmFtZV9kaWcgMQogICAgIT0KICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzCgpwcmluY2lwYWxPZl9pZl9ib2R5QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90Qm91bmQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhuYmQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3OAogICAgLy8gdmlhUGx1Z2luID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRCeXRlcywgY29udHJvbGxlZEV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX0NPTlRST0xMRUQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAzNyAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNwoKcHJpbmNpcGFsT2ZfaWZfYm9keUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIGJ5dGVjIDM4IC8vICJFUlI6ZXJySXdsdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJd2x0CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMTkKICAgIC8vIGlmIChjb250cm9sbGVkID09PSBzcGVuZGVyKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjAKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MQogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXMsIHJlZmVycmVyRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfUkVGRVJSRVIpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAyNSAvLyAicmVmZXJyZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAyNwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDI3CiAgICBjb3ZlciAzCgpwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTYKICAgIC8vIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICBkaWcgMgogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzZWxlY3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzMAogICAgc3dhcAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk0LTIwMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiBoaW50LAogICAgLy8gICBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyLAogICAgLy8gICB2aWFQbHVnaW4sCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIwOS0yMTYKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsQ3R4KAogICAgLy8gICB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBoaW50LAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhAMzIKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzA6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzEKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMjc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDI4CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjIKICAgIC8vIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCB3YWxsZXRFeGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMwogICAgLy8gaWYgKCF3YWxsZXRFeGlzdHMpIHsKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDI0CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjYKICAgIC8vIGlmIChjb250cm9sbGVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMjQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihjb250cm9sbGVkKSA9PT0gd2FsbGV0QWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAyNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnF1b3RlUmVmZXJyZXJPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpxdW90ZVJlZmVycmVyT2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHF1b3RlUmVmZXJyZXJPZihha2l0YURBTzogQXBwbGljYXRpb24sIGhpbnQ6IHVpbnQ2NCk6IEFjY291bnQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0OAogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDAKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNhbGxzdWIgaXNHZW51aW5lV2FsbGV0CiAgICBibnogcXVvdGVSZWZlcnJlck9mX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDEKICAgIC8vIHJldHVybiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwoKcXVvdGVSZWZlcnJlck9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cXVvdGVSZWZlcnJlckA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NDgKICAgIC8vIHJldHVybiBxdW90ZVJlZmVycmVyKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcmV0c3ViCgpxdW90ZVJlZmVycmVyT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDMKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjUgLy8gInJlZmVycmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjQ0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogcXVvdGVSZWZlcnJlck9mX3Rlcm5hcnlfZmFsc2VANgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBxdW90ZVJlZmVycmVyT2ZfdGVybmFyeV9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0OAogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICByZXRzdWIKCnF1b3RlUmVmZXJyZXJPZl90ZXJuYXJ5X2ZhbHNlQDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjQ0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0OAogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBiIHF1b3RlUmVmZXJyZXJPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnF1b3RlUmVmZXJyZXJAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdhdGVDaGVja0N0eChnYXRlVHhuOiB1aW50NjQsIGFraXRhREFPOiB1aW50NjQsIGN0eDogYnl0ZXMsIGlkOiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CmdhdGVDaGVja0N0eDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrQ3R4KGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGN0eDogR2F0ZUN0eCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4My05ODQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTg0CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODMtOTg0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODUKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4My05ODUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg5YjE0N2QyYyAvLyBtZXRob2QgIm11c3RDaGVja0ZvcigoYWRkcmVzcyx1aW50NjQsYWRkcmVzcyksdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODMtOTg2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTg3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAtMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgzLTk4NwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODgKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4My05ODgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCgpnYXRlQ2hlY2tDdHhfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODItOTg5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCmdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgYiBnYXRlQ2hlY2tDdHhfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyYWxGZWVUbyhha2l0YURBTzogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVmZXJyYWxGZWVUbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk2CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVmZXJyYWxGZWVUbyhha2l0YURBTzogQXBwbGljYXRpb24sIHJlZmVycmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk5NwogICAgLy8gaWYgKHJlZmVycmVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogcmVmZXJyYWxGZWVUb19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk4CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpyZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzM1CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzYKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDkgLy8gNzk4MDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzgKICAgIC8vIGlmIChhc3NldCAhPT0gMCAmJiAhQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiByZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzYKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDkgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzM5CiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnJlZmVycmFsRmVlVG9fYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAxCiAgICAvLyByZXR1cm4gY29zdEluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU8sIGFzc2V0LCAxKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudFRvKGFraXRhREFPOiB1aW50NjQsIHJlZmVycmVyOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzOgpzZW5kUmVmZXJyYWxQYXltZW50VG86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50VG8oYWtpdGFEQU86IEFwcGxpY2F0aW9uLCByZWZlcnJlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHJlY2xhaW1UbzogQWNjb3VudCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gNSAxCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTIKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIC00CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtNQogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxNAogICAgLy8gY29uc3QgeyByZWZlcnJlclBlcmNlbnRhZ2UgfSA9IGdldFdhbGxldEZlZXMoYWtpdGFEQU8pCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMgogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxNwogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxOAogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDI0CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDI1CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIFRISVJUWV9EQVlTKSwKICAgIGR1cAogICAgcHVzaGludCAyNTkyMDAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMjYKICAgIC8vIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgZnJhbWVfZGlnIDAKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAzOSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC01CiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3MwogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3NgogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNTQ1MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc4CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRUb19lbHNlX2JvZHlAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc5LTc5MQogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgzCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIHN3YXAKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODQKICAgIC8vIGFtb3VudDogbWJyICsgc3VtCiAgICBkaWcgMgogICAgZnJhbWVfZGlnIDAKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4Mi03ODUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3OS03OTEKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg2CiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg3CiAgICAvLyBleHBpcmF0aW9uLAogICAgdW5jb3ZlciAzCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzktNzkxCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZGNhYzA5MzUgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCgpzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODMzCiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAyMS0xMDMwCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICByZWNsYWltVG8KICAgIC8vICkKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMzIKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAwCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2Vsc2VfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzkzCiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50VG9faWZfYm9keUAxNAogICAgZHVwCgpzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA4CiAgICAvLyBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODE3LTgzMAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODIxCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgyMC04MjMKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1icgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgyNAogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA3LTgxMQogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODE3LTgzMAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MjUKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MjYKICAgIC8vIGV4cGlyYXRpb24sCiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgxNy04MzAKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhhM2ExNmNhYSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VAMjAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19pZl9ib2R5QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTQKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkdXAKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTUtODA0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5OQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMgogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwMAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk4LTgwMQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk1LTgwNAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwMgogICAgLy8gQXNzZXQoYXNzZXQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTUtODA0CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBieXRlYyAzMiAvLyBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VAMTUKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMzUKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg1MAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBkaWcgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDQwIC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODUzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU0CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODcwLTg4MwogICAgLy8gbmV3U2VydmljZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcGFzc2VzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBwYXlvdXRBZGRyZXNzOiBBY2NvdW50LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICBiYW5uZXJJbWFnZTogQ0lELAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlOiBVaW50OCwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzPDM+LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODQKICAgIC8vIGNvbnN0IHAgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODQKICAgIC8vIGNvbnN0IHAgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODUKICAgIC8vIHJldHVybiB0aGlzLm5ld1NlcnZpY2VJbXBsKHBheW1lbnQsIGludGVydmFsLCBhc3NldCwgYW1vdW50LCBwYXNzZXMsIGdhdGVJRCwgcGF5b3V0QWRkcmVzcywgdGl0bGUsIGJhbm5lckltYWdlLCBoaWdobGlnaHRNZXNzYWdlLCBoaWdobGlnaHRDb2xvciwgcC5yZWZlcnJlcikKICAgIGV4dHJhY3QgMTA0IDMyCiAgICBjYWxsc3ViIG5ld1NlcnZpY2VJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3MC04ODMKICAgIC8vIG5ld1NlcnZpY2UoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIHBhc3NlczogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgcGF5b3V0QWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgYmFubmVySW1hZ2U6IENJRCwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZTogVWludDgsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yOiBieXRlczwzPiwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lOZXdTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5TmV3U2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODg5CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ25ld1NlcnZpY2UnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzNgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzY+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDMKICAgIC8vIHJldHVybiB0aGlzLm5ld1NlcnZpY2VJbXBsKHBheW1lbnQsIGludGVydmFsLCBhc3NldCwgYW1vdW50LCBwYXNzZXMsIGdhdGVJRCwgcGF5b3V0QWRkcmVzcywgdGl0bGUsIGJhbm5lckltYWdlLCBoaWdobGlnaHRNZXNzYWdlLCBoaWdobGlnaHRDb2xvciwgdGhpcy5sZWdhY3lSZWZlcnJlcigpKQogICAgY2FsbHN1YiBsZWdhY3lSZWZlcnJlcgogICAgY2FsbHN1YiBuZXdTZXJ2aWNlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4ODkKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3U2VydmljZScgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNldFNlcnZpY2VEZXNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldFNlcnZpY2VEZXNjcmlwdGlvbjoKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA2CiAgICAvLyBzZXRTZXJ2aWNlRGVzY3JpcHRpb24oaWQ6IFNlcnZpY2VJRCwgb2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDcKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTA5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTAKICAgIC8vIGxvZ2dlZEFzc2VydChvZmZzZXQgKyBkYXRhLmxlbmd0aCA8PSBNQVhfREVTQ1JJUFRJT05fTEVOR1RILCBlcnJCYWREZXNjcmlwdGlvbkxlbmd0aCkKICAgIGRpZyAxCiAgICBsZW4KICAgIGRpZyAzCiAgICArCiAgICBwdXNoaW50IDMxNTEKICAgIDw9CiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJCZGxuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJkbG4KCnNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTEyCiAgICAvLyBsZXQgZGVzY0J5dGVzID0gQnl0ZXModGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlLmRlc2NyaXB0aW9uKQogICAgZHVwbiAyCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGR1cDIKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KG9mZnNldCA8PSBkZXNjQnl0ZXMubGVuZ3RoLCBlcnJCYWRPZmZzZXQpCiAgICBsZW4KICAgIGR1cAogICAgYnVyeSA2CiAgICBkaWcgNAogICAgPj0KICAgIGJueiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyckJvZnMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm9mcwoKc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIGlmIChvZmZzZXQgPCBkZXNjQnl0ZXMubGVuZ3RoKSB7CiAgICBkaWcgMwogICAgZGlnIDUKICAgIDwKICAgIGJ6IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTE3CiAgICAvLyBkZXNjQnl0ZXMgPSBkZXNjQnl0ZXMuc2xpY2UoMCwgb2Zmc2V0KQogICAgaW50Y18wIC8vIDAKICAgIGRpZyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBkaWcgNQogICAgZHVwCiAgICBkaWcgMwogICAgPj0KICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHVuY292ZXIgNAogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgY292ZXIgMgoKc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTIwCiAgICAvLyB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuZGVzY3JpcHRpb24gPSBTdHJpbmcoZGVzY0J5dGVzLmNvbmNhdChkYXRhKSkKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkaWcgMQogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBwdXNoaW50IDc1CiAgICBleHRyYWN0X3VpbnQxNgogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0MwogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwNgogICAgLy8gc2V0U2VydmljZURlc2NyaXB0aW9uKGlkOiBTZXJ2aWNlSUQsIG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudXBkYXRlU2VydmljZVRpdGxlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlU2VydmljZVRpdGxlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjMKICAgIC8vIHVwZGF0ZVNlcnZpY2VUaXRsZShpZDogU2VydmljZUlELCB0aXRsZTogc3RyaW5nKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI0CiAgICAvLyBjb25zdCBrZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1cGRhdGVTZXJ2aWNlVGl0bGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnVwZGF0ZVNlcnZpY2VUaXRsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI3CiAgICAvLyBsb2dnZWRBc3NlcnQoQnl0ZXModGl0bGUpLmxlbmd0aCA8PSBNQVhfVElUTEVfTEVOR1RILCBlcnJUaXRsZVRvb0xvbmcpCiAgICBzd2FwCiAgICBsZW4KICAgIHB1c2hpbnQgMTI4CiAgICA8PQogICAgYm56IHVwZGF0ZVNlcnZpY2VUaXRsZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDEgLy8gIkVSUjplcnJUdGxnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclR0bGcKCnVwZGF0ZVNlcnZpY2VUaXRsZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUudGl0bGUgPSB0aXRsZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDczCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgZXh0cmFjdDMKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICBkaWcgMgogICAgcHVzaGludCA3NQogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAzCiAgICBsZW4KICAgIHVuY292ZXIgNAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciA0CiAgICArCiAgICBzd2FwCiAgICAtCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgcmVwbGFjZTIgNzUKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTIzCiAgICAvLyB1cGRhdGVTZXJ2aWNlVGl0bGUoaWQ6IFNlcnZpY2VJRCwgdGl0bGU6IHN0cmluZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudXBkYXRlU2VydmljZUhpZ2hsaWdodFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZVNlcnZpY2VIaWdobGlnaHQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzOAogICAgLy8gdXBkYXRlU2VydmljZUhpZ2hsaWdodChpZDogU2VydmljZUlELCBoaWdobGlnaHRNZXNzYWdlOiBVaW50OCwgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzPDM+KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDgKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBwdXNoaW50IDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzOQogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogdXBkYXRlU2VydmljZUhpZ2hsaWdodF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKdXBkYXRlU2VydmljZUhpZ2hsaWdodF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuaGlnaGxpZ2h0TWVzc2FnZSA9IGhpZ2hsaWdodE1lc3NhZ2UKICAgIGR1cAogICAgcHVzaGludCAxMTMKICAgIHVuY292ZXIgNAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuaGlnaGxpZ2h0Q29sb3IgPSBoaWdobGlnaHRDb2xvcgogICAgcHVzaGludCAxMTQKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyB1cGRhdGVTZXJ2aWNlSGlnaGxpZ2h0KGlkOiBTZXJ2aWNlSUQsIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LCBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNldEZlYXR1cmVkU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldEZlYXR1cmVkU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBzZXRGZWF0dXJlZFNlcnZpY2UocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyBjb25zdCBrZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldEZlYXR1cmVkU2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKc2V0RmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuc3RhdHVzICE9PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24sIGVyckZlYXR1cmVkU2h1dGRvd24pCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxMSAvLyAweDI4CiAgICAhPQogICAgYm56IHNldEZlYXR1cmVkU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRnNoZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGc2hkCgpzZXRGZWF0dXJlZFNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBieXRlYyAxMCAvLyAiZiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTU5CiAgICAvLyBpZiAodGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIGlmICh0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzZXRGZWF0dXJlZFNlcnZpY2VfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYwCiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIDApCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKCnNldEZlYXR1cmVkU2VydmljZV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBieXRlYyAxMCAvLyAiZiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTY2CiAgICAvLyB0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLnZhbHVlID0gaWQKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NjYKICAgIC8vIHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikudmFsdWUgPSBpZAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTQKICAgIC8vIHNldEZlYXR1cmVkU2VydmljZShwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldEZlYXR1cmVkU2VydmljZV9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEZlYXR1cmVkU2VydmljZU1CUiArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSkKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgZ3R4bnMgU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2MgogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBGZWF0dXJlZFNlcnZpY2VNQlIgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgNiAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk2MgogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBGZWF0dXJlZFNlcnZpY2VNQlIgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikpCiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0RXhhY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBieXRlYyAxMCAvLyAiZiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYzCiAgICAvLyByZWNvcmRQYXllcih0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYzCiAgICAvLyByZWNvcmRQYXllcih0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICBiIHNldEZlYXR1cmVkU2VydmljZV9hZnRlcl9pZl9lbHNlQDgKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNsZWFyRmVhdHVyZWRTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xlYXJGZWF0dXJlZFNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBieXRlYyAxMCAvLyAiZiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTczCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS5leGlzdHMsIGVyck5vRmVhdHVyZWRTZXJ2aWNlKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZmVhdHVyZWQoVHhuLnNlbmRlcikuZXhpc3RzLCBlcnJOb0ZlYXR1cmVkU2VydmljZSkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNsZWFyRmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZnN2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5mc3YKCmNsZWFyRmVhdHVyZWRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgYnl0ZWMgMTAgLy8gImYiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NQogICAgLy8gdGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS5kZWxldGUoKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NQogICAgLy8gdGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gZmVhdHVyZWQgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEZlYXR1cmVkIH0pCiAgICBieXRlYyAxMCAvLyAiZiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTc3CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIGFtb3VudF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLmZlYXR1cmVkKFR4bi5zZW5kZXIpLmtleSwgVHhuLnNlbmRlciwgRmVhdHVyZWRTZXJ2aWNlTUJSKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGZlYXR1cmVkID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhGZWF0dXJlZCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NwogICAgLy8gY29uc3QgW3JlY2VpdmVyLCBhbW91bnRdID0gcmVsZWFzZURlcG9zaXQodGhpcy5mZWF0dXJlZChUeG4uc2VuZGVyKS5rZXksIFR4bi5zZW5kZXIsIEZlYXR1cmVkU2VydmljZU1CUikKICAgIHR4biBTZW5kZXIKICAgIGludGMgNSAvLyAxODkwMAogICAgY2FsbHN1YiByZWxlYXNlRGVwb3NpdAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXIsIGFtb3VudCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3MgogICAgLy8gY2xlYXJGZWF0dXJlZFNlcnZpY2UoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5hY3RpdmF0ZVNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgphY3RpdmF0ZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDE0IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODYKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS52YWx1ZSAtIDEKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLnZhbHVlIC0gMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4OAogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWN0aXZhdGVTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgphY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNEcmFmdCwgZXJyU2VydmljZUlzTm90RHJhZnQpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHB1c2hieXRlcyAweDBhCiAgICA9PQogICAgYm56IGFjdGl2YXRlU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU25kciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmRyCgphY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5MwogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNBY3RpdmUKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxNyAvLyAweDE0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGFjdGl2YXRlU2VydmljZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnBhdXNlU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnBhdXNlU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMwogICAgLy8gcGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwNAogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c0FjdGl2ZSwgZXJyU2VydmljZUlzTm90QWN0aXZlKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxNyAvLyAweDE0CiAgICA9PQogICAgYm56IHBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDIgLy8gIkVSUjplcnJTbmFjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuYWMKCnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxMAogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNQYXVzZWQKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgMHgxZQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAwMwogICAgLy8gcGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVucGF1c2VTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5wYXVzZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTgKICAgIC8vIHVucGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxOQogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDIyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVucGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgp1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNQYXVzZWQsIGVyclNlcnZpY2VJc05vdFBhdXNlZCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgcHVzaGJ5dGVzIDB4MWUKICAgID09CiAgICBibnogdW5wYXVzZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclNucGEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25wYQoKdW5wYXVzZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjYKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPSBTZXJ2aWNlU3RhdHVzQWN0aXZlCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWMgMTcgLy8gMHgxNAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxOAogICAgLy8gdW5wYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2h1dGRvd25TZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKc2h1dGRvd25TZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM0CiAgICAvLyBzaHV0ZG93blNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM1CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2h1dGRvd25TZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzaHV0ZG93blNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzICE9PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24sIGVyclNlcnZpY2VJc1NodXRkb3duKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxMSAvLyAweDI4CiAgICAhPQogICAgYm56IHNodXRkb3duU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJTc2hkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNzaGQKCnNodXRkb3duU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0MQogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgIT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93biwgZXJyU2VydmljZUlzU2h1dGRvd24pCiAgICBieXRlYyAxMSAvLyAweDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDEKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMzQKICAgIC8vIHNodXRkb3duU2VydmljZShpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5ibG9ja1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmJsb2NrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQ5CiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDUxCiAgICAvLyBjb25zdCBib3hLZXkgPSB0aGlzLmdldEJsb2NrS2V5KFR4bi5zZW5kZXIsIGJsb2NrZWQpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyAxMiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTQKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5ibG9ja3MoYm94S2V5KS5leGlzdHMsIGVyclVzZXJBbHJlYWR5QmxvY2tlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYmxvY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyclVhYmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWFibAoKYmxvY2tfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTcKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgY29zdHMuYmxvY2tzICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1NwogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBjb3N0cy5ibG9ja3MgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgNiAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNTcKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgY29zdHMuYmxvY2tzICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpKQogICAgcHVzaGludCAxNTcwMAogICAgKwogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA1OQogICAgLy8gdGhpcy5ibG9ja3MoYm94S2V5KS5jcmVhdGUoKQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjAKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuYmxvY2tzKGJveEtleSkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA0OQogICAgLy8gYmxvY2socGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBibG9ja2VkOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51bmJsb2NrW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5ibG9jazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NwogICAgLy8gdW5ibG9jayhibG9ja2VkOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjgKICAgIC8vIGNvbnN0IGJveEtleSA9IHRoaXMuZ2V0QmxvY2tLZXkoVHhuLnNlbmRlciwgYmxvY2tlZCkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmxvY2tzKGJveEtleSkuZXhpc3RzLCBlcnJVc2VyTm90QmxvY2tlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuYmxvY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyclVuYmwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVW5ibAoKdW5ibG9ja19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3MwogICAgLy8gdGhpcy5ibG9ja3MoYm94S2V5KS5kZWxldGUoKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA3NwogICAgLy8gY29uc3QgW3JlY2VpdmVyLCBhbW91bnRdID0gcmVsZWFzZURlcG9zaXQodGhpcy5ibG9ja3MoYm94S2V5KS5rZXksIFR4bi5zZW5kZXIsIGNvc3RzLmJsb2NrcykKICAgIHR4biBTZW5kZXIKICAgIHB1c2hpbnQgMTU3MDAKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDc5CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NwogICAgLy8gdW5ibG9jayhibG9ja2VkOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nYXRlZFN1YnNjcmliZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkU3Vic2NyaWJlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDg4LTEwOTYKICAgIC8vIGdhdGVkU3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTcKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgZmFsc2UsIDAsIHRydWUsIGdhdGVUeG4uZ3JvdXBJbmRleCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIHdhbGxldCwgZmFsc2UpCiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4OC0xMDk2CiAgICAvLyBnYXRlZFN1YnNjcmliZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5R2F0ZWRTdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZFN1YnNjcmliZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEwMQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFN1YnNjcmliZScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTExMAogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCBmYWxzZSwgMCwgdHJ1ZSwgZ2F0ZVR4bi5ncm91cEluZGV4LCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgMCwgdHJ1ZSkKICAgIHVuY292ZXIgNAogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA1CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMDEKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRTdWJzY3JpYmUnIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgpzdWJzY3JpYmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTctMTEyNAogICAgLy8gc3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTI1CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIGZhbHNlLCAwLCBmYWxzZSwgMCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIHdhbGxldCwgZmFsc2UpCiAgICB1bmNvdmVyIDUKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTctMTEyNAogICAgLy8gc3Vic2NyaWJlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeVN1YnNjcmliZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeVN1YnNjcmliZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEyOQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdzdWJzY3JpYmUnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzNwogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCBmYWxzZSwgMCwgZmFsc2UsIDAsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCAwLCB0cnVlKQogICAgdW5jb3ZlciA0CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMjkKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnc3Vic2NyaWJlJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRTdWJzY3JpYmVBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFN1YnNjcmliZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0MS0xMTUwCiAgICAvLyBnYXRlZFN1YnNjcmliZUFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTEKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgdHJ1ZSwgYXNzZXRYZmVyLmdyb3VwSW5kZXgsIHRydWUsIGdhdGVUeG4uZ3JvdXBJbmRleCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIHdhbGxldCwgZmFsc2UpCiAgICB1bmNvdmVyIDYKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNgogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA3CiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAzCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQxLTExNTAKICAgIC8vIGdhdGVkU3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5R2F0ZWRTdWJzY3JpYmVBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZFN1YnNjcmliZUFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1NQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFN1YnNjcmliZUFzYScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjUKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgdHJ1ZSwgYXNzZXRYZmVyLmdyb3VwSW5kZXgsIHRydWUsIGdhdGVUeG4uZ3JvdXBJbmRleCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIDAsIHRydWUpCiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNQogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA2CiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAzCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTUKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRTdWJzY3JpYmVBc2EnIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zdWJzY3JpYmVBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpzdWJzY3JpYmVBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjktMTE3NwogICAgLy8gc3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3OAogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCB0cnVlLCBhc3NldFhmZXIuZ3JvdXBJbmRleCwgZmFsc2UsIDAsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCB3YWxsZXQsIGZhbHNlKQogICAgdW5jb3ZlciA1CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDYKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjktMTE3NwogICAgLy8gc3Vic2NyaWJlQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lTdWJzY3JpYmVBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lTdWJzY3JpYmVBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnc3Vic2NyaWJlQXNhJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTEKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgdHJ1ZSwgYXNzZXRYZmVyLmdyb3VwSW5kZXgsIGZhbHNlLCAwLCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgMCwgdHJ1ZSkKICAgIHVuY292ZXIgNAogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA1CiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnc3Vic2NyaWJlQXNhJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZGVwb3NpdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlcG9zaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTQKICAgIC8vIGRlcG9zaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk1CiAgICAvLyBjb25zdCBzdWJLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZXh0cmFjdCAzMiA4CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGVwb3NpdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKZGVwb3NpdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5OQogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDEKICAgIC8vIGxvZ2dlZEFzc2VydChzdWIuYXNzZXQgPT09IDAsIGVyckFzYU1pc21hdGNoKQogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ6IGRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyQXNhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBc2FtCgpkZXBvc2l0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAzCiAgICAvLyBhc3NlcnRTYWZlUGF5bWVudChwYXltZW50LCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgZGlnIDIKICAgIGd0eG5zIFNlbmRlcgogICAgPT0KICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgMzYgLy8gIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGRpZyAxCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZGVwb3NpdF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgpkZXBvc2l0X2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyAyNCAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKZGVwb3NpdF9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpkZXBvc2l0X2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA2CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZS5lc2Nyb3dlZCArPSBwYXltZW50LmFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDk2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk0CiAgICAvLyBkZXBvc2l0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5kZXBvc2l0QXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVwb3NpdEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwOQogICAgLy8gZGVwb3NpdEFzYShhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTAKICAgIC8vIGNvbnN0IHN1YktleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxNAogICAgLy8gY29uc3QgeyBhc3NldCB9ID0gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTYKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldCA9PT0gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwgZXJyQXNhTWlzbWF0Y2gpCiAgICBkaWcgMgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICA9PQogICAgYm56IGRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDI2IC8vICJFUlI6ZXJyQXNhbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBc2FtCgpkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjE4CiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZEFzc2V0UmVjZWl2ZXIpCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJYXJlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklhcmUKCmRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMjEKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlLmVzY3Jvd2VkICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgOTYKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDkKICAgIC8vIGRlcG9zaXRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMud2l0aGRyYXdbcm91dGluZ10oKSAtPiB2b2lkOgp3aXRoZHJhdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyNAogICAgLy8gd2l0aGRyYXcoaWQ6IFN1YnNjcmlwdGlvbklELCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjI1CiAgICAvLyBjb25zdCBzdWJLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgp3aXRoZHJhd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyOQogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjMxCiAgICAvLyBsb2dnZWRBc3NlcnQoc3ViLmVzY3Jvd2VkID49IGFtb3VudCwgZXJyTm90RW5vdWdoRnVuZHMpCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgID49CiAgICBibnogd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyck5lZm4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmVmbgoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzMKICAgIC8vIGlmIChzdWIuYXNzZXQgIT09IDApIHsKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ6IHdpdGhkcmF3X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzQtMTI0MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM2CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzNC0xMjM5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzQtMTI0MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCndpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNTAKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlLmVzY3Jvd2VkIC09IGFtb3VudAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgcHVzaGludCA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyNAogICAgLy8gd2l0aGRyYXcoaWQ6IFN1YnNjcmlwdGlvbklELCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKd2l0aGRyYXdfZWxzZV9ib2R5QDg6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0Mi0xMjQ3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0NAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0Mi0xMjQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjQyLTEyNDcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgd2l0aGRyYXdfYWZ0ZXJfaWZfZWxzZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgp1bnN1YnNjcmliZToKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjUzCiAgICAvLyB1bnN1YnNjcmliZShpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI1NAogICAgLy8gY29uc3Qgc3ViS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVuc3Vic2NyaWJlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgp1bnN1YnNjcmliZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI1OAogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUpCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2MAogICAgLy8gdGhpcy5lbnN1cmVQYXNzZXNSZXByaWNlZCgpCiAgICBjYWxsc3ViIGVuc3VyZVBhc3Nlc1JlcHJpY2VkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjIKICAgIC8vIGxldCBtYnJSZWZ1bmQ6IHVpbnQ2NCA9IGNvc3RzLnN1YnNjcmlwdGlvbnMKICAgIGludGMgNyAvLyA2MDUwMAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjYzCiAgICAvLyBpZiAoc3ViLnNlcnZpY2VJRCA+IDApIHsKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjQKICAgIC8vIGNvbnN0IHsgcGFzc2VzIH0gPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogc3ViLnJlY2lwaWVudCwgaWQ6IHN1Yi5zZXJ2aWNlSUQgfSkudmFsdWUKICAgIGRpZyAzCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyA1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjY0CiAgICAvLyBjb25zdCB7IHBhc3NlcyB9ID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHN1Yi5yZWNpcGllbnQsIGlkOiBzdWIuc2VydmljZUlEIH0pLnZhbHVlCiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2NwogICAgLy8gaWYgKHBhc3NlcyA+IDApIHsKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VANwogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyBwYXNzZXMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBBY2NvdW50W10+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UGFzc2VzIH0pCiAgICBieXRlYyAxOCAvLyAicCIKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2OAogICAgLy8gdGhpcy5wYXNzZXMoc3ViS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjkKICAgIC8vIG1iclJlZnVuZCArPSB0aGlzLnBhc3Nlc0NoYXJnZWQoc3ViLnN0YXJ0RGF0ZSkKICAgIGRpZyAyCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNAogICAgLy8gaWYgKHRoaXMucGFzc2VzUmVwcmljZWRBdC5oYXNWYWx1ZSAmJiBzdGFydERhdGUgPCB0aGlzLnBhc3Nlc1JlcHJpY2VkQXQudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gcGFzc2VzUmVwcmljZWRBdCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFN1YnNjcmlwdGlvbnNHbG9iYWxTdGF0ZUtleVBhc3Nlc1JlcHJpY2VkQXQgfSkKICAgIGJ5dGVjIDE5IC8vICJwYXNzZXNfcmVwcmljZWRfYXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNAogICAgLy8gaWYgKHRoaXMucGFzc2VzUmVwcmljZWRBdC5oYXNWYWx1ZSAmJiBzdGFydERhdGUgPCB0aGlzLnBhc3Nlc1JlcHJpY2VkQXQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gcGFzc2VzUmVwcmljZWRBdCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFN1YnNjcmlwdGlvbnNHbG9iYWxTdGF0ZUtleVBhc3Nlc1JlcHJpY2VkQXQgfSkKICAgIGJ5dGVjIDE5IC8vICJwYXNzZXNfcmVwcmljZWRfYXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNAogICAgLy8gaWYgKHRoaXMucGFzc2VzUmVwcmljZWRBdC5oYXNWYWx1ZSAmJiBzdGFydERhdGUgPCB0aGlzLnBhc3Nlc1JlcHJpY2VkQXQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgOAogICAgPgogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzUKICAgIC8vIHJldHVybiBMZWdhY3lQYXNzZXNNQlIKICAgIHB1c2hpbnQgNDE4OTAwCgp1bnN1YnNjcmliZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMucGFzc2VzQ2hhcmdlZEAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI2MgogICAgLy8gbGV0IG1iclJlZnVuZDogdWludDY0ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA3IC8vIDYwNTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNjkKICAgIC8vIG1iclJlZnVuZCArPSB0aGlzLnBhc3Nlc0NoYXJnZWQoc3ViLnN0YXJ0RGF0ZSkKICAgICsKICAgIGNvdmVyIDIKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBwcmluY2lwYWxzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uUHJpbmNpcGFsPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFByaW5jaXBhbHMgfSkKICAgIGJ5dGVjIDIwIC8vICJpIgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI3MwogICAgLy8gaWYgKHRoaXMucHJpbmNpcGFscyhzdWJLZXkpLmRlbGV0ZSgpKSB7CiAgICBib3hfZGVsCiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI3NAogICAgLy8gbWJyUmVmdW5kICs9IFN1YnNjcmlwdGlvblByaW5jaXBhbE1CUgogICAgc3dhcAogICAgaW50YyA4IC8vIDM0OTAwCiAgICArCiAgICBzd2FwCgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNzgKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgcmVmdW5kXSA9IHJlbGVhc2VEZXBvc2l0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmtleSwgVHhuLnNlbmRlciwgbWJyUmVmdW5kKQogICAgZHVwCiAgICB0eG4gU2VuZGVyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcmVsZWFzZURlcG9zaXQKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjgwCiAgICAvLyBpZiAoc3ViLmFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMgogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA5CiAgICBieiB1bnN1YnNjcmliZV9lbHNlX2JvZHlAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI4MQogICAgLy8gaWYgKHN1Yi5lc2Nyb3dlZCA+IDApIHsKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA3CiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODItMTI4OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjg0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODItMTI4NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjgyLTEyODgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjkxLTEyOTYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI5MS0xMjk1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjkxLTEyOTYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMjIKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI1MwogICAgLy8gdW5zdWJzY3JpYmUoaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgp1bnN1YnNjcmliZV9lbHNlX2JvZHlAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTcKICAgIC8vIH0gZWxzZSBpZiAocmVjZWl2ZXIgPT09IFR4bi5zZW5kZXIpIHsKICAgIGRpZyAzCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYnogdW5zdWJzY3JpYmVfZWxzZV9ib2R5QDE4CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjk4LTEzMDMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkICsgcmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzAwCiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwMQogICAgLy8gYW1vdW50OiBzdWIuZXNjcm93ZWQgKyByZWZ1bmQKICAgIHVuY292ZXIgMwogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI5OC0xMzAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZCArIHJlZnVuZAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjk4LTEzMDMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkICsgcmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyNAoKdW5zdWJzY3JpYmVfZWxzZV9ib2R5QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA1CiAgICAvLyBpZiAoc3ViLmVzY3Jvd2VkID4gMCkgewogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDk2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDYKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwNi0xMzExCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwOAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICBkaWcgNQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwNi0xMzEwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA2LTEzMTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogc3ViLmVzY3Jvd2VkCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMTQtMTMxOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzE0LTEzMTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMTQtMTMxOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDI0Cgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzcKICAgIC8vIHJldHVybiB0aGlzLm1icigpLnBhc3NlcwogICAgcHVzaGludCA4MzcwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjY5CiAgICAvLyBtYnJSZWZ1bmQgKz0gdGhpcy5wYXNzZXNDaGFyZ2VkKHN1Yi5zdGFydERhdGUpCiAgICBiIHVuc3Vic2NyaWJlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5wYXNzZXNDaGFyZ2VkQDI5CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nYXRlZFRyaWdnZXJQYXltZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRUcmlnZ2VyUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzMQogICAgLy8gZ2F0ZWRUcmlnZ2VyUGF5bWVudChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwga2V5OiBTdWJzY3JpcHRpb25LZXksIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzMgogICAgLy8gY29uc3QgZ2F0ZUlEID0gdGhpcy50cmlnZ2VyR2F0ZUlEKGtleSkKICAgIHN3YXAKICAgIGNhbGxzdWIgdHJpZ2dlckdhdGVJRAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzMzCiAgICAvLyBjb25zdCBjdHggPSB0aGlzLnRyaWdnZXJDdHgoa2V5LCBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzMwogICAgLy8gY29uc3QgY3R4ID0gdGhpcy50cmlnZ2VyQ3R4KGtleSwgcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGNhbGxzdWIgdHJpZ2dlckN0eAogICAgcG9wCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMzQKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgY3R4LCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBjdHgsIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2tDdHgKICAgIHBvcAogICAgYm56IGdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyRmd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGZ3RlCgpnYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzM2CiAgICAvLyB0aGlzLnRyaWdnZXJJbXBsKGtleSwgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHRyaWdnZXJJbXBsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzMQogICAgLy8gZ2F0ZWRUcmlnZ2VyUGF5bWVudChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwga2V5OiBTdWJzY3JpcHRpb25LZXksIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lHYXRlZFRyaWdnZXJQYXltZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRUcmlnZ2VyUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0MwogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFRyaWdnZXJQYXltZW50JyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNDUKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMudHJpZ2dlckdhdGVJRChrZXkpCiAgICBjYWxsc3ViIHRyaWdnZXJHYXRlSUQKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQ3CiAgICAvLyBjb25zdCB3YWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNDcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgbGVnYWN5V2FsbGV0T2YKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0OAogICAgLy8gY29uc3Qgb3JpZ2luID0gbGVnYWN5T3JpZ2luQXRSZXN0T3Iod2FsbGV0LCBrZXkuYWRkcmVzcykKICAgIHN3YXAKICAgIGNhbGxzdWIgbGVnYWN5T3JpZ2luQXRSZXN0T3IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQ5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGxlZ2FjeUdhdGVkVHJpZ2dlclBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJyRmd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGZ3RlCgpsZWdhY3lHYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzUxCiAgICAvLyB0aGlzLnRyaWdnZXJJbXBsKGtleSwgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIHRyaWdnZXJJbXBsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0MwogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZFRyaWdnZXJQYXltZW50JyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlclBheW1lbnRbcm91dGluZ10oKSAtPiB2b2lkOgp0cmlnZ2VyUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM1NQogICAgLy8gdHJpZ2dlclBheW1lbnQoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNTYKICAgIC8vIHRoaXMudHJpZ2dlckltcGwoa2V5LCBmYWxzZSkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHRyaWdnZXJJbXBsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM1NQogICAgLy8gdHJpZ2dlclBheW1lbnQoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmFkb3B0UHJpbmNpcGFsW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRvcHRQcmluY2lwYWw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNjUKICAgIC8vIGFkb3B0UHJpbmNpcGFsKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwga2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCmFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzY3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuZ2F0ZUlEICE9PSAwLCBlcnJOb3RHYXRlZCkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYm56IGFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZ3RkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ndGQKCmFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIHByaW5jaXBhbHMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25QcmluY2lwYWw+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UHJpbmNpcGFscyB9KQogICAgYnl0ZWMgMjAgLy8gImkiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaW5jaXBhbHMoa2V5KS5leGlzdHMsIGVyclByaW5jaXBhbEV4aXN0cykKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyclBleHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGV4cwoKYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzAKICAgIC8vIGNvbnN0IHdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM3MAogICAgLy8gY29uc3Qgd2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZXh0cmFjdCAwIDMyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGNhbGxzdWIgbGVnYWN5V2FsbGV0T2YKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzcyCiAgICAvLyBsb2dnZWRBc3NlcnQod2FsbGV0LmlkICE9PSAwLCBlcnJOb0xlZ2FjeVdhbGxldCkKICAgIGJueiBhZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmx3bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObHdsCgphZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM3NAogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBTdWJzY3JpcHRpb25QcmluY2lwYWxNQlIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBpbnRjIDggLy8gMzQ5MDAKICAgIGNhbGxzdWIgYXNzZXJ0RXhhY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzYKICAgIC8vIHRoaXMucHJpbmNpcGFscyhrZXkpLnZhbHVlID0geyB3YWxsZXQ6IHdhbGxldC5pZCwgcHJpbmNpcGFsOiBsZWdhY3lPcmlnaW5BdFJlc3RPcih3YWxsZXQsIGtleS5hZGRyZXNzKSB9CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBsZWdhY3lPcmlnaW5BdFJlc3RPcgogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNjUKICAgIC8vIGFkb3B0UHJpbmNpcGFsKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwga2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN0cmVha0NoZWNrW3JvdXRpbmddKCkgLT4gdm9pZDoKc3RyZWFrQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODMKICAgIC8vIHN0cmVha0NoZWNrKGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzdHJlYWtDaGVja19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKc3RyZWFrQ2hlY2tfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODUKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzg2CiAgICAvLyBjb25zdCBjdXJyZW50V2luZG93U3RhcnQ6IHVpbnQ2NCA9IHRoaXMuZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3ViLnN0YXJ0RGF0ZSwgc3ViLmludGVydmFsKQogICAgZHVwCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDEKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRMYXRlc3RXaW5kb3dTdGFydAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzg3CiAgICAvLyBpZiAoc3ViLmxhc3RQYXltZW50IDwgdGhpcy5nZXRQcmV2aW91c1dpbmRvd1N0YXJ0KGN1cnJlbnRXaW5kb3dTdGFydCwgc3ViLmludGVydmFsKSkgewogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGdldFByZXZpb3VzV2luZG93U3RhcnQKICAgIDwKICAgIGJ6IHN0cmVha0NoZWNrX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzg4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5zdHJlYWsgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgODgKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKCnN0cmVha0NoZWNrX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM4MwogICAgLy8gc3RyZWFrQ2hlY2soa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnNldFBhc3Nlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnNldFBhc3NlczoKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5MgogICAgLy8gc2V0UGFzc2VzKGlkOiBTdWJzY3JpcHRpb25JRCwgYWRkcmVzc2VzOiBBY2NvdW50W10pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YWNjb3VudD4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5MwogICAgLy8gY29uc3Qgc3Vic2NyaXB0aW9uc0tleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzk1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbnNLZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTcKICAgIC8vIGNvbnN0IHsgc2VydmljZUlELCByZWNpcGllbnQgfSA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25zS2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCAwIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTkKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlSUQgPiAwLCBlcnJOb0RvbmF0aW9ucykKICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyck5vZG4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9kbgoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDAxCiAgICAvLyBjb25zdCBzZXJ2aWNlS2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDA1CiAgICAvLyBjb25zdCB7IHN0YXR1cywgcGFzc2VzIH0gPSB0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLnZhbHVlCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMjUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDcKICAgIC8vIGxvZ2dlZEFzc2VydChzdGF0dXMgIT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93biwgZXJyU2VydmljZUlzU2h1dGRvd24pCiAgICBieXRlYyAxMSAvLyAweDI4CiAgICAhPQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJTc2hkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNzaGQKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQwOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBhc3NlcyA+IDAgJiYgcGFzc2VzID49IGFkZHJlc3Nlcy5sZW5ndGgsIGVyclBhc3NDb3VudE92ZXJmbG93KQogICAgZGlnIDQKICAgIGJ6IHNldFBhc3Nlc19ib29sX2ZhbHNlQDEyCiAgICBkaWcgNAogICAgZGlnIDIKICAgID49CiAgICBieiBzZXRQYXNzZXNfYm9vbF9mYWxzZUAxMgogICAgaW50Y18xIC8vIDEKCnNldFBhc3Nlc19ib29sX21lcmdlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDA5CiAgICAvLyBsb2dnZWRBc3NlcnQocGFzc2VzID4gMCAmJiBwYXNzZXMgPj0gYWRkcmVzc2VzLmxlbmd0aCwgZXJyUGFzc0NvdW50T3ZlcmZsb3cpCiAgICBibnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAxNQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGNvZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQY29mCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDExCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKc2V0UGFzc2VzX3doaWxlX3RvcEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxMQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMwogICAgPAogICAgYnogc2V0UGFzc2VzX2FmdGVyX3doaWxlQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MTIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5ibG9ja3ModGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIGFkZHJlc3Nlc1tpXSkpLmV4aXN0cywgZXJyQmxvY2tlZCkKICAgIGRpZyAzCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgZGlnIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MTIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5ibG9ja3ModGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIGFkZHJlc3Nlc1tpXSkpLmV4aXN0cywgZXJyQmxvY2tlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgNDQgLy8gIkVSUjplcnJCbGtkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJsa2QKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MTEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHNldFBhc3Nlc193aGlsZV90b3BAMTYKCnNldFBhc3Nlc19hZnRlcl93aGlsZUAyMDoKICAgIHBvcG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDE1CiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0pLnZhbHVlID0gY2xvbmUoYWRkcmVzc2VzKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHBhc3NlcyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIEFjY291bnRbXT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQYXNzZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MTUKICAgIC8vIHRoaXMucGFzc2VzKHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfSkudmFsdWUgPSBjbG9uZShhZGRyZXNzZXMpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzkyCiAgICAvLyBzZXRQYXNzZXMoaWQ6IFN1YnNjcmlwdGlvbklELCBhZGRyZXNzZXM6IEFjY291bnRbXSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKc2V0UGFzc2VzX2Jvb2xfZmFsc2VAMTI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBzZXRQYXNzZXNfYm9vbF9tZXJnZUAxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY2xlYXJPcnBoYW5QYXNzZXNbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhck9ycGhhblBhc3NlczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQyMwogICAgLy8gY2xlYXJPcnBoYW5QYXNzZXMoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDI0CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjbGVhck9ycGhhblBhc3Nlc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKY2xlYXJPcnBoYW5QYXNzZXNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTggLy8gInAiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucGFzc2VzKGtleSkuZGVsZXRlKCksIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9kZWwKICAgIGJueiBjbGVhck9ycGhhblBhc3Nlc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKY2xlYXJPcnBoYW5QYXNzZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MjMKICAgIC8vIGNsZWFyT3JwaGFuUGFzc2VzKGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnRyaWdnZXJMaXN0OgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18zIC8vIDIKICAgICoKICAgIHN3YXAKICAgIGR1cAogICAgbGVuCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgaW50Y18wIC8vIDAKCnRyaWdnZXJMaXN0X2Zvcl9oZWFkZXJAMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBkdXAKICAgIGRpZyA2CiAgICA8CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl9mb3JANAogICAgZHVwCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZGlnIDIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBlbmNvZGluZwogICAgZHVwCiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBmb3IgKGxlbisodWludDhbMzJdLChsZW4rdWludDY0W10pKVtdKQogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDM0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKHVpbnQ4WzMyXSwobGVuK3VpbnQ2NFtdKSkKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgcHVzaGludCAzNgogICAgKwogICAgKwogICAgY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgdHJpZ2dlckxpc3RfZm9yX2hlYWRlckAxCgp0cmlnZ2VyTGlzdF9hZnRlcl9mb3JANDoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGludGNfMyAvLyAyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlRyaWdnZXJMaXN0UmVxdWVzdD4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzMgogICAgLy8gY29uc3QgcmVzdWx0czogYm9vbGVhbltdID0gW10KICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVxLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzMKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZXEubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDQKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzQKICAgIC8vIGZvciAobGV0IGo6IHVpbnQ2NCA9IDA7IGogPCByZXFbaV0uaWRzLmxlbmd0aDsgaiArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgoKdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzQKICAgIC8vIGZvciAobGV0IGo6IHVpbnQ2NCA9IDA7IGogPCByZXFbaV0uaWRzLmxlbmd0aDsgaiArPSAxKSB7CiAgICBkaWcgMwogICAgZGlnIDEKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGRpZyAzCiAgICA+CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDM0LTE0MzUKICAgIC8vIGZvciAobGV0IGo6IHVpbnQ2NCA9IDA7IGogPCByZXFbaV0uaWRzLmxlbmd0aDsgaiArPSAxKSB7CiAgICAvLyAgIGNvbnN0IGtleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiByZXFbaV0uYWRkcmVzcywgaWQ6IHJlcVtpXS5pZHNbal0gfQogICAgZGlnIDMKICAgIGR1cAogICAgZGlnIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50CiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgZGlnIDQKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdDMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzUKICAgIC8vIGNvbnN0IGtleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiByZXFbaV0uYWRkcmVzcywgaWQ6IHJlcVtpXS5pZHNbal0gfQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzYKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNhblRyaWdnZXIoa2V5KSkKICAgIGNhbGxzdWIgY2FuVHJpZ2dlcgogICAgcG9wCiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnVyeSA5CiAgICBzd2FwCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNgogICAgLy8gcmVzdWx0cy5wdXNoKHRoaXMuY2FuVHJpZ2dlcihrZXkpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgcmVwbGFjZTIgMAogICAgY292ZXIgNAogICAgc3dhcAogICAgcHVzaGludCA3CiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgLwogICAgZHVwCiAgICBidXJ5IDExCiAgICBzd2FwCiAgICBwdXNoaW50IDcKICAgICsKICAgIGludGNfMiAvLyA4CiAgICAvCiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX2lmX2Vsc2VAMTQKICAgIGRpZyA3CiAgICBkaWcgOQogICAgLQogICAgYnplcm8KICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciAyCgp0cmlnZ2VyTGlzdF9hZnRlcl9pZl9lbHNlQDE0OgogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIHVuY292ZXIgNAogICAgcHVzaGludCAxNgogICAgKwogICAgZHVwCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzYKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNhblRyaWdnZXIoa2V5KSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDgKCnRyaWdnZXJMaXN0X3doaWxlX3RvcEAxNToKICAgIGRpZyAzCiAgICBkaWcgOAogICAgPAogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTcKICAgIGRpZyAxMAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGdldGJpdAogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDUKICAgIGR1cAogICAgY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGNvdmVyIDQKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzYKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNhblRyaWdnZXIoa2V5KSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAyCiAgICBiIHRyaWdnZXJMaXN0X3doaWxlX3RvcEAxNQoKdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTc6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzNAogICAgLy8gZm9yIChsZXQgajogdWludDY0ID0gMDsgaiA8IHJlcVtpXS5pZHMubGVuZ3RoOyBqICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGIgdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDgKCnRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDEwOgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQzMwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlcS5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgdHJpZ2dlckxpc3Rfd2hpbGVfdG9wQDYKCnRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDExOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaXNCbG9ja2VkW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNCbG9ja2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDQ3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ0OQogICAgLy8gcmV0dXJuIHRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkoYWRkcmVzcywgYmxvY2tlZCkpLmV4aXN0cwogICAgY2FsbHN1YiBnZXRCbG9ja0tleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIGJsb2NrcyA9IEJveE1hcDxCbG9ja0xpc3RLZXksIGJ5dGVzPDA+Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeEJsb2NrcyB9KQogICAgYnl0ZWMgMTIgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ0OQogICAgLy8gcmV0dXJuIHRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkoYWRkcmVzcywgYmxvY2tlZCkpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NDcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmlzU2h1dGRvd25bcm91dGluZ10oKSAtPiB2b2lkOgppc1NodXRkb3duOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ1OAogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLmV4aXN0cyAmJgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU4CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ1OC0xNDU5CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGJ6IGlzU2h1dGRvd25fYm9vbF9mYWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NTkKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxMSAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU4LTE0NTkKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS5leGlzdHMgJiYKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYnogaXNTaHV0ZG93bl9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgppc1NodXRkb3duX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ1NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaXNTaHV0ZG93bl9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBpc1NodXRkb3duX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubmV3U2VydmljZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdTZXJ2aWNlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDY2CiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlQ29zdChxdW90ZVJlZmVycmVyT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NjYKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VDb3N0KHF1b3RlUmVmZXJyZXJPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcXVvdGVSZWZlcnJlck9mCiAgICBjYWxsc3ViIHNlcnZpY2VDb3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NjMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5TmV3U2VydmljZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lOZXdTZXJ2aWNlQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ3MAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlLCBuYW1lOiAnbmV3U2VydmljZUNvc3QnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDcyCiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlQ29zdCh0aGlzLmxlZ2FjeVJlZmVycmVyKCkpCiAgICBjYWxsc3ViIGxlZ2FjeVJlZmVycmVyCiAgICBjYWxsc3ViIHNlcnZpY2VDb3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NzAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSwgbmFtZTogJ25ld1NlcnZpY2VDb3N0JyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubmV3U3Vic2NyaXB0aW9uQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1N1YnNjcmlwdGlvbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODcKICAgIC8vIGNvbnN0IFttYnJBbW91bnQsIGdhdGVJRF0gPSB0aGlzLnN1YnNjcmlwdGlvbk1icihyZWNpcGllbnQsIHNlcnZpY2VJRCkKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgc3Vic2NyaXB0aW9uTWJyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODgKICAgIC8vIGNvbnN0IHByaW5jaXBhbE1icjogdWludDY0ID0gd2FsbGV0ICE9PSAwICYmIGdhdGVJRCAhPT0gMCA/IFN1YnNjcmlwdGlvblByaW5jaXBhbE1CUiA6IDAKICAgIGJ6IG5ld1N1YnNjcmlwdGlvbkNvc3RfYm9vbF9mYWxzZUA0CiAgICBkaWcgMwogICAgYnogbmV3U3Vic2NyaXB0aW9uQ29zdF9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgpuZXdTdWJzY3JpcHRpb25Db3N0X2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ4OAogICAgLy8gY29uc3QgcHJpbmNpcGFsTWJyOiB1aW50NjQgPSB3YWxsZXQgIT09IDAgJiYgZ2F0ZUlEICE9PSAwID8gU3Vic2NyaXB0aW9uUHJpbmNpcGFsTUJSIDogMAogICAgaW50YyA4IC8vIDM0OTAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODkKICAgIC8vIHJldHVybiBtYnJBbW91bnQgKyBwcmluY2lwYWxNYnIgKyByZWZlcnJhbEZlZVRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHF1b3RlUmVmZXJyZXJPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpLCBhc3NldCkKICAgICsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODkKICAgIC8vIHJldHVybiBtYnJBbW91bnQgKyBwcmluY2lwYWxNYnIgKyByZWZlcnJhbEZlZVRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHF1b3RlUmVmZXJyZXJPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBxdW90ZVJlZmVycmVyT2YKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiByZWZlcnJhbEZlZVRvCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3U3Vic2NyaXB0aW9uQ29zdF9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdTdWJzY3JpcHRpb25Db3N0X2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5TmV3U3Vic2NyaXB0aW9uQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeU5ld1N1YnNjcmlwdGlvbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0OTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSwgbmFtZTogJ25ld1N1YnNjcmlwdGlvbkNvc3QnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0OTkKICAgIC8vIGNvbnN0IFttYnJBbW91bnRdID0gdGhpcy5zdWJzY3JpcHRpb25NYnIocmVjaXBpZW50LCBzZXJ2aWNlSUQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgc3Vic2NyaXB0aW9uTWJyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwMAogICAgLy8gcmV0dXJuIG1ickFtb3VudCArIHJlZmVycmFsRmVlVG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5sZWdhY3lSZWZlcnJlcigpLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MDAKICAgIC8vIHJldHVybiBtYnJBbW91bnQgKyByZWZlcnJhbEZlZVRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMubGVnYWN5UmVmZXJyZXIoKSwgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiBsZWdhY3lSZWZlcnJlcgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlZmVycmFsRmVlVG8KICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ5MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlLCBuYW1lOiAnbmV3U3Vic2NyaXB0aW9uQ29zdCcgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJHYXRlQ3R4W3JvdXRpbmddKCkgLT4gdm9pZDoKdHJpZ2dlckdhdGVDdHg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MDgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUxMAogICAgLy8gcmV0dXJuIHRoaXMudHJpZ2dlckN0eChrZXksIHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTEwCiAgICAvLyByZXR1cm4gdGhpcy50cmlnZ2VyQ3R4KGtleSwgcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICBjYWxsc3ViIHRyaWdnZXJDdHgKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTA4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTE4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUyMAogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzcywgaWQgfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTIxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCmdldFNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjIKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0RmVhdHVyZWRTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0RmVhdHVyZWRTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTI2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBmZWF0dXJlZCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4RmVhdHVyZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJmIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUyOAogICAgLy8gcmV0dXJuIHRoaXMuZmVhdHVyZWQoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5mZWF0dXJlZChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0RmVhdHVyZWRTZXJ2aWNlX3Rlcm5hcnlfZmFsc2VAMwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCmdldEZlYXR1cmVkU2VydmljZV90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0RmVhdHVyZWRTZXJ2aWNlX3Rlcm5hcnlfZmFsc2VAMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTI4CiAgICAvLyByZXR1cm4gdGhpcy5mZWF0dXJlZChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLmZlYXR1cmVkKGFkZHJlc3MpLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgZ2V0RmVhdHVyZWRTZXJ2aWNlX3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U2VydmljZXNCeUFkZHJlc3Nbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTZXJ2aWNlc0J5QWRkcmVzczoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzMKICAgIC8vIGNvbnN0IHNlcnZpY2VzOiBTZXJ2aWNlW10gPSBbXQogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc193aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzNAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gc3RhcnQ7IGkgPCBzdGFydCArIHdpbmRvd1NpemU7IGkgKz0gMSkgewogICAgZGlnIDMKICAgIGRpZyAzCiAgICArCiAgICBkaWcgMgogICAgPgogICAgYnogZ2V0U2VydmljZXNCeUFkZHJlc3NfYmxvY2tAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTM1CiAgICAvLyBjb25zdCBrZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzLCBpZDogaSB9CiAgICBkaWcgMQogICAgaXRvYgogICAgZGlnIDUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTM2CiAgICAvLyBpZiAodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzcKICAgIC8vIHNlcnZpY2VzLnB1c2godGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlKQogICAgZGlnIDYKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoYnl0ZXMgMHgwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzNwogICAgLy8gc2VydmljZXMucHVzaCh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgOQoKZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMDoKICAgIGRpZyA4CiAgICBkaWcgMgogICAgPAogICAgYnogZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDEyCiAgICBkdXAKICAgIGRpZyA5CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHVuY292ZXIgNQogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciA0CiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgYnVyeSA5CiAgICBiIGdldFNlcnZpY2VzQnlBZGRyZXNzX2Zvcl9oZWFkZXJAMTAKCmdldFNlcnZpY2VzQnlBZGRyZXNzX2FmdGVyX2ZvckAxMjoKICAgIGR1cAogICAgbGVuCiAgICBjb3ZlciAzCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMAoKZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMzoKICAgIGRpZyA5CiAgICBpbnRjXzMgLy8gMgogICAgPAogICAgYnogZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDE1CiAgICBkaWcgNQogICAgZGlnIDEwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgNQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHVuY292ZXIgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciA1CiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgYnVyeSAxMAogICAgYiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEzCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTU6CiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIHN1YnN0cmluZzMKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUzNAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gc3RhcnQ7IGkgPCBzdGFydCArIHdpbmRvd1NpemU7IGkgKz0gMSkgewogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIGIgZ2V0U2VydmljZXNCeUFkZHJlc3Nfd2hpbGVfdG9wQDIKCmdldFNlcnZpY2VzQnlBZGRyZXNzX2Jsb2NrQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U3Vic2NyaXB0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTQ1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MC0xNTIKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNSAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NDcKICAgIC8vIGlmICghdGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU0OC0xNTYwCiAgICAvLyByZXR1cm4gewogICAgLy8gICBleGlzdHM6IGZhbHNlLAogICAgLy8gICByZWNpcGllbnQ6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc2VydmljZUlEOiAwLAogICAgLy8gICBzdGFydERhdGU6IDAsCiAgICAvLyAgIGFtb3VudDogMCwKICAgIC8vICAgaW50ZXJ2YWw6IDAsCiAgICAvLyAgIGFzc2V0OiAwLAogICAgLy8gICBnYXRlSUQ6IDAsCiAgICAvLyAgIGxhc3RQYXltZW50OiAwLAogICAgLy8gICBzdHJlYWs6IDAsCiAgICAvLyAgIGVzY3Jvd2VkOiAwLAogICAgLy8gfQogICAgcHVzaGJ5dGVzIGJhc2UzMihBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUEpCgpnZXRTdWJzY3JpcHRpb25fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbkA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTQ1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NjUKICAgIC8vIC4uLnRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAzMiA4CiAgICBkaWcgMgogICAgZXh0cmFjdCA0MCA4CiAgICBkaWcgMwogICAgZXh0cmFjdCA0OCA4CiAgICBkaWcgNAogICAgZXh0cmFjdCA1NiA4CiAgICBkaWcgNQogICAgZXh0cmFjdCA2NCA4CiAgICBkaWcgNgogICAgZXh0cmFjdCA3MiA4CiAgICBkaWcgNwogICAgZXh0cmFjdCA4MCA4CiAgICBkaWcgOAogICAgZXh0cmFjdCA4OCA4CiAgICB1bmNvdmVyIDkKICAgIGV4dHJhY3QgOTYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTYzLTE1NjYKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGV4aXN0czogdHJ1ZSwKICAgIC8vICAgLi4udGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUsCiAgICAvLyB9CiAgICBwdXNoYnl0ZXMgMHg4MAogICAgdW5jb3ZlciAxMAogICAgY29uY2F0CiAgICB1bmNvdmVyIDkKICAgIGNvbmNhdAogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTQ1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGIgZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25ANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubXVzdEdldFN1YnNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm11c3RHZXRTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbXVzdEdldFN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKbXVzdEdldFN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU3MgogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTY5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHM6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NzUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTc5CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4MQogICAgLy8gbGV0IHN0YXR1czogU2VydmljZVN0YXR1cyA9IFNlcnZpY2VTdGF0dXNOb25lCiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4MgogICAgLy8gbGV0IHBheW91dEFkZHJlc3M6IEFjY291bnQgPSBzdWIucmVjaXBpZW50CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTgzCiAgICAvLyBsZXQgdGl0bGU6IHN0cmluZyA9ICcnCiAgICBieXRlY18zIC8vICIiCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1ODQKICAgIC8vIGxldCBkZXNjcmlwdGlvbjogc3RyaW5nID0gJycKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU4NQogICAgLy8gbGV0IGJhbm5lckltYWdlOiBDSUQgPSBvcC5iemVybygzNikKICAgIHB1c2hpbnQgMzYKICAgIGJ6ZXJvCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1ODcKICAgIC8vIGxldCBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4gPSBCeXRlcygnMDAwJykudG9GaXhlZCh7IGxlbmd0aDogMyB9KQogICAgcHVzaGJ5dGVzICIwMDAiCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1ODgKICAgIC8vIGlmIChzdWIuc2VydmljZUlEICE9PSAwKSB7CiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBibnogZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfaWZfYm9keUA0CiAgICBkaWcgNgogICAgY292ZXIgMwogICAgZGlnIDIKICAgIGJ1cnkgMTEKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5NwogICAgLy8gbGV0IHBhc3NlczogQWNjb3VudFtdID0gW10KICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHBhc3NlcyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIEFjY291bnRbXT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQYXNzZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5OAogICAgLy8gaWYgKHRoaXMucGFzc2VzKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5OQogICAgLy8gcGFzc2VzID0gWy4uLnBhc3NlcywgLi4udGhpcy5wYXNzZXMoa2V5KS52YWx1ZV0KICAgIGRpZyAxMQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OTcKICAgIC8vIGxldCBwYXNzZXM6IEFjY291bnRbXSA9IFtdCiAgICBieXRlYyAxMyAvLyAweDAwMDAKICAgIHN3YXAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnVyeSAxMQoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYwMwogICAgLy8gLi4uc3ViLAogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGV4dHJhY3QgNDAgOAogICAgZGlnIDEKICAgIGV4dHJhY3QgNDggOAogICAgZGlnIDIKICAgIGV4dHJhY3QgNTYgOAogICAgZGlnIDMKICAgIGV4dHJhY3QgNjQgOAogICAgZGlnIDQKICAgIGV4dHJhY3QgNzIgOAogICAgZGlnIDUKICAgIGV4dHJhY3QgODAgOAogICAgZGlnIDYKICAgIGV4dHJhY3QgODggOAogICAgdW5jb3ZlciA3CiAgICBleHRyYWN0IDk2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYwMi0xNjEyCiAgICAvLyByZXR1cm4gewogICAgLy8gICAuLi5zdWIsCiAgICAvLyAgIHN0YXR1cywKICAgIC8vICAgcGF5b3V0QWRkcmVzcywKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IsCiAgICAvLyAgIHBhc3NlcwogICAgLy8gfQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDgKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgZGlnIDkKICAgIGNvbmNhdAogICAgdW5jb3ZlciA4CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MDBiNwogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDE4MwogICAgKwogICAgdW5jb3ZlciA5CiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgdW5jb3ZlciAzCiAgICArCiAgICBzd2FwCiAgICB1bmNvdmVyIDkKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NzUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfaWZfYm9keUA0OgogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1ODkKICAgIC8vIGNvbnN0IHNlcnZpY2VLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBzdWIucmVjaXBpZW50LCBpZDogc3ViLnNlcnZpY2VJRCB9CiAgICBkaWcgMQogICAgaXRvYgogICAgZGlnIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoc2VydmljZUtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KTsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5MQogICAgLy8gKHsgc3RhdHVzLCBwYXlvdXRBZGRyZXNzLCB0aXRsZSwgZGVzY3JpcHRpb24sIGJhbm5lckltYWdlLCBoaWdobGlnaHRNZXNzYWdlLCBoaWdobGlnaHRDb2xvciB9ID0gY2xvbmUodGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS52YWx1ZSkpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGNvdmVyIDUKICAgIGR1cAogICAgcHVzaGludHMgNDEgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgOAogICAgZHVwCiAgICBwdXNoaW50IDExNwogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIHB1c2hpbnQgMTE3CiAgICB1bmNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgNwogICAgZHVwCiAgICBwdXNoaW50IDc1CiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGR1cDIKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAyCiAgICBjb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDcKICAgIGR1cAogICAgcHVzaGludHMgNzcgMzYKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBjb3ZlciA2CiAgICBkdXAKICAgIHB1c2hpbnQgMTEzCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGNvdmVyIDUKICAgIHB1c2hpbnRzIDExNCAzCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkyCiAgICAvLyBpZiAocGF5b3V0QWRkcmVzcyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9pZl9lbHNlQDkKICAgIGRpZyAyCiAgICBidXJ5IDExCiAgICBiIGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaXNGaXJzdFN1YnNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzRmlyc3RTdWJzY3JpcHRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYxNwogICAgLy8gcmV0dXJuICF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2VMaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U2VydmljZUxpc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MjAKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxNCAvLyAibSIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MjIKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U2VydmljZUxpc3RfdGVybmFyeV9mYWxzZUAzCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQoKZ2V0U2VydmljZUxpc3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFNlcnZpY2VMaXN0X3Rlcm5hcnlfZmFsc2VAMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjIyCiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbkxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdWJzY3JpcHRpb25MaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjI1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDE1IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYyNwogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpnZXRTdWJzY3JpcHRpb25MaXN0X3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYyNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRTdWJzY3JpcHRpb25MaXN0X3Rlcm5hcnlfZmFsc2VAMzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjI3CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMgPyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg3CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4OQogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTAKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkwOQogICAgLy8gcmV0dXJuIGVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpID8gMCA6IDEKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBwb3AKICAgICEKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNCAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgKwogICAgKgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMzUgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTgKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA4CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYm56IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBieXRlY18zIC8vICIiCiAgICAhPQogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlYyAxNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMTYKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDQ1IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODgKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlYyAxNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgZGlnIDYKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldlc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgYnl0ZWMgMTMgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNAogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkwOQogICAgLy8gcmV0dXJuIGVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpID8gMCA6IDEKICAgIGRpZyA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBbYXNzZXQuaWRdLAogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgMzkgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg3CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTA5CiAgICAvLyByZXR1cm4gZXNjcm93LmlzT3B0ZWRJbihhc3NldCkgPyAwIDogMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNgogICAgLy8gcmV0dXJuIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgICsKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4udXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE2IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI4IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDQ1IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA0MCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxNiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjggLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3RhcnREYXRlOiB1aW50NjQsIGludGVydmFsOiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2V0TGF0ZXN0V2luZG93U3RhcnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gcHJpdmF0ZSBnZXRMYXRlc3RXaW5kb3dTdGFydChzdGFydERhdGU6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk1CiAgICAvLyByZXR1cm4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtICgoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCAtIHN0YXJ0RGF0ZSkgJSBpbnRlcnZhbCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGR1cAogICAgZnJhbWVfZGlnIC0yCiAgICAtCiAgICBmcmFtZV9kaWcgLTEKICAgICUKICAgIC0KICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0QmxvY2tLZXkoYWRkcmVzczogYnl0ZXMsIGJsb2NrZWQ6IGJ5dGVzKSAtPiBieXRlczoKZ2V0QmxvY2tLZXk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gcHJpdmF0ZSBnZXRCbG9ja0tleShhZGRyZXNzOiBBY2NvdW50LCBibG9ja2VkOiBBY2NvdW50KTogQmxvY2tMaXN0S2V5IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGFkZHJlc3M6IGFkZHJlc3MuYnl0ZXMuc2xpY2UoMCwgMTYpLnRvRml4ZWQoeyBsZW5ndGg6IDE2IH0pLAogICAgZnJhbWVfZGlnIC0yCiAgICBzdWJzdHJpbmcgMCAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBhc3NlcnQgLy8gTGVuZ3RoIG11c3QgYmUgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyBibG9ja2VkOiBibG9ja2VkLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIGZyYW1lX2RpZyAtMQogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5OS0yMDIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGFkZHJlc3M6IGFkZHJlc3MuYnl0ZXMuc2xpY2UoMCwgMTYpLnRvRml4ZWQoeyBsZW5ndGg6IDE2IH0pLAogICAgLy8gICBibG9ja2VkOiBibG9ja2VkLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIC8vIH0KICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRQcmV2aW91c1dpbmRvd1N0YXJ0KGN1cnJlbnRXaW5kb3dTdGFydDogdWludDY0LCBpbnRlcnZhbDogdWludDY0KSAtPiB1aW50NjQ6CmdldFByZXZpb3VzV2luZG93U3RhcnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIwNgogICAgLy8gcHJpdmF0ZSBnZXRQcmV2aW91c1dpbmRvd1N0YXJ0KGN1cnJlbnRXaW5kb3dTdGFydDogdWludDY0LCBpbnRlcnZhbDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIHJldHVybiBjdXJyZW50V2luZG93U3RhcnQgPj0gaW50ZXJ2YWwgPyBjdXJyZW50V2luZG93U3RhcnQgLSBpbnRlcnZhbCA6IDAKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICA+PQogICAgYnogZ2V0UHJldmlvdXNXaW5kb3dTdGFydF90ZXJuYXJ5X2ZhbHNlQDIKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICAtCiAgICByZXRzdWIKCmdldFByZXZpb3VzV2luZG93U3RhcnRfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIHJldHVybiBjdXJyZW50V2luZG93U3RhcnQgPj0gaW50ZXJ2YWwgPyBjdXJyZW50V2luZG93U3RhcnQgLSBpbnRlcnZhbCA6IDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmVuc3VyZVBhc3Nlc1JlcHJpY2VkKCkgLT4gdm9pZDoKZW5zdXJlUGFzc2VzUmVwcmljZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0MwogICAgLy8gaWYgKCF0aGlzLnBhc3Nlc1JlcHJpY2VkQXQuaGFzVmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gcGFzc2VzUmVwcmljZWRBdCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFN1YnNjcmlwdGlvbnNHbG9iYWxTdGF0ZUtleVBhc3Nlc1JlcHJpY2VkQXQgfSkKICAgIGJ5dGVjIDE5IC8vICJwYXNzZXNfcmVwcmljZWRfYXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0MwogICAgLy8gaWYgKCF0aGlzLnBhc3Nlc1JlcHJpY2VkQXQuaGFzVmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGJueiBlbnN1cmVQYXNzZXNSZXByaWNlZF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBwYXNzZXNSZXByaWNlZEF0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogU3Vic2NyaXB0aW9uc0dsb2JhbFN0YXRlS2V5UGFzc2VzUmVwcmljZWRBdCB9KQogICAgYnl0ZWMgMTkgLy8gInBhc3Nlc19yZXByaWNlZF9hdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ0CiAgICAvLyB0aGlzLnBhc3Nlc1JlcHJpY2VkQXQudmFsdWUgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBhcHBfZ2xvYmFsX3B1dAoKZW5zdXJlUGFzc2VzUmVwcmljZWRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRBbW91bnRzKGFtb3VudDogdWludDY0KSAtPiBieXRlczoKZ2V0QW1vdW50czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ4CiAgICAvLyBwcml2YXRlIGdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpOiBBbW91bnRzIHsKICAgIHByb3RvIDEgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDUKICAgIC8vIGNvbnN0IFtzdWJzY3JpcHRpb25GZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzU3Vic2NyaXB0aW9uRmVlcykpCiAgICBieXRlYyAyOSAvLyAic3Vic2NyaXB0aW9uX2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBsZXQgYWtpdGFGZWU6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gaWYgKGZlZXMucGF5bWVudFBlcmNlbnRhZ2UgPiAwKSB7CiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGZyYW1lX2RpZyAyCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1NAogICAgLy8gaWYgKGFraXRhRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIGFraXRhRmVlID0gMgogICAgaW50Y18zIC8vIDIKICAgIGZyYW1lX2J1cnkgMQoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gbGV0IHRyaWdnZXJGZWU6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBpZiAoZmVlcy50cmlnZ2VyUGVyY2VudGFnZSA+IDApIHsKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIGlmICh0cmlnZ2VyRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gdHJpZ2dlckZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyBjb25zdCBsZWZ0T3ZlcjogdWludDY0ID0gYW1vdW50IC0gKGFraXRhRmVlICsgdHJpZ2dlckZlZSkKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjktMjczCiAgICAvLyByZXR1cm4gewogICAgLy8gICBha2l0YUZlZTogYWtpdGFGZWUsCiAgICAvLyAgIHRyaWdnZXJGZWU6IHRyaWdnZXJGZWUsCiAgICAvLyAgIGxlZnRPdmVyOiBsZWZ0T3ZlciwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jcmVhdGVTdWJzY3JpcHRpb24ocGF5bWVudDogdWludDY0LCBhc2E6IHVpbnQ2NCwgeGZlcjogdWludDY0LCByZWNpcGllbnQ6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCwgc2VydmljZUlEOiB1aW50NjQsIHJlZmVycmVyOiBieXRlcywgd2FsbGV0OiB1aW50NjQsIHByaW5jaXBhbDogYnl0ZXMpIC0+IHVpbnQ2NDoKY3JlYXRlU3Vic2NyaXB0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMDMtMzE0CiAgICAvLyBwcml2YXRlIGNyZWF0ZVN1YnNjcmlwdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc2E6IGJvb2xlYW4sCiAgICAvLyAgIHhmZXI6IHVpbnQ2NCwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHJlZmVycmVyOiBBY2NvdW50LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NCwKICAgIC8vICAgcHJpbmNpcGFsOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTAgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gdGhpcy5lbnN1cmVQYXNzZXNSZXByaWNlZCgpCiAgICBjYWxsc3ViIGVuc3VyZVBhc3Nlc1JlcHJpY2VkCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTcKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmV4aXN0cywgZXJyQmxvY2tlZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA0NCAvLyAiRVJSOmVyckJsa2QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmxrZAoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGxldCBnYXRlSUQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gY29uc3QgYXNzZXQ6IHVpbnQ2NCA9IGFzYSA/IGd0eG4uQXNzZXRUcmFuc2ZlclR4bih4ZmVyKS54ZmVyQXNzZXQuaWQgOiAwCiAgICBmcmFtZV9kaWcgLTkKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X2ZhbHNlQDQKICAgIGZyYW1lX2RpZyAtOAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICBmcmFtZV9kaWcgLTgKICAgIGd0eG5zIFhmZXJBc3NldAoKY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA3IC8vIDYwNTAwCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI3CiAgICAvLyBpZiAoc2VydmljZUlEICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTQKICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgLTcKICAgIGZyYW1lX2J1cnkgMAoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxNSAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBjb25zdCBuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyID0gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUxCiAgICAvLyBjb25zdCBuZWVkc1N1YnNjcmlwdGlvbnNMaXN0Qm94TWJyID0gIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICBib3hfbGVuCiAgICBmcmFtZV9idXJ5IDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTUKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgMTUgLy8gImwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8gY29uc3Qgc3Vic2NyaXB0aW9uSUQgPSB0aGlzLm5ld1N1YnNjcmlwdGlvbklEKFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODUKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4NS0yODcKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLmV4aXN0cwogICAgLy8gICA/IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykudmFsdWUKICAgIC8vICAgOiAxCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9mYWxzZUA0NwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODYKICAgIC8vID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgY292ZXIgMgoKY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfbWVyZ2VANDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA9IGlkICsgMQogICAgZGlnIDIKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTMKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbktleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZDogc3Vic2NyaXB0aW9uSUQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyBpZiAobmVlZHNTdWJzY3JpcHRpb25zTGlzdEJveE1icikgewogICAgZnJhbWVfZGlnIDIKICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5zdWJzY3JpcHRpb25zbGlzdAogICAgZnJhbWVfZGlnIDMKICAgIGludGMgNSAvLyAxODkwMAogICAgKwogICAgZnJhbWVfYnVyeSAzCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyBjb25zdCBzdG9yZXNQcmluY2lwYWwgPSB3YWxsZXQgIT09IDAgJiYgZ2F0ZUlEICE9PSAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9ib29sX2ZhbHNlQDIyCiAgICBkaWcgMgogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2Jvb2xfZmFsc2VAMjIKICAgIGludGNfMSAvLyAxCiAgICBjb3ZlciAzCgpjcmVhdGVTdWJzY3JpcHRpb25fYm9vbF9tZXJnZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU5CiAgICAvLyBpZiAoc3RvcmVzUHJpbmNpcGFsKSB7CiAgICBkaWcgMwogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzYwCiAgICAvLyBtYnJBbW91bnQgKz0gU3Vic2NyaXB0aW9uUHJpbmNpcGFsTUJSCiAgICBmcmFtZV9kaWcgMwogICAgaW50YyA4IC8vIDM0OTAwCiAgICArCiAgICBmcmFtZV9idXJ5IDMKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHMoYW1vdW50KQogICAgZnJhbWVfZGlnIC02CiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjQKICAgIC8vIGNvbnN0IGFraXRhRmVlczogdWludDY0ID0gYW1vdW50cy5ha2l0YUZlZSArIGFtb3VudHMudHJpZ2dlckZlZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIGFzc2V0LCBha2l0YUZlZXMsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIGFzc2V0LCBha2l0YUZlZXMsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCBhc3NldCwgYWtpdGFGZWVzLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgZnJhbWVfZGlnIC0zCiAgICBkaWcgNAogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudFRvCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgNAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2NwogICAgLy8gY29uc3QgcmVxdWlyZWQ6IHVpbnQ2NCA9IG1ickFtb3VudCArIHJlZmVycmFsTWJyICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgMwogICAgKwogICAgZnJhbWVfZGlnIC0xMAogICAgZ3R4bnMgU2VuZGVyCiAgICBkdXAKICAgIGNvdmVyIDYKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA2IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyBjb25zdCByZXF1aXJlZDogdWludDY0ID0gbWJyQW1vdW50ICsgcmVmZXJyYWxNYnIgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgICsKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzcyCiAgICAvLyBpZiAoYXNhKSB7CiAgICBmcmFtZV9kaWcgLTkKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9lbHNlX2JvZHlAMzUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzczCiAgICAvLyBjb25zdCBhc3NldFhmZXIgPSBndHhuLkFzc2V0VHJhbnNmZXJUeG4oeGZlcikKICAgIGZyYW1lX2RpZyAtOAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKGFzc2V0WGZlci54ZmVyQXNzZXQpLCBlcnJOb3RPcHRlZEluKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oYXNzZXRYZmVyLnhmZXJBc3NldCksIGVyck5vdE9wdGVkSW4pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTgKICAgIGd0eG5zIFhmZXJBc3NldAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDI4CiAgICBieXRlYyAzMCAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgwLTM4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODAtMzg1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODAtMzg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHJlcXVpcmVkKQogICAgZnJhbWVfZGlnIC0xMAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiBhc3NlcnRFeGFjdFBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzkyCiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTgKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTgKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzEKICAgIGJ5dGVjIDQ2IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTQKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gYW1vdW50LCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTgKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkdXAKICAgIGZyYW1lX2RpZyAtNgogICAgPj0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDMzCiAgICBieXRlYyA0NiAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk2LTQwMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMAogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIHVuY292ZXIgNgogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTYtNDAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk2LTQwMgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDQKICAgIC8vIGVzY3Jvd2VkID0gYXNzZXRYZmVyLmFzc2V0QW1vdW50IC0gYW1vdW50CiAgICBmcmFtZV9kaWcgLTYKICAgIC0KCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDQyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MjctNDM4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZCwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgZnJhbWVfZGlnIC03CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gc3RyZWFrOiAxLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDI3LTQzOAogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBmcmFtZV9kaWcgMQogICAgY29uY2F0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MjctNDM4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsKICAgIC8vICAgcmVjaXBpZW50OiByZWNpcGllbnQsCiAgICAvLyAgIHNlcnZpY2VJRCwKICAgIC8vICAgc3RhcnREYXRlOiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBsYXN0UGF5bWVudDogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgc3RyZWFrOiAxLAogICAgLy8gICBlc2Nyb3dlZCwKICAgIC8vIH0KICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBpZiAoc3RvcmVzUHJpbmNpcGFsKSB7CiAgICB1bmNvdmVyIDMKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDQ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0MQogICAgLy8gdGhpcy5wcmluY2lwYWxzKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7IHdhbGxldCwgcHJpbmNpcGFsIH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBwcmluY2lwYWxzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uUHJpbmNpcGFsPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFByaW5jaXBhbHMgfSkKICAgIGJ5dGVjIDIwIC8vICJpIgogICAgZnJhbWVfZGlnIDEKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NDEKICAgIC8vIHRoaXMucHJpbmNpcGFscyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0geyB3YWxsZXQsIHByaW5jaXBhbCB9CiAgICBzd2FwCiAgICBib3hfcHV0CgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ0CiAgICAvLyByZWNvcmRQYXllcih0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uS2V5KS5rZXksIHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQ2CiAgICAvLyByZXR1cm4gc3Vic2NyaXB0aW9uSUQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjcmVhdGVTdWJzY3JpcHRpb25fZWxzZV9ib2R5QDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIGFzc2VydFBsYWluUGF5bWVudChwYXltZW50KQogICAgZnJhbWVfZGlnIC0xMAogICAgY2FsbHN1YiBhc3NlcnRQbGFpblBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDA3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzcKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA+PSAoYW1vdW50ICsgcmVxdWlyZWQpLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMTAKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBjb3ZlciA5CiAgICBmcmFtZV9kaWcgLTYKICAgIHVuY292ZXIgNQogICAgKwogICAgZHVwCiAgICBjb3ZlciAyCiAgICA+PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzkKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MTAtNDE1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA2IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxMC00MTQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxMC00MTUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE3LTQyMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyMAogICAgLy8gYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICB1bmNvdmVyIDYKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE3LTQyMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE3LTQyMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGVzY3Jvd2VkID0gcGF5bWVudC5hbW91bnQgLSAoYW1vdW50ICsgcmVxdWlyZWQpCiAgICB1bmNvdmVyIDYKICAgIHN3YXAKICAgIC0KICAgIGIgY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VANDIKCmNyZWF0ZVN1YnNjcmlwdGlvbl9ib29sX2ZhbHNlQDIyOgogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDMKICAgIGIgY3JlYXRlU3Vic2NyaXB0aW9uX2Jvb2xfbWVyZ2VAMjMKCmNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X2ZhbHNlQDQ3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyODcKICAgIC8vIDogMQogICAgaW50Y18xIC8vIDEKICAgIGNvdmVyIDIKICAgIGIgY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfbWVyZ2VANDgKCmNyZWF0ZVN1YnNjcmlwdGlvbl9pZl9ib2R5QDY6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfQogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTcKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgNCAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c0FjdGl2ZSwgZXJyU2VydmljZUlzTm90QWN0aXZlKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxNyAvLyAweDE0CiAgICA9PQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDQyIC8vICJFUlI6ZXJyU25hYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmFjCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzYKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlLmFzc2V0ID09PSBhc3NldCwgZXJyQXNhTWlzbWF0Y2gpCiAgICBkdXAKICAgIHB1c2hpbnQgOQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMgogICAgPT0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAyNiAvLyAiRVJSOmVyckFzYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQXNhbQoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyBhbW91bnQgPSBzZXJ2aWNlLmFtb3VudAogICAgZHVwbiAyCiAgICBwdXNoaW50IDE3CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgLTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyBpbnRlcnZhbCA9IHNlcnZpY2UuaW50ZXJ2YWwKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfYnVyeSAtNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDAKICAgIC8vIGdhdGVJRCA9IHNlcnZpY2UuZ2F0ZUlECiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDIKICAgIC8vIGlmIChzZXJ2aWNlLnBheW91dEFkZHJlc3MgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgcHVzaGludHMgNDEgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE0CiAgICBmcmFtZV9kaWcgLTcKICAgIGZyYW1lX2J1cnkgMAoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0NgogICAgLy8gaWYgKHNlcnZpY2UucGFzc2VzID4gMCkgewogICAgcHVzaGludCAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5wYXNzZXMKICAgIGludGMgMTAgLy8gMTQ0MjAwCiAgICBmcmFtZV9idXJ5IDMKICAgIGIgY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTcKCmNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X2ZhbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gY29uc3QgYXNzZXQ6IHVpbnQ2NCA9IGFzYSA/IGd0eG4uQXNzZXRUcmFuc2ZlclR4bih4ZmVyKS54ZmVyQXNzZXQuaWQgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jYW5UcmlnZ2VyKGtleTogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CmNhblRyaWdnZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gcHJpdmF0ZSBjYW5UcmlnZ2VyKGtleTogU3Vic2NyaXB0aW9uS2V5KTogYm9vbGVhbiB7CiAgICBwcm90byAxIDIKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGlmICghdGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2MgogICAgLy8gfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfYnVyeSAxCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDIKICAgIGR1cAogICAgcHVzaGludCA4MAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIGR1cAogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2NAogICAgLy8gY29uc3QgYmxvY2tzS2V5ID0gdGhpcy5nZXRCbG9ja0tleShyZWNpcGllbnQsIGtleS5hZGRyZXNzKQogICAgZnJhbWVfZGlnIC0xCiAgICBleHRyYWN0IDAgMzIKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTczCiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2NwogICAgLy8gaWYgKHRoaXMuYmxvY2tzKGJsb2Nrc0tleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDczLTQ3NwogICAgLy8gc2VydmljZUlEID4gMCAmJgogICAgLy8gKAogICAgLy8gICAhdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMgfHwKICAgIC8vICAgdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgLy8gKQogICAgZnJhbWVfZGlnIDIKICAgIGJ6IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NQogICAgLy8gIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICBmcmFtZV9kaWcgMgogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjYW5UcmlnZ2VyX2lmX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBieXRlYyAxMSAvLyAweDI4CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzUtNDc2CiAgICAvLyAhdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMgfHwKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGJ6IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUA4CgpjYW5UcmlnZ2VyX2lmX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0ODMKICAgIC8vIGlmIChsYXN0UGF5bWVudCA+PSB0aGlzLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN0YXJ0RGF0ZSwgaW50ZXJ2YWwpKSB7CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnZXRMYXRlc3RXaW5kb3dTdGFydAogICAgdW5jb3ZlciAzCiAgICA8PQogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4NAogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4NwogICAgLy8gaWYgKGFtb3VudCA+IGVzY3Jvd2VkKSB7CiAgICA8CiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg4CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDkxCiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5UmVmZXJyZXIoKSAtPiBieXRlczoKbGVnYWN5UmVmZXJyZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNAogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUyNAogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGxlZ2FjeVdhbGxldE9mCiAgICBjYWxsc3ViIHJlZmVycmVyT3JaZXJvQWRkcmVzcwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zdWJzY3JpYmVJbXBsKHBheW1lbnQ6IHVpbnQ2NCwgYXNhOiB1aW50NjQsIHhmZXI6IHVpbnQ2NCwgZ2F0ZWQ6IHVpbnQ2NCwgZ2F0ZTogdWludDY0LCByZWNpcGllbnQ6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCwgc2VydmljZUlEOiB1aW50NjQsIHdhbGxldDogdWludDY0LCBsZWdhY3k6IHVpbnQ2NCkgLT4gdWludDY0OgpzdWJzY3JpYmVJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NjItNTc0CiAgICAvLyBwcml2YXRlIHN1YnNjcmliZUltcGwoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNhOiBib29sZWFuLAogICAgLy8gICB4ZmVyOiB1aW50NjQsCiAgICAvLyAgIGdhdGVkOiBib29sZWFuLAogICAgLy8gICBnYXRlOiB1aW50NjQsCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NCwKICAgIC8vICAgbGVnYWN5OiBib29sZWFuCiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTEgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MzMKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPj0gTUlOX0FNT1VOVCwgZXJyTWluQW1vdW50SXNUaHJlZSkKICAgIGZyYW1lX2RpZyAtNQogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfYXNzZXJ0QDIyCiAgICBieXRlYyA0NyAvLyAiRVJSOmVyck1hbXQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWFtdAoKc3Vic2NyaWJlSW1wbF9hZnRlcl9hc3NlcnRAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgZXJyTWluSW50ZXJ2YWxJc1NpeHR5KQogICAgZnJhbWVfZGlnIC00CiAgICBwdXNoaW50IDYwCiAgICA+PQogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlYyA0OCAvLyAiRVJSOmVyck1pbnYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWludgoKc3Vic2NyaWJlSW1wbF9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNwogICAgLy8gaWYgKGdhdGVkKSB7CiAgICBmcmFtZV9kaWcgLTgKICAgIGJ6IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlSUQgIT09IDAsIGVyck5vdEFTZXJ2aWNlKQogICAgZnJhbWVfZGlnIC0zCiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDI3CiAgICBieXRlYyA0OSAvLyAiRVJSOmVyck5zdmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnN2YwoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDEKICAgIC8vIGlmIChzZXJ2aWNlSUQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAyOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCgpzdWJzY3JpYmVJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jaGVja1N1YnNjcmliZUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyBpZiAobGVnYWN5KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3OAogICAgLy8gY29uc3QgbGVnYWN5V2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3OAogICAgLy8gY29uc3QgbGVnYWN5V2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGxlZ2FjeVdhbGxldE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3OQogICAgLy8gaWYgKGdhdGVkKSB7CiAgICBmcmFtZV9kaWcgLTgKICAgIGJ6IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhndHhuLkFwcGxpY2F0aW9uQ2FsbFR4bihnYXRlKSwgdGhpcy5ha2l0YURBTy52YWx1ZSwgbGVnYWN5T3JpZ2luT3JUeG5TZW5kZXIobGVnYWN5V2FsbGV0KSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGd0eG4uQXBwbGljYXRpb25DYWxsVHhuKGdhdGUpLCB0aGlzLmFraXRhREFPLnZhbHVlLCBsZWdhY3lPcmlnaW5PclR4blNlbmRlcihsZWdhY3lXYWxsZXQpLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQzCiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMxNAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBkaWcgMQogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAxMwoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4oZ2F0ZSksIHRoaXMuYWtpdGFEQU8udmFsdWUsIGxlZ2FjeU9yaWdpbk9yVHhuU2VuZGVyKGxlZ2FjeVdhbGxldCksIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBmcmFtZV9kaWcgLTcKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBmcmFtZV9kaWcgMAogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VANQogICAgYnl0ZWMgMjEgLy8gIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODIKICAgIC8vIHJldHVybiB0aGlzLmNyZWF0ZVN1YnNjcmlwdGlvbihwYXltZW50LCBhc2EsIHhmZXIsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0KSwgMCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgY2FsbHN1YiByZWZlcnJlck9yWmVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgZnJhbWVfZGlnIC0xMQogICAgZnJhbWVfZGlnIC0xMAogICAgZnJhbWVfZGlnIC05CiAgICBmcmFtZV9kaWcgLTYKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgOAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgOQogICAgY2FsbHN1YiBjcmVhdGVTdWJzY3JpcHRpb24KICAgIHN3YXAKICAgIHJldHN1YgoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTcKICAgIC8vIGNvbnN0IG9yaWdpbiA9IGdldE9yaWdpbkFjY291bnQod2FsbGV0SUQpCiAgICBkaWcgMQogICAgZHVwCiAgICBjYWxsc3ViIGdldE9yaWdpbkFjY291bnQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMxOAogICAgLy8gaWYgKG9yaWdpbiAhPT0gd2FsbGV0SUQuYWRkcmVzcyAmJiBvcmlnaW4gIT09IFR4bi5zZW5kZXIgJiYgb3JpZ2luLmF1dGhBZGRyZXNzICE9PSB3YWxsZXRJRC5hZGRyZXNzKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAhPQogICAgYnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDE3CiAgICBkdXAKICAgIHR4biBTZW5kZXIKICAgICE9CiAgICBieiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGR1cAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBkaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAxNwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MwogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgYiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JAMTgKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDMKICAgIC8vIHJldHVybiBsZWdhY3lPcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgc3Vic2NyaWJlSW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDE4CgpzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBjb25zdCBwID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBjb25zdCBwID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODYKICAgIC8vIGlmIChnYXRlZCkgewogICAgZnJhbWVfZGlnIC04CiAgICBieiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrQ3R4KGd0eG4uQXBwbGljYXRpb25DYWxsVHhuKGdhdGUpLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHApLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgZnJhbWVfZGlnIC03CiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODcKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4oZ2F0ZSksIHRoaXMuYWtpdGFEQU8udmFsdWUsIGdhdGVDdHgocCksIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBnYXRlQ3R4CiAgICBjb3ZlciAyCiAgICBmcmFtZV9kaWcgLTcKICAgIGNvdmVyIDIKICAgIGZyYW1lX2RpZyAwCiAgICBjYWxsc3ViIGdhdGVDaGVja0N0eAogICAgcG9wCiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDEwCiAgICBieXRlYyAyMSAvLyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIHJldHVybiB0aGlzLmNyZWF0ZVN1YnNjcmlwdGlvbihwYXltZW50LCBhc2EsIHhmZXIsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCBwLnJlZmVycmVyLCBwLndhbGxldCwgcC5wcmluY2lwYWwpCiAgICBkdXAKICAgIGV4dHJhY3QgMTA0IDMyCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgOCAzMgogICAgZnJhbWVfZGlnIC0xMQogICAgZnJhbWVfZGlnIC0xMAogICAgZnJhbWVfZGlnIC05CiAgICBmcmFtZV9kaWcgLTYKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIGNhbGxzdWIgY3JlYXRlU3Vic2NyaXB0aW9uCiAgICBzd2FwCiAgICByZXRzdWIKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfYXNzZXJ0QDMxCiAgICBieXRlYyA0IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzdWJzY3JpYmVJbXBsX2FmdGVyX2Fzc2VydEAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ2CiAgICAvLyBjb25zdCBnYXRlSUQgPSB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLmdhdGVJRAogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTQ3CiAgICAvLyBpZiAoIWdhdGVkKSB7CiAgICBmcmFtZV9kaWcgLTgKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5jaGVja1N1YnNjcmliZUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NDgKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlSUQgPT09IDAsIGVyckhhc0dhdGUpCiAgICBmcmFtZV9kaWcgMAogICAgYnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY2hlY2tTdWJzY3JpYmVAMzUKICAgIHB1c2hieXRlcyAiRVJSOmVyckhndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySGd0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlckdhdGVJRChrZXk6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgp0cmlnZ2VyR2F0ZUlEOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIHByaXZhdGUgdHJpZ2dlckdhdGVJRChrZXk6IFN1YnNjcmlwdGlvbktleSk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwLTE1MgogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA1IC8vICJzIgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHRyaWdnZXJHYXRlSURfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCnRyaWdnZXJHYXRlSURfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gY29uc3QgeyBzZXJ2aWNlSUQsIHJlY2lwaWVudCB9ID0gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlcnZpY2VJRCAhPT0gMCwgZXJyTm90QVNlcnZpY2UpCiAgICBibnogdHJpZ2dlckdhdGVJRF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNDkgLy8gIkVSUjplcnJOc3ZjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5zdmMKCnRyaWdnZXJHYXRlSURfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MDAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHRyaWdnZXJHYXRlSURfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnRyaWdnZXJHYXRlSURfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwMQogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuZ2F0ZUlECiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyQ3R4KGtleTogYnl0ZXMsIHA6IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXMsIGJ5dGVzOgp0cmlnZ2VyQ3R4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIHByaXZhdGUgdHJpZ2dlckN0eChrZXk6IFN1YnNjcmlwdGlvbktleSwgcDogUHJpbmNpcGFsKTogR2F0ZUN0eCB7CiAgICBwcm90byAyIDMKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBwcmluY2lwYWxzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uUHJpbmNpcGFsPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFByaW5jaXBhbHMgfSkKICAgIGJ5dGVjIDIwIC8vICJpIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIGlmICh0aGlzLnByaW5jaXBhbHMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogdHJpZ2dlckN0eF9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIGNvbnN0IHN0b3JlZCA9IGNsb25lKHRoaXMucHJpbmNpcGFscyhrZXkpLnZhbHVlKQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE5CiAgICAvLyBpZiAocC53YWxsZXQgIT09IDAgJiYgcC53YWxsZXQgPT09IHN0b3JlZC53YWxsZXQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgYnogdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyMAogICAgLy8gcmV0dXJuIGdhdGVDdHgocCkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBnYXRlQ3R4CiAgICBmcmFtZV9idXJ5IC0xCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIHJldHN1YgoKdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyMgogICAgLy8gd2FsbGV0ID0gc3RvcmVkLndhbGxldAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBwcmluY2lwYWwgPSBhdFJlc3RQcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcywgc3RvcmVkLndhbGxldCwgc3RvcmVkLnByaW5jaXBhbCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyMwogICAgLy8gcHJpbmNpcGFsID0gYXRSZXN0UHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MsIHN0b3JlZC53YWxsZXQsIHN0b3JlZC5wcmluY2lwYWwpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBleHRyYWN0IDAgMzIKICAgIGR1cAogICAgY292ZXIgMwogICAgY292ZXIgNAogICAgc3dhcAogICAgZXh0cmFjdCA4IDMyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk1OAogICAgLy8gcmV0dXJuIGF0UmVzdFByaW5jaXBhbChnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWNjb3VudCwgd2FsbGV0LCBzdG9yZWQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNzEKICAgIC8vIGlmIChzdG9yZWQgPT09IGFjY291bnQpIHsKICAgID09CiAgICBieiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAMTMKICAgIHBvcAogICAgYnVyeSAxCiAgICBzd2FwCgp0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyB3YWxsZXQ6IG93bnNBdFJlc3RPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQsIGtleS5hZGRyZXNzKSA/IHdhbGxldCA6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MzQKICAgIC8vIHdhbGxldDogb3duc0F0UmVzdE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCwga2V5LmFkZHJlc3MpID8gd2FsbGV0IDogMCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTUzCiAgICAvLyByZXR1cm4gb3duc0F0UmVzdChnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgd2FsbGV0LCBhY2NvdW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMwogICAgY2FsbHN1YiBvd25zQXRSZXN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gd2FsbGV0OiBvd25zQXRSZXN0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0LCBrZXkuYWRkcmVzcykgPyB3YWxsZXQgOiAwLAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MzEtNjM2CiAgICAvLyByZXR1cm4gewogICAgLy8gICBwcmluY2lwYWwsCiAgICAvLyAgIC8vIHRoZSB3YWxsZXQgb25seSBjb3VudHMgd2hpbGUgaXQgb3ducyB0aGUgc3Vic2NyaWJlciBhdCByZXN0IChubyB3YWxsZXQtZ2xvYmFsIHJlYWRzKQogICAgLy8gICB3YWxsZXQ6IG93bnNBdFJlc3RPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQsIGtleS5hZGRyZXNzKSA/IHdhbGxldCA6IDAsCiAgICAvLyAgIHNwZW5kZXI6IGtleS5hZGRyZXNzLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgp0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI3NAogICAgLy8gaWYgKCFvd25zQXRSZXN0KHdhbGxldEZhY3RvcnksIHdhbGxldCwgYWNjb3VudCkpIHsKICAgIGRpZyAxCiAgICBkaWcgNAogICAgY2FsbHN1YiBvd25zQXRSZXN0CiAgICBibnogdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDE1CiAgICBidXJ5IDEKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTU4CiAgICAvLyByZXR1cm4gYXRSZXN0UHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhY2NvdW50LCB3YWxsZXQsIHN0b3JlZCkKICAgIGIgdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDgKCnRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzkKICAgIC8vIGNvbnN0IFthZGRyZXNzXSA9IG9wLkFwcFBhcmFtcy5hcHBBZGRyZXNzKHdhbGxldCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgcG9wCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6Mjc4CiAgICAvLyBpZiAoc3RvcmVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkaWcgMwogICAgPT0KICAgIGJ6IHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNzkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MgPyBzdG9yZWQgOiBhY2NvdW50CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTU4CiAgICAvLyByZXR1cm4gYXRSZXN0UHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhY2NvdW50LCB3YWxsZXQsIHN0b3JlZCkKICAgIGIgdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDgKCnRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI4MQogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yoc3RvcmVkKSA9PT0gd2FsbGV0QWRkcmVzcyA/IHN0b3JlZCA6IGFjY291bnQKICAgIHVuY292ZXIgMgogICAgPT0KICAgIHVuY292ZXIgMwogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk1OAogICAgLy8gcmV0dXJuIGF0UmVzdFByaW5jaXBhbChnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWNjb3VudCwgd2FsbGV0LCBzdG9yZWQpCiAgICBiIHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA4Cgp0cmlnZ2VyQ3R4X2Vsc2VfYm9keUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gY29uc3QgbGVnYWN5V2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIGNvbnN0IGxlZ2FjeVdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjgKICAgIC8vIHByaW5jaXBhbCA9IGxlZ2FjeU9yaWdpbkF0UmVzdE9yKGxlZ2FjeVdhbGxldCwga2V5LmFkZHJlc3MpCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBsZWdhY3lPcmlnaW5BdFJlc3RPcgogICAgYiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlckltcGwoa2V5OiBieXRlcywgZ2F0ZWQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnRyaWdnZXJJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDQKICAgIC8vIHByaXZhdGUgdHJpZ2dlckltcGwoa2V5OiBTdWJzY3JpcHRpb25LZXksIGdhdGVkOiBib29sZWFuKTogdm9pZCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5jYW5UcmlnZ2VyKGtleSksIGVyckNhbm5vdFRyaWdnZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgY2FuVHJpZ2dlcgogICAgZnJhbWVfYnVyeSAtMgogICAgYm56IHRyaWdnZXJJbXBsX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJDdHJnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckN0cmcKCnRyaWdnZXJJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAtMTUyCiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDUgLy8gInMiCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCA0OAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1NgogICAgLy8gaWYgKGdhdGVJRCAhPT0gMCkgewogICAgYnogdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVkLCBlcnJJbnZhbGlkU2VxdWVuY2UpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXNlcSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc2VxCgp0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2MQogICAgLy8gaWYgKHNlcnZpY2VJRCAhPT0gMCkgewogICAgZGlnIDIKICAgIGJueiB0cmlnZ2VySW1wbF9pZl9ib2R5QDkKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICB1bmNvdmVyIDIKCnRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3MgogICAgLy8gY29uc3QgYW1vdW50cyA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBkaWcgMgogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3NAogICAgLy8gaWYgKGlzQXNhKSB7CiAgICBkaWcgMgogICAgYnogdHJpZ2dlckltcGxfZWxzZV9ib2R5QDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3Ny02ODMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2ODEKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzctNjgyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3Ny02ODMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NS02OTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2ODcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4OQogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njg1LTY5MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4NS02OTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkzLTY5OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5My02OTgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTMtNjk5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMTUKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlKQogICAgZGlnIDEKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gY29uc3QgY3VycmVudFdpbmRvd1N0YXJ0OiB1aW50NjQgPSB0aGlzLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN1Yi5zdGFydERhdGUsIHN1Yi5pbnRlcnZhbCkKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBwdXNoaW50IDU2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgZ2V0TGF0ZXN0V2luZG93U3RhcnQKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMTgKICAgIC8vIGNvbnN0IGxhc3RXaW5kb3dTdGFydDogdWludDY0ID0gdGhpcy5nZXRQcmV2aW91c1dpbmRvd1N0YXJ0KGN1cnJlbnRXaW5kb3dTdGFydCwgc3ViLmludGVydmFsKQogICAgc3dhcAogICAgY2FsbHN1YiBnZXRQcmV2aW91c1dpbmRvd1N0YXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gaWYgKHN1Yi5sYXN0UGF5bWVudCA8IGxhc3RXaW5kb3dTdGFydCkgewogICAgc3dhcAogICAgcHVzaGludCA4MAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA8CiAgICBieiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDI4CiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIyMgogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuc3RyZWFrID0gMQogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGRpZyAyCiAgICBwdXNoaW50IDg4CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgp0cmlnZ2VySW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaW5jcmVtZW50U3RyZWFrT25QYXltZW50QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLmVzY3Jvd2VkIC09IGFtb3VudAogICAgc3dhcAogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgZGlnIDEKICAgIHB1c2hpbnQgOTYKICAgIHVuY292ZXIgMgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5sYXN0UGF5bWVudCA9IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIHB1c2hpbnQgODAKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBmcmFtZV9kaWcgLTIKICAgIHJldHN1YgoKdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjI3CiAgICAvLyBpZiAoc3ViLmxhc3RQYXltZW50IDwgY3VycmVudFdpbmRvd1N0YXJ0KSB7CiAgICB1bmNvdmVyIDMKICAgIDwKICAgIGJ6IHRyaWdnZXJJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pbmNyZW1lbnRTdHJlYWtPblBheW1lbnRAMzEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjI4CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5zdHJlYWsgKz0gMQogICAgZGlnIDEKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgcHVzaGludCA4OAogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGIgdHJpZ2dlckltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmluY3JlbWVudFN0cmVha09uUGF5bWVudEAzMQoKdHJpZ2dlckltcGxfZWxzZV9ib2R5QDE5OgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzAyLTcwNwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA0CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA1CiAgICAvLyBhbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwMi03MDYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDItNzA3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MDktNzE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzEyCiAgICAvLyBhbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA5LTcxMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA5LTcxNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTYtNzIxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzE5CiAgICAvLyBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTYtNzIwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MTYtNzIxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMjMKCnRyaWdnZXJJbXBsX2lmX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYyCiAgICAvLyBjb25zdCBzZXJ2aWNlS2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgZGlnIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjYzCiAgICAvLyBpZiAodGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHRyaWdnZXJJbXBsX2lmX2JvZHlAMTAKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBiIHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMTQKCnRyaWdnZXJJbXBsX2lmX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gY29uc3QgcGF5b3V0QWRkcmVzcyA9IHRoaXMuc2VydmljZXMoc2VydmljZUtleSkudmFsdWUucGF5b3V0QWRkcmVzcwogICAgcHVzaGludHMgNDEgMzIKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjY1CiAgICAvLyBpZiAocGF5b3V0QWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBibnogdHJpZ2dlckltcGxfaWZfYm9keUAxMQogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIGIgdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAxNAoKdHJpZ2dlckltcGxfaWZfYm9keUAxMToKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICBiIHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMTQKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1NlcnZpY2VJbXBsKHBheW1lbnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHBhc3NlczogdWludDY0LCBnYXRlSUQ6IHVpbnQ2NCwgcGF5b3V0QWRkcmVzczogYnl0ZXMsIHRpdGxlOiBieXRlcywgYmFubmVySW1hZ2U6IGJ5dGVzLCBoaWdobGlnaHRNZXNzYWdlOiBieXRlcywgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzLCByZWZlcnJlcjogYnl0ZXMpIC0+IHVpbnQ2NDoKbmV3U2VydmljZUltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjczMS03NDQKICAgIC8vIHByaXZhdGUgbmV3U2VydmljZUltcGwoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgYXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIHBhc3NlczogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgcGF5b3V0QWRkcmVzczogQWNjb3VudCwKICAgIC8vICAgdGl0bGU6IHN0cmluZywKICAgIC8vICAgYmFubmVySW1hZ2U6IENJRCwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZTogVWludDgsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yOiBieXRlczwzPiwKICAgIC8vICAgcmVmZXJyZXI6IEFjY291bnQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBwcm90byAxMiAxCiAgICBieXRlY18zIC8vICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgMTQgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gY29uc3QgbmVlZHNTZXJ2aWNlc0xpc3RCb3hNYnIgPSAhdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIGNvbnN0IG5lZWRzU2VydmljZXNMaXN0Qm94TWJyID0gIXRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDE0IC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdTZXJ2aWNlSUQoVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc3LTI3OQogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLmV4aXN0cwogICAgLy8gICA/IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlCiAgICAvLyAgIDogMQogICAgYnogbmV3U2VydmljZUltcGxfdGVybmFyeV9mYWxzZUAzNwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCm5ld1NlcnZpY2VJbXBsX3Rlcm5hcnlfbWVyZ2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI4MAogICAgLy8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUgPSBpZCArIDEKICAgIGR1cG4gMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDcKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTAKICAgIC8vIGxvZ2dlZEFzc2VydChhbW91bnQgPj0gTUlOX0FNT1VOVCwgZXJyTWluQW1vdW50SXNUaHJlZSkKICAgIGZyYW1lX2RpZyAtOQogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA0NyAvLyAiRVJSOmVyck1hbXQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWFtdAoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGludGVydmFsID49IE1JTl9JTlRFUlZBTCwgZXJyTWluSW50ZXJ2YWxJc1NpeHR5KQogICAgZnJhbWVfZGlnIC0xMQogICAgcHVzaGludCA2MAogICAgPj0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJNaW52IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1pbnYKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZXMgPD0gTUFYX1BBU1NFUywgZXJyTWF4UGFzc2VzSXNGaXZlKQogICAgZnJhbWVfZGlnIC04CiAgICBwdXNoaW50IDUKICAgIDw9CiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOmVyck14cHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTXhwcwoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEJ5dGVzKHRpdGxlKS5sZW5ndGggPD0gTUFYX1RJVExFX0xFTkdUSCwgZXJyVGl0bGVUb29Mb25nKQogICAgZnJhbWVfZGlnIC01CiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgMgogICAgcHVzaGludCAxMjgKICAgIDw9CiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDQxIC8vICJFUlI6ZXJyVHRsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJUdGxnCgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU3CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU3CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ1CiAgICAvLyBjb25zdCBbc3Vic2NyaXB0aW9uRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1N1YnNjcmlwdGlvbkZlZXMpKQogICAgYnl0ZWMgMjkgLy8gInN1YnNjcmlwdGlvbl9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjAKICAgIC8vIGxldCByZXF1aXJlZEFtb3VudDogdWludDY0ID0gc2VydmljZUNyZWF0aW9uRmVlICsgY29zdHMuc2VydmljZXMKICAgIGludGMgMTEgLy8gMTM3ODkwMAogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjEKICAgIC8vIGlmIChuZWVkc1NlcnZpY2VzTGlzdEJveE1icikgewogICAgZnJhbWVfZGlnIDIKICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2MgogICAgLy8gcmVxdWlyZWRBbW91bnQgKz0gY29zdHMuc2VydmljZXNsaXN0CiAgICBzd2FwCiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIHN3YXAKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEwCiAgICBieiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBlcnJOb3RPcHRlZEluKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2RpZyAtMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAzMCAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpLCBlcnJOb3RPcHRlZEluKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfaWZfZWxzZUAxNgogICAgYnl0ZWMgMzAgLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgMCwgc2VydmljZUNyZWF0aW9uRmVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCAwLCBzZXJ2aWNlQ3JlYXRpb25GZWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDYgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCAwLCBzZXJ2aWNlQ3JlYXRpb25GZWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDYKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50VG8KICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc3CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHJlcXVpcmVkQW1vdW50ICsgcmVmZXJyYWxNYnIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDIKICAgICsKICAgIGZyYW1lX2RpZyAtMTIKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0RXhhY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3OS03ODQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODEKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc5LTc4MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzktNzg0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg2LTc5OQogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIHBhc3NlcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBwYXlvdXRBZGRyZXNzLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb246ICcnLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIHB1c2hieXRlcyAweDBhCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc4Ni03OTkKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBwYXNzZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgcGF5b3V0QWRkcmVzcywKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJywKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yCiAgICAvLyB9CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMTAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC05CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtOAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTcKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC02CiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtNQogICAgY29uY2F0CiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgMHgwMDc1CiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMTE3CiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTQKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEzIC8vIDB4MDAwMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3ODYtNzk5CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXR1czogU2VydmljZVN0YXR1c0RyYWZ0LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgcGFzc2VzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIHBheW91dEFkZHJlc3MsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBkZXNjcmlwdGlvbjogJycsCiAgICAvLyAgIGJhbm5lckltYWdlLAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlLAogICAgLy8gICBoaWdobGlnaHRDb2xvcgogICAgLy8gfQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk1CiAgICAvLyBsZXQgYWN0aXZhdGVkID0gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAoVHhuLmdyb3VwSW5kZXggKyAxKTsgaSA8IEdsb2JhbC5ncm91cFNpemU7IGkgKz0gMSkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBmcmFtZV9idXJ5IDEKCm5ld1NlcnZpY2VJbXBsX3doaWxlX3RvcEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAoVHhuLmdyb3VwSW5kZXggKyAxKTsgaSA8IEdsb2JhbC5ncm91cFNpemU7IGkgKz0gMSkgewogICAgZnJhbWVfZGlnIDEKICAgIGdsb2JhbCBHcm91cFNpemUKICAgIDwKICAgIGJ6IG5ld1NlcnZpY2VJbXBsX2Jsb2NrQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gaWYgKHR4bi50eXBlICE9PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsKSB7CiAgICBmcmFtZV9kaWcgMQogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgIT0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9ibG9ja0AyOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZCwgZXJySW52YWxpZFNlcXVlbmNlKQogICAgZnJhbWVfZGlnIDEKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjMKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXNlcSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc2VxCgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCwgZXJySW52YWxpZFNlcXVlbmNlKQogICAgZnJhbWVfZGlnIDEKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgYnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklzZXEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXNlcQoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyLCBlcnJJbnZhbGlkU2VxdWVuY2UpCiAgICBmcmFtZV9kaWcgMQogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyNwogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJc2VxIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzZXEKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTA4CiAgICAvLyBpZiAodHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuYWN0aXZhdGVTZXJ2aWNlKSkgewogICAgZnJhbWVfZGlnIDEKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJhY3RpdmF0ZVNlcnZpY2UoKXZvaWQiCiAgICA9PQogICAgYnogbmV3U2VydmljZUltcGxfYmxvY2tAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyBhY3RpdmF0ZWQgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpuZXdTZXJ2aWNlSW1wbF9ibG9ja0AzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTE1CiAgICAvLyBsb2dnZWRBc3NlcnQoYWN0aXZhdGVkLCBlcnJTZXJ2aWNlTm90QWN0aXZhdGVkKQogICAgZnJhbWVfZGlnIDAKICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMzMKICAgIHB1c2hieXRlcyAiRVJSOmVyclNuYXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25hdgoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDMKICAgIC8vIHJldHVybiBpZAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCm5ld1NlcnZpY2VJbXBsX2Jsb2NrQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IChUeG4uZ3JvdXBJbmRleCArIDEpOyBpIDwgR2xvYmFsLmdyb3VwU2l6ZTsgaSArPSAxKSB7CiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGZyYW1lX2J1cnkgMQogICAgYiBuZXdTZXJ2aWNlSW1wbF93aGlsZV90b3BAMTkKCm5ld1NlcnZpY2VJbXBsX3Rlcm5hcnlfZmFsc2VAMzc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI3OQogICAgLy8gOiAxCiAgICBpbnRjXzEgLy8gMQogICAgYiBuZXdTZXJ2aWNlSW1wbF90ZXJuYXJ5X21lcmdlQDM4CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zZXJ2aWNlQ29zdChyZWZlcnJlcjogYnl0ZXMpIC0+IHVpbnQ2NDoKc2VydmljZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gcHJpdmF0ZSBzZXJ2aWNlQ29zdChyZWZlcnJlcjogQWNjb3VudCk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODA4CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODA4CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ1CiAgICAvLyBjb25zdCBbc3Vic2NyaXB0aW9uRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1N1YnNjcmlwdGlvbkZlZXMpKQogICAgYnl0ZWMgMjkgLy8gInN1YnNjcmlwdGlvbl9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGNvbnN0IHNlcnZpY2VDcmVhdGlvbkZlZSA9IGdldFN1YnNjcmlwdGlvbkZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuc2VydmljZUNyZWF0aW9uRmVlCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyBsZXQgcmVxdWlyZWRBbW91bnQ6IHVpbnQ2NCA9IHNlcnZpY2VDcmVhdGlvbkZlZSArIGNvc3RzLnNlcnZpY2VzCiAgICBpbnRjIDExIC8vIDEzNzg5MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgMTQgLy8gIm0iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxMgogICAgLy8gaWYgKCF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxMgogICAgLy8gaWYgKCF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNlcnZpY2VDb3N0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIHJlcXVpcmVkQW1vdW50ICs9IGNvc3RzLnNlcnZpY2VzbGlzdAogICAgaW50YyA1IC8vIDE4OTAwCiAgICArCgpzZXJ2aWNlQ29zdF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxNwogICAgLy8gcmV0dXJuIHJlcXVpcmVkQW1vdW50ICsgcmVmZXJyYWxGZWVUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgMCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxNwogICAgLy8gcmV0dXJuIHJlcXVpcmVkQW1vdW50ICsgcmVmZXJyYWxGZWVUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgMCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHJlZmVycmFsRmVlVG8KICAgICsKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaXB0aW9uTWJyKHJlY2lwaWVudDogYnl0ZXMsIHNlcnZpY2VJRDogdWludDY0KSAtPiBieXRlczoKc3Vic2NyaXB0aW9uTWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIHByaXZhdGUgc3Vic2NyaXB0aW9uTWJyKHJlY2lwaWVudDogQWNjb3VudCwgc2VydmljZUlEOiBTZXJ2aWNlSUQpOiBbdWludDY0LCB1aW50NjRdIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIGxldCBtYnJBbW91bnQgPSBjb3N0cy5zdWJzY3JpcHRpb25zCiAgICBpbnRjIDcgLy8gNjA1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI0CiAgICAvLyBsZXQgZ2F0ZUlEOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGlmIChzZXJ2aWNlSUQgIT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2lmX2Vsc2VANgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyNwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnN1YnNjcmlwdGlvbk1icl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODMxLTgzMgogICAgLy8gY29uc3Qgc2VydmljZSA9IGNsb25lKHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZSkKICAgIC8vIGdhdGVJRCA9IHNlcnZpY2UuZ2F0ZUlECiAgICBkdXAKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzIKICAgIC8vIGdhdGVJRCA9IHNlcnZpY2UuZ2F0ZUlECiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gaWYgKHNlcnZpY2UucGFzc2VzID4gMCkgewogICAgcHVzaGludCAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBieiBzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnBhc3NlcwogICAgaW50YyAxMCAvLyAxNDQyMDAKICAgIGZyYW1lX2J1cnkgMAoKc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDE1IC8vICJsIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzkKICAgIC8vIGlmICghdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MzkKICAgIC8vIGlmICghdGhpcy5zdWJzY3JpcHRpb25zbGlzdChUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHN1YnNjcmlwdGlvbk1icl9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQwCiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMuc3Vic2NyaXB0aW9uc2xpc3QKICAgIGZyYW1lX2RpZyAwCiAgICBpbnRjIDUgLy8gMTg5MDAKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODQ1CiAgICAvLyByZXR1cm4gW21ickFtb3VudCwgZ2F0ZUlEXQogICAgZnJhbWVfZGlnIDAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAMAAEIAqCNBtSTAdTeAdTYA9SQArjvBMjmCNSUVCYyCWFraXRhX2RhbwQVH3x1AW8AC0VSUjplcnJTZG5lAXMMYWtpdGFfZXNjcm93C0VSUjplcnJVZG5lA2FhbAEAAWYBKAFiAgAAAW0BbAZ3YWxsZXQBFAFwEnBhc3Nlc19yZXByaWNlZF9hdAFpC0VSUjplcnJGZ3RlC0VSUjplcnJJc2VxC0VSUjplcnJOY2xzC0VSUjplcnJOcmt5CHJlZmVycmVyC0VSUjplcnJBc2FtC0VSUjplcnJJcGF5C0VSUjplcnJOZGFvEXN1YnNjcmlwdGlvbl9mZWVzC0VSUjplcnJOb3B0BMiDUTAEOU6usgVhcHBJRAtFUlI6ZXJySXBtcgtFUlI6ZXJySXBtYQtFUlI6ZXJySXBtcxJjb250cm9sbGVkX2FkZHJlc3MLRVJSOmVyckl3bHQCAAEHdmVyc2lvbgtFUlI6ZXJyVHRsZwtFUlI6ZXJyU25hYwtFUlI6ZXJyU3NoZAtFUlI6ZXJyQmxrZANwYWwLRVJSOmVyckl4ZnILRVJSOmVyck1hbXQLRVJSOmVyck1pbnYLRVJSOmVyck5zdmOABOqRgN02GgCOAQGxMRkURDEYQQGaggcERo6+YwSbD4nWBDZtWycEm6AgtgSsWSrdBFBRd/gEg/VsRicfgioEF8hzCwRM3wzXBIfgVcYEtZyKVASu67N4BHKRwI4EU1XabQSgR8f3BBDwDDoEdyRahASmjmljBEyxVe4EsQowbgTyNVtVBBrEp1gE466yXATqqqTTBBdlOH0EKBuJGwTD2fHcBFlOuh0EwP8nMAQnUgOvBBmlSPoEEmnYfgRDA2aOBA1qR6MEIgcHjgQdx4NxBLG6wssECaMVjgSZL5iSBPmZY9QE1LFuegSxa6rDBHTe9ZoEJbgSpwSWnO2bBDPY5a0EYD1ylwTf5gLPBNimxSMnIIIEBDP3iAgEroTL2AQz6SyUBIVN7eA2GgCONwapBzEHqAh2CPIJMAm7Cf4KOwpsCqgK2As4C4IL5Aw8DI0M1A1HDbAOEg5qDvEPXg/iERIRXxGqEboSSRKNE3ATlhTRFPkVMhVUFWgVxhX9AAMWIhZMFm8XOBgUGDQZzhnrGg4aMRvyHB8coQABACNDgAwVH3x1AAAAAAAAPVSwI0OABFrZ9MY2GgCOAQZFADEZgQQSMRgQREIcKIoCAYv+VwIAi/4iWYv/JQtLAkxZSwIVi/8jCEklC0sFTFlPBE8CCU1SiYoCASKL/kEABYv/QAADIkyJi/5yB0yMAEEAEYv/FichTFADiwASQQADI0yJIkL/+ooDAYv+i/2I/8ZAAAIiiYv+cghISYv/EkEAB3MCSDIDEomL/3MCSBKJigECi/9XCCCL/1cACIv/V0ggTgJQTFCL/4mKAQCL/zgJMgMSQAAEJxewAIv/OCAyAxJAAAQnGLAAiYoDAIv9iP/Yi/04B4v+EkAABCcisACL/TgIi/8SQAAEJyOwAImKAwCL/ov/E0EAC4v9AYABJExQi/6/iYoDAYv9AYABJExQSb5AAAqL/xaL/kxQjACJTLxIi/8hBghLAXMARQFAAAdJMgEPQQAQI0EABUxMFlCJRQGL/kL/9SJC/+2KAgCL/jgAi/8SQAAEJySwAIv+OBMyAxJAAA+AC0VSUjplcnJOY2x3sACL/jgVMgMSQAAEJxewAIv+OCAyAxJAAAQnGLAAiYoCAYv+QAADi/+Ji/6IAC9Ji/5yCEQTQQARSXMCRIv+cghEE0EABIv/TImJigEBMgOL/0AAAYlIi/8nGWVIiYoBAYv/JyVlQQARSRWBIBJBAAkjQAAEJyawAIkiQv/0igIBIov+gANvYWxlSIEYW4v+JwhlSIFYW0yxshiABDwabzOyGov/shqBBrIQIrIBs7Q+SVcEAEsBVwAEKRJESSJZJQhMFRJEVwYASRUkE0EABUgijACJF0lBAAWLAUAACCIiTgJNQv/rSXIHTIwAQQASiwEWJyFMUAOLABJBAAQjQv/eIkL/2ooEAYv8OBiL/ScIZUiBKFsSQQA5i/w4GUAAMov8OBuBBBJBACiL/DkaAIAEQ5ImVRJBABmL/DkaAYv+EkEADov8ORoCi/8WEkEAAiOJIomKAgEii/4nCGVIgVhbMQAyDTIOTgOL/0AAG0hFATIDSSIWTwNJTgJQTwNQTFBMUCcJUIwAiYv/TwOI/TJAAA+AC0VSUjplcnJIbndssABJQAAPgAtFUlI6ZXJySHRvcLAAIk4Ci/8TQQBGRQGL/4AQc3BlbmRpbmdfYWRkcmVzc2VMjABBABiLABWBIBJBAA+LAEsBEkEAB0mLARNAAA+AC0VSUjplcnJIbmJksAAjTIv/JyVlQQAISRWBIBJAAAQnJrAASUsCEkEASCNMi/8nGWVBADZJFYEgEkEALk4DSwJLAU8DSU4DTUxBABdMi/8WTwJQTFBMUExQJwkiTwNUUEL/LkUBMgNC/+NIMgNOA0L/zIv/cghMTgJAAAdFASJMQv+pSUsCEkEAC0xzAkgyAxJMQv+XSXMCSE8CEkxC/4yKAgGL/icIZUiBWFuL/0yI/BtAAAMyA4mL/ycZZUEACUkVgSASQQABiUgyA0L/6IoEAov8OBiL/ScIZUiBKFsSQQA7i/w4GUAANIv8OBuBBBJBACqL/DkaAIAEmxR9LBJBABuL/DkaAYv+EkEAEIv8ORoCi/8WEkEABCOL/okiQv/5igMBK0mL/jIDEkEABCKMAImL/ScIZUgkW4wBIQmMAIv/QQAViwFyCESL/3AARQFAAAchCTIQCIwAiYoFASuL/kEBbov8MgMTQQFmi/uAC3dhbGxldF9mZWVzZUgkW0khBA5Ei/4dIQSXSYwAQAAIi/5BAAMjjAAyB0mBgJqeAQhMiwAWi/xMUCcnTFBJTgOL+ycIZUgkW0wiWYHUxQELgeSpAwiL/UAAYrFMSXIIREsCiwAIsgiyByOyECKyAbZPAhZPAxZPArIYgATcrAk1shpMshqyGkyyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQpEkRJFSQSRBdMTBZMFlBXCAiL/osACRZMUEyJSwFyCESL/XAARQFBAGlJTwJJcghEsUsBcghETwSyCLIHI7IQIrIBtov9shGLALISshSBBLIQIrIBtk8CFk8DFk8CshiABKOhbKqyGkyyGrIaTLIai/+yGoEGshAisgGztD5JVwQATFcABCkSREkVJBJEF0xC/3dJMhAIsUsCSXIIRDIQsgiyByOyECKyAbaL/RZMshgnILIashqBBrIQIrIBs0L/aYv+FiIWUEyJNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFzYaA0kVSwEiWUmBChJESwJMSwJSIlmBDAgSRCcoTwNnKE8CZycGTGcjQzEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFYEgEkQ2GgdJIlklCEsBFRJEVwIANhoISRWBJBJENhoJSRUjEkQ2GgpJFYEDEkQ2GgtJFSQSRBciKGVETIj7xldoIIgdhRYpTFCwI0MxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSRWBIBJENhoHSSJZJQhLARUSRFcCADYaCEkVgSQSRDYaCUkVIxJENhoKSRWBAxJEiBkiiB0OFilMULAjQys2GgFJFSQSRBc2GgJJFSQSRBdMNhoDSSJZJQhLARUSRFcCAEwxAEwWUCpMUEm9RQFAAAQnBLAASwEVSwMIgc8YDkAAD4ALRVJSOmVyckJkbG6wAEcCgUsluhdKJboXJQi6VwIASU4DFUlFBksED0AAD4ALRVJSOmVyckJvZnOwAEsDSwUMQQAgIksFSU4CDyJLAk8CTUsFSUsDD0xPA08CTU8ETgJSTgJOAlBLAb5ESwEVFlcGAk8CUEsBgUtZTwIiTwJYTFBLAbxIvyNDNhoBSRUkEkQXNhoCSU4CSSJZJQhLARVJTgQSRFcCAEwxAEwWUCpMUEm9RQFAAAQnBLAATBWBgAEOQAAEJymwAEm+REmBSVlLASJLAlhPBVBLAoFLWUsDFU8ESwJPAlJPAkxQSwFPAwlPAk8ECEwJFlcGAlxLSwG8SL8jQzYaAUkVJBJEFzYaAklOAhUjEkQ2GgNJTgIVgQMSRDEATBZQKkxQSb1FAUAABCcEsABJgXFPBLuBck8CuyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEATBZJTgJQKkxQSb1FAUAABCcEsAAiI7onCxNAAA+AC0VSUjplcnJGc2hksAAnCjEAUL1FAUEAEjIKTwJMIoj3ZicKMQBQTL8jQzIKTwJJOABJMQASIQYiTwJNIQUITwJPA08CiPdAJwoxAFAxAExOAoj3WEL/yicKMQBQvUUBQAAPgAtFUlI6ZXJyTmZzdrAAJwoxAFC8SCcKMQBQMQAhBYj3P0lXACBMgSBbsbIIsgcjshAisgGzI0MnDjEAUL5EFyMJMQBMFlAqTFBJvUUBQAAEJwSwAEkiI7qAAQoSQAAPgAtFUlI6ZXJyU25kcrAAIicRuyNDNhoBSRUkEkQXMQBMFlAqTFBJvUUBQAAEJwSwAEkiI7onERJAAAQnKrAAIoABHrsjQzYaAUkVJBJEFzEATBZQKkxQSb1FAUAABCcEsABJIiO6gAEeEkAAD4ALRVJSOmVyclNucGGwACInEbsjQzYaAUkVJBJEFzEATBZQKkxQSb1FAUAABCcEsABJIiO6JwsTQAAEJyuwACInC7sjQzEWIwlJOBAjEkQ2GgFJFYEgEkQxAEyIEeEnDExQSb1FAUEAD4ALRVJSOmVyclVhYmywADIKTwJJOABJMQASIQYiTwJNgdR6CE8CTwNPAoj1wkxJIrlIMQBMTgKI9dojQzYaAUkVgSASRDEATIgRiycMTFBJvUUBQAAPgAtFUlI6ZXJyVW5ibLAASbxIMQCB1HqI9btJVwAgTIEgW7GyCLIHI7IQIrIBsyNDMRYlCUk4ECMSRDEWIwlJOBCBBhJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXTwU4Fk8GIkkjTwRPCU8JTwlPCU8JIogU8BYpTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBdPBDgWTwUiSSNPBE8ITwhPCE8IIiOIFJgWKUxQsCNDMRYjCUk4ECMSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEF08FIkcDTwlPCU8JTwlPCSKIFEcWKUxQsCNDMRYjCUk4ECMSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEF08EIkcDTwhPCE8ITwgiI4gUABYpTFCwI0MxFoEDCUk4ECMSRDEWJQlJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBdPBjgWTwY4Fk8HI08DI08ETwlPCU8JTwlPCSKIE40WKUxQsCNDMRaBAwlJOBAjEkQxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXTwU4Fk8FOBZPBiNPAyNPBE8ITwhPCE8IIiOIEyQWKUxQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXTwU4Fk8GI08CIklPCU8JTwlPCU8JIogSwhYpTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBdPBDgWTwUjTwIiSU8ITwhPCE8IIiOIEmoWKUxQsCNDMRYjCUk4ECMSRDYaAUkVJBJEFzEATBZQSVcAIExXIAhQJwVMUEm9RQFAAAQnB7AASb5EgUBbQQAEJxqwADEASwI4ABJAAAQnJLAASwE4CTIDEkAABCcXsABLATggMgMSQAAEJxiwAEsBOAcyChJAAAQnG7AASb5EgWBbTwI4CAgWgWBMuyNDMRYjCUk4EIEEEkQ2GgFJFSQSRBcxAEwWUCcFTFBJvUUBQAAEJwewAEm+RIFAW0sCOBESQAAEJxqwADEASwJJTwKI8jg4FDIKEkAAD4ALRVJSOmVycklhcmWwAEm+RIFgW08COBIIFoFgTLsjQzYaAUkVJBJEFzYaAkkVJBJEF0wxAEwWUCcFTFBJvUUBQAAEJwewAEm+TElPAkSBYFtLAw9AAA+AC0VSUjplcnJOZWZusACBQFtJQQAjsTEASwOyErIUshGBBLIQIrIBs0m+RIFgW08CCRaBYEy7I0NIsTEASwKyCLIHI7IQIrIBs0L/3CtHBDYaAUkVJBJEFzEATBZQSScFTFBJvUUBQAAEJwewAEm+TElOAk4ERIgM8SEHTgOBIFtJRQZBAEJLA1cAIEsFFlAqTFCBGSS6F0EALk8CSCcSSwJQvEhLAoEoW0UIIicTZUUBQQDBIicTZURLCA1BALaB1MgZIQcITgInFE8CULxBAAVMIQgITEkxAE8DiPCzSVcAIE4DgSBbTEsCgUBbSUUJQQAyTwKBYFtJRQdBABWxMQBLBrISSweyEbIUgQSyECKyAbOxTLIITLIHI7IQIrIBs7xII0NLAzEAEkEAHE8DSLExAE8DgWBbTwMIsgiyByOyECKyAbNC/9hPAoFgW0lFBkEAELExAEsFsgiyByOyECKyAbOxTLIITLIHI7IQIrIBs0L/rIH0jQVC/0cxFiMJSTgQgQYSRDYaAUkVgSgSRDYaAkkVJBJEF0yIEN0iKGVETwOI8a6IERFITgMiKGVETwNMTwJPA4jzCkhAAAQnFbAAI4gR10gjQzEWIwlJOBCBBhJENhoBSRWBKBJEiBCaSU4CTgNMIihlRExXACBMSwGI8IlMiPAmIihlRE8DTE8CTwOI8P9AAAQnFbAAI4gRjEgjQzYaAUkVgSgSRCKIEXxII0MxFiMJSTgQIxJENhoBRwIVgSgSRCcFTFBJvUUBQAAEJwewAL5EgUhbQAAPgAtFUlI6ZXJyTmd0ZLAAJxRLAVBJTgO9RQFBAA+AC0VSUjplcnJQZXhzsAAiKGVETFcAIElOA4jv9ElAAA+AC0VSUjplcnJObHdssAAyCk8CTCEIiO6vSU8CiO9yTBZMUL8jQzYaAUkVgSgSRCcFTFBJvUUBQAAEJwewAEm+REmBKFtLAYE4W0xLAYgKUU8CgVBbTE8CiApvDEEACSIWSwGBWE8CuyNDKzYaAUkVJBJEFzYaAklOAkkiWUlOA4EgCyUITBUSRDEATBZJTgRQJwVMUEm9RQFAAAQnB7AAvkRJgSBbSU8CVwAgTgJAAA+AC0VSUjplcnJOb2RusAAWSwFMUCpMUEm9RQFAAAQnBLAASSIjukyBGSS6F0UGJwsTQAAEJyuwAEsEQQBbSwRLAg9BAFMjQAAPgAtFUlI6ZXJyUGNvZrAAIklLAwxBACZLA1cCAEsBgSALgSBYSwJMiAmLJwxMUL1FAUEABCcssAAjCEL/00YDMQBLAlAnEkxQSbxITL8jQyJC/6o2GgFHAhWBKBJEJwVMUL1FAUEABCcHsAAnEkxQvEAABCcHsAAjQyIrRwI2GgFHAiJZSU4DJQtMSRVOAlcCACJJSwYMQQAySSULSwJJTwJZSU8FSU4EEkRLARVSSRVLAYEgWUmBIhJETFIiWSQLgSQICE4CIwhC/8dGAiUIEkQnDSJJSwQMQQDSIk4CSwNLAYjsLEmBIFlLARVSIllLAw1BALBLA0lLAklOA4jsEVcAIExPAojsCEmBIFlLARVSVwIASwQkCyRYUIgL0EgnCSJPAlRFCUxJIllJTgRJIwhJFlcGAE8DTFwATgRMgQcIJApJRQtMgQcIJApJRQoMQQAMSwdLCQmvTwNMUE4CIk4CTwSBEAhJTgQjCEUISwNLCAxBAB9LCk8DSU4CU08FTwVJTgNPAlROBCMITgMjCE4CQv/ZTwJITwJITCMITE8CTEL/OU8CSCMIQv8nSClMULAjQzYaAUkVgSASRDYaAkkVgSASRIgH7CcMTFC9RQEnCSJPAlQpTFCwI0M2GgFJFYEgEkQ2GgJJFSQSRBcWUCpMUEm9RQFBABdJIiO6JwsSQQANIycJIk8CVClMULAjQyJC//A2GgEVJBJENhoCSRUkEkQXIihlREyI7uGIERcWKUxQsCNDNhoBFSQSRIgLYogRAxYpTFCwI0M2GgFJFYEgEkQ2GgJJFSQSRBdMNhoDSRUkEkQXNhoESRUkEkQXSU4DTgKIEPlJIltOAiRbTgRBACFLA0EAHCMhCAsIIihlRElPA4judk8DiO7zCBYpTFCwI0MiQv/hNhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXTwJMiBCnIlsiKGVEiArQTwOI7rgIFilMULAjQzYaAUkVgSgSRDYaAkkVJBJEFyIoZURMiOzTiAw2RgIpTFCwI0M2GgFJFYEgEkQ2GgJJFSQSRBcWUCpMUEm9RQFAAAQnBLAAvkQpTFCwI0M2GgFJFYEgEkQnCkxQSb1FAUEACr5EFxYpTFCwI0NIIkL/9CIrNhoBSRWBIBJENhoCSRUkEkQXSTYaA0kVJBJEF0wnDUsDSwMISwINQQCXSwEWSwVMUCpMUElFCL1FAUEAhEsGvkSAAgACTFBOAkkiWUkjCBZXBgBOA0xXAgBMJQtMIkUJSwhLAgxBABpJSwlJTgJZJQgWVwYATwVMUE4EJQhFCUL/3kkVTgMiRQpLCSUMQQAcSwVLCklOAllLBQgWVwYATwZMUE4FJQhFCkL/3UxPA1JPAkxQTwJXAgBQTCMITEL/XilMULAjQzYaAUkVgSgSRCcFTFBJvUUBQABySIBpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKUxQsCNDvkRJVwAgSwFXIAhLAlcoCEsDVzAISwRXOAhLBVdACEsGV0gISwdXUAhLCFdYCE8JV2AIgAGATwpQTwlQTwhQTwdQTwZQTwVQTwRQTwNQTwJQTFBC/6Q2GgFJFYEoEkQnBUxQSb1FAUAABCcHsAC+RClMULAjQyJHAjYaAUcCFYEoEkQnBUxQSb1FAUAABCcHsAC+TElOAk4DRCcJTgNJVwAgTgIrTgUrTgWBJK9OBIADMDAwTgOBIFtJTgJAAM9LBk4DSwJFCycNRQwnEkxQSUUNvUUBQQAaSwtJvkRXAgBMIiW6FxZXBgAnDUxcAExQRQtPBElXKAhLAVcwCEsCVzgISwNXQAhLBFdICEsFV1AISwZXWAhPB1dgCE8JTwhQTwdQTwZQTwVQTwRQTwQWUE8HUEsJUE8ISRUWVwYCTFBMgAIAt1BLARWBtwEITwlJFRZXBgJMUEsBFlcGAk8DTFBLARVPAwhMTwlQTwdQTwdQTwZQTwVQTwRQTBZXBgJQTwJQTFBLAlApTFCwI0NPA0hPBEhPBEhPBEhPBEhLARZLA0xQKkxQSb1FAUAABCcEsABJIiO6TgVJgwIpILpJTgJFCEmBdSW6FyUISwGBdU8CulcCAE4HSYFLJboXSiW6FyUISwJOArpXAgBOB0mDAk0kuk4GSYFxI7pOBYMCcgO6TgUyAxJB/r5LAkULQv63NhoBSRWBIBJEJw9MUL1FARQnCSJPAlQpTFCwI0M2GgFJFYEgEkQnDkxQSb1FAUEACr5EFxYpTFCwI0NIIkL/9DYaAUkVgSASRCcPTFBJvUUBQQAKvkQXFilMULAjQ0giQv/0MRYjCUcCOBAjEkQ2GgFJFSQSRBdJTgMiJwZlTElOAk4FRCIoZUUBRCVbcghETHAASU4CTgNIFEw4BzIKEkAABCcisABPAjgIMhAjTwMICxJAAAQnI7AAsTIKSwOyESKyErIUgQSyECKyAbNAAVFHAiJZSwEVUlcCACsTQQFBIihlREknEGVITEknLWVISVcICE4CJFtOAyInBmVMSU4CRQdESSJZSwEVUklOAlcCAEwnEGVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEKRJESSJZgSkLJQhMFRJEVwYpIltJQAAPgAtFUlI6ZXJyTmVzY7AASwYlW0lPAhJAAA+AC0VSUjplcnJXZXNjsACxTwRJshiABFrfM4+yGk8EshpPArIaTwKyGoAKAAEAAAAAAAAAALIaJw2yGoEGshAisgEiKGVFAURMSXIIREsFSU4DcABFARQyEAu2THIIRLIHsggjshAisgG2SwEWTBYnJ0xQTwOyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVFAUQiJwZlRCVbcghETHAARQEUMhAjTwIICxYpTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJxBlSHIIRBJAAAQnHLAAJwZMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcQZUhyCEQSQAAEJxywACIoZUQnLWVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJyhMZyNDNhoBSRUkEkQXMQAiKGVEJxBlSHIIRBJAAAQnHLAAKExnI0OKAgEyB0mL/gmL/xgJiYoCAYv+UQAQSRWBEBJEi/9RABBJFYEQEkRQiYoCAYv+i/8PQQAGi/6L/wmJIokiJxNlRQFAAAUnEzIHZ4mKAQErIihlRCcdZUhJIk4CJFtJTgJBABuLAkkhBA5Ei/8dIQSXSYwBQAAIi/9BAAMljAEijACBEFtJjAJBABuLAkkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjACLAUmLAElOAwiL/0wJTBZPAhZQTBZQjACJigoBIkkrSYj/dIv5MQCI/z8nDExQvUUBQQAEJyywACKL90ECYIv4OBCBBBJEi/g4ESEHjAOL/EAB3Yv5jAAnDzEAUL2MAkgnDzEAUEm9RQFBAb5JvkQXTgJLAkkjCBZPAky/MQBMFlCMAYsCQAAHiwMhBQiMA4v+QQGQSwJBAYsjTgNLA0EAB4sDIQgIjAOL+oj++UlOBUkiW0wkWwgiKGVEIicGZUQlW3IIREyL/UsETwRPBIjmrUkiW04EJFuLAwiL9jgASU4GMQASIQYiTwJNCE4Di/dBANWL+DgQgQQSRCInBmVEJVtyCESL+DgRcABFAUAABCcesACxIicGZUQlW3IIRE8FshJLAbIRshSBBLIQIrIBs4v2MgpPBYjiSIv4MQCI4sOL+DgUMgoSQAAEJy6wAIv4OBJJi/oPQAAEJy6wALFPBoEQW7ISSwGyEYsAshSBBLIQIrIBs4v6CTIHSYv8Fov5TFBPAhZQi/oWUIv7FlBPAxZQTwQWUEwWUCMWUEwWUCcFiwFQSU8Cv08DQQANi/4Wi/9QJxSLAVBMvzEATE8DTwKI4eKMAImL9ojhlYv2OAcyChJAAAQnG7AAi/Y4CElOCYv6TwUISU4CD0AABCcbsACxIicGZUQlW3IIRE8FsgiyByOyECKyAbOxTwaBEFuyCIsAsgcjshAisgGzTwZMCUL/VSJOA0L+ciNOAkL+QkUBi/wWi/lMUCpMUEm9RQFAAAQnBLAASSIjuicREkAABCcqsABJgQkkuhdLAhJAAAQnGrAARwKBESS6F4z6SSMkuheM+0mBISS6F04DgwIpILpJjAAyAxNAAASL+YwAgRkkuhdB/cAhCowDQv25IkL9qIoBAiJJKycFi/9QSb1FAUAACCKL/4wBjACJvkRJVwAgSU4CjAFJgSBbjAJJgVBbTgJJgShbTgJJgThbTgJJgWBbTgKBMFtMi/9XACCI/HgnDExQvUUBQQAIIov/jAGMAImLAkEAJosCFosBTFAqTFBJjAC9RQFBAAuLACIjuicLEkEACCKL/4wBjACJTwNPA4j8Jk8DDkEACCKL/4wBjACJDEEACCKL/4wBjACJI4v/jAGMAIkiKGVEMQCI4UqI4RSJigsBK4v7gQQPQAAEJy+wAIv8gTwPQAAEJzCwAIv4QQAJi/1AAAQnMbAAi/1AAN8ijACL/0EAgCIoZUQxAIjhBov4QQAoi/k4EIEGEkQiKGVMTgJEMQBLAUAAL4v5TwNPAosAiOFoQAAEJxWwAIjgozIDi/WL9ov3i/qL+4v8i/1PCCJPCYj8LUyJSwFJiOCWSU8CcghEE0EAGEkxABNBABFJcwJESwNyCEQTQQAESEL/qUUBQv+kIihlRIv+iOFdi/hBACOL+TgQgQYSRCIoZURMiN8PTgKL+U4CiwCI4q1IQAAEJxWwAElXaCBLASJbTwJXCCCL9Yv2i/eL+ov7i/yL/U8JTwlPCYj7qUyJi/0Wi/pMUCpMUEm9RQFAAAQnBLAAgSEkuheMAIv4QP8DiwBB/v6AC0VSUjplcnJIZ3RlsACKAQInBYv/UEm9RQFAAAQnB7AAvkRJgSBbSU8CVwAgTEAABCcxsABMFlAqTFBJvUUBQAAEJwSwAIEhJLoXi/+JigIDKycUi/5QSb1FAUEAur5Ei/8iW0mMAEEAGUkiW4sAEkEAEIv/iN43jP+L/ov/TwRPBIlJIltMIihlRIv+VwAgSU4DTgRMVwggSU4CTgQnCGVIgVhbTgISQQAxSEUBTCIoZUSL/lcAIEwnCGVIgVhbTwNJTgJLA4jdvCJOAk0WTwJMUExQi/6L/08DiUsBSwSI3aNAAAZFAUxC/8NJcghISUsDEkEAEHMCSDIDEk8DTwNPAk1C/6hPAklzAkhPAhJPA04CTUL/l0giKGVEi/5XACBMSwGI3ulJTwKI3oRC/36KAgGL/oj80Iz+QAAPgAtFUlI6ZXJyQ3RyZ7AAJwWL/lBJvkRJVwAgTEmBIFtMSYEwW0xJgUBbTIFIW0EACYv/QAAEJxawAEsCQAEBTwJITwJLAoj5hksCQQCxsSInBmVEJVtyCERLASJbshJPA0lOA7IRshSBBLIQIrIBs7ExAEsBJFuyEksCshGyFIEEshAisgGzsYEQW7ISshGyFIEEshAisgGzSwG+REmBKFtLAYE4W0xLAYj42ElOBUyI+PpMgVBbSU8CDEEAKUhPAkgjFksCgVhPArtMSb5EgWBbTwIJFksBgWBPArsyBxaBUEy7i/6JTwMMQf/eSwFJvkSBWFsjCBaBWEy7Qv/MTwJIsSInBmVEJVtyCERLASJbsgiyByOyECKyAbOxMQBLASRbsgiyByOyECKyAbOxgRBbsgiyByOyECKyAbNC/1lPAhZLA0xQKkxQSb1FAUAABkhPAkL+7YMCKSC6STIDE0AABkhPAkL+208DSEL+1YoMAStJJw4xAFC9RQEnDjEAUEm9RQFBAZhJvkQXRwIjCBZPA0y/MQBMFlBMi/eBBA9AAAQnL7AAi/WBPA9AAAQnMLAAi/iBBQ5AAA+AC0VSUjplcnJNeHBzsACL+xVJTgKBgAEOQAAEJymwACIoZUQnHWVIIltJTgIhCwhMiwJAAAVMIQUITIv2QQAmMgqL9nAARQFAAAQnHrAAIicGZUQlW3IIRIv2cABFAUAABCcesAAiKGVEIicGZUQlW3IIREyL/yJPBk8EiN9tSSJbTCRbMgpPBE8CCIv0TgKI212xIicGZUQlW3IIRLIHsggjshAisgGzi/UWgAEKTFCL9hZQi/cWUIv4FlCL+RZQi/pQTwIWVwYCi/tQTIACAHVQSwEVgXUIFlcGAlCL/FCL/VCL/lBMUCcNUCpPA1BJvEhMvyKMADEWIwiMAYsBMgQMQQA/iwE4EIEGE0AATIsBOBgyCBJAAAQnFrAAiwE4GUEABCcWsACLATgAMQASQAAEJxawAIsBORoAJx8SQQAaI4wAiwBAAA+AC0VSUjplcnJTbmF2sACMAImLASMIjAFC/5kjQv5oigEBIihlRCcdZUgiWyELCCcOMQBQvUUBQAADIQUIIihlRIv/IojeIQiJigIBIQcii/9BAClIi/8Wi/5MUCpMUEm9RQFAAAQnBLAASYEhJLoXTIEZJLoXQQAEIQqMACcPMQBQvUUBQAAHiwAhBQiMAIsAFkwWUEyJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
    registry answer `(legacyWalletOf(key.address), legacyOriginAtRestOr(...))` into `principals` once, so the
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
        registry answer `(legacyWalletOf(key.address), legacyOriginAtRestOr(...))` into `principals` once, so the
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
        registry answer `(legacyWalletOf(key.address), legacyOriginAtRestOr(...))` into `principals` once, so the
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
        registry answer `(legacyWalletOf(key.address), legacyOriginAtRestOr(...))` into `principals` once, so the
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
var SubscriptionsSDK = (_class3 = class extends _chunkIYEXWXKNjs.BaseSDK {
  __init8() {this.serviceMapKeyGenerator = ({ address, id }) => `${address}${id}`}
  __init9() {this.services = new (0, _chunkVAC3L4E5js.ValueMap)(this.serviceMapKeyGenerator)}
  constructor(params) {
    super({ factory: SubscriptionsFactory, ...params }, _chunkAJTZ5O5Ajs.ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID);_class3.prototype.__init8.call(this);_class3.prototype.__init9.call(this);;
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
    this.services = new (0, _chunkVAC3L4E5js.ValueMap)(
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
    return FEATURED_SERVICE_MBR + (payer !== void 0 && payer !== creator ? _chunkAJTZ5O5Ajs.PAYER_RECORD_MBR : 0n);
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
//# sourceMappingURL=chunk-MNKLJPG5.js.map
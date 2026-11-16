import {
  ValueMap
} from "./chunk-55IOSZE5.mjs";
import {
  convertToUnixTimestamp
} from "./chunk-XN5GRW52.mjs";
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

// src/subscriptions/index.ts
import { microAlgo } from "@algorandfoundation/algokit-utils";
import { microAlgos } from "@algorandfoundation/algokit-utils";

// src/generated/SubscriptionsClient.ts
import { getArc56ReturnValue, getABIStructFromABITuple } from "@algorandfoundation/algokit-utils/types/app-arc56";
import {
  AppClient as _AppClient
} from "@algorandfoundation/algokit-utils/types/app-client";
import { AppFactory as _AppFactory } from "@algorandfoundation/algokit-utils/types/app-factory";
var APP_SPEC = { "name": "Subscriptions", "structs": { "BlockListKey": [{ "name": "address", "type": "byte[16]" }, { "name": "blocked", "type": "byte[16]" }], "Service": [{ "name": "status", "type": "uint8" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "passes", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }], "ServicesKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionInfo": [{ "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionInfoWithDetails": [{ "name": "recipient", "type": "address" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "serviceId", "type": "uint64" }, { "name": "status", "type": "uint8" }, { "name": "payoutAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "bannerImage", "type": "byte[36]" }, { "name": "highlightMessage", "type": "uint8" }, { "name": "highlightColor", "type": "byte[3]" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }, { "name": "passes", "type": "address[]" }], "SubscriptionInfoWithExistence": [{ "name": "exists", "type": "bool" }, { "name": "recipient", "type": "address" }, { "name": "serviceId", "type": "uint64" }, { "name": "startDate", "type": "uint64" }, { "name": "amount", "type": "uint64" }, { "name": "interval", "type": "uint64" }, { "name": "asset", "type": "uint64" }, { "name": "gateId", "type": "uint64" }, { "name": "lastPayment", "type": "uint64" }, { "name": "streak", "type": "uint64" }, { "name": "escrowed", "type": "uint64" }], "SubscriptionKey": [{ "name": "address", "type": "address" }, { "name": "id", "type": "uint64" }], "SubscriptionPrincipal": [{ "name": "wallet", "type": "uint64" }, { "name": "principal", "type": "address" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "GateCtx": [{ "name": "principal", "type": "address" }, { "name": "wallet", "type": "uint64" }, { "name": "spender", "type": "address" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment", "desc": "The payment for the service creation" }, { "type": "uint64", "name": "interval", "desc": "The interval in seconds" }, { "type": "uint64", "name": "asset", "desc": "The asa to be used for the subscription" }, { "type": "uint64", "name": "amount", "desc": "The amount of the asa to be used for the subscription" }, { "type": "uint64", "name": "passes", "desc": "The number of accounts the subscription can be shared with" }, { "type": "uint64", "name": "gateID", "desc": "The gate to be used for the subscription" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account.\nThe referral cut goes to the verified wallet's referrer (no registry lookup)." }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "newService creates a new service for a merchant", "events": [], "recommendations": {} }, { "name": "newService", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "passes" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "payoutAddress" }, { "type": "string", "name": "title" }, { "type": "byte[36]", "name": "bannerImage" }, { "type": "uint8", "name": "highlightMessage" }, { "type": "byte[3]", "name": "highlightColor" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "setServiceDescription", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateServiceTitle", "args": [{ "type": "uint64", "name": "id" }, { "type": "string", "name": "title" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "activateService", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "activateService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "pauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "pauseService pauses a service for a merchant\nit does not shutdown pre-existing subscriptions\nit simply prevents new subscriptions from being created\nfor a specific service", "events": [], "recommendations": {} }, { "name": "unpauseService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unpauseService activates an service for a merchant", "events": [], "recommendations": {} }, { "name": "shutdownService", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "shutdownService permanently shuts down an service for a merchant\nit also shutsdown pre-existing subscriptions", "events": [], "recommendations": {} }, { "name": "block", "args": [{ "type": "pay", "name": "payment", "desc": "The payment to cover mbr for blocking" }, { "type": "address", "name": "blocked", "desc": "The address to be blocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "block blacklists an address for a merchant", "events": [], "recommendations": {} }, { "name": "unblock", "args": [{ "type": "address", "name": "blocked", "desc": "The address to be unblocked" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "unblock removes an address from a merchants blocks", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the caller's ARC-58 wallet, 0 for a plain account" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Subscribe to a gated ALGO service. The gate is checked for the caller's verified context through\n`Gate.mustCheckFor(gateCtx(p), gateID, args)` (`gateTxn`). A subscriber acting through a verified\nwallet stores the pair `(W, principal)` (+`SubscriptionPrincipalMBR`, quoted by `newSubscriptionCost`).", "events": [], "recommendations": {} }, { "name": "gatedSubscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet", "desc": "Principal-resolution hint (last arg): the referral cut goes to the verified wallet's referrer" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Subscribe to an ungated ALGO service (or donate with `serviceID` 0).", "events": [], "recommendations": {} }, { "name": "subscribe", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`gatedSubscribe` for an ASA service (`payment` covers the MBR exactly).", "events": [], "recommendations": {} }, { "name": "gatedSubscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector): registry gate origin and referral, no stored pair; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "`subscribe` for an ASA service (`payment` covers the MBR exactly).", "events": [], "recommendations": {} }, { "name": "subscribeAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "recipient" }, { "type": "uint64", "name": "amount" }, { "type": "uint64", "name": "interval" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "deposit", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "depositAsa", "args": [{ "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "withdraw", "args": [{ "type": "uint64", "name": "id" }, { "type": "uint64", "name": "amount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "unsubscribe", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pay a gated subscription. The gate is re-checked for the SUBSCRIBER (audit SG-05), never for the\ncaller: `wallet` is the caller's OWN hint (strict; keepers acting as themselves pass 0) and only\nselects case (1) of `triggerCtx` when the caller is the subscriber's own stored wallet. `gateTxn` must\nbe `Gate.mustCheckFor(triggerGateCtx(key, wallet), gateID, args)`.", "events": [], "recommendations": {} }, { "name": "gatedTriggerPayment", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (pre-hint selector, used by the deployed Subscriptions plugin): the gate subject is the\nsubscriber's registry origin, checked with a plain `Gate.mustCheck`; delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "triggerPayment", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Pay an ungated subscription (a gated one needs `gatedTriggerPayment`: errInvalidSequence).", "events": [], "recommendations": {} }, { "name": "adoptPrincipal", "args": [{ "type": "pay", "name": "payment" }, { "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Q13 backfill for a gated subscription made before principal resolution (no stored pair): copies the\nregistry answer `(legacyWalletOf(key.address), legacyOriginOr(...))` into `principals` once, so the\nPhase 4 contract can drop the registry read. Permissionless and caller-funded: `payment` is exactly\n`SubscriptionPrincipalMBR` from `Txn.sender` (refunded to the subscriber by `unsubscribe`).", "events": [], "recommendations": {} }, { "name": "streakCheck", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Resets the streak of a subscription that missed a payment window. Never increments it\n(audit SG-02): only payments grow a streak.", "events": [], "recommendations": {} }, { "name": "setPasses", "args": [{ "type": "uint64", "name": "id" }, { "type": "address[]", "name": "addresses" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearOrphanPasses", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Deletes a pass box left behind by a subscription that was cancelled before the SG-08\nfix (legacy `unsubscribe` deleted the wrong key). The freed MBR stays in the contract:\nwhether the owner was already refunded cannot be determined on-chain.", "events": [], "recommendations": {} }, { "name": "triggerList", "args": [{ "type": "(address,uint64[])[]", "name": "req" }], "returns": { "type": "bool[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isBlocked", "args": [{ "type": "address", "name": "address", "desc": "The address to be checked" }, { "type": "address", "name": "blocked" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "isBlocked checks if an address is blocked for a merchant", "events": [], "recommendations": {} }, { "name": "isShutdown", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "serviceIsActive checks if an service is shutdown", "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "newServiceCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "LEGACY shim (pre-hint selector, registry referral); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "Exact cost (excluding `amount`) of a subscribe by `Txn.sender` with hint `wallet`: box MBR, plus the\nstored pair (`SubscriptionPrincipalMBR`) when `wallet != 0` and the service is gated, plus the referral\ndisbursement MBR when the wallet has a referrer.", "events": [], "recommendations": {} }, { "name": "newSubscriptionCost", "args": [{ "type": "address", "name": "recipient" }, { "type": "uint64", "name": "asset" }, { "type": "uint64", "name": "serviceID" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "LEGACY shim (pre-hint selector, registry referral, no stored pair); delete in Phase 4.", "events": [], "recommendations": {} }, { "name": "triggerGateCtx", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "(address,uint64,address)", "struct": "GateCtx" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "The `GateCtx` `gatedTriggerPayment(gateTxn, key, wallet)` will assert, computed by the same code\n(`triggerCtx`). A plugin calls it from inside its window (same `Txn.sender` / caller app as the\nfollowing target call) to build `Gate.mustCheckFor`; a keeper acting as itself passes `wallet = 0`.", "events": [], "recommendations": {} }, { "name": "blockCost", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getService", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "id" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])", "struct": "Service" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServicesByAddress", "args": [{ "type": "address", "name": "address" }, { "type": "uint64", "name": "start" }, { "type": "uint64", "name": "windowSize" }], "returns": { "type": "(uint8,uint64,uint64,uint64,uint64,uint64,address,string,string,byte[36],uint8,byte[3])[]" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(bool,address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfoWithExistence" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "mustGetSubscription", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64,uint64)", "struct": "SubscriptionInfo" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionWithDetails", "args": [{ "type": "(address,uint64)", "struct": "SubscriptionKey", "name": "key" }], "returns": { "type": "(address,uint64,uint64,uint64,uint64,uint64,uint64,uint8,address,string,string,byte[36],uint8,byte[3],uint64,uint64,uint64,address[])", "struct": "SubscriptionInfoWithDetails" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "isFirstSubscription", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getServiceList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getSubscriptionList", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "passesRepricedAt": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cGFzc2VzX3JlcHJpY2VkX2F0", "desc": "Subscriptions that started before this timestamp paid the legacy pass MBR\n(`LegacyPassesMBR`) and get it back on unsubscribe (audit SG-08 / decision SG-K).\nSet once, lazily, by the first subscribe / unsubscribe after the upgrade." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "subscriptions": { "keyType": "SubscriptionKey", "valueType": "SubscriptionInfo", "prefix": "cw==" }, "subscriptionslist": { "keyType": "address", "valueType": "uint64", "desc": "A counter for each addresses subscription id", "prefix": "bA==" }, "services": { "keyType": "ServicesKey", "valueType": "Service", "desc": "services is a map of services a specific merchant has\ndenoted by the merchant address + index of the offer as a key\n32 + 8 = 40 bytes\n120 bytes total -> (2500 + (400 * 121)) = 0.050500", "prefix": "bw==" }, "serviceslist": { "keyType": "address", "valueType": "uint64", "prefix": "bQ==" }, "blocks": { "keyType": "BlockListKey", "valueType": "AVMBytes", "desc": "blocks allow merchants to specify which addresses cannot subscribe\nkey will be merchant address + blocked address\n32 + 32 = 64 bytes\n65 bytes total -> (2500 + (400 * 64)) = 0.028500", "prefix": "Yg==" }, "passes": { "keyType": "SubscriptionKey", "valueType": "address[]", "prefix": "cA==" }, "principals": { "keyType": "SubscriptionKey", "valueType": "SubscriptionPrincipal", "desc": "Stored principal pair `(W, principal)` of a gated subscription made through a verified wallet\n(principal resolution \xA76.4, Q11). Written by the hinted gated subscribe methods (or backfilled by\n`adoptPrincipal`), re-checked at trigger time without reading any wallet global, deleted and\nrefunded by `unsubscribe`. 'i' + 32 + 8 = 41 byte key, 40 byte value \u2192 `SubscriptionPrincipalMBR`.", "prefix": "aQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3019, 3116, 3180, 4356, 4425, 4483, 4534, 4595, 4648, 4723, 5190, 5323, 5420, 6317, 6390, 6660, 6770, 6812, 6879, 7237, 7272, 8209, 8800, 9260, 9321, 9566, 9700, 9750, 9785, 9938], "errorMessage": "Box must have value" }, { "pc": [1432, 2322, 2456, 7515], "errorMessage": "Bytes has valid prefix" }, { "pc": [4366, 4498, 8711], "errorMessage": "ERR:errAsam" }, { "pc": [2927], "errorMessage": "ERR:errBdln" }, { "pc": [5564, 8154], "errorMessage": "ERR:errBlkd" }, { "pc": [2972], "errorMessage": "ERR:errBofs" }, { "pc": [9558], "errorMessage": "ERR:errCtrg" }, { "pc": [5055, 5130, 9070, 9148], "errorMessage": "ERR:errFgte" }, { "pc": [9239], "errorMessage": "ERR:errHgte" }, { "pc": [1803], "errorMessage": "ERR:errHnbd" }, { "pc": [1707], "errorMessage": "ERR:errHnwl" }, { "pc": [1726], "errorMessage": "ERR:errHtop" }, { "pc": [4531], "errorMessage": "ERR:errIare" }, { "pc": [4422, 8573, 8596], "errorMessage": "ERR:errIpay" }, { "pc": [1110, 7365], "errorMessage": "ERR:errIpma" }, { "pc": [1096, 7347], "errorMessage": "ERR:errIpmr" }, { "pc": [1221, 4380], "errorMessage": "ERR:errIpms" }, { "pc": [9601, 10272, 10283, 10297], "errorMessage": "ERR:errIseq" }, { "pc": [7892], "errorMessage": "ERR:errIupg" }, { "pc": [1310, 1825], "errorMessage": "ERR:errIwlt" }, { "pc": [8433, 8448], "errorMessage": "ERR:errIxfr" }, { "pc": [8982, 9966], "errorMessage": "ERR:errMamt" }, { "pc": [8994, 9978], "errorMessage": "ERR:errMinv" }, { "pc": [10001], "errorMessage": "ERR:errMxps" }, { "pc": [1059, 1260, 4394], "errorMessage": "ERR:errNcls" }, { "pc": [1246], "errorMessage": "ERR:errNclw" }, { "pc": [7817, 7860, 7928], "errorMessage": "ERR:errNdao" }, { "pc": [4619], "errorMessage": "ERR:errNefn" }, { "pc": [7551], "errorMessage": "ERR:errNesc" }, { "pc": [5211], "errorMessage": "ERR:errNgtd" }, { "pc": [5273], "errorMessage": "ERR:errNlwl" }, { "pc": [5450], "errorMessage": "ERR:errNodn" }, { "pc": [8374, 10065, 10088], "errorMessage": "ERR:errNopt" }, { "pc": [1073, 1274, 4408], "errorMessage": "ERR:errNrky" }, { "pc": [9008, 9278], "errorMessage": "ERR:errNsvc" }, { "pc": [5523], "errorMessage": "ERR:errPcof" }, { "pc": [5240], "errorMessage": "ERR:errPexs" }, { "pc": [2899, 3100, 3202, 3262, 3311, 3371, 5469, 6315, 7092, 8681, 9207, 9295, 10422], "errorMessage": "ERR:errSdne" }, { "pc": [3276, 8695], "errorMessage": "ERR:errSnac" }, { "pc": [10331], "errorMessage": "ERR:errSnav" }, { "pc": [3228], "errorMessage": "ERR:errSndr" }, { "pc": [3337], "errorMessage": "ERR:errSnpa" }, { "pc": [3385, 5491], "errorMessage": "ERR:errSshd" }, { "pc": [3113, 10018], "errorMessage": "ERR:errTtlg" }, { "pc": [3442], "errorMessage": "ERR:errUabl" }, { "pc": [4353, 4480, 4588, 4714, 5188, 5320, 5418, 5615, 5627, 6768, 6804, 9258], "errorMessage": "ERR:errUdne" }, { "pc": [3528], "errorMessage": "ERR:errUnbl" }, { "pc": [7577], "errorMessage": "ERR:errWesc" }, { "pc": [7961, 7972], "errorMessage": "Length must be 16" }, { "pc": [1332], "errorMessage": "account funded" }, { "pc": [1315, 1337, 2121, 2255, 2352, 2368, 2374, 2477, 7329, 7640, 7656, 7749, 7809, 7852, 7920, 8295, 8359, 8385, 8607, 9632, 9812, 10075, 10102, 10144], "errorMessage": "application exists" }, { "pc": [2707, 4790, 5022, 5037, 5095, 5113, 5244, 6061, 6166, 6228, 6266, 7319, 7323, 7408, 7440, 7632, 7739, 7744, 7802, 7845, 7864, 7913, 8016, 8285, 8290, 8354, 8380, 8602, 8957, 9025, 9047, 9103, 9125, 9364, 9404, 9510, 9627, 9807, 10022, 10070, 10092, 10097, 10139, 10354, 10381], "errorMessage": "check GlobalState exists" }, { "pc": [2179, 8039, 8078], "errorMessage": "errIpct" }, { "pc": [5544, 5790], "errorMessage": "index access is out of bounds" }, { "pc": [3206, 3232, 3266, 3281, 3315, 3341, 3375, 3389, 4438, 4547, 4659, 4755, 5362, 5473, 5478, 6018, 7096, 7104, 7157, 7164, 7171, 8685, 8700, 8717, 8724, 8732, 8740, 8757, 8898, 9211, 9299, 9746, 9764, 9771, 9795, 9891, 10427, 10433], "errorMessage": "index out of bounds" }, { "pc": [5670], "errorMessage": "invalid array encoding" }, { "pc": [1435, 1621, 2234, 2527, 2568, 2658, 2794, 2869, 3067, 5383, 5640, 5698, 5747, 7518, 7791, 7829], "errorMessage": "invalid array length header" }, { "pc": [5395], "errorMessage": "invalid number of bytes for arc4.dynamic_array<account>" }, { "pc": [2534, 2665, 2801, 2876, 3077, 7836], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [7527], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [5717], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/subscriptions/types.ts::TriggerListRequest>" }, { "pc": [2652, 2788, 3410, 3496, 3591, 3689, 3766, 3847, 3941, 4056, 4149, 4247, 5953, 5962, 5993, 6104, 6198, 6290, 6334, 7195, 7224, 7259], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [2677, 2813], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 36>" }, { "pc": [2694, 2830], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 3>" }, { "pc": [2545, 2606, 2615, 2624, 2633, 2642, 2702, 2742, 2751, 2760, 2769, 2778, 2852, 2861, 3057, 3242, 3291, 3351, 3599, 3608, 3617, 3626, 3697, 3706, 3715, 3774, 3783, 3792, 3801, 3855, 3864, 3873, 3949, 3958, 3967, 3976, 4064, 4073, 4082, 4157, 4166, 4175, 4184, 4255, 4264, 4273, 4323, 4459, 4557, 4566, 4692, 5013, 5373, 6001, 6048, 6056, 6082, 6112, 6122, 6131, 6206, 6215, 6261, 6298, 6342, 6352, 7304, 7734, 7906], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [2685, 2821], "errorMessage": "invalid number of bytes for arc4.uint8" }, { "pc": [1441], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5005, 5082, 5146, 5173, 5305, 5601, 6253, 6533, 6753, 6789], "errorMessage": "invalid number of bytes for smart_contracts/subscriptions/types.ts::SubscriptionKey" }, { "pc": [2573, 7796], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [2327, 2461], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [2560, 7783], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [5694], "errorMessage": "invalid tail pointer at index 1 of (uint8[32],(len+uint64[]))" }, { "pc": [5678], "errorMessage": "invalid tail pointer for (len+(uint8[32],(len+uint64[]))[])" }, { "pc": [2555, 5689, 7778], "errorMessage": "invalid tuple encoding" }, { "pc": [3582, 3680, 3932, 4047, 4996, 5073, 9043, 9121], "errorMessage": "transaction type is appl" }, { "pc": [3921, 4036, 4140, 4238, 4451, 8168, 8349], "errorMessage": "transaction type is axfer" }, { "pc": [2598, 2734, 3401, 3571, 3669, 3757, 3838, 3910, 4025, 4129, 4227, 4315, 5163, 7296], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiAxMDAwMDAgNjA1MDAgMzQ5MDAgMTg5MDAgMjg1MDAgNzk4MDAgMTQ0MjAwIDEzNzg5MDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgMHgxNTFmN2M3NSAibyIgIiIgInMiICJha2l0YV9lc2Nyb3ciICJFUlI6ZXJyU2RuZSIgIkVSUjplcnJVZG5lIiAiYWFsIiAweDAwICJiIiAweDAwMDAgIm0iIDB4MjggImwiICJ3YWxsZXQiIDB4MTQgInAiICJwYXNzZXNfcmVwcmljZWRfYXQiICJpIiAiRVJSOmVyckZndGUiICJFUlI6ZXJySXNlcSIgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJyZWZlcnJlciIgIkVSUjplcnJBc2FtIiAiRVJSOmVycklwYXkiICJFUlI6ZXJyTmRhbyIgInN1YnNjcmlwdGlvbl9mZWVzIiAiRVJSOmVyck5vcHQiIDB4Yzg4MzUxMzAgMHgzOTRlYWViMiAiYXBwSUQiICJFUlI6ZXJySXBtciIgIkVSUjplcnJJcG1hIiAiRVJSOmVycklwbXMiICJjb250cm9sbGVkX2FkZHJlc3MiICJFUlI6ZXJySXdsdCIgMHgwMDAxICJ2ZXJzaW9uIiAiRVJSOmVyclR0bGciICJFUlI6ZXJyU25hYyIgIkVSUjplcnJTc2hkIiAiRVJSOmVyckJsa2QiICJwYWwiICJFUlI6ZXJySXhmciIgIkVSUjplcnJNYW10IiAiRVJSOmVyck1pbnYiICJFUlI6ZXJyTnN2YyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI3LTEzMwogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgU3Vic2NyaXB0aW9ucyBleHRlbmRzIGNsYXNzZXMoQmFzZVN1YnNjcmlwdGlvbnMsIEFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4pIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNy0xMzMKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDU5CiAgICBwdXNoYnl0ZXNzIDB4NDY4ZWJlNjMgMHg5YjBmODlkNiAweDM2NmQ1YjI3IDB4OWJhMDIwYjYgLy8gbWV0aG9kICJuZXdTZXJ2aWNlKHBheSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10sdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3U2VydmljZShwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdKXVpbnQ2NCIsIG1ldGhvZCAic2V0U2VydmljZURlc2NyaXB0aW9uKHVpbnQ2NCx1aW50NjQsYnl0ZVtdKXZvaWQiLCBtZXRob2QgInVwZGF0ZVNlcnZpY2VUaXRsZSh1aW50NjQsc3RyaW5nKXZvaWQiCiAgICBieXRlYyAzMCAvLyBtZXRob2QgImFjdGl2YXRlU2VydmljZSgpdm9pZCIKICAgIHB1c2hieXRlc3MgMHgxN2M4NzMwYiAweDRjZGYwY2Q3IDB4ODdlMDU1YzYgMHhiNTljOGE1NCAweGFlZWJiMzc4IDB4NzI5MWMwOGUgMHg1MzU1ZGE2ZCAweGEwNDdjN2Y3IDB4MTBmMDBjM2EgMHg3NzI0NWE4NCAweGE2OGU2OTYzIDB4NGNiMTU1ZWUgMHhiMTBhMzA2ZSAweGYyMzU1YjU1IDB4MWFjNGE3NTggMHhlM2FlYjI1YyAweGVhYWFhNGQzIDB4MTc2NTM4N2QgMHgyODFiODkxYiAweGMzZDlmMWRjIDB4NTk0ZWJhMWQgMHhjMGZmMjczMCAweDI3NTIwM2FmIDB4MTlhNTQ4ZmEgMHgxMjY5ZDg3ZSAweDQzMDM2NjhlIDB4MGQ2YTQ3YTMgMHgyMjA3MDc4ZSAweDFkYzc4MzcxIDB4YjFiYWMyY2IgMHgwOWEzMTU4ZSAweDk5MmY5ODkyIDB4Zjk5OTYzZDQgMHhkNGIxNmU3YSAweDc0ZGVmNTlhIDB4MjViODEyYTcgMHg5NjljZWQ5YiAweDMzZDhlNWFkIDB4NjAzZDcyOTcgMHhkZmU2MDJjZiAweGQ4YTZjNTIzIC8vIG1ldGhvZCAicGF1c2VTZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnBhdXNlU2VydmljZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAic2h1dGRvd25TZXJ2aWNlKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJibG9jayhwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJ1bmJsb2NrKGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmUocGF5LGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJnYXRlZFN1YnNjcmliZShwYXksYXBwbCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAic3Vic2NyaWJlKHBheSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZShwYXksYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImdhdGVkU3Vic2NyaWJlQXNhKHBheSxheGZlcixhcHBsLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZ2F0ZWRTdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInN1YnNjcmliZUFzYShwYXksYXhmZXIsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJzdWJzY3JpYmVBc2EocGF5LGF4ZmVyLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJkZXBvc2l0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZGVwb3NpdEFzYShheGZlcix1aW50NjQpdm9pZCIsIG1ldGhvZCAid2l0aGRyYXcodWludDY0LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1bnN1YnNjcmliZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRUcmlnZ2VyUGF5bWVudChhcHBsLChhZGRyZXNzLHVpbnQ2NCksdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkVHJpZ2dlclBheW1lbnQoYXBwbCwoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInRyaWdnZXJQYXltZW50KChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAiYWRvcHRQcmluY2lwYWwocGF5LChhZGRyZXNzLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAic3RyZWFrQ2hlY2soKGFkZHJlc3MsdWludDY0KSl2b2lkIiwgbWV0aG9kICJzZXRQYXNzZXModWludDY0LGFkZHJlc3NbXSl2b2lkIiwgbWV0aG9kICJjbGVhck9ycGhhblBhc3NlcygoYWRkcmVzcyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInRyaWdnZXJMaXN0KChhZGRyZXNzLHVpbnQ2NFtdKVtdKWJvb2xbXSIsIG1ldGhvZCAiaXNCbG9ja2VkKGFkZHJlc3MsYWRkcmVzcylib29sIiwgbWV0aG9kICJpc1NodXRkb3duKGFkZHJlc3MsdWludDY0KWJvb2wiLCBtZXRob2QgIm5ld1NlcnZpY2VDb3N0KHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTZXJ2aWNlQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTdWJzY3JpcHRpb25Db3N0KGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdTdWJzY3JpcHRpb25Db3N0KGFkZHJlc3MsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInRyaWdnZXJHYXRlQ3R4KChhZGRyZXNzLHVpbnQ2NCksdWludDY0KShhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzKSIsIG1ldGhvZCAiYmxvY2tDb3N0KCl1aW50NjQiLCBtZXRob2QgImdldFNlcnZpY2UoYWRkcmVzcyx1aW50NjQpKHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10pIiwgbWV0aG9kICJnZXRTZXJ2aWNlc0J5QWRkcmVzcyhhZGRyZXNzLHVpbnQ2NCx1aW50NjQpKHVpbnQ4LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsc3RyaW5nLGJ5dGVbMzZdLHVpbnQ4LGJ5dGVbM10pW10iLCBtZXRob2QgImdldFN1YnNjcmlwdGlvbigoYWRkcmVzcyx1aW50NjQpKShib29sLGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJtdXN0R2V0U3Vic2NyaXB0aW9uKChhZGRyZXNzLHVpbnQ2NCkpKGFkZHJlc3MsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlscygoYWRkcmVzcyx1aW50NjQpKShhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ4LGFkZHJlc3Msc3RyaW5nLHN0cmluZyxieXRlWzM2XSx1aW50OCxieXRlWzNdLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3NbXSkiLCBtZXRob2QgImlzRmlyc3RTdWJzY3JpcHRpb24oYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRTZXJ2aWNlTGlzdChhZGRyZXNzKXVpbnQ2NCIsIG1ldGhvZCAiZ2V0U3Vic2NyaXB0aW9uTGlzdChhZGRyZXNzKXVpbnQ2NCIKICAgIGJ5dGVjIDMxIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgcHVzaGJ5dGVzcyAweDMzZjc4ODA4IDB4YWU4NGNiZDggMHgzM2U5MmM5NCAweDg1NGRlZGUwIC8vIG1ldGhvZCAib3B0SW5Db3N0KHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG5ld1NlcnZpY2UgbGVnYWN5TmV3U2VydmljZSBzZXRTZXJ2aWNlRGVzY3JpcHRpb24gdXBkYXRlU2VydmljZVRpdGxlIGFjdGl2YXRlU2VydmljZSBwYXVzZVNlcnZpY2UgdW5wYXVzZVNlcnZpY2Ugc2h1dGRvd25TZXJ2aWNlIGJsb2NrIHVuYmxvY2sgZ2F0ZWRTdWJzY3JpYmUgbGVnYWN5R2F0ZWRTdWJzY3JpYmUgc3Vic2NyaWJlIGxlZ2FjeVN1YnNjcmliZSBnYXRlZFN1YnNjcmliZUFzYSBsZWdhY3lHYXRlZFN1YnNjcmliZUFzYSBzdWJzY3JpYmVBc2EgbGVnYWN5U3Vic2NyaWJlQXNhIGRlcG9zaXQgZGVwb3NpdEFzYSB3aXRoZHJhdyB1bnN1YnNjcmliZSBnYXRlZFRyaWdnZXJQYXltZW50IGxlZ2FjeUdhdGVkVHJpZ2dlclBheW1lbnQgdHJpZ2dlclBheW1lbnQgYWRvcHRQcmluY2lwYWwgc3RyZWFrQ2hlY2sgc2V0UGFzc2VzIGNsZWFyT3JwaGFuUGFzc2VzIHRyaWdnZXJMaXN0IGlzQmxvY2tlZCBpc1NodXRkb3duIG5ld1NlcnZpY2VDb3N0IGxlZ2FjeU5ld1NlcnZpY2VDb3N0IG5ld1N1YnNjcmlwdGlvbkNvc3QgbGVnYWN5TmV3U3Vic2NyaXB0aW9uQ29zdCB0cmlnZ2VyR2F0ZUN0eCBtYWluX2Jsb2NrQ29zdF9yb3V0ZUA0NCBnZXRTZXJ2aWNlIGdldFNlcnZpY2VzQnlBZGRyZXNzIGdldFN1YnNjcmlwdGlvbiBtdXN0R2V0U3Vic2NyaXB0aW9uIGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzIGlzRmlyc3RTdWJzY3JpcHRpb24gZ2V0U2VydmljZUxpc3QgZ2V0U3Vic2NyaXB0aW9uTGlzdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDU3CiAgICBlcnIKCm1haW5fb3BVcF9yb3V0ZUA1NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9ibG9ja0Nvc3Rfcm91dGVANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NTIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDAzZDU0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BANTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNy0xMzMKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnMgZXh0ZW5kcyBjbGFzc2VzKEJhc2VTdWJzY3JpcHRpb25zLCBBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluKSB7CiAgICBwdXNoYnl0ZXMgMHg1YWQ5ZjRjNiAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsdWludDY0LChzdHJpbmcsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gX3B1eWFfbGliLmFyYzQuZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudChhcnJheTogYnl0ZXMsIGluZGV4OiB1aW50NjQpIC0+IGJ5dGVzOgpkeW5hbWljX2FycmF5X3JlYWRfZHluYW1pY19lbGVtZW50OgogICAgcHJvdG8gMiAxCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzMgLy8gMgogICAgKgogICAgZGlnIDIKICAgIHN3YXAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMgogICAgbGVuCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBkaWcgNQogICAgc3dhcAogICAgZXh0cmFjdF91aW50MTYKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICAtCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldCh3YWxsZXQ6IHVpbnQ2NCwgd2FsbGV0RmFjdG9yeTogdWludDY0KSAtPiB1aW50NjQ6CmlzR2VudWluZVdhbGxldDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gaXNHZW51aW5lV2FsbGV0KHdhbGxldDogdWludDY0LCB3YWxsZXRGYWN0b3J5OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogaXNHZW51aW5lV2FsbGV0X2lmX2JvZHlAMgogICAgZnJhbWVfZGlnIC0xCiAgICBibnogaXNHZW51aW5lV2FsbGV0X2FmdGVyX2lmX2Vsc2VAMwoKaXNHZW51aW5lV2FsbGV0X2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAzCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICByZXRzdWIKCmlzR2VudWluZVdhbGxldF9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBpc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc0CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChvcC5pdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBieXRlYyAzMiAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBpc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2CiAgICBpbnRjXzEgLy8gMQoKaXNHZW51aW5lV2FsbGV0X2Jvb2xfbWVyZ2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgc3dhcAogICAgcmV0c3ViCgppc0dlbnVpbmVXYWxsZXRfYm9vbF9mYWxzZUA2OgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNHZW51aW5lV2FsbGV0X2Jvb2xfbWVyZ2VANwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6Om93bnNBdFJlc3Qod2FsbGV0RmFjdG9yeTogdWludDY0LCB3YWxsZXQ6IHVpbnQ2NCwgYWNjb3VudDogYnl0ZXMpIC0+IHVpbnQ2NDoKb3duc0F0UmVzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjUyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gb3duc0F0UmVzdCh3YWxsZXRGYWN0b3J5OiB1aW50NjQsIHdhbGxldDogdWludDY0LCBhY2NvdW50OiBBY2NvdW50KTogYm9vbGVhbiB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjUzCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMwogICAgY2FsbHN1YiBpc0dlbnVpbmVXYWxsZXQKICAgIGJueiBvd25zQXRSZXN0X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNTQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKb3duc0F0UmVzdF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc5CiAgICAvLyBjb25zdCBbYWRkcmVzc10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI1NwogICAgLy8gaWYgKGFjY291bnQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJ6IG93bnNBdFJlc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI1OAogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgcmV0c3ViCgpvd25zQXRSZXN0X2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNjAKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGFjY291bnQpID09PSB3YWxsZXRBZGRyZXNzCiAgICA9PQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6Z2F0ZUN0eChwOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpnYXRlQ3R4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czozMDMKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnYXRlQ3R4KHA6IFByaW5jaXBhbCk6IEdhdGVDdHggewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCA4IDMyCiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgMCA4CiAgICBmcmFtZV9kaWcgLTEKICAgIGV4dHJhY3QgNzIgMzIKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFBsYWluUGF5bWVudCh0eG46IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0UGxhaW5QYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFBsYWluUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjphc3NlcnRFeGFjdFBheW1lbnQodHhuOiB1aW50NjQsIHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEV4YWN0UGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRFeGFjdFBheW1lbnQodHhuOiBndHhuLlBheW1lbnRUeG4sIHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQodHhuKQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWNlaXZlciA9PT0gcmVjZWl2ZXIsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICBibnogYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzMyAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKYXNzZXJ0RXhhY3RQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hbW91bnQgPT09IGFtb3VudCwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMzQgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCmFzc2VydEV4YWN0UGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiB2b2lkOgpyZWNvcmRQYXllcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA1CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVjb3JkUGF5ZXIocmVjb3JkOiBieXRlcywgcGF5ZXI6IEFjY291bnQsIG93bmVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA2CiAgICAvLyBpZiAocGF5ZXIgIT09IG93bmVyKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IHJlY29yZFBheWVyX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgcHVzaGJ5dGVzICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNwogICAgLy8gb3AuQm94LnB1dChwYXllclJlY29yZEtleShyZWNvcmQpLCBwYXllci5ieXRlcykKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X3B1dAoKcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVsZWFzZURlcG9zaXQocmVjb3JkOiBieXRlcywgb3duZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnJlbGVhc2VEZXBvc2l0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDAKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiByZWxlYXNlRGVwb3NpdChyZWNvcmQ6IGJ5dGVzLCBvd25lcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBbQWNjb3VudCwgdWludDY0XSB7CiAgICBwcm90byAzIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0zCiAgICBzaGEyNTYKICAgIHB1c2hieXRlcyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MgogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChrZXkpCiAgICBib3hfZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKCFzcG9uc29yZWQpIHsKICAgIGJueiByZWxlYXNlRGVwb3NpdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcmVsZWFzZURlcG9zaXRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBmcmFtZV9kaWcgLTEKICAgIGludGMgOCAvLyAyODUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZGlnIDEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiByZWxlYXNlRGVwb3NpdF9ib29sX3RydWVAOAogICAgZHVwCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X2Jvb2xfZmFsc2VAOQoKcmVsZWFzZURlcG9zaXRfYm9vbF90cnVlQDg6CiAgICBpbnRjXzEgLy8gMQoKcmVsZWFzZURlcG9zaXRfYm9vbF9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ4CiAgICAvLyByZXR1cm4gW2NhblJlY2VpdmVBbGdvKEFjY291bnQocGF5ZXIpLCB0b3RhbCkgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyLCB0b3RhbF0KICAgIGJ6IHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANAogICAgc3dhcAoKcmVsZWFzZURlcG9zaXRfdGVybmFyeV9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCnJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfZmFsc2VANDoKICAgIGJ1cnkgMQogICAgZnJhbWVfZGlnIC0yCiAgICBiIHJlbGVhc2VEZXBvc2l0X3Rlcm5hcnlfbWVyZ2VANQoKcmVsZWFzZURlcG9zaXRfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVsZWFzZURlcG9zaXRfYm9vbF9tZXJnZUAxMAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFNhZmVBc3NldFRyYW5zZmVyKHR4bjogdWludDY0LCBzZW5kZXI6IGJ5dGVzKSAtPiB2b2lkOgphc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIHNlbmRlcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZnJhbWVfZGlnIC0xCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAzNSAvLyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRTZW5kZXIKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3Cgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQ6IHVpbnQ2NCwgb3I6IGJ5dGVzKSAtPiBieXRlczoKbGVnYWN5T3JpZ2luT3I6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMxMwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElEOiBBcHBsaWNhdGlvbiwgb3I6IEFjY291bnQpOiBBY2NvdW50IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogbGVnYWN5T3JpZ2luT3JfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMxNQogICAgLy8gcmV0dXJuIG9yCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKbGVnYWN5T3JpZ2luT3JfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDEtMzQ0CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQzCiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIGJ5dGVjIDM2IC8vICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MS0zNDQKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBieiBsZWdhY3lPcmlnaW5Pcl9ib29sX2ZhbHNlQDEwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGxlZ2FjeU9yaWdpbk9yX2Jvb2xfZmFsc2VAMTAKICAgIGludGNfMSAvLyAxCgpsZWdhY3lPcmlnaW5Pcl9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDUKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYm56IGxlZ2FjeU9yaWdpbk9yX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmxlZ2FjeU9yaWdpbk9yX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzE4CiAgICAvLyBpZiAob3JpZ2luICE9PSB3YWxsZXRJRC5hZGRyZXNzICYmIG9yaWdpbiAhPT0gVHhuLnNlbmRlciAmJiBvcmlnaW4uYXV0aEFkZHJlc3MgIT09IHdhbGxldElELmFkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDEKICAgICE9CiAgICBieiBsZWdhY3lPcmlnaW5Pcl9hZnRlcl9pZl9lbHNlQDYKICAgIGR1cAogICAgdHhuIFNlbmRlcgogICAgIT0KICAgIGJ6IGxlZ2FjeU9yaWdpbk9yX2FmdGVyX2lmX2Vsc2VANgogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGxlZ2FjeU9yaWdpbk9yX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTkKICAgIC8vIHJldHVybiBvcgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICByZXRzdWIKCmxlZ2FjeU9yaWdpbk9yX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzIxCiAgICAvLyByZXR1cm4gb3JpZ2luCiAgICByZXRzdWIKCmxlZ2FjeU9yaWdpbk9yX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsZWdhY3lPcmlnaW5Pcl9ib29sX21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPclplcm9BZGRyZXNzKHdhbGxldElEOiB1aW50NjQpIC0+IGJ5dGVzOgpyZWZlcnJlck9yWmVyb0FkZHJlc3M6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMzNQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlZmVycmVyT3JaZXJvQWRkcmVzcyh3YWxsZXRJRDogQXBwbGljYXRpb24pOiBBY2NvdW50IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzYKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzI5CiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHJlZmVycmVyT3JaZXJvQWRkcmVzc19hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM2CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgcmV0c3ViCgpyZWZlcnJlck9yWmVyb0FkZHJlc3NfYWZ0ZXJfaWZfZWxzZUAzOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1MC0zNTMKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUyCiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIGJ5dGVjIDI0IC8vICJyZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUwLTM1MwogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM2CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0T2YoYWtpdGFEQU86IHVpbnQ2NCwgYWRkcmVzczogYnl0ZXMpIC0+IHVpbnQ2NDoKbGVnYWN5V2FsbGV0T2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM3OQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGxlZ2FjeVdhbGxldE9mKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjIxCiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGJ5dGVzICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNgogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzg4LTM5MQogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTMKICAgIC8vIGlmIChCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTQKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmxlZ2FjeVdhbGxldE9mX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk3CiAgICAvLyBjb25zdCB3YWxsZXQgPSBidG9pKGRhdGEpCiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY0CiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2lmX2JvZHlAMTAKICAgIGZyYW1lX2RpZyAxCiAgICBibnogbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaWZfZWxzZUAxMQoKbGVnYWN5V2FsbGV0T2ZfaWZfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY1CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzgwCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA3CgpsZWdhY3lXYWxsZXRPZl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjcKICAgIC8vIGNvbnN0IFtjcmVhdG9yLCBleGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcENyZWF0b3Iod2FsbGV0KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY4CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGxlZ2FjeVdhbGxldE9mX2Jvb2xfZmFsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzU5CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChpdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGJ5dGVjIDMyIC8vICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjgKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzcyh3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiBsZWdhY3lXYWxsZXRPZl9ib29sX2ZhbHNlQDE0CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGxlZ2FjeVdhbGxldE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxNgoKbGVnYWN5V2FsbGV0T2ZfYm9vbF9mYWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGIgbGVnYWN5V2FsbGV0T2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2F0ZUNoZWNrKGdhdGVUeG46IHVpbnQ2NCwgYWtpdGFEQU86IHVpbnQ2NCwgY2FsbGVyOiBieXRlcywgaWQ6IHVpbnQ2NCkgLT4gdWludDY0OgpnYXRlQ2hlY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGdhdGVDaGVjayhnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBjYWxsZXI6IEFjY291bnQsIGlkOiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDQgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDIKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDIKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MwogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyLTQ0MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ0CiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ1CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyLTQ0NQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ2CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDEtNDQ4CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQxLTQ0OAogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNwbGl0T3B0SW5Db3VudChha2l0YURBTzogdWludDY0LCBlc2Nyb3c6IGJ5dGVzLCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnNwbGl0T3B0SW5Db3VudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODg0CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc3BsaXRPcHRJbkNvdW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgZXNjcm93OiBBY2NvdW50LCBhc3NldDogQXNzZXQpOiB1aW50NjQgewogICAgcHJvdG8gMyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg4NQogICAgLy8gbGV0IGNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4ODcKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IHNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjY1CiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBmcmFtZV9kaWcgLTMKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5MQogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODg4CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMAoKc3BsaXRPcHRJbkNvdW50X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODk0CiAgICAvLyByZXR1cm4gY291bnQKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwcmluY2lwYWxPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpwcmluY2lwYWxPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTIyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsT2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBoaW50OiB1aW50NjQpOiBQcmluY2lwYWwgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjMKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEyCiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTMKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjE0CiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgY29uY2F0CgpwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMwogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBpc0dlbnVpbmVXYWxsZXQKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTU0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludE5vdFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhud2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG53bAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY2CiAgICAvLyBsZXQgdmlhUGx1Z2luID0gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NwogICAgLy8gaWYgKGNhbGxlckFwcCAhPT0gaGludCkgewogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MQogICAgLy8gY29uc3QgW3NwZW5kaW5nLCBzcGVuZGluZ0V4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1NQRU5ESU5HKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJzcGVuZGluZ19hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzIKICAgIC8vIGlmICghKHNwZW5kaW5nRXhpc3RzICYmIHNwZW5kaW5nLmxlbmd0aCA9PT0gMzIgJiYgc3BlbmRpbmcgPT09IHNlbmRlci5ieXRlcyAmJiBzZW5kZXIgIT09IGNhbGxlckFkZHIpKSB7CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDEyCiAgICBmcmFtZV9kaWcgMAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxMgogICAgZnJhbWVfZGlnIDAKICAgIGRpZyAxCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxMgogICAgZHVwCiAgICBmcmFtZV9kaWcgMQogICAgIT0KICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzCgpwcmluY2lwYWxPZl9pZl9ib2R5QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90Qm91bmQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhuYmQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3OAogICAgLy8gdmlhUGx1Z2luID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRCeXRlcywgY29udHJvbGxlZEV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX0NPTlRST0xMRUQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAzNiAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAxNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxNwoKcHJpbmNpcGFsT2ZfaWZfYm9keUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIGJ5dGVjIDM3IC8vICJFUlI6ZXJySXdsdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJd2x0CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMTkKICAgIC8vIGlmIChjb250cm9sbGVkID09PSBzcGVuZGVyKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjAKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MQogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXMsIHJlZmVycmVyRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfUkVGRVJSRVIpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyAyNCAvLyAicmVmZXJyZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAyNwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDI3CiAgICBjb3ZlciAzCgpwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTYKICAgIC8vIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICBkaWcgMgogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzZWxlY3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzMAogICAgc3dhcAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk0LTIwMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiBoaW50LAogICAgLy8gICBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyLAogICAgLy8gICB2aWFQbHVnaW4sCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIwOS0yMTYKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsQ3R4KAogICAgLy8gICB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBoaW50LAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhAMzIKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzA6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzEKCnByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMjc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDI4CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjIKICAgIC8vIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCB3YWxsZXRFeGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMwogICAgLy8gaWYgKCF3YWxsZXRFeGlzdHMpIHsKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDI0CgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjYKICAgIC8vIGlmIChjb250cm9sbGVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMjQKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihjb250cm9sbGVkKSA9PT0gd2FsbGV0QWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAyNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnF1b3RlUmVmZXJyZXJPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpxdW90ZVJlZmVycmVyT2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzMgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHF1b3RlUmVmZXJyZXJPZihha2l0YURBTzogQXBwbGljYXRpb24sIGhpbnQ6IHVpbnQ2NCk6IEFjY291bnQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzMwogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDAKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNhbGxzdWIgaXNHZW51aW5lV2FsbGV0CiAgICBibnogcXVvdGVSZWZlcnJlck9mX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDEKICAgIC8vIHJldHVybiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwoKcXVvdGVSZWZlcnJlck9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cXVvdGVSZWZlcnJlckA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MzMKICAgIC8vIHJldHVybiBxdW90ZVJlZmVycmVyKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcmV0c3ViCgpxdW90ZVJlZmVycmVyT2ZfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNDMKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMjQgLy8gInJlZmVycmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjQ0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogcXVvdGVSZWZlcnJlck9mX3Rlcm5hcnlfZmFsc2VANgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBxdW90ZVJlZmVycmVyT2ZfdGVybmFyeV9mYWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzMwogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICByZXRzdWIKCnF1b3RlUmVmZXJyZXJPZl90ZXJuYXJ5X2ZhbHNlQDY6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjQ0CiAgICAvLyByZXR1cm4gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzMwogICAgLy8gcmV0dXJuIHF1b3RlUmVmZXJyZXIoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBiIHF1b3RlUmVmZXJyZXJPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnF1b3RlUmVmZXJyZXJAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdhdGVDaGVja0N0eChnYXRlVHhuOiB1aW50NjQsIGFraXRhREFPOiB1aW50NjQsIGN0eDogYnl0ZXMsIGlkOiB1aW50NjQpIC0+IHVpbnQ2NCwgYnl0ZXM6CmdhdGVDaGVja0N0eDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY2CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrQ3R4KGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGN0eDogR2F0ZUN0eCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0zCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OC05NjkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY5CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjgtOTY5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzAKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OC05NzAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzEKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg5YjE0N2QyYyAvLyBtZXRob2QgIm11c3RDaGVja0ZvcigoYWRkcmVzcyx1aW50NjQsYWRkcmVzcyksdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjgtOTcxCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTcyCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAtMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4LTk3MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogZ2F0ZUNoZWNrQ3R4X2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzMKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OC05NzMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCgpnYXRlQ2hlY2tDdHhfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjctOTc0CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCmdhdGVDaGVja0N0eF9ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgYiBnYXRlQ2hlY2tDdHhfYm9vbF9tZXJnZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyYWxGZWVUbyhha2l0YURBTzogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVmZXJyYWxGZWVUbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVmZXJyYWxGZWVUbyhha2l0YURBTzogQXBwbGljYXRpb24sIHJlZmVycmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk4MgogICAgLy8gaWYgKHJlZmVycmVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogcmVmZXJyYWxGZWVUb19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTgzCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpyZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzE3CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MTgKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDkgLy8gNzk4MDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MjAKICAgIC8vIGlmIChhc3NldCAhPT0gMCAmJiAhQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiByZWZlcnJhbEZlZVRvX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MTgKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnNMZW5ndGgpCiAgICBpbnRjIDkgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzIxCiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnJlZmVycmFsRmVlVG9fYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5ODYKICAgIC8vIHJldHVybiBjb3N0SW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTywgYXNzZXQsIDEpCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50VG8oYWtpdGFEQU86IHVpbnQ2NCwgcmVmZXJyZXI6IGJ5dGVzLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcmVjbGFpbVRvOiBieXRlcykgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnRUbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk1CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gc2VuZFJlZmVycmFsUGF5bWVudFRvKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgcmVmZXJyZXI6IEFjY291bnQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCByZWNsYWltVG86IEFjY291bnQpOiBSZWZlcnJhbFBheW1lbnRJbmZvIHsKICAgIHByb3RvIDUgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTcKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIC00CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtNQogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk5CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0yCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAyCiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAzCiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDkKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTAKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgZHVwCiAgICBwdXNoaW50IDI1OTIwMDAKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxMQogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMAogICAgaXRvYgogICAgZnJhbWVfZGlnIC00CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDM4IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTUKICAgIGJ5dGVjIDggLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU1CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU4CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyNTMwMAogICAgKgogICAgcHVzaGludCA1NDUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjAKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0zCiAgICBibnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2Vsc2VfYm9keUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjEtNzczCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjUKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgc3dhcAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2NgogICAgLy8gYW1vdW50OiBtYnIgKyBzdW0KICAgIGRpZyAyCiAgICBmcmFtZV9kaWcgMAogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY0LTc2NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYxLTc3MwogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjgKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjkKICAgIC8vIGV4cGlyYXRpb24sCiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MS03NzMKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkY2FjMDkzNSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MTUKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDA2LTEwMTUKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHJlY2xhaW1UbwogICAgLy8gKQogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxNwogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IChhbW91bnQgLSByZWZlcnJhbEZlZSksIHJlZmVycmFsTWJyIH0KICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIDAKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50VG9fZWxzZV9ib2R5QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzUKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19pZl9ib2R5QDE0CiAgICBkdXAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTktODEyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDMKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODAyLTgwNQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA2CiAgICAvLyB0cmFuc2ZlclR4biwKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODktNzkzCiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTktODEyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwNwogICAgLy8gdGltZVRvVW5sb2NrLAogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwOAogICAgLy8gZXhwaXJhdGlvbiwKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk5LTgxMgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGEzYTE2Y2FhIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10sYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUAyMAoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2lmX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3NgogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGR1cAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3Ny03ODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgxCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAyCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgyCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODAtNzgzCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzctNzg2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg0CiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3Ny03ODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGJ5dGVjIDMxIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUAxNQoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAyMAogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IGFtb3VudCwgcmVmZXJyYWxNYnI6IDAgfQogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODM5CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMzkgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDIKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NDMKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShha2l0YURBT0VzY3JvdykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1NlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NTktODcyCiAgICAvLyBuZXdTZXJ2aWNlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwYXNzZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHBheW91dEFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIGJhbm5lckltYWdlOiBDSUQsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LAogICAgLy8gICBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4sCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzYKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM2PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ4CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMz4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3NAogICAgLy8gcmV0dXJuIHRoaXMubmV3U2VydmljZUltcGwocGF5bWVudCwgaW50ZXJ2YWwsIGFzc2V0LCBhbW91bnQsIHBhc3NlcywgZ2F0ZUlELCBwYXlvdXRBZGRyZXNzLCB0aXRsZSwgYmFubmVySW1hZ2UsIGhpZ2hsaWdodE1lc3NhZ2UsIGhpZ2hsaWdodENvbG9yLCBwLnJlZmVycmVyKQogICAgZXh0cmFjdCAxMDQgMzIKICAgIGNhbGxzdWIgbmV3U2VydmljZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODU5LTg3MgogICAgLy8gbmV3U2VydmljZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBhc3NldDogdWludDY0LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgcGFzc2VzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBwYXlvdXRBZGRyZXNzOiBBY2NvdW50LAogICAgLy8gICB0aXRsZTogc3RyaW5nLAogICAgLy8gICBiYW5uZXJJbWFnZTogQ0lELAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlOiBVaW50OCwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzPDM+LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeU5ld1NlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lOZXdTZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4NzgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3U2VydmljZScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDM2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzNj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50OAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDM+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5MgogICAgLy8gcmV0dXJuIHRoaXMubmV3U2VydmljZUltcGwocGF5bWVudCwgaW50ZXJ2YWwsIGFzc2V0LCBhbW91bnQsIHBhc3NlcywgZ2F0ZUlELCBwYXlvdXRBZGRyZXNzLCB0aXRsZSwgYmFubmVySW1hZ2UsIGhpZ2hsaWdodE1lc3NhZ2UsIGhpZ2hsaWdodENvbG9yLCB0aGlzLmxlZ2FjeVJlZmVycmVyKCkpCiAgICBjYWxsc3ViIGxlZ2FjeVJlZmVycmVyCiAgICBjYWxsc3ViIG5ld1NlcnZpY2VJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg3OAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICduZXdTZXJ2aWNlJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2V0U2VydmljZURlc2NyaXB0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0U2VydmljZURlc2NyaXB0aW9uOgogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4OTUKICAgIC8vIHNldFNlcnZpY2VEZXNjcmlwdGlvbihpZDogU2VydmljZUlELCBvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5NgogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4OTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjg5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KG9mZnNldCArIGRhdGEubGVuZ3RoIDw9IE1BWF9ERVNDUklQVElPTl9MRU5HVEgsIGVyckJhZERlc2NyaXB0aW9uTGVuZ3RoKQogICAgZGlnIDEKICAgIGxlbgogICAgZGlnIDMKICAgICsKICAgIHB1c2hpbnQgMzE1MQogICAgPD0KICAgIGJueiBzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckJkbG4iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmRsbgoKc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDEKICAgIC8vIGxldCBkZXNjQnl0ZXMgPSBCeXRlcyh0aGlzLnNlcnZpY2VzKGtleSkudmFsdWUuZGVzY3JpcHRpb24pCiAgICBkdXBuIDIKICAgIHB1c2hpbnQgNzUKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgZHVwMgogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTAzCiAgICAvLyBsb2dnZWRBc3NlcnQob2Zmc2V0IDw9IGRlc2NCeXRlcy5sZW5ndGgsIGVyckJhZE9mZnNldCkKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDYKICAgIGRpZyA0CiAgICA+PQogICAgYm56IHNldFNlcnZpY2VEZXNjcmlwdGlvbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm9mcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCb2ZzCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkwNQogICAgLy8gaWYgKG9mZnNldCA8IGRlc2NCeXRlcy5sZW5ndGgpIHsKICAgIGRpZyAzCiAgICBkaWcgNQogICAgPAogICAgYnogc2V0U2VydmljZURlc2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDYKICAgIC8vIGRlc2NCeXRlcyA9IGRlc2NCeXRlcy5zbGljZSgwLCBvZmZzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDUKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyA1CiAgICBkdXAKICAgIGRpZyAzCiAgICA+PQogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgdW5jb3ZlciA0CiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBjb3ZlciAyCgpzZXRTZXJ2aWNlRGVzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS5kZXNjcmlwdGlvbiA9IFN0cmluZyhkZXNjQnl0ZXMuY29uY2F0KGRhdGEpKQogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBkaWcgMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGRpZyAxCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHB1c2hpbnQgNzUKICAgIGV4dHJhY3RfdWludDE2CiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBib3hfZGVsCiAgICBwb3AKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODk1CiAgICAvLyBzZXRTZXJ2aWNlRGVzY3JpcHRpb24oaWQ6IFNlcnZpY2VJRCwgb2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy51cGRhdGVTZXJ2aWNlVGl0bGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVTZXJ2aWNlVGl0bGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkxMgogICAgLy8gdXBkYXRlU2VydmljZVRpdGxlKGlkOiBTZXJ2aWNlSUQsIHRpdGxlOiBzdHJpbmcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgIGR1cAogICAgY292ZXIgNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTMKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTE1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhrZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVwZGF0ZVNlcnZpY2VUaXRsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKdXBkYXRlU2VydmljZVRpdGxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyh0aXRsZSkubGVuZ3RoIDw9IE1BWF9USVRMRV9MRU5HVEgsIGVyclRpdGxlVG9vTG9uZykKICAgIHN3YXAKICAgIGxlbgogICAgcHVzaGludCAxMjgKICAgIDw9CiAgICBibnogdXBkYXRlU2VydmljZVRpdGxlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MCAvLyAiRVJSOmVyclR0bGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVHRsZwoKdXBkYXRlU2VydmljZVRpdGxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTgKICAgIC8vIHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZS50aXRsZSA9IHRpdGxlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNzMKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBleHRyYWN0MwogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIGRpZyAyCiAgICBwdXNoaW50IDc1CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDMKICAgIGxlbgogICAgdW5jb3ZlciA0CiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgLQogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDQKICAgICsKICAgIHN3YXAKICAgIC0KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICByZXBsYWNlMiA3NQogICAgZGlnIDEKICAgIGJveF9kZWwKICAgIHBvcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MTIKICAgIC8vIHVwZGF0ZVNlcnZpY2VUaXRsZShpZDogU2VydmljZUlELCB0aXRsZTogc3RyaW5nKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5hY3RpdmF0ZVNlcnZpY2Vbcm91dGluZ10oKSAtPiB2b2lkOgphY3RpdmF0ZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDEyIC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjUKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS52YWx1ZSAtIDEKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLnZhbHVlIC0gMQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWN0aXZhdGVTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgphY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNEcmFmdCwgZXJyU2VydmljZUlzTm90RHJhZnQpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIHB1c2hieXRlcyAweDBhCiAgICA9PQogICAgYm56IGFjdGl2YXRlU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU25kciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbmRyCgphY3RpdmF0ZVNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjkzMgogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNBY3RpdmUKICAgIGludGNfMCAvLyAwCiAgICBieXRlYyAxNiAvLyAweDE0CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIGFjdGl2YXRlU2VydmljZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnBhdXNlU2VydmljZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnBhdXNlU2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQyCiAgICAvLyBwYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDMKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzQWN0aXZlLCBlcnJTZXJ2aWNlSXNOb3RBY3RpdmUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDE2IC8vIDB4MTQKICAgID09CiAgICBibnogcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MSAvLyAiRVJSOmVyclNuYWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25hYwoKcGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NDkKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPSBTZXJ2aWNlU3RhdHVzUGF1c2VkCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzIDB4MWUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk0MgogICAgLy8gcGF1c2VTZXJ2aWNlKGlkOiBTZXJ2aWNlSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVucGF1c2VTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5wYXVzZVNlcnZpY2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gdW5wYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NTgKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHVucGF1c2VTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgp1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTYzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1BhdXNlZCwgZXJyU2VydmljZUlzTm90UGF1c2VkKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBwdXNoYnl0ZXMgMHgxZQogICAgPT0KICAgIGJueiB1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU25wYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTbnBhCgp1bnBhdXNlU2VydmljZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTY1CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUuc3RhdHVzID0gU2VydmljZVN0YXR1c0FjdGl2ZQogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjIDE2IC8vIDB4MTQKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gdW5wYXVzZVNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2h1dGRvd25TZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKc2h1dGRvd25TZXJ2aWNlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzMKICAgIC8vIHNodXRkb3duU2VydmljZShpZDogU2VydmljZUlEKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3NAogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5NzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2h1dGRvd25TZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzaHV0ZG93blNlcnZpY2VfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgIT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93biwgZXJyU2VydmljZUlzU2h1dGRvd24pCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ5dGVjIDEzIC8vIDB4MjgKICAgICE9CiAgICBibnogc2h1dGRvd25TZXJ2aWNlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MiAvLyAiRVJSOmVyclNzaGQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU3NoZAoKc2h1dGRvd25TZXJ2aWNlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODAKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgPSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZS5zdGF0dXMgIT09IFNlcnZpY2VTdGF0dXNTaHV0ZG93biwgZXJyU2VydmljZUlzU2h1dGRvd24pCiAgICBieXRlYyAxMyAvLyAweDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk4MAogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlLnN0YXR1cyA9IFNlcnZpY2VTdGF0dXNTaHV0ZG93bgogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTczCiAgICAvLyBzaHV0ZG93blNlcnZpY2UoaWQ6IFNlcnZpY2VJRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuYmxvY2tbcm91dGluZ10oKSAtPiB2b2lkOgpibG9jazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTg4CiAgICAvLyBibG9jayhwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGJsb2NrZWQ6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTAKICAgIC8vIGNvbnN0IGJveEtleSA9IHRoaXMuZ2V0QmxvY2tLZXkoVHhuLnNlbmRlciwgYmxvY2tlZCkKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEwIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTkzCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmxvY2tzKGJveEtleSkuZXhpc3RzLCBlcnJVc2VyQWxyZWFkeUJsb2NrZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGJsb2NrX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJVYWJsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVhYmwKCmJsb2NrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5OTYKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgY29zdHMuYmxvY2tzICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTk2CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGNvc3RzLmJsb2NrcyArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxCiAgICAvLyByZXR1cm4gcGF5ZXIgPT09IG93bmVyID8gMCA6IFBheWVyUmVjb3JkTUJSCiAgICA9PQogICAgaW50YyA4IC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OTk2CiAgICAvLyBhc3NlcnRFeGFjdFBheW1lbnQocGF5bWVudCwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGNvc3RzLmJsb2NrcyArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKSkKICAgIHB1c2hpbnQgMTU3MDAKICAgICsKICAgIHVuY292ZXIgMgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0RXhhY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5OAogICAgLy8gdGhpcy5ibG9ja3MoYm94S2V5KS5jcmVhdGUoKQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjk5OQogICAgLy8gcmVjb3JkUGF5ZXIodGhpcy5ibG9ja3MoYm94S2V5KS5rZXksIHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRQYXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo5ODgKICAgIC8vIGJsb2NrKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudW5ibG9ja1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVuYmxvY2s6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDYKICAgIC8vIHVuYmxvY2soYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDA3CiAgICAvLyBjb25zdCBib3hLZXkgPSB0aGlzLmdldEJsb2NrS2V5KFR4bi5zZW5kZXIsIGJsb2NrZWQpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyAxMCAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJsb2Nrcyhib3hLZXkpLmV4aXN0cywgZXJyVXNlck5vdEJsb2NrZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bmJsb2NrX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJVbmJsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVuYmwKCnVuYmxvY2tfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTIKICAgIC8vIHRoaXMuYmxvY2tzKGJveEtleSkuZGVsZXRlKCkKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMTYKICAgIC8vIGNvbnN0IFtyZWNlaXZlciwgYW1vdW50XSA9IHJlbGVhc2VEZXBvc2l0KHRoaXMuYmxvY2tzKGJveEtleSkua2V5LCBUeG4uc2VuZGVyLCBjb3N0cy5ibG9ja3MpCiAgICB0eG4gU2VuZGVyCiAgICBwdXNoaW50IDE1NzAwCiAgICBjYWxsc3ViIHJlbGVhc2VEZXBvc2l0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAxOAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXIsIGFtb3VudCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMDYKICAgIC8vIHVuYmxvY2soYmxvY2tlZDogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRTdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZFN1YnNjcmliZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTAyNy0xMDM1CiAgICAvLyBnYXRlZFN1YnNjcmliZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDM2CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIGZhbHNlLCAwLCB0cnVlLCBnYXRlVHhuLmdyb3VwSW5kZXgsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCB3YWxsZXQsIGZhbHNlKQogICAgdW5jb3ZlciA1CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDYKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBzdWJzY3JpYmVJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwMjctMTAzNQogICAgLy8gZ2F0ZWRTdWJzY3JpYmUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeUdhdGVkU3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRTdWJzY3JpYmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDAKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRTdWJzY3JpYmUnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNDkKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgZmFsc2UsIDAsIHRydWUsIGdhdGVUeG4uZ3JvdXBJbmRleCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIDAsIHRydWUpCiAgICB1bmNvdmVyIDQKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDQwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkU3Vic2NyaWJlJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Vic2NyaWJlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDU2LTEwNjMKICAgIC8vIHN1YnNjcmliZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA2NAogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaWJlSW1wbChwYXltZW50LCBmYWxzZSwgMCwgZmFsc2UsIDAsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCB3YWxsZXQsIGZhbHNlKQogICAgdW5jb3ZlciA1CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDU2LTEwNjMKICAgIC8vIHN1YnNjcmliZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5sZWdhY3lTdWJzY3JpYmVbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lTdWJzY3JpYmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNjgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnc3Vic2NyaWJlJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwNzYKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgZmFsc2UsIDAsIGZhbHNlLCAwLCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgMCwgdHJ1ZSkKICAgIHVuY292ZXIgNAogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDY4CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ3N1YnNjcmliZScgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdhdGVkU3Vic2NyaWJlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRTdWJzY3JpYmVBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwODAtMTA4OQogICAgLy8gZ2F0ZWRTdWJzY3JpYmVBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDkwCiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIHRydWUsIGFzc2V0WGZlci5ncm91cEluZGV4LCB0cnVlLCBnYXRlVHhuLmdyb3VwSW5kZXgsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCB3YWxsZXQsIGZhbHNlKQogICAgdW5jb3ZlciA2CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDYKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNwogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIHN1YnNjcmliZUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTA4MC0xMDg5CiAgICAvLyBnYXRlZFN1YnNjcmliZUFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeUdhdGVkU3Vic2NyaWJlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRTdWJzY3JpYmVBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEwOTQKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRTdWJzY3JpYmVBc2EnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA0CiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIHRydWUsIGFzc2V0WGZlci5ncm91cEluZGV4LCB0cnVlLCBnYXRlVHhuLmdyb3VwSW5kZXgsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCAwLCB0cnVlKQogICAgdW5jb3ZlciA1CiAgICBndHhucyBHcm91cEluZGV4CiAgICB1bmNvdmVyIDUKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNgogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMDk0CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkU3Vic2NyaWJlQXNhJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaWJlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKc3Vic2NyaWJlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4LTExMTYKICAgIC8vIHN1YnNjcmliZUFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMTcKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmliZUltcGwocGF5bWVudCwgdHJ1ZSwgYXNzZXRYZmVyLmdyb3VwSW5kZXgsIGZhbHNlLCAwLCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgd2FsbGV0LCBmYWxzZSkKICAgIHVuY292ZXIgNQogICAgZ3R4bnMgR3JvdXBJbmRleAogICAgdW5jb3ZlciA2CiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTA4LTExMTYKICAgIC8vIHN1YnNjcmliZUFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgcmVjaXBpZW50OiBBY2NvdW50LAogICAgLy8gICBhbW91bnQ6IHVpbnQ2NCwKICAgIC8vICAgaW50ZXJ2YWw6IHVpbnQ2NCwKICAgIC8vICAgc2VydmljZUlEOiBTZXJ2aWNlSUQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5U3Vic2NyaWJlQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5U3Vic2NyaWJlQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIxCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ3N1YnNjcmliZUFzYScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMwCiAgICAvLyByZXR1cm4gdGhpcy5zdWJzY3JpYmVJbXBsKHBheW1lbnQsIHRydWUsIGFzc2V0WGZlci5ncm91cEluZGV4LCBmYWxzZSwgMCwgcmVjaXBpZW50LCBhbW91bnQsIGludGVydmFsLCBzZXJ2aWNlSUQsIDAsIHRydWUpCiAgICB1bmNvdmVyIDQKICAgIGd0eG5zIEdyb3VwSW5kZXgKICAgIHVuY292ZXIgNQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgdW5jb3ZlciA4CiAgICB1bmNvdmVyIDgKICAgIHVuY292ZXIgOAogICAgdW5jb3ZlciA4CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgc3Vic2NyaWJlSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTIxCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ3N1YnNjcmliZUFzYScgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmRlcG9zaXRbcm91dGluZ10oKSAtPiB2b2lkOgpkZXBvc2l0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTMzCiAgICAvLyBkZXBvc2l0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzNAogICAgLy8gY29uc3Qgc3ViS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGV4dHJhY3QgMzIgOAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExMzgKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQwCiAgICAvLyBsb2dnZWRBc3NlcnQoc3ViLmFzc2V0ID09PSAwLCBlcnJBc2FNaXNtYXRjaCkKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBieiBkZXBvc2l0X2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyNSAvLyAiRVJSOmVyckFzYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQXNhbQoKZGVwb3NpdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0MgogICAgLy8gYXNzZXJ0U2FmZVBheW1lbnQocGF5bWVudCwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU2CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGRpZyAyCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogZGVwb3NpdF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDM1IC8vICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgpkZXBvc2l0X2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU3CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAyMiAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKZGVwb3NpdF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmRlcG9zaXRfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDEKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZXBvc2l0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyNiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZGVwb3NpdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE0NQogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkudmFsdWUuZXNjcm93ZWQgKz0gcGF5bWVudC5hbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgKwogICAgaXRvYgogICAgcHVzaGludCA5NgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTEzMwogICAgLy8gZGVwb3NpdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZGVwb3NpdEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlcG9zaXRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNDgKICAgIC8vIGRlcG9zaXRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ5CiAgICAvLyBjb25zdCBzdWJLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCmRlcG9zaXRBc2FfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTMKICAgIC8vIGNvbnN0IHsgYXNzZXQgfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTU1CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXQgPT09IGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsIGVyckFzYU1pc21hdGNoKQogICAgZGlnIDIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgPT0KICAgIGJueiBkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAyNSAvLyAiRVJSOmVyckFzYW0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQXNhbQoKZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE1NwogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNTgKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRBc3NldFJlY2VpdmVyKQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZGVwb3NpdEFzYV9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFyZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXJlCgpkZXBvc2l0QXNhX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTYwCiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZS5lc2Nyb3dlZCArPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICArCiAgICBpdG9iCiAgICBwdXNoaW50IDk2CiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTQ4CiAgICAvLyBkZXBvc2l0QXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBpZDogU3Vic2NyaXB0aW9uSUQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLndpdGhkcmF3W3JvdXRpbmddKCkgLT4gdm9pZDoKd2l0aGRyYXc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjMKICAgIC8vIHdpdGhkcmF3KGlkOiBTdWJzY3JpcHRpb25JRCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE2NAogICAgLy8gY29uc3Qgc3ViS2V5OiBTdWJzY3JpcHRpb25LZXkgPSB7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYtMTQ4CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTY2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB3aXRoZHJhd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKd2l0aGRyYXdfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjgKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHN1Yi5lc2Nyb3dlZCA+PSBhbW91bnQsIGVyck5vdEVub3VnaEZ1bmRzKQogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICA+PQogICAgYm56IHdpdGhkcmF3X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZWZuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lZm4KCndpdGhkcmF3X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTcyCiAgICAvLyBpZiAoc3ViLmFzc2V0ICE9PSAwKSB7CiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBieiB3aXRoZHJhd19lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTczLTExNzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE3NQogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNzMtMTE3OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHN1Yi5hc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTczLTExNzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp3aXRoZHJhd19hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTg5CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS52YWx1ZS5lc2Nyb3dlZCAtPSBhbW91bnQKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHB1c2hpbnQgOTYKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExNjMKICAgIC8vIHdpdGhkcmF3KGlkOiBTdWJzY3JpcHRpb25JRCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCndpdGhkcmF3X2Vsc2VfYm9keUA4OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODEtMTE4NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODMKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExODEtMTE4NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE4MS0xMTg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHdpdGhkcmF3X2FmdGVyX2lmX2Vsc2VAMTAKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlW3JvdXRpbmddKCkgLT4gdm9pZDoKdW5zdWJzY3JpYmU6CiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTE5MgogICAgLy8gdW5zdWJzY3JpYmUoaWQ6IFN1YnNjcmlwdGlvbklEKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTMKICAgIC8vIGNvbnN0IHN1YktleTogU3Vic2NyaXB0aW9uS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYtMTQ4CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMTk1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKHN1YktleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB1bnN1YnNjcmliZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKdW5zdWJzY3JpYmVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTcKICAgIC8vIGNvbnN0IHN1YiA9IGNsb25lKHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJLZXkpLnZhbHVlKQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTkKICAgIC8vIHRoaXMuZW5zdXJlUGFzc2VzUmVwcmljZWQoKQogICAgY2FsbHN1YiBlbnN1cmVQYXNzZXNSZXByaWNlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAxCiAgICAvLyBsZXQgbWJyUmVmdW5kOiB1aW50NjQgPSBjb3N0cy5zdWJzY3JpcHRpb25zCiAgICBpbnRjIDUgLy8gNjA1MDAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMgogICAgLy8gaWYgKHN1Yi5zZXJ2aWNlSUQgPiAwKSB7CiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDYKICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjAzCiAgICAvLyBjb25zdCB7IHBhc3NlcyB9ID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHN1Yi5yZWNpcGllbnQsIGlkOiBzdWIuc2VydmljZUlEIH0pLnZhbHVlCiAgICBkaWcgMwogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwMwogICAgLy8gY29uc3QgeyBwYXNzZXMgfSA9IHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiBzdWIucmVjaXBpZW50LCBpZDogc3ViLnNlcnZpY2VJRCB9KS52YWx1ZQogICAgcHVzaGludCAyNQogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDYKICAgIC8vIGlmIChwYXNzZXMgPiAwKSB7CiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDcKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gcGFzc2VzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgQWNjb3VudFtdPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFBhc3NlcyB9KQogICAgYnl0ZWMgMTcgLy8gInAiCiAgICBkaWcgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDcKICAgIC8vIHRoaXMucGFzc2VzKHN1YktleSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA4CiAgICAvLyBtYnJSZWZ1bmQgKz0gdGhpcy5wYXNzZXNDaGFyZ2VkKHN1Yi5zdGFydERhdGUpCiAgICBkaWcgMgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMjMKICAgIC8vIGlmICh0aGlzLnBhc3Nlc1JlcHJpY2VkQXQuaGFzVmFsdWUgJiYgc3RhcnREYXRlIDwgdGhpcy5wYXNzZXNSZXByaWNlZEF0LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIHBhc3Nlc1JlcHJpY2VkQXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBTdWJzY3JpcHRpb25zR2xvYmFsU3RhdGVLZXlQYXNzZXNSZXByaWNlZEF0IH0pCiAgICBieXRlYyAxOCAvLyAicGFzc2VzX3JlcHJpY2VkX2F0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMjMKICAgIC8vIGlmICh0aGlzLnBhc3Nlc1JlcHJpY2VkQXQuaGFzVmFsdWUgJiYgc3RhcnREYXRlIDwgdGhpcy5wYXNzZXNSZXByaWNlZEF0LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDI4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIHBhc3Nlc1JlcHJpY2VkQXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBTdWJzY3JpcHRpb25zR2xvYmFsU3RhdGVLZXlQYXNzZXNSZXByaWNlZEF0IH0pCiAgICBieXRlYyAxOCAvLyAicGFzc2VzX3JlcHJpY2VkX2F0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMjMKICAgIC8vIGlmICh0aGlzLnBhc3Nlc1JlcHJpY2VkQXQuaGFzVmFsdWUgJiYgc3RhcnREYXRlIDwgdGhpcy5wYXNzZXNSZXByaWNlZEF0LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDgKICAgID4KICAgIGJ6IHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjI0CiAgICAvLyByZXR1cm4gTGVnYWN5UGFzc2VzTUJSCiAgICBwdXNoaW50IDQxODkwMAoKdW5zdWJzY3JpYmVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnBhc3Nlc0NoYXJnZWRAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMDEKICAgIC8vIGxldCBtYnJSZWZ1bmQ6IHVpbnQ2NCA9IGNvc3RzLnN1YnNjcmlwdGlvbnMKICAgIGludGMgNSAvLyA2MDUwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjA4CiAgICAvLyBtYnJSZWZ1bmQgKz0gdGhpcy5wYXNzZXNDaGFyZ2VkKHN1Yi5zdGFydERhdGUpCiAgICArCiAgICBjb3ZlciAyCgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gcHJpbmNpcGFscyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvblByaW5jaXBhbD4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQcmluY2lwYWxzIH0pCiAgICBieXRlYyAxOSAvLyAiaSIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTIKICAgIC8vIGlmICh0aGlzLnByaW5jaXBhbHMoc3ViS2V5KS5kZWxldGUoKSkgewogICAgYm94X2RlbAogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMTMKICAgIC8vIG1iclJlZnVuZCArPSBTdWJzY3JpcHRpb25QcmluY2lwYWxNQlIKICAgIHN3YXAKICAgIGludGMgNiAvLyAzNDkwMAogICAgKwogICAgc3dhcAoKdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjE3CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHJlZnVuZF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5rZXksIFR4bi5zZW5kZXIsIG1iclJlZnVuZCkKICAgIGR1cAogICAgdHhuIFNlbmRlcgogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHJlbGVhc2VEZXBvc2l0CiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMwogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIxOQogICAgLy8gaWYgKHN1Yi5hc3NldCAhPT0gMCkgewogICAgZGlnIDIKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgOQogICAgYnogdW5zdWJzY3JpYmVfZWxzZV9ib2R5QDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMjAKICAgIC8vIGlmIChzdWIuZXNjcm93ZWQgPiAwKSB7CiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgYnogdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIxLTEyMjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyMwogICAgLy8gYXNzZXRSZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIGRpZyA2CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjIxLTEyMjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBzdWIuYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIyMS0xMjI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogc3ViLmFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzMC0xMjM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzAtMTIzNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzMC0xMjM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjYxCiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoc3ViS2V5KS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjExOTIKICAgIC8vIHVuc3Vic2NyaWJlKGlkOiBTdWJzY3JpcHRpb25JRCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKdW5zdWJzY3JpYmVfZWxzZV9ib2R5QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjM2CiAgICAvLyB9IGVsc2UgaWYgKHJlY2VpdmVyID09PSBUeG4uc2VuZGVyKSB7CiAgICBkaWcgMwogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJ6IHVuc3Vic2NyaWJlX2Vsc2VfYm9keUAxOAogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzNy0xMjQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZCArIHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzOQogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDAKICAgIC8vIGFtb3VudDogc3ViLmVzY3Jvd2VkICsgcmVmdW5kCiAgICB1bmNvdmVyIDMKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDMKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyMzctMTI0MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQgKyByZWZ1bmQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIzNy0xMjQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZCArIHJlZnVuZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHVuc3Vic2NyaWJlX2FmdGVyX2lmX2Vsc2VAMjQKCnVuc3Vic2NyaWJlX2Vsc2VfYm9keUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0NAogICAgLy8gaWYgKHN1Yi5lc2Nyb3dlZCA+IDApIHsKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA5NgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICBieiB1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDUtMTI1MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDcKICAgIC8vIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNDUtMTI0OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBzdWIuZXNjcm93ZWQKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI0NS0xMjUwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogVHhuLnNlbmRlciwKICAgIC8vICAgICBhbW91bnQ6IHN1Yi5lc2Nyb3dlZAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0Cgp1bnN1YnNjcmliZV9hZnRlcl9pZl9lbHNlQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjUzLTEyNTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI1My0xMjU3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjUzLTEyNTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyLAogICAgLy8gICAgIGFtb3VudDogcmVmdW5kCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyNAoKdW5zdWJzY3JpYmVfYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyByZXR1cm4gdGhpcy5tYnIoKS5wYXNzZXMKICAgIHB1c2hpbnQgODM3MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTIwOAogICAgLy8gbWJyUmVmdW5kICs9IHRoaXMucGFzc2VzQ2hhcmdlZChzdWIuc3RhcnREYXRlKQogICAgYiB1bnN1YnNjcmliZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMucGFzc2VzQ2hhcmdlZEAyOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2F0ZWRUcmlnZ2VyUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkVHJpZ2dlclBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNzAKICAgIC8vIGdhdGVkVHJpZ2dlclBheW1lbnQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGtleTogU3Vic2NyaXB0aW9uS2V5LCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNzEKICAgIC8vIGNvbnN0IGdhdGVJRCA9IHRoaXMudHJpZ2dlckdhdGVJRChrZXkpCiAgICBzd2FwCiAgICBjYWxsc3ViIHRyaWdnZXJHYXRlSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI3MgogICAgLy8gY29uc3QgY3R4ID0gdGhpcy50cmlnZ2VyQ3R4KGtleSwgcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNzIKICAgIC8vIGNvbnN0IGN0eCA9IHRoaXMudHJpZ2dlckN0eChrZXksIHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICBjYWxsc3ViIHRyaWdnZXJDdHgKICAgIHBvcAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjczCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrQ3R4KGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIGN0eCwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNzMKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgY3R4LCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2F0ZUNoZWNrQ3R4CiAgICBwb3AKICAgIGJueiBnYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyMCAvLyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKZ2F0ZWRUcmlnZ2VyUGF5bWVudF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI3NQogICAgLy8gdGhpcy50cmlnZ2VySW1wbChrZXksIHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB0cmlnZ2VySW1wbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyNzAKICAgIC8vIGdhdGVkVHJpZ2dlclBheW1lbnQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGtleTogU3Vic2NyaXB0aW9uS2V5LCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMubGVnYWN5R2F0ZWRUcmlnZ2VyUGF5bWVudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkVHJpZ2dlclBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRUcmlnZ2VyUGF5bWVudCcgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjg0CiAgICAvLyBjb25zdCBnYXRlSUQgPSB0aGlzLnRyaWdnZXJHYXRlSUQoa2V5KQogICAgY2FsbHN1YiB0cmlnZ2VyR2F0ZUlECiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI4NgogICAgLy8gY29uc3Qgd2FsbGV0ID0gbGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjg2CiAgICAvLyBjb25zdCB3YWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjYWxsc3ViIGxlZ2FjeVdhbGxldE9mCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODcKICAgIC8vIGNvbnN0IG9yaWdpbiA9IGxlZ2FjeU9yaWdpbk9yKHdhbGxldCwga2V5LmFkZHJlc3MpCiAgICBzd2FwCiAgICBjYWxsc3ViIGxlZ2FjeU9yaWdpbk9yCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODgKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBsZWdhY3lHYXRlZFRyaWdnZXJQYXltZW50X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyMCAvLyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKbGVnYWN5R2F0ZWRUcmlnZ2VyUGF5bWVudF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTI5MAogICAgLy8gdGhpcy50cmlnZ2VySW1wbChrZXksIHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiB0cmlnZ2VySW1wbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyODIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRUcmlnZ2VyUGF5bWVudCcgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJQYXltZW50W3JvdXRpbmddKCkgLT4gdm9pZDoKdHJpZ2dlclBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTQKICAgIC8vIHRyaWdnZXJQYXltZW50KGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMjk1CiAgICAvLyB0aGlzLnRyaWdnZXJJbXBsKGtleSwgZmFsc2UpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiB0cmlnZ2VySW1wbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEyOTQKICAgIC8vIHRyaWdnZXJQYXltZW50KGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5hZG9wdFByaW5jaXBhbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmFkb3B0UHJpbmNpcGFsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA0CiAgICAvLyBhZG9wdFByaW5jaXBhbChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgphZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLmdhdGVJRCAhPT0gMCwgZXJyTm90R2F0ZWQpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIGJueiBhZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmd0ZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZ3RkCgphZG9wdFByaW5jaXBhbF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBwcmluY2lwYWxzID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uUHJpbmNpcGFsPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFByaW5jaXBhbHMgfSkKICAgIGJ5dGVjIDE5IC8vICJpIgogICAgZGlnIDEKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMDcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcmluY2lwYWxzKGtleSkuZXhpc3RzLCBlcnJQcmluY2lwYWxFeGlzdHMpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQZXhzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBleHMKCmFkb3B0UHJpbmNpcGFsX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA5CiAgICAvLyBjb25zdCB3YWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMDkKICAgIC8vIGNvbnN0IHdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGV4dHJhY3QgMCAzMgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBjYWxsc3ViIGxlZ2FjeVdhbGxldE9mCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHdhbGxldC5pZCAhPT0gMCwgZXJyTm9MZWdhY3lXYWxsZXQpCiAgICBibnogYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVyck5sd2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmx3bAoKYWRvcHRQcmluY2lwYWxfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMTMKICAgIC8vIGFzc2VydEV4YWN0UGF5bWVudChwYXltZW50LCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgU3Vic2NyaXB0aW9uUHJpbmNpcGFsTUJSKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgaW50YyA2IC8vIDM0OTAwCiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzE1CiAgICAvLyB0aGlzLnByaW5jaXBhbHMoa2V5KS52YWx1ZSA9IHsgd2FsbGV0OiB3YWxsZXQuaWQsIHByaW5jaXBhbDogbGVnYWN5T3JpZ2luT3Iod2FsbGV0LCBrZXkuYWRkcmVzcykgfQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgbGVnYWN5T3JpZ2luT3IKICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzA0CiAgICAvLyBhZG9wdFByaW5jaXBhbChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zdHJlYWtDaGVja1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnN0cmVha0NoZWNrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzIyCiAgICAvLyBzdHJlYWtDaGVjayhrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpTdWJzY3JpcHRpb25LZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2LTE0OAogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cywgZXJyU3Vic2NyaXB0aW9uRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc3RyZWFrQ2hlY2tfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCnN0cmVha0NoZWNrX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzI0CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSkKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMyNQogICAgLy8gY29uc3QgY3VycmVudFdpbmRvd1N0YXJ0OiB1aW50NjQgPSB0aGlzLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN1Yi5zdGFydERhdGUsIHN1Yi5pbnRlcnZhbCkKICAgIGR1cAogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAxCiAgICBwdXNoaW50IDU2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgZ2V0TGF0ZXN0V2luZG93U3RhcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMyNgogICAgLy8gaWYgKHN1Yi5sYXN0UGF5bWVudCA8IHRoaXMuZ2V0UHJldmlvdXNXaW5kb3dTdGFydChjdXJyZW50V2luZG93U3RhcnQsIHN1Yi5pbnRlcnZhbCkpIHsKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA4MAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBnZXRQcmV2aW91c1dpbmRvd1N0YXJ0CiAgICA8CiAgICBieiBzdHJlYWtDaGVja19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMyNwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuc3RyZWFrID0gMAogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDg4CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCgpzdHJlYWtDaGVja19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMjIKICAgIC8vIHN0cmVha0NoZWNrKGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5zZXRQYXNzZXNbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRQYXNzZXM6CiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMzEKICAgIC8vIHNldFBhc3NlcyhpZDogU3Vic2NyaXB0aW9uSUQsIGFkZHJlc3NlczogQWNjb3VudFtdKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgcHVzaGludCAzMgogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFjY291bnQ+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzMzIKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbnNLZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQgfQogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciA0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2LTE0OAogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25zS2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyclVkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVWRuZQoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzM2CiAgICAvLyBjb25zdCB7IHNlcnZpY2VJRCwgcmVjaXBpZW50IH0gPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uc0tleSkudmFsdWUpCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzM4CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZUlEID4gMCwgZXJyTm9Eb25hdGlvbnMpCiAgICBibnogc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOb2RuIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vZG4KCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0MAogICAgLy8gY29uc3Qgc2VydmljZUtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9CiAgICBpdG9iCiAgICBkaWcgMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCnNldFBhc3Nlc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0NAogICAgLy8gY29uc3QgeyBzdGF0dXMsIHBhc3NlcyB9ID0gdGhpcy5zZXJ2aWNlcyhzZXJ2aWNlS2V5KS52YWx1ZQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBzd2FwCiAgICBwdXNoaW50IDI1CiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhdHVzICE9PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24sIGVyclNlcnZpY2VJc1NodXRkb3duKQogICAgYnl0ZWMgMTMgLy8gMHgyOAogICAgIT0KICAgIGJueiBzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDQyIC8vICJFUlI6ZXJyU3NoZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTc2hkCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNDgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZXMgPiAwICYmIHBhc3NlcyA+PSBhZGRyZXNzZXMubGVuZ3RoLCBlcnJQYXNzQ291bnRPdmVyZmxvdykKICAgIGRpZyA0CiAgICBieiBzZXRQYXNzZXNfYm9vbF9mYWxzZUAxMgogICAgZGlnIDQKICAgIGRpZyAyCiAgICA+PQogICAgYnogc2V0UGFzc2VzX2Jvb2xfZmFsc2VAMTIKICAgIGludGNfMSAvLyAxCgpzZXRQYXNzZXNfYm9vbF9tZXJnZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBhc3NlcyA+IDAgJiYgcGFzc2VzID49IGFkZHJlc3Nlcy5sZW5ndGgsIGVyclBhc3NDb3VudE92ZXJmbG93KQogICAgYm56IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMTUKICAgIHB1c2hieXRlcyAiRVJSOmVyclBjb2YiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGNvZgoKc2V0UGFzc2VzX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM1MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGFkZHJlc3Nlcy5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCnNldFBhc3Nlc193aGlsZV90b3BAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNTAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBhZGRyZXNzZXMubGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDMKICAgIDwKICAgIGJ6IHNldFBhc3Nlc19hZnRlcl93aGlsZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzUxCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBhZGRyZXNzZXNbaV0pKS5leGlzdHMsIGVyckJsb2NrZWQpCiAgICBkaWcgMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyAxCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0MyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIGRpZyAyCiAgICBzd2FwCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyAxMCAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzUxCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuYmxvY2tzKHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBhZGRyZXNzZXNbaV0pKS5leGlzdHMsIGVyckJsb2NrZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHNldFBhc3Nlc19hZnRlcl9hc3NlcnRAMTkKICAgIGJ5dGVjIDQzIC8vICJFUlI6ZXJyQmxrZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbGtkCgpzZXRQYXNzZXNfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzUwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgYWRkcmVzc2VzLmxlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBzZXRQYXNzZXNfd2hpbGVfdG9wQDE2CgpzZXRQYXNzZXNfYWZ0ZXJfd2hpbGVAMjA6CiAgICBwb3BuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM1NAogICAgLy8gdGhpcy5wYXNzZXMoeyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9KS52YWx1ZSA9IGNsb25lKGFkZHJlc3NlcykKICAgIHR4biBTZW5kZXIKICAgIGRpZyAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyBwYXNzZXMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBBY2NvdW50W10+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UGFzc2VzIH0pCiAgICBieXRlYyAxNyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzU0CiAgICAvLyB0aGlzLnBhc3Nlcyh7IGFkZHJlc3M6IFR4bi5zZW5kZXIsIGlkIH0pLnZhbHVlID0gY2xvbmUoYWRkcmVzc2VzKQogICAgZHVwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTMzMQogICAgLy8gc2V0UGFzc2VzKGlkOiBTdWJzY3JpcHRpb25JRCwgYWRkcmVzc2VzOiBBY2NvdW50W10pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnNldFBhc3Nlc19ib29sX2ZhbHNlQDEyOgogICAgaW50Y18wIC8vIDAKICAgIGIgc2V0UGFzc2VzX2Jvb2xfbWVyZ2VAMTMKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNsZWFyT3JwaGFuUGFzc2VzW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xlYXJPcnBoYW5QYXNzZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNjIKICAgIC8vIGNsZWFyT3JwaGFuUGFzc2VzKGtleTogU3Vic2NyaXB0aW9uS2V5KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYtMTQ4CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY2xlYXJPcnBoYW5QYXNzZXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCmNsZWFyT3JwaGFuUGFzc2VzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHBhc3NlcyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIEFjY291bnRbXT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQYXNzZXMgfSkKICAgIGJ5dGVjIDE3IC8vICJwIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnBhc3NlcyhrZXkpLmRlbGV0ZSgpLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfZGVsCiAgICBibnogY2xlYXJPcnBoYW5QYXNzZXNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCmNsZWFyT3JwaGFuUGFzc2VzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzYyCiAgICAvLyBjbGVhck9ycGhhblBhc3NlcyhrZXk6IFN1YnNjcmlwdGlvbktleSk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlckxpc3Rbcm91dGluZ10oKSAtPiB2b2lkOgp0cmlnZ2VyTGlzdDoKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18zIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMyAvLyAyCiAgICAqCiAgICBzd2FwCiAgICBkdXAKICAgIGxlbgogICAgY292ZXIgMgogICAgZXh0cmFjdCAyIDAKICAgIGludGNfMCAvLyAwCgp0cmlnZ2VyTGlzdF9mb3JfaGVhZGVyQDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNjkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgZHVwCiAgICBkaWcgNgogICAgPAogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfZm9yQDQKICAgIGR1cAogICAgaW50Y18zIC8vIDIKICAgICoKICAgIGRpZyAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgZW5jb2RpbmcKICAgIGR1cAogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGNvdmVyIDQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgZm9yIChsZW4rKHVpbnQ4WzMyXSwobGVuK3VpbnQ2NFtdKSlbXSkKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50OFszMl0sKGxlbit1aW50NjRbXSkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHB1c2hpbnQgMzYKICAgICsKICAgICsKICAgIGNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHRyaWdnZXJMaXN0X2Zvcl9oZWFkZXJAMQoKdHJpZ2dlckxpc3RfYWZ0ZXJfZm9yQDQ6CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM2OQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL3R5cGVzLnRzOjpUcmlnZ2VyTGlzdFJlcXVlc3Q+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzEKICAgIC8vIGNvbnN0IHJlc3VsdHM6IGJvb2xlYW5bXSA9IFtdCiAgICBieXRlYyAxMSAvLyAweDAwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM3MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHJlcS5sZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCnRyaWdnZXJMaXN0X3doaWxlX3RvcEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzcyCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgcmVxLmxlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA0CiAgICA8CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzczCiAgICAvLyBmb3IgKGxldCBqOiB1aW50NjQgPSAwOyBqIDwgcmVxW2ldLmlkcy5sZW5ndGg7IGogKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKCnRyaWdnZXJMaXN0X3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzczCiAgICAvLyBmb3IgKGxldCBqOiB1aW50NjQgPSAwOyBqIDwgcmVxW2ldLmlkcy5sZW5ndGg7IGogKz0gMSkgewogICAgZGlnIDMKICAgIGRpZyAxCiAgICBjYWxsc3ViIGR5bmFtaWNfYXJyYXlfcmVhZF9keW5hbWljX2VsZW1lbnQKICAgIGR1cAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBkaWcgMwogICAgPgogICAgYnogdHJpZ2dlckxpc3RfYWZ0ZXJfd2hpbGVAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM3My0xMzc0CiAgICAvLyBmb3IgKGxldCBqOiB1aW50NjQgPSAwOyBqIDwgcmVxW2ldLmlkcy5sZW5ndGg7IGogKz0gMSkgewogICAgLy8gICBjb25zdCBrZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogcmVxW2ldLmFkZHJlc3MsIGlkOiByZXFbaV0uaWRzW2pdIH0KICAgIGRpZyAzCiAgICBkdXAKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgZHluYW1pY19hcnJheV9yZWFkX2R5bmFtaWNfZWxlbWVudAogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGRpZyA0CiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3QzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzc0CiAgICAvLyBjb25zdCBrZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogcmVxW2ldLmFkZHJlc3MsIGlkOiByZXFbaV0uaWRzW2pdIH0KICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzc1CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jYW5UcmlnZ2VyKGtleSkpCiAgICBjYWxsc3ViIGNhblRyaWdnZXIKICAgIHBvcAogICAgYnl0ZWMgOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ1cnkgOQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzUKICAgIC8vIHJlc3VsdHMucHVzaCh0aGlzLmNhblRyaWdnZXIoa2V5KSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBkdXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIHJlcGxhY2UyIDAKICAgIGNvdmVyIDQKICAgIHN3YXAKICAgIHB1c2hpbnQgNwogICAgKwogICAgaW50Y18yIC8vIDgKICAgIC8KICAgIGR1cAogICAgYnVyeSAxMQogICAgc3dhcAogICAgcHVzaGludCA3CiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgLwogICAgZHVwCiAgICBidXJ5IDEwCiAgICA8CiAgICBieiB0cmlnZ2VyTGlzdF9hZnRlcl9pZl9lbHNlQDE0CiAgICBkaWcgNwogICAgZGlnIDkKICAgIC0KICAgIGJ6ZXJvCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgMgoKdHJpZ2dlckxpc3RfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICB1bmNvdmVyIDQKICAgIHB1c2hpbnQgMTYKICAgICsKICAgIGR1cAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzc1CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jYW5UcmlnZ2VyKGtleSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA4Cgp0cmlnZ2VyTGlzdF93aGlsZV90b3BAMTU6CiAgICBkaWcgMwogICAgZGlnIDgKICAgIDwKICAgIGJ6IHRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDE3CiAgICBkaWcgMTAKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBnZXRiaXQKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBjb3ZlciA0CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzc1CiAgICAvLyByZXN1bHRzLnB1c2godGhpcy5jYW5UcmlnZ2VyKGtleSkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgY292ZXIgMgogICAgYiB0cmlnZ2VyTGlzdF93aGlsZV90b3BAMTUKCnRyaWdnZXJMaXN0X2FmdGVyX3doaWxlQDE3OgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzMKICAgIC8vIGZvciAobGV0IGo6IHVpbnQ2NCA9IDA7IGogPCByZXFbaV0uaWRzLmxlbmd0aDsgaiArPSAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBiIHRyaWdnZXJMaXN0X3doaWxlX3RvcEA4Cgp0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxMDoKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzNzIKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCByZXEubGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHRyaWdnZXJMaXN0X3doaWxlX3RvcEA2Cgp0cmlnZ2VyTGlzdF9hZnRlcl93aGlsZUAxMToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzY5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmlzQmxvY2tlZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzQmxvY2tlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM4NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODgKICAgIC8vIHJldHVybiB0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KGFkZHJlc3MsIGJsb2NrZWQpKS5leGlzdHMKICAgIGNhbGxzdWIgZ2V0QmxvY2tLZXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBibG9ja3MgPSBCb3hNYXA8QmxvY2tMaXN0S2V5LCBieXRlczwwPj4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhCbG9ja3MgfSkKICAgIGJ5dGVjIDEwIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzODgKICAgIC8vIHJldHVybiB0aGlzLmJsb2Nrcyh0aGlzLmdldEJsb2NrS2V5KGFkZHJlc3MsIGJsb2NrZWQpKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzg2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pc1NodXRkb3duW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNTaHV0ZG93bjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5NAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTcKICAgIC8vIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzLCBpZCB9KS5leGlzdHMgJiYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5NwogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLmV4aXN0cyAmJgogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTctMTM5OAogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLmV4aXN0cyAmJgogICAgLy8gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3MsIGlkIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBieiBpc1NodXRkb3duX2Jvb2xfZmFsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxMzk4CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWMgMTMgLy8gMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTM5Ny0xMzk4CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkuZXhpc3RzICYmCiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzcywgaWQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIGJ6IGlzU2h1dGRvd25fYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKaXNTaHV0ZG93bl9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjEzOTQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmlzU2h1dGRvd25fYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgaXNTaHV0ZG93bl9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1NlcnZpY2VDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3U2VydmljZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQwNQogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZUNvc3QocXVvdGVSZWZlcnJlck9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDA1CiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlQ29zdChxdW90ZVJlZmVycmVyT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHF1b3RlUmVmZXJyZXJPZgogICAgY2FsbHN1YiBzZXJ2aWNlQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDAyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeU5ld1NlcnZpY2VDb3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5TmV3U2VydmljZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MDkKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSwgbmFtZTogJ25ld1NlcnZpY2VDb3N0JyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQxMQogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZUNvc3QodGhpcy5sZWdhY3lSZWZlcnJlcigpKQogICAgY2FsbHN1YiBsZWdhY3lSZWZlcnJlcgogICAgY2FsbHN1YiBzZXJ2aWNlQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDA5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUsIG5hbWU6ICduZXdTZXJ2aWNlQ29zdCcgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm5ld1N1YnNjcmlwdGlvbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdTdWJzY3JpcHRpb25Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDE5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDI2CiAgICAvLyBjb25zdCBbbWJyQW1vdW50LCBnYXRlSURdID0gdGhpcy5zdWJzY3JpcHRpb25NYnIocmVjaXBpZW50LCBzZXJ2aWNlSUQpCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHN1YnNjcmlwdGlvbk1icgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDI3CiAgICAvLyBjb25zdCBwcmluY2lwYWxNYnI6IHVpbnQ2NCA9IHdhbGxldCAhPT0gMCAmJiBnYXRlSUQgIT09IDAgPyBTdWJzY3JpcHRpb25QcmluY2lwYWxNQlIgOiAwCiAgICBieiBuZXdTdWJzY3JpcHRpb25Db3N0X2Jvb2xfZmFsc2VANAogICAgZGlnIDMKICAgIGJ6IG5ld1N1YnNjcmlwdGlvbkNvc3RfYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKbmV3U3Vic2NyaXB0aW9uQ29zdF9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MjcKICAgIC8vIGNvbnN0IHByaW5jaXBhbE1icjogdWludDY0ID0gd2FsbGV0ICE9PSAwICYmIGdhdGVJRCAhPT0gMCA/IFN1YnNjcmlwdGlvblByaW5jaXBhbE1CUiA6IDAKICAgIGludGMgNiAvLyAzNDkwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDI4CiAgICAvLyByZXR1cm4gbWJyQW1vdW50ICsgcHJpbmNpcGFsTWJyICsgcmVmZXJyYWxGZWVUbyh0aGlzLmFraXRhREFPLnZhbHVlLCBxdW90ZVJlZmVycmVyT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSwgYXNzZXQpCiAgICArCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDI4CiAgICAvLyByZXR1cm4gbWJyQW1vdW50ICsgcHJpbmNpcGFsTWJyICsgcmVmZXJyYWxGZWVUbyh0aGlzLmFraXRhREFPLnZhbHVlLCBxdW90ZVJlZmVycmVyT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSwgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcXVvdGVSZWZlcnJlck9mCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcmVmZXJyYWxGZWVUbwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDE5CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1N1YnNjcmlwdGlvbkNvc3RfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgbmV3U3Vic2NyaXB0aW9uQ29zdF9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeU5ld1N1YnNjcmlwdGlvbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lOZXdTdWJzY3JpcHRpb25Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDMyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUsIG5hbWU6ICduZXdTdWJzY3JpcHRpb25Db3N0JyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDM4CiAgICAvLyBjb25zdCBbbWJyQW1vdW50XSA9IHRoaXMuc3Vic2NyaXB0aW9uTWJyKHJlY2lwaWVudCwgc2VydmljZUlEKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjYWxsc3ViIHN1YnNjcmlwdGlvbk1icgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzkKICAgIC8vIHJldHVybiBtYnJBbW91bnQgKyByZWZlcnJhbEZlZVRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMubGVnYWN5UmVmZXJyZXIoKSwgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDM5CiAgICAvLyByZXR1cm4gbWJyQW1vdW50ICsgcmVmZXJyYWxGZWVUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmxlZ2FjeVJlZmVycmVyKCksIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgbGVnYWN5UmVmZXJyZXIKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiByZWZlcnJhbEZlZVRvCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSwgbmFtZTogJ25ld1N1YnNjcmlwdGlvbkNvc3QnIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy50cmlnZ2VyR2F0ZUN0eFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnRyaWdnZXJHYXRlQ3R4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDQ3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NDkKICAgIC8vIHJldHVybiB0aGlzLnRyaWdnZXJDdHgoa2V5LCBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ0OQogICAgLy8gcmV0dXJuIHRoaXMudHJpZ2dlckN0eChrZXksIHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgY2FsbHN1YiB0cmlnZ2VyQ3R4CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ0NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTZXJ2aWNlW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U2VydmljZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ1NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NTkKICAgIC8vIGNvbnN0IGtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3MsIGlkIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoa2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpnZXRTZXJ2aWNlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYxCiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDU3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFNlcnZpY2VzQnlBZGRyZXNzW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U2VydmljZXNCeUFkZHJlc3M6CiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMyAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDY0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDY2CiAgICAvLyBjb25zdCBzZXJ2aWNlczogU2VydmljZVtdID0gW10KICAgIGJ5dGVjIDExIC8vIDB4MDAwMAoKZ2V0U2VydmljZXNCeUFkZHJlc3Nfd2hpbGVfdG9wQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NjcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IHN0YXJ0OyBpIDwgc3RhcnQgKyB3aW5kb3dTaXplOyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMwogICAgKwogICAgZGlnIDIKICAgID4KICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2Jsb2NrQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2OAogICAgLy8gY29uc3Qga2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzcywgaWQ6IGkgfQogICAgZGlnIDEKICAgIGl0b2IKICAgIGRpZyA1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2OQogICAgLy8gaWYgKHRoaXMuc2VydmljZXMoa2V5KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogZ2V0U2VydmljZXNCeUFkZHJlc3NfYmxvY2tAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDcwCiAgICAvLyBzZXJ2aWNlcy5wdXNoKHRoaXMuc2VydmljZXMoa2V5KS52YWx1ZSkKICAgIGRpZyA2CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgcHVzaGJ5dGVzIDB4MDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NzAKICAgIC8vIHNlcnZpY2VzLnB1c2godGhpcy5zZXJ2aWNlcyhrZXkpLnZhbHVlKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICBjb3ZlciAzCiAgICBzd2FwCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgaW50Y18zIC8vIDIKICAgICoKICAgIHN3YXAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDkKCmdldFNlcnZpY2VzQnlBZGRyZXNzX2Zvcl9oZWFkZXJAMTA6CiAgICBkaWcgOAogICAgZGlnIDIKICAgIDwKICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2FmdGVyX2ZvckAxMgogICAgZHVwCiAgICBkaWcgOQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICB1bmNvdmVyIDUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgNAogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGJ1cnkgOQogICAgYiBnZXRTZXJ2aWNlc0J5QWRkcmVzc19mb3JfaGVhZGVyQDEwCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19hZnRlcl9mb3JAMTI6CiAgICBkdXAKICAgIGxlbgogICAgY292ZXIgMwogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTAKCmdldFNlcnZpY2VzQnlBZGRyZXNzX2Zvcl9oZWFkZXJAMTM6CiAgICBkaWcgOQogICAgaW50Y18zIC8vIDIKICAgIDwKICAgIGJ6IGdldFNlcnZpY2VzQnlBZGRyZXNzX2FmdGVyX2ZvckAxNQogICAgZGlnIDUKICAgIGRpZyAxMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDUKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICB1bmNvdmVyIDYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgNQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGJ1cnkgMTAKICAgIGIgZ2V0U2VydmljZXNCeUFkZHJlc3NfZm9yX2hlYWRlckAxMwoKZ2V0U2VydmljZXNCeUFkZHJlc3NfYWZ0ZXJfZm9yQDE1OgogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICBzdWJzdHJpbmczCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0NjcKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IHN0YXJ0OyBpIDwgc3RhcnQgKyB3aW5kb3dTaXplOyBpICs9IDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICBiIGdldFNlcnZpY2VzQnlBZGRyZXNzX3doaWxlX3RvcEAyCgpnZXRTZXJ2aWNlc0J5QWRkcmVzc19ibG9ja0A4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDY0CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldFN1YnNjcmlwdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ3OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvdHlwZXMudHM6OlN1YnNjcmlwdGlvbktleQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDYtMTQ4CiAgICAvLyBzdWJzY3JpcHRpb25zID0gQm94TWFwPFN1YnNjcmlwdGlvbktleSwgU3Vic2NyaXB0aW9uSW5mbz4oewogICAgLy8gICBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zLAogICAgLy8gfSkKICAgIGJ5dGVjIDQgLy8gInMiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDgwCiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0ODEtMTQ5MwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgZXhpc3RzOiBmYWxzZSwKICAgIC8vICAgcmVjaXBpZW50OiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNlcnZpY2VJRDogMCwKICAgIC8vICAgc3RhcnREYXRlOiAwLAogICAgLy8gICBhbW91bnQ6IDAsCiAgICAvLyAgIGludGVydmFsOiAwLAogICAgLy8gICBhc3NldDogMCwKICAgIC8vICAgZ2F0ZUlEOiAwLAogICAgLy8gICBsYXN0UGF5bWVudDogMCwKICAgIC8vICAgc3RyZWFrOiAwLAogICAgLy8gICBlc2Nyb3dlZDogMCwKICAgIC8vIH0KICAgIHB1c2hieXRlcyBiYXNlMzIoQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBKQoKZ2V0U3Vic2NyaXB0aW9uX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25ANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ3OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDk4CiAgICAvLyAuLi50aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSwKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMzIgOAogICAgZGlnIDIKICAgIGV4dHJhY3QgNDAgOAogICAgZGlnIDMKICAgIGV4dHJhY3QgNDggOAogICAgZGlnIDQKICAgIGV4dHJhY3QgNTYgOAogICAgZGlnIDUKICAgIGV4dHJhY3QgNjQgOAogICAgZGlnIDYKICAgIGV4dHJhY3QgNzIgOAogICAgZGlnIDcKICAgIGV4dHJhY3QgODAgOAogICAgZGlnIDgKICAgIGV4dHJhY3QgODggOAogICAgdW5jb3ZlciA5CiAgICBleHRyYWN0IDk2IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ5Ni0xNDk5CiAgICAvLyByZXR1cm4gewogICAgLy8gICBleGlzdHM6IHRydWUsCiAgICAvLyAgIC4uLnRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLAogICAgLy8gfQogICAgcHVzaGJ5dGVzIDB4ODAKICAgIHVuY292ZXIgMTAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA5CiAgICBjb25jYXQKICAgIHVuY292ZXIgOAogICAgY29uY2F0CiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ3OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBiIGdldFN1YnNjcmlwdGlvbl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0U3Vic2NyaXB0aW9uQDQKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLm11c3RHZXRTdWJzY3JpcHRpb25bcm91dGluZ10oKSAtPiB2b2lkOgptdXN0R2V0U3Vic2NyaXB0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTAyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MDQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG11c3RHZXRTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJVZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclVkbmUKCm11c3RHZXRTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MDUKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUwMgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTA4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy90eXBlcy50czo6U3Vic2NyaXB0aW9uS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS5leGlzdHMsIGVyclN1YnNjcmlwdGlvbkRvZXNOb3RFeGlzdCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUxMgogICAgLy8gY29uc3Qgc3ViID0gY2xvbmUodGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUpCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTQKICAgIC8vIGxldCBzdGF0dXM6IFNlcnZpY2VTdGF0dXMgPSBTZXJ2aWNlU3RhdHVzTm9uZQogICAgYnl0ZWMgOSAvLyAweDAwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTUKICAgIC8vIGxldCBwYXlvdXRBZGRyZXNzOiBBY2NvdW50ID0gc3ViLnJlY2lwaWVudAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUxNgogICAgLy8gbGV0IHRpdGxlOiBzdHJpbmcgPSAnJwogICAgYnl0ZWNfMyAvLyAiIgogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTE3CiAgICAvLyBsZXQgZGVzY3JpcHRpb246IHN0cmluZyA9ICcnCiAgICBieXRlY18zIC8vICIiCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MTgKICAgIC8vIGxldCBiYW5uZXJJbWFnZTogQ0lEID0gb3AuYnplcm8oMzYpCiAgICBwdXNoaW50IDM2CiAgICBiemVybwogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTIwCiAgICAvLyBsZXQgaGlnaGxpZ2h0Q29sb3I6IGJ5dGVzPDM+ID0gQnl0ZXMoJzAwMCcpLnRvRml4ZWQoeyBsZW5ndGg6IDMgfSkKICAgIHB1c2hieXRlcyAiMDAwIgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTIxCiAgICAvLyBpZiAoc3ViLnNlcnZpY2VJRCAhPT0gMCkgewogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYm56IGdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2lmX2JvZHlANAogICAgZGlnIDYKICAgIGNvdmVyIDMKICAgIGRpZyAyCiAgICBidXJ5IDExCgpnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzAKICAgIC8vIGxldCBwYXNzZXM6IEFjY291bnRbXSA9IFtdCiAgICBieXRlYyAxMSAvLyAweDAwMDAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyBwYXNzZXMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBBY2NvdW50W10+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4UGFzc2VzIH0pCiAgICBieXRlYyAxNyAvLyAicCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzEKICAgIC8vIGlmICh0aGlzLnBhc3NlcyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzIKICAgIC8vIHBhc3NlcyA9IFsuLi5wYXNzZXMsIC4uLnRoaXMucGFzc2VzKGtleSkudmFsdWVdCiAgICBkaWcgMTEKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGV4dHJhY3QgMiAwCiAgICBzd2FwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTMwCiAgICAvLyBsZXQgcGFzc2VzOiBBY2NvdW50W10gPSBbXQogICAgYnl0ZWMgMTEgLy8gMHgwMDAwCiAgICBzd2FwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMTEKCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzYKICAgIC8vIC4uLnN1YiwKICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBleHRyYWN0IDQwIDgKICAgIGRpZyAxCiAgICBleHRyYWN0IDQ4IDgKICAgIGRpZyAyCiAgICBleHRyYWN0IDU2IDgKICAgIGRpZyAzCiAgICBleHRyYWN0IDY0IDgKICAgIGRpZyA0CiAgICBleHRyYWN0IDcyIDgKICAgIGRpZyA1CiAgICBleHRyYWN0IDgwIDgKICAgIGRpZyA2CiAgICBleHRyYWN0IDg4IDgKICAgIHVuY292ZXIgNwogICAgZXh0cmFjdCA5NiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MzUtMTU0NQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgLi4uc3ViLAogICAgLy8gICBzdGF0dXMsCiAgICAvLyAgIHBheW91dEFkZHJlc3MsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBkZXNjcmlwdGlvbiwKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yLAogICAgLy8gICBwYXNzZXMKICAgIC8vIH0KICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA4CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBjb25jYXQKICAgIHVuY292ZXIgOAogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHB1c2hieXRlcyAweDAwYjcKICAgIGNvbmNhdAogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAxODMKICAgICsKICAgIHVuY292ZXIgOQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgdW5jb3ZlciAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyAxCiAgICBsZW4KICAgIHVuY292ZXIgMwogICAgKwogICAgc3dhcAogICAgdW5jb3ZlciA5CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgY29uY2F0CiAgICB1bmNvdmVyIDcKICAgIGNvbmNhdAogICAgdW5jb3ZlciA2CiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTA4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjXzEgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmdldFN1YnNjcmlwdGlvbldpdGhEZXRhaWxzX2lmX2JvZHlANDoKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgdW5jb3ZlciA0CiAgICBwb3AKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICB1bmNvdmVyIDQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTIyCiAgICAvLyBjb25zdCBzZXJ2aWNlS2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogc3ViLnJlY2lwaWVudCwgaWQ6IHN1Yi5zZXJ2aWNlSUQgfQogICAgZGlnIDEKICAgIGl0b2IKICAgIGRpZyAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCk7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNiAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MjQKICAgIC8vICh7IHN0YXR1cywgcGF5b3V0QWRkcmVzcywgdGl0bGUsIGRlc2NyaXB0aW9uLCBiYW5uZXJJbWFnZSwgaGlnaGxpZ2h0TWVzc2FnZSwgaGlnaGxpZ2h0Q29sb3IgfSA9IGNsb25lKHRoaXMuc2VydmljZXMoc2VydmljZUtleSkudmFsdWUpKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBjb3ZlciA1CiAgICBkdXAKICAgIHB1c2hpbnRzIDQxIDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDgKICAgIGR1cAogICAgcHVzaGludCAxMTcKICAgIGludGNfMyAvLyAyCiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBwdXNoaW50IDExNwogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgZXh0cmFjdCAyIDAKICAgIGNvdmVyIDcKICAgIGR1cAogICAgcHVzaGludCA3NQogICAgaW50Y18zIC8vIDIKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkdXAyCiAgICBpbnRjXzMgLy8gMgogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMgogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIGV4dHJhY3QgMiAwCiAgICBjb3ZlciA3CiAgICBkdXAKICAgIHB1c2hpbnRzIDc3IDM2CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgY292ZXIgNgogICAgZHVwCiAgICBwdXNoaW50IDExMwogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBjb3ZlciA1CiAgICBwdXNoaW50cyAxMTQgMwogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUyNQogICAgLy8gaWYgKHBheW91dEFkZHJlc3MgPT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogZ2V0U3Vic2NyaXB0aW9uV2l0aERldGFpbHNfYWZ0ZXJfaWZfZWxzZUA5CiAgICBkaWcgMgogICAgYnVyeSAxMQogICAgYiBnZXRTdWJzY3JpcHRpb25XaXRoRGV0YWlsc19hZnRlcl9pZl9lbHNlQDkKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmlzRmlyc3RTdWJzY3JpcHRpb25bcm91dGluZ10oKSAtPiB2b2lkOgppc0ZpcnN0U3Vic2NyaXB0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDE0IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NTAKICAgIC8vIHJldHVybiAhdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDkgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTZXJ2aWNlTGlzdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFNlcnZpY2VMaXN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTUzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBzZXJ2aWNlc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzTGlzdCB9KQogICAgYnl0ZWMgMTIgLy8gIm0iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTU1CiAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zZXJ2aWNlc2xpc3QoYWRkcmVzcykudmFsdWUgOiAwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFNlcnZpY2VMaXN0X3Rlcm5hcnlfZmFsc2VAMwogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKCmdldFNlcnZpY2VMaXN0X3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1MwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpnZXRTZXJ2aWNlTGlzdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1NQogICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLmV4aXN0cyA/IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgZ2V0U2VydmljZUxpc3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5nZXRTdWJzY3JpcHRpb25MaXN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZ2V0U3Vic2NyaXB0aW9uTGlzdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU1OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxNCAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NjAKICAgIC8vIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLmV4aXN0cyA/IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykudmFsdWUgOiAwCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9mYWxzZUAzCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQoKZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1NTgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZ2V0U3Vic2NyaXB0aW9uTGlzdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU2MAogICAgLy8gcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykuZXhpc3RzID8gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS52YWx1ZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGdldFN1YnNjcmlwdGlvbkxpc3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMyAvLyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICBkaWcgMwogICAgKwogICAgKgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMzQgLy8gIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTgKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA4CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIGJ5dGVjXzMgLy8gIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDE1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxNgogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgNDQgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OAogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDE1IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2Mi02NQogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY0CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2Mi02NQogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweDNhYjI4OTViIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGFkZHJlc3MsYm9vbClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18xIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MQogICAgKgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9hY2NvdW50L3R5cGVzLnRzOjpFc2Nyb3dJbmZvPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjcKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGV4dHJhY3QgNiA0MQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOmVyck5lc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmVzYwoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODkKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgZXJyV3JvbmdFc2Nyb3dGb3JPcGVyYXRpb24pCiAgICBkaWcgNgogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMTQKICAgIHB1c2hieXRlcyAiRVJSOmVycldlc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2VzYwoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgdW5jb3ZlciA0CiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTcKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTgKICAgIC8vIFtdCiAgICBieXRlYyAxMSAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNAogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMi0xMDYKICAgIC8vIGNvbnN0IG9wdEluQ291bnQgPSBzcGxpdE9wdEluQ291bnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXQKICAgIC8vICkKICAgIGRpZyA2CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBbYXNzZXQuaWRdLAogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgMzggLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg3CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTYKICAgIC8vIHJldHVybiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxNSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGNvbmZpZykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0NCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMzkgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMTUgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldExhdGVzdFdpbmRvd1N0YXJ0KHN0YXJ0RGF0ZTogdWludDY0LCBpbnRlcnZhbDogdWludDY0KSAtPiB1aW50NjQ6CmdldExhdGVzdFdpbmRvd1N0YXJ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIHByaXZhdGUgZ2V0TGF0ZXN0V2luZG93U3RhcnQoc3RhcnREYXRlOiB1aW50NjQsIGludGVydmFsOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE4NAogICAgLy8gcmV0dXJuIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSAoKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgLSBzdGFydERhdGUpICUgaW50ZXJ2YWwpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMgogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICAlCiAgICAtCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmdldEJsb2NrS2V5KGFkZHJlc3M6IGJ5dGVzLCBibG9ja2VkOiBieXRlcykgLT4gYnl0ZXM6CmdldEJsb2NrS2V5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIHByaXZhdGUgZ2V0QmxvY2tLZXkoYWRkcmVzczogQWNjb3VudCwgYmxvY2tlZDogQWNjb3VudCk6IEJsb2NrTGlzdEtleSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTg5CiAgICAvLyBhZGRyZXNzOiBhZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIGZyYW1lX2RpZyAtMgogICAgc3Vic3RyaW5nIDAgMTYKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIExlbmd0aCBtdXN0IGJlIDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE5MAogICAgLy8gYmxvY2tlZDogYmxvY2tlZC5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICBmcmFtZV9kaWcgLTEKICAgIHN1YnN0cmluZyAwIDE2CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGFzc2VydCAvLyBMZW5ndGggbXVzdCBiZSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxODgtMTkxCiAgICAvLyByZXR1cm4gewogICAgLy8gICBhZGRyZXNzOiBhZGRyZXNzLmJ5dGVzLnNsaWNlKDAsIDE2KS50b0ZpeGVkKHsgbGVuZ3RoOiAxNiB9KSwKICAgIC8vICAgYmxvY2tlZDogYmxvY2tlZC5ieXRlcy5zbGljZSgwLCAxNikudG9GaXhlZCh7IGxlbmd0aDogMTYgfSksCiAgICAvLyB9CiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0UHJldmlvdXNXaW5kb3dTdGFydChjdXJyZW50V2luZG93U3RhcnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCkgLT4gdWludDY0OgpnZXRQcmV2aW91c1dpbmRvd1N0YXJ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIHByaXZhdGUgZ2V0UHJldmlvdXNXaW5kb3dTdGFydChjdXJyZW50V2luZG93U3RhcnQ6IHVpbnQ2NCwgaW50ZXJ2YWw6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyByZXR1cm4gY3VycmVudFdpbmRvd1N0YXJ0ID49IGludGVydmFsID8gY3VycmVudFdpbmRvd1N0YXJ0IC0gaW50ZXJ2YWwgOiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgPj0KICAgIGJ6IGdldFByZXZpb3VzV2luZG93U3RhcnRfdGVybmFyeV9mYWxzZUAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgLQogICAgcmV0c3ViCgpnZXRQcmV2aW91c1dpbmRvd1N0YXJ0X3Rlcm5hcnlfZmFsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyByZXR1cm4gY3VycmVudFdpbmRvd1N0YXJ0ID49IGludGVydmFsID8gY3VycmVudFdpbmRvd1N0YXJ0IC0gaW50ZXJ2YWwgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5lbnN1cmVQYXNzZXNSZXByaWNlZCgpIC0+IHZvaWQ6CmVuc3VyZVBhc3Nlc1JlcHJpY2VkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIGlmICghdGhpcy5wYXNzZXNSZXByaWNlZEF0Lmhhc1ZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIHBhc3Nlc1JlcHJpY2VkQXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBTdWJzY3JpcHRpb25zR2xvYmFsU3RhdGVLZXlQYXNzZXNSZXByaWNlZEF0IH0pCiAgICBieXRlYyAxOCAvLyAicGFzc2VzX3JlcHJpY2VkX2F0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMzIKICAgIC8vIGlmICghdGhpcy5wYXNzZXNSZXByaWNlZEF0Lmhhc1ZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBibnogZW5zdXJlUGFzc2VzUmVwcmljZWRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gcGFzc2VzUmVwcmljZWRBdCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFN1YnNjcmlwdGlvbnNHbG9iYWxTdGF0ZUtleVBhc3Nlc1JlcHJpY2VkQXQgfSkKICAgIGJ5dGVjIDE4IC8vICJwYXNzZXNfcmVwcmljZWRfYXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzMwogICAgLy8gdGhpcy5wYXNzZXNSZXByaWNlZEF0LnZhbHVlID0gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgYXBwX2dsb2JhbF9wdXQKCmVuc3VyZVBhc3Nlc1JlcHJpY2VkX2FmdGVyX2lmX2Vsc2VAMjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmdldEFtb3VudHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIzNwogICAgLy8gcHJpdmF0ZSBnZXRBbW91bnRzKGFtb3VudDogdWludDY0KTogQW1vdW50cyB7CiAgICBwcm90byAxIDEKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjM4CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjM4CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjQ1CiAgICAvLyBjb25zdCBbc3Vic2NyaXB0aW9uRmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1N1YnNjcmlwdGlvbkZlZXMpKQogICAgYnl0ZWMgMjggLy8gInN1YnNjcmlwdGlvbl9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0MAogICAgLy8gbGV0IGFraXRhRmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIGlmIChmZWVzLnBheW1lbnRQZXJjZW50YWdlID4gMCkgewogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDMKICAgIC8vIGlmIChha2l0YUZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjQ0CiAgICAvLyBha2l0YUZlZSA9IDIKICAgIGludGNfMyAvLyAyCiAgICBmcmFtZV9idXJ5IDEKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIGxldCB0cmlnZ2VyRmVlOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gaWYgKGZlZXMudHJpZ2dlclBlcmNlbnRhZ2UgPiAwKSB7CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyBpZiAodHJpZ2dlckZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDEwCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNTIKICAgIC8vIHRyaWdnZXJGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8gY29uc3QgbGVmdE92ZXI6IHVpbnQ2NCA9IGFtb3VudCAtIChha2l0YUZlZSArIHRyaWdnZXJGZWUpCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICArCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjU4LTI2MgogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgYWtpdGFGZWU6IGFraXRhRmVlLAogICAgLy8gICB0cmlnZ2VyRmVlOiB0cmlnZ2VyRmVlLAogICAgLy8gICBsZWZ0T3ZlcjogbGVmdE92ZXIsCiAgICAvLyB9CiAgICBzd2FwCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY3JlYXRlU3Vic2NyaXB0aW9uKHBheW1lbnQ6IHVpbnQ2NCwgYXNhOiB1aW50NjQsIHhmZXI6IHVpbnQ2NCwgcmVjaXBpZW50OiBieXRlcywgYW1vdW50OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQsIHNlcnZpY2VJRDogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIHdhbGxldDogdWludDY0LCBwcmluY2lwYWw6IGJ5dGVzKSAtPiB1aW50NjQ6CmNyZWF0ZVN1YnNjcmlwdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjkyLTMwMwogICAgLy8gcHJpdmF0ZSBjcmVhdGVTdWJzY3JpcHRpb24oCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNhOiBib29sZWFuLAogICAgLy8gICB4ZmVyOiB1aW50NjQsCiAgICAvLyAgIHJlY2lwaWVudDogQWNjb3VudCwKICAgIC8vICAgYW1vdW50OiB1aW50NjQsCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIHNlcnZpY2VJRDogU2VydmljZUlELAogICAgLy8gICByZWZlcnJlcjogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQsCiAgICAvLyAgIHByaW5jaXBhbDogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDEwIDEKICAgIGludGNfMCAvLyAwCiAgICBkdXAKICAgIGJ5dGVjXzMgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIHRoaXMuZW5zdXJlUGFzc2VzUmVwcmljZWQoKQogICAgY2FsbHN1YiBlbnN1cmVQYXNzZXNSZXByaWNlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGNvbnN0IGJsb2Nrc0tleSA9IHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC03CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyAxMCAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMDcKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5ibG9ja3MoYmxvY2tzS2V5KS5leGlzdHMsIGVyckJsb2NrZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJCbGtkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJsa2QKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzA5CiAgICAvLyBsZXQgZ2F0ZUlEOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMTAKICAgIC8vIGNvbnN0IGFzc2V0OiB1aW50NjQgPSBhc2EgPyBndHhuLkFzc2V0VHJhbnNmZXJUeG4oeGZlcikueGZlckFzc2V0LmlkIDogMAogICAgZnJhbWVfZGlnIC05CiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9mYWxzZUA0CiAgICBmcmFtZV9kaWcgLTgKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgZnJhbWVfZGlnIC04CiAgICBndHhucyBYZmVyQXNzZXQKCmNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gbGV0IG1ickFtb3VudCA9IGNvc3RzLnN1YnNjcmlwdGlvbnMKICAgIGludGMgNSAvLyA2MDUwMAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gaWYgKHNlcnZpY2VJRCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC00CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2lmX2JvZHlANgogICAgZnJhbWVfZGlnIC03CiAgICBmcmFtZV9idXJ5IDAKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTEKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgYnl0ZWMgMTQgLy8gImwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gY29uc3QgbmVlZHNTdWJzY3JpcHRpb25zTGlzdEJveE1iciA9ICF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTEKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gY29uc3QgbmVlZHNTdWJzY3JpcHRpb25zTGlzdEJveE1iciA9ICF0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cwogICAgYm94X2xlbgogICAgZnJhbWVfYnVyeSAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyBzdWJzY3JpcHRpb25zbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9uc0xpc3QgfSkKICAgIGJ5dGVjIDE0IC8vICJsIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNDEKICAgIC8vIGNvbnN0IHN1YnNjcmlwdGlvbklEID0gdGhpcy5uZXdTdWJzY3JpcHRpb25JRChUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTEKICAgIC8vIHN1YnNjcmlwdGlvbnNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTdWJzY3JpcHRpb25zTGlzdCB9KQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc0CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzQtMjc2CiAgICAvLyBjb25zdCBpZDogdWludDY0ID0gdGhpcy5zdWJzY3JpcHRpb25zbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIC8vICAgPyB0aGlzLnN1YnNjcmlwdGlvbnNsaXN0KGFkZHJlc3MpLnZhbHVlCiAgICAvLyAgIDogMQogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfZmFsc2VANDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc1CiAgICAvLyA/IHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGNvdmVyIDIKCmNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X21lcmdlQDQ4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoYWRkcmVzcykudmFsdWUgPSBpZCArIDEKICAgIGRpZyAyCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBjb25zdCBzdWJzY3JpcHRpb25LZXk6IFN1YnNjcmlwdGlvbktleSA9IHsgYWRkcmVzczogVHhuLnNlbmRlciwgaWQ6IHN1YnNjcmlwdGlvbklEIH0KICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0MwogICAgLy8gaWYgKG5lZWRzU3Vic2NyaXB0aW9uc0xpc3RCb3hNYnIpIHsKICAgIGZyYW1lX2RpZyAyCiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzQ0CiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMuc3Vic2NyaXB0aW9uc2xpc3QKICAgIGZyYW1lX2RpZyAzCiAgICBpbnRjIDcgLy8gMTg5MDAKICAgICsKICAgIGZyYW1lX2J1cnkgMwoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gY29uc3Qgc3RvcmVzUHJpbmNpcGFsID0gd2FsbGV0ICE9PSAwICYmIGdhdGVJRCAhPT0gMAogICAgZnJhbWVfZGlnIC0yCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYm9vbF9mYWxzZUAyMgogICAgZGlnIDIKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9ib29sX2ZhbHNlQDIyCiAgICBpbnRjXzEgLy8gMQogICAgY292ZXIgMwoKY3JlYXRlU3Vic2NyaXB0aW9uX2Jvb2xfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gaWYgKHN0b3Jlc1ByaW5jaXBhbCkgewogICAgZGlnIDMKICAgIGJ6IGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gbWJyQW1vdW50ICs9IFN1YnNjcmlwdGlvblByaW5jaXBhbE1CUgogICAgZnJhbWVfZGlnIDMKICAgIGludGMgNiAvLyAzNDkwMAogICAgKwogICAgZnJhbWVfYnVyeSAzCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUyCiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGZyYW1lX2RpZyAtNgogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzUzCiAgICAvLyBjb25zdCBha2l0YUZlZXM6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGFGZWUgKyBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCBhc3NldCwgYWtpdGFGZWVzLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyBjb25zdCB7IGxlZnRvdmVyLCByZWZlcnJhbE1iciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHJlZmVycmVyLCBhc3NldCwgYWtpdGFGZWVzLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NAogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgYXNzZXQsIGFraXRhRmVlcywgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMwogICAgZGlnIDQKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnRUbwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDQKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNTYKICAgIC8vIGNvbnN0IHJlcXVpcmVkOiB1aW50NjQgPSBtYnJBbW91bnQgKyByZWZlcnJhbE1iciArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIDMKICAgICsKICAgIGZyYW1lX2RpZyAtMTAKICAgIGd0eG5zIFNlbmRlcgogICAgZHVwCiAgICBjb3ZlciA2CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgOCAvLyAyODUwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gY29uc3QgcmVxdWlyZWQ6IHVpbnQ2NCA9IG1ickFtb3VudCArIHJlZmVycmFsTWJyICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICArCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gaWYgKGFzYSkgewogICAgZnJhbWVfZGlnIC05CiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fZWxzZV9ib2R5QDM1CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2MgogICAgLy8gY29uc3QgYXNzZXRYZmVyID0gZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKHhmZXIpCiAgICBmcmFtZV9kaWcgLTgKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbihhc3NldFhmZXIueGZlckFzc2V0KSwgZXJyTm90T3B0ZWRJbikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKGFzc2V0WGZlci54ZmVyQXNzZXQpLCBlcnJOb3RPcHRlZEluKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC04CiAgICBndHhucyBYZmVyQXNzZXQKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAyOAogICAgYnl0ZWMgMjkgLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM2OS0zNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY5LTM3NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzY5LTM3NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCByZXF1aXJlZCkKICAgIGZyYW1lX2RpZyAtMTAKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgYXNzZXJ0RXhhY3RQYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MQogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC04CiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC04CiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDMxCiAgICBieXRlYyA0NSAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzgzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IGFtb3VudCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC04CiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9kaWcgLTYKICAgID49CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzMwogICAgYnl0ZWMgNDUgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4NS0zOTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozODkKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICB1bmNvdmVyIDYKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzg1LTM5MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM4NS0zOTEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBlc2Nyb3dlZCA9IGFzc2V0WGZlci5hc3NldEFtb3VudCAtIGFtb3VudAogICAgZnJhbWVfZGlnIC02CiAgICAtCgpjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyNAogICAgLy8gbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE2LTQyNwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNwogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIHN0cmVhazogMSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQxNi00MjcKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0gewogICAgLy8gICByZWNpcGllbnQ6IHJlY2lwaWVudCwKICAgIC8vICAgc2VydmljZUlELAogICAgLy8gICBzdGFydERhdGU6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIGxhc3RQYXltZW50OiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICBzdHJlYWs6IDEsCiAgICAvLyAgIGVzY3Jvd2VkLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2LTE0OAogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgZnJhbWVfZGlnIDEKICAgIGNvbmNhdAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDE2LTQyNwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkudmFsdWUgPSB7CiAgICAvLyAgIHJlY2lwaWVudDogcmVjaXBpZW50LAogICAgLy8gICBzZXJ2aWNlSUQsCiAgICAvLyAgIHN0YXJ0RGF0ZTogR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbGFzdFBheW1lbnQ6IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIHN0cmVhazogMSwKICAgIC8vICAgZXNjcm93ZWQsCiAgICAvLyB9CiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gaWYgKHN0b3Jlc1ByaW5jaXBhbCkgewogICAgdW5jb3ZlciAzCiAgICBieiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzAKICAgIC8vIHRoaXMucHJpbmNpcGFscyhzdWJzY3JpcHRpb25LZXkpLnZhbHVlID0geyB3YWxsZXQsIHByaW5jaXBhbCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gcHJpbmNpcGFscyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvblByaW5jaXBhbD4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQcmluY2lwYWxzIH0pCiAgICBieXRlYyAxOSAvLyAiaSIKICAgIGZyYW1lX2RpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyB0aGlzLnByaW5jaXBhbHMoc3Vic2NyaXB0aW9uS2V5KS52YWx1ZSA9IHsgd2FsbGV0LCBwcmluY2lwYWwgfQogICAgc3dhcAogICAgYm94X3B1dAoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gcmVjb3JkUGF5ZXIodGhpcy5zdWJzY3JpcHRpb25zKHN1YnNjcmlwdGlvbktleSkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQzNQogICAgLy8gcmV0dXJuIHN1YnNjcmlwdGlvbklECiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY3JlYXRlU3Vic2NyaXB0aW9uX2Vsc2VfYm9keUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk1CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQocGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMTAKICAgIGNhbGxzdWIgYXNzZXJ0UGxhaW5QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjM5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMTAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM3CiAgICBieXRlYyAyNiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk3CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPj0gKGFtb3VudCArIHJlcXVpcmVkKSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTEwCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgY292ZXIgOQogICAgZnJhbWVfZGlnIC02CiAgICB1bmNvdmVyIDUKICAgICsKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDM5CiAgICBieXRlYyAyNiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mzk5LTQwNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwMQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTktNDAzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozOTktNDA0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNi00MTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MDkKICAgIC8vIGFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgdW5jb3ZlciA2CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNi00MTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQwNi00MTEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyBlc2Nyb3dlZCA9IHBheW1lbnQuYW1vdW50IC0gKGFtb3VudCArIHJlcXVpcmVkKQogICAgdW5jb3ZlciA2CiAgICBzd2FwCiAgICAtCiAgICBiIGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDQyCgpjcmVhdGVTdWJzY3JpcHRpb25fYm9vbF9mYWxzZUAyMjoKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCiAgICBiIGNyZWF0ZVN1YnNjcmlwdGlvbl9ib29sX21lcmdlQDIzCgpjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9mYWxzZUA0NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Mjc2CiAgICAvLyA6IDEKICAgIGludGNfMSAvLyAxCiAgICBjb3ZlciAyCiAgICBiIGNyZWF0ZVN1YnNjcmlwdGlvbl90ZXJuYXJ5X21lcmdlQDQ4CgpjcmVhdGVTdWJzY3JpcHRpb25faWZfYm9keUA2OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gY29uc3QgYm94S2V5OiBTZXJ2aWNlc0tleSA9IHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0KICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgZnJhbWVfZGlnIC03CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoYm94S2V5KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJTZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNkbmUKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzIzCiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZS5zdGF0dXMgPT09IFNlcnZpY2VTdGF0dXNBY3RpdmUsIGVyclNlcnZpY2VJc05vdEFjdGl2ZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWMgMTYgLy8gMHgxNAogICAgPT0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyA0MSAvLyAiRVJSOmVyclNuYWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU25hYwoKY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZS5hc3NldCA9PT0gYXNzZXQsIGVyckFzYU1pc21hdGNoKQogICAgZHVwCiAgICBwdXNoaW50IDkKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDIKICAgID09CiAgICBibnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJBc2FtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFzYW0KCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyNwogICAgLy8gYW1vdW50ID0gc2VydmljZS5hbW91bnQKICAgIGR1cG4gMgogICAgcHVzaGludCAxNwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IC02CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjMyOAogICAgLy8gaW50ZXJ2YWwgPSBzZXJ2aWNlLmludGVydmFsCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgLTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzI5CiAgICAvLyBnYXRlSUQgPSBzZXJ2aWNlLmdhdGVJRAogICAgZHVwCiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyBpZiAoc2VydmljZS5wYXlvdXRBZGRyZXNzICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIHB1c2hpbnRzIDQxIDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjcmVhdGVTdWJzY3JpcHRpb25fYWZ0ZXJfaWZfZWxzZUAxNAogICAgZnJhbWVfZGlnIC03CiAgICBmcmFtZV9idXJ5IDAKCmNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMzUKICAgIC8vIGlmIChzZXJ2aWNlLnBhc3NlcyA+IDApIHsKICAgIHB1c2hpbnQgMjUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnogY3JlYXRlU3Vic2NyaXB0aW9uX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MzM2CiAgICAvLyBtYnJBbW91bnQgKz0gY29zdHMucGFzc2VzCiAgICBpbnRjIDEwIC8vIDE0NDIwMAogICAgZnJhbWVfYnVyeSAzCiAgICBiIGNyZWF0ZVN1YnNjcmlwdGlvbl9hZnRlcl9pZl9lbHNlQDE3CgpjcmVhdGVTdWJzY3JpcHRpb25fdGVybmFyeV9mYWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czozMTAKICAgIC8vIGNvbnN0IGFzc2V0OiB1aW50NjQgPSBhc2EgPyBndHhuLkFzc2V0VHJhbnNmZXJUeG4oeGZlcikueGZlckFzc2V0LmlkIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlU3Vic2NyaXB0aW9uX3Rlcm5hcnlfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY2FuVHJpZ2dlcihrZXk6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgpjYW5UcmlnZ2VyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIHByaXZhdGUgY2FuVHJpZ2dlcihrZXk6IFN1YnNjcmlwdGlvbktleSk6IGJvb2xlYW4gewogICAgcHJvdG8gMSAyCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTEKICAgIC8vIH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGZyYW1lX2J1cnkgMQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSAyCiAgICBkdXAKICAgIHB1c2hpbnQgODAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgNTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBkdXAKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDQ4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTMKICAgIC8vIGNvbnN0IGJsb2Nrc0tleSA9IHRoaXMuZ2V0QmxvY2tLZXkocmVjaXBpZW50LCBrZXkuYWRkcmVzcykKICAgIGZyYW1lX2RpZyAtMQogICAgZXh0cmFjdCAwIDMyCiAgICBjYWxsc3ViIGdldEJsb2NrS2V5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gYmxvY2tzID0gQm94TWFwPEJsb2NrTGlzdEtleSwgYnl0ZXM8MD4+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4QmxvY2tzIH0pCiAgICBieXRlYyAxMCAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIGlmICh0aGlzLmJsb2NrcyhibG9ja3NLZXkpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2Mi00NjYKICAgIC8vIHNlcnZpY2VJRCA+IDAgJiYKICAgIC8vICgKICAgIC8vICAgIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICAvLyAgIHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkudmFsdWUuc3RhdHVzID09PSBTZXJ2aWNlU3RhdHVzU2h1dGRvd24KICAgIC8vICkKICAgIGZyYW1lX2RpZyAyCiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vICF0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cyB8fAogICAgZnJhbWVfZGlnIDIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY0CiAgICAvLyAhdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMgfHwKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY2FuVHJpZ2dlcl9pZl9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBmcmFtZV9kaWcgMAogICAgaW50Y18wIC8vIDAKICAgIGludGNfMSAvLyAxCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnl0ZWMgMTMgLy8gMHgyOAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDY0LTQ2NQogICAgLy8gIXRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzIHx8CiAgICAvLyB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLnN0YXR1cyA9PT0gU2VydmljZVN0YXR1c1NodXRkb3duCiAgICBieiBjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAOAoKY2FuVHJpZ2dlcl9pZl9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDcyCiAgICAvLyBpZiAobGFzdFBheW1lbnQgPj0gdGhpcy5nZXRMYXRlc3RXaW5kb3dTdGFydChzdGFydERhdGUsIGludGVydmFsKSkgewogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgZ2V0TGF0ZXN0V2luZG93U3RhcnQKICAgIHVuY292ZXIgMwogICAgPD0KICAgIGJ6IGNhblRyaWdnZXJfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMQogICAgZnJhbWVfYnVyeSAxCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIGlmIChhbW91bnQgPiBlc2Nyb3dlZCkgewogICAgPAogICAgYnogY2FuVHJpZ2dlcl9hZnRlcl9pZl9lbHNlQDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjYW5UcmlnZ2VyX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9kaWcgLTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmxlZ2FjeVJlZmVycmVyKCkgLT4gYnl0ZXM6CmxlZ2FjeVJlZmVycmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIHJldHVybiByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIHJldHVybiByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgY2FsbHN1YiByZWZlcnJlck9yWmVyb0FkZHJlc3MKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc3Vic2NyaWJlSW1wbChwYXltZW50OiB1aW50NjQsIGFzYTogdWludDY0LCB4ZmVyOiB1aW50NjQsIGdhdGVkOiB1aW50NjQsIGdhdGU6IHVpbnQ2NCwgcmVjaXBpZW50OiBieXRlcywgYW1vdW50OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQsIHNlcnZpY2VJRDogdWludDY0LCB3YWxsZXQ6IHVpbnQ2NCwgbGVnYWN5OiB1aW50NjQpIC0+IHVpbnQ2NDoKc3Vic2NyaWJlSW1wbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTUxLTU2MwogICAgLy8gcHJpdmF0ZSBzdWJzY3JpYmVJbXBsKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzYTogYm9vbGVhbiwKICAgIC8vICAgeGZlcjogdWludDY0LAogICAgLy8gICBnYXRlZDogYm9vbGVhbiwKICAgIC8vICAgZ2F0ZTogdWludDY0LAogICAgLy8gICByZWNpcGllbnQ6IEFjY291bnQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBpbnRlcnZhbDogdWludDY0LAogICAgLy8gICBzZXJ2aWNlSUQ6IFNlcnZpY2VJRCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQsCiAgICAvLyAgIGxlZ2FjeTogYm9vbGVhbgogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDExIDEKICAgIGJ5dGVjXzMgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID49IE1JTl9BTU9VTlQsIGVyck1pbkFtb3VudElzVGhyZWUpCiAgICBmcmFtZV9kaWcgLTUKICAgIHB1c2hpbnQgNAogICAgPj0KICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgNDYgLy8gIkVSUjplcnJNYW10IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1hbXQKCnN1YnNjcmliZUltcGxfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjQKICAgIC8vIGxvZ2dlZEFzc2VydChpbnRlcnZhbCA+PSBNSU5fSU5URVJWQUwsIGVyck1pbkludGVydmFsSXNTaXh0eSkKICAgIGZyYW1lX2RpZyAtNAogICAgcHVzaGludCA2MAogICAgPj0KICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgNDcgLy8gIkVSUjplcnJNaW52IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1pbnYKCnN1YnNjcmliZUltcGxfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1MjYKICAgIC8vIGlmIChnYXRlZCkgewogICAgZnJhbWVfZGlnIC04CiAgICBieiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTI3CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VydmljZUlEICE9PSAwLCBlcnJOb3RBU2VydmljZSkKICAgIGZyYW1lX2RpZyAtMwogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAyMAogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJOc3ZjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5zdmMKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyBpZiAoc2VydmljZUlEID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTMKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTMxCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY2hlY2tTdWJzY3JpYmVAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2NgogICAgLy8gaWYgKGxlZ2FjeSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NjcKICAgIC8vIGNvbnN0IGxlZ2FjeVdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NjcKICAgIC8vIGNvbnN0IGxlZ2FjeVdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBsZWdhY3lXYWxsZXRPZgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGlmIChnYXRlZCkgewogICAgZnJhbWVfZGlnIC04CiAgICBieiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4oZ2F0ZSksIHRoaXMuYWtpdGFEQU8udmFsdWUsIGxlZ2FjeU9yaWdpbk9yVHhuU2VuZGVyKGxlZ2FjeVdhbGxldCksIGdhdGVJRCksIGVyckZhaWxlZEdhdGUpCiAgICBmcmFtZV9kaWcgLTcKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhndHhuLkFwcGxpY2F0aW9uQ2FsbFR4bihnYXRlKSwgdGhpcy5ha2l0YURBTy52YWx1ZSwgbGVnYWN5T3JpZ2luT3JUeG5TZW5kZXIobGVnYWN5V2FsbGV0KSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgbGVnYWN5T3JpZ2luT3IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTY5CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGd0eG4uQXBwbGljYXRpb25DYWxsVHhuKGdhdGUpLCB0aGlzLmFraXRhREFPLnZhbHVlLCBsZWdhY3lPcmlnaW5PclR4blNlbmRlcihsZWdhY3lXYWxsZXQpLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgZnJhbWVfZGlnIC03CiAgICBjb3ZlciAyCiAgICBmcmFtZV9kaWcgMAogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VANQogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIHJldHVybiB0aGlzLmNyZWF0ZVN1YnNjcmlwdGlvbihwYXltZW50LCBhc2EsIHhmZXIsIHJlY2lwaWVudCwgYW1vdW50LCBpbnRlcnZhbCwgc2VydmljZUlELCByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0KSwgMCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgY2FsbHN1YiByZWZlcnJlck9yWmVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgZnJhbWVfZGlnIC0xMQogICAgZnJhbWVfZGlnIC0xMAogICAgZnJhbWVfZGlnIC05CiAgICBmcmFtZV9kaWcgLTYKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgOAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgOQogICAgY2FsbHN1YiBjcmVhdGVTdWJzY3JpcHRpb24KICAgIHN3YXAKICAgIHJldHN1YgoKc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gY29uc3QgcCA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc1CiAgICAvLyBpZiAoZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtOAogICAgYnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjU3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVja0N0eChndHhuLkFwcGxpY2F0aW9uQ2FsbFR4bihnYXRlKSwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwKSwgZ2F0ZUlEKSwgZXJyRmFpbGVkR2F0ZSkKICAgIGZyYW1lX2RpZyAtNwogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrQ3R4KGd0eG4uQXBwbGljYXRpb25DYWxsVHhuKGdhdGUpLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHApLCBnYXRlSUQpLCBlcnJGYWlsZWRHYXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2F0ZUN0eAogICAgY292ZXIgMgogICAgZnJhbWVfZGlnIC03CiAgICBjb3ZlciAyCiAgICBmcmFtZV9kaWcgMAogICAgY2FsbHN1YiBnYXRlQ2hlY2tDdHgKICAgIHBvcAogICAgYm56IHN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAxMAogICAgYnl0ZWMgMjAgLy8gIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCnN1YnNjcmliZUltcGxfYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTc4CiAgICAvLyByZXR1cm4gdGhpcy5jcmVhdGVTdWJzY3JpcHRpb24ocGF5bWVudCwgYXNhLCB4ZmVyLCByZWNpcGllbnQsIGFtb3VudCwgaW50ZXJ2YWwsIHNlcnZpY2VJRCwgcC5yZWZlcnJlciwgcC53YWxsZXQsIHAucHJpbmNpcGFsKQogICAgZHVwCiAgICBleHRyYWN0IDEwNCAzMgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgdW5jb3ZlciAyCiAgICBleHRyYWN0IDggMzIKICAgIGZyYW1lX2RpZyAtMTEKICAgIGZyYW1lX2RpZyAtMTAKICAgIGZyYW1lX2RpZyAtOQogICAgZnJhbWVfZGlnIC02CiAgICBmcmFtZV9kaWcgLTUKICAgIGZyYW1lX2RpZyAtNAogICAgZnJhbWVfZGlnIC0zCiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICBjYWxsc3ViIGNyZWF0ZVN1YnNjcmlwdGlvbgogICAgc3dhcAogICAgcmV0c3ViCgpzdWJzY3JpYmVJbXBsX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuc2VydmljZXMoeyBhZGRyZXNzOiByZWNpcGllbnQsIGlkOiBzZXJ2aWNlSUQgfSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzdWJzY3JpYmVJbXBsX2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWMgNiAvLyAiRVJSOmVyclNkbmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2RuZQoKc3Vic2NyaWJlSW1wbF9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNQogICAgLy8gY29uc3QgZ2F0ZUlEID0gdGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS52YWx1ZS5nYXRlSUQKICAgIHB1c2hpbnQgMzMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gaWYgKCFnYXRlZCkgewogICAgZnJhbWVfZGlnIC04CiAgICBibnogc3Vic2NyaWJlSW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuY2hlY2tTdWJzY3JpYmVAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTM3CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUlEID09PSAwLCBlcnJIYXNHYXRlKQogICAgZnJhbWVfZGlnIDAKICAgIGJ6IHN1YnNjcmliZUltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmNoZWNrU3Vic2NyaWJlQDI4CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhndGUKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJHYXRlSUQoa2V5OiBieXRlcykgLT4gdWludDY0LCBieXRlczoKdHJpZ2dlckdhdGVJRDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyBwcml2YXRlIHRyaWdnZXJHYXRlSUQoa2V5OiBTdWJzY3JpcHRpb25LZXkpOiB1aW50NjQgewogICAgcHJvdG8gMSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE0Ni0xNDgKICAgIC8vIHN1YnNjcmlwdGlvbnMgPSBCb3hNYXA8U3Vic2NyaXB0aW9uS2V5LCBTdWJzY3JpcHRpb25JbmZvPih7CiAgICAvLyAgIGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnMsCiAgICAvLyB9KQogICAgYnl0ZWMgNCAvLyAicyIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zdWJzY3JpcHRpb25zKGtleSkuZXhpc3RzLCBlcnJTdWJzY3JpcHRpb25Eb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB0cmlnZ2VyR2F0ZUlEX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyVWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJVZG5lCgp0cmlnZ2VyR2F0ZUlEX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODYKICAgIC8vIGNvbnN0IHsgc2VydmljZUlELCByZWNpcGllbnQgfSA9IHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIGxvZ2dlZEFzc2VydChzZXJ2aWNlSUQgIT09IDAsIGVyck5vdEFTZXJ2aWNlKQogICAgYm56IHRyaWdnZXJHYXRlSURfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDQ4IC8vICJFUlI6ZXJyTnN2YyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOc3ZjCgp0cmlnZ2VyR2F0ZUlEX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLmV4aXN0cywgZXJyU2VydmljZURvZXNOb3RFeGlzdCkKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5zZXJ2aWNlcyh7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9KS5leGlzdHMsIGVyclNlcnZpY2VEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB0cmlnZ2VyR2F0ZUlEX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgp0cmlnZ2VyR2F0ZUlEX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VzKHsgYWRkcmVzczogcmVjaXBpZW50LCBpZDogc2VydmljZUlEIH0pLnZhbHVlLmdhdGVJRAogICAgcHVzaGludCAzMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBmcmFtZV9kaWcgLTEKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMudHJpZ2dlckN0eChrZXk6IGJ5dGVzLCBwOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzLCBieXRlczoKdHJpZ2dlckN0eDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjAzCiAgICAvLyBwcml2YXRlIHRyaWdnZXJDdHgoa2V5OiBTdWJzY3JpcHRpb25LZXksIHA6IFByaW5jaXBhbCk6IEdhdGVDdHggewogICAgcHJvdG8gMiAzCiAgICBieXRlY18zIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gcHJpbmNpcGFscyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvblByaW5jaXBhbD4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhQcmluY2lwYWxzIH0pCiAgICBieXRlYyAxOSAvLyAiaSIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjA2CiAgICAvLyBpZiAodGhpcy5wcmluY2lwYWxzKGtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHRyaWdnZXJDdHhfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjA3CiAgICAvLyBjb25zdCBzdG9yZWQgPSBjbG9uZSh0aGlzLnByaW5jaXBhbHMoa2V5KS52YWx1ZSkKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYwOAogICAgLy8gaWYgKHAud2FsbGV0ICE9PSAwICYmIHAud2FsbGV0ID09PSBzdG9yZWQud2FsbGV0KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIGJ6IHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA2CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfZGlnIDAKICAgID09CiAgICBieiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIHJldHVybiBnYXRlQ3R4KHApCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgZ2F0ZUN0eAogICAgZnJhbWVfYnVyeSAtMQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICByZXRzdWIKCnRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTEKICAgIC8vIHdhbGxldCA9IHN0b3JlZC53YWxsZXQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYxMgogICAgLy8gcHJpbmNpcGFsID0gYXRSZXN0UHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwga2V5LmFkZHJlc3MsIHN0b3JlZC53YWxsZXQsIHN0b3JlZC5wcmluY2lwYWwpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTIKICAgIC8vIHByaW5jaXBhbCA9IGF0UmVzdFByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzLCBzdG9yZWQud2FsbGV0LCBzdG9yZWQucHJpbmNpcGFsKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgZXh0cmFjdCAwIDMyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGNvdmVyIDQKICAgIHN3YXAKICAgIGV4dHJhY3QgOCAzMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgYnl0ZWMgOCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NDMKICAgIC8vIHJldHVybiBhdFJlc3RQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFjY291bnQsIHdhbGxldCwgc3RvcmVkKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjcxCiAgICAvLyBpZiAoc3RvcmVkID09PSBhY2NvdW50KSB7CiAgICA9PQogICAgYnogdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDEzCiAgICBwb3AKICAgIGJ1cnkgMQogICAgc3dhcAoKdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYyMwogICAgLy8gd2FsbGV0OiBvd25zQXRSZXN0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0LCBrZXkuYWRkcmVzcykgPyB3YWxsZXQgOiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyB3YWxsZXQ6IG93bnNBdFJlc3RPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQsIGtleS5hZGRyZXNzKSA/IHdhbGxldCA6IDAsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBleHRyYWN0IDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzOAogICAgLy8gcmV0dXJuIG93bnNBdFJlc3QoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIHdhbGxldCwgYWNjb3VudCkKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgZGlnIDMKICAgIGNhbGxzdWIgb3duc0F0UmVzdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MjMKICAgIC8vIHdhbGxldDogb3duc0F0UmVzdE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCwga2V5LmFkZHJlc3MpID8gd2FsbGV0IDogMCwKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjIwLTYyNQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgcHJpbmNpcGFsLAogICAgLy8gICAvLyB0aGUgd2FsbGV0IG9ubHkgY291bnRzIHdoaWxlIGl0IG93bnMgdGhlIHN1YnNjcmliZXIgYXQgcmVzdCAobm8gd2FsbGV0LWdsb2JhbCByZWFkcykKICAgIC8vICAgd2FsbGV0OiBvd25zQXRSZXN0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0LCBrZXkuYWRkcmVzcykgPyB3YWxsZXQgOiAwLAogICAgLy8gICBzcGVuZGVyOiBrZXkuYWRkcmVzcywKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyNzQKICAgIC8vIGlmICghb3duc0F0UmVzdCh3YWxsZXRGYWN0b3J5LCB3YWxsZXQsIGFjY291bnQpKSB7CiAgICBkaWcgMQogICAgZGlnIDQKICAgIGNhbGxzdWIgb3duc0F0UmVzdAogICAgYm56IHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUAxNQogICAgYnVyeSAxCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0MwogICAgLy8gcmV0dXJuIGF0UmVzdFByaW5jaXBhbChnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWNjb3VudCwgd2FsbGV0LCBzdG9yZWQpCiAgICBiIHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA4Cgp0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc5CiAgICAvLyBjb25zdCBbYWRkcmVzc10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjI3OAogICAgLy8gaWYgKHN0b3JlZCA9PT0gd2FsbGV0QWRkcmVzcykgewogICAgZGlnIDMKICAgID09CiAgICBieiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6Mjc5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZih3YWxsZXRBZGRyZXNzKSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzID8gc3RvcmVkIDogYWNjb3VudAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk0MwogICAgLy8gcmV0dXJuIGF0UmVzdFByaW5jaXBhbChnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWNjb3VudCwgd2FsbGV0LCBzdG9yZWQpCiAgICBiIHRyaWdnZXJDdHhfYWZ0ZXJfaWZfZWxzZUA4Cgp0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyODEKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHN0b3JlZCkgPT09IHdhbGxldEFkZHJlc3MgPyBzdG9yZWQgOiBhY2NvdW50CiAgICB1bmNvdmVyIDIKICAgID09CiAgICB1bmNvdmVyIDMKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NDMKICAgIC8vIHJldHVybiBhdFJlc3RQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFjY291bnQsIHdhbGxldCwgc3RvcmVkKQogICAgYiB0cmlnZ2VyQ3R4X2FmdGVyX2lmX2Vsc2VAOAoKdHJpZ2dlckN0eF9lbHNlX2JvZHlANzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2MTUKICAgIC8vIGNvbnN0IGxlZ2FjeVdhbGxldCA9IGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIGtleS5hZGRyZXNzKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE1CiAgICAvLyBjb25zdCBsZWdhY3lXYWxsZXQgPSBsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBrZXkuYWRkcmVzcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgbGVnYWN5V2FsbGV0T2YKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjE3CiAgICAvLyBwcmluY2lwYWwgPSBsZWdhY3lPcmlnaW5PcihsZWdhY3lXYWxsZXQsIGtleS5hZGRyZXNzKQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgbGVnYWN5T3JpZ2luT3IKICAgIGIgdHJpZ2dlckN0eF9hZnRlcl9pZl9lbHNlQDgKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnRyaWdnZXJJbXBsKGtleTogYnl0ZXMsIGdhdGVkOiB1aW50NjQpIC0+IGJ5dGVzOgp0cmlnZ2VySW1wbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjMzCiAgICAvLyBwcml2YXRlIHRyaWdnZXJJbXBsKGtleTogU3Vic2NyaXB0aW9uS2V5LCBnYXRlZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjYzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuY2FuVHJpZ2dlcihrZXkpLCBlcnJDYW5ub3RUcmlnZ2VyKQogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIGNhblRyaWdnZXIKICAgIGZyYW1lX2J1cnkgLTIKICAgIGJueiB0cmlnZ2VySW1wbF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQ3RyZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDdHJnCgp0cmlnZ2VySW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTQ2LTE0OAogICAgLy8gc3Vic2NyaXB0aW9ucyA9IEJveE1hcDxTdWJzY3JpcHRpb25LZXksIFN1YnNjcmlwdGlvbkluZm8+KHsKICAgIC8vICAga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U3Vic2NyaXB0aW9ucywKICAgIC8vIH0pCiAgICBieXRlYyA0IC8vICJzIgogICAgZnJhbWVfZGlnIC0yCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDMKICAgIC8vIH0gPSB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgNjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDUKICAgIC8vIGlmIChnYXRlSUQgIT09IDApIHsKICAgIGJ6IHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NDYKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlZCwgZXJySW52YWxpZFNlcXVlbmNlKQogICAgZnJhbWVfZGlnIC0xCiAgICBibnogdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUA4CiAgICBieXRlYyAyMSAvLyAiRVJSOmVycklzZXEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXNlcQoKdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIGlmIChzZXJ2aWNlSUQgIT09IDApIHsKICAgIGRpZyAyCiAgICBibnogdHJpZ2dlckltcGxfaWZfYm9keUA5CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgdW5jb3ZlciAyCgp0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjEKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHMoYW1vdW50KQogICAgZGlnIDIKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjMKICAgIC8vIGlmIChpc0FzYSkgewogICAgZGlnIDIKICAgIGJ6IHRyaWdnZXJJbXBsX2Vsc2VfYm9keUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjYtNjcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2OAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY2OAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjcwCiAgICAvLyBhc3NldEFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjY2LTY3MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NjYtNjcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzQtNjgwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njc2CiAgICAvLyBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY3NC02NzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NzQtNjgwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMudHJpZ2dlckZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY4Mi02ODgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2ODYKICAgIC8vIGFzc2V0QW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2ODItNjg3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBwYXlvdXRUYXJnZXQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50cy5sZWZ0T3ZlcgogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjgyLTY4OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcGF5b3V0VGFyZ2V0LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyBjb25zdCBzdWIgPSBjbG9uZSh0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZSkKICAgIGRpZyAxCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIGNvbnN0IGN1cnJlbnRXaW5kb3dTdGFydDogdWludDY0ID0gdGhpcy5nZXRMYXRlc3RXaW5kb3dTdGFydChzdWIuc3RhcnREYXRlLCBzdWIuaW50ZXJ2YWwpCiAgICBkdXAKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMQogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGRpZyAxCiAgICBjYWxsc3ViIGdldExhdGVzdFdpbmRvd1N0YXJ0CiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjA3CiAgICAvLyBjb25zdCBsYXN0V2luZG93U3RhcnQ6IHVpbnQ2NCA9IHRoaXMuZ2V0UHJldmlvdXNXaW5kb3dTdGFydChjdXJyZW50V2luZG93U3RhcnQsIHN1Yi5pbnRlcnZhbCkKICAgIHN3YXAKICAgIGNhbGxzdWIgZ2V0UHJldmlvdXNXaW5kb3dTdGFydAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMDkKICAgIC8vIGlmIChzdWIubGFzdFBheW1lbnQgPCBsYXN0V2luZG93U3RhcnQpIHsKICAgIHN3YXAKICAgIHB1c2hpbnQgODAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgPAogICAgYnogdHJpZ2dlckltcGxfYWZ0ZXJfaWZfZWxzZUAyOAogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIHRoaXMuc3Vic2NyaXB0aW9ucyhrZXkpLnZhbHVlLnN0cmVhayA9IDEKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBkaWcgMgogICAgcHVzaGludCA4OAogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwoKdHJpZ2dlckltcGxfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLmluY3JlbWVudFN0cmVha09uUGF5bWVudEAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzE1CiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMoa2V5KS52YWx1ZS5lc2Nyb3dlZCAtPSBhbW91bnQKICAgIHN3YXAKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIGRpZyAxCiAgICBwdXNoaW50IDk2CiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUubGFzdFBheW1lbnQgPSBHbG9iYWwubGF0ZXN0VGltZXN0YW1wCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpdG9iCiAgICBwdXNoaW50IDgwCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZnJhbWVfZGlnIC0yCiAgICByZXRzdWIKCnRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNgogICAgLy8gaWYgKHN1Yi5sYXN0UGF5bWVudCA8IGN1cnJlbnRXaW5kb3dTdGFydCkgewogICAgdW5jb3ZlciAzCiAgICA8CiAgICBieiB0cmlnZ2VySW1wbF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuaW5jcmVtZW50U3RyZWFrT25QYXltZW50QDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjIxNwogICAgLy8gdGhpcy5zdWJzY3JpcHRpb25zKGtleSkudmFsdWUuc3RyZWFrICs9IDEKICAgIGRpZyAxCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIHB1c2hpbnQgODgKICAgIHN3YXAKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBiIHRyaWdnZXJJbXBsX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5pbmNyZW1lbnRTdHJlYWtPblBheW1lbnRAMzEKCnRyaWdnZXJJbXBsX2Vsc2VfYm9keUAxOToKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5MS02OTYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy5ha2l0YUZlZQogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5MwogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5NAogICAgLy8gYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2OTEtNjk1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMuYWtpdGFGZWUKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NjkxLTY5NgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLmFraXRhRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Njk4LTcwMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwMAogICAgLy8gcmVjZWl2ZXI6IFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwMQogICAgLy8gYW1vdW50OiBhbW91bnRzLnRyaWdnZXJGZWUKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5OC03MDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY5OC03MDMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFtb3VudDogYW1vdW50cy50cmlnZ2VyRmVlCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA1LTcxMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gYW1vdW50OiBhbW91bnRzLmxlZnRPdmVyCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA1LTcwOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzA1LTcxMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheW91dFRhcmdldCwKICAgIC8vICAgICBhbW91bnQ6IGFtb3VudHMubGVmdE92ZXIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDIzCgp0cmlnZ2VySW1wbF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1MQogICAgLy8gY29uc3Qgc2VydmljZUtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGRpZyAzCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBzZXJ2aWNlcyA9IEJveE1hcDxTZXJ2aWNlc0tleSwgU2VydmljZT4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlcyB9KQogICAgYnl0ZWNfMiAvLyAibyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1MgogICAgLy8gaWYgKHRoaXMuc2VydmljZXMoc2VydmljZUtleSkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiB0cmlnZ2VySW1wbF9pZl9ib2R5QDEwCiAgICBwb3AKICAgIHVuY292ZXIgMgogICAgYiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDE0Cgp0cmlnZ2VySW1wbF9pZl9ib2R5QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo2NTMKICAgIC8vIGNvbnN0IHBheW91dEFkZHJlc3MgPSB0aGlzLnNlcnZpY2VzKHNlcnZpY2VLZXkpLnZhbHVlLnBheW91dEFkZHJlc3MKICAgIHB1c2hpbnRzIDQxIDMyCiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gaWYgKHBheW91dEFkZHJlc3MgIT09IEdsb2JhbC56ZXJvQWRkcmVzcykgewogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IHRyaWdnZXJJbXBsX2lmX2JvZHlAMTEKICAgIHBvcAogICAgdW5jb3ZlciAyCiAgICBiIHRyaWdnZXJJbXBsX2FmdGVyX2lmX2Vsc2VAMTQKCnRyaWdnZXJJbXBsX2lmX2JvZHlAMTE6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgYiB0cmlnZ2VySW1wbF9hZnRlcl9pZl9lbHNlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo6U3Vic2NyaXB0aW9ucy5uZXdTZXJ2aWNlSW1wbChwYXltZW50OiB1aW50NjQsIGludGVydmFsOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCBwYXNzZXM6IHVpbnQ2NCwgZ2F0ZUlEOiB1aW50NjQsIHBheW91dEFkZHJlc3M6IGJ5dGVzLCB0aXRsZTogYnl0ZXMsIGJhbm5lckltYWdlOiBieXRlcywgaGlnaGxpZ2h0TWVzc2FnZTogYnl0ZXMsIGhpZ2hsaWdodENvbG9yOiBieXRlcywgcmVmZXJyZXI6IGJ5dGVzKSAtPiB1aW50NjQ6Cm5ld1NlcnZpY2VJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MjAtNzMzCiAgICAvLyBwcml2YXRlIG5ld1NlcnZpY2VJbXBsKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGludGVydmFsOiB1aW50NjQsCiAgICAvLyAgIGFzc2V0OiB1aW50NjQsCiAgICAvLyAgIGFtb3VudDogdWludDY0LAogICAgLy8gICBwYXNzZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIHBheW91dEFkZHJlc3M6IEFjY291bnQsCiAgICAvLyAgIHRpdGxlOiBzdHJpbmcsCiAgICAvLyAgIGJhbm5lckltYWdlOiBDSUQsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2U6IFVpbnQ4LAogICAgLy8gICBoaWdobGlnaHRDb2xvcjogYnl0ZXM8Mz4sCiAgICAvLyAgIHJlZmVycmVyOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTIgMQogICAgYnl0ZWNfMyAvLyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDEyIC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3MzQKICAgIC8vIGNvbnN0IG5lZWRzU2VydmljZXNMaXN0Qm94TWJyID0gIXRoaXMuc2VydmljZXNsaXN0KFR4bi5zZW5kZXIpLmV4aXN0cwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM0CiAgICAvLyBjb25zdCBuZWVkc1NlcnZpY2VzTGlzdEJveE1iciA9ICF0aGlzLnNlcnZpY2VzbGlzdChUeG4uc2VuZGVyKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIHNlcnZpY2VzbGlzdCA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXNMaXN0IH0pCiAgICBieXRlYyAxMiAvLyAibSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3U2VydmljZUlEKFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2NgogICAgLy8gY29uc3QgaWQ6IHVpbnQ2NCA9IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjI2Ni0yNjgKICAgIC8vIGNvbnN0IGlkOiB1aW50NjQgPSB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS5leGlzdHMKICAgIC8vICAgPyB0aGlzLnNlcnZpY2VzbGlzdChhZGRyZXNzKS52YWx1ZQogICAgLy8gICA6IDEKICAgIGJ6IG5ld1NlcnZpY2VJbXBsX3Rlcm5hcnlfZmFsc2VAMzcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyA/IHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCgpuZXdTZXJ2aWNlSW1wbF90ZXJuYXJ5X21lcmdlQDM4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIHRoaXMuc2VydmljZXNsaXN0KGFkZHJlc3MpLnZhbHVlID0gaWQgKyAxCiAgICBkdXBuIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM2CiAgICAvLyBjb25zdCBib3hLZXk6IFNlcnZpY2VzS2V5ID0geyBhZGRyZXNzOiBUeG4uc2VuZGVyLCBpZCB9CiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBsb2dnZWRBc3NlcnQoYW1vdW50ID49IE1JTl9BTU9VTlQsIGVyck1pbkFtb3VudElzVGhyZWUpCiAgICBmcmFtZV9kaWcgLTkKICAgIHB1c2hpbnQgNAogICAgPj0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNDYgLy8gIkVSUjplcnJNYW10IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1hbXQKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDEKICAgIC8vIGxvZ2dlZEFzc2VydChpbnRlcnZhbCA+PSBNSU5fSU5URVJWQUwsIGVyck1pbkludGVydmFsSXNTaXh0eSkKICAgIGZyYW1lX2RpZyAtMTEKICAgIHB1c2hpbnQgNjAKICAgID49CiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDQ3IC8vICJFUlI6ZXJyTWludiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNaW52CgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQzCiAgICAvLyBsb2dnZWRBc3NlcnQocGFzc2VzIDw9IE1BWF9QQVNTRVMsIGVyck1heFBhc3Nlc0lzRml2ZSkKICAgIGZyYW1lX2RpZyAtOAogICAgcHVzaGludCA1CiAgICA8PQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNeHBzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck14cHMKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NDQKICAgIC8vIGxvZ2dlZEFzc2VydChCeXRlcyh0aXRsZSkubGVuZ3RoIDw9IE1BWF9USVRMRV9MRU5HVEgsIGVyclRpdGxlVG9vTG9uZykKICAgIGZyYW1lX2RpZyAtNQogICAgbGVuCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgMTI4CiAgICA8PQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA0MCAvLyAiRVJSOmVyclR0bGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVHRsZwoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc0NgogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0NQogICAgLy8gY29uc3QgW3N1YnNjcmlwdGlvbkZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTdWJzY3JpcHRpb25GZWVzKSkKICAgIGJ5dGVjIDI4IC8vICJzdWJzY3JpcHRpb25fZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ2CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzQ5CiAgICAvLyBsZXQgcmVxdWlyZWRBbW91bnQ6IHVpbnQ2NCA9IHNlcnZpY2VDcmVhdGlvbkZlZSArIGNvc3RzLnNlcnZpY2VzCiAgICBpbnRjIDExIC8vIDEzNzg5MDAKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzUwCiAgICAvLyBpZiAobmVlZHNTZXJ2aWNlc0xpc3RCb3hNYnIpIHsKICAgIGZyYW1lX2RpZyAyCiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTEKICAgIC8vIHJlcXVpcmVkQW1vdW50ICs9IGNvc3RzLnNlcnZpY2VzbGlzdAogICAgc3dhcAogICAgaW50YyA3IC8vIDE4OTAwCiAgICArCiAgICBzd2FwCgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTMKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xMAogICAgYnogbmV3U2VydmljZUltcGxfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NTgKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjkgLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzU5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSksIGVyck5vdE9wdGVkSW4pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYm56IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2lmX2Vsc2VAMTYKICAgIGJ5dGVjIDI5IC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0CgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjQKICAgIC8vIGNvbnN0IHsgbGVmdG92ZXIsIHJlZmVycmFsTWJyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIDAsIHNlcnZpY2VDcmVhdGlvbkZlZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgMCwgc2VydmljZUNyZWF0aW9uRmVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8gY29uc3QgeyBsZWZ0b3ZlciwgcmVmZXJyYWxNYnIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCByZWZlcnJlciwgMCwgc2VydmljZUNyZWF0aW9uRmVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA2CiAgICB1bmNvdmVyIDQKICAgIGNhbGxzdWIgc2VuZFJlZmVycmFsUGF5bWVudFRvCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2NgogICAgLy8gYXNzZXJ0RXhhY3RQYXltZW50KHBheW1lbnQsIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCByZXF1aXJlZEFtb3VudCArIHJlZmVycmFsTWJyKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICArCiAgICBmcmFtZV9kaWcgLTEyCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEV4YWN0UGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NjgtNzczCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzAKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc2OC03NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzY4LTc3MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlcgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3NS03ODgKICAgIC8vIHRoaXMuc2VydmljZXMoYm94S2V5KS52YWx1ZSA9IHsKICAgIC8vICAgc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICAvLyAgIGludGVydmFsLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBwYXNzZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgcGF5b3V0QWRkcmVzcywKICAgIC8vICAgdGl0bGUsCiAgICAvLyAgIGRlc2NyaXB0aW9uOiAnJywKICAgIC8vICAgYmFubmVySW1hZ2UsCiAgICAvLyAgIGhpZ2hsaWdodE1lc3NhZ2UsCiAgICAvLyAgIGhpZ2hsaWdodENvbG9yCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTExCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gc3RhdHVzOiBTZXJ2aWNlU3RhdHVzRHJhZnQsCiAgICBwdXNoYnl0ZXMgMHgwYQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3NzUtNzg4CiAgICAvLyB0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUgPSB7CiAgICAvLyAgIHN0YXR1czogU2VydmljZVN0YXR1c0RyYWZ0LAogICAgLy8gICBpbnRlcnZhbCwKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgcGFzc2VzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIHBheW91dEFkZHJlc3MsCiAgICAvLyAgIHRpdGxlLAogICAgLy8gICBkZXNjcmlwdGlvbjogJycsCiAgICAvLyAgIGJhbm5lckltYWdlLAogICAgLy8gICBoaWdobGlnaHRNZXNzYWdlLAogICAgLy8gICBoaWdobGlnaHRDb2xvcgogICAgLy8gfQogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtOQogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTUKICAgIGNvbmNhdAogICAgc3dhcAogICAgcHVzaGJ5dGVzIDB4MDA3NQogICAgY29uY2F0CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDExNwogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAxMSAvLyAweDAwMDAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIHNlcnZpY2VzID0gQm94TWFwPFNlcnZpY2VzS2V5LCBTZXJ2aWNlPih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFNlcnZpY2VzIH0pCiAgICBieXRlY18yIC8vICJvIgogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzc1LTc4OAogICAgLy8gdGhpcy5zZXJ2aWNlcyhib3hLZXkpLnZhbHVlID0gewogICAgLy8gICBzdGF0dXM6IFNlcnZpY2VTdGF0dXNEcmFmdCwKICAgIC8vICAgaW50ZXJ2YWwsCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIHBhc3NlcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBwYXlvdXRBZGRyZXNzLAogICAgLy8gICB0aXRsZSwKICAgIC8vICAgZGVzY3JpcHRpb246ICcnLAogICAgLy8gICBiYW5uZXJJbWFnZSwKICAgIC8vICAgaGlnaGxpZ2h0TWVzc2FnZSwKICAgIC8vICAgaGlnaGxpZ2h0Q29sb3IKICAgIC8vIH0KICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4NAogICAgLy8gbGV0IGFjdGl2YXRlZCA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gKFR4bi5ncm91cEluZGV4ICsgMSk7IGkgPCBHbG9iYWwuZ3JvdXBTaXplOyBpICs9IDEpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgZnJhbWVfYnVyeSAxCgpuZXdTZXJ2aWNlSW1wbF93aGlsZV90b3BAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gKFR4bi5ncm91cEluZGV4ICsgMSk7IGkgPCBHbG9iYWwuZ3JvdXBTaXplOyBpICs9IDEpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBnbG9iYWwgR3JvdXBTaXplCiAgICA8CiAgICBieiBuZXdTZXJ2aWNlSW1wbF9ibG9ja0AzMQogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGlmICh0eG4udHlwZSAhPT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbCkgewogICAgZnJhbWVfZGlnIDEKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYKICAgICE9CiAgICBibnogbmV3U2VydmljZUltcGxfYmxvY2tAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQsIGVyckludmFsaWRTZXF1ZW5jZSkKICAgIGZyYW1lX2RpZyAxCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyAyMSAvLyAiRVJSOmVycklzZXEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXNlcQoKbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo0OTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AsIGVyckludmFsaWRTZXF1ZW5jZSkKICAgIGZyYW1lX2RpZyAxCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIGJ6IG5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgMjEgLy8gIkVSUjplcnJJc2VxIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklzZXEKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDk1CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlciwgZXJySW52YWxpZFNlcXVlbmNlKQogICAgZnJhbWVfZGlnIDEKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjcKICAgIGJ5dGVjIDIxIC8vICJFUlI6ZXJySXNlcSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJc2VxCgpuZXdTZXJ2aWNlSW1wbF9hZnRlcl9hc3NlcnRAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gaWYgKHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmFjdGl2YXRlU2VydmljZSkpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDMwIC8vIG1ldGhvZCAiYWN0aXZhdGVTZXJ2aWNlKCl2b2lkIgogICAgPT0KICAgIGJ6IG5ld1NlcnZpY2VJbXBsX2Jsb2NrQDI5CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjQ5OAogICAgLy8gYWN0aXZhdGVkID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKbmV3U2VydmljZUltcGxfYmxvY2tAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFjdGl2YXRlZCwgZXJyU2VydmljZU5vdEFjdGl2YXRlZCkKICAgIGZyYW1lX2RpZyAwCiAgICBibnogbmV3U2VydmljZUltcGxfYWZ0ZXJfYXNzZXJ0QDMzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJTbmF2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNuYXYKCm5ld1NlcnZpY2VJbXBsX2FmdGVyX2Fzc2VydEAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NzkyCiAgICAvLyByZXR1cm4gaWQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpuZXdTZXJ2aWNlSW1wbF9ibG9ja0AyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6NDg1CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAoVHhuLmdyb3VwSW5kZXggKyAxKTsgaSA8IEdsb2JhbC5ncm91cFNpemU7IGkgKz0gMSkgewogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBmcmFtZV9idXJ5IDEKICAgIGIgbmV3U2VydmljZUltcGxfd2hpbGVfdG9wQDE5CgpuZXdTZXJ2aWNlSW1wbF90ZXJuYXJ5X2ZhbHNlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czoyNjgKICAgIC8vIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgbmV3U2VydmljZUltcGxfdGVybmFyeV9tZXJnZUAzOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6OlN1YnNjcmlwdGlvbnMuc2VydmljZUNvc3QocmVmZXJyZXI6IGJ5dGVzKSAtPiB1aW50NjQ6CnNlcnZpY2VDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo3OTYKICAgIC8vIHByaXZhdGUgc2VydmljZUNvc3QocmVmZXJyZXI6IEFjY291bnQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5NwogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjc5NwogICAgLy8gY29uc3Qgc2VydmljZUNyZWF0aW9uRmVlID0gZ2V0U3Vic2NyaXB0aW9uRmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5zZXJ2aWNlQ3JlYXRpb25GZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0NQogICAgLy8gY29uc3QgW3N1YnNjcmlwdGlvbkZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNTdWJzY3JpcHRpb25GZWVzKSkKICAgIGJ5dGVjIDI4IC8vICJzdWJzY3JpcHRpb25fZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBjb25zdCBzZXJ2aWNlQ3JlYXRpb25GZWUgPSBnZXRTdWJzY3JpcHRpb25GZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLnNlcnZpY2VDcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgwMAogICAgLy8gbGV0IHJlcXVpcmVkQW1vdW50OiB1aW50NjQgPSBzZXJ2aWNlQ3JlYXRpb25GZWUgKyBjb3N0cy5zZXJ2aWNlcwogICAgaW50YyAxMSAvLyAxMzc4OTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGJ5dGVjIDEyIC8vICJtIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDEKICAgIC8vIGlmICghdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gc2VydmljZXNsaXN0ID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFN1YnNjcmlwdGlvbnNCb3hQcmVmaXhTZXJ2aWNlc0xpc3QgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDEKICAgIC8vIGlmICghdGhpcy5zZXJ2aWNlc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzZXJ2aWNlQ29zdF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODAyCiAgICAvLyByZXF1aXJlZEFtb3VudCArPSBjb3N0cy5zZXJ2aWNlc2xpc3QKICAgIGludGMgNyAvLyAxODkwMAogICAgKwoKc2VydmljZUNvc3RfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDYKICAgIC8vIHJldHVybiByZXF1aXJlZEFtb3VudCArIHJlZmVycmFsRmVlVG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIDApCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MDYKICAgIC8vIHJldHVybiByZXF1aXJlZEFtb3VudCArIHJlZmVycmFsRmVlVG8odGhpcy5ha2l0YURBTy52YWx1ZSwgcmVmZXJyZXIsIDApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiByZWZlcnJhbEZlZVRvCiAgICArCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjpTdWJzY3JpcHRpb25zLnN1YnNjcmlwdGlvbk1icihyZWNpcGllbnQ6IGJ5dGVzLCBzZXJ2aWNlSUQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnN1YnNjcmlwdGlvbk1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyBwcml2YXRlIHN1YnNjcmlwdGlvbk1icihyZWNpcGllbnQ6IEFjY291bnQsIHNlcnZpY2VJRDogU2VydmljZUlEKTogW3VpbnQ2NCwgdWludDY0XSB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBsZXQgbWJyQW1vdW50ID0gY29zdHMuc3Vic2NyaXB0aW9ucwogICAgaW50YyA1IC8vIDYwNTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgxMwogICAgLy8gbGV0IGdhdGVJRDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODE1CiAgICAvLyBpZiAoc2VydmljZUlEICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHN1YnNjcmlwdGlvbk1icl9hZnRlcl9pZl9lbHNlQDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTYKICAgIC8vIGNvbnN0IGJveEtleTogU2VydmljZXNLZXkgPSB7IGFkZHJlc3M6IHJlY2lwaWVudCwgaWQ6IHNlcnZpY2VJRCB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gc2VydmljZXMgPSBCb3hNYXA8U2VydmljZXNLZXksIFNlcnZpY2U+KHsga2V5UHJlZml4OiBTdWJzY3JpcHRpb25zQm94UHJlZml4U2VydmljZXMgfSkKICAgIGJ5dGVjXzIgLy8gIm8iCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnNlcnZpY2VzKGJveEtleSkuZXhpc3RzLCBlcnJTZXJ2aWNlRG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyU2RuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTZG5lCgpzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyMC04MjEKICAgIC8vIGNvbnN0IHNlcnZpY2UgPSBjbG9uZSh0aGlzLnNlcnZpY2VzKGJveEtleSkudmFsdWUpCiAgICAvLyBnYXRlSUQgPSBzZXJ2aWNlLmdhdGVJRAogICAgZHVwCiAgICBwdXNoaW50IDMzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODIxCiAgICAvLyBnYXRlSUQgPSBzZXJ2aWNlLmdhdGVJRAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIGlmIChzZXJ2aWNlLnBhc3NlcyA+IDApIHsKICAgIHB1c2hpbnQgMjUKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgYnogc3Vic2NyaXB0aW9uTWJyX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3N1YnNjcmlwdGlvbnMvY29udHJhY3QuYWxnby50czo4MjQKICAgIC8vIG1ickFtb3VudCArPSBjb3N0cy5wYXNzZXMKICAgIGludGMgMTAgLy8gMTQ0MjAwCiAgICBmcmFtZV9idXJ5IDAKCnN1YnNjcmlwdGlvbk1icl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBieXRlYyAxNCAvLyAibCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI4CiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gc3Vic2NyaXB0aW9uc2xpc3QgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogU3Vic2NyaXB0aW9uc0JveFByZWZpeFN1YnNjcmlwdGlvbnNMaXN0IH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9zdWJzY3JpcHRpb25zL2NvbnRyYWN0LmFsZ28udHM6ODI4CiAgICAvLyBpZiAoIXRoaXMuc3Vic2NyaXB0aW9uc2xpc3QoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBzdWJzY3JpcHRpb25NYnJfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgyOQogICAgLy8gbWJyQW1vdW50ICs9IGNvc3RzLnN1YnNjcmlwdGlvbnNsaXN0CiAgICBmcmFtZV9kaWcgMAogICAgaW50YyA3IC8vIDE4OTAwCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnN1YnNjcmlwdGlvbk1icl9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvc3Vic2NyaXB0aW9ucy9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gcmV0dXJuIFttYnJBbW91bnQsIGdhdGVJRF0KICAgIGZyYW1lX2RpZyAwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAMAAEIAqCNBtTYA9SQAtSTAdTeAbjvBMjmCNSUVCYxCWFraXRhX2RhbwQVH3x1AW8AAXMMYWtpdGFfZXNjcm93C0VSUjplcnJTZG5lC0VSUjplcnJVZG5lA2FhbAEAAWICAAABbQEoAWwGd2FsbGV0ARQBcBJwYXNzZXNfcmVwcmljZWRfYXQBaQtFUlI6ZXJyRmd0ZQtFUlI6ZXJySXNlcQtFUlI6ZXJyTmNscwtFUlI6ZXJyTnJreQhyZWZlcnJlcgtFUlI6ZXJyQXNhbQtFUlI6ZXJySXBheQtFUlI6ZXJyTmRhbxFzdWJzY3JpcHRpb25fZmVlcwtFUlI6ZXJyTm9wdATIg1EwBDlOrrIFYXBwSUQLRVJSOmVycklwbXILRVJSOmVycklwbWELRVJSOmVycklwbXMSY29udHJvbGxlZF9hZGRyZXNzC0VSUjplcnJJd2x0AgABB3ZlcnNpb24LRVJSOmVyclR0bGcLRVJSOmVyclNuYWMLRVJSOmVyclNzaGQLRVJSOmVyckJsa2QDcGFsC0VSUjplcnJJeGZyC0VSUjplcnJNYW10C0VSUjplcnJNaW52C0VSUjplcnJOc3ZjgATqkYDdNhoAjgEBlTEZFEQxGEEBfoIEBEaOvmMEmw+J1gQ2bVsnBJugILYnHoIpBBfIcwsETN8M1wSH4FXGBLWcilQEruuzeARykcCOBFNV2m0EoEfH9wQQ8Aw6BHckWoQEpo5pYwRMsVXuBLEKMG4E8jVbVQQaxKdYBOOuslwE6qqk0wQXZTh9BCgbiRsEw9nx3ARZTrodBMD/JzAEJ1IDrwQZpUj6BBJp2H4EQwNmjgQNakejBCIHB44EHceDcQSxusLLBAmjFY4EmS+YkgT5mWPUBNSxbnoEdN71mgQluBKnBJac7ZsEM9jlrQRgPXKXBN/mAs8E2KbFIycfggQEM/eICASuhMvYBDPpLJQEhU3t4DYaAI4zBtUHXQfUCKIJHglbCYwJyAn4ClgKogsEC1wLrQv0DGcM0A0yDYoOEQ5+DwIQMhB/EMoQ2hFpEa0SkBK2E/EUGRRSFHQUiBTmFR0AAxVCFWwWNRcRFzEYyxjoGQsZLhrnGxEbkwABACNDgAwVH3x1AAAAAAAAPVSwI0OABFrZ9MY2GgCOAQZxADEZgQQSMRgQREIbGooCAYv+VwIAi/4iWYv/JQtLAkxZSwIVi/8jCEklC0sFTFlPBE8CCU1SiYoCASKL/kEABYv/QAADIkyJi/5yB0yMAEEAEYv/FicgTFADiwASQQADI0yJIkL/+ooDAYv+i/2I/8ZAAAIiiYv+cghISYv/EkEAB3MCSDIDEomL/3MCSBKJigECi/9XCCCL/1cACIv/V0ggTgJQTFCL/4mKAQCL/zgJMgMSQAAEJxawAIv/OCAyAxJAAAQnF7AAiYoDAIv9iP/Yi/04B4v+EkAABCchsACL/TgIi/8SQAAEJyKwAImKAwCL/ov/E0EAC4v9AYABJExQi/6/iYoDAYv9AYABJExQSb5AAAqL/xaL/kxQjACJTLxIi/8hCAhLAXMARQFAAAdJMgEPQQAQI0EABUxMFlCJRQGL/kL/9SJC/+2KAgCL/jgAi/8SQAAEJyOwAIv+OBMyAxJAAA+AC0VSUjplcnJOY2x3sACL/jgVMgMSQAAEJxawAIv+OCAyAxJAAAQnF7AAiYoCAYv+QAADi/+Ji/4nJGVBADRJFYEgEkEALCNAAAQnJbAAi/5yCERLARNBABhJMQATQQARSXMCRIv+cghEE0EABIv/TImJIkL/0YoBATIDi/9AAAGJSIv/JxhlSImKAgEii/6AA29hbGVIgRhbi/4nCGVIgVhbTLGyGIAEPBpvM7Iai/+yGoEGshAisgGztD5JVwQASwFXAAQpEkRJIlklCEwVEkRXBgBJFSQTQQAFSCKMAIkXSUEABYsBQAAIIiJOAk1C/+tJcgdMjABBABKLARYnIExQA4sAEkEABCNC/94iQv/aigQBi/w4GIv9JwhlSIEoWxJBADmL/DgZQAAyi/w4G4EEEkEAKIv8ORoAgARDkiZVEkEAGYv8ORoBi/4SQQAOi/w5GgKL/xYSQQACI4kiiYoDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiYoCASKL/icIZUiBWFsxADINMg5OA4v/QAAbSEUBMgNJIhZPA0lOAlBPA1BMUExQJwlQjACJi/9PA4j9BkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAEEAGIsAFYEgEkEAD4sASwESQQAHSYsBE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nJGVBAAhJFYEgEkAABCclsABJSwISQQBII0yL/ycYZUEANkkVgSASQQAuTgNLAksBTwNJTgNNTEEAF0yL/xZPAlBMUExQTFAnCSJPA1RQQv8uRQEyA0L/40gyA04DQv/Mi/9yCExOAkAAB0UBIkxC/6lJSwISQQALTHMCSDIDEkxC/5dJcwJITwISTEL/jIoCAYv+JwhlSIFYW4v/TIj770AAAzIDiYv/JxhlQQAJSRWBIBJBAAGJSDIDQv/oigQCi/w4GIv9JwhlSIEoWxJBADuL/DgZQAA0i/w4G4EEEkEAKov8ORoAgASbFH0sEkEAG4v8ORoBi/4SQQAQi/w5GgKL/xYSQQAEI4v+iSJC//mKAwErSYv+MgMSQQAEIowAiYv9JwhlSCRbjAEhCYwAi/9BABWLAXIIRIv/cABFAUAAByEJMhAIjACJigUBK4v+QQFui/wyAxNBAWaL+4ALd2FsbGV0X2ZlZXNlSCRbSSEEDkSL/h0hBJdJjABAAAiL/kEAAyOMADIHSYGAmp4BCEyLABaL/ExQJyZMUElOA4v7JwhlSCRbTCJZgdTFAQuB5KkDCIv9QABisUxJcghESwKLAAiyCLIHI7IQIrIBtk8CFk8DFk8CshiABNysCTWyGkyyGrIaTLIai/+yGoEGshAisgGztD5JVwQATFcABCkSREkVJBJEF0xMFkwWUFcICIv+iwAJFkxQTIlLAXIIRIv9cABFAUEAaUlPAklyCESxSwFyCERPBLIIsgcjshAisgG2i/2yEYsAshKyFIEEshAisgG2TwIWTwMWTwKyGIAEo6FsqrIaTLIashpMshqL/7IagQayECKyAbO0PklXBABMVwAEKRJESRUkEkQXTEL/d0kyEAixSwJJcghEMhCyCLIHI7IQIrIBtov9FkyyGCcfshqyGoEGshAisgGzQv9pi/4WIhZQTIk2GgFJIlklCEsBFRJEVwIANhoCSRUkEkQXNhoDSRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJydPA2coTwJnJwVMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEFzYaBkkVgSASRDYaB0kiWSUISwEVEkRXAgA2GghJFYEkEkQ2GglJFSMSRDYaCkkVgQMSRDYaC0kVJBJEFyIoZURMiPvGV2ggiBwZFilMULAjQzEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFYEgEkQ2GgdJIlklCEsBFRJEVwIANhoISRWBJBJENhoJSRUjEkQ2GgpJFYEDEkSIF+iIG6IWKUxQsCNDKzYaAUkVJBJEFzYaAkkVJBJEF0w2GgNJIlklCEsBFRJEVwIATDEATBZQKkxQSb1FAUAABCcGsABLARVLAwiBzxgOQAAPgAtFUlI6ZXJyQmRsbrAARwKBSyW6F0oluhclCLpXAgBJTgMVSUUGSwQPQAAPgAtFUlI6ZXJyQm9mc7AASwNLBQxBACAiSwVJTgIPIksCTwJNSwVJSwMPTE8DTwJNTwROAlJOAk4CUEsBvkRLARUWVwYCTwJQSwGBS1lPAiJPAlhMUEsBvEi/I0M2GgFJFSQSRBc2GgJJTgJJIlklCEsBFUlOBBJEVwIATDEATBZQKkxQSb1FAUAABCcGsABMFYGAAQ5AAAQnKLAASb5ESYFJWUsBIksCWE8FUEsCgUtZSwMVTwRLAk8CUk8CTFBLAU8DCU8CTwQITAkWVwYCXEtLAbxIvyNDJwwxAFC+RBcjCTEATBZQKkxQSb1FAUAABCcGsABJIiO6gAEKEkAAD4ALRVJSOmVyclNuZHKwACInELsjQzYaAUkVJBJEFzEATBZQKkxQSb1FAUAABCcGsABJIiO6JxASQAAEJymwACKAAR67I0M2GgFJFSQSRBcxAEwWUCpMUEm9RQFAAAQnBrAASSIjuoABHhJAAA+AC0VSUjplcnJTbnBhsAAiJxC7I0M2GgFJFSQSRBcxAEwWUCpMUEm9RQFAAAQnBrAASSIjuicNE0AABCcqsAAiJw27I0MxFiMJSTgQIxJENhoBSRWBIBJEMQBMiBGzJwpMUEm9RQFBAA+AC0VSUjplcnJVYWJssAAyCk8CSTgASTEAEiEIIk8CTYHUeghPAk8DTwKI9qJMSSK5SDEATE4CiPa6I0M2GgFJFYEgEkQxAEyIEV0nCkxQSb1FAUAAD4ALRVJSOmVyclVuYmywAEm8SDEAgdR6iPabSVcAIEyBIFuxsgiyByOyECKyAbMjQzEWJQlJOBAjEkQxFiMJSTgQgQYSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEF08FOBZPBiJJI08ETwlPCU8JTwlPCSKIFMIWKUxQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBhJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXTwQ4Fk8FIkkjTwRPCE8ITwhPCCIjiBRqFilMULAjQzEWIwlJOBAjEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBdPBSJHA08JTwlPCU8JTwkiiBQZFilMULAjQzEWIwlJOBAjEkQ2GgFJFYEgEkQ2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBdPBCJHA08ITwhPCE8IIiOIE9IWKUxQsCNDMRaBAwlJOBAjEkQxFiUJSTgQgQQSRDEWIwlJOBCBBhJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXTwY4Fk8GOBZPByNPAyNPBE8JTwlPCU8JTwkiiBNfFilMULAjQzEWgQMJSTgQIxJEMRYlCUk4EIEEEkQxFiMJSTgQgQYSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEF08FOBZPBTgWTwYjTwMjTwRPCE8ITwhPCCIjiBL2FilMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEF08FOBZPBiNPAiJJTwlPCU8JTwlPCSKIEpQWKUxQsCNDMRYlCUk4ECMSRDEWIwlJOBCBBBJENhoBSRWBIBJENhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXTwQ4Fk8FI08CIklPCE8ITwhPCCIjiBI8FilMULAjQzEWIwlJOBAjEkQ2GgFJFSQSRBcxAEwWUElXACBMVyAIUCcETFBJvUUBQAAEJwewAEm+RIFAW0EABCcZsAAxAEsCOAASQAAEJyOwAEsBOAkyAxJAAAQnFrAASwE4IDIDEkAABCcXsABLATgHMgoSQAAEJxqwAEm+RIFgW08COAgIFoFgTLsjQzEWIwlJOBCBBBJENhoBSRUkEkQXMQBMFlAnBExQSb1FAUAABCcHsABJvkSBQFtLAjgREkAABCcZsAAxAEsCSU8CiPMYOBQyChJAAA+AC0VSUjplcnJJYXJlsABJvkSBYFtPAjgSCBaBYEy7I0M2GgFJFSQSRBc2GgJJFSQSRBdMMQBMFlAnBExQSb1FAUAABCcHsABJvkxJTwJEgWBbSwMPQAAPgAtFUlI6ZXJyTmVmbrAAgUBbSUEAI7ExAEsDshKyFLIRgQSyECKyAbNJvkSBYFtPAgkWgWBMuyNDSLExAEsCsgiyByOyECKyAbNC/9wrRwQ2GgFJFSQSRBcxAEwWUEknBExQSb1FAUAABCcHsABJvkxJTgJOBESIDMMhBU4DgSBbSUUGQQBCSwNXACBLBRZQKkxQgRkkuhdBAC5PAkgnEUsCULxISwKBKFtFCCInEmVFAUEAwSInEmVESwgNQQC2gdTIGSEFCE4CJxNPAlC8QQAFTCEGCExJMQBPA4jxk0lXACBOA4EgW0xLAoFAW0lFCUEAMk8CgWBbSUUHQQAVsTEASwayEksHshGyFIEEshAisgGzsUyyCEyyByOyECKyAbO8SCNDSwMxABJBABxPA0ixMQBPA4FgW08DCLIIsgcjshAisgGzQv/YTwKBYFtJRQZBABCxMQBLBbIIsgcjshAisgGzsUyyCEyyByOyECKyAbNC/6yB9I0FQv9HMRYjCUk4EIEGEkQ2GgFJFYEoEkQ2GgJJFSQSRBdMiBB9IihlRE8DiPK6iBCxSE4DIihlRE8DTE8CTwOI9BZIQAAEJxSwACOIEXdII0MxFiMJSTgQgQYSRDYaAUkVgSgSRIgQOklOAk4DTCIoZURMVwAgTEsBiPFoTIjxBiIoZURPA0xPAk8DiPHeQAAEJxSwACOIESxII0M2GgFJFYEoEkQiiBEcSCNDMRYjCUk4ECMSRDYaAUcCFYEoEkQnBExQSb1FAUAABCcHsAC+RIFIW0AAD4ALRVJSOmVyck5ndGSwACcTSwFQSU4DvUUBQQAPgAtFUlI6ZXJyUGV4c7AAIihlRExXACBJTgOI8NNJQAAPgAtFUlI6ZXJyTmx3bLAAMgpPAkwhBojvj0lPAojwUkwWTFC/I0M2GgFJFYEoEkQnBExQSb1FAUAABCcHsABJvkRJgShbSwGBOFtMSwGICiNPAoFQW0xPAogKQQxBAAkiFksBgVhPArsjQys2GgFJFSQSRBc2GgJJTgJJIllJTgOBIAslCEwVEkQxAEwWSU4EUCcETFBJvUUBQAAEJwewAL5ESYEgW0lPAlcAIE4CQAAPgAtFUlI6ZXJyTm9kbrAAFksBTFAqTFBJvUUBQAAEJwawAEkiI7pMgRkkuhdFBicNE0AABCcqsABLBEEAW0sESwIPQQBTI0AAD4ALRVJSOmVyclBjb2awACJJSwMMQQAmSwNXAgBLAYEgC4EgWEsCTIgJXScKTFC9RQFBAAQnK7AAIwhC/9NGAzEASwJQJxFMUEm8SEy/I0MiQv+qNhoBRwIVgSgSRCcETFC9RQFBAAQnB7AAJxFMULxAAAQnB7AAI0MiK0cCNhoBRwIiWUlOAyULTEkVTgJXAgAiSUsGDEEAMkklC0sCSU8CWUlPBUlOBBJESwEVUkkVSwGBIFlJgSISRExSIlkkC4EkCAhOAiMIQv/HRgIlCBJEJwsiSUsEDEEA0iJOAksDSwGI7QxJgSBZSwEVUiJZSwMNQQCwSwNJSwJJTgOI7PFXACBMTwKI7OhJgSBZSwEVUlcCAEsEJAskWFCIC6JIJwkiTwJURQlMSSJZSU4ESSMISRZXBgBPA0xcAE4ETIEHCCQKSUULTIEHCCQKSUUKDEEADEsHSwkJr08DTFBOAiJOAk8EgRAISU4EIwhFCEsDSwgMQQAfSwpPA0lOAlNPBU8FSU4DTwJUTgQjCE4DIwhOAkL/2U8CSE8CSEwjCExPAkxC/zlPAkgjCEL/J0gpTFCwI0M2GgFJFYEgEkQ2GgJJFYEgEkSIB74nCkxQvUUBJwkiTwJUKUxQsCNDNhoBSRWBIBJENhoCSRUkEkQXFlAqTFBJvUUBQQAXSSIjuicNEkEADSMnCSJPAlQpTFCwI0MiQv/wNhoBFSQSRDYaAkkVJBJEFyIoZURMiO/tiBC3FilMULAjQzYaARUkEkSICzSIEKMWKUxQsCNDNhoBSRWBIBJENhoCSRUkEkQXTDYaA0kVJBJEFzYaBEkVJBJEF0lOA04CiBCZSSJbTgIkW04EQQAhSwNBABwjIQYLCCIoZURJTwOI74JPA4jv/wgWKUxQsCNDIkL/4TYaAUkVgSASRDYaAkkVJBJEFzYaA0kVJBJEF08CTIgQRyJbIihlRIgKok8DiO/ECBYpTFCwI0M2GgFJFYEoEkQ2GgJJFSQSRBciKGVETIjt34gL1kYCKUxQsCNDNhoBSRWBIBJENhoCSRUkEkQXFlAqTFBJvUUBQAAEJwawAL5EKUxQsCNDIis2GgFJFYEgEkQ2GgJJFSQSRBdJNhoDSRUkEkQXTCcLSwNLAwhLAg1BAJdLARZLBUxQKkxQSUUIvUUBQQCESwa+RIACAAJMUE4CSSJZSSMIFlcGAE4DTFcCAEwlC0wiRQlLCEsCDEEAGklLCUlOAlklCBZXBgBPBUxQTgQlCEUJQv/eSRVOAyJFCksJJQxBABxLBUsKSU4CWUsFCBZXBgBPBkxQTgUlCEUKQv/dTE8DUk8CTFBPAlcCAFBMIwhMQv9eKUxQsCNDNhoBSRWBKBJEJwRMUEm9RQFAAHJIgGkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApTFCwI0O+RElXACBLAVcgCEsCVygISwNXMAhLBFc4CEsFV0AISwZXSAhLB1dQCEsIV1gITwlXYAiAAYBPClBPCVBPCFBPB1BPBlBPBVBPBFBPA1BPAlBMUEL/pDYaAUkVgSgSRCcETFBJvUUBQAAEJwewAL5EKUxQsCNDIkcCNhoBRwIVgSgSRCcETFBJvUUBQAAEJwewAL5MSU4CTgNEJwlOA0lXACBOAitOBStOBYEkr04EgAMwMDBOA4EgW0lOAkAAz0sGTgNLAkULJwtFDCcRTFBJRQ29RQFBABpLC0m+RFcCAEwiJboXFlcGACcLTFwATFBFC08ESVcoCEsBVzAISwJXOAhLA1dACEsEV0gISwVXUAhLBldYCE8HV2AITwlPCFBPB1BPBlBPBVBPBFBPBBZQTwdQSwlQTwhJFRZXBgJMUEyAAgC3UEsBFYG3AQhPCUkVFlcGAkxQSwEWVwYCTwNMUEsBFU8DCExPCVBPB1BPB1BPBlBPBVBPBFBMFlcGAlBPAlBMUEsCUClMULAjQ08DSE8ESE8ESE8ESE8ESEsBFksDTFAqTFBJvUUBQAAEJwawAEkiI7pOBUmDAikguklOAkUISYF1JboXJQhLAYF1TwK6VwIATgdJgUsluhdKJboXJQhLAk4CulcCAE4HSYMCTSS6TgZJgXEjuk4FgwJyA7pOBTIDEkH+vksCRQtC/rc2GgFJFYEgEkQnDkxQvUUBFCcJIk8CVClMULAjQzYaAUkVgSASRCcMTFBJvUUBQQAKvkQXFilMULAjQ0giQv/0NhoBSRWBIBJEJw5MUEm9RQFBAAq+RBcWKUxQsCNDSCJC//QxFiMJRwI4ECMSRDYaAUkVJBJEF0lOAyInBWVMSU4CTgVEIihlREwlW3IIRE8CiOmKTDgHMgoSQAAEJyGwAEw4CDIQI0sDCAsSQAAEJyKwALEyCksDshEishKyFIEEshAisgGzQQFQRwIiWUsBFVJXAgArE0EBQCIoZURJJw9lSExJJyxlSElXCAhOAiRbTgMiJwVlTElOAkUHREkiWUsBFVJJTgJXAgBMJw9lSEyxIxZOAkkVFlcGAkxQgAQAAQACTFBMshiABDqyiVuyGrIagQayECKyAbO0PklXBABLAVcABCkSREkiWYEpCyUITBUSRFcGKSJbSUAAD4ALRVJSOmVyck5lc2OwAEsGJVtJTwISQAAPgAtFUlI6ZXJyV2VzY7AAsU8ESbIYgARa3zOPshpPBLIaTwKyGk8CshqACgABAAAAAAAAAACyGicLshqBBrIQIrIBIihlRE8CSU4CcghESwZJTgSI6FAyEAu2THIIRLIHsggjshAisgG2SwEWTBYnJkxQTwOyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVEIicFZUQlW3IIRE8CiOfmMhAjTwIICxYpTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEJw9lSHIIRBJAAAQnG7AAJwVMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcPZUhyCEQSQAAEJxuwACIoZUQnLGVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJydMZyNDNhoBSRUkEkQXMQAiKGVEJw9lSHIIRBJAAAQnG7AAKExnI0OKAgEyB0mL/gmL/xgJiYoCAYv+UQAQSRWBEBJEi/9RABBJFYEQEkRQiYoCAYv+i/8PQQAGi/6L/wmJIokiJxJlRQFAAAUnEjIHZ4mKAQErIihlRCccZUhJIk4CJFtJTgJBABuLAkkhBA5Ei/8dIQSXSYwBQAAIi/9BAAMljAEijACBEFtJjAJBABuLAkkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjACLAUmLAElOAwiL/0wJTBZPAhZQTBZQjACJigoBIkkrSYj/dIv5MQCI/z8nCkxQvUUBQQAEJyuwACKL90ECYIv4OBCBBBJEi/g4ESEFjAOL/EAB3Yv5jAAnDjEAUL2MAkgnDjEAUEm9RQFBAb5JvkQXTgJLAkkjCBZPAky/MQBMFlCMAYsCQAAHiwMhBwiMA4v+QQGQSwJBAYsjTgNLA0EAB4sDIQYIjAOL+oj++UlOBUkiW0wkWwgiKGVEIicFZUQlW3IIREyL/UsETwRPBIjn50kiW04EJFuLAwiL9jgASU4GMQASIQgiTwJNCE4Di/dBANWL+DgQgQQSRCInBWVEJVtyCESL+DgRcABFAUAABCcdsACxIicFZUQlW3IIRE8FshJLAbIRshSBBLIQIrIBs4v2MgpPBYjjVov4MQCI49GL+DgUMgoSQAAEJy2wAIv4OBJJi/oPQAAEJy2wALFPBoEQW7ISSwGyEYsAshSBBLIQIrIBs4v6CTIHSYv8Fov5TFBPAhZQi/oWUIv7FlBPAxZQTwQWUEwWUCMWUEwWUCcEiwFQSU8Cv08DQQANi/4Wi/9QJxOLAVBMvzEATE8DTwKI4vCMAImL9ojio4v2OAcyChJAAAQnGrAAi/Y4CElOCYv6TwUISU4CD0AABCcasACxIicFZUQlW3IIRE8FsgiyByOyECKyAbOxTwaBEFuyCIsAsgcjshAisgGzTwZMCUL/VSJOA0L+ciNOAkL+QkUBi/wWi/lMUCpMUEm9RQFAAAQnBrAASSIjuicQEkAABCcpsABJgQkkuhdLAhJAAAQnGbAARwKBESS6F4z6SSMkuheM+0mBISS6F04DgwIpILpJjAAyAxNAAASL+YwAgRkkuhdB/cAhCowDQv25IkL9qIoBAiJJKycEi/9QSb1FAUAACCKL/4wBjACJvkRJVwAgSU4CjAFJgSBbjAJJgVBbTgJJgShbTgJJgThbTgJJgWBbTgKBMFtMi/9XACCI/HgnCkxQvUUBQQAIIov/jAGMAImLAkEAJosCFosBTFAqTFBJjAC9RQFBAAuLACIjuicNEkEACCKL/4wBjACJTwNPA4j8Jk8DDkEACCKL/4wBjACJDEEACCKL/4wBjACJI4v/jAGMAIkiKGVEMQCI4leI4kGJigsBK4v7gQQPQAAEJy6wAIv8gTwPQAAEJy+wAIv4QQAJi/1AAAQnMLAAi/1AAK0ijACL/0EATiIoZUQxAIjiE4v4QQAji/k4EIEGEkQiKGVESwExAIjhnYv5TgKLAIjiekAABCcUsACI4dUyA4v1i/aL94v6i/uL/Iv9TwgiTwmI/DJMiSIoZUSL/ojiyYv4QQAji/k4EIEGEkQiKGVETIjgT04Ci/lOAosAiOQZSEAABCcUsABJV2ggSwEiW08CVwggi/WL9ov3i/qL+4v8i/1PCU8JTwmI+9tMiYv9Fov6TFAqTFBJvUUBQAAEJwawAIEhJLoXjACL+ED/NYsAQf8wgAtFUlI6ZXJySGd0ZbAAigECJwSL/1BJvUUBQAAEJwewAL5ESYEgW0lPAlcAIExAAAQnMLAATBZQKkxQSb1FAUAABCcGsACBISS6F4v/iYoCAysnE4v+UEm9RQFBALq+RIv/IltJjABBABlJIluLABJBABCL/4jfd4z/i/6L/08ETwSJSSJbTCIoZUSL/lcAIElOA04ETFcIIElOAk4EJwhlSIFYW04CEkEAMUhFAUwiKGVEi/5XACBMJwhlSIFYW08DSU4CSwOI3vwiTgJNFk8CTFBMUIv+i/9PA4lLAUsEiN7jQAAGRQFMQv/DSXIISElLAxJBABBzAkgyAxJPA08DTwJNQv+oTwJJcwJITwISTwNOAk1C/5dIIihlRIv+VwAgTEsBiOAoSU8CiN/EQv9+igIBi/6I/QKM/kAAD4ALRVJSOmVyckN0cmewACcEi/5QSb5ESVcAIExJgSBbTEmBMFtMSYFAW0yBSFtBAAmL/0AABCcVsABLAkABAU8CSE8CSwKI+bhLAkEAsbEiJwVlRCVbcghESwEiW7ISTwNJTgOyEbIUgQSyECKyAbOxMQBLASRbshJLArIRshSBBLIQIrIBs7GBEFuyErIRshSBBLIQIrIBs0sBvkRJgShbSwGBOFtMSwGI+QpJTgVMiPksTIFQW0lPAgxBAClITwJIIxZLAoFYTwK7TEm+RIFgW08CCRZLAYFgTwK7MgcWgVBMu4v+iU8DDEH/3ksBSb5EgVhbIwgWgVhMu0L/zE8CSLEiJwVlRCVbcghESwEiW7IIsgcjshAisgGzsTEASwEkW7IIsgcjshAisgGzsYEQW7IIsgcjshAisgGzQv9ZTwIWSwNMUCpMUEm9RQFAAAZITwJC/u2DAikgukkyAxNAAAZITwJC/ttPA0hC/tWKDAErSScMMQBQvUUBJwwxAFBJvUUBQQGYSb5EF0cCIwgWTwNMvzEATBZQTIv3gQQPQAAEJy6wAIv1gTwPQAAEJy+wAIv4gQUOQAAPgAtFUlI6ZXJyTXhwc7AAi/sVSU4CgYABDkAABCcosAAiKGVEJxxlSCJbSU4CIQsITIsCQAAFTCEHCEyL9kEAJjIKi/ZwAEUBQAAEJx2wACInBWVEJVtyCESL9nAARQFAAAQnHbAAIihlRCInBWVEJVtyCERMi/8iTwZPBIjg2UkiW0wkWzIKTwRPAgiL9E4CiNydsSInBWVEJVtyCESyB7III7IQIrIBs4v1FoABCkxQi/YWUIv3FlCL+BZQi/kWUIv6UE8CFlcGAov7UEyAAgB1UEsBFYF1CBZXBgJQi/xQi/1Qi/5QTFAnC1AqTwNQSbxITL8ijAAxFiMIjAGLATIEDEEAP4sBOBCBBhNAAEyLATgYMggSQAAEJxWwAIsBOBlBAAQnFbAAiwE4ADEAEkAABCcVsACLATkaACceEkEAGiOMAIsAQAAPgAtFUlI6ZXJyU25hdrAAjACJiwEjCIwBQv+ZI0L+aIoBASIoZUQnHGVIIlshCwgnDDEAUL1FAUAAAyEHCCIoZUSL/yKI340IiYoCASEFIov/QQApSIv/Fov+TFAqTFBJvUUBQAAEJwawAEmBISS6F0yBGSS6F0EABCEKjAAnDjEAUL1FAUAAB4sAIQcIjACLABZMFlBMiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
function ServiceFromTuple(abiTuple) {
  return getABIStructFromABITuple(abiTuple, APP_SPEC.structs.Service, APP_SPEC.structs);
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
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? getArc56ReturnValue(returnValue, this.appClient.getABIMethod(method), APP_SPEC.structs) : void 0;
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
var SUBSCRIPTION_PRINCIPAL_MBR = 34900n;

// src/subscriptions/errors.ts
var SUBSCRIPTIONS_ERROR_MESSAGES = withErrorCodeAliases({
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
  // --- Blocking -----------------------------------------------------------
  UABL: "User is already blocked",
  UNBL: "User is not blocked",
  // --- Group / call-order -------------------------------------------------
  GIOB: "Group index out of bounds",
  ISEQ: "Invalid sequence of calls in group",
  // --- Subscriptions plugin -----------------------------------------------
  DNIT: "Description has not been initialized"
});
var translateSubscriptionsError = makeErrorTranslator(SUBSCRIPTIONS_ERROR_MESSAGES);

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
var SubscriptionsSDK = class extends BaseSDK {
  serviceMapKeyGenerator = ({ address, id }) => `${address}${id}`;
  services = new ValueMap(this.serviceMapKeyGenerator);
  constructor(params) {
    super({ factory: SubscriptionsFactory, ...params }, ENV_VAR_NAMES.SUBSCRIPTIONS_APP_ID);
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
    } catch {
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
      amount: microAlgo(SUBSCRIPTION_PRINCIPAL_MBR),
      receiver: this.client.appAddress.toString()
    });
    await this.client.send.adoptPrincipal({
      ...sendParams,
      args: { payment, key: { address, id: BigInt(id) } },
      populateAppCallResources: true,
      coverAppCallInnerTransactionFees: true,
      maxFee: microAlgo(1e4)
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
  async newService({ sender, signer, asset = 0n, passes = 0n, gateId = 0n, wallet = 0n, legacy = false, ...rest }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    assertDirectHint(wallet, legacy);
    validateHexColor(rest.highlightColor);
    const highlightColor = hexColorToBytes(rest.highlightColor);
    const isAsaService = asset !== 0n;
    const needsOptIn = isAsaService && !await this.isOptedInToAsset(asset);
    const paymentAmount = await this.newServiceCost({ ...sendParams, asset, wallet, legacy });
    const payment = this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: microAlgo(paymentAmount),
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
  SUBSCRIPTION_PRINCIPAL_MBR,
  SUBSCRIPTIONS_ERROR_MESSAGES,
  translateSubscriptionsError,
  directGateCtx,
  SubscriptionsSDK
};
//# sourceMappingURL=chunk-OT2QQFMU.mjs.map
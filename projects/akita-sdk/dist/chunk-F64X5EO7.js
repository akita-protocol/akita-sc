"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunk6CKI7TURjs = require('./chunk-6CKI7TUR.js');



var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkQOKFNKJCjs = require('./chunk-QOKFNKJC.js');


var _chunkF37KWYOWjs = require('./chunk-F37KWYOW.js');

// src/raffle/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/RaffleClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Raffle", "structs": { "EntryData": [{ "name": "account", "type": "address" }, { "name": "marketplace", "type": "address" }], "FindWinnerCursors": [{ "name": "index", "type": "uint64" }, { "name": "amountIndex", "type": "uint64" }], "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "RaffleState": [{ "name": "ticketAsset", "type": "uint64" }, { "name": "startTimestamp", "type": "uint64" }, { "name": "endTimestamp", "type": "uint64" }, { "name": "seller", "type": "address" }, { "name": "minTickets", "type": "uint64" }, { "name": "maxTickets", "type": "uint64" }, { "name": "entryCount", "type": "uint64" }, { "name": "ticketCount", "type": "uint64" }, { "name": "winningTicket", "type": "uint64" }, { "name": "winner", "type": "address" }, { "name": "prize", "type": "uint64" }, { "name": "prizeClaimed", "type": "bool" }, { "name": "gateId", "type": "uint64" }, { "name": "vrfFailureCount", "type": "uint64" }, { "name": "entryId", "type": "uint64" }, { "name": "refundMbrCursor", "type": "uint64" }, { "name": "minEntries", "type": "uint64" }, { "name": "failed", "type": "bool" }, { "name": "raffleRound", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "minEntries" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }, { "type": "address", "name": "sellerReferrer" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setMinEntries", "args": [{ "type": "uint64", "name": "minEntries" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.\nOnly before anyone has entered, and before the end. Below the minimum the raffle fails:\nthe prize returns to the seller and every entrant is refunded.", "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated entry (principal ABI, spec \xA76.8): the gate subject is the verified context of the\nentrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.\nEntries stay keyed by `Txn.sender`.", "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "enter", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnterAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "ASA twin of `gatedEnter` (principal ABI, spec \xA76.8).", "events": [], "recommendations": {} }, { "name": "gatedEnterAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "enterAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAdd", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated ticket top-up (principal ABI, spec \xA76.8).", "events": [], "recommendations": {} }, { "name": "gatedAdd", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "add", "args": [{ "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAddAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "ASA twin of `gatedAdd` (principal ABI, spec \xA76.8).", "events": [], "recommendations": {} }, { "name": "gatedAddAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "addAsa", "args": [{ "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Draw, commit-reveal (AR-01):\n- first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a\n  beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet\n- a later call (BEACON_LAG_ROUNDS after that round) draws the ticket\n- an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after\n  BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round", "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getState", "args": [], "returns": { "type": "(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)", "struct": "RaffleState" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 23, "bytes": 10 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "ticketAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2Fzc2V0", "desc": "The asset required to enter the raffle" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "The start round of the raffle as a unix timestamp" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "The end time of the raffle as a unix timestamp" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "minTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluX3RpY2tldHM=", "desc": "The minimum number of tickets to use for the raffle" }, "maxTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWF4X3RpY2tldHM=", "desc": "The maximum number of tickets users can enter the raffle with" }, "entryCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfY291bnQ=", "desc": "The number of entries for the raffle" }, "ticketCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2NvdW50", "desc": "The number of tickets entered into the raffle" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "the winning ticket" }, "winner": { "keyType": "AVMString", "valueType": "address", "key": "d2lubmVy", "desc": "the winning address of the raffle" }, "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the prize for the raffle if prizeBox is true prize represents the app id of the prize box, otherwise the asset being raffled" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "Indicator for whether the prize has been claimed" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate to use for the raffle" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "the address of the creation side marketplace" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfcm95YWx0eQ==", "desc": "the minimum impact tax for the raffle" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "entryID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfaWQ=", "desc": "The id's of the raffle entries" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "the transaction id of the create application call for salting our VRF call" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the future round committed to by the first post-end raffle() call, used for VRF (AR-01)" }, "minEntries": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluX2VudHJpZXM=", "desc": "AR-C: minimum number of entries for the raffle to be drawn (below it the raffle fails)" }, "failed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZmFpbGVk", "desc": "AR-07 / AR-C: the raffle did not reach minimum participation (or sold no tickets).\nThe prize returns to the seller and every entrant is refunded their tickets." }, "sellerReferrer": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVyX3JlZmVycmVy", "desc": "Referrer of the seller's verified wallet, resolved once by the factory at creation (zero if\nnone) and paid at settlement (spec \xA76.8). Plugins read its EXISTENCE as the marker of this\nchild's principal ABI; children created before it keep their own semantics until they settle." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "entries": { "keyType": "uint64", "valueType": "EntryData", "desc": "The entries for the raffle", "prefix": "ZQ==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "entriesByAddress": { "keyType": "address", "valueType": "uint64", "desc": "The address map of entries for the raffle", "prefix": "YQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2589, 4472, 4862, 4870, 7303, 7518], "errorMessage": "Box must have value" }, { "pc": [1402, 1562, 2153, 3770, 5761, 7888], "errorMessage": "Bytes has valid prefix" }, { "pc": [2437, 6926], "errorMessage": "ERR:errAent" }, { "pc": [2527], "errorMessage": "ERR:errArfc" }, { "pc": [6911, 7281, 7496], "errorMessage": "ERR:errBmgn" }, { "pc": [3821], "errorMessage": "ERR:errBnrd" }, { "pc": [7296, 7511], "errorMessage": "ERR:errEdne" }, { "pc": [5892], "errorMessage": "ERR:errFgte" }, { "pc": [5611], "errorMessage": "ERR:errForb" }, { "pc": [6315], "errorMessage": "ERR:errHnbd" }, { "pc": [6219], "errorMessage": "ERR:errHnwl" }, { "pc": [6238], "errorMessage": "ERR:errHtop" }, { "pc": [1904], "errorMessage": "ERR:errIast" }, { "pc": [1949], "errorMessage": "ERR:errIenr" }, { "pc": [2347, 2359, 6875, 6968, 7156, 7385, 7407], "errorMessage": "ERR:errIpay" }, { "pc": [5660], "errorMessage": "ERR:errIpma" }, { "pc": [5636], "errorMessage": "ERR:errIpmr" }, { "pc": [1229, 7343], "errorMessage": "ERR:errIpms" }, { "pc": [3977, 3989], "errorMessage": "ERR:errIrbd" }, { "pc": [3884], "errorMessage": "ERR:errIrsd" }, { "pc": [2001], "errorMessage": "ERR:errItbd" }, { "pc": [5521], "errorMessage": "ERR:errIupg" }, { "pc": [5925, 6337], "errorMessage": "ERR:errIwlt" }, { "pc": [7177, 7193, 7226, 7565, 7581, 7603], "errorMessage": "ERR:errIxfr" }, { "pc": [2307], "errorMessage": "ERR:errMalf" }, { "pc": [2329], "errorMessage": "ERR:errMamf" }, { "pc": [1866, 2285, 2905], "errorMessage": "ERR:errMbff" }, { "pc": [1268, 6940, 7357], "errorMessage": "ERR:errNcls" }, { "pc": [1254], "errorMessage": "ERR:errNclw" }, { "pc": [5445, 5489, 5564], "errorMessage": "ERR:errNdao" }, { "pc": [7925], "errorMessage": "ERR:errNesc" }, { "pc": [3703], "errorMessage": "ERR:errNetm" }, { "pc": [2452, 6817, 7126, 7253, 7468], "errorMessage": "ERR:errNliv" }, { "pc": [1282, 6954, 7371], "errorMessage": "ERR:errNrky" }, { "pc": [2426], "errorMessage": "ERR:errNslr" }, { "pc": [4230], "errorMessage": "ERR:errNwty" }, { "pc": [4546], "errorMessage": "ERR:errPacl" }, { "pc": [2033], "errorMessage": "ERR:errPita" }, { "pc": [2484, 2800, 2917], "errorMessage": "ERR:errPncl" }, { "pc": [2817, 2934], "errorMessage": "ERR:errRfnc" }, { "pc": [3559, 4207], "errorMessage": "ERR:errRhne" }, { "pc": [2957], "errorMessage": "ERR:errShwb" }, { "pc": [7137, 7479], "errorMessage": "ERR:errTaal" }, { "pc": [6828, 7264], "errorMessage": "ERR:errTana" }, { "pc": [3582], "errorMessage": "ERR:errWadr" }, { "pc": [3597, 4245], "errorMessage": "ERR:errWafd" }, { "pc": [7952], "errorMessage": "ERR:errWesc" }, { "pc": [2499, 4345, 4523], "errorMessage": "ERR:errWnfd" }, { "pc": [5949], "errorMessage": "account funded" }, { "pc": [1334, 1425, 1444, 1457, 1468, 1584, 4917, 5437, 5481, 5556, 5930, 5954, 7720, 8009, 8059, 8136], "errorMessage": "application exists" }, { "pc": [1886, 3041, 3074, 5050, 5123], "errorMessage": "asset exists" }, { "pc": [2079, 2103, 2108, 2407, 2430, 2444, 2477, 2489, 2503, 2508, 2538, 2542, 2602, 2781, 2793, 2804, 2809, 2823, 2834, 2856, 2865, 2910, 2921, 2926, 2939, 2961, 2970, 2983, 2997, 3014, 3024, 3037, 3071, 3551, 3564, 3587, 3602, 3610, 3618, 3622, 3630, 3642, 3652, 3681, 3709, 3715, 3727, 3798, 3826, 3951, 4199, 4212, 4235, 4250, 4277, 4286, 4296, 4337, 4349, 4445, 4454, 4513, 4528, 4551, 4559, 4573, 4580, 4591, 4602, 4610, 4632, 4650, 4658, 4690, 4698, 4720, 4757, 4765, 4783, 4804, 4856, 4888, 4896, 4903, 4908, 5029, 5047, 5059, 5069, 5091, 5120, 5133, 5143, 5167, 5223, 5228, 5233, 5238, 5243, 5248, 5252, 5256, 5261, 5266, 5271, 5276, 5281, 5286, 5291, 5296, 5301, 5306, 5311, 5430, 5474, 5493, 5549, 5704, 5802, 6038, 6111, 6538, 6573, 6606, 6613, 6636, 6640, 6682, 6691, 6720, 6744, 6763, 6768, 6821, 6848, 6858, 6904, 6998, 7079, 7097, 7106, 7130, 7185, 7203, 7212, 7257, 7274, 7395, 7431, 7450, 7472, 7489, 7573, 7591, 7627, 7646, 7674, 7685, 7714, 7781, 7813, 8004], "errorMessage": "check GlobalState exists" }, { "pc": [4615, 4663, 4703, 4770, 4788, 4809, 4953], "errorMessage": "errIpct" }, { "pc": [1301], "errorMessage": "errNcca" }, { "pc": [7089, 7442, 7638], "errorMessage": "index access is out of bounds" }, { "pc": [2623, 4432, 7074, 7329, 7417, 7426, 7544, 7613, 7622], "errorMessage": "index out of bounds" }, { "pc": [1313, 1809, 1849, 3773, 5419, 5457, 5764, 7891, 8043], "errorMessage": "invalid array length header" }, { "pc": [1644], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [5465], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [7901], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1686, 1760, 3107, 3160, 3192, 3240, 3305, 3349], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1814, 1854], "errorMessage": "invalid number of bytes for arc4.tuple<smart_contracts/utils/base-contracts/base.ts::EscrowConfig,arc4.static_array<arc4.uint8, 32>>" }, { "pc": [1635, 1654, 1664, 1674, 1705, 1716, 1725, 1735, 1746, 1768, 2272, 2399, 2471, 3115, 3248, 3384, 3478, 4191, 5542, 5587], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3780, 5771], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5424], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1697], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1407, 1567, 2158], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1785, 1828], "errorMessage": "invalid tail pointer at index 0 of (((len+utf8[]),uint64),uint8[32])" }, { "pc": [1805, 1845, 5411], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1780, 1800, 1823, 1840, 5406], "errorMessage": "invalid tuple encoding" }, { "pc": [3088, 3141, 3209, 3274, 3366, 3410, 3459, 3504], "errorMessage": "transaction type is appl" }, { "pc": [3231, 3296, 3340, 3470, 3515, 3538], "errorMessage": "transaction type is axfer" }, { "pc": [2264, 3098, 3151, 3183, 3220, 3285, 3329, 3376, 3420, 3442, 5579], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiA0MDk2IDEwMDAwMCA2MzY0MTM2MjIzODQ2NzkzMDA1IDE4NDQ2NzQ0MDczNzA5NTUxNjE1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSA0Mjk0OTY3Mjk1IDEzMTEzMzAwIDUwNjAwIDc5MTAwCiAgICBieXRlY2Jsb2NrICJ0aWNrZXRfYXNzZXQiICJha2l0YV9kYW8iICJlbnRyeV9jb3VudCIgInRpY2tldF9jb3VudCIgInByaXplIiAid2lubmVyIiAid2lubmluZ190aWNrZXQiIDB4MTUxZjdjNzUgImEiICJwcml6ZV9jbGFpbWVkIiAid2VpZ2h0c19ib3hfY291bnQiICJyZWZ1bmRfbWJyX2N1cnNvciIgInNlbGxlciIgIndfdG90YWxzIiAicmFmZmxlX3JvdW5kIiAiZ2F0ZV9pZCIgIkVSUjplcnJJcGF5IiAidyIgIm1pbl9lbnRyaWVzIiAiZW5kX3RpbWVzdGFtcCIgImNyZWF0b3Jfcm95YWx0eSIgIm1heF90aWNrZXRzIiAiRVJSOmVyckl4ZnIiICJmYWlsZWQiICJhYWwiICJha2l0YV9lc2Nyb3ciICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiICJFUlI6ZXJyTmxpdiIgMHgwMCAid2FsbGV0IiAidnJmX2ZhaWx1cmVfY291bnQiICJpc19wcml6ZV9ib3giICJtaW5fdGlja2V0cyIgImFraXRhX3JveWFsdHkiICJlIiAweDAwMDEgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJFUlI6ZXJyTWJmZiIgInN0YXJ0X3RpbWVzdGFtcCIgIm1hcmtldHBsYWNlIiAiZmluZF93aW5uZXJfY3Vyc29ycyIgIkVSUjplcnJQbmNsIiAiRVJSOmVyclduZmQiICJFUlI6ZXJyTmRhbyIgIkVSUjplcnJCbWduIiAiZW50cnlfaWQiIDB4MDY4MTAxICJFUlI6ZXJySXBtcyIgImZ1bmRlciIgInNlbGxlcl9yZWZlcnJlciIgInNhbHQiICJFUlI6ZXJyQWVudCIgIkVSUjplcnJSZm5jIiAiRVJSOmVyclJobmUiICJFUlI6ZXJyV2FmZCIgIm9hbCIgMHgwMDAwICJFUlI6ZXJySXJiZCIgInBhbCIgImNvbnRyb2xsZWRfYWRkcmVzcyIgIkVSUjplcnJJd2x0IiAiYXBwSUQiICJFUlI6ZXJyVGFuYSIgIkVSUjplcnJUYWFsIiAiRVJSOmVyckVkbmUiCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDYgLy8gIndpbm5pbmdfdGlja2V0IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDkgLy8gInByaXplX2NsYWltZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUlEIH0pCiAgICBieXRlYyA0NiAvLyAiZW50cnlfaWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEwIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTEgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbWluRW50cmllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5FbnRyaWVzIH0pCiAgICBieXRlYyAxOCAvLyAibWluX2VudHJpZXMiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGZhaWxlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZhaWxlZCB9KQogICAgYnl0ZWMgMjMgLy8gImZhaWxlZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTEwLTExNQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlc3MgMHgyNDg3YzMyYyAweGVhOTE4MGRkIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiLCBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANCBtYWluX3VwZGF0ZV9yb3V0ZUA1CgptYWluX3N3aXRjaF9jYXNlX25leHRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTAtMTE1CiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQmFzZVJhZmZsZSwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzNQogICAgcHVzaGJ5dGVzcyAweGJkNzE0OGQwIDB4NTlkNzA2MzAgMHhmMmNlMmY0NiAweDJjOTQyNTE0IDB4NDg4Mzk1M2MgMHg1YzU3ZjZkOCAweDk2MjcxMmYxIDB4M2E5YzJhYTQgMHgzOGU2MjQzMyAweDQzYTUzZTRlIDB4ZjNlMTVmY2IgMHhkYzUwYjM1NCAweDZhNmQ5YjlmIDB4ODkwM2MwM2YgMHg2M2JiYjczNSAweGViMTY4MWI0IDB4Njk2NTAxZGUgMHhiZDFiMjdkMSAweDY1ZmNhOThiIDB4OGZhNGExNjAgMHg0OGU1OWNkZCAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweGQ5YTM1ZmE0IDB4M2VhMTE4MzIgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAic2V0TWluRW50cmllcyh1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVmdW5kTUJSKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGVhcldlaWdodHNCb3hlcygpdWludDY0IiwgbWV0aG9kICJnYXRlZEVudGVyKGFwcGwscGF5LGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkRW50ZXIoYXBwbCxwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJlbnRlcihwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZEVudGVyQXNhKGFwcGwscGF5LGF4ZmVyLGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkRW50ZXJBc2EoYXBwbCxwYXksYXhmZXIsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJlbnRlckFzYShwYXksYXhmZXIsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZEFkZChhcHBsLHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRBZGQoYXBwbCxwYXkpdm9pZCIsIG1ldGhvZCAiYWRkKHBheSl2b2lkIiwgbWV0aG9kICJnYXRlZEFkZEFzYShhcHBsLGF4ZmVyLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJnYXRlZEFkZEFzYShhcHBsLGF4ZmVyKXZvaWQiLCBtZXRob2QgImFkZEFzYShheGZlcil2b2lkIiwgbWV0aG9kICJyYWZmbGUoKXZvaWQiLCBtZXRob2QgImZpbmRXaW5uZXIodWludDY0KXZvaWQiLCBtZXRob2QgImNsYWltUmFmZmxlUHJpemUoKXZvaWQiLCBtZXRob2QgImlzTGl2ZSgpYm9vbCIsIG1ldGhvZCAiZ2V0U3RhdGUoKSh1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGJvb2wsdWludDY0KSIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGluaXQgc2V0TWluRW50cmllcyByZWZ1bmRNQlIgY2xlYXJXZWlnaHRzQm94ZXMgZ2F0ZWRFbnRlciBsZWdhY3lHYXRlZEVudGVyIGVudGVyIGdhdGVkRW50ZXJBc2EgbGVnYWN5R2F0ZWRFbnRlckFzYSBlbnRlckFzYSBnYXRlZEFkZCBsZWdhY3lHYXRlZEFkZCBhZGQgZ2F0ZWRBZGRBc2EgbGVnYWN5R2F0ZWRBZGRBc2EgYWRkQXNhIHJhZmZsZSBmaW5kV2lubmVyIGNsYWltUmFmZmxlUHJpemUgaXNMaXZlIGdldFN0YXRlIHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAzMSBtYWluX21icl9yb3V0ZUAzMiBvcHRpbgogICAgZXJyCgptYWluX21icl9yb3V0ZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvYmFzZS50czo2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwN2JkNDAwMDAwMDAwMDBjODE3ZDQwMDAwMDAwMDAwMDA0OWQ0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMTAtMTE1CiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQmFzZVJhZmZsZSwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzIDB4ZmRlMjc3N2UgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsKHN0cmluZyx1aW50NjQpLGFkZHJlc3Mpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgZGVsZXRlQXBwbGljYXRpb24KCgovLyBfcHV5YV9saWIudXRpbC5lbnN1cmVfYnVkZ2V0KHJlcXVpcmVkX2J1ZGdldDogdWludDY0LCBmZWVfc291cmNlOiB1aW50NjQpIC0+IHZvaWQ6CmVuc3VyZV9idWRnZXQ6CiAgICBwcm90byAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxMAogICAgKwoKZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMToKICAgIGR1cAogICAgZ2xvYmFsIE9wY29kZUJ1ZGdldAogICAgPgogICAgYnogZW5zdXJlX2J1ZGdldF9hZnRlcl93aGlsZUA2CiAgICBpdHhuX2JlZ2luCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgYnl0ZWMgNDcgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtCiAgICBieXRlYyA0NyAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbQogICAgZnJhbWVfZGlnIC0xCiAgICBzd2l0Y2ggZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8wQDMgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8xQDQKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgaXR4bl9zdWJtaXQKICAgIGIgZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMQoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8xQDQ6CiAgICBnbG9iYWwgTWluVHhuRmVlCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgYiBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANQoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8wQDM6CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGIgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDUKCmVuc3VyZV9idWRnZXRfYWZ0ZXJfd2hpbGVANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6Ol9fcGNnMzJPdXRwdXQoc3RhdGU6IHVpbnQ2NCkgLT4gdWludDY0OgpfX3BjZzMyT3V0cHV0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyOQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIF9fcGNnMzJPdXRwdXQoc3RhdGU6IFBDRzMyU1RBVEUpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMwCiAgICAvLyBjb25zdCB4b3JzaGlmdGVkID0gX19tYXNrVG9VaW50MzIob3Auc2hyKG9wLnNocihzdGF0ZSwgMTgpIF4gc3RhdGUsIDI3KSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxOAogICAgc2hyCiAgICBmcmFtZV9kaWcgLTEKICAgIF4KICAgIHB1c2hpbnQgMjcKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOQogICAgLy8gcmV0dXJuIHZhbHVlICYgKG9wLnNobCgxLCAzMikgLSAxKQogICAgaW50YyAxMCAvLyA0Mjk0OTY3Mjk1CiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByb3QgPSBvcC5zaHIoc3RhdGUsIDU5KQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDU5CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIGR1cDIKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgc3dhcAogICAgfgogICAgaW50Y18xIC8vIDEKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgcHVzaGludCAzMQogICAgJgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBzaGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTAgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgfAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6YXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiB1aW50NjQsIHNlbmRlcjogYnl0ZXMpIC0+IHZvaWQ6CmFzc2VydFNhZmVBc3NldFRyYW5zZmVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzYKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcih0eG46IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgc2VuZGVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDQ4IC8vICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOY2x3IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHcKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldENsb3NlVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMzYgLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAzNyAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDg6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBieXRlcywgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiB1aW50NjQsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzUzCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IGJvb2xlYW4sIHJlY2xhaW1UbzogQWNjb3VudCk6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gOCAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc1NAogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgZXJyQ2Fubm90Q2xvc2VPdXRPZkFsZ29Gb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU0CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBlcnJDYW5ub3RDbG9zZU91dE9mQWxnb0ZvcmJpZGRlbikKICAgIGFzc2VydCAvLyBlcnJOY2NhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC04CiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NTUKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnJld2FyZHMKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NTgKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNTQ1MDAKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYwCiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtNwogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYxLTc3MwogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY1CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjYKICAgIC8vIGFtb3VudDogbWJyICsgc3VtCiAgICBkaWcgMgogICAgZnJhbWVfZGlnIC0zCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjQtNzY3CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjEtNzczCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2OAogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2OQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYxLTc3MwogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGRjYWMwOTM1IC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10sYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgxNQogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTQKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3NQogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtNwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5CiAgICBkaWcgMQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTAKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODkKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk1CiAgICAvLyBpZiAoY2xvc2VPdXQpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5NgogICAgLy8gdHJhbnNmZXJUeG4uc2V0KHsgYXNzZXRDbG9zZVRvOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzIH0pCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAogICAgZnJhbWVfYnVyeSAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5OS04MTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwMwogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDItODA1CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnIKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDYKICAgIC8vIHRyYW5zZmVyVHhuLAogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgMAogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3CiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNzoKICAgIGZyYW1lX2RpZyAtNwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg5LTc5MwogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk5LTgxMgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDcKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDgKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5OS04MTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhhM2ExNmNhYSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzYKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3Ny03ODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgxCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgyCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODAtNzgzCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzctNzg2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg0CiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3Ny03ODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDM5NGVhZWIyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbWJyLnRzOjpGdW5kZXJJbmZvCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDYKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE1CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDM0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKCgobGVuK3V0ZjhbXSksdWludDY0KSx1aW50OFszMl0pCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDgKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQ2CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnR1cGxlPHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMzQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKChsZW4rdXRmOFtdKSx1aW50NjQpLHVpbnQ4WzMyXSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDYKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudHVwbGU8c21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZyxhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4+CiAgICBleHRyYWN0IDIgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzggLy8gIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDAzCiAgICAvLyB0aGlzLnByaXplLnZhbHVlID0gcHJpemUKICAgIGRpZyAxNgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAzMSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gdGhpcy5pc1ByaXplQm94LnZhbHVlID0gaXNQcml6ZUJveAogICAgZGlnIDEwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gaWYgKHRpY2tldEFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMTQKICAgIGJ6IGNyZWF0ZV9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDcKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldCh0aWNrZXRBc3NldCkudG90YWwgPiAwLCBlcnJJbnZhbGlkQXNzZXQpCiAgICBkaWcgMTQKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRUb3RhbAogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgYm56IGNyZWF0ZV9hZnRlcl9pZl9lbHNlQDcKICAgIHB1c2hieXRlcyAiRVJSOmVycklhc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFzdAoKY3JlYXRlX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDA5CiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlID0gQXNzZXQodGlja2V0QXNzZXQpCiAgICBkaWcgMTUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM5IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDEwCiAgICAvLyB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlID0gc3RhcnRUaW1lc3RhbXAKICAgIHVuY292ZXIgMTQKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCAmJiBlbmRUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJJbnZhbGlkRW5kaW5nUm91bmQpCiAgICBkaWcgNAogICAgPAogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMTAKICAgIGRpZyAzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUAxMAogICAgaW50Y18xIC8vIDEKCmNyZWF0ZV9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICYmIGVuZFRpbWVzdGFtcCA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckludmFsaWRFbmRpbmdSb3VuZCkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJZW5yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckllbnIKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTkgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9IGVuZFRpbWVzdGFtcAogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMwogICAgLy8gdGhpcy5zZWxsZXIudmFsdWUgPSBzZWxsZXIKICAgIHVuY292ZXIgMTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvY2hpbGQudHM6MTEKICAgIC8vIGZ1bmRlciA9IEdsb2JhbFN0YXRlPEZ1bmRlckluZm8+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUZ1bmRlciB9KQogICAgYnl0ZWMgNDkgLy8gImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTQKICAgIC8vIHRoaXMuZnVuZGVyLnZhbHVlID0gY2xvbmUoZnVuZGVyKQogICAgdW5jb3ZlciAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTUKICAgIC8vIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPSBjcmVhdG9yUm95YWx0eQogICAgdW5jb3ZlciAxMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGxvZ2dlZEFzc2VydChtYXhUaWNrZXRzID4gMCAmJiBtYXhUaWNrZXRzID49IG1pblRpY2tldHMsIGVyckludmFsaWRUaWNrZXRCb3VuZHMpCiAgICBkaWcgMgogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMTYKICAgIGRpZyAyCiAgICBkaWcgMgogICAgPj0KICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDE2CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlX2Jvb2xfbWVyZ2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDE3CiAgICAvLyBsb2dnZWRBc3NlcnQobWF4VGlja2V0cyA+IDAgJiYgbWF4VGlja2V0cyA+PSBtaW5UaWNrZXRzLCBlcnJJbnZhbGlkVGlja2V0Qm91bmRzKQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMTkKICAgIHB1c2hieXRlcyAiRVJSOmVyckl0YmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXRiZAoKY3JlYXRlX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGxvZ2dlZEFzc2VydChpc1ByaXplQm94IHx8IHByaXplICE9PSB0aWNrZXRBc3NldCwgZXJyUHJpemVJc1RpY2tldEFzc2V0KQogICAgdW5jb3ZlciA4CiAgICBibnogY3JlYXRlX2Jvb2xfdHJ1ZUAyMQogICAgZGlnIDkKICAgIGRpZyA5CiAgICAhPQogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMjIKCmNyZWF0ZV9ib29sX3RydWVAMjE6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlX2Jvb2xfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNQcml6ZUJveCB8fCBwcml6ZSAhPT0gdGlja2V0QXNzZXQsIGVyclByaXplSXNUaWNrZXRBc3NldCkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQaXRhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBpdGEKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBtaW5UaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5UaWNrZXRzIH0pCiAgICBieXRlYyAzMiAvLyAibWluX3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyB0aGlzLm1pblRpY2tldHMudmFsdWUgPSBtaW5UaWNrZXRzCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBtYXhUaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXhUaWNrZXRzIH0pCiAgICBieXRlYyAyMSAvLyAibWF4X3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyB0aGlzLm1heFRpY2tldHMudmFsdWUgPSBtYXhUaWNrZXRzCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBtaW5FbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pbkVudHJpZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJtaW5fZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MjIKICAgIC8vIHRoaXMubWluRW50cmllcy52YWx1ZSA9IG1pbkVudHJpZXMKICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAxNSAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIHRoaXMuZ2F0ZUlELnZhbHVlID0gZ2F0ZUlECiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA0MCAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI1CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlLnZhbHVlID0gbWFya2V0cGxhY2UKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDUwIC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlID0gc2VsbGVyUmVmZXJyZXIKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDI1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMgogICAgLy8gY29uc3QgZmVlcyA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU1CiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgcHVzaGJ5dGVzICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzMKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBmZWVzLnJhZmZsZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBkdXAKICAgIHB1c2hpbnQgMTEyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGZlZXMucmFmZmxlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTIgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxMQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5OQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA3IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gdGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPSBpbXBhY3RSYW5nZShpbXBhY3QsIGZlZXMucmFmZmxlU2FsZUltcGFjdFRheE1pbiwgZmVlcy5yYWZmbGVTYWxlSW1wYWN0VGF4TWF4KQogICAgZGlnIDEKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBzd2FwCiAgICBwdXNoaW50IDEwNAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjkzCiAgICAvLyBjb25zdCBtaW5JbXBhY3Q6IHVpbnQ2NCA9IChpbXBhY3QgPiAxKSA/IGltcGFjdCAtIDEgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogY3JlYXRlX3Rlcm5hcnlfZmFsc2VAMzIKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgIC0KCmNyZWF0ZV90ZXJuYXJ5X21lcmdlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTQKICAgIC8vIHJldHVybiBtYXggLSAoKChtYXggLSBtaW4pICogbWluSW1wYWN0KSAvIElNUEFDVF9ESVZJU09SKQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIHVuY292ZXIgMgogICAgKgogICAgcHVzaGludCAxMDAwCiAgICAvCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzMgLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSA9IGltcGFjdFJhbmdlKGltcGFjdCwgZmVlcy5yYWZmbGVTYWxlSW1wYWN0VGF4TWluLCBmZWVzLnJhZmZsZVNhbGVJbXBhY3RUYXhNYXgpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWUgPSBuZXcgYXJjNC5TdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBwdXNoaW50IDEyMAogICAgYnplcm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyAxMyAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZSA9IG5ldyBhcmM0LlN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+KCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc0CiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDUxIC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gdGhpcy5zYWx0LnZhbHVlID0gVHhuLnR4SWQKICAgIHR4biBUeElECiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmluZFdpbm5lcnNDdXJzb3IgfSkKICAgIGJ5dGVjIDQxIC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsgaW5kZXg6IDAsIGFtb3VudEluZGV4OiAxIH0KICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNyZWF0ZV90ZXJuYXJ5X2ZhbHNlQDMyOgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjkzCiAgICAvLyBjb25zdCBtaW5JbXBhY3Q6IHVpbnQ2NCA9IChpbXBhY3QgPiAxKSA/IGltcGFjdCAtIDEgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgYiBjcmVhdGVfdGVybmFyeV9tZXJnZUAzMwoKY3JlYXRlX2Jvb2xfZmFsc2VAMjI6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVfYm9vbF9tZXJnZUAyMwoKY3JlYXRlX2Jvb2xfZmFsc2VAMTY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVfYm9vbF9tZXJnZUAxNwoKY3JlYXRlX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmluaXRbcm91dGluZ10oKSAtPiB2b2lkOgppbml0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0MwogICAgLy8gaW5pdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHdlaWdodExpc3RMZW5ndGg6IHVpbnQ2NCkgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJNdXN0QmVDYWxsZWRGcm9tRmFjdG9yeSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzOCAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKaW5pdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh3ZWlnaHRMaXN0TGVuZ3RoID49IDQsIGVyck11c3RBbGxvY2F0ZUF0TGVhc3RGb3VySGlnaGVzdEJpZHNDaHVua3MpCiAgICBkdXAKICAgIHB1c2hpbnQgNAogICAgPj0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNYWxmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1hbGYKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQ2CiAgICAvLyBsb2dnZWRBc3NlcnQod2VpZ2h0TGlzdExlbmd0aCA8IDE2LCBlcnJNdXN0QWxsb2NhdGVBdE1vc3RGaWZ0ZWVuSGlnaGVzdEJpZHNDaHVua3MpCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIDwKICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNYW1mIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1hbWYKCmluaXRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUwCiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSAod2VpZ2h0TGlzdExlbmd0aCAqIHRoaXMubWJyKCkud2VpZ2h0cykKICAgIGR1cAogICAgaW50YyAxMSAvLyAxMzExMzMwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGRpZyAyCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHdlaWdodHNNQlIsIGVyckludmFsaWRQYXltZW50KQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5Cgppbml0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEwIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID0gd2VpZ2h0TGlzdExlbmd0aAogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKaW5pdF93aGlsZV90b3BAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBieiBpbml0X2FmdGVyX3doaWxlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU3CiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTcgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIHRoaXMud2VpZ2h0cyhpKS5jcmVhdGUoKQogICAgcHVzaGludCAzMjc2OAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYiBpbml0X3doaWxlX3RvcEAxMgoKaW5pdF9hZnRlcl93aGlsZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDMKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5zZXRNaW5FbnRyaWVzW3JvdXRpbmddKCkgLT4gdm9pZDoKc2V0TWluRW50cmllczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjYKICAgIC8vIHNldE1pbkVudHJpZXMobWluRW50cmllczogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUsIGVyck5vdFNlbGxlcikKICAgIHR4biBTZW5kZXIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEyIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUsIGVyck5vdFNlbGxlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IHNldE1pbkVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyck5zbHIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnNscgoKc2V0TWluRW50cmllc19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IDAsIGVyckFscmVhZHlFbnRlcmVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSAwLCBlcnJBbHJlYWR5RW50ZXJlZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzZXRNaW5FbnRyaWVzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1MiAvLyAiRVJSOmVyckFlbnQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWVudAoKc2V0TWluRW50cmllc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJOb3RMaXZlKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJOb3RMaXZlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDw9CiAgICBibnogc2V0TWluRW50cmllc19hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJObGl2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5saXYKCnNldE1pbkVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBtaW5FbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pbkVudHJpZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJtaW5fZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NzAKICAgIC8vIHRoaXMubWluRW50cmllcy52YWx1ZSA9IG1pbkVudHJpZXMKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDY2CiAgICAvLyBzZXRNaW5FbnRyaWVzKG1pbkVudHJpZXM6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJlZnVuZE1CUltyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlZnVuZE1CUjoKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3MwogICAgLy8gcmVmdW5kTUJSKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDkgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0MiAvLyAiRVJSOmVyclBuY2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUG5jbAoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQzIC8vICJFUlI6ZXJyV25mZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXbmZkCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICE9CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJBcmZjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFyZmMKCnJlZnVuZE1CUl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDExIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuZW50cnlDb3VudC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODMKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGNvbnN0IG9wVXBJdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCA9IGl0ZXJhdGlvbkFtb3VudCAqIDIwMAogICAgcHVzaGludCAyMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIGVuc3VyZUJ1ZGdldChvcFVwSXRlcmF0aW9uQW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAoKcmVmdW5kTUJSX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAyCiAgICBkaWcgMgogICAgKwogICAgZGlnIDEKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl93aGlsZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MgogICAgLy8gY29uc3QgeyBhY2NvdW50IH0gPSB0aGlzLmVudHJpZXMoaSkudmFsdWUKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDM0IC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIGNvbnN0IHsgYWNjb3VudCB9ID0gdGhpcy5lbnRyaWVzKGkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBsZXQgZGlzYnVyc2VtZW50Q29zdDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gaWYgKHRoaXMuZmFpbGVkLnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE4MwogICAgLy8gZmFpbGVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmFpbGVkIH0pCiAgICBieXRlYyAyMyAvLyAiZmFpbGVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gaWYgKHRoaXMuZmFpbGVkLnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIHJldHVybiB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGR1cG4gMgogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDE3IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyByZXR1cm4gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBzd2FwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gZGlzYnVyc2VtZW50Q29zdCA9IHRoaXMuc2VuZFRpY2tldHNPckRpc2J1cnNlKGFjY291bnQsIHRoaXMudGlja2V0c09mKGkpKQogICAgZGlnIDMKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VuZFRpY2tldHNPckRpc2J1cnNlCiAgICBidXJ5IDgKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5OAogICAgLy8gdGhpcy5lbnRyaWVzKGkpLmRlbGV0ZSgpCiAgICB1bmNvdmVyIDMKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgZGlnIDMKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKGFjY291bnQpLmRlbGV0ZSgpCiAgICBkdXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBzaGEyNTYKICAgIHB1c2hieXRlcyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MgogICAgLy8gY29uc3QgW3BheWVyLCBzcG9uc29yZWRdID0gb3AuQm94LmdldChrZXkpCiAgICBib3hfZ2V0CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKCFzcG9uc29yZWQpIHsKICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAxOQogICAgYnVyeSAxCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gY29uc3QgZW50cnlUb3RhbE1CUjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgMTIgLy8gNTA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIHN3YXAKICAgIGNvbmNhdAoKcmVmdW5kTUJSX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVsZWFzZURlcG9zaXRAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTAxCiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHJlZnVuZF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLmVudHJpZXNCeUFkZHJlc3MoYWNjb3VudCkua2V5LCBhY2NvdW50LCBlbnRyeVRvdGFsTUJSKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGJ1cnkgOAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBpZiAocmVmdW5kID4gZGlzYnVyc2VtZW50Q29zdCAmJiB0aGlzLmNhblJlY2VpdmVBbGdvKHJlY2VpdmVyLCByZWZ1bmQgLSBkaXNidXJzZW1lbnRDb3N0KSkgewogICAgZGlnIDYKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE1CiAgICBkaWcgNAogICAgZGlnIDYKICAgIC0KICAgIGR1cAogICAgYnVyeSA1CiAgICBkaWcgNwogICAgc3dhcAogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDQtNTA5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZCAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwNC01MDgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogcmVmdW5kIC0gZGlzYnVyc2VtZW50Q29zdCwKICAgIC8vICAgICByZWNlaXZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDQtNTA5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZCAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgICAgcmVjZWl2ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHJlZnVuZE1CUl93aGlsZV90b3BAOAoKcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NgogICAgLy8gb3AuQm94LmRlbGV0ZShrZXkpCiAgICB1bmNvdmVyIDMKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZGlnIDEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiByZWZ1bmRNQlJfYm9vbF90cnVlQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBpbnRjIDEzIC8vIDc5MTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICA+PQogICAgYnogcmVmdW5kTUJSX2Jvb2xfZmFsc2VAMjIKCnJlZnVuZE1CUl9ib29sX3RydWVAMjE6CiAgICBpbnRjXzEgLy8gMQoKcmVmdW5kTUJSX2Jvb2xfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBieiByZWZ1bmRNQlJfdGVybmFyeV9mYWxzZUAyNQogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIHN3YXAKCnJlZnVuZE1CUl90ZXJuYXJ5X21lcmdlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDcKICAgIC8vIGNvbnN0IHRvdGFsOiB1aW50NjQgPSBhbW91bnQgKyBQYXllclJlY29yZE1CUgogICAgaW50YyAxMyAvLyA3OTEwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTAxCiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHJlZnVuZF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLmVudHJpZXNCeUFkZHJlc3MoYWNjb3VudCkua2V5LCBhY2NvdW50LCBlbnRyeVRvdGFsTUJSKQogICAgYiByZWZ1bmRNQlJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdEAyNwoKcmVmdW5kTUJSX3Rlcm5hcnlfZmFsc2VAMjU6CiAgICBidXJ5IDEKICAgIHVuY292ZXIgMgogICAgYiByZWZ1bmRNQlJfdGVybmFyeV9tZXJnZUAyNgoKcmVmdW5kTUJSX2Jvb2xfZmFsc2VAMjI6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWZ1bmRNQlJfYm9vbF9tZXJnZUAyMwoKcmVmdW5kTUJSX2FmdGVyX3doaWxlQDE2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTEzCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDczCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA5IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0MiAvLyAiRVJSOmVyclBuY2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUG5jbAoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyUmVmdW5kc05vdENvbXBsZXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyUmVmdW5kc05vdENvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyUmVmdW5kc05vdENvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDUzIC8vICJFUlI6ZXJyUmZuYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSZm5jCgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKY2xlYXJXZWlnaHRzQm94ZXNfd2hpbGVfdG9wQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEwIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgID4KICAgIGJ6IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX3doaWxlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjIKICAgIC8vIGNvbnN0IHJpOiB1aW50NjQgPSAodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgLSAxKSAtIGkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMCAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyB0aGlzLndlaWdodHMocmkpLmRlbGV0ZSgpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMwogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgY2xlYXJXZWlnaHRzQm94ZXNfd2hpbGVfdG9wQDYKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX3doaWxlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI2CiAgICAvLyBjb25zdCByZXR1cm5BbW91bnQ6IHVpbnQ2NCA9IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTAgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyNgogICAgLy8gY29uc3QgcmV0dXJuQW1vdW50OiB1aW50NjQgPSB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAqIHRoaXMubWJyKCkud2VpZ2h0cwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGMgMTEgLy8gMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzAtNTM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMyCiAgICAvLyByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvY2hpbGQudHM6MTEKICAgIC8vIGZ1bmRlciA9IEdsb2JhbFN0YXRlPEZ1bmRlckluZm8+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUZ1bmRlciB9KQogICAgYnl0ZWMgNDkgLy8gImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGV4dHJhY3QgMCAzMgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMwLTUzNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuZnVuZGVyLnZhbHVlLmFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMwLTUzNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuZnVuZGVyLnZhbHVlLmFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEwIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzcKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID0gMAogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE2CiAgICAvLyBjbGVhcldlaWdodHNCb3hlcygpOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmRlbGV0ZUFwcGxpY2F0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXBwbGljYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJNdXN0QmVDYWxsZWRGcm9tRmFjdG9yeSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzggLy8gIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA5IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA0MiAvLyAiRVJSOmVyclBuY2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUG5jbAoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyUmVmdW5kc05vdENvbXBsZXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyUmVmdW5kc05vdENvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMSAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyUmVmdW5kc05vdENvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDUzIC8vICJFUlI6ZXJyUmZuYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSZm5jCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgZXJyU3RpbGxIYXNXZWlnaHRzQm94ZXMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTAgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBlcnJTdGlsbEhhc1dlaWdodHNCb3hlcykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyU2h3YiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJTaHdiCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDkKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDE2CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gY29uc3QgdGlja2V0Q2xvc2VUbyA9IEdsb2JhbC5jcmVhdG9yQWRkcmVzcy5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBjb25zdCB0aWNrZXRDbG9zZVRvID0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUwLTU1MgogICAgLy8gY29uc3QgdGlja2V0Q2xvc2VUbyA9IEdsb2JhbC5jcmVhdG9yQWRkcmVzcy5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkKICAgIC8vICAgPyBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIC8vICAgOiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmNyZWF0b3IKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfZmFsc2VAMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTEKICAgIC8vID8gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKCmRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTUzLTU1OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aWNrZXRDbG9zZVRvLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU2CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTYKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTMtNTU3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRpY2tldENsb3NlVG8sCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTMtNTU4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRpY2tldENsb3NlVG8sCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUgJiYgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAzMSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUgJiYgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDIwCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTYxCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjItNTY3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjQKICAgIC8vIGFzc2V0Q2xvc2VUbzogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDQgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2NAogICAgLy8gYXNzZXRDbG9zZVRvOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2Mi01NjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2Mi01NjcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTcwLTU3NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NzIKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTcwLTU3MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU3MC01NzQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9mYWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIDogdGhpcy50aWNrZXRBc3NldC52YWx1ZS5jcmVhdG9yCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTIKICAgIC8vIDogdGhpcy50aWNrZXRBc3NldC52YWx1ZS5jcmVhdG9yCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGIgZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9tZXJnZUAxNAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmdhdGVkRW50ZXJbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4NAogICAgLy8gZ2F0ZWRFbnRlcihnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgZmFsc2UsIHdhbGxldCkKICAgIHVuY292ZXIgMwogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRHYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTg2CiAgICAvLyB0aGlzLmVudGVySW1wbChwYXltZW50LCBtYXJrZXRwbGFjZSwgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGVudGVySW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4NAogICAgLy8gZ2F0ZWRFbnRlcihnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5sZWdhY3lHYXRlZEVudGVyW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRFbnRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRFbnRlcicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTkyCiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgdHJ1ZSwgMCkKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFzc2VydEdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIHRoaXMuZW50ZXJJbXBsKHBheW1lbnQsIG1hcmtldHBsYWNlLCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZW50ZXJJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkRW50ZXInIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJbcm91dGluZ10oKSAtPiB2b2lkOgplbnRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTYtNTk5CiAgICAvLyBlbnRlcigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDAKICAgIC8vIHRoaXMuZW50ZXJJbXBsKHBheW1lbnQsIG1hcmtldHBsYWNlLCBmYWxzZSkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVudGVySW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5Ni01OTkKICAgIC8vIGVudGVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nYXRlZEVudGVyQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRFbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjQKICAgIC8vIGdhdGVkRW50ZXJBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50LCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY1CiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgZmFsc2UsIHdhbGxldCkKICAgIHVuY292ZXIgNAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRHYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY2CiAgICAvLyB0aGlzLmVudGVyQXNhSW1wbChwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlLCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZW50ZXJBc2FJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY0CiAgICAvLyBnYXRlZEVudGVyQXNhKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5sZWdhY3lHYXRlZEVudGVyQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRFbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzAKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRFbnRlckFzYScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3MgogICAgLy8gdGhpcy5hc3NlcnRHYXRlKGdhdGVUeG4sIHRydWUsIDApCiAgICB1bmNvdmVyIDMKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBhc3NlcnRHYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyB0aGlzLmVudGVyQXNhSW1wbChwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlLCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZW50ZXJBc2FJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjcwCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkRW50ZXJBc2EnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZW50ZXJBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgplbnRlckFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzYtNjgwCiAgICAvLyBlbnRlckFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4MQogICAgLy8gdGhpcy5lbnRlckFzYUltcGwocGF5bWVudCwgYXNzZXRYZmVyLCBtYXJrZXRwbGFjZSwgZmFsc2UpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnRlckFzYUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzYtNjgwCiAgICAvLyBlbnRlckFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmdhdGVkQWRkW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRBZGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzA4CiAgICAvLyBnYXRlZEFkZChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZShnYXRlVHhuLCBmYWxzZSwgd2FsbGV0KQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTAKICAgIC8vIHRoaXMuYWRkSW1wbChwYXltZW50LCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgYWRkSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwOAogICAgLy8gZ2F0ZWRBZGQoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5sZWdhY3lHYXRlZEFkZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkQWRkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxNAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEFkZCcgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzE2CiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgdHJ1ZSwgMCkKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBhc3NlcnRHYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzE3CiAgICAvLyB0aGlzLmFkZEltcGwocGF5bWVudCwgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGFkZEltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTQKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRBZGQnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyMAogICAgLy8gYWRkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyB0aGlzLmFkZEltcGwocGF5bWVudCwgZmFsc2UpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBhZGRJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzIwCiAgICAvLyBhZGQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2F0ZWRBZGRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEFkZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTMKICAgIC8vIGdhdGVkQWRkQXNhKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1NAogICAgLy8gdGhpcy5hc3NlcnRHYXRlKGdhdGVUeG4sIGZhbHNlLCB3YWxsZXQpCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gdGhpcy5hZGRBc2FJbXBsKGFzc2V0WGZlciwgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGFkZEFzYUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTMKICAgIC8vIGdhdGVkQWRkQXNhKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5sZWdhY3lHYXRlZEFkZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkQWRkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1OQogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEFkZEFzYScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gdGhpcy5hc3NlcnRHYXRlKGdhdGVUeG4sIHRydWUsIDApCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MgogICAgLy8gdGhpcy5hZGRBc2FJbXBsKGFzc2V0WGZlciwgdHJ1ZSkKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGFkZEFzYUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTkKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRBZGRBc2EnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKYWRkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NQogICAgLy8gYWRkQXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzY2CiAgICAvLyB0aGlzLmFkZEFzYUltcGwoYXNzZXRYZmVyLCBmYWxzZSkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFkZEFzYUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NjUKICAgIC8vIGFkZEFzYShhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4bik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJhZmZsZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIGVyclJhZmZsZUhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIGVyclJhZmZsZUhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDU0IC8vICJFUlI6ZXJyUmhuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSaG5lCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODEzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID09PSAwLCBlcnJXaW5uZXJBbHJlYWR5RHJhd24pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA2IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPT09IDAsIGVycldpbm5lckFscmVhZHlEcmF3bikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVycldhZHIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2FkcgoKcmFmZmxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lckFscmVhZHlGb3VuZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNTUgLy8gIkVSUjplcnJXYWZkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldhZmQKCnJhZmZsZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTYKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODE2CiAgICAvLyBpZiAodGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxOAogICAgLy8gY29uc3QgbWluRW50cmllczogdWludDY0ID0gdGhpcy5taW5FbnRyaWVzLnZhbHVlID4gMCA/IHRoaXMubWluRW50cmllcy52YWx1ZSA6IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBtaW5FbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pbkVudHJpZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJtaW5fZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGNvbnN0IG1pbkVudHJpZXM6IHVpbnQ2NCA9IHRoaXMubWluRW50cmllcy52YWx1ZSA+IDAgPyB0aGlzLm1pbkVudHJpZXMudmFsdWUgOiAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcmFmZmxlX3Rlcm5hcnlfZmFsc2VAMTAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBtaW5FbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pbkVudHJpZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJtaW5fZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGNvbnN0IG1pbkVudHJpZXM6IHVpbnQ2NCA9IHRoaXMubWluRW50cmllcy52YWx1ZSA+IDAgPyB0aGlzLm1pbkVudHJpZXMudmFsdWUgOiAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwoKcmFmZmxlX3Rlcm5hcnlfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyBpZiAodGhpcy5lbnRyeUNvdW50LnZhbHVlIDwgbWluRW50cmllcyB8fCB0aGlzLnRpY2tldENvdW50LnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTkKICAgIC8vIGlmICh0aGlzLmVudHJ5Q291bnQudmFsdWUgPCBtaW5FbnRyaWVzIHx8IHRoaXMudGlja2V0Q291bnQudmFsdWUgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogcmFmZmxlX2lmX2JvZHlAMTMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gaWYgKHRoaXMuZW50cnlDb3VudC52YWx1ZSA8IG1pbkVudHJpZXMgfHwgdGhpcy50aWNrZXRDb3VudC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNAoKcmFmZmxlX2lmX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBmYWlsZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGYWlsZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJmYWlsZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODIwCiAgICAvLyB0aGlzLmZhaWxlZC52YWx1ZSA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyMQogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSB0aGlzLnNlbGxlci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTIgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5zZWxsZXIudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5zZWxsZXIudmFsdWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGlmICh0aGlzLnRpY2tldENvdW50LnZhbHVlID09PSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGlmICh0aGlzLnRpY2tldENvdW50LnZhbHVlID09PSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA2IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjcKICAgIC8vIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxMQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVAMjcKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgzMQogICAgLy8gdGhpcy5jb21taXREcmF3Um91bmQoKQogICAgY2FsbHN1YiBjb21taXREcmF3Um91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTEKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGIgcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmFmZmxlQDI3CgpyYWZmbGVfdGVybmFyeV9mYWxzZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTgKICAgIC8vIGNvbnN0IG1pbkVudHJpZXM6IHVpbnQ2NCA9IHRoaXMubWluRW50cmllcy52YWx1ZSA+IDAgPyB0aGlzLm1pbkVudHJpZXMudmFsdWUgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgYiByYWZmbGVfdGVybmFyeV9tZXJnZUAxMQoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODM1CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTEFHX1JPVU5EUywgZXJyTm90RW5vdWdoVGltZSkKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgQkVBQ09OX0xBR19ST1VORFMsIGVyck5vdEVub3VnaFRpbWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCA0CiAgICArCiAgICA+PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMTkKICAgIHB1c2hieXRlcyAiRVJSOmVyck5ldG0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmV0bQoKcmFmZmxlX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MzctODQwCiAgICAvLyBjb25zdCBzZWVkID0gYWJpQ2FsbDx0eXBlb2YgUmFuZG9tbmVzc0JlYWNvbi5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgLy8gICBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODM5CiAgICAvLyBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MzkKICAgIC8vIGFyZ3M6IFt0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc0CiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDUxIC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MzgKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MzgKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjIxCiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGJ5dGVjIDU2IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODM4CiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODM3LTg0MAogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MTg5MzkyYzUgLy8gbWV0aG9kICJnZXQodWludDY0LGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDIKICAgIC8vIGlmIChzZWVkLmxlbmd0aCA9PT0gMCkgewogICAgbGVuCiAgICBkdXAKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAyNAogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTUFYX1dBSVRfUk9VTkRTLCBlcnJCZWFjb25Ob3RSZWFkeSkKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgQkVBQ09OX01BWF9XQUlUX1JPVU5EUywgZXJyQmVhY29uTm90UmVhZHkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMDAwCiAgICArCiAgICA+PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMjMKICAgIHB1c2hieXRlcyAiRVJSOmVyckJucmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm5yZAoKcmFmZmxlX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDQKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAzMCAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODQ0CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDQKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODQ1CiAgICAvLyB0aGlzLmNvbW1pdERyYXdSb3VuZCgpCiAgICBjYWxsc3ViIGNvbW1pdERyYXdSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxMQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVAMjcKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg0OQogICAgLy8gY29uc3Qgcm5nU3RhdGUgPSBwY2c2NEluaXQoc2VlZC5zbGljZSgwLCAxNikpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlZWQubGVuZ3RoID09PSAxNiwgZXJySW52YWxpZFJhbmRvbVNlZWQpCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEA1NAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXJzZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcnNkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTgKICAgIC8vIGNvbnN0IHN0YXRlID0gX19wY2czMlN0ZXAoMCwgaW5jcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNiAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OQogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNiAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGludGMgOCAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBjb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjEKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA2IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTktMjIKICAgIC8vIHJldHVybiBbCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICAvLyBdCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIGxldCB1cHBlckJvdW5kID0gdGhpcy50aWNrZXRDb3VudC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODUyCiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMudGlja2V0Q291bnQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg1MwogICAgLy8gaWYgKHVwcGVyQm91bmQgPCBNQVhfVUlOVDY0KSB7CiAgICBpbnRjIDcgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODU0CiAgICAvLyB1cHBlckJvdW5kICs9IDEKICAgIGludGNfMSAvLyAxCiAgICArCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MzEKICAgIC8vIGNvbnN0IHJlc3VsdCA9IG5ldyBEeW5hbWljQXJyYXk8YXJjNC5VaW50NjQ+KCkKICAgIGJ5dGVjIDU3IC8vIDB4MDAwMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0MwogICAgLy8gaWYgKHVwcGVyQm91bmQgIT09IDApIHsKICAgIGR1cAogICAgYnogcmFmZmxlX2Vsc2VfYm9keUA0MAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHVwcGVyQm91bmQgPiAxLCBlcnJJbnZhbGlkUmFuZG9tQm91bmRzKQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMzcKICAgIGJ5dGVjIDU4IC8vICJFUlI6ZXJySXJiZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcmJkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgZXJySW52YWxpZFJhbmRvbUJvdW5kcykKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NTcKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChsb3dlckJvdW5kIDwgdXBwZXJCb3VuZCAtIDEsIGVyckludmFsaWRSYW5kb21Cb3VuZHMpCiAgICA+CiAgICBibnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VANDMKICAgIGJ5dGVjIDU4IC8vICJFUlI6ZXJySXJiZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcmJkCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUA0MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIGR1cG4gMgogICAgfgogICAgaW50Y18xIC8vIDEKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NAogICAgLy8gY29uc3QgdGhyZXNob2xkOiB1aW50NjQgPSBfX3VpbnQ2NFR3b3MoYWJzb2x1dGVCb3VuZCkgJSBhYnNvbHV0ZUJvdW5kCiAgICBzd2FwCiAgICAlCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKCnJhZmZsZV93aGlsZV90b3BANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIGRpZyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODU3CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl93aGlsZUA0OQoKcmFmZmxlX3doaWxlX3RvcEA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA2IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMAogICAgLy8gY29uc3QgbmV3U3RhdGUxID0gX19wY2czMlN0ZXAoc3RhdGVbMF0sIHBjZ0ZpcnN0SW5jcmVtZW50KQogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjExCiAgICAvLyBjb25zdCBuZXdTdGF0ZTIgPSBfX3BjZzMyU3RlcChzdGF0ZVsxXSwgbmV3U3RhdGUxID09PSAwID8gb3Auc2hsKHBjZ1NlY29uZEluY3JlbWVudCwgMSkgOiBwY2dTZWNvbmRJbmNyZW1lbnQpCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGJueiByYWZmbGVfdGVybmFyeV9mYWxzZUA1NwogICAgcHVzaGludCAyODg1MzkwMDgxNzc3OTI2ODE4CgpyYWZmbGVfdGVybmFyeV9tZXJnZUA1ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjIDYgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICB1bmNvdmVyIDIKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMwogICAgLy8gcmV0dXJuIFtbbmV3U3RhdGUxLCBuZXdTdGF0ZTJdLCBvcC5zaGwoX19wY2czMk91dHB1dChzdGF0ZVswXSksIDMyKSB8IF9fcGNnMzJPdXRwdXQoc3RhdGVbMV0pXQogICAgdW5jb3ZlciA1CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICBwdXNoaW50IDMyCiAgICBzaGwKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICB8CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTgKICAgIC8vIGNvbnN0IFtuZXdTdGF0ZSwgY2FuZGlkYXRlXSA9IF9fcGNnNjRVbmJvdW5kZWRSYW5kb20oc3RhdGUpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxNgogICAgY292ZXIgNAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MAogICAgLy8gaWYgKGNhbmRpZGF0ZSA+PSB0aHJlc2hvbGQpIHsKICAgIGRpZyA2CiAgICA+PQogICAgYnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VANDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgIGRpZyAxCiAgICAlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODU3CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICArCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICBiIHJhZmZsZV93aGlsZV90b3BANDQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDQ4OgogICAgcG9wCiAgICB1bmNvdmVyIDMKICAgIGIgcmFmZmxlX3doaWxlX3RvcEA0NgoKcmFmZmxlX3Rlcm5hcnlfZmFsc2VANTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjExCiAgICAvLyBjb25zdCBuZXdTdGF0ZTIgPSBfX3BjZzMyU3RlcChzdGF0ZVsxXSwgbmV3U3RhdGUxID09PSAwID8gb3Auc2hsKHBjZ1NlY29uZEluY3JlbWVudCwgMSkgOiBwY2dTZWNvbmRJbmNyZW1lbnQpCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgYiByYWZmbGVfdGVybmFyeV9tZXJnZUA1OAoKcmFmZmxlX2FmdGVyX3doaWxlQDQ5OgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjY4CiAgICAvLyByZXR1cm4gW3N0YXRlLCByZXN1bHRdCiAgICBwdXNoYnl0ZXMgMHgwMDEyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg1OAogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgNiAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODU4CiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTEKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGIgcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmFmZmxlQDI3CgpyYWZmbGVfZWxzZV9ib2R5QDQwOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjUxCiAgICAvLyBhYnNvbHV0ZUJvdW5kID0gb3AuYnRvaShCeXRlcyhCaWdVaW50KDIgKiogNjQpIC0gQmlnVWludChsb3dlckJvdW5kKSkpCiAgICBpbnRjIDcgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGIgcmFmZmxlX2FmdGVyX2lmX2Vsc2VANDMKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5maW5kV2lubmVyW3JvdXRpbmddKCkgLT4gdm9pZDoKZmluZFdpbm5lcjoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODYxCiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODYyCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJSYWZmbGVIYXNOb3RFbmRlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTkgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODYyCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJSYWZmbGVIYXNOb3RFbmRlZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNTQgLy8gIkVSUjplcnJSaG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJobmUKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODYzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlICE9PSAwLCBlcnJOb1dpbm5pbmdUaWNrZXRZZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA2IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NjMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIGVyck5vV2lubmluZ1RpY2tldFlldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnd0eSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOd3R5CgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lckFscmVhZHlGb3VuZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDcKICAgIGJ5dGVjIDU1IC8vICJFUlI6ZXJyV2FmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXYWZkCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gbGV0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmluZGV4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmluZFdpbm5lcnNDdXJzb3IgfSkKICAgIGJ5dGVjIDQxIC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gbGV0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlLmluZGV4CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMDgKICAgIC8vIGxldCBjdXJyZW50UmFuZ2VTdGFydCA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuYW1vdW50SW5kZXgKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CgpmaW5kV2lubmVyX3doaWxlX3RvcEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTAKICAgIC8vIHdoaWxlIChzdGFydGluZ0luZGV4ICUgQ2h1bmtTaXplID09PSAwICYmIHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSkgewogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgYm56IGZpbmRXaW5uZXJfYmxvY2tAMjMKICAgIGR1cAogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgYnVyeSA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTAgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gd2hpbGUgKHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUgPT09IDAgJiYgc3RhcnRpbmdJbmRleCAvIENodW5rU2l6ZSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPAogICAgYnogZmluZFdpbm5lcl9ibG9ja0AyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gY29uc3QgYm94U3Rha2UgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtzdGFydGluZ0luZGV4IC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2Mi0xNjQKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDEzIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTEKICAgIC8vIGNvbnN0IGJveFN0YWtlID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbc3RhcnRpbmdJbmRleCAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTIKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VTdGFydCArIGJveFN0YWtlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA2IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMTIKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VTdGFydCArIGJveFN0YWtlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDcKICAgIHVuY292ZXIgMgogICAgKwogICAgZHVwCiAgICBidXJ5IDcKICAgIDwKICAgIGJueiBmaW5kV2lubmVyX2Jsb2NrQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjE2CiAgICAvLyBzdGFydGluZ0luZGV4ICs9IENodW5rU2l6ZQogICAgaW50YyA0IC8vIDQwOTYKICAgICsKICAgIGRpZyA0CiAgICBidXJ5IDYKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMTkKCmZpbmRXaW5uZXJfYmxvY2tAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjIwCiAgICAvLyByZXR1cm4gW3N0YXJ0aW5nSW5kZXgsIGN1cnJlbnRSYW5nZVN0YXJ0XQogICAgaXRvYgogICAgZGlnIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHdpbm5pbmdCb3hJbmZvWzBdCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzAKICAgIC8vIGxldCBjdXJyZW50UmFuZ2VTdGFydCA9IHdpbm5pbmdCb3hJbmZvWzFdCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXJ0aW5nSW5kZXggPCB0aGlzLmVudHJ5Q291bnQudmFsdWUsIGVycldpbm5lck5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODczCiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhcnRpbmdJbmRleCA8IHRoaXMuZW50cnlDb3VudC52YWx1ZSwgZXJyV2lubmVyTm90Rm91bmQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPAogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDQzIC8vICJFUlI6ZXJyV25mZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXbmZkCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg3NAogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUgLSBzdGFydGluZ0luZGV4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzQKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlIC0gc3RhcnRpbmdJbmRleAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzUKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICBkaWcgNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODc3CiAgICAvLyBjb25zdCBjaHVua09mZnNldDogdWludDY0ID0gc3RhcnRpbmdJbmRleCAlIENodW5rU2l6ZQogICAgc3dhcAogICAgaW50YyA0IC8vIDQwOTYKICAgICUKICAgIGR1cAogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODc4CiAgICAvLyBjb25zdCByZW1haW5pbmdJbkNodW5rOiB1aW50NjQgPSBDaHVua1NpemUgLSBjaHVua09mZnNldAogICAgaW50YyA0IC8vIDQwOTYKICAgIHN3YXAKICAgIC0KICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBpZiAoaXRlcmF0aW9uQW1vdW50ID4gcmVtYWluaW5nSW5DaHVuaykgewogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDExCiAgICBkaWcgMwogICAgYnVyeSAyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODgzCiAgICAvLyBjb25zdCB3ZWlnaHQgPSBjbG9uZSh0aGlzLndlaWdodHMoc3RhcnRpbmdJbmRleCAvIENodW5rU2l6ZSkudmFsdWUpCiAgICBkdXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAvCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4NQogICAgLy8gY29uc3Qgb3BVcEl0ZXJhdGlvbkFtb3VudDogdWludDY0ID0gaXRlcmF0aW9uQW1vdW50ICogNDAKICAgIGRpZyAyCiAgICBwdXNoaW50IDQwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODg2CiAgICAvLyBlbnN1cmVCdWRnZXQob3BVcEl0ZXJhdGlvbkFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4ODgKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKCmZpbmRXaW5uZXJfd2hpbGVfdG9wQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4OAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkaWcgMQogICAgZGlnIDQKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4ODkKICAgIC8vIGN1cnJlbnRSYW5nZUVuZCA9IGN1cnJlbnRSYW5nZVN0YXJ0ICsgd2VpZ2h0W2NodW5rT2Zmc2V0ICsgaV0uYXNVaW50NjQoKQogICAgZGlnIDgKICAgIGRpZyAyCiAgICArCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZGlnIDMKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDgKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgNiAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDw9CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDYgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg5MAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODkxCiAgICAvLyB0aGlzLndpbm5lci52YWx1ZSA9IHRoaXMuZW50cmllcyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUuYWNjb3VudAogICAgZGlnIDEKICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMzQgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4OTEKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5lbnRyaWVzKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZS5hY2NvdW50CiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4OTEKICAgIC8vIHRoaXMud2lubmVyLnZhbHVlID0gdGhpcy5lbnRyaWVzKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZS5hY2NvdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4OAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICB1bmNvdmVyIDIKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBjb3ZlciAyCiAgICBidXJ5IDgKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMTIKCmZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODk3CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBpbmRleDogc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCwgYW1vdW50SW5kZXg6IGN1cnJlbnRSYW5nZVN0YXJ0IH0KICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICBkaWcgNwogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyc0N1cnNvciB9KQogICAgYnl0ZWMgNDEgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODk3CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBpbmRleDogc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCwgYW1vdW50SW5kZXg6IGN1cnJlbnRSYW5nZVN0YXJ0IH0KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODYxCiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2xhaW1SYWZmbGVQcml6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUmFmZmxlUHJpemU6CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkwMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0MyAvLyAiRVJSOmVyclduZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25mZAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplQWxyZWFkeUNsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA5IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVBbHJlYWR5Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQYWNsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBhY2wKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTA1CiAgICAvLyBpZiAodGhpcy5mYWlsZWQudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBmYWlsZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGYWlsZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJmYWlsZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTA1CiAgICAvLyBpZiAodGhpcy5mYWlsZWQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkwNgogICAgLy8gdGhpcy50cmFuc2ZlclByaXplKHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTIgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDYKICAgIC8vIHRoaXMudHJhbnNmZXJQcml6ZSh0aGlzLnNlbGxlci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIHRyYW5zZmVyUHJpemUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgOSAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDcKICAgIC8vIHRoaXMucHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2xhaW1SYWZmbGVQcml6ZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDAKICAgIC8vIGNsYWltUmFmZmxlUHJpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTIKICAgIC8vIHRoaXMudHJhbnNmZXJQcml6ZSh0aGlzLndpbm5lci52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTIKICAgIC8vIHRoaXMudHJhbnNmZXJQcml6ZSh0aGlzLndpbm5lci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIHRyYW5zZmVyUHJpemUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTQKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy50aWNrZXRDb3VudC52YWx1ZSwgdGhpcy5pc1ByaXplQm94LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMudGlja2V0Q291bnQudmFsdWUsIHRoaXMuaXNQcml6ZUJveC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDMxIC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMudGlja2V0Q291bnQudmFsdWUsIHRoaXMuaXNQcml6ZUJveC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgOAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gbGV0IGNyZWF0b3JBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGlmICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGlmICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDIwIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGRpZyAxCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0MQogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDEKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzMKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgNwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NgogICAgLy8gbGV0IGFraXRhQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBpZiAodGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gYWtpdGFSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlBa2l0YVJveWFsdHkgfSkKICAgIGJ5dGVjIDMzIC8vICJha2l0YV9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gaWYgKHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gYWtpdGFBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIGFraXRhUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5QWtpdGFSb3lhbHR5IH0pCiAgICBieXRlYyAzMyAvLyAiYWtpdGFfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIGFraXRhQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDkKICAgIC8vIGlmIChha2l0YUFtb3VudCA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDM4CiAgICBkdXAKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSA4CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyBsZXQgbWFya2V0cGxhY2VBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzU3CiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0NAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTcKICAgIC8vIGlmIChtYXJrZXRwbGFjZUFtb3VudCA9PT0gMCAmJiB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQ0CiAgICBkdXAKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSA1CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkgPiBhbW91bnQpIHsKICAgIGRpZyA2CiAgICBkaWcgOAogICAgKwogICAgcHVzaGludCAyCiAgICBkaWcgNgogICAgKgogICAgKwogICAgZGlnIDEKICAgID4KICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA1MAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY3JlYXRvckFtb3VudCA9ICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgPyBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpIDogMAogICAgZGlnIDUKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX3Rlcm5hcnlfZmFsc2VANDgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDIwIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gKCFpc1ByaXplQm94ICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSA/IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV90ZXJuYXJ5X2ZhbHNlQDQ4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyMCAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY3JlYXRvckFtb3VudCA9ICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgPyBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGRpZyAxCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBidXJ5IDcKCmNsYWltUmFmZmxlUHJpemVfdGVybmFyeV9tZXJnZUA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGFraXRhQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzMgLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBha2l0YUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5ha2l0YVJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGJ1cnkgNQoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDUwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gY29uc3Qgc2VsbGVyQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkpCiAgICBkaWcgNgogICAgZHVwCiAgICBkaWcgOQogICAgZHVwCiAgICBjb3ZlciAzCiAgICArCiAgICBwdXNoaW50IDIKICAgIGRpZyA4CiAgICBkdXAKICAgIGNvdmVyIDUKICAgICoKICAgICsKICAgIHVuY292ZXIgNAogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3Mi0zNzcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTYKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTE3CiAgICAvLyBjb25zdCBtYXJrZXRwbGFjZSA9IHRoaXMuZW50cmllcyhsb2MpLnZhbHVlLm1hcmtldHBsYWNlCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMzQgLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTcKICAgIC8vIGNvbnN0IG1hcmtldHBsYWNlID0gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUubWFya2V0cGxhY2UKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDMyIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIwCiAgICAvLyBsZXQgbGVmdG92ZXI6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIxCiAgICAvLyBpZiAoYW1vdW50cy5ha2l0YSA+IDApIHsKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDUwIC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkyMgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciA2CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjIKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgNgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTcKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDI0CiAgICBkaWcgMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGRpZyA0CiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTkKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDIKICAgIC8vIGlmIChyZWZlcnJhbEZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDIzCiAgICBkdXAKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAzCiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBidXJ5IDEwCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDkKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTAKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgZHVwCiAgICBwdXNoaW50IDI1OTIwMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxMQogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBkaWcgMTEKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgdW5jb3ZlciA2CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDM1IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDYtMTAxNQogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIFRISVJUWV9EQVlTKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgcmVjbGFpbVRvCiAgICAvLyApCiAgICB1bmNvdmVyIDcKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgZGlnIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAxMwogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDA2LTEwMTUKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHJlY2xhaW1UbwogICAgLy8gKQogICAgdW5jb3ZlciAxMQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTcKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBjb3ZlciAyCiAgICAtCiAgICBpdG9iCiAgICBzd2FwCiAgICBjb25jYXQKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50VG9AMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjUKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjUKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTI2CiAgICAvLyBpZiAoYW1vdW50cy5jcmVhdG9yID4gMCkgewogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDYKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkyOAogICAgLy8gdGhpcy5zZW5kVGlja2V0cyhBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnRzLmNyZWF0b3IpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA0IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjgKICAgIC8vIHRoaXMuc2VuZFRpY2tldHMoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50cy5jcmVhdG9yKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBkaWcgNQogICAgY2FsbHN1YiBzZW5kVGlja2V0cwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLCBsZWZ0b3ZlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLCBsZWZ0b3ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRUb0FraXRhRXNjcm93CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzEKICAgIC8vIHRoaXMuc2VuZFRpY2tldHModGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50cy5tYXJrZXRwbGFjZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA0MCAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTMxCiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzKHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudHMubWFya2V0cGxhY2UpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBzZW5kVGlja2V0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMgogICAgLy8gdGhpcy5zZW5kVGlja2V0cyhtYXJrZXRwbGFjZSwgYW1vdW50cy5tYXJrZXRwbGFjZSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY2FsbHN1YiBzZW5kVGlja2V0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gdGhpcy5zZW5kVGlja2V0cyh0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50cy5zZWxsZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMwogICAgLy8gdGhpcy5zZW5kVGlja2V0cyh0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50cy5zZWxsZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGNhbGxzdWIgc2VuZFRpY2tldHMKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgOSAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDQKICAgIC8vIHRoaXMucHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTAwCiAgICAvLyBjbGFpbVJhZmZsZVByaXplKCk6IHZvaWQgewogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2xhaW1SYWZmbGVQcml6ZUAxNwoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM1CiAgICAvLyBpZiAoYW1vdW50cy5jcmVhdG9yID4gMCkgewogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDUKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzNgogICAgLy8gdGhpcy5zZW5kVGlja2V0c09yRGlzYnVyc2UoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50cy5jcmVhdG9yKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM2CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzT3JEaXNidXJzZShBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnRzLmNyZWF0b3IpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGRpZyA0CiAgICBjYWxsc3ViIHNlbmRUaWNrZXRzT3JEaXNidXJzZQogICAgcG9wCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyB0aGlzLnNlbmRUb0FraXRhRXNjcm93KHRoaXMudGlja2V0QXNzZXQudmFsdWUsIGxlZnRvdmVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyB0aGlzLnNlbmRUb0FraXRhRXNjcm93KHRoaXMudGlja2V0QXNzZXQudmFsdWUsIGxlZnRvdmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VuZFRvQWtpdGFFc2Nyb3cKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzOQogICAgLy8gdGhpcy5zZW5kVGlja2V0c09yRGlzYnVyc2UodGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50cy5tYXJrZXRwbGFjZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyA0MCAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM5CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzT3JEaXNidXJzZSh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnRzLm1hcmtldHBsYWNlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZFRpY2tldHNPckRpc2J1cnNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDAKICAgIC8vIHRoaXMuc2VuZFRpY2tldHNPckRpc2J1cnNlKG1hcmtldHBsYWNlLCBhbW91bnRzLm1hcmtldHBsYWNlKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRUaWNrZXRzT3JEaXNidXJzZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTQxCiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzT3JEaXNidXJzZSh0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50cy5zZWxsZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMiAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk0MQogICAgLy8gdGhpcy5zZW5kVGlja2V0c09yRGlzYnVyc2UodGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudHMuc2VsbGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBjYWxsc3ViIHNlbmRUaWNrZXRzT3JEaXNidXJzZQogICAgcG9wCiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxNgoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAyMAogICAgLy8gcmV0dXJuIHsgbGVmdG92ZXI6IGFtb3VudCwgcmVmZXJyYWxNYnI6IDAgfQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkyMgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnRUb0AyNQoKY2xhaW1SYWZmbGVQcml6ZV90ZXJuYXJ5X2ZhbHNlQDQ4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY3JlYXRvckFtb3VudCA9ICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgPyBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpIDogMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNwogICAgYiBjbGFpbVJhZmZsZVByaXplX3Rlcm5hcnlfbWVyZ2VANDkKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmVbcm91dGluZ10oKSAtPiB2b2lkOgppc0xpdmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTUwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBieXRlYyAyOCAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nZXRTdGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldFN0YXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2MAogICAgLy8gdGlja2V0QXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjAKICAgIC8vIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjEKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzkgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjEKICAgIC8vIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIGVuZFRpbWVzdGFtcDogdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDE5IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2MgogICAgLy8gZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTYzCiAgICAvLyBzZWxsZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTIgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjMKICAgIC8vIHNlbGxlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2NAogICAgLy8gbWluVGlja2V0czogdGhpcy5taW5UaWNrZXRzLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIG1pblRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pblRpY2tldHMgfSkKICAgIGJ5dGVjIDMyIC8vICJtaW5fdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjQKICAgIC8vIG1pblRpY2tldHM6IHRoaXMubWluVGlja2V0cy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY1CiAgICAvLyBtYXhUaWNrZXRzOiB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMjEgLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2NQogICAgLy8gbWF4VGlja2V0czogdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjYKICAgIC8vIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzIgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2NgogICAgLy8gZW50cnlDb3VudDogdGhpcy5lbnRyeUNvdW50LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjcKICAgIC8vIHRpY2tldENvdW50OiB0aGlzLnRpY2tldENvdW50LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY3CiAgICAvLyB0aWNrZXRDb3VudDogdGhpcy50aWNrZXRDb3VudC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY4CiAgICAvLyB3aW5uaW5nVGlja2V0OiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA2IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjgKICAgIC8vIHdpbm5pbmdUaWNrZXQ6IHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY5CiAgICAvLyB3aW5uZXI6IHRoaXMud2lubmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2OQogICAgLy8gd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTcwCiAgICAvLyBwcml6ZTogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDQgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3MAogICAgLy8gcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3MQogICAgLy8gcHJpemVDbGFpbWVkOiB0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDkgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTcxCiAgICAvLyBwcml6ZUNsYWltZWQ6IHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzIKICAgIC8vIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDE1IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3MgogICAgLy8gZ2F0ZUlEOiB0aGlzLmdhdGVJRC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTczCiAgICAvLyB2cmZGYWlsdXJlQ291bnQ6IHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzMKICAgIC8vIHZyZkZhaWx1cmVDb3VudDogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NAogICAgLy8gZW50cnlJRDogdGhpcy5lbnRyeUlELnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlJRCB9KQogICAgYnl0ZWMgNDYgLy8gImVudHJ5X2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NAogICAgLy8gZW50cnlJRDogdGhpcy5lbnRyeUlELnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzUKICAgIC8vIHJlZnVuZE1CUkN1cnNvcjogdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTEgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yOiB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBtaW5FbnRyaWVzOiB0aGlzLm1pbkVudHJpZXMudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gbWluRW50cmllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5FbnRyaWVzIH0pCiAgICBieXRlYyAxOCAvLyAibWluX2VudHJpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBtaW5FbnRyaWVzOiB0aGlzLm1pbkVudHJpZXMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NwogICAgLy8gZmFpbGVkOiB0aGlzLmZhaWxlZC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBmYWlsZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGYWlsZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJmYWlsZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTc3CiAgICAvLyBmYWlsZWQ6IHRoaXMuZmFpbGVkLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzgKICAgIC8vIHJhZmZsZVJvdW5kOiB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gcmFmZmxlUm91bmQ6IHRoaXMucmFmZmxlUm91bmQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1OS05NzkKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwKICAgIC8vICAgc2VsbGVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgbWluVGlja2V0czogdGhpcy5taW5UaWNrZXRzLnZhbHVlLAogICAgLy8gICBtYXhUaWNrZXRzOiB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICAvLyAgIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIC8vICAgdGlja2V0Q291bnQ6IHRoaXMudGlja2V0Q291bnQudmFsdWUsCiAgICAvLyAgIHdpbm5pbmdUaWNrZXQ6IHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSwKICAgIC8vICAgd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIC8vICAgcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICAvLyAgIGdhdGVJRDogdGhpcy5nYXRlSUQudmFsdWUsCiAgICAvLyAgIHZyZkZhaWx1cmVDb3VudDogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUsCiAgICAvLyAgIGVudHJ5SUQ6IHRoaXMuZW50cnlJRC52YWx1ZSwKICAgIC8vICAgcmVmdW5kTUJSQ3Vyc29yOiB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwKICAgIC8vICAgbWluRW50cmllczogdGhpcy5taW5FbnRyaWVzLnZhbHVlLAogICAgLy8gICBmYWlsZWQ6IHRoaXMuZmFpbGVkLnZhbHVlLAogICAgLy8gICByYWZmbGVSb3VuZDogdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwKICAgIC8vIH0KICAgIHVuY292ZXIgMTgKICAgIGl0b2IKICAgIHVuY292ZXIgMTgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxNwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDE2CiAgICBjb25jYXQKICAgIHVuY292ZXIgMTUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDEzCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDEwCiAgICBjb25jYXQKICAgIHVuY292ZXIgOQogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyAyOCAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAxMAogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHVuY292ZXIgNwogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMjggLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgNAogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1OAogICAgLy8gZ2V0U3RhdGUoKTogUmFmZmxlU3RhdGUgewogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0NCAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAyNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQ0IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDU5IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBwdXNoYnl0ZXMgInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQ0IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyRm9yYmlkZGVuKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGb3JiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZvcmIKCm9wdGluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdGluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRpbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NDcKICAgIC8vIG9wdGluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFzc2VydEdhdGUoZ2F0ZVR4bjogdWludDY0LCBsZWdhY3k6IHVpbnQ2NCwgd2FsbGV0OiB1aW50NjQpIC0+IHZvaWQ6CmFzc2VydEdhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjMzCiAgICAvLyBwcml2YXRlIGFzc2VydEdhdGUoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGxlZ2FjeTogYm9vbGVhbiwgd2FsbGV0OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gNAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzUKICAgIC8vIGlmIChsZWdhY3kpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogYXNzZXJ0R2F0ZV9lbHNlX2JvZHlAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuZ2F0ZVN1YmplY3QoKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuZ2F0ZVN1YmplY3QoKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMjUKICAgIC8vIHJldHVybiBsZWdhY3lPcmlnaW5PclR4blNlbmRlcihsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjIxCiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGRpZyAxCiAgICBieXRlYyA1NiAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjYKICAgIC8vIHJldHVybiBnZXRPdGhlckFwcExpc3QoYWtpdGFEQU8pLmVzY3JvdwogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4OC0zOTEKICAgIC8vIGNvbnN0IGRhdGEgPSBhYmlDYWxsPHR5cGVvZiBFc2Nyb3dGYWN0b3J5LnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGVzY3Jvd0ZhY3RvcnksCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4M2MxYTZmMzMgLy8gbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTMKICAgIC8vIGlmIChCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VANjEKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTQKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA3Cgphc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIDcKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VANjQKICAgIGZyYW1lX2J1cnkgMAoKYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDc1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuZ2F0ZVN1YmplY3QoKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDE1IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzNgogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuZ2F0ZVN1YmplY3QoKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgc3dhcAogICAgYnl0ZWMgMjQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyLTQ0MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDg0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MwogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyLTQ0MwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA4NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDQKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDg0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NQogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VAODQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ2CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQyLTQ0NgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDg0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VAODQKICAgIGludGNfMSAvLyAxCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNDAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZWQsIGVyckZhaWxlZEdhdGUpCiAgICBibnogYXNzZXJ0R2F0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyRmd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJGZ3RlCgphc3NlcnRHYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgcmV0c3ViCgphc3NlcnRHYXRlX2Jvb2xfZmFsc2VAODQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMwoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDY0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDEtMzQ0CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDMKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgYnl0ZWMgNjAgLy8gImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQxLTM0NAogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRBY2NvdW50Qnl0ZXMsIGV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ1CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIGNvbnRyb2xsZWRBY2NvdW50Qnl0ZXMubGVuZ3RoID09PSAzMiwgZXJySW52YWxpZFdhbGxldCkKICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA2NwogICAgZGlnIDEKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA2NwogICAgaW50Y18xIC8vIDEKCmFzc2VydEdhdGVfYm9vbF9tZXJnZUA2ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ1CiAgICAvLyBsb2dnZWRBc3NlcnQoZXhpc3RzICYmIGNvbnRyb2xsZWRBY2NvdW50Qnl0ZXMubGVuZ3RoID09PSAzMiwgZXJySW52YWxpZFdhbGxldCkKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2Fzc2VydEA3MAogICAgYnl0ZWMgNjEgLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmFzc2VydEdhdGVfYWZ0ZXJfYXNzZXJ0QDcwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTgKICAgIC8vIGlmIChvcmlnaW4gIT09IHdhbGxldElELmFkZHJlc3MgJiYgb3JpZ2luICE9PSBUeG4uc2VuZGVyICYmIG9yaWdpbi5hdXRoQWRkcmVzcyAhPT0gd2FsbGV0SUQuYWRkcmVzcykgewogICAgZnJhbWVfZGlnIDcKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAyCiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDc0CiAgICBkaWcgMQogICAgdHhuIFNlbmRlcgogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUA3NAogICAgZGlnIDEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgZnJhbWVfZGlnIDcKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgICE9CiAgICBieiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VANzQKICAgIGZyYW1lX2J1cnkgMAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzUKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUA3NDoKICAgIHBvcAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzUKCmFzc2VydEdhdGVfYm9vbF9mYWxzZUA2NzoKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydEdhdGVfYm9vbF9tZXJnZUA2OAoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDYxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGJ0b2koZGF0YSkKICAgIGJ0b2kKICAgIGR1cAogICAgZnJhbWVfYnVyeSAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjQKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgYnogYXNzZXJ0R2F0ZV9pZl9ib2R5QDkwCiAgICBmcmFtZV9kaWcgNgogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUA5MQoKYXNzZXJ0R2F0ZV9pZl9ib2R5QDkwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjUKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDk2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZnJhbWVfYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA2MgoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDkxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjcKICAgIC8vIGNvbnN0IFtjcmVhdG9yLCBleGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcENyZWF0b3Iod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY4CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA5NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTkKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KGl0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgNgogICAgaXRvYgogICAgYnl0ZWMgNjIgLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA5NAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEA5NgoKYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDk0OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEA5NgoKYXNzZXJ0R2F0ZV9lbHNlX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzgKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjM4CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjMKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTIKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMwogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTQKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTQ4CiAgICAvLyBpZiAoaGludCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MwogICAgLy8gb3JpZ2luOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTUKICAgIC8vIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTEKICAgIC8vIHdhbGxldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkwLTk3CiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IDAsCiAgICAvLyAgIHByaW5jaXBhbDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICB2aWFQbHVnaW46IGZhbHNlLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAyOCAvLyAweDAwCiAgICBjb25jYXQKCmFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czozMDQKICAgIC8vIHJldHVybiB7IHByaW5jaXBhbDogcC5wcmluY2lwYWwsIHdhbGxldDogcC53YWxsZXQsIHNwZW5kZXI6IHAuc3BlbmRlciB9CiAgICBkdXAKICAgIGV4dHJhY3QgOCAzMgogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA4CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgNzIgMzIKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzgKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjM4CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgc3dhcAogICAgYnl0ZWMgMjQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4LTk2OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OQogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4LTk2OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzAKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OC05NzAKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3MQogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDliMTQ3ZDJjIC8vIG1ldGhvZCAibXVzdENoZWNrRm9yKChhZGRyZXNzLHVpbnQ2NCxhZGRyZXNzKSx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OC05NzEKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3MgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgMwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4LTk3MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk3MwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjgtOTczCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gZW5jb2RlQXJjNChjdHgpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VANTYKICAgIGludGNfMSAvLyAxCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzCgphc3NlcnRHYXRlX2Jvb2xfZmFsc2VANTY6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMwoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwMgogICAgLy8gaWYgKHdhbGxldCA9PT0gMCB8fCB3YWxsZXRGYWN0b3J5ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGFzc2VydEdhdGVfaWZfYm9keUAxMAogICAgZnJhbWVfZGlnIDYKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMTEKCmFzc2VydEdhdGVfaWZfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAzCiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCgphc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBibnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RXYWxsZXQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbndsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhud2wKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTU5CiAgICAvLyBpZiAoY2FsbGVyQXBwID09PSAwKSB7CiAgICBkdXAKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTYxCiAgICAvLyBsb2dnZWRFcnIoZXJySGludFRvcExldmVsKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySHRvcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIdG9wCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NgogICAgLy8gbGV0IHZpYVBsdWdpbiA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjcKICAgIC8vIGlmIChjYWxsZXJBcHAgIT09IGhpbnQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAyNwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MQogICAgLy8gY29uc3QgW3NwZW5kaW5nLCBzcGVuZGluZ0V4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1NQRU5ESU5HKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJzcGVuZGluZ19hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzIKICAgIC8vIGlmICghKHNwZW5kaW5nRXhpc3RzICYmIHNwZW5kaW5nLmxlbmd0aCA9PT0gMzIgJiYgc3BlbmRpbmcgPT09IHNlbmRlci5ieXRlcyAmJiBzZW5kZXIgIT09IGNhbGxlckFkZHIpKSB7CiAgICBieiBhc3NlcnRHYXRlX2lmX2JvZHlAMjUKICAgIGZyYW1lX2RpZyA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBhc3NlcnRHYXRlX2lmX2JvZHlAMjUKICAgIGZyYW1lX2RpZyA0CiAgICBkaWcgMQogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfaWZfYm9keUAyNQogICAgZHVwCiAgICBmcmFtZV9kaWcgMQogICAgIT0KICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMjYKCmFzc2VydEdhdGVfaWZfYm9keUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludE5vdEJvdW5kKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG5iZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbmJkCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3OAogICAgLy8gdmlhUGx1Z2luID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEJ5dGVzLCBjb250cm9sbGVkRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfQ09OVFJPTExFRCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJ5dGVjIDYwIC8vICJjb250cm9sbGVkX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODIKICAgIC8vIGlmICghKGNvbnRyb2xsZWRFeGlzdHMgJiYgY29udHJvbGxlZEJ5dGVzLmxlbmd0aCA9PT0gMzIpKSB7CiAgICBieiBhc3NlcnRHYXRlX2lmX2JvZHlAMjkKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzMAoKYXNzZXJ0R2F0ZV9pZl9ib2R5QDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50QmFkV2FsbGV0KQogICAgYnl0ZWMgNjEgLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTE5CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gc3BlbmRlcikgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjAKICAgIC8vIHJldHVybiB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkxCiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlcywgcmVmZXJyZXJFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9SRUZFUlJFUikpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogYXNzZXJ0R2F0ZV90ZXJuYXJ5X2ZhbHNlQDQwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfdGVybmFyeV9mYWxzZUA0MAogICAgY292ZXIgMwoKYXNzZXJ0R2F0ZV90ZXJuYXJ5X21lcmdlQDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTYKICAgIC8vIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICBkaWcgMgogICAgZGlnIDEKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBzZWxlY3QKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgYnogYXNzZXJ0R2F0ZV90ZXJuYXJ5X2ZhbHNlQDQzCiAgICBzd2FwCgphc3NlcnRHYXRlX3Rlcm5hcnlfbWVyZ2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NC0yMDEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogaGludCwKICAgIC8vICAgcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlciwKICAgIC8vICAgdmlhUGx1Z2luLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMjggLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjA5LTIxNgogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWxDdHgoCiAgICAvLyAgIHdhbGxldEZhY3RvcnksCiAgICAvLyAgIGhpbnQsCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQ1Cgphc3NlcnRHYXRlX3Rlcm5hcnlfZmFsc2VANDM6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIGFzc2VydEdhdGVfdGVybmFyeV9tZXJnZUA0NAoKYXNzZXJ0R2F0ZV90ZXJuYXJ5X2ZhbHNlQDQwOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MgogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlckV4aXN0cyAmJiByZWZlcnJlckJ5dGVzLmxlbmd0aCA9PT0gMzIgPyBBY2NvdW50KHJlZmVycmVyQnl0ZXMpIDogR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGNvdmVyIDMKICAgIGIgYXNzZXJ0R2F0ZV90ZXJuYXJ5X21lcmdlQDQxCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMgogICAgLy8gY29uc3QgW3dhbGxldEFkZHJlc3MsIHdhbGxldEV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIzCiAgICAvLyBpZiAoIXdhbGxldEV4aXN0cykgewogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzNAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNAogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDM3Cgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNgogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMzYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBzd2FwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI3CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZih3YWxsZXRBZGRyZXNzKSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzcKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGNvbnRyb2xsZWQpID09PSB3YWxsZXRBZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzcKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA1CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo3NAogICAgLy8gcmV0dXJuIEFjY291bnQob3Auc2hhNTEyXzI1NihCeXRlcygnYXBwSUQnKS5jb25jYXQob3AuaXRvYihhcHBJZCkpKSkKICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBieXRlYyA2MiAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgZnJhbWVfZGlnIDIKICAgID09CiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VAMTQKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGIgYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxNgoKYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDE0OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDE2CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2FuUmVjZWl2ZUFsZ28ocmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpjYW5SZWNlaXZlQWxnbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTMKICAgIC8vIHByaXZhdGUgY2FuUmVjZWl2ZUFsZ28ocmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTQKICAgIC8vIGNvbnN0IFtiYWxhbmNlXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEJhbGFuY2UocmVjZWl2ZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjU1CiAgICAvLyByZXR1cm4gYmFsYW5jZSA+IDAgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICBibnogY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiBjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVBbGdvX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHJldHVybiBiYWxhbmNlID4gMCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIHJldHN1YgoKY2FuUmVjZWl2ZUFsZ29fYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHJldHVybiBiYWxhbmNlID4gMCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnNlbmRUaWNrZXRzKHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHZvaWQ6CnNlbmRUaWNrZXRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1OQogICAgLy8gcHJpdmF0ZSBzZW5kVGlja2V0cyhyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gaWYgKGFtb3VudCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogc2VuZFRpY2tldHNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjYxCiAgICAvLyByZXR1cm4KICAgIHJldHN1YgoKc2VuZFRpY2tldHNfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gaWYgKHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gaWYgKHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogc2VuZFRpY2tldHNfZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjUKICAgIC8vIGlmICh0aGlzLmNhblJlY2VpdmVBbGdvKHJlY2VpdmVyLCBhbW91bnQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogc2VuZFRpY2tldHNfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY2CiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpzZW5kVGlja2V0c19hZnRlcl9pZl9lbHNlQDk6CiAgICByZXRzdWIKCnNlbmRUaWNrZXRzX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2OS0yNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY5LTI3NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2OS0yNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5zZW5kVGlja2V0c09yRGlzYnVyc2UocmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzZW5kVGlja2V0c09yRGlzYnVyc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjgzCiAgICAvLyBwcml2YXRlIHNlbmRUaWNrZXRzT3JEaXNidXJzZShyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBzZW5kVGlja2V0c09yRGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKc2VuZFRpY2tldHNPckRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwIHx8IHJlY2VpdmVyLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg4CiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCB8fCByZWNlaXZlci5pc09wdGVkSW4odGhpcy50aWNrZXRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzZW5kVGlja2V0c09yRGlzYnVyc2VfaWZfYm9keUA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwIHx8IHJlY2VpdmVyLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHNlbmRUaWNrZXRzT3JEaXNidXJzZV9hZnRlcl9pZl9lbHNlQDUKCnNlbmRUaWNrZXRzT3JEaXNidXJzZV9pZl9ib2R5QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjg5CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzKHJlY2VpdmVyLCBhbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBzZW5kVGlja2V0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCnNlbmRUaWNrZXRzT3JEaXNidXJzZV9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjkzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk3CiAgICAvLyBbeyBhZGRyZXNzOiByZWNlaXZlciwgYW1vdW50IH1dLAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzUgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDAKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjkyLTMwMQogICAgLy8gcmV0dXJuIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKS5jb3N0CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5NQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk2CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA3IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjkyLTMwMQogICAgLy8gcmV0dXJuIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKS5jb3N0CiAgICB1bmNvdmVyIDUKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5OQogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5Mi0zMDEKICAgIC8vIHJldHVybiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiByZWNlaXZlciwgYW1vdW50IH1dLAogICAgLy8gICBhbW91bnQsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkuY29zdAogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS50cmFuc2ZlclByaXplKHJlY2VpdmVyOiBieXRlcykgLT4gdm9pZDoKdHJhbnNmZXJQcml6ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDQKICAgIC8vIHByaXZhdGUgdHJhbnNmZXJQcml6ZShyZWNlaXZlcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA1CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDMxIC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA1CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogdHJhbnNmZXJQcml6ZV9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDYtMzA5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtyZWNlaXZlcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNwogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA0IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDcKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNi0zMDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3JlY2VpdmVyXSwKICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHhhZGY5MmFlNCAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnRyYW5zZmVyUHJpemVfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDQgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxNQogICAgLy8gaWYgKHJlY2VpdmVyLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHRyYW5zZmVyUHJpemVfZWxzZV9ib2R5QDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxNi0zMjEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogcmVjZWl2ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDQgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxOQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzE2LTMyMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxNi0zMjEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogcmVjZWl2ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCnRyYW5zZmVyUHJpemVfZWxzZV9ib2R5QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyNQogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDQgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyNQogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI4CiAgICAvLyBbeyBhZGRyZXNzOiByZWNlaXZlciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzUgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIzLTMzMgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI2CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjcKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDcgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjMtMzMyCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiByZWNlaXZlciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzAKICAgIC8vIHRydWUsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyMy0zMzIKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckltcGwocGF5bWVudDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIGdhdGVkOiB1aW50NjQpIC0+IHZvaWQ6CmVudGVySW1wbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MDgtNjEyCiAgICAvLyBwcml2YXRlIGVudGVySW1wbCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgZ2F0ZWQ6IGJvb2xlYW4KICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgZXJyTm90TGl2ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogZW50ZXJJbXBsX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5saXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmxpdgoKZW50ZXJJbXBsX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgPT09IDAsIGVyclRpY2tldEFzc2V0Tm90QWxnbykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgPT09IDAsIGVyclRpY2tldEFzc2V0Tm90QWxnbykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBlbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDYzIC8vICJFUlI6ZXJyVGFuYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJUYW5hCgplbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyBjb25zdCBtYnIgPSB0aGlzLmVudHJ5U3RvcmFnZShwYXltZW50LCBnYXRlZCkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGVudHJ5U3RvcmFnZQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjgKICAgIC8vIG1pblRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pblRpY2tldHMgfSkKICAgIGJ5dGVjIDMyIC8vICJtaW5fdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIHBheW1lbnQuYW1vdW50ID49ICh0aGlzLm1pblRpY2tldHMudmFsdWUgKyBtYnIpICYmIHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgKyBtYnIpLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgID49CiAgICBieiBlbnRlckltcGxfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMjEgLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYxOAogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDIKICAgICsKICAgIGRpZyAxCiAgICA+PQogICAgYnogZW50ZXJJbXBsX2Jvb2xfZmFsc2VANwogICAgaW50Y18xIC8vIDEKCmVudGVySW1wbF9ib29sX21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE3LTYyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgIC8vICAgZXJySW52YWxpZFBheW1lbnQKICAgIC8vICkKICAgIGJueiBlbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyAxNiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZW50ZXJJbXBsX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjIKICAgIC8vIHRoaXMucmVjb3JkRW50cnkocGF5bWVudCwgbWFya2V0cGxhY2UsIHBheW1lbnQuYW1vdW50IC0gbWJyKQogICAgc3dhcAogICAgLQogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRFbnRyeQogICAgcmV0c3ViCgplbnRlckltcGxfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgZW50ZXJJbXBsX2Jvb2xfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudHJ5U3RvcmFnZShwYXltZW50OiB1aW50NjQsIGdhdGVkOiB1aW50NjQpIC0+IHVpbnQ2NDoKZW50cnlTdG9yYWdlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzMQogICAgLy8gcHJpdmF0ZSBlbnRyeVN0b3JhZ2UocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBnYXRlZDogYm9vbGVhbik6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzIKICAgIC8vIGlmICghZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGVudHJ5U3RvcmFnZV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgZXJyQmFkTWV0aG9kR2F0ZU5lZWRlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZW50cnlTdG9yYWdlX2FmdGVyX2lmX2Vsc2VANAogICAgYnl0ZWMgNDUgLy8gIkVSUjplcnJCbWduIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJtZ24KCmVudHJ5U3RvcmFnZV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjM2CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIGVyckFscmVhZHlFbnRlcmVkKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzYKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyQWxyZWFkeUVudGVyZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGVudHJ5U3RvcmFnZV9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNTIgLy8gIkVSUjplcnJBZW50IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFlbnQKCmVudHJ5U3RvcmFnZV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGVudHJ5U3RvcmFnZV9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDM2IC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgplbnRyeVN0b3JhZ2VfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZW50cnlTdG9yYWdlX2FmdGVyX2Fzc2VydEAxNQogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmVudHJ5U3RvcmFnZV9hZnRlcl9hc3NlcnRAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjM5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZW50cnlTdG9yYWdlX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAxNiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZW50cnlTdG9yYWdlX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gcmV0dXJuIGNvc3RzLmVudHJpZXMgKyBjb3N0cy5lbnRyaWVzQnlBZGRyZXNzICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBwdXNoaW50IDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDIKICAgIC8vIHJldHVybiBjb3N0cy5lbnRyaWVzICsgY29zdHMuZW50cmllc0J5QWRkcmVzcyArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgaW50YyAxMiAvLyA1MDYwMAogICAgKwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmVjb3JkRW50cnkocGF5bWVudDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgpyZWNvcmRFbnRyeToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDYKICAgIC8vIHByaXZhdGUgcmVjb3JkRW50cnkocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0NwogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cnlDb3VudC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ5CiAgICAvLyBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0OC02NTEKICAgIC8vIHRoaXMuZW50cmllcyhsb2MpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ4CiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIHN3YXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTQKICAgIC8vIGVudHJpZXMgPSBCb3hNYXA8dWludDY0LCBFbnRyeURhdGE+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzIH0pCiAgICBieXRlYyAzNCAvLyAiZSIKICAgIGRpZyAxCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDgtNjUxCiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyB9CiAgICB1bmNvdmVyIDIKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTIKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1MwogICAgLy8gcmVjb3JkUGF5ZXIodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1MwogICAgLy8gcmVjb3JkUGF5ZXIodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFNlbmRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNgogICAgLy8gaWYgKHBheWVyICE9PSBvd25lcikgewogICAgIT0KICAgIGJ6IHJlY29yZEVudHJ5X2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgMAogICAgc2hhMjU2CiAgICBwdXNoYnl0ZXMgIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA3CiAgICAvLyBvcC5Cb3gucHV0KHBheWVyUmVjb3JkS2V5KHJlY29yZCksIHBheWVyLmJ5dGVzKQogICAgZnJhbWVfZGlnIDEKICAgIGJveF9wdXQKCnJlY29yZEVudHJ5X2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGFtb3VudCkKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgc3dhcAogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYW1vdW50KQogICAgdW5jb3ZlciAyCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHVuY292ZXIgMwogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTYKICAgIC8vIGNvbnN0IG5ld1dlaWdodCA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgYW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyAxMyAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyBjb25zdCBuZXdXZWlnaHQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFtb3VudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1NwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ld1dlaWdodAogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgMTMgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1NwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ld1dlaWdodAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18yIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMiAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjU5CiAgICAvLyB0aGlzLmVudHJ5Q291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjAKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjAKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYUltcGwocGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzLCBnYXRlZDogdWludDY0KSAtPiB2b2lkOgplbnRlckFzYUltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg1LTY5MAogICAgLy8gcHJpdmF0ZSBlbnRlckFzYUltcGwoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBnYXRlZDogYm9vbGVhbgogICAgLy8gKTogdm9pZCB7CiAgICBwcm90byA0IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBlcnJOb3RMaXZlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIGJueiBlbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTmxpdiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObGl2CgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCwgZXJyVGlja2V0QXNzZXRBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCwgZXJyVGlja2V0QXNzZXRBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBlbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDY0IC8vICJFUlI6ZXJyVGFhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJUYWFsCgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMuZW50cnlTdG9yYWdlKHBheW1lbnQsIGdhdGVkKSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFtb3VudAogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgZW50cnlTdG9yYWdlCiAgICA9PQogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTUKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBlbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk4CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMAogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gbWluVGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluVGlja2V0cyB9KQogICAgYnl0ZWMgMzIgLy8gIm1pbl90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMAogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID49CiAgICBieiBlbnRlckFzYUltcGxfYm9vbF9mYWxzZUAxMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDIxIC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSB0aGlzLm1pblRpY2tldHMudmFsdWUgJiYgYXNzZXRYZmVyLmFzc2V0QW1vdW50IDw9IHRoaXMubWF4VGlja2V0cy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgPj0KICAgIGJ6IGVudGVyQXNhSW1wbF9ib29sX2ZhbHNlQDEzCiAgICBpbnRjXzEgLy8gMQoKZW50ZXJBc2FJbXBsX2Jvb2xfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk5LTcwMgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gdGhpcy5taW5UaWNrZXRzLnZhbHVlICYmIGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICAvLyAgIGVyckludmFsaWRUcmFuc2ZlcgogICAgLy8gKQogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNAogICAgLy8gdGhpcy5yZWNvcmRFbnRyeShwYXltZW50LCBtYXJrZXRwbGFjZSwgYXNzZXRYZmVyLmFzc2V0QW1vdW50KQogICAgZnJhbWVfZGlnIC00CiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZWNvcmRFbnRyeQogICAgcmV0c3ViCgplbnRlckFzYUltcGxfYm9vbF9mYWxzZUAxMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGVudGVyQXNhSW1wbF9ib29sX21lcmdlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkSW1wbChwYXltZW50OiB1aW50NjQsIGdhdGVkOiB1aW50NjQpIC0+IHZvaWQ6CmFkZEltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI1CiAgICAvLyBwcml2YXRlIGFkZEltcGwocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBnYXRlZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgZXJyTm90TGl2ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogYWRkSW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJObGl2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5saXYKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyVGlja2V0QXNzZXROb3RBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyVGlja2V0QXNzZXROb3RBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDYzIC8vICJFUlI6ZXJyVGFuYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJUYW5hCgphZGRJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczMAogICAgLy8gaWYgKCFnYXRlZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogYWRkSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgZXJyQmFkTWV0aG9kR2F0ZU5lZWRlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzMxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYWRkSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDQ1IC8vICJFUlI6ZXJyQm1nbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbWduCgphZGRJbXBsX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzLCBlcnJFbnRyeURvZXNOb3RFeGlzdCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyRW50cnlEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZGRJbXBsX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNjUgLy8gIkVSUjplcnJFZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckVkbmUKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczNgogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczNgogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczNwogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXQogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzcKICAgIC8vIGNvbnN0IGFtb3VudCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0KICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzkKICAgIC8vIGFzc2VydFNhZmVQYXltZW50KHBheW1lbnQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgPT0KICAgIGJueiBhZGRJbXBsX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyAzNiAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKYWRkSW1wbF9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYWRkSW1wbF9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDM3IC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5CgphZGRJbXBsX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhZGRJbXBsX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTYgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgLSBhbW91bnQuYXNVaW50NjQoKSksIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDIxIC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlIC0gYW1vdW50LmFzVWludDY0KCkpLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGJ0b2kKICAgIC0KICAgIDw9CiAgICBibnogYWRkSW1wbF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDE2IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgphZGRJbXBsX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDQKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIHBheW1lbnQuYW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDMtNzQ1CiAgICAvLyBjb25zdCBuZXdXZWlnaHRzID0gbmV3IFVpbnQ2NCgKICAgIC8vICAgdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgcGF5bWVudC5hbW91bnQKICAgIC8vICkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDYKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXdXZWlnaHRzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBwYXltZW50LmFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgMTMgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBwYXltZW50LmFtb3VudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2Mi0xNjQKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDEzIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQ5CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IHBheW1lbnQuYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gcGF5bWVudC5hbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0OQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBwYXltZW50LmFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmFkZEFzYUltcGwoYXNzZXRYZmVyOiB1aW50NjQsIGdhdGVkOiB1aW50NjQpIC0+IHZvaWQ6CmFkZEFzYUltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyBwcml2YXRlIGFkZEFzYUltcGwoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIGdhdGVkOiBib29sZWFuKTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBlcnJOb3RMaXZlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIGJueiBhZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5saXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmxpdgoKYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwLCBlcnJUaWNrZXRBc3NldEFsZ28pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwLCBlcnJUaWNrZXRBc3NldEFsZ28pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGFkZEFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDY0IC8vICJFUlI6ZXJyVGFhbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJUYWFsCgphZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gaWYgKCFnYXRlZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogYWRkQXNhSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgZXJyQmFkTWV0aG9kR2F0ZU5lZWRlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzc2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYWRkQXNhSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDQ1IC8vICJFUlI6ZXJyQm1nbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbWduCgphZGRBc2FJbXBsX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzLCBlcnJFbnRyeURvZXNOb3RFeGlzdCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyRW50cnlEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNjUgLy8gIkVSUjplcnJFZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckVkbmUKCmFkZEFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXQogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODIKICAgIC8vIGNvbnN0IGFtb3VudCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0KICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODQKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlQXNzZXRUcmFuc2ZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFkZEFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMudGlja2V0QXNzZXQudmFsdWUsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODYKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0ID09PSB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBhZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmFkZEFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlIC0gYW1vdW50LmFzVWludDY0KCkpLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBtYXhUaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXhUaWNrZXRzIH0pCiAgICBieXRlYyAyMSAvLyAibWF4X3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgLSBhbW91bnQuYXNVaW50NjQoKSksIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGJ0b2kKICAgIC0KICAgIDw9CiAgICBibnogYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTAKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyAzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzg5LTc5MQogICAgLy8gY29uc3QgbmV3V2VpZ2h0cyA9IG5ldyBVaW50NjQoCiAgICAvLyAgIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgLy8gKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MgogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ld1dlaWdodHMKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkzCiAgICAvLyBjb25zdCBib3hBbW91bnQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFzc2V0WGZlci5hc3NldEFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgMTMgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5MwogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gYm94QW1vdW50CiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyAxMyAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gYm94QW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5NQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5NQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5NQogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jb21taXREcmF3Um91bmQoKSAtPiB2b2lkOgpjb21taXREcmF3Um91bmQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAwCiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gKEdsb2JhbC5yb3VuZCArIERSQVdfREVMQVlfUk9VTkRTICsgQkVBQ09OX1JPVU5EX0lOVEVSVkFMIC0gMSkgLyBCRUFDT05fUk9VTkRfSU5URVJWQUwgKiBCRUFDT05fUk9VTkRfSU5URVJWQUwKICAgIGdsb2JhbCBSb3VuZAogICAgcHVzaGludCAxNgogICAgKwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGludGNfMiAvLyA4CiAgICAvCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAwCiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gKEdsb2JhbC5yb3VuZCArIERSQVdfREVMQVlfUk9VTkRTICsgQkVBQ09OX1JPVU5EX0lOVEVSVkFMIC0gMSkgLyBCRUFDT05fUk9VTkRfSU5URVJWQUwgKiBCRUFDT05fUk9VTkRfSU5URVJWQUwKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUoKSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzkgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NTMKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID49CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTUzLTk1NAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmVfYm9vbF9mYWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDE5IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1NAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDw9CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTUzLTk1NAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmVfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1Mi05NTUKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZV9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1Mi05NTUKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3Quc2VuZFRvQWtpdGFFc2Nyb3coYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKc2VuZFRvQWtpdGFFc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHByb3RlY3RlZCBzZW5kVG9Ba2l0YUVzY3Jvdyhhc3NldDogQXNzZXQsIGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gaWYgKGFtb3VudCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDgKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MQogICAgLy8gY29uc3QgZXNjcm93ID0gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDI1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTEKICAgIC8vIGNvbnN0IGVzY3JvdyA9IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTMKICAgIC8vIGlmIChhc3NldC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTQKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyOiBlc2Nyb3csIGFtb3VudCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU4CiAgICAvLyBpZiAoZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGR1cAogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTkKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7IGFzc2V0UmVjZWl2ZXI6IGVzY3JvdywgYXNzZXRBbW91bnQ6IGFtb3VudCwgeGZlckFzc2V0OiBhc3NldCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDg6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDI5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxNgogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgNTkgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciAzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDI1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4CiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjQKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgcHVzaGJ5dGVzIDB4M2FiMjg5NWIgLy8gbWV0aG9kICJhcmM1OF9nZXRFc2Nyb3dzKHN0cmluZ1tdKSh1aW50NjQsYWRkcmVzcyxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQxCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PHNtYXJ0X2NvbnRyYWN0cy9hcmM1OC9hY2NvdW50L3R5cGVzLnRzOjpFc2Nyb3dJbmZvPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjcKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIGVyckVzY3Jvd0RvZXNOb3RFeGlzdCkKICAgIGV4dHJhY3QgNiA0MQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOmVyck5lc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmVzYwoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODkKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA9PT0gZXNjcm93LmFwcC5pZCwgZXJyV3JvbmdFc2Nyb3dGb3JPcGVyYXRpb24pCiAgICB1bmNvdmVyIDIKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICA9PQogICAgYm56IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2VzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXZXNjCgpzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgYnl0ZWMgNTcgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNAogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODg1CiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODg3CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNjUKICAgIC8vIGNvbnN0IFtzcGxpdHNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNSZXZlbnVlU3BsaXRzKSkKICAgIGZyYW1lX2RpZyAwCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg4OAogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODkxCiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDEKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgKgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE2LTExOQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMwogICAgLy8gd2FsbGV0LAogICAgc3dhcAogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTUKICAgIC8vIFthc3NldC5pZF0sCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGJ5dGVjIDM1IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIzCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsgYXBwSWQ6IHdhbGxldCB9KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI1CiAgICAvLyBpZiAoYW1vdW50ID4gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjYtMTMyCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0KAogICAgLy8gICBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyApCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyOAogICAgLy8gYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjctMTMxCiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYzCiAgICAvLyByZXR1cm4gdGhpcy5vcHRBa2l0YUVzY3Jvd0luQW5kU2VuZChhc3NldCwgYW1vdW50KQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAOAAEIBoAgoI0Grf7V5NSF/ahY////////////Ac+Cnrvv796CFNGCnrvv796CFP////8P1K+gBqiLA/zpBCZCDHRpY2tldF9hc3NldAlha2l0YV9kYW8LZW50cnlfY291bnQMdGlja2V0X2NvdW50BXByaXplBndpbm5lcg53aW5uaW5nX3RpY2tldAQVH3x1AWENcHJpemVfY2xhaW1lZBF3ZWlnaHRzX2JveF9jb3VudBFyZWZ1bmRfbWJyX2N1cnNvcgZzZWxsZXIId190b3RhbHMMcmFmZmxlX3JvdW5kB2dhdGVfaWQLRVJSOmVycklwYXkBdwttaW5fZW50cmllcw1lbmRfdGltZXN0YW1wD2NyZWF0b3Jfcm95YWx0eQttYXhfdGlja2V0cwtFUlI6ZXJySXhmcgZmYWlsZWQDYWFsDGFraXRhX2VzY3JvdxVtYXJrZXRwbGFjZV9yb3lhbHRpZXMLRVJSOmVyck5saXYBAAZ3YWxsZXQRdnJmX2ZhaWx1cmVfY291bnQMaXNfcHJpemVfYm94C21pbl90aWNrZXRzDWFraXRhX3JveWFsdHkBZQIAAQtFUlI6ZXJyTmNscwtFUlI6ZXJyTnJreQtFUlI6ZXJyTWJmZg9zdGFydF90aW1lc3RhbXALbWFya2V0cGxhY2UTZmluZF93aW5uZXJfY3Vyc29ycwtFUlI6ZXJyUG5jbAtFUlI6ZXJyV25mZAtFUlI6ZXJyTmRhbwtFUlI6ZXJyQm1nbghlbnRyeV9pZAMGgQELRVJSOmVycklwbXMGZnVuZGVyD3NlbGxlcl9yZWZlcnJlcgRzYWx0C0VSUjplcnJBZW50C0VSUjplcnJSZm5jC0VSUjplcnJSaG5lC0VSUjplcnJXYWZkA29hbAIAAAtFUlI6ZXJySXJiZANwYWwSY29udHJvbGxlZF9hZGRyZXNzC0VSUjplcnJJd2x0BWFwcElEC0VSUjplcnJUYW5hC0VSUjplcnJUYWFsC0VSUjplcnJFZG5lMRhAACoqImcrImcnBiJnJwkiZyceImcnLiJnJwoiZycLImcnDiJnJxIiZycXImeCAgQkh8MsBOqRgN02GgCOAgEEAPgxGRREMRhBAOGCGgS9cUjQBFnXBjAE8s4vRgQslCUUBEiDlTwEXFf22ASWJxLxBDqcKqQEOOYkMwRDpT5OBPPhX8sE3FCzVARqbZufBIkDwD8EY7u3NQTrFoG0BGllAd4EvRsn0QRl/KmLBI+koWAESOWc3QSuhMvYBDPpLJQEhU3t4ATZo1+kBD6hGDI2GgCOGgS/BUgFiwbVB/YIKwhWCG8IsAjnCQwJOAlZCWkJlgm4CckMRA2JEEQQVBEFEY8AIgABEbIAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABP3id342GgCOAQIbADEZgQQSMRgQREIQ/jEZgQUSMRgQREIG9IoCAIv+gQoISTIMDUEAKbElshCBBbIZJy+yHicvsh+L/40CAAsABLNC/90yALIBQv/1IrIBQv/viYoBAYv/gRKRi/8bgRuRIQoai/+BO5FKkUwcIx5FAYEfGk8CTJAhChoZiYoCAIv+OACL/xJAAAQnMLAAi/44EzIDEkAAD4ALRVJSOmVyck5jbHewAIv+OBUyAxJAAAQnJLAAi/44IDIDEkAABCclsACJiggCgAAii/lAAAWL/kABRCNEi/gnGGVIJFuL/CJZgdTFAQuB5KkDCEyL+UAAXLFJcghESwKL/QiyCLIHI7IQIrIBtov6Fov7Fk8CshiABNysCTWyGkyyGrIai/yyGov/sholshAisgGztD5JVwQATFcABCcHEkRJFSQSRBdMTBZMFlCL/E8DTwOJSXIIRIv5cABFAUEAiksBSwFyCExOBEQijACL/kEACksBcghEI4wAjAGxSwFyCERPA7IIsgcjshAisgG2iwBBAASLAbIVi/myEYv9shJPArIUgQSyECKyAbaL+haL+xZPA7IYgASjoWyqshpMshqyGov8shqL/7IaJbIQIrIBs7Q+SVcEAExXAAQnBxJESRUkEkQXTEL/XUsBMhAIsUsBSXIIRDIQsgiyByOyECKyAbaL+RZMshiABDlOrrKyGrIaJbIQIrIBs0L/RSJC/rk2GgFJFSQSRBc2GgJJFSMSRCJTNhoDSRUkEkQXTDYaBEkVJBJEF0w2GgVJFSQSRBc2GgZJTgMVgSASRDYaB0lOAxWBKBJENhoISRUkEkQXTgI2GglJFSQSRBc2GgpJFSQSRBdMNhoLSRUkEkQXTgM2GgxJFSQSRBdOAzYaDUlOBBWBIBJENhoOSRUkEkQXTgY2Gg9JFUsBIllJgSISRE8CTEsCUklOCEkVSwEiWUmBChJETFIiWYEuCBJENhoPSRVLASJZSYEiEkRLAkxLAlJJFUsBIllJgQoSRExSIlmBLggSRFcCIDINQAAEJyawACcESxBnJx9LCmdLDkEAF0sOcQBEQAAPgAtFUlI6ZXJySWFzdLAAKEsPZycnTw5JTgJnSwQMQQFISwMyBw1BAUAjQAAPgAtFUlI6ZXJySWVucrAAJxNPBGcnDE8MZycxTwtnJxRPCmdLAkEBEEsCSwIPQQEII0AAD4ALRVJSOmVyckl0YmSwAE8IQAAISwlLCRNBAOQjQAAPgAtFUlI6ZXJyUGl0YbAAJyBPAmcnFU8CZycSTwRnJwUyA2cnD08DZycoTwJnJzJMZylPAmcnGUxnIillRIAIbmZ0X2ZlZXNlSEmBcFsnGkxnIillRCInDGVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIaJbIQIrIBs7Q+SVcEAExXAAQnBxJESRUkEkQXSU4CSwGBYFtOAkyBaFtMIw1BADhPAiMJTElPAwlPAguB6AcKCSchTGeBeK8nDUxnJzMxF2cnKYAQAAAAAAAAAAAAAAAAAAAAAWcjQ08CSCNC/8UiQv8ZIkL+9SJC/r0xFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAAQnJrAASYEED0AAD4ALRVJSOmVyck1hbGawAEmBEAxAAA+AC0VSUjplcnJNYW1msABJIQsLSwI4BzIKEkAABCcQsABPAjgIEkAABCcQsAAnCksBZyJJSwIMQQARSRYnEUxQgYCAArlIIwhC/+gjQzYaAUkVJBJEFzEAIicMZUQSQAAPgAtFUlI6ZXJyTnNscrAAIiplREEABCc0sAAyByInE2VEDkAABCcbsAAnEkxnI0MigABHAjYaAUkVJBJEFyInCWVEQAAEJyqwACInBWVEMgMTQAAEJyuwACIqZUQiJwtlRBNAAA+AC0VSUjplcnJBcmZjsAAiJwtlTElOAk4DRCIqZURLAQlJTwNJTgMNTE4CTUlOAoHIAQsiiPpSSwJLAghLAQ1BAMVJFiciTFBJTgO+RFcAIE4CIkUIIicXZURBABtHAiEEChYnEUxQTCEEGCQLJLoXSwNMiA96RQhPA7xIJwhLA1BJvEgBgAEkTFBJTgO+TE4CQABERQFPAkghDBZPA0xQSVcAIEUIgSBbSUUGSwYNQQAhSwRLBglJRQVLB0yIDtZBABCxSwayB0sDsggjshAisgGzIwhC/19PA7xISwFzAEUBQAAIIQ0yAQ9BABYjQQALTwNITCENFlBC/6RFAU8CQv/yIkL/50giJwtlRAgnC0xnI0MiJwllREAABCcqsAAiKmVEIicLZUQSQAAEJzWwACIiJwplREsBDUEAFiInCmVEIwlLAQkWJxFMULxIIwhC/98iJwplRCELC7EiJzFlRFcAIEsBsgiyByOyECKyAbMnCiJnFicHTFCwI0MxADIJEkAABCcmsAAiJwllREAABCcqsAAiKmVEIicLZUQSQAAEJzWwACInCmVEQQAPgAtFUlI6ZXJyU2h3YrAAIihlREEALTIKIihlRHAARQFBACAyCSIoZURwAEUBQQBNMgmxIihlRLIRshWBBLIQIrIBsyInH2VEQAAkMgoiJwRlRHAARQFBABaxIicEZURJcQtEshWyEYEEshAisgGzsTIJsgkjshAisgGzI0MiKGVEcQtEQv+rMRaBAglJOBAlEkQxFiMJSTgQIxJENhoBSRWBIBJENhoCSRUkEkQXTwMiTwKICf0jiA5cI0MxFoECCUk4ECUSRDEWIwlJOBAjEkQ2GgFJFYEgEkRPAiMiiAnSI4gOMSNDMRYjCUk4ECMSRDYaAUkVgSASRCKIDhgjQzEWgQMJSTgQJRJEMRaBAglJOBAjEkQxFiMJSTgQgQQSRDYaAUkVgSASRDYaAkkVJBJEF08EIk8CiAl4I4gPDCNDMRaBAwlJOBAlEkQxFoECCUk4ECMSRDEWIwlJOBCBBBJENhoBSRWBIBJETwMjIogJQSOIDtUjQzEWgQIJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFYEgEkQiiA6wI0MxFoECCUk4ECUSRDEWIwlJOBAjEkQ2GgFJFSQSRBdPAiJPAogI8COIDwMjQzEWgQIJSTgQJRJEMRYjCUk4ECMSREwjIogIzyOIDuIjQzEWIwlJOBAjEkQiiA7SI0MxFoECCUk4ECUSRDEWIwlJOBCBBBJENhoBSRUkEkQXTwIiTwKICJIjiA98I0MxFoECCUk4ECUSRDEWIwlJOBCBBBJETCMiiAhwI4gPWiNDMRYjCUk4EIEEEkQiiA9JI0MyByInE2VEDUAABCc2sAAiJwZlREEAD4ALRVJSOmVycldhZHKwACInBWVEMgMSQAAEJzewACInDmVEQABFIicSZURBADkiJxJlRCIqZUQNQAAHIitlREAADycXI2ciJwxlRCcFTGcjQyIrZUQjEkEABycGI2dC/+6ID5BC/+gjQv/IMgYiJw5lRIEECA9AAA+AC0VSUjplcnJOZXRtsACxIicOZUQWIiczZURJFRZXBgJMUCIpZUQnOGVIIluyGIAEGJOSxbIaTLIasholshAisgGztD5JVwQASwFXAAQnBxJESSJZgQIITBUSRFcGAEkVSUAAMUYCMgYiJw5lRIHoBwgPQAAPgAtFUlI6ZXJyQm5yZLAAIiceZUQjCCceTGeIDuhC/0AiSwEPIksCTwJNgRBLAg+BEE8DTwJNUkkVgRASQAAPgAtFUlI6ZXJySXJzZLAASSJbIiEGHUUBSSEIHkUBTwIeRQEhBh1FASEIHk4CSE8CJFtMIQkeRQEeRQEhBh1FASEJHkUBTBZMFlAiK2VMSU8CRCEHDEEAAiMIJzlOAklBAM5JIw1AAAQnOrAAIwlJIw1AAAQnOrAARwIcIx5FAUwYTgMiTE8CSwIjDEEAgkkiW0lOBSEGHUUBIQgeSU4CTgZITCRbTEAAYoGihbz23t+9hShMSSEGHUUBTwIeRQFPBRZMFlBPBYj0q4EgkE8CiPSjGRZQSVcAEE4EgRBbSUsGD0EAIEsBGCMIFk8DSSJZIwgWVwYAXABMUE4CTCMITE8DQv+CSE8DQv+DIQlC/6NFAUUBTwJIgAIAElBMUEmBEFlLARVSgQJbJwZMZ0L98UghB0L/QoAARwQ2GgFJFSQSRBcyByInE2VEDUAABCc2sAAiJwZlREAAD4ALRVJSOmVyck53dHmwACInBWVEMgMSQAAEJzewACInKWVESSJbTCRbRQZJIQQYQAA1SSEECklFBCInCmVEDEEAJSInDWVESwMkC1siJwZlREsHTwIISUUHDEAACiEECEsERQZC/8QWSwUWUEkiW0lPAiRbRQciKmVEDEAABCcrsAAiKmVESwFJTgIJSUsESU4DDUxOAk1JRQRMIQQYSUUJIQRMCUlFBg1BAARLA0UCSSEEChYnEUxQTEsCgSgLIojzHyJMSwFLBAxBAEZLCEsCCCQLSwNMJLoXSwhJTwIITCInBmVEDkEAHiInBmVESwEMQQATSwFLAwgWJyJMUL5EVwAgJwVMZ08CIwhOAkUIQv+ySwMIFksHFlAnKUxnI0OAAEcGIicFZUQyAxNAAAQnK7AAIicJZURBAA+AC0VSUjplcnJQYWNssAAiJxdlREEADiInDGVEiAhAJwkjZyNDIicFZUSICDIiK2VEIicfZUxJTgJFCEQiRQhAAC0iJxRlREEAJSInFGVESSEFDkRLAR0hBZdJRQhAAA8iJxRlREEAB0lBAAMjRQciRQgiJyFlREEAHSInIWVESSEFDkRLAR0hBZdJRQlAAAdJQQADI0UIIkUFIicaZURBACUiJxplREkhBQ5ESwEdIQWXSUUGQAAPIicaZURBAAdJQQADI0UFSwZLCAiBAksGCwhLAQ1BAERLBUABvSInFGVEQQG1IicUZURJIQUOREsBHSEFl0UHIichZURJIQUOREsBSU8CHSEFl0UJIicaZURJIQUORB0hBZdFBUsGSUsJSU4DCIECSwhJTgULCE8ETAlMFk8CFlBPAhZQTBZQSSInBWVEJwhMUL5EFxYnIkxQvkRXICBOAiRbSUEAkCIpZUxOBEQiJzJlTE4DRCIoZUxOBkQiJxllRIECW3IITE4GRElBAQFLAjIDE0EA+UsEgAt3YWxsZXRfZmVlc2VIJFtJIQUOREsBHSEFl0lFC0AAB0lBAAMjRQoyB0mBgJqeAQhLC0lOAhZPBkxQJyNMUE8HTwlPBU8ETwRLBSJPC4jxbkhXCAhOAgkWTFAiWyIoZURAAElLASJbSUUGQQANIicEZURxC0RLBYgFviIoZURMiApGSCInKGVESwGBEFtMSwGIBaVPAkyIBZ8iJwxlREyBGFuIBZMnCSNnQv3lSwEiW0lFBUEADiInBGVEcQtESwSIBbhIIihlREyICfxIIicoZURLAYEQW0xLAYgFnkhPAkyIBZdIIicMZURMgRhbiAWKSEL/sE8CSE8DSE8DSE8DSBYiFlBC/1IiRQdC/leICZ0nHCJPAlQnB0xQsCNDIihlRCInJ2VEIicTZUQiJwxlRCInIGVEIicVZUQiKmVEIitlRCInBmVEIicFZUQiJwRlRCInCWVEIicPZUQiJx5lRCInLmVEIicLZUQiJxJlRCInF2VEIicOZURPEhZPEhZQTxEWUE8QUE8PFlBPDhZQTw0WUE8MFlBPCxZQTwpQTwkWUCccIk8KVFBPBxZQTwYWUE8FFlBPBBZQTwMWUCccIk8EVFBMFlAnB0xQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIillRCcdZUhyCEQSQAAEJyywACcZTGcjQzYaAUkiWYECCEsBFRJEVwIAMQAiKWVEJx1lSHIIRBJAAAQnLLAAIillRCc7ZUiBEFsyDRJAAA+AC0VSUjplcnJJdXBnsACAB3ZlcnNpb25MZyNDNhoBSRUkEkQXMQAiKWVEJx1lSHIIRBJAAAQnLLAAKUxnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAA+AC0VSUjplcnJGb3JisABLATgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATDgIMhASQAAPgAtFUlI6ZXJySXBtYbAAsTIKTLIRIrISshSBBLIQIrIBsyNDigMAIkcEgABHAov+QQFOIillTElPAkQxAEsBJzhlSIEYW08CJxhlSIFYW4wGsbIYgAQ8Gm8zshqyGiWyECKyAbO0PklXBABLAVcABCcHEkRJIlmBAghMFRJEVwYASRUkE0EAwUgijAcxAIsHQABpjAAiJw9lTIwFRIv9OBhMJxhlSIEoWxJBAEuL/TgZQABEi/04G4EEEkEAOov9ORoAgARDkiZVEkEAK4v9ORoBiwASQQAgi/05GgKLBRYSQQAUI0AAD4ALRVJSOmVyckZndGWwAIkiQv/piwcnPGVMTgJBAD5LARWBIBJBADUjQAAEJz2wAIsHcghESwITQQAcSwExABNBABRLAXMCRIsHcghEE0EABowASEL/VkiMAEL/UCJC/8gXSYz/QQAFiwZAAAwiIov/TwJNjAdC/yuL/3IHTIwCQQASiwYWJz5MUAOLAhJBAAQjQv/ZIkL/1SIpZUxJTwJEJxhlSIFYW4wGMQAyDTIOjAGL/0AAgkgyA0kiFk8DSU4CUE8DUExQTFAnHFBJVwggSwFXAAhPAldIIE4CUExQjAMiJw9lTIwFRIv9OBhMJxhlSIEoWxJBADuL/TgZQAA0i/04G4EEEkEAKov9ORoAgASbFH0sEkEAG4v9ORoBiwMSQQAQi/05GgKLBRYSQQAEI0L+yCJC/sSL/0EABYsGQAEOIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMBEEAGIsEFYEgEkEAD4sESwESQQAHSYsBE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nPGVBAAhJFYEgEkAABCc9sABJSwISQQBQI0yL/4AIcmVmZXJyZXJlQQA2SRWBIBJBAC5OA0sCSwFPA0lOA01MQQAXTIv/Fk8CUExQTFBMUCccIk8DVFBC/rlFATIDQv/jSDIDTgNC/8yL/3IITE4CQAAHRQEiTEL/oUlLAhJBAAtMcwJIMgMSTEL/j0lzAkhPAhJMQv+Ei/9yB0yMAkEAEosGFic+TFADiwISQQAEI0L+1yJC/tOKAgGL/nMASEAACIv/MgEPQQACI4kiiYoCAIv/QAABiSIoZURAABuL/ov/iP/SQQAQsYv/sgiL/rIHI7IQIrIBs4mxIihlRLIRi/+yEov+shSBBLIQIrIBs4mKAgGL/0AAAiKJIihlREEADiIoZUSL/kxwAEUBQQAJi/6L/4j/lyKJIillRCIoZUSL/xaL/kxQJyNMUDIDTwNPAyIhB08Fi/8iTweI6vVIJFuJigEAIicfZURBAByxIicEZUSyGIAErfkq5LIai/+yGiWyECKyAbOJMgoiJwRlRExLAXAASEyL/0xwAEUBQQAWSLEiJwRlRLIRi/+yFYEEshAisgGziSIpZUQiJwRlRE8CSU4CFov/TFAnI0xQMgNPBE8DIiEHTwVPBiNPB4jqckYCiYoDAIgDWUAABCcbsAAiKGVEQQAEJz+wAIv9i/+IADhJi/04CElPAiInIGVECA9BACIiJxVlREsCCEsBD0EAFCNAAAQnELAATAmL/Yv+TwKIAGWJIkL/6YoCAYv/QAAMIicPZURBAAQnLbAAJwgxAFC9RQFBAAQnNLAAi/44CTIDEkAABCcksACL/jggMgMSQAAEJyWwAIv+OAcyChJAAAQnELAAi/44ADEAEoHU3gEiTwJNIQwIiYoDACIqZUxJTwJEMQCL/lBMFiciSwFQTwK/JwgxAFBMvycIMQBQTIv9OABJTgIxABNBAAuLAAGAASRMUIsBv4v/FkxJIQQKSRYnEUxQTwIhBBgkC08DuyInDWVETCQLSluL/wgWXScNTGciKmVEIwgqTGciK2VEi/8IK0xniYoEAIgCJEAABCcbsAAiKGVEQAAEJ0CwAIv8OAiL/Iv/iP7/EkAABCcQsACL/TEAiOjBi/04FDIKEkAABCcWsACL/TgRIihlRBJAAAQnFrAAi/04EkkiJyBlRA9BAB0iJxVlREsBD0EAEiNAAAQnFrAAi/yL/k8CiP8IiSJC/+uKAgCIAaVAAAQnG7AAIihlREEABCc/sACL/0AADCInD2VEQQAEJy2wACcIMQBQvUUBQAAEJ0GwACcIMQBQvkQXSSEECklOAhYnEUxQSU8CIQQYJAtJTgIkujEAi/44ABJAAAQnMLAAi/44CTIDEkAABCcksACL/jggMgMSQAAEJyWwAIv+OAcyChJAAAQnELAAi/44CEkiJxVlRE8DFwkOQAAEJxCwAE8CSU8DSU4DJLoXSwMIFkxOArsiJw1lRE8CJAtKW0sDCBZdJw1MZyIrZUQIK0xniYoCAIgAzkAABCcbsAAiKGVEQAAEJ0CwAIv/QAAMIicPZURBAAQnLbAAJwgxAFC9RQFAAAQnQbAAJwgxAFC+RBdJIQQKSU4CFicRTFBJTwIhBBgkC0lOAiS6i/4xAIjnPYv+OBQyChJAAAQnFrAAi/44ESIoZUQSQAAEJxawAIv+OBJJIicVZURPAxcJDkAABCcWsABPAklPA0lOAyS6F0sDCBZMTgK7IicNZURPAiQLSltLAwgWXScNTGciK2VECCtMZ4kyBoEQCCMJJAokCycOTGeJMgciJydlRA9BAA0yByInE2VEDkEAAiOJIomKAgGAAEcCi/9AAAQijACJIicZZUSBAltyCESL/kAAErGL/7IIsgcjshAisgGzIowAiUmL/nAARQFBABexi/6yEYv/shKyFIEEshAisgGzIowAiUgiKWVESScdZUhMSSc7ZUhJVwgITgMkW04DIicZZUxJTgJOA0RJIllLARVSSU4DVwIATCcdZUhMsSMWTgJJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGiWyECKyAbO0PklXBABLAVcABCcHEkRJIlmBKQuBAghMFRJEVwYpIltJQAAPgAtFUlI6ZXJyTmVzY7AATwKBAltJjAISQAAPgAtFUlI6ZXJyV2VzY7AAsUsCshiABFrfM4+yGk8DshqyGrIagAoAAQAAAAAAAAAAshonObIaJbIQIrIBIillTIwARIsCcghEIowBi/5wAEUBQAAaiwCADnJldmVudWVfc3BsaXRzZUgiWSMIjAEyEIsBC0m2iwJyCESyB7III7IQIrIBtkxJFov+FicjTFBPBLIYgARoNeO8shpMshqAAYCyGrIaJbIQIrIBtrIYgARsw/YGsholshAisgGL/0EAF7aLAnIIRIv+shGL/7ISshSBBLIQIrIBs4wAiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue = class {
  constructor(value) {
    this.value = value;
  }
  
  asByteArray() {
    return this.value;
  }
  asString() {
    return this.value !== void 0 ? Buffer.from(this.value).toString("utf-8") : void 0;
  }
};
var RaffleParamsFactory = class _RaffleParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void":
            return _RaffleParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Raffle smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.isPrizeBox, params.args.ticketAsset, params.args.startTimestamp, params.args.endTimestamp, params.args.seller, params.args.funder, params.args.creatorRoyalty, params.args.minTickets, params.args.maxTickets, params.args.minEntries, params.args.gateId, params.args.marketplace, params.args.akitaDao, params.args.akitaDaoEscrow, params.args.sellerReferrer]
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
            return _RaffleParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Raffle smart contract using the update(string)void ABI method
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
          case "deleteApplication":
          case "deleteApplication()void":
            return _RaffleParamsFactory.delete.deleteApplication(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the Raffle smart contract using the deleteApplication()void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      deleteApplication(params) {
        return {
          ...params,
          method: "deleteApplication()void",
          args: Array.isArray(params.args) ? params.args : []
        };
      }
    };
  }
  /**
   * Constructs a no op call for the init(pay,uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static init(params) {
    return {
      ...params,
      method: "init(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.weightListLength]
    };
  }
  /**
     * Constructs a no op call for the setMinEntries(uint64)void ABI method
     *
    * AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.
    Only before anyone has entered, and before the end. Below the minimum the raffle fails:
    the prize returns to the seller and every entrant is refunded.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static setMinEntries(params) {
    return {
      ...params,
      method: "setMinEntries(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.minEntries]
    };
  }
  /**
   * Constructs a no op call for the refundMBR(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static refundMbr(params) {
    return {
      ...params,
      method: "refundMBR(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.iterationAmount]
    };
  }
  /**
   * Constructs a no op call for the clearWeightsBoxes()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static clearWeightsBoxes(params) {
    return {
      ...params,
      method: "clearWeightsBoxes()uint64",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
     * Constructs a no op call for the gatedEnter(appl,pay,address,uint64)void ABI method
     *
    * Gated entry (principal ABI, spec §6.8): the gate subject is the verified context of the
    entrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.
    Entries stay keyed by `Txn.sender`.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedEnterApplPayAddressUint64Void(params) {
    return {
      ...params,
      method: "gatedEnter(appl,pay,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.payment, params.args.marketplace, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedEnter(appl,pay,address)void ABI method
   *
   * LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEnterApplPayAddressVoid(params) {
    return {
      ...params,
      method: "gatedEnter(appl,pay,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.payment, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the enter(pay,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static enter(params) {
    return {
      ...params,
      method: "enter(pay,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the gatedEnterAsa(appl,pay,axfer,address,uint64)void ABI method
   *
   * ASA twin of `gatedEnter` (principal ABI, spec §6.8).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEnterAsaApplPayAxferAddressUint64Void(params) {
    return {
      ...params,
      method: "gatedEnterAsa(appl,pay,axfer,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.payment, params.args.assetXfer, params.args.marketplace, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedEnterAsa(appl,pay,axfer,address)void ABI method
   *
   * LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedEnterAsaApplPayAxferAddressVoid(params) {
    return {
      ...params,
      method: "gatedEnterAsa(appl,pay,axfer,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.payment, params.args.assetXfer, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the enterAsa(pay,axfer,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static enterAsa(params) {
    return {
      ...params,
      method: "enterAsa(pay,axfer,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the gatedAdd(appl,pay,uint64)void ABI method
   *
   * Gated ticket top-up (principal ABI, spec §6.8).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedAddApplPayUint64Void(params) {
    return {
      ...params,
      method: "gatedAdd(appl,pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.payment, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedAdd(appl,pay)void ABI method
   *
   * LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedAddApplPayVoid(params) {
    return {
      ...params,
      method: "gatedAdd(appl,pay)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.payment]
    };
  }
  /**
   * Constructs a no op call for the add(pay)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static add(params) {
    return {
      ...params,
      method: "add(pay)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment]
    };
  }
  /**
   * Constructs a no op call for the gatedAddAsa(appl,axfer,uint64)void ABI method
   *
   * ASA twin of `gatedAdd` (principal ABI, spec §6.8).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedAddAsaApplAxferUint64Void(params) {
    return {
      ...params,
      method: "gatedAddAsa(appl,axfer,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.assetXfer, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedAddAsa(appl,axfer)void ABI method
   *
   * LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedAddAsaApplAxferVoid(params) {
    return {
      ...params,
      method: "gatedAddAsa(appl,axfer)void",
      args: Array.isArray(params.args) ? params.args : [params.args.gateTxn, params.args.assetXfer]
    };
  }
  /**
   * Constructs a no op call for the addAsa(axfer)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static addAsa(params) {
    return {
      ...params,
      method: "addAsa(axfer)void",
      args: Array.isArray(params.args) ? params.args : [params.args.assetXfer]
    };
  }
  /**
     * Constructs a no op call for the raffle()void ABI method
     *
    * Draw, commit-reveal (AR-01):
    - first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a
     beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
    - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
    - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
     BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static raffle(params) {
    return {
      ...params,
      method: "raffle()void",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the findWinner(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static findWinner(params) {
    return {
      ...params,
      method: "findWinner(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.iterationAmount]
    };
  }
  /**
   * Constructs a no op call for the claimRafflePrize()void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static claimRafflePrize(params) {
    return {
      ...params,
      method: "claimRafflePrize()void",
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
   * Constructs a no op call for the getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getState(params) {
    return {
      ...params,
      method: "getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)",
      args: Array.isArray(params.args) ? params.args : []
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
  /**
   * Constructs a no op call for the mbr()(uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr()(uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
  /**
   * Constructs a no op call for the optin(pay,uint64)void ABI method
   *
   * optin tells the contract to opt into an asa
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static optin(params) {
    return {
      ...params,
      method: "optin(pay,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.asset]
    };
  }
};
var RaffleFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `RaffleFactory`
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
    return new RaffleClient(this.appFactory.getAppClientById(params));
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
    return new RaffleClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Raffle smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b, _c;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? RaffleParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? RaffleParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0,
      deleteParams: ((_c = params.deleteParams) == null ? void 0 : _c.method) ? RaffleParamsFactory.delete._resolveByMethod(params.deleteParams) : params.deleteParams ? params.deleteParams : void 0
    });
    return { result: result.result, appClient: new RaffleClient(result.appClient) };
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
       * Creates a new instance of the Raffle smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(RaffleParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Raffle smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(RaffleParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available deployDelete methods
     */
    deployDelete: {
      /**
       * Deletes an existing instance of the Raffle smart contract using the deleteApplication()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      deleteApplication: (params = { args: [] }) => {
        return this.appFactory.params.deployDelete(RaffleParamsFactory.delete.deleteApplication(params));
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
       * Creates a new instance of the Raffle smart contract using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(RaffleParamsFactory.create.create(params));
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
       * Creates a new instance of the Raffle smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,address,(address,uint64),uint64,uint64,uint64,uint64,uint64,address,uint64,(string,uint64),address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(RaffleParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new RaffleClient(result.appClient) };
      }
    }
  }}
}, _class);
var RaffleClient = (_class2 = class _RaffleClient {
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
   * Returns a new `RaffleClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _RaffleClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `RaffleClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _RaffleClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the Raffle smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(RaffleParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Raffle smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      deleteApplication: (params = { args: [] }) => {
        return this.appClient.params.delete(RaffleParamsFactory.delete.deleteApplication(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Raffle smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Raffle smart contract using the `init(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    init: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.init(params));
    },
    /**
         * Makes a call to the Raffle smart contract using the `setMinEntries(uint64)void` ABI method.
         *
        * AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.
        Only before anyone has entered, and before the end. Below the minimum the raffle fails:
        the prize returns to the seller and every entrant is refunded.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    setMinEntries: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.setMinEntries(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `refundMBR(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    refundMbr: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.refundMbr(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `clearWeightsBoxes()uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    clearWeightsBoxes: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.clearWeightsBoxes(params));
    },
    /**
         * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address,uint64)void` ABI method.
         *
        * Gated entry (principal ABI, spec §6.8): the gate subject is the verified context of the
        entrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.
        Entries stay keyed by `Txn.sender`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedEnterApplPayAddressUint64Void: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedEnterApplPayAddressUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address)void` ABI method.
     *
     * LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEnterApplPayAddressVoid: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedEnterApplPayAddressVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `enter(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    enter: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.enter(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address,uint64)void` ABI method.
     *
     * ASA twin of `gatedEnter` (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEnterAsaApplPayAxferAddressUint64Void: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedEnterAsaApplPayAxferAddressUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address)void` ABI method.
     *
     * LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedEnterAsaApplPayAxferAddressVoid: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedEnterAsaApplPayAxferAddressVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `enterAsa(pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    enterAsa: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.enterAsa(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay,uint64)void` ABI method.
     *
     * Gated ticket top-up (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedAddApplPayUint64Void: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedAddApplPayUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay)void` ABI method.
     *
     * LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedAddApplPayVoid: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedAddApplPayVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `add(pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    add: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.add(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer,uint64)void` ABI method.
     *
     * ASA twin of `gatedAdd` (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedAddAsaApplAxferUint64Void: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedAddAsaApplAxferUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer)void` ABI method.
     *
     * LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedAddAsaApplAxferVoid: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.gatedAddAsaApplAxferVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `addAsa(axfer)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    addAsa: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.addAsa(params));
    },
    /**
         * Makes a call to the Raffle smart contract using the `raffle()void` ABI method.
         *
        * Draw, commit-reveal (AR-01):
        - first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a
         beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
        - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
        - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
         BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    raffle: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.raffle(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `findWinner(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    findWinner: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.findWinner(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `claimRafflePrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    claimRafflePrize: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.claimRafflePrize(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `isLive()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean of whether the auction is live
     */
    isLive: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.isLive(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getState: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.getState(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optin: (params) => {
      return this.appClient.params.call(RaffleParamsFactory.optin(params));
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
       * Updates an existing instance of the Raffle smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(RaffleParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Raffle smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      deleteApplication: (params = { args: [] }) => {
        return this.appClient.createTransaction.delete(RaffleParamsFactory.delete.deleteApplication(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Raffle smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Raffle smart contract using the `init(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    init: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.init(params));
    },
    /**
         * Makes a call to the Raffle smart contract using the `setMinEntries(uint64)void` ABI method.
         *
        * AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.
        Only before anyone has entered, and before the end. Below the minimum the raffle fails:
        the prize returns to the seller and every entrant is refunded.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    setMinEntries: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.setMinEntries(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `refundMBR(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    refundMbr: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.refundMbr(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `clearWeightsBoxes()uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    clearWeightsBoxes: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.clearWeightsBoxes(params));
    },
    /**
         * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address,uint64)void` ABI method.
         *
        * Gated entry (principal ABI, spec §6.8): the gate subject is the verified context of the
        entrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.
        Entries stay keyed by `Txn.sender`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedEnterApplPayAddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedEnterApplPayAddressUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address)void` ABI method.
     *
     * LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEnterApplPayAddressVoid: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedEnterApplPayAddressVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `enter(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    enter: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.enter(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address,uint64)void` ABI method.
     *
     * ASA twin of `gatedEnter` (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEnterAsaApplPayAxferAddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedEnterAsaApplPayAxferAddressUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address)void` ABI method.
     *
     * LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedEnterAsaApplPayAxferAddressVoid: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedEnterAsaApplPayAxferAddressVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `enterAsa(pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    enterAsa: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.enterAsa(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay,uint64)void` ABI method.
     *
     * Gated ticket top-up (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedAddApplPayUint64Void: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedAddApplPayUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay)void` ABI method.
     *
     * LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedAddApplPayVoid: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedAddApplPayVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `add(pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    add: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.add(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer,uint64)void` ABI method.
     *
     * ASA twin of `gatedAdd` (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedAddAsaApplAxferUint64Void: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedAddAsaApplAxferUint64Void(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer)void` ABI method.
     *
     * LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedAddAsaApplAxferVoid: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.gatedAddAsaApplAxferVoid(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `addAsa(axfer)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    addAsa: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.addAsa(params));
    },
    /**
         * Makes a call to the Raffle smart contract using the `raffle()void` ABI method.
         *
        * Draw, commit-reveal (AR-01):
        - first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a
         beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
        - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
        - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
         BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    raffle: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.raffle(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `findWinner(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    findWinner: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.findWinner(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `claimRafflePrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    claimRafflePrize: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.claimRafflePrize(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `isLive()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean of whether the auction is live
     */
    isLive: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.isLive(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getState: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.getState(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.mbr(params));
    },
    /**
     * Makes a call to the Raffle smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optin: (params) => {
      return this.appClient.createTransaction.call(RaffleParamsFactory.optin(params));
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
       * Updates an existing instance of the Raffle smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(RaffleParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Raffle smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      deleteApplication: async (params = { args: [] }) => {
        const result = await this.appClient.send.delete(RaffleParamsFactory.delete.deleteApplication(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Raffle smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Raffle smart contract using the `init(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    init: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.init(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Raffle smart contract using the `setMinEntries(uint64)void` ABI method.
         *
        * AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.
        Only before anyone has entered, and before the end. Below the minimum the raffle fails:
        the prize returns to the seller and every entrant is refunded.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    setMinEntries: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.setMinEntries(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `refundMBR(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    refundMbr: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.refundMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `clearWeightsBoxes()uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    clearWeightsBoxes: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.clearWeightsBoxes(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address,uint64)void` ABI method.
         *
        * Gated entry (principal ABI, spec §6.8): the gate subject is the verified context of the
        entrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.
        Entries stay keyed by `Txn.sender`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedEnterApplPayAddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedEnterApplPayAddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnter(appl,pay,address)void` ABI method.
     *
     * LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEnterApplPayAddressVoid: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedEnterApplPayAddressVoid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `enter(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    enter: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.enter(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address,uint64)void` ABI method.
     *
     * ASA twin of `gatedEnter` (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEnterAsaApplPayAxferAddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedEnterAsaApplPayAxferAddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedEnterAsa(appl,pay,axfer,address)void` ABI method.
     *
     * LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedEnterAsaApplPayAxferAddressVoid: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedEnterAsaApplPayAxferAddressVoid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `enterAsa(pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    enterAsa: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.enterAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay,uint64)void` ABI method.
     *
     * Gated ticket top-up (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedAddApplPayUint64Void: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedAddApplPayUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAdd(appl,pay)void` ABI method.
     *
     * LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedAddApplPayVoid: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedAddApplPayVoid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `add(pay)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    add: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.add(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer,uint64)void` ABI method.
     *
     * ASA twin of `gatedAdd` (principal ABI, spec §6.8).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedAddAsaApplAxferUint64Void: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedAddAsaApplAxferUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `gatedAddAsa(appl,axfer)void` ABI method.
     *
     * LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedAddAsaApplAxferVoid: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.gatedAddAsaApplAxferVoid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `addAsa(axfer)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    addAsa: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.addAsa(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Raffle smart contract using the `raffle()void` ABI method.
         *
        * Draw, commit-reveal (AR-01):
        - first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a
         beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
        - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
        - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
         BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    raffle: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.raffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `findWinner(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    findWinner: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.findWinner(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `claimRafflePrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    claimRafflePrize: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.claimRafflePrize(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `isLive()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean of whether the auction is live
     */
    isLive: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.isLive(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getState: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.getState(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.mbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Raffle smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optin: async (params) => {
      const result = await this.appClient.send.call(RaffleParamsFactory.optin(params));
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
    return new _RaffleClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Raffle smart contract using the `isLive()bool` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: a boolean of whether the auction is live
   */
  async isLive(params = { args: [] }) {
    const result = await this.appClient.send.call(RaffleParamsFactory.isLive(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Raffle smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mbr(params = { args: [] }) {
    const result = await this.appClient.send.call(RaffleParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Raffle app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current Raffle app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          ticketAsset: result.ticketAsset,
          startTimestamp: result.startTimestamp,
          endTimestamp: result.endTimestamp,
          seller: result.seller,
          minTickets: result.minTickets,
          maxTickets: result.maxTickets,
          entryCount: result.entryCount,
          ticketCount: result.ticketCount,
          winningTicket: result.winningTicket,
          winner: result.winner,
          prize: result.prize,
          isPrizeBox: result.isPrizeBox,
          prizeClaimed: result.prizeClaimed,
          creatorRoyalty: result.creatorRoyalty,
          gateId: result.gateID,
          marketplace: result.marketplace,
          marketplaceRoyalties: result.marketplaceRoyalties,
          akitaRoyalty: result.akitaRoyalty,
          vrfFailureCount: result.vrfFailureCount,
          entryId: result.entryID,
          weightsBoxCount: result.weightsBoxCount,
          weightTotals: result.weightTotals,
          findWinnerCursors: result.findWinnerCursors,
          refundMbrCursor: result.refundMBRCursor,
          salt: new BinaryStateValue(result.salt),
          raffleRound: result.raffleRound,
          minEntries: result.minEntries,
          failed: result.failed,
          sellerReferrer: result.sellerReferrer,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO,
          funder: result.funder
        };
      },
      /**
       * Get the current value of the ticketAsset key in global state
       */
      ticketAsset: async () => {
        return await this.appClient.state.global.getValue("ticketAsset");
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
       * Get the current value of the seller key in global state
       */
      seller: async () => {
        return await this.appClient.state.global.getValue("seller");
      },
      /**
       * Get the current value of the minTickets key in global state
       */
      minTickets: async () => {
        return await this.appClient.state.global.getValue("minTickets");
      },
      /**
       * Get the current value of the maxTickets key in global state
       */
      maxTickets: async () => {
        return await this.appClient.state.global.getValue("maxTickets");
      },
      /**
       * Get the current value of the entryCount key in global state
       */
      entryCount: async () => {
        return await this.appClient.state.global.getValue("entryCount");
      },
      /**
       * Get the current value of the ticketCount key in global state
       */
      ticketCount: async () => {
        return await this.appClient.state.global.getValue("ticketCount");
      },
      /**
       * Get the current value of the winningTicket key in global state
       */
      winningTicket: async () => {
        return await this.appClient.state.global.getValue("winningTicket");
      },
      /**
       * Get the current value of the winner key in global state
       */
      winner: async () => {
        return await this.appClient.state.global.getValue("winner");
      },
      /**
       * Get the current value of the prize key in global state
       */
      prize: async () => {
        return await this.appClient.state.global.getValue("prize");
      },
      /**
       * Get the current value of the isPrizeBox key in global state
       */
      isPrizeBox: async () => {
        return await this.appClient.state.global.getValue("isPrizeBox");
      },
      /**
       * Get the current value of the prizeClaimed key in global state
       */
      prizeClaimed: async () => {
        return await this.appClient.state.global.getValue("prizeClaimed");
      },
      /**
       * Get the current value of the creatorRoyalty key in global state
       */
      creatorRoyalty: async () => {
        return await this.appClient.state.global.getValue("creatorRoyalty");
      },
      /**
       * Get the current value of the gateID key in global state
       */
      gateId: async () => {
        return await this.appClient.state.global.getValue("gateID");
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
       * Get the current value of the vrfFailureCount key in global state
       */
      vrfFailureCount: async () => {
        return await this.appClient.state.global.getValue("vrfFailureCount");
      },
      /**
       * Get the current value of the entryID key in global state
       */
      entryId: async () => {
        return await this.appClient.state.global.getValue("entryID");
      },
      /**
       * Get the current value of the weightsBoxCount key in global state
       */
      weightsBoxCount: async () => {
        return await this.appClient.state.global.getValue("weightsBoxCount");
      },
      /**
       * Get the current value of the weightTotals key in global state
       */
      weightTotals: async () => {
        return await this.appClient.state.global.getValue("weightTotals");
      },
      /**
       * Get the current value of the findWinnerCursors key in global state
       */
      findWinnerCursors: async () => {
        return await this.appClient.state.global.getValue("findWinnerCursors");
      },
      /**
       * Get the current value of the refundMBRCursor key in global state
       */
      refundMbrCursor: async () => {
        return await this.appClient.state.global.getValue("refundMBRCursor");
      },
      /**
       * Get the current value of the salt key in global state
       */
      salt: async () => {
        return new BinaryStateValue(await this.appClient.state.global.getValue("salt"));
      },
      /**
       * Get the current value of the raffleRound key in global state
       */
      raffleRound: async () => {
        return await this.appClient.state.global.getValue("raffleRound");
      },
      /**
       * Get the current value of the minEntries key in global state
       */
      minEntries: async () => {
        return await this.appClient.state.global.getValue("minEntries");
      },
      /**
       * Get the current value of the failed key in global state
       */
      failed: async () => {
        return await this.appClient.state.global.getValue("failed");
      },
      /**
       * Get the current value of the sellerReferrer key in global state
       */
      sellerReferrer: async () => {
        return await this.appClient.state.global.getValue("sellerReferrer");
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
     * Methods to access box state for the current Raffle app
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
       * Get values from the weights map in box state
       */
      weights: {
        /**
         * Get all current values of the weights map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("weights");
        },
        /**
         * Get a current value of the weights map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("weights", key);
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
       * Add a init(pay,uint64)void method call against the Raffle contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a setMinEntries(uint64)void method call against the Raffle contract
       */
      setMinEntries(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.setMinEntries(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a refundMBR(uint64)void method call against the Raffle contract
       */
      refundMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.refundMbr(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a clearWeightsBoxes()uint64 method call against the Raffle contract
       */
      clearWeightsBoxes(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.clearWeightsBoxes(params)));
        resultMappers.push((v) => client.decodeReturnValue("clearWeightsBoxes()uint64", v));
        return this;
      },
      /**
       * Add a gatedEnter(appl,pay,address,uint64)void method call against the Raffle contract
       */
      gatedEnterApplPayAddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnterApplPayAddressUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedEnter(appl,pay,address)void method call against the Raffle contract
       */
      gatedEnterApplPayAddressVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnterApplPayAddressVoid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a enter(pay,address)void method call against the Raffle contract
       */
      enter(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.enter(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedEnterAsa(appl,pay,axfer,address,uint64)void method call against the Raffle contract
       */
      gatedEnterAsaApplPayAxferAddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnterAsaApplPayAxferAddressUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedEnterAsa(appl,pay,axfer,address)void method call against the Raffle contract
       */
      gatedEnterAsaApplPayAxferAddressVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedEnterAsaApplPayAxferAddressVoid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a enterAsa(pay,axfer,address)void method call against the Raffle contract
       */
      enterAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.enterAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedAdd(appl,pay,uint64)void method call against the Raffle contract
       */
      gatedAddApplPayUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedAddApplPayUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedAdd(appl,pay)void method call against the Raffle contract
       */
      gatedAddApplPayVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedAddApplPayVoid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a add(pay)void method call against the Raffle contract
       */
      add(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.add(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedAddAsa(appl,axfer,uint64)void method call against the Raffle contract
       */
      gatedAddAsaApplAxferUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedAddAsaApplAxferUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedAddAsa(appl,axfer)void method call against the Raffle contract
       */
      gatedAddAsaApplAxferVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedAddAsaApplAxferVoid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a addAsa(axfer)void method call against the Raffle contract
       */
      addAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.addAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a raffle()void method call against the Raffle contract
       */
      raffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.raffle(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a findWinner(uint64)void method call against the Raffle contract
       */
      findWinner(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.findWinner(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a claimRafflePrize()void method call against the Raffle contract
       */
      claimRafflePrize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimRafflePrize(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a isLive()bool method call against the Raffle contract
       */
      isLive(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isLive(params)));
        resultMappers.push((v) => client.decodeReturnValue("isLive()bool", v));
        return this;
      },
      /**
       * Add a getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64) method call against the Raffle contract
       */
      getState(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getState(params)));
        resultMappers.push((v) => client.decodeReturnValue("getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Raffle contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Raffle contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Raffle contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64) method call against the Raffle contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr()(uint64,uint64,uint64)", v));
        return this;
      },
      /**
       * Add a optin(pay,uint64)void method call against the Raffle contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
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
      get delete() {
        return {
          deleteApplication: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.deleteApplication(params)));
            resultMappers.push(void 0);
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the Raffle contract
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

// src/raffle/errors.ts
var RAFFLE_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
  // --- Raffle lifecycle ---------------------------------------------------
  IENR: "Ending round must be in the future",
  NLIV: "Raffle is not live",
  RHNE: "Raffle has not ended",
  NEND: "Raffle has not ended",
  NETM: "Not enough time has passed since the raffle ended",
  // --- Ticket asset / amounts --------------------------------------------
  TANA: "Ticket asset is not ALGO",
  TAAL: "Ticket asset is ALGO",
  BMIN: "Amount is below minimum",
  AMAX: "Amount is above maximum",
  IRCV: "Invalid receiver",
  IMBA: "Invalid MBR amount",
  IMBR: "Invalid MBR recipient",
  // --- Gate / method enforcement -----------------------------------------
  BMGN: "Bad method; gate needed",
  // --- Entries -----------------------------------------------------------
  AENT: "You have already entered the raffle",
  EDNE: "Entry does not exist",
  // --- Winner / draw -----------------------------------------------------
  FTGS: "Failed to get seed",
  WAFD: "Winner has already been found",
  WADR: "Winning ticket has already been drawn",
  WNFD: "Winner not found",
  NWTY: "No winning ticket yet",
  // --- Prize / refunds ---------------------------------------------------
  PACL: "Prize has already been claimed",
  PNCL: "Prize has not been claimed",
  ARFC: "All refunds have been completed",
  RFNC: "Refunds have not been completed",
  TNRC: "Tickets have not been reclaimed",
  BNCL: "Boxes are not cleared",
  SHWB: "Still has weights boxes",
  // --- Weights allocation ------------------------------------------------
  MALF: "Must allocate at least four weights chunks",
  MAMF: "Must allocate at most fifteen weights chunks",
  // --- Factory / misc ----------------------------------------------------
  MNOT: "Factory not opted into ticket asset",
  ACNF: "App creator not found",
  NRAF: "Not a raffle",
  // --- Raffle plugin -----------------------------------------------------
  NENA: "Not enough of the asset",
  CNRF: "Creator is not the raffle factory",
  // --- Audit 2026-10 fixes ------------------------------------------------
  ITBD: "Invalid ticket bounds (max must be positive and at least min)",
  PITA: "The prize cannot be the ticket asset",
  NSLR: "Only the seller can do this",
  PSZB: "The prize asset has a clawback or freeze address",
  BNRD: "The beacon value for the committed round is not available yet"
});
var translateRaffleError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, RAFFLE_ERROR_MESSAGES);

// src/raffle/factory.ts


// src/generated/RaffleFactoryClient.ts





var APP_SPEC2 = { "name": "RaffleFactory", "structs": { "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newRaffle", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "minEntries" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New ASA-prize raffle (principal ABI, spec \xA76.8). The seller stays `Txn.sender`; `wallet` is the\nseller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here\n(invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when\nthe prize is claimed. The +50,000 \xB5A global is part of `newRaffleCost`.\n\nThe DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed\n(Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost and are\n107,000 \xB5A short of the new child, so legacy shims could never succeed for them.", "events": [], "recommendations": {} }, { "name": "newPrizeBoxRaffle", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "minEntries" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New prize-box raffle (principal ABI, spec \xA76.8); see `newRaffle`.", "events": [], "recommendations": {} }, { "name": "deleteRaffle", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newRaffleCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "prizeID" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require", "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1509, 2585], "errorMessage": "Bytes has valid prefix" }, { "pc": [1731], "errorMessage": "ERR:errBmpt" }, { "pc": [361, 2300, 3180], "errorMessage": "ERR:errCnst" }, { "pc": [615], "errorMessage": "ERR:errHnbd" }, { "pc": [519], "errorMessage": "ERR:errHnwl" }, { "pc": [538], "errorMessage": "ERR:errHtop" }, { "pc": [2289], "errorMessage": "ERR:errIcor" }, { "pc": [3215], "errorMessage": "ERR:errIenr" }, { "pc": [3326, 3340], "errorMessage": "ERR:errIpay" }, { "pc": [2436], "errorMessage": "ERR:errIpma" }, { "pc": [2407], "errorMessage": "ERR:errIpmr" }, { "pc": [1129], "errorMessage": "ERR:errIpms" }, { "pc": [3247], "errorMessage": "ERR:errItbd" }, { "pc": [2963], "errorMessage": "ERR:errIupg" }, { "pc": [666], "errorMessage": "ERR:errIwlt" }, { "pc": [1218, 1232], "errorMessage": "ERR:errIxfr" }, { "pc": [1179], "errorMessage": "ERR:errNcls" }, { "pc": [1154], "errorMessage": "ERR:errNclw" }, { "pc": [2140, 2330, 2890, 2931, 2998], "errorMessage": "ERR:errNdao" }, { "pc": [2621], "errorMessage": "ERR:errNesc" }, { "pc": [3282], "errorMessage": "ERR:errNopt" }, { "pc": [1789], "errorMessage": "ERR:errNpbo" }, { "pc": [1891], "errorMessage": "ERR:errNraf" }, { "pc": [1204], "errorMessage": "ERR:errNrky" }, { "pc": [1257], "errorMessage": "ERR:errPita" }, { "pc": [1296], "errorMessage": "ERR:errPszb" }, { "pc": [3772], "errorMessage": "ERR:errPtlg" }, { "pc": [2647], "errorMessage": "ERR:errWesc" }, { "pc": [1900, 1908, 1969, 1984], "errorMessage": "account funded" }, { "pc": [381, 1357, 1399, 1745, 1757, 1824, 1870, 2170, 2322, 2378, 2712, 2728, 2822, 2882, 2923, 2990, 3351, 3568, 3595, 3634], "errorMessage": "application exists" }, { "pc": [1261, 1271, 1431], "errorMessage": "asset exists" }, { "pc": [1096, 1303, 1688, 1735, 2120, 2316, 2368, 2372, 2480, 2510, 2704, 2813, 2817, 2876, 2917, 2935, 2984, 3041, 3077, 3124, 3152, 3308, 3345, 3420], "errorMessage": "check GlobalState exists" }, { "pc": [1759], "errorMessage": "errNapb" }, { "pc": [432, 842, 858, 899, 1045, 1060, 1512, 2097, 2190, 2588, 2865, 2901], "errorMessage": "invalid array length header" }, { "pc": [2049], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [849, 865, 1051, 2104, 2197, 2908], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1072], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [2597], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1036, 1664], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [876, 956, 967, 978, 989, 1e3, 1011, 1022, 1080, 1091, 1584, 1595, 1606, 1617, 1628, 1639, 1650, 1672, 1683, 1865, 2059, 2068, 2077, 2115, 2182, 2354, 2808, 2977], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [904, 2870], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1518], "errorMessage": "invalid number of bytes for string" }, { "pc": [891, 2857], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [886, 2852], "errorMessage": "invalid tuple encoding" }, { "pc": [1564], "errorMessage": "transaction type is appl" }, { "pc": [948], "errorMessage": "transaction type is axfer" }, { "pc": [936, 1576, 2346], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA3OTgwMCA0MDk2IDUwMDAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJiYyIgIndhbGxldCIgImFraXRhX2VzY3JvdyIgMHgxNTFmN2M3NSAiRVJSOmVyck5kYW8iICJhYWwiICJFUlI6ZXJyQ25zdCIgMHgwMCAweGM1M2IzMmNjICJ2ZXJzaW9uIiAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIgIkVSUjplcnJJeGZyIiAweDNlYTExODMyIDB4YWRmOTJhZTQgInBhbCIgIm5mdF9mZWVzIiAiRVJSOmVycklwYXkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMS0zNwogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVJhZmZsZSwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDQKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzEtMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZUZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSYWZmbGUsIEZhY3RvcnlDb250cmFjdCkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAyMQogICAgcHVzaGJ5dGVzcyAweDgwODMxMWVlIDB4ZjMxMTljYjQgMHg5MWRkM2M3NSAweDlhZDdkMzNkIC8vIG1ldGhvZCAibmV3UmFmZmxlKHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl1bXSx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3UHJpemVCb3hSYWZmbGUoYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImRlbGV0ZVJhZmZsZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAibmV3UmFmZmxlQ29zdChib29sLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIKICAgIGJ5dGVjIDkgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHhkOWEzNWZhNCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCkiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBuZXdSYWZmbGUgbmV3UHJpemVCb3hSYWZmbGUgZGVsZXRlUmFmZmxlIG5ld1JhZmZsZUNvc3QgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE4IG1haW5fbWJyX3JvdXRlQDE5CiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9iYXNlLnRzOjYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA3YmQ0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzEtMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZUZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSYWZmbGUsIEZhY3RvcnlDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ODExNTM2MjggLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHN0cmluZyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OmJveGVkUHJvZ3JhbVNpemUoYm94S2V5OiBieXRlcykgLT4gdWludDY0Ogpib3hlZFByb2dyYW1TaXplOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjgxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYm94ZWRQcm9ncmFtU2l6ZShib3hLZXk6IGJ5dGVzKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjgyCiAgICAvLyBjb25zdCBbc2l6ZSwgZXhpc3RzXSA9IG9wLkJveC5sZW5ndGgoYm94S2V5KQogICAgZnJhbWVfZGlnIC0xCiAgICBib3hfbGVuCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODMKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm56IGJveGVkUHJvZ3JhbVNpemVfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCmJveGVkUHJvZ3JhbVNpemVfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODQKICAgIC8vIHJldHVybiBzaXplCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmV3YXJkc09wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzM5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmV3YXJkc09wdEluQ29zdChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MAogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MQogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MgogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzQzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0NgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg4NAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4ODUKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODg3CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI2NQogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg4OAogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODkxCiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5NAogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cHJpbmNpcGFsT2YoYWtpdGFEQU86IHVpbnQ2NCwgaGludDogdWludDY0KSAtPiBieXRlczoKcHJpbmNpcGFsT2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHByaW5jaXBhbE9mKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgaGludDogdWludDY0KTogUHJpbmNpcGFsIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjMKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjE0CiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTIKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMwogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MwogICAgLy8gb3JpZ2luOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTUKICAgIC8vIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTEKICAgIC8vIHdhbGxldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkwLTk3CiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IDAsCiAgICAvLyAgIHByaW5jaXBhbDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICB2aWFQbHVnaW46IGZhbHNlLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA4IC8vIDB4MDAKICAgIGNvbmNhdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjMKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUA1CiAgICBmcmFtZV9kaWcgMgogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANgoKcHJpbmNpcGFsT2ZfaWZfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90V2FsbGV0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG53bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbndsCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTYxCiAgICAvLyBsb2dnZWRFcnIoZXJySGludFRvcExldmVsKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySHRvcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIdG9wCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjYKICAgIC8vIGxldCB2aWFQbHVnaW4gPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY3CiAgICAvLyBpZiAoY2FsbGVyQXBwICE9PSBoaW50KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcxCiAgICAvLyBjb25zdCBbc3BlbmRpbmcsIHNwZW5kaW5nRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfU1BFTkRJTkcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgInNwZW5kaW5nX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MgogICAgLy8gaWYgKCEoc3BlbmRpbmdFeGlzdHMgJiYgc3BlbmRpbmcubGVuZ3RoID09PSAzMiAmJiBzcGVuZGluZyA9PT0gc2VuZGVyLmJ5dGVzICYmIHNlbmRlciAhPT0gY2FsbGVyQWRkcikpIHsKICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGZyYW1lX2RpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBmcmFtZV9kaWcgMQogICAgZGlnIDEKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBkdXAKICAgIGZyYW1lX2RpZyAzCiAgICAhPQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjEKCnByaW5jaXBhbE9mX2lmX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RCb3VuZCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhuYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG5iZAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc4CiAgICAvLyB2aWFQbHVnaW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEJ5dGVzLCBjb250cm9sbGVkRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfQ09OVFJPTExFRCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAyNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNQoKcHJpbmNpcGFsT2ZfaWZfYm9keUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTE5CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gc3BlbmRlcikgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIwCiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTEKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJyZWZlcnJlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MgogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlckV4aXN0cyAmJiByZWZlcnJlckJ5dGVzLmxlbmd0aCA9PT0gMzIgPyBBY2NvdW50KHJlZmVycmVyQnl0ZXMpIDogR2xvYmFsLnplcm9BZGRyZXNzCiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDM1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzUKICAgIGNvdmVyIDMKCnByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NgogICAgLy8gcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIGRpZyAyCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDM4CiAgICBzd2FwCgpwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTQtMjAxCiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IGhpbnQsCiAgICAvLyAgIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXIsCiAgICAvLyAgIHZpYVBsdWdpbiwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDggLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjA5LTIxNgogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWxDdHgoCiAgICAvLyAgIHdhbGxldEZhY3RvcnksCiAgICAvLyAgIGhpbnQsCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cmVzb2x2ZVByaW5jaXBhbEN0eEA0MAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzODoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGIgcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzOQoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBjb3ZlciAzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzYKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMgogICAgLy8gY29uc3QgW3dhbGxldEFkZHJlc3MsIHdhbGxldEV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIzCiAgICAvLyBpZiAoIXdhbGxldEV4aXN0cykgewogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNgogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNwogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGNvbnRyb2xsZWQpID09PSB3YWxsZXRBZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMgogICAgaXRvYgogICAgcHVzaGJ5dGVzICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxMQoKcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxMCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyAxMSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjE0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo6UmFmZmxlRmFjdG9yeS5uZXdSYWZmbGVbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdSYWZmbGU6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMzAtMjQ1CiAgICAvLyBuZXdSYWZmbGUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpY2tldEFzc2V0OiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBtaW5UaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1heFRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWluRW50cmllczogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDYKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNDYKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI0NgogICAgLy8gY29uc3Qgc2VsbGVyUmVmZXJyZXIgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpLnJlZmVycmVyCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgZXh0cmFjdCAxMDQgMzIKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI0OQogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgc3dhcAogICAgZ3R4bnMgU2VuZGVyCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMjQKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0U2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAyNgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3CgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0Q2xvc2VUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMjgKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBkaWcgMQogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMzAKICAgIHB1c2hieXRlcyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCm5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+IDAsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGRpZyAxCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBjb3ZlciA4CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjUzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCAhPT0gdGlja2V0QXNzZXQsIGVyclByaXplSXNUaWNrZXRBc3NldCkKICAgIHN3YXAKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBkaWcgNQogICAgIT0KICAgIGJueiBuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyclBpdGEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGl0YQoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjU1CiAgICAvLyBhc3NldFhmZXIueGZlckFzc2V0LmNsYXdiYWNrID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgYXNzZXRYZmVyLnhmZXJBc3NldC5mcmVlemUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENsYXdiYWNrCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiBuZXdSYWZmbGVfYm9vbF9mYWxzZUAxMAogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0RnJlZXplCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiBuZXdSYWZmbGVfYm9vbF9mYWxzZUAxMAogICAgaW50Y18xIC8vIDEKCm5ld1JhZmZsZV9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjU0LTI1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBhc3NldFhmZXIueGZlckFzc2V0LmNsYXdiYWNrID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgYXNzZXRYZmVyLnhmZXJBc3NldC5mcmVlemUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgZXJyUHJpemVTZWl6YWJsZQogICAgLy8gKQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOmVyclBzemIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUHN6YgoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI1OQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjU5CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOQogICAgLy8gbGV0IGNyZWF0b3JSb3lhbHR5OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDEKICAgIC8vIGlmICghKHByb29mLmxlbmd0aCA+IDApKSB7CiAgICB1bmNvdmVyIDIKICAgIGJueiBuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NDIKICAgIC8vIHJldHVybiBDcmVhdG9yUm95YWx0eURlZmF1bHQKICAgIHB1c2hpbnQgNTAwMAogICAgYnVyeSAxNAoKbmV3UmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjYyCiAgICAvLyBmYWxzZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjEtMjc2CiAgICAvLyBjb25zdCByYWZmbGVBcHAgPSB0aGlzLmNyZWF0ZUNoaWxkQXBwKAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICBtaW5UaWNrZXRzLAogICAgLy8gICBtYXhUaWNrZXRzLAogICAgLy8gICBtaW5FbnRyaWVzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBzZWxsZXJSZWZlcnJlcgogICAgLy8gKQogICAgdW5jb3ZlciA4CiAgICBkaWcgMgogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDkKICAgIHVuY292ZXIgOQogICAgZGlnIDE1CiAgICB1bmNvdmVyIDE1CiAgICB1bmNvdmVyIDE1CiAgICB1bmNvdmVyIDE1CiAgICB1bmNvdmVyIDE1CiAgICB1bmNvdmVyIDE1CiAgICB1bmNvdmVyIDE0CiAgICB1bmNvdmVyIDE0CiAgICBjYWxsc3ViIGNyZWF0ZUNoaWxkQXBwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyODEtMjkwCiAgICAvLyByYWZmbGUuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiByYWZmbGVBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyODUKICAgIC8vIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6Mjg2CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4NC0yODcKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4MS0yOTAKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6Mjg4CiAgICAvLyBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4MS0yOTAKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTMtMjk5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTUKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjkzLTI5OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjkzLTI5OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIzMC0yNDUKICAgIC8vIG5ld1JhZmZsZSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBtaW5FbnRyaWVzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3LTY1NwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjUwCiAgICAvLyBhc3NldC5jcmVhdG9yLAogICAgZHVwbiAyCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTIKICAgIC8vIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIHN3YXAKICAgIGl0b2IKICAgIHNoYTI1NgogICAgc2hhMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1NAogICAgLy8gMSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciA0CiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0OAogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZpZWRNdXN0UmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgxZmY3Yzc0YyAvLyBtZXRob2QgInZlcmlmaWVkTXVzdFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU1CiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZpZWRNdXN0UmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGJ1cnkgMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU5CiAgICAvLyBpZiAoQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpLmxlbmd0aCA+IDApIHsKICAgIGxlbgogICAgYnogbmV3UmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYwCiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IGJ0b2koQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpKQogICAgZGlnIDE0CiAgICBidG9pCiAgICBidXJ5IDE0CgpuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYzCiAgICAvLyBpZiAoY3JlYXRvclJveWFsdHkgPiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUpIHsKICAgIGRpZyAxMwogICAgaW50YyA2IC8vIDUwMDAwCiAgICA+CiAgICBieiBuZXdSYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY0CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDYgLy8gNTAwMDAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI1OQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldCwgbmFtZSwgcHJvb2YpCiAgICBiIG5ld1JhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AyMQoKbmV3UmFmZmxlX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdSYWZmbGVfYm9vbF9tZXJnZUAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5Lm5ld1ByaXplQm94UmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UHJpemVCb3hSYWZmbGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMDUtMzE4CiAgICAvLyBuZXdQcml6ZUJveFJhZmZsZSgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBtaW5FbnRyaWVzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMTkKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMxOQogICAgLy8gY29uc3Qgc2VsbGVyUmVmZXJyZXIgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpLnJlZmVycmVyCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgZXh0cmFjdCAxMDQgMzIKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyMgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDE0IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyMi0zMjMKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYnogbmV3UHJpemVCb3hSYWZmbGVfYm9vbF9mYWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMjMKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGR1cAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMjItMzIzCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBuZXdQcml6ZUJveFJhZmZsZV9ib29sX2ZhbHNlQDQKICAgIGludGNfMSAvLyAxCgpuZXdQcml6ZUJveFJhZmZsZV9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMjEtMzI0CiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gKSwgZXJyQmFkTWV0aG9kUHJpemVCb3hUcmFuc2Zlck5lZWRlZCkKICAgIGJueiBuZXdQcml6ZUJveFJhZmZsZV9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm1wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbXB0CgpuZXdQcml6ZUJveFJhZmZsZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzEKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBlcnJOb3RBUHJpemVCb3gpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcxCiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgZXJyTm90QVByaXplQm94KQogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gZXJyTmFwYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzIKICAgIC8vIGNvbnN0IFtvd25lckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHByaXplQm94LCBCeXRlcyhQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIpKQogICAgcHVzaGJ5dGVzICJvd25lciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3UHJpemVCb3hSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVyck5wYm8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBibwoKbmV3UHJpemVCb3hSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMjgKICAgIC8vIHRydWUsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzI3LTM0MgogICAgLy8gY29uc3QgcmFmZmxlQXBwID0gdGhpcy5jcmVhdGVDaGlsZEFwcCgKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgIDAsCiAgICAvLyAgIG1pblRpY2tldHMsCiAgICAvLyAgIG1heFRpY2tldHMsCiAgICAvLyAgIG1pbkVudHJpZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyCiAgICAvLyApCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHVuY292ZXIgMTMKICAgIHVuY292ZXIgMTMKICAgIHVuY292ZXIgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMzNAogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMjctMzQyCiAgICAvLyBjb25zdCByYWZmbGVBcHAgPSB0aGlzLmNyZWF0ZUNoaWxkQXBwKAogICAgLy8gICB0cnVlLAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICB0aWNrZXRBc3NldCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgMCwKICAgIC8vICAgbWluVGlja2V0cywKICAgIC8vICAgbWF4VGlja2V0cywKICAgIC8vICAgbWluRW50cmllcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgc2VsbGVyUmVmZXJyZXIKICAgIC8vICkKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIGNhbGxzdWIgY3JlYXRlQ2hpbGRBcHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM0NC0zNDcKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW3JhZmZsZUFwcC5hZGRyZXNzXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNDYKICAgIC8vIGFyZ3M6IFtyYWZmbGVBcHAuYWRkcmVzc10sCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNDQtMzQ3CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtyYWZmbGVBcHAuYWRkcmVzc10sCiAgICAvLyB9KQogICAgYnl0ZWMgMTQgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMDUtMzE4CiAgICAvLyBuZXdQcml6ZUJveFJhZmZsZSgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgdGlja2V0QXNzZXQ6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIG1pblRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWF4VGlja2V0czogdWludDY0LAogICAgLy8gICBtaW5FbnRyaWVzOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1ByaXplQm94UmFmZmxlX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld1ByaXplQm94UmFmZmxlX2Jvb2xfbWVyZ2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmRlbGV0ZVJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZVJhZmZsZToKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM1MgogICAgLy8gZGVsZXRlUmFmZmxlKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNTMKICAgIC8vIGxvZ2dlZEFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90QVJhZmZsZSkKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZVJhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnJhZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmFmCgpkZWxldGVSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNTcKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM1OAogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njc3CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBwdXNoYnl0ZXMgImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM2MQogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgYnVyeSA3CiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzY0CiAgICAvLyByYWZmbGUuY2FsbC5kZWxldGVBcHBsaWNhdGlvbih7IGFwcElkIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDI0ODdjMzJjIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ4CiAgICAvLyBjb25zdCBzZWxmID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ5CiAgICAvLyBjb25zdCBncm9zczogdWludDY0ID0gc2VsZi5iYWxhbmNlICsgZm9yd2FyZGVkCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MAogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGdyb3NzID4gYmFsYW5jZUJlZm9yZSA/IGdyb3NzIC0gYmFsYW5jZUJlZm9yZSA6IDAKICAgIDwKICAgIGJ6IGRlbGV0ZVJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDgKICAgIHVuY292ZXIgNAogICAgLQoKZGVsZXRlUmFmZmxlX3Rlcm5hcnlfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUxCiAgICAvLyBjb25zdCBtaW5BZnRlcjogdWludDY0ID0gc2VsZi5taW5CYWxhbmNlCiAgICBzd2FwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUyCiAgICAvLyBjb25zdCByZWxlYXNlZDogdWludDY0ID0gbWluQmVmb3JlID4gbWluQWZ0ZXIgPyBtaW5CZWZvcmUgLSBtaW5BZnRlciA6IDAKICAgIGRpZyAzCiAgICA8CiAgICBieiBkZWxldGVSYWZmbGVfdGVybmFyeV9mYWxzZUAxMQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICAtCgpkZWxldGVSYWZmbGVfdGVybmFyeV9tZXJnZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUzCiAgICAvLyBjb25zdCByZWZ1bmQ6IHVpbnQ2NCA9IHJlY2VpdmVkICsgcmVsZWFzZWQKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU0CiAgICAvLyByZXR1cm4gcmVmdW5kID4gcmVjb3JkZWQgPyByZWNvcmRlZCA6IHJlZnVuZAogICAgZHVwCiAgICBkaWcgMgogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTEwCiAgICAvLyBpZiAocmVmdW5kID4gMCkgewogICAgYnogZGVsZXRlUmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjExMQogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXIsIGFtb3VudDogcmVmdW5kIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmRlbGV0ZVJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzUyCiAgICAvLyBkZWxldGVSYWZmbGUoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxldGVSYWZmbGVfdGVybmFyeV9mYWxzZUAxMToKICAgIHBvcAogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVSYWZmbGVfdGVybmFyeV9tZXJnZUAxMgoKZGVsZXRlUmFmZmxlX3Rlcm5hcnlfZmFsc2VAODoKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUwCiAgICAvLyBjb25zdCByZWNlaXZlZDogdWludDY0ID0gZ3Jvc3MgPiBiYWxhbmNlQmVmb3JlID8gZ3Jvc3MgLSBiYWxhbmNlQmVmb3JlIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgZGVsZXRlUmFmZmxlX3Rlcm5hcnlfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5Lm5ld1JhZmZsZUNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdSYWZmbGVDb3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzcyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNzQKICAgIC8vIHJldHVybiB0aGlzLmNoaWxkQ29zdHMoaXNQcml6ZUJveCwgcHJpemVJRCwgdGlja2V0QXNzZXQsIHdlaWdodHNMaXN0Q291bnQpWzJdCiAgICBjYWxsc3ViIGNoaWxkQ29zdHMKICAgIGV4dHJhY3QgMTYgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzcyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmluaXRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTgKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTIyCiAgICAvLyBjb25zdCBbZGFvV2FsbGV0SWRdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjIKICAgIC8vIGNvbnN0IFtkYW9XYWxsZXRJZF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI0LTEyNgogICAgLy8gZGFvV2FsbGV0SWQgPT09IDAKICAgIC8vICAgPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIC8vICAgOiBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihkYW9XYWxsZXRJZCkuYWRkcmVzcywKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI1CiAgICAvLyA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQoKaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTIzLTEyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBkYW9XYWxsZXRJZCA9PT0gMAogICAgLy8gICAgID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICAvLyAgICAgOiBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihkYW9XYWxsZXRJZCkuYWRkcmVzcywKICAgIC8vICAgZXJyTm90QWtpdGFEYW8KICAgIC8vICkKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MgogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDExIC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI5CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMAogICAgLy8gaWYgKCF0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmNyZWF0ZSh7IHNpemUgfSkKICAgIHN3YXAKICAgIGJveF9jcmVhdGUKICAgIHBvcAoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTE4CiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMzCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVzaXplKHNpemUpCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICBiIGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAOQoKaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI2CiAgICAvLyA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGIgaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM3CiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzOAogICAgLy8gY29uc3QgZXhwZWN0ZWRQcmV2aW91c0NhbGxzOiB1aW50NjQgPSBvZmZzZXQgLyAyMDMyCiAgICBwdXNoaW50IDIwMzIKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzOQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDIKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBkaWcgMgogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MwogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGRpZyAyCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQzCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NAogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBkaWcgMgogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ0CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NQogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBkaWcgMgogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyA5IC8vIG1ldGhvZCAiaW5pdEJveGVkQ29udHJhY3Qoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDUKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NgogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgZGlnIDIKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDYKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDAtMTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gICAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gICAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gICAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICAgJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAgICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIC8vICksIGVyckludmFsaWRDYWxsT3JkZXIpCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDExCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJY29yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckljb3IKCmxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0OQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlcGxhY2Uob2Zmc2V0LCBkYXRhKQogICAgY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzNwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmRlbGV0ZUJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTQKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTIKICAgIC8vIGRlbGV0ZUJveGVkQ29udHJhY3QoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudFJlY2VpdmVyKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDMKICAgICsKICAgICoKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbWEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtYQoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5OAogICAgLy8gYXNzZXRBbW91bnQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDgKICAgIC8vIGlmIChjb3VudCA+IDAgJiYgZXNjcm93Lm5hbWUgIT09ICcnKSB7CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgcHVzaGJ5dGVzICIiCiAgICAhPQogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxNgogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgMTUgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OAogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjQKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgcHVzaGJ5dGVzIDB4M2FiMjg5NWIgLy8gbWV0aG9kICJhcmM1OF9nZXRFc2Nyb3dzKHN0cmluZ1tdKSh1aW50NjQsYWRkcmVzcyxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQxCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgZXJyRXNjcm93RG9lc05vdEV4aXN0KQogICAgZXh0cmFjdCA2IDQxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmVzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZXNjCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBlcnJXcm9uZ0VzY3Jvd0Zvck9wZXJhdGlvbikKICAgIGRpZyA2CiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2VzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXZXNjCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5OAogICAgLy8gW10KICAgIHB1c2hieXRlcyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNAogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMi0xMDYKICAgIC8vIGNvbnN0IG9wdEluQ291bnQgPSBzcGxpdE9wdEluQ291bnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXQKICAgIC8vICkKICAgIGRpZyA2CiAgICBkdXAKICAgIGNvdmVyIDQKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBbYXNzZXQuaWRdLAogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIzCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsgYXBwSWQ6IHdhbGxldCB9KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM1CiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCm9wdEluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE2CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAxNSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTAgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkuY2hpbGRDb3N0cyhpc1ByaXplQm94OiB1aW50NjQsIHByaXplSUQ6IHVpbnQ2NCwgdGlja2V0QXNzZXQ6IHVpbnQ2NCwgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0KSAtPiBieXRlczoKY2hpbGRDb3N0czoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjQ1CiAgICAvLyBwcml2YXRlIGNoaWxkQ29zdHMoaXNQcml6ZUJveDogYm9vbGVhbiwgcHJpemVJRDogdWludDY0LCB0aWNrZXRBc3NldDogdWludDY0LCB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQpOiBbdWludDY0LCB1aW50NjQsIHVpbnQ2NF0gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo0NgogICAgLy8gbGV0IG9wdGluTUJSOiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NDgKICAgIC8vIGNvbnN0IGlzQWxnb09yUHJpemVCb3ggPSBwcml6ZUlEID09PSAwIHx8IGlzUHJpemVCb3gKICAgIGZyYW1lX2RpZyAtMwogICAgIQogICAgZnJhbWVfZGlnIC00CiAgICB8fAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NDkKICAgIC8vIGlmICghaXNBbGdvT3JQcml6ZUJveCkgewogICAgYm56IGNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo1MAogICAgLy8gb3B0aW5NQlIgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgZnJhbWVfYnVyeSAwCgpjaGlsZENvc3RzX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjU0CiAgICAvLyBpZiAoIWlzQWxnb1RpY2tldCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBjaGlsZENvc3RzX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NTUKICAgIC8vIG9wdGluTUJSICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZnJhbWVfZGlnIDAKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgZnJhbWVfYnVyeSAwCgpjaGlsZENvc3RzX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY0CiAgICAvLyBpZiAoIWlzUHJpemVCb3gpIHsKICAgIGZyYW1lX2RpZyAtNAogICAgYm56IGNoaWxkQ29zdHNfZWxzZV9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo2NQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplSUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDc5ODAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo2NQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplSUQpCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo2NgogICAgLy8gaWYgKGlzQWxnb1RpY2tldCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogY2hpbGRDb3N0c19lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKQogICAgKwoKY2hpbGRDb3N0c19hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzcKICAgIC8vIGNvbnN0IGNoaWxkQXBwTUJSOiB1aW50NjQgPSBHbG9iYWwubWluQmFsYW5jZSArIG9wdGluTUJSICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZnJhbWVfZGlnIDAKICAgICsKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3OAogICAgLy8gY29uc3Qgd2VpZ2h0c01CUjogdWludDY0ID0gKHdlaWdodHNMaXN0Q291bnQgKiB0aGlzLm1icigpLndlaWdodHMpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc5CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc5CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU1CiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgMTYgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODQKICAgIC8vIGZlZXMucmFmZmxlQ3JlYXRpb25GZWUgKwogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg1CiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIocmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgcHVzaGludCA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo5NQogICAgLy8gcmV0dXJuIHByb2dyYW1QYWdlc01icih0aGlzLmNoaWxkRXh0cmFQYWdlcyhjbGVhclNpemUpKQogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0OQogICAgLy8gcmV0dXJuIE1JTl9QUk9HUkFNX1BBR0VTICogKDEgKyBleHRyYVBhZ2VzKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHB1c2hpbnQgMTAwMDAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4NC04NQogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIocmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODQtODcKICAgIC8vIGZlZXMucmFmZmxlQ3JlYXRpb25GZWUgKwogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIHJhZmZsZS5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHJhZmZsZS5nbG9iYWxCeXRlcykgKwogICAgcHVzaGludCAxMTU1NTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4NC04OAogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIocmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcmFmZmxlLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogcmFmZmxlLmdsb2JhbEJ5dGVzKSArCiAgICAvLyBjaGlsZEFwcE1CUiArCiAgICB1bmNvdmVyIDIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg0LTg5CiAgICAvLyBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlICsKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiByYWZmbGUuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiByYWZmbGUuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSICsKICAgIC8vIHdlaWdodHNNQlIKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo5MgogICAgLy8gcmV0dXJuIFtkaXNidXJzZW1lbnRNQlIsIHdlaWdodHNNQlIsIHRvdGFsTUJSXQogICAgdW5jb3ZlciAyCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCmNoaWxkQ29zdHNfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRpY2tldEFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAzOTkwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICArCiAgICArCiAgICBiIGNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUAxMwoKY2hpbGRDb3N0c19lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjcxCiAgICAvLyB9IGVsc2UgaWYgKGlzQWxnb1RpY2tldCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBibnogY2hpbGRDb3N0c19lbHNlX2JvZHlAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDc5ODAwCiAgICBiIGNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUAxMwoKY2hpbGRDb3N0c19lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3NAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzQKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRpY2tldEFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIHB1c2hpbnQgMzE5MjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3NAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICArCiAgICBiIGNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUAxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmNyZWF0ZUNoaWxkQXBwKGlzUHJpemVCb3g6IHVpbnQ2NCwgcGF5bWVudDogdWludDY0LCBwcml6ZUlEOiB1aW50NjQsIHRpY2tldEFzc2V0OiB1aW50NjQsIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsIGVuZFRpbWVzdGFtcDogdWludDY0LCBjcmVhdG9yUm95YWx0eTogdWludDY0LCBtaW5UaWNrZXRzOiB1aW50NjQsIG1heFRpY2tldHM6IHVpbnQ2NCwgbWluRW50cmllczogdWludDY0LCBnYXRlSUQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzLCB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsIHNlbGxlclJlZmVycmVyOiBieXRlcykgLT4gdWludDY0OgpjcmVhdGVDaGlsZEFwcDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjk1LTExMAogICAgLy8gcHJpdmF0ZSBjcmVhdGVDaGlsZEFwcCgKICAgIC8vICAgaXNQcml6ZUJveDogYm9vbGVhbiwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBwcml6ZUlEOiB1aW50NjQsIC8vIEFzc2V0IG9yIFByaXplIEJveCBBcHBsaWNhdGlvbgogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgY3JlYXRvclJveWFsdHk6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1pbkVudHJpZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyOiBBY2NvdW50CiAgICAvLyApOiBBcHBsaWNhdGlvbiB7CiAgICBwcm90byAxNCAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjExMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE0CiAgICAvLyBsb2dnZWRBc3NlcnQoZW5kVGltZXN0YW1wID4gc3RhcnRUaW1lc3RhbXAgJiYgZW5kVGltZXN0YW1wID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJySW52YWxpZEVuZGluZ1JvdW5kKQogICAgZnJhbWVfZGlnIC05CiAgICBmcmFtZV9kaWcgLTEwCiAgICA+CiAgICBieiBjcmVhdGVDaGlsZEFwcF9ib29sX2ZhbHNlQDUKICAgIGZyYW1lX2RpZyAtOQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgPgogICAgYnogY3JlYXRlQ2hpbGRBcHBfYm9vbF9mYWxzZUA1CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlQ2hpbGRBcHBfYm9vbF9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE0CiAgICAvLyBsb2dnZWRBc3NlcnQoZW5kVGltZXN0YW1wID4gc3RhcnRUaW1lc3RhbXAgJiYgZW5kVGltZXN0YW1wID4gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwgZXJySW52YWxpZEVuZGluZ1JvdW5kKQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEA4CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJZW5yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckllbnIKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyBsb2dnZWRBc3NlcnQobWF4VGlja2V0cyA+IDAgJiYgbWF4VGlja2V0cyA+PSBtaW5UaWNrZXRzLCBlcnJJbnZhbGlkVGlja2V0Qm91bmRzKQogICAgZnJhbWVfZGlnIC02CiAgICBieiBjcmVhdGVDaGlsZEFwcF9ib29sX2ZhbHNlQDExCiAgICBmcmFtZV9kaWcgLTYKICAgIGZyYW1lX2RpZyAtNwogICAgPj0KICAgIGJ6IGNyZWF0ZUNoaWxkQXBwX2Jvb2xfZmFsc2VAMTEKICAgIGludGNfMSAvLyAxCgpjcmVhdGVDaGlsZEFwcF9ib29sX21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyBsb2dnZWRBc3NlcnQobWF4VGlja2V0cyA+IDAgJiYgbWF4VGlja2V0cyA+PSBtaW5UaWNrZXRzLCBlcnJJbnZhbGlkVGlja2V0Qm91bmRzKQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXRiZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJdGJkCgpjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjAKICAgIC8vIGxvZ2dlZEFzc2VydChpc0FsZ29UaWNrZXQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHRpY2tldEFzc2V0KSksIGVyck5vdE9wdGVkSW4pCiAgICBmcmFtZV9kaWcgLTExCiAgICBieiBjcmVhdGVDaGlsZEFwcF9ib29sX3RydWVAMTYKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBmcmFtZV9kaWcgLTExCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlQ2hpbGRBcHBfYm9vbF9mYWxzZUAxNwoKY3JlYXRlQ2hpbGRBcHBfYm9vbF90cnVlQDE2OgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUNoaWxkQXBwX2Jvb2xfbWVyZ2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjAKICAgIC8vIGxvZ2dlZEFzc2VydChpc0FsZ29UaWNrZXQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHRpY2tldEFzc2V0KSksIGVyck5vdE9wdGVkSW4pCiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDIwCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyMgogICAgLy8gY29uc3QgY29zdHMgPSB0aGlzLmNoaWxkQ29zdHMoaXNQcml6ZUJveCwgcHJpemVJRCwgdGlja2V0QXNzZXQsIHdlaWdodHNMaXN0Q291bnQpCiAgICBmcmFtZV9kaWcgLTE0CiAgICBmcmFtZV9kaWcgLTEyCiAgICBmcmFtZV9kaWcgLTExCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgY2hpbGRDb3N0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTIzCiAgICAvLyBjb25zdCBkaXNidXJzZW1lbnRNQlIgPSBjb3N0c1swXQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyNAogICAgLy8gY29uc3Qgd2VpZ2h0c01CUiA9IGNvc3RzWzFdCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI1CiAgICAvLyBjb25zdCB0b3RhbE1CUiA9IGNvc3RzWzJdCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI2CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyNgogICAgLy8gY29uc3QgZmVlcyA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1NQogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDE2IC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMjIKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdG90YWxNQlIsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMwogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMgogICAgPT0KICAgIGJueiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMjQKICAgIGJ5dGVjIDE3IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzMtMTM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZXMucmFmZmxlQ3JlYXRpb25GZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTM1CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzUKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzYKICAgIC8vIGFtb3VudDogZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSwKICAgIHVuY292ZXIgMgogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzMtMTM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZXMucmFmZmxlQ3JlYXRpb25GZWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzMtMTM4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZXMucmFmZmxlQ3JlYXRpb25GZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0MC0xNjkKICAgIC8vIGNvbnN0IGFwcElkID0gcmFmZmxlLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVJRCwKICAgIC8vICAgICAgIGlzUHJpemVCb3gsCiAgICAvLyAgICAgICB0aWNrZXRBc3NldCwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgbWluVGlja2V0cywKICAgIC8vICAgICAgIG1heFRpY2tldHMsCiAgICAvLyAgICAgICBtaW5FbnRyaWVzLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXMocmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCksCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDMKICAgIC8vIHByaXplSUQsCiAgICBmcmFtZV9kaWcgLTEyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDQKICAgIC8vIGlzUHJpemVCb3gsCiAgICBieXRlYyA4IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTE0CiAgICBzZXRiaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0NQogICAgLy8gdGlja2V0QXNzZXQsCiAgICBmcmFtZV9kaWcgLTExCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ2CiAgICAvLyBzdGFydFRpbWVzdGFtcCwKICAgIGZyYW1lX2RpZyAtMTAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0NwogICAgLy8gZW5kVGltZXN0YW1wLAogICAgZnJhbWVfZGlnIC05CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDgKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDkKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIGZyYW1lX2RpZyAtMTMKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciA4CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1MAogICAgLy8gY3JlYXRvclJveWFsdHksCiAgICBmcmFtZV9kaWcgLTgKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1MQogICAgLy8gbWluVGlja2V0cywKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTUyCiAgICAvLyBtYXhUaWNrZXRzLAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTMKICAgIC8vIG1pbkVudHJpZXMsCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1NAogICAgLy8gZ2F0ZUlELAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTU2CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1Ny0xNTgKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyBzZWxsZXJSZWZlcnJlciwKICAgIHB1c2hieXRlcyAweDAwMjIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICB1bmNvdmVyIDE0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE2MgogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE2MwogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE2NAogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICBpbnRjXzMgLy8gMgogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE2NQogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICBwdXNoaW50IDMKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNjgKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSwKICAgIHB1c2hpbnQgNAogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyOAogICAgLy8gY29uc3QgcmFmZmxlID0gY29tcGlsZUFyYzQoUmFmZmxlKQogICAgcHVzaGludCAxMAogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMjMKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQwLTE2OQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIG1pbkVudHJpZXMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSwKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBFeHRyYVByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI4CiAgICAvLyBjb25zdCByYWZmbGUgPSBjb21waWxlQXJjNChSYWZmbGUpCiAgICBwdXNoYnl0ZXMgYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQwLTE2OQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIG1pbkVudHJpZXMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSwKICAgIC8vICAgfSkKICAgIHB1c2hieXRlcyAweGZkZTI3NzdlIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LChzdHJpbmcsdWludDY0KSxhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgOQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0MC0xNzEKICAgIC8vIGNvbnN0IGFwcElkID0gcmFmZmxlLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVJRCwKICAgIC8vICAgICAgIGlzUHJpemVCb3gsCiAgICAvLyAgICAgICB0aWNrZXRBc3NldCwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgbWluVGlja2V0cywKICAgIC8vICAgICAgIG1heFRpY2tldHMsCiAgICAvLyAgICAgICBtaW5FbnRyaWVzLAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXMocmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCksCiAgICAvLyAgIH0pCiAgICAvLyAgIC5pdHhuCiAgICAvLyAgIC5jcmVhdGVkQXBwCiAgICBnaXR4biAwIENyZWF0ZWRBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE3NC0xNzkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNzYKICAgIC8vIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTc3CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgdW5jb3ZlciA0CiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTc0LTE3OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTc0LTE3OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODEKICAgIC8vIGlmICghaXNBbGdvVGlja2V0KSB7CiAgICBmcmFtZV9kaWcgLTExCiAgICBieiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODItMTkxCiAgICAvLyByYWZmbGUuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTg2CiAgICAvLyByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIGR1cG4gMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTg3CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4NS0xODgKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTgyLTE5MQogICAgLy8gcmFmZmxlLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpY2tldEFzc2V0LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDEzIC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxOTQtMjAzCiAgICAvLyByYWZmbGUuY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxOTgKICAgIC8vIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxOTctMjAwCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxOTQtMjAzCiAgICAvLyByYWZmbGUuY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIwMQogICAgLy8gd2VpZ2h0c0xpc3RDb3VudCwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTk0LTIwMwogICAgLy8gcmFmZmxlLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHhiZDcxNDhkMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjA1CiAgICAvLyByZXR1cm4gYXBwSWQKICAgIHN3YXAKICAgIHJldHN1YgoKY3JlYXRlQ2hpbGRBcHBfYm9vbF9mYWxzZUAxNzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUNoaWxkQXBwX2Jvb2xfbWVyZ2VAMTgKCmNyZWF0ZUNoaWxkQXBwX2Jvb2xfZmFsc2VAMTE6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVDaGlsZEFwcF9ib29sX21lcmdlQDEyCgpjcmVhdGVDaGlsZEFwcF9ib29sX2ZhbHNlQDU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVDaGlsZEFwcF9ib29sX21lcmdlQDYKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmNoaWxkQXBwcm92YWxDaHVuayhpbmRleDogdWludDY0KSAtPiBieXRlczoKY2hpbGRBcHByb3ZhbENodW5rOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzEKICAgIC8vIHByb3RlY3RlZCBjaGlsZEFwcHJvdmFsQ2h1bmsoaW5kZXg6IHVpbnQ2NCk6IGJ5dGVzIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5MgogICAgLy8gY29uc3Qgc2l6ZSA9IGJveGVkUHJvZ3JhbVNpemUoYm94S2V5KQogICAgY2FsbHN1YiBib3hlZFByb2dyYW1TaXplCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5MwogICAgLy8gY29uc3Qgb2Zmc2V0OiB1aW50NjQgPSBpbmRleCAqIE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEgKICAgIGZyYW1lX2RpZyAtMQogICAgaW50YyA1IC8vIDQwOTYKICAgICoKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTQKICAgIC8vIGlmIChvZmZzZXQgPj0gc2l6ZSkgewogICAgPj0KICAgIGJ6IGNoaWxkQXBwcm92YWxDaHVua19hZnRlcl9pZl9lbHNlQDMKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk1CiAgICAvLyByZXR1cm4gQnl0ZXMoJycpCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgcmV0c3ViCgpjaGlsZEFwcHJvdmFsQ2h1bmtfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk3CiAgICAvLyBjb25zdCByZW1haW5pbmc6IHVpbnQ2NCA9IHNpemUgLSBvZmZzZXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk4CiAgICAvLyByZXR1cm4gb3AuQm94LmV4dHJhY3QoYm94S2V5LCBvZmZzZXQsIHJlbWFpbmluZyA+IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggPyBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIIDogcmVtYWluaW5nKQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgPgogICAgaW50YyA1IC8vIDQwOTYKICAgIHN3YXAKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5OAogICAgLy8gcmV0dXJuIG9wLkJveC5leHRyYWN0KGJveEtleSwgb2Zmc2V0LCByZW1haW5pbmcgPiBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIID8gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA6IHJlbWFpbmluZykKICAgIGNvdmVyIDIKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZTogdWludDY0KSAtPiB1aW50NjQ6CmNoaWxkRXh0cmFQYWdlczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg0CiAgICAvLyBwcm90ZWN0ZWQgY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZTogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzcKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1TaXplKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpKQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICBjYWxsc3ViIGJveGVkUHJvZ3JhbVNpemUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czozMgogICAgLy8gY29uc3QgcGFnZXM6IHVpbnQ2NCA9IChhcHByb3ZhbFNpemUgKyBjbGVhclNpemUgKyBQUk9HUkFNX1BBR0VfU0laRSAtIDEpIC8gUFJPR1JBTV9QQUdFX1NJWkUKICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgcHVzaGludCAyMDQ4CiAgICArCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgcHVzaGludCAyMDQ4CiAgICAvCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czozMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBhZ2VzIDw9IE1BWF9QUk9HUkFNX1RPVEFMX1BBR0VTLCBlcnJQcm9ncmFtVG9vTGFyZ2UpCiAgICBpbnRjXzIgLy8gOAogICAgPD0KICAgIGJueiBjaGlsZEV4dHJhUGFnZXNfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclB0bGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUHRsZwoKY2hpbGRFeHRyYVBhZ2VzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQzCiAgICAvLyBjb25zdCBleHRyYTogdWludDY0ID0gcGFnZXMgPiAwID8gcGFnZXMgLSAxIDogMAogICAgZHVwCiAgICBieiBjaGlsZEV4dHJhUGFnZXNfdGVybmFyeV9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLQoKY2hpbGRFeHRyYVBhZ2VzX3Rlcm5hcnlfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0NAogICAgLy8gcmV0dXJuIGV4dHJhID4gbWluRXh0cmFQYWdlcyA/IGV4dHJhIDogbWluRXh0cmFQYWdlcwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo4NQogICAgLy8gcmV0dXJuIHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChjbGVhclNpemUsIExFR0FDWV9DSElMRF9FWFRSQV9QUk9HUkFNX1BBR0VTKQogICAgcHVzaGludCAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDQKICAgIC8vIHJldHVybiBleHRyYSA+IG1pbkV4dHJhUGFnZXMgPyBleHRyYSA6IG1pbkV4dHJhUGFnZXMKICAgID4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICBwdXNoaW50IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0NAogICAgLy8gcmV0dXJuIGV4dHJhID4gbWluRXh0cmFQYWdlcyA/IGV4dHJhIDogbWluRXh0cmFQYWdlcwogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo4NQogICAgLy8gcmV0dXJuIHRoaXMuY2hpbGRFeHRyYVBhZ2VzQXRMZWFzdChjbGVhclNpemUsIExFR0FDWV9DSElMRF9FWFRSQV9QUk9HUkFNX1BBR0VTKQogICAgcmV0c3ViCgpjaGlsZEV4dHJhUGFnZXNfdGVybmFyeV9mYWxzZUA3OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDMKICAgIC8vIGNvbnN0IGV4dHJhOiB1aW50NjQgPSBwYWdlcyA+IDAgPyBwYWdlcyAtIDEgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBjaGlsZEV4dHJhUGFnZXNfdGVybmFyeV9tZXJnZUA4Cg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIArjvBIAg0IYDJhIJYWtpdGFfZGFvAmJjBndhbGxldAxha2l0YV9lc2Nyb3cEFR98dQtFUlI6ZXJyTmRhbwNhYWwLRVJSOmVyckNuc3QBAATFOzLMB3ZlcnNpb24WY2hpbGRfY29udHJhY3RfdmVyc2lvbgtFUlI6ZXJySXhmcgQ+oRgyBK35KuQDcGFsCG5mdF9mZWVzC0VSUjplcnJJcGF5gATqkYDdNhoAjgEAnDEZFEQxGEEAhYIEBICDEe4E8xGctASR3Tx1BJrX0z0nCYIIBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eAE2aNfpDYaAI4NAn0E8gYgBtsHDQdgB+gIAQnSCfwKewAiAAEAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABIEVNig2GgCOAQH1ADEZgQQSMRgQREIJ84oBAYv/vUAABCcHsACJigIBi/9BABeL/icGZUgkW3IIRIv/cABFAUAAAzIQiSKJigMBIov+i/9wAEUBQAAai/2ADnJldmVudWVfc3BsaXRzZUgiWSMIjACLAEyJigIBIkmL/icGZUiBWFsyDjEAMg2L/0AAGUgyA0kiFk8DSU4CUE8DUExQTFAnCFCMAImL/0EABYsCQAErIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAUEAGIsBFYEgEkEAD4sBSwESQQAHSYsDE0AAD4ALRVJSOmVyckhuYmSwACNMi/+AEmNvbnRyb2xsZWRfYWRkcmVzc2VBAAhJFYEgEkAAD4ALRVJSOmVyckl3bHSwAElLAhJBAFAjTIv/gAhyZWZlcnJlcmVBADZJFYEgEkEALk4DSwJLAU8DSU4DTUxBABdMi/8WTwJQTFBMUExQJwgiTwNUUEL/BUUBMgNC/+NIMgNOA0L/zIv/cghMTgJAAAdFASJMQv+hSUsCEkEAC0xzAkgyAxJMQv+PSXMCSE8CEkxC/4SL/3IHTIwAQQAXiwIWgAVhcHBJRExQA4sAEkEABCNC/rUiQv6xNhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgA2GgNJFSQSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnCk8EZycLTwNnKE8CZytMZyNDIoAAMRYlCUk4ECMSRDEWIwlHAjgQgQQSRDYaAUkVJBJEF04CNhoCSRUkEkQXTgM2GgNJFSQSRBdOAzYaBEkVJBJEF04GNhoFSRUkEkQXTgY2GgZJFSQSRBdOBjYaB0kVJBJEF04GNhoISU4HFYEgEkQ2GglJTgNJIlklCEwVEkQ2GgpJTgNJIllJTgOBIAslCEwVEkQ2GgtJFSQSRBdOBjYaDEkVJBJEFyIoZURMiP1sV2ggTgYxAEw4ABJAAA+AC0VSUjplcnJJcG1zsABLATgTMgMSQAAPgAtFUlI6ZXJyTmNsd7AASwE4FTIDEkAAD4ALRVJSOmVyck5jbHOwAEsBOCAyAxJAAA+AC0VSUjplcnJOcmt5sABLATgUMgoSQAAEJwywAEsBOBJJTghAAAQnDLAATDgRSUsFE0AAD4ALRVJSOmVyclBpdGGwAElxCkQyAxJBARlJcQlEMgMSQQEPI0AAD4ALRVJSOmVyclBzemKwACIoZUxOAkQiRRJPAkAAckUBRQFFAYGIJ0UOIk8ISwJPBE8JTwlLD08PTw9PD08PTw9PDk8OiAcVsUlyCEQyELIIsgcjshAisgG2SwEWIrIZSwGyGCcNshqyGoEGshAisgGzsUlyCERPArIRTwKyErIUgQSyECKyAbMWJwRMULAjQ7FHAnELREwWAQEjFk8EJwZlSIFIW7IYgAQf98dMshpPArIaTwSyGkyyGk8CshqyGoAJAAdyb3lhbHR5shqBBrIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWSUITBUSRFcGAElFEBVBAAVLDhdFDksNIQYNQf8lIQZFDkL/HiJC/u4xFiUJRwI4EIEGEkQxFiMJSU4DOBAjEkQ2GgFJFSQSRBdOAzYaAkkVJBJEF04DNhoDSRUkEkQXTgM2GgRJFSQSRBdOAzYaBUkVJBJEF04DNhoGSRUkEkQXTgM2GgdJFSQSRBdOAzYaCElOBBWBIBJENhoJSRUkEkQXTgM2GgpJFSQSRBciKGVETIj7HFdoIE4DORoAJw4SQQCQSTgZQACKI0AAD4ALRVJSOmVyckJtcHSwACIoZURMOBhJTgJJcgdETwInBmVIgRhbcghEEkSABW93bmVyZUgyChJAAA+AC0VSUjplcnJOcGJvsAAjTgJJTgNPDU8NTw0iTw5PDk8OTw5PDk8OTw6IBUKxSXIIRE8CshgnDrIashqBBrIQIrIBsxYnBExQsCNDIkL/cyKAADYaAUkVJBJEF0lyB0QyChJAAA+AC0VSUjplcnJOcmFmsAAyCnMATElPAkQyCnMBTE4CRE8DSYAGZnVuZGVyZUhJVwAgRQeBIFtOA7GBBbIZshiABCSHwyyyGoEGshAisgGzMgpJTgJzAExJTgJOA0QMQQA8TwQJTHMBTElPAkRLAwxBACRPAkwJCElLAg1MTgJNSUUCQQAPsUmyCEsBsgcjshAisgGzI0NIRQEiQv/ZSE8DSCJC/782GgFJFSMSRCJTNhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXiAOaVxAIJwRMULAjQzYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBciKGVEKmVISUAAJUgxADIJEkAABCcFsAAnC08CZym9RQFAAAYpTLlII0MpTNNC//gxAExyCEQSQv/XNhoBSRUkEkQXSTYaAkkiWSUISwEVEkRXAgBMgfAPCjEWTAkjCUlOAzgQgQYSQQBUSwI4GDIIEkEASksCOBuBAxJBAEBLAjgZQAA5SwI5GgAnCRJBAC5LAjgAMQASQQAkI0AAD4ALRVJSOmVyckljb3KwACm9RQFAAAQnB7AAKU4CuyNDIkL/2TEAIihlRCplSHIIRBJAAAQnBbAAKbxII0MxFiMJRwI4ECMSRDYaAUkVJBJEF0lOAyIrZUxJTgJOBUQiKGVETCVbcghETwKI+DxMOAcyChJAAA+AC0VSUjplcnJJcG1ysABMOAgyECNLAwgLEkAAD4ALRVJSOmVycklwbWGwALEyCksDshEishKyFIEEshAisgGzQQFTRwIiWUsBFVJXAgCAABNBAUIiKGVESSplSExJJw9lSElXCAhOAiRbTgMiK2VMSU4CRQdESSJZSwEVUklOAlcCAEwqZUhMsSMWTgJJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGoEGshAisgGztD5JVwQASwFXAAQnBBJESSJZgSkLJQhMFRJEVwYpIltJQAAPgAtFUlI6ZXJyTmVzY7AASwYlW0lPAhJAAA+AC0VSUjplcnJXZXNjsACxTwRJshiABFrfM4+yGk8EshpPArIaTwKyGoAKAAEAAAAAAAAAALIagAIAALIagQayECKyASIoZURPAklOAnIIREsGSU4EiPbrMhALtkxyCESyB7III7IQIrIBtksBFkwWgAIAAUxQTwOyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVEIitlRCVbcghETwKI9oAyECNPAggLFicETFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEKmVIcghEEkAABCcFsAArTGcjQzYaAUkiWSUISwEVEkRXAgAxACIoZUQqZUhyCEQSQAAEJwWwACIoZUQnD2VIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJwpMZyNDNhoBSRUkEkQXMQAiKGVEKmVIcghEEkAABCcFsAAoTGcjQ4oEASKL/RSL/BFAAAQyEIwAi/5BAAeLADIQCIwAi/xAAGUiKGVEi/2I9YQhBAiL/kAAQiEECDIBiwAISwEIi/+B1K+gBgsiKGVEJxBlSIFYW4EEiAKCIwiBoI0GCwiBrMNGCE8CCEsBCE8CFk8CFlBMFlBMiSIoZUSL/oj1MYGYrRgICEL/r4v+QAAFIQRC/6UiKGVEi/6I9RWB4L0TCEL/lIoOASIpvUUBQAAEJwewAIv3i/YNQQHxi/cyBw1BAekjQAAPgAtFUlI6ZXJySWVucrAAi/pBAc2L+ov5D0EBxSNAAA+AC0VSUjplcnJJdGJksACL9UEACzIKi/VwAEUBQQGeI0AAD4ALRVJSOmVyck5vcHSwAIvyi/SL9Yv+iP7eSSJbTEkkW0yBEFsiKGVEJxBlSIvzOAcyChJAAAQnEbAAi/M4CEsCEkAABCcRsACxIitlREklW3IIRE8CgVhbsgiyByOyECKyAbOxi/QWJwgii/JUi/UWSU4CjACL9haL9xYxAIvzOABPCBZQi/gWi/kWi/oWi/sWi/wWIihlRBaAAgAii/9QTw5QIogA/iOIAPoliAD2gQOIAPGBBIgBFoEKsjWBF7I0IrIZsjiABAuBAUOyQk8DskBPArJATLJAskCABP3id36yGk8NshpPC7IaTwuyGk8KshpPCbIaTwiyGk8HshpPBrIaTwWyGk8EshpPA7IaTwKyGov9shpMshqyGoEGshAisgGztwA9SbFyCEQyAU8ECLIIsgcjshAisgGzi/VBACixRwJyCEQyELIIsgcjshAisgG2IrIZshgnDbIaiwCyGoEGshAisgGzsUlyCERPArIIsgcjshAisgG2i/4WIrIZSwGyGIAEvXFI0LIashqBBrIQIrIBs0yJIkL+XyJC/jgiQv4UigEBKYjy7EmL/yEFC0lPAg9BAAVGAoAAiUlOAglJIQUNIQVMTSlOArqJigEBKYjywov/CIGAEAgjCYGAEApJJA5AAA+AC0VSUjplcnJQdGxnsABJQQAMIwlJgQMNgQNOAk2JSCJC//E=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
var BinaryStateValue2 = class {
  constructor(value) {
    this.value = value;
  }
  
  asByteArray() {
    return this.value;
  }
  asString() {
    return this.value !== void 0 ? Buffer.from(this.value).toString("utf-8") : void 0;
  }
};
var RaffleFactoryParamsFactory = class _RaffleFactoryParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,string,uint64,(string,uint64))void":
            return _RaffleFactoryParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the RaffleFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method
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
            return _RaffleFactoryParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the RaffleFactory smart contract using the update(string)void ABI method
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
     * Constructs a no op call for the newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64 ABI method
     *
    * New ASA-prize raffle (principal ABI, spec §6.8). The seller stays `Txn.sender`; `wallet` is the
    seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
    (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when
    the prize is claimed. The +50,000 µA global is part of `newRaffleCost`.
  
    The DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed
    (Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost and are
    107,000 µA short of the new child, so legacy shims could never succeed for them.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static newRaffle(params) {
    return {
      ...params,
      method: "newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.ticketAsset, params.args.startTimestamp, params.args.endTimestamp, params.args.minTickets, params.args.maxTickets, params.args.minEntries, params.args.gateId, params.args.marketplace, params.args.name, params.args.proof, params.args.weightsListCount, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64 ABI method
   *
   * New prize-box raffle (principal ABI, spec §6.8); see `newRaffle`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPrizeBoxRaffle(params) {
    return {
      ...params,
      method: "newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.ticketAsset, params.args.startTimestamp, params.args.endTimestamp, params.args.minTickets, params.args.maxTickets, params.args.minEntries, params.args.gateId, params.args.marketplace, params.args.weightsListCount, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the deleteRaffle(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteRaffle(params) {
    return {
      ...params,
      method: "deleteRaffle(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.appId]
    };
  }
  /**
   * Constructs a no op call for the newRaffleCost(bool,uint64,uint64,uint64)uint64 ABI method
   *
   * exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newRaffleCost(params) {
    return {
      ...params,
      method: "newRaffleCost(bool,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.isPrizeBox, params.args.prizeId, params.args.ticketAsset, params.args.weightsListCount]
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
  /**
   * Constructs a no op call for the mbr()(uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr()(uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
};
var RaffleFactoryFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `RaffleFactoryFactory`
   *
   * @param params The parameters to initialise the app factory with
   */
  constructor(params) {;_class3.prototype.__init8.call(this);_class3.prototype.__init9.call(this);_class3.prototype.__init10.call(this);
    this.appFactory = new (0, _appfactory.AppFactory)({
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
    return new RaffleFactoryClient(this.appFactory.getAppClientById(params));
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
    return new RaffleFactoryClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the RaffleFactory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? RaffleFactoryParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? RaffleFactoryParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new RaffleFactoryClient(result.appClient) };
  }
  /**
   * Get parameters to create transactions (create and deploy related calls) for the current app. A good mental model for this is that these parameters represent a deferred transaction creation.
   */
  __init8() {this.params = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the RaffleFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(RaffleFactoryParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the RaffleFactory smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(RaffleFactoryParamsFactory.update.update(params));
      }
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init9() {this.createTransaction = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the RaffleFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(RaffleFactoryParamsFactory.create.create(params));
      }
    }
  }}
  /**
   * Send calls to the current app
   */
  __init10() {this.send = {
    /**
     * Gets available create methods
     */
    create: {
      /**
       * Creates a new instance of the RaffleFactory smart contract using an ABI method call using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(RaffleFactoryParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new RaffleFactoryClient(result.appClient) };
      }
    }
  }}
}, _class3);
var RaffleFactoryClient = (_class4 = class _RaffleFactoryClient {
  /**
   * The underlying `AppClient` for when you want to have more flexibility
   */
  
  constructor(appClientOrParams) {;_class4.prototype.__init11.call(this);_class4.prototype.__init12.call(this);_class4.prototype.__init13.call(this);_class4.prototype.__init14.call(this);
    this.appClient = appClientOrParams instanceof _appclient.AppClient ? appClientOrParams : new (0, _appclient.AppClient)({
      ...appClientOrParams,
      appSpec: APP_SPEC2
    });
  }
  /**
   * Checks for decode errors on the given return value and maps the return value to the return type for the given method
   * @returns The typed return value or undefined if there was no value
   */
  decodeReturnValue(method, returnValue) {
    return returnValue !== void 0 ? _apparc56.getArc56ReturnValue.call(void 0, returnValue, this.appClient.getABIMethod(method), APP_SPEC2.structs) : void 0;
  }
  /**
   * Returns a new `RaffleFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _RaffleFactoryClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `RaffleFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _RaffleFactoryClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
  __init11() {this.params = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the RaffleFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(RaffleFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the RaffleFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
         * Makes a call to the RaffleFactory smart contract using the `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64` ABI method.
         *
        * New ASA-prize raffle (principal ABI, spec §6.8). The seller stays `Txn.sender`; `wallet` is the
        seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
        (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when
        the prize is claimed. The +50,000 µA global is part of `newRaffleCost`.
    
        The DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed
        (Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost and are
        107,000 µA short of the new child, so legacy shims could never succeed for them.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    newRaffle: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.newRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
     *
     * New prize-box raffle (principal ABI, spec §6.8); see `newRaffle`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newPrizeBoxRaffle: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.newPrizeBoxRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `deleteRaffle(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteRaffle: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.deleteRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newRaffleCost(bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newRaffleCost: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.newRaffleCost(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initBoxedContract: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    loadBoxedContract: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the RaffleFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.params.call(RaffleFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.params.call(RaffleFactoryParamsFactory.mbr(params));
    }
  }}
  /**
   * Create transactions for the current app
   */
  __init12() {this.createTransaction = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the RaffleFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(RaffleFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the RaffleFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
         * Makes a call to the RaffleFactory smart contract using the `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64` ABI method.
         *
        * New ASA-prize raffle (principal ABI, spec §6.8). The seller stays `Txn.sender`; `wallet` is the
        seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
        (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when
        the prize is claimed. The +50,000 µA global is part of `newRaffleCost`.
    
        The DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed
        (Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost and are
        107,000 µA short of the new child, so legacy shims could never succeed for them.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    newRaffle: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.newRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
     *
     * New prize-box raffle (principal ABI, spec §6.8); see `newRaffle`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newPrizeBoxRaffle: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.newPrizeBoxRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `deleteRaffle(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteRaffle: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.deleteRaffle(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newRaffleCost(bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newRaffleCost: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.newRaffleCost(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initBoxedContract: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    loadBoxedContract: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the RaffleFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(RaffleFactoryParamsFactory.mbr(params));
    }
  }}
  /**
   * Send calls to the current app
   */
  __init13() {this.send = {
    /**
     * Gets available update methods
     */
    update: {
      /**
       * Updates an existing instance of the RaffleFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(RaffleFactoryParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the RaffleFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
         * Makes a call to the RaffleFactory smart contract using the `newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64` ABI method.
         *
        * New ASA-prize raffle (principal ABI, spec §6.8). The seller stays `Txn.sender`; `wallet` is the
        seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
        (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when
        the prize is claimed. The +50,000 µA global is part of `newRaffleCost`.
    
        The DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed
        (Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost and are
        107,000 µA short of the new child, so legacy shims could never succeed for them.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    newRaffle: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.newRaffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
     *
     * New prize-box raffle (principal ABI, spec §6.8); see `newRaffle`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newPrizeBoxRaffle: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.newPrizeBoxRaffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `deleteRaffle(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteRaffle: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.deleteRaffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `newRaffleCost(bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newRaffleCost: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.newRaffleCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initBoxedContract: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.initBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    loadBoxedContract: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.loadBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteBoxedContract: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.deleteBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the RaffleFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the RaffleFactory smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(RaffleFactoryParamsFactory.mbr(params));
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
    return new _RaffleFactoryClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the RaffleFactory smart contract using the `newRaffleCost(bool,uint64,uint64,uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async newRaffleCost(params) {
    const result = await this.appClient.send.call(RaffleFactoryParamsFactory.newRaffleCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the RaffleFactory smart contract using the `optInCost(uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(RaffleFactoryParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the RaffleFactory smart contract using the `mbr()(uint64,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mbr(params = { args: [] }) {
    const result = await this.appClient.send.call(RaffleFactoryParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current RaffleFactory app
   */
  __init14() {this.state = {
    /**
     * Methods to access global state for the current RaffleFactory app
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
     * Methods to access box state for the current RaffleFactory app
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
  }}
  newGroup() {
    const client = this;
    const composer = this.algorand.newGroup();
    let promiseChain = Promise.resolve();
    const resultMappers = [];
    return {
      /**
       * Add a newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64 method call against the RaffleFactory contract
       */
      newRaffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newRaffle(params)));
        resultMappers.push((v) => client.decodeReturnValue("newRaffle(pay,axfer,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,string,byte[32][],uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64 method call against the RaffleFactory contract
       */
      newPrizeBoxRaffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPrizeBoxRaffle(params)));
        resultMappers.push((v) => client.decodeReturnValue("newPrizeBoxRaffle(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a deleteRaffle(uint64)void method call against the RaffleFactory contract
       */
      deleteRaffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteRaffle(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a newRaffleCost(bool,uint64,uint64,uint64)uint64 method call against the RaffleFactory contract
       */
      newRaffleCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newRaffleCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("newRaffleCost(bool,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the RaffleFactory contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the RaffleFactory contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the RaffleFactory contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the RaffleFactory contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the RaffleFactory contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("optInCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the RaffleFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the RaffleFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the RaffleFactory contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64) method call against the RaffleFactory contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr()(uint64,uint64,uint64)", v));
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
       * Add a clear state call to the RaffleFactory contract
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
}, _class4);

// src/raffle/factory.ts
var RaffleFactorySDK = class extends _chunkQOKFNKJCjs.BaseSDK {
  constructor(params) {
    super({ factory: RaffleFactoryFactory, ...params }, _chunkF37KWYOWjs.ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID);
  }
  /**
   * Creates a new raffle and returns a RaffleSDK instance.
   * Use `isPrizeBox: true` with `prizeBoxId` for PrizeBox prizes,
   * or omit/set `isPrizeBox: false` with `prizeAsset` and `prizeAmount` for ASA prizes.
   *
   * Sends only the principal-ABI (hinted) creation methods and pays the on-chain `newRaffleCost` quote.
   * The upgraded factory does not route the DEPLOYED creation selectors (no `minEntries`, no hint;
   * Kyle decision K6, 2026-10-04), and this SDK never sends them. Deployed-era behaviour: the
   * pre-upgrade MainNet factory (3569557743) has neither `newRaffleCost` nor the hinted methods, so
   * this SDK cannot create raffles there, and an older SDK cannot create raffles on the upgraded
   * factory. Ship this SDK in lockstep with the Phase 2 RaffleFactory upgrade.
   * @returns RaffleSDK for the newly created raffle
   */
  async newRaffle({
    sender,
    signer,
    isPrizeBox = false,
    ticketAsset,
    startTimestamp,
    endTimestamp,
    minTickets,
    maxTickets,
    minEntries = 0n,
    gateId,
    marketplace,
    weightsListCount,
    wallet = 0n,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const prizeId = isPrizeBox ? BigInt(rest.prizeBoxId) : BigInt(rest.prizeAsset);
    const cost = await this.cost({ isPrizeBox, prizeId, ticketAsset, weightsListCount });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    let appId;
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new (0, _chunk6CKI7TURjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
      ({ return: appId } = await this.client.send.newPrizeBoxRaffle({
        ...sendParams,
        args: {
          prizeBoxTransferTxn,
          payment,
          ticketAsset,
          startTimestamp,
          endTimestamp,
          minTickets,
          maxTickets,
          minEntries,
          gateId,
          marketplace,
          weightsListCount,
          wallet: BigInt(wallet)
        }
      }));
    } else {
      const { prizeAsset, prizeAmount, name, proof } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset),
        receiver: this.client.appAddress
      });
      ({ return: appId } = await this.client.send.newRaffle({
        ...sendParams,
        args: {
          payment,
          assetXfer,
          ticketAsset,
          startTimestamp,
          endTimestamp,
          minTickets,
          maxTickets,
          minEntries,
          gateId,
          marketplace,
          name,
          proof,
          weightsListCount,
          wallet: BigInt(wallet)
        }
      }));
    }
    if (appId === void 0) {
      throw new Error("Failed to create new raffle");
    }
    return new RaffleSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
  }
  /**
   * Gets a RaffleSDK instance for an existing raffle.
   * @param appId - The app ID of the raffle
   * @returns RaffleSDK for the specified raffle
   */
  get({ appId }) {
    return new RaffleSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
  }
  /**
   * Gets the exact ALGO payment `newRaffle` requires, quoted on-chain by the factory
   * (`newRaffleCost`): creation fee + child program/state MBR + child funding + weights boxes.
   */
  async cost({ isPrizeBox = false, prizeId = 0n, ticketAsset = 0n, weightsListCount = 4n } = {}) {
    return await this.client.newRaffleCost({
      args: {
        isPrizeBox,
        prizeId: BigInt(prizeId),
        ticketAsset: BigInt(ticketAsset),
        weightsListCount: BigInt(weightsListCount)
      }
    });
  }
  /**
   * Opts the raffle factory into an asset so it can receive/forward that
   * asset as a rewards referral or prize. When the factory has a named DAO
   * escrow configured, this also eagerly opts the escrow + every revenue-
   * split escrow in via the revenue-manager plugin, so downstream raffle
   * creations/entries don't have to do the rekey dance mid-group.
   */
  async optIn({ sender, signer, asset }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const cost = await this.client.optInCost({ args: { asset } });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    await this.client.send.optIn({
      ...sendParams,
      args: { payment, asset },
      maxFee: _algokitutils.microAlgo.call(void 0, 257e3),
      coverAppCallInnerTransactionFees: true,
      populateAppCallResources: true
    });
  }
  /**
   * Deletes a raffle created by this factory.
   * Can only be called after prize is claimed and all MBR is refunded.
   */
  async deleteRaffle({ sender, signer, appId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.deleteRaffle({
      ...sendParams,
      args: { appId }
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
  /**
   * Updates the Akita DAO Escrow reference.
   */
  async updateAkitaDAOEscrow({ sender, signer, config }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { config }
    });
  }
};
async function newRaffle({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...raffleParams
}) {
  const factory = new RaffleFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.newRaffle(raffleParams);
}

// src/raffle/index.ts
var RAFFLE_BEACON_LAG_ROUNDS = 4n;
var CHUNK_SIZE = 4096n;
var RAFFLE_SELLER_REFERRER_KEY = "seller_referrer";
var RAFFLE_LEGACY_GET_STATE = "getState()(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64)";
var LEGACY_RAFFLE_STATE_FIELDS = [
  "ticketAsset",
  "startTimestamp",
  "endTimestamp",
  "seller",
  "minTickets",
  "maxTickets",
  "entryCount",
  "ticketCount",
  "winningTicket",
  "winner",
  "prize",
  "prizeClaimed",
  "gateId",
  "vrfFailureCount",
  "entryId",
  "refundMbrCursor"
];
function raffleDirectGateCtx(sender) {
  return { principal: sender, wallet: 0n, spender: sender };
}
var RaffleSDK = class extends _chunkQOKFNKJCjs.BaseSDK {
  constructor(params) {
    super({ factory: RaffleFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the raffle.
   */
  async state() {
    if (!await this.usesPrincipalAbi()) {
      return this.legacyState();
    }
    const { return: state } = await this.client.send.getState({ args: {} });
    if (state === void 0) {
      throw new Error("Failed to get raffle state");
    }
    return { ...state, legacyAbi: false };
  }
  /** Reads a pre-principal raffle through its deployed `getState` selector (simulated, not sent). */
  async legacyState() {
    var _a;
    const reader = this.getReaderSendParams();
    const result = await this.client.algorand.newGroup().addAppCallMethodCall({
      ...reader,
      sender: reader.sender,
      appId: this.client.appId,
      method: _algosdk2.default.ABIMethod.fromSignature(RAFFLE_LEGACY_GET_STATE),
      args: []
    }).simulate({ allowUnnamedResources: true, skipSignatures: true });
    const returns = _nullishCoalesce(result.returns, () => ( []));
    const tuple = (_a = returns[returns.length - 1]) == null ? void 0 : _a.returnValue;
    if (!Array.isArray(tuple) || tuple.length !== LEGACY_RAFFLE_STATE_FIELDS.length) {
      throw new Error("Failed to get raffle state");
    }
    const state = Object.fromEntries(LEGACY_RAFFLE_STATE_FIELDS.map((field, i) => [field, tuple[i]]));
    return { ...state, minEntries: 0n, failed: false, raffleRound: 0n, legacyAbi: true };
  }
  /**
   * Whether this raffle has the principal ABI (created by the Phase 2 factory: it holds
   * `seller_referrer`). Gated calls then take the hinted overloads and a `Gate.mustCheckFor` gate txn;
   * older raffles keep the pre-principal gated methods and `Gate.mustCheck` (subject: the sender).
   */
  async usesPrincipalAbi() {
    const state = await this.client.appClient.getGlobalState();
    return state[RAFFLE_SELLER_REFERRER_KEY] !== void 0;
  }
  /**
   * Creation-time referrer of the seller's verified wallet, paid when the prize is claimed
   * ('' on raffles created before the principal ABI).
   */
  async sellerReferrer() {
    const state = await this.client.appClient.getGlobalState();
    const value = state[RAFFLE_SELLER_REFERRER_KEY];
    if (value === void 0 || !("valueRaw" in value)) {
      return "";
    }
    return _algosdk2.default.encodeAddress(value.valueRaw);
  }
  /**
   * Checks if the raffle is currently live (accepting entries).
   */
  async isLive() {
    const isLive = await this.client.isLive();
    return _nullishCoalesce(isLive, () => ( false));
  }
  /**
   * Gets the MBR (Minimum Balance Requirement) data for raffle operations.
   */
  async mbr() {
    const mbrData = await this.client.mbr();
    return {
      entries: mbrData.entries,
      weights: mbrData.weights,
      entriesByAddress: mbrData.entriesByAddress
    };
  }
  /**
   * Gets an entry by its ID.
   */
  async getEntry({ entryId }) {
    const entry = await this.client.state.box.entries.value(entryId);
    if (entry === void 0) {
      throw new Error(`Entry ${entryId} not found`);
    }
    return entry;
  }
  /**
   * Checks if an address has entered the raffle.
   */
  async isEntered({ address }) {
    try {
      const entryId = await this.client.state.box.entriesByAddress.value(address);
      return entryId !== void 0;
    } catch (e) {
      return false;
    }
  }
  /**
   * Gets the entry ID for an address.
   */
  async getEntryByAddress({ address }) {
    const entryId = await this.client.state.box.entriesByAddress.value(address);
    if (entryId === void 0) {
      throw new Error(`No entry found for address ${address}`);
    }
    return entryId;
  }
  /**
   * Gets the ticket count for an entry from the weights boxmap.
   * @param entryId - The entry ID to look up
   * @returns The ticket count for the entry
   */
  async getTicketCount({ entryId }) {
    const id = BigInt(entryId);
    const boxIndex = id / CHUNK_SIZE;
    const slotIndex = Number(id % CHUNK_SIZE);
    const weightsBox = await this.client.state.box.weights.value(boxIndex);
    if (weightsBox === void 0) {
      throw new Error(`Weights box ${boxIndex} not found`);
    }
    return weightsBox[slotIndex];
  }
  /**
   * Gets an entry with its ticket count combined.
   * This is a convenience method that fetches both entry data and the ticket count
   * from the weights boxmap in a single call.
   */
  async getEntryWithTickets({ entryId }) {
    const id = BigInt(entryId);
    const boxIndex = id / CHUNK_SIZE;
    const slotIndex = Number(id % CHUNK_SIZE);
    const [entry, weightsBox] = await Promise.all([
      this.client.state.box.entries.value(id),
      this.client.state.box.weights.value(boxIndex)
    ]);
    if (entry === void 0) {
      throw new Error(`Entry ${entryId} not found`);
    }
    if (weightsBox === void 0) {
      throw new Error(`Weights box ${boxIndex} not found`);
    }
    return {
      ...entry,
      entryId: id,
      ticketCount: weightsBox[slotIndex]
    };
  }
  /**
   * Gets an entry with its ticket count by address.
   * This is a convenience method that looks up the entry ID by address,
   * then fetches both entry data and the ticket count.
   */
  async getEntryWithTicketsByAddress({ address }) {
    var _a, _b;
    let entryId;
    try {
      entryId = await this.client.state.box.entriesByAddress.value(address);
    } catch (error) {
      if (((_a = error == null ? void 0 : error.message) == null ? void 0 : _a.includes("box not found")) || ((_b = error == null ? void 0 : error.message) == null ? void 0 : _b.includes("404"))) {
        throw new Error(`No entry found for address ${address}`);
      }
      throw error;
    }
    if (entryId === void 0) {
      throw new Error(`No entry found for address ${address}`);
    }
    return this.getEntryWithTickets({ entryId });
  }
  /**
   * Gets all entries with their ticket counts.
   * This fetches all entries and their corresponding ticket counts from the weights boxmap.
   * Note: For large raffles, this may require multiple reads.
   */
  async getAllEntriesWithTickets() {
    const [entriesMap, state] = await Promise.all([
      this.client.state.box.entries.getMap(),
      this.state()
    ]);
    const entryCount = state.entryCount;
    const boxCount = (entryCount + CHUNK_SIZE - 1n) / CHUNK_SIZE;
    const weightsPromises = [];
    for (let i = 0n; i < boxCount; i++) {
      weightsPromises.push(this.client.state.box.weights.value(i));
    }
    const weightsBoxes = await Promise.all(weightsPromises);
    const result = [];
    for (const [entryId, entry] of entriesMap) {
      const boxIndex = Number(entryId / CHUNK_SIZE);
      const slotIndex = Number(entryId % CHUNK_SIZE);
      const weightsBox = weightsBoxes[boxIndex];
      if (weightsBox === void 0) {
        throw new Error(`Weights box ${boxIndex} not found`);
      }
      result.push({
        ...entry,
        entryId,
        ticketCount: weightsBox[slotIndex]
      });
    }
    return result;
  }
  // ========== Write Methods ==========
  /**
   * Enters the raffle with tickets.
   * Use `isAsa: true` and `ticketAsset` for ASA tickets, otherwise ALGO is used.
   */
  async enter({
    sender,
    signer,
    amount,
    marketplace,
    isAsa = false,
    gateTxn,
    wallet = 0n,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const mbrData = await this.mbr();
    const mbrCost = mbrData.entries + mbrData.entriesByAddress;
    const group = this.client.newGroup();
    const principalAbi = gateTxn !== void 0 && gateTxn.method.name !== "mustCheck" && await this.usesPrincipalAbi();
    if (isAsa) {
      const { ticketAsset } = rest;
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, mbrCost),
        receiver: this.client.appAddress
      });
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(ticketAsset),
        receiver: this.client.appAddress
      });
      if (gateTxn && principalAbi) {
        group.gatedEnterAsaApplPayAxferAddressUint64Void({
          ...sendParams,
          args: { gateTxn, payment, assetXfer, marketplace, wallet: BigInt(wallet) }
        });
      } else if (gateTxn) {
        group.gatedEnterAsaApplPayAxferAddressVoid({
          ...sendParams,
          args: { gateTxn, payment, assetXfer, marketplace }
        });
      } else {
        group.enterAsa({
          ...sendParams,
          args: { payment, assetXfer, marketplace }
        });
      }
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, BigInt(amount) + mbrCost),
        receiver: this.client.appAddress
      });
      if (gateTxn && principalAbi) {
        group.gatedEnterApplPayAddressUint64Void({
          ...sendParams,
          args: { gateTxn, payment, marketplace, wallet: BigInt(wallet) }
        });
      } else if (gateTxn) {
        group.gatedEnterApplPayAddressVoid({
          ...sendParams,
          args: { gateTxn, payment, marketplace }
        });
      } else {
        group.enter({
          ...sendParams,
          args: { payment, marketplace }
        });
      }
    }
    await group.send(sendParams);
  }
  /**
   * Adds more tickets to an existing entry.
   * Use `isAsa: true` and `ticketAsset` for ASA tickets, otherwise ALGO is used.
   */
  async add({
    sender,
    signer,
    amount,
    isAsa = false,
    gateTxn,
    wallet = 0n,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const group = this.client.newGroup();
    const principalAbi = gateTxn !== void 0 && gateTxn.method.name !== "mustCheck" && await this.usesPrincipalAbi();
    if (isAsa) {
      const { ticketAsset } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(ticketAsset),
        receiver: this.client.appAddress
      });
      if (gateTxn && principalAbi) {
        group.gatedAddAsaApplAxferUint64Void({
          ...sendParams,
          args: { gateTxn, assetXfer, wallet: BigInt(wallet) }
        });
      } else if (gateTxn) {
        group.gatedAddAsaApplAxferVoid({
          ...sendParams,
          args: { gateTxn, assetXfer }
        });
      } else {
        group.addAsa({
          ...sendParams,
          args: { assetXfer }
        });
      }
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, amount),
        receiver: this.client.appAddress
      });
      if (gateTxn && principalAbi) {
        group.gatedAddApplPayUint64Void({
          ...sendParams,
          args: { gateTxn, payment, wallet: BigInt(wallet) }
        });
      } else if (gateTxn) {
        group.gatedAddApplPayVoid({
          ...sendParams,
          args: { gateTxn, payment }
        });
      } else {
        group.add({
          ...sendParams,
          args: { payment }
        });
      }
    }
    await group.send(sendParams);
  }
  /**
   * Sets the minimum number of entries needed for the raffle to be drawn.
   * Seller only, before anyone has entered.
   */
  async setMinEntries({ sender, signer, minEntries }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.setMinEntries({
      ...sendParams,
      args: { minEntries }
    });
  }
  /**
   * Round from which the committed draw can be completed (`raffleRound + 4`), or 0n if nothing has
   * been committed yet. `raffleRound` is a multiple of 8, the rounds the beacon stores.
   */
  async drawReadyRound() {
    const { raffleRound } = await this.state();
    return raffleRound === 0n ? 0n : raffleRound + RAFFLE_BEACON_LAG_ROUNDS;
  }
  /**
   * Two-phase draw (commit-reveal). After the end, the first call either settles the raffle
   * (below minimum participation: prize back to the seller; one ticket: that ticket wins) or
   * commits to a future round. Call again once the chain reaches `drawReadyRound()` to draw.
   */
  async raffle(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.raffle({
      ...sendParams,
      args: {}
    });
  }
  /**
   * Iterates to find the winner based on the winning ticket.
   * May need to be called multiple times for large raffles.
   */
  async findWinner({ sender, signer, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.findWinner({
      ...sendParams,
      args: { iterationAmount }
    });
  }
  /**
   * Claims the raffle prize for the winner.
   * Also distributes royalties to marketplace, creator, and Akita.
   */
  async claimPrize(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.claimRafflePrize({
      ...sendParams,
      args: {}
    });
  }
  /**
   * Refunds MBR to raffle participants after the winner is found.
   * May need to be called multiple times for large raffles.
   */
  async refundMBR({ sender, signer, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.refundMbr({
      ...sendParams,
      args: { iterationAmount }
    });
  }
  /**
   * Clears the weights boxes after the prize has been claimed.
   * Returns the MBR for the weights boxes to the factory.
   */
  async clearWeightsBoxes(params) {
    const sendParams = this.getSendParams(params);
    const { return: returnAmount } = await this.client.send.clearWeightsBoxes({
      ...sendParams,
      args: {}
    });
    if (returnAmount === void 0) {
      throw new Error("Failed to clear weights boxes");
    }
    return returnAmount;
  }
};











exports.RAFFLE_ERROR_MESSAGES = RAFFLE_ERROR_MESSAGES; exports.translateRaffleError = translateRaffleError; exports.RaffleFactorySDK = RaffleFactorySDK; exports.newRaffle = newRaffle; exports.RAFFLE_BEACON_LAG_ROUNDS = RAFFLE_BEACON_LAG_ROUNDS; exports.RAFFLE_SELLER_REFERRER_KEY = RAFFLE_SELLER_REFERRER_KEY; exports.RAFFLE_LEGACY_GET_STATE = RAFFLE_LEGACY_GET_STATE; exports.raffleDirectGateCtx = raffleDirectGateCtx; exports.RaffleSDK = RaffleSDK;
//# sourceMappingURL=chunk-F64X5EO7.js.map
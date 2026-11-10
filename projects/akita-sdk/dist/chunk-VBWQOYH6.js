"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkYA6SW4XNjs = require('./chunk-YA6SW4XN.js');



var _chunkQ5IKYOZSjs = require('./chunk-Q5IKYOZS.js');


var _chunk3QW7XUAWjs = require('./chunk-3QW7XUAW.js');


var _chunkMY4J3UZTjs = require('./chunk-MY4J3UZT.js');

// src/raffle/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');
var _algosdk = require('algosdk'); var _algosdk2 = _interopRequireDefault(_algosdk);

// src/generated/RaffleClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Raffle", "structs": { "EntryData": [{ "name": "account", "type": "address" }, { "name": "marketplace", "type": "address" }], "FindWinnerCursors": [{ "name": "index", "type": "uint64" }, { "name": "amountIndex", "type": "uint64" }], "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "RaffleState": [{ "name": "ticketAsset", "type": "uint64" }, { "name": "startTimestamp", "type": "uint64" }, { "name": "endTimestamp", "type": "uint64" }, { "name": "seller", "type": "address" }, { "name": "minTickets", "type": "uint64" }, { "name": "maxTickets", "type": "uint64" }, { "name": "entryCount", "type": "uint64" }, { "name": "ticketCount", "type": "uint64" }, { "name": "winningTicket", "type": "uint64" }, { "name": "winner", "type": "address" }, { "name": "prize", "type": "uint64" }, { "name": "prizeClaimed", "type": "bool" }, { "name": "gateId", "type": "uint64" }, { "name": "vrfFailureCount", "type": "uint64" }, { "name": "entryId", "type": "uint64" }, { "name": "refundMbrCursor", "type": "uint64" }, { "name": "minEntries", "type": "uint64" }, { "name": "failed", "type": "bool" }, { "name": "raffleRound", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "address", "name": "seller" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "minEntries" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }, { "type": "address", "name": "sellerReferrer" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "setMinEntries", "args": [{ "type": "uint64", "name": "minEntries" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "AR-C: the seller sets the minimum number of entries needed for the raffle to be drawn.\nOnly before anyone has entered, and before the end. Below the minimum the raffle fails:\nthe prize returns to the seller and every entrant is refunded.", "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated entry (principal ABI, spec \xA76.8): the gate subject is the verified context of the\nentrant's `wallet` hint (0 = acting as itself). A plugin passes `windowHint(wallet)`.\nEntries stay keyed by `Txn.sender`.", "events": [], "recommendations": {} }, { "name": "gatedEnter", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedEnter(appl,pay,address)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "enter", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedEnterAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "ASA twin of `gatedEnter` (principal ABI, spec \xA76.8).", "events": [], "recommendations": {} }, { "name": "gatedEnterAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedEnterAsa(appl,pay,axfer,address)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "enterAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAdd", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated ticket top-up (principal ABI, spec \xA76.8).", "events": [], "recommendations": {} }, { "name": "gatedAdd", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedAdd(appl,pay)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "add", "args": [{ "type": "pay", "name": "payment" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedAddAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "ASA twin of `gatedAdd` (principal ABI, spec \xA76.8).", "events": [], "recommendations": {} }, { "name": "gatedAddAsa", "args": [{ "type": "appl", "name": "gateTxn" }, { "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedAddAsa(appl,axfer)void` (registry gate subject; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "addAsa", "args": [{ "type": "axfer", "name": "assetXfer" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Draw, commit-reveal (AR-01):\n- first call after the end settles degenerate raffles (AR-07 / AR-C) or commits to a\n  beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet\n- a later call (BEACON_LAG_ROUNDS after that round) draws the ticket\n- an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after\n  BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round", "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getState", "args": [], "returns": { "type": "(uint64,uint64,uint64,address,uint64,uint64,uint64,uint64,uint64,address,uint64,bool,uint64,uint64,uint64,uint64,uint64,bool,uint64)", "struct": "RaffleState" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 23, "bytes": 10 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "ticketAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2Fzc2V0", "desc": "The asset required to enter the raffle" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "The start round of the raffle as a unix timestamp" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "The end time of the raffle as a unix timestamp" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "minTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluX3RpY2tldHM=", "desc": "The minimum number of tickets to use for the raffle" }, "maxTickets": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWF4X3RpY2tldHM=", "desc": "The maximum number of tickets users can enter the raffle with" }, "entryCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfY291bnQ=", "desc": "The number of entries for the raffle" }, "ticketCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dGlja2V0X2NvdW50", "desc": "The number of tickets entered into the raffle" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "the winning ticket" }, "winner": { "keyType": "AVMString", "valueType": "address", "key": "d2lubmVy", "desc": "the winning address of the raffle" }, "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the prize for the raffle if prizeBox is true prize represents the app id of the prize box, otherwise the asset being raffled" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "Indicator for whether the prize has been claimed" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the amount the creator will get for the sale" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate to use for the raffle" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "the address of the creation side marketplace" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the amount the marketplaces will get for the sale" }, "akitaRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfcm95YWx0eQ==", "desc": "the minimum impact tax for the raffle" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "entryID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW50cnlfaWQ=", "desc": "The id's of the raffle entries" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "the transaction id of the create application call for salting our VRF call" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the future round committed to by the first post-end raffle() call, used for VRF (AR-01)" }, "minEntries": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWluX2VudHJpZXM=", "desc": "AR-C: minimum number of entries for the raffle to be drawn (below it the raffle fails)" }, "failed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZmFpbGVk", "desc": "AR-07 / AR-C: the raffle did not reach minimum participation (or sold no tickets).\nThe prize returns to the seller and every entrant is refunded their tickets." }, "sellerReferrer": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVyX3JlZmVycmVy", "desc": "Referrer of the seller's verified wallet, resolved once by the factory at creation (zero if\nnone) and paid at settlement (spec \xA76.8). Plugins read its EXISTENCE as the marker of this\nchild's principal ABI; children created before it keep their own semantics until they settle." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "entries": { "keyType": "uint64", "valueType": "EntryData", "desc": "The entries for the raffle", "prefix": "ZQ==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "entriesByAddress": { "keyType": "address", "valueType": "uint64", "desc": "The address map of entries for the raffle", "prefix": "YQ==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [2630, 4427, 4817, 4825, 7286, 7466], "errorMessage": "Box must have value" }, { "pc": [1445, 1605, 2196, 3725, 5716, 7836], "errorMessage": "Bytes has valid prefix" }, { "pc": [2480, 6815, 7026], "errorMessage": "ERR:errAent" }, { "pc": [2569], "errorMessage": "ERR:errArfc" }, { "pc": [6800, 7011, 7264, 7444], "errorMessage": "ERR:errBmgn" }, { "pc": [3776], "errorMessage": "ERR:errBnrd" }, { "pc": [7279, 7459], "errorMessage": "ERR:errEdne" }, { "pc": [5847], "errorMessage": "ERR:errFgte" }, { "pc": [5566], "errorMessage": "ERR:errForb" }, { "pc": [6270], "errorMessage": "ERR:errHnbd" }, { "pc": [6174], "errorMessage": "ERR:errHnwl" }, { "pc": [6193], "errorMessage": "ERR:errHtop" }, { "pc": [1947], "errorMessage": "ERR:errIast" }, { "pc": [1992], "errorMessage": "ERR:errIenr" }, { "pc": [2390, 2402, 6836, 6875, 7054, 7068, 7333, 7355], "errorMessage": "ERR:errIpay" }, { "pc": [5615], "errorMessage": "ERR:errIpma" }, { "pc": [5591], "errorMessage": "ERR:errIpmr" }, { "pc": [1226, 1272], "errorMessage": "ERR:errIpms" }, { "pc": [3932, 3944], "errorMessage": "ERR:errIrbd" }, { "pc": [3839], "errorMessage": "ERR:errIrsd" }, { "pc": [2044], "errorMessage": "ERR:errItbd" }, { "pc": [5476], "errorMessage": "ERR:errIupg" }, { "pc": [5880, 6292], "errorMessage": "ERR:errIwlt" }, { "pc": [7082, 7098, 7131, 7513, 7529, 7551], "errorMessage": "ERR:errIxfr" }, { "pc": [2350], "errorMessage": "ERR:errMalf" }, { "pc": [2372], "errorMessage": "ERR:errMamf" }, { "pc": [1909, 2328, 2860], "errorMessage": "ERR:errMbff" }, { "pc": [1240, 1311], "errorMessage": "ERR:errNcls" }, { "pc": [1297], "errorMessage": "ERR:errNclw" }, { "pc": [5400, 5444, 5519], "errorMessage": "ERR:errNdao" }, { "pc": [7873], "errorMessage": "ERR:errNesc" }, { "pc": [3658], "errorMessage": "ERR:errNetm" }, { "pc": [2495, 6772, 6983, 7236, 7416], "errorMessage": "ERR:errNliv" }, { "pc": [1254, 1325], "errorMessage": "ERR:errNrky" }, { "pc": [2469], "errorMessage": "ERR:errNslr" }, { "pc": [4185], "errorMessage": "ERR:errNwty" }, { "pc": [4501], "errorMessage": "ERR:errPacl" }, { "pc": [2076], "errorMessage": "ERR:errPita" }, { "pc": [2526, 2755, 2872], "errorMessage": "ERR:errPncl" }, { "pc": [2772, 2889], "errorMessage": "ERR:errRfnc" }, { "pc": [3514, 4162], "errorMessage": "ERR:errRhne" }, { "pc": [2912], "errorMessage": "ERR:errShwb" }, { "pc": [6994, 7427], "errorMessage": "ERR:errTaal" }, { "pc": [6783, 7247], "errorMessage": "ERR:errTana" }, { "pc": [3537], "errorMessage": "ERR:errWadr" }, { "pc": [3552, 4200], "errorMessage": "ERR:errWafd" }, { "pc": [7900], "errorMessage": "ERR:errWesc" }, { "pc": [2541, 4300, 4478], "errorMessage": "ERR:errWnfd" }, { "pc": [5904], "errorMessage": "account funded" }, { "pc": [1377, 1468, 1487, 1500, 1511, 1627, 4872, 5392, 5436, 5511, 5885, 5909, 7668, 7957, 8007, 8084], "errorMessage": "application exists" }, { "pc": [1929, 2996, 3029, 5005, 5078], "errorMessage": "asset exists" }, { "pc": [2122, 2146, 2151, 2450, 2473, 2487, 2519, 2531, 2545, 2550, 2580, 2584, 2643, 2736, 2748, 2759, 2764, 2778, 2789, 2811, 2820, 2865, 2876, 2881, 2894, 2916, 2925, 2938, 2952, 2969, 2979, 2992, 3026, 3506, 3519, 3542, 3557, 3565, 3573, 3577, 3585, 3597, 3607, 3636, 3664, 3670, 3682, 3753, 3781, 3906, 4154, 4167, 4190, 4205, 4232, 4241, 4251, 4292, 4304, 4400, 4409, 4468, 4483, 4506, 4514, 4528, 4535, 4546, 4557, 4565, 4587, 4605, 4613, 4645, 4653, 4675, 4712, 4720, 4738, 4759, 4811, 4843, 4851, 4858, 4863, 4984, 5002, 5014, 5024, 5046, 5075, 5088, 5098, 5122, 5178, 5183, 5188, 5193, 5198, 5203, 5207, 5211, 5216, 5221, 5226, 5231, 5236, 5241, 5246, 5251, 5256, 5261, 5266, 5385, 5429, 5448, 5504, 5659, 5757, 5993, 6066, 6493, 6528, 6561, 6568, 6591, 6595, 6637, 6646, 6675, 6699, 6718, 6723, 6776, 6793, 6846, 6858, 6879, 6934, 6952, 6961, 6987, 7004, 7090, 7108, 7117, 7135, 7187, 7205, 7214, 7240, 7257, 7343, 7379, 7398, 7420, 7437, 7521, 7539, 7575, 7594, 7622, 7633, 7662, 7729, 7761, 7952], "errorMessage": "check GlobalState exists" }, { "pc": [4570, 4618, 4658, 4725, 4743, 4764, 4908], "errorMessage": "errIpct" }, { "pc": [1344], "errorMessage": "errNcca" }, { "pc": [6944, 7197, 7390, 7586], "errorMessage": "index access is out of bounds" }, { "pc": [2664, 4387, 6929, 7182, 7312, 7365, 7374, 7492, 7561, 7570], "errorMessage": "index out of bounds" }, { "pc": [1356, 1852, 1892, 3728, 5374, 5412, 5719, 7839, 7991], "errorMessage": "invalid array length header" }, { "pc": [1687], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [5420], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [7849], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1729, 1803, 3062, 3115, 3147, 3195, 3260, 3304], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1857, 1897], "errorMessage": "invalid number of bytes for arc4.tuple<smart_contracts/utils/base-contracts/base.ts::EscrowConfig,arc4.static_array<arc4.uint8, 32>>" }, { "pc": [1678, 1697, 1707, 1717, 1748, 1759, 1768, 1778, 1789, 1811, 2315, 2442, 2513, 3070, 3203, 3339, 3433, 4146, 5497, 5542], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3735, 5726], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5379], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1740], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1450, 1610, 2201], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1828, 1871], "errorMessage": "invalid tail pointer at index 0 of (((len+utf8[]),uint64),uint8[32])" }, { "pc": [1848, 1888, 5366], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1823, 1843, 1866, 1883, 5361], "errorMessage": "invalid tuple encoding" }, { "pc": [3043, 3096, 3164, 3229, 3321, 3365, 3414, 3459], "errorMessage": "transaction type is appl" }, { "pc": [3186, 3251, 3295, 3425, 3470, 3493], "errorMessage": "transaction type is axfer" }, { "pc": [2307, 3053, 3106, 3138, 3175, 3240, 3284, 3331, 3375, 3397, 5534], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiA0MDk2IDEwMDAwMCA1MDYwMCA2MzY0MTM2MjIzODQ2NzkzMDA1IDE4NDQ2NzQ0MDczNzA5NTUxNjE1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSA0Mjk0OTY3Mjk1IDEzMTEzMzAwCiAgICBieXRlY2Jsb2NrICJ0aWNrZXRfYXNzZXQiICJlbnRyeV9jb3VudCIgImFraXRhX2RhbyIgInRpY2tldF9jb3VudCIgInByaXplIiAid2lubmVyIiAid190b3RhbHMiICJhIiAid2lubmluZ190aWNrZXQiIDB4MTUxZjdjNzUgInByaXplX2NsYWltZWQiICJ3ZWlnaHRzX2JveF9jb3VudCIgInJlZnVuZF9tYnJfY3Vyc29yIiAic2VsbGVyIiAiZ2F0ZV9pZCIgIkVSUjplcnJJcGF5IiAidyIgInJhZmZsZV9yb3VuZCIgIm1pbl9lbnRyaWVzIiAiZW5kX3RpbWVzdGFtcCIgImNyZWF0b3Jfcm95YWx0eSIgIm1heF90aWNrZXRzIiAiRVJSOmVyckl4ZnIiICJmYWlsZWQiICJhYWwiICJha2l0YV9lc2Nyb3ciICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiICJFUlI6ZXJyTmxpdiIgImUiIDB4MDAgIndhbGxldCIgInZyZl9mYWlsdXJlX2NvdW50IiAiaXNfcHJpemVfYm94IiAibWluX3RpY2tldHMiICJha2l0YV9yb3lhbHR5IiAweDAwMDEgIkVSUjplcnJCbWduIiAiRVJSOmVyck1iZmYiICJzdGFydF90aW1lc3RhbXAiICJtYXJrZXRwbGFjZSIgImZpbmRfd2lubmVyX2N1cnNvcnMiICJFUlI6ZXJyQWVudCIgIkVSUjplcnJQbmNsIiAiRVJSOmVyclduZmQiICJFUlI6ZXJyTmRhbyIgImVudHJ5X2lkIiAweDA2ODEwMSAiRVJSOmVycklwbXMiICJFUlI6ZXJyTmNscyIgIkVSUjplcnJOcmt5IiAiZnVuZGVyIiAic2VsbGVyX3JlZmVycmVyIiAic2FsdCIgIkVSUjplcnJSZm5jIiAiRVJSOmVyclJobmUiICJFUlI6ZXJyV2FmZCIgIm9hbCIgMHgwMDAwICJFUlI6ZXJySXJiZCIgInBhbCIgImNvbnRyb2xsZWRfYWRkcmVzcyIgIkVSUjplcnJJd2x0IiAiYXBwSUQiICJFUlI6ZXJyVGFuYSIgIkVSUjplcnJUYWFsIiAiRVJSOmVyckVkbmUiCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDggLy8gIndpbm5pbmdfdGlja2V0IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJwcml6ZV9jbGFpbWVkIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAzMSAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGVudHJ5SUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlJRCB9KQogICAgYnl0ZWMgNDUgLy8gImVudHJ5X2lkIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDEyIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE3IC8vICJyYWZmbGVfcm91bmQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIG1pbkVudHJpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluRW50cmllcyB9KQogICAgYnl0ZWMgMTggLy8gIm1pbl9lbnRyaWVzIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBmYWlsZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGYWlsZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJmYWlsZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjExMC0xMTUKICAgIC8vIGV4cG9ydCBjbGFzcyBSYWZmbGUgZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlUmFmZmxlLAogICAgLy8gICBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICBwdXNoYnl0ZXNzIDB4MjQ4N2MzMmMgMHhlYTkxODBkZCAvLyBtZXRob2QgImRlbGV0ZUFwcGxpY2F0aW9uKCl2b2lkIiwgbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX2RlbGV0ZUFwcGxpY2F0aW9uX3JvdXRlQDQgbWFpbl91cGRhdGVfcm91dGVANQoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTEwLTExNQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMzUKICAgIHB1c2hieXRlc3MgMHhiZDcxNDhkMCAweDU5ZDcwNjMwIDB4ZjJjZTJmNDYgMHgyYzk0MjUxNCAweDQ4ODM5NTNjIDB4NWM1N2Y2ZDggMHg5NjI3MTJmMSAweDNhOWMyYWE0IDB4MzhlNjI0MzMgMHg0M2E1M2U0ZSAweGYzZTE1ZmNiIDB4ZGM1MGIzNTQgMHg2YTZkOWI5ZiAweDg5MDNjMDNmIDB4NjNiYmI3MzUgMHhlYjE2ODFiNCAweDY5NjUwMWRlIDB4YmQxYjI3ZDEgMHg2NWZjYTk4YiAweDhmYTRhMTYwIDB4NDhlNTljZGQgMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHhkOWEzNWZhNCAweDNlYTExODMyIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiLCBtZXRob2QgInNldE1pbkVudHJpZXModWludDY0KXZvaWQiLCBtZXRob2QgInJlZnVuZE1CUih1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2xlYXJXZWlnaHRzQm94ZXMoKXVpbnQ2NCIsIG1ldGhvZCAiZ2F0ZWRFbnRlcihhcHBsLHBheSxhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJnYXRlZEVudGVyKGFwcGwscGF5LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZW50ZXIocGF5LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRFbnRlckFzYShhcHBsLHBheSxheGZlcixhZGRyZXNzLHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJnYXRlZEVudGVyQXNhKGFwcGwscGF5LGF4ZmVyLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZW50ZXJBc2EocGF5LGF4ZmVyLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRBZGQoYXBwbCxwYXksdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkQWRkKGFwcGwscGF5KXZvaWQiLCBtZXRob2QgImFkZChwYXkpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRBZGRBc2EoYXBwbCxheGZlcix1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRBZGRBc2EoYXBwbCxheGZlcil2b2lkIiwgbWV0aG9kICJhZGRBc2EoYXhmZXIpdm9pZCIsIG1ldGhvZCAicmFmZmxlKCl2b2lkIiwgbWV0aG9kICJmaW5kV2lubmVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGFpbVJhZmZsZVByaXplKCl2b2lkIiwgbWV0aG9kICJpc0xpdmUoKWJvb2wiLCBtZXRob2QgImdldFN0YXRlKCkodWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxib29sLHVpbnQ2NCkiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAibWJyKCkodWludDY0LHVpbnQ2NCx1aW50NjQpIiwgbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBpbml0IHNldE1pbkVudHJpZXMgcmVmdW5kTUJSIGNsZWFyV2VpZ2h0c0JveGVzIGdhdGVkRW50ZXIgbGVnYWN5R2F0ZWRFbnRlciBlbnRlciBnYXRlZEVudGVyQXNhIGxlZ2FjeUdhdGVkRW50ZXJBc2EgZW50ZXJBc2EgZ2F0ZWRBZGQgbGVnYWN5R2F0ZWRBZGQgYWRkIGdhdGVkQWRkQXNhIGxlZ2FjeUdhdGVkQWRkQXNhIGFkZEFzYSByYWZmbGUgZmluZFdpbm5lciBjbGFpbVJhZmZsZVByaXplIGlzTGl2ZSBnZXRTdGF0ZSB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMzEgbWFpbl9tYnJfcm91dGVAMzIgb3B0aW4KICAgIGVycgoKbWFpbl9tYnJfcm91dGVAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2Jhc2UudHM6NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMDdiZDQwMDAwMDAwMDAwYzgxN2Q0MDAwMDAwMDAwMDAwNDlkNAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX29wVXBfcm91dGVAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzAKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTEwLTExNQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZSBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VSYWZmbGUsCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweGZkZTI3NzdlIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsKGFkZHJlc3MsdWludDY0KSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LChzdHJpbmcsdWludDY0KSxhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCm1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGV0ZUFwcGxpY2F0aW9uCgoKLy8gX3B1eWFfbGliLnV0aWwuZW5zdXJlX2J1ZGdldChyZXF1aXJlZF9idWRnZXQ6IHVpbnQ2NCwgZmVlX3NvdXJjZTogdWludDY0KSAtPiB2b2lkOgplbnN1cmVfYnVkZ2V0OgogICAgcHJvdG8gMiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMTAKICAgICsKCmVuc3VyZV9idWRnZXRfd2hpbGVfdG9wQDE6CiAgICBkdXAKICAgIGdsb2JhbCBPcGNvZGVCdWRnZXQKICAgID4KICAgIGJ6IGVuc3VyZV9idWRnZXRfYWZ0ZXJfd2hpbGVANgogICAgaXR4bl9iZWdpbgogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGJ5dGVjIDQ2IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbQogICAgYnl0ZWMgNDYgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW0KICAgIGZyYW1lX2RpZyAtMQogICAgc3dpdGNoIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMEAzIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMUA0CgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANToKICAgIGl0eG5fc3VibWl0CiAgICBiIGVuc3VyZV9idWRnZXRfd2hpbGVfdG9wQDEKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMUA0OgogICAgZ2xvYmFsIE1pblR4bkZlZQogICAgaXR4bl9maWVsZCBGZWUKICAgIGIgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDUKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMEAzOgogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBiIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1CgplbnN1cmVfYnVkZ2V0X2FmdGVyX3doaWxlQDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjpfX3BjZzMyT3V0cHV0KHN0YXRlOiB1aW50NjQpIC0+IHVpbnQ2NDoKX19wY2czMk91dHB1dDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBfX3BjZzMyT3V0cHV0KHN0YXRlOiBQQ0czMlNUQVRFKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMAogICAgLy8gY29uc3QgeG9yc2hpZnRlZCA9IF9fbWFza1RvVWludDMyKG9wLnNocihvcC5zaHIoc3RhdGUsIDE4KSBeIHN0YXRlLCAyNykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTgKICAgIHNocgogICAgZnJhbWVfZGlnIC0xCiAgICBeCiAgICBwdXNoaW50IDI3CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTEgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMQogICAgLy8gY29uc3Qgcm90ID0gb3Auc2hyKHN0YXRlLCA1OSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA1OQogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICBkdXAyCiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIHN3YXAKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHB1c2hpbnQgMzEKICAgICYKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgc2hsCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE5CiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDExIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHwKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFNhZmVQYXltZW50KHR4bjogdWludDY0LCBzZW5kZXI6IGJ5dGVzKSAtPiB2b2lkOgphc3NlcnRTYWZlUGF5bWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTYWZlUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4biwgc2VuZGVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBTZW5kZXIKICAgIGZyYW1lX2RpZyAtMQogICAgPT0KICAgIGJueiBhc3NlcnRTYWZlUGF5bWVudF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNDcgLy8gIkVSUjplcnJJcG1zIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXMKCmFzc2VydFNhZmVQYXltZW50X2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5jbG9zZVJlbWFpbmRlclRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBDbG9zZVJlbWFpbmRlclRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDQ4IC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRTYWZlUGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVQYXltZW50X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA0OSAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0U2FmZVBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcih0eG46IHVpbnQ2NCwgc2VuZGVyOiBieXRlcykgLT4gdm9pZDoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgyCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIodHhuOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIHNlbmRlcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgzCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDQ3IC8vICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRTZW5kZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xhd2JhY2tGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0U2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jbHciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNsdwoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDQ4IC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcl9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODYKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFNhZmVBc3NldFRyYW5zZmVyX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA0OSAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXJfYWZ0ZXJfYXNzZXJ0QDg6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBieXRlcywgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiB1aW50NjQsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQsIHRpbWVUb1VubG9jazogdWludDY0LCBleHBpcmF0aW9uOiB1aW50NjQsIGFsbG9jYXRpb25zOiBVc2VyQWxsb2NhdGlvbltdLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IGJvb2xlYW4sIHJlY2xhaW1UbzogQWNjb3VudCk6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gOCAyCiAgICBwdXNoYnl0ZXMgIiIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY2MAogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgZXJyQ2Fubm90Q2xvc2VPdXRPZkFsZ29Gb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYwCiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBlcnJDYW5ub3RDbG9zZU91dE9mQWxnb0ZvcmJpZGRlbikKICAgIGFzc2VydCAvLyBlcnJOY2NhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC04CiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NjEKICAgIC8vIGNvbnN0IHJld2FyZHNBcHAgPSBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnJld2FyZHMKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NjQKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNTQ1MDAKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY2CiAgICAvLyBpZiAoYXNzZXQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtNwogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY3LTY3OQogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcxCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzIKICAgIC8vIGFtb3VudDogbWJyICsgc3VtCiAgICBkaWcgMgogICAgZnJhbWVfZGlnIC0zCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzAtNjczCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NjctNjc5CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3NAogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3NQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY3LTY3OQogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGRjYWMwOTM1IC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10sYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcyMQogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTQKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4MQogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtNwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5CiAgICBkaWcgMQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OTYKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OTUKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzAxCiAgICAvLyBpZiAoY2xvc2VPdXQpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcwMgogICAgLy8gdHJhbnNmZXJUeG4uc2V0KHsgYXNzZXRDbG9zZVRvOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzIH0pCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAogICAgZnJhbWVfYnVyeSAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcwNS03MTgKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcwOQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MDgtNzExCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnIKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MTIKICAgIC8vIHRyYW5zZmVyVHhuLAogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgMAogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3CiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNzoKICAgIGZyYW1lX2RpZyAtNwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njk1LTY5OQogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogc3VtLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzA1LTcxOAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MTMKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MTQKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjcwNS03MTgKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhhM2ExNmNhYSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQocGF5LGF4ZmVyLHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDkgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2ODIKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4My02OTIKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njg3CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njg4CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2ODYtNjg5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2ODMtNjkyCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjkwCiAgICAvLyBBc3NldChhc3NldCkKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4My02OTIKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDM5NGVhZWIyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMwogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbWJyLnRzOjpGdW5kZXJJbmZvCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDYKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDE1CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDM0CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKCgobGVuK3V0ZjhbXSksdWludDY0KSx1aW50OFszMl0pCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDgKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQ2CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnR1cGxlPHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMzQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKChsZW4rdXRmOFtdKSx1aW50NjQpLHVpbnQ4WzMyXSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDYKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudHVwbGU8c21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZyxhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4+CiAgICBleHRyYWN0IDIgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDAzCiAgICAvLyB0aGlzLnByaXplLnZhbHVlID0gcHJpemUKICAgIGRpZyAxNgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDIKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAzMiAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gdGhpcy5pc1ByaXplQm94LnZhbHVlID0gaXNQcml6ZUJveAogICAgZGlnIDEwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQwNgogICAgLy8gaWYgKHRpY2tldEFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMTQKICAgIGJ6IGNyZWF0ZV9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MDcKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldCh0aWNrZXRBc3NldCkudG90YWwgPiAwLCBlcnJJbnZhbGlkQXNzZXQpCiAgICBkaWcgMTQKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRUb3RhbAogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgYm56IGNyZWF0ZV9hZnRlcl9pZl9lbHNlQDcKICAgIHB1c2hieXRlcyAiRVJSOmVycklhc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFzdAoKY3JlYXRlX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDA5CiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlID0gQXNzZXQodGlja2V0QXNzZXQpCiAgICBkaWcgMTUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM4IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDEwCiAgICAvLyB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlID0gc3RhcnRUaW1lc3RhbXAKICAgIHVuY292ZXIgMTQKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCAmJiBlbmRUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJJbnZhbGlkRW5kaW5nUm91bmQpCiAgICBkaWcgNAogICAgPAogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMTAKICAgIGRpZyAzCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBjcmVhdGVfYm9vbF9mYWxzZUAxMAogICAgaW50Y18xIC8vIDEKCmNyZWF0ZV9ib29sX21lcmdlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICYmIGVuZFRpbWVzdGFtcCA+IEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsIGVyckludmFsaWRFbmRpbmdSb3VuZCkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJZW5yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckllbnIKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTkgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDEyCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9IGVuZFRpbWVzdGFtcAogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQxMwogICAgLy8gdGhpcy5zZWxsZXIudmFsdWUgPSBzZWxsZXIKICAgIHVuY292ZXIgMTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvY2hpbGQudHM6MTEKICAgIC8vIGZ1bmRlciA9IEdsb2JhbFN0YXRlPEZ1bmRlckluZm8+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUZ1bmRlciB9KQogICAgYnl0ZWMgNTAgLy8gImZ1bmRlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTQKICAgIC8vIHRoaXMuZnVuZGVyLnZhbHVlID0gY2xvbmUoZnVuZGVyKQogICAgdW5jb3ZlciAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTUKICAgIC8vIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPSBjcmVhdG9yUm95YWx0eQogICAgdW5jb3ZlciAxMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTcKICAgIC8vIGxvZ2dlZEFzc2VydChtYXhUaWNrZXRzID4gMCAmJiBtYXhUaWNrZXRzID49IG1pblRpY2tldHMsIGVyckludmFsaWRUaWNrZXRCb3VuZHMpCiAgICBkaWcgMgogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMTYKICAgIGRpZyAyCiAgICBkaWcgMgogICAgPj0KICAgIGJ6IGNyZWF0ZV9ib29sX2ZhbHNlQDE2CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlX2Jvb2xfbWVyZ2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDE3CiAgICAvLyBsb2dnZWRBc3NlcnQobWF4VGlja2V0cyA+IDAgJiYgbWF4VGlja2V0cyA+PSBtaW5UaWNrZXRzLCBlcnJJbnZhbGlkVGlja2V0Qm91bmRzKQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMTkKICAgIHB1c2hieXRlcyAiRVJSOmVyckl0YmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXRiZAoKY3JlYXRlX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MTkKICAgIC8vIGxvZ2dlZEFzc2VydChpc1ByaXplQm94IHx8IHByaXplICE9PSB0aWNrZXRBc3NldCwgZXJyUHJpemVJc1RpY2tldEFzc2V0KQogICAgdW5jb3ZlciA4CiAgICBibnogY3JlYXRlX2Jvb2xfdHJ1ZUAyMQogICAgZGlnIDkKICAgIGRpZyA5CiAgICAhPQogICAgYnogY3JlYXRlX2Jvb2xfZmFsc2VAMjIKCmNyZWF0ZV9ib29sX3RydWVAMjE6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlX2Jvb2xfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDE5CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNQcml6ZUJveCB8fCBwcml6ZSAhPT0gdGlja2V0QXNzZXQsIGVyclByaXplSXNUaWNrZXRBc3NldCkKICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQaXRhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBpdGEKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBtaW5UaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5UaWNrZXRzIH0pCiAgICBieXRlYyAzMyAvLyAibWluX3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyB0aGlzLm1pblRpY2tldHMudmFsdWUgPSBtaW5UaWNrZXRzCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMwCiAgICAvLyBtYXhUaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXhUaWNrZXRzIH0pCiAgICBieXRlYyAyMSAvLyAibWF4X3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyB0aGlzLm1heFRpY2tldHMudmFsdWUgPSBtYXhUaWNrZXRzCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBtaW5FbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pbkVudHJpZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJtaW5fZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MjIKICAgIC8vIHRoaXMubWluRW50cmllcy52YWx1ZSA9IG1pbkVudHJpZXMKICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQyMwogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAxNCAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIHRoaXMuZ2F0ZUlELnZhbHVlID0gZ2F0ZUlECiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAzOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI1CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlLnZhbHVlID0gbWFya2V0cGxhY2UKICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDUxIC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlID0gc2VsbGVyUmVmZXJyZXIKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDI1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMgogICAgLy8gY29uc3QgZmVlcyA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgcHVzaGJ5dGVzICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzMKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBmZWVzLnJhZmZsZUNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBkdXAKICAgIHB1c2hpbnQgMTEyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGZlZXMucmFmZmxlQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTMgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzUKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDQtMjA3CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExNwogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDQtMjA3CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA5IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gdGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPSBpbXBhY3RSYW5nZShpbXBhY3QsIGZlZXMucmFmZmxlU2FsZUltcGFjdFRheE1pbiwgZmVlcy5yYWZmbGVTYWxlSW1wYWN0VGF4TWF4KQogICAgZGlnIDEKICAgIHB1c2hpbnQgOTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBzd2FwCiAgICBwdXNoaW50IDEwNAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk5CiAgICAvLyBjb25zdCBtaW5JbXBhY3Q6IHVpbnQ2NCA9IChpbXBhY3QgPiAxKSA/IGltcGFjdCAtIDEgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogY3JlYXRlX3Rlcm5hcnlfZmFsc2VAMzIKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgIC0KCmNyZWF0ZV90ZXJuYXJ5X21lcmdlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDAKICAgIC8vIHJldHVybiBtYXggLSAoKChtYXggLSBtaW4pICogbWluSW1wYWN0KSAvIElNUEFDVF9ESVZJU09SKQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIC0KICAgIHVuY292ZXIgMgogICAgKgogICAgcHVzaGludCAxMDAwCiAgICAvCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzQgLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSA9IGltcGFjdFJhbmdlKGltcGFjdCwgZmVlcy5yYWZmbGVTYWxlSW1wYWN0VGF4TWluLCBmZWVzLnJhZmZsZVNhbGVJbXBhY3RUYXhNYXgpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWUgPSBuZXcgYXJjNC5TdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBwdXNoaW50IDEyMAogICAgYnplcm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlID0gbmV3IGFyYzQuU3RhdGljQXJyYXk8VWludDY0LCAxNT4oKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzQKICAgIC8vIHNhbHQgPSBHbG9iYWxTdGF0ZTxieXRlcz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNTIgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyB0aGlzLnNhbHQudmFsdWUgPSBUeG4udHhJZAogICAgdHhuIFR4SUQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyc0N1cnNvciB9KQogICAgYnl0ZWMgNDAgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBpbmRleDogMCwgYW1vdW50SW5kZXg6IDEgfQogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY3JlYXRlX3Rlcm5hcnlfZmFsc2VAMzI6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTkKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGNyZWF0ZV90ZXJuYXJ5X21lcmdlQDMzCgpjcmVhdGVfYm9vbF9mYWxzZUAyMjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDIzCgpjcmVhdGVfYm9vbF9mYWxzZUAxNjoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDE3CgpjcmVhdGVfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZV9ib29sX21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaW5pdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDQzCiAgICAvLyBpbml0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgd2VpZ2h0TGlzdExlbmd0aDogdWludDY0KSB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM3IC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgppbml0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPj0gNCwgZXJyTXVzdEFsbG9jYXRlQXRMZWFzdEZvdXJIaWdoZXN0Qmlkc0NodW5rcykKICAgIGR1cAogICAgcHVzaGludCA0CiAgICA+PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyck1hbGYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWFsZgoKaW5pdF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh3ZWlnaHRMaXN0TGVuZ3RoIDwgMTYsIGVyck11c3RBbGxvY2F0ZUF0TW9zdEZpZnRlZW5IaWdoZXN0Qmlkc0NodW5rcykKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgPAogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyck1hbWYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWFtZgoKaW5pdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGNvbnN0IHdlaWdodHNNQlI6IHVpbnQ2NCA9ICh3ZWlnaHRMaXN0TGVuZ3RoICogdGhpcy5tYnIoKS53ZWlnaHRzKQogICAgZHVwCiAgICBpbnRjIDEyIC8vIDEzMTEzMzAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDUyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKaW5pdF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gd2VpZ2h0c01CUiwgZXJySW52YWxpZFBheW1lbnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NQogICAgLy8gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPSB3ZWlnaHRMaXN0TGVuZ3RoCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgppbml0X3doaWxlX3RvcEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGR1cAogICAgZGlnIDIKICAgIDwKICAgIGJ6IGluaXRfYWZ0ZXJfd2hpbGVAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIHRoaXMud2VpZ2h0cyhpKS5jcmVhdGUoKQogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNiAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gdGhpcy53ZWlnaHRzKGkpLmNyZWF0ZSgpCiAgICBwdXNoaW50IDMyNzY4CiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGluaXRfd2hpbGVfdG9wQDEyCgppbml0X2FmdGVyX3doaWxlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ0MwogICAgLy8gaW5pdChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHdlaWdodExpc3RMZW5ndGg6IHVpbnQ2NCkgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnNldE1pbkVudHJpZXNbcm91dGluZ10oKSAtPiB2b2lkOgpzZXRNaW5FbnRyaWVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gc2V0TWluRW50cmllcyhtaW5FbnRyaWVzOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSwgZXJyTm90U2VsbGVyKQogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTMgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSwgZXJyTm90U2VsbGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogc2V0TWluRW50cmllc19hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnNsciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOc2xyCgpzZXRNaW5FbnRyaWVzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gMCwgZXJyQWxyZWFkeUVudGVyZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IDAsIGVyckFscmVhZHlFbnRlcmVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNldE1pbkVudHJpZXNfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQxIC8vICJFUlI6ZXJyQWVudCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBZW50CgpzZXRNaW5FbnRyaWVzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIGVyck5vdExpdmUpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDE5IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIGVyck5vdExpdmUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIGJueiBzZXRNaW5FbnRyaWVzX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyNyAvLyAiRVJSOmVyck5saXYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmxpdgoKc2V0TWluRW50cmllc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIG1pbkVudHJpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluRW50cmllcyB9KQogICAgYnl0ZWMgMTggLy8gIm1pbl9lbnRyaWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3MAogICAgLy8gdGhpcy5taW5FbnRyaWVzLnZhbHVlID0gbWluRW50cmllcwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NjYKICAgIC8vIHNldE1pbkVudHJpZXMobWluRW50cmllczogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmVmdW5kTUJSW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVmdW5kTUJSOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDczCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTAgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0MiAvLyAiRVJSOmVyclBuY2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUG5jbAoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQzIC8vICJFUlI6ZXJyV25mZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXbmZkCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMiAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyeUNvdW50LnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICE9CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJBcmZjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFyZmMKCnJlZnVuZE1CUl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDEyIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4MgogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuZW50cnlDb3VudC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODMKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGNvbnN0IG9wVXBJdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCA9IGl0ZXJhdGlvbkFtb3VudCAqIDEyMAogICAgcHVzaGludCAxMjAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODkKICAgIC8vIGVuc3VyZUJ1ZGdldChvcFVwSXRlcmF0aW9uQW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAoKcmVmdW5kTUJSX3doaWxlX3RvcEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAyCiAgICBkaWcgMgogICAgKwogICAgZGlnIDEKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl93aGlsZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MgogICAgLy8gY29uc3QgeyBhY2NvdW50IH0gPSB0aGlzLmVudHJpZXMoaSkudmFsdWUKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDI4IC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIGNvbnN0IHsgYWNjb3VudCB9ID0gdGhpcy5lbnRyaWVzKGkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0OTQKICAgIC8vIGxldCBkaXNidXJzZW1lbnRDb3N0OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk1CiAgICAvLyBpZiAodGhpcy5mYWlsZWQudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTgzCiAgICAvLyBmYWlsZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGYWlsZWQgfSkKICAgIGJ5dGVjIDIzIC8vICJmYWlsZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk1CiAgICAvLyBpZiAodGhpcy5mYWlsZWQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI0NQogICAgLy8gcmV0dXJuIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgZHVwbiAyCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTYgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIHJldHVybiB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIHN3YXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk2CiAgICAvLyBkaXNidXJzZW1lbnRDb3N0ID0gdGhpcy5zZW5kVGlja2V0c09yRGlzYnVyc2UoYWNjb3VudCwgdGhpcy50aWNrZXRzT2YoaSkpCiAgICBkaWcgNwogICAgc3dhcAogICAgY2FsbHN1YiBzZW5kVGlja2V0c09yRGlzYnVyc2UKICAgIGJ1cnkgNgoKcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyB0aGlzLmVudHJpZXMoaSkuZGVsZXRlKCkKICAgIHVuY292ZXIgMgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICBkaWcgNgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDk5CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoYWNjb3VudCkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ4NgogICAgLy8gY29uc3QgZW50cnlUb3RhbE1CUjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNiAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwMQogICAgLy8gaWYgKGVudHJ5VG90YWxNQlIgPiBkaXNidXJzZW1lbnRDb3N0ICYmIHRoaXMuY2FuUmVjZWl2ZUFsZ28oYWNjb3VudCwgZW50cnlUb3RhbE1CUiAtIGRpc2J1cnNlbWVudENvc3QpKSB7CiAgICBkaWcgNQogICAgPgogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo0ODYKICAgIC8vIGNvbnN0IGVudHJ5VG90YWxNQlI6IHVpbnQ2NCA9IGNvc3RzLmVudHJpZXMgKyBjb3N0cy5lbnRyaWVzQnlBZGRyZXNzCiAgICBpbnRjIDYgLy8gNTA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDEKICAgIC8vIGlmIChlbnRyeVRvdGFsTUJSID4gZGlzYnVyc2VtZW50Q29zdCAmJiB0aGlzLmNhblJlY2VpdmVBbGdvKGFjY291bnQsIGVudHJ5VG90YWxNQlIgLSBkaXNidXJzZW1lbnRDb3N0KSkgewogICAgZGlnIDUKICAgIC0KICAgIGR1cAogICAgYnVyeSA1CiAgICBkaWcgNgogICAgc3dhcAogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDItNTA3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGVudHJ5VG90YWxNQlIgLSBkaXNidXJzZW1lbnRDb3N0LAogICAgLy8gICAgIHJlY2VpdmVyOiBhY2NvdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MDItNTA2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBhbW91bnQ6IGVudHJ5VG90YWxNQlIgLSBkaXNidXJzZW1lbnRDb3N0LAogICAgLy8gICAgIHJlY2VpdmVyOiBhY2NvdW50LAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUwMi01MDcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGFtb3VudDogZW50cnlUb3RhbE1CUiAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHJlZnVuZE1CUl93aGlsZV90b3BAOAoKcmVmdW5kTUJSX2FmdGVyX3doaWxlQDE2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMiAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMiAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTExCiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NDczCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDIgLy8gIkVSUjplcnJQbmNsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBuY2wKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIGVyclJlZnVuZHNOb3RDb21wbGV0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIGVyclJlZnVuZHNOb3RDb21wbGV0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTIgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cnlDb3VudC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIGVyclJlZnVuZHNOb3RDb21wbGV0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1MyAvLyAiRVJSOmVyclJmbmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmZuYwoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxOQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTE5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA+CiAgICBieiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTEgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMAogICAgLy8gY29uc3Qgcmk6IHVpbnQ2NCA9ICh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtIDEpIC0gaQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkaWcgMQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyMQogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTYgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjEKICAgIC8vIHRoaXMud2VpZ2h0cyhyaSkuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxOQogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEA2CgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyNAogICAgLy8gY29uc3QgcmV0dXJuQW1vdW50OiB1aW50NjQgPSB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAqIHRoaXMubWJyKCkud2VpZ2h0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDExIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1MjQKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgKiB0aGlzLm1icigpLndlaWdodHMKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjIDEyIC8vIDEzMTEzMzAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTI4LTUzMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuZnVuZGVyLnZhbHVlLmFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUzMAogICAgLy8gcmVjZWl2ZXI6IHRoaXMuZnVuZGVyLnZhbHVlLmFjY291bnQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2NoaWxkLnRzOjExCiAgICAvLyBmdW5kZXIgPSBHbG9iYWxTdGF0ZTxGdW5kZXJJbmZvPih7IGtleTogR2xvYmFsU3RhdGVLZXlGdW5kZXIgfSkKICAgIGJ5dGVjIDUwIC8vICJmdW5kZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyOC01MzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUyOC01MzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjUxNAogICAgLy8gY2xlYXJXZWlnaHRzQm94ZXMoKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDkgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5kZWxldGVBcHBsaWNhdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUFwcGxpY2F0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM3IC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTAgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQyIC8vICJFUlI6ZXJyUG5jbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQbmNsCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBlcnJSZWZ1bmRzTm90Q29tcGxldGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBlcnJSZWZ1bmRzTm90Q29tcGxldGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzIKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDEyIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJ5Q291bnQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBlcnJSZWZ1bmRzTm90Q29tcGxldGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNTMgLy8gIkVSUjplcnJSZm5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJmbmMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBlcnJTdGlsbEhhc1dlaWdodHNCb3hlcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIGVyclN0aWxsSGFzV2VpZ2h0c0JveGVzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJTaHdiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNod2IKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0NwogICAgLy8gaWYgKHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgIT09IDAgJiYgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMTYKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTQ4CiAgICAvLyBjb25zdCB0aWNrZXRDbG9zZVRvID0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKQogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDgKICAgIC8vIGNvbnN0IHRpY2tldENsb3NlVG8gPSBHbG9iYWwuY3JlYXRvckFkZHJlc3MuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NDgtNTUwCiAgICAvLyBjb25zdCB0aWNrZXRDbG9zZVRvID0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKQogICAgLy8gICA/IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgLy8gICA6IHRoaXMudGlja2V0QXNzZXQudmFsdWUuY3JlYXRvcgogICAgYnogZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9mYWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU0OQogICAgLy8gPyBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwoKZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9tZXJnZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTEtNTU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRpY2tldENsb3NlVG8sCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTQKICAgIC8vIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1NAogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MS01NTUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGlja2V0Q2xvc2VUbywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MS01NTYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGlja2V0Q2xvc2VUbywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDMyIC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjAKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA0IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NTkKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2MC01NjUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gYXNzZXRDbG9zZVRvOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTYyCiAgICAvLyBhc3NldENsb3NlVG86IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTYwLTU2NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTYwLTU2NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjgtNTcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1NjgtNTcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTY4LTU3MgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTM5CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X2ZhbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gOiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmNyZWF0b3IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gOiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmNyZWF0b3IKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgYiBkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDE0CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2F0ZWRFbnRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkRW50ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyBnYXRlZEVudGVyKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50LCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZShnYXRlVHhuLCBmYWxzZSwgd2FsbGV0KQogICAgdW5jb3ZlciAzCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODQKICAgIC8vIHRoaXMuZW50ZXJJbXBsKHBheW1lbnQsIG1hcmtldHBsYWNlLCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgZW50ZXJJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyBnYXRlZEVudGVyKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50LCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmxlZ2FjeUdhdGVkRW50ZXJbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZEVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU4OAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEVudGVyJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZShnYXRlVHhuLCB0cnVlLCAwKQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gdGhpcy5lbnRlckltcGwocGF5bWVudCwgbWFya2V0cGxhY2UsIHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbnRlckltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRFbnRlcicgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmVudGVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5NC01OTcKICAgIC8vIGVudGVyKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjU5OAogICAgLy8gdGhpcy5lbnRlckltcGwocGF5bWVudCwgbWFya2V0cGxhY2UsIGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW50ZXJJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NTk0LTU5NwogICAgLy8gZW50ZXIoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmdhdGVkRW50ZXJBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEVudGVyQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0OAogICAgLy8gZ2F0ZWRFbnRlckFzYShnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwgbWFya2V0cGxhY2U6IEFjY291bnQsIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZShnYXRlVHhuLCBmYWxzZSwgd2FsbGV0KQogICAgdW5jb3ZlciA0CiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIHRoaXMuZW50ZXJBc2FJbXBsKHBheW1lbnQsIGFzc2V0WGZlciwgbWFya2V0cGxhY2UsIHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbnRlckFzYUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDgKICAgIC8vIGdhdGVkRW50ZXJBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50LCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmxlZ2FjeUdhdGVkRW50ZXJBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZEVudGVyQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEVudGVyQXNhJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjU2CiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgdHJ1ZSwgMCkKICAgIHVuY292ZXIgMwogICAgaW50Y18xIC8vIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFzc2VydEdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIHRoaXMuZW50ZXJBc2FJbXBsKHBheW1lbnQsIGFzc2V0WGZlciwgbWFya2V0cGxhY2UsIHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBlbnRlckFzYUltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NTQKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRFbnRlckFzYScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5lbnRlckFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmVudGVyQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY2MC02NjQKICAgIC8vIGVudGVyQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjY1CiAgICAvLyB0aGlzLmVudGVyQXNhSW1wbChwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlLCBmYWxzZSkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVudGVyQXNhSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY2MC02NjQKICAgIC8vIGVudGVyQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2F0ZWRBZGRbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEFkZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTYKICAgIC8vIGdhdGVkQWRkKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gdGhpcy5hc3NlcnRHYXRlKGdhdGVUeG4sIGZhbHNlLCB3YWxsZXQpCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcxOAogICAgLy8gdGhpcy5hZGRJbXBsKHBheW1lbnQsIHRydWUpCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBhZGRJbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzE2CiAgICAvLyBnYXRlZEFkZChnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmxlZ2FjeUdhdGVkQWRkW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRBZGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzIyCiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkQWRkJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjQKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZShnYXRlVHhuLCB0cnVlLCAwKQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFzc2VydEdhdGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjUKICAgIC8vIHRoaXMuYWRkSW1wbChwYXltZW50LCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgYWRkSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcyMgogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEFkZCcgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRbcm91dGluZ10oKSAtPiB2b2lkOgphZGQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzI4CiAgICAvLyBhZGQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjkKICAgIC8vIHRoaXMuYWRkSW1wbChwYXltZW50LCBmYWxzZSkKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFkZEltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MjgKICAgIC8vIGFkZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5nYXRlZEFkZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQWRkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gZ2F0ZWRBZGRBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgZmFsc2UsIHdhbGxldCkKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRHYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzYzCiAgICAvLyB0aGlzLmFkZEFzYUltcGwoYXNzZXRYZmVyLCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgYWRkQXNhSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gZ2F0ZWRBZGRBc2EoZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmxlZ2FjeUdhdGVkQWRkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRBZGRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzY3CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkQWRkQXNhJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzY5CiAgICAvLyB0aGlzLmFzc2VydEdhdGUoZ2F0ZVR4biwgdHJ1ZSwgMCkKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBhc3NlcnRHYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzcwCiAgICAvLyB0aGlzLmFkZEFzYUltcGwoYXNzZXRYZmVyLCB0cnVlKQogICAgaW50Y18xIC8vIDEKICAgIGNhbGxzdWIgYWRkQXNhSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc2NwogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEFkZEFzYScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgphZGRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzczCiAgICAvLyBhZGRBc2EoYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4pOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NzQKICAgIC8vIHRoaXMuYWRkQXNhSW1wbChhc3NldFhmZXIsIGZhbHNlKQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgYWRkQXNhSW1wbAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3MwogICAgLy8gYWRkQXNhKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUucmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKcmFmZmxlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyUmFmZmxlSGFzTm90RW5kZWQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDE5IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyUmFmZmxlSGFzTm90RW5kZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNTQgLy8gIkVSUjplcnJSaG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJobmUKCnJhZmZsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPT09IDAsIGVycldpbm5lckFscmVhZHlEcmF3bikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDggLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgZXJyV2lubmVyQWxyZWFkeURyYXduKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJhZmZsZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2FkciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXYWRyCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODIyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyV2lubmVyQWxyZWFkeUZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lckFscmVhZHlGb3VuZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1NSAvLyAiRVJSOmVycldhZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2FmZAoKcmFmZmxlX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyNAogICAgLy8gaWYgKHRoaXMucmFmZmxlUm91bmQudmFsdWUgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTcgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjQKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODI2CiAgICAvLyBjb25zdCBtaW5FbnRyaWVzOiB1aW50NjQgPSB0aGlzLm1pbkVudHJpZXMudmFsdWUgPiAwID8gdGhpcy5taW5FbnRyaWVzLnZhbHVlIDogMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIG1pbkVudHJpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluRW50cmllcyB9KQogICAgYnl0ZWMgMTggLy8gIm1pbl9lbnRyaWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyNgogICAgLy8gY29uc3QgbWluRW50cmllczogdWludDY0ID0gdGhpcy5taW5FbnRyaWVzLnZhbHVlID4gMCA/IHRoaXMubWluRW50cmllcy52YWx1ZSA6IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByYWZmbGVfdGVybmFyeV9mYWxzZUAxMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIG1pbkVudHJpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluRW50cmllcyB9KQogICAgYnl0ZWMgMTggLy8gIm1pbl9lbnRyaWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyNgogICAgLy8gY29uc3QgbWluRW50cmllczogdWludDY0ID0gdGhpcy5taW5FbnRyaWVzLnZhbHVlID4gMCA/IHRoaXMubWluRW50cmllcy52YWx1ZSA6IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCgpyYWZmbGVfdGVybmFyeV9tZXJnZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjcKICAgIC8vIGlmICh0aGlzLmVudHJ5Q291bnQudmFsdWUgPCBtaW5FbnRyaWVzIHx8IHRoaXMudGlja2V0Q291bnQudmFsdWUgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyNwogICAgLy8gaWYgKHRoaXMuZW50cnlDb3VudC52YWx1ZSA8IG1pbkVudHJpZXMgfHwgdGhpcy50aWNrZXRDb3VudC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiByYWZmbGVfaWZfYm9keUAxMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODI3CiAgICAvLyBpZiAodGhpcy5lbnRyeUNvdW50LnZhbHVlIDwgbWluRW50cmllcyB8fCB0aGlzLnRpY2tldENvdW50LnZhbHVlID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0CgpyYWZmbGVfaWZfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGZhaWxlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZhaWxlZCB9KQogICAgYnl0ZWMgMjMgLy8gImZhaWxlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MjgKICAgIC8vIHRoaXMuZmFpbGVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODI5CiAgICAvLyB0aGlzLndpbm5lci52YWx1ZSA9IHRoaXMuc2VsbGVyLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyOQogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSB0aGlzLnNlbGxlci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyOQogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSB0aGlzLnNlbGxlci52YWx1ZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCnJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJhZmZsZUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MTkKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gaWYgKHRoaXMudGlja2V0Q291bnQudmFsdWUgPT09IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gaWYgKHRoaXMudGlja2V0Q291bnQudmFsdWUgPT09IDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDggLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJhZmZsZUAyNwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODM5CiAgICAvLyB0aGlzLmNvbW1pdERyYXdSb3VuZCgpCiAgICBjYWxsc3ViIGNvbW1pdERyYXdSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVAMjcKCnJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgyNgogICAgLy8gY29uc3QgbWluRW50cmllczogdWludDY0ID0gdGhpcy5taW5FbnRyaWVzLnZhbHVlID4gMCA/IHRoaXMubWluRW50cmllcy52YWx1ZSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIHJhZmZsZV90ZXJuYXJ5X21lcmdlQDExCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDMKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwucm91bmQgPj0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArIEJFQUNPTl9MQUdfUk9VTkRTLCBlcnJOb3RFbm91Z2hUaW1lKQogICAgZ2xvYmFsIFJvdW5kCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE3IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTEFHX1JPVU5EUywgZXJyTm90RW5vdWdoVGltZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDQKICAgICsKICAgID49CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAxOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmV0bSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZXRtCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg0NS04NDgKICAgIC8vIGNvbnN0IHNlZWQgPSBhYmlDYWxsPHR5cGVvZiBSYW5kb21uZXNzQmVhY29uLnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDcKICAgIC8vIGFyZ3M6IFt0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAxNyAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg0NwogICAgLy8gYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNzQKICAgIC8vIHNhbHQgPSBHbG9iYWxTdGF0ZTxieXRlcz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNTIgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg0NgogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg0NgogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjcKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgYnl0ZWMgNTYgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDYKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NDUtODQ4CiAgICAvLyBjb25zdCBzZWVkID0gYWJpQ2FsbDx0eXBlb2YgUmFuZG9tbmVzc0JlYWNvbi5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgLy8gICBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgxODkzOTJjNSAvLyBtZXRob2QgImdldCh1aW50NjQsYnl0ZVtdKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg1MAogICAgLy8gaWYgKHNlZWQubGVuZ3RoID09PSAwKSB7CiAgICBsZW4KICAgIGR1cAogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDI0CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NTEKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwucm91bmQgPj0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArIEJFQUNPTl9NQVhfV0FJVF9ST1VORFMsIGVyckJlYWNvbk5vdFJlYWR5KQogICAgZ2xvYmFsIFJvdW5kCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE3IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTUFYX1dBSVRfUk9VTkRTLCBlcnJCZWFjb25Ob3RSZWFkeSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDEwMDAKICAgICsKICAgID49CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAyMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm5yZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbnJkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg1MgogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDMxIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMzEgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg1MgogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NTMKICAgIC8vIHRoaXMuY29tbWl0RHJhd1JvdW5kKCkKICAgIGNhbGxzdWIgY29tbWl0RHJhd1JvdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnJhZmZsZUAyNwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODU3CiAgICAvLyBjb25zdCBybmdTdGF0ZSA9IHBjZzY0SW5pdChzZWVkLnNsaWNlKDAsIDE2KSkKICAgIGludGNfMCAvLyAwCiAgICBkaWcgMQogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTYKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxNgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE3CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VlZC5sZW5ndGggPT09IDE2LCBlcnJJbnZhbGlkUmFuZG9tU2VlZCkKICAgIGxlbgogICAgcHVzaGludCAxNgogICAgPT0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcnNkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklyc2QKCnJhZmZsZV9hZnRlcl9hc3NlcnRANTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OAogICAgLy8gY29uc3Qgc3RhdGUgPSBfX3BjZzMyU3RlcCgwLCBpbmNyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk5CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhzdGF0ZSwgaW5pdGlhbFN0YXRlKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIHVuY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyAxMCAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgMTAgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE5LTIyCiAgICAvLyByZXR1cm4gWwogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIC8vICAgICBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgLy8gXQogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODYwCiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMudGlja2V0Q291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2MAogICAgLy8gbGV0IHVwcGVyQm91bmQgPSB0aGlzLnRpY2tldENvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NjEKICAgIC8vIGlmICh1cHBlckJvdW5kIDwgTUFYX1VJTlQ2NCkgewogICAgaW50YyA4IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICA8CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2MgogICAgLy8gdXBwZXJCb3VuZCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgKwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgRHluYW1pY0FycmF5PGFyYzQuVWludDY0PigpCiAgICBieXRlYyA1NyAvLyAweDAwMDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDMKICAgIC8vIGlmICh1cHBlckJvdW5kICE9PSAwKSB7CiAgICBkdXAKICAgIGJ6IHJhZmZsZV9lbHNlX2JvZHlANDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDQKICAgIC8vIGxvZ2dlZEFzc2VydCh1cHBlckJvdW5kID4gMSwgZXJySW52YWxpZFJhbmRvbUJvdW5kcykKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM3CiAgICBieXRlYyA1OCAvLyAiRVJSOmVycklyYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXJiZAoKcmFmZmxlX2FmdGVyX2Fzc2VydEAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChsb3dlckJvdW5kIDwgdXBwZXJCb3VuZCAtIDEsIGVyckludmFsaWRSYW5kb21Cb3VuZHMpCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODY1CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxLCBlcnJJbnZhbGlkUmFuZG9tQm91bmRzKQogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDQzCiAgICBieXRlYyA1OCAvLyAiRVJSOmVycklyYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXJiZAoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyh+dmFsdWUsIDEpCiAgICBkdXBuIDIKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTQKICAgIC8vIGNvbnN0IHRocmVzaG9sZDogdWludDY0ID0gX191aW50NjRUd29zKGFic29sdXRlQm91bmQpICUgYWJzb2x1dGVCb3VuZAogICAgc3dhcAogICAgJQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgdW5jb3ZlciAyCgpyYWZmbGVfd2hpbGVfdG9wQDQ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBkaWcgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2NQogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICA8CiAgICBieiByYWZmbGVfYWZ0ZXJfd2hpbGVANDkKCnJhZmZsZV93aGlsZV90b3BANDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNyAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDYKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBibnogcmFmZmxlX3Rlcm5hcnlfZmFsc2VANTcKICAgIHB1c2hpbnQgMjg4NTM5MDA4MTc3NzkyNjgxOAoKcmFmZmxlX3Rlcm5hcnlfbWVyZ2VANTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIHN3YXAKICAgIGR1cAogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTMKICAgIC8vIHJldHVybiBbW25ld1N0YXRlMSwgbmV3U3RhdGUyXSwgb3Auc2hsKF9fcGNnMzJPdXRwdXQoc3RhdGVbMF0pLCAzMikgfCBfX3BjZzMyT3V0cHV0KHN0YXRlWzFdKV0KICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGNhbGxzdWIgX19wY2czMk91dHB1dAogICAgcHVzaGludCAzMgogICAgc2hsCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgX19wY2czMk91dHB1dAogICAgfAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU4CiAgICAvLyBjb25zdCBbbmV3U3RhdGUsIGNhbmRpZGF0ZV0gPSBfX3BjZzY0VW5ib3VuZGVkUmFuZG9tKHN0YXRlKQogICAgZHVwCiAgICBleHRyYWN0IDAgMTYKICAgIGNvdmVyIDQKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjAKICAgIC8vIGlmIChjYW5kaWRhdGUgPj0gdGhyZXNob2xkKSB7CiAgICBkaWcgNgogICAgPj0KICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDQ4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBkaWcgMQogICAgJQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2NQogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgKwogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIHN3YXAKICAgIHVuY292ZXIgMwogICAgYiByYWZmbGVfd2hpbGVfdG9wQDQ0CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUA0ODoKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBiIHJhZmZsZV93aGlsZV90b3BANDYKCnJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDU3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgaW50YyAxMCAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICBiIHJhZmZsZV90ZXJuYXJ5X21lcmdlQDU4CgpyYWZmbGVfYWZ0ZXJfd2hpbGVANDk6CiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjgKICAgIC8vIHJldHVybiBbc3RhdGUsIHJlc3VsdF0KICAgIHB1c2hieXRlcyAweDAwMTIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODY2CiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgZHVwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA4IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NjYKICAgIC8vIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9IHJuZ1Jlc3VsdFsxXVswXS5hc1VpbnQ2NCgpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5yYWZmbGVAMjcKCnJhZmZsZV9lbHNlX2JvZHlANDA6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTEKICAgIC8vIGFic29sdXRlQm91bmQgPSBvcC5idG9pKEJ5dGVzKEJpZ1VpbnQoMiAqKiA2NCkgLSBCaWdVaW50KGxvd2VyQm91bmQpKSkKICAgIGludGMgOCAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgYiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUA0MwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmZpbmRXaW5uZXJbcm91dGluZ10oKSAtPiB2b2lkOgpmaW5kV2lubmVyOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NjkKICAgIC8vIGZpbmRXaW5uZXIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIGVyclJhZmZsZUhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIGVyclJhZmZsZUhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1NCAvLyAiRVJSOmVyclJobmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmhuZQoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIGVyck5vV2lubmluZ1RpY2tldFlldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDggLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSAhPT0gMCwgZXJyTm9XaW5uaW5nVGlja2V0WWV0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOd3R5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck53dHkKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODcyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyV2lubmVyQWxyZWFkeUZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIHdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5lciB9KQogICAgYnl0ZWMgNSAvLyAid2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg3MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmVyLnZhbHVlID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lckFscmVhZHlGb3VuZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNTUgLy8gIkVSUjplcnJXYWZkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldhZmQKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA3CiAgICAvLyBsZXQgc3RhcnRpbmdJbmRleCA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuaW5kZXgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyc0N1cnNvciB9KQogICAgYnl0ZWMgNDAgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjA3CiAgICAvLyBsZXQgc3RhcnRpbmdJbmRleCA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuaW5kZXgKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gbGV0IGN1cnJlbnRSYW5nZVN0YXJ0ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5hbW91bnRJbmRleAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKCmZpbmRXaW5uZXJfd2hpbGVfdG9wQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gd2hpbGUgKHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUgPT09IDAgJiYgc3RhcnRpbmdJbmRleCAvIENodW5rU2l6ZSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlKSB7CiAgICBkdXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBibnogZmluZFdpbm5lcl9ibG9ja0AyMwogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBidXJ5IDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMSAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyB3aGlsZSAoc3RhcnRpbmdJbmRleCAlIENodW5rU2l6ZSA9PT0gMCAmJiBzdGFydGluZ0luZGV4IC8gQ2h1bmtTaXplIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8CiAgICBieiBmaW5kV2lubmVyX2Jsb2NrQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBjb25zdCBib3hTdGFrZSA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW3N0YXJ0aW5nSW5kZXggLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBjb25zdCBib3hTdGFrZSA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW3N0YXJ0aW5nSW5kZXggLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlU3RhcnQgKyBib3hTdGFrZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgOCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlU3RhcnQgKyBib3hTdGFrZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA3CiAgICB1bmNvdmVyIDIKICAgICsKICAgIGR1cAogICAgYnVyeSA3CiAgICA8CiAgICBibnogZmluZFdpbm5lcl9ibG9ja0AyMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIxNgogICAgLy8gc3RhcnRpbmdJbmRleCArPSBDaHVua1NpemUKICAgIGludGMgNCAvLyA0MDk2CiAgICArCiAgICBkaWcgNAogICAgYnVyeSA2CiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDE5CgpmaW5kV2lubmVyX2Jsb2NrQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGl0b2IKICAgIGRpZyA1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB3aW5uaW5nQm94SW5mb1swXQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODc4CiAgICAvLyBsZXQgY3VycmVudFJhbmdlU3RhcnQgPSB3aW5uaW5nQm94SW5mb1sxXQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4ODEKICAgIC8vIGxvZ2dlZEFzc2VydChzdGFydGluZ0luZGV4IDwgdGhpcy5lbnRyeUNvdW50LnZhbHVlLCBlcnJXaW5uZXJOb3RGb3VuZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXJ0aW5nSW5kZXggPCB0aGlzLmVudHJ5Q291bnQudmFsdWUsIGVycldpbm5lck5vdEZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDwKICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyA0MyAvLyAiRVJSOmVyclduZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25mZAoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4ODIKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlIC0gc3RhcnRpbmdJbmRleAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuZW50cnlDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODgzCiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgZGlnIDQKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4NQogICAgLy8gY29uc3QgY2h1bmtPZmZzZXQ6IHVpbnQ2NCA9IHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUKICAgIHN3YXAKICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4NgogICAgLy8gY29uc3QgcmVtYWluaW5nSW5DaHVuazogdWludDY0ID0gQ2h1bmtTaXplIC0gY2h1bmtPZmZzZXQKICAgIGludGMgNCAvLyA0MDk2CiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg4NwogICAgLy8gaWYgKGl0ZXJhdGlvbkFtb3VudCA+IHJlbWFpbmluZ0luQ2h1bmspIHsKICAgID4KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxMQogICAgZGlnIDMKICAgIGJ1cnkgMgoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg5MQogICAgLy8gY29uc3Qgd2VpZ2h0ID0gY2xvbmUodGhpcy53ZWlnaHRzKHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUpLnZhbHVlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTYgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4OTMKICAgIC8vIGNvbnN0IG9wVXBJdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCA9IGl0ZXJhdGlvbkFtb3VudCAqIDQwCiAgICBkaWcgMgogICAgcHVzaGludCA0MAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg5NAogICAgLy8gZW5zdXJlQnVkZ2V0KG9wVXBJdGVyYXRpb25BbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnN1cmVfYnVkZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCgpmaW5kV2lubmVyX3doaWxlX3RvcEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4OTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZGlnIDEKICAgIGRpZyA0CiAgICA8CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX3doaWxlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODk3CiAgICAvLyBjdXJyZW50UmFuZ2VFbmQgPSBjdXJyZW50UmFuZ2VTdGFydCArIHdlaWdodFtjaHVua09mZnNldCArIGldLmFzVWludDY0KCkKICAgIGRpZyA4CiAgICBkaWcgMgogICAgKwogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGRpZyAzCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGRpZyA4CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg5OAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDggLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg5OAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE2CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA4IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4OTgKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPj0gY3VycmVudFJhbmdlU3RhcnQgJiYgdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg5OQogICAgLy8gdGhpcy53aW5uZXIudmFsdWUgPSB0aGlzLmVudHJpZXMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlLmFjY291bnQKICAgIGRpZyAxCiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NAogICAgLy8gZW50cmllcyA9IEJveE1hcDx1aW50NjQsIEVudHJ5RGF0YT4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXMgfSkKICAgIGJ5dGVjIDI4IC8vICJlIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyB0aGlzLndpbm5lci52YWx1ZSA9IHRoaXMuZW50cmllcyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUuYWNjb3VudAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGV4dHJhY3QgMCAzMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gd2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmVyIH0pCiAgICBieXRlYyA1IC8vICJ3aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyB0aGlzLndpbm5lci52YWx1ZSA9IHRoaXMuZW50cmllcyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUuYWNjb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4OTYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgdW5jb3ZlciAyCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgY292ZXIgMgogICAgYnVyeSA4CiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDEyCgpmaW5kV2lubmVyX2FmdGVyX3doaWxlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkwNQogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsgaW5kZXg6IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQsIGFtb3VudEluZGV4OiBjdXJyZW50UmFuZ2VTdGFydCB9CiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgZGlnIDcKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RmluZFdpbm5lcnNDdXJzb3IgfSkKICAgIGJ5dGVjIDQwIC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkwNQogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsgaW5kZXg6IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQsIGFtb3VudEluZGV4OiBjdXJyZW50UmFuZ2VTdGFydCB9CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmNsYWltUmFmZmxlUHJpemVbcm91dGluZ10oKSAtPiB2b2lkOgpjbGFpbVJhZmZsZVByaXplOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJOb3RGb3VuZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJOb3RGb3VuZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJXbmZkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclduZmQKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTEwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZUFscmVhZHlDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTAgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTEwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZUFscmVhZHlDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyclBhY2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUGFjbAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTMKICAgIC8vIGlmICh0aGlzLmZhaWxlZC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGZhaWxlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZhaWxlZCB9KQogICAgYnl0ZWMgMjMgLy8gImZhaWxlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTMKICAgIC8vIGlmICh0aGlzLmZhaWxlZC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyB0aGlzLnRyYW5zZmVyUHJpemUodGhpcy5zZWxsZXIudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyNgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkxNAogICAgLy8gdGhpcy50cmFuc2ZlclByaXplKHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgdHJhbnNmZXJQcml6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MTUKICAgIC8vIHRoaXMucHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuY2xhaW1SYWZmbGVQcml6ZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDgKICAgIC8vIGNsYWltUmFmZmxlUHJpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHRoaXMudHJhbnNmZXJQcml6ZSh0aGlzLndpbm5lci52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHRoaXMudHJhbnNmZXJQcml6ZSh0aGlzLndpbm5lci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIHRyYW5zZmVyUHJpemUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjIKICAgIC8vIGNvbnN0IGFtb3VudHMgPSB0aGlzLmdldEFtb3VudHModGhpcy50aWNrZXRDb3VudC52YWx1ZSwgdGhpcy5pc1ByaXplQm94LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMudGlja2V0Q291bnQudmFsdWUsIHRoaXMuaXNQcml6ZUJveC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDMyIC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBjb25zdCBhbW91bnRzID0gdGhpcy5nZXRBbW91bnRzKHRoaXMudGlja2V0Q291bnQudmFsdWUsIHRoaXMuaXNQcml6ZUJveC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgOAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gbGV0IGNyZWF0b3JBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGlmICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMzkKICAgIC8vIGlmICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDIwIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGRpZyAxCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0MQogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDEKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzMKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGJ1cnkgNwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NgogICAgLy8gbGV0IGFraXRhQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBpZiAodGhpcy5ha2l0YVJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gYWtpdGFSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlBa2l0YVJveWFsdHkgfSkKICAgIGJ5dGVjIDM0IC8vICJha2l0YV9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gaWYgKHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gYWtpdGFBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYWtpdGFSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIGFraXRhUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5QWtpdGFSb3lhbHR5IH0pCiAgICBieXRlYyAzNCAvLyAiYWtpdGFfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIGFraXRhQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NgogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzcKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNDkKICAgIC8vIGlmIChha2l0YUFtb3VudCA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDM4CiAgICBkdXAKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSA4CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzU0CiAgICAvLyBsZXQgbWFya2V0cGxhY2VBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTUKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyNiAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzYKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzU3CiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0NAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNTcKICAgIC8vIGlmIChtYXJrZXRwbGFjZUFtb3VudCA9PT0gMCAmJiB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDQ0CiAgICBkdXAKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSA1CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VANDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY0CiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkgPiBhbW91bnQpIHsKICAgIGRpZyA2CiAgICBkaWcgOAogICAgKwogICAgcHVzaGludCAyCiAgICBkaWcgNgogICAgKgogICAgKwogICAgZGlnIDEKICAgID4KICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA1MAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY3JlYXRvckFtb3VudCA9ICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgPyBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpIDogMAogICAgZGlnIDUKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX3Rlcm5hcnlfZmFsc2VANDgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ2CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDIwIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gKCFpc1ByaXplQm94ICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSA/IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV90ZXJuYXJ5X2ZhbHNlQDQ4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NgogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyMCAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM2NQogICAgLy8gY3JlYXRvckFtb3VudCA9ICghaXNQcml6ZUJveCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgPyBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGRpZyAxCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBidXJ5IDcKCmNsYWltUmFmZmxlUHJpemVfdGVybmFyeV9tZXJnZUA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjYKICAgIC8vIGFraXRhQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmFraXRhUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyBha2l0YVJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUFraXRhUm95YWx0eSB9KQogICAgYnl0ZWMgMzQgLy8gImFraXRhX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzY2CiAgICAvLyBha2l0YUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5ha2l0YVJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzYKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBtdWx3CiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTIKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjYgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjcKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc2CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA1IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NwogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIG11bHcKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIGRpdncKICAgIGJ1cnkgNQoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDUwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3MAogICAgLy8gY29uc3Qgc2VsbGVyQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkpCiAgICBkaWcgNgogICAgZHVwCiAgICBkaWcgOQogICAgZHVwCiAgICBjb3ZlciAzCiAgICArCiAgICBwdXNoaW50IDIKICAgIGRpZyA4CiAgICBkdXAKICAgIGNvdmVyIDUKICAgICoKICAgICsKICAgIHVuY292ZXIgNAogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjM3Mi0zNzcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjQKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyh0aGlzLndpbm5lci52YWx1ZSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTI1CiAgICAvLyBjb25zdCBtYXJrZXRwbGFjZSA9IHRoaXMuZW50cmllcyhsb2MpLnZhbHVlLm1hcmtldHBsYWNlCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjggLy8gImUiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MjUKICAgIC8vIGNvbnN0IG1hcmtldHBsYWNlID0gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUubWFya2V0cGxhY2UKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDMyIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTI4CiAgICAvLyBsZXQgbGVmdG92ZXI6IHVpbnQ2NCA9IGFtb3VudHMuYWtpdGEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyBpZiAoYW1vdW50cy5ha2l0YSA+IDApIHsKICAgIGJ6IGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzAKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDUxIC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsIGFtb3VudHMuYWtpdGEsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciA2CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzAKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgNgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MDMKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDI0CiAgICBkaWcgMgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNgogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGRpZyA0CiAgICBwdXNoYnl0ZXMgIndhbGxldF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MDUKICAgIC8vIGNvbnN0IHsgcmVmZXJyZXJQZXJjZW50YWdlIH0gPSBnZXRXYWxsZXRGZWVzKGFraXRhREFPKQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NgogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNSAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzcKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBkaWcgMQogICAgbXVsdwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBidXJ5IDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkwOAogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMjMKICAgIGR1cAogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkwOQogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYnVyeSAxMAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTUKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkxNgogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICBkdXAKICAgIHB1c2hpbnQgMjU5MjAwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTcKICAgIC8vIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgZGlnIDExCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgNgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAzNSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTItOTIxCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICByZWNsYWltVG8KICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgdW5jb3ZlciA5CiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MTkKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTEyLTkyMQogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIFRISVJUWV9EQVlTKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgcmVjbGFpbVRvCiAgICAvLyApCiAgICB1bmNvdmVyIDExCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTIzCiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgY292ZXIgMgogICAgLQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudFRvQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzMAogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLCBhbW91bnRzLmFraXRhLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTMzCiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTMzCiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzNAogICAgLy8gaWYgKGFtb3VudHMuY3JlYXRvciA+IDApIHsKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzYKICAgIC8vIHRoaXMuc2VuZFRpY2tldHMoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50cy5jcmVhdG9yKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM2CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzKEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudHMuY3JlYXRvcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDUKICAgIGNhbGxzdWIgc2VuZFRpY2tldHMKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy50aWNrZXRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy50aWNrZXRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBzZW5kVG9Ba2l0YUVzY3JvdwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTM5CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzKHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudHMubWFya2V0cGxhY2UpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMzkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjkzOQogICAgLy8gdGhpcy5zZW5kVGlja2V0cyh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnRzLm1hcmtldHBsYWNlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZFRpY2tldHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDAKICAgIC8vIHRoaXMuc2VuZFRpY2tldHMobWFya2V0cGxhY2UsIGFtb3VudHMubWFya2V0cGxhY2UpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VuZFRpY2tldHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIHRoaXMuc2VuZFRpY2tldHModGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudHMuc2VsbGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjYKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTMgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIHRoaXMuc2VuZFRpY2tldHModGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudHMuc2VsbGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBjYWxsc3ViIHNlbmRUaWNrZXRzCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDEwIC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MDgKICAgIC8vIGNsYWltUmFmZmxlUHJpemUoKTogdm9pZCB7CiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jbGFpbVJhZmZsZVByaXplQDE3CgpjbGFpbVJhZmZsZVByaXplX2Vsc2VfYm9keUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDMKICAgIC8vIGlmIChhbW91bnRzLmNyZWF0b3IgPiAwKSB7CiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNQogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzT3JEaXNidXJzZShBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBhbW91bnRzLmNyZWF0b3IpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA0IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDQKICAgIC8vIHRoaXMuc2VuZFRpY2tldHNPckRpc2J1cnNlKEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudHMuY3JlYXRvcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDQKICAgIGNhbGxzdWIgc2VuZFRpY2tldHNPckRpc2J1cnNlCiAgICBwb3AKCmNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy50aWNrZXRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy50aWNrZXRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBzZW5kVG9Ba2l0YUVzY3JvdwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTQ3CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzT3JEaXNidXJzZSh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnRzLm1hcmtldHBsYWNlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDM5IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDcKICAgIC8vIHRoaXMuc2VuZFRpY2tldHNPckRpc2J1cnNlKHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudHMubWFya2V0cGxhY2UpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkaWcgMQogICAgY2FsbHN1YiBzZW5kVGlja2V0c09yRGlzYnVyc2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk0OAogICAgLy8gdGhpcy5zZW5kVGlja2V0c09yRGlzYnVyc2UobWFya2V0cGxhY2UsIGFtb3VudHMubWFya2V0cGxhY2UpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VuZFRpY2tldHNPckRpc2J1cnNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NDkKICAgIC8vIHRoaXMuc2VuZFRpY2tldHNPckRpc2J1cnNlKHRoaXMuc2VsbGVyLnZhbHVlLCBhbW91bnRzLnNlbGxlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEzIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTQ5CiAgICAvLyB0aGlzLnNlbmRUaWNrZXRzT3JEaXNidXJzZSh0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50cy5zZWxsZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGNhbGxzdWIgc2VuZFRpY2tldHNPckRpc2J1cnNlCiAgICBwb3AKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDE2CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIHVuY292ZXIgMwogICAgcG9wCiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjYKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5MzAKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwgYW1vdW50cy5ha2l0YSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBiIGNsYWltUmFmZmxlUHJpemVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzZW5kUmVmZXJyYWxQYXltZW50VG9AMjUKCmNsYWltUmFmZmxlUHJpemVfdGVybmFyeV9mYWxzZUA0ODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozNjUKICAgIC8vIGNyZWF0b3JBbW91bnQgPSAoIWlzUHJpemVCb3ggJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDApID8gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDcKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV90ZXJuYXJ5X21lcmdlQDQ5CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk1OAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZQogICAgYnl0ZWMgMjkgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgc2V0Yml0CiAgICBieXRlYyA5IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuZ2V0U3RhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRTdGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjgKICAgIC8vIHRpY2tldEFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY4CiAgICAvLyB0aWNrZXRBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY5CiAgICAvLyBzdGFydFRpbWVzdGFtcDogdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM4IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY5CiAgICAvLyBzdGFydFRpbWVzdGFtcDogdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTcwCiAgICAvLyBlbmRUaW1lc3RhbXA6IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxOSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzAKICAgIC8vIGVuZFRpbWVzdGFtcDogdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3MQogICAgLy8gc2VsbGVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI2CiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEzIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTcxCiAgICAvLyBzZWxsZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzIKICAgIC8vIG1pblRpY2tldHM6IHRoaXMubWluVGlja2V0cy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBtaW5UaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5UaWNrZXRzIH0pCiAgICBieXRlYyAzMyAvLyAibWluX3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTcyCiAgICAvLyBtaW5UaWNrZXRzOiB0aGlzLm1pblRpY2tldHMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3MwogICAgLy8gbWF4VGlja2V0czogdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDIxIC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzMKICAgIC8vIG1heFRpY2tldHM6IHRoaXMubWF4VGlja2V0cy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTc0CiAgICAvLyBlbnRyeUNvdW50OiB0aGlzLmVudHJ5Q291bnQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzQKICAgIC8vIGVudHJ5Q291bnQ6IHRoaXMuZW50cnlDb3VudC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTc1CiAgICAvLyB0aWNrZXRDb3VudDogdGhpcy50aWNrZXRDb3VudC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB0aWNrZXRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRDb3VudCB9KQogICAgYnl0ZWNfMyAvLyAidGlja2V0X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NQogICAgLy8gdGlja2V0Q291bnQ6IHRoaXMudGlja2V0Q291bnQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NgogICAgLy8gd2lubmluZ1RpY2tldDogdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgOCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyB3aW5uaW5nVGlja2V0OiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3NwogICAgLy8gd2lubmVyOiB0aGlzLndpbm5lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyB3aW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXaW5uZXIgfSkKICAgIGJ5dGVjIDUgLy8gIndpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzcKICAgIC8vIHdpbm5lcjogdGhpcy53aW5uZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gcHJpemU6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0MAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA0IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzgKICAgIC8vIHByaXplOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzkKICAgIC8vIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0NAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NzkKICAgIC8vIHByaXplQ2xhaW1lZDogdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4MAogICAgLy8gZ2F0ZUlEOiB0aGlzLmdhdGVJRC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTgwCiAgICAvLyBnYXRlSUQ6IHRoaXMuZ2F0ZUlELnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5ODEKICAgIC8vIHZyZkZhaWx1cmVDb3VudDogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMzEgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gdnJmRmFpbHVyZUNvdW50OiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTgyCiAgICAvLyBlbnRyeUlEOiB0aGlzLmVudHJ5SUQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gZW50cnlJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUlEIH0pCiAgICBieXRlYyA0NSAvLyAiZW50cnlfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTgyCiAgICAvLyBlbnRyeUlEOiB0aGlzLmVudHJ5SUQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4MwogICAgLy8gcmVmdW5kTUJSQ3Vyc29yOiB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMiAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTgzCiAgICAvLyByZWZ1bmRNQlJDdXJzb3I6IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5ODQKICAgIC8vIG1pbkVudHJpZXM6IHRoaXMubWluRW50cmllcy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc4CiAgICAvLyBtaW5FbnRyaWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1pbkVudHJpZXMgfSkKICAgIGJ5dGVjIDE4IC8vICJtaW5fZW50cmllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5ODQKICAgIC8vIG1pbkVudHJpZXM6IHRoaXMubWluRW50cmllcy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTg1CiAgICAvLyBmYWlsZWQ6IHRoaXMuZmFpbGVkLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxODMKICAgIC8vIGZhaWxlZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUZhaWxlZCB9KQogICAgYnl0ZWMgMjMgLy8gImZhaWxlZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGZhaWxlZDogdGhpcy5mYWlsZWQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gcmFmZmxlUm91bmQ6IHRoaXMucmFmZmxlUm91bmQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE3IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyByYWZmbGVSb3VuZDogdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY3LTk4NwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgdGlja2V0QXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLAogICAgLy8gICBzZWxsZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICBtaW5UaWNrZXRzOiB0aGlzLm1pblRpY2tldHMudmFsdWUsCiAgICAvLyAgIG1heFRpY2tldHM6IHRoaXMubWF4VGlja2V0cy52YWx1ZSwKICAgIC8vICAgZW50cnlDb3VudDogdGhpcy5lbnRyeUNvdW50LnZhbHVlLAogICAgLy8gICB0aWNrZXRDb3VudDogdGhpcy50aWNrZXRDb3VudC52YWx1ZSwKICAgIC8vICAgd2lubmluZ1RpY2tldDogdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlLAogICAgLy8gICB3aW5uZXI6IHRoaXMud2lubmVyLnZhbHVlLAogICAgLy8gICBwcml6ZTogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgcHJpemVDbGFpbWVkOiB0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwKICAgIC8vICAgZ2F0ZUlEOiB0aGlzLmdhdGVJRC52YWx1ZSwKICAgIC8vICAgdnJmRmFpbHVyZUNvdW50OiB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSwKICAgIC8vICAgZW50cnlJRDogdGhpcy5lbnRyeUlELnZhbHVlLAogICAgLy8gICByZWZ1bmRNQlJDdXJzb3I6IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLAogICAgLy8gICBtaW5FbnRyaWVzOiB0aGlzLm1pbkVudHJpZXMudmFsdWUsCiAgICAvLyAgIGZhaWxlZDogdGhpcy5mYWlsZWQudmFsdWUsCiAgICAvLyAgIHJhZmZsZVJvdW5kOiB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLAogICAgLy8gfQogICAgdW5jb3ZlciAxOAogICAgaXRvYgogICAgdW5jb3ZlciAxOAogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDE3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTYKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxNQogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDE0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTMKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciAxMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDExCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTAKICAgIGNvbmNhdAogICAgdW5jb3ZlciA5CiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ5dGVjIDI5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDEwCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgdW5jb3ZlciA3CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA0CiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyAyOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciA0CiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTY2CiAgICAvLyBnZXRTdGF0ZSgpOiBSYWZmbGVTdGF0ZSB7CiAgICBieXRlYyA5IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4udXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDMwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQ0IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDI1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGNvbmZpZykKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDMwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDQgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNTkgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZGVjb2RlQXJjNDxQbHVnaW5BcHBMaXN0PihwbHVnaW5zKS51cGRhdGUKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBlcnJJbnZhbGlkVXBncmFkZSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXVwZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJdXBnCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTQKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIHB1c2hieXRlcyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAzMCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDQgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjUKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbi5vcHRpbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdGluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJGb3JiaWRkZW4pCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyckZvcmIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRm9yYgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLCBlcnJJbnZhbGlkUGF5bWVudEFtb3VudCkKICAgIHN3YXAKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdGluX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYXNzZXJ0R2F0ZShnYXRlVHhuOiB1aW50NjQsIGxlZ2FjeTogdWludDY0LCB3YWxsZXQ6IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0R2F0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzMKICAgIC8vIHByaXZhdGUgYXNzZXJ0R2F0ZShnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwgbGVnYWN5OiBib29sZWFuLCB3YWxsZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiA0CiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gaWYgKGxlZ2FjeSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBhc3NlcnRHYXRlX2Vsc2VfYm9keUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjM2CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5nYXRlU3ViamVjdCgpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjM2CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5nYXRlU3ViamVjdCgpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yVHhuU2VuZGVyKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMjcKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgZGlnIDEKICAgIGJ5dGVjIDU2IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgMjQgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjg2CiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIHB1c2hpbnQgODgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjk0LTI5NwogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA5IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5OQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCAhPT0gOCkgewogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUA2MQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMwMAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDcKCmFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA2MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyMAogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgNwogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUA2NAogICAgZnJhbWVfYnVyeSAwCgphc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjM2CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5nYXRlU3ViamVjdCgpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjM2CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5nYXRlU3ViamVjdCgpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTEyCiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VAODQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ5CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzQ5CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDg0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1MAogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ4LTM1MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VAODQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUxCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzQ4LTM1MQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA4NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTIKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDgtMzUyCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VAODQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUzCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIDUKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0OC0zNTMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA4NAogICAgaW50Y18xIC8vIDEKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBhc3NlZCwgZXJyRmFpbGVkR2F0ZSkKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGZ3RlIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZndGUKCmFzc2VydEdhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICByZXRzdWIKCmFzc2VydEdhdGVfYm9vbF9mYWxzZUA4NDoKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VANjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0Ny0yNTAKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI0OQogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBieXRlYyA2MCAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNDctMjUwCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTEKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDY3CiAgICBkaWcgMQogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDY3CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0R2F0ZV9ib29sX21lcmdlQDY4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTEKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfYXNzZXJ0QDcwCiAgICBieXRlYyA2MSAvLyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKYXNzZXJ0R2F0ZV9hZnRlcl9hc3NlcnRANzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNAogICAgLy8gaWYgKG9yaWdpbiAhPT0gd2FsbGV0SUQuYWRkcmVzcyAmJiBvcmlnaW4gIT09IFR4bi5zZW5kZXIgJiYgb3JpZ2luLmF1dGhBZGRyZXNzICE9PSB3YWxsZXRJRC5hZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgNwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDIKICAgICE9CiAgICBieiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VANzQKICAgIGRpZyAxCiAgICB0eG4gU2VuZGVyCiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDc0CiAgICBkaWcgMQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgNwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUA3NAogICAgZnJhbWVfYnVyeSAwCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lPcmlnaW5PckA3NQoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDc0OgogICAgcG9wCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lPcmlnaW5PckA3NQoKYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDY3OgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0R2F0ZV9ib29sX21lcmdlQDY4Cgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VANjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMwMwogICAgLy8gY29uc3Qgd2FsbGV0ID0gYnRvaShkYXRhKQogICAgYnRvaQogICAgZHVwCiAgICBmcmFtZV9idXJ5IC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gaWYgKHdhbGxldCA9PT0gMCB8fCB3YWxsZXRGYWN0b3J5ID09PSAwKSB7CiAgICBieiBhc3NlcnRHYXRlX2lmX2JvZHlAOTAKICAgIGZyYW1lX2RpZyA2CiAgICBibnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDkxCgphc3NlcnRHYXRlX2lmX2JvZHlAOTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAOTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMwNAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9idXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjg2CiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGIgYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeVdhbGxldElEQDYyCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAOTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MwogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzQKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzcyh3YWxsZXRGYWN0b3J5KQogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDk0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI2NQogICAgLy8gcmV0dXJuIEFjY291bnQob3Auc2hhNTEyXzI1NihCeXRlcygnYXBwSUQnKS5jb25jYXQoaXRvYihhcHBJZCkpKSkKICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBieXRlYyA2MiAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mjc0CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDk0CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMDQKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDk2Cgphc3NlcnRHYXRlX2Jvb2xfZmFsc2VAOTQ6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMDQKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDk2Cgphc3NlcnRHYXRlX2Vsc2VfYm9keUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzOAogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrQ3R4KGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIGdhdGVDdHgocHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSksIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzgKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgyOQogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEzCiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxNAogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAOAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDI5IC8vIDB4MDAKICAgIGNvbmNhdAoKYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA3MiAzMgogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjIzOAogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrQ3R4KGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIGdhdGVDdHgocHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KSksIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAxNCAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyMzgKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTEyCiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzQtODc1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VANTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc1CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzQtODc1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3NgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0LTg3NgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VANTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4OWIxNDdkMmMgLy8gbWV0aG9kICJtdXN0Q2hlY2tGb3IoKGFkZHJlc3MsdWludDY0LGFkZHJlc3MpLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc0LTg3NwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VANTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NzQtODc4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IoR2F0ZU11c3RDaGVja0ZvckFiaU1ldGhvZCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gZW5jb2RlQXJjNChjdHgpICYmCiAgICBieiBhc3NlcnRHYXRlX2Jvb2xfZmFsc2VANTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODc5CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZnJhbWVfZGlnIDUKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg3NC04NzkKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3RvcihHYXRlTXVzdENoZWNrRm9yQWJpTWV0aG9kKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUA1NgogICAgaW50Y18xIC8vIDEKICAgIGIgYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDMKCmFzc2VydEdhdGVfYm9vbF9mYWxzZUA1NjoKICAgIGludGNfMCAvLyAwCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzCgphc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogYXNzZXJ0R2F0ZV9pZl9ib2R5QDEwCiAgICBmcmFtZV9kaWcgNgogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAxMQoKYXNzZXJ0R2F0ZV9pZl9ib2R5QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGJueiBhc3NlcnRHYXRlX2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTU0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludE5vdFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhud2wiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG53bAoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY2CiAgICAvLyBsZXQgdmlhUGx1Z2luID0gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NwogICAgLy8gaWYgKGNhbGxlckFwcCAhPT0gaGludCkgewogICAgZnJhbWVfZGlnIC0xCiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDI3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcxCiAgICAvLyBjb25zdCBbc3BlbmRpbmcsIHNwZW5kaW5nRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfU1BFTkRJTkcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgInNwZW5kaW5nX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MgogICAgLy8gaWYgKCEoc3BlbmRpbmdFeGlzdHMgJiYgc3BlbmRpbmcubGVuZ3RoID09PSAzMiAmJiBzcGVuZGluZyA9PT0gc2VuZGVyLmJ5dGVzICYmIHNlbmRlciAhPT0gY2FsbGVyQWRkcikpIHsKICAgIGJ6IGFzc2VydEdhdGVfaWZfYm9keUAyNQogICAgZnJhbWVfZGlnIDQKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfaWZfYm9keUAyNQogICAgZnJhbWVfZGlnIDQKICAgIGRpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZV9pZl9ib2R5QDI1CiAgICBkdXAKICAgIGZyYW1lX2RpZyAxCiAgICAhPQogICAgYm56IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAyNgoKYXNzZXJ0R2F0ZV9pZl9ib2R5QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90Qm91bmQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhuYmQKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc4CiAgICAvLyB2aWFQbHVnaW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODEKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQnl0ZXMsIGNvbnRyb2xsZWRFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9DT05UUk9MTEVEKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgNjAgLy8gImNvbnRyb2xsZWRfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MgogICAgLy8gaWYgKCEoY29udHJvbGxlZEV4aXN0cyAmJiBjb250cm9sbGVkQnl0ZXMubGVuZ3RoID09PSAzMikpIHsKICAgIGJ6IGFzc2VydEdhdGVfaWZfYm9keUAyOQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDMwCgphc3NlcnRHYXRlX2lmX2JvZHlAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnRCYWRXYWxsZXQpCiAgICBieXRlYyA2MSAvLyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMTkKICAgIC8vIGlmIChjb250cm9sbGVkID09PSBzcGVuZGVyKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMAogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICBzd2FwCgphc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTEKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJyZWZlcnJlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MgogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlckV4aXN0cyAmJiByZWZlcnJlckJ5dGVzLmxlbmd0aCA9PT0gMzIgPyBBY2NvdW50KHJlZmVycmVyQnl0ZXMpIDogR2xvYmFsLnplcm9BZGRyZXNzCiAgICBieiBhc3NlcnRHYXRlX3Rlcm5hcnlfZmFsc2VANDAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZV90ZXJuYXJ5X2ZhbHNlQDQwCiAgICBjb3ZlciAzCgphc3NlcnRHYXRlX3Rlcm5hcnlfbWVyZ2VANDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NgogICAgLy8gcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIGRpZyAyCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBhc3NlcnRHYXRlX3Rlcm5hcnlfZmFsc2VANDMKICAgIHN3YXAKCmFzc2VydEdhdGVfdGVybmFyeV9tZXJnZUA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk0LTIwMQogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiBoaW50LAogICAgLy8gICBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyLAogICAgLy8gICB2aWFQbHVnaW4sCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAyOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAzCiAgICBzZXRiaXQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMDktMjE2CiAgICAvLyByZXR1cm4gcmVzb2x2ZVByaW5jaXBhbEN0eCgKICAgIC8vICAgd2FsbGV0RmFjdG9yeSwKICAgIC8vICAgaGludCwKICAgIC8vICAgVHhuLnNlbmRlciwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIHRydWUKICAgIC8vICkKICAgIGIgYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDUKCmFzc2VydEdhdGVfdGVybmFyeV9mYWxzZUA0MzoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGIgYXNzZXJ0R2F0ZV90ZXJuYXJ5X21lcmdlQDQ0Cgphc3NlcnRHYXRlX3Rlcm5hcnlfZmFsc2VANDA6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBhc3NlcnRHYXRlX3Rlcm5hcnlfbWVyZ2VANDEKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIyCiAgICAvLyBjb25zdCBbd2FsbGV0QWRkcmVzcywgd2FsbGV0RXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBBZGRyZXNzKHdhbGxldCkKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjMKICAgIC8vIGlmICghd2FsbGV0RXhpc3RzKSB7CiAgICBibnogYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDM0CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzcKCmFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI2CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gd2FsbGV0QWRkcmVzcykgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfYWZ0ZXJfaWZfZWxzZUAzNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzNwoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIGR1cAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyOQogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2YoY29udHJvbGxlZCkgPT09IHdhbGxldEFkZHJlc3MKICAgIHVuY292ZXIgMgogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgYXNzZXJ0R2F0ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzNwoKYXNzZXJ0R2F0ZV9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDUKICAgIC8vIGNvbnN0IFtjcmVhdG9yLCBleGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcENyZWF0b3Iod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA2CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3NPZih3YWxsZXRGYWN0b3J5KQogICAgYnogYXNzZXJ0R2F0ZV9ib29sX2ZhbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjc0CiAgICAvLyByZXR1cm4gQWNjb3VudChvcC5zaGE1MTJfMjU2KEJ5dGVzKCdhcHBJRCcpLmNvbmNhdChvcC5pdG9iKGFwcElkKSkpKQogICAgZnJhbWVfZGlnIDYKICAgIGl0b2IKICAgIGJ5dGVjIDYyIC8vICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVfYm9vbF9mYWxzZUAxNAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBhc3NlcnRHYXRlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDE2Cgphc3NlcnRHYXRlX2Jvb2xfZmFsc2VAMTQ6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIGFzc2VydEdhdGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTYKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5jYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1MwogICAgLy8gcHJpdmF0ZSBjYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogQWNjb3VudCwgYW1vdW50OiB1aW50NjQpOiBib29sZWFuIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1NAogICAgLy8gY29uc3QgW2JhbGFuY2VdID0gb3AuQWNjdFBhcmFtcy5hY2N0QmFsYW5jZShyZWNlaXZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHJldHVybiBiYWxhbmNlID4gMCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiBjYW5SZWNlaXZlQWxnb19ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0xCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IGNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMwoKY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1NQogICAgLy8gcmV0dXJuIGJhbGFuY2UgPiAwIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgpjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI1NQogICAgLy8gcmV0dXJuIGJhbGFuY2UgPiAwIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuc2VuZFRpY2tldHMocmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKc2VuZFRpY2tldHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyBwcml2YXRlIHNlbmRUaWNrZXRzKHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBzZW5kVGlja2V0c19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjEKICAgIC8vIHJldHVybgogICAgcmV0c3ViCgpzZW5kVGlja2V0c19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY0CiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY0CiAgICAvLyBpZiAodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzZW5kVGlja2V0c19lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI2NQogICAgLy8gaWYgKHRoaXMuY2FuUmVjZWl2ZUFsZ28ocmVjZWl2ZXIsIGFtb3VudCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIGNhblJlY2VpdmVBbGdvCiAgICBieiBzZW5kVGlja2V0c19hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjYKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnNlbmRUaWNrZXRzX2FmdGVyX2lmX2Vsc2VAOToKICAgIHJldHN1YgoKc2VuZFRpY2tldHNfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY5LTI3NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI3MwogICAgLy8geGZlckFzc2V0OiB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyNjktMjc0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy50aWNrZXRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjY5LTI3NQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMudGlja2V0QXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnNlbmRUaWNrZXRzT3JEaXNidXJzZShyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CnNlbmRUaWNrZXRzT3JEaXNidXJzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODMKICAgIC8vIHByaXZhdGUgc2VuZFRpY2tldHNPckRpc2J1cnNlKHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODQKICAgIC8vIGlmIChhbW91bnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHNlbmRUaWNrZXRzT3JEaXNidXJzZV9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODUKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgpzZW5kVGlja2V0c09yRGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gaWYgKHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgPT09IDAgfHwgcmVjZWl2ZXIuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODgKICAgIC8vIGlmICh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkID09PSAwIHx8IHJlY2VpdmVyLmlzT3B0ZWRJbih0aGlzLnRpY2tldEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNlbmRUaWNrZXRzT3JEaXNidXJzZV9pZl9ib2R5QDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyB0aWNrZXRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlUaWNrZXRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAidGlja2V0X2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI4OAogICAgLy8gaWYgKHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQgPT09IDAgfHwgcmVjZWl2ZXIuaXNPcHRlZEluKHRoaXMudGlja2V0QXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogc2VuZFRpY2tldHNPckRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VANQoKc2VuZFRpY2tldHNPckRpc2J1cnNlX2lmX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyODkKICAgIC8vIHRoaXMuc2VuZFRpY2tldHMocmVjZWl2ZXIsIGFtb3VudCkKICAgIGZyYW1lX2RpZyAtMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHNlbmRUaWNrZXRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKc2VuZFRpY2tldHNPckRpc2J1cnNlX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjI5MwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk0CiAgICAvLyB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTcKICAgIC8vIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAzNSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwMAogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTItMzAxCiAgICAvLyByZXR1cm4gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudCB9XSwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApLmNvc3QKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTYKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDggLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoyOTItMzAxCiAgICAvLyByZXR1cm4gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudCB9XSwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApLmNvc3QKICAgIHVuY292ZXIgNQogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Mjk5CiAgICAvLyBmYWxzZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MjkyLTMwMQogICAgLy8gcmV0dXJuIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMudGlja2V0QXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKS5jb3N0CiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLnRyYW5zZmVyUHJpemUocmVjZWl2ZXI6IGJ5dGVzKSAtPiB2b2lkOgp0cmFuc2ZlclByaXplOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNAogICAgLy8gcHJpdmF0ZSB0cmFuc2ZlclByaXplKHJlY2VpdmVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMzIgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiB0cmFuc2ZlclByaXplX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNi0zMDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3JlY2VpdmVyXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA3CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQwCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDQgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMwNwogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzA2LTMwOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbcmVjZWl2ZXJdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGFkZjkyYWU0IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzEwCiAgICAvLyByZXR1cm4KICAgIHJldHN1YgoKdHJhbnNmZXJQcml6ZV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzEzCiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzEzCiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzE1CiAgICAvLyBpZiAocmVjZWl2ZXIuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogdHJhbnNmZXJQcml6ZV9lbHNlX2JvZHlANgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzE2LTMyMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMxOQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzE5CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMTYtMzIwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHJlY2VpdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzE2LTMyMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKdHJhbnNmZXJQcml6ZV9lbHNlX2JvZHlANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyNAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzI1CiAgICAvLyB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjgKICAgIC8vIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAzNSAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzMQogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjMtMzMyCiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiByZWNlaXZlciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czozMjYKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyNwogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgOCAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMyMy0zMzIKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjMzMAogICAgLy8gdHJ1ZSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MzIzLTMzMgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVySW1wbChwYXltZW50OiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgZ2F0ZWQ6IHVpbnQ2NCkgLT4gdm9pZDoKZW50ZXJJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYwNi02MTAKICAgIC8vIHByaXZhdGUgZW50ZXJJbXBsKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBnYXRlZDogYm9vbGVhbgogICAgLy8gKTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBlcnJOb3RMaXZlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5pc0xpdmUKICAgIGJueiBlbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDI3IC8vICJFUlI6ZXJyTmxpdiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJObGl2CgplbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyVGlja2V0QXNzZXROb3RBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyVGlja2V0QXNzZXROb3RBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGVudGVySW1wbF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNjMgLy8gIkVSUjplcnJUYW5hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclRhbmEKCmVudGVySW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIGlmICghZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGVudGVySW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgZXJyQmFkTWV0aG9kR2F0ZU5lZWRlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZW50ZXJJbXBsX2FmdGVyX2lmX2Vsc2VAOAogICAgYnl0ZWMgMzYgLy8gIkVSUjplcnJCbWduIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJtZ24KCmVudGVySW1wbF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjE4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIGVyckFscmVhZHlFbnRlcmVkKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyQWxyZWFkeUVudGVyZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGVudGVySW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDQxIC8vICJFUlI6ZXJyQWVudCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBZW50CgplbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyMwogICAgLy8gYXNzZXJ0U2FmZVBheW1lbnQocGF5bWVudCwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGVudGVySW1wbF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgplbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyOAogICAgLy8gbWluVGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWluVGlja2V0cyB9KQogICAgYnl0ZWMgMzMgLy8gIm1pbl90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyMQogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSBjb3N0cy5lbnRyaWVzICsgY29zdHMuZW50cmllc0J5QWRkcmVzcwogICAgaW50YyA2IC8vIDUwNjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjI2CiAgICAvLyBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgICsKICAgID49CiAgICBieiBlbnRlckltcGxfYm9vbF9mYWxzZUAxNQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDIxIC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIHBheW1lbnQuYW1vdW50ID49ICh0aGlzLm1pblRpY2tldHMudmFsdWUgKyBtYnIpICYmIHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgKyBtYnIpLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNiAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gcGF5bWVudC5hbW91bnQgPj0gKHRoaXMubWluVGlja2V0cy52YWx1ZSArIG1icikgJiYgcGF5bWVudC5hbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSArIG1iciksCiAgICArCiAgICBkaWcgMQogICAgPj0KICAgIGJ6IGVudGVySW1wbF9ib29sX2ZhbHNlQDE1CiAgICBpbnRjXzEgLy8gMQoKZW50ZXJJbXBsX2Jvb2xfbWVyZ2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjI1LTYyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBwYXltZW50LmFtb3VudCA+PSAodGhpcy5taW5UaWNrZXRzLnZhbHVlICsgbWJyKSAmJiBwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlICsgbWJyKSwKICAgIC8vICAgZXJySW52YWxpZFBheW1lbnQKICAgIC8vICkKICAgIGJueiBlbnRlckltcGxfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBieXRlYyAxNSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKZW50ZXJJbXBsX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cnlDb3VudC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMyCiAgICAvLyBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzMS02MzQKICAgIC8vIHRoaXMuZW50cmllcyhsb2MpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMxCiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjggLy8gImUiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjMxLTYzNAogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gfQogICAgdW5jb3ZlciAyCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjM1CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjM1CiAgICAvLyB0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIGNvbnN0IGFtb3VudDogdWludDY0ID0gcGF5bWVudC5hbW91bnQgLSBtYnIKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gY29zdHMuZW50cmllcyArIGNvc3RzLmVudHJpZXNCeUFkZHJlc3MKICAgIGludGMgNiAvLyA1MDYwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzNwogICAgLy8gY29uc3QgYW1vdW50OiB1aW50NjQgPSBwYXltZW50LmFtb3VudCAtIG1icgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjYzOQogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYW1vdW50KQogICAgZHVwCiAgICBpdG9iCiAgICBkaWcgMgogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTYgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2MzkKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGFtb3VudCkKICAgIHVuY292ZXIgNAogICAgaW50YyA0IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICB1bmNvdmVyIDMKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyBjb25zdCBuZXdXZWlnaHQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyBjb25zdCBuZXdXZWlnaHQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIGFtb3VudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3V2VpZ2h0CiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXdXZWlnaHQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQzCiAgICAvLyB0aGlzLmVudHJ5Q291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQzCiAgICAvLyB0aGlzLmVudHJ5Q291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gdGhpcy5lbnRyeUNvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKZW50ZXJJbXBsX2Jvb2xfZmFsc2VAMTU6CiAgICBpbnRjXzAgLy8gMAogICAgYiBlbnRlckltcGxfYm9vbF9tZXJnZUAxNgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmVudGVyQXNhSW1wbChwYXltZW50OiB1aW50NjQsIGFzc2V0WGZlcjogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIGdhdGVkOiB1aW50NjQpIC0+IHZvaWQ6CmVudGVyQXNhSW1wbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NjktNjc0CiAgICAvLyBwcml2YXRlIGVudGVyQXNhSW1wbCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIGdhdGVkOiBib29sZWFuCiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDQgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIGVyck5vdExpdmUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZQogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJObGl2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5saXYKCmVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwLCBlcnJUaWNrZXRBc3NldEFsZ28pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gdGlja2V0QXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0QXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gInRpY2tldF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnRpY2tldEFzc2V0LnZhbHVlLmlkICE9PSAwLCBlcnJUaWNrZXRBc3NldEFsZ28pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNjQgLy8gIkVSUjplcnJUYWFsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclRhYWwKCmVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIGlmICghZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2NzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgZXJyQmFkTWV0aG9kR2F0ZU5lZWRlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZW50ZXJBc2FJbXBsX2FmdGVyX2lmX2Vsc2VAOAogICAgYnl0ZWMgMzYgLy8gIkVSUjplcnJCbWduIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJtZ24KCmVudGVyQXNhSW1wbF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjgyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIGVyckFscmVhZHlFbnRlcmVkKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyQWxyZWFkeUVudGVyZWQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDQxIC8vICJFUlI6ZXJyQWVudCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBZW50CgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4NwogICAgLy8gYXNzZXJ0U2FmZVBheW1lbnQocGF5bWVudCwgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtNAogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBhc3NlcnRTYWZlUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY4OAogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgZnJhbWVfZGlnIC0zCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njg5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZW50ZXJBc2FJbXBsX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IGVudHJ5VG90YWxNQlIsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2ODUKICAgIC8vIGNvbnN0IGVudHJ5VG90YWxNQlI6IHVpbnQ2NCA9IGNvc3RzLmVudHJpZXMgKyBjb3N0cy5lbnRyaWVzQnlBZGRyZXNzCiAgICBpbnRjIDYgLy8gNTA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gZW50cnlUb3RhbE1CUiwgZXJySW52YWxpZFBheW1lbnQpCiAgICA9PQogICAgYm56IGVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgplbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBlbnRlckFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAyMiAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKZW50ZXJBc2FJbXBsX2FmdGVyX2Fzc2VydEAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTMKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0ID09PSB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogZW50ZXJBc2FJbXBsX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gdGhpcy5taW5UaWNrZXRzLnZhbHVlICYmIGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI4CiAgICAvLyBtaW5UaWNrZXRzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlNaW5UaWNrZXRzIH0pCiAgICBieXRlYyAzMyAvLyAibWluX3RpY2tldHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBhc3NldFhmZXIuYXNzZXRBbW91bnQgPj0gdGhpcy5taW5UaWNrZXRzLnZhbHVlICYmIGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSB0aGlzLm1heFRpY2tldHMudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIGJ6IGVudGVyQXNhSW1wbF9ib29sX2ZhbHNlQDIxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMjEgLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IHRoaXMubWluVGlja2V0cy52YWx1ZSAmJiBhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gdGhpcy5tYXhUaWNrZXRzLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICA+PQogICAgYnogZW50ZXJBc2FJbXBsX2Jvb2xfZmFsc2VAMjEKICAgIGludGNfMSAvLyAxCgplbnRlckFzYUltcGxfYm9vbF9tZXJnZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo2OTQtNjk3CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSB0aGlzLm1pblRpY2tldHMudmFsdWUgJiYgYXNzZXRYZmVyLmFzc2V0QW1vdW50IDw9IHRoaXMubWF4VGlja2V0cy52YWx1ZSwKICAgIC8vICAgZXJySW52YWxpZFRyYW5zZmVyCiAgICAvLyApCiAgICBibnogZW50ZXJBc2FJbXBsX2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmVudGVyQXNhSW1wbF9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Njk5CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmVudHJ5Q291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyBlbnRyeUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVudHJ5Q291bnQgfSkKICAgIGJ5dGVjXzEgLy8gImVudHJ5X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjY5OQogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyeUNvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwMQogICAgLy8gYWNjb3VudDogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDAtNzAzCiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgbWFya2V0cGxhY2UKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzAwCiAgICAvLyB0aGlzLmVudHJpZXMobG9jKS52YWx1ZSA9IHsKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk0CiAgICAvLyBlbnRyaWVzID0gQm94TWFwPHVpbnQ2NCwgRW50cnlEYXRhPih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllcyB9KQogICAgYnl0ZWMgMjggLy8gImUiCiAgICBkaWcgMQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzAwLTcwMwogICAgLy8gdGhpcy5lbnRyaWVzKGxvYykudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIG1hcmtldHBsYWNlCiAgICAvLyB9CiAgICB1bmNvdmVyIDIKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNwogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYW1vdW50KQogICAgZGlnIDEKICAgIGl0b2IKICAgIGRpZyAxCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNiAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwNwogICAgLy8gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQoYW1vdW50KQogICAgdW5jb3ZlciAzCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHVuY292ZXIgMwogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIGNvbnN0IG5ld1dlaWdodCA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgYW1vdW50KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIGNvbnN0IG5ld1dlaWdodCA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgYW1vdW50KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXdXZWlnaHQKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2Mi0xNjQKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDYgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjcwOQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ld1dlaWdodAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gZW50cnlDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlFbnRyeUNvdW50IH0pCiAgICBieXRlY18xIC8vICJlbnRyeV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIHRoaXMuZW50cnlDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIGVudHJ5Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5RW50cnlDb3VudCB9KQogICAgYnl0ZWNfMSAvLyAiZW50cnlfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyB0aGlzLmVudHJ5Q291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gYW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgplbnRlckFzYUltcGxfYm9vbF9mYWxzZUAyMToKICAgIGludGNfMCAvLyAwCiAgICBiIGVudGVyQXNhSW1wbF9ib29sX21lcmdlQDIyCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuYWRkSW1wbChwYXltZW50OiB1aW50NjQsIGdhdGVkOiB1aW50NjQpIC0+IHZvaWQ6CmFkZEltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzMzCiAgICAvLyBwcml2YXRlIGFkZEltcGwocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBnYXRlZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgZXJyTm90TGl2ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogYWRkSW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJObGl2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5saXYKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyVGlja2V0QXNzZXROb3RBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCA9PT0gMCwgZXJyVGlja2V0QXNzZXROb3RBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDYzIC8vICJFUlI6ZXJyVGFuYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJUYW5hCgphZGRJbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjczOAogICAgLy8gaWYgKCFnYXRlZCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBibnogYWRkSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3MzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgZXJyQmFkTWV0aG9kR2F0ZU5lZWRlZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTQ4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMTQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYWRkSW1wbF9hZnRlcl9pZl9lbHNlQDgKICAgIGJ5dGVjIDM2IC8vICJFUlI6ZXJyQm1nbiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbWduCgphZGRJbXBsX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmVudHJpZXNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzLCBlcnJFbnRyeURvZXNOb3RFeGlzdCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyRW50cnlEb2VzTm90RXhpc3QpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBhZGRJbXBsX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNjUgLy8gIkVSUjplcnJFZG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckVkbmUKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA3IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NAogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NAogICAgLy8gY29uc3QgbG9jID0gdGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gY29uc3QgYW1vdW50ID0gdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXQogICAgZHVwCiAgICBpbnRjIDQgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAxNiAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIGNvbnN0IGFtb3VudCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0KICAgIGludGMgNCAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDcKICAgIC8vIGFzc2VydFNhZmVQYXltZW50KHBheW1lbnQsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZVBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBhZGRJbXBsX2FmdGVyX2Fzc2VydEAxMgogICAgYnl0ZWMgMTUgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmFkZEltcGxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc0OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50IDw9ICh0aGlzLm1heFRpY2tldHMudmFsdWUgLSBhbW91bnQuYXNVaW50NjQoKSksIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzAKICAgIC8vIG1heFRpY2tldHMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleU1heFRpY2tldHMgfSkKICAgIGJ5dGVjIDIxIC8vICJtYXhfdGlja2V0cyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlIC0gYW1vdW50LmFzVWludDY0KCkpLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGJ0b2kKICAgIC0KICAgIDw9CiAgICBibnogYWRkSW1wbF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDE1IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgphZGRJbXBsX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTIKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIHBheW1lbnQuYW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgZGlnIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTEtNzUzCiAgICAvLyBjb25zdCBuZXdXZWlnaHRzID0gbmV3IFVpbnQ2NCgKICAgIC8vICAgdGhpcy53ZWlnaHRzKGxvYyAvIENodW5rU2l6ZSkudmFsdWVbbG9jICUgQ2h1bmtTaXplXS5hc1VpbnQ2NCgpICsgcGF5bWVudC5hbW91bnQKICAgIC8vICkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTQKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXdXZWlnaHRzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBwYXltZW50LmFtb3VudCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBjb25zdCBib3hBbW91bnQgPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKSArIHBheW1lbnQuYW1vdW50KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkaWcgMwogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1NgogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IGJveEFtb3VudAogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTYyLTE2NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8YXJjNC5TdGF0aWNBcnJheTxhcmM0LlVpbnQ2NCwgMTU+Pih7CiAgICAvLyAgIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMsCiAgICAvLyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzU2CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gYm94QW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc1NwogICAgLy8gdGhpcy50aWNrZXRDb3VudC52YWx1ZSArPSBwYXltZW50LmFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzU3CiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IHBheW1lbnQuYW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gdGlja2V0Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5VGlja2V0Q291bnQgfSkKICAgIGJ5dGVjXzMgLy8gInRpY2tldF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3NTcKICAgIC8vIHRoaXMudGlja2V0Q291bnQudmFsdWUgKz0gcGF5bWVudC5hbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OlJhZmZsZS5hZGRBc2FJbXBsKGFzc2V0WGZlcjogdWludDY0LCBnYXRlZDogdWludDY0KSAtPiB2b2lkOgphZGRBc2FJbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc3OAogICAgLy8gcHJpdmF0ZSBhZGRBc2FJbXBsKGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLCBnYXRlZDogYm9vbGVhbik6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgZXJyTm90TGl2ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlCiAgICBibnogYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjcgLy8gIkVSUjplcnJObGl2IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5saXYKCmFkZEFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCwgZXJyVGlja2V0QXNzZXRBbGdvKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy50aWNrZXRBc3NldC52YWx1ZS5pZCAhPT0gMCwgZXJyVGlja2V0QXNzZXRBbGdvKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBhZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyA2NCAvLyAiRVJSOmVyclRhYWwiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVGFhbAoKYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODMKICAgIC8vIGlmICghZ2F0ZWQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IGFkZEFzYUltcGxfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzg0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckJhZE1ldGhvZEdhdGVOZWVkZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE0OAogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDE0IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBlcnJCYWRNZXRob2RHYXRlTmVlZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGFkZEFzYUltcGxfYWZ0ZXJfaWZfZWxzZUA4CiAgICBieXRlYyAzNiAvLyAiRVJSOmVyckJtZ24iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm1nbgoKYWRkQXNhSW1wbF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDcgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5lbnRyaWVzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cywgZXJyRW50cnlEb2VzTm90RXhpc3QpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBlbnRyaWVzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIHVpbnQ2ND4oeyBrZXlQcmVmaXg6IFJhZmZsZUJveFByZWZpeEVudHJpZXNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMsIGVyckVudHJ5RG9lc05vdEV4aXN0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDY1IC8vICJFUlI6ZXJyRWRuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJFZG5lCgphZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGVudHJpZXNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgdWludDY0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4RW50cmllc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgNyAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gZW50cmllc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCB1aW50NjQ+KHsga2V5UHJlZml4OiBSYWZmbGVCb3hQcmVmaXhFbnRyaWVzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuZW50cmllc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTAKICAgIC8vIGNvbnN0IGFtb3VudCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0KICAgIGR1cAogICAgaW50YyA0IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogUmFmZmxlQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMTYgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkwCiAgICAvLyBjb25zdCBhbW91bnQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdCiAgICBpbnRjIDQgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6NzkyCiAgICAvLyBhc3NlcnRTYWZlQXNzZXRUcmFuc2Zlcihhc3NldFhmZXIsIFR4bi5zZW5kZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIHR4biBTZW5kZXIKICAgIGNhbGxzdWIgYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTMKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTQKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0ID09PSB0aGlzLnRpY2tldEFzc2V0LnZhbHVlLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHRpY2tldEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJ0aWNrZXRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy50aWNrZXRBc3NldC52YWx1ZSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgphZGRBc2FJbXBsX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo3OTUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPD0gKHRoaXMubWF4VGlja2V0cy52YWx1ZSAtIGFtb3VudC5hc1VpbnQ2NCgpKSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEzMAogICAgLy8gbWF4VGlja2V0cyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5TWF4VGlja2V0cyB9KQogICAgYnl0ZWMgMjEgLy8gIm1heF90aWNrZXRzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA8PSAodGhpcy5tYXhUaWNrZXRzLnZhbHVlIC0gYW1vdW50LmFzVWludDY0KCkpLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICBidG9pCiAgICAtCiAgICA8PQogICAgYm56IGFkZEFzYUltcGxfYWZ0ZXJfYXNzZXJ0QDE2CiAgICBieXRlYyAyMiAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKYWRkQXNhSW1wbF9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6Nzk4CiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0IC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICBidG9pCiAgICBkaWcgMwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjc5Ny03OTkKICAgIC8vIGNvbnN0IG5ld1dlaWdodHMgPSBuZXcgVWludDY0KAogICAgLy8gICB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIC8vICkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDAKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXdXZWlnaHRzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMQogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjE2Mi0xNjQKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPGFyYzQuU3RhdGljQXJyYXk8YXJjNC5VaW50NjQsIDE1Pj4oewogICAgLy8gICBrZXk6IFJhZmZsZUdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzLAogICAgLy8gfSkKICAgIGJ5dGVjIDYgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjgwMQogICAgLy8gY29uc3QgYm94QW1vdW50ID0gbmV3IFVpbnQ2NCh0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkgKyBhc3NldFhmZXIuYXNzZXRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZHVwMgogICAgZXh0cmFjdF91aW50NjQKICAgIGRpZyAzCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAyCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gYm94QW1vdW50CiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxNjItMTY0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxhcmM0LlN0YXRpY0FycmF5PGFyYzQuVWludDY0LCAxNT4+KHsKICAgIC8vICAga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscywKICAgIC8vIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBib3hBbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIHRpY2tldENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVRpY2tldENvdW50IH0pCiAgICBieXRlY18zIC8vICJ0aWNrZXRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6ODAzCiAgICAvLyB0aGlzLnRpY2tldENvdW50LnZhbHVlICs9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmNvbW1pdERyYXdSb3VuZCgpIC0+IHZvaWQ6CmNvbW1pdERyYXdSb3VuZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIHRoaXMucmFmZmxlUm91bmQudmFsdWUgPSAoR2xvYmFsLnJvdW5kICsgRFJBV19ERUxBWV9ST1VORFMgKyBCRUFDT05fUk9VTkRfSU5URVJWQUwgLSAxKSAvIEJFQUNPTl9ST1VORF9JTlRFUlZBTCAqIEJFQUNPTl9ST1VORF9JTlRFUlZBTAogICAgZ2xvYmFsIFJvdW5kCiAgICBwdXNoaW50IDE2CiAgICArCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaW50Y18yIC8vIDgKICAgIC8KICAgIGludGNfMiAvLyA4CiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogUmFmZmxlR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTcgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIHRoaXMucmFmZmxlUm91bmQudmFsdWUgPSAoR2xvYmFsLnJvdW5kICsgRFJBV19ERUxBWV9ST1VORFMgKyBCRUFDT05fUk9VTkRfSU5URVJWQUwgLSAxKSAvIEJFQUNPTl9ST1VORF9JTlRFUlZBTCAqIEJFQUNPTl9ST1VORF9JTlRFUlZBTAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZSgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2MQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzOCAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjk2MQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjEtOTYyCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjIKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6MTI0CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBSYWZmbGVHbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTkgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTYyCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo5NjEtOTYyCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvY29udHJhY3QuYWxnby50czo6UmFmZmxlLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTYwLTk2MwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL3JhZmZsZS9jb250cmFjdC5hbGdvLnRzOjpSYWZmbGUuaXNMaXZlX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2NvbnRyYWN0LmFsZ28udHM6OTYwLTk2MwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdC5zZW5kVG9Ba2l0YUVzY3Jvdyhhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzZW5kVG9Ba2l0YUVzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NgogICAgLy8gcHJvdGVjdGVkIHNlbmRUb0FraXRhRXNjcm93KGFzc2V0OiBBc3NldCwgYW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ3CiAgICAvLyBpZiAoYW1vdW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUxCiAgICAvLyBjb25zdCBlc2Nyb3cgPSB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MQogICAgLy8gY29uc3QgZXNjcm93ID0gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MwogICAgLy8gaWYgKGFzc2V0LmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IGVzY3JvdywgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTgKICAgIC8vIGlmIChlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSkgewogICAgZHVwCiAgICBmcmFtZV9kaWcgLTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1OQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsgYXNzZXRSZWNlaXZlcjogZXNjcm93LCBhc3NldEFtb3VudDogYW1vdW50LCB4ZmVyQXNzZXQ6IGFzc2V0IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjAKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAODoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18yIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTIyCiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyA1OSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGNvdmVyIDMKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODgKICAgIC8vIGNvbnN0IHsgaWQgfSA9IHRoaXMuZ2V0RXNjcm93KGVzY3Jvdy5uYW1lKQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgMwogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlYyAzMCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgOSAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgZXJyRXNjcm93RG9lc05vdEV4aXN0KQogICAgZXh0cmFjdCA2IDQxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmVzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZXNjCgpzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBlcnJXcm9uZ0VzY3Jvd0Zvck9wZXJhdGlvbikKICAgIHVuY292ZXIgMgogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgID09CiAgICBibnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldlc2MKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIGRpZyAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTcKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTgKICAgIC8vIFtdCiAgICBieXRlYyA1NyAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA0CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTEKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTMKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3MQogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIDAKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5NwogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk0CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTcKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGZyYW1lX2J1cnkgMQoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwOAogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAxCiAgICAqCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE3CiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBzd2FwCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNQogICAgLy8gW2Fzc2V0LmlkXSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgYnl0ZWMgMzUgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNi0xMzIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI4CiAgICAvLyBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNy0xMzEKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNQogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMKICAgIC8vIHJldHVybiB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0LCBhbW91bnQpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyANAAEIBoAgoI0GqIsDrf7V5NSF/ahY////////////Ac+Cnrvv796CFNGCnrvv796CFP////8P1K+gBiZCDHRpY2tldF9hc3NldAtlbnRyeV9jb3VudAlha2l0YV9kYW8MdGlja2V0X2NvdW50BXByaXplBndpbm5lcgh3X3RvdGFscwFhDndpbm5pbmdfdGlja2V0BBUffHUNcHJpemVfY2xhaW1lZBF3ZWlnaHRzX2JveF9jb3VudBFyZWZ1bmRfbWJyX2N1cnNvcgZzZWxsZXIHZ2F0ZV9pZAtFUlI6ZXJySXBheQF3DHJhZmZsZV9yb3VuZAttaW5fZW50cmllcw1lbmRfdGltZXN0YW1wD2NyZWF0b3Jfcm95YWx0eQttYXhfdGlja2V0cwtFUlI6ZXJySXhmcgZmYWlsZWQDYWFsDGFraXRhX2VzY3JvdxVtYXJrZXRwbGFjZV9yb3lhbHRpZXMLRVJSOmVyck5saXYBZQEABndhbGxldBF2cmZfZmFpbHVyZV9jb3VudAxpc19wcml6ZV9ib3gLbWluX3RpY2tldHMNYWtpdGFfcm95YWx0eQIAAQtFUlI6ZXJyQm1nbgtFUlI6ZXJyTWJmZg9zdGFydF90aW1lc3RhbXALbWFya2V0cGxhY2UTZmluZF93aW5uZXJfY3Vyc29ycwtFUlI6ZXJyQWVudAtFUlI6ZXJyUG5jbAtFUlI6ZXJyV25mZAtFUlI6ZXJyTmRhbwhlbnRyeV9pZAMGgQELRVJSOmVycklwbXMLRVJSOmVyck5jbHMLRVJSOmVyck5ya3kGZnVuZGVyD3NlbGxlcl9yZWZlcnJlcgRzYWx0C0VSUjplcnJSZm5jC0VSUjplcnJSaG5lC0VSUjplcnJXYWZkA29hbAIAAAtFUlI6ZXJySXJiZANwYWwSY29udHJvbGxlZF9hZGRyZXNzC0VSUjplcnJJd2x0BWFwcElEC0VSUjplcnJUYW5hC0VSUjplcnJUYWFsC0VSUjplcnJFZG5lMRhAACopImcrImcnCCJnJwoiZycfImcnLSJnJwsiZycMImcnESJnJxIiZycXImeCAgQkh8MsBOqRgN02GgCOAgEEAPgxGRREMRhBAOGCGgS9cUjQBFnXBjAE8s4vRgQslCUUBEiDlTwEXFf22ASWJxLxBDqcKqQEOOYkMwRDpT5OBPPhX8sE3FCzVARqbZufBIkDwD8EY7u3NQTrFoG0BGllAd4EvRsn0QRl/KmLBI+koWAESOWc3QSuhMvYBDPpLJQEhU3t4ATZo1+kBD6hGDI2GgCOGgTtBXYFuQarB8wIAQgsCEUIhgi9COIJDgkvCT8JbAmOCZ8MGg1fEBoQKhDbEWUAIgABEYgAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABP3id342GgCOAQJJADEZgQQSMRgQREIQ1DEZgQUSMRgQREIGyooCAIv+gQoISTIMDUEAKbElshCBBbIZJy6yHicush+L/40CAAsABLNC/90yALIBQv/1IrIBQv/viYoBAYv/gRKRi/8bgRuRIQsai/+BO5FKkUwcIx5FAYEfGk8CTJAhCxoZiYoCAIv+OACL/xJAAAQnL7AAi/44CTIDEkAABCcwsACL/jggMgMSQAAEJzGwAImKAgCL/jgAi/8SQAAEJy+wAIv+OBMyAxJAAA+AC0VSUjplcnJOY2x3sACL/jgVMgMSQAAEJzCwAIv+OCAyAxJAAAQnMbAAiYoIAoAAIov5QAAFi/5AAUQjRIv4JxhlSCRbi/wiWYHUxQELgeSpAwhMi/lAAFyxSXIIREsCi/0IsgiyByOyECKyAbaL+haL+xZPArIYgATcrAk1shpMshqyGov8shqL/7IaJbIQIrIBs7Q+SVcEAExXAAQnCRJESRUkEkQXTEwWTBZQi/xPA08DiUlyCESL+XAARQFBAIpLAUsBcghMTgREIowAi/5BAApLAXIIRCOMAIwBsUsBcghETwOyCLIHI7IQIrIBtosAQQAEiwGyFYv5shGL/bISTwKyFIEEshAisgG2i/oWi/sWTwOyGIAEo6FsqrIaTLIashqL/LIai/+yGiWyECKyAbO0PklXBABMVwAEJwkSREkVJBJEF0xC/11LATIQCLFLAUlyCEQyELIIsgcjshAisgG2i/kWTLIYgAQ5Tq6yshqyGiWyECKyAbNC/0UiQv65NhoBSRUkEkQXNhoCSRUjEkQiUzYaA0kVJBJEF0w2GgRJFSQSRBdMNhoFSRUkEkQXNhoGSU4DFYEgEkQ2GgdJTgMVgSgSRDYaCEkVJBJEF04CNhoJSRUkEkQXNhoKSRUkEkQXTDYaC0kVJBJEF04DNhoMSRUkEkQXTgM2Gg1JTgQVgSASRDYaDkkVJBJEF04GNhoPSRVLASJZSYEiEkRPAkxLAlJJTghJFUsBIllJgQoSRExSIlmBLggSRDYaD0kVSwEiWUmBIhJESwJMSwJSSRVLASJZSYEKEkRMUiJZgS4IEkRXAiAyDUAABCclsAAnBEsQZycgSwpnSw5BABdLDnEAREAAD4ALRVJSOmVycklhc3SwAChLD2cnJk8OSU4CZ0sEDEEBSEsDMgcNQQFAI0AAD4ALRVJSOmVyckllbnKwACcTTwRnJw1PDGcnMk8LZycUTwpnSwJBARBLAksCD0EBCCNAAA+AC0VSUjplcnJJdGJksABPCEAACEsJSwkTQQDkI0AAD4ALRVJSOmVyclBpdGGwACchTwJnJxVPAmcnEk8EZycFMgNnJw5PA2cnJ08CZyczTGcqTwJnJxlMZyIqZUSACG5mdF9mZWVzZUhJgXBbJxpMZyIqZUQiJw1lRLFMgANzYWxlSIEQW7IYgATVdLsQshqyGiWyECKyAbO0PklXBABMVwAEJwkSREkVJBJEF0lOAksBgWBbTgJMgWhbTCMNQQA4TwIjCUxJTwMJTwILgegHCgknIkxngXivJwZMZyc0MRdnJyiAEAAAAAAAAAAAAAAAAAAAAAFnI0NPAkgjQv/FIkL/GSJC/vUiQv69MRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAEJyWwAEmBBA9AAA+AC0VSUjplcnJNYWxmsABJgRAMQAAPgAtFUlI6ZXJyTWFtZrAASSEMC0sCOAcyChJAAAQnD7AATwI4CBJAAAQnD7AAJwtLAWciSUsCDEEAEUkWJxBMUIGAgAK5SCMIQv/oI0M2GgFJFSQSRBcxACInDWVEEkAAD4ALRVJSOmVyck5zbHKwACIpZURBAAQnKbAAMgciJxNlRA5AAAQnG7AAJxJMZyNDIoAASTYaAUkVJBJEFyInCmVEQAAEJyqwACInBWVEMgMTQAAEJyuwACIpZUQiJwxlRBNAAA+AC0VSUjplcnJBcmZjsAAiJwxlTElOAk4DRCIpZURLAQlJTwNJTgMNTE4CTUlOAoF4CyKI+iZLAksCCEsBDUEAb0kWJxxMUElOA75EVwAgRQciRQYiJxdlREEAG0cCIQQKFicQTFBMIQQYJAskuhdLB0yIDyRFBk8CvEgnB0sGULxIIQZLBQ1BACEhBksFCUlFBUsGTIgOp0EAELFLBbIHSwOyCCOyECKyAbMjCEL/hkgiJwxlRAgnDExnI0MiJwplREAABCcqsAAiKWVEIicMZUQSQAAEJzWwACIiJwtlREsBDUEAFiInC2VEIwlLAQkWJxBMULxIIwhC/98iJwtlRCEMC7EiJzJlRFcAIEsBsgiyByOyECKyAbMnCyJnFicJTFCwI0MxADIJEkAABCclsAAiJwplREAABCcqsAAiKWVEIicMZUQSQAAEJzWwACInC2VEQQAPgAtFUlI6ZXJyU2h3YrAAIihlREEALTIKIihlRHAARQFBACAyCSIoZURwAEUBQQBNMgmxIihlRLIRshWBBLIQIrIBsyInIGVEQAAkMgoiJwRlRHAARQFBABaxIicEZURJcQtEshWyEYEEshAisgGzsTIJsgkjshAisgGzI0MiKGVEcQtEQv+rMRaBAglJOBAlEkQxFiMJSTgQIxJENhoBSRWBIBJENhoCSRUkEkQXTwMiTwKICf0jiA5cI0MxFoECCUk4ECUSRDEWIwlJOBAjEkQ2GgFJFYEgEkRPAiMiiAnSI4gOMSNDMRYjCUk4ECMSRDYaAUkVgSASRCKIDhgjQzEWgQMJSTgQJRJEMRaBAglJOBAjEkQxFiMJSTgQgQQSRDYaAUkVgSASRDYaAkkVJBJEF08EIk8CiAl4I4gOqiNDMRaBAwlJOBAlEkQxFoECCUk4ECMSRDEWIwlJOBCBBBJENhoBSRWBIBJETwMjIogJQSOIDnMjQzEWgQIJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJFYEgEkQiiA5OI0MxFoECCUk4ECUSRDEWIwlJOBAjEkQ2GgFJFSQSRBdPAiJPAogI8COIDx8jQzEWgQIJSTgQJRJEMRYjCUk4ECMSREwjIogIzyOIDv4jQzEWIwlJOBAjEkQiiA7uI0MxFoECCUk4ECUSRDEWIwlJOBCBBBJENhoBSRUkEkQXTwIiTwKICJIjiA91I0MxFoECCUk4ECUSRDEWIwlJOBCBBBJETCMiiAhwI4gPUyNDMRYjCUk4EIEEEkQiiA9CI0MyByInE2VEDUAABCc2sAAiJwhlREEAD4ALRVJSOmVycldhZHKwACInBWVEMgMSQAAEJzewACInEWVEQABFIicSZURBADkiJxJlRCIpZUQNQAAHIitlREAADycXI2ciJw1lRCcFTGcjQyIrZUQjEkEABycII2dC/+6ID4lC/+gjQv/IMgYiJxFlRIEECA9AAA+AC0VSUjplcnJOZXRtsACxIicRZUQWIic0ZURJFRZXBgJMUCIqZUQnOGVIIluyGIAEGJOSxbIaTLIasholshAisgGztD5JVwQASwFXAAQnCRJESSJZgQIITBUSRFcGAEkVSUAAMUYCMgYiJxFlRIHoBwgPQAAPgAtFUlI6ZXJyQm5yZLAAIicfZUQjCCcfTGeIDuFC/0AiSwEPIksCTwJNgRBLAg+BEE8DTwJNUkkVgRASQAAPgAtFUlI6ZXJySXJzZLAASSJbIiEHHUUBSSEJHkUBTwIeRQEhBx1FASEJHk4CSE8CJFtMIQoeRQEeRQEhBx1FASEKHkUBTBZMFlAiK2VMSU8CRCEIDEEAAiMIJzlOAklBAM5JIw1AAAQnOrAAIwlJIw1AAAQnOrAARwIcIx5FAUwYTgMiTE8CSwIjDEEAgkkiW0lOBSEHHUUBIQkeSU4CTgZITCRbTEAAYoGihbz23t+9hShMSSEHHUUBTwIeRQFPBRZMFlBPBYj01YEgkE8CiPTNGRZQSVcAEE4EgRBbSUsGD0EAIEsBGCMIFk8DSSJZIwgWVwYAXABMUE4CTCMITE8DQv+CSE8DQv+DIQpC/6NFAUUBTwJIgAIAElBMUEmBEFlLARVSgQJbJwhMZ0L98UghCEL/QoAARwQ2GgFJFSQSRBcyByInE2VEDUAABCc2sAAiJwhlREAAD4ALRVJSOmVyck53dHmwACInBWVEMgMSQAAEJzewACInKGVESSJbTCRbRQZJIQQYQAA1SSEECklFBCInC2VEDEEAJSInBmVESwMkC1siJwhlREsHTwIISUUHDEAACiEECEsERQZC/8QWSwUWUEkiW0lPAiRbRQciKWVEDEAABCcrsAAiKWVESwFJTgIJSUsESU4DDUxOAk1JRQRMIQQYSUUJIQRMCUlFBg1BAARLA0UCSSEEChYnEExQTEsCgSgLIojzSSJMSwFLBAxBAEZLCEsCCCQLSwNMJLoXSwhJTwIITCInCGVEDkEAHiInCGVESwEMQQATSwFLAwgWJxxMUL5EVwAgJwVMZ08CIwhOAkUIQv+ySwMIFksHFlAnKExnI0OAAEcGIicFZUQyAxNAAAQnK7AAIicKZURBAA+AC0VSUjplcnJQYWNssAAiJxdlREEADiInDWVEiAhAJwojZyNDIicFZUSICDIiK2VEIicgZUxJTgJFCEQiRQhAAC0iJxRlREEAJSInFGVESSEFDkRLAR0hBZdJRQhAAA8iJxRlREEAB0lBAAMjRQciRQgiJyJlREEAHSInImVESSEFDkRLAR0hBZdJRQlAAAdJQQADI0UIIkUFIicaZURBACUiJxplREkhBQ5ESwEdIQWXSUUGQAAPIicaZURBAAdJQQADI0UFSwZLCAiBAksGCwhLAQ1BAERLBUABvSInFGVEQQG1IicUZURJIQUOREsBHSEFl0UHIiciZURJIQUOREsBSU8CHSEFl0UJIicaZURJIQUORB0hBZdFBUsGSUsJSU4DCIECSwhJTgULCE8ETAlMFk8CFlBPAhZQTBZQSSInBWVEJwdMUL5EFxYnHExQvkRXICBOAiRbSUEAkCIqZUxOBEQiJzNlTE4DRCIoZUxOBkQiJxllRIECW3IITE4GRElBAQFLAjIDE0EA+UsEgAt3YWxsZXRfZmVlc2VIJFtJIQUOREsBHSEFl0lFC0AAB0lBAAMjRQoyB0mBgJqeAQhLC0lOAhZPBkxQJyNMUE8HTwlPBU8ETwRLBSJPC4jxxkhXCAhOAgkWTFAiWyIoZURAAElLASJbSUUGQQANIicEZURxC0RLBYgFviIoZURMiAo/SCInJ2VESwGBEFtMSwGIBaVPAkyIBZ8iJw1lREyBGFuIBZMnCiNnQv3lSwEiW0lFBUEADiInBGVEcQtESwSIBbhIIihlREyICfVIIicnZURLAYEQW0xLAYgFnkhPAkyIBZdIIicNZURMgRhbiAWKSEL/sE8CSE8DSE8DSE8DSBYiFlBC/1IiRQdC/leICZYnHSJPAlQnCUxQsCNDIihlRCInJmVEIicTZUQiJw1lRCInIWVEIicVZUQiKWVEIitlRCInCGVEIicFZUQiJwRlRCInCmVEIicOZUQiJx9lRCInLWVEIicMZUQiJxJlRCInF2VEIicRZURPEhZPEhZQTxEWUE8QUE8PFlBPDhZQTw0WUE8MFlBPCxZQTwpQTwkWUCcdIk8KVFBPBxZQTwYWUE8FFlBPBBZQTwMWUCcdIk8EVFBMFlAnCUxQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIiplRCceZUhyCEQSQAAEJyywACcZTGcjQzYaAUkiWYECCEsBFRJEVwIAMQAiKmVEJx5lSHIIRBJAAAQnLLAAIiplRCc7ZUiBEFsyDRJAAA+AC0VSUjplcnJJdXBnsACAB3ZlcnNpb25MZyNDNhoBSRUkEkQXMQAiKmVEJx5lSHIIRBJAAAQnLLAAKkxnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAA+AC0VSUjplcnJGb3JisABLATgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATDgIMhASQAAPgAtFUlI6ZXJySXBtYbAAsTIKTLIRIrISshSBBLIQIrIBsyNDigMAIkcEgABHAov+QQFOIiplTElPAkQxAEsBJzhlSIEYW08CJxhlSIFYW4wGsbIYgAQ8Gm8zshqyGiWyECKyAbO0PklXBABLAVcABCcJEkRJIlmBAghMFRJEVwYASRUkE0EAwUgijAcxAIsHQABpjAAiJw5lTIwFRIv9OBhMJxhlSIEoWxJBAEuL/TgZQABEi/04G4EEEkEAOov9ORoAgARDkiZVEkEAK4v9ORoBiwASQQAgi/05GgKLBRYSQQAUI0AAD4ALRVJSOmVyckZndGWwAIkiQv/piwcnPGVMTgJBAD5LARWBIBJBADUjQAAEJz2wAIsHcghESwITQQAcSwExABNBABRLAXMCRIsHcghEE0EABowASEL/VkiMAEL/UCJC/8gXSYz/QQAFiwZAAAwiIov/TwJNjAdC/yuL/3IHTIwCQQASiwYWJz5MUAOLAhJBAAQjQv/ZIkL/1SIqZUxJTwJEJxhlSIFYW4wGMQAyDTIOjAGL/0AAgkgyA0kiFk8DSU4CUE8DUExQTFAnHVBJVwggSwFXAAhPAldIIE4CUExQjAMiJw5lTIwFRIv9OBhMJxhlSIEoWxJBADuL/TgZQAA0i/04G4EEEkEAKov9ORoAgASbFH0sEkEAG4v9ORoBiwMSQQAQi/05GgKLBRYSQQAEI0L+yCJC/sSL/0EABYsGQAEOIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMBEEAGIsEFYEgEkEAD4sESwESQQAHSYsBE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nPGVBAAhJFYEgEkAABCc9sABJSwISQQBQI0yL/4AIcmVmZXJyZXJlQQA2SRWBIBJBAC5OA0sCSwFPA0lOA01MQQAXTIv/Fk8CUExQTFBMUCcdIk8DVFBC/rlFATIDQv/jSDIDTgNC/8yL/3IITE4CQAAHRQEiTEL/oUlLAhJBAAtMcwJIMgMSTEL/j0lzAkhPAhJMQv+Ei/9yB0yMAkEAEosGFic+TFADiwISQQAEI0L+1yJC/tOKAgGL/nMASEAACIv/MgEPQQACI4kiiYoCAIv/QAABiSIoZURAABuL/ov/iP/SQQAQsYv/sgiL/rIHI7IQIrIBs4mxIihlRLIRi/+yEov+shSBBLIQIrIBs4mKAgGL/0AAAiKJIihlREEADiIoZUSL/kxwAEUBQQAJi/6L/4j/lyKJIiplRCIoZUSL/xaL/kxQJyNMUDIDTwNPAyIhCE8Fi/8iTweI601IJFuJigEAIicgZURBAByxIicEZUSyGIAErfkq5LIai/+yGiWyECKyAbOJMgoiJwRlRExLAXAASEyL/0xwAEUBQQAWSLEiJwRlRLIRi/+yFYEEshAisgGziSIqZUQiJwRlRE8CSU4CFov/TFAnI0xQMgNPBE8DIiEITwVPBiNPB4jqykYCiYoDAIgDUkAABCcbsAAiKGVEQQAEJz+wAIv/QAAMIicOZURBAAQnJLAAJwcxAFC9RQFBAAQnKbAAi/0xAIjqE4v9OAcyChJAAAQnD7AAi/04CEkiJyFlRCEGCA9BAHEiJxVlRCEGCEsBD0EAYyNAAAQnD7AAIillRDEAi/5QSwEWJxxLAVBPAr8nBzEAUEy/TCEGCUkWSwIhBApJFicQTFBPBCEEGCQLTwO7IicGZURMJAtKW0sDCBZdJwZMZyIpZUQjCClMZyIrZUQIK0xniSJC/5qKBACIAn9AAAQnG7AAIihlREAABCdAsACL/0AADCInDmVEQQAEJySwACcHMQBQvUUBQQAEJymwAIv8MQCI6UCL/TEAiOlni/w4BzIKEkAABCcPsACL/DgIIQYSQAAEJw+wAIv9OBQyChJAAAQnFrAAi/04ESIoZUQSQAAEJxawAIv9OBJJIichZUQPQQBrIicVZURLAQ9BAGAjQAAEJxawACIpZUQxAIv+UEsBFiccSwFQTwK/JwcxAFBMv0sBFksBIQQKSRYnEExQTwMhBBgkC08DuyInBmVETCQLSltLAwgWXScGTGciKWVEIwgpTGciK2VECCtMZ4kiQv+digIAiAGCQAAEJxuwACIoZURBAAQnP7AAi/9AAAwiJw5lREEABCcksAAnBzEAUL1FAUAABCdBsAAnBzEAUL5EF0khBApJTgIWJxBMUElPAiEEGCQLSU4CJLqL/jEAiOgii/44BzIKEkAABCcPsACL/jgISSInFWVETwMXCQ5AAAQnD7AATwJJTwNJTgMkuhdLAwgWTE4CuyInBmVETwIkC0pbSwMIFl0nBkxnIitlRAgrTGeJigIAiADOQAAEJxuwACIoZURAAAQnQLAAi/9AAAwiJw5lREEABCcksAAnBzEAUL1FAUAABCdBsAAnBzEAUL5EF0khBApJTgIWJxBMUElPAiEEGCQLSU4CJLqL/jEAiOeci/44FDIKEkAABCcWsACL/jgRIihlRBJAAAQnFrAAi/44EkkiJxVlRE8DFwkOQAAEJxawAE8CSU8DSU4DJLoXSwMIFkxOArsiJwZlRE8CJAtKW0sDCBZdJwZMZyIrZUQIK0xniTIGgRAIIwkkCiQLJxFMZ4kyByInJmVED0EADTIHIicTZUQOQQACI4kiiYoCAYAARwKL/0AABCKMAIkiJxllRIECW3IIRIv+QAASsYv/sgiyByOyECKyAbMijACJSYv+cABFAUEAF7GL/rIRi/+yErIUgQSyECKyAbMijACJSCIqZURJJx5lSExJJztlSElXCAhOAyRbTgMiJxllTElOAk4DREkiWUsBFVJJTgNXAgBMJx5lSEyxIxZOAkkVFlcGAkxQgAQAAQACTFBMshiABDqyiVuyGrIaJbIQIrIBs7Q+SVcEAEsBVwAEJwkSREkiWYEpC4ECCEwVEkRXBikiW0lAAA+AC0VSUjplcnJOZXNjsABPAoECW0mMAhJAAA+AC0VSUjplcnJXZXNjsACxSwKyGIAEWt8zj7IaTwOyGrIashqACgABAAAAAAAAAACyGic5sholshAisgEiKmVMjABEiwJyCEQijAGL/nAARQFAABqLAIAOcmV2ZW51ZV9zcGxpdHNlSCJZIwiMATIQiwELSbaLAnIIRLIHsggjshAisgG2TEkWi/4WJyNMUE8EshiABGg147yyGkyyGoABgLIasholshAisgG2shiABGzD9gayGiWyECKyAYv/QQAXtosCcghEi/6yEYv/shKyFIEEshAisgGzjACJ", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var RAFFLE_ERROR_MESSAGES = _chunkQ5IKYOZSjs.withErrorCodeAliases.call(void 0, {
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
var translateRaffleError = _chunkQ5IKYOZSjs.makeErrorTranslator.call(void 0, RAFFLE_ERROR_MESSAGES);

// src/raffle/factory.ts


// src/generated/RaffleFactoryClient.ts





var APP_SPEC2 = { "name": "RaffleFactory", "structs": { "RaffleMBRData": [{ "name": "entries", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "entriesByAddress", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newRaffle", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "minEntries" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New ASA-prize raffle (principal ABI, spec \xA76.8). The seller stays `Txn.sender`; `wallet` is the\nseller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here\n(invalid hints revert), and its referrer is stored in the child as `seller_referrer`, paid when\nthe prize is claimed. The +50,000 \xB5A global is part of `newRaffleCost`.\n\nThe DEPLOYED creation selectors (MainNet 3569557743: no `minEntries`, no hint) are NOT routed\n(Kyle decision K6, 2026-10-04). Deployed-era callers hard-code the old child cost and are\n107,000 \xB5A short of the new child, so legacy shims could never succeed for them.", "events": [], "recommendations": {} }, { "name": "newPrizeBoxRaffle", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "minTickets" }, { "type": "uint64", "name": "maxTickets" }, { "type": "uint64", "name": "minEntries" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New prize-box raffle (principal ABI, spec \xA76.8); see `newRaffle`.", "events": [], "recommendations": {} }, { "name": "deleteRaffle", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newRaffleCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "prizeID" }, { "type": "uint64", "name": "ticketAsset" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "exact ALGO payment `newRaffle` / `newPrizeBoxRaffle` require", "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64)", "struct": "RaffleMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1509, 2585], "errorMessage": "Bytes has valid prefix" }, { "pc": [1731], "errorMessage": "ERR:errBmpt" }, { "pc": [361, 2300, 3180], "errorMessage": "ERR:errCnst" }, { "pc": [615], "errorMessage": "ERR:errHnbd" }, { "pc": [519], "errorMessage": "ERR:errHnwl" }, { "pc": [538], "errorMessage": "ERR:errHtop" }, { "pc": [2289], "errorMessage": "ERR:errIcor" }, { "pc": [3215], "errorMessage": "ERR:errIenr" }, { "pc": [3326, 3340], "errorMessage": "ERR:errIpay" }, { "pc": [2436], "errorMessage": "ERR:errIpma" }, { "pc": [2407], "errorMessage": "ERR:errIpmr" }, { "pc": [1129], "errorMessage": "ERR:errIpms" }, { "pc": [3247], "errorMessage": "ERR:errItbd" }, { "pc": [2963], "errorMessage": "ERR:errIupg" }, { "pc": [666], "errorMessage": "ERR:errIwlt" }, { "pc": [1218, 1232], "errorMessage": "ERR:errIxfr" }, { "pc": [1179], "errorMessage": "ERR:errNcls" }, { "pc": [1154], "errorMessage": "ERR:errNclw" }, { "pc": [2140, 2330, 2890, 2931, 2998], "errorMessage": "ERR:errNdao" }, { "pc": [2621], "errorMessage": "ERR:errNesc" }, { "pc": [3282], "errorMessage": "ERR:errNopt" }, { "pc": [1789], "errorMessage": "ERR:errNpbo" }, { "pc": [1891], "errorMessage": "ERR:errNraf" }, { "pc": [1204], "errorMessage": "ERR:errNrky" }, { "pc": [1257], "errorMessage": "ERR:errPita" }, { "pc": [1296], "errorMessage": "ERR:errPszb" }, { "pc": [3772], "errorMessage": "ERR:errPtlg" }, { "pc": [2647], "errorMessage": "ERR:errWesc" }, { "pc": [1900, 1908, 1969, 1984], "errorMessage": "account funded" }, { "pc": [381, 1357, 1399, 1745, 1757, 1824, 1870, 2170, 2322, 2378, 2712, 2728, 2822, 2882, 2923, 2990, 3351, 3568, 3595, 3634], "errorMessage": "application exists" }, { "pc": [1261, 1271, 1431], "errorMessage": "asset exists" }, { "pc": [1096, 1303, 1688, 1735, 2120, 2316, 2368, 2372, 2480, 2510, 2704, 2813, 2817, 2876, 2917, 2935, 2984, 3041, 3077, 3124, 3152, 3308, 3345, 3420], "errorMessage": "check GlobalState exists" }, { "pc": [1759], "errorMessage": "errNapb" }, { "pc": [432, 842, 858, 899, 1045, 1060, 1512, 2097, 2190, 2588, 2865, 2901], "errorMessage": "invalid array length header" }, { "pc": [2049], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [849, 865, 1051, 2104, 2197, 2908], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1072], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [2597], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1036, 1664], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [876, 956, 967, 978, 989, 1e3, 1011, 1022, 1080, 1091, 1584, 1595, 1606, 1617, 1628, 1639, 1650, 1672, 1683, 1865, 2059, 2068, 2077, 2115, 2182, 2354, 2808, 2977], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [904, 2870], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1518], "errorMessage": "invalid number of bytes for string" }, { "pc": [891, 2857], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [886, 2852], "errorMessage": "invalid tuple encoding" }, { "pc": [1564], "errorMessage": "transaction type is appl" }, { "pc": [948], "errorMessage": "transaction type is axfer" }, { "pc": [936, 1576, 2346], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA3OTgwMCA0MDk2IDUwMDAwCiAgICBieXRlY2Jsb2NrICJha2l0YV9kYW8iICJiYyIgIndhbGxldCIgImFraXRhX2VzY3JvdyIgMHgxNTFmN2M3NSAiRVJSOmVyck5kYW8iICJhYWwiICJFUlI6ZXJyQ25zdCIgMHgwMCAweGM1M2IzMmNjICJ2ZXJzaW9uIiAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIgIkVSUjplcnJJeGZyIiAweDNlYTExODMyIDB4YWRmOTJhZTQgInBhbCIgIm5mdF9mZWVzIiAiRVJSOmVycklwYXkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMS0zNwogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgUmFmZmxlRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZVJhZmZsZSwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHhlYTkxODBkZCAvLyBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fdXBkYXRlX3JvdXRlQDQKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzEtMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZUZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSYWZmbGUsIEZhY3RvcnlDb250cmFjdCkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAyMQogICAgcHVzaGJ5dGVzcyAweDgwODMxMWVlIDB4ZjMxMTljYjQgMHg5MWRkM2M3NSAweDlhZDdkMzNkIC8vIG1ldGhvZCAibmV3UmFmZmxlKHBheSxheGZlcix1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl1bXSx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3UHJpemVCb3hSYWZmbGUoYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0LHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImRlbGV0ZVJhZmZsZSh1aW50NjQpdm9pZCIsIG1ldGhvZCAibmV3UmFmZmxlQ29zdChib29sLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIKICAgIGJ5dGVjIDkgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHhkOWEzNWZhNCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCkiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBuZXdSYWZmbGUgbmV3UHJpemVCb3hSYWZmbGUgZGVsZXRlUmFmZmxlIG5ld1JhZmZsZUNvc3QgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDE4IG1haW5fbWJyX3JvdXRlQDE5CiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9iYXNlLnRzOjYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA3YmQ0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjMwCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDIxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzEtMzcKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIFJhZmZsZUZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VSYWZmbGUsIEZhY3RvcnlDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ODExNTM2MjggLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHN0cmluZyx1aW50NjQsKHN0cmluZyx1aW50NjQpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OmJveGVkUHJvZ3JhbVNpemUoYm94S2V5OiBieXRlcykgLT4gdWludDY0Ogpib3hlZFByb2dyYW1TaXplOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjgxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYm94ZWRQcm9ncmFtU2l6ZShib3hLZXk6IGJ5dGVzKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjgyCiAgICAvLyBjb25zdCBbc2l6ZSwgZXhpc3RzXSA9IG9wLkJveC5sZW5ndGgoYm94S2V5KQogICAgZnJhbWVfZGlnIC0xCiAgICBib3hfbGVuCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODMKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm56IGJveGVkUHJvZ3JhbVNpemVfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCmJveGVkUHJvZ3JhbVNpemVfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODQKICAgIC8vIHJldHVybiBzaXplCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmV3YXJkc09wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ1CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmV3YXJkc09wdEluQ29zdChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NgogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjExMgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0NwogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0OAogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ5CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5MAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTEKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzkzCiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3MQogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTcKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5NAogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk3CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwMAogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cHJpbmNpcGFsT2YoYWtpdGFEQU86IHVpbnQ2NCwgaGludDogdWludDY0KSAtPiBieXRlczoKcHJpbmNpcGFsT2Y6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgyOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHByaW5jaXBhbE9mKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgaGludDogdWludDY0KTogUHJpbmNpcGFsIHsKICAgIHByb3RvIDIgMQogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMgogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MjkKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjE0CiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTIKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMwogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MwogICAgLy8gb3JpZ2luOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTUKICAgIC8vIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTEKICAgIC8vIHdhbGxldDogMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkwLTk3CiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IDAsCiAgICAvLyAgIHByaW5jaXBhbDogc2VuZGVyLAogICAgLy8gICBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICB2aWFQbHVnaW46IGZhbHNlLAogICAgLy8gfQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyA4IC8vIDB4MDAKICAgIGNvbmNhdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MjkKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUA1CiAgICBmcmFtZV9kaWcgMgogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANgoKcHJpbmNpcGFsT2ZfaWZfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90V2FsbGV0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG53bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbndsCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTYxCiAgICAvLyBsb2dnZWRFcnIoZXJySGludFRvcExldmVsKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySHRvcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIdG9wCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjYKICAgIC8vIGxldCB2aWFQbHVnaW4gPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY3CiAgICAvLyBpZiAoY2FsbGVyQXBwICE9PSBoaW50KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcxCiAgICAvLyBjb25zdCBbc3BlbmRpbmcsIHNwZW5kaW5nRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfU1BFTkRJTkcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgInNwZW5kaW5nX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MgogICAgLy8gaWYgKCEoc3BlbmRpbmdFeGlzdHMgJiYgc3BlbmRpbmcubGVuZ3RoID09PSAzMiAmJiBzcGVuZGluZyA9PT0gc2VuZGVyLmJ5dGVzICYmIHNlbmRlciAhPT0gY2FsbGVyQWRkcikpIHsKICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGZyYW1lX2RpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBmcmFtZV9kaWcgMQogICAgZGlnIDEKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBkdXAKICAgIGZyYW1lX2RpZyAzCiAgICAhPQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjEKCnByaW5jaXBhbE9mX2lmX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RCb3VuZCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhuYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG5iZAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc4CiAgICAvLyB2aWFQbHVnaW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEJ5dGVzLCBjb250cm9sbGVkRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfQ09OVFJPTExFRCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAyNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNQoKcHJpbmNpcGFsT2ZfaWZfYm9keUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTE5CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gc3BlbmRlcikgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIwCiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTEKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGJ5dGVzICJyZWZlcnJlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5MgogICAgLy8gY29uc3QgcmVmZXJyZXIgPSByZWZlcnJlckV4aXN0cyAmJiByZWZlcnJlckJ5dGVzLmxlbmd0aCA9PT0gMzIgPyBBY2NvdW50KHJlZmVycmVyQnl0ZXMpIDogR2xvYmFsLnplcm9BZGRyZXNzCiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDM1CiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzUKICAgIGNvdmVyIDMKCnByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NgogICAgLy8gcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIGRpZyAyCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBwcmluY2lwYWxPZl90ZXJuYXJ5X2ZhbHNlQDM4CiAgICBzd2FwCgpwcmluY2lwYWxPZl90ZXJuYXJ5X21lcmdlQDM5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTQtMjAxCiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IGhpbnQsCiAgICAvLyAgIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXIsCiAgICAvLyAgIHZpYVBsdWdpbiwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDggLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjA5LTIxNgogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWxDdHgoCiAgICAvLyAgIHdhbGxldEZhY3RvcnksCiAgICAvLyAgIGhpbnQsCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cmVzb2x2ZVByaW5jaXBhbEN0eEA0MAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzODoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGIgcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzOQoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBjb3ZlciAzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzYKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMgogICAgLy8gY29uc3QgW3dhbGxldEFkZHJlc3MsIHdhbGxldEV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIzCiAgICAvLyBpZiAoIXdhbGxldEV4aXN0cykgewogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNgogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNwogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGNvbnRyb2xsZWQpID09PSB3YWxsZXRBZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMgogICAgaXRvYgogICAgcHVzaGJ5dGVzICJhcHBJRCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc2hhNTEyXzI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2Jvb2xfZmFsc2VAOQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxMQoKcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxMQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjpSYWZmbGVGYWN0b3J5LmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxMCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyAxMSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjE0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo6UmFmZmxlRmFjdG9yeS5uZXdSYWZmbGVbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdSYWZmbGU6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMzAtMjQ1CiAgICAvLyBuZXdSYWZmbGUoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIHRpY2tldEFzc2V0OiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBtaW5UaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1heFRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWluRW50cmllczogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA2CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGNvdmVyIDcKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDYKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNDYKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI0NgogICAgLy8gY29uc3Qgc2VsbGVyUmVmZXJyZXIgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpLnJlZmVycmVyCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBwcmluY2lwYWxPZgogICAgZXh0cmFjdCAxMDQgMzIKICAgIGNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI0OQogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5zZW5kZXIgPT09IHNlbmRlciwgZXJySW52YWxpZFBheW1lbnRTZW5kZXIpCiAgICBzd2FwCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAyNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5hc3NldFNlbmRlciA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbGF3YmFja0ZvcmJpZGRlbikKICAgIGRpZyAxCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMjYKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jbHciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNsdwoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0Q2xvc2VUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRAMjgKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODYKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGRpZyAxCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAzMAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5CgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgQXNzZXRSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID4gMCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBkdXAKICAgIGNvdmVyIDgKICAgIGJueiBuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNTMKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0LmlkICE9PSB0aWNrZXRBc3NldCwgZXJyUHJpemVJc1RpY2tldEFzc2V0KQogICAgc3dhcAogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkdXAKICAgIGRpZyA1CiAgICAhPQogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGl0YSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQaXRhCgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNTUKICAgIC8vIGFzc2V0WGZlci54ZmVyQXNzZXQuY2xhd2JhY2sgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBhc3NldFhmZXIueGZlckFzc2V0LmZyZWV6ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q2xhd2JhY2sKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IG5ld1JhZmZsZV9ib29sX2ZhbHNlQDEwCiAgICBkdXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRGcmVlemUKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IG5ld1JhZmZsZV9ib29sX2ZhbHNlQDEwCiAgICBpbnRjXzEgLy8gMQoKbmV3UmFmZmxlX2Jvb2xfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNTQtMjU3CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGFzc2V0WGZlci54ZmVyQXNzZXQuY2xhd2JhY2sgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBhc3NldFhmZXIueGZlckFzc2V0LmZyZWV6ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBlcnJQcml6ZVNlaXphYmxlCiAgICAvLyApCiAgICBibnogbmV3UmFmZmxlX2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHN6YiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQc3piCgpuZXdSYWZmbGVfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjU5CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNTkKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQ1CiAgICAvLyBsZXQgY3JlYXRvclJveWFsdHk6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NwogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIHVuY292ZXIgMgogICAgYm56IG5ld1JhZmZsZV9hZnRlcl9pZl9lbHNlQDE2CiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0OAogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5RGVmYXVsdAogICAgcHVzaGludCA1MDAwCiAgICBidXJ5IDE0CgpuZXdSYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyb3lhbHRpZXNAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyNjIKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI2MS0yNzYKICAgIC8vIGNvbnN0IHJhZmZsZUFwcCA9IHRoaXMuY3JlYXRlQ2hpbGRBcHAoCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICB0aWNrZXRBc3NldCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgIG1pblRpY2tldHMsCiAgICAvLyAgIG1heFRpY2tldHMsCiAgICAvLyAgIG1pbkVudHJpZXMsCiAgICAvLyAgIGdhdGVJRCwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyCiAgICAvLyApCiAgICB1bmNvdmVyIDgKICAgIGRpZyAyCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgOQogICAgdW5jb3ZlciA5CiAgICBkaWcgMTUKICAgIHVuY292ZXIgMTUKICAgIHVuY292ZXIgMTUKICAgIHVuY292ZXIgMTUKICAgIHVuY292ZXIgMTUKICAgIHVuY292ZXIgMTUKICAgIHVuY292ZXIgMTQKICAgIHVuY292ZXIgMTQKICAgIGNhbGxzdWIgY3JlYXRlQ2hpbGRBcHAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4MS0yOTAKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IHJhZmZsZUFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI4NQogICAgLy8gcmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyODYKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjgxLTI5MAogICAgLy8gcmFmZmxlLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogcmFmZmxlQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyODgKICAgIC8vIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjgxLTI5MAogICAgLy8gcmFmZmxlLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogcmFmZmxlQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMyAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5My0yOTkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJhZmZsZUFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjI5NQogICAgLy8gYXNzZXRSZWNlaXZlcjogcmFmZmxlQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTMtMjk4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyOTMtMjk5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByYWZmbGVBcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjMwLTI0NQogICAgLy8gbmV3UmFmZmxlKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1pbkVudHJpZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICBuYW1lOiBzdHJpbmcsCiAgICAvLyAgIHByb29mOiBQcm9vZiwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1JhZmZsZV9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTMtNTYzCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGEucHJvdG90eXBlLnZlcmlmaWVkTXVzdFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTYKICAgIC8vIGFzc2V0LmNyZWF0b3IsCiAgICBkdXBuIDIKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OAogICAgLy8gc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgc3dhcAogICAgaXRvYgogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYwCiAgICAvLyAxLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTEyCiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDQKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU0CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUzLTU2MwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDFmZjdjNzRjIC8vIG1ldGhvZCAidmVyaWZpZWRNdXN0UmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjEKICAgIC8vICdyb3lhbHR5JywKICAgIHB1c2hieXRlcyAweDAwMDc3MjZmNzk2MTZjNzQ3OQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUzLTU2MwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHN0cmluZwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgYnVyeSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjUKICAgIC8vIGlmIChCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykubGVuZ3RoID4gMCkgewogICAgbGVuCiAgICBieiBuZXdSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjYKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gYnRvaShCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykpCiAgICBkaWcgMTQKICAgIGJ0b2kKICAgIGJ1cnkgMTQKCm5ld1JhZmZsZV9hZnRlcl9pZl9lbHNlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjkKICAgIC8vIGlmIChjcmVhdG9yUm95YWx0eSA+IENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZSkgewogICAgZGlnIDEzCiAgICBpbnRjIDYgLy8gNTAwMDAKICAgID4KICAgIGJ6IG5ld1JhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllc0AyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzAKICAgIC8vIHJldHVybiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUKICAgIGludGMgNiAvLyA1MDAwMAogICAgYnVyeSAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjU5CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGIgbmV3UmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzQDIxCgpuZXdSYWZmbGVfYm9vbF9mYWxzZUAxMDoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld1JhZmZsZV9ib29sX21lcmdlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkubmV3UHJpemVCb3hSYWZmbGVbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdQcml6ZUJveFJhZmZsZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMwNS0zMTgKICAgIC8vIG5ld1ByaXplQm94UmFmZmxlKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1pbkVudHJpZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMxOQogICAgLy8gY29uc3Qgc2VsbGVyUmVmZXJyZXIgPSBwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpLnJlZmVycmVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzE5CiAgICAvLyBjb25zdCBzZWxsZXJSZWZlcnJlciA9IHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkucmVmZXJyZXIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHByaW5jaXBhbE9mCiAgICBleHRyYWN0IDEwNCAzMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzIyCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMTQgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzIyLTMyMwogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBieiBuZXdQcml6ZUJveFJhZmZsZV9ib29sX2ZhbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyMwogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZHVwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyMi0zMjMKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IG5ld1ByaXplQm94UmFmZmxlX2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCm5ld1ByaXplQm94UmFmZmxlX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyMS0zMjQKICAgIC8vIGxvZ2dlZEFzc2VydCgoCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyApLCBlcnJCYWRNZXRob2RQcml6ZUJveFRyYW5zZmVyTmVlZGVkKQogICAgYm56IG5ld1ByaXplQm94UmFmZmxlX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJCbXB0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJtcHQKCm5ld1ByaXplQm94UmFmZmxlX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzI1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzI1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NwogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIGVyck5vdEFQcml6ZUJveCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMTIKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NzcKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBlcnJOb3RBUHJpemVCb3gpCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBlcnJOYXBiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3OAogICAgLy8gY29uc3QgW293bmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMocHJpemVCb3gsIEJ5dGVzKFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lcikpCiAgICBwdXNoYnl0ZXMgIm93bmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzI1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdQcml6ZUJveFJhZmZsZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTnBibyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcGJvCgpuZXdQcml6ZUJveFJhZmZsZV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyOAogICAgLy8gdHJ1ZSwKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozMjctMzQyCiAgICAvLyBjb25zdCByYWZmbGVBcHAgPSB0aGlzLmNyZWF0ZUNoaWxkQXBwKAogICAgLy8gICB0cnVlLAogICAgLy8gICBwYXltZW50LAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICB0aWNrZXRBc3NldCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgMCwKICAgIC8vICAgbWluVGlja2V0cywKICAgIC8vICAgbWF4VGlja2V0cywKICAgIC8vICAgbWluRW50cmllcywKICAgIC8vICAgZ2F0ZUlELAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgc2VsbGVyUmVmZXJyZXIKICAgIC8vICkKICAgIGNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMwogICAgdW5jb3ZlciAxMwogICAgdW5jb3ZlciAxMwogICAgdW5jb3ZlciAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzM0CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMyNy0zNDIKICAgIC8vIGNvbnN0IHJhZmZsZUFwcCA9IHRoaXMuY3JlYXRlQ2hpbGRBcHAoCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgIHRpY2tldEFzc2V0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAwLAogICAgLy8gICBtaW5UaWNrZXRzLAogICAgLy8gICBtYXhUaWNrZXRzLAogICAgLy8gICBtaW5FbnRyaWVzLAogICAgLy8gICBnYXRlSUQsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBzZWxsZXJSZWZlcnJlcgogICAgLy8gKQogICAgdW5jb3ZlciAxNAogICAgdW5jb3ZlciAxNAogICAgdW5jb3ZlciAxNAogICAgdW5jb3ZlciAxNAogICAgdW5jb3ZlciAxNAogICAgdW5jb3ZlciAxNAogICAgdW5jb3ZlciAxNAogICAgY2FsbHN1YiBjcmVhdGVDaGlsZEFwcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzQ0LTM0NwogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLAogICAgLy8gICBhcmdzOiBbcmFmZmxlQXBwLmFkZHJlc3NdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM0NgogICAgLy8gYXJnczogW3JhZmZsZUFwcC5hZGRyZXNzXSwKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM0NC0zNDcKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW3JhZmZsZUFwcC5hZGRyZXNzXSwKICAgIC8vIH0pCiAgICBieXRlYyAxNCAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjMwNS0zMTgKICAgIC8vIG5ld1ByaXplQm94UmFmZmxlKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICB0aWNrZXRBc3NldDogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgbWluVGlja2V0czogdWludDY0LAogICAgLy8gICBtYXhUaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1pbkVudHJpZXM6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3UHJpemVCb3hSYWZmbGVfYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgbmV3UHJpemVCb3hSYWZmbGVfYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkuZGVsZXRlUmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlUmFmZmxlOgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzUyCiAgICAvLyBkZWxldGVSYWZmbGUoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RBUmFmZmxlKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogZGVsZXRlUmFmZmxlX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOcmFmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5yYWYKCmRlbGV0ZVJhZmZsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM1NwogICAgLy8gY29uc3QgYmFsYW5jZUJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuYmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzU4CiAgICAvLyBjb25zdCBtaW5CZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLm1pbkJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1ODMKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIHB1c2hieXRlcyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MzYxCiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBidXJ5IDcKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNjQKICAgIC8vIHJhZmZsZS5jYWxsLmRlbGV0ZUFwcGxpY2F0aW9uKHsgYXBwSWQgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MjQ4N2MzMmMgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGNvbnN0IHNlbGYgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIGNvbnN0IGdyb3NzOiB1aW50NjQgPSBzZWxmLmJhbGFuY2UgKyBmb3J3YXJkZWQKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUwCiAgICAvLyBjb25zdCByZWNlaXZlZDogdWludDY0ID0gZ3Jvc3MgPiBiYWxhbmNlQmVmb3JlID8gZ3Jvc3MgLSBiYWxhbmNlQmVmb3JlIDogMAogICAgPAogICAgYnogZGVsZXRlUmFmZmxlX3Rlcm5hcnlfZmFsc2VAOAogICAgdW5jb3ZlciA0CiAgICAtCgpkZWxldGVSYWZmbGVfdGVybmFyeV9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTEKICAgIC8vIGNvbnN0IG1pbkFmdGVyOiB1aW50NjQgPSBzZWxmLm1pbkJhbGFuY2UKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTIKICAgIC8vIGNvbnN0IHJlbGVhc2VkOiB1aW50NjQgPSBtaW5CZWZvcmUgPiBtaW5BZnRlciA/IG1pbkJlZm9yZSAtIG1pbkFmdGVyIDogMAogICAgZGlnIDMKICAgIDwKICAgIGJ6IGRlbGV0ZVJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDExCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIC0KCmRlbGV0ZVJhZmZsZV90ZXJuYXJ5X21lcmdlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gcmVjZWl2ZWQgKyByZWxlYXNlZAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIHJldHVybiByZWZ1bmQgPiByZWNvcmRlZCA/IHJlY29yZGVkIDogcmVmdW5kCiAgICBkdXAKICAgIGRpZyAyCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTAKICAgIC8vIGlmIChyZWZ1bmQgPiAwKSB7CiAgICBieiBkZWxldGVSYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTExCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50OiByZWZ1bmQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGR1cAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKZGVsZXRlUmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNTIKICAgIC8vIGRlbGV0ZVJhZmZsZShhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRlbGV0ZVJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDExOgogICAgcG9wCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjUyCiAgICAvLyBjb25zdCByZWxlYXNlZDogdWludDY0ID0gbWluQmVmb3JlID4gbWluQWZ0ZXIgPyBtaW5CZWZvcmUgLSBtaW5BZnRlciA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGRlbGV0ZVJhZmZsZV90ZXJuYXJ5X21lcmdlQDEyCgpkZWxldGVSYWZmbGVfdGVybmFyeV9mYWxzZUA4OgogICAgcG9wCiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTAKICAgIC8vIGNvbnN0IHJlY2VpdmVkOiB1aW50NjQgPSBncm9zcyA+IGJhbGFuY2VCZWZvcmUgPyBncm9zcyAtIGJhbGFuY2VCZWZvcmUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVSYWZmbGVfdGVybmFyeV9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkubmV3UmFmZmxlQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1JhZmZsZUNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjM3NAogICAgLy8gcmV0dXJuIHRoaXMuY2hpbGRDb3N0cyhpc1ByaXplQm94LCBwcml6ZUlELCB0aWNrZXRBc3NldCwgd2VpZ2h0c0xpc3RDb3VudClbMl0KICAgIGNhbGxzdWIgY2hpbGRDb3N0cwogICAgZXh0cmFjdCAxNiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czozNzIKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjExOAogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjIKICAgIC8vIGNvbnN0IFtkYW9XYWxsZXRJZF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMgogICAgLy8gY29uc3QgW2Rhb1dhbGxldElkXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjQtMTI2CiAgICAvLyBkYW9XYWxsZXRJZCA9PT0gMAogICAgLy8gICA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgLy8gICA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfZmFsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjUKICAgIC8vID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09Cgppbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjMtMTI4CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGRhb1dhbGxldElkID09PSAwCiAgICAvLyAgICAgPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIC8vICAgICA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgLy8gICBlcnJOb3RBa2l0YURhbwogICAgLy8gKQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA1IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgMTEgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjkKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMwCiAgICAvLyBpZiAoIXRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMxCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuY3JlYXRlKHsgc2l6ZSB9KQogICAgc3dhcAogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTgKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzMKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXNpemUoc2l6ZSkKICAgIHN3YXAKICAgIGJveF9yZXNpemUKICAgIGIgaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA5Cgppbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjYKICAgIC8vIDogVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZGFvV2FsbGV0SWQpLmFkZHJlc3MsCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYiBpbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmxvYWRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbG9hZEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzcKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM4CiAgICAvLyBjb25zdCBleHBlY3RlZFByZXZpb3VzQ2FsbHM6IHVpbnQ2NCA9IG9mZnNldCAvIDIwMzIKICAgIHB1c2hpbnQgMjAzMgogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM5CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4IC0gZXhwZWN0ZWRQcmV2aW91c0NhbGxzIC0gMSkKICAgIHR4biBHcm91cEluZGV4CiAgICBzd2FwCiAgICAtCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MgogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGRpZyAyCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQzCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgZGlnIDIKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDMKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ0CiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGRpZyAyCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDQKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ1CiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGRpZyAyCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDkgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0NQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ2CiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBkaWcgMgogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0NgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgaW50Y18xIC8vIDEKCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MC0xNDcKICAgIC8vIGxvZ2dlZEFzc2VydCgoCiAgICAvLyAgIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAgICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAgICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAgICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gICAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICAgJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgLy8gKSwgZXJySW52YWxpZENhbGxPcmRlcikKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTEKICAgIHB1c2hieXRlcyAiRVJSOmVyckljb3IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWNvcgoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0Cgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ5CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVwbGFjZShvZmZzZXQsIGRhdGEpCiAgICBjb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM3CiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAODoKICAgIGludGNfMCAvLyAwCiAgICBiIGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuZGVsZXRlQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgpkZWxldGVCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1NAogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MgogICAgLy8gZGVsZXRlQm94ZWRDb250cmFjdCgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg3CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXBuIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4OQogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTAKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIHNwbGl0T3B0SW5Db3VudAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgc3dhcAogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICBkaWcgMwogICAgKwogICAgKgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk4CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwOAogICAgLy8gaWYgKGNvdW50ID4gMCAmJiBlc2Nyb3cubmFtZSAhPT0gJycpIHsKICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTIyCiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAxNSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4CiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWNfMiAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgZGlnIDYKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldlc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgcHVzaGJ5dGVzIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA0CiAgICAvLyBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAyLTEwNgogICAgLy8gY29uc3Qgb3B0SW5Db3VudCA9IHNwbGl0T3B0SW5Db3VudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldAogICAgLy8gKQogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgNAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwOAogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE3CiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNi0xMTkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTMKICAgIC8vIHdhbGxldCwKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTUKICAgIC8vIFthc3NldC5pZF0sCiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzUKICAgIC8vIGl0eG5Db21wb3NlLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg3CiAgICAvLyBvcHRJbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiBBc3NldCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxMwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTYKICAgIC8vIHJldHVybiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzIgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDE1IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxMCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18yIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo6UmFmZmxlRmFjdG9yeS5jaGlsZENvc3RzKGlzUHJpemVCb3g6IHVpbnQ2NCwgcHJpemVJRDogdWludDY0LCB0aWNrZXRBc3NldDogdWludDY0LCB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpjaGlsZENvc3RzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NDUKICAgIC8vIHByaXZhdGUgY2hpbGRDb3N0cyhpc1ByaXplQm94OiBib29sZWFuLCBwcml6ZUlEOiB1aW50NjQsIHRpY2tldEFzc2V0OiB1aW50NjQsIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCk6IFt1aW50NjQsIHVpbnQ2NCwgdWludDY0XSB7CiAgICBwcm90byA0IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjQ2CiAgICAvLyBsZXQgb3B0aW5NQlI6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo0OAogICAgLy8gY29uc3QgaXNBbGdvT3JQcml6ZUJveCA9IHByaXplSUQgPT09IDAgfHwgaXNQcml6ZUJveAogICAgZnJhbWVfZGlnIC0zCiAgICAhCiAgICBmcmFtZV9kaWcgLTQKICAgIHx8CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo0OQogICAgLy8gaWYgKCFpc0FsZ29PclByaXplQm94KSB7CiAgICBibnogY2hpbGRDb3N0c19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjUwCiAgICAvLyBvcHRpbk1CUiA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9idXJ5IDAKCmNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NTQKICAgIC8vIGlmICghaXNBbGdvVGlja2V0KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IGNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo1NQogICAgLy8gb3B0aW5NQlIgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCmNoaWxkQ29zdHNfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NjQKICAgIC8vIGlmICghaXNQcml6ZUJveCkgewogICAgZnJhbWVfZGlnIC00CiAgICBibnogY2hpbGRDb3N0c19lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NjUKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUlEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVJRCkKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY2CiAgICAvLyBpZiAoaXNBbGdvVGlja2V0KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBjaGlsZENvc3RzX2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOAogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NjcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpjaGlsZENvc3RzX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3NwogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMAogICAgKwogICAgZGlnIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc4CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSAod2VpZ2h0c0xpc3RDb3VudCAqIHRoaXMubWJyKCkud2VpZ2h0cykKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxMzExMzMwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzkKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzkKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyAxNiAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4NAogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODUKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjk1CiAgICAvLyByZXR1cm4gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZSkpCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ5CiAgICAvLyByZXR1cm4gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGV4dHJhUGFnZXMpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgcHVzaGludCAxMDAwMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg0LTg1CiAgICAvLyBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlICsKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo4NC04NwogICAgLy8gZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSArCiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIocmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogcmFmZmxlLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogcmFmZmxlLmdsb2JhbEJ5dGVzKSArCiAgICBwdXNoaW50IDExNTU1MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjg0LTg4CiAgICAvLyBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlICsKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiByYWZmbGUuZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiByYWZmbGUuZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSICsKICAgIHVuY292ZXIgMgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6ODQtODkKICAgIC8vIGZlZXMucmFmZmxlQ3JlYXRpb25GZWUgKwogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIHJhZmZsZS5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIHJhZmZsZS5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIgKwogICAgLy8gd2VpZ2h0c01CUgogICAgZGlnIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjkyCiAgICAvLyByZXR1cm4gW2Rpc2J1cnNlbWVudE1CUiwgd2VpZ2h0c01CUiwgdG90YWxNQlJdCiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKY2hpbGRDb3N0c19lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBwdXNoaW50IDM5OTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NjkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgICsKICAgICsKICAgIGIgY2hpbGRDb3N0c19hZnRlcl9pZl9lbHNlQDEzCgpjaGlsZENvc3RzX2Vsc2VfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6NzEKICAgIC8vIH0gZWxzZSBpZiAoaXNBbGdvVGlja2V0KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBjaGlsZENvc3RzX2Vsc2VfYm9keUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzgKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIGIgY2hpbGRDb3N0c19hZnRlcl9pZl9lbHNlQDEzCgpjaGlsZENvc3RzX2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc0CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czo3NAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGlja2V0QXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjM4CiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgcHVzaGludCAzMTkyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjc0CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aWNrZXRBc3NldCkKICAgICsKICAgIGIgY2hpbGRDb3N0c19hZnRlcl9pZl9lbHNlQDEzCgoKLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OlJhZmZsZUZhY3RvcnkuY3JlYXRlQ2hpbGRBcHAoaXNQcml6ZUJveDogdWludDY0LCBwYXltZW50OiB1aW50NjQsIHByaXplSUQ6IHVpbnQ2NCwgdGlja2V0QXNzZXQ6IHVpbnQ2NCwgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwgZW5kVGltZXN0YW1wOiB1aW50NjQsIGNyZWF0b3JSb3lhbHR5OiB1aW50NjQsIG1pblRpY2tldHM6IHVpbnQ2NCwgbWF4VGlja2V0czogdWludDY0LCBtaW5FbnRyaWVzOiB1aW50NjQsIGdhdGVJRDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwgc2VsbGVyUmVmZXJyZXI6IGJ5dGVzKSAtPiB1aW50NjQ6CmNyZWF0ZUNoaWxkQXBwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6OTUtMTEwCiAgICAvLyBwcml2YXRlIGNyZWF0ZUNoaWxkQXBwKAogICAgLy8gICBpc1ByaXplQm94OiBib29sZWFuLAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIHByaXplSUQ6IHVpbnQ2NCwgLy8gQXNzZXQgb3IgUHJpemUgQm94IEFwcGxpY2F0aW9uCiAgICAvLyAgIHRpY2tldEFzc2V0OiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBjcmVhdG9yUm95YWx0eTogdWludDY0LAogICAgLy8gICBtaW5UaWNrZXRzOiB1aW50NjQsCiAgICAvLyAgIG1heFRpY2tldHM6IHVpbnQ2NCwKICAgIC8vICAgbWluRW50cmllczogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgc2VsbGVyUmVmZXJyZXI6IEFjY291bnQKICAgIC8vICk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDE0IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTExCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTQKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCAmJiBlbmRUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJJbnZhbGlkRW5kaW5nUm91bmQpCiAgICBmcmFtZV9kaWcgLTkKICAgIGZyYW1lX2RpZyAtMTAKICAgID4KICAgIGJ6IGNyZWF0ZUNoaWxkQXBwX2Jvb2xfZmFsc2VANQogICAgZnJhbWVfZGlnIC05CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICA+CiAgICBieiBjcmVhdGVDaGlsZEFwcF9ib29sX2ZhbHNlQDUKICAgIGludGNfMSAvLyAxCgpjcmVhdGVDaGlsZEFwcF9ib29sX21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTQKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCAmJiBlbmRUaW1lc3RhbXAgPiBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLCBlcnJJbnZhbGlkRW5kaW5nUm91bmQpCiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDgKICAgIHB1c2hieXRlcyAiRVJSOmVyckllbnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWVucgoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTUKICAgIC8vIGxvZ2dlZEFzc2VydChtYXhUaWNrZXRzID4gMCAmJiBtYXhUaWNrZXRzID49IG1pblRpY2tldHMsIGVyckludmFsaWRUaWNrZXRCb3VuZHMpCiAgICBmcmFtZV9kaWcgLTYKICAgIGJ6IGNyZWF0ZUNoaWxkQXBwX2Jvb2xfZmFsc2VAMTEKICAgIGZyYW1lX2RpZyAtNgogICAgZnJhbWVfZGlnIC03CiAgICA+PQogICAgYnogY3JlYXRlQ2hpbGRBcHBfYm9vbF9mYWxzZUAxMQogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUNoaWxkQXBwX2Jvb2xfbWVyZ2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMTUKICAgIC8vIGxvZ2dlZEFzc2VydChtYXhUaWNrZXRzID4gMCAmJiBtYXhUaWNrZXRzID49IG1pblRpY2tldHMsIGVyckludmFsaWRUaWNrZXRCb3VuZHMpCiAgICBibnogY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdGJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl0YmQKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzQWxnb1RpY2tldCB8fCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGlja2V0QXNzZXQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGZyYW1lX2RpZyAtMTEKICAgIGJ6IGNyZWF0ZUNoaWxkQXBwX2Jvb2xfdHJ1ZUAxNgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2RpZyAtMTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjcmVhdGVDaGlsZEFwcF9ib29sX2ZhbHNlQDE3CgpjcmVhdGVDaGlsZEFwcF9ib29sX3RydWVAMTY6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlQ2hpbGRBcHBfYm9vbF9tZXJnZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzQWxnb1RpY2tldCB8fCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGlja2V0QXNzZXQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGJueiBjcmVhdGVDaGlsZEFwcF9hZnRlcl9hc3NlcnRAMjAKICAgIHB1c2hieXRlcyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfYXNzZXJ0QDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTIyCiAgICAvLyBjb25zdCBjb3N0cyA9IHRoaXMuY2hpbGRDb3N0cyhpc1ByaXplQm94LCBwcml6ZUlELCB0aWNrZXRBc3NldCwgd2VpZ2h0c0xpc3RDb3VudCkKICAgIGZyYW1lX2RpZyAtMTQKICAgIGZyYW1lX2RpZyAtMTIKICAgIGZyYW1lX2RpZyAtMTEKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBjaGlsZENvc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjMKICAgIC8vIGNvbnN0IGRpc2J1cnNlbWVudE1CUiA9IGNvc3RzWzBdCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI0CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSID0gY29zdHNbMV0KICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjUKICAgIC8vIGNvbnN0IHRvdGFsTUJSID0gY29zdHNbMl0KICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjYKICAgIC8vIGNvbnN0IGZlZXMgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI2CiAgICAvLyBjb25zdCBmZWVzID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTYxCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgMTYgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTMwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyMgogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiwgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTEzCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAyCiAgICA9PQogICAgYm56IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyNAogICAgYnl0ZWMgMTcgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNyZWF0ZUNoaWxkQXBwX2FmdGVyX2Fzc2VydEAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMy0xMzgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMzUKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzNQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzNgogICAgLy8gYW1vdW50OiBmZWVzLnJhZmZsZUNyZWF0aW9uRmVlLAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMy0xMzcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjEzMy0xMzgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZmVlcy5yYWZmbGVDcmVhdGlvbkZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQwLTE2OQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIG1pbkVudHJpZXMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSwKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0MwogICAgLy8gcHJpemVJRCwKICAgIGZyYW1lX2RpZyAtMTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0NAogICAgLy8gaXNQcml6ZUJveCwKICAgIGJ5dGVjIDggLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2RpZyAtMTQKICAgIHNldGJpdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ1CiAgICAvLyB0aWNrZXRBc3NldCwKICAgIGZyYW1lX2RpZyAtMTEKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDYKICAgIC8vIHN0YXJ0VGltZXN0YW1wLAogICAgZnJhbWVfZGlnIC0xMAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQ3CiAgICAvLyBlbmRUaW1lc3RhbXAsCiAgICBmcmFtZV9kaWcgLTkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0OAogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE0OQogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgZnJhbWVfZGlnIC0xMwogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDgKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTUwCiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIGZyYW1lX2RpZyAtOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTUxCiAgICAvLyBtaW5UaWNrZXRzLAogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTIKICAgIC8vIG1heFRpY2tldHMsCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1MwogICAgLy8gbWluRW50cmllcywKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTU0CiAgICAvLyBnYXRlSUQsCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE1NgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNTYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTU3LTE1OAogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSwKICAgIC8vIHNlbGxlclJlZmVycmVyLAogICAgcHVzaGJ5dGVzIDB4MDAyMgogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIHVuY292ZXIgMTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTYyCiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTYzCiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY0CiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIGludGNfMyAvLyAyCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTY1CiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIHB1c2hpbnQgMwogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE2OAogICAgLy8gZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpLAogICAgcHVzaGludCA0CiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTI4CiAgICAvLyBjb25zdCByYWZmbGUgPSBjb21waWxlQXJjNChSYWZmbGUpCiAgICBwdXNoaW50IDEwCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyMwogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDAtMTY5CiAgICAvLyBjb25zdCBhcHBJZCA9IHJhZmZsZS5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplSUQsCiAgICAvLyAgICAgICBpc1ByaXplQm94LAogICAgLy8gICAgICAgdGlja2V0QXNzZXQsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIG1pblRpY2tldHMsCiAgICAvLyAgICAgICBtYXhUaWNrZXRzLAogICAgLy8gICAgICAgbWluRW50cmllcywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiByYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpLAogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxMjgKICAgIC8vIGNvbnN0IHJhZmZsZSA9IGNvbXBpbGVBcmM0KFJhZmZsZSkKICAgIHB1c2hieXRlcyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNDAtMTY5CiAgICAvLyBjb25zdCBhcHBJZCA9IHJhZmZsZS5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplSUQsCiAgICAvLyAgICAgICBpc1ByaXplQm94LAogICAgLy8gICAgICAgdGlja2V0QXNzZXQsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIG1pblRpY2tldHMsCiAgICAvLyAgICAgICBtYXhUaWNrZXRzLAogICAgLy8gICAgICAgbWluRW50cmllcywKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUsCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiByYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKHJhZmZsZS5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpLAogICAgLy8gICB9KQogICAgcHVzaGJ5dGVzIDB4ZmRlMjc3N2UgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcywoYWRkcmVzcyx1aW50NjQpLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsKHN0cmluZyx1aW50NjQpLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTQwLTE3MQogICAgLy8gY29uc3QgYXBwSWQgPSByYWZmbGUuY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUlELAogICAgLy8gICAgICAgaXNQcml6ZUJveCwKICAgIC8vICAgICAgIHRpY2tldEFzc2V0LAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBtaW5UaWNrZXRzLAogICAgLy8gICAgICAgbWF4VGlja2V0cywKICAgIC8vICAgICAgIG1pbkVudHJpZXMsCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgICAgICB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogcmFmZmxlLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhyYWZmbGUuY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSwKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTc0LTE3OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE3NgogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNzcKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDQKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNzQtMTc4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxNzQtMTc5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4MQogICAgLy8gaWYgKCFpc0FsZ29UaWNrZXQpIHsKICAgIGZyYW1lX2RpZyAtMTEKICAgIGJ6IGNyZWF0ZUNoaWxkQXBwX2FmdGVyX2lmX2Vsc2VAMzEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE4Mi0xOTEKICAgIC8vIHJhZmZsZS5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aWNrZXRBc3NldCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODYKICAgIC8vIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODcKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MTg1LTE4OAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxODItMTkxCiAgICAvLyByYWZmbGUuY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGlja2V0QXNzZXQsCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKY3JlYXRlQ2hpbGRBcHBfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE5NC0yMDMKICAgIC8vIHJhZmZsZS5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUiwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE5OAogICAgLy8gcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE5Ny0yMDAKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhcHBJZC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9yYWZmbGUvZmFjdG9yeS5hbGdvLnRzOjE5NC0yMDMKICAgIC8vIHJhZmZsZS5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXBwSWQuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUiwKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3JhZmZsZS9mYWN0b3J5LmFsZ28udHM6MjAxCiAgICAvLyB3ZWlnaHRzTGlzdENvdW50LAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoxOTQtMjAzCiAgICAvLyByYWZmbGUuY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGFwcElkLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweGJkNzE0OGQwIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvcmFmZmxlL2ZhY3RvcnkuYWxnby50czoyMDUKICAgIC8vIHJldHVybiBhcHBJZAogICAgc3dhcAogICAgcmV0c3ViCgpjcmVhdGVDaGlsZEFwcF9ib29sX2ZhbHNlQDE3OgogICAgaW50Y18wIC8vIDAKICAgIGIgY3JlYXRlQ2hpbGRBcHBfYm9vbF9tZXJnZUAxOAoKY3JlYXRlQ2hpbGRBcHBfYm9vbF9mYWxzZUAxMToKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUNoaWxkQXBwX2Jvb2xfbWVyZ2VAMTIKCmNyZWF0ZUNoaWxkQXBwX2Jvb2xfZmFsc2VANToKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUNoaWxkQXBwX2Jvb2xfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuY2hpbGRBcHByb3ZhbENodW5rKGluZGV4OiB1aW50NjQpIC0+IGJ5dGVzOgpjaGlsZEFwcHJvdmFsQ2h1bms6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MQogICAgLy8gcHJvdGVjdGVkIGNoaWxkQXBwcm92YWxDaHVuayhpbmRleDogdWludDY0KTogYnl0ZXMgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjkyCiAgICAvLyBjb25zdCBzaXplID0gYm94ZWRQcm9ncmFtU2l6ZShib3hLZXkpCiAgICBjYWxsc3ViIGJveGVkUHJvZ3JhbVNpemUKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjkzCiAgICAvLyBjb25zdCBvZmZzZXQ6IHVpbnQ2NCA9IGluZGV4ICogTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSAogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDUgLy8gNDA5NgogICAgKgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5NAogICAgLy8gaWYgKG9mZnNldCA+PSBzaXplKSB7CiAgICA+PQogICAgYnogY2hpbGRBcHByb3ZhbENodW5rX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTUKICAgIC8vIHJldHVybiBCeXRlcygnJykKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICByZXRzdWIKCmNoaWxkQXBwcm92YWxDaHVua19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTcKICAgIC8vIGNvbnN0IHJlbWFpbmluZzogdWludDY0ID0gc2l6ZSAtIG9mZnNldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTgKICAgIC8vIHJldHVybiBvcC5Cb3guZXh0cmFjdChib3hLZXksIG9mZnNldCwgcmVtYWluaW5nID4gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA/IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggOiByZW1haW5pbmcpCiAgICBkdXAKICAgIGludGMgNSAvLyA0MDk2CiAgICA+CiAgICBpbnRjIDUgLy8gNDA5NgogICAgc3dhcAogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk4CiAgICAvLyByZXR1cm4gb3AuQm94LmV4dHJhY3QoYm94S2V5LCBvZmZzZXQsIHJlbWFpbmluZyA+IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggPyBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIIDogcmVtYWluaW5nKQogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5jaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplOiB1aW50NjQpIC0+IHVpbnQ2NDoKY2hpbGRFeHRyYVBhZ2VzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODQKICAgIC8vIHByb3RlY3RlZCBjaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3NwogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbVNpemUoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCkpCiAgICBieXRlY18xIC8vICJiYyIKICAgIGNhbGxzdWIgYm94ZWRQcm9ncmFtU2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMyCiAgICAvLyBjb25zdCBwYWdlczogdWludDY0ID0gKGFwcHJvdmFsU2l6ZSArIGNsZWFyU2l6ZSArIFBST0dSQU1fUEFHRV9TSVpFIC0gMSkgLyBQUk9HUkFNX1BBR0VfU0laRQogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBwdXNoaW50IDIwNDgKICAgICsKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBwdXNoaW50IDIwNDgKICAgIC8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMzCiAgICAvLyBsb2dnZWRBc3NlcnQocGFnZXMgPD0gTUFYX1BST0dSQU1fVE9UQUxfUEFHRVMsIGVyclByb2dyYW1Ub29MYXJnZSkKICAgIGludGNfMiAvLyA4CiAgICA8PQogICAgYm56IGNoaWxkRXh0cmFQYWdlc19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHRsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQdGxnCgpjaGlsZEV4dHJhUGFnZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDMKICAgIC8vIGNvbnN0IGV4dHJhOiB1aW50NjQgPSBwYWdlcyA+IDAgPyBwYWdlcyAtIDEgOiAwCiAgICBkdXAKICAgIGJ6IGNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAtCgpjaGlsZEV4dHJhUGFnZXNfdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICBwdXNoaW50IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0NAogICAgLy8gcmV0dXJuIGV4dHJhID4gbWluRXh0cmFQYWdlcyA/IGV4dHJhIDogbWluRXh0cmFQYWdlcwogICAgPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODUKICAgIC8vIHJldHVybiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QoY2xlYXJTaXplLCBMRUdBQ1lfQ0hJTERfRVhUUkFfUFJPR1JBTV9QQUdFUykKICAgIHB1c2hpbnQgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICByZXRzdWIKCmNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X2ZhbHNlQDc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0MwogICAgLy8gY29uc3QgZXh0cmE6IHVpbnQ2NCA9IHBhZ2VzID4gMCA/IHBhZ2VzIC0gMSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X21lcmdlQDgK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAHAAEIArjvBIAg0IYDJhIJYWtpdGFfZGFvAmJjBndhbGxldAxha2l0YV9lc2Nyb3cEFR98dQtFUlI6ZXJyTmRhbwNhYWwLRVJSOmVyckNuc3QBAATFOzLMB3ZlcnNpb24WY2hpbGRfY29udHJhY3RfdmVyc2lvbgtFUlI6ZXJySXhmcgQ+oRgyBK35KuQDcGFsCG5mdF9mZWVzC0VSUjplcnJJcGF5gATqkYDdNhoAjgEAnDEZFEQxGEEAhYIEBICDEe4E8xGctASR3Tx1BJrX0z0nCYIIBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eAE2aNfpDYaAI4NAn0E8gYgBtsHDQdgB+gIAQnSCfwKewAiAAEAgBwVH3x1AAAAAAAAe9QAAAAAAMgX1AAAAAAAAEnUsCNDI0OABIEVNig2GgCOAQH1ADEZgQQSMRgQREIJ84oBAYv/vUAABCcHsACJigIBi/9BABeL/icGZUgkW3IIRIv/cABFAUAAAzIQiSKJigMBIov+i/9wAEUBQAAai/2ADnJldmVudWVfc3BsaXRzZUgiWSMIjACLAEyJigIBIkmL/icGZUiBWFsyDjEAMg2L/0AAGUgyA0kiFk8DSU4CUE8DUExQTFAnCFCMAImL/0EABYsCQAErIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAUEAGIsBFYEgEkEAD4sBSwESQQAHSYsDE0AAD4ALRVJSOmVyckhuYmSwACNMi/+AEmNvbnRyb2xsZWRfYWRkcmVzc2VBAAhJFYEgEkAAD4ALRVJSOmVyckl3bHSwAElLAhJBAFAjTIv/gAhyZWZlcnJlcmVBADZJFYEgEkEALk4DSwJLAU8DSU4DTUxBABdMi/8WTwJQTFBMUExQJwgiTwNUUEL/BUUBMgNC/+NIMgNOA0L/zIv/cghMTgJAAAdFASJMQv+hSUsCEkEAC0xzAkgyAxJMQv+PSXMCSE8CEkxC/4SL/3IHTIwAQQAXiwIWgAVhcHBJRExQA4sAEkEABCNC/rUiQv6xNhoBSSJZJQhLARUSRFcCADYaAkkiWSUISwEVEkRXAgA2GgNJFSQSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnCk8EZycLTwNnKE8CZytMZyNDIoAAMRYlCUk4ECMSRDEWIwlHAjgQgQQSRDYaAUkVJBJEF04CNhoCSRUkEkQXTgM2GgNJFSQSRBdOAzYaBEkVJBJEF04GNhoFSRUkEkQXTgY2GgZJFSQSRBdOBjYaB0kVJBJEF04GNhoISU4HFYEgEkQ2GglJTgNJIlklCEwVEkQ2GgpJTgNJIllJTgOBIAslCEwVEkQ2GgtJFSQSRBdOBjYaDEkVJBJEFyIoZURMiP1sV2ggTgYxAEw4ABJAAA+AC0VSUjplcnJJcG1zsABLATgTMgMSQAAPgAtFUlI6ZXJyTmNsd7AASwE4FTIDEkAAD4ALRVJSOmVyck5jbHOwAEsBOCAyAxJAAA+AC0VSUjplcnJOcmt5sABLATgUMgoSQAAEJwywAEsBOBJJTghAAAQnDLAATDgRSUsFE0AAD4ALRVJSOmVyclBpdGGwAElxCkQyAxJBARlJcQlEMgMSQQEPI0AAD4ALRVJSOmVyclBzemKwACIoZUxOAkQiRRJPAkAAckUBRQFFAYGIJ0UOIk8ISwJPBE8JTwlLD08PTw9PD08PTw9PDk8OiAcVsUlyCEQyELIIsgcjshAisgG2SwEWIrIZSwGyGCcNshqyGoEGshAisgGzsUlyCERPArIRTwKyErIUgQSyECKyAbMWJwRMULAjQ7FHAnELREwWAQEjFk8EJwZlSIFIW7IYgAQf98dMshpPArIaTwSyGkyyGk8CshqyGoAJAAdyb3lhbHR5shqBBrIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWSUITBUSRFcGAElFEBVBAAVLDhdFDksNIQYNQf8lIQZFDkL/HiJC/u4xFiUJRwI4EIEGEkQxFiMJSU4DOBAjEkQ2GgFJFSQSRBdOAzYaAkkVJBJEF04DNhoDSRUkEkQXTgM2GgRJFSQSRBdOAzYaBUkVJBJEF04DNhoGSRUkEkQXTgM2GgdJFSQSRBdOAzYaCElOBBWBIBJENhoJSRUkEkQXTgM2GgpJFSQSRBciKGVETIj7HFdoIE4DORoAJw4SQQCQSTgZQACKI0AAD4ALRVJSOmVyckJtcHSwACIoZURMOBhJTgJJcgdETwInBmVIgRhbcghEEkSABW93bmVyZUgyChJAAA+AC0VSUjplcnJOcGJvsAAjTgJJTgNPDU8NTw0iTw5PDk8OTw5PDk8OTw6IBUKxSXIIRE8CshgnDrIashqBBrIQIrIBsxYnBExQsCNDIkL/cyKAADYaAUkVJBJEF0lyB0QyChJAAA+AC0VSUjplcnJOcmFmsAAyCnMATElPAkQyCnMBTE4CRE8DSYAGZnVuZGVyZUhJVwAgRQeBIFtOA7GBBbIZshiABCSHwyyyGoEGshAisgGzMgpJTgJzAExJTgJOA0QMQQA8TwQJTHMBTElPAkRLAwxBACRPAkwJCElLAg1MTgJNSUUCQQAPsUmyCEsBsgcjshAisgGzI0NIRQEiQv/ZSE8DSCJC/782GgFJFSMSRCJTNhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXiAOaVxAIJwRMULAjQzYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBciKGVEKmVISUAAJUgxADIJEkAABCcFsAAnC08CZym9RQFAAAYpTLlII0MpTNNC//gxAExyCEQSQv/XNhoBSRUkEkQXSTYaAkkiWSUISwEVEkRXAgBMgfAPCjEWTAkjCUlOAzgQgQYSQQBUSwI4GDIIEkEASksCOBuBAxJBAEBLAjgZQAA5SwI5GgAnCRJBAC5LAjgAMQASQQAkI0AAD4ALRVJSOmVyckljb3KwACm9RQFAAAQnB7AAKU4CuyNDIkL/2TEAIihlRCplSHIIRBJAAAQnBbAAKbxII0MxFiMJRwI4ECMSRDYaAUkVJBJEF0lOAyIrZUxJTgJOBUQiKGVETCVbcghETwKI+DxMOAcyChJAAA+AC0VSUjplcnJJcG1ysABMOAgyECNLAwgLEkAAD4ALRVJSOmVycklwbWGwALEyCksDshEishKyFIEEshAisgGzQQFTRwIiWUsBFVJXAgCAABNBAUIiKGVESSplSExJJw9lSElXCAhOAiRbTgMiK2VMSU4CRQdESSJZSwEVUklOAlcCAEwqZUhMsSMWTgJJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGoEGshAisgGztD5JVwQASwFXAAQnBBJESSJZgSkLJQhMFRJEVwYpIltJQAAPgAtFUlI6ZXJyTmVzY7AASwYlW0lPAhJAAA+AC0VSUjplcnJXZXNjsACxTwRJshiABFrfM4+yGk8EshpPArIaTwKyGoAKAAEAAAAAAAAAALIagAIAALIagQayECKyASIoZURPAklOAnIIREsGSU4EiPbrMhALtkxyCESyB7III7IQIrIBtksBFkwWgAIAAUxQTwOyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVEIitlRCVbcghETwKI9oAyECNPAggLFicETFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKGVEKmVIcghEEkAABCcFsAArTGcjQzYaAUkiWSUISwEVEkRXAgAxACIoZUQqZUhyCEQSQAAEJwWwACIoZUQnD2VIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJwpMZyNDNhoBSRUkEkQXMQAiKGVEKmVIcghEEkAABCcFsAAoTGcjQ4oEASKL/RSL/BFAAAQyEIwAi/5BAAeLADIQCIwAi/xAAGUiKGVEi/2I9YQhBAiL/kAAQiEECDIBiwAISwEIi/+B1K+gBgsiKGVEJxBlSIFYW4EEiAKCIwiBoI0GCwiBrMNGCE8CCEsBCE8CFk8CFlBMFlBMiSIoZUSL/oj1MYGYrRgICEL/r4v+QAAFIQRC/6UiKGVEi/6I9RWB4L0TCEL/lIoOASIpvUUBQAAEJwewAIv3i/YNQQHxi/cyBw1BAekjQAAPgAtFUlI6ZXJySWVucrAAi/pBAc2L+ov5D0EBxSNAAA+AC0VSUjplcnJJdGJksACL9UEACzIKi/VwAEUBQQGeI0AAD4ALRVJSOmVyck5vcHSwAIvyi/SL9Yv+iP7eSSJbTEkkW0yBEFsiKGVEJxBlSIvzOAcyChJAAAQnEbAAi/M4CEsCEkAABCcRsACxIitlREklW3IIRE8CgVhbsgiyByOyECKyAbOxi/QWJwgii/JUi/UWSU4CjACL9haL9xYxAIvzOABPCBZQi/gWi/kWi/oWi/sWi/wWIihlRBaAAgAii/9QTw5QIogA/iOIAPoliAD2gQOIAPGBBIgBFoEKsjWBF7I0IrIZsjiABAuBAUOyQk8DskBPArJATLJAskCABP3id36yGk8NshpPC7IaTwuyGk8KshpPCbIaTwiyGk8HshpPBrIaTwWyGk8EshpPA7IaTwKyGov9shpMshqyGoEGshAisgGztwA9SbFyCEQyAU8ECLIIsgcjshAisgGzi/VBACixRwJyCEQyELIIsgcjshAisgG2IrIZshgnDbIaiwCyGoEGshAisgGzsUlyCERPArIIsgcjshAisgG2i/4WIrIZSwGyGIAEvXFI0LIashqBBrIQIrIBs0yJIkL+XyJC/jgiQv4UigEBKYjy7EmL/yEFC0lPAg9BAAVGAoAAiUlOAglJIQUNIQVMTSlOArqJigEBKYjywov/CIGAEAgjCYGAEApJJA5AAA+AC0VSUjplcnJQdGxnsABJQQAMIwlJgQMNgQNOAk2JSCJC//E=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var RaffleFactorySDK = class extends _chunk3QW7XUAWjs.BaseSDK {
  constructor(params) {
    super({ factory: RaffleFactoryFactory, ...params }, _chunkMY4J3UZTjs.ENV_VAR_NAMES.RAFFLE_FACTORY_APP_ID);
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
      const prizeBoxSDK = new (0, _chunkYA6SW4XNjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
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
var RaffleSDK = class extends _chunk3QW7XUAWjs.BaseSDK {
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
//# sourceMappingURL=chunk-VBWQOYH6.js.map
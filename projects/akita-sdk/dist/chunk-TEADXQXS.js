"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunk7PR6FWPZjs = require('./chunk-7PR6FWPZ.js');



var _chunkZGCVKZRLjs = require('./chunk-ZGCVKZRL.js');


var _chunkN5J2GB5Wjs = require('./chunk-N5J2GB5W.js');


var _chunkH2KYIJ7Kjs = require('./chunk-H2KYIJ7K.js');

// src/auction/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/AuctionClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Auction", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "BidInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }, { "name": "marketplace", "type": "address" }, { "name": "refunded", "type": "bool" }], "FindWinnerCursors": [{ "name": "startingIndex", "type": "uint64" }, { "name": "currentRangeStart", "type": "uint64" }], "AkitaConfig": [{ "name": "akitaDao", "type": "uint64" }, { "name": "akitaDaoEscrow", "type": "EscrowConfig" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAsset" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "seller" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "(uint64,(string,uint64))", "struct": "AkitaConfig", "name": "akitaConfig" }, { "type": "address", "name": "sellerReferrer" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancel", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "deletes the application & returns the mbr + asset\nto the seller IF the auction hasn't started", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated bid (principal ABI, spec \xA76.6). The gate subject is the verified context of the bidder's\n`wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A\nplugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (spec \xA77.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`\nwith its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).\nKept for old plugins and SDKs during the compatibility window.", "events": [], "recommendations": {} }, { "name": "bid", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "ASA twin of `gatedBid` (principal ABI, spec \xA76.6).", "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "bidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundBid", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Loser-raffle draw, commit-reveal (AR-01):\n- first call after the end freezes the eligible weight (AR-02) and commits to a\n  beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet\n- a later call (BEACON_LAG_ROUNDS after that round) draws the ticket\n- an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after\n  BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round", "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimPrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "hasBid", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool", "desc": "a boolean of whether the address has bid in the auction" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMinimumBidAmount", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 25, "bytes": 11 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset up for auction" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "whether the prize has been claimed" }, "bidAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2Fzc2V0", "desc": "the asset that is being used for bidding in the auction" }, "bidFee": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2ZlZQ==", "desc": "the percentage fee to take for the raffle on each bid in hundreds to support two decimals" }, "startingBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRpbmdfYmlk", "desc": "the starting amount to begin bids at" }, "bidMinimumIncrease": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX21pbmltdW1faW5jcmVhc2U=", "desc": "the smallest amount each new bid need increment the auction price" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "the unix time that the auction starts on" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "the round that the auction ends on" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the royalty percentage the creator will get for the auction" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that created the auction to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the royalty percentage each side of the market will take for the auction" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to bid in the auction" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "refundCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX2NvdW50", "desc": "the number of bids that have been refunded" }, "bidTotal": { "keyType": "AVMString", "valueType": "uint128", "key": "YmlkX3RvdGFs", "desc": "the total sum of all bids" }, "weightedBidTotal": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0ZWRfYmlkX3RvdGFs", "desc": "the total sum of all highest bids" }, "highestBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aGlnaGVzdF9iaWQ=", "desc": "highest bid the contract has received thus far" }, "bidID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2lk", "desc": "the id or index of the last bid" }, "raffleAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX2Ftb3VudA==", "desc": "the total amount collected for the loser raffle" }, "rafflePrizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3ByaXplX2NsYWltZWQ=", "desc": "whether the raffle winner has claimed their prize" }, "uniqueAddressCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dW5pcXVlX2FkZHJlc3NfY291bnQ=", "desc": "we count how many unique addresses bid so we can\nproperly get each bids % of the total bid amount" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "we get the winning number from the randomness beacon\nafter the auction ends & we have ran findWinner\nto compile our list" }, "raffleWinner": { "keyType": "AVMString", "valueType": "address", "key": "cmFmZmxlX3dpbm5lcg==", "desc": "the winning address of the raffle" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "salt for randomness" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called after auction ends\nused for VRF since round times are dynamic and we need a deterministic round" }, "sellerReferrer": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVyX3JlZmVycmVy", "desc": "Referrer of the seller's verified wallet, resolved once by the factory at creation (zero if\nnone) and paid at settlement (spec \xA76.6). Plugins read its EXISTENCE as the marker of this\nchild's principal ABI; children created before it keep registry semantics until they settle." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "bids": { "keyType": "uint64", "valueType": "BidInfo", "desc": "the list of bids in the auction", "prefix": "Yg==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "bidsByAddress": { "keyType": "address", "valueType": "uint64", "desc": "when we run our raffle we need to transform\nour list of bids into an address based box", "prefix": "YQ==" }, "locations": { "keyType": "uint64", "valueType": "address", "desc": "the addresses associated with highest bid locations", "prefix": "bA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3151, 3170, 4104, 4292, 4501, 4632, 6282, 7264, 7918], "errorMessage": "Box must have value" }, { "pc": [1460, 1621, 3377, 5715, 6394, 8244], "errorMessage": "Bytes has valid prefix" }, { "pc": [2666], "errorMessage": "ERR:errAast" }, { "pc": [3060, 3825, 4569, 5072], "errorMessage": "ERR:errAhne" }, { "pc": [6327, 7145], "errorMessage": "ERR:errAnlv" }, { "pc": [4227], "errorMessage": "ERR:errArfc" }, { "pc": [7952], "errorMessage": "ERR:errBarf" }, { "pc": [7915], "errorMessage": "ERR:errBnfd" }, { "pc": [3428], "errorMessage": "ERR:errBnrd" }, { "pc": [6306], "errorMessage": "ERR:errCobs" }, { "pc": [7886], "errorMessage": "ERR:errCrmr" }, { "pc": [6529], "errorMessage": "ERR:errFgte" }, { "pc": [5458], "errorMessage": "ERR:errForb" }, { "pc": [7168], "errorMessage": "ERR:errHgte" }, { "pc": [6950], "errorMessage": "ERR:errHnbd" }, { "pc": [6855], "errorMessage": "ERR:errHnwl" }, { "pc": [6874], "errorMessage": "ERR:errHtop" }, { "pc": [2213], "errorMessage": "ERR:errIapp" }, { "pc": [2126], "errorMessage": "ERR:errIast" }, { "pc": [2367, 2379, 7604, 7622, 7774, 7786], "errorMessage": "ERR:errIpay" }, { "pc": [5507], "errorMessage": "ERR:errIpma" }, { "pc": [5483], "errorMessage": "ERR:errIpmr" }, { "pc": [7681], "errorMessage": "ERR:errIpms" }, { "pc": [3585, 3597], "errorMessage": "ERR:errIrbd" }, { "pc": [3491], "errorMessage": "ERR:errIrsd" }, { "pc": [5375], "errorMessage": "ERR:errIupg" }, { "pc": [6561, 6971], "errorMessage": "ERR:errIwlt" }, { "pc": [7807, 7817, 7833], "errorMessage": "ERR:errIxfr" }, { "pc": [2327], "errorMessage": "ERR:errM3hb" }, { "pc": [2084, 2294, 2423, 2640], "errorMessage": "ERR:errMbff" }, { "pc": [2305, 3071, 3810], "errorMessage": "ERR:errNapp" }, { "pc": [2452, 2515], "errorMessage": "ERR:errNarc" }, { "pc": [1302, 7720], "errorMessage": "ERR:errNcls" }, { "pc": [7706], "errorMessage": "ERR:errNclw" }, { "pc": [5299, 5343, 5411], "errorMessage": "ERR:errNdao" }, { "pc": [8281], "errorMessage": "ERR:errNesc" }, { "pc": [3309], "errorMessage": "ERR:errNetm" }, { "pc": [1316, 7734], "errorMessage": "ERR:errNrky" }, { "pc": [4592], "errorMessage": "ERR:errPacl" }, { "pc": [2464, 4165, 5084], "errorMessage": "ERR:errPznc" }, { "pc": [3121, 4958], "errorMessage": "ERR:errRapc" }, { "pc": [5107], "errorMessage": "ERR:errRnpc" }, { "pc": [2498], "errorMessage": "ERR:errRwhc" }, { "pc": [2525, 2676], "errorMessage": "ERR:errShbb" }, { "pc": [7429], "errorMessage": "ERR:errTmpt" }, { "pc": [2349], "errorMessage": "ERR:errTmwb" }, { "pc": [3094], "errorMessage": "ERR:errWadr" }, { "pc": [3109, 3863], "errorMessage": "ERR:errWafd" }, { "pc": [8308], "errorMessage": "ERR:errWesc" }, { "pc": [4199, 4946], "errorMessage": "ERR:errWnfd" }, { "pc": [3848], "errorMessage": "ERR:errWnnf" }, { "pc": [6585], "errorMessage": "account funded" }, { "pc": [1391, 1483, 1502, 1515, 1526, 1643, 2192, 4775, 4914, 5291, 5335, 5403, 6566, 6590, 8077, 8369, 8387, 8465], "errorMessage": "application exists" }, { "pc": [2108, 4743, 4881], "errorMessage": "asset exists" }, { "pc": [2250, 2298, 2427, 2436, 2444, 2457, 2468, 2476, 2502, 2507, 2530, 2540, 2555, 2571, 2580, 2594, 2647, 2681, 2688, 2698, 3021, 3052, 3064, 3076, 3099, 3114, 3126, 3133, 3142, 3206, 3226, 3237, 3244, 3262, 3287, 3315, 3321, 3333, 3405, 3433, 3559, 3803, 3817, 3830, 3853, 3868, 3895, 3904, 3914, 3956, 3981, 4077, 4086, 4158, 4169, 4177, 4188, 4203, 4208, 4238, 4242, 4313, 4541, 4561, 4574, 4596, 4606, 4623, 4655, 4686, 4700, 4710, 4723, 4732, 4740, 4759, 4764, 4769, 4821, 4835, 4845, 4860, 4870, 4878, 4894, 4899, 4903, 4908, 4936, 4951, 4965, 4991, 5002, 5029, 5037, 5049, 5064, 5077, 5089, 5128, 5151, 5167, 5284, 5328, 5347, 5396, 5532, 5546, 5565, 5590, 5598, 5620, 5635, 5664, 5669, 5779, 5787, 5809, 5842, 5875, 5939, 5948, 5978, 6002, 6021, 6026, 6092, 6127, 6153, 6160, 6183, 6187, 6235, 6243, 6248, 6257, 6264, 6273, 6336, 6431, 6439, 6674, 6747, 7150, 7202, 7243, 7295, 7308, 7331, 7345, 7357, 7369, 7382, 7402, 7407, 7434, 7452, 7498, 7521, 7825, 7863, 7976, 8008, 8019, 8032, 8040, 8045, 8052, 8071, 8136, 8168, 8363], "errorMessage": "check GlobalState exists" }, { "pc": [1729, 4977, 5551, 5603, 5751, 5792, 5847, 5862, 5880], "errorMessage": "errIpct" }, { "pc": [1358], "errorMessage": "errNcca" }, { "pc": [3217, 7334, 7503], "errorMessage": "index access is out of bounds" }, { "pc": [3191, 3201, 4064, 7285, 7322, 7488, 7965], "errorMessage": "index out of bounds" }, { "pc": [1370, 1947, 2012, 2065, 3380, 5273, 5311, 6397, 8247], "errorMessage": "invalid array length header" }, { "pc": [1829], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1955, 5319], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [8257], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1911, 1941, 2754, 2806, 2835, 2885, 2949, 2990, 5219], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [2017, 2070], "errorMessage": "invalid number of bytes for arc4.tuple<smart_contracts/utils/base-contracts/base.ts::AkitaConfig,arc4.static_array<arc4.uint8, 32>>" }, { "pc": [1820, 1839, 1848, 1858, 1868, 1878, 1888, 1919, 1929, 2281, 2762, 2893, 3006, 3798, 4152, 5021, 5389, 5434], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3387, 6404], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5278], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1901], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1465, 1626, 5720], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [2008, 2061, 5265], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1972, 2031], "errorMessage": "invalid tail pointer at index 0 of ((uint64,((len+utf8[]),uint64)),uint8[32])" }, { "pc": [1992, 2048], "errorMessage": "invalid tail pointer at index 1 of (uint64,((len+utf8[]),uint64))" }, { "pc": [1967, 1987, 2003, 2026, 2043, 2056, 5260], "errorMessage": "invalid tuple encoding" }, { "pc": [2746, 2798, 2877, 2941], "errorMessage": "transaction type is appl" }, { "pc": [2866, 2930, 2982], "errorMessage": "transaction type is axfer" }, { "pc": [2273, 2735, 2787, 2827, 2854, 2918, 2971, 5426], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMTAwMDAwIDQwOTYgNjM2NDEzNjIyMzg0Njc5MzAwNSAxODQ0Njc0NDA3MzcwOTU1MTYxNSAxNDQyNjk1MDQwODg4OTYzNDA3IDE0NDI2OTUwNDA4ODg5NjM0MDkgMjg1MDAgNDI5NDk2NzI5NSAxMzExMzMwMCAzNTMwMCA1NDIwMCA3MzEwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmlkX2Fzc2V0IiAiYmlkX2lkIiAiYmlkX2ZlZSIgIndlaWdodGVkX2JpZF90b3RhbCIgMHgxNTFmN2M3NSAid190b3RhbHMiICJyYWZmbGVfcHJpemVfY2xhaW1lZCIgIndlaWdodHNfYm94X2NvdW50IiAid2lubmluZ190aWNrZXQiICJwcml6ZSIgImVuZF90aW1lc3RhbXAiICJhIiAiYiIgInJhZmZsZV9yb3VuZCIgImlzX3ByaXplX2JveCIgInByaXplX2NsYWltZWQiICJzZWxsZXIiICJyYWZmbGVfd2lubmVyIiAidW5pcXVlX2FkZHJlc3NfY291bnQiICJyZWZ1bmRfbWJyX2N1cnNvciIgImFraXRhX2VzY3JvdyIgIkVSUjplcnJJcGF5IiAidyIgImhpZ2hlc3RfYmlkIiAiYWFsIiAiY3JlYXRvcl9yb3lhbHR5IiAibWFya2V0cGxhY2Vfcm95YWx0aWVzIiAweDAwICJ3YWxsZXQiICJyZWZ1bmRfY291bnQiICJyYWZmbGVfYW1vdW50IiAweDAwMDEgIkVSUjplcnJNYmZmIiAic3RhcnRfdGltZXN0YW1wIiAiZ2F0ZV9pZCIgImZpbmRfd2lubmVyX2N1cnNvcnMiICJFUlI6ZXJyQWhuZSIgInZyZl9mYWlsdXJlX2NvdW50IiAibWFya2V0cGxhY2UiICJzZWxsZXJfcmVmZXJyZXIiICJuZnRfZmVlcyIgIkVSUjplcnJOYXBwIiAiRVJSOmVyclB6bmMiICJsIiAiRVJSOmVyck5kYW8iICJFUlI6ZXJySXhmciIgMHgwNjgxMDEgIkVSUjplcnJOY2xzIiAiRVJSOmVyck5ya3kiICJzdGFydGluZ19iaWQiICJiaWRfbWluaW11bV9pbmNyZWFzZSIgImZ1bmRlciIgInZlcnNpb24iIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEgInNhbHQiICJFUlI6ZXJyTmFyYyIgIkVSUjplcnJTaGJiIiAiRVJSOmVycldhZmQiICJFUlI6ZXJyUmFwYyIgIm9hbCIgMHgwMDAwICJFUlI6ZXJySXJiZCIgIkVSUjplcnJXbmZkIiAicGFsIiAiRVJSOmVyckFubHYiICJjb250cm9sbGVkX2FkZHJlc3MiICJFUlI6ZXJySXdsdCIgImFwcElEIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MAogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDM4IC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MgogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAzMCAvLyAicmVmdW5kX2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyA0IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDI0IC8vICJoaWdoZXN0X2JpZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAzMSAvLyAicmFmZmxlX2Ftb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNyAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAxOSAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyA4IC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA5IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0LTI5CiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbiBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VBdWN0aW9uLAogICAgLy8gICBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICBwdXNoYnl0ZXNzIDB4MjQ4N2MzMmMgMHgzMWYyNmE5YiAweGVhOTE4MGRkIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiLCBtZXRob2QgImNhbmNlbCgpdm9pZCIsIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0IG1haW5fY2FuY2VsX3JvdXRlQDUgbWFpbl91cGRhdGVfcm91dGVANgoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0LTI5CiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbiBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VBdWN0aW9uLAogICAgLy8gICBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDMyCiAgICBwdXNoYnl0ZXNzIDB4YmQ3MTQ4ZDAgMHgyNTQ0ZmRkOCAweDk4MzZjODlmIDB4NGQ1ODU2OTcgMHhmNzcxOTM0YiAweGQ5ZjRmMDNhIDB4NzY5NTI5MzEgMHhiOWUzOWM1YyAweDY5NjUwMWRlIDB4YmQxYjI3ZDEgMHhmMmNlMmY0NiAweDlkYWYwNTBhIDB4NjVmY2E5OGIgMHgwNWU1ZGU0ZCAweDhmYTRhMTYwIDB4NjA4MjMwM2MgMHgyMDg5NWUyNiAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDNlYTExODMyIDB4NzMxMTEwNzAgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWQocGF5LGFwcGwsYWRkcmVzcyx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWQocGF5LGFwcGwsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJiaWQocGF5LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWRBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWRBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJiaWRBc2EocGF5LGF4ZmVyLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicmVmdW5kQmlkKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJyYWZmbGUoKXZvaWQiLCBtZXRob2QgImZpbmRXaW5uZXIodWludDY0KXZvaWQiLCBtZXRob2QgInJlZnVuZE1CUih1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2xhaW1Qcml6ZSgpdm9pZCIsIG1ldGhvZCAiY2xhaW1SYWZmbGVQcml6ZSgpdm9pZCIsIG1ldGhvZCAiY2xlYXJXZWlnaHRzQm94ZXModWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiaXNMaXZlKClib29sIiwgbWV0aG9kICJoYXNCaWQoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRNaW5pbXVtQmlkQW1vdW50KCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBnYXRlZEJpZCBsZWdhY3lHYXRlZEJpZCBiaWQgZ2F0ZWRCaWRBc2EgbGVnYWN5R2F0ZWRCaWRBc2EgYmlkQXNhIHJlZnVuZEJpZCByYWZmbGUgZmluZFdpbm5lciByZWZ1bmRNQlIgY2xhaW1Qcml6ZSBjbGFpbVJhZmZsZVByaXplIGNsZWFyV2VpZ2h0c0JveGVzIGlzTGl2ZSBoYXNCaWQgZ2V0TWluaW11bUJpZEFtb3VudCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMjggb3B0aW4gbWFpbl9tYnJfcm91dGVAMzAKICAgIGVycgoKbWFpbl9tYnJfcm91dGVAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9iYXNlLnRzOjcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA4OWU0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ5ZDQwMDAwMDAwMDAwMDA0OWQ0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozMAogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQtMjkKICAgIC8vIGV4cG9ydCBjbGFzcyBBdWN0aW9uIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQmFzZUF1Y3Rpb24sCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweDM0Y2VjNzk4IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLCh1aW50NjQsKHN0cmluZyx1aW50NjQpKSxhZGRyZXNzKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDQgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiB1cGRhdGUKCm1haW5fY2FuY2VsX3JvdXRlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgY2FuY2VsCgptYWluX2RlbGV0ZUFwcGxpY2F0aW9uX3JvdXRlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNwogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgZGVsZXRlQXBwbGljYXRpb24KCgovLyBfcHV5YV9saWIudXRpbC5lbnN1cmVfYnVkZ2V0KHJlcXVpcmVkX2J1ZGdldDogdWludDY0LCBmZWVfc291cmNlOiB1aW50NjQpIC0+IHZvaWQ6CmVuc3VyZV9idWRnZXQ6CiAgICBwcm90byAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxMAogICAgKwoKZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMToKICAgIGR1cAogICAgZ2xvYmFsIE9wY29kZUJ1ZGdldAogICAgPgogICAgYnogZW5zdXJlX2J1ZGdldF9hZnRlcl93aGlsZUA2CiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgcHVzaGludCA1IC8vIERlbGV0ZUFwcGxpY2F0aW9uCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgYnl0ZWMgNDcgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtCiAgICBieXRlYyA0NyAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbQogICAgZnJhbWVfZGlnIC0xCiAgICBzd2l0Y2ggZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8wQDMgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8xQDQKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1OgogICAgaXR4bl9zdWJtaXQKICAgIGIgZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMQoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8xQDQ6CiAgICBnbG9iYWwgTWluVHhuRmVlCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgYiBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANQoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV8wQDM6CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGIgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDUKCmVuc3VyZV9idWRnZXRfYWZ0ZXJfd2hpbGVANjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6Ol9fcGNnMzJPdXRwdXQoc3RhdGU6IHVpbnQ2NCkgLT4gdWludDY0OgpfX3BjZzMyT3V0cHV0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyOQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIF9fcGNnMzJPdXRwdXQoc3RhdGU6IFBDRzMyU1RBVEUpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMwCiAgICAvLyBjb25zdCB4b3JzaGlmdGVkID0gX19tYXNrVG9VaW50MzIob3Auc2hyKG9wLnNocihzdGF0ZSwgMTgpIF4gc3RhdGUsIDI3KSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxOAogICAgc2hyCiAgICBmcmFtZV9kaWcgLTEKICAgIF4KICAgIHB1c2hpbnQgMjcKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOQogICAgLy8gcmV0dXJuIHZhbHVlICYgKG9wLnNobCgxLCAzMikgLSAxKQogICAgaW50YyAxMSAvLyA0Mjk0OTY3Mjk1CiAgICAmCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByb3QgPSBvcC5zaHIoc3RhdGUsIDU5KQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDU5CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIGR1cDIKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgc3dhcAogICAgfgogICAgaW50Y18xIC8vIDEKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgcHVzaGludCAzMQogICAgJgogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBzaGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTEgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgfAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6YXNzZXJ0UGxhaW5QYXltZW50KHR4bjogdWludDY0KSAtPiB2b2lkOgphc3NlcnRQbGFpblBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0UGxhaW5QYXltZW50KHR4bjogZ3R4bi5QYXltZW50VHhuKTogdm9pZCB7CiAgICBwcm90byAxIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uY2xvc2VSZW1haW5kZXJUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgQ2xvc2VSZW1haW5kZXJUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFBsYWluUGF5bWVudF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmFzc2VydFBsYWluUGF5bWVudF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjkKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4ucmVrZXlUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJSZWtleUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgUmVrZXlUbwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGFzc2VydFBsYWluUGF5bWVudF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNDkgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmFzc2VydFBsYWluUGF5bWVudF9hZnRlcl9hc3NlcnRANDoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBieXRlcywgb3duZXI6IGJ5dGVzKSAtPiB2b2lkOgpyZWNvcmRQYXllcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA1CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmVjb3JkUGF5ZXIocmVjb3JkOiBieXRlcywgcGF5ZXI6IEFjY291bnQsIG93bmVyOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA2CiAgICAvLyBpZiAocGF5ZXIgIT09IG93bmVyKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IHJlY29yZFBheWVyX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NgogICAgLy8gcmV0dXJuIEJ5dGVzKFBheWVyQm94UHJlZml4KS5jb25jYXQoc2hhMjU2KHJlY29yZCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIHNoYTI1NgogICAgcHVzaGJ5dGVzICIkIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNwogICAgLy8gb3AuQm94LnB1dChwYXllclJlY29yZEtleShyZWNvcmQpLCBwYXllci5ieXRlcykKICAgIGZyYW1lX2RpZyAtMgogICAgYm94X3B1dAoKcmVjb3JkUGF5ZXJfYWZ0ZXJfaWZfZWxzZUAyOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Y3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogYnl0ZXMsIHN1bTogdWludDY0LCBjbG9zZU91dDogdWludDY0LCByZWNsYWltVG86IGJ5dGVzKSAtPiBieXRlcywgYnl0ZXM6CmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc1MwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiBib29sZWFuLCByZWNsYWltVG86IEFjY291bnQpOiB7IGlkOiB1aW50NjQsIGNvc3Q6IHVpbnQ2NCB9IHsKICAgIHByb3RvIDggMgogICAgcHVzaGJ5dGVzICIiCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NTQKICAgIC8vIGFzc2VydChhc3NldCAhPT0gMCB8fCBjbG9zZU91dCA9PT0gZmFsc2UsIGVyckNhbm5vdENsb3NlT3V0T2ZBbGdvRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC03CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0yCiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDMKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc1NAogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgZXJyQ2Fubm90Q2xvc2VPdXRPZkFsZ29Gb3JiaWRkZW4pCiAgICBhc3NlcnQgLy8gZXJyTmNjYQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtOAogICAgYnl0ZWMgMjUgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU1CiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU4CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDI1MzAwCiAgICAqCiAgICBwdXNoaW50IDU0NTAwCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MAogICAgLy8gaWYgKGFzc2V0ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MS03NzMKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2NQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY2CiAgICAvLyBhbW91bnQ6IG1iciArIHN1bQogICAgZGlnIDIKICAgIGZyYW1lX2RpZyAtMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY0LTc2NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzYxLTc3MwogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjgKICAgIC8vIHRpbWVUb1VubG9jaywKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjkKICAgIC8vIGV4cGlyYXRpb24sCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MS03NzMKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkY2FjMDkzNSAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdLGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC00CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MTUKICAgIC8vIHJldHVybiB7IGlkLCBjb3N0IH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC00CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzUKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTcKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2lmX2JvZHlAOQogICAgZGlnIDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzkwCiAgICAvLyBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDQKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzg5CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5NQogICAgLy8gaWYgKGNsb3NlT3V0KSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTYKICAgIC8vIHRyYW5zZmVyVHhuLnNldCh7IGFzc2V0Q2xvc2VUbzogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcyB9KQogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKICAgIGZyYW1lX2J1cnkgMQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTktODEyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4MDMKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODAyLTgwNQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA2CiAgICAvLyB0cmFuc2ZlclR4biwKICAgIGl0eG5fbmV4dAogICAgZnJhbWVfZGlnIDAKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNwogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTc6CiAgICBmcmFtZV9kaWcgLTcKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4OS03OTMKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHN1bSwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5OS04MTIKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA3CiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODA4CiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTktODEyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YTNhMTZjYWEgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDIwCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2lmX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc2CiAgICAvLyBjb3N0ICs9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZGlnIDEKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzctNzg2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4MQogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBkaWcgMQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4MgogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzgwLTc4MwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc3LTc4NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4NAogICAgLy8gQXNzZXQoYXNzZXQpCiAgICBmcmFtZV9kaWcgLTcKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NzctNzg2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHgzOTRlYWViMiAvLyBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudFRvKGFraXRhREFPOiB1aW50NjQsIHJlZmVycmVyOiBieXRlcywgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHJlY2xhaW1UbzogYnl0ZXMpIC0+IGJ5dGVzOgpzZW5kUmVmZXJyYWxQYXltZW50VG86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk5MgogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnRUbyhha2l0YURBTzogQXBwbGljYXRpb24sIHJlZmVycmVyOiBBY2NvdW50LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCwgcmVjbGFpbVRvOiBBY2NvdW50KTogUmVmZXJyYWxQYXltZW50SW5mbyB7CiAgICBwcm90byA1IDEKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTQKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIC00CiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtNQogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk2CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0yCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTkKICAgIC8vIGlmIChyZWZlcnJhbEZlZSA9PT0gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0yCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDAKICAgIC8vIHJlZmVycmFsRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMAoKc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwNgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwNwogICAgLy8gKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICBkdXAKICAgIHB1c2hpbnQgMjU5MjAwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDA4CiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAzMiAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAzLTEwMTIKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBUSElSVFlfREFZUyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIHJlY2xhaW1UbwogICAgLy8gKQogICAgZnJhbWVfZGlnIC01CiAgICBmcmFtZV9kaWcgLTMKICAgIHVuY292ZXIgNQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDQKICAgIGRpZyA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTAKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwMy0xMDEyCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICByZWNsYWltVG8KICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGV4dHJhY3QgOCA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTQKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiAoYW1vdW50IC0gcmVmZXJyYWxGZWUpLCByZWZlcnJhbE1iciB9CiAgICBmcmFtZV9kaWcgLTIKICAgIHVuY292ZXIgMgogICAgLQogICAgaXRvYgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMTcKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgcHVzaGludCA0MAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL21ici50czo6RnVuZGVySW5mbwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgodWludDY0LCgobGVuK3V0ZjhbXSksdWludDY0KSksdWludDhbMzJdKQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKHVpbnQ2NCwoKGxlbit1dGY4W10pLHVpbnQ2NCkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHN3YXAKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDU2CiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnR1cGxlPHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUNvbmZpZyxhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxNQogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAzNAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgodWludDY0LCgobGVuK3V0ZjhbXSksdWludDY0KSksdWludDhbMzJdKQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDEgb2YgKHVpbnQ2NCwoKGxlbit1dGY4W10pLHVpbnQ2NCkpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA1NgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC50dXBsZTxzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFDb25maWcsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+PgogICAgZXh0cmFjdCAyIDMyCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkICE9PSAwLCBlcnJNdXN0QmVDYWxsZWRGcm9tRmFjdG9yeSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMyAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKY3JlYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgMTAgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODMKICAgIC8vIHRoaXMucHJpemUudmFsdWUgPSBwcml6ZQogICAgdW5jb3ZlciAxNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMTUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyB0aGlzLmlzUHJpemVCb3gudmFsdWUgPSBpc1ByaXplQm94CiAgICB1bmNvdmVyIDE2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTYgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4NQogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gaWYgKGJpZEFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMgogICAgYnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODgKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldChiaWRBc3NldCkudG90YWwgPiAwLCBlcnJJbnZhbGlkQXNzZXQpCiAgICBkaWcgMgogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFRvdGFsCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBibnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXN0CgpjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZSA9IEFzc2V0KGJpZEFzc2V0KQogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MgogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlY18zIC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIHRoaXMuYmlkRmVlLnZhbHVlID0gYmlkRmVlCiAgICB1bmNvdmVyIDE0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NAogICAgLy8gc3RhcnRpbmdCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydGluZ0JpZCB9KQogICAgYnl0ZWMgNTAgLy8gInN0YXJ0aW5nX2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkyCiAgICAvLyB0aGlzLnN0YXJ0aW5nQmlkLnZhbHVlID0gc3RhcnRpbmdCaWQKICAgIHVuY292ZXIgMTMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2CiAgICAvLyBiaWRNaW5pbXVtSW5jcmVhc2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRNaW5pbXVtSW5jcmVhc2UgfSkKICAgIGJ5dGVjIDUxIC8vICJiaWRfbWluaW11bV9pbmNyZWFzZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZSA9IGJpZE1pbmltdW1JbmNyZWFzZQogICAgdW5jb3ZlciAxMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM0IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5NAogICAgLy8gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSA9IHN0YXJ0VGltZXN0YW1wCiAgICB1bmNvdmVyIDExCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxMSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk1CiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9IGVuZFRpbWVzdGFtcAogICAgdW5jb3ZlciAxMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBieXRlYyA1MiAvLyAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIHRoaXMuZnVuZGVyLnZhbHVlID0gY2xvbmUoZnVuZGVyKQogICAgdW5jb3ZlciA5CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyB0aGlzLnNlbGxlci52YWx1ZSA9IHNlbGxlcgogICAgdW5jb3ZlciA4CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMjYgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk4CiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIHVuY292ZXIgNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMzUgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5OQogICAgLy8gdGhpcy5nYXRlSUQudmFsdWUgPSBnYXRlSUQKICAgIHVuY292ZXIgNgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAzOSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSA9IG1hcmtldHBsYWNlCiAgICB1bmNvdmVyIDUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gc2VsbGVyUmVmZXJyZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDQwIC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwMgogICAgLy8gdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSA9IHNlbGxlclJlZmVycmVyCiAgICB1bmNvdmVyIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFraXRhQ29uZmlnLmFraXRhREFPLmFkZHJlc3MgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJySW52YWxpZEFwcCkKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVycklhcHAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySWFwcAoKY3JlYXRlX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YUNvbmZpZy5ha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDIxIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwNwogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhQ29uZmlnLmFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTMgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwOQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZSA9IG5ldyBTdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBwdXNoaW50IDEyMAogICAgYnplcm8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZSA9IG5ldyBTdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OQogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJDdXJzb3JzIH0pCiAgICBieXRlYyAzNiAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBzdGFydGluZ0luZGV4OiAwLCBjdXJyZW50UmFuZ2VTdGFydDogMSB9CiAgICBieXRlYyA1NCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMQogICAgLy8gc2FsdCA9IEdsb2JhbFN0YXRlPGJ5dGVzPDMyPj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDU1IC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTUKICAgIC8vIHRoaXMuc2FsdC52YWx1ZSA9IFR4bi50eElkCiAgICB0eG4gVHhJRAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTUKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyA0MSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxNgogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjcgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmluaXRbcm91dGluZ10oKSAtPiB2b2lkOgppbml0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjAKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMzIC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgppbml0X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIGVyck5vdEFwcGxpY2FibGVUb1RoaXNBdWN0aW9uKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIxCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBlcnJOb3RBcHBsaWNhYmxlVG9UaGlzQXVjdGlvbikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDIgLy8gIkVSUjplcnJOYXBwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcHAKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPj0gMywgZXJyTXVzdEFsbG9jYXRlQXRMZWFzdFRocmVlSGlnaGVzdEJpZHNDaHVua3MpCiAgICBkdXAKICAgIHB1c2hpbnQgMwogICAgPj0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJNM2hiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck0zaGIKCmluaXRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPD0gTWF4V2VpZ2h0c0JveGVzLCBlcnJUb29NYW55V2VpZ2h0c0JveGVzKQogICAgZHVwCiAgICBwdXNoaW50IDE1CiAgICA8PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOmVyclRtd2IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVG13YgoKaW5pdF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI2CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSB3ZWlnaHRMaXN0TGVuZ3RoICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBkdXAKICAgIGludGMgMTIgLy8gMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZGlnIDIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gd2VpZ2h0c01CUiwgZXJySW52YWxpZFBheW1lbnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgppbml0X3doaWxlX3RvcEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMxCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBieiBpbml0X2FmdGVyX3doaWxlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMgogICAgLy8gdGhpcy53ZWlnaHRzKGkpLmNyZWF0ZSgpCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjMgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMyCiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIHB1c2hpbnQgMzI3NjgKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzEKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIGluaXRfd2hpbGVfdG9wQDE0Cgppbml0X2FmdGVyX3doaWxlQDE2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgOCAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPSB3ZWlnaHRMaXN0TGVuZ3RoCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmRlbGV0ZUFwcGxpY2F0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXBwbGljYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzOQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDMzIC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyBjb25zdCBleHBlY3RlZFJlZnVuZENvdW50OiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlID4gMSA/IHRoaXMuYmlkSUQudmFsdWUgLSAyIDogMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfZmFsc2VANQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDEKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICAtCgpkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmdW5kQ291bnQudmFsdWUgPT09IGV4cGVjdGVkUmVmdW5kQ291bnQsIGVyck5vdEFsbFJlZnVuZHNDb21wbGV0ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJyZWZ1bmRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmdW5kQ291bnQudmFsdWUgPT09IGV4cGVjdGVkUmVmdW5kQ291bnQsIGVyck5vdEFsbFJlZnVuZHNDb21wbGV0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyA1NiAvLyAiRVJSOmVyck5hcmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFyYwoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTYgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJQem5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclB6bmMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIGVyclJhZmZsZVdpbm5lckhhc05vdENsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MgogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlY18zIC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlV2lubmVySGFzTm90Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9ib29sX3RydWVAMTIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA3IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIGVyclJhZmZsZVdpbm5lckhhc05vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYm9vbF9mYWxzZUAxMwoKZGVsZXRlQXBwbGljYXRpb25fYm9vbF90cnVlQDEyOgogICAgaW50Y18xIC8vIDEKCmRlbGV0ZUFwcGxpY2F0aW9uX2Jvb2xfbWVyZ2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVXaW5uZXJIYXNOb3RDbGFpbWVkKQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxNgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUndoYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSd2hjCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gY29uc3QgcmVmdW5kc0NvbXBsZXRlID0gdGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyBjb25zdCByZWZ1bmRzQ29tcGxldGUgPSB0aGlzLmJpZElELnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDIwIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ2CiAgICAvLyBjb25zdCByZWZ1bmRzQ29tcGxldGUgPSB0aGlzLmJpZElELnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlZnVuZHNDb21wbGV0ZSwgZXJyTm90QWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgNTYgLy8gIkVSUjplcnJOYXJjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcmMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53ZWlnaHRzQm94ZXMoKSA9PT0gMCwgZXJyU3RpbGxIYXNIaWdoZXN0Qmlkc0JveGVzKQogICAgY2FsbHN1YiB3ZWlnaHRzQm94ZXMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgNTcgLy8gIkVSUjplcnJTaGJiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNoYmIKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUxCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAxNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTEKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyNAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1MQogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUgJiYgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDI0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1Mi02NTcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1NAogICAgLy8gYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjU1CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgMTAgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUyLTY1NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUyLTY1NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjAKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMSAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjAKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjgKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDAgJiYgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYxLTY2NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYzCiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2MS02NjUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2MS02NjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY5LTY3MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcxCiAgICAvLyBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGl0eG5fZmllbGQgQ2xvc2VSZW1haW5kZXJUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjktNjcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2OS02NzMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzcKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmRlbGV0ZUFwcGxpY2F0aW9uX2Jvb2xfZmFsc2VAMTM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVBcHBsaWNhdGlvbl9ib29sX21lcmdlQDE0CgpkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X2ZhbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MQogICAgLy8gY29uc3QgZXhwZWN0ZWRSZWZ1bmRDb3VudDogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSA+IDEgPyB0aGlzLmJpZElELnZhbHVlIC0gMiA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2FuY2VsW3JvdXRpbmddKCkgLT4gdm9pZDoKY2FuY2VsOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzMgLy8gIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmNhbmNlbF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUsIGVyckF1Y3Rpb25BbHJlYWR5U3RhcnRlZCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNCAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODMKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkFscmVhZHlTdGFydGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDwKICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckFhc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWFzdAoKY2FuY2VsX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hlcygpID09PSAwLCBlcnJTdGlsbEhhc0hpZ2hlc3RCaWRzQm94ZXMpCiAgICBjYWxsc3ViIHdlaWdodHNCb3hlcwogICAgYnogY2FuY2VsX2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1NyAvLyAiRVJSOmVyclNoYmIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2hiYgoKY2FuY2VsX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTIKICAgIC8vIHRoaXMudHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIodGhpcy5zZWxsZXIudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDUyCiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njg4CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMSAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODgKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njg5LTY5NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4OS02OTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4OS02OTQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5Ny03MDEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5OQogICAgLy8gY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk3LTcwMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTctNzAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgwCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nYXRlZEJpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTEtNzE2CiAgICAvLyBnYXRlZEJpZCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0LAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxNwogICAgLy8gdGhpcy5hc3NlcnRHYXRlZChnYXRlVHhuLCBmYWxzZSwgd2FsbGV0KQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEdhdGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxOAogICAgLy8gdGhpcy5jcmVhdGVCaWQocGF5bWVudCwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTEtNzE2CiAgICAvLyBnYXRlZEJpZCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0LAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5sZWdhY3lHYXRlZEJpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxlZ2FjeUdhdGVkQmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRCaWQnIH0pCiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gdGhpcy5hc3NlcnRHYXRlZChnYXRlVHhuLCB0cnVlLCAwKQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFzc2VydEdhdGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMwogICAgLy8gdGhpcy5jcmVhdGVCaWQocGF5bWVudCwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnZ2F0ZWRCaWQnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5iaWRbcm91dGluZ10oKSAtPiB2b2lkOgpiaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczNgogICAgLy8gYmlkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczNwogICAgLy8gdGhpcy5hc3NlcnRVbmdhdGVkKCkKICAgIGNhbGxzdWIgYXNzZXJ0VW5nYXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzkKICAgIC8vIHRoaXMuY3JlYXRlQmlkKHBheW1lbnQsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzM2CiAgICAvLyBiaWQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2F0ZWRCaWRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQzLTc0OQogICAgLy8gZ2F0ZWRCaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUwCiAgICAvLyB0aGlzLmFzc2VydEdhdGVkKGdhdGVUeG4sIGZhbHNlLCB3YWxsZXQpCiAgICB1bmNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUxCiAgICAvLyB0aGlzLmNyZWF0ZUJpZEFzYShwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWRBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQzLTc0OQogICAgLy8gZ2F0ZWRCaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubGVnYWN5R2F0ZWRCaWRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZEJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkQmlkQXNhJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYyCiAgICAvLyB0aGlzLmFzc2VydEdhdGVkKGdhdGVUeG4sIHRydWUsIDApCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgYXNzZXJ0R2F0ZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYzCiAgICAvLyB0aGlzLmNyZWF0ZUJpZEFzYShwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWRBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkQmlkQXNhJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uYmlkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKYmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjYtNzcwCiAgICAvLyBiaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIHRoaXMuYXNzZXJ0VW5nYXRlZCgpCiAgICBjYWxsc3ViIGFzc2VydFVuZ2F0ZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzczCiAgICAvLyB0aGlzLmNyZWF0ZUJpZEFzYShwYXltZW50LCBhc3NldFhmZXIsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWRBc2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY2LTc3MAogICAgLy8gYmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRbcm91dGluZ10oKSAtPiB2b2lkOgpyZWZ1bmRCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gcmVmdW5kQmlkKGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzc3CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHJldHVybkFtb3VudF0gPSB0aGlzLm1hcmtSZWZ1bmRlZChpZCkKICAgIGNhbGxzdWIgbWFya1JlZnVuZGVkCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODEKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcmVmdW5kQmlkX2Vsc2VfYm9keUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXIsIGFtb3VudDogcmV0dXJuQW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnJlZnVuZEJpZF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gcmVmdW5kQmlkKGlkOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlZnVuZEJpZF9lbHNlX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg0CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldChyZWNlaXZlciwgcmV0dXJuQW1vdW50KQogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXQKICAgIGIgcmVmdW5kQmlkX2FmdGVyX2lmX2Vsc2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKcmFmZmxlOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODI0CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJBdWN0aW9uSGFzTm90RW5kZWQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxMSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODI0CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJBdWN0aW9uSGFzTm90RW5kZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJBaG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFobmUKCnJhZmZsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODI1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBlcnJOb3RBcHBsaWNhYmxlVG9UaGlzQXVjdGlvbikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgZXJyTm90QXBwbGljYWJsZVRvVGhpc0F1Y3Rpb24pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDIgLy8gIkVSUjplcnJOYXBwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcHAKCnJhZmZsZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODI2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID09PSAwLCBlcnJXaW5uZXJBbHJlYWR5RHJhd24pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDkgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPT09IDAsIGVycldpbm5lckFscmVhZHlEcmF3bikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVycldhZHIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2FkcgoKcmFmZmxlX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgNTggLy8gIkVSUjplcnJXYWZkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldhZmQKCnJhZmZsZV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODI4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVBbHJlYWR5UHJpemVDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDcgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjgKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIGVyclJhZmZsZUFscmVhZHlQcml6ZUNsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcmFmZmxlX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgNTkgLy8gIkVSUjplcnJSYXBjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJhcGMKCnJhZmZsZV9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMAogICAgLy8gaWYgKHRoaXMucmFmZmxlUm91bmQudmFsdWUgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNgogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzAKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyMAogICAgLy8gaWYgKHRoaXMuYmlkSUQudmFsdWUgPT09IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIwCiAgICAvLyBpZiAodGhpcy5iaWRJRC52YWx1ZSA9PT0gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYm56IHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZXhjbHVkZVdpbm5lcldlaWdodEA2MwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGNvbnN0IHsgYWNjb3VudCB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjQKICAgIC8vIGNvbnN0IHsgYWNjb3VudCB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMTMgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBjb25zdCB7IGFjY291bnQgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDEyIC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKGFjY291bnQpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmV4Y2x1ZGVXaW5uZXJXZWlnaHRANjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI5CiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDMwCiAgICAvLyBjb25zdCBib3g6IHVpbnQ2NCA9IGxvYyAvIENodW5rU2l6ZQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzEKICAgIC8vIGNvbnN0IHcgPSB0aGlzLndlaWdodHMoYm94KS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyMyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzEKICAgIC8vIGNvbnN0IHcgPSB0aGlzLndlaWdodHMoYm94KS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIHVuY292ZXIgMgogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDMyCiAgICAvLyB0aGlzLndlaWdodHMoYm94KS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NCgwKQogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbYm94XSA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbYm94XS5hc1VpbnQ2NCgpIC0gdykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzMwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbYm94XSA9IG5ldyBVaW50NjQodGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbYm94XS5hc1VpbnQ2NCgpIC0gdykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZGlnIDMKICAgIC0KICAgIGl0b2IKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MwogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDYgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzMKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2JveF0gPSBuZXcgVWludDY0KHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2JveF0uYXNVaW50NjQoKSAtIHcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSAtPSB3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NgogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgNCAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSAtPSB3CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NgogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgNCAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSAtPSB3CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5leGNsdWRlV2lubmVyV2VpZ2h0QDYzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzMKICAgIC8vIGlmICh0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyA0IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMwogICAgLy8gaWYgKHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy5iaWRBc3NldC52YWx1ZSwgdGhpcy5yYWZmbGVQb29sKCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCB0aGlzLnJhZmZsZVBvb2woKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIHJhZmZsZVBvb2wKICAgIGNhbGxzdWIgc2VuZFRvQWtpdGFFc2Nyb3cKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNyAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0MAogICAgLy8gdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKCnJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzgKICAgIC8vIGlmICh0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgPT09IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyA0IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzOAogICAgLy8gaWYgKHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSA9PT0gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA5IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM5CiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlQDI3CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyB0aGlzLmNvbW1pdERyYXdSb3VuZCgpCiAgICBjYWxsc3ViIGNvbW1pdERyYXdSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjMKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGIgcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVAMjcKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDcKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwucm91bmQgPj0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArIEJFQUNPTl9MQUdfUk9VTkRTLCBlcnJOb3RFbm91Z2hUaW1lKQogICAgZ2xvYmFsIFJvdW5kCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTEFHX1JPVU5EUywgZXJyTm90RW5vdWdoVGltZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDQKICAgICsKICAgID49CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAxOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmV0bSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZXRtCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDktODUyCiAgICAvLyBjb25zdCBzZWVkID0gYWJpQ2FsbDx0eXBlb2YgUmFuZG9tbmVzc0JlYWNvbi5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgLy8gICBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1MQogICAgLy8gYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTEKICAgIC8vIHNhbHQgPSBHbG9iYWxTdGF0ZTxieXRlczwzMj4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTYWx0IH0pCiAgICBieXRlYyA1NSAvLyAic2FsdCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODUxCiAgICAvLyBhcmdzOiBbdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSwgdGhpcy5zYWx0LnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTAKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODUwCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyMQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBieXRlYyA2MCAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTAKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ5LTg1MgogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MTg5MzkyYzUgLy8gbWV0aG9kICJnZXQodWludDY0LGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODU0CiAgICAvLyBpZiAoc2VlZC5sZW5ndGggPT09IDApIHsKICAgIGxlbgogICAgZHVwCiAgICBibnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjQKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTUKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwucm91bmQgPj0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArIEJFQUNPTl9NQVhfV0FJVF9ST1VORFMsIGVyckJlYWNvbk5vdFJlYWR5KQogICAgZ2xvYmFsIFJvdW5kCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODU1CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTUFYX1dBSVRfUk9VTkRTLCBlcnJCZWFjb25Ob3RSZWFkeSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDEwMDAKICAgICsKICAgID49CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAyMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm5yZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbnJkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTYKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMzggLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTYKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MAogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDM4IC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODU2CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTcKICAgIC8vIHRoaXMuY29tbWl0RHJhd1JvdW5kKCkKICAgIGNhbGxzdWIgY29tbWl0RHJhd1JvdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyMwogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZUAyNwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2MQogICAgLy8gY29uc3Qgcm5nU3RhdGUgPSBwY2c2NEluaXQoc2VlZC5zbGljZSgwLCAxNikpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDEKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlZWQubGVuZ3RoID09PSAxNiwgZXJySW52YWxpZFJhbmRvbVNlZWQpCiAgICBsZW4KICAgIHB1c2hpbnQgMTYKICAgID09CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEA1NAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXJzZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcnNkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDU0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTgKICAgIC8vIGNvbnN0IHN0YXRlID0gX19wY2czMlN0ZXAoMCwgaW5jcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNiAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OQogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNiAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGludGMgOCAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBjb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjEKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA2IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTktMjIKICAgIC8vIHJldHVybiBbCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICAvLyBdCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY0CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDQgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY0CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2NQogICAgLy8gaWYgKHVwcGVyQm91bmQgPCBNQVhfVUlOVDY0KSB7CiAgICBpbnRjIDcgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2NgogICAgLy8gdXBwZXJCb3VuZCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgKwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgRHluYW1pY0FycmF5PGFyYzQuVWludDY0PigpCiAgICBieXRlYyA2MSAvLyAweDAwMDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDMKICAgIC8vIGlmICh1cHBlckJvdW5kICE9PSAwKSB7CiAgICBkdXAKICAgIGJ6IHJhZmZsZV9lbHNlX2JvZHlANDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDQKICAgIC8vIGxvZ2dlZEFzc2VydCh1cHBlckJvdW5kID4gMSwgZXJySW52YWxpZFJhbmRvbUJvdW5kcykKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM3CiAgICBieXRlYyA2MiAvLyAiRVJSOmVycklyYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXJiZAoKcmFmZmxlX2FmdGVyX2Fzc2VydEAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChsb3dlckJvdW5kIDwgdXBwZXJCb3VuZCAtIDEsIGVyckludmFsaWRSYW5kb21Cb3VuZHMpCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgZXJySW52YWxpZFJhbmRvbUJvdW5kcykKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUA0MwogICAgYnl0ZWMgNjIgLy8gIkVSUjplcnJJcmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklyYmQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDQzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgZHVwbiAyCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU0CiAgICAvLyBjb25zdCB0aHJlc2hvbGQ6IHVpbnQ2NCA9IF9fdWludDY0VHdvcyhhYnNvbHV0ZUJvdW5kKSAlIGFic29sdXRlQm91bmQKICAgIHN3YXAKICAgICUKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHVuY292ZXIgMgoKcmFmZmxlX3doaWxlX3RvcEA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgZGlnIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY5CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl93aGlsZUA0OQoKcmFmZmxlX3doaWxlX3RvcEA0NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTAKICAgIC8vIGNvbnN0IG5ld1N0YXRlMSA9IF9fcGNnMzJTdGVwKHN0YXRlWzBdLCBwY2dGaXJzdEluY3JlbWVudCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA2IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMAogICAgLy8gY29uc3QgbmV3U3RhdGUxID0gX19wY2czMlN0ZXAoc3RhdGVbMF0sIHBjZ0ZpcnN0SW5jcmVtZW50KQogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjExCiAgICAvLyBjb25zdCBuZXdTdGF0ZTIgPSBfX3BjZzMyU3RlcChzdGF0ZVsxXSwgbmV3U3RhdGUxID09PSAwID8gb3Auc2hsKHBjZ1NlY29uZEluY3JlbWVudCwgMSkgOiBwY2dTZWNvbmRJbmNyZW1lbnQpCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGJueiByYWZmbGVfdGVybmFyeV9mYWxzZUA2NgogICAgcHVzaGludCAyODg1MzkwMDgxNzc3OTI2ODE4CgpyYWZmbGVfdGVybmFyeV9tZXJnZUA2NzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgc3dhcAogICAgZHVwCiAgICBpbnRjIDYgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICB1bmNvdmVyIDIKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMwogICAgLy8gcmV0dXJuIFtbbmV3U3RhdGUxLCBuZXdTdGF0ZTJdLCBvcC5zaGwoX19wY2czMk91dHB1dChzdGF0ZVswXSksIDMyKSB8IF9fcGNnMzJPdXRwdXQoc3RhdGVbMV0pXQogICAgdW5jb3ZlciA1CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHVuY292ZXIgNQogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICBpbnRjXzMgLy8gMzIKICAgIHNobAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIF9fcGNnMzJPdXRwdXQKICAgIHwKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1OAogICAgLy8gY29uc3QgW25ld1N0YXRlLCBjYW5kaWRhdGVdID0gX19wY2c2NFVuYm91bmRlZFJhbmRvbShzdGF0ZSkKICAgIGR1cAogICAgZXh0cmFjdCAwIDE2CiAgICBjb3ZlciA0CiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYwCiAgICAvLyBpZiAoY2FuZGlkYXRlID49IHRocmVzaG9sZCkgewogICAgZGlnIDYKICAgID49CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUA0OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgZGlnIDEKICAgICUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY5CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICArCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDAKICAgIHJlcGxhY2UyIDAKICAgIHN3YXAKICAgIGNvbmNhdAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgdW5jb3ZlciAzCiAgICBiIHJhZmZsZV93aGlsZV90b3BANDQKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDQ4OgogICAgcG9wCiAgICB1bmNvdmVyIDMKICAgIGIgcmFmZmxlX3doaWxlX3RvcEA0NgoKcmFmZmxlX3Rlcm5hcnlfZmFsc2VANjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjExCiAgICAvLyBjb25zdCBuZXdTdGF0ZTIgPSBfX3BjZzMyU3RlcChzdGF0ZVsxXSwgbmV3U3RhdGUxID09PSAwID8gb3Auc2hsKHBjZ1NlY29uZEluY3JlbWVudCwgMSkgOiBwY2dTZWNvbmRJbmNyZW1lbnQpCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgYiByYWZmbGVfdGVybmFyeV9tZXJnZUA2NwoKcmFmZmxlX2FmdGVyX3doaWxlQDQ5OgogICAgYnVyeSAxCiAgICBidXJ5IDEKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjY4CiAgICAvLyByZXR1cm4gW3N0YXRlLCByZXN1bHRdCiAgICBwdXNoYnl0ZXMgMHgwMDEyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzAKICAgIC8vIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9IHJuZ1Jlc3VsdFsxXVswXS5hc1VpbnQ2NCgpCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgOSAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3MAogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyMwogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZUAyNwoKcmFmZmxlX2Vsc2VfYm9keUA0MDoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1MQogICAgLy8gYWJzb2x1dGVCb3VuZCA9IG9wLmJ0b2koQnl0ZXMoQmlnVWludCgyICoqIDY0KSAtIEJpZ1VpbnQobG93ZXJCb3VuZCkpKQogICAgaW50YyA3IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICBiIHJhZmZsZV9hZnRlcl9pZl9lbHNlQDQzCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5maW5kV2lubmVyW3JvdXRpbmddKCkgLT4gdm9pZDoKZmluZFdpbm5lcjoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIGVyck5vdEFwcGxpY2FibGVUb1RoaXNBdWN0aW9uKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBlcnJOb3RBcHBsaWNhYmxlVG9UaGlzQXVjdGlvbikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDIgLy8gIkVSUjplcnJOYXBwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcHAKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTEgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAzNyAvLyAiRVJSOmVyckFobmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWhuZQoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlICE9PSAwLCBlcnJXaW5uaW5nTnVtYmVyTm90Rm91bmQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDkgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIGVycldpbm5pbmdOdW1iZXJOb3RGb3VuZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV25uZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXbm5mCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDkKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDU4IC8vICJFUlI6ZXJyV2FmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXYWZkCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODkKICAgIC8vIGxldCBzdGFydGluZ0luZGV4ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5zdGFydGluZ0luZGV4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OQogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJDdXJzb3JzIH0pCiAgICBieXRlYyAzNiAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBsZXQgc3RhcnRpbmdJbmRleCA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuc3RhcnRpbmdJbmRleAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gbGV0IGN1cnJlbnRSYW5nZVN0YXJ0ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5jdXJyZW50UmFuZ2VTdGFydAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKCmZpbmRXaW5uZXJfd2hpbGVfdG9wQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIHdoaWxlIChzdGFydGluZ0luZGV4ICUgQ2h1bmtTaXplID09PSAwICYmIHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSkgewogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgJQogICAgYm56IGZpbmRXaW5uZXJfYmxvY2tAMjgKICAgIGR1cAogICAgaW50YyA1IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgYnVyeSA0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDggLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIHdoaWxlIChzdGFydGluZ0luZGV4ICUgQ2h1bmtTaXplID09PSAwICYmIHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYmxvY2tAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkzCiAgICAvLyBjb25zdCBib3hTdGFrZSA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW3N0YXJ0aW5nSW5kZXggLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gY29uc3QgYm94U3Rha2UgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtzdGFydGluZ0luZGV4IC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDMKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTQKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VTdGFydCArIGJveFN0YWtlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDkgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTQKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VTdGFydCArIGJveFN0YWtlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDcKICAgIHVuY292ZXIgMgogICAgKwogICAgZHVwCiAgICBidXJ5IDcKICAgIDwKICAgIGJueiBmaW5kV2lubmVyX2Jsb2NrQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5OAogICAgLy8gc3RhcnRpbmdJbmRleCArPSBDaHVua1NpemUKICAgIGludGMgNSAvLyA0MDk2CiAgICArCiAgICBkaWcgNAogICAgYnVyeSA2CiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDI0CgpmaW5kV2lubmVyX2Jsb2NrQDI4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIHJldHVybiBbc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnRdCiAgICBpdG9iCiAgICBkaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4MQogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHdpbm5pbmdCb3hJbmZvWzBdCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBsZXQgY3VycmVudFJhbmdlU3RhcnQgPSB3aW5uaW5nQm94SW5mb1sxXQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODg2CiAgICAvLyBpZiAoc3RhcnRpbmdJbmRleCA+PSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAxOSAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4NgogICAgLy8gaWYgKHN0YXJ0aW5nSW5kZXggPj0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDExCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyA5IC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQ1CiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE2CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OQogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJDdXJzb3JzIH0pCiAgICBieXRlYyAzNiAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBzdGFydGluZ0luZGV4OiAwLCBjdXJyZW50UmFuZ2VTdGFydDogMSB9CiAgICBieXRlYyA1NCAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxCiAgICBhcHBfZ2xvYmFsX3B1dAoKZmluZFdpbm5lcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZmluZFdpbm5lckAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODczCiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5MQogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMTkgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTEKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgLSBzdGFydGluZ0luZGV4CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTIKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICBkaWcgNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NAogICAgLy8gY29uc3QgY2h1bmtPZmZzZXQ6IHVpbnQ2NCA9IHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUKICAgIHN3YXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAlCiAgICBkdXAKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTUKICAgIC8vIGNvbnN0IHJlbWFpbmluZ0luQ2h1bms6IHVpbnQ2NCA9IENodW5rU2l6ZSAtIGNodW5rT2Zmc2V0CiAgICBpbnRjIDUgLy8gNDA5NgogICAgc3dhcAogICAgLQogICAgZHVwCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBpZiAoaXRlcmF0aW9uQW1vdW50ID4gcmVtYWluaW5nSW5DaHVuaykgewogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDEzCiAgICBkaWcgMwogICAgYnVyeSAyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwMAogICAgLy8gY29uc3Qgd2VpZ2h0ID0gY2xvbmUodGhpcy53ZWlnaHRzKHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUpLnZhbHVlKQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyMyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDIKICAgIC8vIGVuc3VyZUJ1ZGdldCgoaXRlcmF0aW9uQW1vdW50ICogNjApKQogICAgZGlnIDIKICAgIHB1c2hpbnQgNjAKICAgICoKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA0CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCgpmaW5kV2lubmVyX3doaWxlX3RvcEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA0CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAxCiAgICBkaWcgNAogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl93aGlsZUAxOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDYKICAgIC8vIGNvbnN0IGFtb3VudCA9IHdlaWdodFtjaHVua09mZnNldCArIGldLmFzVWludDY0KCkKICAgIGRpZyA4CiAgICBkaWcgMgogICAgKwogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGRpZyAzCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyBjdXJyZW50UmFuZ2VFbmQgPSBjdXJyZW50UmFuZ2VTdGFydCArIGFtb3VudAogICAgZGlnIDgKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwOAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgOSAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwOAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDkgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDgKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPj0gY3VycmVudFJhbmdlU3RhcnQgJiYgdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDkKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gdGhpcy5sb2NhdGlvbnMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlCiAgICBkaWcgMQogICAgZGlnIDMKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM4CiAgICAvLyBsb2NhdGlvbnMgPSBCb3hNYXA8dWludDY0LCBBY2NvdW50Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeExvY2F0aW9ucyB9KQogICAgYnl0ZWMgNDQgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA5CiAgICAvLyB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9IHRoaXMubG9jYXRpb25zKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA5CiAgICAvLyB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9IHRoaXMubG9jYXRpb25zKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA0CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIHVuY292ZXIgMgogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGNvdmVyIDIKICAgIGJ1cnkgOAogICAgYiBmaW5kV2lubmVyX3doaWxlX3RvcEAxNAoKZmluZFdpbm5lcl9hZnRlcl93aGlsZUAxOToKICAgIGJ1cnkgMQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxNQogICAgLy8gc3RhcnRpbmdJbmRleDogKHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQpLAogICAgZGlnIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE0LTkxNwogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsKICAgIC8vICAgc3RhcnRpbmdJbmRleDogKHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQpLAogICAgLy8gICBjdXJyZW50UmFuZ2VTdGFydDogY3VycmVudFJhbmdlU3RhcnQsCiAgICAvLyB9CiAgICBpdG9iCiAgICBkaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDM2IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MTQtOTE3CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0gewogICAgLy8gICBzdGFydGluZ0luZGV4OiAoc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCksCiAgICAvLyAgIGN1cnJlbnRSYW5nZVN0YXJ0OiBjdXJyZW50UmFuZ2VTdGFydCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgYiBmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5maW5kV2lubmVyQDIwCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRNQlJbcm91dGluZ10oKSAtPiB2b2lkOgpyZWZ1bmRNQlI6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHJlZnVuZE1CUihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDE2IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQzIC8vICJFUlI6ZXJyUHpuYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQem5jCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNAogICAgLy8gdGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNAogICAgLy8gdGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZWZ1bmRNQlJfYm9vbF90cnVlQDYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNAogICAgLy8gdGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBibnogcmVmdW5kTUJSX2Jvb2xfdHJ1ZUA2CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNyAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNAogICAgLy8gdGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZWZ1bmRNQlJfYm9vbF9mYWxzZUA3CgpyZWZ1bmRNQlJfYm9vbF90cnVlQDY6CiAgICBpbnRjXzEgLy8gMQoKcmVmdW5kTUJSX2Jvb2xfbWVyZ2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIzLTkyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICB0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLAogICAgLy8gICBlcnJXaW5uZXJOb3RGb3VuZAogICAgLy8gKQogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDYzIC8vICJFUlI6ZXJyV25mZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXbmZkCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDIwIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRJRC52YWx1ZSAhPT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIGVyckFsbFJlZnVuZHNDb21wbGV0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAhPQogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOmVyckFyZmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQXJmYwoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyBjb25zdCBzdGFydGluZ0luZGV4ID0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDIwIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyBjb25zdCBzdGFydGluZ0luZGV4ID0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMxCiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzEKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMyCiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgID4KICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzNAogICAgLy8gZW5zdXJlQnVkZ2V0KChpdGVyYXRpb25BbW91bnQgKiAxNjApKQogICAgcHVzaGludCAxNjAKICAgICoKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTM2CiAgICAvLyBjb25zdCB7IGJpZHMsIGJpZHNCeUFkZHJlc3MsIGxvY2F0aW9ucyB9ID0gdGhpcy5tYnIoKQogICAgaW50YyAxMyAvLyAzNTMwMAogICAgc3dhcAoKcmVmdW5kTUJSX3doaWxlX3RvcEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZGlnIDMKICAgIGRpZyAzCiAgICArCiAgICBkaWcgMQogICAgPgogICAgYnogcmVmdW5kTUJSX2FmdGVyX3doaWxlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MAogICAgLy8gY29uc3QgeyByZWZ1bmRlZCwgYWNjb3VudCB9ID0gdGhpcy5iaWRzKGkpLnZhbHVlCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAxMyAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MAogICAgLy8gY29uc3QgeyByZWZ1bmRlZCwgYWNjb3VudCB9ID0gdGhpcy5iaWRzKGkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDU3NgogICAgZ2V0Yml0CiAgICBzd2FwCiAgICBleHRyYWN0IDAgMzIKICAgIGNvdmVyIDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyBsZXQgZGlzYnVyc2VtZW50Q29zdDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyAxCiAgICAhPQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ1CiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHJldHVybkFtb3VudF0gPSB0aGlzLm1hcmtSZWZ1bmRlZChpKQogICAgZHVwCiAgICBjYWxsc3ViIG1hcmtSZWZ1bmRlZAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ2CiAgICAvLyBkaXNidXJzZW1lbnRDb3N0ID0gdGhpcy5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKHJlY2VpdmVyLCByZXR1cm5BbW91bnQpCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldE9yRGlzYnVyc2UKICAgIGJ1cnkgMTAKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTEKICAgIC8vIHRoaXMuYmlkcyhpKS5kZWxldGUoKQogICAgZGlnIDMKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgMTIgLy8gImEiCiAgICBkaWcgNQogICAgY29uY2F0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUyCiAgICAvLyBpZiAodGhpcy5iaWRzQnlBZGRyZXNzKGFjY291bnQpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogcmVmdW5kTUJSX2lmX2JvZHlAMTgKICAgIHBvcAogICAgZGlnIDEKICAgIGJ1cnkgOQoKcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIHVuY292ZXIgMwogICAgc2hhMjU2CiAgICBwdXNoYnl0ZXMgIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDIKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQoa2V5KQogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICghc3BvbnNvcmVkKSB7CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgdW5jb3ZlciAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ0CiAgICAvLyByZXR1cm4gW293bmVyLCBhbW91bnRdCiAgICBkaWcgNwogICAgaXRvYgogICAgdW5jb3ZlciA0CiAgICBzd2FwCiAgICBjb25jYXQKCnJlZnVuZE1CUl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlbGVhc2VEZXBvc2l0QDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjUKICAgIC8vIGNvbnN0IFtwYXllZSwgdG90YWxdID0gcmVsZWFzZURlcG9zaXQodGhpcy5iaWRzKGkpLmtleSwgYWNjb3VudCwgcmVmdW5kQW1vdW50KQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGJ1cnkgMTAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk2NgogICAgLy8gaWYgKHRvdGFsID4gZGlzYnVyc2VtZW50Q29zdCAmJiB0aGlzLmNhblJlY2VpdmVBbGdvKHBheWVlLCB0b3RhbCAtIGRpc2J1cnNlbWVudENvc3QpKSB7CiAgICBkaWcgOAogICAgPgogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjUKICAgIGRpZyA0CiAgICBkaWcgOAogICAgLQogICAgZHVwCiAgICBidXJ5IDcKICAgIGRpZyA5CiAgICBzd2FwCiAgICBjYWxsc3ViIGNhblJlY2VpdmVBbGdvCiAgICBieiByZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAyNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjctOTcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5ZWUsCiAgICAvLyAgICAgYW1vdW50OiB0b3RhbCAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjctOTcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5ZWUsCiAgICAvLyAgICAgYW1vdW50OiB0b3RhbCAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk2Ny05NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBwYXllZSwKICAgIC8vICAgICBhbW91bnQ6IHRvdGFsIC0gZGlzYnVyc2VtZW50Q29zdCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzOAogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHJlZnVuZE1CUl93aGlsZV90b3BAMTMKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0NwogICAgLy8gY29uc3QgdG90YWw6IHVpbnQ2NCA9IGFtb3VudCArIFBheWVyUmVjb3JkTUJSCiAgICBkaWcgOAogICAgaW50YyAxMCAvLyAyODUwMAogICAgKwogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMAogICAgLy8gY29uc3QgWywgZnVuZGVkXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEJhbGFuY2UocmVjZWl2ZXIpCiAgICBkaWcgMwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyByZXR1cm4gZnVuZGVkIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgYm56IHJlZnVuZE1CUl9ib29sX3RydWVAMzEKICAgIGRpZyA2CiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IHJlZnVuZE1CUl9ib29sX2ZhbHNlQDMyCgpyZWZ1bmRNQlJfYm9vbF90cnVlQDMxOgogICAgaW50Y18xIC8vIDEKCnJlZnVuZE1CUl9ib29sX21lcmdlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgYnogcmVmdW5kTUJSX3Rlcm5hcnlfZmFsc2VAMzUKICAgIHVuY292ZXIgNAogICAgcG9wCiAgICB1bmNvdmVyIDMKCnJlZnVuZE1CUl90ZXJuYXJ5X21lcmdlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDgKICAgIC8vIHJldHVybiBbY2FuUmVjZWl2ZUFsZ28oQWNjb3VudChwYXllciksIHRvdGFsKSA/IEFjY291bnQocGF5ZXIpIDogb3duZXIsIHRvdGFsXQogICAgZGlnIDUKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjUKICAgIC8vIGNvbnN0IFtwYXllZSwgdG90YWxdID0gcmVsZWFzZURlcG9zaXQodGhpcy5iaWRzKGkpLmtleSwgYWNjb3VudCwgcmVmdW5kQW1vdW50KQogICAgYiByZWZ1bmRNQlJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdEAzNwoKcmVmdW5kTUJSX3Rlcm5hcnlfZmFsc2VAMzU6CiAgICB1bmNvdmVyIDMKICAgIHBvcAogICAgdW5jb3ZlciAzCiAgICBiIHJlZnVuZE1CUl90ZXJuYXJ5X21lcmdlQDM2CgpyZWZ1bmRNQlJfYm9vbF9mYWxzZUAzMjoKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZE1CUl9ib29sX21lcmdlQDMzCgpyZWZ1bmRNQlJfaWZfYm9keUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUzCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU0CiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkuZGVsZXRlKCkKICAgIHN3YXAKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTUKICAgIC8vIHJlZnVuZEFtb3VudCArPSBiaWRzQnlBZGRyZXNzCiAgICBpbnRjIDE0IC8vIDU0MjAwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gaWYgKHRoaXMubG9jYXRpb25zKGxvYykuZXhpc3RzKSB7CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gbG9jYXRpb25zID0gQm94TWFwPHVpbnQ2NCwgQWNjb3VudD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhMb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDQ0IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU3CiAgICAvLyBpZiAodGhpcy5sb2NhdGlvbnMobG9jKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU4CiAgICAvLyB0aGlzLmxvY2F0aW9ucyhsb2MpLmRlbGV0ZSgpCiAgICBkaWcgMTEKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIHJlZnVuZEFtb3VudCArPSBsb2NhdGlvbnMKICAgIGludGMgMTUgLy8gNzMxMDAKICAgIGJ1cnkgOQogICAgYiByZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAyMQoKcmVmdW5kTUJSX2FmdGVyX3doaWxlQDI2OgogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NgogICAgLy8gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NgogICAgLy8gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NgogICAgLy8gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjAKICAgIC8vIHJlZnVuZE1CUihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVmdW5kTUJSX2Jvb2xfZmFsc2VANzoKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZE1CUl9ib29sX21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNsYWltUHJpemVbcm91dGluZ10oKSAtPiB2b2lkOgpjbGFpbVByaXplOgogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTEgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBjbGFpbVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNyAvLyAiRVJSOmVyckFobmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWhuZQoKY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgyCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZUFscmVhZHlDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDE2IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplQWxyZWFkeUNsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGFjbCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQYWNsCgpjbGFpbVByaXplX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGlmICh0aGlzLmJpZElELnZhbHVlID09PSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NQogICAgLy8gaWYgKHRoaXMuYmlkSUQudmFsdWUgPT09IDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGJ6IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcih0aGlzLnNlbGxlci52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTIKICAgIC8vIHRoaXMudHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIodGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY2FsbHN1YiB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTYgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NwogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDcgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODgKICAgIC8vIHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CgpjbGFpbVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVByaXplQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzkKICAgIC8vIGNsYWltUHJpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkzCiAgICAvLyBjb25zdCB7IGFjY291bnQsIGFtb3VudCwgbWFya2V0cGxhY2UgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkzCiAgICAvLyBjb25zdCB7IGFjY291bnQsIGFtb3VudCwgbWFya2V0cGxhY2UgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDEzIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5MwogICAgLy8gY29uc3QgeyBhY2NvdW50LCBhbW91bnQsIG1hcmtldHBsYWNlIH0gPSB0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBpbnRjXzMgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBzd2FwCiAgICBleHRyYWN0IDQwIDMyCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5NQogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihhY2NvdW50KQogICAgY2FsbHN1YiB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OTcKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5NwogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzYKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgYWtpdGEsIG1hcmtldHBsYWNlLCBzZWxsZXIgfSA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDMKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAxNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1Qcml6ZV90ZXJuYXJ5X2ZhbHNlQDIzCiAgICBkaWcgNAogICAgKwoKY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODIKICAgIC8vIGlmIChha2l0YUFtb3VudCA+IDApIHsKICAgIGR1cAogICAgYm56IGNsYWltUHJpemVfaWZfYm9keUAyNQoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy5iaWRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBsZWZ0b3ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRUb0FraXRhRXNjcm93CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjg5CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldCh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBtYXJrZXRwbGFjZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMzkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODkKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0KHRoaXMubWFya2V0cGxhY2UudmFsdWUsIG1hcmtldHBsYWNlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTIKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0KGJ1eVNpZGVNYXJrZXRwbGFjZSwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTUKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0KHRoaXMuc2VsbGVyLnZhbHVlLCBzZWxsZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjk1CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldCh0aGlzLnNlbGxlci52YWx1ZSwgc2VsbGVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDE1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5OAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5OQogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXQoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgY3JlYXRvcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5OQogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXQoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgY3JlYXRvcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNiAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwMwogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc5CiAgICAvLyBjbGFpbVByaXplKCk6IHZvaWQgewogICAgYiBjbGFpbVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVByaXplQDExCgpjbGFpbVByaXplX2lmX2JvZHlAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCAwLCBha2l0YUFtb3VudCwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODMKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gc2VsbGVyUmVmZXJyZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyUmVmZXJyZXIgfSkKICAgIGJ5dGVjIDQwIC8vICJzZWxsZXJfcmVmZXJyZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCAwLCBha2l0YUFtb3VudCwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDIxIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4MwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnRUbyh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlLCAwLCBha2l0YUFtb3VudCwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcykpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnRUbwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyNgoKY2xhaW1Qcml6ZV90ZXJuYXJ5X2ZhbHNlQDIzOgogICAgYiBjbGFpbVByaXplX3Rlcm5hcnlfbWVyZ2VAMjQKCmNsYWltUHJpemVfZWxzZV9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1NgogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBha2l0YSwgbWFya2V0cGxhY2UsIHNlbGxlciB9ID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGNhbGxzdWIgZ2V0QW1vdW50cwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMwogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDE1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMTQKICAgIGRpZyA0CiAgICArCgpjbGFpbVByaXplX3Rlcm5hcnlfbWVyZ2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MgogICAgLy8gaWYgKGFraXRhQW1vdW50ID4gMCkgewogICAgZHVwCiAgICBibnogY2xhaW1Qcml6ZV9pZl9ib2R5QDE2CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2NwogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBsZWZ0b3ZlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY3CiAgICAvLyB0aGlzLnNlbmRUb0FraXRhRXNjcm93KHRoaXMuYmlkQXNzZXQudmFsdWUsIGxlZnRvdmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgc2VuZFRvQWtpdGFFc2Nyb3cKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzAKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0T3JEaXNidXJzZSh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBtYXJrZXRwbGFjZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMzkgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzAKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0T3JEaXNidXJzZSh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBtYXJrZXRwbGFjZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXRPckRpc2J1cnNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzczCiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UoYnV5U2lkZU1hcmtldHBsYWNlLCBtYXJrZXRwbGFjZSkKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0T3JEaXNidXJzZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3NgogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKHRoaXMuc2VsbGVyLnZhbHVlLCBzZWxsZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc2CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UodGhpcy5zZWxsZXIudmFsdWUsIHNlbGxlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldE9yRGlzYnVyc2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAxNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODAKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0T3JEaXNidXJzZShBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLCBjcmVhdG9yKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDEwIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgwCiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgY3JlYXRvcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0T3JEaXNidXJzZQogICAgcG9wCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMAoKY2xhaW1Qcml6ZV9pZl9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjMKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlclJlZmVycmVyIH0pCiAgICBieXRlYyA0MCAvLyAic2VsbGVyX3JlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjMKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYzCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBjb3ZlciAzCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50VG8KICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTcKCmNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAxNDoKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDE1CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVJhZmZsZVByaXplW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xhaW1SYWZmbGVQcml6ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2MyAvLyAiRVJSOmVyclduZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25mZAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlQWxyZWFkeVByaXplQ2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA3IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlQWxyZWFkeVByaXplQ2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1OSAvLyAiRVJSOmVyclJhcGMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmFwYwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxMQogICAgLy8gY29uc3QgcG9vbCA9IHRoaXMucmFmZmxlUG9vbCgpCiAgICBjYWxsc3ViIHJhZmZsZVBvb2wKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxMgogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU1CiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgNDEgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEyCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlIH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxNAogICAgLy8gY29uc3QgbGVmdG92ZXI6IHVpbnQ2NCA9IHBvb2wgLSBha2l0YUZlZQogICAgc3dhcAogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxNgogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBha2l0YUZlZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxNgogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBha2l0YUZlZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFRvQWtpdGFFc2Nyb3cKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDE5CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsIGxlZnRvdmVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxOQogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLCBsZWZ0b3ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldE9yRGlzYnVyc2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNyAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjEKICAgIC8vIHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMDYKICAgIC8vIGNsYWltUmFmZmxlUHJpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDI0CiAgICAvLyBjbGVhcldlaWdodHNCb3hlcyhpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjcKICAgIC8vIFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlICYmCiAgICB0eG4gU2VuZGVyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAyNwogICAgLy8gVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDI3LTEwMjgKICAgIC8vIFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlICYmCiAgICAvLyB0aGlzLmJpZElELnZhbHVlID09PSAxICYmCiAgICBieiBjbGVhcldlaWdodHNCb3hlc19ib29sX2ZhbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAyOAogICAgLy8gdGhpcy5iaWRJRC52YWx1ZSA9PT0gMSAmJgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDI4CiAgICAvLyB0aGlzLmJpZElELnZhbHVlID09PSAxICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjctMTAyOAogICAgLy8gVHhuLnNlbmRlciA9PT0gdGhpcy5zZWxsZXIudmFsdWUgJiYKICAgIC8vIHRoaXMuYmlkSUQudmFsdWUgPT09IDEgJiYKICAgIGJ6IGNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfZmFsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDI5CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM0IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjkKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDI3LTEwMjkKICAgIC8vIFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlICYmCiAgICAvLyB0aGlzLmJpZElELnZhbHVlID09PSAxICYmCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZQogICAgYnogY2xlYXJXZWlnaHRzQm94ZXNfYm9vbF9mYWxzZUA1CiAgICBpbnRjXzEgLy8gMQoKY2xlYXJXZWlnaHRzQm94ZXNfYm9vbF9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDMyCiAgICAvLyBpZiAoIXByZVN0YXJ0Q2FuY2VsKSB7CiAgICBibnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDMzCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJBdWN0aW9uSGFzTm90RW5kZWQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxMSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJBaG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFobmUKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDM0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNiAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJQem5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclB6bmMKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVOb3RQcml6ZUNsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNyAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMzUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlTm90UHJpemVDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9pZl9lbHNlQDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJSbnBjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclJucGMKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMzgKICAgIC8vIGVuc3VyZUJ1ZGdldCgoaXRlcmF0aW9uQW1vdW50ICogMzApKQogICAgZHVwCiAgICBwdXNoaW50IDMwCiAgICAqCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnN1cmVfYnVkZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBieiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDQxCiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDggLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDQxCiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDIKICAgIC8vIHRoaXMud2VpZ2h0cyhyaSkuZGVsZXRlKCkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjMgLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0MgogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGIgY2xlYXJXZWlnaHRzQm94ZXNfd2hpbGVfdG9wQDE1CgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUAxNzoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDQ1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgOCAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDUKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC09IGl0ZXJhdGlvbkFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgOCAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDUKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC09IGl0ZXJhdGlvbkFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0NwogICAgLy8gY29uc3QgcmV0dXJuQW1vdW50OiB1aW50NjQgPSBpdGVyYXRpb25BbW91bnQgKiB0aGlzLm1icigpLndlaWdodHMKICAgIGludGMgMTIgLy8gMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1MC0xMDU1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNTIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBieXRlYyA1MiAvLyAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDUyCiAgICAvLyByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDUwLTEwNTQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDUwLTEwNTUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjQKICAgIC8vIGNsZWFyV2VpZ2h0c0JveGVzKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfZmFsc2VANToKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlW3JvdXRpbmddKCkgLT4gdm9pZDoKaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDYzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGJ5dGVjIDI4IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaGFzQmlkW3JvdXRpbmddKCkgLT4gdm9pZDoKaGFzQmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgMTIgLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3NAogICAgLy8gcmV0dXJuIHRoaXMuYmlkc0J5QWRkcmVzcyhhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDI4IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWMgNSAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldE1pbmltdW1CaWRBbW91bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNzcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIGl0b2IKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDUgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0NSAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA2NCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTMgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQ1IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyRm9yYmlkZGVuKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGb3JiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZvcmIKCm9wdGluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdGluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRpbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NDcKICAgIC8vIG9wdGluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubmV3QmlkSUQoKSAtPiB1aW50NjQ6Cm5ld0JpZElEOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5iaWRJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5iaWRJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ0CiAgICAvLyB0aGlzLmJpZElELnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIHRoaXMuYmlkSUQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ1CiAgICAvLyByZXR1cm4gaWQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0QmlkRmVlKGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmdldEJpZEZlZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg0CiAgICAvLyBwcml2YXRlIGdldEJpZEZlZShhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg1CiAgICAvLyBjb25zdCBmZWUgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYmlkRmVlLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg1CiAgICAvLyBjb25zdCBmZWUgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYmlkRmVlLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4NgogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QmlkRmVlX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIHJldHVybiAxCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAogICAgcmV0c3ViCgpnZXRCaWRGZWVfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHJldHVybiBmZWUKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmdldEFtb3VudHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gcHJpdmF0ZSBnZXRBbW91bnRzKGFtb3VudDogdWludDY0KTogUm95YWx0eUFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTQKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGlmICh0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNiAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGlmICh0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5NgogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNiAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTYKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTcKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDI2IC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5NwogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gY3JlYXRvckFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDUKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDIKICAgIC8vIGNvbnN0IHsgYXVjdGlvblNhbGVJbXBhY3RUYXhNaW46IG1pbiwgYXVjdGlvblNhbGVJbXBhY3RUYXhNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1NQogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDQxIC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjAyCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwMwogICAgLy8gbGV0IGFraXRhQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gbGV0IGFraXRhVGF4UmF0ZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDUKICAgIC8vIGlmIChtYXggPiAwKSB7CiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA2CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDYKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxMQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5OQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTMKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBnZXRBbW91bnRzX3Rlcm5hcnlfZmFsc2VAMjQKICAgIGludGNfMSAvLyAxCiAgICAtCgpnZXRBbW91bnRzX3Rlcm5hcnlfbWVyZ2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5NAogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBmcmFtZV9kaWcgNAogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAKICAgIC8KICAgIC0KICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gaWYgKGFraXRhQW1vdW50ID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxNQogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxNgogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjcgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE2CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE3CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyNyAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMTcKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE4CiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDI3IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxOAogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxOQogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAyCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNQogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgKyBha2l0YUFtb3VudCArICgyICogbWFya2V0cGxhY2VBbW91bnQpID4gYW1vdW50KSB7CiAgICBmcmFtZV9kaWcgNQogICAgZnJhbWVfZGlnIDAKICAgICsKICAgIHB1c2hpbnQgMgogICAgZnJhbWVfZGlnIDIKICAgICoKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgPgogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNgogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNiAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMjYKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMjgKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDI3IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyOAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBmcmFtZV9idXJ5IDIKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjMxCiAgICAvLyBjb25zdCBzZWxsZXJBbW91bnQ6IHVpbnQ2NCA9IGFtb3VudCAtIChjcmVhdG9yQW1vdW50ICsgYWtpdGFBbW91bnQgKyAoMiAqIG1hcmtldHBsYWNlQW1vdW50KSkKICAgIGZyYW1lX2RpZyA1CiAgICBkdXAKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIHB1c2hpbnQgMgogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzMy0yMzgKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDI0OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5MwogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgZ2V0QW1vdW50c190ZXJuYXJ5X21lcmdlQDI1CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogYnl0ZXMpIC0+IHZvaWQ6CnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDEKICAgIC8vIHByaXZhdGUgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIoYnV5ZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDIKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDE1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0MgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDMtMjQ2CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDQKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDEwIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ0CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQzLTI0NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbYnV5ZXJdLAogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweGFkZjkyYWU0IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NwogICAgLy8gcmV0dXJuCiAgICByZXRzdWIKCnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUwCiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDEwIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUwCiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1MgogICAgLy8gaWYgKGJ1eWVyLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2Vsc2VfYm9keUA2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUzLTI1OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1My0yNTcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUzLTI1OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfZWxzZV9ib2R5QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MQogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MgogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyAxMCAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MgogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2NQogICAgLy8gW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDMyIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2OAogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjYwLTI2OQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNyAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjAtMjY5CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA1CiAgICB1bmNvdmVyIDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjY3CiAgICAvLyB0cnVlLAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjYwLTI2OQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlLAogICAgLy8gICBHbG9iYWwuemVyb0FkZHJlc3MKICAgIC8vICkKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2FuUmVjZWl2ZUFsZ28ocmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpjYW5SZWNlaXZlQWxnbzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBwcml2YXRlIGNhblJlY2VpdmVBbGdvKHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwOQogICAgLy8gY29uc3QgW2JhbGFuY2VdID0gb3AuQWNjdFBhcmFtcy5hY2N0QmFsYW5jZShyZWNlaXZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzEwCiAgICAvLyByZXR1cm4gYmFsYW5jZSA+IDAgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICBibnogY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMQogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiBjYW5SZWNlaXZlQWxnb19ib29sX2ZhbHNlQDMKCmNhblJlY2VpdmVBbGdvX2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzEwCiAgICAvLyByZXR1cm4gYmFsYW5jZSA+IDAgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCmNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMAogICAgLy8gcmV0dXJuIGJhbGFuY2UgPiAwIHx8IGFtb3VudCA+PSBHbG9iYWwubWluQmFsYW5jZQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5zZW5kQmlkQXNzZXQocmVjZWl2ZXI6IGJ5dGVzLCBhbW91bnQ6IHVpbnQ2NCkgLT4gdm9pZDoKc2VuZEJpZEFzc2V0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTcKICAgIC8vIHByaXZhdGUgc2VuZEJpZEFzc2V0KHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxOAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzE4CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzZW5kQmlkQXNzZXRfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzE5CiAgICAvLyBpZiAodGhpcy5jYW5SZWNlaXZlQWxnbyhyZWNlaXZlciwgYW1vdW50KSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJ6IHNlbmRCaWRBc3NldF9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzIwCiAgICAvLyBpdHhuLnBheW1lbnQoeyByZWNlaXZlciwgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpzZW5kQmlkQXNzZXRfYWZ0ZXJfaWZfZWxzZUA3OgogICAgcmV0c3ViCgpzZW5kQmlkQXNzZXRfZWxzZV9ib2R5QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyMy0zMjkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzI3CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyMy0zMjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzIzLTMyOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uc2VuZEJpZEFzc2V0T3JEaXNidXJzZShyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CnNlbmRCaWRBc3NldE9yRGlzYnVyc2U6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzNwogICAgLy8gcHJpdmF0ZSBzZW5kQmlkQXNzZXRPckRpc2J1cnNlKHJlY2VpdmVyOiBBY2NvdW50LCBhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCB8fCByZWNlaXZlci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzEgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM4CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCB8fCByZWNlaXZlci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzZW5kQmlkQXNzZXRPckRpc2J1cnNlX2lmX2JvZHlAMgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMSAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzgKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwIHx8IHJlY2VpdmVyLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IHNlbmRCaWRBc3NldE9yRGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAzCgpzZW5kQmlkQXNzZXRPckRpc2J1cnNlX2lmX2JvZHlAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldChyZWNlaXZlciwgYW1vdW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCnNlbmRCaWRBc3NldE9yRGlzYnVyc2VfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDQKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0NAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0NwogICAgLy8gW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudCB9XSwKICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDMyIC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQyLTM1MQogICAgLy8gcmV0dXJuIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKS5jb3N0CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDUKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDYKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDcgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQyLTM1MQogICAgLy8gcmV0dXJuIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKS5jb3N0CiAgICB1bmNvdmVyIDUKICAgIGZyYW1lX2RpZyAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDkKICAgIC8vIGZhbHNlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQyLTM1MQogICAgLy8gcmV0dXJuIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlY2VpdmVyLCBhbW91bnQgfV0sCiAgICAvLyAgIGFtb3VudCwKICAgIC8vICAgZmFsc2UsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKS5jb3N0CiAgICB1bmNvdmVyIDcKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ud2VpZ2h0c0JveGVzKCkgLT4gdWludDY0Ogp3ZWlnaHRzQm94ZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gcmV0dXJuIHRoaXMud2VpZ2h0c0JveENvdW50Lmhhc1ZhbHVlID8gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDggLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDcKICAgIC8vIHJldHVybiB0aGlzLndlaWdodHNCb3hDb3VudC5oYXNWYWx1ZSA/IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYnogd2VpZ2h0c0JveGVzX3Rlcm5hcnlfZmFsc2VAMgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyA4IC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDA3CiAgICAvLyByZXR1cm4gdGhpcy53ZWlnaHRzQm94Q291bnQuaGFzVmFsdWUgPyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA6IDAKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCndlaWdodHNCb3hlc190ZXJuYXJ5X2ZhbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwNwogICAgLy8gcmV0dXJuIHRoaXMud2VpZ2h0c0JveENvdW50Lmhhc1ZhbHVlID8gdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVQb29sKCkgLT4gdWludDY0OgpyYWZmbGVQb29sOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHJldHVybiB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSAtIHRoaXMuZ2V0QmlkRmVlKHRoaXMuaGlnaGVzdEJpZC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMzEgLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gcmV0dXJuIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlIC0gdGhpcy5nZXRCaWRGZWUodGhpcy5oaWdoZXN0QmlkLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAyNCAvLyAiaGlnaGVzdF9iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gcmV0dXJuIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlIC0gdGhpcy5nZXRCaWRGZWUodGhpcy5oaWdoZXN0QmlkLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAtCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmFzc2VydE5vdFNlbGZPdXRiaWQoKSAtPiB2b2lkOgphc3NlcnROb3RTZWxmT3V0YmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTcKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgdGhpcy5iaWRJRC52YWx1ZSA+IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCAmJiB0aGlzLmJpZElELnZhbHVlID4gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGFzc2VydE5vdFNlbGZPdXRiaWRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCAmJiB0aGlzLmJpZElELnZhbHVlID4gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBhc3NlcnROb3RTZWxmT3V0YmlkX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlLmFjY291bnQgIT09IFR4bi5zZW5kZXIsIGVyckNhbm5vdE91dGJpZFNlbGYpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUuYWNjb3VudCAhPT0gVHhuLnNlbmRlciwgZXJyQ2Fubm90T3V0YmlkU2VsZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDEzIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUuYWNjb3VudCAhPT0gVHhuLnNlbmRlciwgZXJyQ2Fubm90T3V0YmlkU2VsZikKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDAgMzIKICAgIHR4biBTZW5kZXIKICAgICE9CiAgICBibnogYXNzZXJ0Tm90U2VsZk91dGJpZF9hZnRlcl9pZl9lbHNlQDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckNvYnMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ29icwoKYXNzZXJ0Tm90U2VsZk91dGJpZF9hZnRlcl9pZl9lbHNlQDU6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmFzc2VydEdhdGVkKGdhdGVUeG46IHVpbnQ2NCwgbGVnYWN5OiB1aW50NjQsIHdhbGxldDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRHYXRlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDY3CiAgICAvLyBwcml2YXRlIGFzc2VydEdhdGVkKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBsZWdhY3k6IGJvb2xlYW4sIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDQKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIGVyckF1Y3Rpb25Ob3RMaXZlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZQogICAgYm56IGFzc2VydEdhdGVkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA2NSAvLyAiRVJSOmVyckFubHYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQW5sdgoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3MAogICAgLy8gaWYgKGxlZ2FjeSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBhc3NlcnRHYXRlZF9lbHNlX2JvZHlANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzEKICAgIC8vIGNvbnN0IG9yaWdpbiA9IGxlZ2FjeU9yaWdpbk9yVHhuU2VuZGVyKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDcxCiAgICAvLyBjb25zdCBvcmlnaW4gPSBsZWdhY3lPcmlnaW5PclR4blNlbmRlcihsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyMQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBkaWcgMQogICAgYnl0ZWMgNjAgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI2CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyAyNSAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODgtMzkxCiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDUgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzkzCiAgICAvLyBpZiAoQnl0ZXMoZGF0YSkubGVuZ3RoICE9PSA4KSB7CiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA2MwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5NAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDcKCmFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIDcKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDY4CiAgICBmcmFtZV9idXJ5IDMKCmFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDM1IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzIKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDIKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDI1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VAODgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQzCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDQKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDUKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDQzOTIyNjU1IC8vIG1ldGhvZCAibXVzdENoZWNrKGFkZHJlc3MsdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDg4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDg4CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZWQsIGVyckZhaWxlZEdhdGUpCiAgICBibnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICByZXRzdWIKCmFzc2VydEdhdGVkX2Jvb2xfZmFsc2VAODg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDUKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VANjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MS0zNDQKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MwogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBieXRlYyA2NiAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDEtMzQ0CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDUKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA3MQogICAgZGlnIDEKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA3MQogICAgaW50Y18xIC8vIDEKCmFzc2VydEdhdGVkX2Jvb2xfbWVyZ2VANzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBibnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDc0CiAgICBieXRlYyA2NyAvLyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDc0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTgKICAgIC8vIGlmIChvcmlnaW4gIT09IHdhbGxldElELmFkZHJlc3MgJiYgb3JpZ2luICE9PSBUeG4uc2VuZGVyICYmIG9yaWdpbi5hdXRoQWRkcmVzcyAhPT0gd2FsbGV0SUQuYWRkcmVzcykgewogICAgZnJhbWVfZGlnIDcKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAyCiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA3OAogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgICE9CiAgICBieiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDc4CiAgICBkaWcgMQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgNwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VANzgKICAgIGZyYW1lX2J1cnkgMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDc5Cgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDc4OgogICAgcG9wCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzI1CiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIGFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzkKCmFzc2VydEdhdGVkX2Jvb2xfZmFsc2VANzE6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlZF9ib29sX21lcmdlQDcyCgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDYzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGJ0b2koZGF0YSkKICAgIGJ0b2kKICAgIGR1cAogICAgZnJhbWVfYnVyeSAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjQKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUA5NAogICAgZnJhbWVfZGlnIDYKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDk1Cgphc3NlcnRHYXRlZF9pZl9ib2R5QDk0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjUKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxMDA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9idXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzgwCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA2NAoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA5NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY3CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDk4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1OQogICAgLy8gcmV0dXJuIEFjY291bnQob3Auc2hhNTEyXzI1NihCeXRlcygnYXBwSUQnKS5jb25jYXQoaXRvYihhcHBJZCkpKSkKICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBieXRlYyA2OCAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY4CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA5OAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTAwCgphc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDk4OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTAwCgphc3NlcnRHYXRlZF9lbHNlX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDc0CiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDI1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEzCiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxNAogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDEwCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTMKICAgIC8vIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjk1CiAgICAvLyByZWZlcnJlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkxCiAgICAvLyB3YWxsZXQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MC05NwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiAwLAogICAgLy8gICBwcmluY2lwYWw6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgdmlhUGx1Z2luOiBmYWxzZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMjggLy8gMHgwMAogICAgY29uY2F0Cgphc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA3MiAzMgogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDM1IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzQKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyAyNSAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDU4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2NgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2NgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VANTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY3CiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VANTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4OWIxNDdkMmMgLy8gbWV0aG9kICJtdXN0Q2hlY2tGb3IoKGFkZHJlc3MsdWludDY0LGFkZHJlc3MpLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDU4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OQogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA1OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzAKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgNQogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk3MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA1OAogICAgaW50Y18xIC8vIDEKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA1Cgphc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDU4OgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA1Cgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDIKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBhc3NlcnRHYXRlZF9pZl9ib2R5QDEyCiAgICBmcmFtZV9kaWcgNgogICAgYm56IGFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMTMKCmFzc2VydEdhdGVkX2lmX2JvZHlAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwMwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RXYWxsZXQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbndsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhud2wKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1OQogICAgLy8gaWYgKGNhbGxlckFwcCA9PT0gMCkgewogICAgZHVwCiAgICBibnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUAyMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NgogICAgLy8gbGV0IHZpYVBsdWdpbiA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjcKICAgIC8vIGlmIChjYWxsZXJBcHAgIT09IGhpbnQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzEKICAgIC8vIGNvbnN0IFtzcGVuZGluZywgc3BlbmRpbmdFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9TUEVORElORykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAic3BlbmRpbmdfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcyCiAgICAvLyBpZiAoIShzcGVuZGluZ0V4aXN0cyAmJiBzcGVuZGluZy5sZW5ndGggPT09IDMyICYmIHNwZW5kaW5nID09PSBzZW5kZXIuYnl0ZXMgJiYgc2VuZGVyICE9PSBjYWxsZXJBZGRyKSkgewogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAyNwogICAgZnJhbWVfZGlnIDQKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAyNwogICAgZnJhbWVfZGlnIDQKICAgIGRpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAyNwogICAgZHVwCiAgICBmcmFtZV9kaWcgMAogICAgIT0KICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDI4Cgphc3NlcnRHYXRlZF9pZl9ib2R5QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90Qm91bmQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhuYmQKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3OAogICAgLy8gdmlhUGx1Z2luID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRCeXRlcywgY29udHJvbGxlZEV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX0NPTlRST0xMRUQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyA2NiAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAzMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDMyCgphc3NlcnRHYXRlZF9pZl9ib2R5QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50QmFkV2FsbGV0KQogICAgYnl0ZWMgNjcgLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjExOQogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHNwZW5kZXIpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMAogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICBzd2FwCgphc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkxCiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlcywgcmVmZXJyZXJFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9SRUZFUlJFUikpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogYXNzZXJ0R2F0ZWRfdGVybmFyeV9mYWxzZUA0MgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVkX3Rlcm5hcnlfZmFsc2VANDIKICAgIGNvdmVyIDMKCmFzc2VydEdhdGVkX3Rlcm5hcnlfbWVyZ2VANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NgogICAgLy8gcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIGRpZyAyCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBhc3NlcnRHYXRlZF90ZXJuYXJ5X2ZhbHNlQDQ1CiAgICBzd2FwCgphc3NlcnRHYXRlZF90ZXJuYXJ5X21lcmdlQDQ2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTQtMjAxCiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IGhpbnQsCiAgICAvLyAgIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXIsCiAgICAvLyAgIHZpYVBsdWdpbiwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDI4IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIwOS0yMTYKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsQ3R4KAogICAgLy8gICB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBoaW50LAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDcKCmFzc2VydEdhdGVkX3Rlcm5hcnlfZmFsc2VANDU6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIGFzc2VydEdhdGVkX3Rlcm5hcnlfbWVyZ2VANDYKCmFzc2VydEdhdGVkX3Rlcm5hcnlfZmFsc2VANDI6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBhc3NlcnRHYXRlZF90ZXJuYXJ5X21lcmdlQDQzCgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjIKICAgIC8vIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCB3YWxsZXRFeGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMwogICAgLy8gaWYgKCF3YWxsZXRFeGlzdHMpIHsKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM2CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIGFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDM5Cgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjYKICAgIC8vIGlmIChjb250cm9sbGVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzkKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihjb250cm9sbGVkKSA9PT0gd2FsbGV0QWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzOQoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA1CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgNgogICAgaXRvYgogICAgYnl0ZWMgNjggLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUAxNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxOAoKYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUAxNjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTgKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmFzc2VydFVuZ2F0ZWQoKSAtPiB2b2lkOgphc3NlcnRVbmdhdGVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBlcnJBdWN0aW9uTm90TGl2ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGJueiBhc3NlcnRVbmdhdGVkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA2NSAvLyAiRVJSOmVyckFubHYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQW5sdgoKYXNzZXJ0VW5nYXRlZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckhhc0dhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OAogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAzNSAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckhhc0dhdGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYXNzZXJ0VW5nYXRlZF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySGd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIZ3RlCgphc3NlcnRVbmdhdGVkX2FmdGVyX2Fzc2VydEA0OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5iaWRNYnIoKSAtPiB1aW50NjQ6CmJpZE1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDg2CiAgICAvLyBwcml2YXRlIGJpZE1icigpOiB1aW50NjQgewogICAgcHJvdG8gMCAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDg3CiAgICAvLyBjb25zdCB7IGJpZHMsIGJpZHNCeUFkZHJlc3MsIGxvY2F0aW9ucyB9ID0gdGhpcy5tYnIoKQogICAgaW50YyAxMyAvLyAzNTMwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgMTIgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4OQogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDg5CiAgICAvLyBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogYmlkTWJyX2lmX2JvZHlAMQogICAgZnJhbWVfYnVyeSAwCgpiaWRNYnJfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIHJldHVybiBtYnIKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCmJpZE1icl9pZl9ib2R5QDE6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBtYnIgKz0gYmlkc0J5QWRkcmVzcwogICAgaW50YyAxNCAvLyA1NDIwMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5MQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkxCiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYmlkTWJyX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTIKICAgIC8vIG1iciArPSBsb2NhdGlvbnMKICAgIGludGMgMTUgLy8gNzMxMDAKICAgIGZyYW1lX2J1cnkgMAogICAgYiBiaWRNYnJfYWZ0ZXJfaWZfZWxzZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWNvcmRCaWQoaWQ6IHVpbnQ2NCwgYmlkQW1vdW50OiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcykgLT4gdm9pZDoKcmVjb3JkQmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTkKICAgIC8vIHByaXZhdGUgcmVjb3JkQmlkKGlkOiB1aW50NjQsIGJpZEFtb3VudDogdWludDY0LCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MAogICAgLy8gYWNjb3VudDogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ5LTE1NAogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBiaWRBbW91bnQsCiAgICAvLyAgIHJlZnVuZGVkOiBmYWxzZSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgYnl0ZWMgMjggLy8gMHgwMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0OQogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZSA9IHsKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDEzIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0OS0xNTQKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogYmlkQW1vdW50LAogICAgLy8gICByZWZ1bmRlZDogZmFsc2UsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NgogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJlY29yZEJpZF9lbHNlX2JvZHlAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDEyIC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTcKICAgIC8vIGlmICh0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU3CiAgICAvLyBpZiAodGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByZWNvcmRCaWRfZWxzZV9ib2R5QDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDEyIC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gY29uc3QgbG9jID0gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIGNvbnN0IGxhc3RCaWQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGR1cAogICAgaW50YyA1IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyMyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTkKICAgIC8vIGNvbnN0IGxhc3RCaWQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIHVuY292ZXIgMgogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYwCiAgICAvLyBjb25zdCBkaWZmZXJlbmNlOiB1aW50NjQgPSBiaWRBbW91bnQgLSBsYXN0QmlkCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHN3YXAKICAgIGRpZyAxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBkaWZmZXJlbmNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NgogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgNCAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjMKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBkaWZmZXJlbmNlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDQgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gZGlmZmVyZW5jZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChiaWRBbW91bnQpCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGxhc3RXZWlnaHRlZFRvdGFsICsgZGlmZmVyZW5jZSkKICAgIHVuY292ZXIgMgogICAgKwogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGRpZmZlcmVuY2UpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY292ZXIgMgogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBkaWZmZXJlbmNlKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCnJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDMKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxMSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAzCiAgICAvLyBpZiAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+ICh0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSAtIFNOSVBFX1JBTkdFKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMTIwCiAgICAtCiAgICA+CiAgICBieiByZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxMSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSArPSBTTklQRV9FWFRFTlNJT04KICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDMwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyAxMSAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA0CiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSArPSBTTklQRV9FWFRFTlNJT04KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDcKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA4CiAgICAvLyBjb25zdCBiaWRGZWUgPSB0aGlzLmdldEJpZEZlZShiaWRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwOQogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MgogICAgLy8gcmFmZmxlQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVBbW91bnQgfSkKICAgIGJ5dGVjIDMxIC8vICJyYWZmbGVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDkKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAzMSAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OAogICAgLy8gaGlnaGVzdEJpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SGlnaGVzdEJpZCB9KQogICAgYnl0ZWMgMjQgLy8gImhpZ2hlc3RfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTIKICAgIC8vIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSA9IGJpZEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpyZWNvcmRCaWRfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gY29uc3QgbG9jID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMTkgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY4CiAgICAvLyBsb2dnZWRBc3NlcnQobG9jIDwgQ2h1bmtTaXplICogdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUsIGVyclRvb01hbnlQYXJ0aWNpcGFudHMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDggLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjgKICAgIC8vIGxvZ2dlZEFzc2VydChsb2MgPCBDaHVua1NpemUgKiB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSwgZXJyVG9vTWFueVBhcnRpY2lwYW50cykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjIDUgLy8gNDA5NgogICAgKgogICAgPAogICAgYm56IHJlY29yZEJpZF9hZnRlcl9hc3NlcnRAMTAKICAgIHB1c2hieXRlcyAiRVJSOmVyclRtcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVG1wdAoKcmVjb3JkQmlkX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA2IC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgdW5jb3ZlciAyCiAgICBkaWcgMQogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gYmlkQW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NgogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgNCAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBiaWRBbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDQgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gYmlkQW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzQKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgMTIgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3MgogICAgLy8gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlID0gbG9jCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcyCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSBsb2MKICAgIGRpZyA0CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGJpZEFtb3VudCkKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyMyAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGJpZEFtb3VudCkKICAgIHVuY292ZXIgNAogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICB1bmNvdmVyIDUKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBiaWRBbW91bnQpCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgNiAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBiaWRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MwogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDYgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzQKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGxhc3RXZWlnaHRlZFRvdGFsICsgYmlkQW1vdW50KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc1CiAgICAvLyB0aGlzLmxvY2F0aW9ucyhsb2MpLnZhbHVlID0gVHhuLnNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzgKICAgIC8vIGxvY2F0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjY291bnQ+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4TG9jYXRpb25zIH0pCiAgICBieXRlYyA0NCAvLyAibCIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NQogICAgLy8gdGhpcy5sb2NhdGlvbnMobG9jKS52YWx1ZSA9IFR4bi5zZW5kZXIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OQogICAgLy8gdW5pcXVlQWRkcmVzc0NvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlVbmlxdWVBZGRyZXNzQ291bnQgfSkKICAgIGJ5dGVjIDE5IC8vICJ1bmlxdWVfYWRkcmVzc19jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAxOSAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIGIgcmVjb3JkQmlkX2FmdGVyX2lmX2Vsc2VAMTMKCnJlY29yZEJpZF9lbHNlX2JvZHlAMTE6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDEyIC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIH0gZWxzZSBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIH0gZWxzZSBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyAxMiAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSAwCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgYm94X3B1dAogICAgYiByZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUAxMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkKHBheW1lbnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpjcmVhdGVCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxNQogICAgLy8gcHJpdmF0ZSBjcmVhdGVCaWQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxNgogICAgLy8gYXNzZXJ0UGxhaW5QYXltZW50KHBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgYXNzZXJ0UGxhaW5QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxNwogICAgLy8gdGhpcy5hc3NlcnROb3RTZWxmT3V0YmlkKCkKICAgIGNhbGxzdWIgYXNzZXJ0Tm90U2VsZk91dGJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTgKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdCaWRJRCgpCiAgICBjYWxsc3ViIG5ld0JpZElECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyMgogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSB0aGlzLmJpZE1icigpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBjYWxsc3ViIGJpZE1icgogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBTZW5kZXIKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDEwIC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIyCiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IHRoaXMuYmlkTWJyKCkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIzCiAgICAvLyBjb25zdCBtaW5pbXVtQmlkQW1vdW50ID0gdGhpcy5nZXRNaW5pbXVtQmlkQW1vdW50KCkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUJpZF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNyZWF0ZUJpZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTI2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPj0gKG1pbmltdW1CaWRBbW91bnQgKyBtYnIpLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQW1vdW50CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZGlnIDMKICAgICsKICAgID49CiAgICBibnogY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjcKICAgIC8vIGNvbnN0IGJpZEFtb3VudDogdWludDY0ID0gcGF5bWVudC5hbW91bnQgLSBtYnIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTI5CiAgICAvLyB0aGlzLnJlY29yZEJpZChpZCwgYmlkQW1vdW50LCBtYXJrZXRwbGFjZSkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZWNvcmRCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyByZWNvcmRQYXllcih0aGlzLmJpZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMTMgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMwCiAgICAvLyByZWNvcmRQYXllcih0aGlzLmJpZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNyZWF0ZUJpZEFzYShwYXltZW50OiB1aW50NjQsIGFzc2V0WGZlcjogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMpIC0+IHZvaWQ6CmNyZWF0ZUJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMzLTUzNwogICAgLy8gcHJpdmF0ZSBjcmVhdGVCaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzgKICAgIC8vIGFzc2VydFBsYWluUGF5bWVudChwYXltZW50KQogICAgZnJhbWVfZGlnIC0zCiAgICBjYWxsc3ViIGFzc2VydFBsYWluUGF5bWVudAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIGFzc2VydFNhZmVBc3NldFRyYW5zZmVyKGFzc2V0WGZlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc3CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnNlbmRlciA9PT0gc2VuZGVyLCBlcnJJbnZhbGlkUGF5bWVudFNlbmRlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgU2VuZGVyCiAgICA9PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcwoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0U2VuZGVyID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsYXdiYWNrRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFNlbmRlcgogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTUKICAgIHB1c2hieXRlcyAiRVJSOmVyck5jbHciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNsdwoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTc5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmFzc2V0Q2xvc2VUbyA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJDbG9zZUZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRDbG9zZVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJOY2xzIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5jbHMKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHR4bi5yZWtleVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyclJla2V5Rm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWtleVRvCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgNDkgLy8gIkVSUjplcnJOcmt5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5ya3kKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0MAogICAgLy8gdGhpcy5hc3NlcnROb3RTZWxmT3V0YmlkKCkKICAgIGNhbGxzdWIgYXNzZXJ0Tm90U2VsZk91dGJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDEKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdCaWRJRCgpCiAgICBjYWxsc3ViIG5ld0JpZElECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSB0aGlzLmJpZE1icigpICsgc3BvbnNvckNvc3QocGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBjYWxsc3ViIGJpZE1icgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBTZW5kZXIKICAgIGR1cAogICAgY292ZXIgMwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEKICAgIC8vIHJldHVybiBwYXllciA9PT0gb3duZXIgPyAwIDogUGF5ZXJSZWNvcmRNQlIKICAgID09CiAgICBpbnRjIDEwIC8vIDI4NTAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ0CiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IHRoaXMuYmlkTWJyKCkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gbWJyLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgQW1vdW50CiAgICA9PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMjIgLy8gIkVSUjplcnJJcGF5IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwYXkKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQ5CiAgICAvLyBjb25zdCBiaWRBbW91bnQgPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBjb25zdCBtaW5pbXVtQmlkQW1vdW50ID0gdGhpcy5nZXRNaW5pbXVtQmlkQW1vdW50KCkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDQ2IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldEFtb3VudCA+PSBtaW5pbXVtQmlkQW1vdW50LCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBkaWcgMQogICAgPD0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDQ2IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMuYmlkQXNzZXQudmFsdWUsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18xIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMuYmlkQXNzZXQudmFsdWUsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDQ2IC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NTYKICAgIC8vIHRoaXMucmVjb3JkQmlkKGlkLCBiaWRBbW91bnQsIG1hcmtldHBsYWNlKQogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiByZWNvcmRCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyByZWNvcmRQYXllcih0aGlzLmJpZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMTMgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyByZWNvcmRQYXllcih0aGlzLmJpZHMoaWQpLmtleSwgcGF5bWVudC5zZW5kZXIsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBjYWxsc3ViIHJlY29yZFBheWVyCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLm1hcmtSZWZ1bmRlZChpZDogdWludDY0KSAtPiBieXRlczoKbWFya1JlZnVuZGVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIHByaXZhdGUgbWFya1JlZnVuZGVkKGlkOiB1aW50NjQpOiBbQWNjb3VudCwgdWludDY0XSB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkxCiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPCB0aGlzLmJpZElELnZhbHVlIC0gMSwgZXJyQ2Fubm90UmVmdW5kTW9zdFJlY2VudEJpZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkxCiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPCB0aGlzLmJpZElELnZhbHVlIC0gMSwgZXJyQ2Fubm90UmVmdW5kTW9zdFJlY2VudEJpZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZnJhbWVfZGlnIC0xCiAgICA+CiAgICBibnogbWFya1JlZnVuZGVkX2FmdGVyX2Fzc2VydEAyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJDcm1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNybXIKCm1hcmtSZWZ1bmRlZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRzKGlkKS5leGlzdHMsIGVyckJpZE5vdEZvdW5kKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMTMgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZHMoaWQpLmV4aXN0cywgZXJyQmlkTm90Rm91bmQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBtYXJrUmVmdW5kZWRfYWZ0ZXJfYXNzZXJ0QDQKICAgIHB1c2hieXRlcyAiRVJSOmVyckJuZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm5mZAoKbWFya1JlZnVuZGVkX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTUKICAgIC8vIGNvbnN0IHsgcmVmdW5kZWQsIGFtb3VudCwgYWNjb3VudDogcmVjZWl2ZXIgfSA9IHRoaXMuYmlkcyhpZCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgcHVzaGludCA1NzYKICAgIGdldGJpdAogICAgZGlnIDEKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIHN3YXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIGxvZ2dlZEFzc2VydCghcmVmdW5kZWQsIGVyckJpZEFscmVhZHlSZWZ1bmRlZCkKICAgIGJ6IG1hcmtSZWZ1bmRlZF9hZnRlcl9hc3NlcnRANgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQmFyZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCYXJmCgptYXJrUmVmdW5kZWRfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5OQogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZS5yZWZ1bmRlZCA9IHRydWUKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCA3MgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCA3MgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAxCiAgICAvLyBjb25zdCBiaWRGZWUgPSB0aGlzLmdldEJpZEZlZShhbW91bnQpCiAgICBzd2FwCiAgICBkdXAKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwMwogICAgLy8gY29uc3QgcmV0dXJuQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSBiaWRGZWUKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyB0aGlzLnJlZnVuZENvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJyZWZ1bmRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwNgogICAgLy8gdGhpcy5yZWZ1bmRDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIKICAgIC8vIHJlZnVuZENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRDb3VudCB9KQogICAgYnl0ZWMgMzAgLy8gInJlZnVuZF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyB0aGlzLnJlZnVuZENvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwNwogICAgLy8gcmV0dXJuIFtyZWNlaXZlciwgcmV0dXJuQW1vdW50XQogICAgaXRvYgogICAgY29uY2F0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNvbW1pdERyYXdSb3VuZCgpIC0+IHZvaWQ6CmNvbW1pdERyYXdSb3VuZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gKEdsb2JhbC5yb3VuZCArIERSQVdfREVMQVlfUk9VTkRTICsgQkVBQ09OX1JPVU5EX0lOVEVSVkFMIC0gMSkgLyBCRUFDT05fUk9VTkRfSU5URVJWQUwgKiBCRUFDT05fUk9VTkRfSU5URVJWQUwKICAgIGdsb2JhbCBSb3VuZAogICAgcHVzaGludCAxNgogICAgKwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGludGNfMiAvLyA4CiAgICAvCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTYKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gKEdsb2JhbC5yb3VuZCArIERSQVdfREVMQVlfUk9VTkRTICsgQkVBQ09OX1JPVU5EX0lOVEVSVkFMIC0gMSkgLyBCRUFDT05fUk9VTkRfSU5URVJWQUwgKiBCRUFDT05fUk9VTkRfSU5URVJWQUwKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZSgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM0IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID49CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjYtMTA2NwogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2NwogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMTEgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjcKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDY2LTEwNjcKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmVfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDY1LTEwNjgKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjUtMTA2OAogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudCgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDc5CiAgICAvLyBpZiAodGhpcy5oaWdoZXN0QmlkLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDI0IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3OQogICAgLy8gaWYgKHRoaXMuaGlnaGVzdEJpZC52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwODAKICAgIC8vIHJldHVybiB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgKyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDI0IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4MAogICAgLy8gcmV0dXJuIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSArIHRoaXMuYmlkTWluaW11bUluY3JlYXNlLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZE1pbmltdW1JbmNyZWFzZSB9KQogICAgYnl0ZWMgNTEgLy8gImJpZF9taW5pbXVtX2luY3JlYXNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgwCiAgICAvLyByZXR1cm4gdGhpcy5oaWdoZXN0QmlkLnZhbHVlICsgdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwODIKICAgIC8vIHJldHVybiB0aGlzLnN0YXJ0aW5nQmlkLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NAogICAgLy8gc3RhcnRpbmdCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydGluZ0JpZCB9KQogICAgYnl0ZWMgNTAgLy8gInN0YXJ0aW5nX2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4MgogICAgLy8gcmV0dXJuIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3Quc2VuZFRvQWtpdGFFc2Nyb3coYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKc2VuZFRvQWtpdGFFc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHByb3RlY3RlZCBzZW5kVG9Ba2l0YUVzY3Jvdyhhc3NldDogQXNzZXQsIGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDcKICAgIC8vIGlmIChhbW91bnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ4CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUxCiAgICAvLyBjb25zdCBlc2Nyb3cgPSB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MQogICAgLy8gY29uc3QgZXNjcm93ID0gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MwogICAgLy8gaWYgKGFzc2V0LmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IGVzY3JvdywgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU4CiAgICAvLyBpZiAoZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGR1cAogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTkKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7IGFzc2V0UmVjZWl2ZXI6IGVzY3JvdywgYXNzZXRBbW91bnQ6IGFtb3VudCwgeGZlckFzc2V0OiBhc3NldCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA4OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlYyAyOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMTYKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDY0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAyMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OAogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDI5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2Mi02NQogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY0CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2Mi02NQogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweDNhYjI4OTViIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGFkZHJlc3MsYm9vbClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA1IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MQogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDExCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgPT0KICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOmVycldlc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2VzYwoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5OAogICAgLy8gW10KICAgIGJ5dGVjIDYxIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDQKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODkxCiAgICAvLyByZXR1cm4gZXNjcm93LmlzT3B0ZWRJbihhc3NldCkgPyAwIDogMQogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA4CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNQogICAgLy8gW2Fzc2V0LmlkXSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgYnl0ZWMgMzIgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNi0xMzIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI4CiAgICAvLyBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNy0xMzEKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNQogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMKICAgIC8vIHJldHVybiB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0LCBhbW91bnQpCiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAQAAEIIKCNBoAgrf7V5NSF/ahY////////////Ac+Cnrvv796CFNGCnrvv796CFNTeAf////8P1K+gBuSTArinA4y7BCZFCWFraXRhX2RhbwliaWRfYXNzZXQGYmlkX2lkB2JpZF9mZWUSd2VpZ2h0ZWRfYmlkX3RvdGFsBBUffHUId190b3RhbHMUcmFmZmxlX3ByaXplX2NsYWltZWQRd2VpZ2h0c19ib3hfY291bnQOd2lubmluZ190aWNrZXQFcHJpemUNZW5kX3RpbWVzdGFtcAFhAWIMcmFmZmxlX3JvdW5kDGlzX3ByaXplX2JveA1wcml6ZV9jbGFpbWVkBnNlbGxlcg1yYWZmbGVfd2lubmVyFHVuaXF1ZV9hZGRyZXNzX2NvdW50EXJlZnVuZF9tYnJfY3Vyc29yDGFraXRhX2VzY3JvdwtFUlI6ZXJySXBheQF3C2hpZ2hlc3RfYmlkA2FhbA9jcmVhdG9yX3JveWFsdHkVbWFya2V0cGxhY2Vfcm95YWx0aWVzAQAGd2FsbGV0DHJlZnVuZF9jb3VudA1yYWZmbGVfYW1vdW50AgABC0VSUjplcnJNYmZmD3N0YXJ0X3RpbWVzdGFtcAdnYXRlX2lkE2ZpbmRfd2lubmVyX2N1cnNvcnMLRVJSOmVyckFobmURdnJmX2ZhaWx1cmVfY291bnQLbWFya2V0cGxhY2UPc2VsbGVyX3JlZmVycmVyCG5mdF9mZWVzC0VSUjplcnJOYXBwC0VSUjplcnJQem5jAWwLRVJSOmVyck5kYW8LRVJSOmVyckl4ZnIDBoEBC0VSUjplcnJOY2xzC0VSUjplcnJOcmt5DHN0YXJ0aW5nX2JpZBRiaWRfbWluaW11bV9pbmNyZWFzZQZmdW5kZXIHdmVyc2lvbhAAAAAAAAAAAAAAAAAAAAABBHNhbHQLRVJSOmVyck5hcmMLRVJSOmVyclNoYmILRVJSOmVycldhZmQLRVJSOmVyclJhcGMDb2FsAgAAC0VSUjplcnJJcmJkC0VSUjplcnJXbmZkA3BhbAtFUlI6ZXJyQW5sdhJjb250cm9sbGVkX2FkZHJlc3MLRVJSOmVyckl3bHQFYXBwSUQxGEAALycmImcnHiJnJwQiZycYImcqI2cnHyJnJwciZycTImcnCCJnJxQjZycJImcnDiJnggMEJIfDLAQx8mqbBOqRgN02GgCOAwD8APAA5DEZFEQxGEEAzYIWBL1xSNAEJUT92ASYNsifBE1YVpcE93GTSwTZ9PA6BHaVKTEEueOcXARpZQHeBL0bJ9EE8s4vRgSdrwUKBGX8qYsEBeXeTQSPpKFgBGCCMDwEIIleJgSuhMvYBDPpLJQEhU3t4AQ+oRgyBHMREHA2GgCOFgSUBmEGlQa+BtgHGAdNB3MHoQqHC+cNhQ8AD1IQCBAYEDQQPxDCACoQ5QABAIAkFR98dQAAAAAAAInkAAAAAADIF9QAAAAAAABJ1AAAAAAAAEnUsCNDI0OABDTOx5g2GgCOAQKYADEZgQQSMRgQREIQMDEZgQUSMRgQREIFrzEZgQUSMRgQREIEyooCAIv+gQoISTIMDUEAKrGBBrIQgQWyGScvsh4nL7Ifi/+NAgALAASzQv/cMgCyAUL/9SKyAUL/74mKAQGL/4ESkYv/G4EbkSELGov/gTuRSpFMHCMeRQGBHxpPAkyQIQsaGYmKAQCL/zgJMgMSQAAEJzCwAIv/OCAyAxJAAAQnMbAAiYoDAIv+i/8TQQALi/0BgAEkTFCL/r+JiggCgAAii/lAAAWL/kABRyNEi/gnGWVIJFuL/CJZgdTFAQuB5KkDCEyL+UAAXbFJcghESwKL/QiyCLIHI7IQIrIBtov6Fov7Fk8CshiABNysCTWyGkyyGrIai/yyGov/shqBBrIQIrIBs7Q+SVcEAExXAAQnBRJESRUkEkQXTEwWTBZQi/xPA08DiUlyCESL+XAARQFBAItLAUsBcghMTgREIowAi/5BAApLAXIIRCOMAIwBsUsBcghETwOyCLIHI7IQIrIBtosAQQAEiwGyFYv5shGL/bISTwKyFIEEshAisgG2i/oWi/sWTwOyGIAEo6FsqrIaTLIashqL/LIai/+yGoEGshAisgGztD5JVwQATFcABCcFEkRJFSQSRBdMQv9cSwEyEAixSwFJcghEMhCyCLIHI7IQIrIBtov5FkyyGIAEOU6usrIashqBBrIQIrIBs0L/QyJC/raKBQGAAIv+QQBri/wyAxNBAGOL+4ALd2FsbGV0X2ZlZXNlSCRbSSEEDkSL/h0hBJdJjABAAAiL/kEAAyOMADIHSYGAmp4BCIsASU4CFov8TFAnIExQi/uL/U8FTwRPBEsFIov/iP4+SFcICIv+TwIJFkxQTImL/hYiFlBMiTYaAUkVJBJEFzYaAkkVIxJEIlM2GgNJFSQSRBc2GgRJFSQSRBdMNhoFSRUkEkQXTDYaBkkVJBJEF0w2GgdJFSQSRBdMNhoISRUkEkQXTDYaCUlOAhWBKBJENhoKSU4CFSUSRDYaC0kVJBJEF0w2GgxJFSQSRBdMNhoNSU4CFSUSRDYaDkkiWYECCEsBFRJEVwIANhoPSRVLASJZSYEiEkRPAkxLAlJJTgRJFUsBJFlJgQoSRExSSU4CSRVLASJZSYEKEkRMUiJZgTgIEkQ2Gg9JFUsBIllJgSISREsCTEsCUkkVSwEkWUmBChJETFJJFUsBIllJgQoSRExSIlmBOAgSRFcCIE4DMg1AAAQnIbAAJwpPEWcnD08QZycQImdLAkEAF0sCcQBEQAAPgAtFUlI6ZXJySWFzdLAAKU8DZytPDmcnMk8NZyczTwxnJyJPC2cnC08KZyc0TwlnJxFPCGcnGk8HZycjTwZnJydPBWcnKE8DZ08CIltJcghEMgMTQAAPgAtFUlI6ZXJySWFwcLAAKExnJxVMZyc1TGeBeK8nBkxnJyQnNmcnEjIDZyc3MRdnIihlRCcpZUiBSFsnG0xnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAAQnIbAAIitlREAABCcqsABJgQMPQAAPgAtFUlI6ZXJyTTNoYrAASYEPDkAAD4ALRVJSOmVyclRtd2KwAEkhDAtLAjgHMgoSQAAEJxawAE8COAgSQAAEJxawACJJSwIMQQARSRYnF0xQgYCAArlIIwhC/+hIJwhMZyNDMQAyCRJAAAQnIbAAIiplRCMNQQDAIiplRIECCSInHmVEEkAABCc4sAAiJxBlREAABCcrsAAiK2VEQQAIIicHZURBAI0jQAAPgAtFUlI6ZXJyUndoY7AAIiplRCInFGVEEkAABCc4sACIDndBAAQnObAAIicPZURAACIyCiInCmVEcABFAUEAFLEyCSInCmVEshGyFYEEshAisgGzIillREEAIDIKIillRHAARQFBABOxMgkiKWVEshGyFYEEshAisgGzsTIJsgkjshAisgGzI0MiQv9wIkL/QzEAMgkSQAAEJyGwADIHIiciZUQMQAAPgAtFUlI6ZXJyQWFzdLAAiA3gQQAEJzmwACInEWVEiAyvIillREEAE7EyCSIpZUSyEbIVgQSyECKyAbOxMgmyCSOyECKyAbMjQzEWgQIJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFSUSRDYaAkkVJBJEF08CIk8CiA3QiBKrI0MxFoECCUk4ECMSRDEWIwlJOBCBBhJENhoBSRUlEkRMIyKIDaeIEoIjQzEWIwlJOBAjEkQ2GgFJFSUSRIgQyYgSaCNDMRaBAwlJOBAjEkQxFoECCUk4EIEEEkQxFiMJSTgQgQYSRDYaAUkVJRJENhoCSRUkEkQXTwIiTwKIDU2IEocjQzEWgQMJSTgQIxJEMRaBAglJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFSUSREwjIogNGIgSUiNDMRaBAglJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJRJEiBAuiBIsI0M2GgFJFSQSRBeIEu5JVwAgTCVbIillREAADrGyCLIHI7IQIrIBsyNDiAvkQv/4IjIHIicLZUQNQAAEJyWwACIrZURAAAQnKrAAIicJZURBAA+AC0VSUjplcnJXYWRysAAiJxJlRDIDEkAABCc6sAAiJwdlREEABCc7sAAiJw5lREAAlyIqZUQjEkAAXiIqZUQjCRYnDUxQvkRXACAnDExQSUUCvUUBQQBBSb5EF0khBQpJFicXTFBPAiEFGCQLSiS6FyIWTwNPA08CuyInBmVETwIkC0pbSwMJFl0nBkxnIicEZURMCScETGciJwRlREAAESIpZUSIC6+IEsNIJwcjZyNDIicEZUQjEkEABycJI2dC/+2IEmRC/+cyBiInDmVEgQQID0AAD4ALRVJSOmVyck5ldG2wALEiJw5lRBYiJzdlREkVFlcGAkxQIihlRCc8ZUgiW7IYgAQYk5LFshpMshqyGoEGshAisgGztD5JVwQASwFXAAQnBRJESSJZgQIITBUSRFcGAEkVSUAAMUYCMgYiJw5lRIHoBwgPQAAPgAtFUlI6ZXJyQm5yZLAAIicmZUQjCCcmTGeIEb9C/0IiSwEPIksCTwJNgRBLAg+BEE8DTwJNUkkVgRASQAAPgAtFUlI6ZXJySXJzZLAASSJbIiEGHUUBSSEIHkUBTwIeRQEhBh1FASEIHk4CSE8CJFtMIQkeRQEeRQEhBh1FASEJHkUBTBZMFlAiJwRlTElPAkQhBwxBAAIjCCc9TgJJQQDNSSMNQAAEJz6wACMJSSMNQAAEJz6wAEcCHCMeRQFMGE4DIkxPAksCIwxBAIFJIltJTgUhBh1FASEIHklOAk4GSEwkW0xAAGGBooW89t7fvYUoTEkhBh1FAU8CHkUBTwUWTBZQTwWI9nwlkE8CiPZ1GRZQSVcAEE4EgRBbSUsGD0EAIEsBGCMIFk8DSSJZIwgWVwYAXABMUE4CTCMITE8DQv+DSE8DQv+EIQlC/6RFAUUBTwJIgAIAElBMUEmBEFlLARVSgQJbJwlMZ0L980ghB0L/Q4AARwQ2GgFJFSQSRBciK2VEQAAEJyqwADIHIicLZUQNQAAEJyWwACInCWVEQAAPgAtFUlI6ZXJyV25uZrAAIicSZUQyAxJAAAQnOrAAIickZURJIltMJFtFBkkhBRhAADVJIQUKSUUEIicIZUQMQQAlIicGZURLAyQLWyInCWVESwdPAghJRQcMQAAKIQUISwRFBkL/xBZLBRZQSSJbSU8CJFtFByInE2VED0EAEEgnCSJnJw4iZyckJzZnI0MiJxNlREsBSU4CCUlLBElOAw1MTgJNSUUETCEFGElFCSEFTAlJRQYNQQAESwNFAkkhBQoWJxdMUExLAoE8CyKI9NciTEsBSwQMQQBDSwhLAggkC0sDTCS6F0sISU8CCEwiJwllRA5BABsiJwllREsBDEEAEEsBSwMIFicsTFC+RCcSTGdPAiMITgJFCEL/tUUBRQFLAQgWSwUWUCckTGdC/1wiSYAARwM2GgFJFSQSRBciJxBlREAABCcrsAAiK2VEQQATIicSZUQyAxNAAAgiJwdlREEBZSNAAAQnP7AAIiplRCInFGVEE0AAD4ALRVJSOmVyckFyZmOwACInFGVMSU4CTgNEIiplREsBCUlPA0lOAw1MTgJNSU4CgaABCyKI8/YhDUxLA0sDCEsBDUEA/UkWJw1MUElOBL5ESYHABFNMVwAgTgUiRQtAABwiKmVEIwlLARNBABBJiA3LSVcAIEwlW4gHE0UKSwO8SCcMSwVQSb1FAUAAkUhLAUUJTwMBgAEkTFBJTgK+TE4FQABDRQFPA0hLBxZPBExQSVcAIEUKJVtJRQZLCA1BACFLBEsICUlFB0sJTIgGa0EAELFLBbIISwiyByOyECKyAbMjCEL/U0y8SEsIIQoIRQdLA3MARQFAAAhLBjIBD0EAGCNBAAxPBEhPA0sFFlBC/55PA0hPA0L/8SJC/+VJvkQXTLxIIQ5FChYnLExQSUUNvUUBQf9bSwu8SCEPRQlC/1BGAiInFGVECCcUTGcjQyJC/piAADIHIicLZUQNQAAEJyWwACInEGVEQQAPgAtFUlI6ZXJyUGFjbLAAIiplRCMSQQASIicRZUSIBSonECNnJwcjZyNDIiplRCMJFicNTFC+RElXACBLASVbTgJMVyggTgKIBQAiKWVEQACHiAOUSSJbRQNJJFtMSYEQW04CgRhbTgMiJw9lREEAZUsECElAADsiKWVETIgNFUgiJydlREsBiAVaiAVXIicRZURMiAVOIicPZURAAA0iJwplRHELREsBiAU5JxAjZ0L/diIoZUQiJyhlRCInFWVEgQJbcghETgIiTwRPBIjz5iJbQv+iQv+biAMNSSJbRQNJJFtMSYEQW04CgRhbTgMiJw9lREEAaEsECElAADsiKWVETIgMjkgiJydlREsBiAUQSIgFDEgiJxFlREyIBQJIIicPZURA/4MiJwplRHELREsBiATsSEL/ciIoZUQiJyhlRCIpZUQiJxVlRIECW3IIRE4DTwRPBIjzXCJbQv+fQv+YIicSZUQyAxNAAAQnP7AAIicHZURBAAQnO7AAiAT9IihlRCcpZUiBUFtJIQQOREsBHSEEl0xLAQkiKWVETwKIC/FIIicSZURMiAR0SCcHI2cjQzYaAUkVJBJEFzEAIicRZUQSQQCeIiplRCMSQQCVMgciJyJlRAxBAIojQAAyMgciJwtlRA1AAAQnJbAAIicQZURAAAQnK7AAIicHZURAAA+AC0VSUjplcnJSbnBjsABJgR4LIojwpiJJSwIMQQAWIicIZUQjCUsBCRYnF0xQvEgjCEL/40giJwhlREsBCScITGchDAuxIic0ZURXACBLAbIIsgcjshAisgGzFicFTFCwI0MiQv9ziArzJxwiTwJUJwVMULAjQzYaAUkVJRJEJwxMUL1FASccIk8CVCcFTFCwI0OICuEWJwVMULAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACIoZUQnHWVIcghEEkAABCctsAAnFUxnI0M2GgFJIlmBAghLARUSRFcCADEAIihlRCcdZUhyCEQSQAAEJy2wACIoZUQnQGVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJzVMZyNDNhoBSRUkEkQXMQAiKGVEJx1lSHIIRBJAAAQnLbAAKExnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAA+AC0VSUjplcnJGb3JisABLATgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATDgIMhASQAAPgAtFUlI6ZXJySXBtYbAAsTIKTLIRIrISshSBBLIQIrIBsyNDIiplREkjCCpMZ4mKAQEiK2VESSEEDkSL/x0hBJdJQAAPIitlREEACIv/QQADI0yJiYoBAYAARwQiSScaZURBACYiJxplREkhBA5Ei/8dIQSXSYwFQAAQIicaZURBAAiL/0EAAyOMBSIoZUQnKWVISYE4W4wEgUBbSYwDIowAIowBQQBvIihlRCInEWVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwUSREkVJBJEF0kjDUEAxyMJiwNJiwQJTwILgegHCglJjAFJIQQORIv/HSEEl0mMAEAACIv/QQADI4wAIowCIicbZURBACYiJxtlREkhBA5Ei/8dIQSXSYwCQAAQIicbZURBAAiL/0EAAyOMAosFiwAIgQKLAgsIi/8NQQAzIicaZURJIQQORIv/HSEEl4wFiwFJIQQORIv/HSEEl4wAIicbZURJIQQORIv/HSEEl4wCiwVJiwBJTgMIgQKLAklOBQsIi/9MCUwWTwIWUE8CFlBMFlCMAIlII0L/NooBACInD2VEQQAdsSInCmVEshiABK35KuSyGov/shqBBrIQIrIBs4kyCiInCmVETEsBcABITIv/THAARQFBABZIsSInCmVEshGL/7IVgQSyECKyAbOJIihlRCInCmVETwJJTgIWi/9MUCcgTFAyA08ETwMiIQdPBU8GI08HiO2RRgKJigIBi/5zAEhAAAiL/zIBD0EAAiOJIomKAgAiKWVEQAAbi/6L/4j/2EEAELGL/7IIi/6yByOyECKyAbOJsSIpZUSyEYv/shKL/rIUgQSyECKyAbOJigIBIillREEADiIpZUSL/kxwAEUBQQAJi/6L/4j/pCKJIihlRCIpZUSL/xaL/kxQJyBMUDIDTwNPAyIhB08Fi/8iTweI7PNIJFuJIicIZUUBQQAGIicIZUSJIokiJx9lRCInGGVEiP04CYkiK2VEQQAuIiplRCMNQQAlIiplRCMJFicNTFC+RFcAIDEAE0AAD4ALRVJSOmVyckNvYnOwAImKAwAiRwSAAEcCiAaRQAAEJ0GwAIv+QQFOIihlRDEASwEnPGVIgRhbTwInGWVIgVhbjAaxshiABDwabzOyGrIagQayECKyAbO0PklXBABLAVcABCcFEkRJIlmBAghMFRJEVwYASRUkE0EAxEgijAcxAIsHQABtjAMiKGVEIicjZUyMBUSL/TgYTCcZZUiBKFsSQQBLi/04GUAARIv9OBuBBBJBADqL/TkaAIAEQ5ImVRJBACuL/TkaAYsDEkEAIIv9ORoCiwUWEkEAFCNAAA+AC0VSUjplcnJGZ3RlsACJIkL/6YsHJ0JlTE4CQQA9SwEVJRJBADUjQAAEJ0OwAIsHcghESwITQQAcSwExABNBABRLAXMCRIsHcghEE0EABowDSEL/U0iMA0L/TSJC/8gXSYz/QQAFiwZAAAwiIov/TwJNjAdC/yiL/3IHTIwBQQASiwYWJ0RMUAOLARJBAAQjQv/ZIkL/1SIoZUxJTwJEJxllSIFYW4wGMQAyDTIOjACL/0AAgkgyA0kiFk8DSU4CUE8DUExQTFAnHFBJVwggSwFXAAhPAldIIE4CUExQjAIiJyNlTIwFRIv9OBhMJxllSIEoWxJBADuL/TgZQAA0i/04G4EEEkEAKov9ORoAgASbFH0sEkEAG4v9ORoBiwISQQAQi/05GgKLBRYSQQAEI0L+ySJC/sWL/0EABYsGQAELIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEVFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMBEEAF4sEFSUSQQAPiwRLARJBAAdJiwATQAAPgAtFUlI6ZXJySG5iZLAAI0yL/ydCZUEAB0kVJRJAAAQnQ7AASUsCEkEATyNMi/+ACHJlZmVycmVyZUEANUkVJRJBAC5OA0sCSwFPA0lOA01MQQAXTIv/Fk8CUExQTFBMUCccIk8DVFBC/rxFATIDQv/jSDIDTgNC/8yL/3IITE4CQAAHRQEiTEL/oklLAhJBAAtMcwJIMgMSTEL/kElzAkhPAhJMQv+Fi/9yB0yMAUEAEosGFidETFADiwESQQAEI0L+2iJC/taIA19AAAQnQbAAIicjZURBAA+AC0VSUjplcnJIZ3RlsACJigABgAAhDScMMQBQvUUBQQAGjACLAEyJSCEOjAAiK2VEQf/wIQ+MAEL/6YoDADEAi/4WSU4CUIv/UCccUIv9FicNTFBMvyIrZURBARwnDDEAUL1FAUEAiCcMMQBQvkQXSSEFCkkWJxdMUE8CIQUYJAtKJLoXi/5MCSInBmVETwQkC0xLAVsiJwRlREsDCCcETGdPBE8ETwW7TwIIFiInBmVETgJdJwZMZzIHIicLZUSBeAkNQQANIicLZUSBrAIIJwtMZyIrZURBAA+L/oj40iInH2VECCcfTGcnGIv+Z4kiJxNlTElPAkQiJwhlRCEFCwxAAA+AC0VSUjplcnJUbXB0sAAiJwZlREsBIQUKSSQLTwJLAVsiJwRlRIv+CCcETGcnDDEAUEsEFkxLAb9PAxYnF0xQTwQhBRgkC08Fu0yL/ggWIicGZURPA08CXScGTGcxACcsTwJQTL8iJxNlRCMIJxNMZ0L/QEgnDDEAUL1FAUD/NCcMMQBQIha/Qv8pigIAi/6I53yI+uGI+AmI/m+L/jgASU4CMQASIQoiTwJNCIgBtYv+OAcyChJAAAQnFrAAi/44CElPAksDCA9AAAQnFrAATAlPAklPAov/iP5aFicNTFAxAExOAojnRomKAwCL/YjnHTEAi/44ABJAAA+AC0VSUjplcnJJcG1zsACL/jgTMgMSQAAPgAtFUlI6ZXJyTmNsd7AAi/44FTIDEkAABCcwsACL/jggMgMSQAAEJzGwAIj6NIj3XIj9wov9OABJTgMxABIhCiJPAk0Ii/04BzIKEkAABCcWsACL/TgIEkAABCcWsACL/jgSiADqi/44FDIKEkAABCcusABLAQ5AAAQnLrAAi/44ESIpZUQSQAAEJy6wAExJTwKL/4j9ihYnDUxQMQBMTgKI5naJigEBIiplRCMJi/8NQAAPgAtFUlI6ZXJyQ3JtcrAAi/8WJw1MUEm9RQFAAA+AC0VSUjplcnJCbmZksABJvkRJgcAEU0sBJVtOA0xXACBMQQAPgAtFUlI6ZXJyQmFyZrAATEmBSCO6IiNUgUhMu0xJiPaBCSInHmVEIwgnHkxnFlCJMgaBEAgjCSQKJAsnDkxniTIHIiciZUQPQQANMgciJwtlRA5BAAIjiSKJIicYZURBAAwiJxhlRCInM2VECIkiJzJlRImKAgGAAIv/QAADIkyJIicVZUSBAltyCESL/kAAEbGL/7IIsgcjshAisgGzIkyJSYv+cABFAUEAFrGL/rIRi/+yErIUgQSyECKyAbMiTIlIIihlREknHWVITEknQGVISVcICE4CJFtOAyInFWVMSU4CTgNESSJZSwEVUklOA1cCAEwnHWVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEJwUSREkiWYEpC4ECCEwVEkRXBikiW0lAAA+AC0VSUjplcnJOZXNjsABPAoECW0mMABJAAA+AC0VSUjplcnJXZXNjsACxTwNJshiABFrfM4+yGk8DshpMshpMshqACgABAAAAAAAAAACyGic9shqBBrIQIrIBIihlRQFEiwBJcghEi/5wAEUBFDIQC0lOA7ZMcghEsgeyCCOyECKyAbZJFov+FicgTFBPBLIYgARoNeO8shpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAYv/QQAXtosAcghEi/6yEYv/shKyFIEEshAisgGzTIk=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var AuctionParamsFactory = class _AuctionParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void":
            return _AuctionParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void",
          args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.isPrizeBox, params.args.bidAsset, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.funder, params.args.seller, params.args.creatorRoyalty, params.args.gateId, params.args.marketplace, params.args.version, params.args.akitaConfig, params.args.sellerReferrer]
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
            return _AuctionParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the Auction smart contract using the update(string)void ABI method
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
            return _AuctionParamsFactory.delete.deleteApplication(params);
          case "cancel":
          case "cancel()void":
            return _AuctionParamsFactory.delete.cancel(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs delete ABI call params for the Auction smart contract using the deleteApplication()void ABI method
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
      },
      /**
       * Constructs delete ABI call params for the Auction smart contract using the cancel()void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      cancel(params) {
        return {
          ...params,
          method: "cancel()void",
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
     * Constructs a no op call for the gatedBid(pay,appl,address,uint64)void ABI method
     *
    * Gated bid (principal ABI, spec §6.6). The gate subject is the verified context of the bidder's
    `wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A
    plugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedBidPayApplAddressUint64Void(params) {
    return {
      ...params,
      method: "gatedBid(pay,appl,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.marketplace, params.args.wallet]
    };
  }
  /**
     * Constructs a no op call for the gatedBid(pay,appl,address)void ABI method
     *
    * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`
    with its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).
    Kept for old plugins and SDKs during the compatibility window.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static gatedBidPayApplAddressVoid(params) {
    return {
      ...params,
      method: "gatedBid(pay,appl,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.gateTxn, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the bid(pay,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static bid(params) {
    return {
      ...params,
      method: "bid(pay,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the gatedBidAsa(pay,axfer,appl,address,uint64)void ABI method
   *
   * ASA twin of `gatedBid` (principal ABI, spec §6.6).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedBidAsaPayAxferApplAddressUint64Void(params) {
    return {
      ...params,
      method: "gatedBidAsa(pay,axfer,appl,address,uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.gateTxn, params.args.marketplace, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the gatedBidAsa(pay,axfer,appl,address)void ABI method
   *
   * LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedBidAsaPayAxferApplAddressVoid(params) {
    return {
      ...params,
      method: "gatedBidAsa(pay,axfer,appl,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.gateTxn, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the bidAsa(pay,axfer,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static bidAsa(params) {
    return {
      ...params,
      method: "bidAsa(pay,axfer,address)void",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.marketplace]
    };
  }
  /**
   * Constructs a no op call for the refundBid(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static refundBid(params) {
    return {
      ...params,
      method: "refundBid(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.id]
    };
  }
  /**
     * Constructs a no op call for the raffle()void ABI method
     *
    * Loser-raffle draw, commit-reveal (AR-01):
    - first call after the end freezes the eligible weight (AR-02) and commits to a
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
   * Constructs a no op call for the claimPrize()void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static claimPrize(params) {
    return {
      ...params,
      method: "claimPrize()void",
      args: Array.isArray(params.args) ? params.args : []
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
   * Constructs a no op call for the clearWeightsBoxes(uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static clearWeightsBoxes(params) {
    return {
      ...params,
      method: "clearWeightsBoxes(uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.iterationAmount]
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
   * Constructs a no op call for the hasBid(address)bool ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static hasBid(params) {
    return {
      ...params,
      method: "hasBid(address)bool",
      args: Array.isArray(params.args) ? params.args : [params.args.address]
    };
  }
  /**
   * Constructs a no op call for the getMinimumBidAmount()uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static getMinimumBidAmount(params) {
    return {
      ...params,
      method: "getMinimumBidAmount()uint64",
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
  /**
   * Constructs a no op call for the mbr()(uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr()(uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
};
var AuctionFactory = (_class = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `AuctionFactory`
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
    return new AuctionClient(this.appFactory.getAppClientById(params));
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
    return new AuctionClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the Auction smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b, _c;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? AuctionParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? AuctionParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0,
      deleteParams: ((_c = params.deleteParams) == null ? void 0 : _c.method) ? AuctionParamsFactory.delete._resolveByMethod(params.deleteParams) : params.deleteParams ? params.deleteParams : void 0
    });
    return { result: result.result, appClient: new AuctionClient(result.appClient) };
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
       * Creates a new instance of the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(AuctionParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the Auction smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(AuctionParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available deployDelete methods
     */
    deployDelete: {
      /**
       * Deletes an existing instance of the Auction smart contract using the deleteApplication()void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployDelete params
       */
      deleteApplication: (params = { args: [] }) => {
        return this.appFactory.params.deployDelete(AuctionParamsFactory.delete.deleteApplication(params));
      },
      /**
             * Deletes an existing instance of the Auction smart contract using the cancel()void ABI method.
             *
            * deletes the application & returns the mbr + asset
            to the seller IF the auction hasn't started
      
             *
             * @param params The params for the smart contract call
             * @returns The deployDelete params
             */
      cancel: (params = { args: [] }) => {
        return this.appFactory.params.deployDelete(AuctionParamsFactory.delete.cancel(params));
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
       * Creates a new instance of the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(AuctionParamsFactory.create.create(params));
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
       * Creates a new instance of the Auction smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)),address)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(AuctionParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new AuctionClient(result.appClient) };
      }
    }
  }}
}, _class);
var AuctionClient = (_class2 = class _AuctionClient {
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
   * Returns a new `AuctionClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AuctionClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC }));
  }
  /**
   * Returns an `AuctionClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AuctionClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC }));
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
       * Updates an existing instance of the Auction smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(AuctionParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Auction smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete params
       */
      deleteApplication: (params = { args: [] }) => {
        return this.appClient.params.delete(AuctionParamsFactory.delete.deleteApplication(params));
      },
      /**
             * Deletes an existing instance of the Auction smart contract using the `cancel()void` ABI method.
             *
            * deletes the application & returns the mbr + asset
            to the seller IF the auction hasn't started
      
             *
             * @param params The params for the smart contract call
             * @returns The delete params
             */
      cancel: (params = { args: [] }) => {
        return this.appClient.params.delete(AuctionParamsFactory.delete.cancel(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Auction smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
     * Makes a call to the Auction smart contract using the `init(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    init: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.init(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address,uint64)void` ABI method.
         *
        * Gated bid (principal ABI, spec §6.6). The gate subject is the verified context of the bidder's
        `wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A
        plugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedBidPayApplAddressUint64Void: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.gatedBidPayApplAddressUint64Void(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address)void` ABI method.
         *
        * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`
        with its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).
        Kept for old plugins and SDKs during the compatibility window.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    gatedBidPayApplAddressVoid: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.gatedBidPayApplAddressVoid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `bid(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    bid: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.bid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address,uint64)void` ABI method.
     *
     * ASA twin of `gatedBid` (principal ABI, spec §6.6).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedBidAsaPayAxferApplAddressUint64Void: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.gatedBidAsaPayAxferApplAddressUint64Void(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address)void` ABI method.
     *
     * LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedBidAsaPayAxferApplAddressVoid: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.gatedBidAsaPayAxferApplAddressVoid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `bidAsa(pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    bidAsa: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.bidAsa(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `refundBid(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    refundBid: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.refundBid(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `raffle()void` ABI method.
         *
        * Loser-raffle draw, commit-reveal (AR-01):
        - first call after the end freezes the eligible weight (AR-02) and commits to a
         beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
        - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
        - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
         BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    raffle: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.raffle(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `findWinner(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    findWinner: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.findWinner(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `refundMBR(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    refundMbr: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.refundMbr(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `claimPrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    claimPrize: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.claimPrize(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `claimRafflePrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    claimRafflePrize: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.claimRafflePrize(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `clearWeightsBoxes(uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    clearWeightsBoxes: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.clearWeightsBoxes(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `isLive()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean of whether the auction is live
     */
    isLive: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.isLive(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `hasBid(address)bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params: a boolean of whether the address has bid in the auction
     */
    hasBid: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.hasBid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `getMinimumBidAmount()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    getMinimumBidAmount: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.getMinimumBidAmount(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optin: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.optin(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.mbr(params));
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
       * Updates an existing instance of the Auction smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(AuctionParamsFactory.update.update(params));
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Auction smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete transaction
       */
      deleteApplication: (params = { args: [] }) => {
        return this.appClient.createTransaction.delete(AuctionParamsFactory.delete.deleteApplication(params));
      },
      /**
             * Deletes an existing instance of the Auction smart contract using the `cancel()void` ABI method.
             *
            * deletes the application & returns the mbr + asset
            to the seller IF the auction hasn't started
      
             *
             * @param params The params for the smart contract call
             * @returns The delete transaction
             */
      cancel: (params = { args: [] }) => {
        return this.appClient.createTransaction.delete(AuctionParamsFactory.delete.cancel(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Auction smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
     * Makes a call to the Auction smart contract using the `init(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    init: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.init(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address,uint64)void` ABI method.
         *
        * Gated bid (principal ABI, spec §6.6). The gate subject is the verified context of the bidder's
        `wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A
        plugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedBidPayApplAddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.gatedBidPayApplAddressUint64Void(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address)void` ABI method.
         *
        * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`
        with its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).
        Kept for old plugins and SDKs during the compatibility window.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    gatedBidPayApplAddressVoid: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.gatedBidPayApplAddressVoid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `bid(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    bid: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.bid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address,uint64)void` ABI method.
     *
     * ASA twin of `gatedBid` (principal ABI, spec §6.6).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedBidAsaPayAxferApplAddressUint64Void: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.gatedBidAsaPayAxferApplAddressUint64Void(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address)void` ABI method.
     *
     * LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedBidAsaPayAxferApplAddressVoid: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.gatedBidAsaPayAxferApplAddressVoid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `bidAsa(pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    bidAsa: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.bidAsa(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `refundBid(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    refundBid: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.refundBid(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `raffle()void` ABI method.
         *
        * Loser-raffle draw, commit-reveal (AR-01):
        - first call after the end freezes the eligible weight (AR-02) and commits to a
         beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
        - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
        - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
         BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    raffle: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.raffle(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `findWinner(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    findWinner: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.findWinner(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `refundMBR(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    refundMbr: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.refundMbr(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `claimPrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    claimPrize: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.claimPrize(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `claimRafflePrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    claimRafflePrize: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.claimRafflePrize(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `clearWeightsBoxes(uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    clearWeightsBoxes: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.clearWeightsBoxes(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `isLive()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean of whether the auction is live
     */
    isLive: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.isLive(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `hasBid(address)bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction: a boolean of whether the address has bid in the auction
     */
    hasBid: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.hasBid(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `getMinimumBidAmount()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    getMinimumBidAmount: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.getMinimumBidAmount(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optin: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.optin(params));
    },
    /**
     * Makes a call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.mbr(params));
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
       * Updates an existing instance of the Auction smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(AuctionParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Gets available delete methods
     */
    delete: {
      /**
       * Deletes an existing instance of the Auction smart contract using the `deleteApplication()void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The delete result
       */
      deleteApplication: async (params = { args: [] }) => {
        const result = await this.appClient.send.delete(AuctionParamsFactory.delete.deleteApplication(params));
        return { ...result, return: result.return };
      },
      /**
             * Deletes an existing instance of the Auction smart contract using the `cancel()void` ABI method.
             *
            * deletes the application & returns the mbr + asset
            to the seller IF the auction hasn't started
      
             *
             * @param params The params for the smart contract call
             * @returns The delete result
             */
      cancel: async (params = { args: [] }) => {
        const result = await this.appClient.send.delete(AuctionParamsFactory.delete.cancel(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the Auction smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
     * Makes a call to the Auction smart contract using the `init(pay,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    init: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.init(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address,uint64)void` ABI method.
         *
        * Gated bid (principal ABI, spec §6.6). The gate subject is the verified context of the bidder's
        `wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A
        plugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedBidPayApplAddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.gatedBidPayApplAddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address)void` ABI method.
         *
        * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`
        with its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).
        Kept for old plugins and SDKs during the compatibility window.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    gatedBidPayApplAddressVoid: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.gatedBidPayApplAddressVoid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `bid(pay,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    bid: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.bid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address,uint64)void` ABI method.
     *
     * ASA twin of `gatedBid` (principal ABI, spec §6.6).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedBidAsaPayAxferApplAddressUint64Void: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.gatedBidAsaPayAxferApplAddressUint64Void(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address)void` ABI method.
     *
     * LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedBidAsaPayAxferApplAddressVoid: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.gatedBidAsaPayAxferApplAddressVoid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `bidAsa(pay,axfer,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    bidAsa: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.bidAsa(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `refundBid(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    refundBid: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.refundBid(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Auction smart contract using the `raffle()void` ABI method.
         *
        * Loser-raffle draw, commit-reveal (AR-01):
        - first call after the end freezes the eligible weight (AR-02) and commits to a
         beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet
        - a later call (BEACON_LAG_ROUNDS after that round) draws the ticket
        - an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after
         BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    raffle: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.raffle(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `findWinner(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    findWinner: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.findWinner(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `refundMBR(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    refundMbr: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.refundMbr(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `claimPrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    claimPrize: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.claimPrize(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `claimRafflePrize()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    claimRafflePrize: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.claimRafflePrize(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `clearWeightsBoxes(uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    clearWeightsBoxes: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.clearWeightsBoxes(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `isLive()bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean of whether the auction is live
     */
    isLive: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.isLive(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `hasBid(address)bool` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result: a boolean of whether the address has bid in the auction
     */
    hasBid: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.hasBid(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `getMinimumBidAmount()uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    getMinimumBidAmount: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.getMinimumBidAmount(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `optin(pay,uint64)void` ABI method.
     *
     * optin tells the contract to opt into an asa
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optin: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.optin(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.mbr(params));
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
    return new _AuctionClient(this.appClient.clone(params));
  }
  /**
   * Makes a readonly (simulated) call to the Auction smart contract using the `isLive()bool` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: a boolean of whether the auction is live
   */
  async isLive(params = { args: [] }) {
    const result = await this.appClient.send.call(AuctionParamsFactory.isLive(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Auction smart contract using the `hasBid(address)bool` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result: a boolean of whether the address has bid in the auction
   */
  async hasBid(params) {
    const result = await this.appClient.send.call(AuctionParamsFactory.hasBid(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Auction smart contract using the `getMinimumBidAmount()uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async getMinimumBidAmount(params = { args: [] }) {
    const result = await this.appClient.send.call(AuctionParamsFactory.getMinimumBidAmount(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mbr(params = { args: [] }) {
    const result = await this.appClient.send.call(AuctionParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current Auction app
   */
  __init7() {this.state = {
    /**
     * Methods to access global state for the current Auction app
     */
    global: {
      /**
       * Get all current keyed values from global state
       */
      getAll: async () => {
        const result = await this.appClient.state.global.getAll();
        return {
          prize: result.prize,
          isPrizeBox: result.isPrizeBox,
          prizeClaimed: result.prizeClaimed,
          bidAsset: result.bidAsset,
          bidFee: result.bidFee,
          startingBid: result.startingBid,
          bidMinimumIncrease: result.bidMinimumIncrease,
          startTimestamp: result.startTimestamp,
          endTimestamp: result.endTimestamp,
          seller: result.seller,
          creatorRoyalty: result.creatorRoyalty,
          marketplace: result.marketplace,
          marketplaceRoyalties: result.marketplaceRoyalties,
          gateId: result.gateID,
          vrfFailureCount: result.vrfFailureCount,
          refundCount: result.refundCount,
          bidTotal: result.bidTotal,
          weightedBidTotal: result.weightedBidTotal,
          highestBid: result.highestBid,
          bidId: result.bidID,
          raffleAmount: result.raffleAmount,
          rafflePrizeClaimed: result.rafflePrizeClaimed,
          uniqueAddressCount: result.uniqueAddressCount,
          weightsBoxCount: result.weightsBoxCount,
          weightTotals: result.weightTotals,
          findWinnerCursors: result.findWinnerCursors,
          refundMbrCursor: result.refundMBRCursor,
          winningTicket: result.winningTicket,
          raffleWinner: result.raffleWinner,
          salt: new BinaryStateValue(result.salt),
          raffleRound: result.raffleRound,
          sellerReferrer: result.sellerReferrer,
          akitaDaoEscrow: result.akitaDAOEscrow,
          version: result.version,
          akitaDao: result.akitaDAO,
          funder: result.funder
        };
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
       * Get the current value of the bidAsset key in global state
       */
      bidAsset: async () => {
        return await this.appClient.state.global.getValue("bidAsset");
      },
      /**
       * Get the current value of the bidFee key in global state
       */
      bidFee: async () => {
        return await this.appClient.state.global.getValue("bidFee");
      },
      /**
       * Get the current value of the startingBid key in global state
       */
      startingBid: async () => {
        return await this.appClient.state.global.getValue("startingBid");
      },
      /**
       * Get the current value of the bidMinimumIncrease key in global state
       */
      bidMinimumIncrease: async () => {
        return await this.appClient.state.global.getValue("bidMinimumIncrease");
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
       * Get the current value of the creatorRoyalty key in global state
       */
      creatorRoyalty: async () => {
        return await this.appClient.state.global.getValue("creatorRoyalty");
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
       * Get the current value of the gateID key in global state
       */
      gateId: async () => {
        return await this.appClient.state.global.getValue("gateID");
      },
      /**
       * Get the current value of the vrfFailureCount key in global state
       */
      vrfFailureCount: async () => {
        return await this.appClient.state.global.getValue("vrfFailureCount");
      },
      /**
       * Get the current value of the refundCount key in global state
       */
      refundCount: async () => {
        return await this.appClient.state.global.getValue("refundCount");
      },
      /**
       * Get the current value of the bidTotal key in global state
       */
      bidTotal: async () => {
        return await this.appClient.state.global.getValue("bidTotal");
      },
      /**
       * Get the current value of the weightedBidTotal key in global state
       */
      weightedBidTotal: async () => {
        return await this.appClient.state.global.getValue("weightedBidTotal");
      },
      /**
       * Get the current value of the highestBid key in global state
       */
      highestBid: async () => {
        return await this.appClient.state.global.getValue("highestBid");
      },
      /**
       * Get the current value of the bidID key in global state
       */
      bidId: async () => {
        return await this.appClient.state.global.getValue("bidID");
      },
      /**
       * Get the current value of the raffleAmount key in global state
       */
      raffleAmount: async () => {
        return await this.appClient.state.global.getValue("raffleAmount");
      },
      /**
       * Get the current value of the rafflePrizeClaimed key in global state
       */
      rafflePrizeClaimed: async () => {
        return await this.appClient.state.global.getValue("rafflePrizeClaimed");
      },
      /**
       * Get the current value of the uniqueAddressCount key in global state
       */
      uniqueAddressCount: async () => {
        return await this.appClient.state.global.getValue("uniqueAddressCount");
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
       * Get the current value of the winningTicket key in global state
       */
      winningTicket: async () => {
        return await this.appClient.state.global.getValue("winningTicket");
      },
      /**
       * Get the current value of the raffleWinner key in global state
       */
      raffleWinner: async () => {
        return await this.appClient.state.global.getValue("raffleWinner");
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
     * Methods to access box state for the current Auction app
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
       * Get values from the bids map in box state
       */
      bids: {
        /**
         * Get all current values of the bids map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("bids");
        },
        /**
         * Get a current value of the bids map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("bids", key);
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
       * Get values from the bidsByAddress map in box state
       */
      bidsByAddress: {
        /**
         * Get all current values of the bidsByAddress map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("bidsByAddress");
        },
        /**
         * Get a current value of the bidsByAddress map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("bidsByAddress", key);
        }
      },
      /**
       * Get values from the locations map in box state
       */
      locations: {
        /**
         * Get all current values of the locations map in box state
         */
        getMap: async () => {
          return await this.appClient.state.box.getMap("locations");
        },
        /**
         * Get a current value of the locations map by key from box state
         */
        value: async (key) => {
          return await this.appClient.state.box.getMapValue("locations", key);
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
       * Add a init(pay,uint64)void method call against the Auction contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedBid(pay,appl,address,uint64)void method call against the Auction contract
       */
      gatedBidPayApplAddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBidPayApplAddressUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedBid(pay,appl,address)void method call against the Auction contract
       */
      gatedBidPayApplAddressVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBidPayApplAddressVoid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a bid(pay,address)void method call against the Auction contract
       */
      bid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.bid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedBidAsa(pay,axfer,appl,address,uint64)void method call against the Auction contract
       */
      gatedBidAsaPayAxferApplAddressUint64Void(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBidAsaPayAxferApplAddressUint64Void(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a gatedBidAsa(pay,axfer,appl,address)void method call against the Auction contract
       */
      gatedBidAsaPayAxferApplAddressVoid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBidAsaPayAxferApplAddressVoid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a bidAsa(pay,axfer,address)void method call against the Auction contract
       */
      bidAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.bidAsa(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a refundBid(uint64)void method call against the Auction contract
       */
      refundBid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.refundBid(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a raffle()void method call against the Auction contract
       */
      raffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.raffle(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a findWinner(uint64)void method call against the Auction contract
       */
      findWinner(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.findWinner(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a refundMBR(uint64)void method call against the Auction contract
       */
      refundMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.refundMbr(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a claimPrize()void method call against the Auction contract
       */
      claimPrize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimPrize(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a claimRafflePrize()void method call against the Auction contract
       */
      claimRafflePrize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimRafflePrize(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a clearWeightsBoxes(uint64)uint64 method call against the Auction contract
       */
      clearWeightsBoxes(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.clearWeightsBoxes(params)));
        resultMappers.push((v) => client.decodeReturnValue("clearWeightsBoxes(uint64)uint64", v));
        return this;
      },
      /**
       * Add a isLive()bool method call against the Auction contract
       */
      isLive(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isLive(params)));
        resultMappers.push((v) => client.decodeReturnValue("isLive()bool", v));
        return this;
      },
      /**
       * Add a hasBid(address)bool method call against the Auction contract
       */
      hasBid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.hasBid(params)));
        resultMappers.push((v) => client.decodeReturnValue("hasBid(address)bool", v));
        return this;
      },
      /**
       * Add a getMinimumBidAmount()uint64 method call against the Auction contract
       */
      getMinimumBidAmount(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getMinimumBidAmount(params)));
        resultMappers.push((v) => client.decodeReturnValue("getMinimumBidAmount()uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Auction contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Auction contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the Auction contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optin(pay,uint64)void method call against the Auction contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64,uint64) method call against the Auction contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr()(uint64,uint64,uint64,uint64)", v));
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
          },
          cancel: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.cancel(params)));
            resultMappers.push(void 0);
            return this;
          }
        };
      },
      /**
       * Add a clear state call to the Auction contract
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

// src/auction/factory.ts


// src/generated/AuctionFactoryClient.ts





var APP_SPEC2 = { "name": "AuctionFactory", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New ASA-prize auction (principal ABI, spec \xA76.6). The seller stays `Txn.sender`; `wallet` is the\nseller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here\n(invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the\nchild pays at settlement. The +50,000 \xB5A global is part of `newAuctionCost`, and so is the DAO's\nauction creation fee.", "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (spec \xA77.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.\nThe child gets `seller_referrer` = the seller's registry referrer, resolved at creation.", "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New prize-box auction (principal ABI, spec \xA76.6); see `newAuction`.", "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation).", "events": [], "recommendations": {} }, { "name": "deleteAuctionApp", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancelAuction", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuctionCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "prizeAssetID" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee\nplus the storage costs of the child. Only the storage part is the funder's refundable deposit.", "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [627, 2616, 3230], "errorMessage": "Bytes has valid prefix" }, { "pc": [3336, 4142], "errorMessage": "ERR:errBinc" }, { "pc": [4085], "errorMessage": "ERR:errBmpt" }, { "pc": [510, 2322, 3363, 4169], "errorMessage": "ERR:errCnst" }, { "pc": [3352, 4158], "errorMessage": "ERR:errEmfm" }, { "pc": [885], "errorMessage": "ERR:errHnbd" }, { "pc": [789], "errorMessage": "ERR:errHnwl" }, { "pc": [808], "errorMessage": "ERR:errHtop" }, { "pc": [2311], "errorMessage": "ERR:errIcor" }, { "pc": [3489, 3506, 4262, 4279], "errorMessage": "ERR:errIpay" }, { "pc": [2466], "errorMessage": "ERR:errIpma" }, { "pc": [2436], "errorMessage": "ERR:errIpmr" }, { "pc": [2997], "errorMessage": "ERR:errIupg" }, { "pc": [936], "errorMessage": "ERR:errIwlt" }, { "pc": [3520, 3556, 3570], "errorMessage": "ERR:errIxfr" }, { "pc": [1763, 1862], "errorMessage": "ERR:errNauc" }, { "pc": [2162, 2353, 2923, 2965, 3033], "errorMessage": "ERR:errNdao" }, { "pc": [2652], "errorMessage": "ERR:errNesc" }, { "pc": [3399, 4202], "errorMessage": "ERR:errNopt" }, { "pc": [1778, 1877, 4133], "errorMessage": "ERR:errNpbo" }, { "pc": [3542], "errorMessage": "ERR:errPiba" }, { "pc": [3609], "errorMessage": "ERR:errPszb" }, { "pc": [4755], "errorMessage": "ERR:errPtlg" }, { "pc": [3066], "errorMessage": "ERR:errSbrq" }, { "pc": [3089], "errorMessage": "ERR:errTmwb" }, { "pc": [2678], "errorMessage": "ERR:errWesc" }, { "pc": [3110], "errorMessage": "ERR:errWnbf" }, { "pc": [1783, 1788, 1882, 1887, 4785, 4806], "errorMessage": "account funded" }, { "pc": [696, 1753, 1852, 2192, 2345, 2402, 2740, 2758, 2854, 2915, 2957, 3025, 3148, 3839, 3860, 3898, 3926, 3971, 4100, 4112, 4510, 4532, 4559, 4604], "errorMessage": "application exists" }, { "pc": [539, 3574, 3584], "errorMessage": "asset exists" }, { "pc": [1327, 1608, 2007, 2066, 2094, 2141, 2338, 2391, 2397, 2510, 2541, 2735, 2845, 2849, 2908, 2950, 2969, 3018, 3114, 3143, 3170, 3413, 3613, 3677, 3689, 3693, 4022, 4089, 4283, 4347, 4359, 4363, 4647], "errorMessage": "check GlobalState exists" }, { "pc": [4114], "errorMessage": "errNapb" }, { "pc": [520, 630, 1099, 1115, 1156, 1207, 1223, 1372, 1388, 2118, 2212, 2619, 2897, 2934, 3233], "errorMessage": "invalid array length header" }, { "pc": [1948], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1106, 1122, 1214, 1379, 2125, 2219, 2941], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1233, 1398], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [2628], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1305, 1470, 1586, 1718], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1133, 1241, 1250, 1259, 1268, 1277, 1286, 1295, 1313, 1322, 1406, 1415, 1424, 1433, 1442, 1451, 1460, 1478, 1522, 1531, 1540, 1549, 1558, 1567, 1576, 1594, 1603, 1654, 1663, 1672, 1681, 1690, 1699, 1708, 1726, 1748, 1847, 1959, 1971, 1982, 2136, 2204, 2377, 2838, 3011], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3239], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1161, 2902], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [636], "errorMessage": "invalid number of bytes for string" }, { "pc": [1148, 2889], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1143, 2884], "errorMessage": "invalid tuple encoding" }, { "pc": [1504, 1636], "errorMessage": "transaction type is appl" }, { "pc": [1201, 1366], "errorMessage": "transaction type is axfer" }, { "pc": [1190, 1355, 1514, 1646, 2369], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA3OTgwMCAxMzExMzMwMCAxMDAwMDAgMTI2MjUwMCA0MDk2IDUwMDAwIDM5OTAwMCAzMTkyMDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgImJjIiAweDE1MWY3Yzc1ICJha2l0YV9lc2Nyb3ciICJ3YWxsZXQiICJhYWwiICJFUlI6ZXJyTmRhbyIgIkVSUjplcnJDbnN0IiAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIgIkVSUjplcnJJcGF5IiAweDAwICJFUlI6ZXJyTnBibyIgIkVSUjplcnJJeGZyIiAweDNlYTExODMyIDB4YzUzYjMyY2MgInJlZmVycmVyIiAiYXBwSUQiICJ2ZXJzaW9uIiAiRVJSOmVyck5hdWMiICJzZWxsZXIiICJmdW5kZXIiICJwYWwiIDB4MDAwMCAiRVJSOmVyckJpbmMiICJFUlI6ZXJyRW1mbSIgIkVSUjplcnJOb3B0IiAweDAwMGEgMHgwMDIyIGJhc2U2NChDNEVCUXc9PSkgMHgzNGNlYzc5OCAweGJkNzE0OGQwIDB4YWRmOTJhZTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMC0yNgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbkZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VBdWN0aW9uLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjAtMjYKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb25GYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlQXVjdGlvbiwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDI0CiAgICBwdXNoYnl0ZXNzIDB4YjhjODYyOGQgMHhkMTU0OGZmZiAweGJhZTI2YTJiIDB4NzNmMDAyMjMgMHgxNzE0ZGE2NSAweDgwZjQ0NTQxIDB4YTVkNDJiM2EgLy8gbWV0aG9kICJuZXdBdWN0aW9uKHBheSxheGZlcixzdHJpbmcsYnl0ZVszMl1bXSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3QXVjdGlvbihwYXksYXhmZXIsc3RyaW5nLGJ5dGVbMzJdW10sdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3UHJpemVCb3hBdWN0aW9uKGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdQcml6ZUJveEF1Y3Rpb24oYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZGVsZXRlQXVjdGlvbkFwcCh1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2FuY2VsQXVjdGlvbih1aW50NjQpdm9pZCIsIG1ldGhvZCAibmV3QXVjdGlvbkNvc3QoYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiCiAgICBieXRlYyAxNCAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhkY2EyZDg2MiAweGQzNDZiMWE0IDB4Mzk0ZWFlYjIgMHgzM2Y3ODgwOCAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDczMTExMDcwIC8vIG1ldGhvZCAibG9hZEJveGVkQ29udHJhY3QodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVCb3hlZENvbnRyYWN0KCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm1icigpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBuZXdBdWN0aW9uIGxlZ2FjeU5ld0F1Y3Rpb24gbmV3UHJpemVCb3hBdWN0aW9uIGxlZ2FjeU5ld1ByaXplQm94QXVjdGlvbiBkZWxldGVBdWN0aW9uQXBwIGNhbmNlbEF1Y3Rpb24gbmV3QXVjdGlvbkNvc3QgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDIxIG1haW5fbWJyX3JvdXRlQDIyCiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwODllNDAwMDAwMDAwMDBjODE3ZDQwMDAwMDAwMDAwMDA0OWQ0MDAwMDAwMDAwMDAwNDlkNAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX29wVXBfcm91dGVAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzAKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjAtMjYKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb25GYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlQXVjdGlvbiwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHg4MTE1MzYyOCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo6Ym94ZWRQcm9ncmFtU2l6ZShib3hLZXk6IGJ5dGVzKSAtPiB1aW50NjQ6CmJveGVkUHJvZ3JhbVNpemU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBib3hlZFByb2dyYW1TaXplKGJveEtleTogYnl0ZXMpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODIKICAgIC8vIGNvbnN0IFtzaXplLCBleGlzdHNdID0gb3AuQm94Lmxlbmd0aChib3hLZXkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJveF9sZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBibnogYm94ZWRQcm9ncmFtU2l6ZV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKYm94ZWRQcm9ncmFtU2l6ZV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4NAogICAgLy8gcmV0dXJuIHNpemUKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllcyhha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBuYW1lOiBieXRlcywgcHJvb2Y6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgpyb3lhbHRpZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJveWFsdGllcyhha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiBBc3NldCwgbmFtZTogc3RyaW5nLCBwcm9vZjogUHJvb2YpOiB1aW50NjQgewogICAgcHJvdG8gNCAyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzkKICAgIC8vIGxldCBjcmVhdG9yUm95YWx0eTogdWludDY0ID0gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGJueiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MgogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5RGVmYXVsdAogICAgcHVzaGludCA1MDAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZpZWRNdXN0UmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1MAogICAgLy8gYXNzZXQuY3JlYXRvciwKICAgIGZyYW1lX2RpZyAtMwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjUxCiAgICAvLyBuYW1lLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTIKICAgIC8vIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU0CiAgICAvLyAxLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTQKICAgIGJ5dGVjIDUgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ4CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3LTY1NwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDFmZjdjNzRjIC8vIG1ldGhvZCAidmVyaWZpZWRNdXN0UmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTUKICAgIC8vICdyb3lhbHR5JywKICAgIHB1c2hieXRlcyAweDAwMDc3MjZmNzk2MTZjNzQ3OQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3LTY1NwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHN0cmluZwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1OQogICAgLy8gaWYgKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKS5sZW5ndGggPiAwKSB7CiAgICBsZW4KICAgIGJ6IHJveWFsdGllc19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYwCiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IGJ0b2koQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpKQogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgMQoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYzCiAgICAvLyBpZiAoY3JlYXRvclJveWFsdHkgPiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjIDkgLy8gNTAwMDAKICAgID4KICAgIGJ6IHJveWFsdGllc19hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY0CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDkgLy8gNTAwMDAKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY3CiAgICAvLyByZXR1cm4gY3JlYXRvclJveWFsdHkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmV3YXJkc09wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzM5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmV3YXJkc09wdEluQ29zdChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MAogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MQogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MgogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzQzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0NgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwcmluY2lwYWxPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpwcmluY2lwYWxPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTE5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsT2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBoaW50OiB1aW50NjQpOiBQcmluY2lwYWwgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTQKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEzCiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE0OAogICAgLy8gaWYgKGhpbnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEwIC8vIDB4MDAKICAgIGNvbmNhdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjAKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUA1CiAgICBmcmFtZV9kaWcgMgogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANgoKcHJpbmNpcGFsT2ZfaWZfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90V2FsbGV0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG53bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbndsCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTYxCiAgICAvLyBsb2dnZWRFcnIoZXJySGludFRvcExldmVsKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySHRvcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIdG9wCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjYKICAgIC8vIGxldCB2aWFQbHVnaW4gPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY3CiAgICAvLyBpZiAoY2FsbGVyQXBwICE9PSBoaW50KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcxCiAgICAvLyBjb25zdCBbc3BlbmRpbmcsIHNwZW5kaW5nRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfU1BFTkRJTkcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgInNwZW5kaW5nX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MgogICAgLy8gaWYgKCEoc3BlbmRpbmdFeGlzdHMgJiYgc3BlbmRpbmcubGVuZ3RoID09PSAzMiAmJiBzcGVuZGluZyA9PT0gc2VuZGVyLmJ5dGVzICYmIHNlbmRlciAhPT0gY2FsbGVyQWRkcikpIHsKICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGZyYW1lX2RpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBmcmFtZV9kaWcgMQogICAgZGlnIDEKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBkdXAKICAgIGZyYW1lX2RpZyAzCiAgICAhPQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjEKCnByaW5jaXBhbE9mX2lmX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RCb3VuZCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhuYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG5iZAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc4CiAgICAvLyB2aWFQbHVnaW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEJ5dGVzLCBjb250cm9sbGVkRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfQ09OVFJPTExFRCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAyNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNQoKcHJpbmNpcGFsT2ZfaWZfYm9keUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTE5CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gc3BlbmRlcikgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIwCiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTEKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTUgLy8gInJlZmVycmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzUKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNQogICAgY292ZXIgMwoKcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk2CiAgICAvLyBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgZGlnIDIKICAgIGRpZyAxCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgc2VsZWN0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NwogICAgLy8gb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzgKICAgIHN3YXAKCnByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NC0yMDEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogaGludCwKICAgIC8vICAgcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlciwKICAgIC8vICAgdmlhUGx1Z2luLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTAgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjA5LTIxNgogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWxDdHgoCiAgICAvLyAgIHdhbGxldEZhY3RvcnksCiAgICAvLyAgIGhpbnQsCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cmVzb2x2ZVByaW5jaXBhbEN0eEA0MAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzODoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGIgcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzOQoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBjb3ZlciAzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzYKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMgogICAgLy8gY29uc3QgW3dhbGxldEFkZHJlc3MsIHdhbGxldEV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIzCiAgICAvLyBpZiAoIXdhbGxldEV4aXN0cykgewogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNgogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNwogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGNvbnRyb2xsZWQpID09PSB3YWxsZXRBZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMgogICAgaXRvYgogICAgYnl0ZWMgMTYgLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExCgpwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTcgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzIKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpuZXdBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI1Ny0yNzIKICAgIC8vIG5ld0F1Y3Rpb24oCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzMKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzMKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGV4dHJhY3QgMTA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjc0LTI3NwogICAgLy8gcmV0dXJuIHRoaXMubmV3QXVjdGlvbkltcGwoCiAgICAvLyAgIHBheW1lbnQsIGFzc2V0WGZlciwgbmFtZSwgcHJvb2YsIGJpZEFzc2V0SUQsIGJpZEZlZSwgc3RhcnRpbmdCaWQsIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsIGVuZFRpbWVzdGFtcCwgZ2F0ZUlELCBtYXJrZXRwbGFjZSwgd2VpZ2h0c0xpc3RDb3VudCwgc2VsbGVyUmVmZXJyZXIKICAgIC8vICkKICAgIGNhbGxzdWIgbmV3QXVjdGlvbkltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI1Ny0yNzIKICAgIC8vIG5ld0F1Y3Rpb24oCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5sZWdhY3lOZXdBdWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5TmV3QXVjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyODQKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3QXVjdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzAyCiAgICAvLyBzdGFydFRpbWVzdGFtcCwgZW5kVGltZXN0YW1wLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB3ZWlnaHRzTGlzdENvdW50LCB0aGlzLmxlZ2FjeVNlbGxlclJlZmVycmVyKCkKICAgIGNhbGxzdWIgbGVnYWN5U2VsbGVyUmVmZXJyZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMDAtMzAzCiAgICAvLyByZXR1cm4gdGhpcy5uZXdBdWN0aW9uSW1wbCgKICAgIC8vICAgcGF5bWVudCwgYXNzZXRYZmVyLCBuYW1lLCBwcm9vZiwgYmlkQXNzZXRJRCwgYmlkRmVlLCBzdGFydGluZ0JpZCwgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwgZW5kVGltZXN0YW1wLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB3ZWlnaHRzTGlzdENvdW50LCB0aGlzLmxlZ2FjeVNlbGxlclJlZmVycmVyKCkKICAgIC8vICkKICAgIGNhbGxzdWIgbmV3QXVjdGlvbkltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI4NAogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICduZXdBdWN0aW9uJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkubmV3UHJpemVCb3hBdWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UHJpemVCb3hBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMwNy0zMjAKICAgIC8vIG5ld1ByaXplQm94QXVjdGlvbigKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjEKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjEKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGV4dHJhY3QgMTA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzIyLTMyNQogICAgLy8gcmV0dXJuIHRoaXMubmV3UHJpemVCb3hBdWN0aW9uSW1wbCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4biwgcGF5bWVudCwgYmlkQXNzZXRJRCwgYmlkRmVlLCBzdGFydGluZ0JpZCwgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwgZW5kVGltZXN0YW1wLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB3ZWlnaHRzTGlzdENvdW50LCBzZWxsZXJSZWZlcnJlcgogICAgLy8gKQogICAgY2FsbHN1YiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzA3LTMyMAogICAgLy8gbmV3UHJpemVCb3hBdWN0aW9uKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5sZWdhY3lOZXdQcml6ZUJveEF1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lOZXdQcml6ZUJveEF1Y3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzI5CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ25ld1ByaXplQm94QXVjdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDUKICAgIC8vIHN0YXJ0VGltZXN0YW1wLCBlbmRUaW1lc3RhbXAsIGdhdGVJRCwgbWFya2V0cGxhY2UsIHdlaWdodHNMaXN0Q291bnQsIHRoaXMubGVnYWN5U2VsbGVyUmVmZXJyZXIoKQogICAgY2FsbHN1YiBsZWdhY3lTZWxsZXJSZWZlcnJlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0My0zNDYKICAgIC8vIHJldHVybiB0aGlzLm5ld1ByaXplQm94QXVjdGlvbkltcGwoCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4sIHBheW1lbnQsIGJpZEFzc2V0SUQsIGJpZEZlZSwgc3RhcnRpbmdCaWQsIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsIGVuZFRpbWVzdGFtcCwgZ2F0ZUlELCBtYXJrZXRwbGFjZSwgd2VpZ2h0c0xpc3RDb3VudCwgdGhpcy5sZWdhY3lTZWxsZXJSZWZlcnJlcigpCiAgICAvLyApCiAgICBjYWxsc3ViIG5ld1ByaXplQm94QXVjdGlvbkltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjkKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3UHJpemVCb3hBdWN0aW9uJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkuZGVsZXRlQXVjdGlvbkFwcFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUF1Y3Rpb25BcHA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDkwCiAgICAvLyBkZWxldGVBdWN0aW9uQXBwKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDkxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdEFuQXVjdGlvbikKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZUF1Y3Rpb25BcHBfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyTmF1YyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOYXVjCgpkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5MgogICAgLy8gY29uc3Qgc2VsbGVyID0gQWNjb3VudChvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyKSlbMF0pCiAgICBkdXAKICAgIGJ5dGVjIDE5IC8vICJzZWxsZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDkzCiAgICAvLyBsb2dnZWRBc3NlcnQoc2VsbGVyID09PSBUeG4uc2VuZGVyLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck5wYm8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBibwoKZGVsZXRlQXVjdGlvbkFwcF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0OTYKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5NwogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njc3CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBieXRlYyAyMCAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5OAogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MDIKICAgIC8vIGF1Y3Rpb24uY2FsbC5kZWxldGVBcHBsaWNhdGlvbih7IGFwcElkIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MjQ4N2MzMmMgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUwNAogICAgLy8gdGhpcy5yZWZ1bmRSZWxlYXNlZChyZWNlaXZlciwgYW1vdW50LCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUsIDApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmdW5kUmVsZWFzZWQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5MAogICAgLy8gZGVsZXRlQXVjdGlvbkFwcChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5LmNhbmNlbEF1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpjYW5jZWxBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUwNwogICAgLy8gY2FuY2VsQXVjdGlvbihhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUwOAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RBbkF1Y3Rpb24pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjYW5jZWxBdWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxOCAvLyAiRVJSOmVyck5hdWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmF1YwoKY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MDkKICAgIC8vIGNvbnN0IHNlbGxlciA9IEFjY291bnQob3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlcikpWzBdKQogICAgZHVwCiAgICBieXRlYyAxOSAvLyAic2VsbGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlbGxlciA9PT0gVHhuLnNlbmRlciwgZXJyTm90UHJpemVCb3hPd25lcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTEgLy8gIkVSUjplcnJOcGJvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wYm8KCmNhbmNlbEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTEzCiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MTQKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3NwogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgYnl0ZWMgMjAgLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MTUKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTE5CiAgICAvLyBhdWN0aW9uLmNhbGwuY2FuY2VsKHsgYXBwSWQgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzMWYyNmE5YiAvLyBtZXRob2QgImNhbmNlbCgpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUyMQogICAgLy8gdGhpcy5yZWZ1bmRSZWxlYXNlZChyZWNlaXZlciwgYW1vdW50LCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUsIDApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmdW5kUmVsZWFzZWQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUwNwogICAgLy8gY2FuY2VsQXVjdGlvbihhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3QXVjdGlvbkNvc3Q6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MjgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTMxCiAgICAvLyBjb25zdCBpc0FsZ29CaWQgPSBiaWRBc3NldElEID09PSAwCiAgICAhCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTMyCiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgc3dhcAogICAgYnogbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9mYWxzZUAzCiAgICBzd2FwCiAgICAhCgpuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTMyCiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgICoKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0MAogICAgLy8gaWYgKCFpc1ByaXplQm94KSB7CiAgICB1bmNvdmVyIDIKICAgIGJueiBuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0MQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTQxCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0MQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQXNzZXRJRCkKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDIKICAgIC8vIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAxCiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDMKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1MwogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZGlnIDMKICAgICsKICAgIGRpZyAyCiAgICBpbnRjIDUgLy8gMTMxMTMzMDAKICAgICoKICAgICsKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NTUKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgcHVzaGludCA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo5NQogICAgLy8gcmV0dXJuIHByb2dyYW1QYWdlc01icih0aGlzLmNoaWxkRXh0cmFQYWdlcyhjbGVhclNpemUpKQogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0OQogICAgLy8gcmV0dXJuIE1JTl9QUk9HUkFNX1BBR0VTICogKDEgKyBleHRyYVBhZ2VzKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGludGMgNiAvLyAxMDAwMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NTUtNTU3CiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBhdWN0aW9uLmdsb2JhbEJ5dGVzKSArCiAgICBpbnRjIDcgLy8gMTI2MjUwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1NS01NTgKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTYxCiAgICAvLyByZXR1cm4gdG90YWxNQlIgKyB0aGlzLmNyZWF0aW9uRmVlKCkKICAgIGNhbGxzdWIgY3JlYXRpb25GZWUKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MjgKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTQ1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTQ1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDEwIC8vIDM5OTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0NQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICArCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUA5OgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTQ3CiAgICAvLyB9IGVsc2UgaWYgKGlzQWxnb0JpZCkgewogICAgZHVwCiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDExCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDc5ODAwCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NTAKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1MAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyAxMSAvLyAzMTkyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NTAKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X3Rlcm5hcnlfZmFsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MzIKICAgIC8vIGNvbnN0IG9wdGluTUJSOiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoaXNQcml6ZUJveCA/IChpc0FsZ29CaWQgPyAwIDogMSkgOiAoaXNBbGdvQmlkID8gMSA6IDIpKQogICAgaW50Y18zIC8vIDIKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDMKICAgIHNlbGVjdAogICAgYiBuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmluaXRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTgKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTIyCiAgICAvLyBjb25zdCBbZGFvV2FsbGV0SWRdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjIKICAgIC8vIGNvbnN0IFtkYW9XYWxsZXRJZF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI0LTEyNgogICAgLy8gZGFvV2FsbGV0SWQgPT09IDAKICAgIC8vICAgPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIC8vICAgOiBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihkYW9XYWxsZXRJZCkuYWRkcmVzcywKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X2ZhbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI1CiAgICAvLyA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQoKaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTIzLTEyOAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBkYW9XYWxsZXRJZCA9PT0gMAogICAgLy8gICAgID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICAvLyAgICAgOiBUeG4uc2VuZGVyID09PSBBcHBsaWNhdGlvbihkYW9XYWxsZXRJZCkuYWRkcmVzcywKICAgIC8vICAgZXJyTm90QWtpdGFEYW8KICAgIC8vICkKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNiAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MgogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDggLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjkKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMwCiAgICAvLyBpZiAoIXRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMxCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuY3JlYXRlKHsgc2l6ZSB9KQogICAgc3dhcAogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTgKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgppbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzMKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXNpemUoc2l6ZSkKICAgIHN3YXAKICAgIGJveF9yZXNpemUKICAgIGIgaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA5Cgppbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMjYKICAgIC8vIDogVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZGFvV2FsbGV0SWQpLmFkZHJlc3MsCiAgICB0eG4gU2VuZGVyCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYiBpbml0Qm94ZWRDb250cmFjdF90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmxvYWRCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKbG9hZEJveGVkQ29udHJhY3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzcKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM4CiAgICAvLyBjb25zdCBleHBlY3RlZFByZXZpb3VzQ2FsbHM6IHVpbnQ2NCA9IG9mZnNldCAvIDIwMzIKICAgIHB1c2hpbnQgMjAzMgogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM5CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4IC0gZXhwZWN0ZWRQcmV2aW91c0NhbGxzIC0gMSkKICAgIHR4biBHcm91cEluZGV4CiAgICBzd2FwCiAgICAtCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MgogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGRpZyAyCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uSUQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQyCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQzCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgZGlnIDIKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgMwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDMKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ0CiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGRpZyAyCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDQKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ1CiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGRpZyAyCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDE0IC8vIG1ldGhvZCAiaW5pdEJveGVkQ29udHJhY3Qoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDUKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NgogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgZGlnIDIKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDYKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDAtMTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gICAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gICAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gICAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICAgJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAgICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIC8vICksIGVyckludmFsaWRDYWxsT3JkZXIpCiAgICBibnogbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDExCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJY29yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckljb3IKCmxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0OQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlcGxhY2Uob2Zmc2V0LCBkYXRhKQogICAgY292ZXIgMgogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzNwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmRlbGV0ZUJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKZGVsZXRlQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTQKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTIKICAgIC8vIGRlbGV0ZUJveGVkQ29udHJhY3QoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODkKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkwCiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgMwogICAgcG9wCiAgICAhCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTIKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnRSZWNlaXZlcikKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRAMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1yCgpvcHRJbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1hIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbWEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NwogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTgKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk1LTIwMAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjA4CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgYm56IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgZHVwbiAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIGV4dHJhY3QgMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgICE9CiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjE2CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAyMSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGNvbnN0IHsgcmV2ZW51ZU1hbmFnZXIgfSA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgZXh0cmFjdCA4IDgKICAgIGNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDcKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4CiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgc3dhcAogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NAogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjItNjUKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHgzYWIyODk1YiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxhZGRyZXNzLGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNDEKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgZGlnIDYKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldlc2MKCm9wdEluX2FmdGVyX2Fzc2VydEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIHVuY292ZXIgNAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDVhZGYzMzhmIC8vIG1ldGhvZCAiYXJjNThfcmVrZXlUb1BsdWdpbih1aW50NjQsdWludDY0LHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMDAwMDAwMDAwMDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk4CiAgICAvLyBbXQogICAgYnl0ZWMgMjIgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTAzCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNAogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5MQogICAgLy8gcmV0dXJuIGVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpID8gMCA6IDEKICAgIGRpZyA1CiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDgKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE1CiAgICAvLyBbYXNzZXQuaWRdLAogICAgc3dhcAogICAgaXRvYgogICAgcHVzaGJ5dGVzIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIzCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsgYXBwSWQ6IHdhbGxldCB9KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM1CiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCm9wdEluX2FmdGVyX2lmX2Vsc2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4NwogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjg5MQogICAgLy8gcmV0dXJuIGVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpID8gMCA6IDEKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTYKICAgIC8vIHJldHVybiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiAoMSArIGNvdW50KQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTMKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhvdXRBa2l0YU9wdEluLnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDEyCiAgICArCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6RXNjcm93Q29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTIKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBjbG9uZShjb25maWcpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpVcGdyYWRlYWJsZUFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzgKICAgIC8vIGNvbnN0IFtwbHVnaW5zXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDIxIC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGRlY29kZUFyYzQ8UGx1Z2luQXBwTGlzdD4ocGx1Z2lucykudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjQwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgZXJySW52YWxpZFVwZ3JhZGUpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgPT0KICAgIGJueiB1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckl1cGciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXVwZwoKdXBkYXRlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxNyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5LnZhbGlkYXRlUmFmZmxlQ29uZmlnKGJpZEZlZTogdWludDY0LCBzdGFydGluZ0JpZDogdWludDY0LCB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQpIC0+IHZvaWQ6CnZhbGlkYXRlUmFmZmxlQ29uZmlnOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ0CiAgICAvLyBwcml2YXRlIHZhbGlkYXRlUmFmZmxlQ29uZmlnKGJpZEZlZTogdWludDY0LCBzdGFydGluZ0JpZDogdWludDY0LCB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ1CiAgICAvLyBpZiAoYmlkRmVlID4gMCkgewogICAgZnJhbWVfZGlnIC0zCiAgICBieiB2YWxpZGF0ZVJhZmZsZUNvbmZpZ19lbHNlX2JvZHlANgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2CiAgICAvLyBsb2dnZWRBc3NlcnQoc3RhcnRpbmdCaWQgPiAwLCBlcnJTdGFydGluZ0JpZFJlcXVpcmVkKQogICAgZnJhbWVfZGlnIC0yCiAgICBibnogdmFsaWRhdGVSYWZmbGVDb25maWdfYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVyclNicnEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyU2JycQoKdmFsaWRhdGVSYWZmbGVDb25maWdfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDcKICAgIC8vIGxvZ2dlZEFzc2VydCh3ZWlnaHRzTGlzdENvdW50IDw9IE1heFdlaWdodHNCb3hlcywgZXJyVG9vTWFueVdlaWdodHNCb3hlcykKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCAxNQogICAgPD0KICAgIGJueiB2YWxpZGF0ZVJhZmZsZUNvbmZpZ19hZnRlcl9pZl9lbHNlQDkKICAgIHB1c2hieXRlcyAiRVJSOmVyclRtd2IiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyVG13YgoKdmFsaWRhdGVSYWZmbGVDb25maWdfYWZ0ZXJfaWZfZWxzZUA5OgogICAgcmV0c3ViCgp2YWxpZGF0ZVJhZmZsZUNvbmZpZ19lbHNlX2JvZHlANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodHNMaXN0Q291bnQgPT09IDAsIGVycldlaWdodHNOZWVkQmlkRmVlKQogICAgZnJhbWVfZGlnIC0xCiAgICBieiB2YWxpZGF0ZVJhZmZsZUNvbmZpZ19hZnRlcl9pZl9lbHNlQDkKICAgIHB1c2hieXRlcyAiRVJSOmVyclduYmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25iZgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkuY3JlYXRpb25GZWUoKSAtPiB1aW50NjQ6CmNyZWF0aW9uRmVlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU5CiAgICAvLyByZXR1cm4gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ3JlYXRpb25GZWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTkKICAgIC8vIHJldHVybiBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25DcmVhdGlvbkZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU1CiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgcHVzaGJ5dGVzICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1OQogICAgLy8gcmV0dXJuIGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNyZWF0aW9uRmVlCiAgICBwdXNoaW50IDQ4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5wYXlDcmVhdGlvbkZlZShmZWU6IHVpbnQ2NCkgLT4gdm9pZDoKcGF5Q3JlYXRpb25GZWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjMKICAgIC8vIHByaXZhdGUgcGF5Q3JlYXRpb25GZWUoZmVlOiB1aW50NjQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjY0CiAgICAvLyBpZiAoZmVlID4gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBwYXlDcmVhdGlvbkZlZV9hZnRlcl9pZl9lbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2NS03MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjY3CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjY1LTY5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2NS03MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBmZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCnBheUNyZWF0aW9uRmVlX2FmdGVyX2lmX2Vsc2VAMzoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkubGVnYWN5U2VsbGVyUmVmZXJyZXIoKSAtPiBieXRlczoKbGVnYWN5U2VsbGVyUmVmZXJyZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIHByaXZhdGUgbGVnYWN5U2VsbGVyUmVmZXJyZXIoKTogQWNjb3VudCB7CiAgICBwcm90byAwIDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODEKICAgIC8vIHJldHVybiByZWZlcnJlck9yWmVyb0FkZHJlc3MobGVnYWN5V2FsbGV0T2YodGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikpCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo4MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyMQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBkaWcgMQogICAgcHVzaGJ5dGVzICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyNgogICAgLy8gcmV0dXJuIGdldE90aGVyQXBwTGlzdChha2l0YURBTykuZXNjcm93CiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHVuY292ZXIgMgogICAgYnl0ZWMgNSAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzg4LTM5MQogICAgLy8gY29uc3QgZGF0YSA9IGFiaUNhbGw8dHlwZW9mIEVzY3Jvd0ZhY3RvcnkucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZXNjcm93RmFjdG9yeSwKICAgIC8vICAgYXJnczogW2FkZHJlc3NdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzYzFhNmYzMyAvLyBtZXRob2QgImdldChhZGRyZXNzKWJ5dGVbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzkzCiAgICAvLyBpZiAoQnl0ZXMoZGF0YSkubGVuZ3RoICE9PSA4KSB7CiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICAhPQogICAgYnogbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaWZfZWxzZUAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk0CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM2CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyOQogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBkaWcgMQogICAgYm56IGxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lmX2Vsc2VAOAogICAgYnVyeSAxCgpsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo4MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pZl9lbHNlQDg6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUyCiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIGJ5dGVjIDE1IC8vICJyZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzUwLTM1MwogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzM2CiAgICAvLyByZXR1cm4gcmVmZXJyZXJPcih3YWxsZXRJRCwgR2xvYmFsLnplcm9BZGRyZXNzKQogICAgYiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAOQoKbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGJ0b2koZGF0YSkKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjQKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgYnogbGVnYWN5U2VsbGVyUmVmZXJyZXJfaWZfYm9keUAxMgogICAgZnJhbWVfZGlnIDEKICAgIGJueiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pZl9lbHNlQDEzCgpsZWdhY3lTZWxsZXJSZWZlcnJlcl9pZl9ib2R5QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjUKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgYiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeVdhbGxldElEQDQKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2NwogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjgKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzcyh3YWxsZXRGYWN0b3J5KQogICAgYnogbGVnYWN5U2VsbGVyUmVmZXJyZXJfYm9vbF9mYWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTkKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KGl0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMQogICAgaXRvYgogICAgYnl0ZWMgMTYgLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBmcmFtZV9kaWcgMAogICAgPT0KICAgIGJ6IGxlZ2FjeVNlbGxlclJlZmVycmVyX2Jvb2xfZmFsc2VAMTYKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGIgbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE4CgpsZWdhY3lTZWxsZXJSZWZlcnJlcl9ib29sX2ZhbHNlQDE2OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTgKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25JbXBsKHBheW1lbnQ6IHVpbnQ2NCwgYXNzZXRYZmVyOiB1aW50NjQsIG5hbWU6IGJ5dGVzLCBwcm9vZjogYnl0ZXMsIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgYmlkRmVlOiB1aW50NjQsIHN0YXJ0aW5nQmlkOiB1aW50NjQsIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LCBzdGFydFRpbWVzdGFtcDogdWludDY0LCBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwgZ2F0ZUlEOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0LCBzZWxsZXJSZWZlcnJlcjogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6Cm5ld0F1Y3Rpb25JbXBsOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjg0LTk5CiAgICAvLyBwcml2YXRlIG5ld0F1Y3Rpb25JbXBsKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBuYW1lOiBzdHJpbmcsCiAgICAvLyAgIHByb29mOiBQcm9vZiwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTQgMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoYmlkTWluaW11bUluY3JlYXNlID4gMCwgZXJyQmlkc011c3RBbHdheXNJbmNyZWFzZSkKICAgIGZyYW1lX2RpZyAtNwogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyMyAvLyAiRVJSOmVyckJpbmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQmluYwoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAxCiAgICAvLyBsb2dnZWRBc3NlcnQoZW5kVGltZXN0YW1wID4gc3RhcnRUaW1lc3RhbXAgKyAzMDAsIGVyckVuZE11c3RCZUF0bGVhc3RGaXZlTWludXRlc0FmdGVyU3RhcnQpCiAgICBmcmFtZV9kaWcgLTYKICAgIHB1c2hpbnQgMzAwCiAgICArCiAgICBmcmFtZV9kaWcgLTUKICAgIDwKICAgIGJueiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgMjQgLy8gIkVSUjplcnJFbWZtIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckVtZm0KCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBlcnJDb250cmFjdE5vdFNldCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyA3IC8vICJFUlI6ZXJyQ25zdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJDbnN0CgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDMKICAgIC8vIHRoaXMudmFsaWRhdGVSYWZmbGVDb25maWcoYmlkRmVlLCBzdGFydGluZ0JpZCwgd2VpZ2h0c0xpc3RDb3VudCkKICAgIGZyYW1lX2RpZyAtOQogICAgZnJhbWVfZGlnIC04CiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgdmFsaWRhdGVSYWZmbGVDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDUKICAgIC8vIGNvbnN0IGlzQWxnb0JpZCA9IGJpZEFzc2V0SUQgPT09IDAKICAgIGZyYW1lX2RpZyAtMTAKICAgICEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDcKICAgIC8vIGxvZ2dlZEFzc2VydChpc0FsZ29CaWQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGJpZEFzc2V0SUQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGZyYW1lX2RpZyAtMTAKICAgIGJ6IG5ld0F1Y3Rpb25JbXBsX2Jvb2xfdHJ1ZUA4CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZnJhbWVfZGlnIC0xMAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IG5ld0F1Y3Rpb25JbXBsX2Jvb2xfZmFsc2VAOQoKbmV3QXVjdGlvbkltcGxfYm9vbF90cnVlQDg6CiAgICBpbnRjXzEgLy8gMQoKbmV3QXVjdGlvbkltcGxfYm9vbF9tZXJnZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDcKICAgIC8vIGxvZ2dlZEFzc2VydChpc0FsZ29CaWQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGJpZEFzc2V0SUQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGJueiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDI1IC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0CgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA5CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzQWxnb0JpZCA/IDEgOiAyKQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzMgLy8gMgogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgc2VsZWN0CiAgICAqCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMTkKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjExOQogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEzCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGR1cAogICAgY292ZXIgMgogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjExOQogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjAKICAgIC8vIGlmIChpc0FsZ29CaWQpIHsKICAgIGZyYW1lX2RpZyAtMTAKICAgIGJueiBuZXdBdWN0aW9uSW1wbF9lbHNlX2JvZHlAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjEKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkKICAgICsKICAgIHN3YXAKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI2CiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArICh3ZWlnaHRzTGlzdENvdW50ICogY29zdHMud2VpZ2h0cykgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgKwogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjIDUgLy8gMTMxMTMzMDAKICAgICoKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICArCiAgICBkaWcgMgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyOAogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjk1CiAgICAvLyByZXR1cm4gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZSkpCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ5CiAgICAvLyByZXR1cm4gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGV4dHJhUGFnZXMpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaW50YyA2IC8vIDEwMDAwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyOC0xMzAKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNyAvLyAxMjYyNTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI4LTEzMQogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzUKICAgIC8vIGNvbnN0IGNyZWF0aW9uRmVlID0gdGhpcy5jcmVhdGlvbkZlZSgpCiAgICBjYWxsc3ViIGNyZWF0aW9uRmVlCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTM2CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xNAogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAxNwogICAgYnl0ZWMgOSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzNwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiArIGNyZWF0aW9uRmVlLCBlcnJJbnZhbGlkUGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMTQKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDQKICAgIGRpZyA0CiAgICArCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAxOQogICAgYnl0ZWMgOSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5zZW5kZXIgPT09IFR4bi5zZW5kZXIsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMTMKICAgIGd0eG5zIFNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMjEKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQyCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldC5pZCAhPT0gYmlkQXNzZXRJRCwgZXJyUHJpemVJc0JpZEFzc2V0KQogICAgZHVwCiAgICBmcmFtZV9kaWcgLTEwCiAgICAhPQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUGliYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQaWJhCgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQzCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTEzCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMjUKICAgIGJ5dGVjIDEyIC8vICJFUlI6ZXJySXhmciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJeGZyCgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID4gMCwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0xMwogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgY292ZXIgNQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyNwogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNDYKICAgIC8vIGFzc2V0WGZlci54ZmVyQXNzZXQuY2xhd2JhY2sgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBhc3NldFhmZXIueGZlckFzc2V0LmZyZWV6ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q2xhd2JhY2sKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJ6IG5ld0F1Y3Rpb25JbXBsX2Jvb2xfZmFsc2VAMzAKICAgIGR1cAogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldEZyZWV6ZQogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogbmV3QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAzMAogICAgaW50Y18xIC8vIDEKCm5ld0F1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ1LTE0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KAogICAgLy8gICBhc3NldFhmZXIueGZlckFzc2V0LmNsYXdiYWNrID09PSBHbG9iYWwuemVyb0FkZHJlc3MgJiYgYXNzZXRYZmVyLnhmZXJBc3NldC5mcmVlemUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgZXJyUHJpemVTZWl6YWJsZQogICAgLy8gKQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAzMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHN6YiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQc3piCgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMzM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUwCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUwCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgZnJhbWVfZGlnIC0xMgogICAgZnJhbWVfZGlnIC0xMQogICAgY2FsbHN1YiByb3lhbHRpZXMKICAgIGZyYW1lX2J1cnkgLTExCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUyCiAgICAvLyB0aGlzLnBheUNyZWF0aW9uRmVlKGNyZWF0aW9uRmVlKQogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIHBheUNyZWF0aW9uRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTU1LTE4NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTgKICAgIC8vIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjAKICAgIC8vIGJpZEFzc2V0SUQsCiAgICBmcmFtZV9kaWcgLTEwCiAgICBpdG9iCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2MQogICAgLy8gYmlkRmVlLAogICAgZnJhbWVfZGlnIC05CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTYyCiAgICAvLyBzdGFydGluZ0JpZCwKICAgIGZyYW1lX2RpZyAtOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2MwogICAgLy8gYmlkTWluaW11bUluY3JlYXNlLAogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY0CiAgICAvLyBzdGFydFRpbWVzdGFtcCwKICAgIGZyYW1lX2RpZyAtNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2NQogICAgLy8gZW5kVGltZXN0YW1wLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY2CiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICBmcmFtZV9kaWcgLTE0CiAgICBndHhucyBTZW5kZXIKICAgIHVuY292ZXIgMTEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2NwogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjgKICAgIC8vIGNyZWF0b3JSb3lhbHR5LAogICAgdW5jb3ZlciAxMAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2OQogICAgLy8gZ2F0ZUlELAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTcxCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzEKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzIKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3MgogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3MgogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlYyAyNiAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTcyLTE3MwogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vIHNlbGxlclJlZmVycmVyLAogICAgYnl0ZWMgMjcgLy8gMHgwMDIyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTc3CiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3OAogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzkKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgaW50Y18zIC8vIDIKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgwCiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIHB1c2hpbnQgMwogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxODMKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIHB1c2hpbnQgNAogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMTMKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgcHVzaGludCAxMQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMjUKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE1NS0xODQKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXMoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMTMKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgYnl0ZWMgMjggLy8gYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE1NS0xODQKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXMoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpCiAgICAvLyAgIH0pCiAgICBieXRlYyAyOSAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZywodWludDY0LChzdHJpbmcsdWludDY0KSksYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTkKICAgIC8vIGZhbHNlLAogICAgYnl0ZWMgMTAgLy8gMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDEwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciA0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTU1LTE4NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTU1LTE4NgogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE4OS0xOTQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxOTEKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxOTIKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICB1bmNvdmVyIDYKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTg5LTE5MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTg5LTE5NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxOTctMjA2CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwMQogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwMgogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDAtMjAzCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTk3LTIwNgogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjA5LTIxNQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMQogICAgLy8gYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgc3dhcAogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjA5LTIxNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0CiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwOS0yMTUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE3CiAgICAvLyBpZiAoIWlzQWxnb0JpZCkgewogICAgZnJhbWVfZGlnIC0xMAogICAgYnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUA0NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxOS0yMjgKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjIzCiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjI0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyMi0yMjUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTktMjI4CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBiaWRBc3NldElELAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUA0NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzIKICAgIC8vIGlmIChiaWRGZWUgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTkKICAgIGJ6IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2lmX2Vsc2VANDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzUtMjQ0CiAgICAvLyBhdWN0aW9uLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLmlkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzkKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzgtMjQxCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzUtMjQ0CiAgICAvLyBhdWN0aW9uLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLmlkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0MgogICAgLy8gd2VpZ2h0c0xpc3RDb3VudCwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzNS0yNDQKICAgIC8vIGF1Y3Rpb24uY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAuaWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDMwIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQ4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0NwogICAgLy8gcmV0dXJuIGF1Y3Rpb25BcHAuaWQKICAgIGZyYW1lX2RpZyAtMTEKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCm5ld0F1Y3Rpb25JbXBsX2Jvb2xfZmFsc2VAMzA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdBdWN0aW9uSW1wbF9ib29sX21lcmdlQDMxCgpuZXdBdWN0aW9uSW1wbF9lbHNlX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTIzCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTIzCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyAxMCAvLyAzOTkwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjMKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgKwogICAgdW5jb3ZlciAyCiAgICArCiAgICBzd2FwCiAgICBiIG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2lmX2Vsc2VAMTUKCm5ld0F1Y3Rpb25JbXBsX2Jvb2xfZmFsc2VAOToKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld0F1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VAMTAKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld1ByaXplQm94QXVjdGlvbkltcGwocHJpemVCb3hUcmFuc2ZlclR4bjogdWludDY0LCBwYXltZW50OiB1aW50NjQsIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgYmlkRmVlOiB1aW50NjQsIHN0YXJ0aW5nQmlkOiB1aW50NjQsIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LCBzdGFydFRpbWVzdGFtcDogdWludDY0LCBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwgZ2F0ZUlEOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcywgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0LCBzZWxsZXJSZWZlcnJlcjogYnl0ZXMpIC0+IHVpbnQ2NDoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDktMzYyCiAgICAvLyBwcml2YXRlIG5ld1ByaXplQm94QXVjdGlvbkltcGwoCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0LAogICAgLy8gICBzZWxsZXJSZWZlcnJlcjogQWNjb3VudAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDEyIDEKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2NQogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICBmcmFtZV9kaWcgLTEyCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIGJ5dGVjIDMxIC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjUtMzY2CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY2CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBmcmFtZV9kaWcgLTEyCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjUtMzY2CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2NC0zNjcKICAgIC8vIGxvZ2dlZEFzc2VydCgoCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyApLCBlcnJCYWRNZXRob2RQcml6ZUJveFRyYW5zZmVyTmVlZGVkKQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDYKICAgIHB1c2hieXRlcyAiRVJSOmVyckJtcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm1wdAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjgKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY4CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xMgogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcxCiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgZXJyTm90QVByaXplQm94KQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyA1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3MQogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIGVyck5vdEFQcml6ZUJveCkKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIGVyck5hcGIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcyCiAgICAvLyBjb25zdCBbb3duZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhwcml6ZUJveCwgQnl0ZXMoUHJpemVCb3hHbG9iYWxTdGF0ZUtleU93bmVyKSkKICAgIHB1c2hieXRlcyAib3duZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY4CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdFByaXplQm94T3duZXIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEA4CiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck5wYm8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBibwoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjkKICAgIC8vIGxvZ2dlZEFzc2VydChiaWRNaW5pbXVtSW5jcmVhc2UgPiAwLCBlcnJCaWRzTXVzdEFsd2F5c0luY3JlYXNlKQogICAgZnJhbWVfZGlnIC03CiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDIzIC8vICJFUlI6ZXJyQmluYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCaW5jCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzAKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCArIDMwMCwgZXJyRW5kTXVzdEJlQXRsZWFzdEZpdmVNaW51dGVzQWZ0ZXJTdGFydCkKICAgIGZyYW1lX2RpZyAtNgogICAgcHVzaGludCAzMDAKICAgICsKICAgIGZyYW1lX2RpZyAtNQogICAgPAogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAyNCAvLyAiRVJSOmVyckVtZm0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRW1mbQoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIGVyckNvbnRyYWN0Tm90U2V0KQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTQKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3MgogICAgLy8gdGhpcy52YWxpZGF0ZVJhZmZsZUNvbmZpZyhiaWRGZWUsIHN0YXJ0aW5nQmlkLCB3ZWlnaHRzTGlzdENvdW50KQogICAgZnJhbWVfZGlnIC05CiAgICBmcmFtZV9kaWcgLTgKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiB2YWxpZGF0ZVJhZmZsZUNvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzQWxnb0JpZCB8fCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYmlkQXNzZXRJRCkpLCBlcnJOb3RPcHRlZEluKQogICAgZnJhbWVfZGlnIC0xMAogICAgYnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9ib29sX3RydWVAMTYKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDE3CgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfdHJ1ZUAxNjoKICAgIGludGNfMSAvLyAxCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc2CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNBbGdvQmlkIHx8IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChiaWRBc3NldElEKSksIGVyck5vdE9wdGVkSW4pCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMjAKICAgIGJ5dGVjIDI1IC8vICJFUlI6ZXJyTm9wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOb3B0CgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzcKICAgIC8vIGNvbnN0IG9wdGluTUJSOiB1aW50NjQgPSBpc0FsZ29CaWQgPyAwIDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgLTEwCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF90ZXJuYXJ5X2ZhbHNlQDIyCiAgICBpbnRjXzAgLy8gMAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF90ZXJuYXJ5X21lcmdlQDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4OAogICAgLy8gaWYgKGlzQWxnb0JpZCkgewogICAgZnJhbWVfZGlnIC0xMAogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfZWxzZV9ib2R5QDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgc3dhcAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM5NAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgKwogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjIDUgLy8gMTMxMTMzMDAKICAgICoKICAgIGR1cAogICAgZnJhbWVfYnVyeSAyCiAgICArCiAgICBkaWcgMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM5NgogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjk1CiAgICAvLyByZXR1cm4gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZSkpCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ5CiAgICAvLyByZXR1cm4gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGV4dHJhUGFnZXMpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaW50YyA2IC8vIDEwMDAwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM5Ni0zOTgKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNyAvLyAxMjYyNTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzk2LTM5OQogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MDMKICAgIC8vIGNvbnN0IGNyZWF0aW9uRmVlID0gdGhpcy5jcmVhdGlvbkZlZSgpCiAgICBjYWxsc3ViIGNyZWF0aW9uRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDA0CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDI4CiAgICBieXRlYyA5IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MDUKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdG90YWxNQlIgKyBjcmVhdGlvbkZlZSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTExCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAyCiAgICBkaWcgMgogICAgKwogICAgPT0KICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAzMAogICAgYnl0ZWMgOSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDA3CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBBc3NldCgwKSwgJycsIFtdKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MDcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFzc2V0KDApLCAnJywgW10pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgYnl0ZWMgMjIgLy8gMHgwMDAwCiAgICBjYWxsc3ViIHJveWFsdGllcwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDA5CiAgICAvLyB0aGlzLnBheUNyZWF0aW9uRmVlKGNyZWF0aW9uRmVlKQogICAgc3dhcAogICAgY2FsbHN1YiBwYXlDcmVhdGlvbkZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxMi00NDEKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MTUKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDE3CiAgICAvLyBiaWRBc3NldElELAogICAgZnJhbWVfZGlnIC0xMAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MTgKICAgIC8vIGJpZEZlZSwKICAgIGZyYW1lX2RpZyAtOQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxOQogICAgLy8gc3RhcnRpbmdCaWQsCiAgICBmcmFtZV9kaWcgLTgKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjAKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyMQogICAgLy8gc3RhcnRUaW1lc3RhbXAsCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjIKICAgIC8vIGVuZFRpbWVzdGFtcCwKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyMwogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjQKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDI1CiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIHVuY292ZXIgOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyNgogICAgLy8gZ2F0ZUlELAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDI4CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjgKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjkKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyOQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyOQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlYyAyNiAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDI5LTQzMAogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vIHNlbGxlclJlZmVycmVyLAogICAgYnl0ZWMgMjcgLy8gMHgwMDIyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDM0CiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQzNQogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MzYKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgaW50Y18zIC8vIDIKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDM3CiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIHB1c2hpbnQgMwogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NDAKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIHB1c2hpbnQgNAogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODEKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgcHVzaGludCAxMQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMjUKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxMi00NDEKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBFeHRyYVByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4MQogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBieXRlYyAyOCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDEyLTQ0MQogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKQogICAgLy8gICB9KQogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsKHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxNgogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MTItNDQxCiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXMoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxMi00NDMKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ0NS00NDgKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDQ3CiAgICAvLyBhcmdzOiBbYXVjdGlvbkFwcC5hZGRyZXNzXQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ0NS00NDgKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIC8vIH0pCiAgICBieXRlYyAzMSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NTEtNDU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDUzCiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ1NAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIHVuY292ZXIgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NTEtNDU1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NTEtNDU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ1OAogICAgLy8gaWYgKCFpc0FsZ29CaWQpIHsKICAgIGZyYW1lX2RpZyAtMTAKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUAzNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2MC00NjkKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDY0CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDY1CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2My00NjYKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NjAtNDY5CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBiaWRBc3NldElELAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ3MwogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDc1LTQ4NAogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDc5CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIGR1cG4gMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDc4LTQ4MQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDc1LTQ4NAogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0ODIKICAgIC8vIHdlaWdodHNMaXN0Q291bnQsCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NzUtNDg0CiAgICAvLyBhdWN0aW9uLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLmlkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAzMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ4NwogICAgLy8gcmV0dXJuIGF1Y3Rpb25BcHAuaWQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Vsc2VfYm9keUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozOTEKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM5MQogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyAxMSAvLyAzMTkyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozOTEKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICBzd2FwCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUAyNgoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF90ZXJuYXJ5X2ZhbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NwogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb0JpZCA/IDAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX3Rlcm5hcnlfbWVyZ2VAMjMKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAxNzoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9tZXJnZUAxOAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuY2hpbGRBcHByb3ZhbENodW5rKGluZGV4OiB1aW50NjQpIC0+IGJ5dGVzOgpjaGlsZEFwcHJvdmFsQ2h1bms6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MQogICAgLy8gcHJvdGVjdGVkIGNoaWxkQXBwcm92YWxDaHVuayhpbmRleDogdWludDY0KTogYnl0ZXMgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjkyCiAgICAvLyBjb25zdCBzaXplID0gYm94ZWRQcm9ncmFtU2l6ZShib3hLZXkpCiAgICBjYWxsc3ViIGJveGVkUHJvZ3JhbVNpemUKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjkzCiAgICAvLyBjb25zdCBvZmZzZXQ6IHVpbnQ2NCA9IGluZGV4ICogTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSAogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDggLy8gNDA5NgogICAgKgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5NAogICAgLy8gaWYgKG9mZnNldCA+PSBzaXplKSB7CiAgICA+PQogICAgYnogY2hpbGRBcHByb3ZhbENodW5rX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTUKICAgIC8vIHJldHVybiBCeXRlcygnJykKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICByZXRzdWIKCmNoaWxkQXBwcm92YWxDaHVua19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTcKICAgIC8vIGNvbnN0IHJlbWFpbmluZzogdWludDY0ID0gc2l6ZSAtIG9mZnNldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTgKICAgIC8vIHJldHVybiBvcC5Cb3guZXh0cmFjdChib3hLZXksIG9mZnNldCwgcmVtYWluaW5nID4gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA/IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggOiByZW1haW5pbmcpCiAgICBkdXAKICAgIGludGMgOCAvLyA0MDk2CiAgICA+CiAgICBpbnRjIDggLy8gNDA5NgogICAgc3dhcAogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk4CiAgICAvLyByZXR1cm4gb3AuQm94LmV4dHJhY3QoYm94S2V5LCBvZmZzZXQsIHJlbWFpbmluZyA+IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggPyBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIIDogcmVtYWluaW5nKQogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5jaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplOiB1aW50NjQpIC0+IHVpbnQ2NDoKY2hpbGRFeHRyYVBhZ2VzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODQKICAgIC8vIHByb3RlY3RlZCBjaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3NwogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbVNpemUoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCkpCiAgICBieXRlY18xIC8vICJiYyIKICAgIGNhbGxzdWIgYm94ZWRQcm9ncmFtU2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMyCiAgICAvLyBjb25zdCBwYWdlczogdWludDY0ID0gKGFwcHJvdmFsU2l6ZSArIGNsZWFyU2l6ZSArIFBST0dSQU1fUEFHRV9TSVpFIC0gMSkgLyBQUk9HUkFNX1BBR0VfU0laRQogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBwdXNoaW50IDIwNDgKICAgICsKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBwdXNoaW50IDIwNDgKICAgIC8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMzCiAgICAvLyBsb2dnZWRBc3NlcnQocGFnZXMgPD0gTUFYX1BST0dSQU1fVE9UQUxfUEFHRVMsIGVyclByb2dyYW1Ub29MYXJnZSkKICAgIGludGNfMiAvLyA4CiAgICA8PQogICAgYm56IGNoaWxkRXh0cmFQYWdlc19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHRsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQdGxnCgpjaGlsZEV4dHJhUGFnZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDMKICAgIC8vIGNvbnN0IGV4dHJhOiB1aW50NjQgPSBwYWdlcyA+IDAgPyBwYWdlcyAtIDEgOiAwCiAgICBkdXAKICAgIGJ6IGNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAtCgpjaGlsZEV4dHJhUGFnZXNfdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICBwdXNoaW50IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0NAogICAgLy8gcmV0dXJuIGV4dHJhID4gbWluRXh0cmFQYWdlcyA/IGV4dHJhIDogbWluRXh0cmFQYWdlcwogICAgPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODUKICAgIC8vIHJldHVybiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QoY2xlYXJTaXplLCBMRUdBQ1lfQ0hJTERfRVhUUkFfUFJPR1JBTV9QQUdFUykKICAgIHB1c2hpbnQgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICByZXRzdWIKCmNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X2ZhbHNlQDc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0MwogICAgLy8gY29uc3QgZXh0cmE6IHVpbnQ2NCA9IHBhZ2VzID4gMCA/IHBhZ2VzIC0gMSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LnJlZnVuZFJlbGVhc2VkKHJlY2VpdmVyOiBieXRlcywgcmVjb3JkZWQ6IHVpbnQ2NCwgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCwgZm9yd2FyZGVkOiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVmdW5kUmVsZWFzZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMDItMTA4CiAgICAvLyBwcm90ZWN0ZWQgcmVmdW5kUmVsZWFzZWQoCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICByZWNvcmRlZDogdWludDY0LAogICAgLy8gICBiYWxhbmNlQmVmb3JlOiB1aW50NjQsCiAgICAvLyAgIG1pbkJlZm9yZTogdWludDY0LAogICAgLy8gICBmb3J3YXJkZWQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDUgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGNvbnN0IHNlbGYgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIGNvbnN0IGdyb3NzOiB1aW50NjQgPSBzZWxmLmJhbGFuY2UgKyBmb3J3YXJkZWQKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTAKICAgIC8vIGNvbnN0IHJlY2VpdmVkOiB1aW50NjQgPSBncm9zcyA+IGJhbGFuY2VCZWZvcmUgPyBncm9zcyAtIGJhbGFuY2VCZWZvcmUgOiAwCiAgICBmcmFtZV9kaWcgLTMKICAgID4KICAgIGJ6IHJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfZmFsc2VANgogICAgZnJhbWVfZGlnIC0zCiAgICAtCgpyZWZ1bmRSZWxlYXNlZF90ZXJuYXJ5X21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MQogICAgLy8gY29uc3QgbWluQWZ0ZXI6IHVpbnQ2NCA9IHNlbGYubWluQmFsYW5jZQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIDwKICAgIGJ6IHJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfZmFsc2VAOQogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICAtCgpyZWZ1bmRSZWxlYXNlZF90ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gcmVjZWl2ZWQgKyByZWxlYXNlZAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIHJldHVybiByZWZ1bmQgPiByZWNvcmRlZCA/IHJlY29yZGVkIDogcmVmdW5kCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtNAogICAgPgogICAgZnJhbWVfZGlnIC00CiAgICBzd2FwCiAgICBzZWxlY3QKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTEwCiAgICAvLyBpZiAocmVmdW5kID4gMCkgewogICAgYnogcmVmdW5kUmVsZWFzZWRfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTEKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQ6IHJlZnVuZCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIC01CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKcmVmdW5kUmVsZWFzZWRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTEzCiAgICAvLyByZXR1cm4gcmVmdW5kCiAgICByZXRzdWIKCnJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfZmFsc2VAOToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTIKICAgIC8vIGNvbnN0IHJlbGVhc2VkOiB1aW50NjQgPSBtaW5CZWZvcmUgPiBtaW5BZnRlciA/IG1pbkJlZm9yZSAtIG1pbkFmdGVyIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgcmVmdW5kUmVsZWFzZWRfdGVybmFyeV9tZXJnZUAxMAoKcmVmdW5kUmVsZWFzZWRfdGVybmFyeV9mYWxzZUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MAogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGdyb3NzID4gYmFsYW5jZUJlZm9yZSA/IGdyb3NzIC0gYmFsYW5jZUJlZm9yZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfbWVyZ2VANwo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAMAAEIArjvBNSvoAagjQakh02AINCGA5itGOC9EyYgCWFraXRhX2RhbwJiYwQVH3x1DGFraXRhX2VzY3JvdwZ3YWxsZXQDYWFsC0VSUjplcnJOZGFvC0VSUjplcnJDbnN0FmNoaWxkX2NvbnRyYWN0X3ZlcnNpb24LRVJSOmVycklwYXkBAAtFUlI6ZXJyTnBibwtFUlI6ZXJySXhmcgQ+oRgyBMU7MswIcmVmZXJyZXIFYXBwSUQHdmVyc2lvbgtFUlI6ZXJyTmF1YwZzZWxsZXIGZnVuZGVyA3BhbAIAAAtFUlI6ZXJyQmluYwtFUlI6ZXJyRW1mbQtFUlI6ZXJyTm9wdAIACgIAIgQLgQFDBDTOx5gEvXFI0ASt+SrkgATqkYDdNhoAjgEAuTEZFEQxGEEAooIHBLjIYo0E0VSP/wS64morBHPwAiMEFxTaZQSA9EVBBKXUKzonDoIIBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eAEcxEQcDYaAI4QAvEDlgQqBK4FIQWEBecGlQbpB3EHiwljCY8KEAAqAAEAgCQVH3x1AAAAAAAAieQAAAAAAMgX1AAAAAAAAEnUAAAAAAAASdSwI0MjQ4AEgRU2KDYaAI4BAmEAMRmBBBIxGBBEQgl/igEBi/+9QAAEJwewAImKBAIiSYv/IllAAAqBiCeL/08DTwOJsYv9cQtEi/4VFlcGAov+UIv9FgEBIxaL/CcFZUiBSFuyGIAEH/fHTLIaTwOyGk8CshpMshqL/7IashqACQAHcm95YWx0ebIagQayECKyAbO0PklXBABLAVcABCoSREkiWSUITBUSRFcGAEmMABVBAAWLABeMAYsBIQkNQQAJIQmL/08DTwOJiwGL/08DTwOJigIBi/9BABeL/icFZUgkW3IIRIv/cABFAUAAAzIQiSKJigIBIkmL/icFZUiBWFsyDjEAMg2L/0AAGUgyA0kiFk8DSU4CUE8DUExQTFAnClCMAImL/0EABYsCQAEjIkAAD4ALRVJSOmVyckhud2ywAElAAA+AC0VSUjplcnJIdG9wsAAiTgKL/xNBAEZFAYv/gBBzcGVuZGluZ19hZGRyZXNzZUyMAUEAGIsBFYEgEkEAD4sBSwESQQAHSYsDE0AAD4ALRVJSOmVyckhuYmSwACNMi/+AEmNvbnRyb2xsZWRfYWRkcmVzc2VBAAhJFYEgEkAAD4ALRVJSOmVyckl3bHSwAElLAhJBAEgjTIv/Jw9lQQA2SRWBIBJBAC5OA0sCSwFPA0lOA01MQQAXTIv/Fk8CUExQTFBMUCcKIk8DVFBC/w1FATIDQv/jSDIDTgNC/8yL/3IITE4CQAAHRQEiTEL/qUlLAhJBAAtMcwJIMgMSTEL/l0lzAkhPAhJMQv+Mi/9yB0yMAEEAEosCFicQTFADiwASQQAEI0L+wiJC/r42GgFJIlklCEsBFRJEVwIANhoCSSJZJQhLARUSRFcCADYaA0kVJBJEFzYaBEkVSwEiWUmBChJESwJMSwJSIlmBDAgSRCcRTwRnJwhPA2coTwJnK0xnI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJIlklCEsBFRJEVwIANhoCSSJZgSALJQhLARUSRDYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEFzYaBkkVJBJEFzYaB0kVJBJEFzYaCEkVJBJEFzYaCUkVJBJEFzYaCkkVgSASRDYaC0kVJBJEFzYaDEkVJBJEFyIoZURMiP2TV2ggiAe/SBYqTFCwI0MxFiUJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJIlklCEsBFRJEVwIANhoCSSJZgSALJQhLARUSRDYaA0kVJBJEFzYaBEkVJBJEFzYaBUkVJBJEFzYaBkkVJBJEFzYaB0kVJBJEFzYaCEkVJBJEFzYaCUkVJBJEFzYaCkkVgSASRDYaC0kVJBJEF4gGkIgHK0gWKkxQsCNDMRYlCUk4EIEGEkQxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSRUkEkQXNhoHSRUkEkQXNhoISRWBIBJENhoJSRUkEkQXNhoKSRUkEkQXIihlREyI/HpXaCCICXcWKkxQsCNDMRYlCUk4EIEGEkQxFiMJSTgQIxJENhoBSRUkEkQXNhoCSRUkEkQXNhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSRUkEkQXNhoHSRUkEkQXNhoISRWBIBJENhoJSRUkEkQXiAWYiAkEFipMULAjQzYaAUkVJBJEF0lyB0QyChJAAAQnErAASScTZUgxABJAAAQnC7AAMgpzAEQyCnMBRE8CSScUZUhJVwAgTIEgW7GBBbIZTwKyGIAEJIfDLLIagQayECKyAbNPA08DIogLfEgjQzYaAUkVJBJEF0lyB0QyChJAAAQnErAASScTZUgxABJAAAQnC7AAMgpzAEQyCnMBRE8CSScUZUhJVwAgTIEgW7GBBbIZTwKyGIAEMfJqm7IagQayECKyAbNPA08DIogLGUgjQ4AANhoBSRUjEkQiU0k2GgJJFSQSRBdJTgI2GgNJFSQSRBdOAzYaBEkVJBJEF04FFEwyEExBAG9MFAtFBU8CQABLIihlRE8CiPrJIQQISwFAACpFASEECDIBSwMISwIhBQsICIEEiApwIwghBgshBwgIiAQgCBYqTFCwI0MiKGVETwKI+o4hCggIQv/LRQFJQAAGSCEEQv+/IihlREyI+nMhCwhC/7ElI08DTUL/izYaAUkiWSUISwEVEkRXAgA2GgJJFSQSRBciKGVEJwRlSElAACVIMQAyCRJAAAQnBrAAJwhPAmcpvUUBQAAGKUy5SCNDKUzTQv/4MQBMcghEEkL/1zYaAUkVJBJEF0k2GgJJIlklCEsBFRJEVwIATIHwDwoxFkwJIwlJTgM4EIEGEkEAVEsCOBgyCBJBAEpLAjgbgQMSQQBASwI4GUAAOUsCORoAJw4SQQAuSwI4ADEAEkEAJCNAAA+AC0VSUjplcnJJY29ysAApvUUBQAAEJwewAClOArsjQyJC/9kxACIoZUQnBGVIcghEEkAABCcGsAApvEgjQzEWIwlHAjgQIxJENhoBSRUkEkQXSU4DIitlTElOAk4FRCIoZUUBRCVbcghETHAASU4CTgNIFEw4BzIKEkAAD4ALRVJSOmVycklwbXKwAE8COAgyECNPAwgLEkAAD4ALRVJSOmVycklwbWGwALEyCksDshEishKyFIEEshAisgGzQAFTRwIiWUsBFVJXAgCAABNBAUIiKGVESScEZUhMSScVZUhJVwgITgIkW04DIitlTElOAkUHREkiWUsBFVJJTgJXAgBMJwRlSEyxIxZOAkkVFlcGAkxQgAQAAQACTFBMshiABDqyiVuyGrIagQayECKyAbO0PklXBABLAVcABCoSREkiWYEpCyUITBUSRFcGKSJbSUAAD4ALRVJSOmVyck5lc2OwAEsGJVtJTwISQAAPgAtFUlI6ZXJyV2VzY7AAsU8ESbIYgARa3zOPshpPBLIaTwKyGk8CshqACgABAAAAAAAAAACyGicWshqBBrIQIrIBIihlRQFETElyCERLBUlOA3AARQEUMhALtkxyCESyB7III7IQIrIBtksBFkwWgAIAAUxQTwOyGIAEaDXjvLIaTLIagAGAshqyGoEGshAisgG2shiABGzD9gayGoEGshAisgGzI0M2GgFJFSQSRBciKGVFAUQiK2VEJVtyCERMcABFARQyECNPAggLFipMULAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACIoZUQnBGVIcghEEkAABCcGsAArTGcjQzYaAUkiWSUISwEVEkRXAgAxACIoZUQnBGVIcghEEkAABCcGsAAiKGVEJxVlSIEQWzINEkAAD4ALRVJSOmVyckl1cGewACcRTGcjQzYaAUkVJBJEFzEAIihlRCcEZUhyCEQSQAAEJwawAChMZyNDigMAi/1BACyL/kAAD4ALRVJSOmVyclNicnGwAIv/gQ8OQAAPgAtFUlI6ZXJyVG13YrAAiYv/Qf/6gAtFUlI6ZXJyV25iZrAAIihlRIAIbmZ0X2ZlZXNlSIEwW4mKAQCL/0EAF7EiK2VEJVtyCESL/7IIsgcjshAisgGziYoAASJJKGVEMQBLAYADb2FsZUiBGFtPAicFZUiBWFtOArGyGIAEPBpvM7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEKhJESSJZJQhMFRJEVwYASRUkE0EAFkgiMgNLAUAABUUBjACJSCcPZUhC//UXSUEABYsBQAAIIiJOAk1C/9pJcgdMjABBABKLARYnEExQA4sAEkEABCNC/94iQv/aig4CIoAASYv5QAAEJxewAIv6gawCCIv7DEAABCcYsAApvUUBQAAEJwewAIv3i/iL/oj+sov2FIv2QQALMgqL9nAARQFBAoYjQAAEJxmwADIQJSNPA00LjAEiKGVEi/M4EUlOAoj1RiEECEyL9kACSkwhBAhMMgGLAQiL/iEFC0mMAghLAgiBBIgE5yMIIQYLIQcICE4CiP6VTgKL8jgHMgoSQAAEJwmwAIvyOAhLBEsECBJAAAQnCbAAi/M4ADEAEkAABCcMsABJi/YTQAAPgAtFUlI6ZXJyUGliYbAAi/M4FDIKEkAABCcMsACL8zgSSU4FQAAEJwywAElxCkQyAxJBAbJJcQlEMgMSQQGoI0AAD4ALRVJSOmVyclBzemKwACIoZURLAYv0i/WI89mM9UxPA4j+DLFJFov2FklOA4wAi/cWi/gWi/kWi/oWi/sWi/I4AE8LFlAxAE8KFov8FiInCGVESRUWVwYCTFAiKGVEIitlREwWJxpQTFAnG4v/UExQIogDwSOIA70liAO5gQOIA7SBBIgD2YELsjWBGbI0IrIZsjgnHLJCTwOyQE8CskBMskCyQCcdshpLC7IaJwqyGk8NshpPCrIaTwmyGk8IshpPB7IaTwayGk8FshpPBLIaTwOyGk8CshqL/bIaTLIashqBBrIQIrIBs7cAPUlOA7FJcghEMgFPBgiyCLIHI7IQIrIBs7FJcghEMhCyCLIHI7IQIrIBtiKyGUmyGCcNshpMshqBBrIQIrIBs7FyCERMshFPArISshSBBLIQIrIBs4v2QQAosUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJw2yGosAshqBBrIQIrIBs4v3QQAqsUcCcghEiwKyCLIHI7IQIrIBtov+FiKyGUyyGCceshqyGoEGshAisgGzi/WMAYwAiSJC/lUiKGVEi/aI8uohCghPAghMQv2oIkL9d4oMASKAAEmL9DkaACcfEkECYYv0OBlAAlojQAAPgAtFUlI6ZXJyQm1wdLAAIihlRIv0OBhJjAFJcgdETwInBWVIgRhbcghEEkSABW93bmVyZUgyChJAAAQnC7AAi/lAAAQnF7AAi/qBrAIIi/sMQAAEJxiwACm9RQFAAAQnB7AAi/eL+Iv+iPuMi/ZBAAsyCov2cABFAUEB1iNAAAQnGbAAi/ZAAcQii/ZAAa4hBEwyAQiL/iEFC0mMAghLAQiBBIgB3iMIIQYLIQcICIj7jov1OAcyChJAAAQnCbAAi/U4CEsCSwIIEkAABCcJsAAiKGVEIoAAJxaI8TxITIj7crGLAUlOAhaL9hZJTgOMAIv3Fov4Fov5Fov6Fov7Fov1OABPChZQMQBPCBaL/BYiJwhlREkVFlcGAkxQIihlRCIrZURMFicaUExQJxuL/1BMUCKIASMjiAEfJYgBG4EDiAEWgQSIATuBC7I1gRmyNCKyGbI4JxyyQk8DskBPArJATLJAskAnHbIaTwuyGoABgLIaTwuyGk8KshpPCbIaTwiyGk8HshpPBrIaTwWyGk8EshpPA7IaTwKyGov9shpMshqyGoEGshAisgGztwA9SU4CsUlyCERPArIYJx+yGrIagQayECKyAbOxcghEMgFPAwiyCLIHI7IQIrIBs4v2QQAosUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJw2yGosAshqBBrIQIrIBs4v3QQAqsUcCcghEiwKyCLIHI7IQIrIBtov+FiKyGUyyGCceshqyGoEGshAisgGzjACJIihlRIv2iPB5IQsITEL+RTIQQv44IkL+JyJC/aOKAQEpiO+qSYv/IQgLSU8CD0EABUYCgACJSU4CCUkhCA0hCExNKU4CuomKAQEpiO+Ai/8IgYAQCCMJgYAQCkkkDkAAD4ALRVJSOmVyclB0bGewAElBAAwjCUmBAw2BA04CTYlIIkL/8YoFATIKSXMARIv/CEmL/Q1BADeL/QlMcwFMSU8CRIv+DEEAIYv+TAkISYv8DYv8TE1JQQAPsUmyCIv7sgcjshAisgGziUgiQv/eSCJC/8c=", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
var AuctionFactoryParamsFactory = class _AuctionFactoryParamsFactory {
  /**
   * Gets available create ABI call param factories
   */
  static get create() {
    return {
      _resolveByMethod(params) {
        switch (params.method) {
          case "create":
          case "create(string,string,uint64,(string,uint64))void":
            return _AuctionFactoryParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the AuctionFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method
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
            return _AuctionFactoryParamsFactory.update.update(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs update ABI call params for the AuctionFactory smart contract using the update(string)void ABI method
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
     * Constructs a no op call for the newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64 ABI method
     *
    * New ASA-prize auction (principal ABI, spec §6.6). The seller stays `Txn.sender`; `wallet` is the
    seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
    (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the
    child pays at settlement. The +50,000 µA global is part of `newAuctionCost`, and so is the DAO's
    auction creation fee.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params) {
    return {
      ...params,
      method: "newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.name, params.args.proof, params.args.bidAssetId, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.gateId, params.args.marketplace, params.args.weightsListCount, params.args.wallet]
    };
  }
  /**
     * Constructs a no op call for the newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 ABI method
     *
    * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.
    The child gets `seller_referrer` = the seller's registry referrer, resolved at creation.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params) {
    return {
      ...params,
      method: "newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.name, params.args.proof, params.args.bidAssetId, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.gateId, params.args.marketplace, params.args.weightsListCount]
    };
  }
  /**
   * Constructs a no op call for the newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64 ABI method
   *
   * New prize-box auction (principal ABI, spec §6.6); see `newAuction`.
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params) {
    return {
      ...params,
      method: "newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.bidAssetId, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.gateId, params.args.marketplace, params.args.weightsListCount, params.args.wallet]
    };
  }
  /**
   * Constructs a no op call for the newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 ABI method
   *
   * LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation).
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params) {
    return {
      ...params,
      method: "newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.prizeBoxTransferTxn, params.args.payment, params.args.bidAssetId, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.gateId, params.args.marketplace, params.args.weightsListCount]
    };
  }
  /**
   * Constructs a no op call for the deleteAuctionApp(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static deleteAuctionApp(params) {
    return {
      ...params,
      method: "deleteAuctionApp(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.appId]
    };
  }
  /**
   * Constructs a no op call for the cancelAuction(uint64)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static cancelAuction(params) {
    return {
      ...params,
      method: "cancelAuction(uint64)void",
      args: Array.isArray(params.args) ? params.args : [params.args.appId]
    };
  }
  /**
     * Constructs a no op call for the newAuctionCost(bool,uint64,uint64,uint64)uint64 ABI method
     *
    * exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee
    plus the storage costs of the child. Only the storage part is the funder's refundable deposit.
  
     *
     * @param params Parameters for the call
     * @returns An `AppClientMethodCallParams` object for the call
     */
  static newAuctionCost(params) {
    return {
      ...params,
      method: "newAuctionCost(bool,uint64,uint64,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.isPrizeBox, params.args.bidAssetId, params.args.prizeAssetId, params.args.weightsListCount]
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
   * Constructs a no op call for the mbr()(uint64,uint64,uint64,uint64) ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static mbr(params) {
    return {
      ...params,
      method: "mbr()(uint64,uint64,uint64,uint64)",
      args: Array.isArray(params.args) ? params.args : []
    };
  }
};
var AuctionFactoryFactory = (_class3 = class {
  /**
   * The underlying `AppFactory` for when you want to have more flexibility
   */
  
  /**
   * Creates a new instance of `AuctionFactoryFactory`
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
    return new AuctionFactoryClient(this.appFactory.getAppClientById(params));
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
    return new AuctionFactoryClient(await this.appFactory.getAppClientByCreatorAndName(params));
  }
  /**
   * Idempotently deploys the AuctionFactory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  async deploy(params = {}) {
    var _a, _b;
    const result = await this.appFactory.deploy({
      ...params,
      createParams: ((_a = params.createParams) == null ? void 0 : _a.method) ? AuctionFactoryParamsFactory.create._resolveByMethod(params.createParams) : params.createParams ? params.createParams : void 0,
      updateParams: ((_b = params.updateParams) == null ? void 0 : _b.method) ? AuctionFactoryParamsFactory.update._resolveByMethod(params.updateParams) : params.updateParams ? params.updateParams : void 0
    });
    return { result: result.result, appClient: new AuctionFactoryClient(result.appClient) };
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
       * Creates a new instance of the AuctionFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create params
       */
      create: (params) => {
        return this.appFactory.params.create(AuctionFactoryParamsFactory.create.create(params));
      }
    },
    /**
     * Gets available deployUpdate methods
     */
    deployUpdate: {
      /**
       * Updates an existing instance of the AuctionFactory smart contract using the update(string)void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The deployUpdate params
       */
      update: (params) => {
        return this.appFactory.params.deployUpdate(AuctionFactoryParamsFactory.update.update(params));
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
       * Creates a new instance of the AuctionFactory smart contract using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create transaction
       */
      create: (params) => {
        return this.appFactory.createTransaction.create(AuctionFactoryParamsFactory.create.create(params));
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
       * Creates a new instance of the AuctionFactory smart contract using an ABI method call using the create(string,string,uint64,(string,uint64))void ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The create result
       */
      create: async (params) => {
        const result = await this.appFactory.send.create(AuctionFactoryParamsFactory.create.create(params));
        return { result: { ...result.result, return: result.result.return }, appClient: new AuctionFactoryClient(result.appClient) };
      }
    }
  }}
}, _class3);
var AuctionFactoryClient = (_class4 = class _AuctionFactoryClient {
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
   * Returns a new `AuctionFactoryClient` client, resolving the app by creator address and name
   * using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).
   * @param params The parameters to create the app client
   */
  static async fromCreatorAndName(params) {
    return new _AuctionFactoryClient(await _appclient.AppClient.fromCreatorAndName({ ...params, appSpec: APP_SPEC2 }));
  }
  /**
   * Returns an `AuctionFactoryClient` instance for the current network based on
   * pre-determined network-specific app IDs specified in the ARC-56 app spec.
   *
   * If no IDs are in the app spec or the network isn't recognised, an error is thrown.
   * @param params The parameters to create the app client
   */
  static async fromNetwork(params) {
    return new _AuctionFactoryClient(await _appclient.AppClient.fromNetwork({ ...params, appSpec: APP_SPEC2 }));
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
       * Updates an existing instance of the AuctionFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update params
       */
      update: (params) => {
        return this.appClient.params.update(AuctionFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AuctionFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.params.bare.clearState(params);
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
         *
        * New ASA-prize auction (principal ABI, spec §6.6). The seller stays `Txn.sender`; `wallet` is the
        seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
        (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the
        child pays at settlement. The +50,000 µA global is part of `newAuctionCost`, and so is the DAO's
        auction creation fee.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params));
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
         *
        * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.
        The child gets `seller_referrer` = the seller's registry referrer, resolved at creation.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
     *
     * New prize-box auction (principal ABI, spec §6.6); see `newAuction`.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation).
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `deleteAuctionApp(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteAuctionApp: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.deleteAuctionApp(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `cancelAuction(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    cancelAuction: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.cancelAuction(params));
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuctionCost(bool,uint64,uint64,uint64)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee
        plus the storage costs of the child. Only the storage part is the funder's refundable deposit.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    newAuctionCost: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newAuctionCost(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    initBoxedContract: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    loadBoxedContract: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.params.call(AuctionFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    optInCost: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    updateAkitaDao: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.mbr(params));
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
       * Updates an existing instance of the AuctionFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update transaction
       */
      update: (params) => {
        return this.appClient.createTransaction.update(AuctionFactoryParamsFactory.update.update(params));
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AuctionFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.createTransaction.bare.clearState(params);
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
         *
        * New ASA-prize auction (principal ABI, spec §6.6). The seller stays `Txn.sender`; `wallet` is the
        seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
        (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the
        child pays at settlement. The +50,000 µA global is part of `newAuctionCost`, and so is the DAO's
        auction creation fee.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params));
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
         *
        * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.
        The child gets `seller_referrer` = the seller's registry referrer, resolved at creation.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
     *
     * New prize-box auction (principal ABI, spec §6.6); see `newAuction`.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation).
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `deleteAuctionApp(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteAuctionApp: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.deleteAuctionApp(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `cancelAuction(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    cancelAuction: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.cancelAuction(params));
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuctionCost(bool,uint64,uint64,uint64)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee
        plus the storage costs of the child. Only the storage part is the funder's refundable deposit.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    newAuctionCost: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newAuctionCost(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    initBoxedContract: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.initBoxedContract(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    loadBoxedContract: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.loadBoxedContract(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    deleteBoxedContract: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.deleteBoxedContract(params));
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.optIn(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    optInCost: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.optInCost(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDaoEscrow: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.updateAkitaDaoEscrow(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    updateAkitaDao: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.updateAkitaDao(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    opUp: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.opUp(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    mbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.mbr(params));
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
       * Updates an existing instance of the AuctionFactory smart contract using the `update(string)void` ABI method.
       *
       * @param params The params for the smart contract call
       * @returns The update result
       */
      update: async (params) => {
        const result = await this.appClient.send.update(AuctionFactoryParamsFactory.update.update(params));
        return { ...result, return: result.return };
      }
    },
    /**
     * Makes a clear_state call to an existing instance of the AuctionFactory smart contract.
     *
     * @param params The params for the bare (raw) call
     * @returns The clearState result
     */
    clearState: (params) => {
      return this.appClient.send.bare.clearState(params);
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
         *
        * New ASA-prize auction (principal ABI, spec §6.6). The seller stays `Txn.sender`; `wallet` is the
        seller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here
        (invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the
        child pays at settlement. The +50,000 µA global is part of `newAuctionCost`, and so is the DAO's
        auction creation fee.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
         *
        * LEGACY shim (spec §7.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.
        The child gets `seller_referrer` = the seller's registry referrer, resolved at creation.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64` ABI method.
     *
     * New prize-box auction (principal ABI, spec §6.6); see `newAuction`.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation).
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `deleteAuctionApp(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteAuctionApp: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.deleteAuctionApp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `cancelAuction(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    cancelAuction: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.cancelAuction(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `newAuctionCost(bool,uint64,uint64,uint64)uint64` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee
        plus the storage costs of the child. Only the storage part is the funder's refundable deposit.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    newAuctionCost: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newAuctionCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `initBoxedContract(string,uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    initBoxedContract: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.initBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `loadBoxedContract(uint64,byte[])void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    loadBoxedContract: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.loadBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `deleteBoxedContract()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    deleteBoxedContract: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.deleteBoxedContract(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the AuctionFactory smart contract using the `optIn(pay,uint64)void` ABI method.
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
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.optIn(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `optInCost(uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    optInCost: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.optInCost(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAOEscrow((string,uint64))void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDaoEscrow: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.updateAkitaDaoEscrow(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAO(uint64)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    updateAkitaDao: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.updateAkitaDao(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `opUp()void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    opUp: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.opUp(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    mbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.mbr(params));
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
    return new _AuctionFactoryClient(this.appClient.clone(params));
  }
  /**
     * Makes a readonly (simulated) call to the AuctionFactory smart contract using the `newAuctionCost(bool,uint64,uint64,uint64)uint64` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee
    plus the storage costs of the child. Only the storage part is the funder's refundable deposit.
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async newAuctionCost(params) {
    const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newAuctionCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AuctionFactory smart contract using the `optInCost(uint64)uint64` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async optInCost(params) {
    const result = await this.appClient.send.call(AuctionFactoryParamsFactory.optInCost(params));
    return result.return;
  }
  /**
   * Makes a readonly (simulated) call to the AuctionFactory smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
   *
   * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
   *
   * @param params The params for the smart contract call
   * @returns The call result
   */
  async mbr(params = { args: [] }) {
    const result = await this.appClient.send.call(AuctionFactoryParamsFactory.mbr(params));
    return result.return;
  }
  /**
   * Methods to access state for the current AuctionFactory app
   */
  __init14() {this.state = {
    /**
     * Methods to access global state for the current AuctionFactory app
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
     * Methods to access box state for the current AuctionFactory app
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
       * Add a newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64 method call against the AuctionFactory contract
       */
      newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the AuctionFactory contract
       */
      newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64 method call against the AuctionFactory contract
       */
      newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the AuctionFactory contract
       */
      newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64(params)));
        resultMappers.push((v) => client.decodeReturnValue("newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a deleteAuctionApp(uint64)void method call against the AuctionFactory contract
       */
      deleteAuctionApp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteAuctionApp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a cancelAuction(uint64)void method call against the AuctionFactory contract
       */
      cancelAuction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cancelAuction(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a newAuctionCost(bool,uint64,uint64,uint64)uint64 method call against the AuctionFactory contract
       */
      newAuctionCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newAuctionCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("newAuctionCost(bool,uint64,uint64,uint64)uint64", v));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the AuctionFactory contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the AuctionFactory contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the AuctionFactory contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the AuctionFactory contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the AuctionFactory contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        resultMappers.push((v) => client.decodeReturnValue("optInCost(uint64)uint64", v));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the AuctionFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the AuctionFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a opUp()void method call against the AuctionFactory contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        resultMappers.push(void 0);
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64,uint64) method call against the AuctionFactory contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr()(uint64,uint64,uint64,uint64)", v));
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
       * Add a clear state call to the AuctionFactory contract
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

// src/auction/factory.ts
var AuctionFactorySDK = class extends _chunkN5J2GB5Wjs.BaseSDK {
  constructor(params) {
    super({ factory: AuctionFactoryFactory, ...params }, _chunkH2KYIJ7Kjs.ENV_VAR_NAMES.AUCTION_FACTORY_APP_ID);
  }
  /**
   * Creates a new auction with an ASA prize and returns an AuctionSDK instance.
   * @returns AuctionSDK for the newly created auction
   */
  async newAuction({
    sender,
    signer,
    isPrizeBox = false,
    name,
    proof,
    bidAssetId,
    bidFee,
    startingBid,
    bidMinimumIncrease,
    startTimestamp,
    endTimestamp,
    gateId,
    marketplace,
    weightsListCount,
    wallet = 0n,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const prizeAsset = isPrizeBox ? 0n : rest.prizeAsset;
    const cost = await this.cost({ isPrizeBox, bidAssetId, prizeAssetId: BigInt(prizeAsset), weightsListCount });
    const payment = await this.client.algorand.createTransaction.payment({
      ...sendParams,
      amount: _algokitutils.microAlgo.call(void 0, cost),
      receiver: this.client.appAddress
    });
    let appId;
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new (0, _chunk7PR6FWPZjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
      ({ return: appId } = await this.client.send.newPrizeBoxAuctionApplPayUint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64({
        ...sendParams,
        args: {
          prizeBoxTransferTxn,
          payment,
          bidAssetId,
          bidFee,
          startingBid,
          bidMinimumIncrease,
          startTimestamp,
          endTimestamp,
          gateId,
          marketplace,
          weightsListCount,
          wallet: BigInt(wallet)
        }
      }));
    } else {
      const { prizeAsset: prizeAsset2, prizeAmount } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset2),
        receiver: this.client.appAddress
      });
      ({ return: appId } = await this.client.send.newAuctionPayAxferStringByte_32Uint64Uint64Uint64Uint64Uint64Uint64Uint64AddressUint64Uint64Uint64({
        ...sendParams,
        args: {
          payment,
          assetXfer,
          name,
          proof,
          bidAssetId,
          bidFee,
          startingBid,
          bidMinimumIncrease,
          startTimestamp,
          endTimestamp,
          gateId,
          marketplace,
          weightsListCount,
          wallet: BigInt(wallet)
        }
      }));
    }
    if (appId === void 0) {
      throw new Error("Failed to create new auction");
    }
    return new AuctionSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: sendParams.sender,
        defaultSigner: sendParams.signer
      }
    });
  }
  /**
   * Gets an AuctionSDK instance for an existing auction.
   * @param appId - The app ID of the auction
   * @returns AuctionSDK for the specified auction
   */
  get({ appId }) {
    return new AuctionSDK({
      algorand: this.algorand,
      factoryParams: {
        appId,
        defaultSender: this.sendParams.sender,
        defaultSigner: this.sendParams.signer
      }
    });
  }
  /**
   * Gets the cost to create a new auction.
   */
  async cost({ isPrizeBox, bidAssetId, prizeAssetId, weightsListCount }) {
    return await this.client.newAuctionCost({ args: { isPrizeBox, bidAssetId, prizeAssetId, weightsListCount } });
  }
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
   * Deletes an auction after all cleanup is complete.
   * Can only be called after prize is claimed, raffle prize is claimed, and all MBR is refunded.
   */
  async deleteAuction({ sender, signer, appId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.deleteAuctionApp({
      ...sendParams,
      args: { appId }
    });
  }
  /**
   * Cancels an auction before it starts.
   * Returns the prize and MBR to the seller.
   */
  async cancelAuction({ sender, signer, appId }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.cancelAuction({
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
async function newAuction({
  factoryParams,
  algorand,
  readerAccount,
  sendParams,
  ...auctionParams
}) {
  const factory = new AuctionFactorySDK({ factoryParams, algorand, readerAccount, sendParams });
  return await factory.newAuction(auctionParams);
}

// src/auction/errors.ts
var AUCTION_ERROR_MESSAGES = _chunkZGCVKZRLjs.withErrorCodeAliases.call(void 0, {
  // --- Factory setup validation -------------------------------------------
  BINC: "Bids must always increase",
  MNOP: "Marketplace must be opted into payment asset",
  EMFM: "Ending round must be at least 100 rounds after starting",
  ACNF: "App creator not found",
  NAUC: "Not an auction",
  // --- Auction setup ------------------------------------------------------
  NAPP: "Not applicable to this auction",
  M3HB: "Must allocate at least three highest bids chunks",
  // --- Auction lifecycle --------------------------------------------------
  ANLV: "Auction is not live",
  AHNE: "Auction has not ended",
  AAST: "Auction has already started",
  NETM: "Not enough time has passed",
  // --- Prize claim --------------------------------------------------------
  PACL: "Prize already claimed",
  PZNC: "Prize not claimed",
  // --- Highest bid gathering ----------------------------------------------
  HBAG: "Highest bids already gathered",
  HBNG: "Highest bids not gathered",
  // --- Bids ---------------------------------------------------------------
  CRMR: "Cannot refund most recent bid",
  BNFD: "Bid not found",
  BEXS: "Bid already exists",
  BARF: "Bid already refunded",
  TMPT: "Too many participants",
  // --- Raffle winner ------------------------------------------------------
  WADR: "Winner already drawn",
  WNNF: "Winning number not found",
  WAFD: "Winner already found",
  WNFD: "Winner not found",
  RNPC: "Raffle not prize claimed",
  RAPC: "Raffle prize already claimed",
  RWNF: "Raffle winner not found",
  RWHC: "Raffle winner has not claimed",
  // --- Refunds / cleanup --------------------------------------------------
  ARFC: "All refunds complete",
  NARC: "Not all refunds complete",
  SHBB: "Still has highest bids boxes",
  // --- Auction plugin -----------------------------------------------------
  NENA: "Not enough of the asset",
  PCBA: "Auction prize cannot be ALGO",
  CNAF: "Creator is not the auction factory",
  // --- Audit 2026-10 fixes ------------------------------------------------
  COBS: "The current highest bidder cannot outbid itself",
  SBRQ: "Auctions with a bid fee need a starting bid above zero",
  TMWB: "Too many weights boxes (maximum 15)",
  PIBA: "The prize cannot be the bid asset",
  PSZB: "The prize asset has a clawback or freeze address",
  WNBF: "Only auctions with a bid fee can have weights boxes",
  BNRD: "The beacon value for the committed round is not available yet"
});
var translateAuctionError = _chunkZGCVKZRLjs.makeErrorTranslator.call(void 0, AUCTION_ERROR_MESSAGES);

// src/auction/index.ts
var AUCTION_BEACON_LAG_ROUNDS = 4n;
var SELLER_REFERRER_KEY = "seller_referrer";
function directGateCtx(sender) {
  return { principal: sender, wallet: 0n, spender: sender };
}
var AuctionSDK = class extends _chunkN5J2GB5Wjs.BaseSDK {
  constructor(params) {
    super({ factory: AuctionFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the auction.
   */
  async state() {
    var _a, _b, _c, _d;
    const state = await this.client.state.global.getAll();
    return {
      prize: _nullishCoalesce(state.prize, () => ( 0n)),
      isPrizeBox: Boolean(_nullishCoalesce(state.isPrizeBox, () => ( 0n))),
      prizeClaimed: Boolean(_nullishCoalesce(state.prizeClaimed, () => ( 0n))),
      bidAsset: _nullishCoalesce(state.bidAsset, () => ( 0n)),
      bidFee: _nullishCoalesce(state.bidFee, () => ( 0n)),
      startingBid: _nullishCoalesce(state.startingBid, () => ( 0n)),
      bidMinimumIncrease: _nullishCoalesce(state.bidMinimumIncrease, () => ( 0n)),
      startTimestamp: _nullishCoalesce(state.startTimestamp, () => ( 0n)),
      endTimestamp: _nullishCoalesce(state.endTimestamp, () => ( 0n)),
      seller: _nullishCoalesce(((_a = state.seller) == null ? void 0 : _a.toString()), () => ( "")),
      creatorRoyalty: _nullishCoalesce(state.creatorRoyalty, () => ( 0n)),
      marketplace: _nullishCoalesce(((_b = state.marketplace) == null ? void 0 : _b.toString()), () => ( "")),
      marketplaceRoyalties: _nullishCoalesce(state.marketplaceRoyalties, () => ( 0n)),
      gateId: _nullishCoalesce(state.gateId, () => ( 0n)),
      vrfFailureCount: _nullishCoalesce(state.vrfFailureCount, () => ( 0n)),
      refundCount: _nullishCoalesce(state.refundCount, () => ( 0n)),
      bidTotal: _nullishCoalesce(state.bidTotal, () => ( 0n)),
      weightedBidTotal: _nullishCoalesce(state.weightedBidTotal, () => ( 0n)),
      highestBid: _nullishCoalesce(state.highestBid, () => ( 0n)),
      bidID: _nullishCoalesce(state.bidId, () => ( 0n)),
      raffleAmount: _nullishCoalesce(state.raffleAmount, () => ( 0n)),
      rafflePrizeClaimed: Boolean(_nullishCoalesce(state.rafflePrizeClaimed, () => ( 0n))),
      uniqueAddressCount: _nullishCoalesce(state.uniqueAddressCount, () => ( 0n)),
      weightsBoxCount: _nullishCoalesce(state.weightsBoxCount, () => ( 0n)),
      winningTicket: _nullishCoalesce(state.winningTicket, () => ( 0n)),
      raffleWinner: _nullishCoalesce(((_c = state.raffleWinner) == null ? void 0 : _c.toString()), () => ( "")),
      raffleRound: _nullishCoalesce(state.raffleRound, () => ( 0n)),
      sellerReferrer: _nullishCoalesce(((_d = state.sellerReferrer) == null ? void 0 : _d.toString()), () => ( ""))
    };
  }
  /**
   * Whether this auction has the principal ABI (created by the Phase 2 factory: it holds
   * `seller_referrer`). Gated bids then take the hinted `gatedBid`/`gatedBidAsa` and a
   * `Gate.mustCheckFor` gate txn; older auctions keep `gatedBid(pay,appl,address)` and `Gate.mustCheck`.
   */
  async usesPrincipalAbi() {
    const state = await this.client.appClient.getGlobalState();
    return state[SELLER_REFERRER_KEY] !== void 0;
  }
  /**
   * Whether a gated bid with `gateTxn` takes the hinted overload: the auction has the principal ABI
   * and the gate txn is not a legacy `Gate.mustCheck` (callers that still build `mustCheck` keep the
   * registry semantics through the legacy shim, as with `MarketplaceSDK.purchase`).
   */
  async usesHintedGate(gateTxn) {
    return gateTxn.method.name !== "mustCheck" && await this.usesPrincipalAbi();
  }
  /**
   * Checks if the auction is currently live (accepting bids).
   */
  async isLive() {
    const isLive = await this.client.isLive();
    return _nullishCoalesce(isLive, () => ( false));
  }
  /**
   * Gets the MBR (Minimum Balance Requirement) data for auction operations.
   * These are constant values defined in the auction contract.
   */
  async mbr() {
    return this.client.mbr();
  }
  /**
   * Gets a bid by its ID.
   */
  async getBid({ bidId }) {
    const bid = await this.client.state.box.bids.value(bidId);
    if (bid === void 0) {
      throw new Error(`Bid ${bidId} not found`);
    }
    return bid;
  }
  /**
   * Checks if an address has placed a bid.
   */
  async hasBid({ address }) {
    const hasBid = await this.client.hasBid({ args: { address } });
    return _nullishCoalesce(hasBid, () => ( false));
  }
  /**
   * Gets the minimum bid amount required for the next bid.
   */
  async getMinimumBidAmount() {
    const state = await this.state();
    if (state.highestBid > 0n) {
      return state.highestBid + state.bidMinimumIncrease;
    }
    return state.startingBid;
  }
  // ========== Write Methods ==========
  /**
   * Places a bid in the auction.
   * Use `isAsa: true` and `bidAsset` for ASA bids, otherwise ALGO is used.
   * Provide `gateTxn` for gated auctions.
   */
  async bid({
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
    const { bids, bidsByAddress, locations } = await this.mbr();
    const auctionState = await this.state();
    let mbrCost = bids;
    const hasBidResult = await this.hasBid({ address: sendParams.sender.toString() });
    if (!hasBidResult) {
      mbrCost += bidsByAddress;
      if (auctionState.bidFee > 0n) {
        mbrCost += locations;
      }
    }
    if (isAsa) {
      const { bidAsset } = rest;
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, mbrCost),
        receiver: this.client.appAddress
      });
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(amount),
        assetId: BigInt(bidAsset),
        receiver: this.client.appAddress
      });
      if (gateTxn && await this.usesHintedGate(gateTxn)) {
        await this.client.send.gatedBidAsaPayAxferApplAddressUint64Void({
          ...sendParams,
          args: { payment, assetXfer, gateTxn, marketplace, wallet: BigInt(wallet) }
        });
      } else if (gateTxn) {
        await this.client.send.gatedBidAsaPayAxferApplAddressVoid({
          ...sendParams,
          args: { payment, assetXfer, gateTxn, marketplace }
        });
      } else {
        await this.client.send.bidAsa({
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
      if (gateTxn && await this.usesHintedGate(gateTxn)) {
        await this.client.send.gatedBidPayApplAddressUint64Void({
          ...sendParams,
          args: { payment, gateTxn, marketplace, wallet: BigInt(wallet) }
        });
      } else if (gateTxn) {
        await this.client.send.gatedBidPayApplAddressVoid({
          ...sendParams,
          args: { payment, gateTxn, marketplace }
        });
      } else {
        await this.client.send.bid({
          ...sendParams,
          args: { payment, marketplace }
        });
      }
    }
  }
  /**
   * Refunds a specific bid (not the most recent one).
   */
  async refundBid({ sender, signer, id }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.refundBid({
      ...sendParams,
      args: { id }
    });
  }
  /**
   * Round from which the committed loser-raffle draw can be completed (`raffleRound + 4`), or 0n
   * if nothing has been committed yet. `raffleRound` is a multiple of 8, the rounds the beacon stores.
   */
  async drawReadyRound() {
    const { raffleRound } = await this.state();
    return raffleRound === 0n ? 0n : raffleRound + AUCTION_BEACON_LAG_ROUNDS;
  }
  /**
   * Two-phase loser-raffle draw (commit-reveal), fee auctions only. After the end, the first
   * call excludes the winner's weight and either settles (no eligible losers) or commits to a
   * future round. Call again once the chain reaches `drawReadyRound()` to draw the ticket.
   */
  async raffle(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.raffle({
      ...sendParams,
      args: {}
    });
  }
  /**
   * Iterates to find the raffle winner based on the winning ticket.
   * May need to be called multiple times for large auctions.
   */
  async findWinner({ sender, signer, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.findWinner({
      ...sendParams,
      args: { iterationAmount }
    });
  }
  /**
   * Claims the auction prize for the highest bidder.
   * Also distributes royalties to marketplace, creator, and Akita.
   */
  async claimPrize(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.claimPrize({
      ...sendParams,
      args: {}
    });
  }
  /**
   * Claims the raffle prize for the raffle winner (loser raffle).
   */
  async claimRafflePrize(params) {
    const sendParams = this.getSendParams(params);
    await this.client.send.claimRafflePrize({
      ...sendParams,
      args: {}
    });
  }
  /**
   * Refunds MBR to auction participants after prizes are claimed.
   * May need to be called multiple times for large auctions.
   */
  async refundMBR({ sender, signer, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.refundMbr({
      ...sendParams,
      args: { iterationAmount }
    });
  }
  /**
   * Clears the weights boxes after all prizes have been claimed.
   * Returns the MBR for the weights boxes to the factory.
   */
  async clearWeightsBoxes({ sender, signer, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    const { return: returnAmount } = await this.client.send.clearWeightsBoxes({
      ...sendParams,
      args: { iterationAmount }
    });
    if (returnAmount === void 0) {
      throw new Error("Failed to clear weights boxes");
    }
    return returnAmount;
  }
};










exports.AuctionFactorySDK = AuctionFactorySDK; exports.newAuction = newAuction; exports.AUCTION_ERROR_MESSAGES = AUCTION_ERROR_MESSAGES; exports.translateAuctionError = translateAuctionError; exports.AUCTION_BEACON_LAG_ROUNDS = AUCTION_BEACON_LAG_ROUNDS; exports.SELLER_REFERRER_KEY = SELLER_REFERRER_KEY; exports.directGateCtx = directGateCtx; exports.AuctionSDK = AuctionSDK;
//# sourceMappingURL=chunk-TEADXQXS.js.map
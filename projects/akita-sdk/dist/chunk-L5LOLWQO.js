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
var APP_SPEC = { "name": "Auction", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "BidInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }, { "name": "marketplace", "type": "address" }, { "name": "refunded", "type": "bool" }], "FindWinnerCursors": [{ "name": "startingIndex", "type": "uint64" }, { "name": "currentRangeStart", "type": "uint64" }], "AkitaConfig": [{ "name": "akitaDao", "type": "uint64" }, { "name": "akitaDaoEscrow", "type": "EscrowConfig" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAsset" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "seller" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "(uint64,(string,uint64))", "struct": "AkitaConfig", "name": "akitaConfig" }, { "type": "address", "name": "sellerReferrer" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Sets a fee auction up for its loser raffle. `weightListLength` is ignored: it used to reserve\nthat many full weights boxes, which capped the auction at `weightListLength * ChunkSize`\nbidders and locked their storage up front. Weights storage now grows with the bidders, each\npaying for its own (`AuctionMBRWeightSlot`). The argument stays so the ABI is unchanged.", "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancel", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "deletes the application & returns the mbr + asset\nto the seller IF the auction hasn't started", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Gated bid (principal ABI, spec \xA76.6). The gate subject is the verified context of the bidder's\n`wallet` hint (0 = acting as itself), pinned through `Gate.mustCheckFor` (`gateCheckCtx`). A\nplugin passes `windowHint(wallet)`; an invalid hint reverts. Bids stay keyed by `Txn.sender`.", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (spec \xA77.2; delete in Phase 4): the pre-principal `gatedBid(pay,appl,address)void`\nwith its registry semantics (gate subject = registry origin of `Txn.sender`, `Gate.mustCheck`).\nKept for old plugins and SDKs during the compatibility window.", "events": [], "recommendations": {} }, { "name": "bid", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "ASA twin of `gatedBid` (principal ABI, spec \xA76.6).", "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of `gatedBidAsa(pay,axfer,appl,address)void` (registry semantics; delete in Phase 4).", "events": [], "recommendations": {} }, { "name": "bidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundBid", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Loser-raffle draw, commit-reveal (AR-01):\n- first call after the end freezes the eligible weight (AR-02) and commits to a\n  beacon-stored round at least DRAW_DELAY_ROUNDS ahead, whose output nobody can know yet\n- a later call (BEACON_LAG_ROUNDS after that round) draws the ticket\n- an empty beacon read reverts, so nobody can move the commitment (TRADE-3); only after\n  BEACON_MAX_WAIT_ROUNDS does it re-commit forward, never to an already-public round", "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimPrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "Removes the totals box of a fee auction and returns its storage to whoever funded the auction;\nreturns the amount released (0 when it is already gone). The weights boxes themselves are\nremoved by the storage refunds, so it runs once every bid's storage is refunded, or before the\nstart for a seller who cancels. Calling it is optional: deleting or cancelling the auction\nremoves a totals box that is still there. `iterationAmount` is ignored (it used to count the\nreserved weights boxes to delete) and stays so the ABI is unchanged.", "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "What a bid on THIS auction must add for storage: `bids` for every bid (with the refund deposit\nof an ASA bid, AUC-02), `bidsByAddress` for an address's first bid, and in a fee auction\n`locations` with it (location box and weight slot). `weights` is the totals box the seller\nfunds. All of it is returned by `refundMBR` and `clearWeightsBoxes`.", "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "hasBid", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool", "desc": "a boolean of whether the address has bid in the auction" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMinimumBidAmount", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 25, "bytes": 10 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset up for auction" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "whether the prize has been claimed" }, "bidAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2Fzc2V0", "desc": "the asset that is being used for bidding in the auction" }, "bidFee": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2ZlZQ==", "desc": "the percentage fee to take for the raffle on each bid in hundreds to support two decimals" }, "startingBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRpbmdfYmlk", "desc": "the starting amount to begin bids at" }, "bidMinimumIncrease": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX21pbmltdW1faW5jcmVhc2U=", "desc": "the smallest amount each new bid need increment the auction price" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "the unix time that the auction starts on" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "the round that the auction ends on" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the royalty percentage the creator will get for the auction" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that created the auction to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the royalty percentage each side of the market will take for the auction" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to bid in the auction" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "refundCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX2NvdW50", "desc": "the number of bids that have been refunded" }, "bidTotal": { "keyType": "AVMString", "valueType": "uint128", "key": "YmlkX3RvdGFs", "desc": "the total sum of all bids" }, "weightedBidTotal": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0ZWRfYmlkX3RvdGFs", "desc": "the total sum of all highest bids" }, "highestBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aGlnaGVzdF9iaWQ=", "desc": "highest bid the contract has received thus far" }, "bidID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2lk", "desc": "the id or index of the last bid" }, "raffleAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX2Ftb3VudA==", "desc": "the total amount collected for the loser raffle" }, "rafflePrizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3ByaXplX2NsYWltZWQ=", "desc": "whether the raffle winner has claimed their prize" }, "uniqueAddressCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dW5pcXVlX2FkZHJlc3NfY291bnQ=", "desc": "we count how many unique addresses bid so we can\nproperly get each bids % of the total bid amount" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of weights boxes that exist" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "we get the winning number from the randomness beacon\nafter the auction ends & we have ran findWinner\nto compile our list" }, "raffleWinner": { "keyType": "AVMString", "valueType": "address", "key": "cmFmZmxlX3dpbm5lcg==", "desc": "the winning address of the raffle" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "salt for randomness" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called after auction ends\nused for VRF since round times are dynamic and we need a deterministic round" }, "sellerReferrer": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVyX3JlZmVycmVy", "desc": "Referrer of the seller's verified wallet, resolved once by the factory at creation (zero if\nnone) and paid at settlement (spec \xA76.6). Plugins read its EXISTENCE as the marker of this\nchild's principal ABI; children created before it keep registry semantics until they settle." }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": { "weightTotals": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "dA==", "desc": "the weight total of every weights box, 8 bytes each: the skip list of the winner search" } } }, "maps": { "global": {}, "local": {}, "box": { "bids": { "keyType": "uint64", "valueType": "BidInfo", "desc": "the list of bids in the auction", "prefix": "Yg==" }, "weights": { "keyType": "uint64", "valueType": "AVMBytes", "desc": "Loser-raffle weights of a fee auction: unique bidder `loc` owns the 8-byte slot\n`loc % ChunkSize` of box `loc / ChunkSize`. A box is as long as the bidders it holds: it is\ncreated by its first bidder, grows one slot per new bidder and shrinks again as `refundMBR`\nreturns each bidder's storage.", "prefix": "dw==" }, "bidsByAddress": { "keyType": "address", "valueType": "uint64", "desc": "when we run our raffle we need to transform\nour list of bids into an address based box", "prefix": "YQ==" }, "locations": { "keyType": "uint64", "valueType": "address", "desc": "the addresses associated with highest bid locations", "prefix": "bA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3022, 3041, 4021, 4223, 4428, 4492, 4633, 6361, 7347, 7916], "errorMessage": "Box must have value" }, { "pc": [1399, 1560, 3191, 5739, 6473, 8279], "errorMessage": "Bytes has valid prefix" }, { "pc": [2531], "errorMessage": "ERR:errAast" }, { "pc": [2931, 3639, 4570, 5071], "errorMessage": "ERR:errAhne" }, { "pc": [6406, 7224], "errorMessage": "ERR:errAnlv" }, { "pc": [4143], "errorMessage": "ERR:errArfc" }, { "pc": [7950], "errorMessage": "ERR:errBarf" }, { "pc": [7913], "errorMessage": "ERR:errBnfd" }, { "pc": [3242], "errorMessage": "ERR:errBnrd" }, { "pc": [6385], "errorMessage": "ERR:errCobs" }, { "pc": [7884], "errorMessage": "ERR:errCrmr" }, { "pc": [6608], "errorMessage": "ERR:errFgte" }, { "pc": [5482], "errorMessage": "ERR:errForb" }, { "pc": [7247], "errorMessage": "ERR:errHgte" }, { "pc": [7029], "errorMessage": "ERR:errHnbd" }, { "pc": [6934], "errorMessage": "ERR:errHnwl" }, { "pc": [6953], "errorMessage": "ERR:errHtop" }, { "pc": [2152], "errorMessage": "ERR:errIapp" }, { "pc": [2065], "errorMessage": "ERR:errIast" }, { "pc": [2248, 2263, 7602, 7620, 7772, 7784], "errorMessage": "ERR:errIpay" }, { "pc": [5531], "errorMessage": "ERR:errIpma" }, { "pc": [5507], "errorMessage": "ERR:errIpmr" }, { "pc": [7679], "errorMessage": "ERR:errIpms" }, { "pc": [3399, 3411], "errorMessage": "ERR:errIrbd" }, { "pc": [3305], "errorMessage": "ERR:errIrsd" }, { "pc": [5399], "errorMessage": "ERR:errIupg" }, { "pc": [6640, 7050], "errorMessage": "ERR:errIwlt" }, { "pc": [7805, 7815, 7831], "errorMessage": "ERR:errIxfr" }, { "pc": [2023, 2224, 2282, 2505], "errorMessage": "ERR:errMbff" }, { "pc": [2235, 2942, 3624], "errorMessage": "ERR:errNapp" }, { "pc": [2311, 2374, 5134], "errorMessage": "ERR:errNarc" }, { "pc": [1241, 7718], "errorMessage": "ERR:errNcls" }, { "pc": [7704], "errorMessage": "ERR:errNclw" }, { "pc": [5323, 5367, 5435], "errorMessage": "ERR:errNdao" }, { "pc": [8316], "errorMessage": "ERR:errNesc" }, { "pc": [3123], "errorMessage": "ERR:errNetm" }, { "pc": [1255, 7732], "errorMessage": "ERR:errNrky" }, { "pc": [4593], "errorMessage": "ERR:errPacl" }, { "pc": [2323, 4081, 5083], "errorMessage": "ERR:errPznc" }, { "pc": [2992, 4959], "errorMessage": "ERR:errRapc" }, { "pc": [5117], "errorMessage": "ERR:errRnpc" }, { "pc": [2357], "errorMessage": "ERR:errRwhc" }, { "pc": [2386, 2543], "errorMessage": "ERR:errShbb" }, { "pc": [7504], "errorMessage": "ERR:errTmpt" }, { "pc": [2965], "errorMessage": "ERR:errWadr" }, { "pc": [2980, 3677], "errorMessage": "ERR:errWafd" }, { "pc": [8343], "errorMessage": "ERR:errWesc" }, { "pc": [4115, 4947], "errorMessage": "ERR:errWnfd" }, { "pc": [3662], "errorMessage": "ERR:errWnnf" }, { "pc": [6664], "errorMessage": "account funded" }, { "pc": [1330, 1422, 1441, 1454, 1465, 1582, 2131, 4776, 4915, 5315, 5359, 5427, 6645, 6669, 8112, 8404, 8422, 8500], "errorMessage": "application exists" }, { "pc": [2047, 4744, 4882], "errorMessage": "asset exists" }, { "pc": [2182, 2228, 2286, 2295, 2303, 2316, 2327, 2335, 2361, 2366, 2379, 2395, 2405, 2420, 2436, 2445, 2459, 2512, 2536, 2552, 2559, 2569, 2892, 2923, 2935, 2947, 2970, 2985, 2997, 3004, 3013, 3051, 3058, 3076, 3101, 3129, 3135, 3147, 3219, 3247, 3373, 3617, 3631, 3644, 3667, 3682, 3703, 3711, 3870, 3898, 3957, 4074, 4085, 4093, 4104, 4119, 4124, 4154, 4158, 4244, 4468, 4542, 4562, 4575, 4597, 4607, 4624, 4656, 4687, 4701, 4711, 4724, 4733, 4741, 4760, 4765, 4770, 4822, 4836, 4846, 4861, 4871, 4879, 4895, 4900, 4904, 4909, 4937, 4952, 4966, 4992, 5003, 5028, 5036, 5048, 5063, 5076, 5087, 5095, 5121, 5126, 5166, 5182, 5308, 5352, 5371, 5420, 5556, 5570, 5589, 5614, 5622, 5644, 5659, 5688, 5693, 5803, 5811, 5833, 5866, 5899, 5963, 5972, 6002, 6026, 6045, 6050, 6116, 6151, 6177, 6184, 6207, 6211, 6307, 6322, 6327, 6336, 6343, 6352, 6415, 6510, 6518, 6753, 6826, 7229, 7289, 7326, 7360, 7372, 7384, 7397, 7417, 7467, 7823, 7861, 7974, 8003, 8043, 8054, 8067, 8075, 8080, 8087, 8106, 8171, 8203, 8398], "errorMessage": "check GlobalState exists" }, { "pc": [1668, 4978, 5575, 5627, 5775, 5816, 5871, 5886, 5904], "errorMessage": "errIpct" }, { "pc": [1297], "errorMessage": "errNcca" }, { "pc": [7963], "errorMessage": "index out of bounds" }, { "pc": [1309, 1886, 1951, 2004, 3194, 5297, 5335, 6476, 8282], "errorMessage": "invalid array length header" }, { "pc": [1768], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1894, 5343], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [8292], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1850, 1880, 2625, 2677, 2706, 2756, 2820, 2861, 5243], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1956, 2009], "errorMessage": "invalid number of bytes for arc4.tuple<smart_contracts/utils/base-contracts/base.ts::AkitaConfig,arc4.static_array<arc4.uint8, 32>>" }, { "pc": [1759, 1778, 1787, 1797, 1807, 1817, 1827, 1858, 1868, 2212, 2633, 2764, 2877, 3612, 4068, 5021, 5413, 5458], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3201, 6483], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [5302], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1840], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1404, 1565, 5744], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1947, 2e3, 5289], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1911, 1970], "errorMessage": "invalid tail pointer at index 0 of ((uint64,((len+utf8[]),uint64)),uint8[32])" }, { "pc": [1931, 1987], "errorMessage": "invalid tail pointer at index 1 of (uint64,((len+utf8[]),uint64))" }, { "pc": [1906, 1926, 1942, 1965, 1982, 1995, 5284], "errorMessage": "invalid tuple encoding" }, { "pc": [2617, 2669, 2748, 2812], "errorMessage": "transaction type is appl" }, { "pc": [2737, 2801, 2853], "errorMessage": "transaction type is axfer" }, { "pc": [2205, 2606, 2658, 2698, 2725, 2789, 2842, 5450], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMzIgMTAwMDAwIDQwOTYgNjM2NDEzNjIyMzg0Njc5MzAwNSAxODQ0Njc0NDA3MzcwOTU1MTYxNSAxNDQyNjk1MDQwODg4OTYzNDA3IDE0NDI2OTUwNDA4ODg5NjM0MDkgMjg1MDAgNDI5NDk2NzI5NQogICAgYnl0ZWNibG9jayAiYmlkX2Fzc2V0IiAiYWtpdGFfZGFvIiAiYmlkX2lkIiAiYmlkX2ZlZSIgMHgxNTFmN2M3NSAidCIgInJhZmZsZV9wcml6ZV9jbGFpbWVkIiAicHJpemUiICJlbmRfdGltZXN0YW1wIiAiYSIgIndpbm5pbmdfdGlja2V0IiAiYiIgIndlaWdodHNfYm94X2NvdW50IiAicmVmdW5kX21icl9jdXJzb3IiICJyYWZmbGVfcm91bmQiICJpc19wcml6ZV9ib3giICJwcml6ZV9jbGFpbWVkIiAic2VsbGVyIiAicmFmZmxlX3dpbm5lciIgIndlaWdodGVkX2JpZF90b3RhbCIgInVuaXF1ZV9hZGRyZXNzX2NvdW50IiAiYWtpdGFfZXNjcm93IiAiRVJSOmVycklwYXkiICJoaWdoZXN0X2JpZCIgImFhbCIgImNyZWF0b3Jfcm95YWx0eSIgImZpbmRfd2lubmVyX2N1cnNvcnMiICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiICJ3IiAweDAwICJ3YWxsZXQiICJyZWZ1bmRfY291bnQiICJyYWZmbGVfYW1vdW50IiAweDAwMDEgIkVSUjplcnJNYmZmIiAic3RhcnRfdGltZXN0YW1wIiAiZ2F0ZV9pZCIgIkVSUjplcnJBaG5lIiAidnJmX2ZhaWx1cmVfY291bnQiICJmdW5kZXIiICJtYXJrZXRwbGFjZSIgInNlbGxlcl9yZWZlcnJlciIgIm5mdF9mZWVzIiAiRVJSOmVyck5hcHAiICJFUlI6ZXJyTmFyYyIgIkVSUjplcnJQem5jIiAibCIgIkVSUjplcnJOZGFvIiAiRVJSOmVyckl4ZnIiIDB4MDY4MTAxICJFUlI6ZXJyTmNscyIgIkVSUjplcnJOcmt5IiAic3RhcnRpbmdfYmlkIiAiYmlkX21pbmltdW1faW5jcmVhc2UiICJ2ZXJzaW9uIiAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxICJzYWx0IiAiRVJSOmVyclNoYmIiICJFUlI6ZXJyV2FmZCIgIkVSUjplcnJSYXBjIiAib2FsIiAweDAwMDAgIkVSUjplcnJJcmJkIiAiRVJSOmVyclduZmQiICJwYWwiICJFUlI6ZXJyQW5sdiIgImNvbnRyb2xsZWRfYWRkcmVzcyIgIkVSUjplcnJJd2x0IiAiYXBwSUQiCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcwCiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMzggLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDMxIC8vICJyZWZ1bmRfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE5IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDIzIC8vICJoaWdoZXN0X2JpZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAzMiAvLyAicmFmZmxlX2Ftb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNiAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAyMCAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAxMyAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNC0yOQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDI0ODdjMzJjIDB4MzFmMjZhOWIgMHhlYTkxODBkZCAvLyBtZXRob2QgImRlbGV0ZUFwcGxpY2F0aW9uKCl2b2lkIiwgbWV0aG9kICJjYW5jZWwoKXZvaWQiLCBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANCBtYWluX2NhbmNlbF9yb3V0ZUA1IG1haW5fdXBkYXRlX3JvdXRlQDYKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNC0yOQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzMgogICAgcHVzaGJ5dGVzcyAweGJkNzE0OGQwIDB4MjU0NGZkZDggMHg5ODM2Yzg5ZiAweDRkNTg1Njk3IDB4Zjc3MTkzNGIgMHhkOWY0ZjAzYSAweDc2OTUyOTMxIDB4YjllMzljNWMgMHg2OTY1MDFkZSAweGJkMWIyN2QxIDB4ZjJjZTJmNDYgMHg5ZGFmMDUwYSAweDY1ZmNhOThiIDB4MDVlNWRlNGQgMHg3MzExMTA3MCAweDhmYTRhMTYwIDB4NjA4MjMwM2MgMHgyMDg5NWUyNiAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDNlYTExODMyIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkQmlkKHBheSxhcHBsLGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkQmlkKHBheSxhcHBsLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiYmlkKHBheSxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImdhdGVkQmlkQXNhKHBheSxheGZlcixhcHBsLGFkZHJlc3MsdWludDY0KXZvaWQiLCBtZXRob2QgImdhdGVkQmlkQXNhKHBheSxheGZlcixhcHBsLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiYmlkQXNhKHBheSxheGZlcixhZGRyZXNzKXZvaWQiLCBtZXRob2QgInJlZnVuZEJpZCh1aW50NjQpdm9pZCIsIG1ldGhvZCAicmFmZmxlKCl2b2lkIiwgbWV0aG9kICJmaW5kV2lubmVyKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJyZWZ1bmRNQlIodWludDY0KXZvaWQiLCBtZXRob2QgImNsYWltUHJpemUoKXZvaWQiLCBtZXRob2QgImNsYWltUmFmZmxlUHJpemUoKXZvaWQiLCBtZXRob2QgImNsZWFyV2VpZ2h0c0JveGVzKHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm1icigpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiLCBtZXRob2QgImlzTGl2ZSgpYm9vbCIsIG1ldGhvZCAiaGFzQmlkKGFkZHJlc3MpYm9vbCIsIG1ldGhvZCAiZ2V0TWluaW11bUJpZEFtb3VudCgpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGluaXQgZ2F0ZWRCaWQgbGVnYWN5R2F0ZWRCaWQgYmlkIGdhdGVkQmlkQXNhIGxlZ2FjeUdhdGVkQmlkQXNhIGJpZEFzYSByZWZ1bmRCaWQgcmFmZmxlIGZpbmRXaW5uZXIgcmVmdW5kTUJSIGNsYWltUHJpemUgY2xhaW1SYWZmbGVQcml6ZSBjbGVhcldlaWdodHNCb3hlcyBtYnIgaXNMaXZlIGhhc0JpZCBnZXRNaW5pbXVtQmlkQW1vdW50IHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAyOSBvcHRpbgogICAgZXJyCgptYWluX29wVXBfcm91dGVAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzAKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0LTI5CiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbiBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VBdWN0aW9uLAogICAgLy8gICBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICBwdXNoYnl0ZXMgMHgzNGNlYzc5OCAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZywodWludDY0LChzdHJpbmcsdWludDY0KSksYWRkcmVzcyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgptYWluX2NhbmNlbF9yb3V0ZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGNhbmNlbAoKbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDMKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIGRlbGV0ZUFwcGxpY2F0aW9uCgoKLy8gX3B1eWFfbGliLnV0aWwuZW5zdXJlX2J1ZGdldChyZXF1aXJlZF9idWRnZXQ6IHVpbnQ2NCwgZmVlX3NvdXJjZTogdWludDY0KSAtPiB2b2lkOgplbnN1cmVfYnVkZ2V0OgogICAgcHJvdG8gMiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIHB1c2hpbnQgMTAKICAgICsKCmVuc3VyZV9idWRnZXRfd2hpbGVfdG9wQDE6CiAgICBkdXAKICAgIGdsb2JhbCBPcGNvZGVCdWRnZXQKICAgID4KICAgIGJ6IGVuc3VyZV9idWRnZXRfYWZ0ZXJfd2hpbGVANgogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGJ5dGVjIDQ5IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbQogICAgYnl0ZWMgNDkgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW0KICAgIGZyYW1lX2RpZyAtMQogICAgc3dpdGNoIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMEAzIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMUA0CgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANToKICAgIGl0eG5fc3VibWl0CiAgICBiIGVuc3VyZV9idWRnZXRfd2hpbGVfdG9wQDEKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMUA0OgogICAgZ2xvYmFsIE1pblR4bkZlZQogICAgaXR4bl9maWVsZCBGZWUKICAgIGIgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDUKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMEAzOgogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBiIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1CgplbnN1cmVfYnVkZ2V0X2FmdGVyX3doaWxlQDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjpfX3BjZzMyT3V0cHV0KHN0YXRlOiB1aW50NjQpIC0+IHVpbnQ2NDoKX19wY2czMk91dHB1dDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBfX3BjZzMyT3V0cHV0KHN0YXRlOiBQQ0czMlNUQVRFKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMAogICAgLy8gY29uc3QgeG9yc2hpZnRlZCA9IF9fbWFza1RvVWludDMyKG9wLnNocihvcC5zaHIoc3RhdGUsIDE4KSBeIHN0YXRlLCAyNykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTgKICAgIHNocgogICAgZnJhbWVfZGlnIC0xCiAgICBeCiAgICBwdXNoaW50IDI3CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTEgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMQogICAgLy8gY29uc3Qgcm90ID0gb3Auc2hyKHN0YXRlLCA1OSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA1OQogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICBkdXAyCiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIHN3YXAKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHB1c2hpbnQgMzEKICAgICYKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgc2hsCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE5CiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDExIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHwKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmFzc2VydFBsYWluUGF5bWVudCh0eG46IHVpbnQ2NCkgLT4gdm9pZDoKYXNzZXJ0UGxhaW5QYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NwogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFBsYWluUGF5bWVudCh0eG46IGd0eG4uUGF5bWVudFR4bik6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY4CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLmNsb3NlUmVtYWluZGVyVG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xvc2VGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIENsb3NlUmVtYWluZGVyVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDUwIC8vICJFUlI6ZXJyTmNscyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2xzCgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY5CiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBhc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDUxIC8vICJFUlI6ZXJyTnJreSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcmt5Cgphc3NlcnRQbGFpblBheW1lbnRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWNvcmRQYXllcihyZWNvcmQ6IGJ5dGVzLCBwYXllcjogYnl0ZXMsIG93bmVyOiBieXRlcykgLT4gdm9pZDoKcmVjb3JkUGF5ZXI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJlY29yZFBheWVyKHJlY29yZDogYnl0ZXMsIHBheWVyOiBBY2NvdW50LCBvd25lcjogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwNgogICAgLy8gaWYgKHBheWVyICE9PSBvd25lcikgewogICAgZnJhbWVfZGlnIC0yCiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiByZWNvcmRQYXllcl9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTYKICAgIC8vIHJldHVybiBCeXRlcyhQYXllckJveFByZWZpeCkuY29uY2F0KHNoYTI1NihyZWNvcmQpKQogICAgZnJhbWVfZGlnIC0zCiAgICBzaGEyNTYKICAgIHB1c2hieXRlcyAiJCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDcKICAgIC8vIG9wLkJveC5wdXQocGF5ZXJSZWNvcmRLZXkocmVjb3JkKSwgcGF5ZXIuYnl0ZXMpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJveF9wdXQKCnJlY29yZFBheWVyX2FmdGVyX2lmX2Vsc2VAMjoKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IGJ5dGVzLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IHVpbnQ2NCwgcmVjbGFpbVRvOiBieXRlcykgLT4gYnl0ZXMsIGJ5dGVzOgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NTMKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sIHN1bTogdWludDY0LCBjbG9zZU91dDogYm9vbGVhbiwgcmVjbGFpbVRvOiBBY2NvdW50KTogeyBpZDogdWludDY0LCBjb3N0OiB1aW50NjQgfSB7CiAgICBwcm90byA4IDIKICAgIHB1c2hieXRlcyAiIgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzU0CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBlcnJDYW5ub3RDbG9zZU91dE9mQWxnb0ZvcmJpZGRlbikKICAgIGZyYW1lX2RpZyAtNwogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF90cnVlQDIKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9mYWxzZUAzCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyOgogICAgaW50Y18xIC8vIDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NTQKICAgIC8vIGFzc2VydChhc3NldCAhPT0gMCB8fCBjbG9zZU91dCA9PT0gZmFsc2UsIGVyckNhbm5vdENsb3NlT3V0T2ZBbGdvRm9yYmlkZGVuKQogICAgYXNzZXJ0IC8vIGVyck5jY2EKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTgKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc1NQogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc1OAogICAgLy8gY29uc3QgbWJyOiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgZnJhbWVfZGlnIC00CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyNTMwMAogICAgKgogICAgcHVzaGludCA1NDUwMAogICAgKwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjAKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC03CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjEtNzczCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjUKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2NgogICAgLy8gYW1vdW50OiBtYnIgKyBzdW0KICAgIGRpZyAyCiAgICBmcmFtZV9kaWcgLTMKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2NC03NjcKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc2MS03NzMKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMsCiAgICAvLyAgICAgcmVjbGFpbVRvCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY4CiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzY5CiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3NjEtNzczCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1iciArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZGNhYzA5MzUgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KHBheSx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSxhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODE1CiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtNAogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc1CiAgICAvLyBpZiAoIUFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGFzc2V0KSkpIHsKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC03CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDkKICAgIGRpZyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc5MAogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4OQogICAgLy8gY29uc3QgdHJhbnNmZXJUeG4gPSBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTUKICAgIC8vIGlmIChjbG9zZU91dCkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk2CiAgICAvLyB0cmFuc2ZlclR4bi5zZXQoeyBhc3NldENsb3NlVG86IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MgfSkKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk5LTgxMgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODAzCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwMi04MDUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1icgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwNgogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyAwCiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTcKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3OgogICAgZnJhbWVfZGlnIC03CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODktNzkzCiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3OTktODEyCiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1icgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zLAogICAgLy8gICAgIHJlY2xhaW1UbwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwNwogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjgwOAogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzk5LTgxMgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucywKICAgIC8vICAgICByZWNsYWltVG8KICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGEzYTE2Y2FhIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10sYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3NgogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc3LTc4NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODEKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZGlnIDEKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODIKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc4MC03ODMKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc3Ny03ODYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3ODQKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC03CiAgICBpdG9iCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Nzc3LTc4NgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4Mzk0ZWFlYjIgLy8gbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnRUbyhha2l0YURBTzogdWludDY0LCByZWZlcnJlcjogYnl0ZXMsIGFzc2V0OiB1aW50NjQsIGFtb3VudDogdWludDY0LCByZWNsYWltVG86IGJ5dGVzKSAtPiBieXRlczoKc2VuZFJlZmVycmFsUGF5bWVudFRvOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5OTIKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50VG8oYWtpdGFEQU86IEFwcGxpY2F0aW9uLCByZWZlcnJlcjogQWNjb3VudCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQsIHJlY2xhaW1UbzogQWNjb3VudCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gNSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk0CiAgICAvLyBpZiAoYW1vdW50ID4gMCAmJiByZWZlcnJlciAhPT0gR2xvYmFsLnplcm9BZGRyZXNzKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDYKICAgIGZyYW1lX2RpZyAtNAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzAKICAgIC8vIGNvbnN0IFt3YWxsZXRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0RmVlcykpCiAgICBmcmFtZV9kaWcgLTUKICAgIHB1c2hieXRlcyAid2FsbGV0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk5NgogICAgLy8gY29uc3QgeyByZWZlcnJlclBlcmNlbnRhZ2UgfSA9IGdldFdhbGxldEZlZXMoYWtpdGFEQU8pCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMgogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTk5CiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDUKICAgIGZyYW1lX2RpZyAtMgogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudFRvX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDAwCiAgICAvLyByZWZlcnJhbEZlZSA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRUb19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDcKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgZHVwCiAgICBwdXNoaW50IDI1OTIwMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwOAogICAgLy8gW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzMgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAwMy0xMDEyCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgVEhJUlRZX0RBWVMpLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlLAogICAgLy8gICByZWNsYWltVG8KICAgIC8vICkKICAgIGZyYW1lX2RpZyAtNQogICAgZnJhbWVfZGlnIC0zCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDEwCiAgICAvLyBmYWxzZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMDMtMTAxMgogICAgLy8gY29uc3QgeyBjb3N0OiByZWZlcnJhbE1iciB9ID0gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgYWtpdGFEQU8sCiAgICAvLyAgIGFzc2V0LAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgLy8gICAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIFRISVJUWV9EQVlTKSwKICAgIC8vICAgW3sgYWRkcmVzczogcmVmZXJyZXIsIGFtb3VudDogcmVmZXJyYWxGZWUgfV0sCiAgICAvLyAgIHJlZmVycmFsRmVlLAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgcmVjbGFpbVRvCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wCiAgICBleHRyYWN0IDggOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDE0CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgcmV0c3ViCgpzZW5kUmVmZXJyYWxQYXltZW50VG9fYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDE3CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogYW1vdW50LCByZWZlcnJhbE1icjogMCB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuYm9vbAogICAgaW50Y18wIC8vIDAKICAgIGdldGJpdAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9tYnIudHM6OkZ1bmRlckluZm8KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMzQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKHVpbnQ2NCwoKGxlbit1dGY4W10pLHVpbnQ2NCkpLHVpbnQ4WzMyXSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50NjQsKChsZW4rdXRmOFtdKSx1aW50NjQpKQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICBzd2FwCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA1NgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC50dXBsZTxzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFDb25maWcsYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+PgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMzQKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKHVpbnQ2NCwoKGxlbit1dGY4W10pLHVpbnQ2NCkpLHVpbnQ4WzMyXSkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAxIG9mICh1aW50NjQsKChsZW4rdXRmOFtdKSx1aW50NjQpKQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgNTYKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudHVwbGU8c21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQ29uZmlnLGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPj4KICAgIGV4dHJhY3QgMiAzMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgZXJyTXVzdEJlQ2FsbGVkRnJvbUZhY3RvcnkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzQgLy8gIkVSUjplcnJNYmZmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck1iZmYKCmNyZWF0ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDcgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTEKICAgIC8vIHRoaXMucHJpemUudmFsdWUgPSBwcml6ZQogICAgdW5jb3ZlciAxNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMTUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUyCiAgICAvLyB0aGlzLmlzUHJpemVCb3gudmFsdWUgPSBpc1ByaXplQm94CiAgICB1bmNvdmVyIDE2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOAogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTYgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1MwogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1NQogICAgLy8gaWYgKGJpZEFzc2V0ICE9PSAwKSB7CiAgICBkaWcgMgogICAgYnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTYKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldChiaWRBc3NldCkudG90YWwgPiAwLCBlcnJJbnZhbGlkQXNzZXQpCiAgICBkaWcgMgogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFRvdGFsCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBibnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFzdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXN0CgpjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1OAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZSA9IEFzc2V0KGJpZEFzc2V0KQogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MgogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlY18zIC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTkKICAgIC8vIHRoaXMuYmlkRmVlLnZhbHVlID0gYmlkRmVlCiAgICB1bmNvdmVyIDE0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NAogICAgLy8gc3RhcnRpbmdCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydGluZ0JpZCB9KQogICAgYnl0ZWMgNTIgLy8gInN0YXJ0aW5nX2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYwCiAgICAvLyB0aGlzLnN0YXJ0aW5nQmlkLnZhbHVlID0gc3RhcnRpbmdCaWQKICAgIHVuY292ZXIgMTMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2CiAgICAvLyBiaWRNaW5pbXVtSW5jcmVhc2UgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRNaW5pbXVtSW5jcmVhc2UgfSkKICAgIGJ5dGVjIDUzIC8vICJiaWRfbWluaW11bV9pbmNyZWFzZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYxCiAgICAvLyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZSA9IGJpZE1pbmltdW1JbmNyZWFzZQogICAgdW5jb3ZlciAxMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM1IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2MgogICAgLy8gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSA9IHN0YXJ0VGltZXN0YW1wCiAgICB1bmNvdmVyIDExCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA4IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjMKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlID0gZW5kVGltZXN0YW1wCiAgICB1bmNvdmVyIDEwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2NoaWxkLnRzOjExCiAgICAvLyBmdW5kZXIgPSBHbG9iYWxTdGF0ZTxGdW5kZXJJbmZvPih7IGtleTogR2xvYmFsU3RhdGVLZXlGdW5kZXIgfSkKICAgIGJ5dGVjIDM5IC8vICJmdW5kZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gdGhpcy5mdW5kZXIudmFsdWUgPSBjbG9uZShmdW5kZXIpCiAgICB1bmNvdmVyIDkKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjUKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICB1bmNvdmVyIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNSAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjYKICAgIC8vIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPSBjcmVhdG9yUm95YWx0eQogICAgdW5jb3ZlciA3CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OAogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAzNiAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY3CiAgICAvLyB0aGlzLmdhdGVJRC52YWx1ZSA9IGdhdGVJRAogICAgdW5jb3ZlciA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDQwIC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY4CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlLnZhbHVlID0gbWFya2V0cGxhY2UKICAgIHVuY292ZXIgNQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIwCiAgICAvLyBzZWxsZXJSZWZlcnJlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXJSZWZlcnJlciB9KQogICAgYnl0ZWMgNDEgLy8gInNlbGxlcl9yZWZlcnJlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcwCiAgICAvLyB0aGlzLnNlbGxlclJlZmVycmVyLnZhbHVlID0gc2VsbGVyUmVmZXJyZXIKICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyBsb2dnZWRBc3NlcnQoYWtpdGFDb25maWcuYWtpdGFEQU8uYWRkcmVzcyAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJJbnZhbGlkQXBwKQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWFwcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJYXBwCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3NAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhQ29uZmlnLmFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njc1CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoYWtpdGFDb25maWcuYWtpdGFEQU9Fc2Nyb3cpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE0CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA1NCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njc3CiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NwogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJDdXJzb3JzIH0pCiAgICBieXRlYyAyNiAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgwCiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBzdGFydGluZ0luZGV4OiAwLCBjdXJyZW50UmFuZ2VTdGFydDogMSB9CiAgICBieXRlYyA1NSAvLyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODEKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOQogICAgLy8gc2FsdCA9IEdsb2JhbFN0YXRlPGJ5dGVzPDMyPj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDU2IC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIHRoaXMuc2FsdC52YWx1ZSA9IFR4bi50eElkCiAgICB0eG4gVHhJRAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTUKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyA0MiAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjcgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmluaXRbcm91dGluZ10oKSAtPiB2b2lkOgppbml0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTIKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkzCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJNdXN0QmVDYWxsZWRGcm9tRmFjdG9yeSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNCAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKaW5pdF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBlcnJOb3RBcHBsaWNhYmxlVG9UaGlzQXVjdGlvbikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgZXJyTm90QXBwbGljYWJsZVRvVGhpc0F1Y3Rpb24pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDQzIC8vICJFUlI6ZXJyTmFwcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOYXBwCgppbml0X2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTcKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKaW5pdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk4CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRoaXMubWJyKCkud2VpZ2h0cywgZXJySW52YWxpZFBheW1lbnQpCiAgICBndHhucyBBbW91bnQKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5tYnIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIGJueiBpbml0X2FmdGVyX2Fzc2VydEA5CiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKaW5pdF9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDAKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLmNyZWF0ZSh7IHNpemU6IDAgfSkKICAgIGludGNfMCAvLyAwCiAgICBib3hfY3JlYXRlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkyCiAgICAvLyBpbml0KHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgd2VpZ2h0TGlzdExlbmd0aDogdWludDY0KSB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5kZWxldGVBcHBsaWNhdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUFwcGxpY2F0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIGVyck11c3RCZUNhbGxlZEZyb21GYWN0b3J5KQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNCAvLyAiRVJSOmVyck1iZmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTWJmZgoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcwNwogICAgLy8gY29uc3QgZXhwZWN0ZWRSZWZ1bmRDb3VudDogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSA+IDEgPyB0aGlzLmJpZElELnZhbHVlIC0gMiA6IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBjb25zdCBleHBlY3RlZFJlZnVuZENvdW50OiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlID4gMSA/IHRoaXMuYmlkSUQudmFsdWUgLSAyIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X2ZhbHNlQDUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBjb25zdCBleHBlY3RlZFJlZnVuZENvdW50OiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlID4gMSA/IHRoaXMuYmlkSUQudmFsdWUgLSAyIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgLQoKZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9tZXJnZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJlZnVuZENvdW50LnZhbHVlID09PSBleHBlY3RlZFJlZnVuZENvdW50LCBlcnJOb3RBbGxSZWZ1bmRzQ29tcGxldGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MgogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAzMSAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJlZnVuZENvdW50LnZhbHVlID09PSBleHBlY3RlZFJlZnVuZENvdW50LCBlcnJOb3RBbGxSZWZ1bmRzQ29tcGxldGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgNDQgLy8gIkVSUjplcnJOYXJjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcmMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDE2IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVOb3RDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDQ1IC8vICJFUlI6ZXJyUHpuYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQem5jCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVXaW5uZXJIYXNOb3RDbGFpbWVkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIGVyclJhZmZsZVdpbm5lckhhc05vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYm9vbF90cnVlQDEyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNiAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVXaW5uZXJIYXNOb3RDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2Jvb2xfZmFsc2VAMTMKCmRlbGV0ZUFwcGxpY2F0aW9uX2Jvb2xfdHJ1ZUAxMjoKICAgIGludGNfMSAvLyAxCgpkZWxldGVBcHBsaWNhdGlvbl9ib29sX21lcmdlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlV2lubmVySGFzTm90Q2xhaW1lZCkKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTYKICAgIHB1c2hieXRlcyAiRVJSOmVyclJ3aGMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUndoYwoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIGNvbnN0IHJlZnVuZHNDb21wbGV0ZSA9IHRoaXMuYmlkSUQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMgogICAgLy8gY29uc3QgcmVmdW5kc0NvbXBsZXRlID0gdGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDEzIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzEyCiAgICAvLyBjb25zdCByZWZ1bmRzQ29tcGxldGUgPSB0aGlzLmJpZElELnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHJlZnVuZHNDb21wbGV0ZSwgZXJyTm90QWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYm56IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgNDQgLy8gIkVSUjplcnJOYXJjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcmMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzE2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIGVyclN0aWxsSGFzSGlnaGVzdEJpZHNCb3hlcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgZXJyU3RpbGxIYXNIaWdoZXN0Qmlkc0JveGVzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgNTcgLy8gIkVSUjplcnJTaGJiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNoYmIKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTcKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIwCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAxNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjAKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldCh0aGlzLnByaXplLnZhbHVlKSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyNAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA3IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIwCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIxLTcyNgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIzCiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA3IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyMS03MjUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyMS03MjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCAmJiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDI4CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjkKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwICYmIEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDI4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMC03MzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMgogICAgLy8gYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzMzCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzAtNzM0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzAtNzM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczOC03NDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzM4LTc0MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzgtNzQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzAzCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxldGVBcHBsaWNhdGlvbl9ib29sX2ZhbHNlQDEzOgogICAgaW50Y18wIC8vIDAKICAgIGIgZGVsZXRlQXBwbGljYXRpb25fYm9vbF9tZXJnZUAxNAoKZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9mYWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDcKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDYKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNhbmNlbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBlcnJNdXN0QmVDYWxsZWRGcm9tRmFjdG9yeSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM0IC8vICJFUlI6ZXJyTWJmZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJNYmZmCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1MgogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLCBlcnJBdWN0aW9uQWxyZWFkeVN0YXJ0ZWQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OAogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzUgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUyCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUsIGVyckF1Y3Rpb25BbHJlYWR5U3RhcnRlZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8CiAgICBibnogY2FuY2VsX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJBYXN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFhc3QKCmNhbmNlbF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzU1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIGVyclN0aWxsSGFzSGlnaGVzdEJpZHNCb3hlcykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgZXJyU3RpbGxIYXNIaWdoZXN0Qmlkc0JveGVzKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNhbmNlbF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNTcgLy8gIkVSUjplcnJTaGJiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNoYmIKCmNhbmNlbF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTYKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLmRlbGV0ZSgpCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDE3IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyMAogICAgLy8gdGhpcy50cmFuc2ZlclB1cmNoYXNlVG9CdXllcih0aGlzLnNlbGxlci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjYWxsc3ViIHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYwCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNhbmNlbF9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MS03NjYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MwogICAgLy8gYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2NAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjEtNzY1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjEtNzY2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjktNzczCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2OS03NzIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY5LTc3MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0OQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2F0ZWRCaWRbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgzLTc4OAogICAgLy8gZ2F0ZWRCaWQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZWQoZ2F0ZVR4biwgZmFsc2UsIHdhbGxldCkKICAgIHVuY292ZXIgMgogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBhc3NlcnRHYXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTAKICAgIC8vIHRoaXMuY3JlYXRlQmlkKHBheW1lbnQsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgzLTc4OAogICAgLy8gZ2F0ZWRCaWQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3YWxsZXQ6IHVpbnQ2NCwKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubGVnYWN5R2F0ZWRCaWRbcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lHYXRlZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk4CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkQmlkJyB9KQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDQKICAgIC8vIHRoaXMuYXNzZXJ0R2F0ZWQoZ2F0ZVR4biwgdHJ1ZSwgMCkKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBhc3NlcnRHYXRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDUKICAgIC8vIHRoaXMuY3JlYXRlQmlkKHBheW1lbnQsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk4CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ2dhdGVkQmlkJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uYmlkW3JvdXRpbmddKCkgLT4gdm9pZDoKYmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGJpZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzMgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIHRoaXMuYXNzZXJ0VW5nYXRlZCgpCiAgICBjYWxsc3ViIGFzc2VydFVuZ2F0ZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyB0aGlzLmNyZWF0ZUJpZChwYXltZW50LCBtYXJrZXRwbGFjZSkKICAgIGNhbGxzdWIgY3JlYXRlQmlkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwOAogICAgLy8gYmlkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdhdGVkQmlkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRCaWRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxNS04MjEKICAgIC8vIGdhdGVkQmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyMgogICAgLy8gdGhpcy5hc3NlcnRHYXRlZChnYXRlVHhuLCBmYWxzZSwgd2FsbGV0KQogICAgdW5jb3ZlciAyCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBjYWxsc3ViIGFzc2VydEdhdGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyMwogICAgLy8gdGhpcy5jcmVhdGVCaWRBc2EocGF5bWVudCwgYXNzZXRYZmVyLCBtYXJrZXRwbGFjZSkKICAgIGNhbGxzdWIgY3JlYXRlQmlkQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxNS04MjEKICAgIC8vIGdhdGVkQmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmxlZ2FjeUdhdGVkQmlkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5R2F0ZWRCaWRBc2E6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNwogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEJpZEFzYScgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzNAogICAgLy8gdGhpcy5hc3NlcnRHYXRlZChnYXRlVHhuLCB0cnVlLCAwKQogICAgc3dhcAogICAgaW50Y18xIC8vIDEKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGFzc2VydEdhdGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gdGhpcy5jcmVhdGVCaWRBc2EocGF5bWVudCwgYXNzZXRYZmVyLCBtYXJrZXRwbGFjZSkKICAgIGNhbGxzdWIgY3JlYXRlQmlkQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNwogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICdnYXRlZEJpZEFzYScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmJpZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM4LTg0MgogICAgLy8gYmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyB0aGlzLmFzc2VydFVuZ2F0ZWQoKQogICAgY2FsbHN1YiBhc3NlcnRVbmdhdGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NQogICAgLy8gdGhpcy5jcmVhdGVCaWRBc2EocGF5bWVudCwgYXNzZXRYZmVyLCBtYXJrZXRwbGFjZSkKICAgIGNhbGxzdWIgY3JlYXRlQmlkQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzOC04NDIKICAgIC8vIGJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVmdW5kQmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDgKICAgIC8vIHJlZnVuZEJpZChpZDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0OQogICAgLy8gY29uc3QgW3JlY2VpdmVyLCByZXR1cm5BbW91bnRdID0gdGhpcy5tYXJrUmVmdW5kZWQoaWQpCiAgICBjYWxsc3ViIG1hcmtSZWZ1bmRlZAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODUzCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTMKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJlZnVuZEJpZF9lbHNlX2JvZHlANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTQKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQ6IHJldHVybkFtb3VudCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpyZWZ1bmRCaWRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDgKICAgIC8vIHJlZnVuZEJpZChpZDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyZWZ1bmRCaWRfZWxzZV9ib2R5QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1NgogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXQocmVjZWl2ZXIsIHJldHVybkFtb3VudCkKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0CiAgICBiIHJlZnVuZEJpZF9hZnRlcl9pZl9lbHNlQDUKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJhZmZsZToKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NgogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJBdWN0aW9uSGFzTm90RW5kZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJBaG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFobmUKCnJhZmZsZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk3CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBlcnJOb3RBcHBsaWNhYmxlVG9UaGlzQXVjdGlvbikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgZXJyTm90QXBwbGljYWJsZVRvVGhpc0F1Y3Rpb24pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJOYXBwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcHAKCnJhZmZsZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID09PSAwLCBlcnJXaW5uZXJBbHJlYWR5RHJhd24pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDUKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEwIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID09PSAwLCBlcnJXaW5uZXJBbHJlYWR5RHJhd24pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogcmFmZmxlX2FmdGVyX2Fzc2VydEA3CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJXYWRyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycldhZHIKCnJhZmZsZV9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyV2lubmVyQWxyZWFkeUZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyV2lubmVyQWxyZWFkeUZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDU4IC8vICJFUlI6ZXJyV2FmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXYWZkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlQWxyZWFkeVByaXplQ2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA2IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVBbHJlYWR5UHJpemVDbGFpbWVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJhZmZsZV9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDU5IC8vICJFUlI6ZXJyUmFwYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSYXBjCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDIKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAyCiAgICAvLyBpZiAodGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTMKICAgIC8vIGlmICh0aGlzLmJpZElELnZhbHVlID09PSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5MwogICAgLy8gaWYgKHRoaXMuYmlkSUQudmFsdWUgPT09IDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGJueiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmV4Y2x1ZGVXaW5uZXJXZWlnaHRANjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDk3CiAgICAvLyBjb25zdCB7IGFjY291bnQgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDk3CiAgICAvLyBjb25zdCB7IGFjY291bnQgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDExIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gY29uc3QgeyBhY2NvdW50IH0gPSB0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZXh0cmFjdCAwIDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTgKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKGFjY291bnQpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmV4Y2x1ZGVXaW5uZXJXZWlnaHRANjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAyCiAgICAvLyB0aGlzLnNldFdlaWdodCh0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkudmFsdWUsIDApCiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBzZXRXZWlnaHQKCnJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZXhjbHVkZVdpbm5lcldlaWdodEA2MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1CiAgICAvLyBpZiAodGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NgogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTkgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1CiAgICAvLyBpZiAodGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNwogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCB0aGlzLnJhZmZsZVBvb2woKSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA3CiAgICAvLyB0aGlzLnNlbmRUb0FraXRhRXNjcm93KHRoaXMuYmlkQXNzZXQudmFsdWUsIHRoaXMucmFmZmxlUG9vbCgpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgcmFmZmxlUG9vbAogICAgY2FsbHN1YiBzZW5kVG9Ba2l0YUVzY3JvdwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA2IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA4CiAgICAvLyB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAoKcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMAogICAgLy8gaWYgKHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSA9PT0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE5IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMAogICAgLy8gaWYgKHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSA9PT0gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMQogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZUAyNwoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxNQogICAgLy8gdGhpcy5jb21taXREcmF3Um91bmQoKQogICAgY2FsbHN1YiBjb21taXREcmF3Um91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk1CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlQDI3CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTEFHX1JPVU5EUywgZXJyTm90RW5vdWdoVGltZSkKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxOQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgQkVBQ09OX0xBR19ST1VORFMsIGVyck5vdEVub3VnaFRpbWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCA0CiAgICArCiAgICA+PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMTkKICAgIHB1c2hieXRlcyAiRVJSOmVyck5ldG0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmV0bQoKcmFmZmxlX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIxLTkyNAogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjMKICAgIC8vIGFyZ3M6IFt0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMwogICAgLy8gYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5CiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM8MzI+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNTYgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMwogICAgLy8gYXJnczogW3RoaXMucmFmZmxlUm91bmQudmFsdWUsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMgogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMjEKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgYnl0ZWMgNjAgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIyCiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMS05MjQKICAgIC8vIGNvbnN0IHNlZWQgPSBhYmlDYWxsPHR5cGVvZiBSYW5kb21uZXNzQmVhY29uLnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnJhZmZsZVJvdW5kLnZhbHVlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDE4OTM5MmM1IC8vIG1ldGhvZCAiZ2V0KHVpbnQ2NCxieXRlW10pYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNgogICAgLy8gaWYgKHNlZWQubGVuZ3RoID09PSAwKSB7CiAgICBsZW4KICAgIGR1cAogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDI0CiAgICBwb3BuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLnJvdW5kID49IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyBCRUFDT05fTUFYX1dBSVRfUk9VTkRTLCBlcnJCZWFjb25Ob3RSZWFkeSkKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE0CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDE0IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlICsgQkVBQ09OX01BWF9XQUlUX1JPVU5EUywgZXJyQmVhY29uTm90UmVhZHkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMDAwCiAgICArCiAgICA+PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMjMKICAgIHB1c2hieXRlcyAiRVJSOmVyckJucmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQm5yZAoKcmFmZmxlX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI4CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MAogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDM4IC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI4CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzAKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAzOCAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyOAogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI5CiAgICAvLyB0aGlzLmNvbW1pdERyYXdSb3VuZCgpCiAgICBjYWxsc3ViIGNvbW1pdERyYXdSb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTUKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGIgcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVAMjcKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzMKICAgIC8vIGNvbnN0IHJuZ1N0YXRlID0gcGNnNjRJbml0KHNlZWQuc2xpY2UoMCwgMTYpKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxCiAgICA+PQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgcHVzaGludCAxNgogICAgZGlnIDIKICAgID49CiAgICBwdXNoaW50IDE2CiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTcKICAgIC8vIGxvZ2dlZEFzc2VydChzZWVkLmxlbmd0aCA9PT0gMTYsIGVyckludmFsaWRSYW5kb21TZWVkKQogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRANTQKICAgIHB1c2hieXRlcyAiRVJSOmVycklyc2QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXJzZAoKcmFmZmxlX2FmdGVyX2Fzc2VydEA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk4CiAgICAvLyBjb25zdCBzdGF0ZSA9IF9fcGNnMzJTdGVwKDAsIGluY3IpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDYgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGludGMgOCAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICB1bmNvdmVyIDIKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDYgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDggLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgY292ZXIgMgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIxCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgdW5jb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjEKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjk5CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhzdGF0ZSwgaW5pdGlhbFN0YXRlKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNiAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjEKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICBpbnRjIDkgLy8gMTQ0MjY5NTA0MDg4ODk2MzQwOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE5LTIyCiAgICAvLyByZXR1cm4gWwogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIC8vICAgICBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgLy8gXQogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzNgogICAgLy8gbGV0IHVwcGVyQm91bmQgPSB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxOSAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzYKICAgIC8vIGxldCB1cHBlckJvdW5kID0gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTM3CiAgICAvLyBpZiAodXBwZXJCb3VuZCA8IE1BWF9VSU5UNjQpIHsKICAgIGludGMgNyAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgPAogICAgYnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTM4CiAgICAvLyB1cHBlckJvdW5kICs9IDEKICAgIGludGNfMSAvLyAxCiAgICArCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MzEKICAgIC8vIGNvbnN0IHJlc3VsdCA9IG5ldyBEeW5hbWljQXJyYXk8YXJjNC5VaW50NjQ+KCkKICAgIGJ5dGVjIDYxIC8vIDB4MDAwMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0MwogICAgLy8gaWYgKHVwcGVyQm91bmQgIT09IDApIHsKICAgIGR1cAogICAgYnogcmFmZmxlX2Vsc2VfYm9keUA0MAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KHVwcGVyQm91bmQgPiAxLCBlcnJJbnZhbGlkUmFuZG9tQm91bmRzKQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRAMzcKICAgIGJ5dGVjIDYyIC8vICJFUlI6ZXJySXJiZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcmJkCgpyYWZmbGVfYWZ0ZXJfYXNzZXJ0QDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSwgZXJySW52YWxpZFJhbmRvbUJvdW5kcykKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQxCiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxLCBlcnJJbnZhbGlkUmFuZG9tQm91bmRzKQogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDQzCiAgICBieXRlYyA2MiAvLyAiRVJSOmVycklyYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXJiZAoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyh+dmFsdWUsIDEpCiAgICBkdXBuIDIKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTQKICAgIC8vIGNvbnN0IHRocmVzaG9sZDogdWludDY0ID0gX191aW50NjRUd29zKGFic29sdXRlQm91bmQpICUgYWJzb2x1dGVCb3VuZAogICAgc3dhcAogICAgJQogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgc3dhcAogICAgdW5jb3ZlciAyCgpyYWZmbGVfd2hpbGVfdG9wQDQ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBkaWcgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgPAogICAgYnogcmFmZmxlX2FmdGVyX3doaWxlQDQ5CgpyYWZmbGVfd2hpbGVfdG9wQDQ2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMAogICAgLy8gY29uc3QgbmV3U3RhdGUxID0gX19wY2czMlN0ZXAoc3RhdGVbMF0sIHBjZ0ZpcnN0SW5jcmVtZW50KQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDYgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBpbnRjIDggLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciA2CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTEKICAgIC8vIGNvbnN0IG5ld1N0YXRlMiA9IF9fcGNnMzJTdGVwKHN0YXRlWzFdLCBuZXdTdGF0ZTEgPT09IDAgPyBvcC5zaGwocGNnU2Vjb25kSW5jcmVtZW50LCAxKSA6IHBjZ1NlY29uZEluY3JlbWVudCkKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgYm56IHJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDY2CiAgICBwdXNoaW50IDI4ODUzOTAwODE3Nzc5MjY4MTgKCnJhZmZsZV90ZXJuYXJ5X21lcmdlQDY3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBzd2FwCiAgICBkdXAKICAgIGludGMgNiAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEzCiAgICAvLyByZXR1cm4gW1tuZXdTdGF0ZTEsIG5ld1N0YXRlMl0sIG9wLnNobChfX3BjZzMyT3V0cHV0KHN0YXRlWzBdKSwgMzIpIHwgX19wY2czMk91dHB1dChzdGF0ZVsxXSldCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgdW5jb3ZlciA1CiAgICBjYWxsc3ViIF9fcGNnMzJPdXRwdXQKICAgIGludGNfMyAvLyAzMgogICAgc2hsCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgX19wY2czMk91dHB1dAogICAgfAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU4CiAgICAvLyBjb25zdCBbbmV3U3RhdGUsIGNhbmRpZGF0ZV0gPSBfX3BjZzY0VW5ib3VuZGVkUmFuZG9tKHN0YXRlKQogICAgZHVwCiAgICBleHRyYWN0IDAgMTYKICAgIGNvdmVyIDQKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjAKICAgIC8vIGlmIChjYW5kaWRhdGUgPj0gdGhyZXNob2xkKSB7CiAgICBkaWcgNgogICAgPj0KICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDQ4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBkaWcgMQogICAgJQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgICsKICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjEKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMAogICAgcmVwbGFjZTIgMAogICAgc3dhcAogICAgY29uY2F0CiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIHN3YXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBzd2FwCiAgICB1bmNvdmVyIDMKICAgIGIgcmFmZmxlX3doaWxlX3RvcEA0NAoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VANDg6CiAgICBwb3AKICAgIHVuY292ZXIgMwogICAgYiByYWZmbGVfd2hpbGVfdG9wQDQ2CgpyYWZmbGVfdGVybmFyeV9mYWxzZUA2NjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTEKICAgIC8vIGNvbnN0IG5ld1N0YXRlMiA9IF9fcGNnMzJTdGVwKHN0YXRlWzFdLCBuZXdTdGF0ZTEgPT09IDAgPyBvcC5zaGwocGNnU2Vjb25kSW5jcmVtZW50LCAxKSA6IHBjZ1NlY29uZEluY3JlbWVudCkKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICBiIHJhZmZsZV90ZXJuYXJ5X21lcmdlQDY3CgpyYWZmbGVfYWZ0ZXJfd2hpbGVANDk6CiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgdW5jb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjgKICAgIC8vIHJldHVybiBbc3RhdGUsIHJlc3VsdF0KICAgIHB1c2hieXRlcyAweDAwMTIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MgogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMCAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MgogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgYiByYWZmbGVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZUAyNwoKcmFmZmxlX2Vsc2VfYm9keUA0MDoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1MQogICAgLy8gYWJzb2x1dGVCb3VuZCA9IG9wLmJ0b2koQnl0ZXMoQmlnVWludCgyICoqIDY0KSAtIEJpZ1VpbnQobG93ZXJCb3VuZCkpKQogICAgaW50YyA3IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICBiIHJhZmZsZV9hZnRlcl9pZl9lbHNlQDQzCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5maW5kV2lubmVyW3JvdXRpbmddKCkgLT4gdm9pZDoKZmluZFdpbm5lcjoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0NQogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIGVyck5vdEFwcGxpY2FibGVUb1RoaXNBdWN0aW9uKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBlcnJOb3RBcHBsaWNhYmxlVG9UaGlzQXVjdGlvbikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDMgLy8gIkVSUjplcnJOYXBwIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5hcHAKCmZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBlcnJBdWN0aW9uSGFzTm90RW5kZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDM3IC8vICJFUlI6ZXJyQWhuZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJBaG5lCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIGVycldpbm5pbmdOdW1iZXJOb3RGb3VuZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIGVycldpbm5pbmdOdW1iZXJOb3RGb3VuZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV25uZiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXbm5mCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBlcnJXaW5uZXJBbHJlYWR5Rm91bmQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDU4IC8vICJFUlI6ZXJyV2FmZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXYWZkCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODQKICAgIC8vIGxldCBzdGFydGluZ0luZGV4ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZS5zdGFydGluZ0luZGV4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NwogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJDdXJzb3JzIH0pCiAgICBieXRlYyAyNiAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg0CiAgICAvLyBsZXQgc3RhcnRpbmdJbmRleCA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuc3RhcnRpbmdJbmRleAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODUKICAgIC8vIGxldCBjdXJyZW50UmFuZ2VTdGFydCA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUuY3VycmVudFJhbmdlU3RhcnQKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gY29uc3QgYm94Q291bnQgPSB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTEKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4NgogICAgLy8gY29uc3QgYm94Q291bnQgPSB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODcKICAgIC8vIGNvbnN0IHdpbm5pbmdUaWNrZXQgPSB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODcKICAgIC8vIGNvbnN0IHdpbm5pbmdUaWNrZXQgPSB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciA0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4OAogICAgLy8gbGV0IHNraXBwZWQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MgogICAgLy8gY29uc3QgYWhlYWQ6IHVpbnQ2NCA9IGJveENvdW50IC0gc3RhcnRpbmdJbmRleCAvIENodW5rU2l6ZQogICAgZGlnIDEKICAgIGludGMgNSAvLyA0MDk2CiAgICAvCiAgICAtCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gaWYgKHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUgPT09IDAgJiYgYWhlYWQgPiA0KSB7CiAgICBpbnRjIDUgLy8gNDA5NgogICAgJQogICAgYm56IGZpbmRXaW5uZXJfd2hpbGVfdG9wQDI5CiAgICBkaWcgMTAKICAgIHB1c2hpbnQgNAogICAgPgogICAgYnogZmluZFdpbm5lcl93aGlsZV90b3BAMjkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyBlbnN1cmVCdWRnZXQoKGFoZWFkIDwgTWF4Qm94U2tpcHNQZXJDYWxsID8gYWhlYWQgOiBNYXhCb3hTa2lwc1BlckNhbGwpICogNjAgKyAzMDApCiAgICBkaWcgMTAKICAgIGR1cAogICAgcHVzaGludCA2NAogICAgPAogICAgcHVzaGludCA2NAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDYwCiAgICAqCiAgICBwdXNoaW50IDMwMAogICAgKwogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAoKZmluZFdpbm5lcl93aGlsZV90b3BAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5NwogICAgLy8gd2hpbGUgKHNraXBwZWQgPCBNYXhCb3hTa2lwc1BlckNhbGwgJiYgc3RhcnRpbmdJbmRleCAlIENodW5rU2l6ZSA9PT0gMCAmJiBzdGFydGluZ0luZGV4IC8gQ2h1bmtTaXplIDwgYm94Q291bnQpIHsKICAgIGRpZyAxCiAgICBwdXNoaW50IDY0CiAgICA8CiAgICBieiBmaW5kV2lubmVyX2Jsb2NrQDM0CiAgICBkdXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAlCiAgICBibnogZmluZFdpbm5lcl9ibG9ja0AzNAogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBidXJ5IDExCiAgICBkaWcgNAogICAgPAogICAgYnogZmluZFdpbm5lcl9ibG9ja0AzNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTgKICAgIC8vIHJldHVybiBvcC5idG9pKHRoaXMud2VpZ2h0VG90YWxzLmV4dHJhY3QoYm94ICogOCwgOCkpCiAgICBkaWcgOQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTgKICAgIC8vIHJldHVybiBvcC5idG9pKHRoaXMud2VpZ2h0VG90YWxzLmV4dHJhY3QoYm94ICogOCwgOCkpCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk5CiAgICAvLyBpZiAod2lubmluZ1RpY2tldCA8IGN1cnJlbnRSYW5nZVN0YXJ0ICsgYm94U3Rha2UpIHsKICAgIGRpZyA4CiAgICArCiAgICBkdXAKICAgIGJ1cnkgOAogICAgZGlnIDMKICAgID4KICAgIGJueiBmaW5kV2lubmVyX2Jsb2NrQDM0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gc3RhcnRpbmdJbmRleCArPSBDaHVua1NpemUKICAgIGludGMgNSAvLyA0MDk2CiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwNQogICAgLy8gc2tpcHBlZCArPSAxCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgZGlnIDYKICAgIGJ1cnkgOAogICAgYiBmaW5kV2lubmVyX3doaWxlX3RvcEAyOQoKZmluZFdpbm5lcl9ibG9ja0AzNDoKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDgKICAgIC8vIHJldHVybiBbc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnQsIHNraXBwZWRdCiAgICBpdG9iCiAgICBkaWcgNQogICAgaXRvYgogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUzCiAgICAvLyBjb25zdCBzdGFydGluZ0luZGV4ID0gd2lubmluZ0JveEluZm9bMF0KICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1NAogICAgLy8gbGV0IGN1cnJlbnRSYW5nZVN0YXJ0ID0gd2lubmluZ0JveEluZm9bMV0KICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU4CiAgICAvLyBpZiAod2lubmluZ0JveEluZm9bMl0gPT09IE1heEJveFNraXBzUGVyQ2FsbCkgewogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIHB1c2hpbnQgNjQKICAgID09CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU5CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0geyBzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydCB9CiAgICBpdG9iCiAgICBkaWcgNAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDI2IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUgPSB7IHN0YXJ0aW5nSW5kZXgsIGN1cnJlbnRSYW5nZVN0YXJ0IH0KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5maW5kV2lubmVyQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDUKICAgIC8vIGZpbmRXaW5uZXIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTY0CiAgICAvLyBpZiAoc3RhcnRpbmdJbmRleCA+PSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAyMCAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk2NAogICAgLy8gaWYgKHN0YXJ0aW5nSW5kZXggPj0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgPD0KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTMKICAgIC8vIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTQKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMTQgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyB0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID0gMAogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDI2IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTUKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUgPSB7IHN0YXJ0aW5nSW5kZXg6IDAsIGN1cnJlbnRSYW5nZVN0YXJ0OiAxIH0KICAgIGJ5dGVjIDU1IC8vIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0NQogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgYiBmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5maW5kV2lubmVyQDIyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk2OQogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjAgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjkKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgLSBzdGFydGluZ0luZGV4CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzAKICAgIC8vIGl0ZXJhdGlvbkFtb3VudCA9IHJlbWFpbmRlciA+IGl0ZXJhdGlvbkFtb3VudCA/IGl0ZXJhdGlvbkFtb3VudCA6IHJlbWFpbmRlcgogICAgZHVwCiAgICBkaWcgNAogICAgZHVwCiAgICBjb3ZlciAzCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3MgogICAgLy8gY29uc3QgY2h1bmtPZmZzZXQ6IHVpbnQ2NCA9IHN0YXJ0aW5nSW5kZXggJSBDaHVua1NpemUKICAgIHN3YXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAlCiAgICBkdXAKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzMKICAgIC8vIGNvbnN0IHJlbWFpbmluZ0luQ2h1bms6IHVpbnQ2NCA9IENodW5rU2l6ZSAtIGNodW5rT2Zmc2V0CiAgICBpbnRjIDUgLy8gNDA5NgogICAgc3dhcAogICAgLQogICAgZHVwCiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc0CiAgICAvLyBpZiAoaXRlcmF0aW9uQW1vdW50ID4gcmVtYWluaW5nSW5DaHVuaykgewogICAgPgogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE1CiAgICBkaWcgMgogICAgYnVyeSAyCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gZW5zdXJlQnVkZ2V0KChpdGVyYXRpb25BbW91bnQgKiA2MCkpCiAgICBkaWcgMQogICAgcHVzaGludCA2MAogICAgKgogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODAKICAgIC8vIGNvbnN0IHdpbm5pbmdUaWNrZXQgPSB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNQogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTAgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODAKICAgIC8vIGNvbnN0IHdpbm5pbmdUaWNrZXQgPSB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gY29uc3QgYm94ID0gdGhpcy53ZWlnaHRzKHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUpCiAgICBkdXAKICAgIGludGMgNSAvLyA0MDk2CiAgICAvCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIGJ5dGVzPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKZmluZFdpbm5lcl93aGlsZV90b3BAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyA1CiAgICA8CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX3doaWxlQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NAogICAgLy8gY3VycmVudFJhbmdlRW5kID0gY3VycmVudFJhbmdlU3RhcnQgKyBvcC5idG9pKGJveC5leHRyYWN0KChjaHVua09mZnNldCArIGkpICogOCwgOCkpCiAgICBkaWcgOAogICAgZGlnIDEKICAgICsKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkaWcgMwogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGJveF9leHRyYWN0CiAgICBidG9pCiAgICBkaWcgOAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgICsKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg1CiAgICAvLyBpZiAod2lubmluZ1RpY2tldCA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB3aW5uaW5nVGlja2V0IDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBkaWcgNQogICAgPD0KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAyMAogICAgZGlnIDQKICAgIGRpZyAxCiAgICA8CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9IHRoaXMubG9jYXRpb25zKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZQogICAgZGlnIDIKICAgIGRpZyAyCiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0MwogICAgLy8gbG9jYXRpb25zID0gQm94TWFwPHVpbnQ2NCwgQWNjb3VudD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhMb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDQ2IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSB0aGlzLmxvY2F0aW9ucyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSB0aGlzLmxvY2F0aW9ucyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgc3dhcAogICAgYnVyeSA4CiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDE2CgpmaW5kV2lubmVyX2FmdGVyX3doaWxlQDIxOgogICAgcG9wCiAgICBidXJ5IDEKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OTIKICAgIC8vIHN0YXJ0aW5nSW5kZXg6IChzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50KSwKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5MS05OTQKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUgPSB7CiAgICAvLyAgIHN0YXJ0aW5nSW5kZXg6IChzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50KSwKICAgIC8vICAgY3VycmVudFJhbmdlU3RhcnQ6IGN1cnJlbnRSYW5nZVN0YXJ0LAogICAgLy8gfQogICAgaXRvYgogICAgZGlnIDQKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NwogICAgLy8gZmluZFdpbm5lckN1cnNvcnMgPSBHbG9iYWxTdGF0ZTxGaW5kV2lubmVyQ3Vyc29ycz4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUZpbmRXaW5uZXJDdXJzb3JzIH0pCiAgICBieXRlYyAyNiAvLyAiZmluZF93aW5uZXJfY3Vyc29ycyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkxLTk5NAogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsKICAgIC8vICAgc3RhcnRpbmdJbmRleDogKHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQpLAogICAgLy8gICBjdXJyZW50UmFuZ2VTdGFydDogY3VycmVudFJhbmdlU3RhcnQsCiAgICAvLyB9CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDUKICAgIC8vIGZpbmRXaW5uZXIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGIgZmluZFdpbm5lcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZmluZFdpbm5lckAyMgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kTUJSW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVmdW5kTUJSOgogICAgaW50Y18wIC8vIDAKICAgIGR1cAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTk3CiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNiAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTk4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0NSAvLyAiRVJSOmVyclB6bmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUHpuYwoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAxCiAgICAvLyB0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwMQogICAgLy8gdGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZWZ1bmRNQlJfYm9vbF90cnVlQDYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNwogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMDEKICAgIC8vIHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MgfHwgdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IHJlZnVuZE1CUl9ib29sX3RydWVANgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDYgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAxCiAgICAvLyB0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJlZnVuZE1CUl9ib29sX2ZhbHNlQDcKCnJlZnVuZE1CUl9ib29sX3RydWVANjoKICAgIGludGNfMSAvLyAxCgpyZWZ1bmRNQlJfYm9vbF9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAwLTEwMDMKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgdGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcyB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwKICAgIC8vICAgZXJyV2lubmVyTm90Rm91bmQKICAgIC8vICkKICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyA2MyAvLyAiRVJSOmVyclduZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25mZAoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkSUQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBlcnJBbGxSZWZ1bmRzQ29tcGxldGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyQWxsUmVmdW5kc0NvbXBsZXRlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTMgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDA1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRJRC52YWx1ZSAhPT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIGVyckFsbFJlZnVuZHNDb21wbGV0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAhPQogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOmVyckFyZmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQXJmYwoKcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwNwogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDEzIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwNwogICAgLy8gY29uc3Qgc3RhcnRpbmdJbmRleCA9IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMDgKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMDgKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSAtIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOQogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gcmVtYWluZGVyID4gaXRlcmF0aW9uQW1vdW50ID8gaXRlcmF0aW9uQW1vdW50IDogcmVtYWluZGVyCiAgICBkdXAKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICA+CiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDExCiAgICAvLyBlbnN1cmVCdWRnZXQoKGl0ZXJhdGlvbkFtb3VudCAqIDIyMCkpCiAgICBwdXNoaW50IDIyMAogICAgKgogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEzCiAgICAvLyBjb25zdCB7IGJpZHMsIGJpZHNCeUFkZHJlc3MsIGxvY2F0aW9ucyB9ID0gdGhpcy5tYnIoKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLm1icgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDQKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCgpyZWZ1bmRNQlJfd2hpbGVfdG9wQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDE1CiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZGlnIDUKICAgIGRpZyAzCiAgICArCiAgICBkaWcgMQogICAgPgogICAgYnogcmVmdW5kTUJSX2FmdGVyX3doaWxlQDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMTcKICAgIC8vIGNvbnN0IHsgcmVmdW5kZWQsIGFjY291bnQgfSA9IHRoaXMuYmlkcyhpKS52YWx1ZQogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNQogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMTEgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDE3CiAgICAvLyBjb25zdCB7IHJlZnVuZGVkLCBhY2NvdW50IH0gPSB0aGlzLmJpZHMoaSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNTc2CiAgICBnZXRiaXQKICAgIHN3YXAKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDIwCiAgICAvLyBsZXQgZGlzYnVyc2VtZW50Q29zdDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAyMQogICAgLy8gaWYgKCFyZWZ1bmRlZCAmJiBpICE9PSB0aGlzLmJpZElELnZhbHVlIC0gMSkgewogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjEKICAgIC8vIGlmICghcmVmdW5kZWQgJiYgaSAhPT0gdGhpcy5iaWRJRC52YWx1ZSAtIDEpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZGlnIDEKICAgICE9CiAgICBieiByZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDIyCiAgICAvLyBjb25zdCBbcmVjZWl2ZXIsIHJldHVybkFtb3VudF0gPSB0aGlzLm1hcmtSZWZ1bmRlZChpKQogICAgZHVwCiAgICBjYWxsc3ViIG1hcmtSZWZ1bmRlZAogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGludGNfMyAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAyMwogICAgLy8gZGlzYnVyc2VtZW50Q29zdCA9IHRoaXMuc2VuZEJpZEFzc2V0T3JEaXNidXJzZShyZWNlaXZlciwgcmV0dXJuQW1vdW50KQogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXRPckRpc2J1cnNlCiAgICBidXJ5IDExCgpyZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAyOAogICAgLy8gdGhpcy5iaWRzKGkpLmRlbGV0ZSgpCiAgICBkaWcgMQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgZGlnIDMKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMjkKICAgIC8vIGlmICh0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiByZWZ1bmRNQlJfaWZfYm9keUAxOAogICAgcG9wCiAgICBkaWcgNQogICAgc3dhcAoKcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2CiAgICAvLyByZXR1cm4gQnl0ZXMoUGF5ZXJCb3hQcmVmaXgpLmNvbmNhdChzaGEyNTYocmVjb3JkKSkKICAgIHVuY292ZXIgMgogICAgc2hhMjU2CiAgICBwdXNoYnl0ZXMgIiQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDIKICAgIC8vIGNvbnN0IFtwYXllciwgc3BvbnNvcmVkXSA9IG9wLkJveC5nZXQoa2V5KQogICAgYm94X2dldAogICAgc3dhcAogICAgY292ZXIgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDMKICAgIC8vIGlmICghc3BvbnNvcmVkKSB7CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjkKICAgIHVuY292ZXIgMgogICAgcG9wCiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDQKICAgIC8vIHJldHVybiBbb3duZXIsIGFtb3VudF0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgY29uY2F0CgpyZWZ1bmRNQlJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdEAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0MwogICAgLy8gY29uc3QgW3BheWVlLCB0b3RhbF0gPSByZWxlYXNlRGVwb3NpdCh0aGlzLmJpZHMoaSkua2V5LCBhY2NvdW50LCByZWZ1bmRBbW91bnQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgYnVyeSAxMgogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0NAogICAgLy8gaWYgKHRvdGFsID4gZGlzYnVyc2VtZW50Q29zdCAmJiB0aGlzLmNhblJlY2VpdmVBbGdvKHBheWVlLCB0b3RhbCAtIGRpc2J1cnNlbWVudENvc3QpKSB7CiAgICBkaWcgOQogICAgPgogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjUKICAgIGRpZyA2CiAgICBkaWcgOQogICAgLQogICAgZHVwCiAgICBidXJ5IDkKICAgIGRpZyAxMQogICAgc3dhcAogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0NS0xMDUwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5ZWUsCiAgICAvLyAgICAgYW1vdW50OiB0b3RhbCAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgMTAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA0NS0xMDQ5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogcGF5ZWUsCiAgICAvLyAgICAgYW1vdW50OiB0b3RhbCAtIGRpc2J1cnNlbWVudENvc3QsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDUtMTA1MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHBheWVlLAogICAgLy8gICAgIGFtb3VudDogdG90YWwgLSBkaXNidXJzZW1lbnRDb3N0LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpyZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxNQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBiIHJlZnVuZE1CUl93aGlsZV90b3BAMTMKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNDYKICAgIC8vIG9wLkJveC5kZWxldGUoa2V5KQogICAgdW5jb3ZlciAyCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ3CiAgICAvLyBjb25zdCB0b3RhbDogdWludDY0ID0gYW1vdW50ICsgUGF5ZXJSZWNvcmRNQlIKICAgIHN3YXAKICAgIGludGMgMTAgLy8gMjg1MDAKICAgICsKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzAKICAgIC8vIGNvbnN0IFssIGZ1bmRlZF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZGlnIDEKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gcmV0dXJuIGZ1bmRlZCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiByZWZ1bmRNQlJfYm9vbF90cnVlQDMxCiAgICBkaWcgOAogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgID49CiAgICBieiByZWZ1bmRNQlJfYm9vbF9mYWxzZUAzMgoKcmVmdW5kTUJSX2Jvb2xfdHJ1ZUAzMToKICAgIGludGNfMSAvLyAxCgpyZWZ1bmRNQlJfYm9vbF9tZXJnZUAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ4CiAgICAvLyByZXR1cm4gW2NhblJlY2VpdmVBbGdvKEFjY291bnQocGF5ZXIpLCB0b3RhbCkgPyBBY2NvdW50KHBheWVyKSA6IG93bmVyLCB0b3RhbF0KICAgIGJ6IHJlZnVuZE1CUl90ZXJuYXJ5X2ZhbHNlQDM1CiAgICB1bmNvdmVyIDIKICAgIHBvcAogICAgc3dhcAoKcmVmdW5kTUJSX3Rlcm5hcnlfbWVyZ2VAMzY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0OAogICAgLy8gcmV0dXJuIFtjYW5SZWNlaXZlQWxnbyhBY2NvdW50KHBheWVyKSwgdG90YWwpID8gQWNjb3VudChwYXllcikgOiBvd25lciwgdG90YWxdCiAgICBkaWcgNwogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNDMKICAgIC8vIGNvbnN0IFtwYXllZSwgdG90YWxdID0gcmVsZWFzZURlcG9zaXQodGhpcy5iaWRzKGkpLmtleSwgYWNjb3VudCwgcmVmdW5kQW1vdW50KQogICAgYiByZWZ1bmRNQlJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWxlYXNlRGVwb3NpdEAzNwoKcmVmdW5kTUJSX3Rlcm5hcnlfZmFsc2VAMzU6CiAgICBidXJ5IDEKICAgIHN3YXAKICAgIGIgcmVmdW5kTUJSX3Rlcm5hcnlfbWVyZ2VAMzYKCnJlZnVuZE1CUl9ib29sX2ZhbHNlQDMyOgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVmdW5kTUJSX2Jvb2xfbWVyZ2VAMzMKCnJlZnVuZE1CUl9pZl9ib2R5QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDMwCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkudmFsdWUKICAgIGR1cAogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzMQogICAgLy8gdGhpcy5iaWRzQnlBZGRyZXNzKGFjY291bnQpLmRlbGV0ZSgpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzMgogICAgLy8gcmVmdW5kQW1vdW50ICs9IGJpZHNCeUFkZHJlc3MKICAgIGRpZyA2CiAgICBkaWcgOAogICAgKwogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDM0CiAgICAvLyBpZiAodGhpcy5sb2NhdGlvbnMobG9jKS5leGlzdHMpIHsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQzCiAgICAvLyBsb2NhdGlvbnMgPSBCb3hNYXA8dWludDY0LCBBY2NvdW50Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeExvY2F0aW9ucyB9KQogICAgYnl0ZWMgNDYgLy8gImwiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDM0CiAgICAvLyBpZiAodGhpcy5sb2NhdGlvbnMobG9jKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzNQogICAgLy8gdGhpcy5sb2NhdGlvbnMobG9jKS5kZWxldGUoKQogICAgZGlnIDE0CiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBjb25zdCBjb3VudCA9IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBjb25zdCBjb3VudCA9IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDE1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gaWYgKGNvdW50ID09PSAwKSB7CiAgICBieiByZWZ1bmRNQlJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlbGVhc2VXZWlnaHRTbG90QDQzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2MAogICAgLy8gY29uc3QgYm94OiB1aW50NjQgPSBjb3VudCAtIDEKICAgIGRpZyAxMgogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjEKICAgIC8vIGNvbnN0IGxlbmd0aCA9IHRoaXMud2VpZ2h0cyhib3gpLmxlbmd0aAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBieXRlcz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyOCAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2MQogICAgLy8gY29uc3QgbGVuZ3RoID0gdGhpcy53ZWlnaHRzKGJveCkubGVuZ3RoCiAgICBib3hfbGVuCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBpZiAobGVuZ3RoID4gOCkgewogICAgaW50Y18yIC8vIDgKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDQyCiAgICB1bmNvdmVyIDkKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjQKICAgIC8vIHRoaXMud2VpZ2h0cyhib3gpLnJlc2l6ZShsZW5ndGggLSA4KQogICAgaW50Y18yIC8vIDgKICAgIC0KICAgIHVuY292ZXIgMwogICAgc3dhcAogICAgYm94X3Jlc2l6ZQoKcmVmdW5kTUJSX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWxlYXNlV2VpZ2h0U2xvdEA0MzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzNwogICAgLy8gcmVmdW5kQW1vdW50ICs9IGxvY2F0aW9ucwogICAgc3dhcAogICAgZGlnIDQKICAgICsKICAgIHN3YXAKICAgIGIgcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjEKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDQyOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2OAogICAgLy8gdGhpcy53ZWlnaHRzKGJveCkuZGVsZXRlKCkKICAgIHVuY292ZXIgMgogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2OQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMucmVzaXplKGJveCAqIDgpCiAgICB1bmNvdmVyIDcKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjkKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnJlc2l6ZShib3ggKiA4KQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDcwCiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IGJveAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAzNgogICAgLy8gdGhpcy5yZWxlYXNlV2VpZ2h0U2xvdCgpCiAgICBiIHJlZnVuZE1CUl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVsZWFzZVdlaWdodFNsb3RANDMKCnJlZnVuZE1CUl9hZnRlcl93aGlsZUAyNjoKICAgIHBvcG4gMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDU0CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTMgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDU0CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5CiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMTMgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDU0CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk5NwogICAgLy8gcmVmdW5kTUJSKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyZWZ1bmRNQlJfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIGIgcmVmdW5kTUJSX2Jvb2xfbWVyZ2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2xhaW1Qcml6ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsYWltUHJpemU6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1OQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBjbGFpbVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNyAvLyAiRVJSOmVyckFobmUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQWhuZQoKY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVBbHJlYWR5Q2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNiAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUHJpemVBbHJlYWR5Q2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQYWNsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBhY2wKCmNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjMKICAgIC8vIGlmICh0aGlzLmJpZElELnZhbHVlID09PSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjMKICAgIC8vIGlmICh0aGlzLmJpZElELnZhbHVlID09PSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBieiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIHRoaXMudHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIodGhpcy5zZWxsZXIudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MgogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTcgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDE2IC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDY1CiAgICAvLyB0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNiAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNjYKICAgIC8vIHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CgpjbGFpbVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVByaXplQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDU3CiAgICAvLyBjbGFpbVByaXplKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNzEKICAgIC8vIGNvbnN0IHsgYWNjb3VudCwgYW1vdW50LCBtYXJrZXRwbGFjZSB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDcxCiAgICAvLyBjb25zdCB7IGFjY291bnQsIGFtb3VudCwgbWFya2V0cGxhY2UgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDExIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNzEKICAgIC8vIGNvbnN0IHsgYWNjb3VudCwgYW1vdW50LCBtYXJrZXRwbGFjZSB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBkaWcgMQogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgc3dhcAogICAgZXh0cmFjdCA0MCAzMgogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDczCiAgICAvLyB0aGlzLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyKGFjY291bnQpCiAgICBjYWxsc3ViIHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNzUKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNzUKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUHJpemVfZWxzZV9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjcxCiAgICAvLyBjb25zdCB7IGNyZWF0b3IsIGFraXRhLCBtYXJrZXRwbGFjZSwgc2VsbGVyIH0gPSB0aGlzLmdldEFtb3VudHMoYW1vdW50KQogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAzCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBha2l0YUFtb3VudDogdWludDY0ID0gdGhpcy5pc1ByaXplQm94LnZhbHVlID8gKGFraXRhICsgY3JlYXRvcikgOiBha2l0YQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMTUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyBjb25zdCBha2l0YUFtb3VudDogdWludDY0ID0gdGhpcy5pc1ByaXplQm94LnZhbHVlID8gKGFraXRhICsgY3JlYXRvcikgOiBha2l0YQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAyMwogICAgZGlnIDQKICAgICsKCmNsYWltUHJpemVfdGVybmFyeV9tZXJnZUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc3CiAgICAvLyBpZiAoYWtpdGFBbW91bnQgPiAwKSB7CiAgICBkdXAKICAgIGJueiBjbGFpbVByaXplX2lmX2JvZHlAMjUKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjgxCiAgICAvLyB0aGlzLnNlbmRUb0FraXRhRXNjcm93KHRoaXMuYmlkQXNzZXQudmFsdWUsIGxlZnRvdmVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODEKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy5iaWRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBzZW5kVG9Ba2l0YUVzY3JvdwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4NAogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXQodGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgbWFya2V0cGxhY2UpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDQwIC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjg0CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldCh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBtYXJrZXRwbGFjZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjg3CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldChidXlTaWRlTWFya2V0cGxhY2UsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjkwCiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldCh0aGlzLnNlbGxlci52YWx1ZSwgc2VsbGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDE3IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5MAogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXQodGhpcy5zZWxsZXIudmFsdWUsIHNlbGxlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAxNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTQKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0KEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGNyZWF0b3IpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5NAogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXQoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgY3JlYXRvcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNiAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4MQogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA1NwogICAgLy8gY2xhaW1Qcml6ZSgpOiB2b2lkIHsKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2xhaW1Qcml6ZUAxMQoKY2xhaW1Qcml6ZV9pZl9ib2R5QDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc4CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIDAsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlclJlZmVycmVyIH0pCiAgICBieXRlYyA0MSAvLyAic2VsbGVyX3JlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAyMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgMCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGNvdmVyIDIKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50VG8KICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMjYKCmNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAyMzoKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDI0CgpjbGFpbVByaXplX2Vsc2VfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgYWtpdGEsIG1hcmtldHBsYWNlLCBzZWxsZXIgfSA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDMKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTMKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNgogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyAxNSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTMKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1Qcml6ZV90ZXJuYXJ5X2ZhbHNlQDE0CiAgICBkaWcgNAogICAgKwoKY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTcKICAgIC8vIGlmIChha2l0YUFtb3VudCA+IDApIHsKICAgIGR1cAogICAgYm56IGNsYWltUHJpemVfaWZfYm9keUAxNgoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjIKICAgIC8vIHRoaXMuc2VuZFRvQWtpdGFFc2Nyb3codGhpcy5iaWRBc3NldC52YWx1ZSwgbGVmdG92ZXIpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MgogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBsZWZ0b3ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRUb0FraXRhRXNjcm93CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UodGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgbWFya2V0cGxhY2UpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NAogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDQwIC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY1CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UodGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgbWFya2V0cGxhY2UpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0T3JEaXNidXJzZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKGJ1eVNpZGVNYXJrZXRwbGFjZSwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldE9yRGlzYnVyc2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzEKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0T3JEaXNidXJzZSh0aGlzLnNlbGxlci52YWx1ZSwgc2VsbGVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDE3IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3MQogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKHRoaXMuc2VsbGVyLnZhbHVlLCBzZWxsZXIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXRPckRpc2J1cnNlCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgMTUgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc0CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc1CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgY3JlYXRvcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA3IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc1CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgY3JlYXRvcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDEKICAgIGNhbGxzdWIgc2VuZEJpZEFzc2V0T3JEaXNidXJzZQogICAgcG9wCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMAoKY2xhaW1Qcml6ZV9pZl9ib2R5QDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjAKICAgIC8vIHNlbGxlclJlZmVycmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlclJlZmVycmVyIH0pCiAgICBieXRlYyA0MSAvLyAic2VsbGVyX3JlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTgKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50VG8odGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXJSZWZlcnJlci52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudFRvKHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyUmVmZXJyZXIudmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50LCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBjb3ZlciAzCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50VG8KICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTcKCmNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAxNDoKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDE1CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVJhZmZsZVByaXplW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xhaW1SYWZmbGVQcml6ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVycldpbm5lck5vdEZvdW5kKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2MyAvLyAiRVJSOmVyclduZmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25mZAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlQWxyZWFkeVByaXplQ2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA2IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4NgogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlQWxyZWFkeVByaXplQ2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1OSAvLyAiRVJSOmVyclJhcGMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyUmFwYwoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4OQogICAgLy8gY29uc3QgcG9vbCA9IHRoaXMucmFmZmxlUG9vbCgpCiAgICBjYWxsc3ViIHJhZmZsZVBvb2wKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5MAogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5MAogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjU1CiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgNDIgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDkwCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlIH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZGlnIDEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5MgogICAgLy8gY29uc3QgbGVmdG92ZXI6IHVpbnQ2NCA9IHBvb2wgLSBha2l0YUZlZQogICAgc3dhcAogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5NAogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBha2l0YUZlZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5NAogICAgLy8gdGhpcy5zZW5kVG9Ba2l0YUVzY3Jvdyh0aGlzLmJpZEFzc2V0LnZhbHVlLCBha2l0YUZlZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgc2VuZFRvQWtpdGFFc2Nyb3cKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDk3CiAgICAvLyB0aGlzLnNlbmRCaWRBc3NldE9yRGlzYnVyc2UodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsIGxlZnRvdmVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA3CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA5NwogICAgLy8gdGhpcy5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLCBsZWZ0b3ZlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBjYWxsc3ViIHNlbmRCaWRBc3NldE9yRGlzYnVyc2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NAogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgNiAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOTkKICAgIC8vIHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwODQKICAgIC8vIGNsYWltUmFmZmxlUHJpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTEwCiAgICAvLyBjbGVhcldlaWdodHNCb3hlcyhpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTEzCiAgICAvLyBUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSAmJgogICAgdHhuIFNlbmRlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDE3IC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMTMKICAgIC8vIFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExMy0xMTE0CiAgICAvLyBUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSAmJgogICAgLy8gdGhpcy5iaWRJRC52YWx1ZSA9PT0gMSAmJgogICAgYnogY2xlYXJXZWlnaHRzQm94ZXNfYm9vbF9mYWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMTQKICAgIC8vIHRoaXMuYmlkSUQudmFsdWUgPT09IDEgJiYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjXzIgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExNAogICAgLy8gdGhpcy5iaWRJRC52YWx1ZSA9PT0gMSAmJgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTEzLTExMTQKICAgIC8vIFR4bi5zZW5kZXIgPT09IHRoaXMuc2VsbGVyLnZhbHVlICYmCiAgICAvLyB0aGlzLmJpZElELnZhbHVlID09PSAxICYmCiAgICBieiBjbGVhcldlaWdodHNCb3hlc19ib29sX2ZhbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExNQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNSAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTE1CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIDwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExMy0xMTE1CiAgICAvLyBUeG4uc2VuZGVyID09PSB0aGlzLnNlbGxlci52YWx1ZSAmJgogICAgLy8gdGhpcy5iaWRJRC52YWx1ZSA9PT0gMSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IGNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfZmFsc2VANQogICAgaW50Y18xIC8vIDEKCmNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfbWVyZ2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExOAogICAgLy8gaWYgKCFwcmVTdGFydENhbmNlbCkgewogICAgYm56IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExOQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExOQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgZXJyQXVjdGlvbkhhc05vdEVuZGVkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMzcgLy8gIkVSUjplcnJBaG5lIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckFobmUKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTIwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIGVyclByaXplTm90Q2xhaW1lZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxNiAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEyMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBlcnJQcml6ZU5vdENsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgNDUgLy8gIkVSUjplcnJQem5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclB6bmMKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVOb3RQcml6ZUNsYWltZWQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MgogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlY18zIC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTIyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIGVyclJhZmZsZU5vdFByaXplQ2xhaW1lZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGVhcldlaWdodHNCb3hlc19ib29sX3RydWVAMTMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyA2IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBlcnJSYWZmbGVOb3RQcml6ZUNsYWltZWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xlYXJXZWlnaHRzQm94ZXNfYm9vbF9mYWxzZUAxNAoKY2xlYXJXZWlnaHRzQm94ZXNfYm9vbF90cnVlQDEzOgogICAgaW50Y18xIC8vIDEKCmNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfbWVyZ2VAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMjIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgZXJyUmFmZmxlTm90UHJpemVDbGFpbWVkKQogICAgYm56IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAxNwogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUm5wYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJSbnBjCgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlID09PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgZXJyTm90QWxsUmVmdW5kc0NvbXBsZXRlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTI0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUsIGVyck5vdEFsbFJlZnVuZHNDb21wbGV0ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OQogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDEzIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkSUQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBlcnJOb3RBbGxSZWZ1bmRzQ29tcGxldGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9pZl9lbHNlQDIwCiAgICBieXRlYyA0NCAvLyAiRVJSOmVyck5hcmMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmFyYwoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTI3CiAgICAvLyBpZiAoIXRoaXMud2VpZ2h0VG90YWxzLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfaWZfZWxzZUAyMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTI4CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGVhcldlaWdodHNCb3hlc0AyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTExMAogICAgLy8gY2xlYXJXZWlnaHRzQm94ZXMoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTMwCiAgICAvLyB0aGlzLndlaWdodFRvdGFscy5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMzIKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubWJyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTM2CiAgICAvLyBpZiAodGhpcy5jYW5SZWNlaXZlQWxnbyh0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LCByZXR1cm5BbW91bnQpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2NoaWxkLnRzOjExCiAgICAvLyBmdW5kZXIgPSBHbG9iYWxTdGF0ZTxGdW5kZXJJbmZvPih7IGtleTogR2xvYmFsU3RhdGVLZXlGdW5kZXIgfSkKICAgIGJ5dGVjIDM5IC8vICJmdW5kZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMzYKICAgIC8vIGlmICh0aGlzLmNhblJlY2VpdmVBbGdvKHRoaXMuZnVuZGVyLnZhbHVlLmFjY291bnQsIHJldHVybkFtb3VudCkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGNhbGxzdWIgY2FuUmVjZWl2ZUFsZ28KICAgIGJ6IGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2lmX2Vsc2VAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEzNy0xMTQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMzkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9jaGlsZC50czoxMQogICAgLy8gZnVuZGVyID0gR2xvYmFsU3RhdGU8RnVuZGVySW5mbz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5RnVuZGVyIH0pCiAgICBieXRlYyAzOSAvLyAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTM5CiAgICAvLyByZWNlaXZlcjogdGhpcy5mdW5kZXIudmFsdWUuYWNjb3VudCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBleHRyYWN0IDAgMzIKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTM3LTExNDEKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTM3LTExNDIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmZ1bmRlci52YWx1ZS5hY2NvdW50LAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl9pZl9lbHNlQDI1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTEwCiAgICAvLyBjbGVhcldlaWdodHNCb3hlcyhpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGVhcldlaWdodHNCb3hlc0AyNgoKY2xlYXJXZWlnaHRzQm94ZXNfYm9vbF9mYWxzZUAxNDoKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfbWVyZ2VAMTUKCmNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfZmFsc2VANToKICAgIGludGNfMCAvLyAwCiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX2Jvb2xfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubWJyW3JvdXRpbmddKCkgLT4gdm9pZDoKbWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTU2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5tYnIKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzTGl2ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE2NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBieXRlYyAyOSAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmhhc0JpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmhhc0JpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE3NgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE3OAogICAgLy8gcmV0dXJuIHRoaXMuYmlkc0J5QWRkcmVzcyhhZGRyZXNzKS5leGlzdHMKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTc2CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGJ5dGVjIDI5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNldGJpdAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdldE1pbmltdW1CaWRBbW91bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExODEKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDcgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0NyAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA2NCAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTQgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMzAgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDQ3IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI1CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0NwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgZXJyRm9yYmlkZGVuKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJGb3JiIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckZvcmIKCm9wdGluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJcG1yIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVycklwbXIKCm9wdGluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgZXJySW52YWxpZFBheW1lbnRBbW91bnQpCiAgICBzd2FwCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgPT0KICAgIGJueiBvcHRpbl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRpbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU1CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1My01NwogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NDcKICAgIC8vIG9wdGluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubmV3QmlkSUQoKSAtPiB1aW50NjQ6Cm5ld0JpZElEOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5iaWRJRC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDgKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5iaWRJRC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ5CiAgICAvLyB0aGlzLmJpZElELnZhbHVlICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDkKICAgIC8vIHRoaXMuYmlkSUQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyByZXR1cm4gaWQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0QmlkRmVlKGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmdldEJpZEZlZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc5CiAgICAvLyBwcml2YXRlIGdldEJpZEZlZShhbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyBjb25zdCBmZWUgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYmlkRmVlLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgwCiAgICAvLyBjb25zdCBmZWUgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuYmlkRmVlLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4MQogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QmlkRmVlX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODIKICAgIC8vIHJldHVybiAxCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAogICAgcmV0c3ViCgpnZXRCaWRGZWVfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODQKICAgIC8vIHJldHVybiBmZWUKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CmdldEFtb3VudHM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4NwogICAgLy8gcHJpdmF0ZSBnZXRBbW91bnRzKGFtb3VudDogdWludDY0KTogUm95YWx0eUFtb3VudHMgewogICAgcHJvdG8gMSAxCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIGxldCBjcmVhdG9yQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGlmICh0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNSAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGlmICh0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5MQogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNSAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTIKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDI1IC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5MgogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5MwogICAgLy8gY3JlYXRvckFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDUKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTcKICAgIC8vIGNvbnN0IHsgYXVjdGlvblNhbGVJbXBhY3RUYXhNaW46IG1pbiwgYXVjdGlvblNhbGVJbXBhY3RUYXhNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI1NQogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDQyIC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgcHVzaGludCA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgcHVzaGludCA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gbGV0IGFraXRhQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5OQogICAgLy8gbGV0IGFraXRhVGF4UmF0ZTogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDAKICAgIC8vIGlmIChtYXggPiAwKSB7CiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjAxCiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxNyAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDEKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxMQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5OQogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTgtMzAxCiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHhkNTc0YmIxMCAvLyBtZXRob2QgImdldFVzZXJJbXBhY3QoYWRkcmVzcyl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyOTMKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBnZXRBbW91bnRzX3Rlcm5hcnlfZmFsc2VAMjQKICAgIGludGNfMSAvLyAxCiAgICAtCgpnZXRBbW91bnRzX3Rlcm5hcnlfbWVyZ2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5NAogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBmcmFtZV9kaWcgNAogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAKICAgIC8KICAgIC0KICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgZXJySW52YWxpZFBlcmNlbnRhZ2UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNQogICAgLy8gaWYgKGFraXRhQW1vdW50ID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNgogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMAogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMQogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NgogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMjcgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAyNyAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMTIKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBlcnJJcGN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI3MQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjEzCiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDI3IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxMwogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxNAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAyCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgKyBha2l0YUFtb3VudCArICgyICogbWFya2V0cGxhY2VBbW91bnQpID4gYW1vdW50KSB7CiAgICBmcmFtZV9kaWcgNQogICAgZnJhbWVfZGlnIDAKICAgICsKICAgIHB1c2hpbnQgMgogICAgZnJhbWVfZGlnIDIKICAgICoKICAgICsKICAgIGZyYW1lX2RpZyAtMQogICAgPgogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyMQogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0CiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAyNSAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMjEKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcwCiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBlcnJJbnZhbGlkUGVyY2VudGFnZSkKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gZXJySXBjdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzEKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMjMKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDI3IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyMwogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNzAKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIGVyckludmFsaWRQZXJjZW50YWdlKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIGVycklwY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjcxCiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBmcmFtZV9idXJ5IDIKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyBjb25zdCBzZWxsZXJBbW91bnQ6IHVpbnQ2NCA9IGFtb3VudCAtIChjcmVhdG9yQW1vdW50ICsgYWtpdGFBbW91bnQgKyAoMiAqIG1hcmtldHBsYWNlQW1vdW50KSkKICAgIGZyYW1lX2RpZyA1CiAgICBkdXAKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIHB1c2hpbnQgMgogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyOC0yMzMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDI0OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjI5MwogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgIGIgZ2V0QW1vdW50c190ZXJuYXJ5X21lcmdlQDI1CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi50cmFuc2ZlclB1cmNoYXNlVG9CdXllcihidXllcjogYnl0ZXMpIC0+IHZvaWQ6CnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzYKICAgIC8vIHByaXZhdGUgdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXIoYnV5ZXI6IEFjY291bnQpOiB2b2lkIHsKICAgIHByb3RvIDEgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzcKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDE1IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNwogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzgtMjQxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjIDcgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzkKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzgtMjQxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4YWRmOTJhZTQgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQyCiAgICAvLyByZXR1cm4KICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIGNvbnN0IHByaXplQW1vdW50ID0gb3AuQXNzZXRIb2xkaW5nLmFzc2V0QmFsYW5jZShHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgdGhpcy5wcml6ZS52YWx1ZSlbMF0KICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NQogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGRpZyAxCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDcKICAgIC8vIGlmIChidXllci5pc09wdGVkSW4oQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkpKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiB0cmFuc2ZlclB1cmNoYXNlVG9CdXllcl9lbHNlX2JvZHlANgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0OC0yNTMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUxCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNAogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWMgNyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1MQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0OC0yNTIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ4LTI1MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1YgoKdHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJfZWxzZV9ib2R5QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1NgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1NwogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlYyA3IC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjU3CiAgICAvLyB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjYwCiAgICAvLyBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzMgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjYzCiAgICAvLyBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTUtMjY0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA0CiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjU4CiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjU5CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA3IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1NS0yNjQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjIKICAgIC8vIHRydWUsCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTUtMjY0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXllciwgYW1vdW50OiBwcml6ZUFtb3VudCB9XSwKICAgIC8vICAgcHJpemVBbW91bnQsCiAgICAvLyAgIHRydWUsCiAgICAvLyAgIEdsb2JhbC56ZXJvQWRkcmVzcwogICAgLy8gKQogICAgdW5jb3ZlciA3CiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jYW5SZWNlaXZlQWxnbyhyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB1aW50NjQ6CmNhblJlY2VpdmVBbGdvOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDMKICAgIC8vIHByaXZhdGUgY2FuUmVjZWl2ZUFsZ28ocmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byAyIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzA0CiAgICAvLyBjb25zdCBbYmFsYW5jZV0gPSBvcC5BY2N0UGFyYW1zLmFjY3RCYWxhbmNlKHJlY2VpdmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIHJldHVybiBiYWxhbmNlID4gMCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIGJueiBjYW5SZWNlaXZlQWxnb19ib29sX3RydWVAMgogICAgZnJhbWVfZGlnIC0xCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgPj0KICAgIGJ6IGNhblJlY2VpdmVBbGdvX2Jvb2xfZmFsc2VAMwoKY2FuUmVjZWl2ZUFsZ29fYm9vbF90cnVlQDI6CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDUKICAgIC8vIHJldHVybiBiYWxhbmNlID4gMCB8fCBhbW91bnQgPj0gR2xvYmFsLm1pbkJhbGFuY2UKICAgIHJldHN1YgoKY2FuUmVjZWl2ZUFsZ29fYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzA1CiAgICAvLyByZXR1cm4gYmFsYW5jZSA+IDAgfHwgYW1vdW50ID49IEdsb2JhbC5taW5CYWxhbmNlCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnNlbmRCaWRBc3NldChyZWNlaXZlcjogYnl0ZXMsIGFtb3VudDogdWludDY0KSAtPiB2b2lkOgpzZW5kQmlkQXNzZXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMgogICAgLy8gcHJpdmF0ZSBzZW5kQmlkQXNzZXQocmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzEzCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTMKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHNlbmRCaWRBc3NldF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTQKICAgIC8vIGlmICh0aGlzLmNhblJlY2VpdmVBbGdvKHJlY2VpdmVyLCBhbW91bnQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBjYW5SZWNlaXZlQWxnbwogICAgYnogc2VuZEJpZEFzc2V0X2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTUKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQgfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCnNlbmRCaWRBc3NldF9hZnRlcl9pZl9lbHNlQDc6CiAgICByZXRzdWIKCnNlbmRCaWRBc3NldF9lbHNlX2JvZHlANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzE4LTMyNAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzE4LTMyMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTgtMzI0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgICBhc3NldEFtb3VudDogYW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5zZW5kQmlkQXNzZXRPckRpc2J1cnNlKHJlY2VpdmVyOiBieXRlcywgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKc2VuZEJpZEFzc2V0T3JEaXNidXJzZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMyCiAgICAvLyBwcml2YXRlIHNlbmRCaWRBc3NldE9yRGlzYnVyc2UocmVjZWl2ZXI6IEFjY291bnQsIGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwIHx8IHJlY2VpdmVyLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwIHx8IHJlY2VpdmVyLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNlbmRCaWRBc3NldE9yRGlzYnVyc2VfaWZfYm9keUAyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MAogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDAgfHwgcmVjZWl2ZXIuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogc2VuZEJpZEFzc2V0T3JEaXNidXJzZV9hZnRlcl9pZl9lbHNlQDMKCnNlbmRCaWRBc3NldE9yRGlzYnVyc2VfaWZfYm9keUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzQKICAgIC8vIHRoaXMuc2VuZEJpZEFzc2V0KHJlY2VpdmVyLCBhbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBzZW5kQmlkQXNzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHJldHN1YgoKc2VuZEJpZEFzc2V0T3JEaXNidXJzZV9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzOAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzOQogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM5CiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQyCiAgICAvLyBbeyBhZGRyZXNzOiByZWNlaXZlciwgYW1vdW50IH1dLAogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMzMgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ1CiAgICAvLyBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzctMzQ2CiAgICAvLyByZXR1cm4gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudCB9XSwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApLmNvc3QKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MQogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNyAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzctMzQ2CiAgICAvLyByZXR1cm4gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudCB9XSwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApLmNvc3QKICAgIHVuY292ZXIgNQogICAgZnJhbWVfZGlnIC0xCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0NAogICAgLy8gZmFsc2UsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzctMzQ2CiAgICAvLyByZXR1cm4gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogcmVjZWl2ZXIsIGFtb3VudCB9XSwKICAgIC8vICAgYW1vdW50LAogICAgLy8gICBmYWxzZSwKICAgIC8vICAgR2xvYmFsLnplcm9BZGRyZXNzCiAgICAvLyApLmNvc3QKICAgIHVuY292ZXIgNwogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3AKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5zZXRXZWlnaHQobG9jOiB1aW50NjQsIHdlaWdodDogdWludDY0KSAtPiB2b2lkOgpzZXRXZWlnaHQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gcHJpdmF0ZSBzZXRXZWlnaHQobG9jOiB1aW50NjQsIHdlaWdodDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIzCiAgICAvLyBjb25zdCBib3g6IHVpbnQ2NCA9IGxvYyAvIENodW5rU2l6ZQogICAgZnJhbWVfZGlnIC0yCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTMKICAgIC8vIHJldHVybiBvcC5idG9pKHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLmV4dHJhY3QoKGxvYyAlIENodW5rU2l6ZSkgKiA4LCA4KSkKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzIKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBieXRlcz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyOCAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTMKICAgIC8vIHJldHVybiBvcC5idG9pKHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLmV4dHJhY3QoKGxvYyAlIENodW5rU2l6ZSkgKiA4LCA4KSkKICAgIGZyYW1lX2RpZyAtMgogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI1CiAgICAvLyB0aGlzLndlaWdodHMoYm94KS5yZXBsYWNlKChsb2MgJSBDaHVua1NpemUpICogOCwgb3AuaXRvYih3ZWlnaHQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnJlcGxhY2UoYm94ICogOCwgb3AuaXRvYih0aGlzLmJveFRvdGFsKGJveCkgLSBsYXN0ICsgd2VpZ2h0KSkKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNAogICAgLy8gd2VpZ2h0VG90YWxzID0gQm94PGJ5dGVzPih7IGtleTogQXVjdGlvbkJveEtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgNSAvLyAidCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDE4CiAgICAvLyByZXR1cm4gb3AuYnRvaSh0aGlzLndlaWdodFRvdGFscy5leHRyYWN0KGJveCAqIDgsIDgpKQogICAgZGlnIDEKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnJlcGxhY2UoYm94ICogOCwgb3AuaXRvYih0aGlzLmJveFRvdGFsKGJveCkgLSBsYXN0ICsgd2VpZ2h0KSkKICAgIGRpZyAyCiAgICAtCiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnJlcGxhY2UoYm94ICogOCwgb3AuaXRvYih0aGlzLmJveFRvdGFsKGJveCkgLSBsYXN0ICsgd2VpZ2h0KSkKICAgIGNvdmVyIDIKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlID0gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlIC0gbGFzdCArIHdlaWdodAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE5IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlID0gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlIC0gbGFzdCArIHdlaWdodAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIC0KICAgIGZyYW1lX2RpZyAtMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NgogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTkgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgPSB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgLSBsYXN0ICsgd2VpZ2h0CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVQb29sKCkgLT4gdWludDY0OgpyYWZmbGVQb29sOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODUKICAgIC8vIHJldHVybiB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSAtIHRoaXMuZ2V0QmlkRmVlKHRoaXMuaGlnaGVzdEJpZC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMzIgLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gcmV0dXJuIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlIC0gdGhpcy5nZXRCaWRGZWUodGhpcy5oaWdoZXN0QmlkLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAyMyAvLyAiaGlnaGVzdF9iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4NQogICAgLy8gcmV0dXJuIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlIC0gdGhpcy5nZXRCaWRGZWUodGhpcy5oaWdoZXN0QmlkLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAtCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmFzc2VydE5vdFNlbGZPdXRiaWQoKSAtPiB2b2lkOgphc3NlcnROb3RTZWxmT3V0YmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjUKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgdGhpcy5iaWRJRC52YWx1ZSA+IDEpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCAmJiB0aGlzLmJpZElELnZhbHVlID4gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGFzc2VydE5vdFNlbGZPdXRiaWRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyNQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCAmJiB0aGlzLmJpZElELnZhbHVlID4gMSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBhc3NlcnROb3RTZWxmT3V0YmlkX2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlLmFjY291bnQgIT09IFR4bi5zZW5kZXIsIGVyckNhbm5vdE91dGJpZFNlbGYpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MAogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlY18yIC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUuYWNjb3VudCAhPT0gVHhuLnNlbmRlciwgZXJyQ2Fubm90T3V0YmlkU2VsZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDExIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUuYWNjb3VudCAhPT0gVHhuLnNlbmRlciwgZXJyQ2Fubm90T3V0YmlkU2VsZikKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBleHRyYWN0IDAgMzIKICAgIHR4biBTZW5kZXIKICAgICE9CiAgICBibnogYXNzZXJ0Tm90U2VsZk91dGJpZF9hZnRlcl9pZl9lbHNlQDUKICAgIHB1c2hieXRlcyAiRVJSOmVyckNvYnMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ29icwoKYXNzZXJ0Tm90U2VsZk91dGJpZF9hZnRlcl9pZl9lbHNlQDU6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmFzc2VydEdhdGVkKGdhdGVUeG46IHVpbnQ2NCwgbGVnYWN5OiB1aW50NjQsIHdhbGxldDogdWludDY0KSAtPiB2b2lkOgphc3NlcnRHYXRlZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyBwcml2YXRlIGFzc2VydEdhdGVkKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBsZWdhY3k6IGJvb2xlYW4sIHdhbGxldDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDQKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuaXNMaXZlKCksIGVyckF1Y3Rpb25Ob3RMaXZlKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZQogICAgYm56IGFzc2VydEdhdGVkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA2NSAvLyAiRVJSOmVyckFubHYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQW5sdgoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzOAogICAgLy8gaWYgKGxlZ2FjeSkgewogICAgZnJhbWVfZGlnIC0yCiAgICBieiBhc3NlcnRHYXRlZF9lbHNlX2JvZHlANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIGNvbnN0IG9yaWdpbiA9IGxlZ2FjeU9yaWdpbk9yVHhuU2VuZGVyKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM5CiAgICAvLyBjb25zdCBvcmlnaW4gPSBsZWdhY3lPcmlnaW5PclR4blNlbmRlcihsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIyMQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBkaWcgMQogICAgYnl0ZWMgNjAgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI2CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODAKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihsZWdhY3lXYWxsZXRJRChnZXRFc2Nyb3dGYWN0b3J5KGFraXRhREFPKSwgZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGFkZHJlc3MpKQogICAgcHVzaGludCA4OAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODgtMzkxCiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzkzCiAgICAvLyBpZiAoQnl0ZXMoZGF0YSkubGVuZ3RoICE9PSA4KSB7CiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA2MwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5NAogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDcKCmFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTQKICAgIC8vIGlmICh3YWxsZXRJRC5pZCA9PT0gMCkgewogICAgZnJhbWVfZGlnIDcKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDY4CiAgICBmcmFtZV9idXJ5IDMKCmFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0MAogICAgLy8gcGFzc2VkID0gZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDAKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDM2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDAKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDIKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDMKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VAODgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQzCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDQKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0Mi00NDQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDUKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDAKICAgIHB1c2hieXRlcyAweDQzOTIyNjU1IC8vIG1ldGhvZCAibXVzdENoZWNrKGFkZHJlc3MsdWludDY0LGJ5dGVbXVtdKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA4OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDEKICAgIGZyYW1lX2RpZyAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDg4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhuc2EgQXBwbGljYXRpb25BcmdzIDIKICAgIGZyYW1lX2RpZyA1CiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDItNDQ3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDg4CiAgICBpbnRjXzEgLy8gMQoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXNzZWQsIGVyckZhaWxlZEdhdGUpCiAgICBibnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOmVyckZndGUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmd0ZQoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDc6CiAgICByZXRzdWIKCmFzc2VydEdhdGVkX2Jvb2xfZmFsc2VAODg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDUKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VANjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MS0zNDQKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzLCBleGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIC8vICkKICAgIGZyYW1lX2RpZyA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0MwogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICBieXRlYyA2NiAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDEtMzQ0CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlcywgZXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNDUKICAgIC8vIGxvZ2dlZEFzc2VydChleGlzdHMgJiYgY29udHJvbGxlZEFjY291bnRCeXRlcy5sZW5ndGggPT09IDMyLCBlcnJJbnZhbGlkV2FsbGV0KQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA3MQogICAgZGlnIDEKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA3MQogICAgaW50Y18xIC8vIDEKCmFzc2VydEdhdGVkX2Jvb2xfbWVyZ2VANzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM0NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cyAmJiBjb250cm9sbGVkQWNjb3VudEJ5dGVzLmxlbmd0aCA9PT0gMzIsIGVyckludmFsaWRXYWxsZXQpCiAgICBibnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDc0CiAgICBieXRlYyA2NyAvLyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfYXNzZXJ0QDc0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMTgKICAgIC8vIGlmIChvcmlnaW4gIT09IHdhbGxldElELmFkZHJlc3MgJiYgb3JpZ2luICE9PSBUeG4uc2VuZGVyICYmIG9yaWdpbi5hdXRoQWRkcmVzcyAhPT0gd2FsbGV0SUQuYWRkcmVzcykgewogICAgZnJhbWVfZGlnIDcKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyAyCiAgICAhPQogICAgYnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA3OAogICAgZGlnIDEKICAgIHR4biBTZW5kZXIKICAgICE9CiAgICBieiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDc4CiAgICBkaWcgMQogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgNwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VANzgKICAgIGZyYW1lX2J1cnkgMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjMyNQogICAgLy8gcmV0dXJuIGxlZ2FjeU9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmxlZ2FjeU9yaWdpbk9yQDc5Cgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDc4OgogICAgcG9wCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzI1CiAgICAvLyByZXR1cm4gbGVnYWN5T3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICBiIGFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5T3JpZ2luT3JANzkKCmFzc2VydEdhdGVkX2Jvb2xfZmFsc2VANzE6CiAgICBpbnRjXzAgLy8gMAogICAgYiBhc3NlcnRHYXRlZF9ib29sX21lcmdlQDcyCgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDYzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTcKICAgIC8vIGNvbnN0IHdhbGxldCA9IGJ0b2koZGF0YSkKICAgIGJ0b2kKICAgIGR1cAogICAgZnJhbWVfYnVyeSAtMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjQKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUA5NAogICAgZnJhbWVfZGlnIDYKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDk1Cgphc3NlcnRHYXRlZF9pZl9ib2R5QDk0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNjUKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCmFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxMDA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5OAogICAgLy8gcmV0dXJuIGlzQWtpdGFXYWxsZXQod2FsbGV0LCB3YWxsZXRGYWN0b3J5KSA/IHdhbGxldCA6IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBmcmFtZV9idXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzgwCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24obGVnYWN5V2FsbGV0SUQoZ2V0RXNjcm93RmFjdG9yeShha2l0YURBTyksIGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBhZGRyZXNzKSkKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA2NAoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA5NToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY3CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDk4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1OQogICAgLy8gcmV0dXJuIEFjY291bnQob3Auc2hhNTEyXzI1NihCeXRlcygnYXBwSUQnKS5jb25jYXQoaXRvYihhcHBJZCkpKSkKICAgIGZyYW1lX2RpZyA2CiAgICBpdG9iCiAgICBieXRlYyA2OCAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY4CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA5OAogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTAwCgphc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDk4OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTAwCgphc3NlcnRHYXRlZF9lbHNlX2JvZHlANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQyCiAgICAvLyBwYXNzZWQgPSBnYXRlQ2hlY2tDdHgoZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgZ2F0ZUN0eChwcmluY2lwYWxPZih0aGlzLmFraXRhREFPLnZhbHVlLCB3YWxsZXQpKSwgdGhpcy5nYXRlSUQudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMDYKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGJ5dGVjIDI0IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEzCiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxNAogICAgLy8gR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNDgKICAgIC8vIGlmIChoaW50ID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDEwCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTMKICAgIC8vIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjk1CiAgICAvLyByZWZlcnJlcjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkxCiAgICAvLyB3YWxsZXQ6IDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MC05NwogICAgLy8gcmV0dXJuIHsKICAgIC8vICAgd2FsbGV0OiAwLAogICAgLy8gICBwcmluY2lwYWw6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgdmlhUGx1Z2luOiBmYWxzZSwKICAgIC8vIH0KICAgIGl0b2IKICAgIHVuY292ZXIgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIHVuY292ZXIgMwogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMjkgLy8gMHgwMAogICAgY29uY2F0Cgphc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjMwNAogICAgLy8gcmV0dXJuIHsgcHJpbmNpcGFsOiBwLnByaW5jaXBhbCwgd2FsbGV0OiBwLndhbGxldCwgc3BlbmRlcjogcC5zcGVuZGVyIH0KICAgIGR1cAogICAgZXh0cmFjdCA4IDMyCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDgKICAgIHVuY292ZXIgMgogICAgZXh0cmFjdCA3MiAzMgogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDM2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIHBhc3NlZCA9IGdhdGVDaGVja0N0eChnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBnYXRlQ3R4KHByaW5jaXBhbE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIHdhbGxldCkpLCB0aGlzLmdhdGVJRC52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBzd2FwCiAgICBieXRlYyAyNCAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIHB1c2hpbnQgNDAKICAgIGV4dHJhY3RfdWludDY0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY2CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDU4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2NgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2NgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYm56IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VANTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY3CiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NjUtOTY3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VANTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgcHVzaGJ5dGVzIDB4OWIxNDdkMmMgLy8gbWV0aG9kICJtdXN0Q2hlY2tGb3IoKGFkZHJlc3MsdWludDY0LGFkZHJlc3MpLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2OAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICBieiBhc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDU4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjk2OQogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBlbmNvZGVBcmM0KGN0eCkgJiYKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAxCiAgICBmcmFtZV9kaWcgMgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk2OQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA1OAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5NzAKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAyCiAgICBmcmFtZV9kaWcgNQogICAgaXRvYgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTY1LTk3MAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKEdhdGVNdXN0Q2hlY2tGb3JBYmlNZXRob2QpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IGVuY29kZUFyYzQoY3R4KSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUA1OAogICAgaW50Y18xIC8vIDEKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA1Cgphc3NlcnRHYXRlZF9ib29sX2ZhbHNlQDU4OgogICAgaW50Y18wIC8vIDAKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUA1Cgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDIKICAgIC8vIGlmICh3YWxsZXQgPT09IDAgfHwgd2FsbGV0RmFjdG9yeSA9PT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiBhc3NlcnRHYXRlZF9pZl9ib2R5QDEyCiAgICBmcmFtZV9kaWcgNgogICAgYm56IGFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMTMKCmFzc2VydEdhdGVkX2lmX2JvZHlAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwMwogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RXYWxsZXQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbndsIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhud2wKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1OQogICAgLy8gaWYgKGNhbGxlckFwcCA9PT0gMCkgewogICAgZHVwCiAgICBibnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUAyMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjEKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50VG9wTGV2ZWwpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIdG9wIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckh0b3AKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE2NgogICAgLy8gbGV0IHZpYVBsdWdpbiA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjcKICAgIC8vIGlmIChjYWxsZXJBcHAgIT09IGhpbnQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgIT0KICAgIGJ6IGFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzEKICAgIC8vIGNvbnN0IFtzcGVuZGluZywgc3BlbmRpbmdFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9TUEVORElORykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAic3BlbmRpbmdfYWRkcmVzcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcyCiAgICAvLyBpZiAoIShzcGVuZGluZ0V4aXN0cyAmJiBzcGVuZGluZy5sZW5ndGggPT09IDMyICYmIHNwZW5kaW5nID09PSBzZW5kZXIuYnl0ZXMgJiYgc2VuZGVyICE9PSBjYWxsZXJBZGRyKSkgewogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAyNwogICAgZnJhbWVfZGlnIDQKICAgIGxlbgogICAgaW50Y18zIC8vIDMyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAyNwogICAgZnJhbWVfZGlnIDQKICAgIGRpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAyNwogICAgZHVwCiAgICBmcmFtZV9kaWcgMAogICAgIT0KICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDI4Cgphc3NlcnRHYXRlZF9pZl9ib2R5QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNzQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90Qm91bmQpCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJIbmJkIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckhuYmQKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3OAogICAgLy8gdmlhUGx1Z2luID0gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4MQogICAgLy8gY29uc3QgW2NvbnRyb2xsZWRCeXRlcywgY29udHJvbGxlZEV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX0NPTlRST0xMRUQpKQogICAgZnJhbWVfZGlnIC0xCiAgICBieXRlYyA2NiAvLyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogYXNzZXJ0R2F0ZWRfaWZfYm9keUAzMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDMyCgphc3NlcnRHYXRlZF9pZl9ib2R5QDMxOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50QmFkV2FsbGV0KQogICAgYnl0ZWMgNjcgLy8gIkVSUjplcnJJd2x0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl3bHQKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjExOQogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHNwZW5kZXIpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMAogICAgLy8gcmV0dXJuIHRydWUKICAgIGludGNfMSAvLyAxCiAgICBzd2FwCgphc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkxCiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlcywgcmVmZXJyZXJFeGlzdHNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoaGludCwgQnl0ZXMoUFJJTkNJUEFMX0tFWV9SRUZFUlJFUikpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAicmVmZXJyZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgYnogYXNzZXJ0R2F0ZWRfdGVybmFyeV9mYWxzZUA0MgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMyAvLyAzMgogICAgPT0KICAgIGJ6IGFzc2VydEdhdGVkX3Rlcm5hcnlfZmFsc2VANDIKICAgIGNvdmVyIDMKCmFzc2VydEdhdGVkX3Rlcm5hcnlfbWVyZ2VANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NgogICAgLy8gcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIGRpZyAyCiAgICBkaWcgMQogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHNlbGVjdAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBieiBhc3NlcnRHYXRlZF90ZXJuYXJ5X2ZhbHNlQDQ1CiAgICBzd2FwCgphc3NlcnRHYXRlZF90ZXJuYXJ5X21lcmdlQDQ2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTQtMjAxCiAgICAvLyByZXR1cm4gewogICAgLy8gICB3YWxsZXQ6IGhpbnQsCiAgICAvLyAgIHByaW5jaXBhbDogbGl2ZSA/IGNvbnRyb2xsZWQgOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHNwZW5kZXI6IHNlbmRlciwKICAgIC8vICAgcmVmZXJyZXIsCiAgICAvLyAgIHZpYVBsdWdpbiwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDI5IC8vIDB4MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDMKICAgIHNldGJpdAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIwOS0yMTYKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsQ3R4KAogICAgLy8gICB3YWxsZXRGYWN0b3J5LAogICAgLy8gICBoaW50LAogICAgLy8gICBUeG4uc2VuZGVyLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIC8vICAgR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OnJlc29sdmVQcmluY2lwYWxDdHhANDcKCmFzc2VydEdhdGVkX3Rlcm5hcnlfZmFsc2VANDU6CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk3CiAgICAvLyBvcmlnaW46IGxpdmUgPyBjb250cm9sbGVkIDogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBiIGFzc2VydEdhdGVkX3Rlcm5hcnlfbWVyZ2VANDYKCmFzc2VydEdhdGVkX3Rlcm5hcnlfZmFsc2VANDI6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgY292ZXIgMwogICAgYiBhc3NlcnRHYXRlZF90ZXJuYXJ5X21lcmdlQDQzCgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjIKICAgIC8vIGNvbnN0IFt3YWxsZXRBZGRyZXNzLCB3YWxsZXRFeGlzdHNdID0gb3AuQXBwUGFyYW1zLmFwcEFkZHJlc3Mod2FsbGV0KQogICAgZnJhbWVfZGlnIC0xCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMwogICAgLy8gaWYgKCF3YWxsZXRFeGlzdHMpIHsKICAgIGJueiBhc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM2CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI0CiAgICAvLyByZXR1cm4gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIGFzc2VydEdhdGVkX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDM5Cgphc3NlcnRHYXRlZF9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjYKICAgIC8vIGlmIChjb250cm9sbGVkID09PSB3YWxsZXRBZGRyZXNzKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUAzOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo4NQogICAgLy8gY29uc3QgW2F1dGhdID0gb3AuQWNjdFBhcmFtcy5hY2N0QXV0aEFkZHIoYWNjb3VudCkKICAgIHN3YXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjcKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKHdhbGxldEFkZHJlc3MpID09PSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzkKCmFzc2VydEdhdGVkX2FmdGVyX2lmX2Vsc2VAMzg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgZHVwCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEF1dGhBZGRyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTI5CiAgICAvLyByZXR1cm4gYXV0aEFkZHJPZihjb250cm9sbGVkKSA9PT0gd2FsbGV0QWRkcmVzcwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzOQoKYXNzZXJ0R2F0ZWRfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTA1CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGJ6IGFzc2VydEdhdGVkX2Jvb2xfZmFsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgNgogICAgaXRvYgogICAgYnl0ZWMgNjggLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgYnogYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUAxNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTUyCiAgICAvLyBpZiAoIWlzR2VudWluZVdhbGxldChoaW50LCB3YWxsZXRGYWN0b3J5KSkgewogICAgYiBhc3NlcnRHYXRlZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OmlzR2VudWluZVdhbGxldEAxOAoKYXNzZXJ0R2F0ZWRfYm9vbF9mYWxzZUAxNjoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE1MgogICAgLy8gaWYgKCFpc0dlbnVpbmVXYWxsZXQoaGludCwgd2FsbGV0RmFjdG9yeSkpIHsKICAgIGIgYXNzZXJ0R2F0ZWRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjppc0dlbnVpbmVXYWxsZXRAMTgKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmFzc2VydFVuZ2F0ZWQoKSAtPiB2b2lkOgphc3NlcnRVbmdhdGVkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmlzTGl2ZSgpLCBlcnJBdWN0aW9uTm90TGl2ZSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGJueiBhc3NlcnRVbmdhdGVkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyA2NSAvLyAiRVJSOmVyckFubHYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQW5sdgoKYXNzZXJ0VW5nYXRlZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckhhc0dhdGUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OAogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAzNiAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTUwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIGVyckhhc0dhdGUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYXNzZXJ0VW5nYXRlZF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJySGd0ZSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIZ3RlCgphc3NlcnRVbmdhdGVkX2FmdGVyX2Fzc2VydEA0OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5iaWRNYnIoKSAtPiB1aW50NjQ6CmJpZE1icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU0CiAgICAvLyBwcml2YXRlIGJpZE1icigpOiB1aW50NjQgewogICAgcHJvdG8gMCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1NQogICAgLy8gY29uc3QgeyBiaWRzLCBiaWRzQnlBZGRyZXNzLCBsb2NhdGlvbnMgfSA9IHRoaXMubWJyKCkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5tYnIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBzd2FwCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAyCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOSAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU3CiAgICAvLyBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NTcKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBiaWRNYnJfaWZfYm9keUAxCiAgICBidXJ5IDEKCmJpZE1icl9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gcmV0dXJuIG1icgogICAgc3dhcAogICAgcmV0c3ViCgpiaWRNYnJfaWZfYm9keUAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NTgKICAgIC8vIG1iciArPSBiaWRzQnlBZGRyZXNzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1OQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWNfMyAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYmlkTWJyX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjAKICAgIC8vIG1iciArPSBsb2NhdGlvbnMKICAgIGZyYW1lX2RpZyAwCiAgICArCiAgICBiIGJpZE1icl9hZnRlcl9pZl9lbHNlQDQKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlY29yZEJpZChpZDogdWludDY0LCBiaWRBbW91bnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpyZWNvcmRCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2NwogICAgLy8gcHJpdmF0ZSByZWNvcmRCaWQoaWQ6IHVpbnQ2NCwgYmlkQW1vdW50OiB1aW50NjQsIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU1CiAgICAvLyBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTQtMTU5CiAgICAvLyB0aGlzLmJpZHMoaWQpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IGJpZEFtb3VudCwKICAgIC8vICAgcmVmdW5kZWQ6IGZhbHNlLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgYnl0ZWMgMjkgLy8gMHgwMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NAogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZSA9IHsKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjUKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDExIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1NC0xNTkKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogYmlkQW1vdW50LAogICAgLy8gICByZWZ1bmRlZDogZmFsc2UsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJlY29yZEJpZF9lbHNlX2JvZHlAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDkgLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gaWYgKHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjIKICAgIC8vIGlmICh0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IHJlY29yZEJpZF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOSAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyB0aGlzLnNldFdlaWdodCh0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUsIGJpZEFtb3VudCkKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIHRoaXMuc2V0V2VpZ2h0KHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSwgYmlkQW1vdW50KQogICAgYm94X2dldAogICAgYXNzZXJ0IC8vIEJveCBtdXN0IGhhdmUgdmFsdWUKICAgIGJ0b2kKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBzZXRXZWlnaHQKCnJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MAogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA4IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzEKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMjAKICAgIC0KICAgID4KICAgIGJ6IHJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTcyCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSArPSBTTklQRV9FWFRFTlNJT04KICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDggLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAzMDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgOCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTcyCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSArPSBTTklQRV9FWFRFTlNJT04KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzUKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjXzMgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3NQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyBjb25zdCBiaWRGZWUgPSB0aGlzLmdldEJpZEZlZShiaWRBbW91bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MgogICAgLy8gcmFmZmxlQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVBbW91bnQgfSkKICAgIGJ5dGVjIDMyIC8vICJyYWZmbGVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzcKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAzMiAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OAogICAgLy8gaGlnaGVzdEJpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SGlnaGVzdEJpZCB9KQogICAgYnl0ZWMgMjMgLy8gImhpZ2hlc3RfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODAKICAgIC8vIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSA9IGJpZEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpyZWNvcmRCaWRfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NgogICAgLy8gY29uc3QgbG9jID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjAgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjYKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDM1CiAgICAvLyBjb25zdCBib3g6IHVpbnQ2NCA9IGxvYyAvIENodW5rU2l6ZQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIGNvbnN0IHNsb3Q6IHVpbnQ2NCA9IGxvYyAlIENodW5rU2l6ZQogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzgKICAgIC8vIGlmIChzbG90ICE9PSAwKSB7CiAgICBieiByZWNvcmRCaWRfYWZ0ZXJfaWZfZWxzZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzkKICAgIC8vIHRoaXMud2VpZ2h0cyhib3gpLnJlc2l6ZSgoc2xvdCArIDEpICogOCkKICAgIHN3YXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTMyCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgYnl0ZXM+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDM5CiAgICAvLyB0aGlzLndlaWdodHMoYm94KS5yZXNpemUoKHNsb3QgKyAxKSAqIDgpCiAgICBzd2FwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGJveF9yZXNpemUKCnJlY29yZEJpZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uYWxsb2NhdGVXZWlnaHRAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjgKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2OAogICAgLy8gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlID0gbG9jCiAgICBkaWcgMQogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyB0aGlzLmxvY2F0aW9ucyhsb2MpLnZhbHVlID0gVHhuLnNlbmRlcgogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDMKICAgIC8vIGxvY2F0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjY291bnQ+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4TG9jYXRpb25zIH0pCiAgICBieXRlYyA0NiAvLyAibCIKICAgIHVuY292ZXIgMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gdGhpcy5sb2NhdGlvbnMobG9jKS52YWx1ZSA9IFR4bi5zZW5kZXIKICAgIHN3YXAKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OQogICAgLy8gdW5pcXVlQWRkcmVzc0NvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlVbmlxdWVBZGRyZXNzQ291bnQgfSkKICAgIGJ5dGVjIDIwIC8vICJ1bmlxdWVfYWRkcmVzc19jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSArPSAxCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAyMCAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3MAogICAgLy8gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcxCiAgICAvLyB0aGlzLnNldFdlaWdodChsb2MsIGJpZEFtb3VudCkKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBzZXRXZWlnaHQKICAgIGIgcmVjb3JkQmlkX2FmdGVyX2lmX2Vsc2VAMTYKCnJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDEwOgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJveCA8IE1heFdlaWdodHNCb3hlcywgZXJyVG9vTWFueVBhcnRpY2lwYW50cykKICAgIGR1cAogICAgaW50YyA1IC8vIDQwOTYKICAgIDwKICAgIGJueiByZWNvcmRCaWRfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJUbXB0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclRtcHQKCnJlY29yZEJpZF9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gdGhpcy53ZWlnaHRzKGJveCkuY3JlYXRlKHsgc2l6ZTogOCB9KQogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzMgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIGJ5dGVzPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gdGhpcy53ZWlnaHRzKGJveCkuY3JlYXRlKHsgc2l6ZTogOCB9KQogICAgaW50Y18yIC8vIDgKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnJlc2l6ZSgoYm94ICsgMSkgKiA4KQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGR1cAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBCb3g8Ynl0ZXM+KHsga2V5OiBBdWN0aW9uQm94S2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyA1IC8vICJ0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnJlc2l6ZSgoYm94ICsgMSkgKiA4KQogICAgc3dhcAogICAgYm94X3Jlc2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MQogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IGJveCArIDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gdGhpcy5hbGxvY2F0ZVdlaWdodChsb2MpCiAgICBiIHJlY29yZEJpZF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uYWxsb2NhdGVXZWlnaHRAMTMKCnJlY29yZEJpZF9lbHNlX2JvZHlAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIH0gZWxzZSBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIH0gZWxzZSBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA5IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IDAKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBib3hfcHV0CiAgICBiIHJlY29yZEJpZF9hZnRlcl9pZl9lbHNlQDE2CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jcmVhdGVCaWQocGF5bWVudDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMpIC0+IHZvaWQ6CmNyZWF0ZUJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTgzCiAgICAvLyBwcml2YXRlIGNyZWF0ZUJpZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyBhc3NlcnRQbGFpblBheW1lbnQocGF5bWVudCkKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiBhc3NlcnRQbGFpblBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyB0aGlzLmFzc2VydE5vdFNlbGZPdXRiaWQoKQogICAgY2FsbHN1YiBhc3NlcnROb3RTZWxmT3V0YmlkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0JpZElEKCkKICAgIGNhbGxzdWIgbmV3QmlkSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IHRoaXMuYmlkTWJyKCkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGNhbGxzdWIgYmlkTWJyCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFNlbmRlcgogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgMTAgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTAKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gdGhpcy5iaWRNYnIoKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIGNvbnN0IG1pbmltdW1CaWRBbW91bnQgPSB0aGlzLmdldE1pbmltdW1CaWRBbW91bnQoKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEAyCiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA+PSAobWluaW11bUJpZEFtb3VudCArIG1iciksIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBkaWcgMwogICAgKwogICAgPj0KICAgIGJueiBjcmVhdGVCaWRfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpjcmVhdGVCaWRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5NQogICAgLy8gY29uc3QgYmlkQW1vdW50OiB1aW50NjQgPSBwYXltZW50LmFtb3VudCAtIG1icgogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIHRoaXMucmVjb3JkQmlkKGlkLCBiaWRBbW91bnQsIG1hcmtldHBsYWNlKQogICAgdW5jb3ZlciAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHJlY29yZEJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuYmlkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAxMSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuYmlkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkQXNhKHBheW1lbnQ6IHVpbnQ2NCwgYXNzZXRYZmVyOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcykgLT4gdm9pZDoKY3JlYXRlQmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDEtNjA1CiAgICAvLyBwcml2YXRlIGNyZWF0ZUJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwNgogICAgLy8gYXNzZXJ0UGxhaW5QYXltZW50KHBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGNhbGxzdWIgYXNzZXJ0UGxhaW5QYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwNwogICAgLy8gYXNzZXJ0U2FmZUFzc2V0VHJhbnNmZXIoYXNzZXRYZmVyLCBUeG4uc2VuZGVyKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzcKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uc2VuZGVyID09PSBzZW5kZXIsIGVyckludmFsaWRQYXltZW50U2VuZGVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtcyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1zCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzgKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRTZW5kZXIgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyQ2xhd2JhY2tGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0U2VuZGVyCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxNQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmNsdyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOY2x3CgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzkKICAgIC8vIGxvZ2dlZEFzc2VydCh0eG4uYXNzZXRDbG9zZVRvID09PSBHbG9iYWwuemVyb0FkZHJlc3MsIGVyckNsb3NlRm9yYmlkZGVuKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldENsb3NlVG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA1MCAvLyAiRVJSOmVyck5jbHMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmNscwoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBsb2dnZWRBc3NlcnQodHhuLnJla2V5VG8gPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgZXJyUmVrZXlGb3JiaWRkZW4pCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJla2V5VG8KICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyA1MSAvLyAiRVJSOmVyck5ya3kiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnJreQoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA4CiAgICAvLyB0aGlzLmFzc2VydE5vdFNlbGZPdXRiaWQoKQogICAgY2FsbHN1YiBhc3NlcnROb3RTZWxmT3V0YmlkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwOQogICAgLy8gY29uc3QgaWQgPSB0aGlzLm5ld0JpZElEKCkKICAgIGNhbGxzdWIgbmV3QmlkSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEyCiAgICAvLyBjb25zdCBtYnI6IHVpbnQ2NCA9IHRoaXMuYmlkTWJyKCkgKyBzcG9uc29yQ29zdChwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGNhbGxzdWIgYmlkTWJyCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFNlbmRlcgogICAgZHVwCiAgICBjb3ZlciAzCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMQogICAgLy8gcmV0dXJuIHBheWVyID09PSBvd25lciA/IDAgOiBQYXllclJlY29yZE1CUgogICAgPT0KICAgIGludGMgMTAgLy8gMjg1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTIKICAgIC8vIGNvbnN0IG1icjogdWludDY0ID0gdGhpcy5iaWRNYnIoKSArIHNwb25zb3JDb3N0KHBheW1lbnQuc2VuZGVyLCBUeG4uc2VuZGVyKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTMKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDIKICAgIGJ5dGVjIDIyIC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSBtYnIsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBbW91bnQKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEA0CiAgICBieXRlYyAyMiAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTcKICAgIC8vIGNvbnN0IGJpZEFtb3VudCA9IGFzc2V0WGZlci5hc3NldEFtb3VudAogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTgKICAgIC8vIGNvbnN0IG1pbmltdW1CaWRBbW91bnQgPSB0aGlzLmdldE1pbmltdW1CaWRBbW91bnQoKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIwCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0UmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIxCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IG1pbmltdW1CaWRBbW91bnQsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGRpZyAxCiAgICA8PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIyCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy5iaWRBc3NldC52YWx1ZSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBYZmVyQXNzZXQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIyCiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnhmZXJBc3NldCA9PT0gdGhpcy5iaWRBc3NldC52YWx1ZSwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgNDggLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gdGhpcy5yZWNvcmRCaWQoaWQsIGJpZEFtb3VudCwgbWFya2V0cGxhY2UpCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHJlY29yZEJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuYmlkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAxMSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjUKICAgIC8vIHJlY29yZFBheWVyKHRoaXMuYmlkcyhpZCkua2V5LCBwYXltZW50LnNlbmRlciwgVHhuLnNlbmRlcikKICAgIHR4biBTZW5kZXIKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmVjb3JkUGF5ZXIKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubWFya1JlZnVuZGVkKGlkOiB1aW50NjQpIC0+IGJ5dGVzOgptYXJrUmVmdW5kZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2MQogICAgLy8gcHJpdmF0ZSBtYXJrUmVmdW5kZWQoaWQ6IHVpbnQ2NCk6IFtBY2NvdW50LCB1aW50NjRdIHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjMKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA8IHRoaXMuYmlkSUQudmFsdWUgLSAxLCBlcnJDYW5ub3RSZWZ1bmRNb3N0UmVjZW50QmlkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWNfMiAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjMKICAgIC8vIGxvZ2dlZEFzc2VydChpZCA8IHRoaXMuYmlkSUQudmFsdWUgLSAxLCBlcnJDYW5ub3RSZWZ1bmRNb3N0UmVjZW50QmlkKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBmcmFtZV9kaWcgLTEKICAgID4KICAgIGJueiBtYXJrUmVmdW5kZWRfYWZ0ZXJfYXNzZXJ0QDIKICAgIHB1c2hieXRlcyAiRVJSOmVyckNybXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ3JtcgoKbWFya1JlZnVuZGVkX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZHMoaWQpLmV4aXN0cywgZXJyQmlkTm90Rm91bmQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI1CiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAxMSAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyhpZCkuZXhpc3RzLCBlcnJCaWROb3RGb3VuZCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IG1hcmtSZWZ1bmRlZF9hZnRlcl9hc3NlcnRANAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm5mZCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbmZkCgptYXJrUmVmdW5kZWRfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2NwogICAgLy8gY29uc3QgeyByZWZ1bmRlZCwgYW1vdW50LCBhY2NvdW50OiByZWNlaXZlciB9ID0gdGhpcy5iaWRzKGlkKS52YWx1ZQogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDU3NgogICAgZ2V0Yml0CiAgICBkaWcgMQogICAgaW50Y18zIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMwogICAgc3dhcAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gbG9nZ2VkQXNzZXJ0KCFyZWZ1bmRlZCwgZXJyQmlkQWxyZWFkeVJlZnVuZGVkKQogICAgYnogbWFya1JlZnVuZGVkX2FmdGVyX2Fzc2VydEA2CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJCYXJmIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJhcmYKCm1hcmtSZWZ1bmRlZF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODcxCiAgICAvLyB0aGlzLmJpZHMoaWQpLnZhbHVlLnJlZnVuZGVkID0gdHJ1ZQogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDcyCiAgICBpbnRjXzEgLy8gMQogICAgYm94X2V4dHJhY3QKICAgIGludGNfMCAvLyAwCiAgICBpbnRjXzEgLy8gMQogICAgc2V0Yml0CiAgICBwdXNoaW50IDcyCiAgICBzd2FwCiAgICBib3hfcmVwbGFjZSAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzMKICAgIC8vIGNvbnN0IGJpZEZlZSA9IHRoaXMuZ2V0QmlkRmVlKGFtb3VudCkKICAgIHN3YXAKICAgIGR1cAogICAgY2FsbHN1YiBnZXRCaWRGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc1CiAgICAvLyBjb25zdCByZXR1cm5BbW91bnQ6IHVpbnQ2NCA9IGFtb3VudCAtIGJpZEZlZQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzgKICAgIC8vIHRoaXMucmVmdW5kQ291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIKICAgIC8vIHJlZnVuZENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRDb3VudCB9KQogICAgYnl0ZWMgMzEgLy8gInJlZnVuZF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc4CiAgICAvLyB0aGlzLnJlZnVuZENvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MgogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAzMSAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzgKICAgIC8vIHRoaXMucmVmdW5kQ291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyByZXR1cm4gW3JlY2VpdmVyLCByZXR1cm5BbW91bnRdCiAgICBpdG9iCiAgICBjb25jYXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY29tbWl0RHJhd1JvdW5kKCkgLT4gdm9pZDoKY29tbWl0RHJhd1JvdW5kOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODQKICAgIC8vIHRoaXMucmFmZmxlUm91bmQudmFsdWUgPSAoR2xvYmFsLnJvdW5kICsgRFJBV19ERUxBWV9ST1VORFMgKyBCRUFDT05fUk9VTkRfSU5URVJWQUwgLSAxKSAvIEJFQUNPTl9ST1VORF9JTlRFUlZBTCAqIEJFQUNPTl9ST1VORF9JTlRFUlZBTAogICAgZ2xvYmFsIFJvdW5kCiAgICBwdXNoaW50IDE2CiAgICArCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaW50Y18yIC8vIDgKICAgIC8KICAgIGludGNfMiAvLyA4CiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNAogICAgLy8gcmFmZmxlUm91bmQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVJvdW5kIH0pCiAgICBieXRlYyAxNCAvLyAicmFmZmxlX3JvdW5kIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODQKICAgIC8vIHRoaXMucmFmZmxlUm91bmQudmFsdWUgPSAoR2xvYmFsLnJvdW5kICsgRFJBV19ERUxBWV9ST1VORFMgKyBCRUFDT05fUk9VTkRfSU5URVJWQUwgLSAxKSAvIEJFQUNPTl9ST1VORF9JTlRFUlZBTCAqIEJFQUNPTl9ST1VORF9JTlRFUlZBTAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubWJyKCkgLT4gYnl0ZXM6CnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ubWJyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIHJldHVybiB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwID8gMCA6IEF1Y3Rpb25SZWZ1bmREaXNidXJzZW1lbnRNQlIgLSBBdWN0aW9uTUJSQmlkcwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIHJldHVybiB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwID8gMCA6IEF1Y3Rpb25SZWZ1bmREaXNidXJzZW1lbnRNQlIgLSBBdWN0aW9uTUJSQmlkcwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIHB1c2hpbnQgNDQ1MDAKICAgIGludGNfMCAvLyAwCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTU5CiAgICAvLyBiaWRzOiBBdWN0aW9uTUJSQmlkcyArIHRoaXMucmVmdW5kRGVwb3NpdCgpLAogICAgcHVzaGludCAzNTMwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTU4LTExNjMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGJpZHM6IEF1Y3Rpb25NQlJCaWRzICsgdGhpcy5yZWZ1bmREZXBvc2l0KCksCiAgICAvLyAgIHdlaWdodHM6IEF1Y3Rpb25NQlJXZWlnaHRzLAogICAgLy8gICBiaWRzQnlBZGRyZXNzOiBBdWN0aW9uTUJSQmlkc0J5QWRkcmVzcywKICAgIC8vICAgbG9jYXRpb25zOiBBdWN0aW9uTUJSTG9jYXRpb25zLAogICAgLy8gfQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTYwCiAgICAvLyB3ZWlnaHRzOiBBdWN0aW9uTUJSV2VpZ2h0cywKICAgIHB1c2hpbnQgMjkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTU4LTExNjMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGJpZHM6IEF1Y3Rpb25NQlJCaWRzICsgdGhpcy5yZWZ1bmREZXBvc2l0KCksCiAgICAvLyAgIHdlaWdodHM6IEF1Y3Rpb25NQlJXZWlnaHRzLAogICAgLy8gICBiaWRzQnlBZGRyZXNzOiBBdWN0aW9uTUJSQmlkc0J5QWRkcmVzcywKICAgIC8vICAgbG9jYXRpb25zOiBBdWN0aW9uTUJSTG9jYXRpb25zLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNjEKICAgIC8vIGJpZHNCeUFkZHJlc3M6IEF1Y3Rpb25NQlJCaWRzQnlBZGRyZXNzLAogICAgcHVzaGludCAxODkwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTU4LTExNjMKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGJpZHM6IEF1Y3Rpb25NQlJCaWRzICsgdGhpcy5yZWZ1bmREZXBvc2l0KCksCiAgICAvLyAgIHdlaWdodHM6IEF1Y3Rpb25NQlJXZWlnaHRzLAogICAgLy8gICBiaWRzQnlBZGRyZXNzOiBBdWN0aW9uTUJSQmlkc0J5QWRkcmVzcywKICAgIC8vICAgbG9jYXRpb25zOiBBdWN0aW9uTUJSTG9jYXRpb25zLAogICAgLy8gfQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNjIKICAgIC8vIGxvY2F0aW9uczogQXVjdGlvbk1CUkxvY2F0aW9ucywKICAgIHB1c2hpbnQgMzE0MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE1OC0xMTYzCiAgICAvLyByZXR1cm4gewogICAgLy8gICBiaWRzOiBBdWN0aW9uTUJSQmlkcyArIHRoaXMucmVmdW5kRGVwb3NpdCgpLAogICAgLy8gICB3ZWlnaHRzOiBBdWN0aW9uTUJSV2VpZ2h0cywKICAgIC8vICAgYmlkc0J5QWRkcmVzczogQXVjdGlvbk1CUkJpZHNCeUFkZHJlc3MsCiAgICAvLyAgIGxvY2F0aW9uczogQXVjdGlvbk1CUkxvY2F0aW9ucywKICAgIC8vIH0KICAgIGl0b2IKICAgIGNvbmNhdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUoKSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTcwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4CiAgICAvLyBzdGFydFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0VGltZXN0YW1wIH0pCiAgICBieXRlYyAzNSAvLyAic3RhcnRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTcwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTcwLTExNzEKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmVfYm9vbF9mYWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNzEKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDggLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNzEKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTcwLTExNzEKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgYnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmVfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTY5LTExNzIKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlX2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExNjktMTE3MgogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudCgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTgzCiAgICAvLyBpZiAodGhpcy5oaWdoZXN0QmlkLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDIzIC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE4MwogICAgLy8gaWYgKHRoaXMuaGlnaGVzdEJpZC52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExODQKICAgIC8vIHJldHVybiB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgKyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDIzIC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE4NAogICAgLy8gcmV0dXJuIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSArIHRoaXMuYmlkTWluaW11bUluY3JlYXNlLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZE1pbmltdW1JbmNyZWFzZSB9KQogICAgYnl0ZWMgNTMgLy8gImJpZF9taW5pbXVtX2luY3JlYXNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTg0CiAgICAvLyByZXR1cm4gdGhpcy5oaWdoZXN0QmlkLnZhbHVlICsgdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICByZXRzdWIKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExODYKICAgIC8vIHJldHVybiB0aGlzLnN0YXJ0aW5nQmlkLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NAogICAgLy8gc3RhcnRpbmdCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydGluZ0JpZCB9KQogICAgYnl0ZWMgNTIgLy8gInN0YXJ0aW5nX2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE4NgogICAgLy8gcmV0dXJuIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3Quc2VuZFRvQWtpdGFFc2Nyb3coYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKc2VuZFRvQWtpdGFFc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHByb3RlY3RlZCBzZW5kVG9Ba2l0YUVzY3Jvdyhhc3NldDogQXNzZXQsIGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDcKICAgIC8vIGlmIChhbW91bnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ4CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUxCiAgICAvLyBjb25zdCBlc2Nyb3cgPSB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMjEgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MQogICAgLy8gY29uc3QgZXNjcm93ID0gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcwogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MwogICAgLy8gaWYgKGFzc2V0LmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NAogICAgLy8gaXR4bi5wYXltZW50KHsgcmVjZWl2ZXI6IGVzY3JvdywgYW1vdW50IH0pLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU1CiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU4CiAgICAvLyBpZiAoZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGR1cAogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTkKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7IGFzc2V0UmVjZWl2ZXI6IGVzY3JvdywgYXNzZXRBbW91bnQ6IGFtb3VudCwgeGZlckFzc2V0OiBhc3NldCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYwCiAgICAvLyByZXR1cm4gMAogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIHJldHN1YgoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUA4OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlYyAzMCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMTYKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBkdXAKICAgIGJ5dGVjIDY0IC8vICJwYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NQogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NwogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAyMSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODcKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb3ZlciAzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OAogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAzCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDMwIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2Mi02NQogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY0CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2Mi02NQogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweDNhYjI4OTViIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGFkZHJlc3MsYm9vbClbXSIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCA0MQogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY3CiAgICAvLyBsb2dnZWRBc3NlcnQoZXNjcm93LmlkICE9PSAwLCBlcnJFc2Nyb3dEb2VzTm90RXhpc3QpCiAgICBleHRyYWN0IDYgNDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBibnogc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDExCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJOZXNjIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5lc2MKCnNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIGVycldyb25nRXNjcm93Rm9yT3BlcmF0aW9uKQogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgPT0KICAgIGJueiBzZW5kVG9Ba2l0YUVzY3Jvd19hZnRlcl9hc3NlcnRAMTMKICAgIHB1c2hieXRlcyAiRVJSOmVycldlc2MiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV2VzYwoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTEtMTAwCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgdW5jb3ZlciAzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NWFkZjMzOGYgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCx1aW50NjQsc3RyaW5nLHVpbnQ2NFtdLCh1aW50NjQsdWludDY0KVtdKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5OAogICAgLy8gW10KICAgIGJ5dGVjIDYxIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDQKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODkxCiAgICAvLyByZXR1cm4gZXNjcm93LmlzT3B0ZWRJbihhc3NldCkgPyAwIDogMQogICAgZnJhbWVfZGlnIC0yCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA4CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNwogICAgLy8gcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTYtMTE5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEzCiAgICAvLyB3YWxsZXQsCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNQogICAgLy8gW2Fzc2V0LmlkXSwKICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgYnl0ZWMgMzMgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTQKICAgIC8vIHRydWUsCiAgICBwdXNoYnl0ZXMgMHg4MAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjMKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF92ZXJpZnlBdXRoQWRkcmVzcz4oeyBhcHBJZDogd2FsbGV0IH0pCiAgICBpdHhuX25leHQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGlmIChhbW91bnQgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRUb0FraXRhRXNjcm93X2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNi0xMzIKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI4CiAgICAvLyBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyNy0xMzEKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vIH0pCiAgICBwdXNoaW50IDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKc2VuZFRvQWtpdGFFc2Nyb3dfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNQogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjMKICAgIC8vIHJldHVybiB0aGlzLm9wdEFraXRhRXNjcm93SW5BbmRTZW5kKGFzc2V0LCBhbW91bnQpCiAgICBzd2FwCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAMAAEIIKCNBoAgrf7V5NSF/ahY////////////Ac+Cnrvv796CFNGCnrvv796CFNTeAf////8PJkUJYmlkX2Fzc2V0CWFraXRhX2RhbwZiaWRfaWQHYmlkX2ZlZQQVH3x1AXQUcmFmZmxlX3ByaXplX2NsYWltZWQFcHJpemUNZW5kX3RpbWVzdGFtcAFhDndpbm5pbmdfdGlja2V0AWIRd2VpZ2h0c19ib3hfY291bnQRcmVmdW5kX21icl9jdXJzb3IMcmFmZmxlX3JvdW5kDGlzX3ByaXplX2JveA1wcml6ZV9jbGFpbWVkBnNlbGxlcg1yYWZmbGVfd2lubmVyEndlaWdodGVkX2JpZF90b3RhbBR1bmlxdWVfYWRkcmVzc19jb3VudAxha2l0YV9lc2Nyb3cLRVJSOmVycklwYXkLaGlnaGVzdF9iaWQDYWFsD2NyZWF0b3Jfcm95YWx0eRNmaW5kX3dpbm5lcl9jdXJzb3JzFW1hcmtldHBsYWNlX3JveWFsdGllcwF3AQAGd2FsbGV0DHJlZnVuZF9jb3VudA1yYWZmbGVfYW1vdW50AgABC0VSUjplcnJNYmZmD3N0YXJ0X3RpbWVzdGFtcAdnYXRlX2lkC0VSUjplcnJBaG5lEXZyZl9mYWlsdXJlX2NvdW50BmZ1bmRlcgttYXJrZXRwbGFjZQ9zZWxsZXJfcmVmZXJyZXIIbmZ0X2ZlZXMLRVJSOmVyck5hcHALRVJSOmVyck5hcmMLRVJSOmVyclB6bmMBbAtFUlI6ZXJyTmRhbwtFUlI6ZXJySXhmcgMGgQELRVJSOmVyck5jbHMLRVJSOmVyck5ya3kMc3RhcnRpbmdfYmlkFGJpZF9taW5pbXVtX2luY3JlYXNlB3ZlcnNpb24QAAAAAAAAAAAAAAAAAAAAAQRzYWx0C0VSUjplcnJTaGJiC0VSUjplcnJXYWZkC0VSUjplcnJSYXBjA29hbAIAAAtFUlI6ZXJySXJiZAtFUlI6ZXJyV25mZANwYWwLRVJSOmVyckFubHYSY29udHJvbGxlZF9hZGRyZXNzC0VSUjplcnJJd2x0BWFwcElEMRhAAC8nJiJnJx8iZycTImcnFyJnKiNnJyAiZycGImcnFCJnJwwiZycNI2cnCiJnJw4iZ4IDBCSHwywEMfJqmwTqkYDdNhoAjgMA0wDHALsxGRREMRhBAKSCFgS9cUjQBCVE/dgEmDbInwRNWFaXBPdxk0sE2fTwOgR2lSkxBLnjnFwEaWUB3gS9GyfRBPLOL0YEna8FCgRl/KmLBAXl3k0EcxEQcASPpKFgBGCCMDwEIIleJgSuhMvYBDPpLJQEhU3t4AQ+oRgyNhoAjhYEZAX0BigGUQZrBqsG4AcGBzQJ4QunDZoPFQ9nECoQNBBEEGAQaxDuAAEREQAjQ4AENM7HmDYaAI4BApgAMRmBBBIxGBBEQhCFMRmBBRIxGBBEQgVlMRmBBRIxGBBEQgR6igIAi/6BCghJMgwNQQAqsYEGshCBBbIZJzGyHicxsh+L/40CAAsABLNC/9wyALIBQv/1IrIBQv/viYoBAYv/gRKRi/8bgRuRIQsai/+BO5FKkUwcIx5FAYEfGk8CTJAhCxoZiYoBAIv/OAkyAxJAAAQnMrAAi/84IDIDEkAABCczsACJigMAi/6L/xNBAAuL/QGAASRMUIv+v4mKCAKAACKL+UAABYv+QAFHI0SL+CcYZUgkW4v8IlmB1MUBC4HkqQMITIv5QABdsUlyCERLAov9CLIIsgcjshAisgG2i/oWi/sWTwKyGIAE3KwJNbIaTLIashqL/LIai/+yGoEGshAisgGztD5JVwQATFcABCcEEkRJFSQSRBdMTBZMFlCL/E8DTwOJSXIIRIv5cABFAUEAi0sBSwFyCExOBEQijACL/kEACksBcghEI4wAjAGxSwFyCERPA7IIsgcjshAisgG2iwBBAASLAbIVi/myEYv9shJPArIUgQSyECKyAbaL+haL+xZPA7IYgASjoWyqshpMshqyGov8shqL/7IagQayECKyAbO0PklXBABMVwAEJwQSREkVJBJEF0xC/1xLATIQCLFLAUlyCEQyELIIsgcjshAisgG2i/kWTLIYgAQ5Tq6yshqyGoEGshAisgGzQv9DIkL+tooFAYAAi/5BAGuL/DIDE0EAY4v7gAt3YWxsZXRfZmVlc2VIJFtJIQQORIv+HSEEl0mMAEAACIv+QQADI4wAMgdJgYCangEIiwBJTgIWi/xMUCchTFCL+4v9TwVPBE8ESwUii/+I/j5IVwgIi/5PAgkWTFBMiYv+FiIWUEyJNhoBSRUkEkQXNhoCSRUjEkQiUzYaA0kVJBJEFzYaBEkVJBJEF0w2GgVJFSQSRBdMNhoGSRUkEkQXTDYaB0kVJBJEF0w2GghJFSQSRBdMNhoJSU4CFYEoEkQ2GgpJTgIVJRJENhoLSRUkEkQXTDYaDEkVJBJEF0w2Gg1JTgIVJRJENhoOSSJZgQIISwEVEkRXAgA2Gg9JFUsBIllJgSISRE8CTEsCUklOBEkVSwEkWUmBChJETFJJTgJJFUsBIllJgQoSRExSIlmBOAgSRDYaD0kVSwEiWUmBIhJESwJMSwJSSRVLASRZSYEKEkRMUkkVSwEiWUmBChJETFIiWYE4CBJEVwIgTgMyDUAABCcisAAnB08RZycPTxBnJxAiZ0sCQQAXSwJxAERAAA+AC0VSUjplcnJJYXN0sAAoTwNnK08OZyc0Tw1nJzVPDGcnI08LZycITwpnJydPCWcnEU8IZycZTwdnJyRPBmcnKE8FZycpTwNnTwIiW0lyCEQyAxNAAA+AC0VSUjplcnJJYXBwsAApTGcnFUxnJzZMZycaJzdnJxIyA2cnODEXZyIpZUQnKmVIgUhbJxtMZyNDMRYjCUk4ECMSRDYaARUkEkQxADIJEkAABCcisAAiK2VEQAAEJyuwAEk4BzIKEkAABCcWsAA4CIgWciRbEkAABCcWsAAnBSK5SCNDMQAyCRJAAAQnIrAAIiplRCMNQQDGIiplRIECCSInH2VEEkAABCcssAAiJxBlREAABCctsAAiK2VEQQAIIicGZURBAJMjQAAPgAtFUlI6ZXJyUndoY7AAIiplRCInDWVEEkAABCcssAAiJwxlREEABCc5sAAnBbxIIicPZURAACIyCiInB2VEcABFAUEAFLEyCSInB2VEshGyFYEEshAisgGzIihlREEAIDIKIihlRHAARQFBABOxMgkiKGVEshGyFYEEshAisgGzsTIJsgkjshAisgGzI0MiQv9qIkL/PTEAMgkSQAAEJyKwADIHIicjZUQMQAAPgAtFUlI6ZXJyQWFzdLAAIicMZURBAAQnObAAJwW8SCInEWVEiA1IIihlREEAE7EyCSIoZUSyEbIVgQSyECKyAbOxMgmyCSOyECKyAbMjQzEWgQIJSTgQIxJEMRYjCUk4EIEGEkQ2GgFJFSUSRDYaAkkVJBJEF08CIk8CiA6giBMqI0MxFoECCUk4ECMSRDEWIwlJOBCBBhJENhoBSRUlEkRMIyKIDneIEwEjQzEWIwlJOBAjEkQ2GgFJFSUSRIgRmYgS5yNDMRaBAwlJOBAjEkQxFoECCUk4EIEEEkQxFiMJSTgQgQYSRDYaAUkVJRJENhoCSRUkEkQXTwIiTwKIDh2IEwYjQzEWgQMJSTgQIxJEMRaBAglJOBCBBBJEMRYjCUk4EIEGEkQ2GgFJFSUSREwjIogN6IgS0SNDMRaBAglJOBAjEkQxFiMJSTgQgQQSRDYaAUkVJRJEiBD+iBKrI0M2GgFJFSQSRBeIE21JVwAgTCVbIihlREAADrGyCLIHI7IQIrIBsyNDiAx9Qv/4IjIHIicIZUQNQAAEJyWwACIrZURAAAQnK7AAIicKZURBAA+AC0VSUjplcnJXYWRysAAiJxJlRDIDEkAABCc6sAAiJwZlREEABCc7sAAiJw5lREAAXiIqZUQjEkAAJSIqZUQjCRYnC0xQvkRXACAnCUxQSUUCvUUBQQAISb5EFyKIDH8iJxNlREAAESIoZUSIDLiIE6BIJwYjZyNDIicTZUQjEkEABycKI2dC/+2IExxC/+cyBiInDmVEgQQID0AAD4ALRVJSOmVyck5ldG2wALEiJw5lRBYiJzhlREkVFlcGAkxQIillRCc8ZUgiW7IYgAQYk5LFshpMshqyGoEGshAisgGztD5JVwQASwFXAAQnBBJESSJZgQIITBUSRFcGAEkVSUAAMUYCMgYiJw5lRIHoBwgPQAAPgAtFUlI6ZXJyQm5yZLAAIicmZUQjCCcmTGeIEndC/0IiSwEPIksCTwJNgRBLAg+BEE8DTwJNUkkVgRASQAAPgAtFUlI6ZXJySXJzZLAASSJbIiEGHUUBSSEIHkUBTwIeRQEhBh1FASEIHk4CSE8CJFtMIQkeRQEeRQEhBh1FASEJHkUBTBZMFlAiJxNlTElPAkQhBwxBAAIjCCc9TgJJQQDNSSMNQAAEJz6wACMJSSMNQAAEJz6wAEcCHCMeRQFMGE4DIkxPAksCIwxBAIFJIltJTgUhBh1FASEIHklOAk4GSEwkW0xAAGGBooW89t7fvYUoTEkhBh1FAU8CHkUBTwUWTBZQTwWI9vklkE8CiPbyGRZQSVcAEE4EgRBbSUsGD0EAIEsBGCMIFk8DSSJZIwgWVwYAXABMUE4CTCMITE8DQv+DSE8DQv+EIQlC/6RFAUUBTwJIgAIAElBMUEmBEFlLARVSgQJbJwpMZ0L980ghB0L/Q4AARwU2GgFJFSQSRBciK2VEQAAEJyuwADIHIicIZUQNQAAEJyWwACInCmVEQAAPgAtFUlI6ZXJyV25uZrAAIicSZUQyAxJAAAQnOrAAIicaZURJIltJTwIkW0UGIicMZUxJTgJOBEQiJwplTE4ERCJOA0sBIQUKCUUMIQUYQAAeSwqBBA1BABZLCkmBQAyBQE4CTYE8C4GsAggiiPW2SwGBQAxBADhJIQUYQAAxSSEFCklFC0sEDEEAJEsJJAsnBUwkuhdLCAhJRQhLAw1AAA4hBQhMIwhMSwZFCEL/wE8CSE8CSBZLBRZQTBZQSSJbTEkkW0UGgRBbgUASQQALFksEFlAnGkxnI0MiJxRlREsBDkEAEUgnCiJnJw4iZycaJzdnQv/iIicUZURLAUlOAglJSwRJTgMNTE4CTUlFBEwhBRhJRQghBUwJSUUFDUEABEsCRQJLAYE8CyKI9PciJwplTE4CREkhBQoWJxxMUEwiSUsFDEEAO0sISwEIJAtLA0wkuhdLCElPAghMSwUOQQAYSwRLAQxBABBLAksCCBYnLkxQvkQnEkxnTCMITEUIQv++SEUBRQFLAQgWSwQWUCcaTGdC/0EiSYAARwM2GgFJFSQSRBciJxBlREAABCctsAAiK2VEQQATIicSZUQyAxNAAAgiJwZlREEBuiNAAAQnP7AAIiplRCInDWVEE0AAD4ALRVJSOmVyckFyZmOwACInDWVMSU4CTgNEIiplREsBCUlPA0lOAw1MTgJNSU4CgdwBCyKI9A2IDuVJIltOA0mBEFtOBIEYW0xLBUsDCEsBDUEBQ0kWJwtMUElOAr5ESYHABFNMVwAgTgMiRQxAABwiKmVEIwlLARNBABBJiA4OSVcAIEwlW4gHcEULSwG8SCcJSwNQSb1FAUAAjUhLBUxPAgGAASRMUElOA75MTgRAAENPAkhPAkhMFk8CTFBJVwAgRQwlW0lFCEsJDUEAIUsGSwkJSUUJSwtMiAbJQQAQsUsHsghLCrIHI7IQIrIBsyMIQv9UTwK8SEwhCghFCUsBcwBFAUAACEsIMgEPQQAVI0EAC08CSExLBxZQQv+fRQFMQv/zIkL/6Em+RBdMvEhLBksICE4CFicuTFBJRRC9RQFB/1tLDrxIIicMZUxJTgJFD0RBACNLDCMJSU4IFiccTFBJTgO9TElPAkQkDUEAEU8JSCQJTwNM00xLBAhMQv8eSE8CvEhPB0kkCycFTNMnDExnQv/jRgIiJw1lRAgnDUxnI0MiQv5DgAAyByInCGVEDUAABCclsAAiJxBlREEAD4ALRVJSOmVyclBhY2ywACIqZUQjEkEAEiInEWVEiAVBJxAjZycGI2cjQyIqZUQjCRYnC0xQvkRJVwAgSwElW04CTFcoIE4CiAUXIihlREAAh4gDq0kiW0UDSSRbTEmBEFtOAoEYW04DIicPZURBAGVLBAhJQAA7IihlREyIDTdIIicoZURLAYgFcYgFbiInEWVETIgFZSInD2VEQAANIicHZURxC0RLAYgFUCcQI2dC/3YiKWVEIicpZUQiJxVlRIECW3IIRE4CIk8ETwSI86giW0L/okL/m4gDJEkiW0UDSSRbTEmBEFtOAoEYW04DIicPZURBAGhLBAhJQAA7IihlREyIDLBIIicoZURLAYgFJ0iIBSNIIicRZURMiAUZSCInD2VEQP+DIicHZURxC0RLAYgFA0hC/3IiKWVEIicpZUQiKGVEIicVZUSBAltyCEROA08ETwSI8x4iW0L/n0L/mCInEmVEMgMTQAAEJz+wACInBmVEQQAEJzuwAIgFSyIpZUQnKmVIgVBbSSEEDkRLAR0hBJdMSwEJIihlRE8CiAwTSCInEmVETIgEi0gnBiNnI0M2GgEVJBJEMQAiJxFlRBJBAK0iKmVEIxJBAKQyByInI2VEDEEAmSNAAE4yByInCGVEDUAABCclsAAiJxBlREAABCctsAAiK2VEQQAIIicGZURBAGcjQAAPgAtFUlI6ZXJyUm5wY7AAIiplRCInDWVEEkAABCcssAAnBb1FAUAACSIWJwRMULAjQycFvEiICxkkW0kiJydlRFcAIEyIA5FBABaxIicnZURXACBLAbIIsgcjshAisgGzQv/GIkL/liJC/2SICuMnBExQsCNDiAr+Jx0iTwJUJwRMULAjQzYaAUkVJRJEJwlMUL1FAScdIk8CVCcETFCwI0OICuwWJwRMULAjQzYaAUcCFUsBIllJgQoSRE8CTEsCUiJZgQwIEkQxACIpZUQnHmVIcghEEkAABCcvsAAnFUxnI0M2GgFJIlmBAghLARUSRFcCADEAIillRCceZUhyCEQSQAAEJy+wACIpZUQnQGVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJzZMZyNDNhoBSRUkEkQXMQAiKWVEJx5lSHIIRBJAAAQnL7AAKUxnI0MxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAA+AC0VSUjplcnJGb3JisABLATgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATDgIMhASQAAPgAtFUlI6ZXJySXBtYbAAsTIKTLIRIrISshSBBLIQIrIBsyNDIiplREkjCCpMZ4mKAQEiK2VESSEEDkSL/x0hBJdJQAAPIitlREEACIv/QQADI0yJiYoBAYAARwQiSScZZURBACYiJxllREkhBA5Ei/8dIQSXSYwFQAAQIicZZURBAAiL/0EAAyOMBSIpZUQnKmVISYE4W4wEgUBbSYwDIowAIowBQQBvIillRCInEWVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwQSREkVJBJEF0kjDUEAxyMJiwNJiwQJTwILgegHCglJjAFJIQQORIv/HSEEl0mMAEAACIv/QQADI4wAIowCIicbZURBACYiJxtlREkhBA5Ei/8dIQSXSYwCQAAQIicbZURBAAiL/0EAAyOMAosFiwAIgQKLAgsIi/8NQQAzIicZZURJIQQORIv/HSEEl4wFiwFJIQQORIv/HSEEl4wAIicbZURJIQQORIv/HSEEl4wCiwVJiwBJTgMIgQKLAklOBQsIi/9MCUwWTwIWUE8CFlBMFlCMAIlII0L/NooBACInD2VEQQAdsSInB2VEshiABK35KuSyGov/shqBBrIQIrIBs4kyCiInB2VETEsBcABITIv/THAARQFBABZIsSInB2VEshGL/7IVgQSyECKyAbOJIillRCInB2VETwJJTgIWi/9MUCchTFAyA08ETwMiIQdPBU8GI08HiO08RgKJigIBi/5zAEhAAAiL/zIBD0EAAiOJIomKAgAiKGVEQAAbi/6L/4j/2EEAELGL/7IIi/6yByOyECKyAbOJsSIoZUSyEYv/shKL/rIUgQSyECKyAbOJigIBIihlREEADiIoZUSL/kxwAEUBQQAJi/6L/4j/pCKJIillRCIoZUSL/xaL/kxQJyFMUDIDTwNPAyIhB08Fi/8iTweI7J5IJFuJigIAi/4hBQpJFiccTFCL/iEFGCQLSiS6F4v/Fk8DTwNPArtMJAsnBUsBJLoXSwIJi/8IFicFTgK7IicTZURMCYv/CCcTTGeJIicgZUQiJxdlRIj9AQmJIitlREEALiIqZUQjDUEAJSIqZUQjCRYnC0xQvkRXACAxABNAAA+AC0VSUjplcnJDb2JzsACJigMAIkcEgABHAogGZUAABCdBsACL/kEBTiIpZUQxAEsBJzxlSIEYW08CJxhlSIFYW4wGsbIYgAQ8Gm8zshqyGoEGshAisgGztD5JVwQASwFXAAQnBBJESSJZgQIITBUSRFcGAEkVJBNBAMRIIowHMQCLB0AAbYwDIillRCInJGVMjAVEi/04GEwnGGVIgShbEkEAS4v9OBlAAESL/TgbgQQSQQA6i/05GgCABEOSJlUSQQAri/05GgGLAxJBACCL/TkaAosFFhJBABQjQAAPgAtFUlI6ZXJyRmd0ZbAAiSJC/+mLBydCZUxOAkEAPUsBFSUSQQA1I0AABCdDsACLB3IIREsCE0EAHEsBMQATQQAUSwFzAkSLB3IIRBNBAAaMA0hC/1NIjANC/00iQv/IF0mM/0EABYsGQAAMIiKL/08CTYwHQv8oi/9yB0yMAUEAEosGFidETFADiwESQQAEI0L/2SJC/9UiKWVMSU8CRCcYZUiBWFuMBjEAMg0yDowAi/9AAIJIMgNJIhZPA0lOAlBPA1BMUExQJx1QSVcIIEsBVwAITwJXSCBOAlBMUIwCIickZUyMBUSL/TgYTCcYZUiBKFsSQQA7i/04GUAANIv9OBuBBBJBACqL/TkaAIAEmxR9LBJBABuL/TkaAYsCEkEAEIv9ORoCiwUWEkEABCNC/skiQv7Fi/9BAAWLBkABCyJAAA+AC0VSUjplcnJIbndssABJQAAPgAtFUlI6ZXJySHRvcLAAIk4Ci/8TQQBFRQGL/4AQc3BlbmRpbmdfYWRkcmVzc2VMjARBABeLBBUlEkEAD4sESwESQQAHSYsAE0AAD4ALRVJSOmVyckhuYmSwACNMi/8nQmVBAAdJFSUSQAAEJ0OwAElLAhJBAE8jTIv/gAhyZWZlcnJlcmVBADVJFSUSQQAuTgNLAksBTwNJTgNNTEEAF0yL/xZPAlBMUExQTFAnHSJPA1RQQv68RQEyA0L/40gyA04DQv/Mi/9yCExOAkAAB0UBIkxC/6JJSwISQQALTHMCSDIDEkxC/5BJcwJITwISTEL/hYv/cgdMjAFBABKLBhYnRExQA4sBEkEABCNC/toiQv7WiAMzQAAEJ0GwACInJGVEQQAPgAtFUlI6ZXJySGd0ZbAAiYoAAYgC6UkiW0xJgRBbTgKBGFtOAicJMQBQvUUBQQAERQFMiQgiK2VEQf/2iwAIQv/wigMAMQCL/hZQi/9QJx1Qi/0WJwtMUEy/IitlREEAyCcJMQBQvUUBQQBEJwkxAFC+RBeL/oj7rDIHIicIZUSBeAkNQQANIicIZUSBrAIIJwhMZyIrZURBAA+L/oj42yInIGVECCcgTGcnF4v+Z4kiJxRlTElPAkRJIQUKTCEFGElBADRMFiccTFBMIwgkC9MnCTEAUEsBFkxLAb8xACcuTwJQTL8iJxRlRCMIJxRMZ4v+iPsvQv+ASEkhBQxAAA+AC0VSUjplcnJUbXB0sABJFiccTFAkuUgjCEkkCycFTNMnDExnQv+oJwkxAFC9RQFA/0UnCTEAUCIWv0L/OooCAIv+iOdBiPsyiPgjiP7Ai/44AElOAjEAEiEKIk8CTQiIAdqL/jgHMgoSQAAEJxawAIv+OAhJTwJLAwgPQAAEJxawAEwJTwJJTwKL/4j+shYnC0xQMQBMTgKI5wuJigMAi/2I5uIxAIv+OAASQAAPgAtFUlI6ZXJySXBtc7AAi/44EzIDEkAAD4ALRVJSOmVyck5jbHewAIv+OBUyAxJAAAQnMrAAi/44IDIDEkAABCczsACI+oWI93aI/hOL/TgASU4DMQASIQoiTwJNCIv9OAcyChJAAAQnFrAAi/04CBJAAAQnFrAAi/44EogBD4v+OBQyChJAAAQnMLAASwEOQAAEJzCwAIv+OBEiKGVEEkAABCcwsABMSU8Ci/+I/eIWJwtMUDEATE4CiOY7iYoBASIqZUQjCYv/DUAAD4ALRVJSOmVyckNybXKwAIv/FicLTFBJvUUBQAAPgAtFUlI6ZXJyQm5mZLAASb5ESYHABFNLASVbTgNMVwAgTEEAD4ALRVJSOmVyckJhcmawAExJgUgjuiIjVIFITLtMSYj2mwkiJx9lRCMIJx9MZxZQiTIGgRAIIwkkCiQLJw5MZ4kiKGVEFIHU2wIiTwJNgeSTAggWgdQWFlCB1JMBFlCBqPUBFlCJMgciJyNlRA9BAA0yByInCGVEDkEAAiOJIokiJxdlREEADCInF2VEIic1ZUQIiSInNGVEiYoCAYAAi/9AAAMiTIkiJxVlRIECW3IIRIv+QAARsYv/sgiyByOyECKyAbMiTIlJi/5wAEUBQQAWsYv+shGL/7ISshSBBLIQIrIBsyJMiUgiKWVESSceZUhMSSdAZUhJVwgITgIkW04DIicVZUxJTgJOA0RJIllLARVSSU4DVwIATCceZUhMsSMWTgJJFRZXBgJMUIAEAAEAAkxQTLIYgAQ6solbshqyGoEGshAisgGztD5JVwQASwFXAAQnBBJESSJZgSkLgQIITBUSRFcGKSJbSUAAD4ALRVJSOmVyck5lc2OwAE8CgQJbSYwAEkAAD4ALRVJSOmVycldlc2OwALFPA0myGIAEWt8zj7IaTwOyGkyyGkyyGoAKAAEAAAAAAAAAALIaJz2yGoEGshAisgEiKWVFAUSLAElyCESL/nAARQEUMhALSU4DtkxyCESyB7III7IQIrIBtkkWi/4WJyFMUE8EshiABGg147yyGkyyGoABgLIashqBBrIQIrIBtrIYgARsw/YGshqBBrIQIrIBi/9BABe2iwByCESL/rIRi/+yErIUgQSyECKyAbNMiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
    * Sets a fee auction up for its loser raffle. `weightListLength` is ignored: it used to reserve
    that many full weights boxes, which capped the auction at `weightListLength * ChunkSize`
    bidders and locked their storage up front. Weights storage now grows with the bidders, each
    paying for its own (`AuctionMBRWeightSlot`). The argument stays so the ABI is unchanged.
  
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
    * Removes the totals box of a fee auction and returns its storage to whoever funded the auction;
    returns the amount released (0 when it is already gone). The weights boxes themselves are
    removed by the storage refunds, so it runs once every bid's storage is refunded, or before the
    start for a seller who cancels. Calling it is optional: deleting or cancelling the auction
    removes a totals box that is still there. `iterationAmount` is ignored (it used to count the
    reserved weights boxes to delete) and stays so the ABI is unchanged.
  
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
     * Constructs a no op call for the mbr()(uint64,uint64,uint64,uint64) ABI method
     *
    * What a bid on THIS auction must add for storage: `bids` for every bid (with the refund deposit
    of an ASA bid, AUC-02), `bidsByAddress` for an address's first bid, and in a fee auction
    `locations` with it (location box and weight slot). `weights` is the totals box the seller
    funds. All of it is returned by `refundMBR` and `clearWeightsBoxes`.
  
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
        * Sets a fee auction up for its loser raffle. `weightListLength` is ignored: it used to reserve
        that many full weights boxes, which capped the auction at `weightListLength * ChunkSize`
        bidders and locked their storage up front. Weights storage now grows with the bidders, each
        paying for its own (`AuctionMBRWeightSlot`). The argument stays so the ABI is unchanged.
    
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
        * Removes the totals box of a fee auction and returns its storage to whoever funded the auction;
        returns the amount released (0 when it is already gone). The weights boxes themselves are
        removed by the storage refunds, so it runs once every bid's storage is refunded, or before the
        start for a seller who cancels. Calling it is optional: deleting or cancelling the auction
        removes a totals box that is still there. `iterationAmount` is ignored (it used to count the
        reserved weights boxes to delete) and stays so the ABI is unchanged.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    clearWeightsBoxes: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.clearWeightsBoxes(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * What a bid on THIS auction must add for storage: `bids` for every bid (with the refund deposit
        of an ASA bid, AUC-02), `bidsByAddress` for an address's first bid, and in a fee auction
        `locations` with it (location box and weight slot). `weights` is the totals box the seller
        funds. All of it is returned by `refundMBR` and `clearWeightsBoxes`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call params
         */
    mbr: (params = { args: [] }) => {
      return this.appClient.params.call(AuctionParamsFactory.mbr(params));
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
        * Sets a fee auction up for its loser raffle. `weightListLength` is ignored: it used to reserve
        that many full weights boxes, which capped the auction at `weightListLength * ChunkSize`
        bidders and locked their storage up front. Weights storage now grows with the bidders, each
        paying for its own (`AuctionMBRWeightSlot`). The argument stays so the ABI is unchanged.
    
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
        * Removes the totals box of a fee auction and returns its storage to whoever funded the auction;
        returns the amount released (0 when it is already gone). The weights boxes themselves are
        removed by the storage refunds, so it runs once every bid's storage is refunded, or before the
        start for a seller who cancels. Calling it is optional: deleting or cancelling the auction
        removes a totals box that is still there. `iterationAmount` is ignored (it used to count the
        reserved weights boxes to delete) and stays so the ABI is unchanged.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    clearWeightsBoxes: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.clearWeightsBoxes(params));
    },
    /**
         * Makes a call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * What a bid on THIS auction must add for storage: `bids` for every bid (with the refund deposit
        of an ASA bid, AUC-02), `bidsByAddress` for an address's first bid, and in a fee auction
        `locations` with it (location box and weight slot). `weights` is the totals box the seller
        funds. All of it is returned by `refundMBR` and `clearWeightsBoxes`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call transaction
         */
    mbr: (params = { args: [] }) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.mbr(params));
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
        * Sets a fee auction up for its loser raffle. `weightListLength` is ignored: it used to reserve
        that many full weights boxes, which capped the auction at `weightListLength * ChunkSize`
        bidders and locked their storage up front. Weights storage now grows with the bidders, each
        paying for its own (`AuctionMBRWeightSlot`). The argument stays so the ABI is unchanged.
    
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
        * Removes the totals box of a fee auction and returns its storage to whoever funded the auction;
        returns the amount released (0 when it is already gone). The weights boxes themselves are
        removed by the storage refunds, so it runs once every bid's storage is refunded, or before the
        start for a seller who cancels. Calling it is optional: deleting or cancelling the auction
        removes a totals box that is still there. `iterationAmount` is ignored (it used to count the
        reserved weights boxes to delete) and stays so the ABI is unchanged.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    clearWeightsBoxes: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.clearWeightsBoxes(params));
      return { ...result, return: result.return };
    },
    /**
         * Makes a call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
         *
         * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
         *
        * What a bid on THIS auction must add for storage: `bids` for every bid (with the refund deposit
        of an ASA bid, AUC-02), `bidsByAddress` for an address's first bid, and in a fee auction
        `locations` with it (location box and weight slot). `weights` is the totals box the seller
        funds. All of it is returned by `refundMBR` and `clearWeightsBoxes`.
    
         *
         * @param params The params for the smart contract call
         * @returns The call result
         */
    mbr: async (params = { args: [] }) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.mbr(params));
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
     * Makes a readonly (simulated) call to the Auction smart contract using the `mbr()(uint64,uint64,uint64,uint64)` ABI method.
     *
     * This method is a readonly method; calling it with onComplete of NoOp will result in a simulated transaction rather than a real transaction.
     *
    * What a bid on THIS auction must add for storage: `bids` for every bid (with the refund deposit
    of an ASA bid, AUC-02), `bidsByAddress` for an address's first bid, and in a fee auction
    `locations` with it (location box and weight slot). `weights` is the totals box the seller
    funds. All of it is returned by `refundMBR` and `clearWeightsBoxes`.
  
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
  async mbr(params = { args: [] }) {
    const result = await this.appClient.send.call(AuctionParamsFactory.mbr(params));
    return result.return;
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
        return {
          weightTotals: new BinaryStateValue(result.weightTotals)
        };
      },
      /**
       * Get the current value of the weightTotals key in box state
       */
      weightTotals: async () => {
        return new BinaryStateValue(await this.appClient.state.box.getValue("weightTotals"));
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
       * Add a mbr()(uint64,uint64,uint64,uint64) method call against the Auction contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
        resultMappers.push((v) => client.decodeReturnValue("mbr()(uint64,uint64,uint64,uint64)", v));
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





var APP_SPEC2 = { "name": "AuctionFactory", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New ASA-prize auction (principal ABI, spec \xA76.6). The seller stays `Txn.sender`; `wallet` is the\nseller's wallet hint (0 = acting as itself; a plugin passes `windowHint(wallet)`), verified here\n(invalid hints revert), and its referrer is stored in the child as `seller_referrer`, which the\nchild pays at settlement. The +50,000 \xB5A global is part of `newAuctionCost`, and so is the DAO's\nauction creation fee.", "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim (spec \xA77.2; delete in Phase 4): the pre-principal `newAuction(...)uint64` selector.\nThe child gets `seller_referrer` = the seller's registry referrer, resolved at creation.", "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }, { "type": "uint64", "name": "wallet" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "New prize-box auction (principal ABI, spec \xA76.6); see `newAuction`.", "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "LEGACY shim of the pre-principal `newPrizeBoxAuction(...)uint64` (registry referrer at creation).", "events": [], "recommendations": {} }, { "name": "deleteAuctionApp", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancelAuction", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuctionCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "prizeAssetID" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "desc": "exact ALGO payment `newAuction` / `newPrizeBoxAuction` require: the DAO's auction creation fee\nplus the storage costs of the child. Only the storage part is the funder's refundable deposit.", "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [623, 2612, 3237], "errorMessage": "Bytes has valid prefix" }, { "pc": [3342, 4150], "errorMessage": "ERR:errBinc" }, { "pc": [4093], "errorMessage": "ERR:errBmpt" }, { "pc": [506, 2318, 3369, 4177], "errorMessage": "ERR:errCnst" }, { "pc": [3358, 4166], "errorMessage": "ERR:errEmfm" }, { "pc": [3082], "errorMessage": "ERR:errFanw" }, { "pc": [881], "errorMessage": "ERR:errHnbd" }, { "pc": [785], "errorMessage": "ERR:errHnwl" }, { "pc": [804], "errorMessage": "ERR:errHtop" }, { "pc": [2307], "errorMessage": "ERR:errIcor" }, { "pc": [3492, 3509, 4267, 4284], "errorMessage": "ERR:errIpay" }, { "pc": [2462], "errorMessage": "ERR:errIpma" }, { "pc": [2432], "errorMessage": "ERR:errIpmr" }, { "pc": [2993], "errorMessage": "ERR:errIupg" }, { "pc": [932], "errorMessage": "ERR:errIwlt" }, { "pc": [3523, 3559, 3573], "errorMessage": "ERR:errIxfr" }, { "pc": [1759, 1858], "errorMessage": "ERR:errNauc" }, { "pc": [2158, 2349, 2919, 2961, 3029], "errorMessage": "ERR:errNdao" }, { "pc": [2648], "errorMessage": "ERR:errNesc" }, { "pc": [3405, 4210], "errorMessage": "ERR:errNopt" }, { "pc": [1774, 1873, 4141], "errorMessage": "ERR:errNpbo" }, { "pc": [3545], "errorMessage": "ERR:errPiba" }, { "pc": [3612], "errorMessage": "ERR:errPszb" }, { "pc": [4766], "errorMessage": "ERR:errPtlg" }, { "pc": [3062], "errorMessage": "ERR:errSbrq" }, { "pc": [2674], "errorMessage": "ERR:errWesc" }, { "pc": [3103], "errorMessage": "ERR:errWnbf" }, { "pc": [1779, 1784, 1878, 1883, 4796, 4817], "errorMessage": "account funded" }, { "pc": [692, 1749, 1848, 2188, 2341, 2398, 2736, 2754, 2850, 2911, 2953, 3021, 3155, 3842, 3863, 3901, 3929, 3982, 4108, 4120, 4515, 4537, 4564, 4617], "errorMessage": "application exists" }, { "pc": [535, 3577, 3587], "errorMessage": "asset exists" }, { "pc": [1323, 1604, 2003, 2062, 2090, 2137, 2334, 2387, 2393, 2506, 2537, 2731, 2841, 2845, 2904, 2946, 2965, 3014, 3121, 3150, 3177, 3419, 3616, 3680, 3692, 3696, 4031, 4097, 4288, 4352, 4364, 4368, 4658], "errorMessage": "check GlobalState exists" }, { "pc": [4122], "errorMessage": "errNapb" }, { "pc": [516, 626, 1095, 1111, 1152, 1203, 1219, 1368, 1384, 2114, 2208, 2615, 2893, 2930, 3240], "errorMessage": "invalid array length header" }, { "pc": [1944], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1102, 1118, 1210, 1375, 2121, 2215, 2937], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [1229, 1394], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [2624], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1301, 1466, 1582, 1714], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1129, 1237, 1246, 1255, 1264, 1273, 1282, 1291, 1309, 1318, 1402, 1411, 1420, 1429, 1438, 1447, 1456, 1474, 1518, 1527, 1536, 1545, 1554, 1563, 1572, 1590, 1599, 1650, 1659, 1668, 1677, 1686, 1695, 1704, 1722, 1744, 1843, 1955, 1967, 1978, 2132, 2200, 2373, 2834, 3007], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [3246], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [1157, 2898], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [632], "errorMessage": "invalid number of bytes for string" }, { "pc": [1144, 2885], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1139, 2880], "errorMessage": "invalid tuple encoding" }, { "pc": [1500, 1632], "errorMessage": "transaction type is appl" }, { "pc": [1197, 1362], "errorMessage": "transaction type is axfer" }, { "pc": [1186, 1351, 1510, 1642, 2365], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggMiA3OTgwMCAxMDAwMDAgMTIxMjUwMCA0MDk2IDUwMDAwIDM5OTAwMCAzMTkyMDAKICAgIGJ5dGVjYmxvY2sgImFraXRhX2RhbyIgImJjIiAweDE1MWY3Yzc1ICJha2l0YV9lc2Nyb3ciICJ3YWxsZXQiICJhYWwiICJFUlI6ZXJyTmRhbyIgIkVSUjplcnJDbnN0IiAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIgIkVSUjplcnJJcGF5IiAweDAwICJFUlI6ZXJyTnBibyIgIkVSUjplcnJJeGZyIiAweDNlYTExODMyIDB4YzUzYjMyY2MgInJlZmVycmVyIiAiYXBwSUQiICJ2ZXJzaW9uIiAiRVJSOmVyck5hdWMiICJzZWxsZXIiICJmdW5kZXIiICJwYWwiIDB4MDAwMCAiRVJSOmVyckJpbmMiICJFUlI6ZXJyRW1mbSIgIkVSUjplcnJOb3B0IiAweDAwMGEgMHgwMDIyIGJhc2U2NChDNEVCUXc9PSkgMHgzNGNlYzc5OCAweGJkNzE0OGQwIDB4YWRmOTJhZTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMC0yNgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbkZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VBdWN0aW9uLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjAtMjYKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb25GYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlQXVjdGlvbiwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDI0CiAgICBwdXNoYnl0ZXNzIDB4YjhjODYyOGQgMHhkMTU0OGZmZiAweGJhZTI2YTJiIDB4NzNmMDAyMjMgMHgxNzE0ZGE2NSAweDgwZjQ0NTQxIDB4YTVkNDJiM2EgLy8gbWV0aG9kICJuZXdBdWN0aW9uKHBheSxheGZlcixzdHJpbmcsYnl0ZVszMl1bXSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3QXVjdGlvbihwYXksYXhmZXIsc3RyaW5nLGJ5dGVbMzJdW10sdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3UHJpemVCb3hBdWN0aW9uKGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCx1aW50NjQpdWludDY0IiwgbWV0aG9kICJuZXdQcml6ZUJveEF1Y3Rpb24oYXBwbCxwYXksdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiZGVsZXRlQXVjdGlvbkFwcCh1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2FuY2VsQXVjdGlvbih1aW50NjQpdm9pZCIsIG1ldGhvZCAibmV3QXVjdGlvbkNvc3QoYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCl1aW50NjQiCiAgICBieXRlYyAxNCAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgIHB1c2hieXRlc3MgMHhkY2EyZDg2MiAweGQzNDZiMWE0IDB4Mzk0ZWFlYjIgMHgzM2Y3ODgwOCAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDczMTExMDcwIC8vIG1ldGhvZCAibG9hZEJveGVkQ29udHJhY3QodWludDY0LGJ5dGVbXSl2b2lkIiwgbWV0aG9kICJkZWxldGVCb3hlZENvbnRyYWN0KCl2b2lkIiwgbWV0aG9kICJvcHRJbihwYXksdWludDY0KXZvaWQiLCBtZXRob2QgIm9wdEluQ29zdCh1aW50NjQpdWludDY0IiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBT0VzY3Jvdygoc3RyaW5nLHVpbnQ2NCkpdm9pZCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU8odWludDY0KXZvaWQiLCBtZXRob2QgIm9wVXAoKXZvaWQiLCBtZXRob2QgIm1icigpKHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCkiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBuZXdBdWN0aW9uIGxlZ2FjeU5ld0F1Y3Rpb24gbmV3UHJpemVCb3hBdWN0aW9uIGxlZ2FjeU5ld1ByaXplQm94QXVjdGlvbiBkZWxldGVBdWN0aW9uQXBwIGNhbmNlbEF1Y3Rpb24gbmV3QXVjdGlvbkNvc3QgaW5pdEJveGVkQ29udHJhY3QgbG9hZEJveGVkQ29udHJhY3QgZGVsZXRlQm94ZWRDb250cmFjdCBvcHRJbiBvcHRJbkNvc3QgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDIxIG1haW5fbWJyX3JvdXRlQDIyCiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwODllNDAwMDAwMDAwMDAwMDBiNTQwMDAwMDAwMDAwMDA0OWQ0MDAwMDAwMDAwMDAwN2FhOAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX29wVXBfcm91dGVAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzAKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjAtMjYKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb25GYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlQXVjdGlvbiwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHg4MTE1MzYyOCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo6Ym94ZWRQcm9ncmFtU2l6ZShib3hLZXk6IGJ5dGVzKSAtPiB1aW50NjQ6CmJveGVkUHJvZ3JhbVNpemU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBib3hlZFByb2dyYW1TaXplKGJveEtleTogYnl0ZXMpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6ODIKICAgIC8vIGNvbnN0IFtzaXplLCBleGlzdHNdID0gb3AuQm94Lmxlbmd0aChib3hLZXkpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJveF9sZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBibnogYm94ZWRQcm9ncmFtU2l6ZV9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKYm94ZWRQcm9ncmFtU2l6ZV9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo4NAogICAgLy8gcmV0dXJuIHNpemUKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJveWFsdGllcyhha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBuYW1lOiBieXRlcywgcHJvb2Y6IGJ5dGVzKSAtPiB1aW50NjQsIGJ5dGVzOgpyb3lhbHRpZXM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJveWFsdGllcyhha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiBBc3NldCwgbmFtZTogc3RyaW5nLCBwcm9vZjogUHJvb2YpOiB1aW50NjQgewogICAgcHJvdG8gNCAyCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzkKICAgIC8vIGxldCBjcmVhdG9yUm95YWx0eTogdWludDY0ID0gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MQogICAgLy8gaWYgKCEocHJvb2YubGVuZ3RoID4gMCkpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGJueiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0MgogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5RGVmYXVsdAogICAgcHVzaGludCA1MDAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0Ny02NTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YS5wcm90b3R5cGUudmVyaWZpZWRNdXN0UmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1MAogICAgLy8gYXNzZXQuY3JlYXRvciwKICAgIGZyYW1lX2RpZyAtMwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjUxCiAgICAvLyBuYW1lLAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTIKICAgIC8vIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgc2hhMjU2CiAgICBzaGEyNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjU0CiAgICAvLyAxLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTQKICAgIGJ5dGVjIDUgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ4CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIHB1c2hpbnQgNzIKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3LTY1NwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDFmZjdjNzRjIC8vIG1ldGhvZCAidmVyaWZpZWRNdXN0UmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NTUKICAgIC8vICdyb3lhbHR5JywKICAgIHB1c2hieXRlcyAweDAwMDc3MjZmNzk2MTZjNzQ3OQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjQ3LTY1NwogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhLnByb3RvdHlwZS52ZXJpZmllZE11c3RSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHN0cmluZwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY1OQogICAgLy8gaWYgKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKS5sZW5ndGggPiAwKSB7CiAgICBsZW4KICAgIGJ6IHJveWFsdGllc19hZnRlcl9pZl9lbHNlQDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYwCiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IGJ0b2koQnl0ZXMoY3JlYXRvclJveWFsdHlTdHJpbmcpKQogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIGZyYW1lX2J1cnkgMQoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjYzCiAgICAvLyBpZiAoY3JlYXRvclJveWFsdHkgPiBDcmVhdG9yUm95YWx0eU1heGltdW1TaW5nbGUpIHsKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjIDggLy8gNTAwMDAKICAgID4KICAgIGJ6IHJveWFsdGllc19hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY0CiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlCiAgICBpbnRjIDggLy8gNTAwMDAKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjY3CiAgICAvLyByZXR1cm4gY3JlYXRvclJveWFsdHkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZXdhcmRzT3B0SW5Db3N0KGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQpIC0+IHVpbnQ2NDoKcmV3YXJkc09wdEluQ29zdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzM5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcmV3YXJkc09wdEluQ29zdChha2l0YURBTzogQXBwbGljYXRpb24sIGFzc2V0OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMiAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MAogICAgLy8gaWYgKGFzc2V0ICE9PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHJld2FyZHNPcHRJbkNvc3RfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MQogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0MgogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzQzCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjc0NgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpwcmluY2lwYWxPZihha2l0YURBTzogdWludDY0LCBoaW50OiB1aW50NjQpIC0+IGJ5dGVzOgpwcmluY2lwYWxPZjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTE5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcHJpbmNpcGFsT2YoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBoaW50OiB1aW50NjQpOiBQcmluY2lwYWwgewogICAgcHJvdG8gMiAxCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkyMAogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWwoZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS53YWxsZXQsIGhpbnQpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoyMTQKICAgIC8vIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjIxMgogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjEzCiAgICAvLyBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCwKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE0OAogICAgLy8gaWYgKGhpbnQgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjkzCiAgICAvLyBvcmlnaW46IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5NQogICAgLy8gcmVmZXJyZXI6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo5MQogICAgLy8gd2FsbGV0OiAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OTAtOTcKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogMCwKICAgIC8vICAgcHJpbmNpcGFsOiBzZW5kZXIsCiAgICAvLyAgIG9yaWdpbjogR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBzcGVuZGVyOiBzZW5kZXIsCiAgICAvLyAgIHJlZmVycmVyOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICAvLyAgIHZpYVBsdWdpbjogZmFsc2UsCiAgICAvLyB9CiAgICBpdG9iCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICB1bmNvdmVyIDMKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDEwIC8vIDB4MDAKICAgIGNvbmNhdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjpyZXNvbHZlUHJpbmNpcGFsQ3R4QDQwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MjAKICAgIC8vIHJldHVybiByZXNvbHZlUHJpbmNpcGFsKGdldEFraXRhQXBwTGlzdChha2l0YURBTykud2FsbGV0LCBoaW50KQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTAyCiAgICAvLyBpZiAod2FsbGV0ID09PSAwIHx8IHdhbGxldEZhY3RvcnkgPT09IDApIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUA1CiAgICBmcmFtZV9kaWcgMgogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VANgoKcHJpbmNpcGFsT2ZfaWZfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDMKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAxMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTQKICAgIC8vIGxvZ2dlZEVycihlcnJIaW50Tm90V2FsbGV0KQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySG53bCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIbndsCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTkKICAgIC8vIGlmIChjYWxsZXJBcHAgPT09IDApIHsKICAgIGR1cAogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTYxCiAgICAvLyBsb2dnZWRFcnIoZXJySGludFRvcExldmVsKQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySHRvcCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJIdG9wCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNjYKICAgIC8vIGxldCB2aWFQbHVnaW4gPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTY3CiAgICAvLyBpZiAoY2FsbGVyQXBwICE9PSBoaW50KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgICE9CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDIyCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTcxCiAgICAvLyBjb25zdCBbc3BlbmRpbmcsIHNwZW5kaW5nRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfU1BFTkRJTkcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoYnl0ZXMgInNwZW5kaW5nX2FkZHJlc3MiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3MgogICAgLy8gaWYgKCEoc3BlbmRpbmdFeGlzdHMgJiYgc3BlbmRpbmcubGVuZ3RoID09PSAzMiAmJiBzcGVuZGluZyA9PT0gc2VuZGVyLmJ5dGVzICYmIHNlbmRlciAhPT0gY2FsbGVyQWRkcikpIHsKICAgIGJ6IHByaW5jaXBhbE9mX2lmX2JvZHlAMjAKICAgIGZyYW1lX2RpZyAxCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBmcmFtZV9kaWcgMQogICAgZGlnIDEKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9pZl9ib2R5QDIwCiAgICBkdXAKICAgIGZyYW1lX2RpZyAzCiAgICAhPQogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjEKCnByaW5jaXBhbE9mX2lmX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE3NAogICAgLy8gbG9nZ2VkRXJyKGVyckhpbnROb3RCb3VuZCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckhuYmQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySG5iZAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTc4CiAgICAvLyB2aWFQbHVnaW4gPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgxCiAgICAvLyBjb25zdCBbY29udHJvbGxlZEJ5dGVzLCBjb250cm9sbGVkRXhpc3RzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGhpbnQsIEJ5dGVzKFBSSU5DSVBBTF9LRVlfQ09OVFJPTExFRCkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTgyCiAgICAvLyBpZiAoIShjb250cm9sbGVkRXhpc3RzICYmIGNvbnRyb2xsZWRCeXRlcy5sZW5ndGggPT09IDMyKSkgewogICAgYnogcHJpbmNpcGFsT2ZfaWZfYm9keUAyNAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBibnogcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNQoKcHJpbmNpcGFsT2ZfaWZfYm9keUAyNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg0CiAgICAvLyBsb2dnZWRFcnIoZXJySGludEJhZFdhbGxldCkKICAgIHB1c2hieXRlcyAiRVJSOmVyckl3bHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXdsdAoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTE5CiAgICAvLyBpZiAoY29udHJvbGxlZCA9PT0gc3BlbmRlcikgewogICAgZHVwCiAgICBkaWcgMgogICAgPT0KICAgIGJ6IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIwCiAgICAvLyByZXR1cm4gdHJ1ZQogICAgaW50Y18xIC8vIDEKICAgIHN3YXAKCnByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTEKICAgIC8vIGNvbnN0IFtyZWZlcnJlckJ5dGVzLCByZWZlcnJlckV4aXN0c10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhoaW50LCBCeXRlcyhQUklOQ0lQQUxfS0VZX1JFRkVSUkVSKSkKICAgIGZyYW1lX2RpZyAtMQogICAgYnl0ZWMgMTUgLy8gInJlZmVycmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTkyCiAgICAvLyBjb25zdCByZWZlcnJlciA9IHJlZmVycmVyRXhpc3RzICYmIHJlZmVycmVyQnl0ZXMubGVuZ3RoID09PSAzMiA/IEFjY291bnQocmVmZXJyZXJCeXRlcykgOiBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzUKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNQogICAgY292ZXIgMwoKcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTk2CiAgICAvLyBwcmluY2lwYWw6IGxpdmUgPyBjb250cm9sbGVkIDogc2VuZGVyLAogICAgZGlnIDIKICAgIGRpZyAxCiAgICB1bmNvdmVyIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgc2VsZWN0CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NwogICAgLy8gb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIGJ6IHByaW5jaXBhbE9mX3Rlcm5hcnlfZmFsc2VAMzgKICAgIHN3YXAKCnByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE5NC0yMDEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIHdhbGxldDogaGludCwKICAgIC8vICAgcHJpbmNpcGFsOiBsaXZlID8gY29udHJvbGxlZCA6IHNlbmRlciwKICAgIC8vICAgb3JpZ2luOiBsaXZlID8gY29udHJvbGxlZCA6IEdsb2JhbC56ZXJvQWRkcmVzcywKICAgIC8vICAgc3BlbmRlcjogc2VuZGVyLAogICAgLy8gICByZWZlcnJlciwKICAgIC8vICAgdmlhUGx1Z2luLAogICAgLy8gfQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTAgLy8gMHgwMAogICAgaW50Y18wIC8vIDAKICAgIHVuY292ZXIgMwogICAgc2V0Yml0CiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MjA5LTIxNgogICAgLy8gcmV0dXJuIHJlc29sdmVQcmluY2lwYWxDdHgoCiAgICAvLyAgIHdhbGxldEZhY3RvcnksCiAgICAvLyAgIGhpbnQsCiAgICAvLyAgIFR4bi5zZW5kZXIsCiAgICAvLyAgIEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkLAogICAgLy8gICBHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6cmVzb2x2ZVByaW5jaXBhbEN0eEA0MAoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzODoKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTcKICAgIC8vIG9yaWdpbjogbGl2ZSA/IGNvbnRyb2xsZWQgOiBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGIgcHJpbmNpcGFsT2ZfdGVybmFyeV9tZXJnZUAzOQoKcHJpbmNpcGFsT2ZfdGVybmFyeV9mYWxzZUAzNToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxOTIKICAgIC8vIGNvbnN0IHJlZmVycmVyID0gcmVmZXJyZXJFeGlzdHMgJiYgcmVmZXJyZXJCeXRlcy5sZW5ndGggPT09IDMyID8gQWNjb3VudChyZWZlcnJlckJ5dGVzKSA6IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICBjb3ZlciAzCiAgICBiIHByaW5jaXBhbE9mX3Rlcm5hcnlfbWVyZ2VAMzYKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyMgogICAgLy8gY29uc3QgW3dhbGxldEFkZHJlc3MsIHdhbGxldEV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQWRkcmVzcyh3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTIzCiAgICAvLyBpZiAoIXdhbGxldEV4aXN0cykgewogICAgYm56IHByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjkKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjQKICAgIC8vIHJldHVybiBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6MTg5CiAgICAvLyBjb25zdCBsaXZlID0gd2FsbGV0Q29udHJvbHNMaXZlKGhpbnQsIGNvbnRyb2xsZWQsIHNlbmRlcikKICAgIGIgcHJpbmNpcGFsT2ZfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjp3YWxsZXRDb250cm9sc0xpdmVAMzIKCnByaW5jaXBhbE9mX2FmdGVyX2lmX2Vsc2VAMjk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNgogICAgLy8gaWYgKGNvbnRyb2xsZWQgPT09IHdhbGxldEFkZHJlc3MpIHsKICAgIGR1cAogICAgZGlnIDIKICAgID09CiAgICBieiBwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDMxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjg1CiAgICAvLyBjb25zdCBbYXV0aF0gPSBvcC5BY2N0UGFyYW1zLmFjY3RBdXRoQWRkcihhY2NvdW50KQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RBdXRoQWRkcgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEyNwogICAgLy8gcmV0dXJuIGF1dGhBZGRyT2Yod2FsbGV0QWRkcmVzcykgPT09IEdsb2JhbC56ZXJvQWRkcmVzcwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxODkKICAgIC8vIGNvbnN0IGxpdmUgPSB3YWxsZXRDb250cm9sc0xpdmUoaGludCwgY29udHJvbGxlZCwgc2VuZGVyKQogICAgYiBwcmluY2lwYWxPZl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6OndhbGxldENvbnRyb2xzTGl2ZUAzMgoKcHJpbmNpcGFsT2ZfYWZ0ZXJfaWZfZWxzZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6ODUKICAgIC8vIGNvbnN0IFthdXRoXSA9IG9wLkFjY3RQYXJhbXMuYWNjdEF1dGhBZGRyKGFjY291bnQpCiAgICBkdXAKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QXV0aEFkZHIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMjkKICAgIC8vIHJldHVybiBhdXRoQWRkck9mKGNvbnRyb2xsZWQpID09PSB3YWxsZXRBZGRyZXNzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjE4OQogICAgLy8gY29uc3QgbGl2ZSA9IHdhbGxldENvbnRyb2xzTGl2ZShoaW50LCBjb250cm9sbGVkLCBzZW5kZXIpCiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6d2FsbGV0Q29udHJvbHNMaXZlQDMyCgpwcmluY2lwYWxPZl9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNQogICAgLy8gY29uc3QgW2NyZWF0b3IsIGV4aXN0c10gPSBvcC5BcHBQYXJhbXMuYXBwQ3JlYXRvcih3YWxsZXQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxMDYKICAgIC8vIHJldHVybiBleGlzdHMgJiYgY3JlYXRvciA9PT0gYXBwQWRkcmVzc09mKHdhbGxldEZhY3RvcnkpCiAgICBieiBwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcmluY2lwYWwudHM6NzQKICAgIC8vIHJldHVybiBBY2NvdW50KG9wLnNoYTUxMl8yNTYoQnl0ZXMoJ2FwcElEJykuY29uY2F0KG9wLml0b2IoYXBwSWQpKSkpCiAgICBmcmFtZV9kaWcgMgogICAgaXRvYgogICAgYnl0ZWMgMTYgLy8gImFwcElEIgogICAgc3dhcAogICAgY29uY2F0CiAgICBzaGE1MTJfMjU2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJpbmNpcGFsLnRzOjEwNgogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzT2Yod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogcHJpbmNpcGFsT2ZfYm9vbF9mYWxzZUA5CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExCgpwcmluY2lwYWxPZl9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czoxNTIKICAgIC8vIGlmICghaXNHZW51aW5lV2FsbGV0KGhpbnQsIHdhbGxldEZhY3RvcnkpKSB7CiAgICBiIHByaW5jaXBhbE9mX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL3ByaW5jaXBhbC50czo6aXNHZW51aW5lV2FsbGV0QDExCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMCBvZiAoKGxlbit1dGY4W10pLHVpbnQ2NCkKICAgIGRpZyAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTcgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzIKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpuZXdBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2NS0yODAKICAgIC8vIG5ld0F1Y3Rpb24oCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18zIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA0IC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEwCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5zdGF0aWNfYXJyYXk8YXJjNC51aW50OCwgMzI+CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyODEKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyODEKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGV4dHJhY3QgMTA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjgyLTI4NQogICAgLy8gcmV0dXJuIHRoaXMubmV3QXVjdGlvbkltcGwoCiAgICAvLyAgIHBheW1lbnQsIGFzc2V0WGZlciwgbmFtZSwgcHJvb2YsIGJpZEFzc2V0SUQsIGJpZEZlZSwgc3RhcnRpbmdCaWQsIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsIGVuZFRpbWVzdGFtcCwgZ2F0ZUlELCBtYXJrZXRwbGFjZSwgd2VpZ2h0c0xpc3RDb3VudCwgc2VsbGVyUmVmZXJyZXIKICAgIC8vICkKICAgIGNhbGxzdWIgbmV3QXVjdGlvbkltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2NS0yODAKICAgIC8vIG5ld0F1Y3Rpb24oCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG5hbWU6IHN0cmluZywKICAgIC8vICAgcHJvb2Y6IFByb29mLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5sZWdhY3lOZXdBdWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKbGVnYWN5TmV3QXVjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTIKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3QXVjdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMzIKICAgICoKICAgIGludGNfMyAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8Ynl0ZXNbMzJdPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzEwCiAgICAvLyBzdGFydFRpbWVzdGFtcCwgZW5kVGltZXN0YW1wLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB3ZWlnaHRzTGlzdENvdW50LCB0aGlzLmxlZ2FjeVNlbGxlclJlZmVycmVyKCkKICAgIGNhbGxzdWIgbGVnYWN5U2VsbGVyUmVmZXJyZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMDgtMzExCiAgICAvLyByZXR1cm4gdGhpcy5uZXdBdWN0aW9uSW1wbCgKICAgIC8vICAgcGF5bWVudCwgYXNzZXRYZmVyLCBuYW1lLCBwcm9vZiwgYmlkQXNzZXRJRCwgYmlkRmVlLCBzdGFydGluZ0JpZCwgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwgZW5kVGltZXN0YW1wLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB3ZWlnaHRzTGlzdENvdW50LCB0aGlzLmxlZ2FjeVNlbGxlclJlZmVycmVyKCkKICAgIC8vICkKICAgIGNhbGxzdWIgbmV3QXVjdGlvbkltcGwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5MgogICAgLy8gQGFiaW1ldGhvZCh7IG5hbWU6ICduZXdBdWN0aW9uJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkubmV3UHJpemVCb3hBdWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3UHJpemVCb3hBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMxNS0zMjgKICAgIC8vIG5ld1ByaXplQm94QXVjdGlvbigKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHdhbGxldDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMyAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjkKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjkKICAgIC8vIGNvbnN0IHNlbGxlclJlZmVycmVyID0gcHJpbmNpcGFsT2YodGhpcy5ha2l0YURBTy52YWx1ZSwgd2FsbGV0KS5yZWZlcnJlcgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGNhbGxzdWIgcHJpbmNpcGFsT2YKICAgIGV4dHJhY3QgMTA0IDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzMwLTMzMwogICAgLy8gcmV0dXJuIHRoaXMubmV3UHJpemVCb3hBdWN0aW9uSW1wbCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4biwgcGF5bWVudCwgYmlkQXNzZXRJRCwgYmlkRmVlLCBzdGFydGluZ0JpZCwgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICBzdGFydFRpbWVzdGFtcCwgZW5kVGltZXN0YW1wLCBnYXRlSUQsIG1hcmtldHBsYWNlLCB3ZWlnaHRzTGlzdENvdW50LCBzZWxsZXJSZWZlcnJlcgogICAgLy8gKQogICAgY2FsbHN1YiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzE1LTMyOAogICAgLy8gbmV3UHJpemVCb3hBdWN0aW9uKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgd2FsbGV0OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5sZWdhY3lOZXdQcml6ZUJveEF1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpsZWdhY3lOZXdQcml6ZUJveEF1Y3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzM3CiAgICAvLyBAYWJpbWV0aG9kKHsgbmFtZTogJ25ld1ByaXplQm94QXVjdGlvbicgfSkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzMgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNTMKICAgIC8vIHN0YXJ0VGltZXN0YW1wLCBlbmRUaW1lc3RhbXAsIGdhdGVJRCwgbWFya2V0cGxhY2UsIHdlaWdodHNMaXN0Q291bnQsIHRoaXMubGVnYWN5U2VsbGVyUmVmZXJyZXIoKQogICAgY2FsbHN1YiBsZWdhY3lTZWxsZXJSZWZlcnJlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1MS0zNTQKICAgIC8vIHJldHVybiB0aGlzLm5ld1ByaXplQm94QXVjdGlvbkltcGwoCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4sIHBheW1lbnQsIGJpZEFzc2V0SUQsIGJpZEZlZSwgc3RhcnRpbmdCaWQsIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXAsIGVuZFRpbWVzdGFtcCwgZ2F0ZUlELCBtYXJrZXRwbGFjZSwgd2VpZ2h0c0xpc3RDb3VudCwgdGhpcy5sZWdhY3lTZWxsZXJSZWZlcnJlcigpCiAgICAvLyApCiAgICBjYWxsc3ViIG5ld1ByaXplQm94QXVjdGlvbkltcGwKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzcKICAgIC8vIEBhYmltZXRob2QoeyBuYW1lOiAnbmV3UHJpemVCb3hBdWN0aW9uJyB9KQogICAgaXRvYgogICAgYnl0ZWNfMiAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkuZGVsZXRlQXVjdGlvbkFwcFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmRlbGV0ZUF1Y3Rpb25BcHA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDk2CiAgICAvLyBkZWxldGVBdWN0aW9uQXBwKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDk3CiAgICAvLyBsb2dnZWRBc3NlcnQoYXBwSWQuY3JlYXRvciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyck5vdEFuQXVjdGlvbikKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IGRlbGV0ZUF1Y3Rpb25BcHBfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDE4IC8vICJFUlI6ZXJyTmF1YyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOYXVjCgpkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5OAogICAgLy8gY29uc3Qgc2VsbGVyID0gQWNjb3VudChvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyKSlbMF0pCiAgICBkdXAKICAgIGJ5dGVjIDE5IC8vICJzZWxsZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDk5CiAgICAvLyBsb2dnZWRBc3NlcnQoc2VsbGVyID09PSBUeG4uc2VuZGVyLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMSAvLyAiRVJSOmVyck5wYm8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTnBibwoKZGVsZXRlQXVjdGlvbkFwcF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MDIKICAgIC8vIGNvbnN0IGJhbGFuY2VCZWZvcmU6IHVpbnQ2NCA9IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmJhbGFuY2UKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBhY2N0X3BhcmFtc19nZXQgQWNjdEJhbGFuY2UKICAgIGFzc2VydCAvLyBhY2NvdW50IGZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUwMwogICAgLy8gY29uc3QgbWluQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5taW5CYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Njc3CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIHVuY292ZXIgMgogICAgZHVwCiAgICBieXRlYyAyMCAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUwNAogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MDgKICAgIC8vIGF1Y3Rpb24uY2FsbC5kZWxldGVBcHBsaWNhdGlvbih7IGFwcElkIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MjQ4N2MzMmMgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUxMAogICAgLy8gdGhpcy5yZWZ1bmRSZWxlYXNlZChyZWNlaXZlciwgYW1vdW50LCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUsIDApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmdW5kUmVsZWFzZWQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5NgogICAgLy8gZGVsZXRlQXVjdGlvbkFwcChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5LmNhbmNlbEF1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpjYW5jZWxBdWN0aW9uOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUxMwogICAgLy8gY2FuY2VsQXVjdGlvbihhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUxNAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RBbkF1Y3Rpb24pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjYW5jZWxBdWN0aW9uX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAxOCAvLyAiRVJSOmVyck5hdWMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmF1YwoKY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MTUKICAgIC8vIGNvbnN0IHNlbGxlciA9IEFjY291bnQob3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlcikpWzBdKQogICAgZHVwCiAgICBieXRlYyAxOSAvLyAic2VsbGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUxNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlbGxlciA9PT0gVHhuLnNlbmRlciwgZXJyTm90UHJpemVCb3hPd25lcikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgMTEgLy8gIkVSUjplcnJOcGJvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5wYm8KCmNhbmNlbEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTE5CiAgICAvLyBjb25zdCBiYWxhbmNlQmVmb3JlOiB1aW50NjQgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5iYWxhbmNlCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RCYWxhbmNlCiAgICBhc3NlcnQgLy8gYWNjb3VudCBmdW5kZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MjAKICAgIC8vIGNvbnN0IG1pbkJlZm9yZTogdWludDY0ID0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MubWluQmFsYW5jZQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY3NwogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICB1bmNvdmVyIDIKICAgIGR1cAogICAgYnl0ZWMgMjAgLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MjEKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTI1CiAgICAvLyBhdWN0aW9uLmNhbGwuY2FuY2VsKHsgYXBwSWQgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzMWYyNmE5YiAvLyBtZXRob2QgImNhbmNlbCgpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUyNwogICAgLy8gdGhpcy5yZWZ1bmRSZWxlYXNlZChyZWNlaXZlciwgYW1vdW50LCBiYWxhbmNlQmVmb3JlLCBtaW5CZWZvcmUsIDApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgcmVmdW5kUmVsZWFzZWQKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUxMwogICAgLy8gY2FuY2VsQXVjdGlvbihhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKbmV3QXVjdGlvbkNvc3Q6CiAgICBwdXNoYnl0ZXMgIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MzQKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAzCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBjb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTM3CiAgICAvLyBjb25zdCBpc0FsZ29CaWQgPSBiaWRBc3NldElEID09PSAwCiAgICAhCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTM4CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgc3dhcAogICAgYnogbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9mYWxzZUAzCiAgICBzd2FwCiAgICAhCgpuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTM4CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgICoKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0NAogICAgLy8gaWYgKCFpc1ByaXplQm94KSB7CiAgICB1bmNvdmVyIDIKICAgIGJueiBuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0NQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTQ1CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU0NQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQXNzZXRJRCkKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDYKICAgIC8vIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAxCiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1NwogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyB0aGlzLndlaWdodHNNYnIod2VpZ2h0c0xpc3RDb3VudCkgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBkaWcgMwogICAgKwogICAgZGlnIDIKICAgIGNhbGxzdWIgd2VpZ2h0c01icgogICAgKwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1OQogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjk1CiAgICAvLyByZXR1cm4gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZSkpCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ5CiAgICAvLyByZXR1cm4gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGV4dHJhUGFnZXMpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1OS01NjEKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNiAvLyAxMjEyNTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTU5LTU2MgogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NjUKICAgIC8vIHJldHVybiB0b3RhbE1CUiArIHRoaXMuY3JlYXRpb25GZWUoKQogICAgY2FsbHN1YiBjcmVhdGlvbkZlZQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUzNAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18yIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgOSAvLyAzOTkwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NDkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgKwogICAgKwogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAOToKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1MQogICAgLy8gfSBlbHNlIGlmIChpc0FsZ29CaWQpIHsKICAgIGR1cAogICAgYm56IG5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUAxMQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA3OTgwMAogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTU0CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NTQKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjczMgogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgMTAgLy8gMzE5MjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTU0CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgKwogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTM4CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgIGludGNfMyAvLyAyCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAzCiAgICBzZWxlY3QKICAgIGIgbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5pbml0Qm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTE4CiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMgogICAgLy8gY29uc3QgW2Rhb1dhbGxldElkXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTIyCiAgICAvLyBjb25zdCBbZGFvV2FsbGV0SWRdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyNC0xMjYKICAgIC8vIGRhb1dhbGxldElkID09PSAwCiAgICAvLyAgID8gVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzCiAgICAvLyAgIDogVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZGFvV2FsbGV0SWQpLmFkZHJlc3MsCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9mYWxzZUAzCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyNQogICAgLy8gPyBUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KCmluaXRCb3hlZENvbnRyYWN0X3Rlcm5hcnlfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEyMy0xMjgKICAgIC8vIGxvZ2dlZEFzc2VydCgKICAgIC8vICAgZGFvV2FsbGV0SWQgPT09IDAKICAgIC8vICAgICA/IFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcwogICAgLy8gICAgIDogVHhuLnNlbmRlciA9PT0gQXBwbGljYXRpb24oZGFvV2FsbGV0SWQpLmFkZHJlc3MsCiAgICAvLyAgIGVyck5vdEFraXRhRGFvCiAgICAvLyApCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDYKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCmluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA4IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI5CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMAogICAgLy8gaWYgKCF0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjYKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzMQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LmNyZWF0ZSh7IHNpemUgfSkKICAgIHN3YXAKICAgIGJveF9jcmVhdGUKICAgIHBvcAoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTE4CiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTMzCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVzaXplKHNpemUpCiAgICBzd2FwCiAgICBib3hfcmVzaXplCiAgICBiIGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2lmX2Vsc2VAOQoKaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTI2CiAgICAvLyA6IFR4bi5zZW5kZXIgPT09IEFwcGxpY2F0aW9uKGRhb1dhbGxldElkKS5hZGRyZXNzLAogICAgdHhuIFNlbmRlcgogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGIgaW5pdEJveGVkQ29udHJhY3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTM3CiAgICAvLyBsb2FkQm94ZWRDb250cmFjdChvZmZzZXQ6IHVpbnQ2NCwgZGF0YTogYnl0ZXMpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzOAogICAgLy8gY29uc3QgZXhwZWN0ZWRQcmV2aW91c0NhbGxzOiB1aW50NjQgPSBvZmZzZXQgLyAyMDMyCiAgICBwdXNoaW50IDIwMzIKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjEzOQogICAgLy8gY29uc3QgdHhuID0gZ3R4bi5UcmFuc2FjdGlvbihUeG4uZ3JvdXBJbmRleCAtIGV4cGVjdGVkUHJldmlvdXNDYWxscyAtIDEpCiAgICB0eG4gR3JvdXBJbmRleAogICAgc3dhcAogICAgLQogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MS0xNDIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDIKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBkaWcgMgogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQxLTE0MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0MwogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGRpZyAyCiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBwdXNoaW50IDMKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQzCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NAogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBkaWcgMgogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ0CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE0NQogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICBkaWcgMgogICAgZ3R4bnNhIEFwcGxpY2F0aW9uQXJncyAwCiAgICBieXRlYyAxNCAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ1CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDYKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGRpZyAyCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDEtMTQ2CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICBpbnRjXzEgLy8gMQoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQwLTE0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBlcnJJbnZhbGlkQ2FsbE9yZGVyKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySWNvciIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJY29yCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTQ4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTMKICAgIGJ5dGVjIDcgLy8gIkVSUjplcnJDbnN0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckNuc3QKCmxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNDkKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXBsYWNlKG9mZnNldCwgZGF0YSkKICAgIGNvdmVyIDIKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMzcKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5kZWxldGVCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjE1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxNTMKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDYgLy8gIkVSUjplcnJOZGFvIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5kYW8KCmRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NgogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTU0CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTUyCiAgICAvLyBkZWxldGVCb3hlZENvbnRyYWN0KCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aE9wdEluLm9wdEluW3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW46CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODcKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTg5CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE4OQogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDUKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5MAogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgZXNjcm93LmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTAKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIGVzY3Jvdy5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6ODkxCiAgICAvLyByZXR1cm4gZXNjcm93LmlzT3B0ZWRJbihhc3NldCkgPyAwIDogMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNvdmVyIDMKICAgIHBvcAogICAgIQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTkyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50UmVjZWl2ZXIpCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDMKICAgIHB1c2hieXRlcyAiRVJSOmVycklwbXIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBtcgoKb3B0SW5fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTMKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksIGVyckludmFsaWRQYXltZW50QW1vdW50KQogICAgdW5jb3ZlciAyCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMwogICAgKwogICAgKgogICAgPT0KICAgIGJueiBvcHRJbl9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJySXBtYSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcG1hCgpvcHRJbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk4CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NS0yMDAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTUtMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwOAogICAgLy8gaWYgKGNvdW50ID4gMCAmJiBlc2Nyb3cubmFtZSAhPT0gJycpIHsKICAgIGJueiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBleHRyYWN0IDIgMAogICAgcHVzaGJ5dGVzICIiCiAgICAhPQogICAgYnogb3B0SW5fYWZ0ZXJfaWZfZWxzZUA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIxNgogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgMjEgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBjb3ZlciAyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg3CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA3CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OAogICAgLy8gY29uc3QgeyBpZCB9ID0gdGhpcy5nZXRFc2Nyb3coZXNjcm93Lm5hbWUpCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBleHRyYWN0IDIgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjQKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgaW50Y18xIC8vIDEKICAgIGl0b2IKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICBwdXNoYnl0ZXMgMHgwMDAxMDAwMgogICAgc3dhcAogICAgY29uY2F0CiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjYyLTY1CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBhYmlDYWxsPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfZ2V0RXNjcm93cz4oewogICAgLy8gICBhcHBJZCwKICAgIC8vICAgYXJnczogW1tuYW1lXV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZVswXQogICAgcHVzaGJ5dGVzIDB4M2FiMjg5NWIgLy8gbWV0aG9kICJhcmM1OF9nZXRFc2Nyb3dzKHN0cmluZ1tdKSh1aW50NjQsYWRkcmVzcyxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDQxCiAgICAqCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgZXJyRXNjcm93RG9lc05vdEV4aXN0KQogICAgZXh0cmFjdCA2IDQxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxMgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyTmVzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZXNjCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OQogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBlcnJXcm9uZ0VzY3Jvd0Zvck9wZXJhdGlvbikKICAgIGRpZyA2CiAgICBpbnRjXzMgLy8gMgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6ZXJyV2VzYyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJXZXNjCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MS0xMDAKICAgIC8vIGl0eG5Db21wb3NlLmJlZ2luPHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfcmVrZXlUb1BsdWdpbj4oewogICAgLy8gICBhcHBJZDogd2FsbGV0LAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgICAgQ2FsbGVyVHlwZUdsb2JhbCwKICAgIC8vICAgICBlc2Nyb3cubmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICB1bmNvdmVyIDQKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5OAogICAgLy8gW10KICAgIGJ5dGVjIDIyIC8vIDB4MDAwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjkxLTEwMAogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDMKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDQKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIHN3YXAKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBkaWcgNQogICAgZHVwCiAgICBjb3ZlciAzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTA4CiAgICAvLyBjb25zdCBtYnJBbW91bnQ6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIG9wdEluQ291bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwLTEyMQogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTcKICAgIC8vIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBzd2FwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE2LTExOQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTAtMTIxCiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMwogICAgLy8gd2FsbGV0LAogICAgZGlnIDEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNQogICAgLy8gW2Fzc2V0LmlkXSwKICAgIHN3YXAKICAgIGl0b2IKICAgIHB1c2hieXRlcyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgdW5jb3ZlciAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExNAogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExMC0xMjEKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMwogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNQogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxODcKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIxNQogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBidXJ5IDEKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMTUKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMyAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo4OTEKICAgIC8vIHJldHVybiBlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSA/IDAgOiAxCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgIQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE2CiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCkKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgKwogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjEzCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIGl0b2IKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTEKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2IC8vICJFUlI6ZXJyTmRhbyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOZGFvCgp1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgaW50Y18zIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBlcnJOb3RBa2l0YURhbykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE5CiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyA0IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM4CiAgICAvLyBjb25zdCBbcGx1Z2luc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czozOAogICAgLy8gY29uc3QgW3BsdWdpbnNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyMSAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjM5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBkZWNvZGVBcmM0PFBsdWdpbkFwcExpc3Q+KHBsdWdpbnMpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo0MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5jYWxsZXJBcHBsaWNhdGlvbklkID09PSB1cGRhdGVQbHVnaW4sIGVyckludmFsaWRVcGdyYWRlKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjplcnJJdXBnIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl1cGcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNAogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgMTcgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6NDEKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MzUKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjYKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgZXJyTm90QWtpdGFEYW8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTkKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxOQogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjI2CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIGVyck5vdEFraXRhRGFvKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNiAvLyAiRVJSOmVyck5kYW8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTmRhbwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoyNQogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS52YWxpZGF0ZVJhZmZsZUNvbmZpZyhiaWRGZWU6IHVpbnQ2NCwgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0KSAtPiB2b2lkOgp2YWxpZGF0ZVJhZmZsZUNvbmZpZzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0OQogICAgLy8gcHJpdmF0ZSB2YWxpZGF0ZVJhZmZsZUNvbmZpZyhiaWRGZWU6IHVpbnQ2NCwgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MAogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGZyYW1lX2RpZyAtMwogICAgYnogdmFsaWRhdGVSYWZmbGVDb25maWdfZWxzZV9ib2R5QDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHN0YXJ0aW5nQmlkID4gMCwgZXJyU3RhcnRpbmdCaWRSZXF1aXJlZCkKICAgIGZyYW1lX2RpZyAtMgogICAgYm56IHZhbGlkYXRlUmFmZmxlQ29uZmlnX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJTYnJxIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclNicnEKCnZhbGlkYXRlUmFmZmxlQ29uZmlnX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjUyCiAgICAvLyBsb2dnZWRBc3NlcnQod2VpZ2h0c0xpc3RDb3VudCA+IDAsIGVyckZlZUF1Y3Rpb25OZWVkc1dlaWdodHMpCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiB2YWxpZGF0ZVJhZmZsZUNvbmZpZ19hZnRlcl9pZl9lbHNlQDkKICAgIHB1c2hieXRlcyAiRVJSOmVyckZhbnciCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyRmFudwoKdmFsaWRhdGVSYWZmbGVDb25maWdfYWZ0ZXJfaWZfZWxzZUA5OgogICAgcmV0c3ViCgp2YWxpZGF0ZVJhZmZsZUNvbmZpZ19lbHNlX2JvZHlANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodHNMaXN0Q291bnQgPT09IDAsIGVycldlaWdodHNOZWVkQmlkRmVlKQogICAgZnJhbWVfZGlnIC0xCiAgICBieiB2YWxpZGF0ZVJhZmZsZUNvbmZpZ19hZnRlcl9pZl9lbHNlQDkKICAgIHB1c2hieXRlcyAiRVJSOmVyclduYmYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyV25iZgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3Rvcnkud2VpZ2h0c01icih3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKd2VpZ2h0c01icjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2MAogICAgLy8gcHJpdmF0ZSB3ZWlnaHRzTWJyKHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2MQogICAgLy8gcmV0dXJuIHdlaWdodHNMaXN0Q291bnQgPiAwID8gdGhpcy5tYnIoKS53ZWlnaHRzIDogMAogICAgZnJhbWVfZGlnIC0xCiAgICBieiB3ZWlnaHRzTWJyX3Rlcm5hcnlfZmFsc2VAMgogICAgcHVzaGludCAyOTAwCiAgICByZXRzdWIKCndlaWdodHNNYnJfdGVybmFyeV9mYWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjYxCiAgICAvLyByZXR1cm4gd2VpZ2h0c0xpc3RDb3VudCA+IDAgPyB0aGlzLm1icigpLndlaWdodHMgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5jcmVhdGlvbkZlZSgpIC0+IHVpbnQ2NDoKY3JlYXRpb25GZWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjkKICAgIC8vIHJldHVybiBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25DcmVhdGlvbkZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2OQogICAgLy8gcmV0dXJuIGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNyZWF0aW9uRmVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyNTUKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBwdXNoYnl0ZXMgIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjY5CiAgICAvLyByZXR1cm4gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ3JlYXRpb25GZWUKICAgIHB1c2hpbnQgNDgKICAgIGV4dHJhY3RfdWludDY0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5LnBheUNyZWF0aW9uRmVlKGZlZTogdWludDY0KSAtPiB2b2lkOgpwYXlDcmVhdGlvbkZlZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3MwogICAgLy8gcHJpdmF0ZSBwYXlDcmVhdGlvbkZlZShmZWU6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzQKICAgIC8vIGlmIChmZWUgPiAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHBheUNyZWF0aW9uRmVlX2FmdGVyX2lmX2Vsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjc1LTgwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzMgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3NwogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzUtNzkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogZmVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjc1LTgwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKcGF5Q3JlYXRpb25GZWVfYWZ0ZXJfaWZfZWxzZUAzOgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5sZWdhY3lTZWxsZXJSZWZlcnJlcigpIC0+IGJ5dGVzOgpsZWdhY3lTZWxsZXJSZWZlcnJlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo5MAogICAgLy8gcHJpdmF0ZSBsZWdhY3lTZWxsZXJSZWZlcnJlcigpOiBBY2NvdW50IHsKICAgIHByb3RvIDAgMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo5MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3JaZXJvQWRkcmVzcyhsZWdhY3lXYWxsZXRPZih0aGlzLmFraXRhREFPLnZhbHVlLCBUeG4uc2VuZGVyKSkKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjkxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjIxCiAgICAvLyBjb25zdCBbb3RoZXJBcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzT3RoZXJBcHBMaXN0KSkKICAgIGRpZyAxCiAgICBwdXNoYnl0ZXMgIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjI2CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIwNgogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyA1IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBwdXNoaW50IDg4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozODgtMzkxCiAgICAvLyBjb25zdCBkYXRhID0gYWJpQ2FsbDx0eXBlb2YgRXNjcm93RmFjdG9yeS5wcm90b3R5cGUuZ2V0Pih7CiAgICAvLyAgIGFwcElkOiBlc2Nyb3dGYWN0b3J5LAogICAgLy8gICBhcmdzOiBbYWRkcmVzc10KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjXzIgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBpbnRjXzMgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBieXRlcwogICAgZXh0cmFjdCA2IDAKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTMKICAgIC8vIGlmIChCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pZl9lbHNlQDMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTQKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpsZWdhY3lXYWxsZXRJREA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzYKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzI5CiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGRpZyAxCiAgICBibnogbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaWZfZWxzZUA4CiAgICBidXJ5IDEKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjkxCiAgICAvLyByZXR1cm4gcmVmZXJyZXJPclplcm9BZGRyZXNzKGxlZ2FjeVdhbGxldE9mKHRoaXMuYWtpdGFEQU8udmFsdWUsIFR4bi5zZW5kZXIpKQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lmX2Vsc2VAODoKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTIKICAgIC8vIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgYnl0ZWMgMTUgLy8gInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozNTAtMzUzCiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozMzYKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBiIGxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmVmZXJyZXJPckA5CgpsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM5NwogICAgLy8gY29uc3Qgd2FsbGV0ID0gYnRvaShkYXRhKQogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2NAogICAgLy8gaWYgKHdhbGxldCA9PT0gMCB8fCB3YWxsZXRGYWN0b3J5ID09PSAwKSB7CiAgICBieiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9pZl9ib2R5QDEyCiAgICBmcmFtZV9kaWcgMQogICAgYm56IGxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lmX2Vsc2VAMTMKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2lmX2JvZHlAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2NQogICAgLy8gcmV0dXJuIGZhbHNlCiAgICBpbnRjXzAgLy8gMAoKbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjppc0FraXRhV2FsbGV0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM4MAogICAgLy8gcmV0dXJuIEFwcGxpY2F0aW9uKGxlZ2FjeVdhbGxldElEKGdldEVzY3Jvd0ZhY3RvcnkoYWtpdGFEQU8pLCBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLndhbGxldCwgYWRkcmVzcykpCiAgICBiIGxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6bGVnYWN5V2FsbGV0SURANAoKbGVnYWN5U2VsbGVyUmVmZXJyZXJfYWZ0ZXJfaWZfZWxzZUAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY3CiAgICAvLyBjb25zdCBbY3JlYXRvciwgZXhpc3RzXSA9IG9wLkFwcFBhcmFtcy5hcHBDcmVhdG9yKHdhbGxldCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgc3dhcAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM2OAogICAgLy8gcmV0dXJuIGV4aXN0cyAmJiBjcmVhdG9yID09PSBhcHBBZGRyZXNzKHdhbGxldEZhY3RvcnkpCiAgICBieiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9ib29sX2ZhbHNlQDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjM1OQogICAgLy8gcmV0dXJuIEFjY291bnQob3Auc2hhNTEyXzI1NihCeXRlcygnYXBwSUQnKS5jb25jYXQoaXRvYihhcHBJZCkpKSkKICAgIGZyYW1lX2RpZyAxCiAgICBpdG9iCiAgICBieXRlYyAxNiAvLyAiYXBwSUQiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHNoYTUxMl8yNTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MzY4CiAgICAvLyByZXR1cm4gZXhpc3RzICYmIGNyZWF0b3IgPT09IGFwcEFkZHJlc3Mod2FsbGV0RmFjdG9yeSkKICAgIGZyYW1lX2RpZyAwCiAgICA9PQogICAgYnogbGVnYWN5U2VsbGVyUmVmZXJyZXJfYm9vbF9mYWxzZUAxNgogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Mzk4CiAgICAvLyByZXR1cm4gaXNBa2l0YVdhbGxldCh3YWxsZXQsIHdhbGxldEZhY3RvcnkpID8gd2FsbGV0IDogMAogICAgYiBsZWdhY3lTZWxsZXJSZWZlcnJlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmlzQWtpdGFXYWxsZXRAMTgKCmxlZ2FjeVNlbGxlclJlZmVycmVyX2Jvb2xfZmFsc2VAMTY6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czozOTgKICAgIC8vIHJldHVybiBpc0FraXRhV2FsbGV0KHdhbGxldCwgd2FsbGV0RmFjdG9yeSkgPyB3YWxsZXQgOiAwCiAgICBiIGxlZ2FjeVNlbGxlclJlZmVycmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6aXNBa2l0YVdhbGxldEAxOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkubmV3QXVjdGlvbkltcGwocGF5bWVudDogdWludDY0LCBhc3NldFhmZXI6IHVpbnQ2NCwgbmFtZTogYnl0ZXMsIHByb29mOiBieXRlcywgYmlkQXNzZXRJRDogdWludDY0LCBiaWRGZWU6IHVpbnQ2NCwgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsIGVuZFRpbWVzdGFtcDogdWludDY0LCBnYXRlSUQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzLCB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsIHNlbGxlclJlZmVycmVyOiBieXRlcykgLT4gdWludDY0LCBieXRlczoKbmV3QXVjdGlvbkltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTQtMTA5CiAgICAvLyBwcml2YXRlIG5ld0F1Y3Rpb25JbXBsKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBuYW1lOiBzdHJpbmcsCiAgICAvLyAgIHByb29mOiBQcm9vZiwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQsCiAgICAvLyAgIHNlbGxlclJlZmVycmVyOiBBY2NvdW50CiAgICAvLyApOiB1aW50NjQgewogICAgcHJvdG8gMTQgMgogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjExMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGJpZE1pbmltdW1JbmNyZWFzZSA+IDAsIGVyckJpZHNNdXN0QWx3YXlzSW5jcmVhc2UpCiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMgogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJCaW5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJpbmMKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjExMQogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICsgMzAwLCBlcnJFbmRNdXN0QmVBdGxlYXN0Rml2ZU1pbnV0ZXNBZnRlclN0YXJ0KQogICAgZnJhbWVfZGlnIC02CiAgICBwdXNoaW50IDMwMAogICAgKwogICAgZnJhbWVfZGlnIC01CiAgICA8CiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDQKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyRW1mbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJFbWZtCgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTEyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRANgogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTEzCiAgICAvLyB0aGlzLnZhbGlkYXRlUmFmZmxlQ29uZmlnKGJpZEZlZSwgc3RhcnRpbmdCaWQsIHdlaWdodHNMaXN0Q291bnQpCiAgICBmcmFtZV9kaWcgLTkKICAgIGZyYW1lX2RpZyAtOAogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHZhbGlkYXRlUmFmZmxlQ29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyBjb25zdCBpc0FsZ29CaWQgPSBiaWRBc3NldElEID09PSAwCiAgICBmcmFtZV9kaWcgLTEwCiAgICAhCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE3CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNBbGdvQmlkIHx8IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChiaWRBc3NldElEKSksIGVyck5vdE9wdGVkSW4pCiAgICBmcmFtZV9kaWcgLTEwCiAgICBieiBuZXdBdWN0aW9uSW1wbF9ib29sX3RydWVAOAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2RpZyAtMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBuZXdBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDkKCm5ld0F1Y3Rpb25JbXBsX2Jvb2xfdHJ1ZUA4OgogICAgaW50Y18xIC8vIDEKCm5ld0F1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE3CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNBbGdvQmlkIHx8IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChiaWRBc3NldElEKSksIGVyck5vdE9wdGVkSW4pCiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDEyCiAgICBieXRlYyAyNSAvLyAiRVJSOmVyck5vcHQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyTm9wdAoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjExOQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc0FsZ29CaWQgPyAxIDogMikKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18zIC8vIDIKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDMKICAgIHNlbGVjdAogICAgKgogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI3CiAgICAvLyBsZXQgZGlzYnVyc2VtZW50TUJSOiB1aW50NjQgPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LmlkKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjcKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0xMwogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjcKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICArCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI4CiAgICAvLyBpZiAoaXNBbGdvQmlkKSB7CiAgICBmcmFtZV9kaWcgLTEwCiAgICBibnogbmV3QXVjdGlvbkltcGxfZWxzZV9ib2R5QDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI5CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNzk4MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjkKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCiAgICBzd2FwCgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzNAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyB0aGlzLndlaWdodHNNYnIod2VpZ2h0c0xpc3RDb3VudCkgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgKwogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHdlaWdodHNNYnIKICAgICsKICAgIGRpZyAyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTM2CiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpICsKICAgIHB1c2hpbnQgNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OTUKICAgIC8vIHJldHVybiBwcm9ncmFtUGFnZXNNYnIodGhpcy5jaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplKSkKICAgIGNhbGxzdWIgY2hpbGRFeHRyYVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDkKICAgIC8vIHJldHVybiBNSU5fUFJPR1JBTV9QQUdFUyAqICgxICsgZXh0cmFQYWdlcykKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBpbnRjIDUgLy8gMTAwMDAwCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTM2LTEzOAogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgaW50YyA2IC8vIDEyMTI1MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzYtMTM5CiAgICAvLyB0aGlzLmNoaWxkUGFnZXNNYnIoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBhdWN0aW9uLmdsb2JhbEJ5dGVzKSArCiAgICAvLyBjaGlsZEFwcE1CUgogICAgKwogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0MwogICAgLy8gY29uc3QgY3JlYXRpb25GZWUgPSB0aGlzLmNyZWF0aW9uRmVlKCkKICAgIGNhbGxzdWIgY3JlYXRpb25GZWUKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNDQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTE0CiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDE3CiAgICBieXRlYyA5IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ1CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IHRvdGFsTUJSICsgY3JlYXRpb25GZWUsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xNAogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgNAogICAgZGlnIDQKICAgICsKICAgID09CiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDE5CiAgICBieXRlYyA5IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLnNlbmRlciA9PT0gVHhuLnNlbmRlciwgZXJySW52YWxpZFRyYW5zZmVyKQogICAgZnJhbWVfZGlnIC0xMwogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyMQogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTAKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0LmlkICE9PSBiaWRBc3NldElELCBlcnJQcml6ZUlzQmlkQXNzZXQpCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtMTAKICAgICE9CiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDIzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQaWJhIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBpYmEKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTEKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRUcmFuc2ZlcikKICAgIGZyYW1lX2RpZyAtMTMKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgMTIgLy8gIkVSUjplcnJJeGZyIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckl4ZnIKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTIKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBlcnJJbnZhbGlkVHJhbnNmZXIpCiAgICBmcmFtZV9kaWcgLTEzCiAgICBndHhucyBBc3NldEFtb3VudAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDI3CiAgICBieXRlYyAxMiAvLyAiRVJSOmVyckl4ZnIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXhmcgoKbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE1NAogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5jbGF3YmFjayA9PT0gR2xvYmFsLnplcm9BZGRyZXNzICYmIGFzc2V0WGZlci54ZmVyQXNzZXQuZnJlZXplID09PSBHbG9iYWwuemVyb0FkZHJlc3MsCiAgICBkdXAKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDbGF3YmFjawogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYnogbmV3QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAzMAogICAgZHVwCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0RnJlZXplCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgID09CiAgICBieiBuZXdBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDMwCiAgICBpbnRjXzEgLy8gMQoKbmV3QXVjdGlvbkltcGxfYm9vbF9tZXJnZUAzMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTMtMTU2CiAgICAvLyBsb2dnZWRBc3NlcnQoCiAgICAvLyAgIGFzc2V0WGZlci54ZmVyQXNzZXQuY2xhd2JhY2sgPT09IEdsb2JhbC56ZXJvQWRkcmVzcyAmJiBhc3NldFhmZXIueGZlckFzc2V0LmZyZWV6ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLAogICAgLy8gICBlcnJQcml6ZVNlaXphYmxlCiAgICAvLyApCiAgICBibnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDMzCiAgICBwdXNoYnl0ZXMgIkVSUjplcnJQc3piIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyclBzemIKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTgKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTgKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBmcmFtZV9kaWcgLTEyCiAgICBmcmFtZV9kaWcgLTExCiAgICBjYWxsc3ViIHJveWFsdGllcwogICAgZnJhbWVfYnVyeSAtMTEKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjAKICAgIC8vIHRoaXMucGF5Q3JlYXRpb25GZWUoY3JlYXRpb25GZWUpCiAgICB1bmNvdmVyIDMKICAgIGNhbGxzdWIgcGF5Q3JlYXRpb25GZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjMtMTkyCiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKQogICAgLy8gICB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2NgogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2OAogICAgLy8gYmlkQXNzZXRJRCwKICAgIGZyYW1lX2RpZyAtMTAKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMwogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY5CiAgICAvLyBiaWRGZWUsCiAgICBmcmFtZV9kaWcgLTkKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzAKICAgIC8vIHN0YXJ0aW5nQmlkLAogICAgZnJhbWVfZGlnIC04CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTcxCiAgICAvLyBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICBmcmFtZV9kaWcgLTcKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzIKICAgIC8vIHN0YXJ0VGltZXN0YW1wLAogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTczCiAgICAvLyBlbmRUaW1lc3RhbXAsCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzQKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIGZyYW1lX2RpZyAtMTQKICAgIGd0eG5zIFNlbmRlcgogICAgdW5jb3ZlciAxMQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTc1CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3NgogICAgLy8gY3JlYXRvclJveWFsdHksCiAgICB1bmNvdmVyIDEwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTc3CiAgICAvLyBnYXRlSUQsCiAgICBmcmFtZV9kaWcgLTQKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzkKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA4IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3OQogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE4MAogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvdXBncmFkZWFibGUudHM6MTYKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgwCiAgICAvLyB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18zIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgwCiAgICAvLyB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIGl0b2IKICAgIGJ5dGVjIDI2IC8vIDB4MDAwYQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxODAtMTgxCiAgICAvLyB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gc2VsbGVyUmVmZXJyZXIsCiAgICBieXRlYyAyNyAvLyAweDAwMjIKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxODUKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTg2CiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIGludGNfMSAvLyAxCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE4NwogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICBpbnRjXzMgLy8gMgogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxODgKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgcHVzaGludCAzCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE5MQogICAgLy8gZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKQogICAgcHVzaGludCA0CiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBwdXNoaW50IDEwCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyNQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTYzLTE5MgogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBFeHRyYVByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBieXRlYyAyOCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTYzLTE5MgogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGJ5dGVjIDI5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLCh1aW50NjQsKHN0cmluZyx1aW50NjQpKSxhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2NwogICAgLy8gZmFsc2UsCiAgICBieXRlYyAxMCAvLyAweDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjMtMTkyCiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKQogICAgLy8gICB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjMtMTk0CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKQogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBjb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTk3LTIwMgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE5OQogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwMAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIHVuY292ZXIgNgogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxOTctMjAxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxOTctMjAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwNS0yMTQKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjA5CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjEwCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwOC0yMTEKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDUtMjE0CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMyAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTctMjIzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE5CiAgICAvLyBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTctMjIyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE3LTIyMwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMjUKICAgIC8vIGlmICghaXNBbGdvQmlkKSB7CiAgICBmcmFtZV9kaWcgLTEwCiAgICBieiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjI3LTIzNgogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzEKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBkdXBuIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMzIKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjMwLTIzMwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyNy0yMzYKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMyAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpuZXdBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQ0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0MAogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogbmV3QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUA0OAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0MgogICAgLy8gY29uc3Qgd2VpZ2h0c01CUjogdWludDY0ID0gdGhpcy53ZWlnaHRzTWJyKHdlaWdodHNMaXN0Q291bnQpCiAgICBmcmFtZV9kaWcgLTIKICAgIGNhbGxzdWIgd2VpZ2h0c01icgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0My0yNTIKICAgIC8vIGF1Y3Rpb24uY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAuaWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0NwogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0Ni0yNDkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IHdlaWdodHNNQlIKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0My0yNTIKICAgIC8vIGF1Y3Rpb24uY2FsbC5pbml0KHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAuaWQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IHdlaWdodHNNQlIKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB3ZWlnaHRzTGlzdENvdW50LAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjUwCiAgICAvLyB3ZWlnaHRzTGlzdENvdW50LAogICAgZnJhbWVfZGlnIC0yCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQzLTI1MgogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMzAgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld0F1Y3Rpb25JbXBsX2FmdGVyX2lmX2Vsc2VANDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjU1CiAgICAvLyByZXR1cm4gYXVjdGlvbkFwcC5pZAogICAgZnJhbWVfZGlnIC0xMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKbmV3QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAzMDoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld0F1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VAMzEKCm5ld0F1Y3Rpb25JbXBsX2Vsc2VfYm9keUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzEKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzEKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGZyYW1lX2RpZyAtMTAKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo3MzIKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDkgLy8gMzk5MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTMxCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgICsKICAgIHVuY292ZXIgMgogICAgKwogICAgc3dhcAogICAgYiBuZXdBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDE1CgpuZXdBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDk6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdBdWN0aW9uSW1wbF9ib29sX21lcmdlQDEwCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5uZXdQcml6ZUJveEF1Y3Rpb25JbXBsKHByaXplQm94VHJhbnNmZXJUeG46IHVpbnQ2NCwgcGF5bWVudDogdWludDY0LCBiaWRBc3NldElEOiB1aW50NjQsIGJpZEZlZTogdWludDY0LCBzdGFydGluZ0JpZDogdWludDY0LCBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwgZW5kVGltZXN0YW1wOiB1aW50NjQsIGdhdGVJRDogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMsIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwgc2VsbGVyUmVmZXJyZXI6IGJ5dGVzKSAtPiB1aW50NjQ6Cm5ld1ByaXplQm94QXVjdGlvbkltcGw6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzU3LTM3MAogICAgLy8gcHJpdmF0ZSBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NCwKICAgIC8vICAgc2VsbGVyUmVmZXJyZXI6IEFjY291bnQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBwcm90byAxMiAxCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzczCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIGZyYW1lX2RpZyAtMTIKICAgIGd0eG5zYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgYnl0ZWMgMzEgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3My0zNzQKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzQKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGZyYW1lX2RpZyAtMTIKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3My0zNzQKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAzCiAgICBpbnRjXzEgLy8gMQoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9ib29sX21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzcyLTM3NQogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICksIGVyckJhZE1ldGhvZFByaXplQm94VHJhbnNmZXJOZWVkZWQpCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRANgogICAgcHVzaGJ5dGVzICJFUlI6ZXJyQm1wdCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJCbXB0CgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NgogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBlcnJOb3RQcml6ZUJveE93bmVyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzYKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEyCiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzEKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBlcnJOb3RBUHJpemVCb3gpCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjA2CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDUgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjcxCiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgZXJyTm90QVByaXplQm94KQogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gZXJyTmFwYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2NzIKICAgIC8vIGNvbnN0IFtvd25lckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHByaXplQm94LCBCeXRlcyhQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIpKQogICAgcHVzaGJ5dGVzICJvd25lciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzYKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgZXJyTm90UHJpemVCb3hPd25lcikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDgKICAgIGJ5dGVjIDExIC8vICJFUlI6ZXJyTnBibyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJOcGJvCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KGJpZE1pbmltdW1JbmNyZWFzZSA+IDAsIGVyckJpZHNNdXN0QWx3YXlzSW5jcmVhc2UpCiAgICBmcmFtZV9kaWcgLTcKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAxMAogICAgYnl0ZWMgMjMgLy8gIkVSUjplcnJCaW5jIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyckJpbmMKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3OAogICAgLy8gbG9nZ2VkQXNzZXJ0KGVuZFRpbWVzdGFtcCA+IHN0YXJ0VGltZXN0YW1wICsgMzAwLCBlcnJFbmRNdXN0QmVBdGxlYXN0Rml2ZU1pbnV0ZXNBZnRlclN0YXJ0KQogICAgZnJhbWVfZGlnIC02CiAgICBwdXNoaW50IDMwMAogICAgKwogICAgZnJhbWVfZGlnIC01CiAgICA8CiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDI0IC8vICJFUlI6ZXJyRW1mbSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJFbWZtCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY2CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgZXJyQ29udHJhY3ROb3RTZXQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNyAvLyAiRVJSOmVyckNuc3QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJyQ25zdAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzgwCiAgICAvLyB0aGlzLnZhbGlkYXRlUmFmZmxlQ29uZmlnKGJpZEZlZSwgc3RhcnRpbmdCaWQsIHdlaWdodHNMaXN0Q291bnQpCiAgICBmcmFtZV9kaWcgLTkKICAgIGZyYW1lX2RpZyAtOAogICAgZnJhbWVfZGlnIC0yCiAgICBjYWxsc3ViIHZhbGlkYXRlUmFmZmxlQ29uZmlnCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzg0CiAgICAvLyBsb2dnZWRBc3NlcnQoaXNBbGdvQmlkIHx8IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLmlzT3B0ZWRJbihBc3NldChiaWRBc3NldElEKSksIGVyck5vdE9wdGVkSW4pCiAgICBmcmFtZV9kaWcgLTEwCiAgICBieiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfdHJ1ZUAxNgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGZyYW1lX2RpZyAtMTAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfZmFsc2VAMTcKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF90cnVlQDE2OgogICAgaW50Y18xIC8vIDEKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9tZXJnZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODQKICAgIC8vIGxvZ2dlZEFzc2VydChpc0FsZ29CaWQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGJpZEFzc2V0SUQpKSwgZXJyTm90T3B0ZWRJbikKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyMAogICAgYnl0ZWMgMjUgLy8gIkVSUjplcnJOb3B0IgogICAgbG9nCiAgICBlcnIgLy8gRVJSOmVyck5vcHQKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4NQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb0JpZCA/IDAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAtMTAKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX3Rlcm5hcnlfZmFsc2VAMjIKICAgIGludGNfMCAvLyAwCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX3Rlcm5hcnlfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzk0CiAgICAvLyBpZiAoaXNBbGdvQmlkKSB7CiAgICBmcmFtZV9kaWcgLTEwCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9lbHNlX2JvZHlAMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDc5ODAwCiAgICBzd2FwCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2lmX2Vsc2VAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDAwCiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArIHRoaXMud2VpZ2h0c01icih3ZWlnaHRzTGlzdENvdW50KSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgICsKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiB3ZWlnaHRzTWJyCiAgICArCiAgICBkaWcgMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQwMgogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICBwdXNoaW50IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjk1CiAgICAvLyByZXR1cm4gcHJvZ3JhbVBhZ2VzTWJyKHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGNsZWFyU2l6ZSkpCiAgICBjYWxsc3ViIGNoaWxkRXh0cmFQYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ5CiAgICAvLyByZXR1cm4gTUlOX1BST0dSQU1fUEFHRVMgKiAoMSArIGV4dHJhUGFnZXMpCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaW50YyA1IC8vIDEwMDAwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQwMi00MDQKICAgIC8vIHRoaXMuY2hpbGRQYWdlc01icihhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNiAvLyAxMjEyNTAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDAyLTQwNQogICAgLy8gdGhpcy5jaGlsZFBhZ2VzTWJyKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MDkKICAgIC8vIGNvbnN0IGNyZWF0aW9uRmVlID0gdGhpcy5jcmVhdGlvbkZlZSgpCiAgICBjYWxsc3ViIGNyZWF0aW9uRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDEwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIGVyckludmFsaWRQYXltZW50KQogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfYXNzZXJ0QDI4CiAgICBieXRlYyA5IC8vICJFUlI6ZXJySXBheSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJJcGF5CgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAyODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MTEKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdG90YWxNQlIgKyBjcmVhdGlvbkZlZSwgZXJySW52YWxpZFBheW1lbnQpCiAgICBmcmFtZV9kaWcgLTExCiAgICBndHhucyBBbW91bnQKICAgIGRpZyAyCiAgICBkaWcgMgogICAgKwogICAgPT0KICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2FmdGVyX2Fzc2VydEAzMAogICAgYnl0ZWMgOSAvLyAiRVJSOmVycklwYXkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6ZXJySXBheQoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9hc3NlcnRAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDEzCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBBc3NldCgwKSwgJycsIFtdKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy91cGdyYWRlYWJsZS50czoxNgogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MTMKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFzc2V0KDApLCAnJywgW10pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgYnl0ZWMgMjIgLy8gMHgwMDAwCiAgICBjYWxsc3ViIHJveWFsdGllcwogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDE1CiAgICAvLyB0aGlzLnBheUNyZWF0aW9uRmVlKGNyZWF0aW9uRmVlKQogICAgc3dhcAogICAgY2FsbHN1YiBwYXlDcmVhdGlvbkZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxOC00NDcKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjEKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDIzCiAgICAvLyBiaWRBc3NldElELAogICAgZnJhbWVfZGlnIC0xMAogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAzCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjQKICAgIC8vIGJpZEZlZSwKICAgIGZyYW1lX2RpZyAtOQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyNQogICAgLy8gc3RhcnRpbmdCaWQsCiAgICBmcmFtZV9kaWcgLTgKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjYKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIGZyYW1lX2RpZyAtNwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyNwogICAgLy8gc3RhcnRUaW1lc3RhbXAsCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MjgKICAgIC8vIGVuZFRpbWVzdGFtcCwKICAgIGZyYW1lX2RpZyAtNQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyOQogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgZnJhbWVfZGlnIC0xMQogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDEwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MzAKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDMxCiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIHVuY292ZXIgOAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQzMgogICAgLy8gZ2F0ZUlELAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDM0CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYyCiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgOCAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MzQKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MzUKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQzNQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQzNQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlYyAyNiAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDM1LTQzNgogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vIHNlbGxlclJlZmVycmVyLAogICAgYnl0ZWMgMjcgLy8gMHgwMDIyCiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDQwCiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGNoaWxkQXBwcm92YWxDaHVuawogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ0MQogICAgLy8gdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICBpbnRjXzEgLy8gMQogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NDIKICAgIC8vIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgaW50Y18zIC8vIDIKICAgIGNhbGxzdWIgY2hpbGRBcHByb3ZhbENodW5rCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDQzCiAgICAvLyB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIHB1c2hpbnQgMwogICAgY2FsbHN1YiBjaGlsZEFwcHJvdmFsQ2h1bmsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NDYKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIHB1c2hpbnQgNAogICAgY2FsbHN1YiBjaGlsZEV4dHJhUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODcKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgcHVzaGludCAxMAogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMjUKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxOC00NDcKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBFeHRyYVByb2dyYW1QYWdlcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4NwogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBieXRlYyAyOCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDE4LTQ0NwogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICAgIHNlbGxlclJlZmVycmVyLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgLy8gQm94ZWQgYXBwcm92YWwgcHJvZ3JhbSBpbiB1cCB0byBmb3VyIDQgS0IgY2h1bmtzIChBVk0gMTM6IHVwIHRvIDE2IEtCKS4KICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFsKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDApLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMSksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygyKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDMpLAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IHRoaXMuY2hpbGRFeHRyYVBhZ2VzKGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0ubGVuZ3RoKQogICAgLy8gICB9KQogICAgYnl0ZWMgMjkgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsKHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpLGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDExCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQyMgogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgdW5jb3ZlciAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MTgtNDQ3CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgICAgc2VsbGVyUmVmZXJyZXIsCiAgICAvLyAgICAgXSwKICAgIC8vICAgICAvLyBCb3hlZCBhcHByb3ZhbCBwcm9ncmFtIGluIHVwIHRvIGZvdXIgNCBLQiBjaHVua3MgKEFWTSAxMzogdXAgdG8gMTYgS0IpLgogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogWwogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMCksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygxKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDIpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMyksCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogdGhpcy5jaGlsZEV4dHJhUGFnZXMoYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbS5sZW5ndGgpCiAgICAvLyAgIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQxOC00NDkKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgICBzZWxsZXJSZWZlcnJlciwKICAgIC8vICAgICBdLAogICAgLy8gICAgIC8vIEJveGVkIGFwcHJvdmFsIHByb2dyYW0gaW4gdXAgdG8gZm91ciA0IEtCIGNodW5rcyAoQVZNIDEzOiB1cCB0byAxNiBLQikuCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygwKSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRBcHByb3ZhbENodW5rKDEpLAogICAgLy8gICAgICAgdGhpcy5jaGlsZEFwcHJvdmFsQ2h1bmsoMiksCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQXBwcm92YWxDaHVuaygzKSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiB0aGlzLmNoaWxkRXh0cmFQYWdlcyhhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLmxlbmd0aCkKICAgIC8vICAgfSkKICAgIC8vICAgLml0eG4KICAgIC8vICAgLmNyZWF0ZWRBcHAKICAgIGdpdHhuIDAgQ3JlYXRlZEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ1MS00NTQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDUzCiAgICAvLyBhcmdzOiBbYXVjdGlvbkFwcC5hZGRyZXNzXQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ1MS00NTQKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIC8vIH0pCiAgICBieXRlYyAzMSAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NTctNDYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDU5CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2MAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIHVuY292ZXIgMwogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NTctNDYxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NTctNDYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2NAogICAgLy8gaWYgKCFpc0FsZ29CaWQpIHsKICAgIGZyYW1lX2RpZyAtMTAKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUAzNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2Ni00NzUKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDcwCiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwbiAyCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDcxCiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ2OS00NzIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NjYtNDc1CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBiaWRBc3NldElELAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDM3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ3OQogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGZyYW1lX2RpZyAtOQogICAgYnogbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDgwCiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSB0aGlzLndlaWdodHNNYnIod2VpZ2h0c0xpc3RDb3VudCkKICAgIGZyYW1lX2RpZyAtMgogICAgY2FsbHN1YiB3ZWlnaHRzTWJyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDgxLTQ5MAogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDg1CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIGRpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDg0LTQ4NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDgxLTQ5MAogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0ODgKICAgIC8vIHdlaWdodHNMaXN0Q291bnQsCiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0ODEtNDkwCiAgICAvLyBhdWN0aW9uLmNhbGwuaW5pdCh7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLmlkLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihhdWN0aW9uQXBwLmlkKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiB3ZWlnaHRzTUJSCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgd2VpZ2h0c0xpc3RDb3VudCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAzMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9hZnRlcl9pZl9lbHNlQDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ5MwogICAgLy8gcmV0dXJuIGF1Y3Rpb25BcHAuaWQKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Vsc2VfYm9keUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozOTcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL3VwZ3JhZGVhYmxlLnRzOjE2CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM5NwogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEwCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NzMyCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyAxMCAvLyAzMTkyMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozOTcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiA9IGRpc2J1cnNlbWVudENvc3QoNCkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICBzd2FwCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbkltcGxfYWZ0ZXJfaWZfZWxzZUAyNgoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF90ZXJuYXJ5X2ZhbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4NQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb0JpZCA/IDAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX3Rlcm5hcnlfbWVyZ2VAMjMKCm5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9mYWxzZUAxNzoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbkltcGxfYm9vbF9tZXJnZUAxOAoKbmV3UHJpemVCb3hBdWN0aW9uSW1wbF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25JbXBsX2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuY2hpbGRBcHByb3ZhbENodW5rKGluZGV4OiB1aW50NjQpIC0+IGJ5dGVzOgpjaGlsZEFwcHJvdmFsQ2h1bms6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MQogICAgLy8gcHJvdGVjdGVkIGNoaWxkQXBwcm92YWxDaHVuayhpbmRleDogdWludDY0KTogYnl0ZXMgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjkyCiAgICAvLyBjb25zdCBzaXplID0gYm94ZWRQcm9ncmFtU2l6ZShib3hLZXkpCiAgICBjYWxsc3ViIGJveGVkUHJvZ3JhbVNpemUKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjkzCiAgICAvLyBjb25zdCBvZmZzZXQ6IHVpbnQ2NCA9IGluZGV4ICogTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSAogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjIDcgLy8gNDA5NgogICAgKgogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo5NAogICAgLy8gaWYgKG9mZnNldCA+PSBzaXplKSB7CiAgICA+PQogICAgYnogY2hpbGRBcHByb3ZhbENodW5rX2FmdGVyX2lmX2Vsc2VAMwogICAgcG9wbiAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTUKICAgIC8vIHJldHVybiBCeXRlcygnJykKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzIKICAgIC8vIHJldHVybiBib3hlZFByb2dyYW1DaHVuayhCeXRlcyhCb3hLZXlCb3hlZENvbnRyYWN0KSwgaW5kZXgpCiAgICByZXRzdWIKCmNoaWxkQXBwcm92YWxDaHVua19hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTcKICAgIC8vIGNvbnN0IHJlbWFpbmluZzogdWludDY0ID0gc2l6ZSAtIG9mZnNldAogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6OTgKICAgIC8vIHJldHVybiBvcC5Cb3guZXh0cmFjdChib3hLZXksIG9mZnNldCwgcmVtYWluaW5nID4gTUFYX0FWTV9CWVRFX0FSUkFZX0xFTkdUSCA/IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggOiByZW1haW5pbmcpCiAgICBkdXAKICAgIGludGMgNyAvLyA0MDk2CiAgICA+CiAgICBpbnRjIDcgLy8gNDA5NgogICAgc3dhcAogICAgc2VsZWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3MgogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbUNodW5rKEJ5dGVzKEJveEtleUJveGVkQ29udHJhY3QpLCBpbmRleCkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjk4CiAgICAvLyByZXR1cm4gb3AuQm94LmV4dHJhY3QoYm94S2V5LCBvZmZzZXQsIHJlbWFpbmluZyA+IE1BWF9BVk1fQllURV9BUlJBWV9MRU5HVEggPyBNQVhfQVZNX0JZVEVfQVJSQVlfTEVOR1RIIDogcmVtYWluaW5nKQogICAgY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcyCiAgICAvLyByZXR1cm4gYm94ZWRQcm9ncmFtQ2h1bmsoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCksIGluZGV4KQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5jaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplOiB1aW50NjQpIC0+IHVpbnQ2NDoKY2hpbGRFeHRyYVBhZ2VzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODQKICAgIC8vIHByb3RlY3RlZCBjaGlsZEV4dHJhUGFnZXMoY2xlYXJTaXplOiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo3NwogICAgLy8gcmV0dXJuIGJveGVkUHJvZ3JhbVNpemUoQnl0ZXMoQm94S2V5Qm94ZWRDb250cmFjdCkpCiAgICBieXRlY18xIC8vICJiYyIKICAgIGNhbGxzdWIgYm94ZWRQcm9ncmFtU2l6ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMyCiAgICAvLyBjb25zdCBwYWdlczogdWludDY0ID0gKGFwcHJvdmFsU2l6ZSArIGNsZWFyU2l6ZSArIFBST0dSQU1fUEFHRV9TSVpFIC0gMSkgLyBQUk9HUkFNX1BBR0VfU0laRQogICAgZnJhbWVfZGlnIC0xCiAgICArCiAgICBwdXNoaW50IDIwNDgKICAgICsKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBwdXNoaW50IDIwNDgKICAgIC8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjMzCiAgICAvLyBsb2dnZWRBc3NlcnQocGFnZXMgPD0gTUFYX1BST0dSQU1fVE9UQUxfUEFHRVMsIGVyclByb2dyYW1Ub29MYXJnZSkKICAgIGludGNfMiAvLyA4CiAgICA8PQogICAgYm56IGNoaWxkRXh0cmFQYWdlc19hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6ZXJyUHRsZyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjplcnJQdGxnCgpjaGlsZEV4dHJhUGFnZXNfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvcHJvZ3JhbXMudHM6NDMKICAgIC8vIGNvbnN0IGV4dHJhOiB1aW50NjQgPSBwYWdlcyA+IDAgPyBwYWdlcyAtIDEgOiAwCiAgICBkdXAKICAgIGJ6IGNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAtCgpjaGlsZEV4dHJhUGFnZXNfdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICBwdXNoaW50IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0NAogICAgLy8gcmV0dXJuIGV4dHJhID4gbWluRXh0cmFQYWdlcyA/IGV4dHJhIDogbWluRXh0cmFQYWdlcwogICAgPgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6ODUKICAgIC8vIHJldHVybiB0aGlzLmNoaWxkRXh0cmFQYWdlc0F0TGVhc3QoY2xlYXJTaXplLCBMRUdBQ1lfQ0hJTERfRVhUUkFfUFJPR1JBTV9QQUdFUykKICAgIHB1c2hpbnQgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3Byb2dyYW1zLnRzOjQ0CiAgICAvLyByZXR1cm4gZXh0cmEgPiBtaW5FeHRyYVBhZ2VzID8gZXh0cmEgOiBtaW5FeHRyYVBhZ2VzCiAgICBjb3ZlciAyCiAgICBzZWxlY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjg1CiAgICAvLyByZXR1cm4gdGhpcy5jaGlsZEV4dHJhUGFnZXNBdExlYXN0KGNsZWFyU2l6ZSwgTEVHQUNZX0NISUxEX0VYVFJBX1BST0dSQU1fUEFHRVMpCiAgICByZXRzdWIKCmNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X2ZhbHNlQDc6CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9wcm9ncmFtcy50czo0MwogICAgLy8gY29uc3QgZXh0cmE6IHVpbnQ2NCA9IHBhZ2VzID4gMCA/IHBhZ2VzIC0gMSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGNoaWxkRXh0cmFQYWdlc190ZXJuYXJ5X21lcmdlQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LnJlZnVuZFJlbGVhc2VkKHJlY2VpdmVyOiBieXRlcywgcmVjb3JkZWQ6IHVpbnQ2NCwgYmFsYW5jZUJlZm9yZTogdWludDY0LCBtaW5CZWZvcmU6IHVpbnQ2NCwgZm9yd2FyZGVkOiB1aW50NjQpIC0+IHVpbnQ2NDoKcmVmdW5kUmVsZWFzZWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMDItMTA4CiAgICAvLyBwcm90ZWN0ZWQgcmVmdW5kUmVsZWFzZWQoCiAgICAvLyAgIHJlY2VpdmVyOiBBY2NvdW50LAogICAgLy8gICByZWNvcmRlZDogdWludDY0LAogICAgLy8gICBiYWxhbmNlQmVmb3JlOiB1aW50NjQsCiAgICAvLyAgIG1pbkJlZm9yZTogdWludDY0LAogICAgLy8gICBmb3J3YXJkZWQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHByb3RvIDUgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGNvbnN0IHNlbGYgPSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIGNvbnN0IGdyb3NzOiB1aW50NjQgPSBzZWxmLmJhbGFuY2UgKyBmb3J3YXJkZWQKICAgIGFjY3RfcGFyYW1zX2dldCBBY2N0QmFsYW5jZQogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICBmcmFtZV9kaWcgLTEKICAgICsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTAKICAgIC8vIGNvbnN0IHJlY2VpdmVkOiB1aW50NjQgPSBncm9zcyA+IGJhbGFuY2VCZWZvcmUgPyBncm9zcyAtIGJhbGFuY2VCZWZvcmUgOiAwCiAgICBmcmFtZV9kaWcgLTMKICAgID4KICAgIGJ6IHJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfZmFsc2VANgogICAgZnJhbWVfZGlnIC0zCiAgICAtCgpyZWZ1bmRSZWxlYXNlZF90ZXJuYXJ5X21lcmdlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MQogICAgLy8gY29uc3QgbWluQWZ0ZXI6IHVpbnQ2NCA9IHNlbGYubWluQmFsYW5jZQogICAgc3dhcAogICAgYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCiAgICBzd2FwCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgYXNzZXJ0IC8vIGFjY291bnQgZnVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MgogICAgLy8gY29uc3QgcmVsZWFzZWQ6IHVpbnQ2NCA9IG1pbkJlZm9yZSA+IG1pbkFmdGVyID8gbWluQmVmb3JlIC0gbWluQWZ0ZXIgOiAwCiAgICBmcmFtZV9kaWcgLTIKICAgIDwKICAgIGJ6IHJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfZmFsc2VAOQogICAgZnJhbWVfZGlnIC0yCiAgICBzd2FwCiAgICAtCgpyZWZ1bmRSZWxlYXNlZF90ZXJuYXJ5X21lcmdlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGNvbnN0IHJlZnVuZDogdWludDY0ID0gcmVjZWl2ZWQgKyByZWxlYXNlZAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIHJldHVybiByZWZ1bmQgPiByZWNvcmRlZCA/IHJlY29yZGVkIDogcmVmdW5kCiAgICBkdXAKICAgIGZyYW1lX2RpZyAtNAogICAgPgogICAgZnJhbWVfZGlnIC00CiAgICBzd2FwCiAgICBzZWxlY3QKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTEwCiAgICAvLyBpZiAocmVmdW5kID4gMCkgewogICAgYnogcmVmdW5kUmVsZWFzZWRfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czoxMTEKICAgIC8vIGl0eG4ucGF5bWVudCh7IHJlY2VpdmVyLCBhbW91bnQ6IHJlZnVuZCB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgZnJhbWVfZGlnIC01CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKcmVmdW5kUmVsZWFzZWRfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MTEzCiAgICAvLyByZXR1cm4gcmVmdW5kCiAgICByZXRzdWIKCnJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfZmFsc2VAOToKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTIKICAgIC8vIGNvbnN0IHJlbGVhc2VkOiB1aW50NjQgPSBtaW5CZWZvcmUgPiBtaW5BZnRlciA/IG1pbkJlZm9yZSAtIG1pbkFmdGVyIDogMAogICAgaW50Y18wIC8vIDAKICAgIGIgcmVmdW5kUmVsZWFzZWRfdGVybmFyeV9tZXJnZUAxMAoKcmVmdW5kUmVsZWFzZWRfdGVybmFyeV9mYWxzZUA2OgogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MAogICAgLy8gY29uc3QgcmVjZWl2ZWQ6IHVpbnQ2NCA9IGdyb3NzID4gYmFsYW5jZUJlZm9yZSA/IGdyb3NzIC0gYmFsYW5jZUJlZm9yZSA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZFJlbGVhc2VkX3Rlcm5hcnlfbWVyZ2VANwo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyALAAEIArjvBKCNBtSASoAg0IYDmK0Y4L0TJiAJYWtpdGFfZGFvAmJjBBUffHUMYWtpdGFfZXNjcm93BndhbGxldANhYWwLRVJSOmVyck5kYW8LRVJSOmVyckNuc3QWY2hpbGRfY29udHJhY3RfdmVyc2lvbgtFUlI6ZXJySXBheQEAC0VSUjplcnJOcGJvC0VSUjplcnJJeGZyBD6hGDIExTsyzAhyZWZlcnJlcgVhcHBJRAd2ZXJzaW9uC0VSUjplcnJOYXVjBnNlbGxlcgZmdW5kZXIDcGFsAgAAC0VSUjplcnJCaW5jC0VSUjplcnJFbWZtC0VSUjplcnJOb3B0AgAKAgAiBAuBAUMENM7HmAS9cUjQBK35KuSABOqRgN02GgCOAQC5MRkURDEYQQCiggcEuMhijQTRVI//BLriaisEc/ACIwQXFNplBID0RUEEpdQrOicOgggE3KLYYgTTRrGkBDlOrrIEM/eICASuhMvYBDPpLJQEhU3t4ARzERBwNhoAjhAC8QOWBCoErgUhBYQF5waVBukHcQeLCWMJjwoQACoAAQCAJBUffHUAAAAAAACJ5AAAAAAAAAtUAAAAAAAASdQAAAAAAAB6qLAjQyNDgASBFTYoNhoAjgECYQAxGYEEEjEYEERCCX+KAQGL/71AAAQnB7AAiYoEAiJJi/8iWUAACoGIJ4v/TwNPA4mxi/1xC0SL/hUWVwYCi/5Qi/0WAQEjFov8JwVlSIFIW7IYgAQf98dMshpPA7IaTwKyGkyyGov/shqyGoAJAAdyb3lhbHR5shqBBrIQIrIBs7Q+SVcEAEsBVwAEKhJESSJZJQhMFRJEVwYASYwAFUEABYsAF4wBiwEhCA1BAAkhCIv/TwNPA4mLAYv/TwNPA4mKAgGL/0EAF4v+JwVlSCRbcghEi/9wAEUBQAADMhCJIomKAgEiSYv+JwVlSIFYWzIOMQAyDYv/QAAZSDIDSSIWTwNJTgJQTwNQTFBMUCcKUIwAiYv/QQAFiwJAASMiQAAPgAtFUlI6ZXJySG53bLAASUAAD4ALRVJSOmVyckh0b3CwACJOAov/E0EARkUBi/+AEHNwZW5kaW5nX2FkZHJlc3NlTIwBQQAYiwEVgSASQQAPiwFLARJBAAdJiwMTQAAPgAtFUlI6ZXJySG5iZLAAI0yL/4ASY29udHJvbGxlZF9hZGRyZXNzZUEACEkVgSASQAAPgAtFUlI6ZXJySXdsdLAASUsCEkEASCNMi/8nD2VBADZJFYEgEkEALk4DSwJLAU8DSU4DTUxBABdMi/8WTwJQTFBMUExQJwoiTwNUUEL/DUUBMgNC/+NIMgNOA0L/zIv/cghMTgJAAAdFASJMQv+pSUsCEkEAC0xzAkgyAxJMQv+XSXMCSE8CEkxC/4yL/3IHTIwAQQASiwIWJxBMUAOLABJBAAQjQv7CIkL+vjYaAUkiWSUISwEVEkRXAgA2GgJJIlklCEsBFRJEVwIANhoDSRUkEkQXNhoESRVLASJZSYEKEkRLAkxLAlIiWYEMCBJEJxFPBGcnCE8DZyhPAmcrTGcjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkiWSUISwEVEkRXAgA2GgJJIlmBIAslCEsBFRJENhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSRUkEkQXNhoHSRUkEkQXNhoISRUkEkQXNhoJSRUkEkQXNhoKSRWBIBJENhoLSRUkEkQXNhoMSRUkEkQXIihlREyI/ZNXaCCIB8pIFipMULAjQzEWJQlJOBAjEkQxFiMJSTgQgQQSRDYaAUkiWSUISwEVEkRXAgA2GgJJIlmBIAslCEsBFRJENhoDSRUkEkQXNhoESRUkEkQXNhoFSRUkEkQXNhoGSRUkEkQXNhoHSRUkEkQXNhoISRUkEkQXNhoJSRUkEkQXNhoKSRWBIBJENhoLSRUkEkQXiAabiAc2SBYqTFCwI0MxFiUJSTgQgQYSRDEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFSQSRBc2GgdJFSQSRBc2GghJFYEgEkQ2GglJFSQSRBc2GgpJFSQSRBciKGVETIj8eldoIIgJhBYqTFCwI0MxFiUJSTgQgQYSRDEWIwlJOBAjEkQ2GgFJFSQSRBc2GgJJFSQSRBc2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFSQSRBc2GgdJFSQSRBc2GghJFYEgEkQ2GglJFSQSRBeIBaOICREWKkxQsCNDNhoBSRUkEkQXSXIHRDIKEkAABCcSsABJJxNlSDEAEkAABCcLsAAyCnMARDIKcwFETwJJJxRlSElXACBMgSBbsYEFshlPArIYgAQkh8MsshqBBrIQIrIBs08DTwMiiAuLSCNDNhoBSRUkEkQXSXIHRDIKEkAABCcSsABJJxNlSDEAEkAABCcLsAAyCnMARDIKcwFETwJJJxRlSElXACBMgSBbsYEFshlPArIYgAQx8mqbshqBBrIQIrIBs08DTwMiiAsoSCNDgAA2GgFJFSMSRCJTSTYaAkkVJBJEF0lOAjYaA0kVJBJEF04DNhoESRUkEkQXTgUUTDIQTEEAb0wUC0UFTwJAAEsiKGVETwKI+skhBAhLAUAAKkUBIQQIMgFLAwhLAogEMAgIgQSICn8jCCEFCyEGCAiIBCsIFipMULAjQyIoZURPAoj6jiEJCAhC/8tFAUlAAAZIIQRC/78iKGVETIj6cyEKCEL/sSUjTwNNQv+LNhoBSSJZJQhLARUSRFcCADYaAkkVJBJEFyIoZUQnBGVISUAAJUgxADIJEkAABCcGsAAnCE8CZym9RQFAAAYpTLlII0MpTNNC//gxAExyCEQSQv/XNhoBSRUkEkQXSTYaAkkiWSUISwEVEkRXAgBMgfAPCjEWTAkjCUlOAzgQgQYSQQBUSwI4GDIIEkEASksCOBuBAxJBAEBLAjgZQAA5SwI5GgAnDhJBAC5LAjgAMQASQQAkI0AAD4ALRVJSOmVyckljb3KwACm9RQFAAAQnB7AAKU4CuyNDIkL/2TEAIihlRCcEZUhyCEQSQAAEJwawACm8SCNDMRYjCUcCOBAjEkQ2GgFJFSQSRBdJTgMiK2VMSU4CTgVEIihlRQFEJVtyCERMcABJTgJOA0gUTDgHMgoSQAAPgAtFUlI6ZXJySXBtcrAATwI4CDIQI08DCAsSQAAPgAtFUlI6ZXJySXBtYbAAsTIKSwOyESKyErIUgQSyECKyAbNAAVNHAiJZSwEVUlcCAIAAE0EBQiIoZURJJwRlSExJJxVlSElXCAhOAiRbTgMiK2VMSU4CRQdESSJZSwEVUklOAlcCAEwnBGVITLEjFk4CSRUWVwYCTFCABAABAAJMUEyyGIAEOrKJW7IashqBBrIQIrIBs7Q+SVcEAEsBVwAEKhJESSJZgSkLJQhMFRJEVwYpIltJQAAPgAtFUlI6ZXJyTmVzY7AASwYlW0lPAhJAAA+AC0VSUjplcnJXZXNjsACxTwRJshiABFrfM4+yGk8EshpPArIaTwKyGoAKAAEAAAAAAAAAALIaJxayGoEGshAisgEiKGVFAURMSXIIREsFSU4DcABFARQyEAu2THIIRLIHsggjshAisgG2SwEWTBaAAgABTFBPA7IYgARoNeO8shpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAbMjQzYaAUkVJBJEFyIoZUUBRCIrZUQlW3IIRExwAEUBFDIQI08CCAsWKkxQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCcEZUhyCEQSQAAEJwawACtMZyNDNhoBSSJZJQhLARUSRFcCADEAIihlRCcEZUhyCEQSQAAEJwawACIoZUQnFWVIgRBbMg0SQAAPgAtFUlI6ZXJySXVwZ7AAJxFMZyNDNhoBSRUkEkQXMQAiKGVEJwRlSHIIRBJAAAQnBrAAKExnI0OKAwCL/UEAKYv+QAAPgAtFUlI6ZXJyU2JycbAAi/9AAA+AC0VSUjplcnJGYW53sACJi/9B//qAC0VSUjplcnJXbmJmsACKAQGL/0EABIHUFokiiSIoZUSACG5mdF9mZWVzZUiBMFuJigEAi/9BABexIitlRCVbcghEi/+yCLIHI7IQIrIBs4mKAAEiSShlRDEASwGAA29hbGVIgRhbTwInBWVIgVhbTgKxshiABDwabzOyGrIagQayECKyAbO0PklXBABLAVcABCoSREkiWSUITBUSRFcGAEkVJBNBABZIIjIDSwFAAAVFAYwAiUgnD2VIQv/1F0lBAAWLAUAACCIiTgJNQv/aSXIHTIwAQQASiwEWJxBMUAOLABJBAAQjQv/eIkL/2ooOAiKAAIv5QAAEJxewAIv6gawCCIv7DEAABCcYsAApvUUBQAAEJwewAIv3i/iL/oj+qIv2FIv2QQALMgqL9nAARQFBAokjQAAEJxmwADIQJSNPA00LjAEiKGVEi/M4EUlOAoj1PCEECEyL9kACTUwhBAhMMgGLAQiL/oj+oghLAgiBBIgE7yMIIQULIQYICE4CiP6ZTgKL8jgHMgoSQAAEJwmwAIvyOAhLBEsECBJAAAQnCbAAi/M4ADEAEkAABCcMsABJi/YTQAAPgAtFUlI6ZXJyUGliYbAAi/M4FDIKEkAABCcMsACL8zgSSU4FQAAEJwywAElxCkQyAxJBAbhJcQlEMgMSQQGuI0AAD4ALRVJSOmVyclBzemKwACIoZURLAYv0i/WI89KM9UxPA4j+ELFJFov2FklOA4wAi/cWi/gWi/kWi/oWi/sWi/I4AE8LFlAxAE8KFov8FiInCGVESRUWVwYCTFAiKGVEIitlREwWJxpQTFAnG4v/UExQIogDySOIA8UliAPBgQOIA7yBBIgD4YEKsjWBGbI0IrIZsjgnHLJCTwOyQE8CskBMskCyQCcdshpLC7IaJwqyGk8NshpPCrIaTwmyGk8IshpPB7IaTwayGk8FshpPBLIaTwOyGk8CshqL/bIaTLIashqBBrIQIrIBs7cAPUlOA7FJcghEMgFPBgiyCLIHI7IQIrIBs7FJcghEMhCyCLIHI7IQIrIBtiKyGUmyGCcNshpMshqBBrIQIrIBs7FyCERMshFPArISshSBBLIQIrIBs4v2QQAosUcCcghEMhCyCLIHI7IQIrIBtiKyGbIYJw2yGosAshqBBrIQIrIBs4v3QQAwi/6I/JqxSwFJTgJyCESyB7III7IQIrIBtov+FiKyGUyyGCceshqyGoEGshAisgGzi/VPA08DiSJC/k8iKGVEi/aI8t0hCQhPAghMQv2lIkL9dIoMASKAAIv0ORoAJx8SQQJki/Q4GUACXSNAAA+AC0VSUjplcnJCbXB0sAAiKGVEi/Q4GEmMAUlyB0RPAicFZUiBGFtyCEQSRIAFb3duZXJlSDIKEkAABCcLsACL+UAABCcXsACL+oGsAgiL+wxAAAQnGLAAKb1FAUAABCcHsACL94v4i/6I+4CL9kEACzIKi/ZwAEUBQQHZI0AABCcZsACL9kABxyKL9kABsSEETDIBCIv+iPuXCEsBCIEEiAHkIwghBQshBggIiPuQi/U4BzIKEkAABCcJsACL9TgISwJLAggSQAAEJwmwACIoZUQigAAnFojxM0hMiPt0sYsBSU4CFov2FklOA4wAi/cWi/gWi/kWi/oWi/sWi/U4AE8KFlAxAE8IFov8FiInCGVESRUWVwYCTFAiKGVEIitlREwWJxpQTFAnG4v/UExQIogBKSOIASUliAEhgQOIARyBBIgBQYEKsjWBGbI0IrIZsjgnHLJCTwOyQE8CskBMskCyQCcdshpPC7IagAGAshpPC7IaTwqyGk8JshpPCLIaTweyGk8GshpPBbIaTwSyGk8DshpPArIai/2yGkyyGrIagQayECKyAbO3AD1JTgKxSXIIRE8CshgnH7IashqBBrIQIrIBs7FyCEQyAU8DCLIIsgcjshAisgGzi/ZBACixRwJyCEQyELIIsgcjshAisgG2IrIZshgnDbIaiwCyGoEGshAisgGzi/dBADCL/oj6H7FLAUlOAnIIRLIHsggjshAisgG2i/4WIrIZTLIYJx6yGrIagQayECKyAbOMAIkiKGVEi/aI8GohCghMQv5CMhBC/jUiQv4kIkL9oIoBASmI75tJi/8hBwtJTwIPQQAFRgKAAIlJTgIJSSEHDSEHTE0pTgK6iYoBASmI73GL/wiBgBAIIwmBgBAKSSQOQAAPgAtFUlI6ZXJyUHRsZ7AASUEADCMJSYEDDYEDTgJNiUgiQv/xigUBMgpJcwBEi/8ISYv9DUEAN4v9CUxzAUxJTwJEi/4MQQAhi/5MCQhJi/wNi/xMTUlBAA+xSbIIi/uyByOyECKyAbOJSCJC/95IIkL/xw==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
    weightsListCount: requestedWeightsListCount,
    wallet = 0n,
    ...rest
  }) {
    const sendParams = this.getRequiredSendParams({ sender, signer });
    const prizeAsset = isPrizeBox ? 0n : rest.prizeAsset;
    const weightsListCount = BigInt(_nullishCoalesce(requestedWeightsListCount, () => ( (BigInt(bidFee) > 0n ? 3n : 0n))));
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
  FANW: "An auction with a bid fee must be created with a weightsListCount above 0",
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
   * Gets the MBR (Minimum Balance Requirement) data for bids on this auction (see `AuctionMbrData`).
   * Always read it from the auction: it depends on the auction's bid asset.
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
   * Removes a fee auction's totals box and returns its storage to whoever funded the auction;
   * resolves to the amount returned (0 when there is nothing to remove). From 2.0.0 on the weights
   * boxes themselves are freed by `refundMBR`, so this runs after every bid's storage is refunded
   * (or before the start, for a seller who cancels), `iterationAmount` is ignored, and the call is
   * optional: deleting or cancelling the auction removes a totals box that is still there.
   * On an auction created before 2.0.0 it deletes `iterationAmount` reserved weights boxes.
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
//# sourceMappingURL=chunk-L5LOLWQO.js.map
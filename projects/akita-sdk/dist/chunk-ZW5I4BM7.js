"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkRZUZCM44js = require('./chunk-RZUZCM44.js');


var _chunkXASWHIKGjs = require('./chunk-XASWHIKG.js');


var _chunk4M6IGGNMjs = require('./chunk-4M6IGGNM.js');

// src/auction/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/AuctionClient.ts
var _apparc56 = require('@algorandfoundation/algokit-utils/types/app-arc56');


var _appclient = require('@algorandfoundation/algokit-utils/types/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/types/app-factory');
var APP_SPEC = { "name": "Auction", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "BidInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }, { "name": "marketplace", "type": "address" }, { "name": "refunded", "type": "bool" }], "FindWinnerCursors": [{ "name": "startingIndex", "type": "uint64" }, { "name": "currentRangeStart", "type": "uint64" }], "AkitaConfig": [{ "name": "akitaDao", "type": "uint64" }, { "name": "akitaDaoEscrow", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAsset" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "seller" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "(uint64,uint64)", "struct": "AkitaConfig", "name": "akitaConfig" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancel", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "deletes the application & returns the mbr + asset\nto the seller IF the auction hasn't started", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "bid", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "bidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundBid", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimPrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "hasBid", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool", "desc": "a boolean of whether the address has bid in the auction" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 26, "bytes": 9 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset up for auction" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "whether the prize has been claimed" }, "bidAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2Fzc2V0", "desc": "the asset that is being used for bidding in the auction" }, "bidFee": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2ZlZQ==", "desc": "the percentage fee to take for the raffle on each bid in hundreds to support two decimals" }, "startingBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRpbmdfYmlk", "desc": "the starting amount to begin bids at" }, "bidMinimumIncrease": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX21pbmltdW1faW5jcmVhc2U=", "desc": "the smallest amount each new bid need increment the auction price" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "the unix time that the auction starts on" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "the round that the auction ends on" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the royalty percentage the creator will get for the auction" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that created the auction to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the royalty percentage each side of the market will take for the auction" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to bid in the auction" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "refundCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX2NvdW50", "desc": "the number of bids that have been refunded" }, "bidTotal": { "keyType": "AVMString", "valueType": "uint128", "key": "YmlkX3RvdGFs", "desc": "the total sum of all bids" }, "weightedBidTotal": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0ZWRfYmlkX3RvdGFs", "desc": "the total sum of all highest bids" }, "highestBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aGlnaGVzdF9iaWQ=", "desc": "highest bid the contract has received thus far" }, "bidID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2lk", "desc": "the id or index of the last bid" }, "raffleAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX2Ftb3VudA==", "desc": "the total amount collected for the loser raffle" }, "rafflePrizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3ByaXplX2NsYWltZWQ=", "desc": "whether the raffle winner has claimed their prize" }, "uniqueAddressCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dW5pcXVlX2FkZHJlc3NfY291bnQ=", "desc": "we count how many unique addresses bid so we can\nproperly get each bids % of the total bid amount" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "we get the winning number from the randomness beacon\nafter the auction ends & we have ran findWinner\nto compile our list" }, "raffleWinner": { "keyType": "AVMString", "valueType": "address", "key": "cmFmZmxlX3dpbm5lcg==", "desc": "the winning address of the raffle" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "salt for randomness" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called after auction ends\nused for VRF since round times are dynamic and we need a deterministic round" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow to use" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "bids": { "keyType": "uint64", "valueType": "BidInfo", "desc": "the list of bids in the auction", "prefix": "Yg==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "bidsByAddress": { "keyType": "address", "valueType": "uint64", "desc": "when we run our raffle we need to transform\nour list of bids into an address based box", "prefix": "YQ==" }, "locations": { "keyType": "uint64", "valueType": "address", "desc": "the addresses associated with highest bid locations", "prefix": "bA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3415, 3584, 3668, 3752, 5468], "errorMessage": "Box must have value" }, { "pc": [1085, 1323, 1482, 2771, 4530, 5857], "errorMessage": "Bytes has valid prefix" }, { "pc": [1221], "errorMessage": "Close out of algo forbidden" }, { "pc": [4550], "errorMessage": "Escrow does not exist" }, { "pc": [2464, 2583], "errorMessage": "Gate check failed" }, { "pc": [1985], "errorMessage": "Invalid app" }, { "pc": [5280], "errorMessage": "Invalid app upgrade" }, { "pc": [1910], "errorMessage": "Invalid asset" }, { "pc": [2111, 5356, 6066, 6188], "errorMessage": "Invalid payment" }, { "pc": [1613, 4930, 5692, 5748, 5894, 5935], "errorMessage": "Invalid percentage" }, { "pc": [878, 890], "errorMessage": "OnCompletion must be DeleteApplication && can only call when not creating" }, { "pc": [655], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [866], "errorMessage": "OnCompletion must be UpdateApplication && can only call when not creating" }, { "pc": [5228, 5269, 5310], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [2499, 2629], "errorMessage": "This has a gate" }, { "pc": [4560], "errorMessage": "Wrong escrow for this operation" }, { "pc": [3533], "errorMessage": "all refunds complete" }, { "pc": [1259, 1346, 1367, 1380, 1391, 1509, 1981, 3859, 4038, 4057, 4626, 4677, 4760, 4957, 5002, 5226, 5265, 5308], "errorMessage": "application exists" }, { "pc": [6222], "errorMessage": "assert target is match for conditions" }, { "pc": [1909, 3942, 4208, 4227, 4264], "errorMessage": "asset exists" }, { "pc": [2663, 3180, 3731, 5063], "errorMessage": "auction has not ended" }, { "pc": [2443, 2492, 2562, 2622], "errorMessage": "auction is not live" }, { "pc": [6351], "errorMessage": "bid already refunded" }, { "pc": [6328], "errorMessage": "bid not found" }, { "pc": [6316], "errorMessage": "cannot refund most recent bid" }, { "pc": [2040, 2086, 2157, 2167, 2175, 2182, 2188, 2194, 2199, 2206, 2213, 2223, 2238, 2248, 2290, 2297, 2304, 2312, 2317, 2337, 2347, 2378, 2382, 2431, 2447, 2452, 2497, 2550, 2566, 2571, 2627, 2661, 2668, 2675, 2691, 2696, 2712, 2725, 2799, 2915, 3171, 3178, 3185, 3191, 3200, 3212, 3223, 3233, 3269, 3358, 3388, 3397, 3492, 3498, 3506, 3519, 3530, 3603, 3706, 3729, 3736, 3743, 3770, 3778, 3800, 3833, 3856, 3878, 3913, 3931, 3939, 3965, 4013, 4035, 4042, 4054, 4061, 4081, 4085, 4098, 4102, 4121, 4136, 4157, 4161, 4174, 4178, 4198, 4205, 4212, 4224, 4231, 4253, 4257, 4261, 4299, 4303, 4308, 4343, 4347, 4385, 4389, 4394, 4435, 4445, 4555, 4674, 4757, 4784, 4788, 4811, 4834, 4854, 4858, 4897, 4906, 4912, 4924, 4945, 4954, 4976, 4999, 5006, 5029, 5061, 5068, 5074, 5095, 5122, 5219, 5257, 5301, 5381, 5394, 5402, 5407, 5414, 5447, 5499, 5512, 5535, 5548, 5553, 5565, 5583, 5629, 5652, 5687, 5707, 5735, 5743, 5765, 5780, 5806, 5811, 5922, 5930, 5952, 6080, 6091, 6103, 6116, 6136, 6219, 6236, 6247, 6259, 6272, 6292, 6310, 6376, 6398, 6410, 6435, 6445], "errorMessage": "check GlobalState exists" }, { "pc": [5538, 5634], "errorMessage": "index access is out of bounds" }, { "pc": [4543], "errorMessage": "invalid number of bytes for (len+(uint64,bool1)[])" }, { "pc": [1095, 2781], "errorMessage": "invalid number of bytes for (len+uint8[])" }, { "pc": [1869, 5248], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [1885], "errorMessage": "invalid number of bytes for (uint64,uint64)" }, { "pc": [1811], "errorMessage": "invalid number of bytes for (uint8[32],uint64)" }, { "pc": [1731], "errorMessage": "invalid number of bytes for bool8" }, { "pc": [1328, 1487, 1722, 1741, 1753, 1764, 1775, 1786, 1797, 1830, 1841, 2071, 2642, 3165, 3486, 5053, 5212, 5294, 5333, 5862], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [1822, 1855, 2427, 2488, 2546, 2618, 5184], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [3079], "errorMessage": "max array length exceeded" }, { "pc": [2092], "errorMessage": "must allocate at least three highest bids chunks" }, { "pc": [1888, 2081, 2152, 2283], "errorMessage": "must be called from the factory" }, { "pc": [2177, 2201], "errorMessage": "not all refunds complete" }, { "pc": [2087, 3172], "errorMessage": "not applicable to this auction" }, { "pc": [2707], "errorMessage": "not enough time has passed" }, { "pc": [3738], "errorMessage": "prize already claimed" }, { "pc": [2183, 3493, 5069], "errorMessage": "prize not claimed" }, { "pc": [5075], "errorMessage": "raffle not prize claimed" }, { "pc": [4908], "errorMessage": "raffle prize already claimed" }, { "pc": [2189], "errorMessage": "raffle winner has not claimed" }, { "pc": [2208, 2299], "errorMessage": "still has highest bids boxes" }, { "pc": [5560], "errorMessage": "too many participants" }, { "pc": [2418, 2537], "errorMessage": "transaction type is appl" }, { "pc": [2526, 2609], "errorMessage": "transaction type is axfer" }, { "pc": [2063, 2407, 2479, 2515, 2599, 5325], "errorMessage": "transaction type is pay" }, { "pc": [2670], "errorMessage": "winner already drawn" }, { "pc": [3195], "errorMessage": "winner already found" }, { "pc": [3514, 4901], "errorMessage": "winner not found" }, { "pc": [3186], "errorMessage": "winning number not found" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgNDA5NiAxODQ0Njc0NDA3MzcwOTU1MTYxNSA2MzY0MTM2MjIzODQ2NzkzMDA1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSAzNDkwMCA1MzQwMCA3MjMwMCA0Mjk0OTY3Mjk1IDEzMTEzMzAwCiAgICBieXRlY2Jsb2NrICJiaWRfYXNzZXQiICJha2l0YV9kYW8iICJwcml6ZSIgImVuZF90aW1lc3RhbXAiICJiaWRfZmVlIiAiYmlkX2lkIiAweDE1MWY3Yzc1ICJha2l0YV9lc2Nyb3ciICJhIiAiaXNfcHJpemVfYm94IiAic2VsbGVyIiAid190b3RhbHMiICJ3ZWlnaHRzX2JveF9jb3VudCIgIndpbm5pbmdfdGlja2V0IiAweDAwMDEgInJhZmZsZV93aW5uZXIiICJ3ZWlnaHRlZF9iaWRfdG90YWwiICJoaWdoZXN0X2JpZCIgInJhZmZsZV9hbW91bnQiICJwcml6ZV9jbGFpbWVkIiAidnJmX2ZhaWx1cmVfY291bnQiICJyYWZmbGVfcHJpemVfY2xhaW1lZCIgInVuaXF1ZV9hZGRyZXNzX2NvdW50IiAicmVmdW5kX21icl9jdXJzb3IiICJnYXRlX2lkIiAibWFya2V0cGxhY2UiICJ3IiAid2FsbGV0IiAicmVmdW5kX2NvdW50IiAicmFmZmxlX3JvdW5kIiAiY3JlYXRvcl9yb3lhbHR5IiAibWFya2V0cGxhY2Vfcm95YWx0aWVzIiAiYiIgInN0YXJ0X3RpbWVzdGFtcCIgImZpbmRfd2lubmVyX2N1cnNvcnMiICJuZnRfZmVlcyIgImwiIDB4MDAgMHgwNjgxMDEgIm9hbCIgImFhbCIgInN0YXJ0aW5nX2JpZCIgImJpZF9taW5pbXVtX2luY3JlYXNlIiAidmVyc2lvbiIgInNhbHQiIDB4YWRmOTJhZTQgMHgwMDAwICJwYWwiCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYm56IG1haW5fYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxCiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMjAgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDI4IC8vICJyZWZ1bmRfY291bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE2IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE3IC8vICJoaWdoZXN0X2JpZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX2Ftb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjEgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjIgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMgogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDIzIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEzIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMjkgLy8gInJhZmZsZV9yb3VuZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAoKbWFpbl9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1LTMwCiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbiBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VBdWN0aW9uLAogICAgLy8gICBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICBwdXNoYnl0ZXNzIDB4MjQ4N2MzMmMgMHgzMWYyNmE5YiAweGVhOTE4MGRkIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiLCBtZXRob2QgImNhbmNlbCgpdm9pZCIsIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0IG1haW5fY2FuY2VsX3JvdXRlQDUgbWFpbl91cGRhdGVfcm91dGVANgoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1LTMwCiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbiBleHRlbmRzIGNsYXNzZXMoCiAgICAvLyAgIEJhc2VBdWN0aW9uLAogICAgLy8gICBBa2l0YUJhc2VGZWVHZW5lcmF0b3JDb250cmFjdCwKICAgIC8vICAgQ29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbiwKICAgIC8vICAgQ2hpbGRDb250cmFjdAogICAgLy8gKSB7CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIG11c3QgYmUgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjkKICAgIHB1c2hieXRlc3MgMHhiZDcxNDhkMCAweDk4MzZjODlmIDB4NGQ1ODU2OTcgMHhkOWY0ZjAzYSAweDc2OTUyOTMxIDB4YjllMzljNWMgMHg2OTY1MDFkZSAweGJkMWIyN2QxIDB4ZjJjZTJmNDYgMHg5ZGFmMDUwYSAweDY1ZmNhOThiIDB4MDVlNWRlNGQgMHg4ZmE0YTE2MCAweDYwODIzMDNjIDB4MWVhZDIwYTkgMHgzM2U5MmM5NCAweDg1NGRlZGUwIDB4M2VhMTE4MzIgMHg3MzExMTA3MCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJnYXRlZEJpZChwYXksYXBwbCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImJpZChwYXksYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJnYXRlZEJpZEFzYShwYXksYXhmZXIsYXBwbCxhZGRyZXNzKXZvaWQiLCBtZXRob2QgImJpZEFzYShwYXksYXhmZXIsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJyZWZ1bmRCaWQodWludDY0KXZvaWQiLCBtZXRob2QgInJhZmZsZSgpdm9pZCIsIG1ldGhvZCAiZmluZFdpbm5lcih1aW50NjQpdm9pZCIsIG1ldGhvZCAicmVmdW5kTUJSKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjbGFpbVByaXplKCl2b2lkIiwgbWV0aG9kICJjbGFpbVJhZmZsZVByaXplKCl2b2lkIiwgbWV0aG9kICJjbGVhcldlaWdodHNCb3hlcyh1aW50NjQpdWludDY0IiwgbWV0aG9kICJpc0xpdmUoKWJvb2wiLCBtZXRob2QgImhhc0JpZChhZGRyZXNzKWJvb2wiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBnYXRlZEJpZCBiaWQgZ2F0ZWRCaWRBc2EgYmlkQXNhIHJlZnVuZEJpZCByYWZmbGUgZmluZFdpbm5lciByZWZ1bmRNQlIgY2xhaW1Qcml6ZSBjbGFpbVJhZmZsZVByaXplIGNsZWFyV2VpZ2h0c0JveGVzIGlzTGl2ZSBoYXNCaWQgdXBkYXRlQWtpdGFEQU9Fc2Nyb3cgdXBkYXRlQWtpdGFEQU8gbWFpbl9vcFVwX3JvdXRlQDI1IG9wdGluIG1haW5fbWJyX3JvdXRlQDI3CiAgICBlcnIKCm1haW5fbWJyX3JvdXRlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vYmFzZS50czo3CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHB1c2hieXRlcyAweDE1MWY3Yzc1MDAwMDAwMDAwMDAwODg1NDAwMDAwMDAwMDBjODE3ZDQwMDAwMDAwMDAwMDA0ODQ0MDAwMDAwMDAwMDAwNDlkNAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX29wVXBfcm91dGVAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0MwogICAgLy8gb3BVcCgpOiB2b2lkIHsgfQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9jcmVhdGVfTm9PcEAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUtMzAKICAgIC8vIGV4cG9ydCBjbGFzcyBBdWN0aW9uIGV4dGVuZHMgY2xhc3NlcygKICAgIC8vICAgQmFzZUF1Y3Rpb24sCiAgICAvLyAgIEFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LAogICAgLy8gICBDb250cmFjdFdpdGhDcmVhdG9yT25seU9wdEluLAogICAgLy8gICBDaGlsZENvbnRyYWN0CiAgICAvLyApIHsKICAgIHB1c2hieXRlcyAweDViNWI4OWJlIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLCh1aW50NjQsdWludDY0KSl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggY3JlYXRlCiAgICBlcnIKCm1haW5fdXBkYXRlX3JvdXRlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBpbnRjXzMgLy8gVXBkYXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBVcGRhdGVBcHBsaWNhdGlvbiAmJiBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICBiIHVwZGF0ZQoKbWFpbl9jYW5jZWxfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYwCiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gbXVzdCBiZSBEZWxldGVBcHBsaWNhdGlvbiAmJiBjYW4gb25seSBjYWxsIHdoZW4gbm90IGNyZWF0aW5nCiAgICBiIGNhbmNlbAoKbWFpbl9kZWxldGVBcHBsaWNhdGlvbl9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTkKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6ICdEZWxldGVBcHBsaWNhdGlvbicgfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBtdXN0IGJlIERlbGV0ZUFwcGxpY2F0aW9uICYmIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIGIgZGVsZXRlQXBwbGljYXRpb24KCgovLyBfcHV5YV9saWIudXRpbC5lbnN1cmVfYnVkZ2V0KHJlcXVpcmVkX2J1ZGdldDogdWludDY0LCBmZWVfc291cmNlOiB1aW50NjQpIC0+IHZvaWQ6CmVuc3VyZV9idWRnZXQ6CiAgICBwcm90byAyIDAKICAgIGZyYW1lX2RpZyAtMgogICAgcHVzaGludCAxMCAvLyAxMAogICAgKwoKZW5zdXJlX2J1ZGdldF93aGlsZV90b3BAMToKICAgIGZyYW1lX2RpZyAwCiAgICBnbG9iYWwgT3Bjb2RlQnVkZ2V0CiAgICA+CiAgICBieiBlbnN1cmVfYnVkZ2V0X2FmdGVyX3doaWxlQDYKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBieXRlYyAzOCAvLyAweDA2ODEwMQogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW0KICAgIGJ5dGVjIDM4IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtCiAgICBmcmFtZV9kaWcgLTEKICAgIHN3aXRjaCBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzBAMyBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzFANAoKZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICBpdHhuX3N1Ym1pdAogICAgYiBlbnN1cmVfYnVkZ2V0X3doaWxlX3RvcEAxCgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzFANDoKICAgIGdsb2JhbCBNaW5UeG5GZWUKICAgIGl0eG5fZmllbGQgRmVlCiAgICBiIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1CgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlXzBAMzoKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgYiBlbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANQoKZW5zdXJlX2J1ZGdldF9hZnRlcl93aGlsZUA2OgogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo6X19wY2czMk91dHB1dChzdGF0ZTogdWludDY0KSAtPiB1aW50NjQ6Cl9fcGNnMzJPdXRwdXQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gX19wY2czMk91dHB1dChzdGF0ZTogUENHMzJTVEFURSk6IHVpbnQ2NCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IHhvcnNoaWZ0ZWQgPSBfX21hc2tUb1VpbnQzMihvcC5zaHIob3Auc2hyKHN0YXRlLCAxOCkgXiBzdGF0ZSwgMjcpKQogICAgZnJhbWVfZGlnIC0xCiAgICBwdXNoaW50IDE4IC8vIDE4CiAgICBzaHIKICAgIGZyYW1lX2RpZyAtMQogICAgXgogICAgcHVzaGludCAyNyAvLyAyNwogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjEzCiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDEzIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjUKICAgIC8vIGNvbnN0IHJvdCA9IG9wLnNocihzdGF0ZSwgNTkpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgNTkgLy8gNTkKICAgIHNocgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNgogICAgLy8gcmV0dXJuIG9wLnNocih4b3JzaGlmdGVkLCByb3QpIHwgX19tYXNrVG9VaW50MzIob3Auc2hsKHhvcnNoaWZ0ZWQsIF9fdWludDY0VHdvcyhyb3QpICYgMzEpKQogICAgZHVwMgogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjgKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIHN3YXAKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjYKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHB1c2hpbnQgMzEgLy8gMzEKICAgICYKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgc2hsCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjEzCiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDEzIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjYKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHwKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldElEOiB1aW50NjQpIC0+IGJ5dGVzOgpvcmlnaW5PclR4blNlbmRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0SUQ6IEFwcGxpY2F0aW9uKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTUwCiAgICAvLyByZXR1cm4gb3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDMKICAgIGZyYW1lX2RpZyAwCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgc3dhcAogICAgcmV0c3ViCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY3CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjUtMTY4CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PckA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDM5IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQgLy8gMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4Ni0xODkKICAgIC8vIGNvbnN0IGRhdGEgPSBhYmlDYWxsPHR5cGVvZiBFc2Nyb3dGYWN0b3J5LnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGVzY3Jvd0ZhY3RvcnksCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hieXRlcyAweDNjMWE2ZjMzIC8vIG1ldGhvZCAiZ2V0KGFkZHJlc3MpYnl0ZVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdWludDhbXSkKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTkxCiAgICAvLyBpZiAoQnl0ZXMoZGF0YSkubGVuZ3RoID09PSAwIHx8IEJ5dGVzKGRhdGEpLmxlbmd0aCAhPT0gOCkgewogICAgbGVuCiAgICBkdXAKICAgIGJ6IGdldFdhbGxldElEVXNpbmdBa2l0YURBT19pZl9ib2R5QDYKICAgIGZyYW1lX2RpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgIT0KICAgIGJ6IGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pZl9lbHNlQDcKCmdldFdhbGxldElEVXNpbmdBa2l0YURBT19pZl9ib2R5QDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MgogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnZXRXYWxsZXRJREA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTUKICAgIC8vIHJldHVybiBidG9pKGRhdGEpCiAgICBmcmFtZV9kaWcgMAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxODIKICAgIC8vIHJldHVybiBBcHBsaWNhdGlvbihnZXRXYWxsZXRJRChlc2Nyb3dGYWN0b3J5LCBhZGRyZXNzKSkKICAgIGIgZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdhdGVDaGVjayhnYXRlVHhuOiB1aW50NjQsIGFraXRhREFPOiB1aW50NjQsIGNhbGxlcjogYnl0ZXMsIGlkOiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2F0ZUNoZWNrOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBnYXRlQ2hlY2soZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sIGFraXRhREFPOiBBcHBsaWNhdGlvbiwgY2FsbGVyOiBBY2NvdW50LCBpZDogdWludDY0KTogYm9vbGVhbiB7CiAgICBwcm90byA0IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtMwogICAgYnl0ZWMgNDAgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzCiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICBwdXNoaW50IDQwIC8vIDQwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNAogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgYnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzQKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJueiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNQogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIGludGNfMyAvLyA0CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM1CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM2CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoYnl0ZXMgMHg0MzkyMjY1NSAvLyBtZXRob2QgIm11c3RDaGVjayhhZGRyZXNzLHVpbnQ2NCxieXRlW11bXSl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNgogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM3CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGZyYW1lX2RpZyAtNAogICAgaW50Y18xIC8vIDEKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzcKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM4CiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBmcmFtZV9kaWcgLTQKICAgIHB1c2hpbnQgMiAvLyAyCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM4CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzItMjM5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgpnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3OgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMyLTIzOQogICAgLy8gcmV0dXJuICgKICAgIC8vICAgZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gICBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyAgIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBHYXRlLnByb3RvdHlwZS5tdXN0Q2hlY2s+KCkgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IGJ5dGVzLCBzdW06IHVpbnQ2NCwgY2xvc2VPdXQ6IHVpbnQ2NCkgLT4gYnl0ZXMsIGJ5dGVzOgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MTgKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgdGltZVRvVW5sb2NrOiB1aW50NjQsIGV4cGlyYXRpb246IHVpbnQ2NCwgYWxsb2NhdGlvbnM6IFVzZXJBbGxvY2F0aW9uW10sIHN1bTogdWludDY0LCBjbG9zZU91dDogYm9vbGVhbik6IHsgaWQ6IHVpbnQ2NCwgY29zdDogdWludDY0IH0gewogICAgcHJvdG8gNyAyCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOQogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgRVJSX0NBTk5PVF9DTE9TRV9PVVRfT0ZfQUxHT19GT1JCSURERU4pCiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE5CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGFzc2VydCAvLyBDbG9zZSBvdXQgb2YgYWxnbyBmb3JiaWRkZW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtNwogICAgYnl0ZWMgNDAgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIwCiAgICAvLyBjb25zdCByZXdhcmRzQXBwID0gZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5yZXdhcmRzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjMKICAgIC8vIGxldCBjb3N0OiB1aW50NjQgPSBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgZnJhbWVfZGlnIC0zCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMjUzMDAgLy8gMjUzMDAKICAgICoKICAgIHB1c2hpbnQgMzUzMDAgLy8gMzUzMDAKICAgICsKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjQKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC02CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI5CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTMwCiAgICAvLyBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjgtNTMxCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMgogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweDdiN2RjNWZjIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChwYXksdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgZ2l0eG4gMSBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3NwogICAgLy8gcmV0dXJuIHsgaWQsIGNvc3QgfQogICAgaXRvYgogICAgZnJhbWVfZGlnIDEKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0zCiAgICBmcmFtZV9idXJ5IDEKICAgIGZyYW1lX2J1cnkgMAogICAgcmV0c3ViCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Vsc2VfYm9keUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzgKICAgIC8vIGlmICghQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYXNzZXQpKSkgewogICAgZnJhbWVfZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAtNgogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfYnVyeSAyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1MwogICAgLy8gYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBzd2FwCiAgICBmcmFtZV9idXJ5IDAKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUyCiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OAogICAgLy8gaWYgKGNsb3NlT3V0KSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTkKICAgIC8vIHRyYW5zZmVyVHhuLnNldCh7IGFzc2V0Q2xvc2VUbzogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcyB9KQogICAgZnJhbWVfZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDQKICAgIGZyYW1lX2J1cnkgNQoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY2CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTY1LTU2OAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjkKICAgIC8vIHRyYW5zZmVyVHhuLAogICAgaXR4bl9uZXh0CiAgICBmcmFtZV9kaWcgNAogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3CiAgICBmcmFtZV9kaWcgNQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfbmV4dF9maWVsZEAxNzoKICAgIGZyYW1lX2RpZyAtNgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAtMgogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTItNTU2CiAgICAvLyBjb25zdCB0cmFuc2ZlclR4biA9IGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBzdW0sCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2Mi01NzQKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MAogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU3MQogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjItNTc0CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnRBc2FEaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdHJhbnNmZXJUeG4sCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGFmMWExNGYyIC8vIG1ldGhvZCAiY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudChwYXksYXhmZXIsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpW10pdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0zCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGdpdHhuIDIgTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDYgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZnJhbWVfZGlnIDIKICAgIGZyYW1lX2J1cnkgMQogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMjAKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfaWZfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MzkKICAgIC8vIGNvc3QgKz0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBmcmFtZV9kaWcgMQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICArCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDQKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDMKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDUKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0My01NDYKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDcKICAgIC8vIEFzc2V0KGFzc2V0KQogICAgZnJhbWVfZGlnIC02CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0MC01NDkKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBBc3NldChhc3NldCkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDM5NGVhZWIyIC8vIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMgoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgYiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IHVpbnQ2NCwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpzZW5kUmVmZXJyYWxQYXltZW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTEKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBzZW5kUmVmZXJyYWxQYXltZW50KGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IHVpbnQ2NCwgYW1vdW50OiB1aW50NjQpOiBSZWZlcnJhbFBheW1lbnRJbmZvIHsKICAgIHByb3RvIDMgMQogICAgaW50Y18wIC8vIDAKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTIKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU0CiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAzCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJlck9yQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTYKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDYKICAgIGZyYW1lX2RpZyAwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTk4CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwZXJjZW50YWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjAxCiAgICAvLyBpZiAocmVmZXJyYWxGZWUgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICBmcmFtZV9kaWcgLTEKICAgIGJ6IHNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMgogICAgLy8gcmVmZXJyYWxGZWUgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAxCgpzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA4CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wLAogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDkKICAgIC8vIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgZHVwCiAgICBwdXNoaW50IDYwNDgwMCAvLyA2MDQ4MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEwCiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDE0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwNS02MTMKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTIKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDUtNjEzCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE1CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTgKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTczLTE3NgogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGZyYW1lX2RpZyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NQogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICBwdXNoYnl0ZXMgInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTQxCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYm9vbDgKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgNDAgLy8gNDAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yICh1aW50OFszMl0sdWludDY0KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTAKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDExCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBjb3ZlciAzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBjb3ZlciA0CiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbit1dGY4W10pCiAgICBleHRyYWN0IDIgMAogICAgY292ZXIgMwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cAogICAgY292ZXIgNAogICAgbGVuCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAodWludDY0LHVpbnQ2NCkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU5CiAgICAvLyBhc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgIT09IDAsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICBnbG9iYWwgQ2FsbGVyQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIG11c3QgYmUgY2FsbGVkIGZyb20gdGhlIGZhY3RvcnkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIHRoaXMucHJpemUudmFsdWUgPSBwcml6ZQogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MgogICAgLy8gdGhpcy5pc1ByaXplQm94LnZhbHVlID0gaXNQcml6ZUJveAogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTkgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MwogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSBmYWxzZQogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gaWYgKGJpZEFzc2V0ICE9PSAwKSB7CiAgICBieiBjcmVhdGVfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2NgogICAgLy8gYXNzZXJ0KEFzc2V0KGJpZEFzc2V0KS50b3RhbCA+IDAsIEVSUl9JTlZBTElEX0FTU0VUKQogICAgZGlnIDEyCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0VG90YWwKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGFzc2VydCAvLyBJbnZhbGlkIGFzc2V0CgpjcmVhdGVfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2OAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZSA9IEFzc2V0KGJpZEFzc2V0KQogICAgZGlnIDEzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIHRoaXMuYmlkRmVlLnZhbHVlID0gYmlkRmVlCiAgICBkaWcgMTIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBzdGFydGluZ0JpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0aW5nQmlkIH0pCiAgICBieXRlYyA0MSAvLyAic3RhcnRpbmdfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzAKICAgIC8vIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUgPSBzdGFydGluZ0JpZAogICAgZGlnIDExCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NwogICAgLy8gYmlkTWluaW11bUluY3JlYXNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkTWluaW11bUluY3JlYXNlIH0pCiAgICBieXRlYyA0MiAvLyAiYmlkX21pbmltdW1faW5jcmVhc2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUgPSBiaWRNaW5pbXVtSW5jcmVhc2UKICAgIGRpZyAxMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDMzIC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MgogICAgLy8gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSA9IHN0YXJ0VGltZXN0YW1wCiAgICBkaWcgOQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWNfMyAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTczCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSA9IGVuZFRpbWVzdGFtcAogICAgZGlnIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvY2hpbGQudHM6MTEKICAgIC8vIGZ1bmRlciA9IEdsb2JhbFN0YXRlPEZ1bmRlckluZm8+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUZ1bmRlciB9KQogICAgcHVzaGJ5dGVzICJmdW5kZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3NAogICAgLy8gdGhpcy5mdW5kZXIudmFsdWUgPSBjbG9uZShmdW5kZXIpCiAgICBkaWcgNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEwIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3NQogICAgLy8gdGhpcy5zZWxsZXIudmFsdWUgPSBzZWxsZXIKICAgIGRpZyA2CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc2CiAgICAvLyB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID0gY3JlYXRvclJveWFsdHkKICAgIGRpZyA1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAyNCAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc3CiAgICAvLyB0aGlzLmdhdGVJRC52YWx1ZSA9IGdhdGVJRAogICAgZGlnIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjUgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzgKICAgIC8vIHRoaXMubWFya2V0cGxhY2UudmFsdWUgPSBtYXJrZXRwbGFjZQogICAgZGlnIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4MAogICAgLy8gY29uc3QgeyBha2l0YURBTywgYWtpdGFEQU9Fc2Nyb3cgfSA9IGFraXRhQ29uZmlnCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4MgogICAgLy8gYXNzZXJ0KGFraXRhREFPLmFkZHJlc3MgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX0lOVkFMSURfQVBQKQogICAgZGlnIDEKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGFzc2VydCAvLyBJbnZhbGlkIGFwcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4MwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSA9IGFraXRhREFPCiAgICB1bmNvdmVyIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDcgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg0CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gYWtpdGFEQU9Fc2Nyb3cKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNDMgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4NgogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgZGlnIDIKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWUgPSBuZXcgU3RhdGljQXJyYXk8VWludDY0LCAxNT4oKQogICAgcHVzaGludCAxMjAgLy8gMTIwCiAgICBiemVybwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDExIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg5CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZSA9IG5ldyBTdGF0aWNBcnJheTxVaW50NjQsIDE1PigpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyQ3Vyc29ycyB9KQogICAgYnl0ZWMgMzQgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZSA9IHsgc3RhcnRpbmdJbmRleDogMCwgY3VycmVudFJhbmdlU3RhcnQ6IDEgfQogICAgcHVzaGJ5dGVzIDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTUgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MQogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSBHbG9iYWwuemVyb0FkZHJlc3MKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM8MzI+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNDQgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gdGhpcy5zYWx0LnZhbHVlID0gVHhuLnR4SWQKICAgIHR4biBUeElECiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25Db21wb3NhYmxlUGVyY2VudGFnZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25Db21wb3NhYmxlUGVyY2VudGFnZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OTMKICAgIC8vIGNvbnN0IFtuZnRGZWVzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzTkZURmVlcykpCiAgICBieXRlYyAzNSAvLyAibmZ0X2ZlZXMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBwdXNoaW50IDcyIC8vIDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NwogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMzEgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkzCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmluaXRbcm91dGluZ10oKSAtPiB2b2lkOgppbml0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTcKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQgLy8gbXVzdCBiZSBjYWxsZWQgZnJvbSB0aGUgZmFjdG9yeQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIGFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIEVSUl9OT1RfQVBQTElDQUJMRV9UT19USElTX0FVQ1RJT04pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgKICAgIC8vIGFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIEVSUl9OT1RfQVBQTElDQUJMRV9UT19USElTX0FVQ1RJT04pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXJ0IC8vIG5vdCBhcHBsaWNhYmxlIHRvIHRoaXMgYXVjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTkKICAgIC8vIGFzc2VydCh3ZWlnaHRMaXN0TGVuZ3RoID49IDMsIEVSUl9NVVNUX0FMTE9DQVRFX0FUX0xFQVNUX1RIUkVFX0hJR0hFU1RfQklEU19DSFVOS1MpCiAgICBkdXAKICAgIHB1c2hpbnQgMyAvLyAzCiAgICA+PQogICAgYXNzZXJ0IC8vIG11c3QgYWxsb2NhdGUgYXQgbGVhc3QgdGhyZWUgaGlnaGVzdCBiaWRzIGNodW5rcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDIKICAgIC8vIGNvbnN0IHdlaWdodHNNQlI6IHVpbnQ2NCA9IHdlaWdodExpc3RMZW5ndGggKiB0aGlzLm1icigpLndlaWdodHMKICAgIGludGMgMTQgLy8gMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA0LTYxMQogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB3ZWlnaHRzTUJSLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA3CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDQtNjExCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHdlaWdodHNNQlIsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICB1bmNvdmVyIDIKICAgIGd0eG5zIEFtb3VudAogICAgdW5jb3ZlciAyCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAoKaW5pdF93aGlsZV90b3BAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjEzCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGRpZyAyCiAgICA8CiAgICBieiBpbml0X2FmdGVyX3doaWxlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjE0CiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIGR1cG4gMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyNiAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTQKICAgIC8vIHRoaXMud2VpZ2h0cyhpKS5jcmVhdGUoKQogICAgcHVzaGludCAzMjc2OCAvLyAzMjc2OAogICAgYm94X2NyZWF0ZQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxMwogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHdlaWdodExpc3RMZW5ndGg7IGkgKz0gMSkgewogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQogICAgYiBpbml0X3doaWxlX3RvcEAyCgppbml0X2FmdGVyX3doaWxlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjE2CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IHdlaWdodExpc3RMZW5ndGgKICAgIGRpZyAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTYKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmRlbGV0ZUFwcGxpY2F0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXBwbGljYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyMQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBtdXN0IGJlIGNhbGxlZCBmcm9tIHRoZSBmYWN0b3J5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyMwogICAgLy8gY29uc3QgZXhwZWN0ZWRSZWZ1bmRDb3VudDogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSA+IDEgPyB0aGlzLmJpZElELnZhbHVlIC0gMiA6IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBjb25zdCBleHBlY3RlZFJlZnVuZENvdW50OiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlID4gMSA/IHRoaXMuYmlkSUQudmFsdWUgLSAyIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICA+CiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X2ZhbHNlQDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjIzCiAgICAvLyBjb25zdCBleHBlY3RlZFJlZnVuZENvdW50OiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlID4gMSA/IHRoaXMuYmlkSUQudmFsdWUgLSAyIDogMAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMiAvLyAyCiAgICAtCgpkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNAogICAgLy8gYXNzZXJ0KHRoaXMucmVmdW5kQ291bnQudmFsdWUgPT09IGV4cGVjdGVkUmVmdW5kQ291bnQsIEVSUl9OT1RfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MwogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAyOCAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjQKICAgIC8vIGFzc2VydCh0aGlzLnJlZnVuZENvdW50LnZhbHVlID09PSBleHBlY3RlZFJlZnVuZENvdW50LCBFUlJfTk9UX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gbm90IGFsbCByZWZ1bmRzIGNvbXBsZXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gYXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTkgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNQogICAgLy8gYXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXJ0IC8vIHByaXplIG5vdCBjbGFpbWVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gYXNzZXJ0KHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUkFGRkxFX1dJTk5FUl9IQVNfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjEgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjYKICAgIC8vIGFzc2VydCh0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9XSU5ORVJfSEFTX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2VydCAvLyByYWZmbGUgd2lubmVyIGhhcyBub3QgY2xhaW1lZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjcKICAgIC8vIGNvbnN0IHJlZnVuZHNDb21wbGV0ZSA9IHRoaXMuYmlkSUQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNwogICAgLy8gY29uc3QgcmVmdW5kc0NvbXBsZXRlID0gdGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDIKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMyAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNwogICAgLy8gY29uc3QgcmVmdW5kc0NvbXBsZXRlID0gdGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjgKICAgIC8vIGFzc2VydChyZWZ1bmRzQ29tcGxldGUsIEVSUl9OT1RfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBhc3NlcnQgLy8gbm90IGFsbCByZWZ1bmRzIGNvbXBsZXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyOQogICAgLy8gYXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX0hJR0hFU1RfQklEU19CT1hFUykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI5CiAgICAvLyBhc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIEVSUl9TVElMTF9IQVNfSElHSEVTVF9CSURTX0JPWEVTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIGFzc2VydCAvLyBzdGlsbCBoYXMgaGlnaGVzdCBiaWRzIGJveGVzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMQogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDkgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMxCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMyLTYzNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjM0CiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjM1CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMi02MzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMyLTYzNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQxLTY0NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQzCiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MS02NDUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQxLTY0NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDktNjUzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTEKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0OS02NTIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ5LTY1MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxOQogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9mYWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjMKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgYiBkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X21lcmdlQDQKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNhbmNlbFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYyCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTVVTVF9CRV9DQUxMRURfRlJPTV9GQUNUT1JZKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0IC8vIG11c3QgYmUgY2FsbGVkIGZyb20gdGhlIGZhY3RvcnkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYzCiAgICAvLyBhc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzMgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjYzCiAgICAvLyBhc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPAogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2NAogICAgLy8gYXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX0hJR0hFU1RfQklEU19CT1hFUykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY0CiAgICAvLyBhc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIEVSUl9TVElMTF9IQVNfSElHSEVTVF9CSURTX0JPWEVTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIGFzc2VydCAvLyBzdGlsbCBoYXMgaGlnaGVzdCBiaWRzIGJveGVzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2NgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjYKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjYW5jZWxfZWxzZV9ib2R5QDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY3LTY3MAogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY4CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY4CiAgICAvLyBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2OQogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjkKICAgIC8vIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NjctNjcwCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFt0aGlzLnNlbGxlci52YWx1ZV0sCiAgICAvLyB9KQogICAgYnl0ZWMgNDUgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgwCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNhbmNlbF9hZnRlcl9pZl9lbHNlQDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgxLTY4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgzCiAgICAvLyBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njg0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MS02ODUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjgxLTY4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjYW5jZWxfYWZ0ZXJfaWZfZWxzZUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODktNjkzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTEKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4OS02OTIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njg5LTY5MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2MAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2FuY2VsX2Vsc2VfYm9keUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzItNjc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3NAogICAgLy8gYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzQKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njc1CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3Mi02NzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzItNjc3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjYW5jZWxfYWZ0ZXJfaWZfZWxzZUA2CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nYXRlZEJpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTgtNzAyCiAgICAvLyBnYXRlZEJpZCgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIgLy8gMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzAzCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzAzCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDQKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA2CiAgICAvLyBhc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBhc3NlcnQgLy8gYXVjdGlvbiBpcyBub3QgbGl2ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDcKICAgIC8vIGFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA3CiAgICAvLyBhc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcwNwogICAgLy8gYXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGFzc2VydCAvLyBHYXRlIGNoZWNrIGZhaWxlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDkKICAgIC8vIHRoaXMuY3JlYXRlQmlkKHBheW1lbnQsIG1hcmtldHBsYWNlKQogICAgY2FsbHN1YiBjcmVhdGVCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk4LTcwMgogICAgLy8gZ2F0ZWRCaWQoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5iaWRbcm91dGluZ10oKSAtPiB2b2lkOgpiaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMgogICAgLy8gYmlkKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgbWFya2V0cGxhY2U6IEFjY291bnQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTMKICAgIC8vIGFzc2VydCh0aGlzLmlzTGl2ZSgpLCBFUlJfQVVDVElPTl9OT1RfTElWRSkKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUKICAgIGFzc2VydCAvLyBhdWN0aW9uIGlzIG5vdCBsaXZlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxNAogICAgLy8gYXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gZ2F0ZUlEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5R2F0ZUlEIH0pCiAgICBieXRlYyAyNCAvLyAiZ2F0ZV9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzE0CiAgICAvLyBhc3NlcnQodGhpcy5nYXRlSUQudmFsdWUgPT09IDAsIEVSUl9IQVNfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAhCiAgICBhc3NlcnQgLy8gVGhpcyBoYXMgYSBnYXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxNgogICAgLy8gdGhpcy5jcmVhdGVCaWQocGF5bWVudCwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTIKICAgIC8vIGJpZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nYXRlZEJpZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmdhdGVkQmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTktNzI0CiAgICAvLyBnYXRlZEJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDMgLy8gMwogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMiAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI1CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI1CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjYKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI4CiAgICAvLyBhc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBhc3NlcnQgLy8gYXVjdGlvbiBpcyBub3QgbGl2ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjkKICAgIC8vIGFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI5CiAgICAvLyBhc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyOQogICAgLy8gYXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciAyCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgY2FsbHN1YiBnYXRlQ2hlY2sKICAgIGFzc2VydCAvLyBHYXRlIGNoZWNrIGZhaWxlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzEKICAgIC8vIHRoaXMuY3JlYXRlQmlkQXNhKHBheW1lbnQsIGFzc2V0WGZlciwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZEFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTktNzI0CiAgICAvLyBnYXRlZEJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgZ2F0ZVR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmJpZEFzYVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzM0LTczOAogICAgLy8gYmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyIC8vIDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50OFszMl0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzM5CiAgICAvLyBhc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBhc3NlcnQgLy8gYXVjdGlvbiBpcyBub3QgbGl2ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDAKICAgIC8vIGFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjQgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0MAogICAgLy8gYXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgIQogICAgYXNzZXJ0IC8vIFRoaXMgaGFzIGEgZ2F0ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIHRoaXMuY3JlYXRlQmlkQXNhKHBheW1lbnQsIGFzc2V0WGZlciwgbWFya2V0cGxhY2UpCiAgICBjYWxsc3ViIGNyZWF0ZUJpZEFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzQtNzM4CiAgICAvLyBiaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlZnVuZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyByZWZ1bmRCaWQoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJhZmZsZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJhZmZsZToKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDMKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gYXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MQogICAgLy8gYXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBhc3NlcnQgLy8gYXVjdGlvbiBoYXMgbm90IGVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gYXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgRVJSX1dJTk5FUl9BTFJFQURZX0RSQVdOKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MgogICAgLy8gYXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9PT0gMCwgRVJSX1dJTk5FUl9BTFJFQURZX0RSQVdOKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIGFzc2VydCAvLyB3aW5uZXIgYWxyZWFkeSBkcmF3bgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODcKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTcKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMjkgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBpZiAodGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4OQogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZCAtIDgKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18yIC8vIDgKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE3CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDI5IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4OQogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZCAtIDgKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTIKICAgIC8vIGNvbnN0IHJvdW5kVG9Vc2U6IHVpbnQ2NCA9IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyAoNCAqIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE3CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDI5IC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5MgogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzEKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMCAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5MgogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDQKICAgICoKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk0CiAgICAvLyBhc3NlcnQoR2xvYmFsLnJvdW5kID49IHJvdW5kVG9Vc2UgKyA4LCBFUlJfTk9UX0VOT1VHSF9USU1FKQogICAgZ2xvYmFsIFJvdW5kCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgICsKICAgID49CiAgICBhc3NlcnQgLy8gbm90IGVub3VnaCB0aW1lIGhhcyBwYXNzZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk2LTc5OQogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTkKICAgIC8vIGNvbnN0IFtvdGhlckFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNPdGhlckFwcExpc3QpKQogICAgYnl0ZWMgMzkgLy8gIm9hbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk3CiAgICAvLyBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTgKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgc3dhcAogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEyCiAgICAvLyBzYWx0ID0gR2xvYmFsU3RhdGU8Ynl0ZXM8MzI+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2FsdCB9KQogICAgYnl0ZWMgNDQgLy8gInNhbHQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5OAogICAgLy8gYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk2LTc5OQogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MTg5MzkyYzUgLy8gbWV0aG9kICJnZXQodWludDY0LGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4W10pCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICBidXJ5IDEyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwMQogICAgLy8gaWYgKHNlZWQubGVuZ3RoID09PSAwKSB7CiAgICBsZW4KICAgIGR1cAogICAgYnVyeSAzCiAgICBibnogcmFmZmxlX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxCiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMjAgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MQogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIwIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODAyCiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDYKICAgIC8vIGNvbnN0IHJuZ1N0YXRlID0gcGNnNjRJbml0KHNlZWQuc2xpY2UoMCwgMTYpKQogICAgaW50Y18wIC8vIDAKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgID49CiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBkaWcgMgogICAgPj0KICAgIHB1c2hpbnQgMTYgLy8gMTYKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGRpZyAxMgogICAgY292ZXIgMgogICAgc3Vic3RyaW5nMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxNgogICAgLy8gYXNzZXJ0KHNlZWQubGVuZ3RoID09PSAxNikKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICA9PQogICAgYXNzZXJ0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE5CiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5MgogICAgLy8gY29uc3Qgc3RhdGUgPSBfX3BjZzMyU3RlcCgwLCBpbmNyKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTcKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjE5CiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICBpbnRjIDggLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxOAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjkzCiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhzdGF0ZSwgaW5pdGlhbFN0YXRlKQogICAgdW5jb3ZlciAyCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTcKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxOQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTgKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGNvdmVyIDIKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIHVuY292ZXIgMgogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE4CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTgKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5MwogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoxNwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDcgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjIwCiAgICAvLyBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDgpLCBwY2dTZWNvbmRJbmNyZW1lbnQpLAogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTgKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxOC0yMQogICAgLy8gcmV0dXJuIFsKICAgIC8vICAgICBfX3BjZzMySW5pdChvcC5leHRyYWN0VWludDY0KHNlZWQsIDApLCBwY2dGaXJzdEluY3JlbWVudCksCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIC8vIF0KICAgIHN3YXAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnVyeSAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDkKICAgIC8vIGxldCB1cHBlckJvdW5kID0gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NwogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTYgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODA5CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSAzCiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxMAogICAgLy8gaWYgKHVwcGVyQm91bmQgPCBNQVhfVUlOVDY0KSB7CiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIDwKICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODExCiAgICAvLyB1cHBlckJvdW5kID0gdXBwZXJCb3VuZCArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKCnJhZmZsZV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjMwCiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgRHluYW1pY0FycmF5PGFyYzQuVWludDY0PigpCiAgICBieXRlYyA0NiAvLyAweDAwMDAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDIKICAgIC8vIGlmICh1cHBlckJvdW5kICE9PSAwKSB7CiAgICBkdXAKICAgIGJ6IHJhZmZsZV9lbHNlX2JvZHlAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDMKICAgIC8vIGFzc2VydCh1cHBlckJvdW5kID4gMSkKICAgIGR1cG4gMgogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGFzc2VydAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo0NAogICAgLy8gYXNzZXJ0KGxvd2VyQm91bmQgPCB1cHBlckJvdW5kIC0gMSkKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE0CiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ0CiAgICAvLyBhc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxKQogICAgPgogICAgYXNzZXJ0CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcofnZhbHVlLCAxKQogICAgZGlnIDgKICAgIGR1cAogICAgfgogICAgaW50Y18xIC8vIDEKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1MwogICAgLy8gY29uc3QgdGhyZXNob2xkOiB1aW50NjQgPSBfX3VpbnQ2NFR3b3MoYWJzb2x1dGVCb3VuZCkgJSBhYnNvbHV0ZUJvdW5kCiAgICBzd2FwCiAgICAlCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTUKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgNgogICAgZGlnIDExCiAgICBidXJ5IDEwCgpyYWZmbGVfd2hpbGVfdG9wQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NQogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTUKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgPAogICAgYnogcmFmZmxlX2FmdGVyX3doaWxlQDI1CgpyYWZmbGVfd2hpbGVfdG9wQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo5CiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBkaWcgOQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE3CiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNyAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6OQogICAgLy8gY29uc3QgbmV3U3RhdGUxID0gX19wY2czMlN0ZXAoc3RhdGVbMF0sIHBjZ0ZpcnN0SW5jcmVtZW50KQogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTgKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSAxMQogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTIgPSBfX3BjZzMyU3RlcChzdGF0ZVsxXSwgbmV3U3RhdGUxID09PSAwID8gb3Auc2hsKHBjZ1NlY29uZEluY3JlbWVudCwgMSkgOiBwY2dTZWNvbmRJbmNyZW1lbnQpCiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgYm56IHJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDI5CiAgICBwdXNoaW50IDI4ODUzOTAwODE3Nzc5MjY4MTggLy8gMjg4NTM5MDA4MTc3NzkyNjgxOAoKcmFmZmxlX3Rlcm5hcnlfbWVyZ2VAMzA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE3CiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGRpZyA1CiAgICBkdXAKICAgIGludGMgNyAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTgKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEyCiAgICAvLyByZXR1cm4gW1tuZXdTdGF0ZTEsIG5ld1N0YXRlMl0sIG9wLnNobChfX3BjZzMyT3V0cHV0KHN0YXRlWzBdKSwgMzIpIHwgX19wY2czMk91dHB1dChzdGF0ZVsxXSldCiAgICBkaWcgOQogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBkaWcgNQogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICBzaGwKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBfX3BjZzMyT3V0cHV0CiAgICB8CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTcKICAgIC8vIGNvbnN0IFtuZXdTdGF0ZSwgY2FuZGlkYXRlXSA9IF9fcGNnNjRVbmJvdW5kZWRSYW5kb20oc3RhdGUpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAxNgogICAgc3dhcAogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU5CiAgICAvLyBpZiAoY2FuZGlkYXRlID49IHRocmVzaG9sZCkgewogICAgZGlnIDQKICAgID49CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAyNAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MAogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgZGlnIDcKICAgIGRpZyAxMAogICAgJQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTQKICAgIC8vIGNvbnN0IHJuZ1Jlc3VsdCA9IHBjZzY0UmFuZG9tKHJuZ1N0YXRlLCAxLCB1cHBlckJvdW5kLCAxKQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjAKICAgIC8vIHJlc3VsdC5wdXNoKG5ldyBhcmM0LlVpbnQ2NCgoY2FuZGlkYXRlICUgYWJzb2x1dGVCb3VuZCkgKyBsb3dlckJvdW5kKSkKICAgICsKICAgIGl0b2IKICAgIGRpZyAxNAogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdCAvLyBvbiBlcnJvcjogbWF4IGFycmF5IGxlbmd0aCBleGNlZWRlZAogICAgc3dhcAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHJlcGxhY2UyIDAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTUKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgZGlnIDYKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDcKICAgIGJ1cnkgMTAKICAgIGIgcmFmZmxlX3doaWxlX3RvcEAyMAoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMjQ6CiAgICBidXJ5IDEwCiAgICBiIHJhZmZsZV93aGlsZV90b3BAMjIKCnJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDI5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMAogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIGIgcmFmZmxlX3Rlcm5hcnlfbWVyZ2VAMzAKCnJhZmZsZV9hZnRlcl93aGlsZUAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjcKICAgIC8vIHJldHVybiBbc3RhdGUsIHJlc3VsdF0KICAgIGRpZyA5CiAgICBwdXNoYnl0ZXMgMHgwMDEyCiAgICBjb25jYXQKICAgIGRpZyAxMwogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxNQogICAgLy8gdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID0gcm5nUmVzdWx0WzFdWzBdLmFzVWludDY0KCkKICAgIGR1cAogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50MTYKICAgIGRpZyAxCiAgICBsZW4KICAgIHN1YnN0cmluZzMKICAgIHB1c2hpbnQgMiAvLyAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEzIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE1CiAgICAvLyB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPSBybmdSZXN1bHRbMV1bMF0uYXNVaW50NjQoKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzEKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMCAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxNgogICAgLy8gdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzc5CiAgICAvLyByYWZmbGUoKTogdm9pZCB7CiAgICBiIHJhZmZsZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlQDkKCnJhZmZsZV9lbHNlX2JvZHlAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjUwCiAgICAvLyBhYnNvbHV0ZUJvdW5kID0gb3AuYnRvaShCeXRlcyhCaWdVaW50KDIgKiogNjQpIC0gQmlnVWludChsb3dlckJvdW5kKSkpCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGJ1cnkgOQogICAgYiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxOQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZmluZFdpbm5lcltyb3V0aW5nXSgpIC0+IHZvaWQ6CmZpbmRXaW5uZXI6CiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjAKICAgIC8vIGFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIEVSUl9OT1RfQVBQTElDQUJMRV9UT19USElTX0FVQ1RJT04pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjAKICAgIC8vIGFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA+IDAsIEVSUl9OT1RfQVBQTElDQUJMRV9UT19USElTX0FVQ1RJT04pCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXJ0IC8vIG5vdCBhcHBsaWNhYmxlIHRvIHRoaXMgYXVjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIGFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIEVSUl9BVUNUSU9OX0hBU19OT1RfRU5ERUQpCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjEKICAgIC8vIGFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUsIEVSUl9BVUNUSU9OX0hBU19OT1RfRU5ERUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPgogICAgYXNzZXJ0IC8vIGF1Y3Rpb24gaGFzIG5vdCBlbmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjIKICAgIC8vIGFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgIT09IDAsIEVSUl9XSU5OSU5HX05VTUJFUl9OT1RfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEzIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIyCiAgICAvLyBhc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlICE9PSAwLCBFUlJfV0lOTklOR19OVU1CRVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2VydCAvLyB3aW5uaW5nIG51bWJlciBub3QgZm91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyBhc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9BTFJFQURZX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTEwCiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxNSAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODIzCiAgICAvLyBhc3NlcnQodGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9BTFJFQURZX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyB3aW5uZXIgYWxyZWFkeSBmb3VuZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzQKICAgIC8vIGxldCB7IHN0YXJ0aW5nSW5kZXgsIGN1cnJlbnRSYW5nZVN0YXJ0IH0gPSB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyQ3Vyc29ycyB9KQogICAgYnl0ZWMgMzQgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzNAogICAgLy8gbGV0IHsgc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnQgfSA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGludGNfMCAvLyAwCgpmaW5kV2lubmVyX3doaWxlX3RvcEAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDM2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgID4KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDM3CiAgICAvLyBjb25zdCBib3hTdGFrZSA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2ldLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzcKICAgIC8vIGNvbnN0IGJveFN0YWtlID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbaV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDM4CiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlU3RhcnQgKyBib3hTdGFrZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzOAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZVN0YXJ0ICsgYm94U3Rha2UpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGJ1cnkgOAogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGRpZyAyCiAgICBpdG9iCiAgICBkaWcgMgogICAgaXRvYgogICAgY29uY2F0CgpmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjcKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB3aW5uaW5nQm94SW5mb1swXQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyOAogICAgLy8gbGV0IGN1cnJlbnRSYW5nZVN0YXJ0ID0gd2lubmluZ0JveEluZm9bMV0KICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMQogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjIgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzEKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgLSBzdGFydGluZ0luZGV4CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMyCiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzQKICAgIC8vIGNvbnN0IGNodW5rT2Zmc2V0OiB1aW50NjQgPSBzdGFydGluZ0luZGV4ICUgQ2h1bmtTaXplCiAgICBzd2FwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgJQogICAgZHVwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gY29uc3QgcmVtYWluaW5nSW5DaHVuazogdWludDY0ID0gQ2h1bmtTaXplIC0gY2h1bmtPZmZzZXQKICAgIGludGMgNSAvLyA0MDk2CiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzYKICAgIC8vIGlmIChpdGVyYXRpb25BbW91bnQgPiByZW1haW5pbmdJbkNodW5rKSB7CiAgICA+CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMwogICAgZGlnIDQKICAgIGJ1cnkgNAoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0MAogICAgLy8gY29uc3Qgd2VpZ2h0ID0gY2xvbmUodGhpcy53ZWlnaHRzKHN0YXJ0aW5nSW5kZXggLyBDaHVua1NpemUpLnZhbHVlKQogICAgZGlnIDIKICAgIGludGMgNSAvLyA0MDk2CiAgICAvCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI2IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQyCiAgICAvLyBlbnN1cmVCdWRnZXQoKGl0ZXJhdGlvbkFtb3VudCAqIDYwKSkKICAgIGRpZyAzCiAgICBwdXNoaW50IDYwIC8vIDYwCiAgICAqCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnN1cmVfYnVkZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxCgpmaW5kV2lubmVyX3doaWxlX3RvcEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgNAogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl93aGlsZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDUKICAgIC8vIGNvbnN0IGFtb3VudCA9IHdlaWdodFtjaHVua09mZnNldCArIGldLmFzVWludDY0KCkKICAgIGRpZyA3CiAgICBkaWcgMQogICAgKwogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGRpZyA5CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NDYKICAgIC8vIGlmIChhbW91bnQgPT09IHRoaXMuaGlnaGVzdEJpZC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE3IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ2CiAgICAvLyBpZiAoYW1vdW50ID09PSB0aGlzLmhpZ2hlc3RCaWQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBjdXJyZW50UmFuZ2VTdGFydCArPSBhbW91bnQKICAgIGRpZyAyCiAgICArCiAgICBidXJ5IDIKCmZpbmRXaW5uZXJfYmxvY2tAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BANAoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1MQogICAgLy8gY3VycmVudFJhbmdlRW5kID0gY3VycmVudFJhbmdlU3RhcnQgKyBhbW91bnQKICAgIGRpZyAyCiAgICBkdXAKICAgIHVuY292ZXIgMgogICAgKwogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1MgogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTMgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTIKICAgIC8vIGlmICh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPj0gY3VycmVudFJhbmdlU3RhcnQgJiYgdGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlRW5kKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1MgogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNwogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1MwogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSB0aGlzLmxvY2F0aW9ucyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUKICAgIGRpZyAyCiAgICBkaWcgMQogICAgKwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzMKICAgIC8vIGxvY2F0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjY291bnQ+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4TG9jYXRpb25zIH0pCiAgICBieXRlYyAzNiAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTMKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gdGhpcy5sb2NhdGlvbnMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE1IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTMKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gdGhpcy5sb2NhdGlvbnMoc3RhcnRpbmdJbmRleCArIGkpLnZhbHVlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDEwOgogICAgZGlnIDYKICAgIGJ1cnkgMgogICAgYiBmaW5kV2lubmVyX2Jsb2NrQDExCgpmaW5kV2lubmVyX2FmdGVyX3doaWxlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTkKICAgIC8vIHN0YXJ0aW5nSW5kZXg6IChzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50KSwKICAgIGRpZyAyCiAgICBkaWcgNAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTgtODYxCiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0gewogICAgLy8gICBzdGFydGluZ0luZGV4OiAoc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCksCiAgICAvLyAgIGN1cnJlbnRSYW5nZVN0YXJ0OiBjdXJyZW50UmFuZ2VTdGFydCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGRpZyAyCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDM0IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTgtODYxCiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0gewogICAgLy8gICBzdGFydGluZ0luZGV4OiAoc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCksCiAgICAvLyAgIGN1cnJlbnRSYW5nZVN0YXJ0OiBjdXJyZW50UmFuZ2VTdGFydCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gZmluZFdpbm5lcihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIHN0YXJ0aW5nSW5kZXggKz0gQ2h1bmtTaXplCiAgICBkaWcgMgogICAgaW50YyA1IC8vIDQwOTYKICAgICsKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDEKICAgIGRpZyA1CiAgICBidXJ5IDIKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMTQKCmZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGRpZyAyCiAgICBpdG9iCiAgICBkaWcgMgogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNQogICAgLy8gY29uc3Qgd2lubmluZ0JveEluZm8gPSB0aGlzLmdldFdpbm5lcldlaWdodEJveEluZm8oKQogICAgYiBmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvQDE5CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRNQlJbcm91dGluZ10oKSAtPiB2b2lkOgpyZWZ1bmRNQlI6CiAgICBpbnRjXzAgLy8gMAogICAgZHVwbiAzCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cG4gMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjQKICAgIC8vIHJlZnVuZE1CUihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY1CiAgICAvLyBhc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxOSAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY1CiAgICAvLyBhc3NlcnQodGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9OT1RfQ0xBSU1FRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NlcnQgLy8gcHJpemUgbm90IGNsYWltZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY3CiAgICAvLyBhc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjcKICAgIC8vIGFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZWZ1bmRNQlJfYm9vbF90cnVlQDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTUgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2NwogICAgLy8gYXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHJlZnVuZE1CUl9ib29sX2ZhbHNlQDQKCnJlZnVuZE1CUl9ib29sX3RydWVAMzoKICAgIGludGNfMSAvLyAxCgpyZWZ1bmRNQlJfYm9vbF9tZXJnZUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjcKICAgIC8vIGFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGFzc2VydCAvLyB3aW5uZXIgbm90IGZvdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gYXNzZXJ0KHRoaXMuYmlkSUQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2OQogICAgLy8gYXNzZXJ0KHRoaXMuYmlkSUQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAyCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMjMgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjkKICAgIC8vIGFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA1CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAyCiAgICAhPQogICAgYXNzZXJ0IC8vIGFsbCByZWZ1bmRzIGNvbXBsZXRlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3MgogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlIC0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIHN3YXAKICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3MwogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gcmVtYWluZGVyID4gaXRlcmF0aW9uQW1vdW50ID8gaXRlcmF0aW9uQW1vdW50IDogcmVtYWluZGVyCiAgICBkdXAKICAgIGRpZyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgID4KICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc1CiAgICAvLyBlbnN1cmVCdWRnZXQoKGl0ZXJhdGlvbkFtb3VudCAqIDYwKSkKICAgIHB1c2hpbnQgNjAgLy8gNjAKICAgICoKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc3CiAgICAvLyBjb25zdCB7IGJpZHMsIGJpZHNCeUFkZHJlc3MsIGxvY2F0aW9ucyB9ID0gdGhpcy5tYnIoKQogICAgaW50YyAxMCAvLyAzNDkwMAogICAgYnVyeSA2CiAgICBidXJ5IDQKCnJlZnVuZE1CUl93aGlsZV90b3BANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZHVwMgogICAgKwogICAgZGlnIDQKICAgID4KICAgIGJ6IHJlZnVuZE1CUl9hZnRlcl93aGlsZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODEKICAgIC8vIGNvbnN0IHsgcmVmdW5kZWQsIGFjY291bnQgfSA9IHRoaXMuYmlkcyhpKS52YWx1ZQogICAgZGlnIDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAzMiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgxCiAgICAvLyBjb25zdCB7IHJlZnVuZGVkLCBhY2NvdW50IH0gPSB0aGlzLmJpZHMoaSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIHB1c2hpbnQgNTc2IC8vIDU3NgogICAgZ2V0Yml0CiAgICBzd2FwCiAgICBleHRyYWN0IDAgMzIKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgyCiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyA0CiAgICAhPQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgzCiAgICAvLyB0aGlzLnJlZnVuZEJpZChpKQogICAgZGlnIDMKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDEwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODgKICAgIC8vIHRoaXMuYmlkcyhpKS5kZWxldGUoKQogICAgZGlnIDcKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIGRpZyA5CiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4OQogICAgLy8gaWYgKHRoaXMuYmlkc0J5QWRkcmVzcyhhY2NvdW50KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlZnVuZE1CUl9pZl9ib2R5QDExCiAgICBkaWcgNAogICAgYnVyeSAzCgpyZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAxNDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAwLTkwNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDAtOTA0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYWNjb3VudCwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAwLTkwNQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDQKICAgIGIgcmVmdW5kTUJSX3doaWxlX3RvcEA2CgpyZWZ1bmRNQlJfaWZfYm9keUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkwCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmJpZHNCeUFkZHJlc3MoYWNjb3VudCkudmFsdWUKICAgIGRpZyA2CiAgICBkdXAKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5MQogICAgLy8gdGhpcy5iaWRzQnlBZGRyZXNzKGFjY291bnQpLmRlbGV0ZSgpCiAgICBzd2FwCiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkyCiAgICAvLyByZWZ1bmRBbW91bnQgKz0gYmlkc0J5QWRkcmVzcwogICAgaW50YyAxMSAvLyA1MzQwMAogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NAogICAgLy8gaWYgKHRoaXMubG9jYXRpb25zKGxvYykuZXhpc3RzKSB7CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzMwogICAgLy8gbG9jYXRpb25zID0gQm94TWFwPHVpbnQ2NCwgQWNjb3VudD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhMb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDM2IC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICBkdXAKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTQKICAgIC8vIGlmICh0aGlzLmxvY2F0aW9ucyhsb2MpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiByZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTUKICAgIC8vIHRoaXMubG9jYXRpb25zKGxvYykuZGVsZXRlKCkKICAgIGRpZyA1CiAgICBib3hfZGVsCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyByZWZ1bmRBbW91bnQgKz0gbG9jYXRpb25zCiAgICBpbnRjIDEyIC8vIDcyMzAwCiAgICBidXJ5IDMKICAgIGIgcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTQKCnJlZnVuZE1CUl9hZnRlcl93aGlsZUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA4CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMgogICAgLy8gcmVmdW5kTUJSQ3Vyc29yID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRNQlJDdXJzb3IgfSkKICAgIGJ5dGVjIDIzIC8vICJyZWZ1bmRfbWJyX2N1cnNvciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA4CiAgICAvLyB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSArPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDIKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMyAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwOAogICAgLy8gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjQKICAgIC8vIHJlZnVuZE1CUihpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmVmdW5kTUJSX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIHJlZnVuZE1CUl9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNsYWltUHJpemVbcm91dGluZ10oKSAtPiB2b2lkOgpjbGFpbVByaXplOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMwogICAgLy8gYXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMwogICAgLy8gYXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBhc3NlcnQgLy8gYXVjdGlvbiBoYXMgbm90IGVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxNAogICAgLy8gYXNzZXJ0KCF0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX0FMUkVBRFlfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAxOSAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyBhc3NlcnQoIXRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfQUxSRUFEWV9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIGFzc2VydCAvLyBwcml6ZSBhbHJlYWR5IGNsYWltZWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE3CiAgICAvLyBjb25zdCB7IGFjY291bnQsIGFtb3VudCwgbWFya2V0cGxhY2UgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE3CiAgICAvLyBjb25zdCB7IGFjY291bnQsIGFtb3VudCwgbWFya2V0cGxhY2UgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDMyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxNwogICAgLy8gY29uc3QgeyBhY2NvdW50LCBhbW91bnQsIG1hcmtldHBsYWNlIH0gPSB0aGlzLmJpZHModGhpcy5iaWRJRC52YWx1ZSAtIDEpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAzMiAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGV4dHJhY3QgNDAgMzIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM1CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNQogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA0MQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzYtMjM5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIGFyZ3M6IFtidXllcl0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzcKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMzcKICAgIC8vIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM2LTIzOQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbYnV5ZXJdLAogICAgLy8gfSkKICAgIGJ5dGVjIDQ1IC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24udHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJANDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMQogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIxCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVByaXplX2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2NwogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBha2l0YSwgbWFya2V0cGxhY2UsIHNlbGxlciB9ID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGRpZyAxCiAgICBjYWxsc3ViIGdldEFtb3VudHMKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDExCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgc3dhcAogICAgZHVwCiAgICBwdXNoaW50IDE2IC8vIDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMAogICAgcHVzaGludCAyNCAvLyAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2OQogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMzIKICAgIGRpZyAxMAogICAgKwogICAgYnVyeSAxNAoKY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDMzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzIKICAgIC8vIGlmIChha2l0YUFtb3VudCA+IDApIHsKICAgIGRpZyAxMwogICAgYm56IGNsYWltUHJpemVfaWZfYm9keUAzNAogICAgZGlnIDEzCiAgICBidXJ5IDkKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAzNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc2LTI4MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc4CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzgKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI3Ni0yODAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc2LTI4MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4NC0yODkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODYKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4NgogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDgKICAgIGR1cAogICAgY292ZXIgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjg0LTI4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjg0LTI4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTItMjk3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGR1cAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTItMjk2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI5Mi0yOTcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBidXlTaWRlTWFya2V0cGxhY2UsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDAtMzA1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBzZWxsZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDIKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzAwLTMwNAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogc2VsbGVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDAtMzA1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBzZWxsZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzA4CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDgKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwOS0zMTQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFtb3VudDogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMiAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGRpZyAxMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzA5LTMxMwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYW1vdW50OiBjcmVhdG9yLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDktMzE0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTkgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8gdGhpcy5wcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTExCiAgICAvLyBjbGFpbVByaXplKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xhaW1Qcml6ZV9pZl9ib2R5QDM0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzMKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFraXRhQW1vdW50KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjczCiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCAwLCBha2l0YUFtb3VudCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIGRpZyAxNQogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOQogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMzUKCmNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAzMjoKICAgIGJ1cnkgMTQKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDMzCgpjbGFpbVByaXplX2Vsc2VfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjAKICAgIC8vIGNvbnN0IHsgY3JlYXRvciwgYWtpdGEsIG1hcmtldHBsYWNlLCBzZWxsZXIgfSA9IHRoaXMuZ2V0QW1vdW50cyhhbW91bnQpCiAgICBkaWcgMQogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMQogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTAKICAgIHB1c2hpbnQgMjQgLy8gMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzIyCiAgICAvLyBjb25zdCBha2l0YUFtb3VudDogdWludDY0ID0gdGhpcy5pc1ByaXplQm94LnZhbHVlID8gKGFraXRhICsgY3JlYXRvcikgOiBha2l0YQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjIKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1Qcml6ZV90ZXJuYXJ5X2ZhbHNlQDcKICAgIGRpZyAxMAogICAgKwogICAgYnVyeSAxNAoKY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNQogICAgLy8gaWYgKGFraXRhQW1vdW50ID4gMCkgewogICAgZGlnIDEzCiAgICBibnogY2xhaW1Qcml6ZV9pZl9ib2R5QDkKICAgIGRpZyAxMwogICAgYnVyeSA5CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzMAogICAgLy8gaWYgKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcy5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDcgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMwCiAgICAvLyBpZiAodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMwCiAgICAvLyBpZiAodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzEtMzM3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzMwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzNQogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzUKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDkKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzEtMzM2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMxLTMzNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1CiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjUgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ4LTM1NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUwCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDgKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDgtMzUzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0OC0zNTQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjgKICAgIC8vIGlmIChidXlTaWRlTWFya2V0cGxhY2UuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gaWYgKGJ1eVNpZGVNYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNsYWltUHJpemVfZWxzZV9ib2R5QDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OS0zNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGJ1eVNpZGVNYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzczCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3MwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgZHVwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY5LTM3NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OS0zNzUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGJ1eVNpZGVNYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEwIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4OQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyBpZiAodGhpcy5zZWxsZXIudmFsdWUuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IGNsYWltUHJpemVfZWxzZV9ib2R5QDIzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MC0zOTYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzZWxsZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk0CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5NAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MC0zOTUKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBzZWxsZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTAtMzk2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogc2VsbGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTAKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMAogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIGlmIChBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAyNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTItNDE4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBjcmVhdG9yLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxNAogICAgLy8gYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDE0CiAgICAvLyBhc3NldFJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X3BhcmFtc19nZXQgQXNzZXRDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxNgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDEwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEyLTQxNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMi00MTgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA0CgpjbGFpbVByaXplX2Vsc2VfYm9keUAyNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIxCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjIKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyMgogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNQogICAgLy8gW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBjcmVhdG9yIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjUKICAgIC8vIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDEyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIwLTQyOAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBjcmVhdG9yIH1dLAogICAgLy8gICBjcmVhdG9yLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDIzCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyMC00MjgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIC8vICAgY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNwogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyMC00MjgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIC8vICAgY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA0CgpjbGFpbVByaXplX2Vsc2VfYm9keUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTkKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEwIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMwogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk4LTQwNgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgLy8gICBzZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDEKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDIKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzk4LTQwNgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgLy8gICBzZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDUKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTgtNDA2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBzZWxsZXIgfV0sCiAgICAvLyAgIHNlbGxlciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyNAoKY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3OAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc5CiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODIKICAgIC8vIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIGRpZyA5CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGRpZyA0CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDE0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3Ny0zODUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODAKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODEKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzc3LTM4NQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5U2lkZU1hcmtldHBsYWNlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3Ny0zODUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcG4gMgogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMjEKCmNsYWltUHJpemVfZWxzZV9ib2R5QDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1NwogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzU4CiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzYxCiAgICAvLyBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNSAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTAKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyAxNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTYtMzY0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNiAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTYtMzY0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1Ni0zNjQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE4CgpjbGFpbVByaXplX2Vsc2VfYm9keUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQxCiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDEKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDE0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDE2CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGJ5dGVjIDI3IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgNDcgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgzCiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIHN3YXAKICAgIGJ5dGVjIDI3IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo3MC03MwogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIHB1c2hieXRlcyAweGEyNDAzZGRmIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NzIKICAgIC8vIGFyZ3M6IFtbbmFtZV1dLAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIwMDBjNzI2NTc2NWY2MTc1NjM3NDY5NmY2ZTczCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo3MC03MwogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNiAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDkgLy8gOQogICAgKgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgKGxlbisodWludDY0LGJvb2wxKVtdKQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NzUKICAgIC8vIGFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgOQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGFzc2VydCAvLyBFc2Nyb3cgZG9lcyBub3QgZXhpc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyBhc3NlcnQoaWQgPT09IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuaWQsIEVSUl9XUk9OR19FU0NST1dfRk9SX09QRVJBVElPTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDcgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyBhc3NlcnQoaWQgPT09IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuaWQsIEVSUl9XUk9OR19FU0NST1dfRk9SX09QRVJBVElPTikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBkaWcgMQogICAgPT0KICAgIGFzc2VydCAvLyBXcm9uZyBlc2Nyb3cgZm9yIHRoaXMgb3BlcmF0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4OC05NwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgcHVzaGJ5dGVzIDB4NTgyZmYzODIgLy8gbWV0aG9kICJhcmM1OF9yZWtleVRvUGx1Z2luKHVpbnQ2NCxib29sLHN0cmluZyx1aW50NjRbXSwodWludDY0LHVpbnQ2NClbXSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MgogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTMKICAgIC8vIG5hbWUsCiAgICBwdXNoYnl0ZXMgMHgwMDBjNzI2NTc2NWY2MTc1NjM3NDY5NmY2ZTczCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTQKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUKICAgIC8vIFtdCiAgICBieXRlYyA0NiAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg4LTk3CiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBbMF0sIC8vIGFsbCB0aGUgYWtpdGEgZXNjcm93cyBoYXZlIG1ldGhvZCByZXN0cmljdGlvbnMgd2l0aCBvcHRpbiBiZWluZyBpbmRleCAwCiAgICAvLyAgICAgW10KICAgIC8vICAgXSwKICAgIC8vIH0pCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDEKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjIyCiAgICAvLyBsZXQgY291bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDEzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNAogICAgLy8gaWYgKCFlc2Nyb3cuaXNPcHRlZEluKGFzc2V0KSkgewogICAgc3dhcAogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAzCiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBkaWcgMTIKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyOAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBidXJ5IDExCgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDUKICAgIC8vIGNvbnN0IG1ickFtb3VudDogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogb3B0SW5Db3VudAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBkaWcgMTEKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNy0xMTgKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgNyAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE0CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTMtMTE2CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNy0xMTgKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTEwCiAgICAvLyB3YWxsZXQsCiAgICBkaWcgMwogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMTIKICAgIC8vIFthc3NldC5pZF0sCiAgICBkaWcgMTMKICAgIGl0b2IKICAgIGJ5dGVjIDE0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDctMTE4CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBSZXZlbnVlTWFuYWdlclBsdWdpblN0dWIucHJvdG90eXBlLm9wdEluPih7CiAgICAvLyAgIGFwcElkOiByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHdhbGxldCwKICAgIC8vICAgICB0cnVlLAogICAgLy8gICAgIFthc3NldC5pZF0sCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IG1ickFtb3VudAogICAgLy8gICAgIH0pCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHg2ODM1ZTNiYyAvLyBtZXRob2QgIm9wdEluKHVpbnQ2NCxib29sLHVpbnQ2NFtdLHBheSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5MgogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA2CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwNy0xMTgKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgcHVzaGJ5dGVzIDB4NmNjM2Y2MDYgLy8gbWV0aG9kICJhcmM1OF92ZXJpZnlBdXRoQWRkcmVzcygpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gaWYgKGFtb3VudCA+IDApIHsKICAgIGRpZyA4CiAgICBieiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMy0xMjkKICAgIC8vIGl0eG5Db21wb3NlLm5leHQoCiAgICAvLyAgIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldCwKICAgIC8vICAgfSkKICAgIC8vICkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI1CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA3IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjUKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgOQogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTI4CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMyCiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE1CgpjbGFpbVByaXplX2lmX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzI2CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLCBha2l0YUFtb3VudCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNgogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzI2CiAgICAvLyAoeyBsZWZ0b3ZlciB9ID0gc2VuZFJlZmVycmFsUGF5bWVudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLCBha2l0YUFtb3VudCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDE1CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA5CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAxMAoKY2xhaW1Qcml6ZV90ZXJuYXJ5X2ZhbHNlQDc6CiAgICBidXJ5IDE0CiAgICBiIGNsYWltUHJpemVfdGVybmFyeV9tZXJnZUA4CgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0MwogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18yIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQzCiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyBpZiAoYnV5ZXIuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgZGlnIDMKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUA0MwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDYtMjUxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IGJ1eWVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDkKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0Ni0yNTAKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDYtMjUxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IGJ1eWVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVByaXplX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi50cmFuc2ZlclB1cmNoYXNlVG9CdXllckA0NQoKY2xhaW1Qcml6ZV9lbHNlX2JvZHlANDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1NAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjU0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjU1CiAgICAvLyB0aGlzLnByaXplLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzIgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTUKICAgIC8vIHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTgKICAgIC8vIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgZGlnIDgKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgZGlnIDYKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUzLTI2MQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTYKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTcKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjUzLTI2MQogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIHRydWUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1My0yNjEKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24udHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJANDUKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNsYWltUmFmZmxlUHJpemVbcm91dGluZ10oKSAtPiB2b2lkOgpjbGFpbVJhZmZsZVByaXplOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzEKICAgIC8vIGFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTUgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzMQogICAgLy8gYXNzZXJ0KHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGFzc2VydCAvLyB3aW5uZXIgbm90IGZvdW5kCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzMgogICAgLy8gYXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9BTFJFQURZX1BSSVpFX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NQogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjEgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzIKICAgIC8vIGFzc2VydCghdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIEVSUl9SQUZGTEVfQUxSRUFEWV9QUklaRV9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICEKICAgIGFzc2VydCAvLyByYWZmbGUgcHJpemUgYWxyZWFkeSBjbGFpbWVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzNAogICAgLy8gY29uc3QgeyBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzQKICAgIC8vIGNvbnN0IHsgYXVjdGlvblJhZmZsZVBlcmNlbnRhZ2UgfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgMzUgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzQKICAgIC8vIGNvbnN0IHsgYXVjdGlvblJhZmZsZVBlcmNlbnRhZ2UgfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIHB1c2hpbnQgODAgLy8gODAKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzNQogICAgLy8gY29uc3QgYWtpdGFGZWUgPSBjYWxjUGVyY2VudCh0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSwgYXVjdGlvblJhZmZsZVBlcmNlbnRhZ2UpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MwogICAgLy8gcmFmZmxlQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVBbW91bnQgfSkKICAgIGJ5dGVjIDE4IC8vICJyYWZmbGVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzUKICAgIC8vIGNvbnN0IGFraXRhRmVlID0gY2FsY1BlcmNlbnQodGhpcy5yYWZmbGVBbW91bnQudmFsdWUsIGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZGlnIDEKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwZXJjZW50YWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTM2CiAgICAvLyBjb25zdCBsZWZ0b3ZlcjogdWludDY0ID0gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgLSBha2l0YUZlZQogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzgKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzOAogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzktOTQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogYWtpdGFGZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDEKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA3IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MQogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTM5LTk0MwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGFraXRhRmVlLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzktOTQ0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogYWtpdGFGZWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ2LTk1MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDgKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTUgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0OAogICAgLy8gcmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0Ni05NTAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDYtOTUxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1CiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyMSAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NAogICAgLy8gdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMwCiAgICAvLyBjbGFpbVJhZmZsZVByaXplKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU3LTk2MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTkKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDcgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU5CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjEKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTYxCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTctOTYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFraXRhRmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU3LTk2MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTY1LTk3MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk2NwogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTAKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE1IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NjcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTY1LTk3MAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTY1LTk3MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAOAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2xlYXJXZWlnaHRzQm94ZXNbcm91dGluZ10oKSAtPiB2b2lkOgpjbGVhcldlaWdodHNCb3hlczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc3CiAgICAvLyBjbGVhcldlaWdodHNCb3hlcyhpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gYXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjXzMgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3OAogICAgLy8gYXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBhc3NlcnQgLy8gYXVjdGlvbiBoYXMgbm90IGVuZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gYXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMTkgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3OQogICAgLy8gYXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXJ0IC8vIHByaXplIG5vdCBjbGFpbWVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MAogICAgLy8gYXNzZXJ0KHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUkFGRkxFX05PVF9QUklaRV9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODUKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIxIC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgwCiAgICAvLyBhc3NlcnQodGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUsIEVSUl9SQUZGTEVfTk9UX1BSSVpFX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXJ0IC8vIHJhZmZsZSBub3QgcHJpemUgY2xhaW1lZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODIKICAgIC8vIGVuc3VyZUJ1ZGdldCgoaXRlcmF0aW9uQW1vdW50ICogMzApKQogICAgcHVzaGludCAzMCAvLyAzMAogICAgKgogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKCmNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODQKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZHVwCiAgICBkaWcgMgogICAgPAogICAgYnogY2xlYXJXZWlnaHRzQm94ZXNfYWZ0ZXJfd2hpbGVANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODUKICAgIC8vIGNvbnN0IHJpOiB1aW50NjQgPSAodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgLSAxKSAtIGkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg1CiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg2CiAgICAvLyB0aGlzLndlaWdodHMocmkpLmRlbGV0ZSgpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNAogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI2IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NgogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4NAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAxCiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEAyCgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODkKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC09IGl0ZXJhdGlvbkFtb3VudAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODkKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC09IGl0ZXJhdGlvbkFtb3VudAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODkKICAgIC8vIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC09IGl0ZXJhdGlvbkFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyBjb25zdCByZXR1cm5BbW91bnQ6IHVpbnQ2NCA9IGl0ZXJhdGlvbkFtb3VudCAqIHRoaXMubWJyKCkud2VpZ2h0cwogICAgaW50YyAxNCAvLyAxMzExMzMwMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OTMtOTk4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTk1CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBkaWcgMQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkzLTk5NwogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkzLTk5OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzcKICAgIC8vIGNsZWFyV2VpZ2h0c0JveGVzKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIGl0b2IKICAgIGJ5dGVjIDYgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmlzTGl2ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwNgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBieXRlYyAzNyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDYgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmhhc0JpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmhhc0JpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgcHVzaGludCAzMiAvLyAzMgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDhbMzJdCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwMTcKICAgIC8vIHJldHVybiB0aGlzLmJpZHNCeUFkZHJlc3MoYWRkcmVzcykuZXhpc3RzCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAxNQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyAzNyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDYgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QudXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNwogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coYXBwOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzOAogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMyCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyNyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyA3IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzkKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBhcHAKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgMjcgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgNDcgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyBhc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYXNzZXJ0IC8vIEludmFsaWQgYXBwIHVwZ3JhZGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA0MyAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUzCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDgKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUJhc2VDb250cmFjdC51cGRhdGVBa2l0YURBT1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzgKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI3IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOQogICAgLy8gYXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDAKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6OkNvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4ub3B0aW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRpbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1MwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTQKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBhc3NlcnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1Ni02MwogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU5CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjU2LTYzCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgPT0KICAgIHVuY292ZXIgMgogICAgZ3R4bnMgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NjAKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTYtNjMKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo2NS02OQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjY2CiAgICAvLyBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjY3CiAgICAvLyBhc3NldEFtb3VudDogMCwKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo2NS02OQogICAgLy8gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICB4ZmVyQXNzZXQ6IGFzc2V0CiAgICAvLyB9KS5zdWJtaXQoKQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1MwogICAgLy8gb3B0aW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5uZXdCaWRJRCgpIC0+IHVpbnQ2NDoKbmV3QmlkSUQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gY29uc3QgaWQgPSB0aGlzLmJpZElELnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gY29uc3QgaWQgPSB0aGlzLmJpZElELnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzkKICAgIC8vIHRoaXMuYmlkSUQudmFsdWUgKz0gMQogICAgZHVwCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOQogICAgLy8gdGhpcy5iaWRJRC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDAKICAgIC8vIHJldHVybiBpZAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50KCkgLT4gdWludDY0OgpnZXRNaW5pbXVtQmlkQW1vdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIGlmICh0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gaGlnaGVzdEJpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SGlnaGVzdEJpZCB9KQogICAgYnl0ZWMgMTcgLy8gImhpZ2hlc3RfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDQKICAgIC8vIGlmICh0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZ2V0TWluaW11bUJpZEFtb3VudF9hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ1CiAgICAvLyByZXR1cm4gdGhpcy5oaWdoZXN0QmlkLnZhbHVlICsgdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAxNyAvLyAiaGlnaGVzdF9iaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0NQogICAgLy8gcmV0dXJuIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSArIHRoaXMuYmlkTWluaW11bUluY3JlYXNlLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDcKICAgIC8vIGJpZE1pbmltdW1JbmNyZWFzZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZE1pbmltdW1JbmNyZWFzZSB9KQogICAgYnl0ZWMgNDIgLy8gImJpZF9taW5pbXVtX2luY3JlYXNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDUKICAgIC8vIHJldHVybiB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgKyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIHJldHN1YgoKZ2V0TWluaW11bUJpZEFtb3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0NwogICAgLy8gcmV0dXJuIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1CiAgICAvLyBzdGFydGluZ0JpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0aW5nQmlkIH0pCiAgICBieXRlYyA0MSAvLyAic3RhcnRpbmdfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDcKICAgIC8vIHJldHVybiB0aGlzLnN0YXJ0aW5nQmlkLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5zZXROZXdCaWQoaWQ6IHVpbnQ2NCwgYmlkQW1vdW50OiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcykgLT4gdm9pZDoKc2V0TmV3QmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIHByaXZhdGUgc2V0TmV3QmlkKGlkOiB1aW50NjQsIGJpZEFtb3VudDogdWludDY0LCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gYWNjb3VudDogVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUxLTE1NgogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBiaWRBbW91bnQsCiAgICAvLyAgIHJlZnVuZGVkOiBmYWxzZSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyB9CiAgICBmcmFtZV9kaWcgLTIKICAgIGl0b2IKICAgIGR1cAogICAgY292ZXIgMgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTEKICAgIGNvbmNhdAogICAgYnl0ZWMgMzcgLy8gMHgwMAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZSA9IHsKICAgIGZyYW1lX2RpZyAtMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjIKICAgIC8vIGJpZHMgPSBCb3hNYXA8dWludDY0LCBCaWRJbmZvPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHMgfSkKICAgIGJ5dGVjIDMyIC8vICJiIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MS0xNTYKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUgPSB7CiAgICAvLyAgIGFjY291bnQ6IFR4bi5zZW5kZXIsCiAgICAvLyAgIGFtb3VudDogYmlkQW1vdW50LAogICAgLy8gICByZWZ1bmRlZDogZmFsc2UsCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gfQogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDQgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IHNldE5ld0JpZF9lbHNlX2JvZHlANQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU5CiAgICAvLyBpZiAodGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1OQogICAgLy8gaWYgKHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogc2V0TmV3QmlkX2Vsc2VfYm9keUAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gY29uc3QgbG9jID0gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIGNvbnN0IGxhc3RCaWQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGR1cAogICAgaW50YyA1IC8vIDQwOTYKICAgIC8KICAgIGR1cAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyNiAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjEKICAgIC8vIGNvbnN0IGxhc3RCaWQgPSB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIHVuY292ZXIgMgogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBkdXAyCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBjb25zdCBkaWZmZXJlbmNlOiB1aW50NjQgPSBiaWRBbW91bnQgLSBsYXN0QmlkCiAgICBmcmFtZV9kaWcgLTIKICAgIHN3YXAKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYzCiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMSAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MwogICAgLy8gY29uc3QgbGFzdFdlaWdodGVkVG90YWwgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB1bmNvdmVyIDQKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBzd2FwCiAgICBkaWcgMQogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gZGlmZmVyZW5jZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE2IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlICs9IGRpZmZlcmVuY2UKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NwogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTYgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY1CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gZGlmZmVyZW5jZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY2CiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChiaWRBbW91bnQpCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNAogICAgZnJhbWVfZGlnIDAKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBkaWZmZXJlbmNlKQogICAgdW5jb3ZlciAyCiAgICArCiAgICBpdG9iCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDExIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY3CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGRpZmZlcmVuY2UpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgY292ZXIgMgogICAgcmVwbGFjZTMgLy8gb24gZXJyb3I6IGluZGV4IGFjY2VzcyBpcyBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGxhc3RXZWlnaHRlZFRvdGFsICsgZGlmZmVyZW5jZSkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpzZXROZXdCaWRfYWZ0ZXJfaWZfZWxzZUA4OgogICAgcmV0c3ViCgpzZXROZXdCaWRfZWxzZV9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2OQogICAgLy8gY29uc3QgbG9jID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjIgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzAKICAgIC8vIGFzc2VydChsb2MgPCBDaHVua1NpemUgKiB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSwgRVJSX1RPT19NQU5ZX1BBUlRJQ0lQQU5UUykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTcwCiAgICAvLyBhc3NlcnQobG9jIDwgQ2h1bmtTaXplICogdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUsIEVSUl9UT09fTUFOWV9QQVJUSUNJUEFOVFMpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50YyA1IC8vIDQwOTYKICAgICoKICAgIGRpZyAxCiAgICA+CiAgICBhc3NlcnQgLy8gdG9vIG1hbnkgcGFydGljaXBhbnRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3MQogICAgLy8gY29uc3QgbGFzdFdlaWdodGVkVG90YWwgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0CiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIGNvbnN0IGxhc3RXZWlnaHRlZFRvdGFsID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIGludGMgNSAvLyA0MDk2CiAgICAvCiAgICBkdXAKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICB1bmNvdmVyIDIKICAgIGRpZyAxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBiaWRBbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxNiAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBiaWRBbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE2IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3MwogICAgLy8gdGhpcy53ZWlnaHRlZEJpZFRvdGFsLnZhbHVlICs9IGJpZEFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NAogICAgLy8gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlID0gbG9jCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc0CiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSBsb2MKICAgIGRpZyA0CiAgICBpdG9iCiAgICBzd2FwCiAgICBkaWcgMQogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGJpZEFtb3VudCkKICAgIHVuY292ZXIgMwogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjQKICAgIC8vIHdlaWdodHMgPSBCb3hNYXA8dWludDY0LCBXZWlnaHRzTGlzdD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhXZWlnaHRzIH0pCiAgICBieXRlYyAyNiAvLyAidyIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzUKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGJpZEFtb3VudCkKICAgIHVuY292ZXIgNAogICAgaW50YyA1IC8vIDQwOTYKICAgICUKICAgIGludGNfMiAvLyA4CiAgICAqCiAgICBmcmFtZV9kaWcgMAogICAgYm94X3JlcGxhY2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGJpZEFtb3VudCkKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMgogICAgKwogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMSAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NgogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBiaWRBbW91bnQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHJlcGxhY2UzIC8vIG9uIGVycm9yOiBpbmRleCBhY2Nlc3MgaXMgb3V0IG9mIGJvdW5kcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NAogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDExIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTc2CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGJpZEFtb3VudCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NwogICAgLy8gdGhpcy5sb2NhdGlvbnMobG9jKS52YWx1ZSA9IFR4bi5zZW5kZXIKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTMzCiAgICAvLyBsb2NhdGlvbnMgPSBCb3hNYXA8dWludDY0LCBBY2NvdW50Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeExvY2F0aW9ucyB9KQogICAgYnl0ZWMgMzYgLy8gImwiCiAgICB1bmNvdmVyIDIKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzcKICAgIC8vIHRoaXMubG9jYXRpb25zKGxvYykudmFsdWUgPSBUeG4uc2VuZGVyCiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHVuaXF1ZUFkZHJlc3NDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VW5pcXVlQWRkcmVzc0NvdW50IH0pCiAgICBieXRlYyAyMiAvLyAidW5pcXVlX2FkZHJlc3NfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjIgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzgKICAgIC8vIHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCnNldE5ld0JpZF9lbHNlX2JvZHlANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4MAogICAgLy8gfSBlbHNlIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4MAogICAgLy8gfSBlbHNlIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogc2V0TmV3QmlkX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSAwCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTgyCiAgICAvLyB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgaXRvYgogICAgYm94X3B1dAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRCaWRGZWUoYW1vdW50OiB1aW50NjQpIC0+IHVpbnQ2NDoKZ2V0QmlkRmVlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODYKICAgIC8vIHByaXZhdGUgZ2V0QmlkRmVlKGFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIGNvbnN0IGZlZSA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5iaWRGZWUudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODcKICAgIC8vIGNvbnN0IGZlZSA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5iaWRGZWUudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwZXJjZW50YWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4OAogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDQgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4OAogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QmlkRmVlX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODkKICAgIC8vIHJldHVybiAxCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAogICAgcmV0c3ViCgpnZXRCaWRGZWVfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIHJldHVybiBmZWUKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTQKICAgIC8vIHByaXZhdGUgZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCk6IFJveWFsdHlBbW91bnRzIHsKICAgIHByb3RvIDEgMQogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyBsZXQgY3JlYXRvckFtb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBpZiAodGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDApIHsKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBpZiAodGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGNyZWF0b3JBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIEludmFsaWQgcGVyY2VudGFnZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5OQogICAgLy8gaWYgKGNyZWF0b3JBbW91bnQgPT09IDAgJiYgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUA2CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NQogICAgLy8gY3JlYXRvclJveWFsdHkgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlDcmVhdG9yUm95YWx0eSB9KQogICAgYnl0ZWMgMzAgLy8gImNyZWF0b3Jfcm95YWx0eSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk5CiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCA9PT0gMCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDYKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjAwCiAgICAvLyBjcmVhdG9yQW1vdW50ID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgNQoKZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gY29uc3QgeyBhdWN0aW9uU2FsZUltcGFjdFRheE1pbjogbWluLCBhdWN0aW9uU2FsZUltcGFjdFRheE1heDogbWF4IH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNAogICAgLy8gY29uc3QgeyBhdWN0aW9uU2FsZUltcGFjdFRheE1pbjogbWluLCBhdWN0aW9uU2FsZUltcGFjdFRheE1heDogbWF4IH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MwogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDM1IC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA0CiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGR1cAogICAgcHVzaGludCA1NiAvLyA1NgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgNAogICAgcHVzaGludCA2NCAvLyA2NAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNQogICAgLy8gbGV0IGFraXRhQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNgogICAgLy8gaWYgKG1heCA+IDApIHsKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDcKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0VXNlckltcGFjdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlci52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MwogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTAgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA3CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM2LTEzOQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0OQogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YVNvY2lhbEFwcExpc3QpKQogICAgc3dhcAogICAgcHVzaGJ5dGVzICJzYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNwogICAgLy8gYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM2LTEzOQogICAgLy8gcmV0dXJuIGFiaUNhbGw8dHlwZW9mIEFraXRhU29jaWFsSW1wYWN0LnByb3RvdHlwZS5nZXRVc2VySW1wYWN0Pih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YVNvY2lhbEFwcExpc3QoYWtpdGFEQU8pLmltcGFjdCwKICAgIC8vICAgYXJnczogW2FjY291bnRdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4ZDU3NGJiMTAgLy8gbWV0aG9kICJnZXRVc2VySW1wYWN0KGFkZHJlc3MpdWludDY0IgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA2IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMQogICAgLy8gY29uc3QgbWluSW1wYWN0OiB1aW50NjQgPSAoaW1wYWN0ID4gMSkgPyBpbXBhY3QgLSAxIDogMQogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJ6IGdldEFtb3VudHNfdGVybmFyeV9mYWxzZUAyMgogICAgZnJhbWVfZGlnIDEKICAgIGludGNfMSAvLyAxCiAgICAtCgpnZXRBbW91bnRzX3Rlcm5hcnlfbWVyZ2VAMjM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzMgogICAgLy8gcmV0dXJuIG1heCAtICgoKG1heCAtIG1pbikgKiBtaW5JbXBhY3QpIC8gSU1QQUNUX0RJVklTT1IpCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBmcmFtZV9kaWcgNAogICAgLQogICAgdW5jb3ZlciAyCiAgICAqCiAgICBwdXNoaW50IDEwMDAgLy8gMTAwMAogICAgLwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwZXJjZW50YWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBpZiAoYWtpdGFBbW91bnQgPT09IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjEyCiAgICAvLyBha2l0YUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDAKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE2CiAgICAvLyBsZXQgbWFya2V0cGxhY2VBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAzMSAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMTcKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMTgKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMxIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxOAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSBjYWxjUGVyY2VudChhbW91bnQsIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSW52YWxpZCBwZXJjZW50YWdlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE5CiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDMxIC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxOQogICAgLy8gaWYgKG1hcmtldHBsYWNlQW1vdW50ID09PSAwICYmIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyMAogICAgLy8gbWFya2V0cGxhY2VBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAyCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNAogICAgLy8gY29uc3Qgc2VsbGVyQW1vdW50OiB1aW50NjQgPSBhbW91bnQgLSAoY3JlYXRvckFtb3VudCArIGFraXRhQW1vdW50ICsgKDIgKiBtYXJrZXRwbGFjZUFtb3VudCkpCiAgICBmcmFtZV9kaWcgNQogICAgZHVwCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAzCiAgICArCiAgICBwdXNoaW50IDIgLy8gMgogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNi0yMzEKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGdldEFtb3VudHNfdGVybmFyeV9tZXJnZUAyMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkKHBheW1lbnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpjcmVhdGVCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0OQogICAgLy8gcHJpdmF0ZSBjcmVhdGVCaWQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTAKICAgIC8vIGNvbnN0IGlkID0gdGhpcy5uZXdCaWRJRCgpCiAgICBjYWxsc3ViIG5ld0JpZElECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1MgogICAgLy8gY29uc3QgeyBiaWRzLCBiaWRzQnlBZGRyZXNzLCBsb2NhdGlvbnMgfSA9IHRoaXMubWJyKCkKICAgIGludGMgMTAgLy8gMzQ5MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI5CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1NAogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU0CiAgICAvLyBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogY3JlYXRlQmlkX2lmX2JvZHlAMQogICAgZnJhbWVfZGlnIDMKICAgIGZyYW1lX2J1cnkgMQoKY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYwCiAgICAvLyBjb25zdCBiaWRBbW91bnQ6IHVpbnQ2NCA9IHBheW1lbnQuYW1vdW50IC0gbWJyCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFtb3VudAogICAgZHVwCiAgICBmcmFtZV9kaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDMKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjEKICAgIC8vIGNvbnN0IG1pbmltdW1CaWRBbW91bnQgPSB0aGlzLmdldE1pbmltdW1CaWRBbW91bnQoKQogICAgY2FsbHN1YiBnZXRNaW5pbXVtQmlkQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2My00NzAKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogKG1pbmltdW1CaWRBbW91bnQgKyBtYnIpLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2NgogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYzLTQ3MAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiAobWluaW11bUJpZEFtb3VudCArIG1iciksCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2NwogICAgLy8gYW1vdW50OiAobWluaW11bUJpZEFtb3VudCArIG1iciksCiAgICBzd2FwCiAgICB1bmNvdmVyIDIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYzLTQ3MAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiAobWluaW11bUJpZEFtb3VudCArIG1iciksCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIHVuY292ZXIgMgogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3MgogICAgLy8gdGhpcy5zZXROZXdCaWQoaWQsIGJpZEFtb3VudCwgbWFya2V0cGxhY2UpCiAgICBmcmFtZV9kaWcgMgogICAgc3dhcAogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHNldE5ld0JpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzUKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMjAgLy8gMTIwCiAgICAtCiAgICA+CiAgICBieiBjcmVhdGVCaWRfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3NgogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMzAwIC8vIDMwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzYKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ3OQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDc5CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIGNvbnN0IGJpZEZlZSA9IHRoaXMuZ2V0QmlkRmVlKGJpZEFtb3VudCkKICAgIGZyYW1lX2RpZyAwCiAgICBjYWxsc3ViIGdldEJpZEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgxCiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4MQogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE3IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDg0CiAgICAvLyB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPSBiaWRBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpjcmVhdGVCaWRfaWZfYm9keUAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTUKICAgIC8vIG1iciArPSBiaWRzQnlBZGRyZXNzCiAgICBpbnRjIDExIC8vIDUzNDAwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTYKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjcmVhdGVCaWRfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1NwogICAgLy8gbWJyICs9IGxvY2F0aW9ucwogICAgaW50YyAxMiAvLyA3MjMwMAogICAgZnJhbWVfYnVyeSAxCiAgICBiIGNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDQKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNyZWF0ZUJpZEFzYShwYXltZW50OiB1aW50NjQsIGFzc2V0WGZlcjogdWludDY0LCBtYXJrZXRwbGFjZTogYnl0ZXMpIC0+IHZvaWQ6CmNyZWF0ZUJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDg3LTQ5MQogICAgLy8gcHJpdmF0ZSBjcmVhdGVCaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHByb3RvIDMgMAogICAgcHVzaGJ5dGVzICIiCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkyCiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3QmlkSUQoKQogICAgY2FsbHN1YiBuZXdCaWRJRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTQKICAgIC8vIGNvbnN0IHsgYmlkcywgYmlkc0J5QWRkcmVzcywgbG9jYXRpb25zIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDEwIC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyOQogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTYKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjkKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NgogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUJpZEFzYV9pZl9ib2R5QDEKICAgIGZyYW1lX2RpZyAzCiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwMy01MTAKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogbWJyCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMwogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDMtNTEwCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IG1icgogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEyCiAgICAvLyBjb25zdCBiaWRBbW91bnQgPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxMwogICAgLy8gY29uc3QgbWluaW11bUJpZEFtb3VudCA9IHRoaXMuZ2V0TWluaW11bUJpZEFtb3VudCgpCiAgICBjYWxsc3ViIGdldE1pbmltdW1CaWRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTE1LTUyMgogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIGFzc2V0WGZlciwKICAgIC8vICAgewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBtaW5pbXVtQmlkQW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfQogICAgLy8gKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxOAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTUtNTIyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1pbmltdW1CaWRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9CiAgICAvLyApCiAgICA9PQogICAgZGlnIDIKICAgIHVuY292ZXIgMgogICAgPT0KICAgICYmCiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIFhmZXJBc3NldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTIwCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTUtNTIyCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1pbmltdW1CaWRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9CiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBhc3NlcnQgdGFyZ2V0IGlzIG1hdGNoIGZvciBjb25kaXRpb25zCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyNAogICAgLy8gdGhpcy5zZXROZXdCaWQoaWQsIGJpZEFtb3VudCwgbWFya2V0cGxhY2UpCiAgICBmcmFtZV9kaWcgMgogICAgc3dhcAogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHNldE5ld0JpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjcKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjcKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMjAgLy8gMTIwCiAgICAtCiAgICA+CiAgICBieiBjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUyOAogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjgKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMzAwIC8vIDMwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MjgKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzMQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDMKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNCAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMxCiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY3JlYXRlQmlkQXNhX2FmdGVyX2lmX2Vsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzIKICAgIC8vIGNvbnN0IGJpZEZlZSA9IHRoaXMuZ2V0QmlkRmVlKGJpZEFtb3VudCkKICAgIGZyYW1lX2RpZyAwCiAgICBjYWxsc3ViIGdldEJpZEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzMKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOCAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMzCiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTggLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzMwogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKY3JlYXRlQmlkQXNhX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE3IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPSBiaWRBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpjcmVhdGVCaWRBc2FfaWZfYm9keUAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTcKICAgIC8vIG1iciArPSBiaWRzQnlBZGRyZXNzCiAgICBpbnRjIDExIC8vIDUzNDAwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDk4CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA0IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTgKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5OQogICAgLy8gbWJyICs9IGxvY2F0aW9ucwogICAgaW50YyAxMiAvLyA3MjMwMAogICAgZnJhbWVfYnVyeSAxCiAgICBiIGNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDQKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZChpZDogdWludDY0KSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ1CiAgICAvLyByZWZ1bmRCaWQoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gYXNzZXJ0KGlkIDwgdGhpcy5iaWRJRC52YWx1ZSAtIDEsIEVSUl9DQU5OT1RfUkVGVU5EX01PU1RfUkVDRU5UX0JJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQ3CiAgICAvLyBhc3NlcnQoaWQgPCB0aGlzLmJpZElELnZhbHVlIC0gMSwgRVJSX0NBTk5PVF9SRUZVTkRfTU9TVF9SRUNFTlRfQklEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBmcmFtZV9kaWcgLTEKICAgID4KICAgIGFzc2VydCAvLyBjYW5ub3QgcmVmdW5kIG1vc3QgcmVjZW50IGJpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIGFzc2VydCh0aGlzLmJpZHMoaWQpLmV4aXN0cywgRVJSX0JJRF9OT1RfRk9VTkQpCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyBiaWRzID0gQm94TWFwPHVpbnQ2NCwgQmlkSW5mbz4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzIH0pCiAgICBieXRlYyAzMiAvLyAiYiIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDkKICAgIC8vIGFzc2VydCh0aGlzLmJpZHMoaWQpLmV4aXN0cywgRVJSX0JJRF9OT1RfRk9VTkQpCiAgICBkdXAKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIGJpZCBub3QgZm91bmQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUxCiAgICAvLyBjb25zdCB7IHJlZnVuZGVkLCBhbW91bnQsIGFjY291bnQ6IHJlY2VpdmVyIH0gPSB0aGlzLmJpZHMoaWQpLnZhbHVlCiAgICBkdXAKICAgIGJveF9nZXQKICAgIHBvcAogICAgZHVwCiAgICBwdXNoaW50IDU3NiAvLyA1NzYKICAgIGdldGJpdAogICAgZGlnIDEKICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICB1bmNvdmVyIDIKICAgIGV4dHJhY3QgMCAzMgogICAgY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTMKICAgIC8vIGFzc2VydCghcmVmdW5kZWQsIEVSUl9CSURfQUxSRUFEWV9SRUZVTkRFRCkKICAgIHN3YXAKICAgICEKICAgIGFzc2VydCAvLyBiaWQgYWxyZWFkeSByZWZ1bmRlZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTUKICAgIC8vIHRoaXMuYmlkcyhpZCkudmFsdWUucmVmdW5kZWQgPSB0cnVlCiAgICBkaWcgMQogICAgcHVzaGludCA3MiAvLyA3MgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgdW5jb3ZlciAyCiAgICBwdXNoaW50IDcyIC8vIDcyCiAgICB1bmNvdmVyIDIKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1NwogICAgLy8gY29uc3QgYmlkRmVlID0gdGhpcy5nZXRCaWRGZWUoYW1vdW50KQogICAgZHVwCiAgICBjYWxsc3ViIGdldEJpZEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTkKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gYW1vdW50IC0gYmlkRmVlCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MQogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYxCiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9lbHNlX2JvZHlAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjMtNzY1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50OiByZXR1cm5BbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDAKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2My03NjQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQ6IHJldHVybkFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYzLTc2NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudDogcmV0dXJuQW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gdGhpcy5yZWZ1bmRDb3VudC52YWx1ZSArPSAxCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MwogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAyOCAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzYKICAgIC8vIHRoaXMucmVmdW5kQ291bnQudmFsdWUgKz0gMQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDI4IC8vICJyZWZ1bmRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NgogICAgLy8gdGhpcy5yZWZ1bmRDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9lbHNlX2JvZHlAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY3LTc3MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzEKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcxCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGZyYW1lX2RpZyAwCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY3LTc3MgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiByZWNlaXZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2Ny03NzMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0QW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkX2FmdGVyX2lmX2Vsc2VANQoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlKCkgLT4gdWludDY0OgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gc3RhcnRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgMzMgLy8gInN0YXJ0X3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOS0xMDEwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlX2Jvb2xfZmFsc2VAMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlY18zIC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDEwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPD0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOS0xMDEwCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlX2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwOC0xMDExCiAgICAvLyByZXR1cm4gKAogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA8PSB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZQogICAgLy8gKQogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZV9ib29sX2ZhbHNlQDM6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDA4LTEwMTEKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgLy8gICBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICAvLyApCiAgICByZXRzdWIK", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyAPAAEIBKCNBoAg////////////Aa3+1eTUhf2oWM+Cnrvv796CFNGCnrvv796CFNSQApihA+y0BP////8P1K+gBiYwCWJpZF9hc3NldAlha2l0YV9kYW8FcHJpemUNZW5kX3RpbWVzdGFtcAdiaWRfZmVlBmJpZF9pZAQVH3x1DGFraXRhX2VzY3JvdwFhDGlzX3ByaXplX2JveAZzZWxsZXIId190b3RhbHMRd2VpZ2h0c19ib3hfY291bnQOd2lubmluZ190aWNrZXQCAAENcmFmZmxlX3dpbm5lchJ3ZWlnaHRlZF9iaWRfdG90YWwLaGlnaGVzdF9iaWQNcmFmZmxlX2Ftb3VudA1wcml6ZV9jbGFpbWVkEXZyZl9mYWlsdXJlX2NvdW50FHJhZmZsZV9wcml6ZV9jbGFpbWVkFHVuaXF1ZV9hZGRyZXNzX2NvdW50EXJlZnVuZF9tYnJfY3Vyc29yB2dhdGVfaWQLbWFya2V0cGxhY2UBdwZ3YWxsZXQMcmVmdW5kX2NvdW50DHJhZmZsZV9yb3VuZA9jcmVhdG9yX3JveWFsdHkVbWFya2V0cGxhY2Vfcm95YWx0aWVzAWIPc3RhcnRfdGltZXN0YW1wE2ZpbmRfd2lubmVyX2N1cnNvcnMIbmZ0X2ZlZXMBbAEAAwaBAQNvYWwDYWFsDHN0YXJ0aW5nX2JpZBRiaWRfbWluaW11bV9pbmNyZWFzZQd2ZXJzaW9uBHNhbHQErfkq5AIAAANwYWwxGEAALCcUImcnHCJnJxAiZycRImcnBSNnJxIiZycVImcnFiJnJxcjZycNImcnHSJnggMEJIfDLAQx8mqbBOqRgN02GgCOAwDmANoAzzEZFEQxGEEAuIITBL1xSNAEmDbInwRNWFaXBNn08DoEdpUpMQS545xcBGllAd4EvRsn0QTyzi9GBJ2vBQoEZfypiwQF5d5NBI+koWAEYIIwPAQerSCpBDPpLJQEhU3t4AQ+oRgyBHMREHA2GgCOEwTlBjwGhQaoBvwHKgc4CTAKbwtnD/wQlREHERcRNBGGACoRowABAIAkFR98dQAAAAAAAIhUAAAAAADIF9QAAAAAAABIRAAAAAAAAEnUsCNDI0OABFtbib42GgCOAQNZADEZJRIxGBBEQhENMRmBBRIxGBBEQgV0MRmBBRIxGBBEQgTligIAi/6BCgiLADIMDUEAKrGBBrIQgQWyGScmsh4nJrIfi/+NAgALAASzQv/bMgCyAUL/9SKyAUL/74mKAQGL/4ESkYv/G4EbkSENGov/gTuRSpFMHCMeRQGBHxpPAkyQIQ0aGYmKAQExAIv/QAAEiwBMiYv/gBJjb250cm9sbGVkX2FkZHJlc3NlSEL/44oCAYv+JydlSIEYW7GABDwabzOyGov/shqyGIEGshAisgGztD5JVwQASwFXAAQnBhJESSJZgQIITBUSRFcGAEkVSUEAB4sBJBNBAAQijACJiwAXQv/3igQBi/w4GIv9JyhlSIEoWxJBADmL/DgZQAAyi/w4GyUSQQApi/wiwhqABEOSJlUSQQAai/wjwhqL/hJBAA+L/IECwhqL/xYSQQACI4kiiYoHAiKAAEcDIov6QAAFi/9AAUkjRIv5JyhlSCRbjAOL/SJZgdTFAQuB5JMCCIwBi/pAAFmxiwNJcghEiwGL/giyCLIHI7IQIrIBtov7Fov8FoAEe33F/LIaTLIashqL/bIashiBBrIQIrIBs7cBPklXBABMVwAEJwYSREkVJBJEFxaLARZQi/2MAYwAiYsDcghEi/pwAEUBQQCMiwGMAosDcghMjABEIowEi/9BAAqLA3IIRCOMBIwFsYsDcghEiwGyCLIHI7IQIrIBtosEQQAEiwWyFYv6shGL/rISiwCyFCWyECKyAbaL+xaL/BaABK8aFPKyGkyyGrIai/2yGosDshiBBrIQIrIBs7cCPklXBABMVwAEJwYSREkVJBJEF4sCjAFC/1qLATIQCIwCsYsDSXIIRDIQsgiyByOyECKyAbaL+haABDlOrrKyGrIashiBBrIQIrIBs0L/QyJC/rSKAwEigACL/TEAiP3uSTIDTEAAe4sDjACL/0EAaYsAMgMTQQBhi/2AC3dhbGxldF9mZWVzZUgkW0khBA5Ei/8dIQSXSYwBQAAIi/9BAAMjjAEyB0mBgPUkCIsBSU4CFosATFAnDkxQi/2L/k8FTwRPBEsFIoj+KUhXCAiL/08CCRZMUIwAiYv/FiIWUIwAiYsCgAhyZWZlcnJlcmVIjABC/3Y2GgFJFSQSRBc2GgJJFSMSRCJTNhoDSRUkEkQXSU4DNhoESRUkEkQXTgM2GgVJFSQSRBdOAzYaBkkVJBJEF04DNhoHSRUkEkQXTgM2GghJFSQSRBdOAzYaCUlOBBWBKBJENhoKSU4EFYEgEkQ2GgtJFSQSRBdOAzYaDEkVJBJEF04DNhoNSU4EFYEgEkQ2Gg5JIlmBAghLARUSRFcCAE4DNhoPSU4EFYEQEkQyDUQqTwNnJwlPAmcnEyJnQQAGSwxxAEREKEsNZycESwxnJylLC2cnKksKZychSwlnK0sIZ4AGZnVuZGVySwdnJwpLBmcnHksFZycYSwRnJxlLA2dHAiJbTCRbSwFyCEQyAxNEKU8CZycHTGcnK0sCZ4F4rycLTGcnIoAQAAAAAAAAAAAAAAAAAAAAAWcnDzIDZycsMRdnIillRCcjZUiBSFsnH0xnI0MxFiMJSTgQIxJENhoBSRUkEkQXSU4CMQAyCRJEIicEZURESYEDD0QhDgtLATgHMgoSTwI4CE8CEhBEIklLAgxBABRHAhYnGkxQgYCAArlIIwhFAUL/5ScMSwJnI0MxADIJEkQiJwVlRCMNQQBvIicFZUSBAgkiJxxlRBJEIicTZUREIicVZUREIicFZUQiJxdlRBJEIicMZUQURCInCWVEQAASsTIJIiplRLIRshUlshAisgGzIihlREEAErEyCSIoZUSyEbIVJbIQIrIBs7EyCbIJI7IQIrIBsyNDIkL/lTEAMgkSRDIHIichZUQMRCInDGVEFEQiJwllREEAQbEiKmVEIicKZUQnLbIashqyGIEGshAisgGzIihlREEAErEyCSIoZUSyEbIVJbIQIrIBs7EyCbIJI7IQIrIBsyNDsSInCmVEIiplRLIRshUlshAisgGzQv/BMRaBAglJOBAjEkQxFiMJSTgQgQYSRDYaAUkVgSASRCIpZUQxAIj6h4j6W4gPkkQiKWVEIicYZURPBE8CTwNPA4j6wkSIDdIjQzEWIwlJOBAjEkQ2GgFJFYEgEkSID2FEIicYZUQURIgNryNDMRaBAwlJOBAjEkQxFoECCUk4ECUSRDEWIwlJOBCBBhJENhoBSRWBIBJEIillRDEAiPoQiPnkiA8bRCIpZUQiJxhlRE8ETwJPA08DiPpLRIgN6CNDMRaBAglJOBAjEkQxFiMJSTgQJRJENhoBSRWBIBJEiA7fRCInGGVEFESIDbojQzYaAUkVJBJEF4gOSCNDIkcDgABHCDIHIitlRA1EIicNZUQURCInHWVEQAAIMgYkCScdTGciJx1lRCInFGVEJQsIMgZLASQID0SxIillRCcnZUgiW0wWIicsZURJFRZXBgJMUIAEGJOSxbIaTLIashqyGIEGshAisgGztD5JVwQASwFXAAQnBhJESSJZgQIITBUSRFcGAElFDBVJRQNAAA0iJxRlRCMIJxRMZyNDIksCSU4CDyJLAk8CTYEQSwIPgRBPA08CTUsMTgJSSRWBEBJESSJbIiEHHUUBSSEIHkUBTwIeRQEhBx1FASEIHk4CSE8CJFtMIQkeRQEeRQEhBx1FASEJHkUBTBZMFlBFDCInEGVMSU4CRQNEIQYMQQAFSSMIRQEnLkUNSUEA00cCIw1EIwlJRQojDURLCEkcIx5FAUwYRQMiRQZLC0UKSwUjDEEAjEsJSSJbSUUGIQcdRQEhCB5JTgJFC0hMJFtFBkAAaYGihbz23t+9hShLBUkhBx1FAU8CHkUBSwkWTBZQSwWI99uBIJBPAoj30xkWUElXABBMgRBbSUUJSwQPQQAmSwdLChgjCBZLDklPAlBMIlkjCBZXBgJcAEUOSwYjCEUHRQpC/3dFCkL/eSEJQv+cSwmAAgASUEsNUEmBEFlLARVSgQJbJw1MZycUImdC/qwhBkUJQv8zIoAARwM2GgFJFSQSRBciJwRlREQyByIrZUQNRCInDWVERCInD2VEMgMSRCInImVESSJbTCRbIiInDGVESwENQQDzIicLZURLASQLWyInDWVESwNPAghJRQgMQQDFSwIWSwIWUEkiW0lOAkUFJFtFAyInFmVESwEJSUsGSU4DDUxOAk1JRQZMIQUYSUUKIQVMCUlFBw1BAARLBEUESwIhBQoWJxpMUEUJSwOBPAsiiPZ8IkUBSUsEDEEAV0sHSwEIJAtLCUwkuhdJIicRZUQSQQANSwIIRQJJIwhFAUL/1UsCSU8CCEUIIicNZUQOQQAbIicNZURLBwxBABBLAksBCBYnJExQvkQnD0xnSwZFAkL/xUsCSwQIFksCFlAnIkxnI0NLAiEFCEUDSSMIRQFLBUUCQv8CSwIWSwIWUEL/JSJHA4AARwM2GgFJFSQSRBciJxNlREQiJwRlREEACyInD2VEMgMTQQDLI0QiJwVlRCInF2VMSU4CRQVEShNETEsBCUlLA0lOAw1MTgJNSUUDgTwLIoj1lyEKRQZFBEoISwQNQQCBSwMWJyBMUElFCb5ESYHABFNMVwAgRQpAABIiJwVlRCMJSwQTQQAFSwOICn5LB7xIJwhLCVBJRQi9RQFAAB1LBEUDsUsCsghLCLIHI7IQIrIBs0sDIwhFBEL/nUsGSb5EF0y8SCELRQQWJyRMUElFB71FAUH/zEsFvEghDEUDQv/BIicXZURLAQgnF0xnI0MiQv8ygABHCjIHIitlRA1EIicTZUQURCInBWVEIwkWJyBMUL5ESVcAIExJgSBbTFcoICInCWVEQQQIsSIqZUQnLbIaSwOyGrIYgQayECKyAbMiKGVEQAC0SwGIB3pJIltFC0kkW0xJgRBbRQqBGFtFBiInCWVEQQCOSwoIRQ5LDUAAc0sNRQmxIicHZURyCERLCbIIsgcjshAisgGzsSInGWVESwhJTgKyCLIHI7IQIrIBs7GyCEmyByOyECKyAbOxIicKZURLBbIIsgcjshAisgGzIicJZURAABWxIiplRHELREsKsgiyByOyECKyAbMnEyNnI0MiKWVEIksPiPaNIltFCUL/gEUOQv9ySwGIBsZJIltFC0kkW0xJgRBbRQqBGFtFBiInCWVEQQMQSwoIRQ5LDUAC8ksNRQkiJwdlRHIIRCIoZURwAEUBQQF4sSIpZURyCEQiKGVEshFLCbISshQlshAisgGzIicZZUQiKGVEcABFAUEBIbEiJxllRCIoZUSyEUsIshKyFCWyECKyAbMiKGVESwFMcABFAUEA0LEiKGVEshFLB7ISSbIUJbIQIrIBsyInCmVEIihlRHAARQFBAH+xIicKZUQiKGVEshFLBbISshQlshAisgGzIicJZURA/woiKmVEcQtEIihlRHAARQFBAB6xIiplRHELRCIoZUSyEUsKshKyFCWyECKyAbNC/toiKWVEIihlRCIqZURxC0RLDElOAhZQJw5MUE8DTwMiIQZPBE8FIojz7kYCQv6sIillRCIoZUQiJwplREsHSU4CFlAnDkxQTwNPAyIhBk8ETwUiiPPCRgJC/24iKWVEIihlREsJSU4CFksETFAnDkxQTwNPAiIhBk8ETwUiiPOYRgJC/xsiKWVEIihlRCInGWVESwpJTgIWUCcOTFBPA08DIiEGTwRPBSKI82xGAkL+zCIoZUxJTgJFDkQiKWVMSU4CRRBESScbZUhJTgJFB0knL2VISVcICEwkW0UKTCcbZUixgASiQD3fshqAEgABAAIADHJldl9hdWN0aW9uc7IashiBBrIQIrIBs7Q+SVcEAEsBVwAEJwYSREkiWYEJC4ECCEwVEkRXBgkiW0lEIicHZURMSwESRLGABFgv84KyGkyyGoABgLIagA4ADHJldl9hdWN0aW9uc7IagAoAAQAAAAAAAAAAshonLrIaTLIYgQayECKyAXIIRCJFDUxwAEUBQAAaSwyADnJldmVudWVfc3BsaXRzZUgiWSMIRQsyEEsLC7YiJwdlRHIIRLIHsggjshAisgG2SwNJFksNFicOTFCABGg147yyGkyyGoABgLIashpLBrIYgQayECKyAbaABGzD9gayGrIYgQayECKyAUsIQQAZtiInB2VEcghESwyyEUsJshKyFCWyECKyAbNC/UAiKWVEIihlREsPiPNXIltFCUL8/kUOQvzwMgoiKmVETEsBcABIRQhLA0xwAEUBQQAVsSIqZUSyEUsCshUlshAisgGzQvviIillRCIqZURLCElOAhZLBkxQJw5MUE8DTwIiIQZPBE8FI4jxmUYCQvu4IicPZUQyAxNEIicVZUQURCIpZUQnI2VIgVBbIicSZURLASEEDkRJTwIdIQSXSU4CCSIoZURAAC2xIicHZURyCERLArIIsgcjshAisgGzsSInD2VEsgeyCCOyECKyAbMnFSNnI0OxIicHZURyCEQiKGVESbIRSwOyEkyyFCWyECKyAbOxIicPZUSyFLIRshIlshAisgGzQv/GNhoBSRUkEkQXSTIHIitlRA1EIicTZUREIicVZUREgR4LIojvoyJJSwIMQQAbIicMZUQjCUsBSU4CCRYnGkxQvEgjCEUBQv/eIicMZURLAklOAgknDExnIQ4LsTIJSwGyCLIHI7IQIrIBsxYnBkxQsCNDiATyJyUiTwJUJwZMULAjQzYaAUkVgSASRCcITFC9RQEnJSJPAlQnBkxQsCNDNhoBSRUkEkQXMQAiKWVEJxtlSHIIRBJEJwdMZyNDNhoBSSJZgQIISwEVEkRXAgAxACIpZURJJxtlSHIIRE8CEkQnL2VIgRBbMg0SRCcrTGcjQzYaAUkVJBJEFzEAIillRCcbZUhyCEQSRClMZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSREsBOAcyChJPAjgIMhASEESxMgpMshEishKyFCWyECKyAbMjQyInBWVESSMIJwVMZ4kiJxFlREEADCInEWVEIicqZUQIiSInKWVEiYoDADEAi/4WSU4CUIv/UCclUIv9FicgTFBMvyInBGVEQQDRJwgxAFC9RQFBAFInCDEAUL5EF0khBQpJFicaTFBPAiEFGCQLSiS6F4v+TAkiJwtlRE8EJAtMSwFbIicQZURLAwgnEExnTwRPBIsAu08CCBYiJwtlRE4CXScLTGeJIicWZUQiJwxlRCEFC0sBDUQiJwtlREsBIQUKSSQLTwJLAVsiJxBlRIv+CCcQTGcnCDEAUEsEFkxLAb9PAxYnGkxQTwQhBRgkC4sAu0yL/ggWIicLZURPA08CXScLTGcxACckTwJQTL8iJxZlRCMIJxZMZ4knCDEAUL1FAUD/gCcIMQBQIha/iYoBASInBGVESSEEDkSL/x0hBJdJQAAQIicEZURBAAiL/0EAAyNMiYsATImKAQGAAEcEIkknHmVEQQAmIiceZURJIQQORIv/HSEEl0mMBUAAECInHmVEQQAIi/9BAAMjjAUiKWVEJyNlSEmBOFuMBIFAW0mMAyKMAEEAcCIpZUQiJwplRLFMgANzYWxlSIEQW4AE1XS7ELIashiyGoEGshAisgGztD5JVwQATFcABCcGEkRJFSQSRBdJjAEjDUEAgosBIwmLA0mLBAlPAguB6AcKCUkhBA5Ei/8dIQSXSYwAQAAIi/9BAAMjjAAijAIiJx9lREEAJiInH2VESSEEDkSL/x0hBJdJjAJAABAiJx9lREEACIv/QQADI4wCiwVJiwBJTgMIgQKLAklOBQsIi/9MCUwWTwIWUE8CFlBMFlCMAIkjQv9+igIAgABJiP2CIQonCDEAUL1FAUEAZIsDjAGL/jgISYsBSU4CCUlOA4wAiP1ri/44BzIKEkxPAghPAhIQRIsCTIv/iP1tMgciK2VEgXgJDUEACyIrZUSBrAIIK0xnIicEZURBAA+LAIj+UCInEmVECCcSTGcnEYsAZ4khC4wBIicEZURB/5QhDIwBQv+NigMAgABJiPz1IQonCDEAUL1FAUEAc4sDjAGL/TgHMgoSi/04CIsBEhBEi/44EkmMAIj814v+OBQyChJLAk8CEhCL/jgRIihlRBIQRIsCTIv/iPzRMgciK2VEgXgJDUEACyIrZUSBrAIIK0xnIicEZURBAA+LAIj9tCInEmVECCcSTGcnEYsAZ4khC4wBIicEZURB/4UhDIwBQv9+igEAIicFZUQjCYv/DUSL/xYnIExQSb1FAURJvkhJgcAEU0sBgSBbTwJXACBOA0wUREsBgUgjuiIjVE8CgUhPArtJiP1MCSIoZURAABqxiwCyB7III7IQIrIBsyInHGVEIwgnHExnibEiKGVEshGLALIUshIlshAisgGzQv/dMgciJyFlRA9BAAwyByIrZUQOQQACI4kiiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
          case "create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,uint64))void":
            return _AuctionParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,uint64))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,uint64))void",
          args: Array.isArray(params.args) ? params.args : [params.args.prize, params.args.isPrizeBox, params.args.bidAsset, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.funder, params.args.seller, params.args.creatorRoyalty, params.args.gateId, params.args.marketplace, params.args.version, params.args.akitaConfig]
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
   * Constructs a no op call for the gatedBid(pay,appl,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedBid(params) {
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
   * Constructs a no op call for the gatedBidAsa(pay,axfer,appl,address)void ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static gatedBidAsa(params) {
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
       * Creates a new instance of the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,uint64))void ABI method.
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
       * Creates a new instance of the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,uint64))void ABI method.
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
       * Creates a new instance of the Auction smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,uint64))void ABI method.
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
     * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedBid: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.gatedBid(params));
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
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    gatedBidAsa: (params) => {
      return this.appClient.params.call(AuctionParamsFactory.gatedBidAsa(params));
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
     * Makes a call to the Auction smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedBid: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.gatedBid(params));
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
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    gatedBidAsa: (params) => {
      return this.appClient.createTransaction.call(AuctionParamsFactory.gatedBidAsa(params));
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
     * Makes a call to the Auction smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * Makes a call to the Auction smart contract using the `gatedBid(pay,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedBid: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.gatedBid(params));
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
     * Makes a call to the Auction smart contract using the `gatedBidAsa(pay,axfer,appl,address)void` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    gatedBidAsa: async (params) => {
      const result = await this.appClient.send.call(AuctionParamsFactory.gatedBidAsa(params));
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
     * Makes a call to the Auction smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
       * Add a gatedBid(pay,appl,address)void method call against the Auction contract
       */
      gatedBid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBid(params)));
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
       * Add a gatedBidAsa(pay,axfer,appl,address)void method call against the Auction contract
       */
      gatedBidAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBidAsa(params)));
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
       * Add a updateAkitaDAOEscrow(uint64)void method call against the Auction contract
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





var APP_SPEC2 = { "name": "AuctionFactory", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "uint64", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteAuctionApp", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancelAuction", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuctionCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "prizeAssetID" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "uint64", "name": "app" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 2, "bytes": 2 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZXNjcm93", "desc": "the app ID for the akita DAO escrow to use" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1484], "errorMessage": "Bad method prize box transfer needed" }, { "pc": [974, 1614], "errorMessage": "Box must have value" }, { "pc": [457], "errorMessage": "Bytes has valid prefix" }, { "pc": [837, 1544, 2420], "errorMessage": "Contract not set" }, { "pc": [2646], "errorMessage": "Invalid app upgrade" }, { "pc": [2415], "errorMessage": "Invalid call order" }, { "pc": [929, 1596, 2508], "errorMessage": "Invalid payment" }, { "pc": [953], "errorMessage": "Invalid transfer" }, { "pc": [1513], "errorMessage": "Not a prize box" }, { "pc": [856], "errorMessage": "Not opted in" }, { "pc": [1526, 1966, 2043], "errorMessage": "Not prize box owner" }, { "pc": [163], "errorMessage": "OnCompletion must be NoOp" }, { "pc": [339], "errorMessage": "OnCompletion must be UpdateApplication && can only call when not creating" }, { "pc": [2297, 2318, 2447, 2592, 2632, 2676], "errorMessage": "Only the Akita DAO can call this function" }, { "pc": [527, 1138, 1159, 1196, 1222, 1267, 1499, 1511, 1779, 1799, 1827, 1872, 1953, 2030, 2316, 2445, 2482, 2549, 2590, 2628, 2674], "errorMessage": "application exists" }, { "pc": [379], "errorMessage": "asset exists" }, { "pc": [825, 1529], "errorMessage": "bids must always increase" }, { "pc": [871, 957, 1011, 1023, 1027, 1313, 1488, 1600, 1654, 1666, 1670, 1918, 2165, 2207, 2233, 2309, 2438, 2475, 2479, 2542, 2546, 2583, 2620, 2667], "errorMessage": "check GlobalState exists" }, { "pc": [832, 1539], "errorMessage": "ending round must be at least 100 rounds after starting" }, { "pc": [717], "errorMessage": "invalid number of bytes for (len+uint8[32][])" }, { "pc": [2348], "errorMessage": "invalid number of bytes for (len+uint8[])" }, { "pc": [467, 600, 617, 697, 2267, 2611], "errorMessage": "invalid number of bytes for (len+utf8[])" }, { "pc": [2104], "errorMessage": "invalid number of bytes for bool8" }, { "pc": [628, 637, 726, 739, 751, 762, 774, 786, 797, 819, 1368, 1381, 1393, 1404, 1417, 1430, 1442, 1464, 1948, 2025, 2115, 2127, 2138, 2278, 2332, 2470, 2537, 2576, 2660], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [808, 1453], "errorMessage": "invalid number of bytes for uint8[32]" }, { "pc": [1957, 2034], "errorMessage": "not an auction" }, { "pc": [1345], "errorMessage": "transaction type is appl" }, { "pc": [683], "errorMessage": "transaction type is axfer" }, { "pc": [672, 1357, 2462], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiA2MDYwMCA0MDk2IDEzMTEzMzAwIDE1OTEwMDAgNTAwMDAgMzAzMDAwIDI0MjQwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmMiICJha2l0YV9lc2Nyb3ciIDB4MTUxZjdjNzUgIndhbGxldCIgImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iICJhYWwiIDB4M2VhMTE4MzIgMHhjNTNiMzJjYyAidmVyc2lvbiIgMHg1YjViODliZSBiYXNlNjQoQzRFQlF3PT0pIDB4YmQ3MTQ4ZDAgMHhhZGY5MmFlNCAic2VsbGVyIiAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE4CiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbkZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VBdWN0aW9uLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHB1c2hieXRlcyAweGVhOTE4MGRkIC8vIG1ldGhvZCAidXBkYXRlKHN0cmluZyl2b2lkIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbWFpbl91cGRhdGVfcm91dGVANAoKbWFpbl9zd2l0Y2hfY2FzZV9uZXh0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgKICAgIC8vIGV4cG9ydCBjbGFzcyBBdWN0aW9uRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZUF1Y3Rpb24sIEZhY3RvcnlDb250cmFjdCkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBtdXN0IGJlIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBieiBtYWluX2NyZWF0ZV9Ob09wQDIyCiAgICBwdXNoYnl0ZXNzIDB4ZDE1NDhmZmYgMHg3M2YwMDIyMyAweDE3MTRkYTY1IDB4ODBmNDQ1NDEgMHhhNWQ0MmIzYSAvLyBtZXRob2QgIm5ld0F1Y3Rpb24ocGF5LGF4ZmVyLHN0cmluZyxieXRlWzMyXVtdLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgIm5ld1ByaXplQm94QXVjdGlvbihhcHBsLHBheSx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsYWRkcmVzcyx1aW50NjQpdWludDY0IiwgbWV0aG9kICJkZWxldGVBdWN0aW9uQXBwKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJjYW5jZWxBdWN0aW9uKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJuZXdBdWN0aW9uQ29zdChib29sLHVpbnQ2NCx1aW50NjQsdWludDY0KXVpbnQ2NCIKICAgIGJ5dGVjIDggLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHgxZWFkMjBhOSAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHg3MzExMTA3MCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3codWludDY0KXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbmV3QXVjdGlvbiBuZXdQcml6ZUJveEF1Y3Rpb24gZGVsZXRlQXVjdGlvbkFwcCBjYW5jZWxBdWN0aW9uIG5ld0F1Y3Rpb25Db3N0IGluaXRCb3hlZENvbnRyYWN0IGxvYWRCb3hlZENvbnRyYWN0IGRlbGV0ZUJveGVkQ29udHJhY3Qgb3B0SW4gb3B0SW5Db3N0IHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxOSBtYWluX21icl9yb3V0ZUAyMAogICAgZXJyCgptYWluX21icl9yb3V0ZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2Jhc2UudHM6NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMDg4NTQwMDAwMDAwMDAwYzgxN2Q0MDAwMDAwMDAwMDAwNDg0NDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDMKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgKICAgIC8vIGV4cG9ydCBjbGFzcyBBdWN0aW9uRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZUF1Y3Rpb24sIEZhY3RvcnlDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4YzQyNmY0YmEgLy8gbWV0aG9kICJjcmVhdGUoc3RyaW5nLHN0cmluZyx1aW50NjQsdWludDY0KXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIHB1c2hpbnQgNCAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBtdXN0IGJlIFVwZGF0ZUFwcGxpY2F0aW9uICYmIGNhbiBvbmx5IGNhbGwgd2hlbiBub3QgY3JlYXRpbmcKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzKGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIG5hbWU6IGJ5dGVzLCBwcm9vZjogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CnJveWFsdGllczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDE3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcm95YWx0aWVzKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IEFzc2V0LCBuYW1lOiBzdHJpbmcsIHByb29mOiBQcm9vZik6IHVpbnQ2NCB7CiAgICBwcm90byA0IDIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQxOAogICAgLy8gbGV0IGNyZWF0b3JSb3lhbHR5OiB1aW50NjQgPSAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDIwCiAgICAvLyBpZiAoIShwcm9vZi5sZW5ndGggPiAwKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIGJueiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyMQogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5RGVmYXVsdAogICAgcHVzaGludCA1MDAwIC8vIDUwMDAKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI1LTQzNQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQKICAgIC8vIGNvbnN0IFthcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzQWtpdGFBcHBMaXN0KSkKICAgIGZyYW1lX2RpZyAtNAogICAgYnl0ZWMgNiAvLyAiYWFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjYKICAgIC8vIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgcHVzaGludCA3MiAvLyA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI4CiAgICAvLyBhc3NldC5jcmVhdG9yLAogICAgZnJhbWVfZGlnIC0zCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjkKICAgIC8vIG5hbWUsCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzMAogICAgLy8gc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzIKICAgIC8vIDEsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjUtNDM1CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eVN0cmluZyA9IGFiaUNhbGw8dHlwZW9mIE1ldGFNZXJrbGVzLnByb3RvdHlwZS52ZXJpZmllZFJlYWQ+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBhc3NldC5jcmVhdG9yLAogICAgLy8gICAgIG5hbWUsCiAgICAvLyAgICAgc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgLy8gICAgIHByb29mLAogICAgLy8gICAgIDEsCiAgICAvLyAgICAgJ3JveWFsdHknLAogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MGNmMWI5Y2YgLy8gbWV0aG9kICJ2ZXJpZmllZFJlYWQoYWRkcmVzcyxzdHJpbmcsYnl0ZVszMl0sYnl0ZVszMl1bXSx1aW50NjQsc3RyaW5nKXN0cmluZyIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDMzCiAgICAvLyAncm95YWx0eScsCiAgICBwdXNoYnl0ZXMgMHgwMDA3NzI2Zjc5NjE2Yzc0NzkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI1LTQzNQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzcKICAgIC8vIGlmIChCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykubGVuZ3RoID4gMCkgewogICAgbGVuCiAgICBieiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzOAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBidG9pKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKSkKICAgIGZyYW1lX2RpZyAwCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDEKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MQogICAgLy8gaWYgKGNyZWF0b3JSb3lhbHR5ID4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlKSB7CiAgICBmcmFtZV9kaWcgMQogICAgaW50YyA4IC8vIDUwMDAwCiAgICA+CiAgICBieiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZQogICAgaW50YyA4IC8vIDUwMDAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NQogICAgLy8gcmV0dXJuIGNyZWF0b3JSb3lhbHR5CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmV3YXJkc09wdEluQ29zdChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJld2FyZHNPcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDkKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZXdhcmRzT3B0SW5Db3N0X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA2IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMQogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTEyCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjIKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI0CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjUKICAgIC8vIGNvdW50ICs9IDEKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyOAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgKwogICAgZnJhbWVfYnVyeSAwCgpzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MzEKICAgIC8vIHJldHVybiBjb3VudAogICAgZnJhbWVfZGlnIDAKICAgIHN3YXAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkuY3JlYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKY3JlYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyCiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3V0ZjhbXSkKICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDkgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHVuY292ZXIgNAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgNSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNQogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IGNoaWxkVmVyc2lvbgogICAgdW5jb3ZlciAzCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjYKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUgPSBha2l0YURBTwogICAgdW5jb3ZlciAyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjcKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBha2l0YURBT0VzY3JvdwogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMgogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpuZXdBdWN0aW9uOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMi00NgogICAgLy8gbmV3QXVjdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMiAvLyAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIHB1c2hpbnQgNCAvLyBheGZlcgogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGF4ZmVyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cG4gMgogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICAqCiAgICBwdXNoaW50IDIgLy8gMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4WzMyXVtdKQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwbiAyCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgY292ZXIgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgY292ZXIgNQogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBjb3ZlciA1CiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgY292ZXIgNQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGNvdmVyIDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0NwogICAgLy8gYXNzZXJ0KGJpZE1pbmltdW1JbmNyZWFzZSA+IDAsIEVSUl9CSURTX01VU1RfQUxXQVlTX0lOQ1JFQVNFKQogICAgdW5jb3ZlciAyCiAgICBhc3NlcnQgLy8gYmlkcyBtdXN0IGFsd2F5cyBpbmNyZWFzZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjQ4CiAgICAvLyBhc3NlcnQoZW5kVGltZXN0YW1wID4gc3RhcnRUaW1lc3RhbXAgKyAzMDAsIEVSUl9FTkRfTVVTVF9CRV9BVExFQVNUX0ZJVkVfTUlOVVRFU19BRlRFUl9TVEFSVCkKICAgIHN3YXAKICAgIHB1c2hpbnQgMzAwIC8vIDMwMAogICAgKwogICAgPgogICAgYXNzZXJ0IC8vIGVuZGluZyByb3VuZCBtdXN0IGJlIGF0IGxlYXN0IDEwMCByb3VuZHMgYWZ0ZXIgc3RhcnRpbmcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NDkKICAgIC8vIGFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIENvbnRyYWN0IG5vdCBzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MQogICAgLy8gY29uc3QgaXNBbGdvQmlkID0gYmlkQXNzZXRJRCA9PT0gMAogICAgZHVwCiAgICAhCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTMKICAgIC8vIGFzc2VydChpc0FsZ29CaWQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGJpZEFzc2V0SUQpKSwgRVJSX05PVF9PUFRFRF9JTikKICAgIGJ6IG5ld0F1Y3Rpb25fYm9vbF90cnVlQDMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBkaWcgMTIKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBuZXdBdWN0aW9uX2Jvb2xfZmFsc2VANAoKbmV3QXVjdGlvbl9ib29sX3RydWVAMzoKICAgIGludGNfMSAvLyAxCgpuZXdBdWN0aW9uX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1MwogICAgLy8gYXNzZXJ0KGlzQWxnb0JpZCB8fCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYmlkQXNzZXRJRCkpLCBFUlJfTk9UX09QVEVEX0lOKQogICAgYXNzZXJ0IC8vIE5vdCBvcHRlZCBpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzQWxnb0JpZCA/IDEgOiAyKQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBwdXNoaW50IDIgLy8gMgogICAgaW50Y18xIC8vIDEKICAgIGRpZyAzCiAgICBzZWxlY3QKICAgICoKICAgIGJ1cnkgMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2NQogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2NQogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTYKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBidXJ5IDIxCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDYwNjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjUKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjYKICAgIC8vIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAxMgogICAgYm56IG5ld0F1Y3Rpb25fZWxzZV9ib2R5QDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDYwNjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpuZXdBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3MgogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZGlnIDIxCiAgICArCiAgICBkaWcgMwogICAgaW50YyA2IC8vIDEzMTEzMzAwCiAgICAqCiAgICBkdXAKICAgIGJ1cnkgMjEKICAgICsKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzQtNzYKICAgIC8vIE1BWF9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBhdWN0aW9uLmdsb2JhbEJ5dGVzKSArCiAgICBpbnRjIDcgLy8gMTU5MTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjc0LTc3CiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo4MS04OAogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0b3RhbE1CUiwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDE4CiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODQKICAgIC8vIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODEtODgKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdG90YWxNQlIsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMwogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTEtOTkKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBhc3NldFhmZXIsCiAgICAvLyAgIHsKICAgIC8vICAgICBzZW5kZXI6IFR4bi5zZW5kZXIsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHsgZ3JlYXRlclRoYW46IDAgfSwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfVFJBTlNGRVIKICAgIC8vICkKICAgIGRpZyAxOAogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo5NAogICAgLy8gc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjkxLTk5CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiB7IGdyZWF0ZXJUaGFuOiAwIH0sCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICA9PQogICAgZGlnIDEKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo5NQogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjkxLTk5CiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgYXNzZXRYZmVyLAogICAgLy8gICB7CiAgICAvLyAgICAgc2VuZGVyOiBUeG4uc2VuZGVyLAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiB7IGdyZWF0ZXJUaGFuOiAwIH0sCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1RSQU5TRkVSCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIHN3YXAKICAgIGd0eG5zIEFzc2V0QW1vdW50CiAgICBzd2FwCiAgICBkaWcgMQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHRyYW5zZmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAxCiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDEKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAyMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkaWcgMjEKICAgIGRpZyAyMQogICAgY2FsbHN1YiByb3lhbHRpZXMKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDQKICAgIC8vIGNvbnN0IGFwcHJvdmFsU2l6ZSA9IHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwNQogICAgLy8gY29uc3QgY2h1bmsxID0gdGhpcy5ib3hlZENvbnRyYWN0LmV4dHJhY3QoMCwgNDA5NikKICAgIGludGNfMCAvLyAwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDYKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBzd2FwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDYKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBpbnRjIDUgLy8gNDA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwOC0xMzAKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTExCiAgICAvLyBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgZGlnIDIKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMTkKICAgIC8vIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIHVuY292ZXIgNgogICAgZ3R4bnMgU2VuZGVyCiAgICB1bmNvdmVyIDcKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMAogICAgLy8gVHhuLnNlbmRlciwKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjEKICAgIC8vIGNyZWF0b3JSb3lhbHR5LAogICAgdW5jb3ZlciA2CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI0CiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM0CiAgICAvLyBjaGlsZENvbnRyYWN0VmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEJhc2VGYWN0b3J5R2xvYmFsU3RhdGVLZXlDaGlsZENvbnRyYWN0VmVyc2lvbiB9KQogICAgYnl0ZWMgNSAvLyAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjQKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjUKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTI1CiAgICAvLyB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo2NQogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjUKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaXRvYgogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA4LTEzMAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGJ5dGVjIDEwIC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLCh1aW50NjQsdWludDY0KSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjExMgogICAgLy8gZmFsc2UsCiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxOQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU5CiAgICAvLyBjb25zdCBhdWN0aW9uID0gY29tcGlsZUFyYzQoQXVjdGlvbikKICAgIHB1c2hpbnQgOSAvLyA5CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyNiAvLyAyNgogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA4LTEzMAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyOQogICAgLy8gZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIHB1c2hpbnQgMyAvLyAzCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTkKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgYnl0ZWMgMTEgLy8gYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDgtMTMwCiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDgtMTMyCiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBidXJ5IDI2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTM1LTE0MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzNwogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzOAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIHVuY292ZXIgNgogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzUtMTM5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzUtMTQwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0My0xNTIKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ3CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ4CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0Ni0xNDkKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNDMtMTUyCiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBieXRlYyA3IC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE1NS0xNjEKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYXNzZXRYZmVyLmFzc2V0QW1vdW50LAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXRYZmVyLnhmZXJBc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTcKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTUtMTYwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNCAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTUtMTYxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2MwogICAgLy8gaWYgKCFpc0FsZ29CaWQpIHsKICAgIGRpZyAxMQogICAgYnogbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDE3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY1LTE3NAogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjkKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBkaWcgMjAKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3MAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjgtMTcxCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY1LTE3NAogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgYnl0ZWMgNyAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld0F1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNzgKICAgIC8vIGlmIChiaWRGZWUgPiAwKSB7CiAgICBkaWcgOQogICAgYnogbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDIxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgxLTE5MAogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTg1CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIGRpZyAyMAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTkKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTg0LTE4NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgxLTE5MAogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGJ5dGVjIDEyIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld0F1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMi00NgogICAgLy8gbmV3QXVjdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgZGlnIDIwCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdBdWN0aW9uX2Vsc2VfYm9keUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2OQogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEzCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA5IC8vIDMwMzAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjY5CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgICsKICAgICsKICAgIGIgbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDgKCm5ld0F1Y3Rpb25fYm9vbF9mYWxzZUA0OgogICAgaW50Y18wIC8vIDAKICAgIGIgbmV3QXVjdGlvbl9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld1ByaXplQm94QXVjdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1ByaXplQm94QXVjdGlvbjoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTk2LTIwOAogICAgLy8gbmV3UHJpemVCb3hBdWN0aW9uKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIgLy8gMgogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGFwcGwKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBhcHBsCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgY292ZXIgMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgY292ZXIgMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA2CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIgLy8gMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ4WzMyXQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMQogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICBpbnRjXzAgLy8gMAogICAgZ3R4bnNhcyBBcHBsaWNhdGlvbkFyZ3MKICAgIGJ5dGVjIDEzIC8vIG1ldGhvZCAidHJhbnNmZXIoYWRkcmVzcyl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTEtMjEyCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbl9ib29sX2ZhbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTIKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGRpZyAxNgogICAgZ3R4bnMgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjExLTIxMgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uX2Jvb2xfZmFsc2VANAogICAgaW50Y18xIC8vIDEKCm5ld1ByaXplQm94QXVjdGlvbl9ib29sX21lcmdlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjEwLTIxMwogICAgLy8gYXNzZXJ0KCgKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPigpICYmCiAgICAvLyAgIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICksIEVSUl9CQURfTUVUSE9EX1BSSVpFX0JPWF9UUkFOU0ZFUl9ORUVERUQpCiAgICBhc3NlcnQgLy8gQmFkIG1ldGhvZCBwcml6ZSBib3ggdHJhbnNmZXIgbmVlZGVkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE0CiAgICAvLyBhc3NlcnQoZ2V0UHJpemVCb3hPd25lcih0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkKSA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxNAogICAgLy8gYXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTcKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGR1cAogICAgYnVyeSAyMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NDkKICAgIC8vIGFzc2VydChwcml6ZUJveC5jcmVhdG9yID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLnByaXplQm94KS5hZGRyZXNzLCBFUlJfTk9UX0FfUFJJWkVfQk9YKQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICB1bmNvdmVyIDIKICAgIGJ5dGVjIDYgLy8gImFhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5CiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgRVJSX05PVF9BX1BSSVpFX0JPWCkKICAgIHB1c2hpbnQgMjQgLy8gMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE5vdCBhIHByaXplIGJveAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTAKICAgIC8vIGNvbnN0IFtvd25lckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKHByaXplQm94LCBCeXRlcyhQcml6ZUJveEdsb2JhbFN0YXRlS2V5T3duZXIpKQogICAgcHVzaGJ5dGVzICJvd25lciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTQKICAgIC8vIGFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBOb3QgcHJpemUgYm94IG93bmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjE1CiAgICAvLyBhc3NlcnQoYmlkTWluaW11bUluY3JlYXNlID4gMCwgRVJSX0JJRFNfTVVTVF9BTFdBWVNfSU5DUkVBU0UpCiAgICBkaWcgOAogICAgYXNzZXJ0IC8vIGJpZHMgbXVzdCBhbHdheXMgaW5jcmVhc2UKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTYKICAgIC8vIGFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCArIDMwMCwgRVJSX0VORF9NVVNUX0JFX0FUTEVBU1RfRklWRV9NSU5VVEVTX0FGVEVSX1NUQVJUKQogICAgZGlnIDYKICAgIHB1c2hpbnQgMzAwIC8vIDMwMAogICAgKwogICAgZGlnIDUKICAgIDwKICAgIGFzc2VydCAvLyBlbmRpbmcgcm91bmQgbXVzdCBiZSBhdCBsZWFzdCAxMDAgcm91bmRzIGFmdGVyIHN0YXJ0aW5nCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxNwogICAgLy8gYXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIEVSUl9DT05UUkFDVF9OT1RfU0VUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBhc3NlcnQgLy8gQ29udHJhY3Qgbm90IHNldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyMAogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb0JpZCA/IDAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxMwogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X2ZhbHNlQDcKICAgIGludGNfMCAvLyAwCiAgICBidXJ5IDIwCgpuZXdQcml6ZUJveEF1Y3Rpb25fdGVybmFyeV9tZXJnZUA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzMQogICAgLy8gaWYgKGlzQWxnb0JpZCkgewogICAgZGlnIDEzCiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uX2Vsc2VfYm9keUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjA2MDAKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzNwogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZGlnIDIxCiAgICArCiAgICBkaWcgMgogICAgaW50YyA2IC8vIDEzMTEzMzAwCiAgICAqCiAgICBkdXAKICAgIGJ1cnkgMjEKICAgICsKICAgIGRpZyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM5LTI0MQogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNyAvLyAxNTkxMDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM5LTI0MgogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQ2LTI1MwogICAgLy8gYXNzZXJ0TWF0Y2goCiAgICAvLyAgIHBheW1lbnQsCiAgICAvLyAgIHsKICAgIC8vICAgICByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiB0b3RhbE1CUiwKICAgIC8vICAgfSwKICAgIC8vICAgRVJSX0lOVkFMSURfUEFZTUVOVAogICAgLy8gKQogICAgZGlnIDE3CiAgICBkdXAKICAgIGd0eG5zIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQ5CiAgICAvLyByZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0Ni0yNTMKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogdG90YWxNQlIsCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMwogICAgPT0KICAgICYmCiAgICBhc3NlcnQgLy8gSW52YWxpZCBwYXltZW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjU1CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBBc3NldCgwKSwgJycsIFtdKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI1NQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHkgPSByb3lhbHRpZXModGhpcy5ha2l0YURBTy52YWx1ZSwgQXNzZXQoMCksICcnLCBbXSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgcHVzaGJ5dGVzcyAiIiAweDAwMDAgLy8gIiIsIDB4MDAwMAogICAgY2FsbHN1YiByb3lhbHRpZXMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTgKICAgIC8vIGNvbnN0IGFwcHJvdmFsU2l6ZSA9IHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI1OQogICAgLy8gY29uc3QgY2h1bmsxID0gdGhpcy5ib3hlZENvbnRyYWN0LmV4dHJhY3QoMCwgNDA5NikKICAgIGludGNfMCAvLyAwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjAKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBzd2FwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjAKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBpbnRjIDUgLy8gNDA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2Mi0yODQKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjUKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBkaWcgMjQKICAgIGR1cAogICAgY292ZXIgNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI3MwogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgdW5jb3ZlciA0CiAgICBndHhucyBTZW5kZXIKICAgIHVuY292ZXIgNQogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjc0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI3NQogICAgLy8gY3JlYXRvclJveWFsdHksCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzgKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA1IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI3OAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI3OQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzkKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI3OQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjItMjg0CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBieXRlYyAxMCAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZywodWludDY0LHVpbnQ2NCkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjY2CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMjMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMjEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgOQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA4CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjI0CiAgICAvLyBjb25zdCBhdWN0aW9uID0gY29tcGlsZUFyYzQoQXVjdGlvbikKICAgIHB1c2hpbnQgOSAvLyA5CiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyNiAvLyAyNgogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjYyLTI4NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjgzCiAgICAvLyBleHRyYVByb2dyYW1QYWdlczogMwogICAgcHVzaGludCAzIC8vIDMKICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMjQKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgYnl0ZWMgMTEgLy8gYmFzZTY0KEM0RUJRdz09KQogICAgaXR4bl9maWVsZCBDbGVhclN0YXRlUHJvZ3JhbVBhZ2VzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjYyLTI4NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjItMjg2CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICAvLyAgIC5pdHhuCiAgICAvLyAgIC5jcmVhdGVkQXBwCiAgICBnaXR4biAwIENyZWF0ZWRBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGJ1cnkgMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyODgtMjkxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFthdWN0aW9uQXBwLmFkZHJlc3NdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5MAogICAgLy8gYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI4OC0yOTEKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCwKICAgIC8vICAgYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIC8vIH0pCiAgICBieXRlYyAxMyAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5NC0yOTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTYKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjk3CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgdW5jb3ZlciAyCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5NC0yOTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5NC0yOTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzAxCiAgICAvLyBpZiAoIWlzQWxnb0JpZCkgewogICAgZGlnIDEzCiAgICBieiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAxOAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMwMy0zMTIKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzA3CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZGlnIDIwCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMDgKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzA2LTMwOQogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMwMy0zMTIKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGJ5dGVjIDcgLy8gbWV0aG9kICJvcHRpbihwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDE1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMTYKICAgIC8vIGlmIChiaWRGZWUgPiAwKSB7CiAgICBkaWcgMTEKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDIyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzE4LTMyNwogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzIyCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIGRpZyAyMAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTkKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzIxLTMyNAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzE4LTMyNwogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGJ5dGVjIDEyIC8vIG1ldGhvZCAiaW5pdChwYXksdWludDY0KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE5Ni0yMDgKICAgIC8vIG5ld1ByaXplQm94QXVjdGlvbigKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBkaWcgMjAKICAgIGl0b2IKICAgIGJ5dGVjXzMgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1ByaXplQm94QXVjdGlvbl9lbHNlX2JvZHlAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM0CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzNAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTQKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDEwIC8vIDI0MjQwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzNAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgICsKICAgIGIgbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTEKCm5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X2ZhbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjIwCiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gaXNBbGdvQmlkID8gMCA6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBidXJ5IDIwCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X21lcmdlQDgKCm5ld1ByaXplQm94QXVjdGlvbl9ib29sX2ZhbHNlQDQ6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25fYm9vbF9tZXJnZUA1CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5kZWxldGVBdWN0aW9uQXBwW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXVjdGlvbkFwcDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzMKICAgIC8vIGRlbGV0ZUF1Y3Rpb25BcHAoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzNAogICAgLy8gYXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX0FOX0FVQ1RJT04pCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0IC8vIG5vdCBhbiBhdWN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzM1CiAgICAvLyBjb25zdCBzZWxsZXIgPSBBY2NvdW50KG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIpKVswXSkKICAgIGR1cAogICAgYnl0ZWMgMTQgLy8gInNlbGxlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzYKICAgIC8vIGFzc2VydChzZWxsZXIgPT09IFR4bi5zZW5kZXIsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGFzc2VydCAvLyBOb3QgcHJpemUgYm94IG93bmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1NQogICAgLy8gY29uc3QgW2Z1bmRlckJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhHbG9iYWxTdGF0ZUtleUZ1bmRlcikpCiAgICBkdXAKICAgIGJ5dGVjIDE1IC8vICJmdW5kZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzM4CiAgICAvLyBjb25zdCB7IGFjY291bnQ6IHJlY2VpdmVyLCBhbW91bnQgfSA9IGdldEZ1bmRlcihhcHBJZCkKICAgIGR1cAogICAgZXh0cmFjdCAwIDMyCiAgICBzd2FwCiAgICBwdXNoaW50IDMyIC8vIDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0MgogICAgLy8gYXVjdGlvbi5jYWxsLmRlbGV0ZUFwcGxpY2F0aW9uKHsgYXBwSWQgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hieXRlcyAweDI0ODdjMzJjIC8vIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA1IC8vIDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDQtMzQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzQ0LTM0NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDQtMzQ2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzMzCiAgICAvLyBkZWxldGVBdWN0aW9uQXBwKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkuY2FuY2VsQXVjdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6CmNhbmNlbEF1Y3Rpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzQ5CiAgICAvLyBjYW5jZWxBdWN0aW9uKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNTAKICAgIC8vIGFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9BTl9BVUNUSU9OKQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBub3QgYW4gYXVjdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1MQogICAgLy8gY29uc3Qgc2VsbGVyID0gQWNjb3VudChvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyKSlbMF0pCiAgICBkdXAKICAgIGJ5dGVjIDE0IC8vICJzZWxsZXIiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzUyCiAgICAvLyBhc3NlcnQoc2VsbGVyID09PSBUeG4uc2VuZGVyLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBhc3NlcnQgLy8gTm90IHByaXplIGJveCBvd25lcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTUKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZHVwCiAgICBieXRlYyAxNSAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1NAogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMiAvLyAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNTgKICAgIC8vIGF1Y3Rpb24uY2FsbC5jYW5jZWwoeyBhcHBJZCB9KQogICAgaXR4bl9iZWdpbgogICAgcHVzaGJ5dGVzIDB4MzFmMjZhOWIgLy8gbWV0aG9kICJjYW5jZWwoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA1IC8vIDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjAtMzYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzYwLTM2MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjAtMzYyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzQ5CiAgICAvLyBjYW5jZWxBdWN0aW9uKGFwcElkOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo6QXVjdGlvbkZhY3RvcnkubmV3QXVjdGlvbkNvc3Rbcm91dGluZ10oKSAtPiB2b2lkOgpuZXdBdWN0aW9uQ29zdDoKICAgIHB1c2hieXRlcyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2NQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18xIC8vIDEKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJvb2w4CiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBjb3ZlciAyCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA0CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2OAogICAgLy8gY29uc3QgaXNBbGdvQmlkID0gYmlkQXNzZXRJRCA9PT0gMAogICAgIQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2OQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc1ByaXplQm94ID8gKGlzQWxnb0JpZCA/IDAgOiAxKSA6IChpc0FsZ29CaWQgPyAxIDogMikpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGNvdmVyIDIKICAgIGJ6IG5ld0F1Y3Rpb25Db3N0X3Rlcm5hcnlfZmFsc2VAMwogICAgIQoKbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2OQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc1ByaXplQm94ID8gKGlzQWxnb0JpZCA/IDAgOiAxKSA6IChpc0FsZ29CaWQgPyAxIDogMikpCiAgICBkaWcgMQogICAgKgogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc3CiAgICAvLyBpZiAoIWlzUHJpemVCb3gpIHsKICAgIGRpZyA0CiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzgKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc4CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDYwNjAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc4CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3OQogICAgLy8gaWYgKGlzQWxnb0JpZCkgewogICAgZGlnIDQKICAgIGJueiBuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjA2MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODAKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM5MAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZGlnIDcKICAgICsKICAgIGRpZyAzCiAgICBpbnRjIDYgLy8gMTMxMTMzMDAKICAgICoKICAgICsKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozOTItMzk0CiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgaW50YyA3IC8vIDE1OTEwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozOTItMzk1CiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWNfMyAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzgyCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODIKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA1CiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA5IC8vIDMwMzAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4MgogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICArCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4NAogICAgLy8gfSBlbHNlIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAzCiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2MDYwMAogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzg3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4NwogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNAogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgMTAgLy8gMjQyNDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzg3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgKwogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY5CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgIHB1c2hpbnQgMiAvLyAyCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIGIgbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5pbml0Qm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmluaXRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDIKICAgIC8vIGluaXRCb3hlZENvbnRyYWN0KHZlcnNpb246IHN0cmluZywgc2l6ZTogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDUgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDQKICAgIC8vIGlmICghdGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ1CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ2CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuY3JlYXRlKHsgc2l6ZSB9KQogICAgc3dhcAogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDkKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5yZXNpemUoc2l6ZSkKICAgIHN3YXAKICAgIGJveF9yZXNpemUKICAgIGIgaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYKICAgIHB1c2hpbnQgMiAvLyAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciAobGVuK3VpbnQ4W10pCiAgICBleHRyYWN0IDIgMAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTQKICAgIC8vIGNvbnN0IGV4cGVjdGVkUHJldmlvdXNDYWxsczogdWludDY0ID0gb2Zmc2V0IC8gMjAzMgogICAgcHVzaGludCAyMDMyIC8vIDIwMzIKICAgIC8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU1CiAgICAvLyBjb25zdCB0eG4gPSBndHhuLlRyYW5zYWN0aW9uKFR4bi5ncm91cEluZGV4IC0gZXhwZWN0ZWRQcmV2aW91c0NhbGxzIC0gMSkKICAgIHR4biBHcm91cEluZGV4CiAgICBzd2FwCiAgICAtCiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1NwogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gNgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTgKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICBkdXAKICAgIGd0eG5zIEFwcGxpY2F0aW9uSUQKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25JRAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTU4CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTkKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICBkdXAKICAgIGd0eG5zIE51bUFwcEFyZ3MKICAgIHB1c2hpbnQgMyAvLyAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTkKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjAKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZHVwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYwCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYxCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyA4IC8vIG1ldGhvZCAiaW5pdEJveGVkQ29udHJhY3Qoc3RyaW5nLHVpbnQ2NCl2b2lkIgogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYxCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2MgogICAgLy8gJiYgdHhuLnNlbmRlciA9PT0gVHhuLnNlbmRlcgogICAgZHVwCiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny02MgogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgaW50Y18xIC8vIDEKCmxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfbWVyZ2VAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU2LTYzCiAgICAvLyBhc3NlcnQoKAogICAgLy8gICB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gICAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gICAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gICAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIC8vICAgJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAgICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIC8vICksIEVSUl9JTlZBTElEX0NBTExfT1JERVIpCiAgICBhc3NlcnQgLy8gSW52YWxpZCBjYWxsIG9yZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjQKICAgIC8vIGFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYXNzZXJ0IC8vIENvbnRyYWN0IG5vdCBzZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2NQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlcGxhY2Uob2Zmc2V0LCBkYXRhKQogICAgZGlnIDMKICAgIGRpZyAzCiAgICBib3hfcmVwbGFjZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4OgogICAgaW50Y18wIC8vIDAKICAgIGIgbG9hZEJveGVkQ29udHJhY3RfYm9vbF9tZXJnZUA5CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5kZWxldGVCb3hlZENvbnRyYWN0W3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDQgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY5CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjcwCiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QuZGVsZXRlKCkKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjgKICAgIC8vIGRlbGV0ZUJveGVkQ29udHJhY3QoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5bcm91dGluZ10oKSAtPiB2b2lkOgpvcHRJbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MAogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1MgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hZGRyZXNzLCBhc3NldCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZGlnIDIKICAgIGNhbGxzdWIgc3BsaXRPcHRJbkNvdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTQtMTYxCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICBkaWcgMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NwogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NC0xNjEKICAgIC8vIGFzc2VydE1hdGNoKAogICAgLy8gICBwYXltZW50LAogICAgLy8gICB7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKDEgKyBjb3VudCksCiAgICAvLyAgIH0sCiAgICAvLyAgIEVSUl9JTlZBTElEX1BBWU1FTlQKICAgIC8vICkKICAgID09CiAgICB1bmNvdmVyIDMKICAgIGd0eG5zIEFtb3VudAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU4CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLAogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpbnRjXzEgLy8gMQogICAgdW5jb3ZlciA0CiAgICArCiAgICAqCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTQtMTYxCiAgICAvLyBhc3NlcnRNYXRjaCgKICAgIC8vICAgcGF5bWVudCwKICAgIC8vICAgewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLAogICAgLy8gICB9LAogICAgLy8gICBFUlJfSU5WQUxJRF9QQVlNRU5UCiAgICAvLyApCiAgICA9PQogICAgJiYKICAgIGFzc2VydCAvLyBJbnZhbGlkIHBheW1lbnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2My0xNjkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjUKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjYKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYzLTE2OAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0IC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTYzLTE2OQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTAKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTcyCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzQKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNzQKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYWRkcmVzcywgYXNzZXQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjY1CiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTc0CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3NQogICAgLy8gcmV0dXJuIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgICsKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE3MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlY18zIC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0LnVwZGF0ZUFraXRhREFPRXNjcm93W3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3c6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzgKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM4CiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBPbmx5IHRoZSBBa2l0YSBEQU8gY2FuIGNhbGwgdGhpcyBmdW5jdGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NjUKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzkKICAgIC8vIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgPSBhcHAKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGFwcDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgcHVzaGludCAyIC8vIDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIChsZW4rdXRmOFtdKQogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBhc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI5CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzIKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICB1bmNvdmVyIDIKICAgID09CiAgICBhc3NlcnQgLy8gT25seSB0aGUgQWtpdGEgREFPIGNhbiBjYWxsIHRoaXMgZnVuY3Rpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBwdXNoYnl0ZXMgInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNiAvLyAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUyCiAgICAvLyBhc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYXNzZXJ0IC8vIEludmFsaWQgYXBwIHVwZ3JhZGUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyA5IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTMKICAgIC8vIHRoaXMudmVyc2lvbi52YWx1ZSA9IG5ld1ZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzkKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjkKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMgogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgNCAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzkKICAgIC8vIGFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYXNzZXJ0IC8vIE9ubHkgdGhlIEFraXRhIERBTyBjYW4gY2FsbCB0aGlzIGZ1bmN0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyOQogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQwCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozOAogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCg==", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEgLy8gMQogICAgcmV0dXJuCg==" }, "byteCode": { "approval": "CyALAAEIBrjZA4Ag1K+gBtiNYdCGA5i/EuDlDiYQCWFraXRhX2RhbwJiYwxha2l0YV9lc2Nyb3cEFR98dQZ3YWxsZXQWY2hpbGRfY29udHJhY3RfdmVyc2lvbgNhYWwEPqEYMgTFOzLMB3ZlcnNpb24EW1uJvgQLgQFDBL1xSNAErfkq5AZzZWxsZXIGZnVuZGVygATqkYDdNhoAjgEAqzEZFEQxGEEAlIIFBNFUj/8Ec/ACIwQXFNplBID0RUEEpdQrOicIgggE3KLYYgTTRrGkBDlOrrIEM/eICAQerSCpBDPpLJQEhU3t4ARzERBwNhoAjg4BgQQhBoQG0QceB70IBAhwCIQI0Qj4CUwAKgABAIAkFR98dQAAAAAAAIhUAAAAAADIF9QAAAAAAABIRAAAAAAAAEnUsCNDI0OABMQm9Lo2GgCOAQEBADEZgQQSMRgQREIIz4oEAiJJi/8iWUAACoGIJ4v/TwNPA4mxi/wnBmVIgUhbi/1xC0SL/hUWVwYCi/5Qi/0WAQEjFoAEDPG5z7IaTwOyGk8CshpMshqL/7IashqACQAHcm95YWx0ebIashglshAisgGztD5JVwQASwFXAAQrEkRJIlmBAghMFRJEVwYASYwAFUEABYsAF4wBiwEhCA1BAAkhCIv/TwNPA4mLAYv/TwNPA4mKAgGL/0EAF4v+JwZlSCRbcghEi/9wAEUBQAADMhCJIomKAwEii/6L/3AARQFAABqL/YAOcmV2ZW51ZV9zcGxpdHNlSCJZIwiMAIsATIk2GgFJIlmBAghLARUSRFcCADYaAkkiWYECCEsBFRJEVwIANhoDSRUkEkQXNhoESRUkEkQXJwlPBGcnBU8DZyhPAmcqTGcjQ4AARwMxFoECCUk4ECMSRDEWIwlJOBCBBBJENhoBSSJZgQIISwEVEkRXAgA2GgJHAiJZgSALgQIITBUSRDYaA0cCFSQSRBdJNhoESU4CSRUkEkQXTDYaBUlOAhUkEkQ2GgZJTgJJFSQSRBc2GgdJTgNJFSQSRBc2GghJTgRJFSQSRBc2GglJTgUVJBJENhoKSU4FFYEgEkQ2GgtJTgVJFSQSRBdOBE8CREyBrAIIDUQpvUUBREkUTEEACzIKSwxwAEUBQQHXI0QyEIECI0sDTQtFFCIoZURLEDgRSUUViP6LIQQISwxAAaQhBAgyAUsVCEsDIQYLSUUVCEsBCCEHCEsSSTgHMgoSSwE4CEsDEhBESxJJOAAxABJLATgUMgoSEEw4EkxLARBEIihlREsXSU4CSxVLFYj9jUhMKb1EKSIhBbpMIQUJKSEFTwK6sUsCFk8GOABPBxZQMQBPBhYiJwVlREkVFlcGAkxQIihlRCIqZURMFkwWUCcKshpLBbIagAEAshpLF7IaSxWyGksTshpLErIaSxGyGksQshpPBLIaTwOyGk8CshpLDLIaSwuyGkyyGrIagQmyNYEasjQishmBA7I4JwuyQk8CskBMskAlshAisgGztwA9SUUasUlyCEQyAU8GCLIIsgcjshAisgGzsUlyCEQyELIIsgcjshAisgG2JweyGkyyGiKyGUmyGCWyECKyAbOxcghEshSyEbISgQSyECKyAbNLC0EAKLFLFElyCEQyELIIsgcjshAisgG2JweyGksNshoishmyGCWyECKyAbNLCUEAKLFLFElyCERLE7IIsgcjshAisgG2JwyyGksDshoishmyGCWyECKyAbNLFBYrTFCwI0MiKGVESw2I/NYhCQgIQv5PIkL+JoAARwMxFoECCUcCOBAlEkQxFiMJSU4COBAjEkQ2GgFJTgJJFSQSRBdMNhoCSU4CSRUkEkQXTDYaA0lOAhUkEkQ2GgRJTgJJFSQSRBdMNhoFSU4CSRUkEkQXTDYaBklOAkkVJBJEF0w2GgdJTgIVJBJENhoISU4CFYEgEkQ2GglJTgJJFSQSRBdMIsIaJw0SQQHNSxA4GUABxiNEIihlREsROBhJRRVJcgdETwInBmVIgRhbcghEEkSABW93bmVyZUgyChJESwhESwaBrAIISwUMRCm9RQFESw1AAXwiRRRLDUABZSEEMgFLFQhLAiEGC0lFFQhLAQghBwhLEUk4BzIKEksBOAhLAxIQRCIoZUQiggIAAgAAiPsMSCm9RCkiIQW6TCEFCSkhBU8CurFLGElOBhZPBDgATwUWUDEATwUWIicFZURJFRZXBgJMUCIoZUQiKmVETBZMFlAnCrIaTwWyGoABgLIaSxeyGksVshpLE7IaSxKyGksQshpLDrIaTwSyGk8DshpPArIaSwmyGksIshpMshqyGoEJsjWBGrI0IrIZgQOyOCcLskJMskCyQCWyECKyAbO3AD1JRRixSXIIRCcNshqyGkyyGCWyECKyAbOxcghEMgFPAgiyCLIHI7IQIrIBs0sNQQAosUsUSXIIRDIQsgiyByOyECKyAbYnB7IaSw+yGiKyGbIYJbIQIrIBs0sLQQAosUsUSXIIREsTsgiyByOyECKyAbYnDLIaSwKyGiKyGbIYJbIQIrIBs0sUFitMULAjQyIoZURLDoj6eSEKCEL+jjIQRRRC/oAiQv43NhoBSRUkEkQXSXIHRDIKEkRJJw5lSDEAEkRJJw9lSElXACBMgSBbsYAEJIfDLLIagQWyGU8CshglshAisgGzsbIIsgcjshAisgGzI0M2GgFJFSQSRBdJcgdEMgoSREknDmVIMQASREknD2VISVcAIEyBIFuxgAQx8mqbshqBBbIZTwKyGCWyECKyAbOxsgiyByOyECKyAbMjQ4AANhoBSRUjEkQiU0k2GgJJFSQSRBdJTgI2GgNJFSQSRBdOAjYaBEkVJBJEF04CFEwyEE4CQQBeFEsBC0UGSwRAADoiKGVESwOI+YIhBAhLBEAAGSEECDIBSwcISwMhBgsICCEHCBYrTFCwI0MiKGVESwWI+VghCQgIQv/aSwNAAAUhBEL/0CIoZURLBIj5PiEKCEL/wYECI08CTUL/mjYaAUkiWYECCEsBFRJEVwIANhoCSRUkEkQXTCcFTGcpvUUBQAAMMQAyCRJEKUy5SCNDMQAiKGVEJwRlSHIIRBJEKUzTQv/pNhoBSRUkEkQXSTYaAkkiWYECCEsBFRJEVwIATIHwDwoxFkwJIwlJOBAlEkEAOkk4GDIIEkEAMUk4G4EDEkEAKEk4GUAAIkkiwhonCBJBABhJOAAxABJBAA8jRCm9RQFEKUsDSwO7I0MiQv/uMQAiKGVEJwRlSHIIRBJEKbxII0MxFiMJSTgQIxJENhoBSRUkEkQXIihlRCIqZURyCERLAoj4ZksCOAcyChJPAzgIMhAjTwQICxIQRLEyCkyyESKyErIUgQSyECKyAbMjQzYaAUkVJBJEFyIoZUQiKmVEcghETwKI+CMyECNPAggLFitMULAjQzYaAUkVJBJEFzEAIihlRCcEZUhyCEQSRCpMZyNDNhoBSSJZgQIISwEVEkRXAgAxACIoZURJJwRlSHIIRE8CEkSAA3BhbGVIgRBbMg0SRCcJTGcjQzYaAUkVJBJEFzEAIihlRCcEZUhyCEQSRChMZyND", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
          case "create(string,string,uint64,uint64)void":
            return _AuctionFactoryParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the AuctionFactory smart contract using the create(string,string,uint64,uint64)void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(string,string,uint64,uint64)void",
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
   * Constructs a no op call for the newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newAuction(params) {
    return {
      ...params,
      method: "newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64",
      args: Array.isArray(params.args) ? params.args : [params.args.payment, params.args.assetXfer, params.args.name, params.args.proof, params.args.bidAssetId, params.args.bidFee, params.args.startingBid, params.args.bidMinimumIncrease, params.args.startTimestamp, params.args.endTimestamp, params.args.gateId, params.args.marketplace, params.args.weightsListCount]
    };
  }
  /**
   * Constructs a no op call for the newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 ABI method
   *
   * @param params Parameters for the call
   * @returns An `AppClientMethodCallParams` object for the call
   */
  static newPrizeBoxAuction(params) {
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
       * Creates a new instance of the AuctionFactory smart contract using the create(string,string,uint64,uint64)void ABI method.
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
       * Creates a new instance of the AuctionFactory smart contract using the create(string,string,uint64,uint64)void ABI method.
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
       * Creates a new instance of the AuctionFactory smart contract using an ABI method call using the create(string,string,uint64,uint64)void ABI method.
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
     * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newAuction: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newAuction(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call params
     */
    newPrizeBoxAuction: (params) => {
      return this.appClient.params.call(AuctionFactoryParamsFactory.newPrizeBoxAuction(params));
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newAuction: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newAuction(params));
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call transaction
     */
    newPrizeBoxAuction: (params) => {
      return this.appClient.createTransaction.call(AuctionFactoryParamsFactory.newPrizeBoxAuction(params));
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
     * Makes a call to the AuctionFactory smart contract using the `newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newAuction: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newAuction(params));
      return { ...result, return: result.return };
    },
    /**
     * Makes a call to the AuctionFactory smart contract using the `newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64` ABI method.
     *
     * @param params The params for the smart contract call
     * @returns The call result
     */
    newPrizeBoxAuction: async (params) => {
      const result = await this.appClient.send.call(AuctionFactoryParamsFactory.newPrizeBoxAuction(params));
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
     * optin tells the contract to opt into an asa
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
     * Makes a call to the AuctionFactory smart contract using the `updateAkitaDAOEscrow(uint64)void` ABI method.
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
       * Add a newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the AuctionFactory contract
       */
      newAuction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newAuction(params)));
        resultMappers.push((v) => client.decodeReturnValue("newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64", v));
        return this;
      },
      /**
       * Add a newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the AuctionFactory contract
       */
      newPrizeBoxAuction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPrizeBoxAuction(params)));
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
       * Add a updateAkitaDAOEscrow(uint64)void method call against the AuctionFactory contract
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
var AuctionFactorySDK = class extends _chunkXASWHIKGjs.BaseSDK {
  constructor(params) {
    super({ factory: AuctionFactoryFactory, ...params }, _chunk4M6IGGNMjs.ENV_VAR_NAMES.AUCTION_FACTORY_APP_ID);
  }
  /**
   * Creates a new auction with an ASA prize and returns an AuctionSDK instance.
   * Uses opUp for raffle auctions (weightsListCount > 0) to expand reference limits.
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
    const needsOpUp = BigInt(weightsListCount) > 0n;
    if (isPrizeBox) {
      const { prizeBoxId } = rest;
      const prizeBoxSDK = new (0, _chunkRZUZCM44js.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
      const prizeBoxTransferTxn = (await prizeBoxSDK.client.createTransaction.transfer({
        sender,
        signer,
        args: {
          newOwner: this.client.appAddress.toString()
        }
      })).transactions[0];
      if (needsOpUp) {
        const group = this.client.newGroup();
        group.newPrizeBoxAuction({
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
            weightsListCount
          }
        });
        for (let i = 0; i < 10; i++) {
          group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
        }
        const result = await group.send(sendParams);
        appId = result.returns[0];
      } else {
        ({ return: appId } = await this.client.send.newPrizeBoxAuction({
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
            weightsListCount
          }
        }));
      }
    } else {
      const { prizeAsset: prizeAsset2, prizeAmount } = rest;
      const assetXfer = await this.client.algorand.createTransaction.assetTransfer({
        ...sendParams,
        amount: BigInt(prizeAmount),
        assetId: BigInt(prizeAsset2),
        receiver: this.client.appAddress
      });
      if (needsOpUp) {
        const group = this.client.newGroup();
        group.newAuction({
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
            weightsListCount
          }
        });
        for (let i = 0; i < 10; i++) {
          group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
        }
        const result = await group.send(sendParams);
        appId = result.returns[0];
      } else {
        ({ return: appId } = await this.client.send.newAuction({
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
            weightsListCount
          }
        }));
      }
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
      args: { payment, asset }
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
  async updateAkitaDAOEscrow({ sender, signer, app }) {
    const sendParams = this.getSendParams({ sender, signer });
    await this.client.send.updateAkitaDaoEscrow({
      ...sendParams,
      args: { app }
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

// src/auction/index.ts
var AuctionSDK = class extends _chunkXASWHIKGjs.BaseSDK {
  constructor(params) {
    super({ factory: AuctionFactory, ...params });
  }
  // ========== Read Methods ==========
  /**
   * Gets the current state of the auction.
   */
  async state() {
    var _a, _b, _c;
    const state = await this.client.state.global.getAll();
    return {
      prize: _nullishCoalesce(state.prize, () => ( 0n)),
      isPrizeBox: _nullishCoalesce(state.isPrizeBox, () => ( false)),
      prizeClaimed: _nullishCoalesce(state.prizeClaimed, () => ( false)),
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
      rafflePrizeClaimed: _nullishCoalesce(state.rafflePrizeClaimed, () => ( false)),
      uniqueAddressCount: _nullishCoalesce(state.uniqueAddressCount, () => ( 0n)),
      weightsBoxCount: _nullishCoalesce(state.weightsBoxCount, () => ( 0n)),
      winningTicket: _nullishCoalesce(state.winningTicket, () => ( 0n)),
      raffleWinner: _nullishCoalesce(((_c = state.raffleWinner) == null ? void 0 : _c.toString()), () => ( "")),
      raffleRound: _nullishCoalesce(state.raffleRound, () => ( 0n))
    };
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
   * Uses opUp for raffle auctions (bidFee > 0) to expand reference limits.
   */
  async bid({
    sender,
    signer,
    amount,
    marketplace,
    isAsa = false,
    gateTxn,
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
    const isRaffleAuction = auctionState.bidFee > 0n;
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
      if (gateTxn) {
        if (isRaffleAuction) {
          const group = this.client.newGroup();
          group.gatedBidAsa({ ...sendParams, args: { payment, assetXfer, gateTxn, marketplace } });
          for (let i = 0; i < 3; i++) {
            group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
          }
          await group.send(sendParams);
        } else {
          await this.client.send.gatedBidAsa({
            ...sendParams,
            args: { payment, assetXfer, gateTxn, marketplace }
          });
        }
      } else {
        if (isRaffleAuction) {
          const group = this.client.newGroup();
          group.bidAsa({ ...sendParams, args: { payment, assetXfer, marketplace } });
          for (let i = 0; i < 3; i++) {
            group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
          }
          await group.send(sendParams);
        } else {
          await this.client.send.bidAsa({
            ...sendParams,
            args: { payment, assetXfer, marketplace }
          });
        }
      }
    } else {
      const payment = await this.client.algorand.createTransaction.payment({
        ...sendParams,
        amount: _algokitutils.microAlgo.call(void 0, BigInt(amount) + mbrCost),
        receiver: this.client.appAddress
      });
      if (gateTxn) {
        if (isRaffleAuction) {
          const group = this.client.newGroup();
          group.gatedBid({ ...sendParams, args: { payment, gateTxn, marketplace } });
          for (let i = 0; i < 3; i++) {
            group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
          }
          await group.send(sendParams);
        } else {
          await this.client.send.gatedBid({
            ...sendParams,
            args: { payment, gateTxn, marketplace }
          });
        }
      } else {
        if (isRaffleAuction) {
          const group = this.client.newGroup();
          group.bid({ ...sendParams, args: { payment, marketplace } });
          for (let i = 0; i < 3; i++) {
            group.opUp({ ...sendParams, args: {}, note: i > 0 ? `opUp-${i}` : void 0 });
          }
          await group.send(sendParams);
        } else {
          await this.client.send.bid({
            ...sendParams,
            args: { payment, marketplace }
          });
        }
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
   * Triggers the raffle to draw the winning ticket number.
   * Only applicable for auctions with bid fees (loser raffle).
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
   * Uses opUp transactions to expand reference limits for iterating through weight boxes.
   */
  async findWinner({ sender, signer, iterationAmount }) {
    const sendParams = this.getSendParams({ sender, signer });
    const group = this.client.newGroup();
    const opUpCount = Math.min(15, Math.max(3, 3 + Math.floor(Number(iterationAmount) / 2)));
    for (let i = 0; i < opUpCount; i++) {
      group.opUp({
        ...sendParams,
        args: {},
        note: i > 0 ? `opUp-${i}` : void 0
      });
    }
    group.findWinner({
      ...sendParams,
      args: { iterationAmount }
    });
    await group.send(sendParams);
  }
  /**
   * Claims the auction prize for the highest bidder.
   * Also distributes royalties to marketplace, creator, and Akita.
   * Uses opUp transactions to expand reference limits for royalty distribution.
   */
  async claimPrize(params) {
    const sendParams = this.getSendParams(params);
    const group = this.client.newGroup();
    group.claimPrize({
      ...sendParams,
      args: {}
    });
    for (let i = 0; i < 6; i++) {
      group.opUp({
        ...sendParams,
        args: {},
        note: i > 0 ? `${i}` : void 0
      });
    }
    await group.send(sendParams);
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





exports.AuctionFactorySDK = AuctionFactorySDK; exports.newAuction = newAuction; exports.AuctionSDK = AuctionSDK;
//# sourceMappingURL=chunk-ZW5I4BM7.js.map
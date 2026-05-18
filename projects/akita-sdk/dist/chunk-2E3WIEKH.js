"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } var _class; var _class2; var _class3; var _class4;

var _chunkARDMWE2Yjs = require('./chunk-ARDMWE2Y.js');


var _chunkGIGYZ6YCjs = require('./chunk-GIGYZ6YC.js');


var _chunkA73G7K3Bjs = require('./chunk-A73G7K3B.js');


var _chunkYA4OODI3js = require('./chunk-YA4OODI3.js');

// src/auction/index.ts
var _algokitutils = require('@algorandfoundation/algokit-utils');

// src/generated/AuctionClient.ts
var _abi = require('@algorandfoundation/algokit-utils/abi');
var _appclient = require('@algorandfoundation/algokit-utils/app-client');
var _appfactory = require('@algorandfoundation/algokit-utils/app-factory');
var APP_SPEC = { "name": "Auction", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "BidInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }, { "name": "marketplace", "type": "address" }, { "name": "refunded", "type": "bool" }], "FindWinnerCursors": [{ "name": "startingIndex", "type": "uint64" }, { "name": "currentRangeStart", "type": "uint64" }], "AkitaConfig": [{ "name": "akitaDao", "type": "uint64" }, { "name": "akitaDaoEscrow", "type": "EscrowConfig" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }], "FunderInfo": [{ "name": "account", "type": "address" }, { "name": "amount", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "uint64", "name": "prize" }, { "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAsset" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "(address,uint64)", "struct": "FunderInfo", "name": "funder" }, { "type": "address", "name": "seller" }, { "type": "uint64", "name": "creatorRoyalty" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "string", "name": "version" }, { "type": "(uint64,(string,uint64))", "struct": "AkitaConfig", "name": "akitaConfig" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "init", "args": [{ "type": "pay", "name": "payment" }, { "type": "uint64", "name": "weightListLength" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteApplication", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancel", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["DeleteApplication"] }, "readonly": false, "desc": "deletes the application & returns the mbr + asset\nto the seller IF the auction hasn't started", "events": [], "recommendations": {} }, { "name": "gatedBid", "args": [{ "type": "pay", "name": "payment" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "bid", "args": [{ "type": "pay", "name": "payment" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "gatedBidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "appl", "name": "gateTxn" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "bidAsa", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "address", "name": "marketplace" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundBid", "args": [{ "type": "uint64", "name": "id" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "raffle", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "findWinner", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "refundMBR", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimPrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "claimRafflePrize", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "clearWeightsBoxes", "args": [{ "type": "uint64", "name": "iterationAmount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "isLive", "args": [], "returns": { "type": "bool", "desc": "a boolean of whether the auction is live" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "hasBid", "args": [{ "type": "address", "name": "address" }], "returns": { "type": "bool", "desc": "a boolean of whether the address has bid in the auction" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "getMinimumBidAmount", "args": [], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optin", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction" }, { "type": "uint64", "name": "asset", "desc": "The asset to be opted into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optin tells the contract to opt into an asa", "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 25, "bytes": 10 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "prize": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemU=", "desc": "the asset up for auction" }, "isPrizeBox": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aXNfcHJpemVfYm94", "desc": "whether or not the prize is an asset or a prize box" }, "prizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cHJpemVfY2xhaW1lZA==", "desc": "whether the prize has been claimed" }, "bidAsset": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2Fzc2V0", "desc": "the asset that is being used for bidding in the auction" }, "bidFee": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2ZlZQ==", "desc": "the percentage fee to take for the raffle on each bid in hundreds to support two decimals" }, "startingBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRpbmdfYmlk", "desc": "the starting amount to begin bids at" }, "bidMinimumIncrease": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX21pbmltdW1faW5jcmVhc2U=", "desc": "the smallest amount each new bid need increment the auction price" }, "startTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "c3RhcnRfdGltZXN0YW1w", "desc": "the unix time that the auction starts on" }, "endTimestamp": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "ZW5kX3RpbWVzdGFtcA==", "desc": "the round that the auction ends on" }, "seller": { "keyType": "AVMString", "valueType": "address", "key": "c2VsbGVy", "desc": "the address selling the asset" }, "creatorRoyalty": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Y3JlYXRvcl9yb3lhbHR5", "desc": "the royalty percentage the creator will get for the auction" }, "marketplace": { "keyType": "AVMString", "valueType": "address", "key": "bWFya2V0cGxhY2U=", "desc": "The address of the marketplace that created the auction to send the fee to\n\nIMPORTANT: this is a double sided marketplace fee contract\nthe marketplace referred to internally in the contract\nis the listing side marketplace.\nthe buyer side marketplace provides their address at\nthe time of purchase" }, "marketplaceRoyalties": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "bWFya2V0cGxhY2Vfcm95YWx0aWVz", "desc": "the royalty percentage each side of the market will take for the auction" }, "gateID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "Z2F0ZV9pZA==", "desc": "the gate ID to use to check if the user is qualified to bid in the auction" }, "vrfFailureCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dnJmX2ZhaWx1cmVfY291bnQ=", "desc": "counter for how many times we've failed to get rng from the beacon" }, "refundCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX2NvdW50", "desc": "the number of bids that have been refunded" }, "bidTotal": { "keyType": "AVMString", "valueType": "uint128", "key": "YmlkX3RvdGFs", "desc": "the total sum of all bids" }, "weightedBidTotal": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0ZWRfYmlkX3RvdGFs", "desc": "the total sum of all highest bids" }, "highestBid": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "aGlnaGVzdF9iaWQ=", "desc": "highest bid the contract has received thus far" }, "bidID": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YmlkX2lk", "desc": "the id or index of the last bid" }, "raffleAmount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX2Ftb3VudA==", "desc": "the total amount collected for the loser raffle" }, "rafflePrizeClaimed": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3ByaXplX2NsYWltZWQ=", "desc": "whether the raffle winner has claimed their prize" }, "uniqueAddressCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "dW5pcXVlX2FkZHJlc3NfY291bnQ=", "desc": "we count how many unique addresses bid so we can\nproperly get each bids % of the total bid amount" }, "weightsBoxCount": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2VpZ2h0c19ib3hfY291bnQ=", "desc": "the number of boxes allocated to tracking weights" }, "weightTotals": { "keyType": "AVMString", "valueType": "uint64[15]", "key": "d190b3RhbHM=", "desc": "totals for each box of weights for our skip list" }, "findWinnerCursors": { "keyType": "AVMString", "valueType": "FindWinnerCursors", "key": "ZmluZF93aW5uZXJfY3Vyc29ycw==", "desc": "cursors to track iteration of finding winner\nindex being for the bid iteration\namountIndex being the index for the amount of the bids seen" }, "refundMBRCursor": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmVmdW5kX21icl9jdXJzb3I=", "desc": "cursor to track iteration of MBR refunds" }, "winningTicket": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "d2lubmluZ190aWNrZXQ=", "desc": "we get the winning number from the randomness beacon\nafter the auction ends & we have ran findWinner\nto compile our list" }, "raffleWinner": { "keyType": "AVMString", "valueType": "address", "key": "cmFmZmxlX3dpbm5lcg==", "desc": "the winning address of the raffle" }, "salt": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "c2FsdA==", "desc": "salt for randomness" }, "raffleRound": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "cmFmZmxlX3JvdW5k", "desc": "the round captured when raffle() is first called after auction ends\nused for VRF since round times are dynamic and we need a deterministic round" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" }, "funder": { "keyType": "AVMString", "valueType": "FunderInfo", "key": "ZnVuZGVy" } }, "local": {}, "box": {} }, "maps": { "global": {}, "local": {}, "box": { "bids": { "keyType": "uint64", "valueType": "BidInfo", "desc": "the list of bids in the auction", "prefix": "Yg==" }, "weights": { "keyType": "uint64", "valueType": "uint64[4096]", "desc": "weights set for bidders", "prefix": "dw==" }, "bidsByAddress": { "keyType": "address", "valueType": "uint64", "desc": "when we run our raffle we need to transform\nour list of bids into an address based box", "prefix": "YQ==" }, "locations": { "keyType": "uint64", "valueType": "address", "desc": "the addresses associated with highest bid locations", "prefix": "bA==" } } } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [3878, 4078, 4162, 4268, 6170, 7137], "errorMessage": "Box must have value" }, { "pc": [1219, 1457, 1615, 3160, 5073, 6579], "errorMessage": "Bytes has valid prefix" }, { "pc": [2577], "errorMessage": "ERR:AAST" }, { "pc": [3022, 3609, 4234, 5660], "errorMessage": "ERR:AHNE" }, { "pc": [2739, 2804, 2886, 2964], "errorMessage": "ERR:ANLV" }, { "pc": [4012], "errorMessage": "ERR:ARFC" }, { "pc": [7170], "errorMessage": "ERR:BARF" }, { "pc": [7133], "errorMessage": "ERR:BNFD" }, { "pc": [7105], "errorMessage": "ERR:CRMR" }, { "pc": [2766, 2913], "errorMessage": "ERR:FGTE" }, { "pc": [6038], "errorMessage": "ERR:FORB" }, { "pc": [2816, 2976], "errorMessage": "ERR:HGTE" }, { "pc": [2162], "errorMessage": "ERR:IAPP" }, { "pc": [2074], "errorMessage": "ERR:IAST" }, { "pc": [2315, 2329, 6784, 6799, 6923, 6937], "errorMessage": "ERR:IPAY" }, { "pc": [6082], "errorMessage": "ERR:IPMA" }, { "pc": [6060], "errorMessage": "ERR:IPMR" }, { "pc": [3351, 3366], "errorMessage": "ERR:IRBD" }, { "pc": [3248], "errorMessage": "ERR:IRSD" }, { "pc": [5956], "errorMessage": "ERR:IUPG" }, { "pc": [6962, 6974, 6990], "errorMessage": "ERR:IXFR" }, { "pc": [2295], "errorMessage": "ERR:M3HB" }, { "pc": [2036, 2264, 2380, 2554], "errorMessage": "ERR:MBFF" }, { "pc": [2276, 3594], "errorMessage": "ERR:NAPP" }, { "pc": [2411, 2461], "errorMessage": "ERR:NARC" }, { "pc": [5882, 5927, 5993], "errorMessage": "ERR:NDAO" }, { "pc": [5109], "errorMessage": "ERR:NESC" }, { "pc": [3095], "errorMessage": "ERR:NETM" }, { "pc": [4254], "errorMessage": "ERR:PACL" }, { "pc": [2423, 3959, 5672], "errorMessage": "ERR:PZNC" }, { "pc": [5492], "errorMessage": "ERR:RAPC" }, { "pc": [5692], "errorMessage": "ERR:RNPC" }, { "pc": [2443], "errorMessage": "ERR:RWHC" }, { "pc": [2473, 2589], "errorMessage": "ERR:SHBB" }, { "pc": [6280], "errorMessage": "ERR:TMPT" }, { "pc": [3042], "errorMessage": "ERR:WADR" }, { "pc": [3652], "errorMessage": "ERR:WAFD" }, { "pc": [5135], "errorMessage": "ERR:WESC" }, { "pc": [3986, 5472], "errorMessage": "ERR:WNFD" }, { "pc": [3629], "errorMessage": "ERR:WNNF" }, { "pc": [1746, 5514, 6415, 6470, 6616, 6657], "errorMessage": "IPCT" }, { "pc": [1354], "errorMessage": "NCCA" }, { "pc": [1392, 1480, 1501, 1514, 1525, 1642, 2144, 4382, 4565, 4584, 5196, 5245, 5324, 5544, 5592, 5874, 5919, 5985], "errorMessage": "application exists" }, { "pc": [2059, 4466, 4736, 4755, 4792], "errorMessage": "asset exists" }, { "pc": [2218, 2269, 2385, 2395, 2403, 2416, 2428, 2448, 2453, 2466, 2478, 2488, 2503, 2513, 2561, 2582, 2594, 2603, 2607, 2627, 2637, 2668, 2672, 2721, 2743, 2748, 2809, 2868, 2890, 2895, 2969, 3014, 3027, 3047, 3063, 3068, 3104, 3116, 3188, 3322, 3587, 3601, 3614, 3634, 3657, 3674, 3685, 3695, 3731, 3820, 3851, 3860, 3952, 3964, 3972, 3991, 3996, 4023, 4028, 4097, 4200, 4226, 4239, 4259, 4290, 4298, 4320, 4353, 4376, 4401, 4437, 4455, 4463, 4489, 4537, 4559, 4569, 4581, 4588, 4608, 4612, 4625, 4629, 4648, 4663, 4685, 4689, 4702, 4706, 4726, 4733, 4740, 4752, 4759, 4781, 4785, 4789, 4827, 4831, 4836, 4871, 4875, 4913, 4917, 4922, 4960, 4964, 4997, 5191, 5348, 5352, 5375, 5398, 5418, 5422, 5462, 5477, 5496, 5508, 5529, 5538, 5563, 5586, 5596, 5619, 5652, 5665, 5677, 5713, 5740, 5867, 5912, 5931, 5978, 6108, 6149, 6201, 6214, 6237, 6256, 6261, 6285, 6306, 6352, 6375, 6410, 6430, 6457, 6465, 6487, 6502, 6528, 6533, 6644, 6652, 6674, 6815, 6827, 6840, 6853, 6873, 6982, 7006, 7018, 7031, 7044, 7064, 7085, 7195, 7217, 7229, 7254, 7265, 7278, 7286, 7291, 7298], "errorMessage": "check GlobalState exists" }, { "pc": [6240, 6357], "errorMessage": "index access is out of bounds" }, { "pc": [3813, 6191, 6228, 6342, 7184], "errorMessage": "index out of bounds" }, { "pc": [1222, 1368, 1972, 2022, 3163, 5076, 5230, 5856, 5895], "errorMessage": "invalid array length header" }, { "pc": [1865], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [1980, 5903], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [5086], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [1939, 1966, 2717, 2794, 2864, 2954, 5802], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [1856, 1875, 1884, 1893, 1902, 1911, 1920, 1947, 1956, 2251, 2995, 3581, 3946, 5644, 5971, 6017], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [1229, 3170], "errorMessage": "invalid number of bytes for bytes" }, { "pc": [2027], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::AkitaConfig" }, { "pc": [5861], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [1930], "errorMessage": "invalid number of bytes for smart_contracts/utils/types/mbr.ts::FunderInfo" }, { "pc": [1462, 1620, 6584], "errorMessage": "invalid number of bytes for uint64" }, { "pc": [2018, 5848], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [1998], "errorMessage": "invalid tail pointer at index 1 of (uint64,((len+utf8[]),uint64))" }, { "pc": [1993, 2013, 5843], "errorMessage": "invalid tuple encoding" }, { "pc": [2708, 2855], "errorMessage": "transaction type is appl" }, { "pc": [2844, 2945], "errorMessage": "transaction type is axfer" }, { "pc": [2243, 2697, 2785, 2833, 2935, 6009], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNCAxMDAwMDAgNDA5NiAxODQ0Njc0NDA3MzcwOTU1MTYxNSA2MzY0MTM2MjIzODQ2NzkzMDA1IDE0NDI2OTUwNDA4ODg5NjM0MDcgMTQ0MjY5NTA0MDg4ODk2MzQwOSAzNDkwMCA1MzQwMCA3MjMwMCA0Mjk0OTY3Mjk1IDEzMTEzMzAwCiAgICBieXRlY2Jsb2NrICJiaWRfYXNzZXQiICJha2l0YV9kYW8iICIiICJwcml6ZSIgImVuZF90aW1lc3RhbXAiICJiaWRfaWQiICJiaWRfZmVlIiAweDE1MWY3Yzc1ICJhIiAiaXNfcHJpemVfYm94IiAic2VsbGVyIiAid190b3RhbHMiICJ3ZWlnaHRzX2JveF9jb3VudCIgIndpbm5pbmdfdGlja2V0IiAweDAwMDEgImFraXRhX2VzY3JvdyIgInJhZmZsZV93aW5uZXIiICJ3ZWlnaHRlZF9iaWRfdG90YWwiICJoaWdoZXN0X2JpZCIgInJhZmZsZV9hbW91bnQiICJyZWZ1bmRfbWJyX2N1cnNvciIgInByaXplX2NsYWltZWQiICJFUlI6SVBBWSIgInZyZl9mYWlsdXJlX2NvdW50IiAicmFmZmxlX3ByaXplX2NsYWltZWQiICJ1bmlxdWVfYWRkcmVzc19jb3VudCIgImdhdGVfaWQiICJtYXJrZXRwbGFjZSIgInciICJ3YWxsZXQiICJyZWZ1bmRfY291bnQiICJyYWZmbGVfcm91bmQiICJFUlI6TUJGRiIgImNyZWF0b3Jfcm95YWx0eSIgIm1hcmtldHBsYWNlX3JveWFsdGllcyIgIkVSUjpBTkxWIiAiRVJSOkFITkUiICJiIiAic3RhcnRfdGltZXN0YW1wIiAiZmluZF93aW5uZXJfY3Vyc29ycyIgIm5mdF9mZWVzIiAiRVJSOlBaTkMiICJsIiAweDAwICJFUlI6TkRBTyIgIkVSUjpJWEZSIiAweDA2ODEwMSAib2FsIiAiYWFsIiAic3RhcnRpbmdfYmlkIiAiYmlkX21pbmltdW1faW5jcmVhc2UiICJ2ZXJzaW9uIiAic2FsdCIgIkVSUjpOQVBQIiAiRVJSOk5BUkMiICJFUlI6U0hCQiIgMHhhZGY5MmFlNCAiRVJSOkZHVEUiICJFUlI6SEdURSIgMHgwMDAwICJFUlI6SVJCRCIgIkVSUjpXTkZEIiAicGFsIgogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJueiBtYWluX2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIzIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MQogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAzMCAvLyAicmVmdW5kX2NvdW50IgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxNyAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgaW50Y18wIC8vIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3CiAgICAvLyBoaWdoZXN0QmlkID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlIaWdoZXN0QmlkIH0pCiAgICBieXRlYyAxOCAvLyAiaGlnaGVzdF9iaWQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNSAvLyAiYmlkX2lkIgogICAgaW50Y18xIC8vIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTkgLy8gInJhZmZsZV9hbW91bnQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMKICAgIC8vIHJhZmZsZVByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsgaW5pdGlhbFZhbHVlOiBmYWxzZSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDI0IC8vICJyYWZmbGVfcHJpemVfY2xhaW1lZCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OAogICAgLy8gdW5pcXVlQWRkcmVzc0NvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlVbmlxdWVBZGRyZXNzQ291bnQgfSkKICAgIGJ5dGVjIDI1IC8vICJ1bmlxdWVfYWRkcmVzc19jb3VudCIKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDMxIC8vICJyYWZmbGVfcm91bmQiCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKCm1haW5fYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMy0yOAogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzcyAweDI0ODdjMzJjIDB4MzFmMjZhOWIgMHhlYTkxODBkZCAvLyBtZXRob2QgImRlbGV0ZUFwcGxpY2F0aW9uKCl2b2lkIiwgbWV0aG9kICJjYW5jZWwoKXZvaWQiLCBtZXRob2QgInVwZGF0ZShzdHJpbmcpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIG1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANCBtYWluX2NhbmNlbF9yb3V0ZUA1IG1haW5fdXBkYXRlX3JvdXRlQDYKCm1haW5fc3dpdGNoX2Nhc2VfbmV4dEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMy0yOAogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYnogbWFpbl9jcmVhdGVfTm9PcEAzMAogICAgcHVzaGJ5dGVzcyAweGJkNzE0OGQwIDB4OTgzNmM4OWYgMHg0ZDU4NTY5NyAweGQ5ZjRmMDNhIDB4NzY5NTI5MzEgMHhiOWUzOWM1YyAweDY5NjUwMWRlIDB4YmQxYjI3ZDEgMHhmMmNlMmY0NiAweDlkYWYwNTBhIDB4NjVmY2E5OGIgMHgwNWU1ZGU0ZCAweDhmYTRhMTYwIDB4NjA4MjMwM2MgMHgyMDg5NWUyNiAweGFlODRjYmQ4IDB4MzNlOTJjOTQgMHg4NTRkZWRlMCAweDNlYTExODMyIDB4NzMxMTEwNzAgLy8gbWV0aG9kICJpbml0KHBheSx1aW50NjQpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWQocGF5LGFwcGwsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJiaWQocGF5LGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAiZ2F0ZWRCaWRBc2EocGF5LGF4ZmVyLGFwcGwsYWRkcmVzcyl2b2lkIiwgbWV0aG9kICJiaWRBc2EocGF5LGF4ZmVyLGFkZHJlc3Mpdm9pZCIsIG1ldGhvZCAicmVmdW5kQmlkKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJyYWZmbGUoKXZvaWQiLCBtZXRob2QgImZpbmRXaW5uZXIodWludDY0KXZvaWQiLCBtZXRob2QgInJlZnVuZE1CUih1aW50NjQpdm9pZCIsIG1ldGhvZCAiY2xhaW1Qcml6ZSgpdm9pZCIsIG1ldGhvZCAiY2xhaW1SYWZmbGVQcml6ZSgpdm9pZCIsIG1ldGhvZCAiY2xlYXJXZWlnaHRzQm94ZXModWludDY0KXVpbnQ2NCIsIG1ldGhvZCAiaXNMaXZlKClib29sIiwgbWV0aG9kICJoYXNCaWQoYWRkcmVzcylib29sIiwgbWV0aG9kICJnZXRNaW5pbXVtQmlkQW1vdW50KCl1aW50NjQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPRXNjcm93KChzdHJpbmcsdWludDY0KSl2b2lkIiwgbWV0aG9kICJ1cGRhdGVBa2l0YURBTyh1aW50NjQpdm9pZCIsIG1ldGhvZCAib3BVcCgpdm9pZCIsIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggaW5pdCBnYXRlZEJpZCBiaWQgZ2F0ZWRCaWRBc2EgYmlkQXNhIHJlZnVuZEJpZCByYWZmbGUgZmluZFdpbm5lciByZWZ1bmRNQlIgY2xhaW1Qcml6ZSBjbGFpbVJhZmZsZVByaXplIGNsZWFyV2VpZ2h0c0JveGVzIGlzTGl2ZSBoYXNCaWQgZ2V0TWluaW11bUJpZEFtb3VudCB1cGRhdGVBa2l0YURBT0VzY3JvdyB1cGRhdGVBa2l0YURBTyBtYWluX29wVXBfcm91dGVAMjYgb3B0aW4gbWFpbl9tYnJfcm91dGVAMjgKICAgIGVycgoKbWFpbl9tYnJfcm91dGVAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9iYXNlLnRzOjcKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgcHVzaGJ5dGVzIDB4MTUxZjdjNzUwMDAwMDAwMDAwMDA4ODU0MDAwMDAwMDAwMGM4MTdkNDAwMDAwMDAwMDAwMDQ4NDQwMDAwMDAwMDAwMDA0OWQ0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fb3BVcF9yb3V0ZUAyNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQxCiAgICAvLyBvcFVwKCk6IHZvaWQgeyB9CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgptYWluX2NyZWF0ZV9Ob09wQDMwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMy0yOAogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb24gZXh0ZW5kcyBjbGFzc2VzKAogICAgLy8gICBCYXNlQXVjdGlvbiwKICAgIC8vICAgQWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3QsCiAgICAvLyAgIENvbnRyYWN0V2l0aENyZWF0b3JPbmx5T3B0SW4sCiAgICAvLyAgIENoaWxkQ29udHJhY3QKICAgIC8vICkgewogICAgcHVzaGJ5dGVzIDB4ODJmZmEyY2UgLy8gbWV0aG9kICJjcmVhdGUodWludDY0LGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KSxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyxzdHJpbmcsKHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBjcmVhdGUKICAgIGVycgoKbWFpbl91cGRhdGVfcm91dGVANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIHR4biBPbkNvbXBsZXRpb24KICAgIGludGNfMyAvLyBVcGRhdGVBcHBsaWNhdGlvbgogICAgPT0KICAgIHR4biBBcHBsaWNhdGlvbklECiAgICAmJgogICAgYXNzZXJ0CiAgICBiIHVwZGF0ZQoKbWFpbl9jYW5jZWxfcm91dGVANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjI2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiBjYW5jZWwKCm1haW5fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBwdXNoaW50IDUgLy8gRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgJiYKICAgIGFzc2VydAogICAgYiBkZWxldGVBcHBsaWNhdGlvbgoKCi8vIF9wdXlhX2xpYi51dGlsLmVuc3VyZV9idWRnZXQocmVxdWlyZWRfYnVkZ2V0OiB1aW50NjQsIGZlZV9zb3VyY2U6IHVpbnQ2NCkgLT4gdm9pZDoKZW5zdXJlX2J1ZGdldDoKICAgIHByb3RvIDIgMAogICAgZnJhbWVfZGlnIC0yCiAgICBwdXNoaW50IDEwCiAgICArCgplbnN1cmVfYnVkZ2V0X3doaWxlX3RvcEAxOgogICAgZnJhbWVfZGlnIDAKICAgIGdsb2JhbCBPcGNvZGVCdWRnZXQKICAgID4KICAgIGJ6IGVuc3VyZV9idWRnZXRfYWZ0ZXJfd2hpbGVANgogICAgaXR4bl9iZWdpbgogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIHB1c2hpbnQgNSAvLyBEZWxldGVBcHBsaWNhdGlvbgogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGJ5dGVjIDQ2IC8vIDB4MDY4MTAxCiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbQogICAgYnl0ZWMgNDYgLy8gMHgwNjgxMDEKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW0KICAgIGZyYW1lX2RpZyAtMQogICAgc3dpdGNoIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMEAzIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMUA0CgplbnN1cmVfYnVkZ2V0X3N3aXRjaF9jYXNlX25leHRANToKICAgIGl0eG5fc3VibWl0CiAgICBiIGVuc3VyZV9idWRnZXRfd2hpbGVfdG9wQDEKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMUA0OgogICAgZ2xvYmFsIE1pblR4bkZlZQogICAgaXR4bl9maWVsZCBGZWUKICAgIGIgZW5zdXJlX2J1ZGdldF9zd2l0Y2hfY2FzZV9uZXh0QDUKCmVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfMEAzOgogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBiIGVuc3VyZV9idWRnZXRfc3dpdGNoX2Nhc2VfbmV4dEA1CgplbnN1cmVfYnVkZ2V0X2FmdGVyX3doaWxlQDY6CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjpfX3BjZzMyT3V0cHV0KHN0YXRlOiB1aW50NjQpIC0+IHVpbnQ2NDoKX19wY2czMk91dHB1dDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjkKICAgIC8vIGV4cG9ydCBmdW5jdGlvbiBfX3BjZzMyT3V0cHV0KHN0YXRlOiBQQ0czMlNUQVRFKTogdWludDY0IHsKICAgIHByb3RvIDEgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMAogICAgLy8gY29uc3QgeG9yc2hpZnRlZCA9IF9fbWFza1RvVWludDMyKG9wLnNocihvcC5zaHIoc3RhdGUsIDE4KSBeIHN0YXRlLCAyNykpCiAgICBmcmFtZV9kaWcgLTEKICAgIHB1c2hpbnQgMTgKICAgIHNocgogICAgZnJhbWVfZGlnIC0xCiAgICBeCiAgICBwdXNoaW50IDI3CiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTkKICAgIC8vIHJldHVybiB2YWx1ZSAmIChvcC5zaGwoMSwgMzIpIC0gMSkKICAgIGludGMgMTMgLy8gNDI5NDk2NzI5NQogICAgJgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czozMQogICAgLy8gY29uc3Qgcm90ID0gb3Auc2hyKHN0YXRlLCA1OSkKICAgIGZyYW1lX2RpZyAtMQogICAgcHVzaGludCA1OQogICAgc2hyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjMyCiAgICAvLyByZXR1cm4gb3Auc2hyKHhvcnNoaWZ0ZWQsIHJvdCkgfCBfX21hc2tUb1VpbnQzMihvcC5zaGwoeG9yc2hpZnRlZCwgX191aW50NjRUd29zKHJvdCkgJiAzMSkpCiAgICBkdXAyCiAgICBzaHIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MTQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KH52YWx1ZSwgMSkKICAgIHN3YXAKICAgIH4KICAgIGludGNfMSAvLyAxCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHB1c2hpbnQgMzEKICAgICYKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgc2hsCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE5CiAgICAvLyByZXR1cm4gdmFsdWUgJiAob3Auc2hsKDEsIDMyKSAtIDEpCiAgICBpbnRjIDEzIC8vIDQyOTQ5NjcyOTUKICAgICYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MzIKICAgIC8vIHJldHVybiBvcC5zaHIoeG9yc2hpZnRlZCwgcm90KSB8IF9fbWFza1RvVWludDMyKG9wLnNobCh4b3JzaGlmdGVkLCBfX3VpbnQ2NFR3b3Mocm90KSAmIDMxKSkKICAgIHwKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldElEOiB1aW50NjQpIC0+IGJ5dGVzOgpvcmlnaW5PclR4blNlbmRlcjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTQ5CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gb3JpZ2luT3JUeG5TZW5kZXIod2FsbGV0SUQ6IEFwcGxpY2F0aW9uKTogQWNjb3VudCB7CiAgICBwcm90byAxIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTUwCiAgICAvLyByZXR1cm4gb3JpZ2luT3Iod2FsbGV0SUQsIFR4bi5zZW5kZXIpCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE0MwogICAgLy8gaWYgKHdhbGxldElELmlkID09PSAwKSB7CiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDMKICAgIGZyYW1lX2RpZyAwCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6Om9yaWdpbk9yQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE1MAogICAgLy8gcmV0dXJuIG9yaWdpbk9yKHdhbGxldElELCBUeG4uc2VuZGVyKQogICAgc3dhcAogICAgcmV0c3ViCgpvcmlnaW5PclR4blNlbmRlcl9hZnRlcl9pZl9lbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2NS0xNjgKICAgIC8vIGNvbnN0IFtjb250cm9sbGVkQWNjb3VudEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKAogICAgLy8gICB3YWxsZXRJRCwKICAgIC8vICAgQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzQ29udHJvbGxlZEFkZHJlc3MpCiAgICAvLyApCiAgICBmcmFtZV9kaWcgLTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTY3CiAgICAvLyBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNDb250cm9sbGVkQWRkcmVzcykKICAgIHB1c2hieXRlcyAiY29udHJvbGxlZF9hZGRyZXNzIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjUtMTY4CiAgICAvLyBjb25zdCBbY29udHJvbGxlZEFjY291bnRCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c0NvbnRyb2xsZWRBZGRyZXNzKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNTAKICAgIC8vIHJldHVybiBvcmlnaW5Pcih3YWxsZXRJRCwgVHhuLnNlbmRlcikKICAgIGIgb3JpZ2luT3JUeG5TZW5kZXJfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpvcmlnaW5PckA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiB1aW50NjQsIGFkZHJlc3M6IGJ5dGVzKSAtPiB1aW50NjQ6CmdldFdhbGxldElEVXNpbmdBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgwCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYWRkcmVzczogQWNjb3VudCk6IEFwcGxpY2F0aW9uIHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTIKICAgIGJ5dGVjIDQ3IC8vICJvYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjY0CiAgICAvLyByZXR1cm4gZ2V0T3RoZXJBcHBMaXN0KGFraXRhREFPKS5lc2Nyb3cKICAgIHB1c2hpbnQgMjQKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE4Ni0xODkKICAgIC8vIGNvbnN0IGRhdGEgPSBhYmlDYWxsPHR5cGVvZiBFc2Nyb3dGYWN0b3J5LnByb3RvdHlwZS5nZXQ+KHsKICAgIC8vICAgYXBwSWQ6IGVzY3Jvd0ZhY3RvcnksCiAgICAvLyAgIGFyZ3M6IFthZGRyZXNzXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4M2MxYTZmMzMgLy8gbWV0aG9kICJnZXQoYWRkcmVzcylieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0xCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgZGlnIDEKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA3IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGJ5dGVzCiAgICBleHRyYWN0IDYgMAogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE5MQogICAgLy8gaWYgKEJ5dGVzKGRhdGEpLmxlbmd0aCA9PT0gMCB8fCBCeXRlcyhkYXRhKS5sZW5ndGggIT09IDgpIHsKICAgIGxlbgogICAgZHVwCiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2CiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18yIC8vIDgKICAgICE9CiAgICBieiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9fYWZ0ZXJfaWZfZWxzZUA3CgpnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU9faWZfYm9keUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxOTIKICAgIC8vIHJldHVybiAwCiAgICBpbnRjXzAgLy8gMAoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Z2V0V2FsbGV0SURAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0V2FsbGV0SURVc2luZ0FraXRhREFPX2FmdGVyX2lmX2Vsc2VANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTk1CiAgICAvLyByZXR1cm4gYnRvaShkYXRhKQogICAgZnJhbWVfZGlnIDAKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTgyCiAgICAvLyByZXR1cm4gQXBwbGljYXRpb24oZ2V0V2FsbGV0SUQoZXNjcm93RmFjdG9yeSwgYWRkcmVzcykpCiAgICBiIGdldFdhbGxldElEVXNpbmdBa2l0YURBT19hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OmdldFdhbGxldElEQDgKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpnYXRlQ2hlY2soZ2F0ZVR4bjogdWludDY0LCBha2l0YURBTzogdWludDY0LCBjYWxsZXI6IGJ5dGVzLCBpZDogdWludDY0KSAtPiB1aW50NjQ6CmdhdGVDaGVjazoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMxCiAgICAvLyBleHBvcnQgZnVuY3Rpb24gZ2F0ZUNoZWNrKGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLCBha2l0YURBTzogQXBwbGljYXRpb24sIGNhbGxlcjogQWNjb3VudCwgaWQ6IHVpbnQ2NCk6IGJvb2xlYW4gewogICAgcHJvdG8gNCAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTMKICAgIGJ5dGVjIDQ4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMwogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgcHVzaGludCA0MAogICAgZXh0cmFjdF91aW50NjQKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzQKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjM0CiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGd0eG5zIE9uQ29tcGxldGlvbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM0CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICBibnogZ2F0ZUNoZWNrX2Jvb2xfZmFsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzUKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgZnJhbWVfZGlnIC00CiAgICBndHhucyBOdW1BcHBBcmdzCiAgICBpbnRjXzMgLy8gNAogICAgPT0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MjMzLTIzNQogICAgLy8gZ2F0ZVR4bi5hcHBJZCA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5nYXRlKSAmJgogICAgLy8gZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMCAvLyAwCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGJ5dGVzIDB4NDM5MjI2NTUgLy8gbWV0aG9kICJtdXN0Q2hlY2soYWRkcmVzcyx1aW50NjQsYnl0ZVtdW10pdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzYKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzNwogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBmcmFtZV9kaWcgLTQKICAgIGludGNfMSAvLyAxCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgZnJhbWVfZGlnIC0yCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzMtMjM3CiAgICAvLyBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyBnYXRlVHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wICYmCiAgICAvLyBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDEpID09PSBuZXcgQWRkcmVzcyhjYWxsZXIpLmJ5dGVzICYmCiAgICBieiBnYXRlQ2hlY2tfYm9vbF9mYWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzOAogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgZnJhbWVfZGlnIC00CiAgICBwdXNoaW50IDIKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0b2IKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMy0yMzgKICAgIC8vIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vIGdhdGVUeG4ubnVtQXBwQXJncyA9PT0gNCAmJgogICAgLy8gZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vIGdhdGVUeG4uYXBwQXJncygyKSA9PT0gaXRvYihpZCkKICAgIGJ6IGdhdGVDaGVja19ib29sX2ZhbHNlQDcKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjIzMi0yMzkKICAgIC8vIHJldHVybiAoCiAgICAvLyAgIGdhdGVUeG4uYXBwSWQgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykuZ2F0ZSkgJiYKICAgIC8vICAgZ2F0ZVR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcCAmJgogICAgLy8gICBnYXRlVHhuLm51bUFwcEFyZ3MgPT09IDQgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcjx0eXBlb2YgR2F0ZS5wcm90b3R5cGUubXVzdENoZWNrPigpICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygxKSA9PT0gbmV3IEFkZHJlc3MoY2FsbGVyKS5ieXRlcyAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMikgPT09IGl0b2IoaWQpCiAgICAvLyApCiAgICByZXRzdWIKCmdhdGVDaGVja19ib29sX2ZhbHNlQDc6CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoyMzItMjM5CiAgICAvLyByZXR1cm4gKAogICAgLy8gICBnYXRlVHhuLmFwcElkID09PSBBcHBsaWNhdGlvbihnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLmdhdGUpICYmCiAgICAvLyAgIGdhdGVUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AgJiYKICAgIC8vICAgZ2F0ZVR4bi5udW1BcHBBcmdzID09PSA0ICYmCiAgICAvLyAgIGdhdGVUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIEdhdGUucHJvdG90eXBlLm11c3RDaGVjaz4oKSAmJgogICAgLy8gICBnYXRlVHhuLmFwcEFyZ3MoMSkgPT09IG5ldyBBZGRyZXNzKGNhbGxlcikuYnl0ZXMgJiYKICAgIC8vICAgZ2F0ZVR4bi5hcHBBcmdzKDIpID09PSBpdG9iKGlkKQogICAgLy8gKQogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6Y3JlYXRlSW5zdGFudERpc2J1cnNlbWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogYnl0ZXMsIHN1bTogdWludDY0LCBjbG9zZU91dDogdWludDY0KSAtPiBieXRlcywgYnl0ZXM6CmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCB0aW1lVG9VbmxvY2s6IHVpbnQ2NCwgZXhwaXJhdGlvbjogdWludDY0LCBhbGxvY2F0aW9uczogVXNlckFsbG9jYXRpb25bXSwgc3VtOiB1aW50NjQsIGNsb3NlT3V0OiBib29sZWFuKTogeyBpZDogdWludDY0LCBjb3N0OiB1aW50NjQgfSB7CiAgICBwcm90byA3IDIKICAgIGludGNfMCAvLyAwCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxOQogICAgLy8gYXNzZXJ0KGFzc2V0ICE9PSAwIHx8IGNsb3NlT3V0ID09PSBmYWxzZSwgRVJSX0NBTk5PVF9DTE9TRV9PVVRfT0ZfQUxHT19GT1JCSURERU4pCiAgICBmcmFtZV9kaWcgLTYKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfdHJ1ZUAyCiAgICBmcmFtZV9kaWcgLTEKICAgIGJueiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9ib29sX3RydWVAMjoKICAgIGludGNfMSAvLyAxCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfbWVyZ2VANDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTE5CiAgICAvLyBhc3NlcnQoYXNzZXQgIT09IDAgfHwgY2xvc2VPdXQgPT09IGZhbHNlLCBFUlJfQ0FOTk9UX0NMT1NFX09VVF9PRl9BTEdPX0ZPUkJJRERFTikKICAgIGFzc2VydCAvLyBOQ0NBCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhQXBwTGlzdCkpCiAgICBmcmFtZV9kaWcgLTcKICAgIGJ5dGVjIDQ4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTIzCiAgICAvLyBsZXQgY29zdDogdWludDY0ID0gTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIGZyYW1lX2RpZyAtMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjUzMDAKICAgICoKICAgIHB1c2hpbnQgNDE3MDAKICAgICsKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjQKICAgIC8vIGlmIChhc3NldCA9PT0gMCkgewogICAgZnJhbWVfZGlnIC02CiAgICBibnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9lbHNlX2JvZHlAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjUtNTM2CiAgICAvLyBpZCA9IGFiaUNhbGw8dHlwZW9mIFJld2FyZHMucHJvdG90eXBlLmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQ+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgdGltZVRvVW5sb2NrLAogICAgLy8gICAgIGV4cGlyYXRpb24sCiAgICAvLyAgICAgYWxsb2NhdGlvbnMKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI5CiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTMwCiAgICAvLyBhbW91bnQ6IE1pbkRpc2J1cnNlbWVudHNNQlIgKyAoVXNlckFsbG9jYXRpb25NQlIgKiBhbGxvY2F0aW9ucy5sZW5ndGgpICsgc3VtCiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MjgtNTMxCiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUyNS01MzYKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkgKyBzdW0KICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMgogICAgLy8gdGltZVRvVW5sb2NrLAogICAgZnJhbWVfZGlnIC01CiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzMwogICAgLy8gZXhwaXJhdGlvbiwKICAgIGZyYW1lX2RpZyAtNAogICAgaXRvYgogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTI1LTUzNgogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKSArIHN1bQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHg3YjdkYzVmYyAvLyBtZXRob2QgImNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQocGF5LHVpbnQ2NCx1aW50NjQsKGFkZHJlc3MsdWludDY0KVtdKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGZyYW1lX2RpZyAtMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIHN3YXAKICAgIGV4dHJhY3QgMCA0CiAgICBieXRlYyA3IC8vIDB4MTUxZjdjNzUKICAgID09CiAgICBhc3NlcnQgLy8gQnl0ZXMgaGFzIHZhbGlkIHByZWZpeAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciB1aW50NjQKICAgIGJ0b2kKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTc3CiAgICAvLyByZXR1cm4geyBpZCwgY29zdCB9CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMQogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTMKICAgIGZyYW1lX2J1cnkgMQogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfZWxzZV9ib2R5QDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOAogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBmcmFtZV9kaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZnJhbWVfZGlnIC02CiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDkKICAgIGZyYW1lX2RpZyAxCiAgICBmcmFtZV9idXJ5IDIKCmNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTUzCiAgICAvLyBhc3NldFJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIHN3YXAKICAgIGZyYW1lX2J1cnkgMAogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NTIKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTU4CiAgICAvLyBpZiAoY2xvc2VPdXQpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDE0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1OQogICAgLy8gdHJhbnNmZXJUeG4uc2V0KHsgYXNzZXRDbG9zZVRvOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzIH0pCiAgICBmcmFtZV9kaWcgMwogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgNAogICAgZnJhbWVfYnVyeSA1CgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2Mi01NzQKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjYKICAgIC8vIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgZnJhbWVfZGlnIDMKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGZyYW1lX2RpZyAxCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NjUtNTY4CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2OQogICAgLy8gdHJhbnNmZXJUeG4sCiAgICBpdHhuX25leHQKICAgIGZyYW1lX2RpZyA0CiAgICBieiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X25leHRfZmllbGRAMTcKICAgIGZyYW1lX2RpZyA1CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9uZXh0X2ZpZWxkQDE3OgogICAgZnJhbWVfZGlnIC02CiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZnJhbWVfZGlnIC0yCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBmcmFtZV9kaWcgMAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU1Mi01NTYKICAgIC8vIGNvbnN0IHRyYW5zZmVyVHhuID0gaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgYXNzZXRSZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IHN1bSwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTYyLTU3NAogICAgLy8gaWQgPSBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5jcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50Pih7CiAgICAvLyAgIGFwcElkOiByZXdhcmRzQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBNaW5EaXNidXJzZW1lbnRzTUJSICsgKFVzZXJBbGxvY2F0aW9uTUJSICogYWxsb2NhdGlvbnMubGVuZ3RoKQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHRyYW5zZmVyVHhuLAogICAgLy8gICAgIHRpbWVUb1VubG9jaywKICAgIC8vICAgICBleHBpcmF0aW9uLAogICAgLy8gICAgIGFsbG9jYXRpb25zCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX25leHQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTcwCiAgICAvLyB0aW1lVG9VbmxvY2ssCiAgICBmcmFtZV9kaWcgLTUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTcxCiAgICAvLyBleHBpcmF0aW9uLAogICAgZnJhbWVfZGlnIC00CiAgICBpdG9iCiAgICBmcmFtZV9kaWcgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU2Mi01NzQKICAgIC8vIGlkID0gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUuY3JlYXRlSW5zdGFudEFzYURpc2J1cnNlbWVudD4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogTWluRGlzYnVyc2VtZW50c01CUiArIChVc2VyQWxsb2NhdGlvbk1CUiAqIGFsbG9jYXRpb25zLmxlbmd0aCkKICAgIC8vICAgICB9KSwKICAgIC8vICAgICB0cmFuc2ZlclR4biwKICAgIC8vICAgICB0aW1lVG9VbmxvY2ssCiAgICAvLyAgICAgZXhwaXJhdGlvbiwKICAgIC8vICAgICBhbGxvY2F0aW9ucwogICAgLy8gICBdCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4YWYxYTE0ZjIgLy8gbWV0aG9kICJjcmVhdGVJbnN0YW50QXNhRGlzYnVyc2VtZW50KHBheSxheGZlcix1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NClbXSl1aW50NjQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBzd2FwCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgdWludDY0CiAgICBidG9pCiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfYnVyeSAxCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYWZ0ZXJfaWZfZWxzZUAyMAoKY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9pZl9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUzOQogICAgLy8gY29zdCArPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGZyYW1lX2RpZyAxCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICsKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAtNTQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NAogICAgLy8gcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICBmcmFtZV9kaWcgMwogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NQogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQzLTU0NgogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQwLTU0OQogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUmV3YXJkcy5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJld2FyZHNBcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKHJld2FyZHNBcHApLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIEFzc2V0KGFzc2V0KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0NwogICAgLy8gQXNzZXQoYXNzZXQpCiAgICBmcmFtZV9kaWcgLTYKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NDAtNTQ5CiAgICAvLyBhYmlDYWxsPHR5cGVvZiBSZXdhcmRzLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV3YXJkc0FwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24ocmV3YXJkc0FwcCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgQXNzZXQoYXNzZXQpCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBwdXNoYnl0ZXMgMHgzOTRlYWViMiAvLyBtZXRob2QgIm9wdEluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudF9hZnRlcl9pZl9lbHNlQDEyCgpjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50X2Jvb2xfZmFsc2VAMzoKICAgIGludGNfMCAvLyAwCiAgICBiIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnRfYm9vbF9tZXJnZUA0CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6c2VuZFJlZmVycmFsUGF5bWVudChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCkgLT4gYnl0ZXM6CnNlbmRSZWZlcnJhbFBheW1lbnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU5MQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNlbmRSZWZlcnJhbFBheW1lbnQoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0LCBhbW91bnQ6IHVpbnQ2NCk6IFJlZmVycmFsUGF5bWVudEluZm8gewogICAgcHJvdG8gMyAxCiAgICBpbnRjXzAgLy8gMAogICAgYnl0ZWNfMiAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTIKICAgIC8vIGNvbnN0IHdhbGxldCA9IGdldFdhbGxldElEVXNpbmdBa2l0YURBTyhha2l0YURBTywgVHhuLnNlbmRlcikKICAgIGZyYW1lX2RpZyAtMwogICAgdHhuIFNlbmRlcgogICAgY2FsbHN1YiBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8KICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNjEKICAgIC8vIHJldHVybiByZWZlcnJlck9yKHdhbGxldElELCBHbG9iYWwuemVyb0FkZHJlc3MpCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTU0CiAgICAvLyBpZiAod2FsbGV0SUQuaWQgPT09IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAzCiAgICBmcmFtZV9idXJ5IDAKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpyZWZlcnJlck9yQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OTYKICAgIC8vIGlmIChhbW91bnQgPiAwICYmIHJlZmVycmVyICE9PSBHbG9iYWwuemVyb0FkZHJlc3MpIHsKICAgIGZyYW1lX2RpZyAtMQogICAgYnogc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDYKICAgIGZyYW1lX2RpZyAwCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgICE9CiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2OAogICAgLy8gY29uc3QgW3dhbGxldEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXRGZWVzKSkKICAgIGZyYW1lX2RpZyAtMwogICAgcHVzaGJ5dGVzICJ3YWxsZXRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTk4CiAgICAvLyBjb25zdCB7IHJlZmVycmVyUGVyY2VudGFnZSB9ID0gZ2V0V2FsbGV0RmVlcyhha2l0YURBTykKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwMQogICAgLy8gaWYgKHJlZmVycmFsRmVlID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgZnJhbWVfZGlnIC0xCiAgICBieiBzZW5kUmVmZXJyYWxQYXltZW50X2FmdGVyX2lmX2Vsc2VANQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDIKICAgIC8vIHJlZmVycmFsRmVlID0gMQogICAgaW50Y18xIC8vIDEKICAgIGZyYW1lX2J1cnkgMQoKc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwOAogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjA5CiAgICAvLyAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCArIE9ORV9XRUVLKSwKICAgIGR1cAogICAgcHVzaGludCA2MDQ4MDAKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjEwCiAgICAvLyBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIGZyYW1lX2RpZyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ5dGVjIDE0IC8vIDB4MDAwMQogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYwNS02MTMKICAgIC8vIGNvbnN0IHsgY29zdDogcmVmZXJyYWxNYnIgfSA9IGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIGFraXRhREFPLAogICAgLy8gICBhc3NldCwKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCwKICAgIC8vICAgKEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgKyBPTkVfV0VFSyksCiAgICAvLyAgIFt7IGFkZHJlc3M6IHJlZmVycmVyLCBhbW91bnQ6IHJlZmVycmFsRmVlIH1dLAogICAgLy8gICByZWZlcnJhbEZlZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGZyYW1lX2RpZyAtMwogICAgZnJhbWVfZGlnIC0yCiAgICB1bmNvdmVyIDUKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBkaWcgNQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTIKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MDUtNjEzCiAgICAvLyBjb25zdCB7IGNvc3Q6IHJlZmVycmFsTWJyIH0gPSBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICBha2l0YURBTywKICAgIC8vICAgYXNzZXQsCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAsCiAgICAvLyAgIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wICsgT05FX1dFRUspLAogICAgLy8gICBbeyBhZGRyZXNzOiByZWZlcnJlciwgYW1vdW50OiByZWZlcnJhbEZlZSB9XSwKICAgIC8vICAgcmVmZXJyYWxGZWUsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICBjYWxsc3ViIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQKICAgIHBvcAogICAgZXh0cmFjdCA4IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjE1CiAgICAvLyByZXR1cm4geyBsZWZ0b3ZlcjogKGFtb3VudCAtIHJlZmVycmFsRmVlKSwgcmVmZXJyYWxNYnIgfQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDIKICAgIC0KICAgIGl0b2IKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MTgKICAgIC8vIHJldHVybiB7IGxlZnRvdmVyOiBhbW91bnQsIHJlZmVycmFsTWJyOiAwIH0KICAgIGZyYW1lX2RpZyAtMQogICAgaXRvYgogICAgaW50Y18wIC8vIDAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZnJhbWVfYnVyeSAwCiAgICByZXRzdWIKCnNlbmRSZWZlcnJhbFBheW1lbnRfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTczLTE3NgogICAgLy8gY29uc3QgW3JlZmVycmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoCiAgICAvLyAgIHdhbGxldElELAogICAgLy8gICBCeXRlcyhBYnN0cmFjdEFjY291bnRHbG9iYWxTdGF0ZUtleXNSZWZlcnJlcikKICAgIC8vICkKICAgIGZyYW1lX2RpZyAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE3NQogICAgLy8gQnl0ZXMoQWJzdHJhY3RBY2NvdW50R2xvYmFsU3RhdGVLZXlzUmVmZXJyZXIpCiAgICBwdXNoYnl0ZXMgInJlZmVycmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxNzMtMTc2CiAgICAvLyBjb25zdCBbcmVmZXJyZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcygKICAgIC8vICAgd2FsbGV0SUQsCiAgICAvLyAgIEJ5dGVzKEFic3RyYWN0QWNjb3VudEdsb2JhbFN0YXRlS2V5c1JlZmVycmVyKQogICAgLy8gKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjE2MQogICAgLy8gcmV0dXJuIHJlZmVycmVyT3Iod2FsbGV0SUQsIEdsb2JhbC56ZXJvQWRkcmVzcykKICAgIGIgc2VuZFJlZmVycmFsUGF5bWVudF9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6OnJlZmVycmVyT3JAMTIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNyZWF0ZVtyb3V0aW5nXSgpIC0+IHZvaWQ6CmNyZWF0ZToKICAgIGJ5dGVjXzIgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTE0CiAgICAvLyBAYWJpbWV0aG9kKHsgb25DcmVhdGU6ICdyZXF1aXJlJyB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMSAvLyAxCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmJvb2wKICAgIGludGNfMCAvLyAwCiAgICBnZXRiaXQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDgKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDkKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDQwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbWJyLnRzOjpGdW5kZXJJbmZvCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMwogICAgZHVwCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTQKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTUKICAgIGR1cG4gMgogICAgbGVuCiAgICBkaWcgMQogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIHR1cGxlIGVuY29kaW5nCiAgICBkdXAKICAgIHB1c2hpbnQgMTAKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCB0YWlsIHBvaW50ZXIgYXQgaW5kZXggMSBvZiAodWludDY0LCgobGVuK3V0ZjhbXSksdWludDY0KSkKICAgIHVuY292ZXIgMgogICAgc3dhcAogICAgZGlnIDIKICAgIHN1YnN0cmluZzMKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgc3dhcAogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMjIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpBa2l0YUNvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzIKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCAhPT0gMCwgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICBibnogY3JlYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMiAvLyAiRVJSOk1CRkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJGRgoKY3JlYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzNAogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSA9IHByaXplCiAgICBkaWcgMTYKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDkgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM1CiAgICAvLyB0aGlzLmlzUHJpemVCb3gudmFsdWUgPSBpc1ByaXplQm94CiAgICBkaWcgMTUKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyMSAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM2CiAgICAvLyB0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSA9IGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTM4CiAgICAvLyBpZiAoYmlkQXNzZXQgIT09IDApIHsKICAgIGRpZyAxMwogICAgYnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MzkKICAgIC8vIGxvZ2dlZEFzc2VydChBc3NldChiaWRBc3NldCkudG90YWwgPiAwLCBFUlJfSU5WQUxJRF9BU1NFVCkKICAgIGRpZyAxMwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldFRvdGFsCiAgICBhc3NlcnQgLy8gYXNzZXQgZXhpc3RzCiAgICBibnogY3JlYXRlX2FmdGVyX2lmX2Vsc2VANwogICAgcHVzaGJ5dGVzICJFUlI6SUFTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVNUCgpjcmVhdGVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0MQogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZSA9IEFzc2V0KGJpZEFzc2V0KQogICAgZGlnIDE0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA2IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDIKICAgIC8vIHRoaXMuYmlkRmVlLnZhbHVlID0gYmlkRmVlCiAgICBkaWcgMTMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzCiAgICAvLyBzdGFydGluZ0JpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVN0YXJ0aW5nQmlkIH0pCiAgICBieXRlYyA0OSAvLyAic3RhcnRpbmdfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDMKICAgIC8vIHRoaXMuc3RhcnRpbmdCaWQudmFsdWUgPSBzdGFydGluZ0JpZAogICAgZGlnIDEyCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NQogICAgLy8gYmlkTWluaW11bUluY3JlYXNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkTWluaW11bUluY3JlYXNlIH0pCiAgICBieXRlYyA1MCAvLyAiYmlkX21pbmltdW1faW5jcmVhc2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0NAogICAgLy8gdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUgPSBiaWRNaW5pbXVtSW5jcmVhc2UKICAgIGRpZyAxMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDcKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM4IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0NQogICAgLy8gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSA9IHN0YXJ0VGltZXN0YW1wCiAgICBkaWcgMTAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDQgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0NgogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgPSBlbmRUaW1lc3RhbXAKICAgIGRpZyA5CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2NoaWxkLnRzOjExCiAgICAvLyBmdW5kZXIgPSBHbG9iYWxTdGF0ZTxGdW5kZXJJbmZvPih7IGtleTogR2xvYmFsU3RhdGVLZXlGdW5kZXIgfSkKICAgIHB1c2hieXRlcyAiZnVuZGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDcKICAgIC8vIHRoaXMuZnVuZGVyLnZhbHVlID0gY2xvbmUoZnVuZGVyKQogICAgZGlnIDgKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NDgKICAgIC8vIHRoaXMuc2VsbGVyLnZhbHVlID0gc2VsbGVyCiAgICBkaWcgNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDMzIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU0OQogICAgLy8gdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSA9IGNyZWF0b3JSb3lhbHR5CiAgICBkaWcgNgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1MAogICAgLy8gdGhpcy5nYXRlSUQudmFsdWUgPSBnYXRlSUQKICAgIGRpZyA1CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MwogICAgLy8gbWFya2V0cGxhY2UgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2UgfSkKICAgIGJ5dGVjIDI3IC8vICJtYXJrZXRwbGFjZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTUxCiAgICAvLyB0aGlzLm1hcmtldHBsYWNlLnZhbHVlID0gbWFya2V0cGxhY2UKICAgIGRpZyA0CiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NTQKICAgIC8vIGxvZ2dlZEFzc2VydChha2l0YUNvbmZpZy5ha2l0YURBTy5hZGRyZXNzICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9JTlZBTElEX0FQUCkKICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSAxOAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICAhPQogICAgYm56IGNyZWF0ZV9hZnRlcl9hc3NlcnRAOQogICAgcHVzaGJ5dGVzICJFUlI6SUFQUCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQVBQCgpjcmVhdGVfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTU1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFDb25maWcuYWtpdGFEQU8KICAgIGRpZyAxNwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1NgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhQ29uZmlnLmFraXRhREFPRXNjcm93KQogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTEgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU1OAogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gdmVyc2lvbgogICAgZGlnIDMKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2MQogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWUgPSBuZXcgU3RhdGljQXJyYXk8VWludDY0LCAxNT4oKQogICAgcHVzaGludCAxMjAKICAgIGJ6ZXJvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjEKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlID0gbmV3IFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+KCkKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4CiAgICAvLyBmaW5kV2lubmVyQ3Vyc29ycyA9IEdsb2JhbFN0YXRlPEZpbmRXaW5uZXJDdXJzb3JzPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RmluZFdpbm5lckN1cnNvcnMgfSkKICAgIGJ5dGVjIDM5IC8vICJmaW5kX3dpbm5lcl9jdXJzb3JzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjIKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUgPSB7IHN0YXJ0aW5nSW5kZXg6IDAsIGN1cnJlbnRSYW5nZVN0YXJ0OiAxIH0KICAgIHB1c2hieXRlcyAweDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE2IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjMKICAgIC8vIHRoaXMucmFmZmxlV2lubmVyLnZhbHVlID0gR2xvYmFsLnplcm9BZGRyZXNzCiAgICBnbG9iYWwgWmVyb0FkZHJlc3MKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gc2FsdCA9IEdsb2JhbFN0YXRlPGJ5dGVzPDMyPj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDUyIC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjQKICAgIC8vIHRoaXMuc2FsdC52YWx1ZSA9IFR4bi50eElkCiAgICB0eG4gVHhJRAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTY1CiAgICAvLyB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKS5hdWN0aW9uQ29tcG9zYWJsZVBlcmNlbnRhZ2UKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgNDAgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjUKICAgIC8vIHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpLmF1Y3Rpb25Db21wb3NhYmxlUGVyY2VudGFnZQogICAgcHVzaGludCA3MgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjUKICAgIC8vIG1hcmtldHBsYWNlUm95YWx0aWVzID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5TWFya2V0cGxhY2VSb3lhbHRpZXMgfSkKICAgIGJ5dGVjIDM0IC8vICJtYXJrZXRwbGFjZV9yb3lhbHRpZXMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU2NQogICAgLy8gdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkuYXVjdGlvbkNvbXBvc2FibGVQZXJjZW50YWdlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MTQKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pbml0W3JvdXRpbmddKCkgLT4gdm9pZDoKaW5pdDoKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzIgLy8gIkVSUjpNQkZGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1CRkYKCmluaXRfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgRVJSX05PVF9BUFBMSUNBQkxFX1RPX1RISVNfQVVDVElPTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDYgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID4gMCwgRVJSX05PVF9BUFBMSUNBQkxFX1RPX1RISVNfQVVDVElPTikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNTMgLy8gIkVSUjpOQVBQIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BUFAKCmluaXRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3MQogICAgLy8gbG9nZ2VkQXNzZXJ0KHdlaWdodExpc3RMZW5ndGggPj0gMywgRVJSX01VU1RfQUxMT0NBVEVfQVRfTEVBU1RfVEhSRUVfSElHSEVTVF9CSURTX0NIVU5LUykKICAgIGR1cAogICAgcHVzaGludCAzCiAgICA+PQogICAgYm56IGluaXRfYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOk0zSEIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TTNIQgoKaW5pdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc0CiAgICAvLyBjb25zdCB3ZWlnaHRzTUJSOiB1aW50NjQgPSB3ZWlnaHRMaXN0TGVuZ3RoICogdGhpcy5tYnIoKS53ZWlnaHRzCiAgICBkdXAKICAgIGludGMgMTQgLy8gMTMxMTMzMDAKICAgICoKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzYKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LnJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMjIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmluaXRfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU3NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB3ZWlnaHRzTUJSLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZGlnIDEKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDMKICAgID09CiAgICBibnogaW5pdF9hZnRlcl9hc3NlcnRAMTEKICAgIGJ5dGVjIDIyIC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgppbml0X2FmdGVyX2Fzc2VydEAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA0Cgppbml0X3doaWxlX3RvcEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTc5CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgd2VpZ2h0TGlzdExlbmd0aDsgaSArPSAxKSB7CiAgICBkaWcgMwogICAgZGlnIDEKICAgIDwKICAgIGJ6IGluaXRfYWZ0ZXJfd2hpbGVAMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIGRpZyAzCiAgICBkdXAKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTgwCiAgICAvLyB0aGlzLndlaWdodHMoaSkuY3JlYXRlKCkKICAgIHB1c2hpbnQgMzI3NjgKICAgIGJveF9jcmVhdGUKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NzkKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB3ZWlnaHRMaXN0TGVuZ3RoOyBpICs9IDEpIHsKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDQKICAgIGIgaW5pdF93aGlsZV90b3BAMTIKCmluaXRfYWZ0ZXJfd2hpbGVAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTgyCiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9IHdlaWdodExpc3RMZW5ndGgKICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1NjgKICAgIC8vIGluaXQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCB3ZWlnaHRMaXN0TGVuZ3RoOiB1aW50NjQpIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmRlbGV0ZUFwcGxpY2F0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKZGVsZXRlQXBwbGljYXRpb246CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywgRVJSX01VU1RfQkVfQ0FMTEVEX0ZST01fRkFDVE9SWSkKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzIgLy8gIkVSUjpNQkZGIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk1CRkYKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1ODkKICAgIC8vIGNvbnN0IGV4cGVjdGVkUmVmdW5kQ291bnQ6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgPiAxID8gdGhpcy5iaWRJRC52YWx1ZSAtIDIgOiAwCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gY29uc3QgZXhwZWN0ZWRSZWZ1bmRDb3VudDogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSA+IDEgPyB0aGlzLmJpZElELnZhbHVlIC0gMiA6IDAKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogZGVsZXRlQXBwbGljYXRpb25fdGVybmFyeV9mYWxzZUA1CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gY29uc3QgZXhwZWN0ZWRSZWZ1bmRDb3VudDogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSA+IDEgPyB0aGlzLmJpZElELnZhbHVlIC0gMiA6IDAKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIC0KCmRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfbWVyZ2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTkwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5yZWZ1bmRDb3VudC52YWx1ZSA9PT0gZXhwZWN0ZWRSZWZ1bmRDb3VudCwgRVJSX05PVF9BTExfUkVGVU5EU19DT01QTEVURSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxCiAgICAvLyByZWZ1bmRDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kQ291bnQgfSkKICAgIGJ5dGVjIDMwIC8vICJyZWZ1bmRfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmVmdW5kQ291bnQudmFsdWUgPT09IGV4cGVjdGVkUmVmdW5kQ291bnQsIEVSUl9OT1RfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPT0KICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgNTQgLy8gIkVSUjpOQVJDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BUkMKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2Fzc2VydEA4OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIxIC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTEKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTAKICAgIGJ5dGVjIDQxIC8vICJFUlI6UFpOQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQWk5DCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUkFGRkxFX1dJTk5FUl9IQVNfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MwogICAgLy8gcmFmZmxlUHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBpbml0aWFsVmFsdWU6IGZhbHNlLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjQgLy8gInJhZmZsZV9wcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTIKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9XSU5ORVJfSEFTX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTIKICAgIHB1c2hieXRlcyAiRVJSOlJXSEMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6UldIQwoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTMKICAgIC8vIGNvbnN0IHJlZnVuZHNDb21wbGV0ZSA9IHRoaXMuYmlkSUQudmFsdWUgPT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gY29uc3QgcmVmdW5kc0NvbXBsZXRlID0gdGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5MwogICAgLy8gY29uc3QgcmVmdW5kc0NvbXBsZXRlID0gdGhpcy5iaWRJRC52YWx1ZSA9PT0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTQKICAgIC8vIGxvZ2dlZEFzc2VydChyZWZ1bmRzQ29tcGxldGUsIEVSUl9OT1RfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBibnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDE0CiAgICBieXRlYyA1NCAvLyAiRVJSOk5BUkMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkFSQwoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfYXNzZXJ0QDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSA9PT0gMCwgRVJSX1NUSUxMX0hBU19ISUdIRVNUX0JJRFNfQk9YRVMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX0hJR0hFU1RfQklEU19CT1hFUykKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTYKICAgIGJ5dGVjIDU1IC8vICJFUlI6U0hCQiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpTSEJCCgpkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9hc3NlcnRAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5NwogICAgLy8gaWYgKCF0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDkgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTk3CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBkZWxldGVBcHBsaWNhdGlvbl9hZnRlcl9pZl9lbHNlQDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5OC02MDMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwMAogICAgLy8gYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjAxCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYwMQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1OTgtNjAyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU5OC02MDMKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAxOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA2CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCAhPT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDYKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZGVsZXRlQXBwbGljYXRpb25fYWZ0ZXJfaWZfZWxzZUAyMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDctNjEyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDkKICAgIC8vIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxMAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjA3LTYxMQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MDctNjEyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmRlbGV0ZUFwcGxpY2F0aW9uX2FmdGVyX2lmX2Vsc2VAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxNS02MTkKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYxNwogICAgLy8gY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBpdHhuX2ZpZWxkIENsb3NlUmVtYWluZGVyVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjE1LTYxOAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MTUtNjE5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTg1CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiAnRGVsZXRlQXBwbGljYXRpb24nIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpkZWxldGVBcHBsaWNhdGlvbl90ZXJuYXJ5X2ZhbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjU4OQogICAgLy8gY29uc3QgZXhwZWN0ZWRSZWZ1bmRDb3VudDogdWludDY0ID0gdGhpcy5iaWRJRC52YWx1ZSA+IDEgPyB0aGlzLmJpZElELnZhbHVlIC0gMiA6IDAKICAgIGludGNfMCAvLyAwCiAgICBiIGRlbGV0ZUFwcGxpY2F0aW9uX3Rlcm5hcnlfbWVyZ2VANgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY2FuY2VsW3JvdXRpbmddKCkgLT4gdm9pZDoKY2FuY2VsOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSBHbG9iYWwuY3JlYXRvckFkZHJlc3MsIEVSUl9NVVNUX0JFX0NBTExFRF9GUk9NX0ZBQ1RPUlkpCiAgICB0eG4gU2VuZGVyCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgID09CiAgICBibnogY2FuY2VsX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzMiAvLyAiRVJSOk1CRkYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TUJGRgoKY2FuY2VsX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MjkKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDwgdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fQUxSRUFEWV9TVEFSVEVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDcKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM4IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyOQogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPCB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9BTFJFQURZX1NUQVJURUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPAogICAgYm56IGNhbmNlbF9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6QUFTVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBQVNUCgpjYW5jZWxfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlID09PSAwLCBFUlJfU1RJTExfSEFTX0hJR0hFU1RfQklEU19CT1hFUykKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMwCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgPT09IDAsIEVSUl9TVElMTF9IQVNfSElHSEVTVF9CSURTX0JPWEVTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNhbmNlbF9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgNTUgLy8gIkVSUjpTSEJCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlNIQkIKCmNhbmNlbF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMyCiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMgogICAgLy8gaWYgKHRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNhbmNlbF9lbHNlX2JvZHlAMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMzLTYzNgogICAgLy8gYWJpQ2FsbDx0eXBlb2YgUHJpemVCb3gucHJvdG90eXBlLnRyYW5zZmVyPih7CiAgICAvLyAgIGFwcElkOiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjM1CiAgICAvLyBhcmdzOiBbdGhpcy5zZWxsZXIudmFsdWVdLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEwIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNQogICAgLy8gYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzNAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzMy02MzYKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW3RoaXMuc2VsbGVyLnZhbHVlXSwKICAgIC8vIH0pCiAgICBieXRlYyA1NiAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDYKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkICE9PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0NgogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgIT09IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjYW5jZWxfYWZ0ZXJfaWZfZWxzZUAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDctNjUyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDkKICAgIC8vIGFzc2V0Q2xvc2VUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1MAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQ3LTY1MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDctNjUyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNhbmNlbF9hZnRlcl9pZl9lbHNlQDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTUtNjU5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICBjbG9zZVJlbWFpbmRlclRvOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NTcKICAgIC8vIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1NS02NTgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIGNsb3NlUmVtYWluZGVyVG86IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjU1LTY1OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgY2xvc2VSZW1haW5kZXJUbzogR2xvYmFsLmNyZWF0b3JBZGRyZXNzLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYyNgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogJ0RlbGV0ZUFwcGxpY2F0aW9uJyB9KQogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2FuY2VsX2Vsc2VfYm9keUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjM4LTY0MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NDAKICAgIC8vIGFzc2V0Q2xvc2VUbzogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTAgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQwCiAgICAvLyBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjQxCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY0MQogICAgLy8geGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0Q2xvc2VUbwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2MzgtNjQyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldENsb3NlVG86IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjM4LTY0MwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2FuY2VsX2FmdGVyX2lmX2Vsc2VAMTIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdhdGVkQmlkW3JvdXRpbmddKCkgLT4gdm9pZDoKZ2F0ZWRCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2NC02NjgKICAgIC8vIGdhdGVkQmlkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY5CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjY5CiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzAKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcyCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBibnogZ2F0ZWRCaWRfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6QU5MViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBTkxWCgpnYXRlZEJpZF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjczCiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDI2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzMKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNAogICAgdW5jb3ZlciAyCiAgICBkaWcgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGdhdGVkQmlkX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1NyAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRCaWRfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3NQogICAgLy8gdGhpcy5jcmVhdGVCaWQocGF5bWVudCwgbWFya2V0cGxhY2UpCiAgICBkaWcgMwogICAgZGlnIDIKICAgIGNhbGxzdWIgY3JlYXRlQmlkCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY2NC02NjgKICAgIC8vIGdhdGVkQmlkKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uYmlkW3JvdXRpbmddKCkgLT4gdm9pZDoKYmlkOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NzgKICAgIC8vIGJpZChwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njc5CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBibnogYmlkX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNSAvLyAiRVJSOkFOTFYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QU5MVgoKYmlkX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODAKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4MAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYmlkX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1OCAvLyAiRVJSOkhHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEdURQoKYmlkX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2ODIKICAgIC8vIHRoaXMuY3JlYXRlQmlkKHBheW1lbnQsIG1hcmtldHBsYWNlKQogICAgZHVwMgogICAgY2FsbHN1YiBjcmVhdGVCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njc4CiAgICAvLyBiaWQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2F0ZWRCaWRBc2Fbcm91dGluZ10oKSAtPiB2b2lkOgpnYXRlZEJpZEFzYToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njg1LTY5MAogICAgLy8gZ2F0ZWRCaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIGdhdGVUeG46IGd0eG4uQXBwbGljYXRpb25DYWxsVHhuLAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudAogICAgLy8gKTogdm9pZCB7CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAzCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG4gR3JvdXBJbmRleAogICAgcHVzaGludCAyCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzMgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIGFwcGwKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkxCiAgICAvLyBjb25zdCB3YWxsZXQgPSBnZXRXYWxsZXRJRFVzaW5nQWtpdGFEQU8odGhpcy5ha2l0YURBTy52YWx1ZSwgVHhuLnNlbmRlcikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBjYWxsc3ViIGdldFdhbGxldElEVXNpbmdBa2l0YURBTwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTIKICAgIC8vIGNvbnN0IG9yaWdpbiA9IG9yaWdpbk9yVHhuU2VuZGVyKHdhbGxldCkKICAgIGNhbGxzdWIgb3JpZ2luT3JUeG5TZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk0CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBibnogZ2F0ZWRCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDM1IC8vICJFUlI6QU5MViIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBTkxWCgpnYXRlZEJpZEFzYV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Njk1CiAgICAvLyBsb2dnZWRBc3NlcnQoZ2F0ZUNoZWNrKGdhdGVUeG4sIHRoaXMuYWtpdGFEQU8udmFsdWUsIG9yaWdpbiwgdGhpcy5nYXRlSUQudmFsdWUpLCBFUlJfRkFJTEVEX0dBVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGdhdGVDaGVjayhnYXRlVHhuLCB0aGlzLmFraXRhREFPLnZhbHVlLCBvcmlnaW4sIHRoaXMuZ2F0ZUlELnZhbHVlKSwgRVJSX0ZBSUxFRF9HQVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY3CiAgICAvLyBnYXRlSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlHYXRlSUQgfSkKICAgIGJ5dGVjIDI2IC8vICJnYXRlX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OTUKICAgIC8vIGxvZ2dlZEFzc2VydChnYXRlQ2hlY2soZ2F0ZVR4biwgdGhpcy5ha2l0YURBTy52YWx1ZSwgb3JpZ2luLCB0aGlzLmdhdGVJRC52YWx1ZSksIEVSUl9GQUlMRURfR0FURSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNAogICAgdW5jb3ZlciAyCiAgICBkaWcgMwogICAgdW5jb3ZlciAzCiAgICBjYWxsc3ViIGdhdGVDaGVjawogICAgYm56IGdhdGVkQmlkQXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1NyAvLyAiRVJSOkZHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RkdURQoKZ2F0ZWRCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5NwogICAgLy8gdGhpcy5jcmVhdGVCaWRBc2EocGF5bWVudCwgYXNzZXRYZmVyLCBtYXJrZXRwbGFjZSkKICAgIGRpZyA0CiAgICBkaWcgNAogICAgZGlnIDMKICAgIGNhbGxzdWIgY3JlYXRlQmlkQXNhCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY4NS02OTAKICAgIC8vIGdhdGVkQmlkQXNhKAogICAgLy8gICBwYXltZW50OiBndHhuLlBheW1lbnRUeG4sCiAgICAvLyAgIGFzc2V0WGZlcjogZ3R4bi5Bc3NldFRyYW5zZmVyVHhuLAogICAgLy8gICBnYXRlVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uYmlkQXNhW3JvdXRpbmddKCkgLT4gdm9pZDoKYmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDAtNzA0CiAgICAvLyBiaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMSAvLyBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18zIC8vIGF4ZmVyCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXhmZXIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzA1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5pc0xpdmUoKSwgRVJSX0FVQ1RJT05fTk9UX0xJVkUpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBibnogYmlkQXNhX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNSAvLyAiRVJSOkFOTFYiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QU5MVgoKYmlkQXNhX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmdhdGVJRC52YWx1ZSA9PT0gMCwgRVJSX0hBU19HQVRFKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjcKICAgIC8vIGdhdGVJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUdhdGVJRCB9KQogICAgYnl0ZWMgMjYgLy8gImdhdGVfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcwNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuZ2F0ZUlELnZhbHVlID09PSAwLCBFUlJfSEFTX0dBVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogYmlkQXNhX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyA1OCAvLyAiRVJSOkhHVEUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SEdURQoKYmlkQXNhX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDgKICAgIC8vIHRoaXMuY3JlYXRlQmlkQXNhKHBheW1lbnQsIGFzc2V0WGZlciwgbWFya2V0cGxhY2UpCiAgICBkaWcgMgogICAgZGlnIDIKICAgIGRpZyAyCiAgICBjYWxsc3ViIGNyZWF0ZUJpZEFzYQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MDAtNzA0CiAgICAvLyBiaWRBc2EoCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYXNzZXRYZmVyOiBndHhuLkFzc2V0VHJhbnNmZXJUeG4sCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50CiAgICAvLyApOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6CnJlZnVuZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyByZWZ1bmRCaWQoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZAogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmFmZmxlW3JvdXRpbmddKCkgLT4gdm9pZDoKcmFmZmxlOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDQgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0NwogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPiB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSwgRVJSX0FVQ1RJT05fSEFTX05PVF9FTkRFRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA+CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNiAvLyAiRVJSOkFITkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUhORQoKcmFmZmxlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPT09IDAsIEVSUl9XSU5ORVJfQUxSRUFEWV9EUkFXTikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTMgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDgKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPT09IDAsIEVSUl9XSU5ORVJfQUxSRUFEWV9EUkFXTikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDUKICAgIHB1c2hieXRlcyAiRVJSOldBRFIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0FEUgoKcmFmZmxlX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTMKICAgIC8vIGlmICh0aGlzLnJhZmZsZVJvdW5kLnZhbHVlID09PSAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMTUKICAgIC8vIHJhZmZsZVJvdW5kID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVSb3VuZCB9KQogICAgYnl0ZWMgMzEgLy8gInJhZmZsZV9yb3VuZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUzCiAgICAvLyBpZiAodGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZCAtIDgKICAgIGdsb2JhbCBSb3VuZAogICAgaW50Y18yIC8vIDgKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDMxIC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1NQogICAgLy8gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSA9IEdsb2JhbC5yb3VuZCAtIDgKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpyYWZmbGVfYWZ0ZXJfaWZfZWxzZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NTgKICAgIC8vIGNvbnN0IHJvdW5kVG9Vc2U6IHVpbnQ2NCA9IHRoaXMucmFmZmxlUm91bmQudmFsdWUgKyAoNCAqIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTE1CiAgICAvLyByYWZmbGVSb3VuZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUm91bmQgfSkKICAgIGJ5dGVjIDMxIC8vICJyYWZmbGVfcm91bmQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1OAogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjkKICAgIC8vIHZyZkZhaWx1cmVDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5VlJGRmFpbHVyZUNvdW50IH0pCiAgICBieXRlYyAyMyAvLyAidnJmX2ZhaWx1cmVfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1OAogICAgLy8gY29uc3Qgcm91bmRUb1VzZTogdWludDY0ID0gdGhpcy5yYWZmbGVSb3VuZC52YWx1ZSArICg0ICogdGhpcy52cmZGYWlsdXJlQ291bnQudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18zIC8vIDQKICAgICoKICAgICsKICAgIGR1cAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MAogICAgLy8gbG9nZ2VkQXNzZXJ0KEdsb2JhbC5yb3VuZCA+PSByb3VuZFRvVXNlICsgOCwgRVJSX05PVF9FTk9VR0hfVElNRSkKICAgIGdsb2JhbCBSb3VuZAogICAgc3dhcAogICAgaW50Y18yIC8vIDgKICAgICsKICAgID49CiAgICBibnogcmFmZmxlX2FmdGVyX2Fzc2VydEA5CiAgICBwdXNoYnl0ZXMgIkVSUjpORVRNIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FVE0KCnJhZmZsZV9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYyLTc2NQogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjQKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgZGlnIDUKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjExMAogICAgLy8gc2FsdCA9IEdsb2JhbFN0YXRlPGJ5dGVzPDMyPj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNhbHQgfSkKICAgIGJ5dGVjIDUyIC8vICJzYWx0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjQKICAgIC8vIGFyZ3M6IFtyb3VuZFRvVXNlLCB0aGlzLnNhbHQudmFsdWVdLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MwogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc2MwogICAgLy8gYXBwSWQ6IGdldE90aGVyQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS52cmZCZWFjb24sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1OQogICAgLy8gY29uc3QgW290aGVyQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c090aGVyQXBwTGlzdCkpCiAgICBieXRlYyA0NyAvLyAib2FsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjMKICAgIC8vIGFwcElkOiBnZXRPdGhlckFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudnJmQmVhY29uLAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzYyLTc2NQogICAgLy8gY29uc3Qgc2VlZCA9IGFiaUNhbGw8dHlwZW9mIFJhbmRvbW5lc3NCZWFjb24ucHJvdG90eXBlLmdldD4oewogICAgLy8gICBhcHBJZDogZ2V0T3RoZXJBcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnZyZkJlYWNvbiwKICAgIC8vICAgYXJnczogW3JvdW5kVG9Vc2UsIHRoaXMuc2FsdC52YWx1ZV0sCiAgICAvLyB9KS5yZXR1cm5WYWx1ZQogICAgcHVzaGJ5dGVzIDB4MTg5MzkyYzUgLy8gbWV0aG9kICJnZXQodWludDY0LGJ5dGVbXSlieXRlW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYnl0ZXMKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY3CiAgICAvLyBpZiAoc2VlZC5sZW5ndGggPT09IDApIHsKICAgIGxlbgogICAgZHVwCiAgICBidXJ5IDMKICAgIGJueiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjgKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY5CiAgICAvLyB2cmZGYWlsdXJlQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVZSRkZhaWx1cmVDb3VudCB9KQogICAgYnl0ZWMgMjMgLy8gInZyZl9mYWlsdXJlX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NjgKICAgIC8vIHRoaXMudnJmRmFpbHVyZUNvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIzIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzY4CiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVAMTU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc0NQogICAgLy8gcmFmZmxlKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3MgogICAgLy8gY29uc3Qgcm5nU3RhdGUgPSBwY2c2NEluaXQoc2VlZC5zbGljZSgwLCAxNikpCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgPj0KICAgIGludGNfMCAvLyAwCiAgICBkaWcgMgogICAgdW5jb3ZlciAyCiAgICBzZWxlY3QKICAgIHB1c2hpbnQgMTYKICAgIGRpZyAyCiAgICA+PQogICAgcHVzaGludCAxNgogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIHNlbGVjdAogICAgZGlnIDEzCiAgICBjb3ZlciAyCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTcKICAgIC8vIGxvZ2dlZEFzc2VydChzZWVkLmxlbmd0aCA9PT0gMTYsIEVSUl9JTlZBTElEX1JBTkRPTV9TRUVEKQogICAgbGVuCiAgICBwdXNoaW50IDE2CiAgICA9PQogICAgYm56IHJhZmZsZV9hZnRlcl9hc3NlcnRANDIKICAgIHB1c2hieXRlcyAiRVJSOklSU0QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJTRAoKcmFmZmxlX2FmdGVyX2Fzc2VydEA0MjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGRpZyAxMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTgKICAgIC8vIGNvbnN0IHN0YXRlID0gX19wY2czMlN0ZXAoMCwgaW5jcikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNyAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMAogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgaW50YyA4IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIGFkZHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czo5OQogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcoc3RhdGUsIGluaXRpYWxTdGF0ZSkKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGludGMgNyAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjAKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgMCksIHBjZ0ZpcnN0SW5jcmVtZW50KSwKICAgIGludGMgOCAvLyAxNDQyNjk1MDQwODg4OTYzNDA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBjb3ZlciAyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MjEKICAgIC8vIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICB1bmNvdmVyIDIKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6OTkKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KHN0YXRlLCBpbml0aWFsU3RhdGUpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjMKICAgIC8vIGNvbnN0IFssIG11bExvd10gPSBvcC5tdWx3KHN0YXRlLCBwY2dNdWx0aXBsaWVyKQogICAgaW50YyA3IC8vIDYzNjQxMzYyMjM4NDY3OTMwMDUKICAgIG11bHcKICAgIGJ1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoyMQogICAgLy8gX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCA4KSwgcGNnU2Vjb25kSW5jcmVtZW50KSwKICAgIGludGMgOSAvLyAxNDQyNjk1MDQwODg4OTYzNDA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjI0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyhtdWxMb3csIGluY3IpCiAgICBhZGR3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTktMjIKICAgIC8vIHJldHVybiBbCiAgICAvLyAgICAgX19wY2czMkluaXQob3AuZXh0cmFjdFVpbnQ2NChzZWVkLCAwKSwgcGNnRmlyc3RJbmNyZW1lbnQpLAogICAgLy8gICAgIF9fcGNnMzJJbml0KG9wLmV4dHJhY3RVaW50NjQoc2VlZCwgOCksIHBjZ1NlY29uZEluY3JlbWVudCksCiAgICAvLyBdCiAgICBzd2FwCiAgICBpdG9iCiAgICBzd2FwCiAgICBpdG9iCiAgICBjb25jYXQKICAgIGJ1cnkgMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzc1CiAgICAvLyBsZXQgdXBwZXJCb3VuZCA9IHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzUKICAgIC8vIHdlaWdodGVkQmlkVG90YWwgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodGVkQmlkVG90YWwgfSkKICAgIGJ5dGVjIDE3IC8vICJ3ZWlnaHRlZF9iaWRfdG90YWwiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc3NQogICAgLy8gbGV0IHVwcGVyQm91bmQgPSB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgMwogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzYKICAgIC8vIGlmICh1cHBlckJvdW5kIDwgTUFYX1VJTlQ2NCkgewogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICA8CiAgICBieiByYWZmbGVfYWZ0ZXJfaWZfZWxzZUAxNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NzcKICAgIC8vIHVwcGVyQm91bmQgPSB1cHBlckJvdW5kICs9IDEKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGJ1cnkgMQoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjMxCiAgICAvLyBjb25zdCByZXN1bHQgPSBuZXcgRHluYW1pY0FycmF5PGFyYzQuVWludDY0PigpCiAgICBieXRlYyA1OSAvLyAweDAwMDAKICAgIGJ1cnkgMTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDMKICAgIC8vIGlmICh1cHBlckJvdW5kICE9PSAwKSB7CiAgICBkdXAKICAgIGJ6IHJhZmZsZV9lbHNlX2JvZHlAMjgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDQKICAgIC8vIGxvZ2dlZEFzc2VydCh1cHBlckJvdW5kID4gMSwgRVJSX0lOVkFMSURfUkFORE9NX0JPVU5EUykKICAgIGR1cAogICAgaW50Y18xIC8vIDEKICAgID4KICAgIGJueiByYWZmbGVfYWZ0ZXJfYXNzZXJ0QDI1CiAgICBieXRlYyA2MCAvLyAiRVJSOklSQkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJCRAoKcmFmZmxlX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NDUKICAgIC8vIGxvZ2dlZEFzc2VydChsb3dlckJvdW5kIDwgdXBwZXJCb3VuZCAtIDEsIEVSUl9JTlZBTElEX1JBTkRPTV9CT1VORFMpCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgwCiAgICAvLyBjb25zdCBybmdSZXN1bHQgPSBwY2c2NFJhbmRvbShybmdTdGF0ZSwgMSwgdXBwZXJCb3VuZCwgMSkKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQobG93ZXJCb3VuZCA8IHVwcGVyQm91bmQgLSAxLCBFUlJfSU5WQUxJRF9SQU5ET01fQk9VTkRTKQogICAgPgogICAgYm56IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDMxCiAgICBieXRlYyA2MCAvLyAiRVJSOklSQkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVJCRAoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjE0CiAgICAvLyBjb25zdCBbLCBhZGRMb3ddID0gb3AuYWRkdyh+dmFsdWUsIDEpCiAgICBkaWcgOQogICAgZHVwCiAgICB+CiAgICBpbnRjXzEgLy8gMQogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU0CiAgICAvLyBjb25zdCB0aHJlc2hvbGQ6IHVpbnQ2NCA9IF9fdWludDY0VHdvcyhhYnNvbHV0ZUJvdW5kKSAlIGFic29sdXRlQm91bmQKICAgIHN3YXAKICAgICUKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA3CiAgICBkaWcgMTIKICAgIGJ1cnkgMTEKCnJhZmZsZV93aGlsZV90b3BAMzI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU2CiAgICAvLyBmb3IgKGxldCBpID0gVWludDY0KDApOyBpIDwgbGVuZ3RoOyBpID0gaSArIDEpIHsKICAgIGRpZyA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MAogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo1NgogICAgLy8gZm9yIChsZXQgaSA9IFVpbnQ2NCgwKTsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7CiAgICA8CiAgICBieiByYWZmbGVfYWZ0ZXJfd2hpbGVAMzcKCnJhZmZsZV93aGlsZV90b3BAMzQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBkaWcgMTAKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyMwogICAgLy8gY29uc3QgWywgbXVsTG93XSA9IG9wLm11bHcoc3RhdGUsIHBjZ011bHRpcGxpZXIpCiAgICBpbnRjIDcgLy8gNjM2NDEzNjIyMzg0Njc5MzAwNQogICAgbXVsdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEwCiAgICAvLyBjb25zdCBuZXdTdGF0ZTEgPSBfX3BjZzMyU3RlcChzdGF0ZVswXSwgcGNnRmlyc3RJbmNyZW1lbnQpCiAgICBpbnRjIDggLy8gMTQ0MjY5NTA0MDg4ODk2MzQwNwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnMzIuYWxnby50czoyNAogICAgLy8gY29uc3QgWywgYWRkTG93XSA9IG9wLmFkZHcobXVsTG93LCBpbmNyKQogICAgYWRkdwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBidXJ5IDEyCiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6MTEKICAgIC8vIGNvbnN0IG5ld1N0YXRlMiA9IF9fcGNnMzJTdGVwKHN0YXRlWzFdLCBuZXdTdGF0ZTEgPT09IDAgPyBvcC5zaGwocGNnU2Vjb25kSW5jcmVtZW50LCAxKSA6IHBjZ1NlY29uZEluY3JlbWVudCkKICAgIHN3YXAKICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA2CiAgICBibnogcmFmZmxlX3Rlcm5hcnlfZmFsc2VANDUKICAgIHB1c2hpbnQgMjg4NTM5MDA4MTc3NzkyNjgxOAoKcmFmZmxlX3Rlcm5hcnlfbWVyZ2VANDY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2czMi5hbGdvLnRzOjIzCiAgICAvLyBjb25zdCBbLCBtdWxMb3ddID0gb3AubXVsdyhzdGF0ZSwgcGNnTXVsdGlwbGllcikKICAgIGRpZyA1CiAgICBkdXAKICAgIGludGMgNyAvLyA2MzY0MTM2MjIzODQ2NzkzMDA1CiAgICBtdWx3CiAgICBidXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzMyLmFsZ28udHM6MjQKICAgIC8vIGNvbnN0IFssIGFkZExvd10gPSBvcC5hZGR3KG11bExvdywgaW5jcikKICAgIHVuY292ZXIgMgogICAgYWRkdwogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjEzCiAgICAvLyByZXR1cm4gW1tuZXdTdGF0ZTEsIG5ld1N0YXRlMl0sIG9wLnNobChfX3BjZzMyT3V0cHV0KHN0YXRlWzBdKSwgMzIpIHwgX19wY2czMk91dHB1dChzdGF0ZVsxXSldCiAgICBkaWcgMTAKICAgIGl0b2IKICAgIHN3YXAKICAgIGl0b2IKICAgIGNvbmNhdAogICAgZGlnIDUKICAgIGNhbGxzdWIgX19wY2czMk91dHB1dAogICAgcHVzaGludCAzMgogICAgc2hsCiAgICB1bmNvdmVyIDIKICAgIGNhbGxzdWIgX19wY2czMk91dHB1dAogICAgfAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjU4CiAgICAvLyBjb25zdCBbbmV3U3RhdGUsIGNhbmRpZGF0ZV0gPSBfX3BjZzY0VW5ib3VuZGVkUmFuZG9tKHN0YXRlKQogICAgZHVwCiAgICBleHRyYWN0IDAgMTYKICAgIHN3YXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjAKICAgIC8vIGlmIChjYW5kaWRhdGUgPj0gdGhyZXNob2xkKSB7CiAgICBkaWcgNAogICAgPj0KICAgIGJ6IHJhZmZsZV9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjYxCiAgICAvLyByZXN1bHQucHVzaChuZXcgYXJjNC5VaW50NjQoKGNhbmRpZGF0ZSAlIGFic29sdXRlQm91bmQpICsgbG93ZXJCb3VuZCkpCiAgICBkaWcgOAogICAgZGlnIDExCiAgICAlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4MAogICAgLy8gY29uc3Qgcm5nUmVzdWx0ID0gcGNnNjRSYW5kb20ocm5nU3RhdGUsIDEsIHVwcGVyQm91bmQsIDEpCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgKwogICAgaXRvYgogICAgZGlnIDE1CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czo2MQogICAgLy8gcmVzdWx0LnB1c2gobmV3IGFyYzQuVWludDY0KChjYW5kaWRhdGUgJSBhYnNvbHV0ZUJvdW5kKSArIGxvd2VyQm91bmQpKQogICAgaW50Y18xIC8vIDEKICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAwCiAgICByZXBsYWNlMiAwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgMTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NTYKICAgIC8vIGZvciAobGV0IGkgPSBVaW50NjQoMCk7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkgewogICAgZGlnIDcKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDgKICAgIGJ1cnkgMTEKICAgIGIgcmFmZmxlX3doaWxlX3RvcEAzMgoKcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzY6CiAgICBidXJ5IDExCiAgICBiIHJhZmZsZV93aGlsZV90b3BAMzQKCnJhZmZsZV90ZXJuYXJ5X2ZhbHNlQDQ1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL3R5cGVzL2xpYl9wY2cvcGNnNjQuYWxnby50czoxMQogICAgLy8gY29uc3QgbmV3U3RhdGUyID0gX19wY2czMlN0ZXAoc3RhdGVbMV0sIG5ld1N0YXRlMSA9PT0gMCA/IG9wLnNobChwY2dTZWNvbmRJbmNyZW1lbnQsIDEpIDogcGNnU2Vjb25kSW5jcmVtZW50KQogICAgaW50YyA5IC8vIDE0NDI2OTUwNDA4ODg5NjM0MDkKICAgIGIgcmFmZmxlX3Rlcm5hcnlfbWVyZ2VANDYKCnJhZmZsZV9hZnRlcl93aGlsZUAzNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy90eXBlcy9saWJfcGNnL3BjZzY0LmFsZ28udHM6NjgKICAgIC8vIHJldHVybiBbc3RhdGUsIHJlc3VsdF0KICAgIGRpZyAxMAogICAgcHVzaGJ5dGVzIDB4MDAxMgogICAgY29uY2F0CiAgICBkaWcgMTQKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODEKICAgIC8vIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9IHJuZ1Jlc3VsdFsxXVswXS5hc1VpbnQ2NCgpCiAgICBkdXAKICAgIHB1c2hpbnQgMTYKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwNgogICAgLy8gd2lubmluZ1RpY2tldCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2lubmluZ1RpY2tldCB9KQogICAgYnl0ZWMgMTMgLy8gIndpbm5pbmdfdGlja2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODEKICAgIC8vIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA9IHJuZ1Jlc3VsdFsxXVswXS5hc1VpbnQ2NCgpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2OQogICAgLy8gdnJmRmFpbHVyZUNvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlWUkZGYWlsdXJlQ291bnQgfSkKICAgIGJ5dGVjIDIzIC8vICJ2cmZfZmFpbHVyZV9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzgyCiAgICAvLyB0aGlzLnZyZkZhaWx1cmVDb3VudC52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDUKICAgIC8vIHJhZmZsZSgpOiB2b2lkIHsKICAgIGIgcmFmZmxlX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yYWZmbGVAMTUKCnJhZmZsZV9lbHNlX2JvZHlAMjg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvdHlwZXMvbGliX3BjZy9wY2c2NC5hbGdvLnRzOjUxCiAgICAvLyBhYnNvbHV0ZUJvdW5kID0gb3AuYnRvaShCeXRlcyhCaWdVaW50KDIgKiogNjQpIC0gQmlnVWludChsb3dlckJvdW5kKSkpCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIGJ1cnkgMTAKICAgIGIgcmFmZmxlX2FmdGVyX2lmX2Vsc2VAMzEKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmZpbmRXaW5uZXJbcm91dGluZ10oKSAtPiB2b2lkOgpmaW5kV2lubmVyOgogICAgaW50Y18wIC8vIDAKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODUKICAgIC8vIGZpbmRXaW5uZXIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBFUlJfTk9UX0FQUExJQ0FCTEVfVE9fVEhJU19BVUNUSU9OKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNiAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg2CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPiAwLCBFUlJfTk9UX0FQUExJQ0FCTEVfVE9fVEhJU19BVUNUSU9OKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1MyAvLyAiRVJSOk5BUFAiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkFQUAoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgNCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg3CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAzNiAvLyAiRVJSOkFITkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUhORQoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg4CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlICE9PSAwLCBFUlJfV0lOTklOR19OVU1CRVJfTk9UX0ZPVU5EKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc4OAogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSAhPT0gMCwgRVJSX1dJTk5JTkdfTlVNQkVSX05PVF9GT1VORCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBibnogZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6V05ORiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXTk5GCgpmaW5kV2lubmVyX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX0FMUkVBRFlfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDgKICAgIC8vIHJhZmZsZVdpbm5lciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVXaW5uZXIgfSkKICAgIGJ5dGVjIDE2IC8vICJyYWZmbGVfd2lubmVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3ODkKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9PT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX0FMUkVBRFlfRk9VTkQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZ2xvYmFsIFplcm9BZGRyZXNzCiAgICA9PQogICAgYm56IGZpbmRXaW5uZXJfYWZ0ZXJfYXNzZXJ0QDkKICAgIHB1c2hieXRlcyAiRVJSOldBRkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V0FGRAoKZmluZFdpbm5lcl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI0CiAgICAvLyBsZXQgeyBzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydCB9ID0gdGhpcy5maW5kV2lubmVyQ3Vyc29ycy52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyQ3Vyc29ycyB9KQogICAgYnl0ZWMgMzkgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNAogICAgLy8gbGV0IHsgc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnQgfSA9IHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAzCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA0CgpmaW5kV2lubmVyX3doaWxlX3RvcEAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI2CiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWU7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAKICAgIC8vIHdlaWdodHNCb3hDb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodHNCb3hDb3VudCB9KQogICAgYnl0ZWMgMTIgLy8gIndlaWdodHNfYm94X2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjYKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZTsgaSArPSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDQKICAgID4KICAgIGJ6IGZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMjYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI3CiAgICAvLyBjb25zdCBib3hTdGFrZSA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2ldLmFzVWludDY0KCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MjcKICAgIC8vIGNvbnN0IGJveFN0YWtlID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbaV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA0CiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDI4CiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlIDwgY3VycmVudFJhbmdlU3RhcnQgKyBib3hTdGFrZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyOAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZVN0YXJ0ICsgYm94U3Rha2UpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNwogICAgdW5jb3ZlciAyCiAgICArCiAgICBkdXAKICAgIGJ1cnkgNwogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyOQogICAgLy8gcmV0dXJuIFtzdGFydGluZ0luZGV4LCBjdXJyZW50UmFuZ2VTdGFydF0KICAgIGRpZyAxCiAgICBpdG9iCiAgICBkaWcgNgogICAgaXRvYgogICAgY29uY2F0CgpmaW5kV2lubmVyX2FmdGVyX2lubGluZWRfc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTMKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB3aW5uaW5nQm94SW5mb1swXQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5NAogICAgLy8gbGV0IGN1cnJlbnRSYW5nZVN0YXJ0ID0gd2lubmluZ0JveEluZm9bMV0KICAgIGludGNfMiAvLyA4CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5NwogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSAtIHN0YXJ0aW5nSW5kZXgKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjUgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTcKICAgIC8vIGNvbnN0IHJlbWFpbmRlcjogdWludDY0ID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUgLSBzdGFydGluZ0luZGV4CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzk4CiAgICAvLyBpdGVyYXRpb25BbW91bnQgPSByZW1haW5kZXIgPiBpdGVyYXRpb25BbW91bnQgPyBpdGVyYXRpb25BbW91bnQgOiByZW1haW5kZXIKICAgIGR1cAogICAgZGlnIDMKICAgIGR1cAogICAgY292ZXIgMwogICAgPgogICAgc3dhcAogICAgY292ZXIgMgogICAgc2VsZWN0CiAgICBkdXAKICAgIGJ1cnkgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDAKICAgIC8vIGNvbnN0IGNodW5rT2Zmc2V0OiB1aW50NjQgPSBzdGFydGluZ0luZGV4ICUgQ2h1bmtTaXplCiAgICBzd2FwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgJQogICAgZHVwCiAgICBidXJ5IDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgwMQogICAgLy8gY29uc3QgcmVtYWluaW5nSW5DaHVuazogdWludDY0ID0gQ2h1bmtTaXplIC0gY2h1bmtPZmZzZXQKICAgIGludGMgNSAvLyA0MDk2CiAgICBzd2FwCiAgICAtCiAgICBkdXAKICAgIGJ1cnkgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDIKICAgIC8vIGlmIChpdGVyYXRpb25BbW91bnQgPiByZW1haW5pbmdJbkNodW5rKSB7CiAgICA+CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGRpZyAyCiAgICBidXJ5IDEKCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODA2CiAgICAvLyBjb25zdCB3ZWlnaHQgPSBjbG9uZSh0aGlzLndlaWdodHMoc3RhcnRpbmdJbmRleCAvIENodW5rU2l6ZSkudmFsdWUpCiAgICBkaWcgMQogICAgaW50YyA1IC8vIDQwOTYKICAgIC8KICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGJ1cnkgOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MDgKICAgIC8vIGVuc3VyZUJ1ZGdldCgoaXRlcmF0aW9uQW1vdW50ICogNjApKQogICAgZHVwCiAgICBwdXNoaW50IDYwCiAgICAqCiAgICBpbnRjXzAgLy8gMAogICAgY2FsbHN1YiBlbnN1cmVfYnVkZ2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxMAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSA0CgpmaW5kV2lubmVyX3doaWxlX3RvcEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEwCiAgICAvLyBmb3IgKGxldCBpOiB1aW50NjQgPSAwOyBpIDwgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBkaWcgMQogICAgPAogICAgYnogZmluZFdpbm5lcl9hZnRlcl93aGlsZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTEKICAgIC8vIGNvbnN0IGFtb3VudCA9IHdlaWdodFtjaHVua09mZnNldCArIGldLmFzVWludDY0KCkKICAgIGRpZyA3CiAgICBkaWcgNAogICAgKwogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGRpZyA5CiAgICBzd2FwCiAgICBpbnRjXzIgLy8gOAogICAgYm94X2V4dHJhY3QgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTIKICAgIC8vIGlmIChhbW91bnQgPT09IHRoaXMuaGlnaGVzdEJpZC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE4IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEyCiAgICAvLyBpZiAoYW1vdW50ID09PSB0aGlzLmhpZ2hlc3RCaWQudmFsdWUpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA9PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxMwogICAgLy8gY3VycmVudFJhbmdlU3RhcnQgKz0gYW1vdW50CiAgICBkaWcgNgogICAgKwogICAgYnVyeSA2CgpmaW5kV2lubmVyX2Jsb2NrQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MTAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDQKICAgIGIgZmluZFdpbm5lcl93aGlsZV90b3BAMTIKCmZpbmRXaW5uZXJfYWZ0ZXJfaWZfZWxzZUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE3CiAgICAvLyBjdXJyZW50UmFuZ2VFbmQgPSBjdXJyZW50UmFuZ2VTdGFydCArIGFtb3VudAogICAgZGlnIDYKICAgIGR1cAogICAgdW5jb3ZlciAyCiAgICArCiAgICBidXJ5IDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE4CiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA2CiAgICAvLyB3aW5uaW5nVGlja2V0ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXaW5uaW5nVGlja2V0IH0pCiAgICBieXRlYyAxMyAvLyAid2lubmluZ190aWNrZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxOAogICAgLy8gaWYgKHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA+PSBjdXJyZW50UmFuZ2VTdGFydCAmJiB0aGlzLndpbm5pbmdUaWNrZXQudmFsdWUgPCBjdXJyZW50UmFuZ2VFbmQpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgYnogZmluZFdpbm5lcl9hZnRlcl9pZl9lbHNlQDE4CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDYKICAgIC8vIHdpbm5pbmdUaWNrZXQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdpbm5pbmdUaWNrZXQgfSkKICAgIGJ5dGVjIDEzIC8vICJ3aW5uaW5nX3RpY2tldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE4CiAgICAvLyBpZiAodGhpcy53aW5uaW5nVGlja2V0LnZhbHVlID49IGN1cnJlbnRSYW5nZVN0YXJ0ICYmIHRoaXMud2lubmluZ1RpY2tldC52YWx1ZSA8IGN1cnJlbnRSYW5nZUVuZCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA3CiAgICA8CiAgICBieiBmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODE5CiAgICAvLyB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSA9IHRoaXMubG9jYXRpb25zKHN0YXJ0aW5nSW5kZXggKyBpKS52YWx1ZQogICAgZGlnIDEKICAgIGRpZyA0CiAgICArCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzMQogICAgLy8gbG9jYXRpb25zID0gQm94TWFwPHVpbnQ2NCwgQWNjb3VudD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhMb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDQyIC8vICJsIgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSB0aGlzLmxvY2F0aW9ucyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTYgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxOQogICAgLy8gdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgPSB0aGlzLmxvY2F0aW9ucyhzdGFydGluZ0luZGV4ICsgaSkudmFsdWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMTg6CiAgICBkaWcgNgogICAgYnVyeSA2CiAgICBiIGZpbmRXaW5uZXJfYmxvY2tAMTkKCmZpbmRXaW5uZXJfYWZ0ZXJfd2hpbGVAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNQogICAgLy8gc3RhcnRpbmdJbmRleDogKHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQpLAogICAgZHVwMgogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MjQtODI3CiAgICAvLyB0aGlzLmZpbmRXaW5uZXJDdXJzb3JzLnZhbHVlID0gewogICAgLy8gICBzdGFydGluZ0luZGV4OiAoc3RhcnRpbmdJbmRleCArIGl0ZXJhdGlvbkFtb3VudCksCiAgICAvLyAgIGN1cnJlbnRSYW5nZVN0YXJ0OiBjdXJyZW50UmFuZ2VTdGFydCwKICAgIC8vIH0KICAgIGl0b2IKICAgIGRpZyA2CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgKICAgIC8vIGZpbmRXaW5uZXJDdXJzb3JzID0gR2xvYmFsU3RhdGU8RmluZFdpbm5lckN1cnNvcnM+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlGaW5kV2lubmVyQ3Vyc29ycyB9KQogICAgYnl0ZWMgMzkgLy8gImZpbmRfd2lubmVyX2N1cnNvcnMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgyNC04MjcKICAgIC8vIHRoaXMuZmluZFdpbm5lckN1cnNvcnMudmFsdWUgPSB7CiAgICAvLyAgIHN0YXJ0aW5nSW5kZXg6IChzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50KSwKICAgIC8vICAgY3VycmVudFJhbmdlU3RhcnQ6IGN1cnJlbnRSYW5nZVN0YXJ0LAogICAgLy8gfQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Nzg1CiAgICAvLyBmaW5kV2lubmVyKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpmaW5kV2lubmVyX2FmdGVyX2lmX2Vsc2VAMjU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzMgogICAgLy8gc3RhcnRpbmdJbmRleCArPSBDaHVua1NpemUKICAgIGRpZyAxCiAgICBpbnRjIDUgLy8gNDA5NgogICAgKwogICAgYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQyNgogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlOyBpICs9IDEpIHsKICAgIGRpZyAzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSA0CiAgICBkaWcgNAogICAgYnVyeSA2CiAgICBiIGZpbmRXaW5uZXJfd2hpbGVfdG9wQDIyCgpmaW5kV2lubmVyX2FmdGVyX3doaWxlQDI2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MzYKICAgIC8vIHJldHVybiBbc3RhcnRpbmdJbmRleCwgY3VycmVudFJhbmdlU3RhcnRdCiAgICBkaWcgMQogICAgaXRvYgogICAgZGlnIDYKICAgIGl0b2IKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OTEKICAgIC8vIGNvbnN0IHdpbm5pbmdCb3hJbmZvID0gdGhpcy5nZXRXaW5uZXJXZWlnaHRCb3hJbmZvKCkKICAgIGIgZmluZFdpbm5lcl9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0V2lubmVyV2VpZ2h0Qm94SW5mb0AyNwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kTUJSW3JvdXRpbmddKCkgLT4gdm9pZDoKcmVmdW5kTUJSOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMwogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMAogICAgLy8gcmVmdW5kTUJSKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNwogICAgLy8gcHJpemVDbGFpbWVkID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplQ2xhaW1lZCB9KQogICAgYnl0ZWMgMjEgLy8gInByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfTk9UX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IHJlZnVuZE1CUl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDEgLy8gIkVSUjpQWk5DIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBaTkMKCnJlZnVuZE1CUl9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRGZWUudmFsdWUgPT09IDAgfHwgdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUgIT09IEdsb2JhbC56ZXJvQWRkcmVzcywgRVJSX1dJTk5FUl9OT1RfRk9VTkQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA2IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiByZWZ1bmRNQlJfYm9vbF90cnVlQDUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTYgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzMwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkRmVlLnZhbHVlID09PSAwIHx8IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJ6IHJlZnVuZE1CUl9ib29sX2ZhbHNlQDYKCnJlZnVuZE1CUl9ib29sX3RydWVANToKICAgIGludGNfMSAvLyAxCgpyZWZ1bmRNQlJfYm9vbF9tZXJnZUA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzMKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZEZlZS52YWx1ZSA9PT0gMCB8fCB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGJueiByZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDkKICAgIGJ5dGVjIDYxIC8vICJFUlI6V05GRCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXTkZECgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkSUQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3OQogICAgLy8gYmlkSUQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZElEIH0pCiAgICBieXRlYyA1IC8vICJiaWRfaWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkSUQudmFsdWUgIT09IHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlLCBFUlJfQUxMX1JFRlVORFNfQ09NUExFVEUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMjAgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJpZElELnZhbHVlICE9PSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZSwgRVJSX0FMTF9SRUZVTkRTX0NPTVBMRVRFKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICE9CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6QVJGQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpBUkZDCgpyZWZ1bmRNQlJfYWZ0ZXJfYXNzZXJ0QDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzcKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMjAgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MzcKICAgIC8vIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSA0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzOAogICAgLy8gY29uc3QgcmVtYWluZGVyOiB1aW50NjQgPSB0aGlzLmJpZElELnZhbHVlIC0gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODM4CiAgICAvLyBjb25zdCByZW1haW5kZXI6IHVpbnQ2NCA9IHRoaXMuYmlkSUQudmFsdWUgLSB0aGlzLnJlZnVuZE1CUkN1cnNvci52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzOQogICAgLy8gaXRlcmF0aW9uQW1vdW50ID0gcmVtYWluZGVyID4gaXRlcmF0aW9uQW1vdW50ID8gaXRlcmF0aW9uQW1vdW50IDogcmVtYWluZGVyCiAgICBkdXAKICAgIGRpZyAzCiAgICBkdXAKICAgIGNvdmVyIDMKICAgID4KICAgIHN3YXAKICAgIGNvdmVyIDIKICAgIHNlbGVjdAogICAgZHVwCiAgICBidXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQxCiAgICAvLyBlbnN1cmVCdWRnZXQoKGl0ZXJhdGlvbkFtb3VudCAqIDYwKSkKICAgIHB1c2hpbnQgNjAKICAgICoKICAgIGludGNfMCAvLyAwCiAgICBjYWxsc3ViIGVuc3VyZV9idWRnZXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQzCiAgICAvLyBjb25zdCB7IGJpZHMsIGJpZHNCeUFkZHJlc3MsIGxvY2F0aW9ucyB9ID0gdGhpcy5tYnIoKQogICAgaW50YyAxMCAvLyAzNDkwMAogICAgYnVyeSA2CiAgICBidXJ5IDQKCnJlZnVuZE1CUl93aGlsZV90b3BAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NQogICAgLy8gZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXg7IGkgPCBzdGFydGluZ0luZGV4ICsgaXRlcmF0aW9uQW1vdW50OyBpICs9IDEpIHsKICAgIGR1cDIKICAgICsKICAgIGRpZyA0CiAgICA+CiAgICBieiByZWZ1bmRNQlJfYWZ0ZXJfd2hpbGVAMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ3CiAgICAvLyBjb25zdCB7IHJlZnVuZGVkLCBhY2NvdW50IH0gPSB0aGlzLmJpZHMoaSkudmFsdWUKICAgIGRpZyAzCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMzcgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg0NwogICAgLy8gY29uc3QgeyByZWZ1bmRlZCwgYWNjb3VudCB9ID0gdGhpcy5iaWRzKGkpLnZhbHVlCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDU3NgogICAgZ2V0Yml0CiAgICBzd2FwCiAgICBleHRyYWN0IDAgMzIKICAgIGJ1cnkgMTAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBibnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ4CiAgICAvLyBpZiAoIXJlZnVuZGVkICYmIGkgIT09IHRoaXMuYmlkSUQudmFsdWUgLSAxKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyA0CiAgICAhPQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMTYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ5CiAgICAvLyB0aGlzLnJlZnVuZEJpZChpKQogICAgZGlnIDMKICAgIGNhbGxzdWIgc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWQKCnJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTQKICAgIC8vIHRoaXMuYmlkcyhpKS5kZWxldGUoKQogICAgZGlnIDcKICAgIGJveF9kZWwKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgYnl0ZWMgOCAvLyAiYSIKICAgIGRpZyA5CiAgICBjb25jYXQKICAgIGR1cAogICAgYnVyeSA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1NQogICAgLy8gaWYgKHRoaXMuYmlkc0J5QWRkcmVzcyhhY2NvdW50KS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHJlZnVuZE1CUl9pZl9ib2R5QDE3CiAgICBkaWcgNAogICAgYnVyeSAzCgpyZWZ1bmRNQlJfYWZ0ZXJfaWZfZWxzZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY2LTg3MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZGlnIDIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBkaWcgOAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjYtODcwCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYWNjb3VudCwKICAgIC8vICAgICBhbW91bnQ6IHJlZnVuZEFtb3VudCwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODY2LTg3MQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGFjY291bnQsCiAgICAvLyAgICAgYW1vdW50OiByZWZ1bmRBbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODQ1CiAgICAvLyBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0aW5nSW5kZXggKyBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgZGlnIDMKICAgIGludGNfMSAvLyAxCiAgICArCiAgICBidXJ5IDQKICAgIGIgcmVmdW5kTUJSX3doaWxlX3RvcEAxMgoKcmVmdW5kTUJSX2lmX2JvZHlAMTc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1NgogICAgLy8gY29uc3QgbG9jID0gdGhpcy5iaWRzQnlBZGRyZXNzKGFjY291bnQpLnZhbHVlCiAgICBkaWcgNgogICAgZHVwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NTcKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhhY2NvdW50KS5kZWxldGUoKQogICAgc3dhcAogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg1OAogICAgLy8gcmVmdW5kQW1vdW50ICs9IGJpZHNCeUFkZHJlc3MKICAgIGludGMgMTEgLy8gNTM0MDAKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NjAKICAgIC8vIGlmICh0aGlzLmxvY2F0aW9ucyhsb2MpLmV4aXN0cykgewogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMzEKICAgIC8vIGxvY2F0aW9ucyA9IEJveE1hcDx1aW50NjQsIEFjY291bnQ+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4TG9jYXRpb25zIH0pCiAgICBieXRlYyA0MiAvLyAibCIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZHVwCiAgICBidXJ5IDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODYwCiAgICAvLyBpZiAodGhpcy5sb2NhdGlvbnMobG9jKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYnogcmVmdW5kTUJSX2FmdGVyX2lmX2Vsc2VAMjAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODYxCiAgICAvLyB0aGlzLmxvY2F0aW9ucyhsb2MpLmRlbGV0ZSgpCiAgICBkaWcgNQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg2MgogICAgLy8gcmVmdW5kQW1vdW50ICs9IGxvY2F0aW9ucwogICAgaW50YyAxMiAvLyA3MjMwMAogICAgYnVyeSAzCiAgICBiIHJlZnVuZE1CUl9hZnRlcl9pZl9lbHNlQDIwCgpyZWZ1bmRNQlJfYWZ0ZXJfd2hpbGVAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3NAogICAgLy8gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMDAKICAgIC8vIHJlZnVuZE1CUkN1cnNvciA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmVmdW5kTUJSQ3Vyc29yIH0pCiAgICBieXRlYyAyMCAvLyAicmVmdW5kX21icl9jdXJzb3IiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg3NAogICAgLy8gdGhpcy5yZWZ1bmRNQlJDdXJzb3IudmFsdWUgKz0gaXRlcmF0aW9uQW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDEKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTAwCiAgICAvLyByZWZ1bmRNQlJDdXJzb3IgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAxLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZE1CUkN1cnNvciB9KQogICAgYnl0ZWMgMjAgLy8gInJlZnVuZF9tYnJfY3Vyc29yIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzQKICAgIC8vIHRoaXMucmVmdW5kTUJSQ3Vyc29yLnZhbHVlICs9IGl0ZXJhdGlvbkFtb3VudAogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODMwCiAgICAvLyByZWZ1bmRNQlIoaXRlcmF0aW9uQW1vdW50OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCnJlZnVuZE1CUl9ib29sX2ZhbHNlQDY6CiAgICBpbnRjXzAgLy8gMAogICAgYiByZWZ1bmRNQlJfYm9vbF9tZXJnZUA3CgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGFpbVByaXplW3JvdXRpbmddKCkgLT4gdm9pZDoKY2xhaW1Qcml6ZToKICAgIGludGNfMCAvLyAwCiAgICBkdXBuIDUKICAgIGJ5dGVjXzIgLy8gIiIKICAgIGR1cG4gMTMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgNCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODc5CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBjbGFpbVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAzNiAvLyAiRVJSOkFITkUiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6QUhORQoKY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgwCiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUFJJWkVfQUxSRUFEWV9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIxIC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODAKICAgIC8vIGxvZ2dlZEFzc2VydCghdGhpcy5wcml6ZUNsYWltZWQudmFsdWUsIEVSUl9QUklaRV9BTFJFQURZX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1Qcml6ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6UEFDTCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpQQUNMCgpjbGFpbVByaXplX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODMKICAgIC8vIGNvbnN0IHsgYWNjb3VudCwgYW1vdW50LCBtYXJrZXRwbGFjZSB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzkKICAgIC8vIGJpZElEID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMSwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRJRCB9KQogICAgYnl0ZWMgNSAvLyAiYmlkX2lkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4ODMKICAgIC8vIGNvbnN0IHsgYWNjb3VudCwgYW1vdW50LCBtYXJrZXRwbGFjZSB9ID0gdGhpcy5iaWRzKHRoaXMuYmlkSUQudmFsdWUgLSAxKS52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMzcgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODgzCiAgICAvLyBjb25zdCB7IGFjY291bnQsIGFtb3VudCwgbWFya2V0cGxhY2UgfSA9IHRoaXMuYmlkcyh0aGlzLmJpZElELnZhbHVlIC0gMSkudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgYnVyeSAyMQogICAgZHVwCiAgICBwdXNoaW50IDMyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMwogICAgZXh0cmFjdCA0MCAzMgogICAgYnVyeSAxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMjYKICAgIC8vIGlmICh0aGlzLmlzUHJpemVCb3gudmFsdWUpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1CiAgICAvLyBpc1ByaXplQm94ID0gR2xvYmFsU3RhdGU8Ym9vbGVhbj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUlzUHJpemVCb3ggfSkKICAgIGJ5dGVjIDkgLy8gImlzX3ByaXplX2JveCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjI2CiAgICAvLyBpZiAodGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDQ3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNy0yMzAKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW2J1eWVyXSwKICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyOAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyOAogICAgLy8gYXBwSWQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIyNy0yMzAKICAgIC8vIGFiaUNhbGw8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oewogICAgLy8gICBhcHBJZDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgYXJnczogW2J1eWVyXSwKICAgIC8vIH0pCiAgICBieXRlYyA1NiAvLyBtZXRob2QgInRyYW5zZmVyKGFkZHJlc3Mpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTkKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24udHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJANTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4NwogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODg3CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGFpbVByaXplX2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI1OAogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBha2l0YSwgbWFya2V0cGxhY2UsIHNlbGxlciB9ID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGRpZyAxMQogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMAogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjAKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MAogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMzgKICAgIGRpZyA5CiAgICArCiAgICBidXJ5IDE0CgpjbGFpbVByaXplX3Rlcm5hcnlfbWVyZ2VAMzk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2MwogICAgLy8gaWYgKGFraXRhQW1vdW50ID4gMCkgewogICAgZGlnIDEzCiAgICBibnogY2xhaW1Qcml6ZV9pZl9ib2R5QDQwCiAgICBkaWcgMTMKICAgIGJ1cnkgNwoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDQxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjctMjcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjY5CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjkKICAgIC8vIHJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjctMjcxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjctMjcyCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI3NS0yODAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNzcKICAgIC8vIHJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNyAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI3NwogICAgLy8gcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc1LTI3OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjc1LTI4MAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODMtMjg4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyODMtMjg3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYnV5U2lkZU1hcmtldHBsYWNlLAogICAgLy8gICAgIGFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI4My0yODgKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBidXlTaWRlTWFya2V0cGxhY2UsCiAgICAvLyAgICAgYW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTEtMjk2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBzZWxsZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTMKICAgIC8vIHJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjkxLTI5NQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuc2VsbGVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogc2VsbGVyLAogICAgLy8gICB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTEtMjk2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBzZWxsZXIsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mjk5CiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyOTkKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwMC0zMDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFtb3VudDogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwMgogICAgLy8gcmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMDAtMzA0CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhbW91bnQ6IGNyZWF0b3IsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMwMC0zMDUKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBBc3NldCh0aGlzLnByaXplLnZhbHVlKS5jcmVhdG9yLAogICAgLy8gICAgIGFtb3VudDogY3JlYXRvciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3CiAgICAvLyBwcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyMSAvLyAicHJpemVfY2xhaW1lZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODkzCiAgICAvLyB0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSA9IHRydWUKICAgIGludGNfMSAvLyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4NzcKICAgIC8vIGNsYWltUHJpemUoKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpjbGFpbVByaXplX2lmX2JvZHlANDA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI2NAogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgMCwgYWtpdGFBbW91bnQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNjQKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIDAsIGFraXRhQW1vdW50KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgZGlnIDE1CiAgICBjYWxsc3ViIHNlbmRSZWZlcnJhbFBheW1lbnQKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSA3CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA0MQoKY2xhaW1Qcml6ZV90ZXJuYXJ5X2ZhbHNlQDM4OgogICAgYnVyeSAxNAogICAgYiBjbGFpbVByaXplX3Rlcm5hcnlfbWVyZ2VAMzkKCmNsYWltUHJpemVfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMQogICAgLy8gY29uc3QgeyBjcmVhdG9yLCBha2l0YSwgbWFya2V0cGxhY2UsIHNlbGxlciB9ID0gdGhpcy5nZXRBbW91bnRzKGFtb3VudCkKICAgIGRpZyAxMQogICAgY2FsbHN1YiBnZXRBbW91bnRzCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYnVyeSAxMAogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIHN3YXAKICAgIGR1cAogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAogICAgcHVzaGludCAyNAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTMKICAgIC8vIGNvbnN0IGFraXRhQW1vdW50OiB1aW50NjQgPSB0aGlzLmlzUHJpemVCb3gudmFsdWUgPyAoYWtpdGEgKyBjcmVhdG9yKSA6IGFraXRhCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNQogICAgLy8gaXNQcml6ZUJveCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlJc1ByaXplQm94IH0pCiAgICBieXRlYyA5IC8vICJpc19wcml6ZV9ib3giCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxMwogICAgLy8gY29uc3QgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IHRoaXMuaXNQcml6ZUJveC52YWx1ZSA/IChha2l0YSArIGNyZWF0b3IpIDogYWtpdGEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjbGFpbVByaXplX3Rlcm5hcnlfZmFsc2VAMTEKICAgIGRpZyA5CiAgICArCiAgICBidXJ5IDE0CgpjbGFpbVByaXplX3Rlcm5hcnlfbWVyZ2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxNgogICAgLy8gaWYgKGFraXRhQW1vdW50ID4gMCkgewogICAgZGlnIDEzCiAgICBibnogY2xhaW1Qcml6ZV9pZl9ib2R5QDEzCiAgICBkaWcgMTMKICAgIGJ1cnkgNwoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDE0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyMQogICAgLy8gaWYgKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjEKICAgIC8vIGlmICh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjItMzI4CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU8udmFsdWUuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMyNgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDcKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMjItMzI3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPLnZhbHVlLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzIyLTMyOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBTy52YWx1ZS5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyMToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjcgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzcKICAgIC8vIGlmICh0aGlzLm1hcmtldHBsYWNlLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM3CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZS52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzM4LTM0NAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQwCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NjMKICAgIC8vIG1hcmtldHBsYWNlID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlIH0pCiAgICBieXRlYyAyNyAvLyAibWFya2V0cGxhY2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MAogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0MgogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDIKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzgtMzQzCiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBtYXJrZXRwbGFjZSwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzOC0zNDQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTgKICAgIC8vIGlmIChidXlTaWRlTWFya2V0cGxhY2UuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OAogICAgLy8gaWYgKGJ1eVNpZGVNYXJrZXRwbGFjZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTUKICAgIHN3YXAKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAyNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTktMzY1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBidXlTaWRlTWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2MwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjMKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDUKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1OS0zNjQKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IGJ1eVNpZGVNYXJrZXRwbGFjZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogbWFya2V0cGxhY2UsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTktMzY1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBidXlTaWRlTWFya2V0cGxhY2UsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IG1hcmtldHBsYWNlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGlmICh0aGlzLnNlbGxlci52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzkKICAgIC8vIGlmICh0aGlzLnNlbGxlci52YWx1ZS5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM3OQogICAgLy8gaWYgKHRoaXMuc2VsbGVyLnZhbHVlLmlzT3B0ZWRJbih0aGlzLmJpZEFzc2V0LnZhbHVlKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBieiBjbGFpbVByaXplX2Vsc2VfYm9keUAyOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODAtMzg2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogc2VsbGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4MgogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MQogICAgLy8gc2VsbGVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlciB9KQogICAgYnl0ZWMgMTAgLy8gInNlbGxlciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgyCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM4NAogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODQKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODAtMzg1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiB0aGlzLnNlbGxlci52YWx1ZSwKICAgIC8vICAgICBhc3NldEFtb3VudDogc2VsbGVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzgwLTM4NgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5zZWxsZXIudmFsdWUsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IHNlbGxlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAwCiAgICAvLyBpZiAoIXRoaXMuaXNQcml6ZUJveC52YWx1ZSkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzUKICAgIC8vIGlzUHJpemVCb3ggPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SXNQcml6ZUJveCB9KQogICAgYnl0ZWMgOSAvLyAiaXNfcHJpemVfYm94IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDAKICAgIC8vIGlmICghdGhpcy5pc1ByaXplQm94LnZhbHVlKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMQogICAgLy8gaWYgKEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMQogICAgLy8gaWYgKEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IuaXNPcHRlZEluKHRoaXMuYmlkQXNzZXQudmFsdWUpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYXNzZXRfcGFyYW1zX2dldCBBc3NldENyZWF0b3IKICAgIGFzc2VydCAvLyBhc3NldCBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAxCiAgICAvLyBpZiAoQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvci5pc09wdGVkSW4odGhpcy5iaWRBc3NldC52YWx1ZSkpIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMzMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAyLTQwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDQKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwNAogICAgLy8gYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MDYKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDA2CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDAyLTQwNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwKICAgIC8vICAgICBhc3NldEFtb3VudDogY3JlYXRvciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQwMi00MDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGNyZWF0b3IsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA4CgpjbGFpbVByaXplX2Vsc2VfYm9keUAzMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDExCiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTEKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTIKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMgogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxNQogICAgLy8gW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBjcmVhdG9yIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMKICAgIC8vIHByaXplID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UHJpemUgfSkKICAgIGJ5dGVjXzMgLy8gInByaXplIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MTUKICAgIC8vIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgZGlnIDExCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEwLTQxOAogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogQXNzZXQodGhpcy5wcml6ZS52YWx1ZSkuY3JlYXRvciwgYW1vdW50OiBjcmVhdG9yIH1dLAogICAgLy8gICBjcmVhdG9yLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEzCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDE0CiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMC00MTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIC8vICAgY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxNwogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxMC00MTgKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IEFzc2V0KHRoaXMucHJpemUudmFsdWUpLmNyZWF0b3IsIGFtb3VudDogY3JlYXRvciB9XSwKICAgIC8vICAgY3JlYXRvciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA4CgpjbGFpbVByaXplX2Vsc2VfYm9keUAyOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg5CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODkKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTAKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTEKICAgIC8vIHNlbGxlciA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIgfSkKICAgIGJ5dGVjIDEwIC8vICJzZWxsZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5MwogICAgLy8gW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgYnl0ZWMgMTQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg4LTM5NgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgLy8gICBzZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTEKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTIKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6Mzg4LTM5NgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogdGhpcy5zZWxsZXIudmFsdWUsIGFtb3VudDogc2VsbGVyIH1dLAogICAgLy8gICBzZWxsZXIsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOTUKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozODgtMzk2CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLnNlbGxlci52YWx1ZSwgYW1vdW50OiBzZWxsZXIgfV0sCiAgICAvLyAgIHNlbGxlciwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIGNhbGxzdWIgY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudAogICAgcG9wbiAyCiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAzMAoKY2xhaW1Qcml6ZV9lbHNlX2JvZHlAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2OAogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzY5CiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjkKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzIKICAgIC8vIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIGRpZyA3CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGl0b2IKICAgIGRpZyAxOAogICAgc3dhcAogICAgY29uY2F0CiAgICBieXRlYyAxNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjctMzc1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXlTaWRlTWFya2V0cGxhY2UsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcwCiAgICAvLyAwLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcxCiAgICAvLyBNQVhfVUlOVDY0LAogICAgaW50YyA2IC8vIDE4NDQ2NzQ0MDczNzA5NTUxNjE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM2Ny0zNzUKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eVNpZGVNYXJrZXRwbGFjZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyAgIGZhbHNlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNzQKICAgIC8vIGZhbHNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNjctMzc1CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiBidXlTaWRlTWFya2V0cGxhY2UsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI3CgpjbGFpbVByaXplX2Vsc2VfYm9keUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzQ3CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDcKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDgKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0OAogICAgLy8gdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MQogICAgLy8gW3sgYWRkcmVzczogdGhpcy5tYXJrZXRwbGFjZS52YWx1ZSwgYW1vdW50OiBtYXJrZXRwbGFjZSB9XSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjYzCiAgICAvLyBtYXJrZXRwbGFjZSA9IEdsb2JhbFN0YXRlPEFjY291bnQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZSB9KQogICAgYnl0ZWMgMjcgLy8gIm1hcmtldHBsYWNlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNTEKICAgIC8vIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDgKICAgIGR1cAogICAgY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICBieXRlYyAxNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDYtMzU0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0OQogICAgLy8gMCwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MAogICAgLy8gTUFYX1VJTlQ2NCwKICAgIGludGMgNiAvLyAxODQ0Njc0NDA3MzcwOTU1MTYxNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozNDYtMzU0CiAgICAvLyBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50KAogICAgLy8gICB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgLy8gICB0aGlzLmJpZEFzc2V0LnZhbHVlLmlkLAogICAgLy8gICAwLAogICAgLy8gICBNQVhfVUlOVDY0LAogICAgLy8gICBbeyBhZGRyZXNzOiB0aGlzLm1hcmtldHBsYWNlLnZhbHVlLCBhbW91bnQ6IG1hcmtldHBsYWNlIH1dLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vICAgZmFsc2UKICAgIC8vICkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM1MwogICAgLy8gZmFsc2UKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM0Ni0zNTQKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IHRoaXMubWFya2V0cGxhY2UudmFsdWUsIGFtb3VudDogbWFya2V0cGxhY2UgfV0sCiAgICAvLyAgIG1hcmtldHBsYWNlLAogICAgLy8gICBmYWxzZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDI0CgpjbGFpbVByaXplX2Vsc2VfYm9keUAxNjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzMxCiAgICAvLyB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMzEKICAgIC8vIHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgYnVyeSAxMgogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIGJ1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1NAogICAgLy8gY29uc3QgW3BsdWdpbkFwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNQbHVnaW5BcHBMaXN0KSkKICAgIGR1cAogICAgYnl0ZWMgNjIgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjExOAogICAgLy8gY29uc3QgeyByZXZlbnVlTWFuYWdlciB9ID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBleHRyYWN0IDggOAogICAgYnVyeSAyMAogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICBidXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlYyAxNSAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgYnVyeSAxOQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIxCiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGJ1cnkgMTkKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlYyAyOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NwogICAgLy8gYXJnczogW1tuYW1lXV0sCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgYnVyeSAyMQogICAgZHVwCiAgICBsZW4KICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHB1c2hieXRlcyAweDAwMDEwMDAyCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OTUtOTgKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGFiaUNhbGw8dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9nZXRFc2Nyb3dzPih7CiAgICAvLyAgIGFwcElkLAogICAgLy8gICBhcmdzOiBbW25hbWVdXSwKICAgIC8vIH0pLnJldHVyblZhbHVlWzBdCiAgICBwdXNoYnl0ZXMgMHhhMjQwM2RkZiAvLyBtZXRob2QgImFyYzU4X2dldEVzY3Jvd3Moc3RyaW5nW10pKHVpbnQ2NCxib29sKVtdIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBwdXNoaW50IDYgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgaXR4biBMYXN0TG9nCiAgICBkdXAKICAgIGV4dHJhY3QgNCAwCiAgICBkaWcgMQogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDkKICAgICoKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8c21hcnRfY29udHJhY3RzL2FyYzU4L2FjY291bnQvdHlwZXMudHM6OkVzY3Jvd0luZm8+CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMDAKICAgIC8vIGxvZ2dlZEFzc2VydChlc2Nyb3cuaWQgIT09IDAsIEVSUl9FU0NST1dfRE9FU19OT1RfRVhJU1QpCiAgICBleHRyYWN0IDYgOQogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDY0CiAgICBkdXAKICAgIGJ1cnkgOQogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDU4CiAgICBwdXNoYnl0ZXMgIkVSUjpORVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FU0MKCmNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDU4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIyCiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPT09IGVzY3Jvdy5hcHAuaWQsIEVSUl9XUk9OR19FU0NST1dfRk9SX09QRVJBVElPTikKICAgIGRpZyAxNQogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDMKICAgIGRpZyA4CiAgICA9PQogICAgYm56IGNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDE4CiAgICBwdXNoYnl0ZXMgIkVSUjpXRVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOldFU0MKCmNsYWltUHJpemVfYWZ0ZXJfYXNzZXJ0QDE4OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTcKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzAKICAgIC8vIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIHB1c2hieXRlcyAweDAwMDEwMDAwMDAwMDAwMDAwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTMxCiAgICAvLyBbXQogICAgYnl0ZWMgNTkgLy8gMHgwMDAwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTI0LTEzMwogICAgLy8gaXR4bkNvbXBvc2UuYmVnaW48dHlwZW9mIEFic3RyYWN0ZWRBY2NvdW50LnByb3RvdHlwZS5hcmM1OF9yZWtleVRvUGx1Z2luPih7CiAgICAvLyAgIGFwcElkOiB3YWxsZXQsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICByZXZlbnVlTWFuYWdlciwKICAgIC8vICAgICBDYWxsZXJUeXBlR2xvYmFsLAogICAgLy8gICAgIGVzY3Jvdy5uYW1lLAogICAgLy8gICAgIFswXSwgLy8gYWxsIHRoZSBha2l0YSBlc2Nyb3dzIGhhdmUgbWV0aG9kIHJlc3RyaWN0aW9ucyB3aXRoIG9wdGluIGJlaW5nIGluZGV4IDAKICAgIC8vICAgICBbXQogICAgLy8gICBdLAogICAgLy8gfSkKICAgIHB1c2hpbnQgNiAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNgogICAgLy8gdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBidXJ5IDE0CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzcKICAgIC8vIGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMgogICAgLy8gbGV0IGNvdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAxMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjQKICAgIC8vIGlmICghZXNjcm93LmlzT3B0ZWRJbihhc3NldCkpIHsKICAgIGRpZyAxMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANTQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTAzCiAgICAvLyBjb25zdCBbc3BsaXRzQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUmV2ZW51ZVNwbGl0cykpCiAgICBkaWcgMTIKICAgIHB1c2hieXRlcyAicmV2ZW51ZV9zcGxpdHMiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyOAogICAgLy8gY291bnQgKz0gc3BsaXRzLmxlbmd0aAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI1CiAgICAvLyBjb3VudCArPSAxCiAgICBpbnRjXzEgLy8gMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgICsKICAgIGJ1cnkgMTAKCmNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUA1NDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0MQogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxMAogICAgKgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNTAKICAgIC8vIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICBkaWcgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OS0xNTIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHdhbGxldCwKICAgIGR1cG4gMgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ4CiAgICAvLyBbYXNzZXQuaWRdLAogICAgZGlnIDEyCiAgICBpdG9iCiAgICBieXRlYyAxNCAvLyAweDAwMDEKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGJ5dGVzIDB4NjgzNWUzYmMgLy8gbWV0aG9kICJvcHRJbih1aW50NjQsYm9vbCx1aW50NjRbXSxwYXkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQ3CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU2CiAgICAvLyBpdHhuQ29tcG9zZS5uZXh0PHR5cGVvZiBBYnN0cmFjdGVkQWNjb3VudC5wcm90b3R5cGUuYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3M+KHsgYXBwSWQ6IHdhbGxldCB9KQogICAgaXR4bl9uZXh0CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIHB1c2hieXRlcyAweDZjYzNmNjA2IC8vIG1ldGhvZCAiYXJjNThfdmVyaWZ5QXV0aEFkZHJlc3MoKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU4CiAgICAvLyBpZiAoYW1vdW50ID4gMCkgewogICAgZGlnIDYKICAgIGJ6IGNsYWltUHJpemVfYWZ0ZXJfaWZfZWxzZUAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTU5LTE2NQogICAgLy8gaXR4bkNvbXBvc2UubmV4dCgKICAgIC8vICAgaXR4bi5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0LAogICAgLy8gICB9KQogICAgLy8gKQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjEKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIGRpZyAxCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTEKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgNwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNjAtMTY0CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFzc2V0QW1vdW50OiBhbW91bnQsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQsCiAgICAvLyB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQoKY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDIwOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTY4CiAgICAvLyBpdHhuQ29tcG9zZS5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pZl9lbHNlQDIxCgpjbGFpbVByaXplX2lmX2JvZHlAMTM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMTcKICAgIC8vICh7IGxlZnRvdmVyIH0gPSBzZW5kUmVmZXJyYWxQYXltZW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYmlkQXNzZXQudmFsdWUuaWQsIGFraXRhQW1vdW50KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMxNwogICAgLy8gKHsgbGVmdG92ZXIgfSA9IHNlbmRSZWZlcnJhbFBheW1lbnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5iaWRBc3NldC52YWx1ZS5pZCwgYWtpdGFBbW91bnQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxNQogICAgY2FsbHN1YiBzZW5kUmVmZXJyYWxQYXltZW50CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgNwogICAgYiBjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VAMTQKCmNsYWltUHJpemVfdGVybmFyeV9mYWxzZUAxMToKICAgIGJ1cnkgMTQKICAgIGIgY2xhaW1Qcml6ZV90ZXJuYXJ5X21lcmdlQDEyCgpjbGFpbVByaXplX2FmdGVyX2lmX2Vsc2VANDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNAogICAgLy8gY29uc3QgcHJpemVBbW91bnQgPSBvcC5Bc3NldEhvbGRpbmcuYXNzZXRCYWxhbmNlKEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCB0aGlzLnByaXplLnZhbHVlKVswXQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM0CiAgICAvLyBjb25zdCBwcml6ZUFtb3VudCA9IG9wLkFzc2V0SG9sZGluZy5hc3NldEJhbGFuY2UoR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIHRoaXMucHJpemUudmFsdWUpWzBdCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgZGlnIDEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgcG9wCiAgICBidXJ5IDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM2CiAgICAvLyBpZiAoYnV5ZXIuaXNPcHRlZEluKEFzc2V0KHRoaXMucHJpemUudmFsdWUpKSkgewogICAgZGlnIDIwCiAgICBzd2FwCiAgICBhc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKICAgIGJ1cnkgMQogICAgYnogY2xhaW1Qcml6ZV9lbHNlX2JvZHlANDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM3LTI0MgogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDAKICAgIC8vIHhmZXJBc3NldDogdGhpcy5wcml6ZS52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjMzCiAgICAvLyBwcml6ZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVByaXplIH0pCiAgICBieXRlY18zIC8vICJwcml6ZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQwCiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGRpZyAxOQogICAgaXR4bl9maWVsZCBBc3NldENsb3NlVG8KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjM3LTI0MQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRDbG9zZVRvOiBidXllciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIzNy0yNDIKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0Q2xvc2VUbzogYnV5ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLnByaXplLnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICBiIGNsYWltUHJpemVfYWZ0ZXJfaW5saW5lZF9zbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnRyYW5zZmVyUHVyY2hhc2VUb0J1eWVyQDUxCgpjbGFpbVByaXplX2Vsc2VfYm9keUA0OToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ1CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDUKICAgIC8vIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDYKICAgIC8vIHRoaXMucHJpemUudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozMwogICAgLy8gcHJpemUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZSB9KQogICAgYnl0ZWNfMyAvLyAicHJpemUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NgogICAgLy8gdGhpcy5wcml6ZS52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0OQogICAgLy8gW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICBkaWcgNgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpdG9iCiAgICBkaWcgMjMKICAgIHN3YXAKICAgIGNvbmNhdAogICAgYnl0ZWMgMTQgLy8gMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ0LTI1MgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDcKICAgIC8vIDAsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNDgKICAgIC8vIE1BWF9VSU5UNjQsCiAgICBpbnRjIDYgLy8gMTg0NDY3NDQwNzM3MDk1NTE2MTUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjQ0LTI1MgogICAgLy8gY3JlYXRlSW5zdGFudERpc2J1cnNlbWVudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgdGhpcy5wcml6ZS52YWx1ZSwKICAgIC8vICAgMCwKICAgIC8vICAgTUFYX1VJTlQ2NCwKICAgIC8vICAgW3sgYWRkcmVzczogYnV5ZXIsIGFtb3VudDogcHJpemVBbW91bnQgfV0sCiAgICAvLyAgIHByaXplQW1vdW50LAogICAgLy8gICB0cnVlCiAgICAvLyApCiAgICB1bmNvdmVyIDQKICAgIHVuY292ZXIgNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyNTEKICAgIC8vIHRydWUKICAgIGludGNfMSAvLyAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjI0NC0yNTIKICAgIC8vIGNyZWF0ZUluc3RhbnREaXNidXJzZW1lbnQoCiAgICAvLyAgIHRoaXMuYWtpdGFEQU8udmFsdWUsCiAgICAvLyAgIHRoaXMucHJpemUudmFsdWUsCiAgICAvLyAgIDAsCiAgICAvLyAgIE1BWF9VSU5UNjQsCiAgICAvLyAgIFt7IGFkZHJlc3M6IGJ1eWVyLCBhbW91bnQ6IHByaXplQW1vdW50IH1dLAogICAgLy8gICBwcml6ZUFtb3VudCwKICAgIC8vICAgdHJ1ZQogICAgLy8gKQogICAgY2FsbHN1YiBjcmVhdGVJbnN0YW50RGlzYnVyc2VtZW50CiAgICBwb3BuIDIKICAgIGIgY2xhaW1Qcml6ZV9hZnRlcl9pbmxpbmVkX3NtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24udHJhbnNmZXJQdXJjaGFzZVRvQnV5ZXJANTEKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmNsYWltUmFmZmxlUHJpemVbcm91dGluZ10oKSAtPiB2b2lkOgpjbGFpbVJhZmZsZVByaXplOgogICAgYnl0ZWNfMiAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OTcKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSAhPT0gR2xvYmFsLnplcm9BZGRyZXNzLCBFUlJfV0lOTkVSX05PVF9GT1VORCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEwOAogICAgLy8gcmFmZmxlV2lubmVyID0gR2xvYmFsU3RhdGU8QWNjb3VudD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZVdpbm5lciB9KQogICAgYnl0ZWMgMTYgLy8gInJhZmZsZV93aW5uZXIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlV2lubmVyLnZhbHVlICE9PSBHbG9iYWwuemVyb0FkZHJlc3MsIEVSUl9XSU5ORVJfTk9UX0ZPVU5EKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGdsb2JhbCBaZXJvQWRkcmVzcwogICAgIT0KICAgIGJueiBjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA2MSAvLyAiRVJSOldORkQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6V05GRAoKY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk4CiAgICAvLyBsb2dnZWRBc3NlcnQoIXRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUkFGRkxFX0FMUkVBRFlfUFJJWkVfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyNCAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg5OAogICAgLy8gbG9nZ2VkQXNzZXJ0KCF0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9BTFJFQURZX1BSSVpFX0NMQUlNRUQpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6UkFQQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSQVBDCgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDAKICAgIC8vIGNvbnN0IHsgYXVjdGlvblJhZmZsZVBlcmNlbnRhZ2UgfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAwCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlIH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo5MwogICAgLy8gY29uc3QgW25mdEZlZXNCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNORlRGZWVzKSkKICAgIGJ5dGVjIDQwIC8vICJuZnRfZmVlcyIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAwCiAgICAvLyBjb25zdCB7IGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlIH0gPSBnZXRORlRGZWVzKHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBwdXNoaW50IDgwCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDEKICAgIC8vIGNvbnN0IGFraXRhRmVlID0gY2FsY1BlcmNlbnQodGhpcy5yYWZmbGVBbW91bnQudmFsdWUsIGF1Y3Rpb25SYWZmbGVQZXJjZW50YWdlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOSAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTAxCiAgICAvLyBjb25zdCBha2l0YUZlZSA9IGNhbGNQZXJjZW50KHRoaXMucmFmZmxlQW1vdW50LnZhbHVlLCBhdWN0aW9uUmFmZmxlUGVyY2VudGFnZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGRpZyAxCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZHVwCiAgICB1bmNvdmVyIDIKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgYnVyeSAzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwMgogICAgLy8gY29uc3QgbGVmdG92ZXI6IHVpbnQ2NCA9IHRoaXMucmFmZmxlQW1vdW50LnZhbHVlIC0gYWtpdGFGZWUKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA0CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MDQKICAgIC8vIGlmICh0aGlzLmJpZEFzc2V0LnZhbHVlLmlkID09PSAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYm56IGNsYWltUmFmZmxlUHJpemVfZWxzZV9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1LTkxMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwNwogICAgLy8gcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMTUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA3CiAgICAvLyByZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1LTkwOQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTA1LTkxMAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiBha2l0YUZlZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MTItOTE3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICAvLyAgICAgYW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxNAogICAgLy8gcmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxNiAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTE0CiAgICAvLyByZWNlaXZlcjogdGhpcy5yYWZmbGVXaW5uZXIudmFsdWUsCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTEyLTkxNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgLy8gICAgIGFtb3VudDogbGVmdG92ZXIsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkxMi05MTcKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIC8vICAgICBhbW91bnQ6IGxlZnRvdmVyLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpjbGFpbVJhZmZsZVByaXplX2FmdGVyX2lmX2Vsc2VAMTI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyNCAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0MAogICAgLy8gdGhpcy5yYWZmbGVQcml6ZUNsYWltZWQudmFsdWUgPSB0cnVlCiAgICBpbnRjXzEgLy8gMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODk2CiAgICAvLyBjbGFpbVJhZmZsZVByaXplKCk6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKY2xhaW1SYWZmbGVQcml6ZV9lbHNlX2JvZHlAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIzLTkyOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYWtpdGFGZWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTI1CiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlLmFwcC5hZGRyZXNzLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjIDE1IC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNQogICAgLy8gYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDIKICAgIGV4dHJhY3RfdWludDY0CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyNwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzkKICAgIC8vIGJpZEFzc2V0ID0gR2xvYmFsU3RhdGU8QXNzZXQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRBc3NldCB9KQogICAgYnl0ZWNfMCAvLyAiYmlkX2Fzc2V0IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MjcKICAgIC8vIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBkaWcgMwogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyMy05MjgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFraXRhRmVlLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIGludGNfMyAvLyA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIzLTkyOQogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywKICAgIC8vICAgICBhc3NldEFtb3VudDogYWtpdGFGZWUsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzMS05MzcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MzMKICAgIC8vIGFzc2V0UmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTA4CiAgICAvLyByYWZmbGVXaW5uZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlV2lubmVyIH0pCiAgICBieXRlYyAxNiAvLyAicmFmZmxlX3dpbm5lciIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTMzCiAgICAvLyBhc3NldFJlY2VpdmVyOiB0aGlzLnJhZmZsZVdpbm5lci52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzMS05MzYKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkzMS05MzcKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMucmFmZmxlV2lubmVyLnZhbHVlLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBsZWZ0b3ZlciwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIGIgY2xhaW1SYWZmbGVQcml6ZV9hZnRlcl9pZl9lbHNlQDEyCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5jbGVhcldlaWdodHNCb3hlc1tyb3V0aW5nXSgpIC0+IHZvaWQ6CmNsZWFyV2VpZ2h0c0JveGVzOgogICAgYnl0ZWNfMiAvLyAiIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDMKICAgIC8vIGNsZWFyV2VpZ2h0c0JveGVzKGl0ZXJhdGlvbkFtb3VudDogdWludDY0KTogdWludDY0IHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgNCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ0CiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlLCBFUlJfQVVDVElPTl9IQVNfTk9UX0VOREVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID4KICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMzYgLy8gIkVSUjpBSE5FIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkFITkUKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MzcKICAgIC8vIHByaXplQ2xhaW1lZCA9IEdsb2JhbFN0YXRlPGJvb2xlYW4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlQcml6ZUNsYWltZWQgfSkKICAgIGJ5dGVjIDIxIC8vICJwcml6ZV9jbGFpbWVkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDUKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1BSSVpFX05PVF9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRANQogICAgYnl0ZWMgNDEgLy8gIkVSUjpQWk5DIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlBaTkMKCmNsZWFyV2VpZ2h0c0JveGVzX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NDYKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLnJhZmZsZVByaXplQ2xhaW1lZC52YWx1ZSwgRVJSX1JBRkZMRV9OT1RfUFJJWkVfQ0xBSU1FRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgzCiAgICAvLyByYWZmbGVQcml6ZUNsYWltZWQgPSBHbG9iYWxTdGF0ZTxib29sZWFuPih7IGluaXRpYWxWYWx1ZTogZmFsc2UsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlUHJpemVDbGFpbWVkIH0pCiAgICBieXRlYyAyNCAvLyAicmFmZmxlX3ByaXplX2NsYWltZWQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk0NgogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMucmFmZmxlUHJpemVDbGFpbWVkLnZhbHVlLCBFUlJfUkFGRkxFX05PVF9QUklaRV9DTEFJTUVEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRANwogICAgcHVzaGJ5dGVzICJFUlI6Uk5QQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpSTlBDCgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQ4CiAgICAvLyBlbnN1cmVCdWRnZXQoKGl0ZXJhdGlvbkFtb3VudCAqIDMwKSkKICAgIGR1cAogICAgcHVzaGludCAzMAogICAgKgogICAgaW50Y18wIC8vIDAKICAgIGNhbGxzdWIgZW5zdXJlX2J1ZGdldAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTAKICAgIC8vIGZvciAobGV0IGk6IHVpbnQ2NCA9IDA7IGkgPCBpdGVyYXRpb25BbW91bnQ7IGkgKz0gMSkgewogICAgaW50Y18wIC8vIDAKICAgIGJ1cnkgMgoKY2xlYXJXZWlnaHRzQm94ZXNfd2hpbGVfdG9wQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBkdXAyCiAgICA8CiAgICBieiBjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUAxMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NTEKICAgIC8vIGNvbnN0IHJpOiB1aW50NjQgPSAodGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUgLSAxKSAtIGkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUxCiAgICAvLyBjb25zdCByaTogdWludDY0ID0gKHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlIC0gMSkgLSBpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18xIC8vIDEKICAgIC0KICAgIGRpZyAyCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTUyCiAgICAvLyB0aGlzLndlaWdodHMocmkpLmRlbGV0ZSgpCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1MgogICAgLy8gdGhpcy53ZWlnaHRzKHJpKS5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1MAogICAgLy8gZm9yIChsZXQgaTogdWludDY0ID0gMDsgaSA8IGl0ZXJhdGlvbkFtb3VudDsgaSArPSAxKSB7CiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgYnVyeSAyCiAgICBiIGNsZWFyV2VpZ2h0c0JveGVzX3doaWxlX3RvcEA4CgpjbGVhcldlaWdodHNCb3hlc19hZnRlcl93aGlsZUAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtPSBpdGVyYXRpb25BbW91bnQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtPSBpdGVyYXRpb25BbW91bnQKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkwCiAgICAvLyB3ZWlnaHRzQm94Q291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRzQm94Q291bnQgfSkKICAgIGJ5dGVjIDEyIC8vICJ3ZWlnaHRzX2JveF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU1CiAgICAvLyB0aGlzLndlaWdodHNCb3hDb3VudC52YWx1ZSAtPSBpdGVyYXRpb25BbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1NwogICAgLy8gY29uc3QgcmV0dXJuQW1vdW50OiB1aW50NjQgPSBpdGVyYXRpb25BbW91bnQgKiB0aGlzLm1icigpLndlaWdodHMKICAgIGludGMgMTQgLy8gMTMxMTMzMDAKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTU5LTk2NAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IHJldHVybkFtb3VudCwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk2MQogICAgLy8gcmVjZWl2ZXI6IEdsb2JhbC5jcmVhdG9yQWRkcmVzcywKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1OS05NjMKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk1OS05NjQKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoewogICAgLy8gICAgIHJlY2VpdmVyOiBHbG9iYWwuY3JlYXRvckFkZHJlc3MsCiAgICAvLyAgICAgYW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTQzCiAgICAvLyBjbGVhcldlaWdodHNCb3hlcyhpdGVyYXRpb25BbW91bnQ6IHVpbnQ2NCk6IHVpbnQ2NCB7CiAgICBpdG9iCiAgICBieXRlYyA3IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmVbcm91dGluZ10oKSAtPiB2b2lkOgppc0xpdmU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3MgogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlCiAgICBieXRlYyA0MyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmhhc0JpZFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cmhhc0JpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgxCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBwdXNoaW50IDMyCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnN0YXRpY19hcnJheTxhcmM0LnVpbnQ4LCAzMj4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTgzCiAgICAvLyByZXR1cm4gdGhpcy5iaWRzQnlBZGRyZXNzKGFkZHJlc3MpLmV4aXN0cwogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4MQogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBieXRlYyA0MyAvLyAweDAwCiAgICBpbnRjXzAgLy8gMAogICAgdW5jb3ZlciAyCiAgICBzZXRiaXQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnRbcm91dGluZ10oKSAtPiB2b2lkOgpnZXRNaW5pbXVtQmlkQW1vdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODYKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIGl0b2IKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRob3V0QWtpdGFPcHRJbi51cGRhdGVBa2l0YURBT0VzY3Jvd1tyb3V0aW5nXSgpIC0+IHZvaWQ6CnVwZGF0ZUFraXRhREFPRXNjcm93OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXBuIDIKICAgIGxlbgogICAgZGlnIDEKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCB0dXBsZSBlbmNvZGluZwogICAgZHVwCiAgICBwdXNoaW50IDEwCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgdGFpbCBwb2ludGVyIGF0IGluZGV4IDAgb2YgKChsZW4rdXRmOFtdKSx1aW50NjQpCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODUKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWMgMjkgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNDQgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCnVwZGF0ZUFraXRhREFPRXNjcm93X2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWMgMTUgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg2CiAgICAvLyB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlID0gY2xvbmUoY29uZmlnKQogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NAogICAgLy8gdXBkYXRlQWtpdGFEQU9Fc2Nyb3coY29uZmlnOiBFc2Nyb3dDb25maWcpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6VXBncmFkZWFibGVBa2l0YUJhc2VDb250cmFjdC51cGRhdGVbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMSAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjIDI5IC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0NCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18xIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgYnl0ZWMgNjIgLy8gInBhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgcHVzaGludCAxNgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQoR2xvYmFsLmNhbGxlckFwcGxpY2F0aW9uSWQgPT09IHVwZGF0ZVBsdWdpbiwgRVJSX0lOVkFMSURfVVBHUkFERSkKICAgIGdsb2JhbCBDYWxsZXJBcHBsaWNhdGlvbklECiAgICA9PQogICAgYm56IHVwZGF0ZV9hZnRlcl9hc3NlcnRANQogICAgcHVzaGJ5dGVzICJFUlI6SVVQRyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJVVBHCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNQogICAgLy8gdmVyc2lvbiA9IEdsb2JhbFN0YXRlPHN0cmluZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5VmVyc2lvbiB9KQogICAgYnl0ZWMgNTEgLy8gInZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo1MQogICAgLy8gdGhpcy52ZXJzaW9uLnZhbHVlID0gbmV3VmVyc2lvbgogICAgZGlnIDEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0NgogICAgLy8gQGFiaW1ldGhvZCh7IGFsbG93QWN0aW9uczogWydVcGRhdGVBcHBsaWNhdGlvbiddIH0pCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUNvbnRyYWN0LnVwZGF0ZUFraXRhREFPW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlQWtpdGFEQU86CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNgogICAgLy8gdXBkYXRlQWtpdGFEQU8oYWtpdGFEQU86IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozNwogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlYyAyOSAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzcKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IHVwZGF0ZUFraXRhREFPX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA0NCAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo6Q29udHJhY3RXaXRoQ3JlYXRvck9ubHlPcHRJbi5vcHRpbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdGluOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ4CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfRk9SQklEREVOKQogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpGT1JCIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkZPUkIKCm9wdGluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlRfUkVDRUlWRVIpCiAgICBkaWcgMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdGluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdGluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUxCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSwgRVJSX0lOVkFMSURfUEFZTUVOVF9BTU9VTlQpCiAgICBkaWcgMQogICAgZ3R4bnMgQW1vdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgID09CiAgICBibnogb3B0aW5fYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOklQTUEiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBNQQoKb3B0aW5fYWZ0ZXJfYXNzZXJ0QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTMtNTcKICAgIC8vIGl0eG4uYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICBhc3NldEFtb3VudDogMCwKICAgIC8vICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gfSkuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9vcHRpbi50czo1NAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDEKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvb3B0aW4udHM6NTUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjUzLTU3CiAgICAvLyBpdHhuLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICBhc3NldFJlY2VpdmVyOiBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywKICAgIC8vICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vIH0pLnN1Ym1pdCgpCiAgICBpbnRjXzMgLy8gNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL29wdGluLnRzOjQ3CiAgICAvLyBvcHRpbihwYXltZW50OiBndHhuLlBheW1lbnRUeG4sIGFzc2V0OiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLm5ld0JpZElEKCkgLT4gdWludDY0OgpuZXdCaWRJRDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBjb25zdCBpZCA9IHRoaXMuYmlkSUQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM2CiAgICAvLyBjb25zdCBpZCA9IHRoaXMuYmlkSUQudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzNwogICAgLy8gdGhpcy5iaWRJRC52YWx1ZSArPSAxCiAgICBkdXAKICAgIGludGNfMSAvLyAxCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTM3CiAgICAvLyB0aGlzLmJpZElELnZhbHVlICs9IDEKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzOAogICAgLy8gcmV0dXJuIGlkCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnNldE5ld0JpZChpZDogdWludDY0LCBiaWRBbW91bnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpzZXROZXdCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0MQogICAgLy8gcHJpdmF0ZSBzZXROZXdCaWQoaWQ6IHVpbnQ2NCwgYmlkQW1vdW50OiB1aW50NjQsIG1hcmtldHBsYWNlOiBBY2NvdW50KTogdm9pZCB7CiAgICBwcm90byAzIDAKICAgIGJ5dGVjXzIgLy8gIiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQzCiAgICAvLyBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNDItMTQ3CiAgICAvLyB0aGlzLmJpZHMoaWQpLnZhbHVlID0gewogICAgLy8gICBhY2NvdW50OiBUeG4uc2VuZGVyLAogICAgLy8gICBhbW91bnQ6IGJpZEFtb3VudCwKICAgIC8vICAgcmVmdW5kZWQ6IGZhbHNlLAogICAgLy8gICBtYXJrZXRwbGFjZSwKICAgIC8vIH0KICAgIGZyYW1lX2RpZyAtMgogICAgaXRvYgogICAgZHVwCiAgICBjb3ZlciAyCiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMQogICAgY29uY2F0CiAgICBieXRlYyA0MyAvLyAweDAwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQyCiAgICAvLyB0aGlzLmJpZHMoaWQpLnZhbHVlID0gewogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMzcgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQyLTE0NwogICAgLy8gdGhpcy5iaWRzKGlkKS52YWx1ZSA9IHsKICAgIC8vICAgYWNjb3VudDogVHhuLnNlbmRlciwKICAgIC8vICAgYW1vdW50OiBiaWRBbW91bnQsCiAgICAvLyAgIHJlZnVuZGVkOiBmYWxzZSwKICAgIC8vICAgbWFya2V0cGxhY2UsCiAgICAvLyB9CiAgICBzd2FwCiAgICBib3hfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE0OQogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNiAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTQ5CiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogc2V0TmV3QmlkX2Vsc2VfYm9keUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTAKICAgIC8vIGlmICh0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUwCiAgICAvLyBpZiAodGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBieiBzZXROZXdCaWRfZWxzZV9ib2R5QDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGJ5dGVjIDggLy8gImEiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MQogICAgLy8gY29uc3QgbG9jID0gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTUxCiAgICAvLyBjb25zdCBsb2MgPSB0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikudmFsdWUKICAgIGJveF9nZXQKICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICBidG9pCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gY29uc3QgbGFzdEJpZCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgZHVwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMgogICAgLy8gd2VpZ2h0cyA9IEJveE1hcDx1aW50NjQsIFdlaWdodHNMaXN0Pih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeFdlaWdodHMgfSkKICAgIGJ5dGVjIDI4IC8vICJ3IgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1MgogICAgLy8gY29uc3QgbGFzdEJpZCA9IHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgdW5jb3ZlciAyCiAgICBpbnRjIDUgLy8gNDA5NgogICAgJQogICAgaW50Y18yIC8vIDgKICAgICoKICAgIGR1cDIKICAgIGludGNfMiAvLyA4CiAgICBib3hfZXh0cmFjdCAvLyBvbiBlcnJvcjogaW5kZXggb3V0IG9mIGJvdW5kcwogICAgYnRvaQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTMKICAgIC8vIGNvbnN0IGRpZmZlcmVuY2U6IHVpbnQ2NCA9IGJpZEFtb3VudCAtIGxhc3RCaWQKICAgIGZyYW1lX2RpZyAtMgogICAgc3dhcAogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTQKICAgIC8vIGNvbnN0IGxhc3RXZWlnaHRlZFRvdGFsID0gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXS5hc1VpbnQ2NCgpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MgogICAgLy8gd2VpZ2h0VG90YWxzID0gR2xvYmFsU3RhdGU8U3RhdGljQXJyYXk8VWludDY0LCAxNT4+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRUb3RhbHMgfSkKICAgIGJ5dGVjIDExIC8vICJ3X3RvdGFscyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU0CiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgNAogICAgaW50Y18yIC8vIDgKICAgICoKICAgIHN3YXAKICAgIGRpZyAxCiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBkaWZmZXJlbmNlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NQogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTcgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU2CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gZGlmZmVyZW5jZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxNyAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTYKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBkaWZmZXJlbmNlCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTcKICAgIC8vIHRoaXMud2VpZ2h0cyhsb2MgLyBDaHVua1NpemUpLnZhbHVlW2xvYyAlIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGJpZEFtb3VudCkKICAgIHVuY292ZXIgNAogICAgdW5jb3ZlciA0CiAgICBmcmFtZV9kaWcgMQogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTU4CiAgICAvLyB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChsYXN0V2VpZ2h0ZWRUb3RhbCArIGRpZmZlcmVuY2UpCiAgICB1bmNvdmVyIDIKICAgICsKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNTgKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGxhc3RXZWlnaHRlZFRvdGFsICsgZGlmZmVyZW5jZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBjb3ZlciAyCiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMSAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE1OAogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBkaWZmZXJlbmNlKQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCnNldE5ld0JpZF9hZnRlcl9pZl9lbHNlQDEwOgogICAgcmV0c3ViCgpzZXROZXdCaWRfZWxzZV9ib2R5QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MAogICAgLy8gY29uc3QgbG9jID0gdGhpcy51bmlxdWVBZGRyZXNzQ291bnQudmFsdWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjUgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjAKICAgIC8vIGNvbnN0IGxvYyA9IHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgc3dhcAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBmcmFtZV9idXJ5IDAKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYxCiAgICAvLyBsb2dnZWRBc3NlcnQobG9jIDwgQ2h1bmtTaXplICogdGhpcy53ZWlnaHRzQm94Q291bnQudmFsdWUsIEVSUl9UT09fTUFOWV9QQVJUSUNJUEFOVFMpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5MAogICAgLy8gd2VpZ2h0c0JveENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0c0JveENvdW50IH0pCiAgICBieXRlYyAxMiAvLyAid2VpZ2h0c19ib3hfY291bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGxvYyA8IENodW5rU2l6ZSAqIHRoaXMud2VpZ2h0c0JveENvdW50LnZhbHVlLCBFUlJfVE9PX01BTllfUEFSVElDSVBBTlRTKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGMgNSAvLyA0MDk2CiAgICAqCiAgICA8CiAgICBibnogc2V0TmV3QmlkX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpUTVBUIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOlRNUFQKCnNldE5ld0JpZF9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTYyCiAgICAvLyBjb25zdCBsYXN0V2VpZ2h0ZWRUb3RhbCA9IHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0uYXNVaW50NjQoKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMSAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2MgogICAgLy8gY29uc3QgbGFzdFdlaWdodGVkVG90YWwgPSB0aGlzLndlaWdodFRvdGFscy52YWx1ZVtsb2MgLyBDaHVua1NpemVdLmFzVWludDY0KCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBmcmFtZV9kaWcgMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLwogICAgZHVwCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgdW5jb3ZlciAyCiAgICBkaWcgMQogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gYmlkQW1vdW50CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NQogICAgLy8gd2VpZ2h0ZWRCaWRUb3RhbCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0ZWRCaWRUb3RhbCB9KQogICAgYnl0ZWMgMTcgLy8gIndlaWdodGVkX2JpZF90b3RhbCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY0CiAgICAvLyB0aGlzLndlaWdodGVkQmlkVG90YWwudmFsdWUgKz0gYmlkQW1vdW50CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZnJhbWVfZGlnIC0yCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc1CiAgICAvLyB3ZWlnaHRlZEJpZFRvdGFsID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlXZWlnaHRlZEJpZFRvdGFsIH0pCiAgICBieXRlYyAxNyAvLyAid2VpZ2h0ZWRfYmlkX3RvdGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjQKICAgIC8vIHRoaXMud2VpZ2h0ZWRCaWRUb3RhbC52YWx1ZSArPSBiaWRBbW91bnQKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjUKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IGxvYwogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NQogICAgLy8gdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLnZhbHVlID0gbG9jCiAgICBkaWcgNAogICAgaXRvYgogICAgc3dhcAogICAgZGlnIDEKICAgIGJveF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY2CiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChiaWRBbW91bnQpCiAgICB1bmNvdmVyIDMKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTIyCiAgICAvLyB3ZWlnaHRzID0gQm94TWFwPHVpbnQ2NCwgV2VpZ2h0c0xpc3Q+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4V2VpZ2h0cyB9KQogICAgYnl0ZWMgMjggLy8gInciCiAgICBzd2FwCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY2CiAgICAvLyB0aGlzLndlaWdodHMobG9jIC8gQ2h1bmtTaXplKS52YWx1ZVtsb2MgJSBDaHVua1NpemVdID0gbmV3IFVpbnQ2NChiaWRBbW91bnQpCiAgICB1bmNvdmVyIDQKICAgIGludGMgNSAvLyA0MDk2CiAgICAlCiAgICBpbnRjXzIgLy8gOAogICAgKgogICAgZnJhbWVfZGlnIDEKICAgIGJveF9yZXBsYWNlIC8vIG9uIGVycm9yOiBpbmRleCBvdXQgb2YgYm91bmRzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBiaWRBbW91bnQpCiAgICBzd2FwCiAgICBmcmFtZV9kaWcgLTIKICAgICsKICAgIGl0b2IKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjkyCiAgICAvLyB3ZWlnaHRUb3RhbHMgPSBHbG9iYWxTdGF0ZTxTdGF0aWNBcnJheTxVaW50NjQsIDE1Pj4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVdlaWdodFRvdGFscyB9KQogICAgYnl0ZWMgMTEgLy8gIndfdG90YWxzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjcKICAgIC8vIHRoaXMud2VpZ2h0VG90YWxzLnZhbHVlW2xvYyAvIENodW5rU2l6ZV0gPSBuZXcgVWludDY0KGxhc3RXZWlnaHRlZFRvdGFsICsgYmlkQW1vdW50KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAyCiAgICByZXBsYWNlMyAvLyBvbiBlcnJvcjogaW5kZXggYWNjZXNzIGlzIG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTIKICAgIC8vIHdlaWdodFRvdGFscyA9IEdsb2JhbFN0YXRlPFN0YXRpY0FycmF5PFVpbnQ2NCwgMTU+Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5V2VpZ2h0VG90YWxzIH0pCiAgICBieXRlYyAxMSAvLyAid190b3RhbHMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE2NwogICAgLy8gdGhpcy53ZWlnaHRUb3RhbHMudmFsdWVbbG9jIC8gQ2h1bmtTaXplXSA9IG5ldyBVaW50NjQobGFzdFdlaWdodGVkVG90YWwgKyBiaWRBbW91bnQpCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjgKICAgIC8vIHRoaXMubG9jYXRpb25zKGxvYykudmFsdWUgPSBUeG4uc2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEzMQogICAgLy8gbG9jYXRpb25zID0gQm94TWFwPHVpbnQ2NCwgQWNjb3VudD4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhMb2NhdGlvbnMgfSkKICAgIGJ5dGVjIDQyIC8vICJsIgogICAgdW5jb3ZlciAyCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY4CiAgICAvLyB0aGlzLmxvY2F0aW9ucyhsb2MpLnZhbHVlID0gVHhuLnNlbmRlcgogICAgc3dhcAogICAgYm94X3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlICs9IDEKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjg4CiAgICAvLyB1bmlxdWVBZGRyZXNzQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVVuaXF1ZUFkZHJlc3NDb3VudCB9KQogICAgYnl0ZWMgMjUgLy8gInVuaXF1ZV9hZGRyZXNzX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNjkKICAgIC8vIHRoaXMudW5pcXVlQWRkcmVzc0NvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4OAogICAgLy8gdW5pcXVlQWRkcmVzc0NvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlVbmlxdWVBZGRyZXNzQ291bnQgfSkKICAgIGJ5dGVjIDI1IC8vICJ1bmlxdWVfYWRkcmVzc19jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTY5CiAgICAvLyB0aGlzLnVuaXF1ZUFkZHJlc3NDb3VudC52YWx1ZSArPSAxCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpzZXROZXdCaWRfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIH0gZWxzZSBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzEKICAgIC8vIH0gZWxzZSBpZiAoIXRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS5leGlzdHMpIHsKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNldE5ld0JpZF9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IDAKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTI3CiAgICAvLyBiaWRzQnlBZGRyZXNzID0gQm94TWFwPEFjY291bnQsIFdlaWdodExvY2F0aW9uPih7IGtleVByZWZpeDogQXVjdGlvbkJveFByZWZpeEJpZHNCeUFkZHJlc3MgfSkKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxNzMKICAgIC8vIHRoaXMuYmlkc0J5QWRkcmVzcyhUeG4uc2VuZGVyKS52YWx1ZSA9IDAKICAgIGludGNfMCAvLyAwCiAgICBpdG9iCiAgICBib3hfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldEJpZEZlZShhbW91bnQ6IHVpbnQ2NCkgLT4gdWludDY0OgpnZXRCaWRGZWU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3NwogICAgLy8gcHJpdmF0ZSBnZXRCaWRGZWUoYW1vdW50OiB1aW50NjQpOiB1aW50NjQgewogICAgcHJvdG8gMSAxCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gY29uc3QgZmVlID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmJpZEZlZS52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDYgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3OAogICAgLy8gY29uc3QgZmVlID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmJpZEZlZS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYm56IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDYgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE3OQogICAgLy8gaWYgKGZlZSA9PT0gMCAmJiB0aGlzLmJpZEZlZS52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEJpZEZlZV9hZnRlcl9pZl9lbHNlQDQKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QmlkRmVlX2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODAKICAgIC8vIHJldHVybiAxCiAgICBpbnRjXzEgLy8gMQogICAgc3dhcAogICAgcmV0c3ViCgpnZXRCaWRGZWVfYWZ0ZXJfaWZfZWxzZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODIKICAgIC8vIHJldHVybiBmZWUKICAgIGZyYW1lX2RpZyAwCiAgICBzd2FwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldEFtb3VudHMoYW1vdW50OiB1aW50NjQpIC0+IGJ5dGVzOgpnZXRBbW91bnRzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxODUKICAgIC8vIHByaXZhdGUgZ2V0QW1vdW50cyhhbW91bnQ6IHVpbnQ2NCk6IFJveWFsdHlBbW91bnRzIHsKICAgIHByb3RvIDEgMQogICAgYnl0ZWNfMiAvLyAiIgogICAgZHVwbiA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4NwogICAgLy8gbGV0IGNyZWF0b3JBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4OAogICAgLy8gaWYgKHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDMzIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4OAogICAgLy8gaWYgKHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDYKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTg5CiAgICAvLyBjcmVhdG9yQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTMKICAgIC8vIGNyZWF0b3JSb3lhbHR5ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5Q3JlYXRvclJveWFsdHkgfSkKICAgIGJ5dGVjIDMzIC8vICJjcmVhdG9yX3JveWFsdHkiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE4OQogICAgLy8gY3JlYXRvckFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5jcmVhdG9yUm95YWx0eS52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOAogICAgLy8gYXNzZXJ0KHAgPD0gRElWSVNPUiwgRVJSX0lOVkFMSURfUEVSQ0VOVEFHRSkKICAgIGR1cAogICAgaW50YyA0IC8vIDEwMDAwMAogICAgPD0KICAgIGFzc2VydCAvLyBJUENUCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwOQogICAgLy8gcmV0dXJuIG9wLmRpdncoLi4ub3AubXVsdyhhLCBwKSwgRElWSVNPUikKICAgIGZyYW1lX2RpZyAtMQogICAgbXVsdwogICAgaW50YyA0IC8vIDEwMDAwMAogICAgZGl2dwogICAgZHVwCiAgICBmcmFtZV9idXJ5IDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTkwCiAgICAvLyBpZiAoY3JlYXRvckFtb3VudCA9PT0gMCAmJiB0aGlzLmNyZWF0b3JSb3lhbHR5LnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDYKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUzCiAgICAvLyBjcmVhdG9yUm95YWx0eSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUNyZWF0b3JSb3lhbHR5IH0pCiAgICBieXRlYyAzMyAvLyAiY3JlYXRvcl9yb3lhbHR5IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTAKICAgIC8vIGlmIChjcmVhdG9yQW1vdW50ID09PSAwICYmIHRoaXMuY3JlYXRvclJveWFsdHkudmFsdWUgPiAwICYmIGFtb3VudCA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTEKICAgIC8vIGNyZWF0b3JBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSA1CgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk1CiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk1CiAgICAvLyBjb25zdCB7IGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWluOiBtaW4sIGF1Y3Rpb25TYWxlSW1wYWN0VGF4TWF4OiBtYXggfSA9IGdldE5GVEZlZXModGhpcy5ha2l0YURBTy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjkzCiAgICAvLyBjb25zdCBbbmZ0RmVlc0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c05GVEZlZXMpKQogICAgYnl0ZWMgNDAgLy8gIm5mdF9mZWVzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTUKICAgIC8vIGNvbnN0IHsgYXVjdGlvblNhbGVJbXBhY3RUYXhNaW46IG1pbiwgYXVjdGlvblNhbGVJbXBhY3RUYXhNYXg6IG1heCB9ID0gZ2V0TkZURmVlcyh0aGlzLmFraXRhREFPLnZhbHVlKQogICAgZHVwCiAgICBwdXNoaW50IDU2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZnJhbWVfYnVyeSA0CiAgICBwdXNoaW50IDY0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBmcmFtZV9idXJ5IDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk2CiAgICAvLyBsZXQgYWtpdGFBbW91bnQ6IHVpbnQ2NCA9IDAKICAgIGludGNfMCAvLyAwCiAgICBmcmFtZV9idXJ5IDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk3CiAgICAvLyBpZiAobWF4ID4gMCkgewogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjE5OAogICAgLy8gY29uc3QgaW1wYWN0ID0gZ2V0VXNlckltcGFjdCh0aGlzLmFraXRhREFPLnZhbHVlLCB0aGlzLnNlbGxlci52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzEgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MTk4CiAgICAvLyBjb25zdCBpbXBhY3QgPSBnZXRVc2VySW1wYWN0KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuc2VsbGVyLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUxCiAgICAvLyBzZWxsZXIgPSBHbG9iYWxTdGF0ZTxBY2NvdW50Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U2VsbGVyIH0pCiAgICBieXRlYyAxMCAvLyAic2VsbGVyIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxOTgKICAgIC8vIGNvbnN0IGltcGFjdCA9IGdldFVzZXJJbXBhY3QodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5zZWxsZXIudmFsdWUpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzYtMTM5CiAgICAvLyByZXR1cm4gYWJpQ2FsbDx0eXBlb2YgQWtpdGFTb2NpYWxJbXBhY3QucHJvdG90eXBlLmdldFVzZXJJbXBhY3Q+KHsKICAgIC8vICAgYXBwSWQ6IGdldEFraXRhU29jaWFsQXBwTGlzdChha2l0YURBTykuaW1wYWN0LAogICAgLy8gICBhcmdzOiBbYWNjb3VudF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ5CiAgICAvLyBjb25zdCBbYXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c0FraXRhU29jaWFsQXBwTGlzdCkpCiAgICBzd2FwCiAgICBwdXNoYnl0ZXMgInNhbCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTM3CiAgICAvLyBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KGFraXRhREFPKS5pbXBhY3QsCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEzNi0xMzkKICAgIC8vIHJldHVybiBhYmlDYWxsPHR5cGVvZiBBa2l0YVNvY2lhbEltcGFjdC5wcm90b3R5cGUuZ2V0VXNlckltcGFjdD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFTb2NpYWxBcHBMaXN0KGFraXRhREFPKS5pbXBhY3QsCiAgICAvLyAgIGFyZ3M6IFthY2NvdW50XQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIHB1c2hieXRlcyAweGQ1NzRiYjEwIC8vIG1ldGhvZCAiZ2V0VXNlckltcGFjdChhZGRyZXNzKXVpbnQ2NCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgcHVzaGludCA2IC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIGl0eG4gTGFzdExvZwogICAgZHVwCiAgICBleHRyYWN0IDQgMAogICAgc3dhcAogICAgZXh0cmFjdCAwIDQKICAgIGJ5dGVjIDcgLy8gMHgxNTFmN2M3NQogICAgPT0KICAgIGFzc2VydCAvLyBCeXRlcyBoYXMgdmFsaWQgcHJlZml4CiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMxCiAgICAvLyBjb25zdCBtaW5JbXBhY3Q6IHVpbnQ2NCA9IChpbXBhY3QgPiAxKSA/IGltcGFjdCAtIDEgOiAxCiAgICBpbnRjXzEgLy8gMQogICAgPgogICAgYnogZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDIyCiAgICBmcmFtZV9kaWcgMQogICAgaW50Y18xIC8vIDEKICAgIC0KCmdldEFtb3VudHNfdGVybmFyeV9tZXJnZUAyMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTMyCiAgICAvLyByZXR1cm4gbWF4IC0gKCgobWF4IC0gbWluKSAqIG1pbkltcGFjdCkgLyBJTVBBQ1RfRElWSVNPUikKICAgIGZyYW1lX2RpZyAzCiAgICBkdXAKICAgIGZyYW1lX2RpZyA0CiAgICAtCiAgICB1bmNvdmVyIDIKICAgICoKICAgIHB1c2hpbnQgMTAwMAogICAgLwogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDgKICAgIC8vIGFzc2VydChwIDw9IERJVklTT1IsIEVSUl9JTlZBTElEX1BFUkNFTlRBR0UpCiAgICBkdXAKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIDw9CiAgICBhc3NlcnQgLy8gSVBDVAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMDkKICAgIC8vIHJldHVybiBvcC5kaXZ3KC4uLm9wLm11bHcoYSwgcCksIERJVklTT1IpCiAgICBmcmFtZV9kaWcgLTEKICAgIG11bHcKICAgIGludGMgNCAvLyAxMDAwMDAKICAgIGRpdncKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwMgogICAgLy8gaWYgKGFraXRhQW1vdW50ID09PSAwICYmIGFtb3VudCA+IDApIHsKICAgIGJueiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTEKICAgIGZyYW1lX2RpZyAtMQogICAgYnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwMwogICAgLy8gYWtpdGFBbW91bnQgPSAxCiAgICBpbnRjXzEgLy8gMQogICAgZnJhbWVfYnVyeSAwCgpnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwNwogICAgLy8gbGV0IG1hcmtldHBsYWNlQW1vdW50OiB1aW50NjQgPSAwCiAgICBpbnRjXzAgLy8gMAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIwOAogICAgLy8gaWYgKHRoaXMubWFya2V0cGxhY2VSb3lhbHRpZXMudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NQogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMzQgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA4CiAgICAvLyBpZiAodGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjA5CiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IGNhbGNQZXJjZW50KGFtb3VudCwgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjY1CiAgICAvLyBtYXJrZXRwbGFjZVJveWFsdGllcyA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleU1hcmtldHBsYWNlUm95YWx0aWVzIH0pCiAgICBieXRlYyAzNCAvLyAibWFya2V0cGxhY2Vfcm95YWx0aWVzIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMDkKICAgIC8vIG1hcmtldHBsYWNlQW1vdW50ID0gY2FsY1BlcmNlbnQoYW1vdW50LCB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA4CiAgICAvLyBhc3NlcnQocCA8PSBESVZJU09SLCBFUlJfSU5WQUxJRF9QRVJDRU5UQUdFKQogICAgZHVwCiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICA8PQogICAgYXNzZXJ0IC8vIElQQ1QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6MTA5CiAgICAvLyByZXR1cm4gb3AuZGl2dyguLi5vcC5tdWx3KGEsIHApLCBESVZJU09SKQogICAgZnJhbWVfZGlnIC0xCiAgICBtdWx3CiAgICBpbnRjIDQgLy8gMTAwMDAwCiAgICBkaXZ3CiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoyMTAKICAgIC8vIGlmIChtYXJrZXRwbGFjZUFtb3VudCA9PT0gMCAmJiB0aGlzLm1hcmtldHBsYWNlUm95YWx0aWVzLnZhbHVlID4gMCAmJiBhbW91bnQgPiAwKSB7CiAgICBibnogZ2V0QW1vdW50c19hZnRlcl9pZl9lbHNlQDE3CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo2NQogICAgLy8gbWFya2V0cGxhY2VSb3lhbHRpZXMgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlNYXJrZXRwbGFjZVJveWFsdGllcyB9KQogICAgYnl0ZWMgMzQgLy8gIm1hcmtldHBsYWNlX3JveWFsdGllcyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjEwCiAgICAvLyBpZiAobWFya2V0cGxhY2VBbW91bnQgPT09IDAgJiYgdGhpcy5tYXJrZXRwbGFjZVJveWFsdGllcy52YWx1ZSA+IDAgJiYgYW1vdW50ID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNwogICAgZnJhbWVfZGlnIC0xCiAgICBieiBnZXRBbW91bnRzX2FmdGVyX2lmX2Vsc2VAMTcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjExCiAgICAvLyBtYXJrZXRwbGFjZUFtb3VudCA9IDEKICAgIGludGNfMSAvLyAxCiAgICBmcmFtZV9idXJ5IDIKCmdldEFtb3VudHNfYWZ0ZXJfaWZfZWxzZUAxNzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6MjE1CiAgICAvLyBjb25zdCBzZWxsZXJBbW91bnQ6IHVpbnQ2NCA9IGFtb3VudCAtIChjcmVhdG9yQW1vdW50ICsgYWtpdGFBbW91bnQgKyAoMiAqIG1hcmtldHBsYWNlQW1vdW50KSkKICAgIGZyYW1lX2RpZyA1CiAgICBkdXAKICAgIGZyYW1lX2RpZyAwCiAgICBkdXAKICAgIGNvdmVyIDMKICAgICsKICAgIHB1c2hpbnQgMgogICAgZnJhbWVfZGlnIDIKICAgIGR1cAogICAgY292ZXIgNQogICAgKgogICAgKwogICAgZnJhbWVfZGlnIC0xCiAgICBzd2FwCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjIxNy0yMjIKICAgIC8vIHJldHVybiB7CiAgICAvLyAgIGNyZWF0b3I6IGNyZWF0b3JBbW91bnQsCiAgICAvLyAgIGFraXRhOiBha2l0YUFtb3VudCwKICAgIC8vICAgbWFya2V0cGxhY2U6IG1hcmtldHBsYWNlQW1vdW50LAogICAgLy8gICBzZWxsZXI6IHNlbGxlckFtb3VudCwKICAgIC8vIH0KICAgIHN3YXAKICAgIGl0b2IKICAgIHVuY292ZXIgMgogICAgaXRvYgogICAgY29uY2F0CiAgICB1bmNvdmVyIDIKICAgIGl0b2IKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXRvYgogICAgY29uY2F0CiAgICBmcmFtZV9idXJ5IDAKICAgIHJldHN1YgoKZ2V0QW1vdW50c190ZXJuYXJ5X2ZhbHNlQDIyOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czoxMzEKICAgIC8vIGNvbnN0IG1pbkltcGFjdDogdWludDY0ID0gKGltcGFjdCA+IDEpID8gaW1wYWN0IC0gMSA6IDEKICAgIGludGNfMSAvLyAxCiAgICBiIGdldEFtb3VudHNfdGVybmFyeV9tZXJnZUAyMwoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkKHBheW1lbnQ6IHVpbnQ2NCwgbWFya2V0cGxhY2U6IGJ5dGVzKSAtPiB2b2lkOgpjcmVhdGVCaWQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQzOQogICAgLy8gcHJpdmF0ZSBjcmVhdGVCaWQocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBtYXJrZXRwbGFjZTogQWNjb3VudCk6IHZvaWQgewogICAgcHJvdG8gMiAwCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQwCiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3QmlkSUQoKQogICAgY2FsbHN1YiBuZXdCaWRJRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDIKICAgIC8vIGNvbnN0IHsgYmlkcywgYmlkc0J5QWRkcmVzcywgbG9jYXRpb25zIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDEwIC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDQKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NAogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUJpZF9pZl9ib2R5QDEKICAgIGZyYW1lX2RpZyA1CiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1MAogICAgLy8gY29uc3QgYmlkQW1vdW50OiB1aW50NjQgPSBwYXltZW50LmFtb3VudCAtIG1icgogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBbW91bnQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAzCiAgICBmcmFtZV9kaWcgMQogICAgLQogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1MQogICAgLy8gY29uc3QgbWluaW11bUJpZEFtb3VudCA9IHRoaXMuZ2V0TWluaW11bUJpZEFtb3VudCgpCiAgICBjYWxsc3ViIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudAogICAgZnJhbWVfYnVyeSAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ1MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAyMiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQmlkX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTQKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA+PSAobWluaW11bUJpZEFtb3VudCArIG1iciksIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBmcmFtZV9kaWcgMgogICAgZnJhbWVfZGlnIDEKICAgICsKICAgIGZyYW1lX2RpZyAzCiAgICA8PQogICAgYm56IGNyZWF0ZUJpZF9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMjIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUJpZF9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDU2CiAgICAvLyB0aGlzLnNldE5ld0JpZChpZCwgYmlkQW1vdW50LCBtYXJrZXRwbGFjZSkKICAgIGZyYW1lX2RpZyA0CiAgICBmcmFtZV9kaWcgMAogICAgZnJhbWVfZGlnIC0xCiAgICBjYWxsc3ViIHNldE5ld0JpZAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTkKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA0IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NTkKICAgIC8vIGlmIChHbG9iYWwubGF0ZXN0VGltZXN0YW1wID4gKHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlIC0gU05JUEVfUkFOR0UpKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgcHVzaGludCAxMjAKICAgIC0KICAgID4KICAgIGJ6IGNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDEwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2MAogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA0IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjAKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMzAwCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5CiAgICAvLyBlbmRUaW1lc3RhbXAgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlFbmRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDQgLy8gImVuZF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2MAogICAgLy8gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUgKz0gU05JUEVfRVhURU5TSU9OCiAgICBzd2FwCiAgICBhcHBfZ2xvYmFsX3B1dAoKY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VAMTA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2MwogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDEKICAgIC8vIGJpZEZlZSA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEZlZSB9KQogICAgYnl0ZWMgNiAvLyAiYmlkX2ZlZSIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDYzCiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VAMTIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDY0CiAgICAvLyBjb25zdCBiaWRGZWUgPSB0aGlzLmdldEJpZEZlZShiaWRBbW91bnQpCiAgICBmcmFtZV9kaWcgMAogICAgY2FsbHN1YiBnZXRCaWRGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDY1CiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjgxCiAgICAvLyByYWZmbGVBbW91bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJhZmZsZUFtb3VudCB9KQogICAgYnl0ZWMgMTkgLy8gInJhZmZsZV9hbW91bnQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ2NQogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gcmFmZmxlQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVBbW91bnQgfSkKICAgIGJ5dGVjIDE5IC8vICJyYWZmbGVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjUKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NwogICAgLy8gaGlnaGVzdEJpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SGlnaGVzdEJpZCB9KQogICAgYnl0ZWMgMTggLy8gImhpZ2hlc3RfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NjgKICAgIC8vIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSA9IGJpZEFtb3VudAogICAgZnJhbWVfZGlnIDAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCmNyZWF0ZUJpZF9pZl9ib2R5QDE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NQogICAgLy8gbWJyICs9IGJpZHNCeUFkZHJlc3MKICAgIGludGMgMTEgLy8gNTM0MDAKICAgIGZyYW1lX2J1cnkgMQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NDYKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDYgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ0NgogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNyZWF0ZUJpZF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDQ3CiAgICAvLyBtYnIgKz0gbG9jYXRpb25zCiAgICBpbnRjIDEyIC8vIDcyMzAwCiAgICBmcmFtZV9idXJ5IDEKICAgIGIgY3JlYXRlQmlkX2FmdGVyX2lmX2Vsc2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uY3JlYXRlQmlkQXNhKHBheW1lbnQ6IHVpbnQ2NCwgYXNzZXRYZmVyOiB1aW50NjQsIG1hcmtldHBsYWNlOiBieXRlcykgLT4gdm9pZDoKY3JlYXRlQmlkQXNhOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzEtNDc1CiAgICAvLyBwcml2YXRlIGNyZWF0ZUJpZEFzYSgKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQKICAgIC8vICk6IHZvaWQgewogICAgcHJvdG8gMyAwCiAgICBieXRlY18yIC8vICIiCiAgICBkdXBuIDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDc2CiAgICAvLyBjb25zdCBpZCA9IHRoaXMubmV3QmlkSUQoKQogICAgY2FsbHN1YiBuZXdCaWRJRAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NzgKICAgIC8vIGNvbnN0IHsgYmlkcywgYmlkc0J5QWRkcmVzcywgbG9jYXRpb25zIH0gPSB0aGlzLm1icigpCiAgICBpbnRjIDEwIC8vIDM0OTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyNwogICAgLy8gYmlkc0J5QWRkcmVzcyA9IEJveE1hcDxBY2NvdW50LCBXZWlnaHRMb2NhdGlvbj4oeyBrZXlQcmVmaXg6IEF1Y3Rpb25Cb3hQcmVmaXhCaWRzQnlBZGRyZXNzIH0pCiAgICBieXRlYyA4IC8vICJhIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODAKICAgIC8vIGlmICghdGhpcy5iaWRzQnlBZGRyZXNzKFR4bi5zZW5kZXIpLmV4aXN0cykgewogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czoxMjcKICAgIC8vIGJpZHNCeUFkZHJlc3MgPSBCb3hNYXA8QWNjb3VudCwgV2VpZ2h0TG9jYXRpb24+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4Qmlkc0J5QWRkcmVzcyB9KQogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4MAogICAgLy8gaWYgKCF0aGlzLmJpZHNCeUFkZHJlc3MoVHhuLnNlbmRlcikuZXhpc3RzKSB7CiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJ6IGNyZWF0ZUJpZEFzYV9pZl9ib2R5QDEKICAgIGZyYW1lX2RpZyA0CiAgICBmcmFtZV9idXJ5IDEKCmNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBSZWNlaXZlcgogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEA2CiAgICBieXRlYyAyMiAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEA2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODgKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gbWJyLCBFUlJfSU5WQUxJRF9QQVlNRU5UKQogICAgZnJhbWVfZGlnIC0zCiAgICBndHhucyBBbW91bnQKICAgIGZyYW1lX2RpZyAxCiAgICA9PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAOAogICAgYnl0ZWMgMjIgLy8gIkVSUjpJUEFZIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQQVkKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkwCiAgICAvLyBjb25zdCBiaWRBbW91bnQgPSBhc3NldFhmZXIuYXNzZXRBbW91bnQKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTEKICAgIC8vIGNvbnN0IG1pbmltdW1CaWRBbW91bnQgPSB0aGlzLmdldE1pbmltdW1CaWRBbW91bnQoKQogICAgY2FsbHN1YiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnQKICAgIGZyYW1lX2J1cnkgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTMKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRSZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBBc3NldFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDEwCiAgICBieXRlYyA0NSAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDk0CiAgICAvLyBsb2dnZWRBc3NlcnQoYXNzZXRYZmVyLmFzc2V0QW1vdW50ID49IG1pbmltdW1CaWRBbW91bnQsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2RpZyAyCiAgICA+PQogICAgYm56IGNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTIKICAgIGJ5dGVjIDQ1IC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpjcmVhdGVCaWRBc2FfYWZ0ZXJfYXNzZXJ0QDEyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OTUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIueGZlckFzc2V0ID09PSB0aGlzLmJpZEFzc2V0LnZhbHVlLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgWGZlckFzc2V0CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NQogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci54ZmVyQXNzZXQgPT09IHRoaXMuYmlkQXNzZXQudmFsdWUsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgID09CiAgICBibnogY3JlYXRlQmlkQXNhX2FmdGVyX2Fzc2VydEAxNAogICAgYnl0ZWMgNDUgLy8gIkVSUjpJWEZSIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklYRlIKCmNyZWF0ZUJpZEFzYV9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ5NwogICAgLy8gdGhpcy5zZXROZXdCaWQoaWQsIGJpZEFtb3VudCwgbWFya2V0cGxhY2UpCiAgICBmcmFtZV9kaWcgMwogICAgZnJhbWVfZGlnIDAKICAgIGZyYW1lX2RpZyAtMQogICAgY2FsbHN1YiBzZXROZXdCaWQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBpZiAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+ICh0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSAtIFNOSVBFX1JBTkdFKSkgewogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgNCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAwCiAgICAvLyBpZiAoR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+ICh0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSAtIFNOSVBFX1JBTkdFKSkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMTIwCiAgICAtCiAgICA+CiAgICBieiBjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUAxNgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDEKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDkKICAgIC8vIGVuZFRpbWVzdGFtcCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUVuZFRpbWVzdGFtcCB9KQogICAgYnl0ZWMgNCAvLyAiZW5kX3RpbWVzdGFtcCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTAxCiAgICAvLyB0aGlzLmVuZFRpbWVzdGFtcC52YWx1ZSArPSBTTklQRV9FWFRFTlNJT04KICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBwdXNoaW50IDMwMAogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA0IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDEKICAgIC8vIHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlICs9IFNOSVBFX0VYVEVOU0lPTgogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKCmNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDE2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDQKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQxCiAgICAvLyBiaWRGZWUgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlCaWRGZWUgfSkKICAgIGJ5dGVjIDYgLy8gImJpZF9mZWUiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNAogICAgLy8gaWYgKHRoaXMuYmlkRmVlLnZhbHVlID4gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ6IGNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDE4CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNQogICAgLy8gY29uc3QgYmlkRmVlID0gdGhpcy5nZXRCaWRGZWUoYmlkQW1vdW50KQogICAgZnJhbWVfZGlnIDAKICAgIGNhbGxzdWIgZ2V0QmlkRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjUwNgogICAgLy8gdGhpcy5yYWZmbGVBbW91bnQudmFsdWUgKz0gYmlkRmVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo4MQogICAgLy8gcmFmZmxlQW1vdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSYWZmbGVBbW91bnQgfSkKICAgIGJ5dGVjIDE5IC8vICJyYWZmbGVfYW1vdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo1MDYKICAgIC8vIHRoaXMucmFmZmxlQW1vdW50LnZhbHVlICs9IGJpZEZlZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6ODEKICAgIC8vIHJhZmZsZUFtb3VudCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5UmFmZmxlQW1vdW50IH0pCiAgICBieXRlYyAxOSAvLyAicmFmZmxlX2Ftb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA2CiAgICAvLyB0aGlzLnJhZmZsZUFtb3VudC52YWx1ZSArPSBiaWRGZWUKICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CgpjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUAxODoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE4IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NTA5CiAgICAvLyB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPSBiaWRBbW91bnQKICAgIGZyYW1lX2RpZyAwCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgcmV0c3ViCgpjcmVhdGVCaWRBc2FfaWZfYm9keUAxOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODEKICAgIC8vIG1iciArPSBiaWRzQnlBZGRyZXNzCiAgICBpbnRjIDExIC8vIDUzNDAwCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDgyCiAgICAvLyBpZiAodGhpcy5iaWRGZWUudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MQogICAgLy8gYmlkRmVlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkRmVlIH0pCiAgICBieXRlYyA2IC8vICJiaWRfZmVlIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0ODIKICAgIC8vIGlmICh0aGlzLmJpZEZlZS52YWx1ZSA+IDApIHsKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieiBjcmVhdGVCaWRBc2FfYWZ0ZXJfaWZfZWxzZUA0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjQ4MwogICAgLy8gbWJyICs9IGxvY2F0aW9ucwogICAgaW50YyAxMiAvLyA3MjMwMAogICAgZnJhbWVfYnVyeSAxCiAgICBiIGNyZWF0ZUJpZEFzYV9hZnRlcl9pZl9lbHNlQDQKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZChpZDogdWludDY0KSAtPiB2b2lkOgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzExCiAgICAvLyByZWZ1bmRCaWQoaWQ6IHVpbnQ2NCk6IHZvaWQgewogICAgcHJvdG8gMSAwCiAgICBpbnRjXzAgLy8gMAogICAgZHVwCiAgICBieXRlY18yIC8vICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxMwogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkIDwgdGhpcy5iaWRJRC52YWx1ZSAtIDEsIEVSUl9DQU5OT1RfUkVGVU5EX01PU1RfUkVDRU5UX0JJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjc5CiAgICAvLyBiaWRJRCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDEsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkSUQgfSkKICAgIGJ5dGVjIDUgLy8gImJpZF9pZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzEzCiAgICAvLyBsb2dnZWRBc3NlcnQoaWQgPCB0aGlzLmJpZElELnZhbHVlIC0gMSwgRVJSX0NBTk5PVF9SRUZVTkRfTU9TVF9SRUNFTlRfQklEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBmcmFtZV9kaWcgLTEKICAgID4KICAgIGJueiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9hc3NlcnRAMgogICAgcHVzaGJ5dGVzICJFUlI6Q1JNUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDUk1SCgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9hc3NlcnRAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzE1CiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5iaWRzKGlkKS5leGlzdHMsIEVSUl9CSURfTk9UX0ZPVU5EKQogICAgZnJhbWVfZGlnIC0xCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjEyMAogICAgLy8gYmlkcyA9IEJveE1hcDx1aW50NjQsIEJpZEluZm8+KHsga2V5UHJlZml4OiBBdWN0aW9uQm94UHJlZml4QmlkcyB9KQogICAgYnl0ZWMgMzcgLy8gImIiCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGR1cAogICAgZnJhbWVfYnVyeSAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcxNQogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYmlkcyhpZCkuZXhpc3RzLCBFUlJfQklEX05PVF9GT1VORCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkX2FmdGVyX2Fzc2VydEA0CiAgICBwdXNoYnl0ZXMgIkVSUjpCTkZEIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJORkQKCnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24ucmVmdW5kQmlkX2FmdGVyX2Fzc2VydEA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MTcKICAgIC8vIGNvbnN0IHsgcmVmdW5kZWQsIGFtb3VudCwgYWNjb3VudDogcmVjZWl2ZXIgfSA9IHRoaXMuYmlkcyhpZCkudmFsdWUKICAgIGZyYW1lX2RpZyAwCiAgICBib3hfZ2V0CiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgZHVwCiAgICBwdXNoaW50IDU3NgogICAgZ2V0Yml0CiAgICBkaWcgMQogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIGZyYW1lX2J1cnkgMgogICAgc3dhcAogICAgZXh0cmFjdCAwIDMyCiAgICBmcmFtZV9idXJ5IDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzE5CiAgICAvLyBsb2dnZWRBc3NlcnQoIXJlZnVuZGVkLCBFUlJfQklEX0FMUkVBRFlfUkVGVU5ERUQpCiAgICBieiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9hc3NlcnRANgogICAgcHVzaGJ5dGVzICJFUlI6QkFSRiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpCQVJGCgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9hc3NlcnRANjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIxCiAgICAvLyB0aGlzLmJpZHMoaWQpLnZhbHVlLnJlZnVuZGVkID0gdHJ1ZQogICAgZnJhbWVfZGlnIDAKICAgIGR1cAogICAgcHVzaGludCA3MgogICAgaW50Y18xIC8vIDEKICAgIGJveF9leHRyYWN0CiAgICBpbnRjXzAgLy8gMAogICAgaW50Y18xIC8vIDEKICAgIHNldGJpdAogICAgcHVzaGludCA3MgogICAgc3dhcAogICAgYm94X3JlcGxhY2UgLy8gb24gZXJyb3I6IGluZGV4IG91dCBvZiBib3VuZHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzIzCiAgICAvLyBjb25zdCBiaWRGZWUgPSB0aGlzLmdldEJpZEZlZShhbW91bnQpCiAgICBmcmFtZV9kaWcgMgogICAgZHVwCiAgICBjYWxsc3ViIGdldEJpZEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjUKICAgIC8vIGNvbnN0IHJldHVybkFtb3VudDogdWludDY0ID0gYW1vdW50IC0gYmlkRmVlCiAgICAtCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyNwogICAgLy8gaWYgKHRoaXMuYmlkQXNzZXQudmFsdWUuaWQgPT09IDApIHsKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjM5CiAgICAvLyBiaWRBc3NldCA9IEdsb2JhbFN0YXRlPEFzc2V0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkQXNzZXQgfSkKICAgIGJ5dGVjXzAgLy8gImJpZF9hc3NldCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI3CiAgICAvLyBpZiAodGhpcy5iaWRBc3NldC52YWx1ZS5pZCA9PT0gMCkgewogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJueiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9lbHNlX2JvZHlAOQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MjktNzMxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50OiByZXR1cm5BbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgZnJhbWVfZGlnIDEKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjcyOS03MzAKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQ6IHJldHVybkFtb3VudCwgcmVjZWl2ZXIgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzI5LTczMQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7IGFtb3VudDogcmV0dXJuQW1vdW50LCByZWNlaXZlciB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9pZl9lbHNlQDExOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIHRoaXMucmVmdW5kQ291bnQudmFsdWUgKz0gMQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzEKICAgIC8vIHJlZnVuZENvdW50ID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGluaXRpYWxWYWx1ZTogMCwga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlSZWZ1bmRDb3VudCB9KQogICAgYnl0ZWMgMzAgLy8gInJlZnVuZF9jb3VudCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzQyCiAgICAvLyB0aGlzLnJlZnVuZENvdW50LnZhbHVlICs9IDEKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzEgLy8gMQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MQogICAgLy8gcmVmdW5kQ291bnQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVJlZnVuZENvdW50IH0pCiAgICBieXRlYyAzMCAvLyAicmVmdW5kX2NvdW50IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NDIKICAgIC8vIHRoaXMucmVmdW5kQ291bnQudmFsdWUgKz0gMQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5yZWZ1bmRCaWRfZWxzZV9ib2R5QDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMy03MzkKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0QW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzM3CiAgICAvLyB4ZmVyQXNzZXQ6IHRoaXMuYmlkQXNzZXQudmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czozOQogICAgLy8gYmlkQXNzZXQgPSBHbG9iYWxTdGF0ZTxBc3NldD4oeyBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUJpZEFzc2V0IH0pCiAgICBieXRlY18wIC8vICJiaWRfYXNzZXQiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczNwogICAgLy8geGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICBmcmFtZV9kaWcgMQogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjczMy03MzgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0QW1vdW50OiByZXR1cm5BbW91bnQsCiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogcmVjZWl2ZXIsCiAgICAvLyAgICAgeGZlckFzc2V0OiB0aGlzLmJpZEFzc2V0LnZhbHVlLAogICAgLy8gICB9KQogICAgaW50Y18zIC8vIDQKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3MzMtNzM5CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldEFtb3VudDogcmV0dXJuQW1vdW50LAogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IHJlY2VpdmVyLAogICAgLy8gICAgIHhmZXJBc3NldDogdGhpcy5iaWRBc3NldC52YWx1ZSwKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgYiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLnJlZnVuZEJpZF9hZnRlcl9pZl9lbHNlQDExCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmUoKSAtPiB1aW50NjQ6CnNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzUKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPj0gdGhpcy5zdGFydFRpbWVzdGFtcC52YWx1ZSAmJgogICAgZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NDcKICAgIC8vIHN0YXJ0VGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5U3RhcnRUaW1lc3RhbXAgfSkKICAgIGJ5dGVjIDM4IC8vICJzdGFydF90aW1lc3RhbXAiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk3NQogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgPj0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc1LTk3NgogICAgLy8gR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBieiBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmlzTGl2ZV9ib29sX2ZhbHNlQDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc2CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wIDw9IHRoaXMuZW5kVGltZXN0YW1wLnZhbHVlCiAgICBnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0OQogICAgLy8gZW5kVGltZXN0YW1wID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5RW5kVGltZXN0YW1wIH0pCiAgICBieXRlYyA0IC8vICJlbmRfdGltZXN0YW1wIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICA8PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5NzUtOTc2CiAgICAvLyBHbG9iYWwubGF0ZXN0VGltZXN0YW1wID49IHRoaXMuc3RhcnRUaW1lc3RhbXAudmFsdWUgJiYKICAgIC8vIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIGJ6IHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uaXNMaXZlX2Jvb2xfZmFsc2VAMwogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc0LTk3NwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5pc0xpdmVfYm9vbF9mYWxzZUAzOgogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTc0LTk3NwogICAgLy8gcmV0dXJuICgKICAgIC8vICAgR2xvYmFsLmxhdGVzdFRpbWVzdGFtcCA+PSB0aGlzLnN0YXJ0VGltZXN0YW1wLnZhbHVlICYmCiAgICAvLyAgIEdsb2JhbC5sYXRlc3RUaW1lc3RhbXAgPD0gdGhpcy5lbmRUaW1lc3RhbXAudmFsdWUKICAgIC8vICkKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OkF1Y3Rpb24uZ2V0TWluaW11bUJpZEFtb3VudCgpIC0+IHVpbnQ2NDoKc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODgKICAgIC8vIGlmICh0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPiAwKSB7CiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo3NwogICAgLy8gaGlnaGVzdEJpZCA9IEdsb2JhbFN0YXRlPHVpbnQ2ND4oeyBpbml0aWFsVmFsdWU6IDAsIGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5SGlnaGVzdEJpZCB9KQogICAgYnl0ZWMgMTggLy8gImhpZ2hlc3RfYmlkIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODgKICAgIC8vIGlmICh0aGlzLmhpZ2hlc3RCaWQudmFsdWUgPiAwKSB7CiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnogc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo6QXVjdGlvbi5nZXRNaW5pbXVtQmlkQW1vdW50X2FmdGVyX2lmX2Vsc2VAMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5ODkKICAgIC8vIHJldHVybiB0aGlzLmhpZ2hlc3RCaWQudmFsdWUgKyB0aGlzLmJpZE1pbmltdW1JbmNyZWFzZS52YWx1ZQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6NzcKICAgIC8vIGhpZ2hlc3RCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsgaW5pdGlhbFZhbHVlOiAwLCBrZXk6IEF1Y3Rpb25HbG9iYWxTdGF0ZUtleUhpZ2hlc3RCaWQgfSkKICAgIGJ5dGVjIDE4IC8vICJoaWdoZXN0X2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTg5CiAgICAvLyByZXR1cm4gdGhpcy5oaWdoZXN0QmlkLnZhbHVlICsgdGhpcy5iaWRNaW5pbXVtSW5jcmVhc2UudmFsdWUKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0NQogICAgLy8gYmlkTWluaW11bUluY3JlYXNlID0gR2xvYmFsU3RhdGU8dWludDY0Pih7IGtleTogQXVjdGlvbkdsb2JhbFN0YXRlS2V5QmlkTWluaW11bUluY3JlYXNlIH0pCiAgICBieXRlYyA1MCAvLyAiYmlkX21pbmltdW1faW5jcmVhc2UiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjk4OQogICAgLy8gcmV0dXJuIHRoaXMuaGlnaGVzdEJpZC52YWx1ZSArIHRoaXMuYmlkTWluaW11bUluY3JlYXNlLnZhbHVlCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgKwogICAgcmV0c3ViCgpzbWFydF9jb250cmFjdHMvYXVjdGlvbi9jb250cmFjdC5hbGdvLnRzOjpBdWN0aW9uLmdldE1pbmltdW1CaWRBbW91bnRfYWZ0ZXJfaWZfZWxzZUAyOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo5OTEKICAgIC8vIHJldHVybiB0aGlzLnN0YXJ0aW5nQmlkLnZhbHVlCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vY29udHJhY3QuYWxnby50czo0MwogICAgLy8gc3RhcnRpbmdCaWQgPSBHbG9iYWxTdGF0ZTx1aW50NjQ+KHsga2V5OiBBdWN0aW9uR2xvYmFsU3RhdGVLZXlTdGFydGluZ0JpZCB9KQogICAgYnl0ZWMgNDkgLy8gInN0YXJ0aW5nX2JpZCIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2NvbnRyYWN0LmFsZ28udHM6OTkxCiAgICAvLyByZXR1cm4gdGhpcy5zdGFydGluZ0JpZC52YWx1ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHJldHN1Ygo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyAPAAEIBKCNBoAg////////////Aa3+1eTUhf2oWM+Cnrvv796CFNGCnrvv796CFNSQApihA+y0BP////8P1K+gBiY/CWJpZF9hc3NldAlha2l0YV9kYW8ABXByaXplDWVuZF90aW1lc3RhbXAGYmlkX2lkB2JpZF9mZWUEFR98dQFhDGlzX3ByaXplX2JveAZzZWxsZXIId190b3RhbHMRd2VpZ2h0c19ib3hfY291bnQOd2lubmluZ190aWNrZXQCAAEMYWtpdGFfZXNjcm93DXJhZmZsZV93aW5uZXISd2VpZ2h0ZWRfYmlkX3RvdGFsC2hpZ2hlc3RfYmlkDXJhZmZsZV9hbW91bnQRcmVmdW5kX21icl9jdXJzb3INcHJpemVfY2xhaW1lZAhFUlI6SVBBWRF2cmZfZmFpbHVyZV9jb3VudBRyYWZmbGVfcHJpemVfY2xhaW1lZBR1bmlxdWVfYWRkcmVzc19jb3VudAdnYXRlX2lkC21hcmtldHBsYWNlAXcGd2FsbGV0DHJlZnVuZF9jb3VudAxyYWZmbGVfcm91bmQIRVJSOk1CRkYPY3JlYXRvcl9yb3lhbHR5FW1hcmtldHBsYWNlX3JveWFsdGllcwhFUlI6QU5MVghFUlI6QUhORQFiD3N0YXJ0X3RpbWVzdGFtcBNmaW5kX3dpbm5lcl9jdXJzb3JzCG5mdF9mZWVzCEVSUjpQWk5DAWwBAAhFUlI6TkRBTwhFUlI6SVhGUgMGgQEDb2FsA2FhbAxzdGFydGluZ19iaWQUYmlkX21pbmltdW1faW5jcmVhc2UHdmVyc2lvbgRzYWx0CEVSUjpOQVBQCEVSUjpOQVJDCEVSUjpTSEJCBK35KuQIRVJSOkZHVEUIRVJSOkhHVEUCAAAIRVJSOklSQkQIRVJSOldORkQDcGFsMRhAACwnFyJnJx4iZycRImcnEiJnJwUjZycTImcnGCJnJxkiZycUI2cnDSJnJx8iZ4IDBCSHwywEMfJqmwTqkYDdNhoAjgMA7QDhANYxGRREMRhBAL+CFAS9cUjQBJg2yJ8ETVhWlwTZ9PA6BHaVKTEEueOcXARpZQHeBL0bJ9EE8s4vRgSdrwUKBGX8qYsEBeXeTQSPpKFgBGCCMDwEIIleJgSuhMvYBDPpLJQEhU3t4AQ+oRgyBHMREHA2GgCOFAURBtgHMQdgB8YIBQgTCksLtgzPEaoSXRLrEvsTGBMjE6UAKhPJAAEAgCQVH3x1AAAAAAAAiFQAAAAAAMgX1AAAAAAAAEhEAAAAAAAASdSwI0MjQ4AEgv+izjYaAI4BA1gAMRklEjEYEERCExYxGYEFEjEYEERCBfcxGYEFEjEYEERCBT2KAgCL/oEKCIsAMgwNQQAqsYEGshCBBbIZJy6yHicush+L/40CAAsABLNC/9syALIBQv/1IrIBQv/viYoBAYv/gRKRi/8bgRuRIQ0ai/+BO5FKkUwcIx5FAYEfGk8CTJAhDRoZiYoBATEAi/9AAASLAEyJi/+AEmNvbnRyb2xsZWRfYWRkcmVzc2VIQv/jigIBi/4nL2VIgRhbsbIYgAQ8Gm8zshqL/7IagQayECKyAbO0PklXBABLAVcABCcHEkRJIlmBAghMFRJEVwYASRVJQQAHiwEkE0EABCKMAImLABdC//eKBAGL/DgYi/0nMGVIgShbEkEAOYv8OBlAADKL/DgbJRJBACmL/CLCGoAEQ5ImVRJBABqL/CPCGov+EkEAD4v8gQLCGov/FhJBAAIjiSKJigcCIipHAyKL+kAABYv/QAFKI0SL+ScwZUgkW4wDi/0iWYHUxQELgeTFAgiMAYv6QABasYsDSXIIRIsBi/4IsgiyByOyECKyAbaL+xaL/BZPArIYgAR7fcX8shpMshqyGov9shqBBrIQIrIBs7Q+SVcEAExXAAQnBxJESRUkEkQXFosBFlCL/YwBjACJiwNyCESL+nAARQFBAIuLAYwCiwNyCEyMAEQijASL/0EACosDcghEI4wEjAWxiwNyCESLAbIIsgcjshAisgG2iwRBAASLBbIVi/qyEYv+shKLALIUJbIQIrIBtov7Fov8FosDshiABK8aFPKyGkyyGrIai/2yGoEGshAisgGztD5JVwQATFcABCcHEkRJFSQSRBeLAowBQv9biwEyEAiMArGLA0lyCEQyELIIsgcjshAisgG2i/oWTLIYgAQ5Tq6yshqyGoEGshAisgGzQv9DIkL+s4oDASIqi/0xAIj970kyA0xAAHuLA4wAi/9BAGmLADIDE0EAYYv9gAt3YWxsZXRfZmVlc2VIJFtJIQQORIv/HSEEl0mMAUAACIv/QQADI4wBMgdJgYD1JAiLAUlOAhaLAExQJw5MUIv9i/5PBU8ETwRLBSKI/ipIVwgIi/9PAgkWTFCMAImL/xYiFlCMAImLAoAIcmVmZXJyZXJlSIwAQv92KjYaAUkVJBJEFzYaAkkVIxJEIlM2GgNJFSQSRBc2GgRJFSQSRBc2GgVJFSQSRBc2GgZJFSQSRBc2GgdJFSQSRBc2GghJFSQSRBc2GglJFYEoEkQ2GgpJFYEgEkQ2GgtJFSQSRBc2GgxJFSQSRBc2Gg1JFYEgEkQ2Gg5JIlmBAghLARUSRFcCADYaD0cCFUsBJFlJgQoSRE8CTEsCUklOAkkVSwEiWUmBChJETFIiWYEWCBJEMg1AAAQnILAAK0sQZycJSw9nJxUiZ0sNQQAUSw1xAERAAAyACEVSUjpJQVNUsAAoSw5nJwZLDWcnMUsMZycySwtnJyZLCmcnBEsJZ4AGZnVuZGVySwhnJwpLB2cnIUsGZycaSwVnJxtLBGdLASJbSUUScghEMgMTQAAMgAhFUlI6SUFQULAAKUsRZycPSwFnJzNLA2eBeK8nC0xnJyeAEAAAAAAAAAAAAAAAAAAAAAFnJxAyA2cnNDEXZyIpZUQnKGVIgUhbJyJMZyNDKkkxFiMJSTgQIxJENhoBSRUkEkQXMQAyCRJAAAQnILAAIicGZURAAAQnNbAASYEDD0AADIAIRVJSOk0zSEKwAEkhDgtFA0sBOAcyChJAAAQnFrAASwE4CEsDEkAABCcWsAAiRQRLA0sBDEEAFUsDSRYnHExQgYCAArlIIwhFBEL/4ycMSwFnI0MxADIJEkAABCcgsAAiJwVlRCMNQQCUIicFZUSBAgkiJx5lRBJAAAQnNrAAIicVZURAAAQnKbAAIicYZURAAAyACEVSUjpSV0hDsAAiJwVlRCInFGVEEkAABCc2sAAiJwxlREEABCc3sAAiJwllREAAErEyCSIrZUSyEbIVJbIQIrIBsyIoZURBABKxMgkiKGVEshGyFSWyECKyAbOxMgmyCSOyECKyAbMjQyJC/3AxADIJEkAABCcgsAAyByInJmVEDEAADIAIRVJSOkFBU1SwACInDGVEQQAEJzewACInCWVEQQBBsSInCmVEIitlRLIYJziyGrIagQayECKyAbMiKGVEQQASsTIJIihlRLIRshUlshAisgGzsTIJsgkjshAisgGzI0OxIicKZUQiK2VEshGyFSWyECKyAbNC/8ExFoECCUk4ECMSRDEWIwlJOBCBBhJENhoBSRWBIBJEIillRDEAiPnriPm/iBGjQAAEJyOwACIpZUQiJxplREsETwJLA08DiPogQAAEJzmwAEsDSwKID3IjQzEWIwlJOBAjEkQ2GgFJFYEgEkSIEWJAAAQnI7AAIicaZURBAAQnOrAASogPQyNDMRaBAwlJOBAjEkQxFoECCUk4ECUSRDEWIwlJOBCBBhJENhoBSRWBIBJEIillRDEAiPlYiPksiBEQQAAEJyOwACIpZUQiJxplREsETwJLA08DiPmNQAAEJzmwAEsESwRLA4gPeSNDMRaBAglJOBAjEkQxFiMJSTgQJRJENhoBSRWBIBJEiBDCQAAEJyOwACInGmVEQQAEJzqwAEsCSwJLAogPOiNDNhoBSRUkEkQXiA/rI0MiRwMqRwkyByInBGVEDUAABCcksAAiJw1lREEADIAIRVJSOldBRFKwACInH2VEQAAIMgYkCScfTGciJx9lRCInF2VEJQsISUUHMgZMJAgPQAAMgAhFUlI6TkVUTbAAsUsFFiInNGVESRUWVwYCTFAiKWVEJy9lSCJbshiABBiTksWyGkyyGrIagQayECKyAbO0PklXBABLAVcABCcHEkRJIlmBAghMFRJEVwYASUUNFUlFA0AADSInF2VEIwgnF0xnI0MiSwJJTgIPIksCTwJNgRBLAg+BEE8DTwJNSw1OAlJJRQ0VgRASQAAMgAhFUlI6SVJTRLAASwtJIlsiIQcdRQFJIQgeRQFPAh5FASEHHUUBIQgeTgJITwIkW0whCR5FAR5FASEHHUUBIQkeRQFMFkwWUEUNIicRZUxJTgJFA0QhBgxBAAVJIwhFASc7RQ5JQQDdSSMNQAAEJzywAEkjCUlFCyMNQAAEJzywAEsJSRwjHkUBTBhFAyJFB0sMRQtLBiMMQQCKSwpJIltJRQYhBx1FASEIHklOAkUMSEwkW0UGQABngaKFvPbe372FKEsFSSEHHUUBTwIeRQFLChZMFlBLBYj2voEgkE8CiPa2GRZQSVcAEEyBEFtJRQpLBA9BACRLCEsLGCMIFksPSSJZIwgWVwYAXABMUEUPSwcjCEUIRQtC/3lFC0L/eyEJQv+eSwqAAgASUEsOUEmBEFlLARVSgQJbJw1MZycXImdC/pAhBkUKQv81IipHBjYaAUkVJBJEFyInBmVEQAAEJzWwADIHIicEZUQNQAAEJySwACInDWVEQAAMgAhFUlI6V05ORrAAIicQZUQyAxJAAAyACEVSUjpXQUZEsAAiJydlREkiW0UDJFtFBiJFBCInDGVESwQNQQDyIicLZURLBCQLWyInDWVESwdPAghJRQcMQQDDSwEWSwYWUEkiW0lOAkUEJFtFByInGWVESwEJSUsDSU4DDUxOAk1JRQNMIQUYSUUKIQVMCUlFBQ1BAARLAkUBSwEhBQoWJxxMUEUJSYE8CyKI9TUiRQRLA0sBDEEAWEsHSwQIJAtLCUwkuhdJIicSZUQSQQAOSwYIRQZLAyMIRQRC/9NLBklPAghFCCInDWVEDkEAGyInDWVESwcMQQAQSwFLBAgWJypMUL5EJxBMZ0sGRQZC/8RKCBZLBhZQJydMZyNDSwEhBQhFAksDIwhFBEsERQZC/wNLARZLBhZQQv8mIkcDKkcDNhoBSRUkEkQXIicVZURAAAQnKbAAIicGZURBAAsiJxBlRDIDE0EA5yNAAAQnPbAAIicFZUQiJxRlRBNAAAyACEVSUjpBUkZDsAAiJxRlTElOAkUERCInBWVESwEJSUsDSU4DDUxOAk1JRQOBPAsiiPQvIQpFBkUESghLBA1BAIFLAxYnJUxQSUUJvkRJgcAEU0xXACBFCkAAEiInBWVEIwlLBBNBAAVLA4gLlEsHvEgnCEsJUElFCL1FAUAAHUsERQOxSwKyCEsIsgcjshAisgGzSwMjCEUEQv+dSwZJvkQXTLxIIQtFBBYnKkxQSUUHvUUBQf/MSwW8SCEMRQNC/8EiJxRlREsBCCcUTGcjQyJC/xYiRwUqRw0yByInBGVEDUAABCcksAAiJxVlREEADIAIRVJSOlBBQ0ywACInBWVEIwkWJyVMUL5ESVcAIEUVSYEgW0UNVyggRQ8iJwllREEENLEiK2VEshgnOLIaSxOyGoEGshAisgGzIihlREAAuEsLiAhFSSJbRQpJJFtMSYEQW0UIgRhbRQQiJwllREEAkksJCEUOSw1AAHdLDUUHsSInD2VEgQJbcghESweyCLIHI7IQIrIBs7EiJxtlREsGSU4CsgiyByOyECKyAbOxsghLDrIHI7IQIrIBs7EiJwplREsDsgiyByOyECKyAbMiJwllREAAFbEiK2VEcQtESwmyCLIHI7IQIrIBsycVI2cjQyIpZUQiSw+I9QciW0UHQv98RQ5C/25LC4gHjUkiW0UKSSRbTEmBEFtFCIEYW0UEIicJZURBAzhLCQhFDksNQAMaSw1FByInD2VEgQJbcghEIihlRHAARQFBAXmxIillRHIIRCIoZUSyEUsHshKyFCWyECKyAbMiJxtlRCIoZURwAEUBQQEisSInG2VEIihlRLIRSwayErIUJbIQIrIBsyIoZURLD0xwAEUBQQDRsSIoZUSyEUsFshJLDrIUJbIQIrIBsyInCmVEIihlRHAARQFBAH+xIicKZUQiKGVEshFLA7ISshQlshAisgGzIicJZURA/wYiK2VEcQtEIihlRHAARQFBAB6xIitlRHELRCIoZUSyEUsJshKyFCWyECKyAbNC/tYiKWVEIihlRCIrZURxC0RLC0lOAhZQJw5MUE8DTwMiIQZPBE8FIojyZEYCQv6oIillRCIoZUQiJwplREsFSU4CFlAnDkxQTwNPAyIhBk8ETwUiiPI4RgJC/24iKWVEIihlREsHSU4CFksSTFAnDkxQTwNPAiIhBk8ETwUiiPIORgJC/xsiKWVEIihlRCInG2VESwhJTgIWUCcOTFBPA08DIiEGTwRPBSKI8eJGAkL+yyIoZUxFDEQiKWVESScdZUhFAkknPmVISVcICEUUJFtFBSInD2VMSU4CRRNESSJZSwEVUklFE1cCAEwnHWVITLEjFkUVSRUWVwYCTFCABAABAAJMUEyyGIAEokA937IashqBBrIQIrIBs7Q+SVcEAEsBVwAEJwcSREkiWYEJC4ECCEwVEkRXBgkiW0lFCUAADIAIRVJSOk5FU0OwAEsPgQJbSUUDSwgSQAAMgAhFUlI6V0VTQ7AAsUmyGIAEWt8zj7IaSxGyGksSshpLELIagAoAAQAAAAAAAAAAshonO7IagQayECKyASIpZUxFDkRLAXIIRCJFC0sLcABFAUAAGksMgA5yZXZlbnVlX3NwbGl0c2VIIlkjCEUKMhBLCgu2SwJyCESyB7III7IQIrIBtkcCFksMFicOTFBLBrIYgARoNeO8shpMshqAAYCyGrIagQayECKyAbayGIAEbMP2BrIagQayECKyAUsGQQAWtksBcghESwuyEUsHshKyFCWyECKyAbNC/RsiKWVEIihlREsPiPGpIltFB0L81kUOQvzIMgoiK2VETEsBcABIRQZLFExwAEUBQQAVsSIrZUSyEUsTshUlshAisgGzQvu2IillRCIrZURLBklOAhZLF0xQJw5MUE8DTwIiIQZPBE8FI4jv60YCQvuMKiInEGVEMgMTQAAEJz2wACInGGVEQQAMgAhFUlI6UkFQQ7AAIillRCcoZUiBUFsiJxNlREsBIQQORElPAh0hBJdJRQMJIihlREAAMLEiJw9lRIECW3IIREsCsgiyByOyECKyAbOxIicQZUSyB7III7IQIrIBsycYI2cjQ7EiJw9lRIECW3IIRCIoZURJshFLA7ISTLIUJbIQIrIBs7EiJxBlRLIUshGyEiWyECKyAbNC/8MqNhoBSRUkEkQXMgciJwRlRA1AAAQnJLAAIicVZURAAAQnKbAAIicYZURAAAyACEVSUjpSTlBDsABJgR4LIojtvyJFAkoMQQAbIicMZUQjCUsCSU4CCRYnHExQvEgjCEUCQv/gIicMZURLAUlOAgknDExnIQ4LsTIJSwGyCLIHI7IQIrIBsxYnB0xQsCNDiAW7JysiTwJUJwdMULAjQzYaAUkVgSASRCcITFC9RQEnKyJPAlQnB0xQsCNDiAWoFicHTFCwI0M2GgFHAhVLASJZSYEKEkRPAkxLAlIiWYEMCBJEMQAiKWVEJx1lSHIIRBJAAAQnLLAAJw9LAWcjQzYaAUkiWYECCEsBFRJEVwIAMQAiKWVEJx1lSHIIRBJAAAQnLLAAIillRCc+ZUiBEFsyDRJAAAyACEVSUjpJVVBHsAAnM0sBZyNDNhoBSRUkEkQXMQAiKWVEJx1lSHIIRBJAAAQnLLAAKUsBZyNDMRYjCUk4ECMSRDYaAUkVJBJEFzEAMgkSQAAMgAhFUlI6Rk9SQrAASwE4BzIKEkAADIAIRVJSOklQTVKwAEsBOAgyEBJAAAyACEVSUjpJUE1BsACxMgpLAbIRIrISshQlshAisgGzI0MiJwVlREkjCCcFTGeJigMAKjEAi/4WSU4CUIv/UCcrUIv9FiclTFBMvyInBmVEQQDmJwgxAFC9RQFBAFInCDEAUL5EF0khBQpJFiccTFBPAiEFGCQLSiS6F4v+TAkiJwtlRE8EJAtMSwFbIicRZURLAwgnEUxnTwRPBIsBu08CCBYiJwtlRE4CXScLTGeJIicZZUxJTgKMAEQiJwxlRCEFCwxAAAyACEVSUjpUTVBUsAAiJwtlRIsASU4CIQUKSSQLTwJLAVsiJxFlRIv+CCcRTGcnCDEAUEsEFkxLAb9PAxYnHExQTwQhBRgkC4sBu0yL/ggWIicLZURPA08CXScLTGcxACcqTwJQTL8iJxllRCMIJxlMZ4knCDEAUL1FAUD/aycIMQBQIha/iYoBASInBmVESSEEDkSL/x0hBJdJQAAQIicGZURBAAiL/0EAAyNMiYsATImKAQEqRwQiSSchZURBACYiJyFlREkhBA5Ei/8dIQSXSYwFQAAQIichZURBAAiL/0EAAyOMBSIpZUQnKGVISYE4W4wEgUBbSYwDIowAQQBwIillRCInCmVEsUyAA3NhbGVIgRBbshiABNV0uxCyGrIagQayECKyAbO0PklXBABMVwAEJwcSREkVJBJEF0mMASMNQQCCiwEjCYsDSYsECU8CC4HoBwoJSSEEDkSL/x0hBJdJjABAAAiL/0EAAyOMACKMAiInImVEQQAmIiciZURJIQQORIv/HSEEl0mMAkAAECInImVEQQAIi/9BAAMjjAKLBUmLAElOAwiBAosCSU4FCwiL/0wJTBZPAhZQTwIWUEwWUIwAiSNC/36KAgAqRwOI/YchCicIMQBQvUUBQQBziwWMAYv+OAhJjAOLAQmMAIgB+YwCi/44BzIKEkAABCcWsACLAosBCIsDDkAABCcWsACLBIsAi/+I/UwyByInBGVEgXgJDUEADSInBGVEgawCCCcETGciJwZlREEAD4sAiP5CIicTZUQIJxNMZycSiwBniSELjAEiJwZlREH/hSEMjAFC/36KAwAqRwKI/OshCicIMQBQvUUBQQCWiwSMAYv9OAcyChJAAAQnFrAAi/04CIsBEkAABCcWsACL/jgSjACIAUeMAov+OBQyChJAAAQnLbAAiwCLAg9AAAQnLbAAi/44ESIoZUQSQAAEJy2wAIsDiwCL/4j8jTIHIicEZUSBeAkNQQANIicEZUSBrAIIJwRMZyInBmVEQQAPiwCI/YMiJxNlRAgnE0xnJxKLAGeJIQuMASInBmVEQf9iIQyMAUL/W4oBACJJKiInBWVEIwmL/w1AAAyACEVSUjpDUk1SsACL/xYnJUxQSYwAvUUBQAAMgAhFUlI6Qk5GRLAAiwC+REmBwARTSwGBIFuMAkxXACCMAUEADIAIRVJSOkJBUkawAIsASYFII7oiI1SBSEy7iwJJiPzsCSIoZURAABqxiwGyB7III7IQIrIBsyInHmVEIwgnHkxnibEiKGVEshGLAbIUshIlshAisgGzQv/dMgciJyZlRA9BAA0yByInBGVEDkEAAiOJIokiJxJlREEADCInEmVEIicyZUQIiSInMWVEiQ==", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
          case "create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)))void":
            return _AuctionParamsFactory.create.create(params);
        }
        throw new Error(`Unknown ' + verb + ' method`);
      },
      /**
       * Constructs create ABI call params for the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)))void ABI method
       *
       * @param params Parameters for the call
       * @returns An `AppClientMethodCallParams` object for the call
       */
      create(params) {
        return {
          ...params,
          method: "create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)))void",
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
       * Creates a new instance of the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)))void ABI method.
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
       * Creates a new instance of the Auction smart contract using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)))void ABI method.
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
       * Creates a new instance of the Auction smart contract using an ABI method call using the create(uint64,bool,uint64,uint64,uint64,uint64,uint64,uint64,(address,uint64),address,uint64,uint64,address,string,(uint64,(string,uint64)))void ABI method.
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a init(pay,uint64)void method call against the Auction contract
       */
      init(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.init(params)));
        return this;
      },
      /**
       * Add a gatedBid(pay,appl,address)void method call against the Auction contract
       */
      gatedBid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBid(params)));
        return this;
      },
      /**
       * Add a bid(pay,address)void method call against the Auction contract
       */
      bid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.bid(params)));
        return this;
      },
      /**
       * Add a gatedBidAsa(pay,axfer,appl,address)void method call against the Auction contract
       */
      gatedBidAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.gatedBidAsa(params)));
        return this;
      },
      /**
       * Add a bidAsa(pay,axfer,address)void method call against the Auction contract
       */
      bidAsa(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.bidAsa(params)));
        return this;
      },
      /**
       * Add a refundBid(uint64)void method call against the Auction contract
       */
      refundBid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.refundBid(params)));
        return this;
      },
      /**
       * Add a raffle()void method call against the Auction contract
       */
      raffle(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.raffle(params)));
        return this;
      },
      /**
       * Add a findWinner(uint64)void method call against the Auction contract
       */
      findWinner(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.findWinner(params)));
        return this;
      },
      /**
       * Add a refundMBR(uint64)void method call against the Auction contract
       */
      refundMbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.refundMbr(params)));
        return this;
      },
      /**
       * Add a claimPrize()void method call against the Auction contract
       */
      claimPrize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimPrize(params)));
        return this;
      },
      /**
       * Add a claimRafflePrize()void method call against the Auction contract
       */
      claimRafflePrize(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.claimRafflePrize(params)));
        return this;
      },
      /**
       * Add a clearWeightsBoxes(uint64)uint64 method call against the Auction contract
       */
      clearWeightsBoxes(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.clearWeightsBoxes(params)));
        return this;
      },
      /**
       * Add a isLive()bool method call against the Auction contract
       */
      isLive(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.isLive(params)));
        return this;
      },
      /**
       * Add a hasBid(address)bool method call against the Auction contract
       */
      hasBid(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.hasBid(params)));
        return this;
      },
      /**
       * Add a getMinimumBidAmount()uint64 method call against the Auction contract
       */
      getMinimumBidAmount(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.getMinimumBidAmount(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the Auction contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the Auction contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the Auction contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a optin(pay,uint64)void method call against the Auction contract
       */
      optin(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optin(params)));
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64,uint64) method call against the Auction contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
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
      get delete() {
        return {
          deleteApplication: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.deleteApplication(params)));
            return this;
          },
          cancel: (params) => {
            promiseChain = promiseChain.then(async () => composer.addAppDeleteMethodCall(await client.params.delete.cancel(params)));
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
}, _class2);

// src/auction/factory.ts


// src/generated/AuctionFactoryClient.ts



var APP_SPEC2 = { "name": "AuctionFactory", "structs": { "AuctionMBRData": [{ "name": "bids", "type": "uint64" }, { "name": "weights", "type": "uint64" }, { "name": "bidsByAddress", "type": "uint64" }, { "name": "locations", "type": "uint64" }], "EscrowConfig": [{ "name": "name", "type": "string" }, { "name": "app", "type": "uint64" }] }, "methods": [{ "name": "create", "args": [{ "type": "string", "name": "version" }, { "type": "string", "name": "childVersion" }, { "type": "uint64", "name": "akitaDAO" }, { "type": "(string,uint64)", "struct": "EscrowConfig", "name": "akitaDAOEscrow" }], "returns": { "type": "void" }, "actions": { "create": ["NoOp"], "call": [] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuction", "args": [{ "type": "pay", "name": "payment" }, { "type": "axfer", "name": "assetXfer" }, { "type": "string", "name": "name" }, { "type": "byte[32][]", "name": "proof" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newPrizeBoxAuction", "args": [{ "type": "appl", "name": "prizeBoxTransferTxn" }, { "type": "pay", "name": "payment" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "bidFee" }, { "type": "uint64", "name": "startingBid" }, { "type": "uint64", "name": "bidMinimumIncrease" }, { "type": "uint64", "name": "startTimestamp" }, { "type": "uint64", "name": "endTimestamp" }, { "type": "uint64", "name": "gateID" }, { "type": "address", "name": "marketplace" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteAuctionApp", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "cancelAuction", "args": [{ "type": "uint64", "name": "appId" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "newAuctionCost", "args": [{ "type": "bool", "name": "isPrizeBox" }, { "type": "uint64", "name": "bidAssetID" }, { "type": "uint64", "name": "prizeAssetID" }, { "type": "uint64", "name": "weightsListCount" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "initBoxedContract", "args": [{ "type": "string", "name": "version" }, { "type": "uint64", "name": "size" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "loadBoxedContract", "args": [{ "type": "uint64", "name": "offset" }, { "type": "byte[]", "name": "data" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "deleteBoxedContract", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "optIn", "args": [{ "type": "pay", "name": "payment", "desc": "The payment transaction covering MBR for all opt-ins" }, { "type": "uint64", "name": "asset", "desc": "The asset to opt into" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "desc": "optIn opts this contract into `asset`. When this contract has a\nnamed escrow configured (`akitaDAOEscrow.value.name !== ''`), it\nalso opts the escrow and every revenue-split recipient in through\nthe revenue-manager plugin \u2014 so downstream methods (subscribe,\nlist, etc.) can transfer to the escrow without doing the plugin-\nrekey dance mid-group.\n\nPayment must cover:\n  - this contract's own opt-in (1 \xD7 assetOptInMinBalance), plus\n  - each downstream opt-in the escrow still needs.\n`splitOptInCount` returns 0 once the escrow is already opted in, so\nthe charge collapses to just 1 \xD7 assetOptInMinBalance on repeat\ncalls and the escrow branch becomes a no-op.", "events": [], "recommendations": {} }, { "name": "optInCost", "args": [{ "type": "uint64", "name": "asset" }], "returns": { "type": "uint64" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }, { "name": "updateAkitaDAOEscrow", "args": [{ "type": "(string,uint64)", "struct": "EscrowConfig", "name": "config" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "update", "args": [{ "type": "string", "name": "newVersion" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["UpdateApplication"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "updateAkitaDAO", "args": [{ "type": "uint64", "name": "akitaDAO" }], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "opUp", "args": [], "returns": { "type": "void" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": false, "events": [], "recommendations": {} }, { "name": "mbr", "args": [], "returns": { "type": "(uint64,uint64,uint64,uint64)", "struct": "AuctionMBRData" }, "actions": { "create": [], "call": ["NoOp"] }, "readonly": true, "events": [], "recommendations": {} }], "arcs": [22, 28], "networks": {}, "state": { "schema": { "global": { "ints": 8, "bytes": 56 }, "local": { "ints": 0, "bytes": 0 } }, "keys": { "global": { "childContractVersion": { "keyType": "AVMString", "valueType": "AVMString", "key": "Y2hpbGRfY29udHJhY3RfdmVyc2lvbg==", "desc": "the current version of the child contract" }, "akitaDAOEscrow": { "keyType": "AVMString", "valueType": "EscrowConfig", "key": "YWtpdGFfZXNjcm93", "desc": "the named DAO escrow this contract routes fees to (name + app)" }, "version": { "keyType": "AVMString", "valueType": "AVMString", "key": "dmVyc2lvbg==", "desc": "the current version of the contract" }, "akitaDAO": { "keyType": "AVMString", "valueType": "AVMUint64", "key": "YWtpdGFfZGFv", "desc": "the app ID of the Akita DAO" } }, "local": {}, "box": { "boxedContract": { "keyType": "AVMString", "valueType": "AVMBytes", "key": "YmM=" } } }, "maps": { "global": {}, "local": {}, "box": {} } }, "bareActions": { "create": [], "call": [] }, "sourceInfo": { "approval": { "sourceInfo": [{ "pc": [1141, 1843], "errorMessage": "Box must have value" }, { "pc": [540, 3010], "errorMessage": "Bytes has valid prefix" }, { "pc": [923, 1733], "errorMessage": "ERR:BINC" }, { "pc": [1676], "errorMessage": "ERR:BMPT" }, { "pc": [950, 1760, 2718], "errorMessage": "ERR:CNST" }, { "pc": [939, 1749], "errorMessage": "ERR:EMFM" }, { "pc": [2707], "errorMessage": "ERR:ICOR" }, { "pc": [1064, 1078, 1813, 1827], "errorMessage": "ERR:IPAY" }, { "pc": [2859], "errorMessage": "ERR:IPMA" }, { "pc": [2832], "errorMessage": "ERR:IPMR" }, { "pc": [3383], "errorMessage": "ERR:IUPG" }, { "pc": [1092, 1106, 1120], "errorMessage": "ERR:IXFR" }, { "pc": [2201, 2291], "errorMessage": "ERR:NAUC" }, { "pc": [2568, 2595, 2750, 3311, 3354, 3419], "errorMessage": "ERR:NDAO" }, { "pc": [3046], "errorMessage": "ERR:NESC" }, { "pc": [986], "errorMessage": "ERR:NOPT" }, { "pc": [1724, 2216, 2306], "errorMessage": "ERR:NPBO" }, { "pc": [3072], "errorMessage": "ERR:WESC" }, { "pc": [1705], "errorMessage": "NAPB" }, { "pc": [610, 1308, 1329, 1366, 1395, 1440, 1691, 1703, 2013, 2034, 2062, 2107, 2191, 2281, 2587, 2742, 2806, 3134, 3150, 3243, 3303, 3346, 3411], "errorMessage": "application exists" }, { "pc": [452], "errorMessage": "asset exists" }, { "pc": [1001, 1124, 1178, 1190, 1194, 1487, 1680, 1831, 1883, 1895, 1899, 2154, 2429, 2472, 2498, 2581, 2736, 2795, 2799, 2905, 2936, 3126, 3233, 3237, 3297, 3340, 3358, 3405], "errorMessage": "check GlobalState exists" }, { "pc": [433, 543, 661, 675, 692, 734, 790, 808, 2524, 2618, 3013, 3286, 3323], "errorMessage": "invalid array length header" }, { "pc": [2368], "errorMessage": "invalid number of bytes for arc4.bool" }, { "pc": [683, 700, 798, 2532, 2626, 3331], "errorMessage": "invalid number of bytes for arc4.dynamic_array<arc4.uint8>" }, { "pc": [818], "errorMessage": "invalid number of bytes for arc4.dynamic_array<bytes[32]>" }, { "pc": [3023], "errorMessage": "invalid number of bytes for arc4.dynamic_array<smart_contracts/arc58/account/types.ts::EscrowInfo>" }, { "pc": [903, 1631], "errorMessage": "invalid number of bytes for arc4.static_array<arc4.uint8, 32>" }, { "pc": [711, 827, 837, 846, 855, 867, 880, 892, 914, 1546, 1559, 1571, 1582, 1595, 1608, 1620, 1642, 2186, 2276, 2379, 2391, 2402, 2543, 2610, 2781, 3228, 3398], "errorMessage": "invalid number of bytes for arc4.uint64" }, { "pc": [739, 3291], "errorMessage": "invalid number of bytes for smart_contracts/utils/base-contracts/base.ts::EscrowConfig" }, { "pc": [550], "errorMessage": "invalid number of bytes for string" }, { "pc": [726, 3278], "errorMessage": "invalid tail pointer at index 0 of ((len+utf8[]),uint64)" }, { "pc": [721, 3273], "errorMessage": "invalid tuple encoding" }, { "pc": [1523], "errorMessage": "transaction type is appl" }, { "pc": [784], "errorMessage": "transaction type is axfer" }, { "pc": [773, 1535, 2773], "errorMessage": "transaction type is pay" }], "pcOffsetMethod": "none" }, "clear": { "sourceInfo": [], "pcOffsetMethod": "none" } }, "source": { "approval": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYXJjNC9pbmRleC5kLnRzOjpDb250cmFjdC5hcHByb3ZhbFByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBpbnRjYmxvY2sgMCAxIDggNiA2NzAwMCA0MDk2IDEzMTEzMzAwIDE2MTI1MDAgNTAwMDAgMzM1MDAwIDI2ODAwMAogICAgYnl0ZWNibG9jayAiYWtpdGFfZGFvIiAiYmMiICJha2l0YV9lc2Nyb3ciICJ3YWxsZXQiIDB4MTUxZjdjNzUgIkVSUjpOREFPIiAiY2hpbGRfY29udHJhY3RfdmVyc2lvbiIgIkVSUjpJUEFZIiAiYWFsIiAiRVJSOkNOU1QiICJFUlI6SVhGUiIgMHgzZWExMTgzMiAiRVJSOk5QQk8iIDB4YzUzYjMyY2MgInZlcnNpb24iICJFUlI6QklOQyIgIkVSUjpFTUZNIiAweDAwMGEgYmFzZTY0KEM0RUJRdz09KSAweDgyZmZhMmNlIDB4YmQ3MTQ4ZDAgMHhhZGY5MmFlNCAweDAwMDAgIkVSUjpOQVVDIiAic2VsbGVyIiAiZnVuZGVyIiAicGFsIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwLTI2CiAgICAvLyBAY29udHJhY3QoewogICAgLy8gICBzdGF0ZVRvdGFsczogewogICAgLy8gICAgIGdsb2JhbEJ5dGVzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhCeXRlcywKICAgIC8vICAgICBnbG9iYWxVaW50czogRmFjdG9yeUdsb2JhbFN0YXRlTWF4VWludHMKICAgIC8vICAgfQogICAgLy8gfSkKICAgIC8vIGV4cG9ydCBjbGFzcyBBdWN0aW9uRmFjdG9yeSBleHRlbmRzIGNsYXNzZXMoQmFzZUF1Y3Rpb24sIEZhY3RvcnlDb250cmFjdCkgewogICAgcHVzaGJ5dGVzIDB4ZWE5MTgwZGQgLy8gbWV0aG9kICJ1cGRhdGUoc3RyaW5nKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBtYWluX3VwZGF0ZV9yb3V0ZUA0CgptYWluX3N3aXRjaF9jYXNlX25leHRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMC0yNgogICAgLy8gQGNvbnRyYWN0KHsKICAgIC8vICAgc3RhdGVUb3RhbHM6IHsKICAgIC8vICAgICBnbG9iYWxCeXRlczogRmFjdG9yeUdsb2JhbFN0YXRlTWF4Qnl0ZXMsCiAgICAvLyAgICAgZ2xvYmFsVWludHM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heFVpbnRzCiAgICAvLyAgIH0KICAgIC8vIH0pCiAgICAvLyBleHBvcnQgY2xhc3MgQXVjdGlvbkZhY3RvcnkgZXh0ZW5kcyBjbGFzc2VzKEJhc2VBdWN0aW9uLCBGYWN0b3J5Q29udHJhY3QpIHsKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGJ6IG1haW5fY3JlYXRlX05vT3BAMjIKICAgIHB1c2hieXRlc3MgMHhkMTU0OGZmZiAweDczZjAwMjIzIDB4MTcxNGRhNjUgMHg4MGY0NDU0MSAweGE1ZDQyYjNhIC8vIG1ldGhvZCAibmV3QXVjdGlvbihwYXksYXhmZXIsc3RyaW5nLGJ5dGVbMzJdW10sdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LGFkZHJlc3MsdWludDY0KXVpbnQ2NCIsIG1ldGhvZCAibmV3UHJpemVCb3hBdWN0aW9uKGFwcGwscGF5LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHVpbnQ2NCl1aW50NjQiLCBtZXRob2QgImRlbGV0ZUF1Y3Rpb25BcHAodWludDY0KXZvaWQiLCBtZXRob2QgImNhbmNlbEF1Y3Rpb24odWludDY0KXZvaWQiLCBtZXRob2QgIm5ld0F1Y3Rpb25Db3N0KGJvb2wsdWludDY0LHVpbnQ2NCx1aW50NjQpdWludDY0IgogICAgYnl0ZWMgMTMgLy8gbWV0aG9kICJpbml0Qm94ZWRDb250cmFjdChzdHJpbmcsdWludDY0KXZvaWQiCiAgICBwdXNoYnl0ZXNzIDB4ZGNhMmQ4NjIgMHhkMzQ2YjFhNCAweDM5NGVhZWIyIDB4MzNmNzg4MDggMHhhZTg0Y2JkOCAweDMzZTkyYzk0IDB4ODU0ZGVkZTAgMHg3MzExMTA3MCAvLyBtZXRob2QgImxvYWRCb3hlZENvbnRyYWN0KHVpbnQ2NCxieXRlW10pdm9pZCIsIG1ldGhvZCAiZGVsZXRlQm94ZWRDb250cmFjdCgpdm9pZCIsIG1ldGhvZCAib3B0SW4ocGF5LHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcHRJbkNvc3QodWludDY0KXVpbnQ2NCIsIG1ldGhvZCAidXBkYXRlQWtpdGFEQU9Fc2Nyb3coKHN0cmluZyx1aW50NjQpKXZvaWQiLCBtZXRob2QgInVwZGF0ZUFraXRhREFPKHVpbnQ2NCl2b2lkIiwgbWV0aG9kICJvcFVwKCl2b2lkIiwgbWV0aG9kICJtYnIoKSh1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggbmV3QXVjdGlvbiBuZXdQcml6ZUJveEF1Y3Rpb24gZGVsZXRlQXVjdGlvbkFwcCBjYW5jZWxBdWN0aW9uIG5ld0F1Y3Rpb25Db3N0IGluaXRCb3hlZENvbnRyYWN0IGxvYWRCb3hlZENvbnRyYWN0IGRlbGV0ZUJveGVkQ29udHJhY3Qgb3B0SW4gb3B0SW5Db3N0IHVwZGF0ZUFraXRhREFPRXNjcm93IHVwZGF0ZUFraXRhREFPIG1haW5fb3BVcF9yb3V0ZUAxOSBtYWluX21icl9yb3V0ZUAyMAogICAgZXJyCgptYWluX21icl9yb3V0ZUAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2Jhc2UudHM6NwogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBwdXNoYnl0ZXMgMHgxNTFmN2M3NTAwMDAwMDAwMDAwMDg4NTQwMDAwMDAwMDAwYzgxN2Q0MDAwMDAwMDAwMDAwNDg0NDAwMDAwMDAwMDAwMDQ5ZDQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbWFpbl9vcFVwX3JvdXRlQDE5OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDEKICAgIC8vIG9wVXAoKTogdm9pZCB7IH0KICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm1haW5fY3JlYXRlX05vT3BAMjI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjAtMjYKICAgIC8vIEBjb250cmFjdCh7CiAgICAvLyAgIHN0YXRlVG90YWxzOiB7CiAgICAvLyAgICAgZ2xvYmFsQnl0ZXM6IEZhY3RvcnlHbG9iYWxTdGF0ZU1heEJ5dGVzLAogICAgLy8gICAgIGdsb2JhbFVpbnRzOiBGYWN0b3J5R2xvYmFsU3RhdGVNYXhVaW50cwogICAgLy8gICB9CiAgICAvLyB9KQogICAgLy8gZXhwb3J0IGNsYXNzIEF1Y3Rpb25GYWN0b3J5IGV4dGVuZHMgY2xhc3NlcyhCYXNlQXVjdGlvbiwgRmFjdG9yeUNvbnRyYWN0KSB7CiAgICBwdXNoYnl0ZXMgMHg4MTE1MzYyOCAvLyBtZXRob2QgImNyZWF0ZShzdHJpbmcsc3RyaW5nLHVpbnQ2NCwoc3RyaW5nLHVpbnQ2NCkpdm9pZCIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDAKICAgIG1hdGNoIGNyZWF0ZQogICAgZXJyCgptYWluX3VwZGF0ZV9yb3V0ZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuIE9uQ29tcGxldGlvbgogICAgcHVzaGludCA0IC8vIFVwZGF0ZUFwcGxpY2F0aW9uCiAgICA9PQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICYmCiAgICBhc3NlcnQKICAgIGIgdXBkYXRlCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cm95YWx0aWVzKGFraXRhREFPOiB1aW50NjQsIGFzc2V0OiB1aW50NjQsIG5hbWU6IGJ5dGVzLCBwcm9vZjogYnl0ZXMpIC0+IHVpbnQ2NCwgYnl0ZXM6CnJveWFsdGllczoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDE3CiAgICAvLyBleHBvcnQgZnVuY3Rpb24gcm95YWx0aWVzKGFraXRhREFPOiBBcHBsaWNhdGlvbiwgYXNzZXQ6IEFzc2V0LCBuYW1lOiBzdHJpbmcsIHByb29mOiBQcm9vZik6IHVpbnQ2NCB7CiAgICBwcm90byA0IDIKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQxOAogICAgLy8gbGV0IGNyZWF0b3JSb3lhbHR5OiB1aW50NjQgPSAwCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDIwCiAgICAvLyBpZiAoIShwcm9vZi5sZW5ndGggPiAwKSkgewogICAgZnJhbWVfZGlnIC0xCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgYm56IHJveWFsdGllc19hZnRlcl9pZl9lbHNlQDIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDIxCiAgICAvLyByZXR1cm4gQ3JlYXRvclJveWFsdHlEZWZhdWx0CiAgICBwdXNoaW50IDUwMDAKICAgIGZyYW1lX2RpZyAtMQogICAgdW5jb3ZlciAzCiAgICB1bmNvdmVyIDMKICAgIHJldHN1YgoKcm95YWx0aWVzX2FmdGVyX2lmX2Vsc2VAMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI1LTQzNQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI4CiAgICAvLyBhc3NldC5jcmVhdG9yLAogICAgZnJhbWVfZGlnIC0zCiAgICBhc3NldF9wYXJhbXNfZ2V0IEFzc2V0Q3JlYXRvcgogICAgYXNzZXJ0IC8vIGFzc2V0IGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MjkKICAgIC8vIG5hbWUsCiAgICBmcmFtZV9kaWcgLTIKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGZyYW1lX2RpZyAtMgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzMAogICAgLy8gc2hhMjU2KHNoYTI1NihpdG9iKGFzc2V0LmlkKSkpLAogICAgZnJhbWVfZGlnIC0zCiAgICBpdG9iCiAgICBzaGEyNTYKICAgIHNoYTI1NgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzIKICAgIC8vIDEsCiAgICBpbnRjXzEgLy8gMQogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC00CiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNgogICAgLy8gYXBwSWQ6IGdldEFraXRhQXBwTGlzdChha2l0YURBTykubWV0YU1lcmtsZXMsCiAgICBwdXNoaW50IDcyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQyNS00MzUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5U3RyaW5nID0gYWJpQ2FsbDx0eXBlb2YgTWV0YU1lcmtsZXMucHJvdG90eXBlLnZlcmlmaWVkUmVhZD4oewogICAgLy8gICBhcHBJZDogZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5tZXRhTWVya2xlcywKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGFzc2V0LmNyZWF0b3IsCiAgICAvLyAgICAgbmFtZSwKICAgIC8vICAgICBzaGEyNTYoc2hhMjU2KGl0b2IoYXNzZXQuaWQpKSksCiAgICAvLyAgICAgcHJvb2YsCiAgICAvLyAgICAgMSwKICAgIC8vICAgICAncm95YWx0eScsCiAgICAvLyAgIF0KICAgIC8vIH0pLnJldHVyblZhbHVlCiAgICBwdXNoYnl0ZXMgMHgwY2YxYjljZiAvLyBtZXRob2QgInZlcmlmaWVkUmVhZChhZGRyZXNzLHN0cmluZyxieXRlWzMyXSxieXRlWzMyXVtdLHVpbnQ2NCxzdHJpbmcpc3RyaW5nIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHN3YXAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzMKICAgIC8vICdyb3lhbHR5JywKICAgIHB1c2hieXRlcyAweDAwMDc3MjZmNzk2MTZjNzQ3OQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDI1LTQzNQogICAgLy8gY29uc3QgY3JlYXRvclJveWFsdHlTdHJpbmcgPSBhYmlDYWxsPHR5cGVvZiBNZXRhTWVya2xlcy5wcm90b3R5cGUudmVyaWZpZWRSZWFkPih7CiAgICAvLyAgIGFwcElkOiBnZXRBa2l0YUFwcExpc3QoYWtpdGFEQU8pLm1ldGFNZXJrbGVzLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgYXNzZXQuY3JlYXRvciwKICAgIC8vICAgICBuYW1lLAogICAgLy8gICAgIHNoYTI1NihzaGEyNTYoaXRvYihhc3NldC5pZCkpKSwKICAgIC8vICAgICBwcm9vZiwKICAgIC8vICAgICAxLAogICAgLy8gICAgICdyb3lhbHR5JywKICAgIC8vICAgXQogICAgLy8gfSkucmV0dXJuVmFsdWUKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgc3dhcAogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBzdHJpbmcKICAgIGV4dHJhY3QgNiAwCiAgICBkdXAKICAgIGZyYW1lX2J1cnkgMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0MzcKICAgIC8vIGlmIChCeXRlcyhjcmVhdG9yUm95YWx0eVN0cmluZykubGVuZ3RoID4gMCkgewogICAgbGVuCiAgICBieiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQzOAogICAgLy8gY3JlYXRvclJveWFsdHkgPSBidG9pKEJ5dGVzKGNyZWF0b3JSb3lhbHR5U3RyaW5nKSkKICAgIGZyYW1lX2RpZyAwCiAgICBidG9pCiAgICBmcmFtZV9idXJ5IDEKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MQogICAgLy8gaWYgKGNyZWF0b3JSb3lhbHR5ID4gQ3JlYXRvclJveWFsdHlNYXhpbXVtU2luZ2xlKSB7CiAgICBmcmFtZV9kaWcgMQogICAgaW50YyA4IC8vIDUwMDAwCiAgICA+CiAgICBieiByb3lhbHRpZXNfYWZ0ZXJfaWZfZWxzZUA3CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0MgogICAgLy8gcmV0dXJuIENyZWF0b3JSb3lhbHR5TWF4aW11bVNpbmdsZQogICAgaW50YyA4IC8vIDUwMDAwCiAgICBmcmFtZV9kaWcgLTEKICAgIHVuY292ZXIgMwogICAgdW5jb3ZlciAzCiAgICByZXRzdWIKCnJveWFsdGllc19hZnRlcl9pZl9lbHNlQDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0NQogICAgLy8gcmV0dXJuIGNyZWF0b3JSb3lhbHR5CiAgICBmcmFtZV9kaWcgMQogICAgZnJhbWVfZGlnIC0xCiAgICB1bmNvdmVyIDMKICAgIHVuY292ZXIgMwogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo6cmV3YXJkc09wdEluQ29zdChha2l0YURBTzogdWludDY0LCBhc3NldDogdWludDY0KSAtPiB1aW50NjQ6CnJld2FyZHNPcHRJbkNvc3Q6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwOAogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHJld2FyZHNPcHRJbkNvc3QoYWtpdGFEQU86IEFwcGxpY2F0aW9uLCBhc3NldDogdWludDY0KTogdWludDY0IHsKICAgIHByb3RvIDIgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDkKICAgIC8vIGlmIChhc3NldCAhPT0gMCkgewogICAgZnJhbWVfZGlnIC0xCiAgICBieiByZXdhcmRzT3B0SW5Db3N0X2FmdGVyX2lmX2Vsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgZnJhbWVfZGlnIC0yCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMAogICAgLy8gY29uc3QgcmV3YXJkc0FwcCA9IGdldEFraXRhQXBwTGlzdChha2l0YURBTykucmV3YXJkcwogICAgaW50Y18yIC8vIDgKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxMQogICAgLy8gaWYgKCFBcHBsaWNhdGlvbihyZXdhcmRzQXBwKS5hZGRyZXNzLmlzT3B0ZWRJbihBc3NldChhc3NldCkpKSB7CiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICBibnogcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTEyCiAgICAvLyByZXR1cm4gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIHJldHN1YgoKcmV3YXJkc09wdEluQ29zdF9hZnRlcl9pZl9lbHNlQDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUxNQogICAgLy8gcmV0dXJuIDAKICAgIGludGNfMCAvLyAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjpzcGxpdE9wdEluQ291bnQoYWtpdGFEQU86IHVpbnQ2NCwgZXNjcm93OiBieXRlcywgYXNzZXQ6IHVpbnQ2NCkgLT4gdWludDY0OgpzcGxpdE9wdEluQ291bnQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyMQogICAgLy8gZXhwb3J0IGZ1bmN0aW9uIHNwbGl0T3B0SW5Db3VudChha2l0YURBTzogQXBwbGljYXRpb24sIGVzY3JvdzogQWNjb3VudCwgYXNzZXQ6IEFzc2V0KTogdWludDY0IHsKICAgIHByb3RvIDMgMQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjIKICAgIC8vIGxldCBjb3VudDogdWludDY0ID0gMAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI0CiAgICAvLyBpZiAoIWVzY3Jvdy5pc09wdGVkSW4oYXNzZXQpKSB7CiAgICBmcmFtZV9kaWcgLTIKICAgIGZyYW1lX2RpZyAtMQogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJueiBzcGxpdE9wdEluQ291bnRfYWZ0ZXJfaWZfZWxzZUAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjEwMwogICAgLy8gY29uc3QgW3NwbGl0c0J5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1JldmVudWVTcGxpdHMpKQogICAgZnJhbWVfZGlnIC0zCiAgICBwdXNoYnl0ZXMgInJldmVudWVfc3BsaXRzIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo2MjgKICAgIC8vIGNvdW50ICs9IHNwbGl0cy5sZW5ndGgKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYyNQogICAgLy8gY291bnQgKz0gMQogICAgaW50Y18xIC8vIDEKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NjI4CiAgICAvLyBjb3VudCArPSBzcGxpdHMubGVuZ3RoCiAgICArCiAgICBmcmFtZV9idXJ5IDAKCnNwbGl0T3B0SW5Db3VudF9hZnRlcl9pZl9lbHNlQDI6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjYzMQogICAgLy8gcmV0dXJuIGNvdW50CiAgICBmcmFtZV9kaWcgMAogICAgc3dhcAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5jcmVhdGVbcm91dGluZ10oKSAtPiB2b2lkOgpjcmVhdGU6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzAKICAgIC8vIEBhYmltZXRob2QoeyBvbkNyZWF0ZTogJ3JlcXVpcmUnIH0pCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMgogICAgKwogICAgZGlnIDEKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGFyYzQudWludDg+CiAgICBleHRyYWN0IDIgMAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgZGlnIDIKICAgIHN3YXAKICAgIGRpZyAyCiAgICBzdWJzdHJpbmczCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAxMgogICAgKwogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3Igc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkVzY3Jvd0NvbmZpZwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjUKICAgIC8vIHZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleVZlcnNpb24gfSkKICAgIGJ5dGVjIDE0IC8vICJ2ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSB2ZXJzaW9uCiAgICB1bmNvdmVyIDQKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDYgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzMKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUgPSBjaGlsZFZlcnNpb24KICAgIHVuY292ZXIgMwogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM0CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIHVuY292ZXIgMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNQogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGFraXRhREFPRXNjcm93KQogICAgc3dhcAogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMAogICAgLy8gQGFiaW1ldGhvZCh7IG9uQ3JlYXRlOiAncmVxdWlyZScgfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld0F1Y3Rpb25bcm91dGluZ10oKSAtPiB2b2lkOgpuZXdBdWN0aW9uOgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MC01NAogICAgLy8gbmV3QXVjdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgdHhuIEdyb3VwSW5kZXgKICAgIHB1c2hpbnQgMgogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBwdXNoaW50IDQgLy8gYXhmZXIKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBheGZlcgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXBuIDIKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDMyCiAgICAqCiAgICBwdXNoaW50IDIKICAgICsKICAgIHN3YXAKICAgIGxlbgogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5keW5hbWljX2FycmF5PGJ5dGVzWzMyXT4KICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDUKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cG4gMgogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA5CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxMAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMTEKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjU1CiAgICAvLyBsb2dnZWRBc3NlcnQoYmlkTWluaW11bUluY3JlYXNlID4gMCwgRVJSX0JJRFNfTVVTVF9BTFdBWVNfSU5DUkVBU0UpCiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMTUgLy8gIkVSUjpCSU5DIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJJTkMKCm5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NTYKICAgIC8vIGxvZ2dlZEFzc2VydChlbmRUaW1lc3RhbXAgPiBzdGFydFRpbWVzdGFtcCArIDMwMCwgRVJSX0VORF9NVVNUX0JFX0FUTEVBU1RfRklWRV9NSU5VVEVTX0FGVEVSX1NUQVJUKQogICAgZGlnIDYKICAgIHB1c2hpbnQgMzAwCiAgICArCiAgICBkaWcgNQogICAgPAogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDE2IC8vICJFUlI6RU1GTSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpFTUZNCgpuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1NwogICAgLy8gbG9nZ2VkQXNzZXJ0KHRoaXMuYm94ZWRDb250cmFjdC5leGlzdHMsIEVSUl9DT05UUkFDVF9OT1RfU0VUKQogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRANwogICAgYnl0ZWMgOSAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo1OQogICAgLy8gY29uc3QgaXNBbGdvQmlkID0gYmlkQXNzZXRJRCA9PT0gMAogICAgZGlnIDEyCiAgICBkdXAKICAgICEKICAgIGJ1cnkgMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2MQogICAgLy8gbG9nZ2VkQXNzZXJ0KGlzQWxnb0JpZCB8fCBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcy5pc09wdGVkSW4oQXNzZXQoYmlkQXNzZXRJRCkpLCBFUlJfTk9UX09QVEVEX0lOKQogICAgYnogbmV3QXVjdGlvbl9ib29sX3RydWVAOQogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgIGRpZyAxMwogICAgYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCiAgICBidXJ5IDEKICAgIGJ6IG5ld0F1Y3Rpb25fYm9vbF9mYWxzZUAxMAoKbmV3QXVjdGlvbl9ib29sX3RydWVAOToKICAgIGludGNfMSAvLyAxCgpuZXdBdWN0aW9uX2Jvb2xfbWVyZ2VAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjEKICAgIC8vIGxvZ2dlZEFzc2VydChpc0FsZ29CaWQgfHwgR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MuaXNPcHRlZEluKEFzc2V0KGJpZEFzc2V0SUQpKSwgRVJSX05PVF9PUFRFRF9JTikKICAgIGJueiBuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEAxMwogICAgcHVzaGJ5dGVzICJFUlI6Tk9QVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOT1BUCgpuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2MwogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc0FsZ29CaWQgPyAxIDogMikKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgcHVzaGludCAyCiAgICBpbnRjXzEgLy8gMQogICAgZGlnIDI2CiAgICBzZWxlY3QKICAgICoKICAgIGJ1cnkgMjMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3MwogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3MwogICAgLy8gbGV0IGRpc2J1cnNlbWVudE1CUjogdWludDY0ID0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTcKICAgIGd0eG5zIFhmZXJBc3NldAogICAgZHVwCiAgICBidXJ5IDI0CiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzMKICAgIC8vIGxldCBkaXNidXJzZW1lbnRNQlI6IHVpbnQ2NCA9IGRpc2J1cnNlbWVudENvc3QoMSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQpCiAgICArCiAgICBidXJ5IDI1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzQKICAgIC8vIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAxMgogICAgYm56IG5ld0F1Y3Rpb25fZWxzZV9ib2R5QDE1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzUKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICBkaWcgMjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzUKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCiAgICBidXJ5IDI1CgpuZXdBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMTY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODAKICAgIC8vIGNvbnN0IGNoaWxkQXBwTUJSOiB1aW50NjQgPSBHbG9iYWwubWluQmFsYW5jZSArIG9wdGluTUJSICsgKHdlaWdodHNMaXN0Q291bnQgKiBjb3N0cy53ZWlnaHRzKSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGRpZyAyMwogICAgKwogICAgZGlnIDEKICAgIGludGMgNiAvLyAxMzExMzMwMAogICAgKgogICAgZHVwCiAgICBidXJ5IDIxCiAgICArCiAgICBkaWcgMjUKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo4Mi04NAogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNyAvLyAxNjEyNTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6ODItODUKICAgIC8vIE1BWF9QUk9HUkFNX1BBR0VTICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX1VJTlRfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsVWludHMpICsKICAgIC8vIChHTE9CQUxfU1RBVEVfS0VZX0JZVEVTX0NPU1QgKiBhdWN0aW9uLmdsb2JhbEJ5dGVzKSArCiAgICAvLyBjaGlsZEFwcE1CUgogICAgKwogICAgYnVyeSAyMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjg5CiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMTcKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEAxOAogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTAKICAgIC8vIGxvZ2dlZEFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdG90YWxNQlIsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMTcKICAgIGd0eG5zIEFtb3VudAogICAgZGlnIDIwCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDIwCiAgICBieXRlYyA3IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEAyMDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo5MwogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5zZW5kZXIgPT09IFR4bi5zZW5kZXIsIEVSUl9JTlZBTElEX1RSQU5TRkVSKQogICAgZGlnIDE2CiAgICBndHhucyBTZW5kZXIKICAgIHR4biBTZW5kZXIKICAgID09CiAgICBibnogbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjIKICAgIGJ5dGVjIDEwIC8vICJFUlI6SVhGUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJWEZSCgpuZXdBdWN0aW9uX2FmdGVyX2Fzc2VydEAyMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo5NAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFzc2V0WGZlci5hc3NldFJlY2VpdmVyID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX0lOVkFMSURfVFJBTlNGRVIpCiAgICBkaWcgMTYKICAgIGd0eG5zIEFzc2V0UmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDI0CiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTUKICAgIC8vIGxvZ2dlZEFzc2VydChhc3NldFhmZXIuYXNzZXRBbW91bnQgPiAwLCBFUlJfSU5WQUxJRF9UUkFOU0ZFUikKICAgIGRpZyAxNgogICAgZ3R4bnMgQXNzZXRBbW91bnQKICAgIGR1cAogICAgYnVyeSAyMgogICAgYm56IG5ld0F1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDI2CiAgICBieXRlYyAxMCAvLyAiRVJSOklYRlIiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVhGUgoKbmV3QXVjdGlvbl9hZnRlcl9hc3NlcnRAMjY6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OTcKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIGFzc2V0WGZlci54ZmVyQXNzZXQsIG5hbWUsIHByb29mKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjk3CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBhc3NldFhmZXIueGZlckFzc2V0LCBuYW1lLCBwcm9vZikKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMjIKICAgIGR1cAogICAgY292ZXIgMgogICAgZGlnIDE4CiAgICBkaWcgMTgKICAgIGNhbGxzdWIgcm95YWx0aWVzCiAgICBwb3AKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAwCiAgICAvLyBjb25zdCBhcHByb3ZhbFNpemUgPSB0aGlzLmJveGVkQ29udHJhY3QubGVuZ3RoCiAgICBib3hfbGVuCiAgICBhc3NlcnQgLy8gQm94IG11c3QgaGF2ZSB2YWx1ZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDEKICAgIC8vIGNvbnN0IGNodW5rMSA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDAsIDQwOTYpCiAgICBpbnRjXzAgLy8gMAogICAgaW50YyA1IC8vIDQwOTYKICAgIGJveF9leHRyYWN0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAyCiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgc3dhcAogICAgaW50YyA1IC8vIDQwOTYKICAgIC0KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTAyCiAgICAvLyBjb25zdCBjaHVuazIgPSB0aGlzLmJveGVkQ29udHJhY3QuZXh0cmFjdCg0MDk2LCBhcHByb3ZhbFNpemUgLSA0MDk2KQogICAgaW50YyA1IC8vIDQwOTYKICAgIHVuY292ZXIgMgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDQtMTI2CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwNwogICAgLy8gYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIGRpZyAyCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE1CiAgICAvLyB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICBkaWcgMjIKICAgIGd0eG5zIFNlbmRlcgogICAgZGlnIDI1CiAgICBpdG9iCiAgICBjb25jYXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMTYKICAgIC8vIFR4bi5zZW5kZXIsCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTE3CiAgICAvLyBjcmVhdG9yUm95YWx0eSwKICAgIHVuY292ZXIgNgogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDYgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTIwCiAgICAvLyB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgbGVuCiAgICBpdG9iCiAgICBleHRyYWN0IDYgMgogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTIxCiAgICAvLyB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEyMQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBzd2FwCiAgICBpdG9iCiAgICBieXRlYyAxNyAvLyAweDAwMGEKICAgIGNvbmNhdAogICAgc3dhcAogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NjcKICAgIC8vIGNvbnN0IGF1Y3Rpb24gPSBjb21waWxlQXJjNChBdWN0aW9uKQogICAgcHVzaGludCAxMAogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1CeXRlU2xpY2UKICAgIHB1c2hpbnQgMjUKICAgIGl0eG5fZmllbGQgR2xvYmFsTnVtVWludAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwNC0xMjYKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgYXNzZXRYZmVyLnhmZXJBc3NldC5pZCwKICAgIC8vICAgICAgIGZhbHNlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMjUKICAgIC8vIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICBwdXNoaW50IDMKICAgIGl0eG5fZmllbGQgRXh0cmFQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo2NwogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBieXRlYyAxOCAvLyBiYXNlNjQoQzRFQlF3PT0pCiAgICBpdHhuX2ZpZWxkIENsZWFyU3RhdGVQcm9ncmFtUGFnZXMKICAgIHVuY292ZXIgNwogICAgaXR4bl9maWVsZCBBcHByb3ZhbFByb2dyYW1QYWdlcwogICAgdW5jb3ZlciA2CiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTA0LTEyNgogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICAgICAgZmFsc2UsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGJ5dGVjIDE5IC8vIG1ldGhvZCAiY3JlYXRlKHVpbnQ2NCxib29sLHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LChhZGRyZXNzLHVpbnQ2NCksYWRkcmVzcyx1aW50NjQsdWludDY0LGFkZHJlc3Msc3RyaW5nLCh1aW50NjQsKHN0cmluZyx1aW50NjQpKSl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEwOAogICAgLy8gZmFsc2UsCiAgICBwdXNoYnl0ZXMgMHgwMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAyMAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxOAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA3CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgZGlnIDYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDQtMTI2CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMDQtMTI4CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgICAgICBmYWxzZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgLy8gICAuaXR4bgogICAgLy8gICAuY3JlYXRlZEFwcAogICAgZ2l0eG4gMCBDcmVhdGVkQXBwbGljYXRpb25JRAogICAgZHVwCiAgICBidXJ5IDI5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTMxLTEzNgogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzMwogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzNAogICAgLy8gYW1vdW50OiBHbG9iYWwubWluQmFsYW5jZSArIGRpc2J1cnNlbWVudE1CUgogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGRpZyAyOQogICAgKwogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzEtMTM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzEtMTM2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsKICAgIC8vICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjEzOS0xNDgKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGFzc2V0WGZlci54ZmVyQXNzZXQuaWQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQzCiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTQ0CiAgICAvLyBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgZ2xvYmFsIEFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBpdHhuX2ZpZWxkIEFtb3VudAogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE0Mi0xNDUKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyB9KSwKICAgIGludGNfMSAvLyAxCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxMzktMTQ4CiAgICAvLyBhdWN0aW9uLmNhbGwub3B0aW4oewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vICAgICB9KSwKICAgIC8vICAgICBhc3NldFhmZXIueGZlckFzc2V0LmlkLAogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMSAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTEtMTU3CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUzCiAgICAvLyBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBzd2FwCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgZGlnIDIxCiAgICBpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CiAgICBpdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTEtMTU2CiAgICAvLyBpdHhuCiAgICAvLyAgIC5hc3NldFRyYW5zZmVyKHsKICAgIC8vICAgICBhc3NldFJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IGFzc2V0WGZlci5hc3NldEFtb3VudCwKICAgIC8vICAgICB4ZmVyQXNzZXQ6IGFzc2V0WGZlci54ZmVyQXNzZXQKICAgIC8vICAgfSkKICAgIHB1c2hpbnQgNAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTUxLTE1NwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiBhc3NldFhmZXIuYXNzZXRBbW91bnQsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldFhmZXIueGZlckFzc2V0CiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNTkKICAgIC8vIGlmICghaXNBbGdvQmlkKSB7CiAgICBkaWcgMTIKICAgIGJ6IG5ld0F1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAzNQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2MS0xNzAKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY1CiAgICAvLyByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgZGlnIDI1CiAgICBkdXAKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoxNjYKICAgIC8vIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTY0LTE2NwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIC8vIH0pLAogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE2MS0xNzAKICAgIC8vIGF1Y3Rpb24uY2FsbC5vcHRpbih7CiAgICAvLyAgIGFwcElkOiBhdWN0aW9uQXBwLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgaXR4bi5wYXltZW50KHsKICAgIC8vICAgICAgIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICAvLyAgICAgICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gICAgIH0pLAogICAgLy8gICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAxMSAvLyBtZXRob2QgIm9wdGluKHBheSx1aW50NjQpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAoKbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDM1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE3NAogICAgLy8gaWYgKGJpZEZlZSA+IDApIHsKICAgIGRpZyAxMAogICAgYnogbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDM5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTc3LTE4NgogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgxCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIGRpZyAyNQogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMjAKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTgwLTE4MwogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTc3LTE4NgogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAyMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld0F1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAzOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo0MC01NAogICAgLy8gbmV3QXVjdGlvbigKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBhc3NldFhmZXI6IGd0eG4uQXNzZXRUcmFuc2ZlclR4biwKICAgIC8vICAgbmFtZTogc3RyaW5nLAogICAgLy8gICBwcm9vZjogUHJvb2YsCiAgICAvLyAgIGJpZEFzc2V0SUQ6IHVpbnQ2NCwgLy8gMCB8IEFzc2V0CiAgICAvLyAgIGJpZEZlZTogdWludDY0LAogICAgLy8gICBzdGFydGluZ0JpZDogdWludDY0LAogICAgLy8gICBiaWRNaW5pbXVtSW5jcmVhc2U6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZW5kVGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGdhdGVJRDogdWludDY0LAogICAgLy8gICBtYXJrZXRwbGFjZTogQWNjb3VudCwKICAgIC8vICAgd2VpZ2h0c0xpc3RDb3VudDogdWludDY0CiAgICAvLyApOiB1aW50NjQgewogICAgZGlnIDI1CiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpuZXdBdWN0aW9uX2Vsc2VfYm9keUAxNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3NwogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6NzcKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAxMwogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgOSAvLyAzMzUwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czo3NwogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICBkaWcgMjUKICAgICsKICAgIGJ1cnkgMjUKICAgIGIgbmV3QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDE2CgpuZXdBdWN0aW9uX2Jvb2xfZmFsc2VAMTA6CiAgICBpbnRjXzAgLy8gMAogICAgYiBuZXdBdWN0aW9uX2Jvb2xfbWVyZ2VAMTEKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5Lm5ld1ByaXplQm94QXVjdGlvbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld1ByaXplQm94QXVjdGlvbjoKICAgIHB1c2hieXRlcyAiIgogICAgZHVwbiA1CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MTkyLTIwNAogICAgLy8gbmV3UHJpemVCb3hBdWN0aW9uKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuOiBndHhuLkFwcGxpY2F0aW9uQ2FsbFR4biwKICAgIC8vICAgcGF5bWVudDogZ3R4bi5QYXltZW50VHhuLAogICAgLy8gICBiaWRBc3NldElEOiB1aW50NjQsIC8vIDAgfCBBc3NldAogICAgLy8gICBiaWRGZWU6IHVpbnQ2NCwKICAgIC8vICAgc3RhcnRpbmdCaWQ6IHVpbnQ2NCwKICAgIC8vICAgYmlkTWluaW11bUluY3JlYXNlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0VGltZXN0YW1wOiB1aW50NjQsCiAgICAvLyAgIGVuZFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBnYXRlSUQ6IHVpbnQ2NCwKICAgIC8vICAgbWFya2V0cGxhY2U6IEFjY291bnQsCiAgICAvLyAgIHdlaWdodHNMaXN0Q291bnQ6IHVpbnQ2NAogICAgLy8gKTogdWludDY0IHsKICAgIHR4biBHcm91cEluZGV4CiAgICBwdXNoaW50IDIKICAgIC0KICAgIGR1cG4gMgogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyBhcHBsCiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgYXBwbAogICAgdHhuIEdyb3VwSW5kZXgKICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGd0eG5zIFR5cGVFbnVtCiAgICBpbnRjXzEgLy8gcGF5CiAgICA9PQogICAgYXNzZXJ0IC8vIHRyYW5zYWN0aW9uIHR5cGUgaXMgcGF5CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyA1CiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIHN3YXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDYKICAgIGR1cAogICAgY292ZXIgMgogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgc3dhcAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNwogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOAogICAgZHVwCiAgICBjb3ZlciAyCiAgICBsZW4KICAgIHB1c2hpbnQgMzIKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuc3RhdGljX2FycmF5PGFyYzQudWludDgsIDMyPgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgOQogICAgZHVwCiAgICBjb3ZlciAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjA3CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIGludGNfMCAvLyAwCiAgICBndHhuc2FzIEFwcGxpY2F0aW9uQXJncwogICAgYnl0ZWMgMjEgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwNy0yMDgKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3I8dHlwZW9mIFByaXplQm94LnByb3RvdHlwZS50cmFuc2Zlcj4oKSAmJgogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgYnogbmV3UHJpemVCb3hBdWN0aW9uX2Jvb2xfZmFsc2VANAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIwOAogICAgLy8gcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZGlnIDE2CiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDctMjA4CiAgICAvLyBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYm9vbF9mYWxzZUA0CiAgICBpbnRjXzEgLy8gMQoKbmV3UHJpemVCb3hBdWN0aW9uX2Jvb2xfbWVyZ2VANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMDYtMjA5CiAgICAvLyBsb2dnZWRBc3NlcnQoKAogICAgLy8gICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KCkgJiYKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gKSwgRVJSX0JBRF9NRVRIT0RfUFJJWkVfQk9YX1RSQU5TRkVSX05FRURFRCkKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDcKICAgIHB1c2hieXRlcyAiRVJSOkJNUFQiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Qk1QVAoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEA3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTAKICAgIC8vIGxvZ2dlZEFzc2VydChnZXRQcml6ZUJveE93bmVyKHRoaXMuYWtpdGFEQU8udmFsdWUsIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQpID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgZGlnIDE3CiAgICBndHhucyBBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGJ1cnkgMjIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDQ5CiAgICAvLyBhc3NlcnQocHJpemVCb3guY3JlYXRvciA9PT0gQXBwbGljYXRpb24oZ2V0QWtpdGFBcHBMaXN0KGFraXRhREFPKS5wcml6ZUJveCkuYWRkcmVzcywgRVJSX05PVF9BX1BSSVpFX0JPWCkKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NAogICAgLy8gY29uc3QgW2FwcExpc3RCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhha2l0YURBTywgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNBa2l0YUFwcExpc3QpKQogICAgdW5jb3ZlciAyCiAgICBieXRlYyA4IC8vICJhYWwiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ0OQogICAgLy8gYXNzZXJ0KHByaXplQm94LmNyZWF0b3IgPT09IEFwcGxpY2F0aW9uKGdldEFraXRhQXBwTGlzdChha2l0YURBTykucHJpemVCb3gpLmFkZHJlc3MsIEVSUl9OT1RfQV9QUklaRV9CT1gpCiAgICBwdXNoaW50IDI0CiAgICBleHRyYWN0X3VpbnQ2NAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGFzc2VydCAvLyBOQVBCCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjQ1MAogICAgLy8gY29uc3QgW293bmVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMocHJpemVCb3gsIEJ5dGVzKFByaXplQm94R2xvYmFsU3RhdGVLZXlPd25lcikpCiAgICBwdXNoYnl0ZXMgIm93bmVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGdldFByaXplQm94T3duZXIodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZCkgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX1BSSVpFX0JPWF9PV05FUikKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAOQogICAgYnl0ZWMgMTIgLy8gIkVSUjpOUEJPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5QQk8KCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAOToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyMTEKICAgIC8vIGxvZ2dlZEFzc2VydChiaWRNaW5pbXVtSW5jcmVhc2UgPiAwLCBFUlJfQklEU19NVVNUX0FMV0FZU19JTkNSRUFTRSkKICAgIGRpZyA4CiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEAxMQogICAgYnl0ZWMgMTUgLy8gIkVSUjpCSU5DIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOkJJTkMKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjEyCiAgICAvLyBsb2dnZWRBc3NlcnQoZW5kVGltZXN0YW1wID4gc3RhcnRUaW1lc3RhbXAgKyAzMDAsIEVSUl9FTkRfTVVTVF9CRV9BVExFQVNUX0ZJVkVfTUlOVVRFU19BRlRFUl9TVEFSVCkKICAgIGRpZyA2CiAgICBwdXNoaW50IDMwMAogICAgKwogICAgZGlnIDUKICAgIDwKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDEzCiAgICBieXRlYyAxNiAvLyAiRVJSOkVNRk0iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6RU1GTQoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEAxMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjEzCiAgICAvLyBsb2dnZWRBc3NlcnQodGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cywgRVJSX0NPTlRSQUNUX05PVF9TRVQpCiAgICBib3hfbGVuCiAgICBidXJ5IDEKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDE1CiAgICBieXRlYyA5IC8vICJFUlI6Q05TVCIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpDTlNUCgpuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDE1OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxNgogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb0JpZCA/IDAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGRpZyAxMwogICAgYm56IG5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X2ZhbHNlQDE3CiAgICBpbnRjXzAgLy8gMAogICAgYnVyeSAyMQoKbmV3UHJpemVCb3hBdWN0aW9uX3Rlcm5hcnlfbWVyZ2VAMTg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjI3CiAgICAvLyBpZiAoaXNBbGdvQmlkKSB7CiAgICBkaWcgMTMKICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fZWxzZV9ib2R5QDIwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2NzAwMAogICAgYnVyeSAyMgoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjMzCiAgICAvLyBjb25zdCBjaGlsZEFwcE1CUjogdWludDY0ID0gR2xvYmFsLm1pbkJhbGFuY2UgKyBvcHRpbk1CUiArICh3ZWlnaHRzTGlzdENvdW50ICogY29zdHMud2VpZ2h0cykgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBkaWcgMjEKICAgICsKICAgIGRpZyAxCiAgICBpbnRjIDYgLy8gMTMxMTMzMDAKICAgICoKICAgIGR1cAogICAgYnVyeSAyMAogICAgKwogICAgZGlnIDIyCiAgICArCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM1LTIzNwogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIGludGMgNyAvLyAxNjEyNTAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjM1LTIzOAogICAgLy8gTUFYX1BST0dSQU1fUEFHRVMgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfVUlOVF9DT1NUICogYXVjdGlvbi5nbG9iYWxVaW50cykgKwogICAgLy8gKEdMT0JBTF9TVEFURV9LRVlfQllURVNfQ09TVCAqIGF1Y3Rpb24uZ2xvYmFsQnl0ZXMpICsKICAgIC8vIGNoaWxkQXBwTUJSCiAgICArCiAgICBidXJ5IDE5CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQyCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsIEVSUl9JTlZBTElEX1BBWU1FTlQpCiAgICBkaWcgMTUKICAgIGd0eG5zIFJlY2VpdmVyCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDIzCiAgICBieXRlYyA3IC8vICJFUlI6SVBBWSIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJUEFZCgpuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDIzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0MwogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQuYW1vdW50ID09PSB0b3RhbE1CUiwgRVJSX0lOVkFMSURfUEFZTUVOVCkKICAgIGRpZyAxNQogICAgZ3R4bnMgQW1vdW50CiAgICBkaWcgMTkKICAgID09CiAgICBibnogbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEAyNQogICAgYnl0ZWMgNyAvLyAiRVJSOklQQVkiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6SVBBWQoKbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2Fzc2VydEAyNToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNDUKICAgIC8vIGNvbnN0IGNyZWF0b3JSb3lhbHR5ID0gcm95YWx0aWVzKHRoaXMuYWtpdGFEQU8udmFsdWUsIEFzc2V0KDApLCAnJywgW10pCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjQ1CiAgICAvLyBjb25zdCBjcmVhdG9yUm95YWx0eSA9IHJveWFsdGllcyh0aGlzLmFraXRhREFPLnZhbHVlLCBBc3NldCgwKSwgJycsIFtdKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICBwdXNoYnl0ZXMgIiIKICAgIGJ5dGVjIDIyIC8vIDB4MDAwMAogICAgY2FsbHN1YiByb3lhbHRpZXMKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNDgKICAgIC8vIGNvbnN0IGFwcHJvdmFsU2l6ZSA9IHRoaXMuYm94ZWRDb250cmFjdC5sZW5ndGgKICAgIGJveF9sZW4KICAgIGFzc2VydCAvLyBCb3ggbXVzdCBoYXZlIHZhbHVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI0OQogICAgLy8gY29uc3QgY2h1bmsxID0gdGhpcy5ib3hlZENvbnRyYWN0LmV4dHJhY3QoMCwgNDA5NikKICAgIGludGNfMCAvLyAwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgYm94X2V4dHJhY3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTAKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBzd2FwCiAgICBpbnRjIDUgLy8gNDA5NgogICAgLQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTAKICAgIC8vIGNvbnN0IGNodW5rMiA9IHRoaXMuYm94ZWRDb250cmFjdC5leHRyYWN0KDQwOTYsIGFwcHJvdmFsU2l6ZSAtIDQwOTYpCiAgICBpbnRjIDUgLy8gNDA5NgogICAgdW5jb3ZlciAyCiAgICBib3hfZXh0cmFjdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI1Mi0yNzQKICAgIC8vIGNvbnN0IGF1Y3Rpb25BcHAgPSBhdWN0aW9uLmNhbGwKICAgIC8vICAgLmNyZWF0ZSh7CiAgICAvLyAgICAgYXJnczogWwogICAgLy8gICAgICAgcHJpemVCb3hUcmFuc2ZlclR4bi5hcHBJZC5pZCwKICAgIC8vICAgICAgIHRydWUsCiAgICAvLyAgICAgICBiaWRBc3NldElELAogICAgLy8gICAgICAgYmlkRmVlLAogICAgLy8gICAgICAgc3RhcnRpbmdCaWQsCiAgICAvLyAgICAgICBiaWRNaW5pbXVtSW5jcmVhc2UsCiAgICAvLyAgICAgICBzdGFydFRpbWVzdGFtcCwKICAgIC8vICAgICAgIGVuZFRpbWVzdGFtcCwKICAgIC8vICAgICAgIHsgYWNjb3VudDogcGF5bWVudC5zZW5kZXIsIGFtb3VudDogdG90YWxNQlIgfSwKICAgIC8vICAgICAgIFR4bi5zZW5kZXIsCiAgICAvLyAgICAgICBjcmVhdG9yUm95YWx0eSwKICAgIC8vICAgICAgIGdhdGVJRCwKICAgIC8vICAgICAgIG1hcmtldHBsYWNlLAogICAgLy8gICAgICAgdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIC8vICAgICAgIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICAvLyAgICAgXSwKICAgIC8vICAgICBhcHByb3ZhbFByb2dyYW06IFtjaHVuazEsIGNodW5rMl0sCiAgICAvLyAgICAgY2xlYXJTdGF0ZVByb2dyYW06IGF1Y3Rpb24uY2xlYXJTdGF0ZVByb2dyYW0sCiAgICAvLyAgICAgZXh0cmFQcm9ncmFtUGFnZXM6IDMKICAgIC8vICAgfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTUKICAgIC8vIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICBkaWcgMjIKICAgIGR1cAogICAgY292ZXIgNAogICAgaXRvYgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2MwogICAgLy8geyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgZGlnIDIwCiAgICBndHhucyBTZW5kZXIKICAgIGRpZyAyNAogICAgaXRvYgogICAgY29uY2F0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjY0CiAgICAvLyBUeG4uc2VuZGVyLAogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2NQogICAgLy8gY3JlYXRvclJveWFsdHksCiAgICB1bmNvdmVyIDUKICAgIGl0b2IKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjgKICAgIC8vIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzQKICAgIC8vIGNoaWxkQ29udHJhY3RWZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogQmFzZUZhY3RvcnlHbG9iYWxTdGF0ZUtleUNoaWxkQ29udHJhY3RWZXJzaW9uIH0pCiAgICBieXRlYyA2IC8vICJjaGlsZF9jb250cmFjdF92ZXJzaW9uIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2OAogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSwKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI2OQogICAgLy8geyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjkKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNjkKICAgIC8vIHsgYWtpdGFEQU86IHRoaXMuYWtpdGFEQU8udmFsdWUsIGFraXRhREFPRXNjcm93OiB0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlIH0sCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgc3dhcAogICAgaXRvYgogICAgYnl0ZWMgMTcgLy8gMHgwMDBhCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIyMAogICAgLy8gY29uc3QgYXVjdGlvbiA9IGNvbXBpbGVBcmM0KEF1Y3Rpb24pCiAgICBwdXNoaW50IDEwCiAgICBpdHhuX2ZpZWxkIEdsb2JhbE51bUJ5dGVTbGljZQogICAgcHVzaGludCAyNQogICAgaXR4bl9maWVsZCBHbG9iYWxOdW1VaW50CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjUyLTI3NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjczCiAgICAvLyBleHRyYVByb2dyYW1QYWdlczogMwogICAgcHVzaGludCAzCiAgICBpdHhuX2ZpZWxkIEV4dHJhUHJvZ3JhbVBhZ2VzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjIwCiAgICAvLyBjb25zdCBhdWN0aW9uID0gY29tcGlsZUFyYzQoQXVjdGlvbikKICAgIGJ5dGVjIDE4IC8vIGJhc2U2NChDNEVCUXc9PSkKICAgIGl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW1QYWdlcwogICAgdW5jb3ZlciA3CiAgICBpdHhuX2ZpZWxkIEFwcHJvdmFsUHJvZ3JhbVBhZ2VzCiAgICB1bmNvdmVyIDYKICAgIGl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtUGFnZXMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTItMjc0CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICBieXRlYyAxOSAvLyBtZXRob2QgImNyZWF0ZSh1aW50NjQsYm9vbCx1aW50NjQsdWludDY0LHVpbnQ2NCx1aW50NjQsdWludDY0LHVpbnQ2NCwoYWRkcmVzcyx1aW50NjQpLGFkZHJlc3MsdWludDY0LHVpbnQ2NCxhZGRyZXNzLHN0cmluZywodWludDY0LChzdHJpbmcsdWludDY0KSkpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjU2CiAgICAvLyB0cnVlLAogICAgcHVzaGJ5dGVzIDB4ODAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMjAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTgKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTYKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTUKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDQKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDMKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgNgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyA1CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjUyLTI3NAogICAgLy8gY29uc3QgYXVjdGlvbkFwcCA9IGF1Y3Rpb24uY2FsbAogICAgLy8gICAuY3JlYXRlKHsKICAgIC8vICAgICBhcmdzOiBbCiAgICAvLyAgICAgICBwcml6ZUJveFRyYW5zZmVyVHhuLmFwcElkLmlkLAogICAgLy8gICAgICAgdHJ1ZSwKICAgIC8vICAgICAgIGJpZEFzc2V0SUQsCiAgICAvLyAgICAgICBiaWRGZWUsCiAgICAvLyAgICAgICBzdGFydGluZ0JpZCwKICAgIC8vICAgICAgIGJpZE1pbmltdW1JbmNyZWFzZSwKICAgIC8vICAgICAgIHN0YXJ0VGltZXN0YW1wLAogICAgLy8gICAgICAgZW5kVGltZXN0YW1wLAogICAgLy8gICAgICAgeyBhY2NvdW50OiBwYXltZW50LnNlbmRlciwgYW1vdW50OiB0b3RhbE1CUiB9LAogICAgLy8gICAgICAgVHhuLnNlbmRlciwKICAgIC8vICAgICAgIGNyZWF0b3JSb3lhbHR5LAogICAgLy8gICAgICAgZ2F0ZUlELAogICAgLy8gICAgICAgbWFya2V0cGxhY2UsCiAgICAvLyAgICAgICB0aGlzLmNoaWxkQ29udHJhY3RWZXJzaW9uLnZhbHVlLAogICAgLy8gICAgICAgeyBha2l0YURBTzogdGhpcy5ha2l0YURBTy52YWx1ZSwgYWtpdGFEQU9Fc2Nyb3c6IHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUgfSwKICAgIC8vICAgICBdLAogICAgLy8gICAgIGFwcHJvdmFsUHJvZ3JhbTogW2NodW5rMSwgY2h1bmsyXSwKICAgIC8vICAgICBjbGVhclN0YXRlUHJvZ3JhbTogYXVjdGlvbi5jbGVhclN0YXRlUHJvZ3JhbSwKICAgIC8vICAgICBleHRyYVByb2dyYW1QYWdlczogMwogICAgLy8gICB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNTItMjc2CiAgICAvLyBjb25zdCBhdWN0aW9uQXBwID0gYXVjdGlvbi5jYWxsCiAgICAvLyAgIC5jcmVhdGUoewogICAgLy8gICAgIGFyZ3M6IFsKICAgIC8vICAgICAgIHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQuaWQsCiAgICAvLyAgICAgICB0cnVlLAogICAgLy8gICAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgICAgIGJpZEZlZSwKICAgIC8vICAgICAgIHN0YXJ0aW5nQmlkLAogICAgLy8gICAgICAgYmlkTWluaW11bUluY3JlYXNlLAogICAgLy8gICAgICAgc3RhcnRUaW1lc3RhbXAsCiAgICAvLyAgICAgICBlbmRUaW1lc3RhbXAsCiAgICAvLyAgICAgICB7IGFjY291bnQ6IHBheW1lbnQuc2VuZGVyLCBhbW91bnQ6IHRvdGFsTUJSIH0sCiAgICAvLyAgICAgICBUeG4uc2VuZGVyLAogICAgLy8gICAgICAgY3JlYXRvclJveWFsdHksCiAgICAvLyAgICAgICBnYXRlSUQsCiAgICAvLyAgICAgICBtYXJrZXRwbGFjZSwKICAgIC8vICAgICAgIHRoaXMuY2hpbGRDb250cmFjdFZlcnNpb24udmFsdWUsCiAgICAvLyAgICAgICB7IGFraXRhREFPOiB0aGlzLmFraXRhREFPLnZhbHVlLCBha2l0YURBT0VzY3JvdzogdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSB9LAogICAgLy8gICAgIF0sCiAgICAvLyAgICAgYXBwcm92YWxQcm9ncmFtOiBbY2h1bmsxLCBjaHVuazJdLAogICAgLy8gICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBhdWN0aW9uLmNsZWFyU3RhdGVQcm9ncmFtLAogICAgLy8gICAgIGV4dHJhUHJvZ3JhbVBhZ2VzOiAzCiAgICAvLyAgIH0pCiAgICAvLyAgIC5pdHhuCiAgICAvLyAgIC5jcmVhdGVkQXBwCiAgICBnaXR4biAwIENyZWF0ZWRBcHBsaWNhdGlvbklECiAgICBkdXAKICAgIGJ1cnkgMjUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzgtMjgxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFthdWN0aW9uQXBwLmFkZHJlc3NdCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI4MAogICAgLy8gYXJnczogW2F1Y3Rpb25BcHAuYWRkcmVzc10KICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgdW5jb3ZlciAyCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyNzgtMjgxCiAgICAvLyBhYmlDYWxsPHR5cGVvZiBQcml6ZUJveC5wcm90b3R5cGUudHJhbnNmZXI+KHsKICAgIC8vICAgYXBwSWQ6IHByaXplQm94VHJhbnNmZXJUeG4uYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFthdWN0aW9uQXBwLmFkZHJlc3NdCiAgICAvLyB9KQogICAgYnl0ZWMgMjEgLy8gbWV0aG9kICJ0cmFuc2ZlcihhZGRyZXNzKXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI4NgogICAgLy8gcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyODcKICAgIC8vIGFtb3VudDogR2xvYmFsLm1pbkJhbGFuY2UgKyBkaXNidXJzZW1lbnRNQlIKICAgIGdsb2JhbCBNaW5CYWxhbmNlCiAgICBkaWcgMjMKICAgICsKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4OAogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mjg0LTI4OQogICAgLy8gaXR4bgogICAgLy8gICAucGF5bWVudCh7CiAgICAvLyAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICBhbW91bnQ6IEdsb2JhbC5taW5CYWxhbmNlICsgZGlzYnVyc2VtZW50TUJSCiAgICAvLyAgIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTEKICAgIC8vIGlmICghaXNBbGdvQmlkKSB7CiAgICBkaWcgMTMKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDMyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjkzLTMwMgogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTcKICAgIC8vIHJlY2VpdmVyOiBhdWN0aW9uQXBwLmFkZHJlc3MsCiAgICBkaWcgMjIKICAgIGR1cAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjI5OAogICAgLy8gYW1vdW50OiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czoyOTYtMjk5CiAgICAvLyBpdHhuLnBheW1lbnQoewogICAgLy8gICByZWNlaXZlcjogYXVjdGlvbkFwcC5hZGRyZXNzLAogICAgLy8gICBhbW91bnQ6IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZQogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjkzLTMwMgogICAgLy8gYXVjdGlvbi5jYWxsLm9wdGluKHsKICAgIC8vICAgYXBwSWQ6IGF1Y3Rpb25BcHAsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGF1Y3Rpb25BcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlCiAgICAvLyAgICAgfSksCiAgICAvLyAgICAgYmlkQXNzZXRJRCwKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIGJ5dGVjIDExIC8vIG1ldGhvZCAib3B0aW4ocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxNAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CgpuZXdQcml6ZUJveEF1Y3Rpb25fYWZ0ZXJfaWZfZWxzZUAzMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMDYKICAgIC8vIGlmIChiaWRGZWUgPiAwKSB7CiAgICBkaWcgMTEKICAgIGJ6IG5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDM2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzA4LTMxNwogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX2JlZ2luCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzEyCiAgICAvLyByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIGRpZyAyMgogICAgZHVwCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBkaWcgMTkKICAgIGl0eG5fZmllbGQgQW1vdW50CiAgICBpdHhuX2ZpZWxkIFJlY2VpdmVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzExLTMxNAogICAgLy8gaXR4bi5wYXltZW50KHsKICAgIC8vICAgcmVjZWl2ZXI6IEFwcGxpY2F0aW9uKGF1Y3Rpb25BcHAuaWQpLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gfSksCiAgICBpbnRjXzEgLy8gMQogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzA4LTMxNwogICAgLy8gYXVjdGlvbi5jYWxsLmluaXQoewogICAgLy8gICBhcHBJZDogYXVjdGlvbkFwcC5pZCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogQXBwbGljYXRpb24oYXVjdGlvbkFwcC5pZCkuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogd2VpZ2h0c01CUgogICAgLy8gICAgIH0pLAogICAgLy8gICAgIHdlaWdodHNMaXN0Q291bnQsCiAgICAvLyAgIF0KICAgIC8vIH0pCiAgICBpdHhuX25leHQKICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIE9uQ29tcGxldGlvbgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBieXRlYyAyMCAvLyBtZXRob2QgImluaXQocGF5LHVpbnQ2NCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGRpZyAxCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKCm5ld1ByaXplQm94QXVjdGlvbl9hZnRlcl9pZl9lbHNlQDM2OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjE5Mi0yMDQKICAgIC8vIG5ld1ByaXplQm94QXVjdGlvbigKICAgIC8vICAgcHJpemVCb3hUcmFuc2ZlclR4bjogZ3R4bi5BcHBsaWNhdGlvbkNhbGxUeG4sCiAgICAvLyAgIHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwKICAgIC8vICAgYmlkQXNzZXRJRDogdWludDY0LCAvLyAwIHwgQXNzZXQKICAgIC8vICAgYmlkRmVlOiB1aW50NjQsCiAgICAvLyAgIHN0YXJ0aW5nQmlkOiB1aW50NjQsCiAgICAvLyAgIGJpZE1pbmltdW1JbmNyZWFzZTogdWludDY0LAogICAgLy8gICBzdGFydFRpbWVzdGFtcDogdWludDY0LAogICAgLy8gICBlbmRUaW1lc3RhbXA6IHVpbnQ2NCwKICAgIC8vICAgZ2F0ZUlEOiB1aW50NjQsCiAgICAvLyAgIG1hcmtldHBsYWNlOiBBY2NvdW50LAogICAgLy8gICB3ZWlnaHRzTGlzdENvdW50OiB1aW50NjQKICAgIC8vICk6IHVpbnQ2NCB7CiAgICBkaWcgMjIKICAgIGl0b2IKICAgIGJ5dGVjIDQgLy8gMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCm5ld1ByaXplQm94QXVjdGlvbl9lbHNlX2JvZHlAMjA6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MjMwCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzMAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgMTQKICAgIGNhbGxzdWIgcmV3YXJkc09wdEluQ29zdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDEwIC8vIDI2ODAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIzMAogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgICsKICAgIGJ1cnkgMjIKICAgIGIgbmV3UHJpemVCb3hBdWN0aW9uX2FmdGVyX2lmX2Vsc2VAMjEKCm5ld1ByaXplQm94QXVjdGlvbl90ZXJuYXJ5X2ZhbHNlQDE3OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjIxNgogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IGlzQWxnb0JpZCA/IDAgOiBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgYnVyeSAyMQogICAgYiBuZXdQcml6ZUJveEF1Y3Rpb25fdGVybmFyeV9tZXJnZUAxOAoKbmV3UHJpemVCb3hBdWN0aW9uX2Jvb2xfZmFsc2VANDoKICAgIGludGNfMCAvLyAwCiAgICBiIG5ld1ByaXplQm94QXVjdGlvbl9ib29sX21lcmdlQDUKCgovLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6OkF1Y3Rpb25GYWN0b3J5LmRlbGV0ZUF1Y3Rpb25BcHBbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVBdWN0aW9uQXBwOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyMwogICAgLy8gZGVsZXRlQXVjdGlvbkFwcChhcHBJZDogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyNAogICAgLy8gbG9nZ2VkQXNzZXJ0KGFwcElkLmNyZWF0b3IgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfTk9UX0FOX0FVQ1RJT04pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBDcmVhdG9yCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgPT0KICAgIGJueiBkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyAyMyAvLyAiRVJSOk5BVUMiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkFVQwoKZGVsZXRlQXVjdGlvbkFwcF9hZnRlcl9hc3NlcnRAMzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjUKICAgIC8vIGNvbnN0IHNlbGxlciA9IEFjY291bnQob3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEF1Y3Rpb25HbG9iYWxTdGF0ZUtleVNlbGxlcikpWzBdKQogICAgZHVwCiAgICBieXRlYyAyNCAvLyAic2VsbGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyNgogICAgLy8gbG9nZ2VkQXNzZXJ0KHNlbGxlciA9PT0gVHhuLnNlbmRlciwgRVJSX05PVF9QUklaRV9CT1hfT1dORVIpCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgYm56IGRlbGV0ZUF1Y3Rpb25BcHBfYWZ0ZXJfYXNzZXJ0QDUKICAgIGJ5dGVjIDEyIC8vICJFUlI6TlBCTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOUEJPCgpkZWxldGVBdWN0aW9uQXBwX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo0NTUKICAgIC8vIGNvbnN0IFtmdW5kZXJCeXRlc10gPSBvcC5BcHBHbG9iYWwuZ2V0RXhCeXRlcyhhcHBJZCwgQnl0ZXMoR2xvYmFsU3RhdGVLZXlGdW5kZXIpKQogICAgZHVwbiAyCiAgICBieXRlYyAyNSAvLyAiZnVuZGVyIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMyOAogICAgLy8gY29uc3QgeyBhY2NvdW50OiByZWNlaXZlciwgYW1vdW50IH0gPSBnZXRGdW5kZXIoYXBwSWQpCiAgICBkdXAKICAgIGV4dHJhY3QgMCAzMgogICAgc3dhcAogICAgcHVzaGludCAzMgogICAgZXh0cmFjdF91aW50NjQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzIKICAgIC8vIGF1Y3Rpb24uY2FsbC5kZWxldGVBcHBsaWNhdGlvbih7IGFwcElkIH0pCiAgICBpdHhuX2JlZ2luCiAgICBwdXNoaW50IDUKICAgIGl0eG5fZmllbGQgT25Db21wbGV0aW9uCiAgICB1bmNvdmVyIDIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25JRAogICAgcHVzaGJ5dGVzIDB4MjQ4N2MzMmMgLy8gbWV0aG9kICJkZWxldGVBcHBsaWNhdGlvbigpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzNC0zMzYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzQtMzM1CiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjMzNC0zMzYKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMjMKICAgIC8vIGRlbGV0ZUF1Y3Rpb25BcHAoYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5jYW5jZWxBdWN0aW9uW3JvdXRpbmddKCkgLT4gdm9pZDoKY2FuY2VsQXVjdGlvbjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzkKICAgIC8vIGNhbmNlbEF1Y3Rpb24oYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAxCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDAKICAgIC8vIGxvZ2dlZEFzc2VydChhcHBJZC5jcmVhdG9yID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcywgRVJSX05PVF9BTl9BVUNUSU9OKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQ3JlYXRvcgogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKICAgID09CiAgICBibnogY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgMjMgLy8gIkVSUjpOQVVDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5BVUMKCmNhbmNlbEF1Y3Rpb25fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzQxCiAgICAvLyBjb25zdCBzZWxsZXIgPSBBY2NvdW50KG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFwcElkLCBCeXRlcyhBdWN0aW9uR2xvYmFsU3RhdGVLZXlTZWxsZXIpKVswXSkKICAgIGR1cAogICAgYnl0ZWMgMjQgLy8gInNlbGxlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDIKICAgIC8vIGxvZ2dlZEFzc2VydChzZWxsZXIgPT09IFR4bi5zZW5kZXIsIEVSUl9OT1RfUFJJWkVfQk9YX09XTkVSKQogICAgdHhuIFNlbmRlcgogICAgPT0KICAgIGJueiBjYW5jZWxBdWN0aW9uX2FmdGVyX2Fzc2VydEA1CiAgICBieXRlYyAxMiAvLyAiRVJSOk5QQk8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TlBCTwoKY2FuY2VsQXVjdGlvbl9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NDU1CiAgICAvLyBjb25zdCBbZnVuZGVyQnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYXBwSWQsIEJ5dGVzKEdsb2JhbFN0YXRlS2V5RnVuZGVyKSkKICAgIGR1cG4gMgogICAgYnl0ZWMgMjUgLy8gImZ1bmRlciIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNDQKICAgIC8vIGNvbnN0IHsgYWNjb3VudDogcmVjZWl2ZXIsIGFtb3VudCB9ID0gZ2V0RnVuZGVyKGFwcElkKQogICAgZHVwCiAgICBleHRyYWN0IDAgMzIKICAgIHN3YXAKICAgIHB1c2hpbnQgMzIKICAgIGV4dHJhY3RfdWludDY0CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzQ4CiAgICAvLyBhdWN0aW9uLmNhbGwuY2FuY2VsKHsgYXBwSWQgfSkKICAgIGl0eG5fYmVnaW4KICAgIHB1c2hpbnQgNQogICAgaXR4bl9maWVsZCBPbkNvbXBsZXRpb24KICAgIHVuY292ZXIgMgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHgzMWYyNmE5YiAvLyBtZXRob2QgImNhbmNlbCgpdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBpbnRjXzMgLy8gYXBwbAogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1MC0zNTIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9iZWdpbgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNTAtMzUxCiAgICAvLyBpdHhuCiAgICAvLyAgIC5wYXltZW50KHsgYW1vdW50LCByZWNlaXZlciB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1MC0zNTIKICAgIC8vIGl0eG4KICAgIC8vICAgLnBheW1lbnQoeyBhbW91bnQsIHJlY2VpdmVyIH0pCiAgICAvLyAgIC5zdWJtaXQoKQogICAgaXR4bl9zdWJtaXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozMzkKICAgIC8vIGNhbmNlbEF1Y3Rpb24oYXBwSWQ6IEFwcGxpY2F0aW9uKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjpBdWN0aW9uRmFjdG9yeS5uZXdBdWN0aW9uQ29zdFtyb3V0aW5nXSgpIC0+IHZvaWQ6Cm5ld0F1Y3Rpb25Db3N0OgogICAgcHVzaGJ5dGVzICIiCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzU1CiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzEgLy8gMQogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC5ib29sCiAgICBpbnRjXzAgLy8gMAogICAgZ2V0Yml0CiAgICBkdXAKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIGR1cAogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgNAogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgY292ZXIgMgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1OAogICAgLy8gY29uc3QgaXNBbGdvQmlkID0gYmlkQXNzZXRJRCA9PT0gMAogICAgIQogICAgc3dhcAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1OQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc1ByaXplQm94ID8gKGlzQWxnb0JpZCA/IDAgOiAxKSA6IChpc0FsZ29CaWQgPyAxIDogMikpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGNvdmVyIDIKICAgIGJ6IG5ld0F1Y3Rpb25Db3N0X3Rlcm5hcnlfZmFsc2VAMwogICAgIQoKbmV3QXVjdGlvbkNvc3RfdGVybmFyeV9tZXJnZUA0OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM1OQogICAgLy8gY29uc3Qgb3B0aW5NQlI6IHVpbnQ2NCA9IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqIChpc1ByaXplQm94ID8gKGlzQWxnb0JpZCA/IDAgOiAxKSA6IChpc0FsZ29CaWQgPyAxIDogMikpCiAgICBkaWcgMQogICAgKgogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY3CiAgICAvLyBpZiAoIWlzUHJpemVCb3gpIHsKICAgIGRpZyA0CiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDkKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNjgKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBwcml6ZUFzc2V0SUQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY4CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyAzCiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA0IC8vIDY3MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzY4CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCgxKSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgcHJpemVBc3NldElEKQogICAgKwogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM2OQogICAgLy8gaWYgKGlzQWxnb0JpZCkgewogICAgZGlnIDQKICAgIGJueiBuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlANwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Z1bmN0aW9ucy50czo1MDEKICAgIC8vIHJldHVybiAoTWluRGlzYnVyc2VtZW50c01CUiArIFVzZXJBbGxvY2F0aW9uTUJSKSAqIGNvdW50CiAgICBpbnRjIDQgLy8gNjcwMDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzAKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDEpCiAgICArCgpuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM4MAogICAgLy8gY29uc3QgY2hpbGRBcHBNQlI6IHVpbnQ2NCA9IEdsb2JhbC5taW5CYWxhbmNlICsgb3B0aW5NQlIgKyAod2VpZ2h0c0xpc3RDb3VudCAqIGNvc3RzLndlaWdodHMpICsgZGlzYnVyc2VtZW50TUJSCiAgICBnbG9iYWwgTWluQmFsYW5jZQogICAgZGlnIDcKICAgICsKICAgIGRpZyAzCiAgICBpbnRjIDYgLy8gMTMxMTMzMDAKICAgICoKICAgICsKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODItMzg0CiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgaW50YyA3IC8vIDE2MTI1MDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozODItMzg1CiAgICAvLyBNQVhfUFJPR1JBTV9QQUdFUyArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9VSU5UX0NPU1QgKiBhdWN0aW9uLmdsb2JhbFVpbnRzKSArCiAgICAvLyAoR0xPQkFMX1NUQVRFX0tFWV9CWVRFU19DT1NUICogYXVjdGlvbi5nbG9iYWxCeXRlcykgKwogICAgLy8gY2hpbGRBcHBNQlIKICAgICsKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNTUKICAgIC8vIEBhYmltZXRob2QoeyByZWFkb25seTogdHJ1ZSB9KQogICAgaXRvYgogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICBzd2FwCiAgICBjb25jYXQKICAgIGxvZwogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgoKbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDc6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzcyCiAgICAvLyBkaXNidXJzZW1lbnRNQlIgKz0gZGlzYnVyc2VtZW50Q29zdCg1KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy9hdWN0aW9uL2ZhY3RvcnkuYWxnby50czozNzIKICAgIC8vIGRpc2J1cnNlbWVudE1CUiArPSBkaXNidXJzZW1lbnRDb3N0KDUpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGRpZyA1CiAgICBjYWxsc3ViIHJld2FyZHNPcHRJbkNvc3QKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTAxCiAgICAvLyByZXR1cm4gKE1pbkRpc2J1cnNlbWVudHNNQlIgKyBVc2VyQWxsb2NhdGlvbk1CUikgKiBjb3VudAogICAgaW50YyA5IC8vIDMzNTAwMAogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3MgogICAgLy8gZGlzYnVyc2VtZW50TUJSICs9IGRpc2J1cnNlbWVudENvc3QoNSkgKyByZXdhcmRzT3B0SW5Db3N0KHRoaXMuYWtpdGFEQU8udmFsdWUsIGJpZEFzc2V0SUQpCiAgICArCiAgICArCiAgICBiIG5ld0F1Y3Rpb25Db3N0X2FmdGVyX2lmX2Vsc2VAMTMKCm5ld0F1Y3Rpb25Db3N0X2Vsc2VfYm9keUA5OgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NAogICAgLy8gfSBlbHNlIGlmIChpc0FsZ29CaWQpIHsKICAgIGRpZyAzCiAgICBibnogbmV3QXVjdGlvbkNvc3RfZWxzZV9ib2R5QDExCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgNCAvLyA2NzAwMAogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF9lbHNlX2JvZHlAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL2F1Y3Rpb24vZmFjdG9yeS5hbGdvLnRzOjM3NwogICAgLy8gZGlzYnVyc2VtZW50TUJSID0gZGlzYnVyc2VtZW50Q29zdCg0KSArIHJld2FyZHNPcHRJbkNvc3QodGhpcy5ha2l0YURBTy52YWx1ZSwgYmlkQXNzZXRJRCkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBkaWcgNAogICAgY2FsbHN1YiByZXdhcmRzT3B0SW5Db3N0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjUwMQogICAgLy8gcmV0dXJuIChNaW5EaXNidXJzZW1lbnRzTUJSICsgVXNlckFsbG9jYXRpb25NQlIpICogY291bnQKICAgIGludGMgMTAgLy8gMjY4MDAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6Mzc3CiAgICAvLyBkaXNidXJzZW1lbnRNQlIgPSBkaXNidXJzZW1lbnRDb3N0KDQpICsgcmV3YXJkc09wdEluQ29zdCh0aGlzLmFraXRhREFPLnZhbHVlLCBiaWRBc3NldElEKQogICAgKwogICAgYiBuZXdBdWN0aW9uQ29zdF9hZnRlcl9pZl9lbHNlQDEzCgpuZXdBdWN0aW9uQ29zdF90ZXJuYXJ5X2ZhbHNlQDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvYXVjdGlvbi9mYWN0b3J5LmFsZ28udHM6MzU5CiAgICAvLyBjb25zdCBvcHRpbk1CUjogdWludDY0ID0gR2xvYmFsLmFzc2V0T3B0SW5NaW5CYWxhbmNlICogKGlzUHJpemVCb3ggPyAoaXNBbGdvQmlkID8gMCA6IDEpIDogKGlzQWxnb0JpZCA/IDEgOiAyKSkKICAgIHB1c2hpbnQgMgogICAgaW50Y18xIC8vIDEKICAgIHVuY292ZXIgMgogICAgc2VsZWN0CiAgICBiIG5ld0F1Y3Rpb25Db3N0X3Rlcm5hcnlfbWVyZ2VANAoKCi8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjpGYWN0b3J5Q29udHJhY3QuaW5pdEJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgppbml0Qm94ZWRDb250cmFjdDoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQyCiAgICAvLyBpbml0Qm94ZWRDb250cmFjdCh2ZXJzaW9uOiBzdHJpbmcsIHNpemU6IHVpbnQ2NCk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGxlbgogICAgaW50Y18yIC8vIDgKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQudWludDY0CiAgICBidG9pCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozNAogICAgLy8gY2hpbGRDb250cmFjdFZlcnNpb24gPSBHbG9iYWxTdGF0ZTxzdHJpbmc+KHsga2V5OiBCYXNlRmFjdG9yeUdsb2JhbFN0YXRlS2V5Q2hpbGRDb250cmFjdFZlcnNpb24gfSkKICAgIGJ5dGVjIDYgLy8gImNoaWxkX2NvbnRyYWN0X3ZlcnNpb24iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MwogICAgLy8gdGhpcy5jaGlsZENvbnRyYWN0VmVyc2lvbi52YWx1ZSA9IHZlcnNpb24KICAgIHN3YXAKICAgIGFwcF9nbG9iYWxfcHV0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDQKICAgIC8vIGlmICghdGhpcy5ib3hlZENvbnRyYWN0LmV4aXN0cykgewogICAgYm94X2xlbgogICAgYnVyeSAxCiAgICBibnogaW5pdEJveGVkQ29udHJhY3RfZWxzZV9ib2R5QDUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjQ1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gR2xvYmFsLmNyZWF0b3JBZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIGdsb2JhbCBDcmVhdG9yQWRkcmVzcwogICAgPT0KICAgIGJueiBpbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANAogICAgYnl0ZWMgNSAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDYKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5jcmVhdGUoeyBzaXplIH0pCiAgICBkaWcgMQogICAgYm94X2NyZWF0ZQogICAgcG9wCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9pZl9lbHNlQDg6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0MgogICAgLy8gaW5pdEJveGVkQ29udHJhY3QodmVyc2lvbjogc3RyaW5nLCBzaXplOiB1aW50NjQpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCmluaXRCb3hlZENvbnRyYWN0X2Vsc2VfYm9keUA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NDgKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGluaXRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEA3CiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgppbml0Qm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRANzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjM4CiAgICAvLyBib3hlZENvbnRyYWN0ID0gQm94PGJ5dGVzPih7IGtleTogQm94S2V5Qm94ZWRDb250cmFjdCB9KQogICAgYnl0ZWNfMSAvLyAiYmMiCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo0OQogICAgLy8gdGhpcy5ib3hlZENvbnRyYWN0LnJlc2l6ZShzaXplKQogICAgZGlnIDEKICAgIGJveF9yZXNpemUKICAgIGIgaW5pdEJveGVkQ29udHJhY3RfYWZ0ZXJfaWZfZWxzZUA4CgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6OkZhY3RvcnlDb250cmFjdC5sb2FkQm94ZWRDb250cmFjdFtyb3V0aW5nXSgpIC0+IHZvaWQ6CmxvYWRCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTMKICAgIC8vIGxvYWRCb3hlZENvbnRyYWN0KG9mZnNldDogdWludDY0LCBkYXRhOiBieXRlcyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNiAvLyBvbiBlcnJvcjogaW52YWxpZCBhcnJheSBsZW5ndGggaGVhZGVyCiAgICBwdXNoaW50IDIKICAgICsKICAgIGRpZyAxCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxhcmM0LnVpbnQ4PgogICAgZXh0cmFjdCAyIDAKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU0CiAgICAvLyBjb25zdCBleHBlY3RlZFByZXZpb3VzQ2FsbHM6IHVpbnQ2NCA9IG9mZnNldCAvIDIwMzIKICAgIHB1c2hpbnQgMjAzMgogICAgLwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTUKICAgIC8vIGNvbnN0IHR4biA9IGd0eG4uVHJhbnNhY3Rpb24oVHhuLmdyb3VwSW5kZXggLSBleHBlY3RlZFByZXZpb3VzQ2FsbHMgLSAxKQogICAgdHhuIEdyb3VwSW5kZXgKICAgIHN3YXAKICAgIC0KICAgIGludGNfMSAvLyAxCiAgICAtCiAgICBkdXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3CiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludGNfMyAvLyA2CiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTgKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1OAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIGR1cAogICAgZ3R4bnMgQXBwbGljYXRpb25JRAogICAgZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTgKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgYnogbG9hZEJveGVkQ29udHJhY3RfYm9vbF9mYWxzZUA4CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1OQogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGR1cAogICAgZ3R4bnMgTnVtQXBwQXJncwogICAgcHVzaGludCAzCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNTkKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjAKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgZHVwCiAgICBndHhucyBPbkNvbXBsZXRpb24KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjU3LTYwCiAgICAvLyB0eG4udHlwZSA9PT0gVHJhbnNhY3Rpb25UeXBlLkFwcGxpY2F0aW9uQ2FsbAogICAgLy8gJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICYmIHR4bi5udW1BcHBBcmdzID09PSAzCiAgICAvLyAmJiB0eG4ub25Db21wbGV0aW9uID09PSBPbkNvbXBsZXRlQWN0aW9uLk5vT3AKICAgIGJueiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjYxCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGd0eG5zYXMgQXBwbGljYXRpb25BcmdzCiAgICBieXRlYyAxMyAvLyBtZXRob2QgImluaXRCb3hlZENvbnRyYWN0KHN0cmluZyx1aW50NjQpdm9pZCIKICAgID09CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ny02MQogICAgLy8gdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICYmIHR4bi5hcHBJZCA9PT0gR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbklkCiAgICAvLyAmJiB0eG4ubnVtQXBwQXJncyA9PT0gMwogICAgLy8gJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAmJiB0eG4uYXBwQXJncygwKSA9PT0gbWV0aG9kU2VsZWN0b3IodGhpcy5pbml0Qm94ZWRDb250cmFjdCkKICAgIGJ6IGxvYWRCb3hlZENvbnRyYWN0X2Jvb2xfZmFsc2VAOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjIKICAgIC8vICYmIHR4bi5zZW5kZXIgPT09IFR4bi5zZW5kZXIKICAgIGR1cAogICAgZ3R4bnMgU2VuZGVyCiAgICB0eG4gU2VuZGVyCiAgICA9PQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NTctNjIKICAgIC8vIHR4bi50eXBlID09PSBUcmFuc2FjdGlvblR5cGUuQXBwbGljYXRpb25DYWxsCiAgICAvLyAmJiB0eG4uYXBwSWQgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25JZAogICAgLy8gJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICYmIHR4bi5vbkNvbXBsZXRpb24gPT09IE9uQ29tcGxldGVBY3Rpb24uTm9PcAogICAgLy8gJiYgdHhuLmFwcEFyZ3MoMCkgPT09IG1ldGhvZFNlbGVjdG9yKHRoaXMuaW5pdEJveGVkQ29udHJhY3QpCiAgICAvLyAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICBieiBsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDgKICAgIGludGNfMSAvLyAxCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1Ni02MwogICAgLy8gbG9nZ2VkQXNzZXJ0KCgKICAgIC8vICAgdHhuLnR5cGUgPT09IFRyYW5zYWN0aW9uVHlwZS5BcHBsaWNhdGlvbkNhbGwKICAgIC8vICAgJiYgdHhuLmFwcElkID09PSBHbG9iYWwuY3VycmVudEFwcGxpY2F0aW9uSWQKICAgIC8vICAgJiYgdHhuLm51bUFwcEFyZ3MgPT09IDMKICAgIC8vICAgJiYgdHhuLm9uQ29tcGxldGlvbiA9PT0gT25Db21wbGV0ZUFjdGlvbi5Ob09wCiAgICAvLyAgICYmIHR4bi5hcHBBcmdzKDApID09PSBtZXRob2RTZWxlY3Rvcih0aGlzLmluaXRCb3hlZENvbnRyYWN0KQogICAgLy8gICAmJiB0eG4uc2VuZGVyID09PSBUeG4uc2VuZGVyCiAgICAvLyApLCBFUlJfSU5WQUxJRF9DQUxMX09SREVSKQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMQogICAgcHVzaGJ5dGVzICJFUlI6SUNPUiIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpJQ09SCgpsb2FkQm94ZWRDb250cmFjdF9hZnRlcl9hc3NlcnRAMTE6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjQKICAgIC8vIGxvZ2dlZEFzc2VydCh0aGlzLmJveGVkQ29udHJhY3QuZXhpc3RzLCBFUlJfQ09OVFJBQ1RfTk9UX1NFVCkKICAgIGJveF9sZW4KICAgIGJ1cnkgMQogICAgYm56IGxvYWRCb3hlZENvbnRyYWN0X2FmdGVyX2Fzc2VydEAxMwogICAgYnl0ZWMgOSAvLyAiRVJSOkNOU1QiCiAgICBsb2cKICAgIGVyciAvLyBFUlI6Q05TVAoKbG9hZEJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDEzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6MzgKICAgIC8vIGJveGVkQ29udHJhY3QgPSBCb3g8Ynl0ZXM+KHsga2V5OiBCb3hLZXlCb3hlZENvbnRyYWN0IH0pCiAgICBieXRlY18xIC8vICJiYyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9mYWN0b3J5LnRzOjY1CiAgICAvLyB0aGlzLmJveGVkQ29udHJhY3QucmVwbGFjZShvZmZzZXQsIGRhdGEpCiAgICBkaWcgMwogICAgZGlnIDMKICAgIGJveF9yZXBsYWNlCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo1MwogICAgLy8gbG9hZEJveGVkQ29udHJhY3Qob2Zmc2V0OiB1aW50NjQsIGRhdGE6IGJ5dGVzKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgpsb2FkQm94ZWRDb250cmFjdF9ib29sX2ZhbHNlQDg6CiAgICBpbnRjXzAgLy8gMAogICAgYiBsb2FkQm94ZWRDb250cmFjdF9ib29sX21lcmdlQDkKCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo6RmFjdG9yeUNvbnRyYWN0LmRlbGV0ZUJveGVkQ29udHJhY3Rbcm91dGluZ10oKSAtPiB2b2lkOgpkZWxldGVCb3hlZENvbnRyYWN0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICB0eG4gU2VuZGVyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NjkKICAgIC8vIGxvZ2dlZEFzc2VydChUeG4uc2VuZGVyID09PSB0aGlzLmdldEFraXRhREFPV2FsbGV0KCkuYWRkcmVzcywgRVJSX05PVF9BS0lUQV9EQU8pCiAgICBhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCiAgICBhc3NlcnQgLy8gYXBwbGljYXRpb24gZXhpc3RzCiAgICA9PQogICAgYm56IGRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDMKICAgIGJ5dGVjIDUgLy8gIkVSUjpOREFPIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5EQU8KCmRlbGV0ZUJveGVkQ29udHJhY3RfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czozOAogICAgLy8gYm94ZWRDb250cmFjdCA9IEJveDxieXRlcz4oeyBrZXk6IEJveEtleUJveGVkQ29udHJhY3QgfSkKICAgIGJ5dGVjXzEgLy8gImJjIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2ZhY3RvcnkudHM6NzAKICAgIC8vIHRoaXMuYm94ZWRDb250cmFjdC5kZWxldGUoKQogICAgYm94X2RlbAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvZmFjdG9yeS50czo2OAogICAgLy8gZGVsZXRlQm94ZWRDb250cmFjdCgpOiB2b2lkIHsKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFGZWVHZW5lcmF0b3JDb250cmFjdFdpdGhPcHRJbi5vcHRJbltyb3V0aW5nXSgpIC0+IHZvaWQ6Cm9wdEluOgogICAgaW50Y18wIC8vIDAKICAgIGR1cG4gMgogICAgcHVzaGJ5dGVzICIiCiAgICBkdXBuIDMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5NAogICAgLy8gb3B0SW4ocGF5bWVudDogZ3R4bi5QYXltZW50VHhuLCBhc3NldDogQXNzZXQpOiB2b2lkIHsKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnRjXzEgLy8gMQogICAgLQogICAgZHVwbiAyCiAgICBndHhucyBUeXBlRW51bQogICAgaW50Y18xIC8vIHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBsZW4KICAgIGludGNfMiAvLyA4CiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LnVpbnQ2NAogICAgYnRvaQogICAgZHVwCiAgICBjb3ZlciAyCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTYKICAgIC8vIGNvbnN0IGVzY3JvdyA9IGNsb25lKHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODIKICAgIC8vIGFraXRhREFPRXNjcm93ID0gR2xvYmFsU3RhdGU8RXNjcm93Q29uZmlnPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YUVzY3JvdyB9KQogICAgYnl0ZWNfMiAvLyAiYWtpdGFfZXNjcm93IgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk2CiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHN3YXAKICAgIGR1cAogICAgY292ZXIgMgogICAgY292ZXIgNAogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTk3CiAgICAvLyBjb25zdCBjb3VudCA9IHNwbGl0T3B0SW5Db3VudCh0aGlzLmFraXRhREFPLnZhbHVlLCBlc2Nyb3cuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHN3YXAKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIHN3YXAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE5OQogICAgLy8gbG9nZ2VkQXNzZXJ0KHBheW1lbnQucmVjZWl2ZXIgPT09IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLCBFUlJfSU5WQUxJRF9QQVlNRU5UX1JFQ0VJVkVSKQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAzCiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1SIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTVIKCm9wdEluX2FmdGVyX2Fzc2VydEAzOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAwCiAgICAvLyBsb2dnZWRBc3NlcnQocGF5bWVudC5hbW91bnQgPT09IEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpLCBFUlJfSU5WQUxJRF9QQVlNRU5UX0FNT1VOVCkKICAgIGRpZyAzCiAgICBndHhucyBBbW91bnQKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgaW50Y18xIC8vIDEKICAgIGRpZyAzCiAgICArCiAgICAqCiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJUE1BIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklQTUEKCm9wdEluX2FmdGVyX2Fzc2VydEA1OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwOAogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgLy8gICAuc3VibWl0KCkKICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwNAogICAgLy8gYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgZGlnIDMKICAgIGl0eG5fZmllbGQgWGZlckFzc2V0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMDUKICAgIC8vIGFzc2V0QW1vdW50OiAwLAogICAgaW50Y18wIC8vIDAKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjAyLTIwNwogICAgLy8gaXR4bgogICAgLy8gICAuYXNzZXRUcmFuc2Zlcih7CiAgICAvLyAgICAgYXNzZXRSZWNlaXZlcjogR2xvYmFsLmN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MsCiAgICAvLyAgICAgYXNzZXRBbW91bnQ6IDAsCiAgICAvLyAgICAgeGZlckFzc2V0OiBhc3NldAogICAgLy8gICB9KQogICAgcHVzaGludCA0CiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIwMi0yMDgKICAgIC8vIGl0eG4KICAgIC8vICAgLmFzc2V0VHJhbnNmZXIoewogICAgLy8gICAgIGFzc2V0UmVjZWl2ZXI6IEdsb2JhbC5jdXJyZW50QXBwbGljYXRpb25BZGRyZXNzLAogICAgLy8gICAgIGFzc2V0QW1vdW50OiAwLAogICAgLy8gICAgIHhmZXJBc3NldDogYXNzZXQKICAgIC8vICAgfSkKICAgIC8vICAgLnN1Ym1pdCgpCiAgICBpdHhuX3N1Ym1pdAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjE1CiAgICAvLyBpZiAoY291bnQgPiAwICYmIGVzY3Jvdy5uYW1lICE9PSAnJykgewogICAgZHVwCiAgICBieiBvcHRJbl9hZnRlcl9pZl9lbHNlQDkKICAgIGRpZyAxCiAgICBkdXAKICAgIGludGNfMCAvLyAwCiAgICBleHRyYWN0X3VpbnQxNgogICAgZGlnIDEKICAgIGxlbgogICAgc3Vic3RyaW5nMwogICAgZXh0cmFjdCAyIDAKICAgIHB1c2hieXRlcyAiIgogICAgIT0KICAgIGJ6IG9wdEluX2FmdGVyX2lmX2Vsc2VAOQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGR1cAogICAgYnl0ZWNfMyAvLyAid2FsbGV0IgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgYnVyeSA2CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvZnVuY3Rpb25zLnRzOjU0CiAgICAvLyBjb25zdCBbcGx1Z2luQXBwTGlzdEJ5dGVzXSA9IG9wLkFwcEdsb2JhbC5nZXRFeEJ5dGVzKGFraXRhREFPLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1BsdWdpbkFwcExpc3QpKQogICAgZHVwCiAgICBieXRlYyAyNiAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTE4CiAgICAvLyBjb25zdCB7IHJldmVudWVNYW5hZ2VyIH0gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpCiAgICBkdXAKICAgIGV4dHJhY3QgOCA4CiAgICBidXJ5IDEyCiAgICBpbnRjXzIgLy8gOAogICAgZXh0cmFjdF91aW50NjQKICAgIGJ1cnkgOAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIwCiAgICAvLyBjb25zdCBlc2Nyb3cgPSBjbG9uZSh0aGlzLmFraXRhREFPRXNjcm93LnZhbHVlKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjgyCiAgICAvLyBha2l0YURBT0VzY3JvdyA9IEdsb2JhbFN0YXRlPEVzY3Jvd0NvbmZpZz4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFFc2Nyb3cgfSkKICAgIGJ5dGVjXzIgLy8gImFraXRhX2VzY3JvdyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMAogICAgLy8gY29uc3QgZXNjcm93ID0gY2xvbmUodGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBzd2FwCiAgICBkdXAKICAgIGNvdmVyIDIKICAgIGJ1cnkgNQogICAgYXNzZXJ0IC8vIGNoZWNrIEdsb2JhbFN0YXRlIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTIxCiAgICAvLyBjb25zdCB7IGlkIH0gPSB0aGlzLmdldEVzY3Jvdyhlc2Nyb3cubmFtZSkKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2CiAgICBkaWcgMQogICAgbGVuCiAgICBzdWJzdHJpbmczCiAgICBkdXAKICAgIGJ1cnkgMTEKICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czozMAogICAgLy8gY29uc3QgW3dhbGxldElEXSA9IG9wLkFwcEdsb2JhbC5nZXRFeFVpbnQ2NCh0aGlzLmFraXRhREFPLnZhbHVlLCBCeXRlcyhBa2l0YURBT0dsb2JhbFN0YXRlS2V5c1dhbGxldCkpCiAgICBzd2FwCiAgICBieXRlY18zIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICBzd2FwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIGl0eG5fYmVnaW4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjk3CiAgICAvLyBhcmdzOiBbW25hbWVdXSwKICAgIGludGNfMSAvLyAxCiAgICBpdG9iCiAgICBidXJ5IDEzCiAgICBkdXAKICAgIGxlbgogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo5NS05OAogICAgLy8gY29uc3QgZXNjcm93ID0gYWJpQ2FsbDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X2dldEVzY3Jvd3M+KHsKICAgIC8vICAgYXBwSWQsCiAgICAvLyAgIGFyZ3M6IFtbbmFtZV1dLAogICAgLy8gfSkucmV0dXJuVmFsdWVbMF0KICAgIHB1c2hieXRlcyAweGEyNDAzZGRmIC8vIG1ldGhvZCAiYXJjNThfZ2V0RXNjcm93cyhzdHJpbmdbXSkodWludDY0LGJvb2wpW10iCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuIExhc3RMb2cKICAgIGR1cAogICAgZXh0cmFjdCA0IDAKICAgIGRpZyAxCiAgICBleHRyYWN0IDAgNAogICAgYnl0ZWMgNCAvLyAweDE1MWY3Yzc1CiAgICA9PQogICAgYXNzZXJ0IC8vIEJ5dGVzIGhhcyB2YWxpZCBwcmVmaXgKICAgIGR1cAogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgOQogICAgKgogICAgcHVzaGludCAyCiAgICArCiAgICBzd2FwCiAgICBsZW4KICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIGFyYzQuZHluYW1pY19hcnJheTxzbWFydF9jb250cmFjdHMvYXJjNTgvYWNjb3VudC90eXBlcy50czo6RXNjcm93SW5mbz4KICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEwMAogICAgLy8gbG9nZ2VkQXNzZXJ0KGVzY3Jvdy5pZCAhPT0gMCwgRVJSX0VTQ1JPV19ET0VTX05PVF9FWElTVCkKICAgIGV4dHJhY3QgNiA5CiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50NjQKICAgIGR1cAogICAgYnVyeSA5CiAgICBibnogb3B0SW5fYWZ0ZXJfYXNzZXJ0QDEyCiAgICBwdXNoYnl0ZXMgIkVSUjpORVNDIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOk5FU0MKCm9wdEluX2FmdGVyX2Fzc2VydEAxMjoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEyMgogICAgLy8gbG9nZ2VkQXNzZXJ0KGlkID09PSBlc2Nyb3cuYXBwLmlkLCBFUlJfV1JPTkdfRVNDUk9XX0ZPUl9PUEVSQVRJT04pCiAgICBkaWcgMQogICAgcHVzaGludCAyCiAgICBleHRyYWN0X3VpbnQ2NAogICAgZHVwCiAgICBidXJ5IDcKICAgIGRpZyA4CiAgICA9PQogICAgYm56IG9wdEluX2FmdGVyX2Fzc2VydEAxNAogICAgcHVzaGJ5dGVzICJFUlI6V0VTQyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpXRVNDCgpvcHRJbl9hZnRlcl9hc3NlcnRAMTQ6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaXR4bl9iZWdpbgogICAgZGlnIDQKICAgIGR1cAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg1YWRmMzM4ZiAvLyBtZXRob2QgImFyYzU4X3Jla2V5VG9QbHVnaW4odWludDY0LHVpbnQ2NCxzdHJpbmcsdWludDY0W10sKHVpbnQ2NCx1aW50NjQpW10pdm9pZCIKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgMTEKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICBkaWcgOQogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzMAogICAgLy8gWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgcHVzaGJ5dGVzIDB4MDAwMTAwMDAwMDAwMDAwMDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMzEKICAgIC8vIFtdCiAgICBieXRlYyAyMiAvLyAweDAwMDAKICAgIGl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxMjQtMTMzCiAgICAvLyBpdHhuQ29tcG9zZS5iZWdpbjx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3Jla2V5VG9QbHVnaW4+KHsKICAgIC8vICAgYXBwSWQ6IHdhbGxldCwKICAgIC8vICAgYXJnczogWwogICAgLy8gICAgIHJldmVudWVNYW5hZ2VyLAogICAgLy8gICAgIENhbGxlclR5cGVHbG9iYWwsCiAgICAvLyAgICAgZXNjcm93Lm5hbWUsCiAgICAvLyAgICAgWzBdLCAvLyBhbGwgdGhlIGFraXRhIGVzY3Jvd3MgaGF2ZSBtZXRob2QgcmVzdHJpY3Rpb25zIHdpdGggb3B0aW4gYmVpbmcgaW5kZXggMAogICAgLy8gICAgIFtdCiAgICAvLyAgIF0sCiAgICAvLyB9KQogICAgaW50Y18zIC8vIGFwcGwKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM2CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM2CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlLAogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjEzNwogICAgLy8gZXNjcm93LmFwcC5hZGRyZXNzLAogICAgZGlnIDcKICAgIGR1cAogICAgY292ZXIgMgogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTM1LTEzOQogICAgLy8gY29uc3Qgb3B0SW5Db3VudCA9IHNwbGl0T3B0SW5Db3VudCgKICAgIC8vICAgdGhpcy5ha2l0YURBTy52YWx1ZSwKICAgIC8vICAgZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICBhc3NldAogICAgLy8gKQogICAgZGlnIDYKICAgIGR1cAogICAgY292ZXIgNAogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0MQogICAgLy8gY29uc3QgbWJyQW1vdW50OiB1aW50NjQgPSBHbG9iYWwuYXNzZXRPcHRJbk1pbkJhbGFuY2UgKiBvcHRJbkNvdW50CiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGl0eG5fbmV4dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTUwCiAgICAvLyByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgc3dhcAogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgaXR4bl9maWVsZCBSZWNlaXZlcgogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0OS0xNTIKICAgIC8vIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgIHJlY2VpdmVyOiBlc2Nyb3cuYXBwLmFkZHJlc3MsCiAgICAvLyAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyB9KQogICAgaW50Y18xIC8vIDEKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludGNfMCAvLyAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MTQzLTE1NAogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgUmV2ZW51ZU1hbmFnZXJQbHVnaW5TdHViLnByb3RvdHlwZS5vcHRJbj4oewogICAgLy8gICBhcHBJZDogcmV2ZW51ZU1hbmFnZXIsCiAgICAvLyAgIGFyZ3M6IFsKICAgIC8vICAgICB3YWxsZXQsCiAgICAvLyAgICAgdHJ1ZSwKICAgIC8vICAgICBbYXNzZXQuaWRdLAogICAgLy8gICAgIGl0eG4ucGF5bWVudCh7CiAgICAvLyAgICAgICByZWNlaXZlcjogZXNjcm93LmFwcC5hZGRyZXNzLAogICAgLy8gICAgICAgYW1vdW50OiBtYnJBbW91bnQKICAgIC8vICAgICB9KQogICAgLy8gICBdCiAgICAvLyB9KQogICAgaXR4bl9uZXh0CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDYKICAgIC8vIHdhbGxldCwKICAgIGRpZyAxCiAgICBpdG9iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxNDgKICAgIC8vIFthc3NldC5pZF0sCiAgICBzd2FwCiAgICBpdG9iCiAgICBwdXNoYnl0ZXMgMHgwMDAxCiAgICBzd2FwCiAgICBjb25jYXQKICAgIGRpZyA5CiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uSUQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIHB1c2hieXRlcyAweDY4MzVlM2JjIC8vIG1ldGhvZCAib3B0SW4odWludDY0LGJvb2wsdWludDY0W10scGF5KXZvaWQiCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgc3dhcAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0NwogICAgLy8gdHJ1ZSwKICAgIHB1c2hieXRlcyAweDgwCiAgICBpdHhuX2ZpZWxkIEFwcGxpY2F0aW9uQXJncwogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE0My0xNTQKICAgIC8vIGl0eG5Db21wb3NlLm5leHQ8dHlwZW9mIFJldmVudWVNYW5hZ2VyUGx1Z2luU3R1Yi5wcm90b3R5cGUub3B0SW4+KHsKICAgIC8vICAgYXBwSWQ6IHJldmVudWVNYW5hZ2VyLAogICAgLy8gICBhcmdzOiBbCiAgICAvLyAgICAgd2FsbGV0LAogICAgLy8gICAgIHRydWUsCiAgICAvLyAgICAgW2Fzc2V0LmlkXSwKICAgIC8vICAgICBpdHhuLnBheW1lbnQoewogICAgLy8gICAgICAgcmVjZWl2ZXI6IGVzY3Jvdy5hcHAuYWRkcmVzcywKICAgIC8vICAgICAgIGFtb3VudDogbWJyQW1vdW50CiAgICAvLyAgICAgfSkKICAgIC8vICAgXQogICAgLy8gfSkKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE1NgogICAgLy8gaXR4bkNvbXBvc2UubmV4dDx0eXBlb2YgQWJzdHJhY3RlZEFjY291bnQucHJvdG90eXBlLmFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzPih7IGFwcElkOiB3YWxsZXQgfSkKICAgIGl0eG5fbmV4dAogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECiAgICBwdXNoYnl0ZXMgMHg2Y2MzZjYwNiAvLyBtZXRob2QgImFyYzU4X3ZlcmlmeUF1dGhBZGRyZXNzKCl2b2lkIgogICAgaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKICAgIGludGNfMyAvLyBhcHBsCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnRjXzAgLy8gMAogICAgaXR4bl9maWVsZCBGZWUKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjE2OAogICAgLy8gaXR4bkNvbXBvc2Uuc3VibWl0KCkKICAgIGl0eG5fc3VibWl0CgpvcHRJbl9hZnRlcl9pZl9lbHNlQDk6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoxOTQKICAgIC8vIG9wdEluKHBheW1lbnQ6IGd0eG4uUGF5bWVudFR4biwgYXNzZXQ6IEFzc2V0KTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhRmVlR2VuZXJhdG9yQ29udHJhY3RXaXRoT3B0SW4ub3B0SW5Db3N0W3JvdXRpbmddKCkgLT4gdm9pZDoKb3B0SW5Db3N0OgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjIwCiAgICAvLyBAYWJpbWV0aG9kKHsgcmVhZG9ubHk6IHRydWUgfSkKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMgogICAgLy8gY29uc3QgY291bnQgPSBzcGxpdE9wdEluQ291bnQodGhpcy5ha2l0YURBTy52YWx1ZSwgdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZS5hcHAuYWRkcmVzcywgYXNzZXQpCiAgICBpbnRjXzAgLy8gMAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MjcKICAgIC8vIGFraXRhREFPID0gR2xvYmFsU3RhdGU8QXBwbGljYXRpb24+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhREFPIH0pCiAgICBieXRlY18wIC8vICJha2l0YV9kYW8iCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyMjIKICAgIC8vIGNvbnN0IGNvdW50ID0gc3BsaXRPcHRJbkNvdW50KHRoaXMuYWtpdGFEQU8udmFsdWUsIHRoaXMuYWtpdGFEQU9Fc2Nyb3cudmFsdWUuYXBwLmFkZHJlc3MsIGFzc2V0KQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIHB1c2hpbnQgMgogICAgZXh0cmFjdF91aW50NjQKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgIHVuY292ZXIgMgogICAgY2FsbHN1YiBzcGxpdE9wdEluQ291bnQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMwogICAgLy8gcmV0dXJuIEdsb2JhbC5hc3NldE9wdEluTWluQmFsYW5jZSAqICgxICsgY291bnQpCiAgICBnbG9iYWwgQXNzZXRPcHRJbk1pbkJhbGFuY2UKICAgIGludGNfMSAvLyAxCiAgICB1bmNvdmVyIDIKICAgICsKICAgICoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjIyMAogICAgLy8gQGFiaW1ldGhvZCh7IHJlYWRvbmx5OiB0cnVlIH0pCiAgICBpdG9iCiAgICBieXRlYyA0IC8vIDB4MTUxZjdjNzUKICAgIHN3YXAKICAgIGNvbmNhdAogICAgbG9nCiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OkFraXRhQmFzZUZlZUdlbmVyYXRvckNvbnRyYWN0V2l0aG91dEFraXRhT3B0SW4udXBkYXRlQWtpdGFEQU9Fc2Nyb3dbcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBT0VzY3JvdzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg0CiAgICAvLyB1cGRhdGVBa2l0YURBT0VzY3Jvdyhjb25maWc6IEVzY3Jvd0NvbmZpZyk6IHZvaWQgewogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwbiAyCiAgICBsZW4KICAgIGRpZyAxCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgdHVwbGUgZW5jb2RpbmcKICAgIGR1cAogICAgcHVzaGludCAxMAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIHRhaWwgcG9pbnRlciBhdCBpbmRleCAwIG9mICgobGVuK3V0ZjhbXSksdWludDY0KQogICAgdW5jb3ZlciAyCiAgICBzd2FwCiAgICBkaWcgMgogICAgc3Vic3RyaW5nMwogICAgaW50Y18wIC8vIDAKICAgIGV4dHJhY3RfdWludDE2IC8vIG9uIGVycm9yOiBpbnZhbGlkIGFycmF5IGxlbmd0aCBoZWFkZXIKICAgIHB1c2hpbnQgMTIKICAgICsKICAgID09CiAgICBhc3NlcnQgLy8gaW52YWxpZCBudW1iZXIgb2YgYnl0ZXMgZm9yIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjpFc2Nyb3dDb25maWcKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjg1CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT0VzY3Jvd19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9Fc2Nyb3dfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4MgogICAgLy8gYWtpdGFEQU9Fc2Nyb3cgPSBHbG9iYWxTdGF0ZTxFc2Nyb3dDb25maWc+KHsga2V5OiBHbG9iYWxTdGF0ZUtleUFraXRhRXNjcm93IH0pCiAgICBieXRlY18yIC8vICJha2l0YV9lc2Nyb3ciCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo4NgogICAgLy8gdGhpcy5ha2l0YURBT0VzY3Jvdy52YWx1ZSA9IGNsb25lKGNvbmZpZykKICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6ODQKICAgIC8vIHVwZGF0ZUFraXRhREFPRXNjcm93KGNvbmZpZzogRXNjcm93Q29uZmlnKTogdm9pZCB7CiAgICBpbnRjXzEgLy8gMQogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6OlVwZ3JhZGVhYmxlQWtpdGFCYXNlQ29udHJhY3QudXBkYXRlW3JvdXRpbmddKCkgLT4gdm9pZDoKdXBkYXRlOgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDYKICAgIC8vIEBhYmltZXRob2QoeyBhbGxvd0FjdGlvbnM6IFsnVXBkYXRlQXBwbGljYXRpb24nXSB9KQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgZHVwCiAgICBpbnRjXzAgLy8gMAogICAgZXh0cmFjdF91aW50MTYgLy8gb24gZXJyb3I6IGludmFsaWQgYXJyYXkgbGVuZ3RoIGhlYWRlcgogICAgcHVzaGludCAyCiAgICArCiAgICBkaWcgMQogICAgbGVuCiAgICA9PQogICAgYXNzZXJ0IC8vIGludmFsaWQgbnVtYmVyIG9mIGJ5dGVzIGZvciBhcmM0LmR5bmFtaWNfYXJyYXk8YXJjNC51aW50OD4KICAgIGV4dHJhY3QgMiAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIHR4biBTZW5kZXIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjMwCiAgICAvLyBjb25zdCBbd2FsbGV0SURdID0gb3AuQXBwR2xvYmFsLmdldEV4VWludDY0KHRoaXMuYWtpdGFEQU8udmFsdWUsIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzV2FsbGV0KSkKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgR2xvYmFsU3RhdGUgZXhpc3RzCiAgICBieXRlY18zIC8vICJ3YWxsZXQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgcG9wCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OAogICAgLy8gbG9nZ2VkQXNzZXJ0KFR4bi5zZW5kZXIgPT09IHRoaXMuZ2V0QWtpdGFEQU9XYWxsZXQoKS5hZGRyZXNzLCBFUlJfTk9UX0FLSVRBX0RBTykKICAgIGFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKICAgIGFzc2VydCAvLyBhcHBsaWNhdGlvbiBleGlzdHMKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEAzCiAgICBieXRlYyA1IC8vICJFUlI6TkRBTyIKICAgIGxvZwogICAgZXJyIC8vIEVSUjpOREFPCgp1cGRhdGVfYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo0OQogICAgLy8gY29uc3QgdXBkYXRlUGx1Z2luID0gZ2V0UGx1Z2luQXBwTGlzdCh0aGlzLmFraXRhREFPLnZhbHVlKS51cGRhdGUKICAgIGludGNfMCAvLyAwCiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ5CiAgICAvLyBjb25zdCB1cGRhdGVQbHVnaW4gPSBnZXRQbHVnaW5BcHBMaXN0KHRoaXMuYWtpdGFEQU8udmFsdWUpLnVwZGF0ZQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9mdW5jdGlvbnMudHM6NTQKICAgIC8vIGNvbnN0IFtwbHVnaW5BcHBMaXN0Qnl0ZXNdID0gb3AuQXBwR2xvYmFsLmdldEV4Qnl0ZXMoYWtpdGFEQU8sIEJ5dGVzKEFraXRhREFPR2xvYmFsU3RhdGVLZXlzUGx1Z2luQXBwTGlzdCkpCiAgICBieXRlYyAyNiAvLyAicGFsIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIHBvcAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NDkKICAgIC8vIGNvbnN0IHVwZGF0ZVBsdWdpbiA9IGdldFBsdWdpbkFwcExpc3QodGhpcy5ha2l0YURBTy52YWx1ZSkudXBkYXRlCiAgICBwdXNoaW50IDE2CiAgICBleHRyYWN0X3VpbnQ2NAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6NTAKICAgIC8vIGxvZ2dlZEFzc2VydChHbG9iYWwuY2FsbGVyQXBwbGljYXRpb25JZCA9PT0gdXBkYXRlUGx1Z2luLCBFUlJfSU5WQUxJRF9VUEdSQURFKQogICAgZ2xvYmFsIENhbGxlckFwcGxpY2F0aW9uSUQKICAgID09CiAgICBibnogdXBkYXRlX2FmdGVyX2Fzc2VydEA1CiAgICBwdXNoYnl0ZXMgIkVSUjpJVVBHIgogICAgbG9nCiAgICBlcnIgLy8gRVJSOklVUEcKCnVwZGF0ZV9hZnRlcl9hc3NlcnRANToKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI1CiAgICAvLyB2ZXJzaW9uID0gR2xvYmFsU3RhdGU8c3RyaW5nPih7IGtleTogR2xvYmFsU3RhdGVLZXlWZXJzaW9uIH0pCiAgICBieXRlYyAxNCAvLyAidmVyc2lvbiIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjUxCiAgICAvLyB0aGlzLnZlcnNpb24udmFsdWUgPSBuZXdWZXJzaW9uCiAgICBkaWcgMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjQ2CiAgICAvLyBAYWJpbWV0aG9kKHsgYWxsb3dBY3Rpb25zOiBbJ1VwZGF0ZUFwcGxpY2F0aW9uJ10gfSkKICAgIGludGNfMSAvLyAxCiAgICByZXR1cm4KCgovLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czo6QWtpdGFCYXNlQ29udHJhY3QudXBkYXRlQWtpdGFEQU9bcm91dGluZ10oKSAtPiB2b2lkOgp1cGRhdGVBa2l0YURBTzoKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM2CiAgICAvLyB1cGRhdGVBa2l0YURBTyhha2l0YURBTzogQXBwbGljYXRpb24pOiB2b2lkIHsKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIGR1cAogICAgbGVuCiAgICBpbnRjXzIgLy8gOAogICAgPT0KICAgIGFzc2VydCAvLyBpbnZhbGlkIG51bWJlciBvZiBieXRlcyBmb3IgYXJjNC51aW50NjQKICAgIGJ0b2kKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgdHhuIFNlbmRlcgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgaW50Y18wIC8vIDAKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjI3CiAgICAvLyBha2l0YURBTyA9IEdsb2JhbFN0YXRlPEFwcGxpY2F0aW9uPih7IGtleTogR2xvYmFsU3RhdGVLZXlBa2l0YURBTyB9KQogICAgYnl0ZWNfMCAvLyAiYWtpdGFfZGFvIgogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzAKICAgIC8vIGNvbnN0IFt3YWxsZXRJRF0gPSBvcC5BcHBHbG9iYWwuZ2V0RXhVaW50NjQodGhpcy5ha2l0YURBTy52YWx1ZSwgQnl0ZXMoQWtpdGFEQU9HbG9iYWxTdGF0ZUtleXNXYWxsZXQpKQogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBHbG9iYWxTdGF0ZSBleGlzdHMKICAgIGJ5dGVjXzMgLy8gIndhbGxldCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBwb3AKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM3CiAgICAvLyBsb2dnZWRBc3NlcnQoVHhuLnNlbmRlciA9PT0gdGhpcy5nZXRBa2l0YURBT1dhbGxldCgpLmFkZHJlc3MsIEVSUl9OT1RfQUtJVEFfREFPKQogICAgYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwogICAgYXNzZXJ0IC8vIGFwcGxpY2F0aW9uIGV4aXN0cwogICAgPT0KICAgIGJueiB1cGRhdGVBa2l0YURBT19hZnRlcl9hc3NlcnRAMwogICAgYnl0ZWMgNSAvLyAiRVJSOk5EQU8iCiAgICBsb2cKICAgIGVyciAvLyBFUlI6TkRBTwoKdXBkYXRlQWtpdGFEQU9fYWZ0ZXJfYXNzZXJ0QDM6CiAgICAvLyBzbWFydF9jb250cmFjdHMvdXRpbHMvYmFzZS1jb250cmFjdHMvYmFzZS50czoyNwogICAgLy8gYWtpdGFEQU8gPSBHbG9iYWxTdGF0ZTxBcHBsaWNhdGlvbj4oeyBrZXk6IEdsb2JhbFN0YXRlS2V5QWtpdGFEQU8gfSkKICAgIGJ5dGVjXzAgLy8gImFraXRhX2RhbyIKICAgIC8vIHNtYXJ0X2NvbnRyYWN0cy91dGlscy9iYXNlLWNvbnRyYWN0cy9iYXNlLnRzOjM4CiAgICAvLyB0aGlzLmFraXRhREFPLnZhbHVlID0gYWtpdGFEQU8KICAgIGRpZyAxCiAgICBhcHBfZ2xvYmFsX3B1dAogICAgLy8gc21hcnRfY29udHJhY3RzL3V0aWxzL2Jhc2UtY29udHJhY3RzL2Jhc2UudHM6MzYKICAgIC8vIHVwZGF0ZUFraXRhREFPKGFraXRhREFPOiBBcHBsaWNhdGlvbik6IHZvaWQgewogICAgaW50Y18xIC8vIDEKICAgIHJldHVybgo=", "clear": "I3ByYWdtYSB2ZXJzaW9uIDExCiNwcmFnbWEgdHlwZXRyYWNrIGZhbHNlCgovLyBAYWxnb3JhbmRmb3VuZGF0aW9uL2FsZ29yYW5kLXR5cGVzY3JpcHQvYmFzZS1jb250cmFjdC5kLnRzOjpCYXNlQ29udHJhY3QuY2xlYXJTdGF0ZVByb2dyYW0oKSAtPiB1aW50NjQ6Cm1haW46CiAgICBwdXNoaW50IDEKICAgIHJldHVybgo=" }, "byteCode": { "approval": "CyALAAEIBriLBIAg1K+gBtS1YtCGA5i5FOCtECYbCWFraXRhX2RhbwJiYwxha2l0YV9lc2Nyb3cGd2FsbGV0BBUffHUIRVJSOk5EQU8WY2hpbGRfY29udHJhY3RfdmVyc2lvbghFUlI6SVBBWQNhYWwIRVJSOkNOU1QIRVJSOklYRlIEPqEYMghFUlI6TlBCTwTFOzLMB3ZlcnNpb24IRVJSOkJJTkMIRVJSOkVNRk0CAAoEC4EBQwSC/6LOBL1xSNAErfkq5AIAAAhFUlI6TkFVQwZzZWxsZXIGZnVuZGVyA3BhbIAE6pGA3TYaAI4BAKsxGRREMRhBAJSCBQTRVI//BHPwAiMEFxTaZQSA9EVBBKXUKzonDYIIBNyi2GIE00axpAQ5Tq6yBDP3iAgEroTL2AQz6SyUBIVN7eAEcxEQcDYaAI4OAZQEgQcgB3oH1Ah0CMgJSAlhCzILXQvcACoAAQCAJBUffHUAAAAAAACIVAAAAAAAyBfUAAAAAAAASEQAAAAAAABJ1LAjQyNDgASBFTYoNhoAjgEBAgAxGYEEEjEYEERCC02KBAIiSYv/IllAAAqBiCeL/08DTwOJsYv9cQtEi/4VFlcGAov+UIv9FgEBIxaL/CcIZUiBSFuyGIAEDPG5z7IaTwOyGk8CshpMshqL/7IashqACQAHcm95YWx0ebIaJbIQIrIBs7Q+SVcEAEsBVwAEJwQSREkiWYECCEwVEkRXBgBJjAAVQQAFiwAXjAGLASEIDUEACSEIi/9PA08DiYsBi/9PA08DiYoCAYv/QQAXi/4nCGVIJFtyCESL/3AARQFAAAMyEIkiiYoDASKL/ov/cABFAUAAGov9gA5yZXZlbnVlX3NwbGl0c2VIIlkjCIwAiwBMiTYaAUkiWYECCEsBFRJEVwIANhoCSSJZgQIISwEVEkRXAgA2GgNJFSQSRBc2GgRJFUsBIllJgQoSREsCTEsCUiJZgQwIEkQnDk8EZycGTwNnKE8CZypMZyNDgABHBzEWgQIJSTgQIxJEMRYjCUk4EIEEEkQ2GgFJIlmBAghLARUSRFcCADYaAkcCIlmBIAuBAghMFRJENhoDRwIVJBJEFzYaBEcCFSQSRBc2GgVJFSQSRDYaBkcCFSQSRBc2GgdJTgJJFSQSRBdMNhoISU4CSRUkEkQXTDYaCUlOAhUkEkQ2GgpJTgIVgSASRDYaC0lOAkkVJBJEF0xAAAQnD7AASwaBrAIISwUMQAAEJxCwACm9RQFAAAQnCbAASwxJFEUZQQALMgpLDXAARQFBAhUjQAAMgAhFUlI6Tk9QVLAAMhCBAiNLGk0LRRciKGVESxE4EUlFGIj+XCEECEUZSwxAAc5LGCEECEUZMgFLFwhLASEGC0lFFQhLGQghBwhFFEsROAcyChJAAAQnB7AASxE4CEsUEkAABCcHsABLEDgAMQASQAAEJwqwAEsQOBQyChJAAAQnCrAASxA4EklFFkAABCcKsAAiKGVESxZJTgJLEksSiP04SEwpvUQpIiEFukwhBQkpIQVPArqxSwIWSxY4AEsZFlAxAE8GFiInBmVESRUWVwYCTFAiKGVEIiplREwWJxFQTFCBCrI1gRmyNCKyGYEDsjgnErJCTweyQE8GskAnE7IaSwWyGoABALIaSxSyGksSshpLELIaSw+yGksOshpLDLIaTwSyGk8DshpPArIaSweyGksGshpMshqyGiWyECKyAbO3AD1JRR2xSXIIRDIBSx0IsgiyByOyECKyAbOxSXIIRDIQsgiyByOyECKyAbYishlJshgnC7IaTLIaJbIQIrIBs7FyCERMshFLFbISshSBBLIQIrIBs0sMQQAosUsZSXIIRDIQsgiyByOyECKyAbYishmyGCcLshpLDbIaJbIQIrIBs0sKQQAosUsZSXIIREsUsgiyByOyECKyAbYishmyGCcUshpLAbIaJbIQIrIBs0sZFicETFCwI0MiKGVESw2I/HshCQhLGQhFGUL+JSJC/eiAAEcFMRaBAglHAjgQJRJEMRYjCUlOAjgQIxJENhoBSU4CSRUkEkQXTDYaAklOAkkVJBJEF0w2GgNJTgIVJBJENhoESU4CSRUkEkQXTDYaBUlOAkkVJBJEF0w2GgZJTgJJFSQSRBdMNhoHSU4CFSQSRDYaCElOAhWBIBJENhoJSU4CSRUkEkQXTCLCGicVEkECCUsQOBlAAgIjQAAMgAhFUlI6Qk1QVLAAIihlREsROBhJRRZJcgdETwInCGVIgRhbcghEEkSABW93bmVyZUgyChJAAAQnDLAASwhAAAQnD7AASwaBrAIISwUMQAAEJxCwACm9RQFAAAQnCbAASw1AAZIiRRVLDUABeSEERRYyAUsVCEsBIQYLSUUUCEsWCCEHCEUTSw84BzIKEkAABCcHsABLDzgISxMSQAAEJwewACIoZUQigAAnFoj6eUgpvUQpIiEFukwhBQkpIQVPArqxSxZJTgQWSxQ4AEsYFlAxAE8FFiInBmVESRUWVwYCTFAiKGVEIiplREwWJxFQTFCBCrI1gRmyNCKyGYEDsjgnErJCTweyQE8GskAnE7IaTwWyGoABgLIaSxSyGksSshpLELIaSw+yGksNshpLC7IaTwSyGk8DshpPArIaSwayGksFshpMshqyGiWyECKyAbO3AD1JRRmxSXIIRE8CshgnFbIasholshAisgGzsXIIRDIBSxcIsgiyByOyECKyAbNLDUEAKLFLFklyCEQyELIIsgcjshAisgG2IrIZshgnC7IaSw6yGiWyECKyAbNLC0EAKLFLFklyCERLE7IIsgcjshAisgG2IrIZshgnFLIaSwGyGiWyECKyAbNLFhYnBExQsCNDIihlREsOiPngIQoIRRZC/noyEEUVQv5qIkL9+zYaAUkVJBJEF0lyB0QyChJAAAQnF7AASScYZUgxABJAAAQnDLAARwInGWVISVcAIEyBIFuxgQWyGU8CshiABCSHwyyyGiWyECKyAbOxsgiyByOyECKyAbMjQzYaAUkVJBJEF0lyB0QyChJAAAQnF7AASScYZUgxABJAAAQnDLAARwInGWVISVcAIEyBIFuxgQWyGU8CshiABDHyapuyGiWyECKyAbOxsgiyByOyECKyAbMjQ4AANhoBSRUjEkQiU0k2GgJJFSQSRBdJTgI2GgNJFSQSRBdOAjYaBEkVJBJEF04CFEwyEE4CQQBfFEsBC0UGSwRAADsiKGVESwOI+M0hBAhLBEAAGiEECDIBSwcISwMhBgsICCEHCBYnBExQsCNDIihlREsFiPiiIQkICEL/2UsDQAAFIQRC/88iKGVESwSI+IghCghC/8CBAiNPAk1C/5k2GgFJIlmBAghLARUSRFcCADYaAkkVJBJEF0wnBkxnKb1FAUAAEzEAMgkSQAAEJwWwAClLAblII0MxACIoZUQrZUhyCEQSQAAEJwWwAClLAdNC/+M2GgFJFSQSRBdJNhoCSSJZgQIISwEVEkRXAgBMgfAPCjEWTAkjCUk4ECUSQQBOSTgYMggSQQBFSTgbgQMSQQA8STgZQAA2SSLCGicNEkEALEk4ADEAEkEAIyNAAAyACEVSUjpJQ09SsAApvUUBQAAEJwmwAClLA0sDuyNDIkL/2jEAIihlRCtlSHIIRBJAAAQnBbAAKbxII0MiRwKAAEcDMRYjCUcCOBAjEkQ2GgFJFSQSRBdJTgIiKmVMSU4CTgREIihlREyBAltyCERPAoj3dUw4BzIKEkAADIAIRVJSOklQTVKwAEsDOAgyECNLAwgLEkAADIAIRVJSOklQTUGwALEyCksDshEishKyFIEEshAisgGzSUEBT0sBSSJZSwEVUlcCAIAAE0EBPSIoZURJK2VIRQZJJxplSElXCAhFDCRbRQgiKmVMSU4CRQVESSJZSwEVUklFC1cCAEwrZUhMsSMWRQ1JFRZXBgJMUIAEAAEAAkxQTLIYgASiQD3fshqyGiWyECKyAbO0PklXBABLAVcABCcEEkRJIlmBCQuBAghMFRJEVwYJIltJRQlAAAyACEVSUjpORVNDsABLAYECW0lFB0sIEkAADIAIRVJSOldFU0OwALFLBEmyGIAEWt8zj7IaSwqyGksLshpLCbIagAoAAQAAAAAAAAAAshonFrIaJbIQIrIBIihlREsHSU4CcghESwZJTgSI9ioyEAu2THIIRLIHsggjshAisgG2SwEWTBaAAgABTFBLCbIYgARoNeO8shpMshqAAYCyGrIaJbIQIrIBtrIYgARsw/YGsholshAisgGzI0M2GgFJFSQSRBciKGVEIiplRIECW3IIRE8CiPXAMhAjTwIICxYnBExQsCNDNhoBRwIVSwEiWUmBChJETwJMSwJSIlmBDAgSRDEAIihlRCtlSHIIRBJAAAQnBbAAKksBZyNDNhoBSSJZgQIISwEVEkRXAgAxACIoZUQrZUhyCEQSQAAEJwWwACIoZUQnGmVIgRBbMg0SQAAMgAhFUlI6SVVQR7AAJw5LAWcjQzYaAUkVJBJEFzEAIihlRCtlSHIIRBJAAAQnBbAAKEsBZyND", "clear": "C4EBQw==" }, "events": [], "templateVariables": {} };
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
   * @param params The params to use for the cloned app client. Omit a param to keep the original value. Set a param to override the original value. Setting to undefined will clear the original value.
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
  newGroup(composerConfig) {
    const client = this;
    const composer = this.algorand.newGroup(composerConfig);
    let promiseChain = Promise.resolve();
    return {
      /**
       * Add a newAuction(pay,axfer,string,byte[32][],uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the AuctionFactory contract
       */
      newAuction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newAuction(params)));
        return this;
      },
      /**
       * Add a newPrizeBoxAuction(appl,pay,uint64,uint64,uint64,uint64,uint64,uint64,uint64,address,uint64)uint64 method call against the AuctionFactory contract
       */
      newPrizeBoxAuction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newPrizeBoxAuction(params)));
        return this;
      },
      /**
       * Add a deleteAuctionApp(uint64)void method call against the AuctionFactory contract
       */
      deleteAuctionApp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteAuctionApp(params)));
        return this;
      },
      /**
       * Add a cancelAuction(uint64)void method call against the AuctionFactory contract
       */
      cancelAuction(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.cancelAuction(params)));
        return this;
      },
      /**
       * Add a newAuctionCost(bool,uint64,uint64,uint64)uint64 method call against the AuctionFactory contract
       */
      newAuctionCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.newAuctionCost(params)));
        return this;
      },
      /**
       * Add a initBoxedContract(string,uint64)void method call against the AuctionFactory contract
       */
      initBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.initBoxedContract(params)));
        return this;
      },
      /**
       * Add a loadBoxedContract(uint64,byte[])void method call against the AuctionFactory contract
       */
      loadBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.loadBoxedContract(params)));
        return this;
      },
      /**
       * Add a deleteBoxedContract()void method call against the AuctionFactory contract
       */
      deleteBoxedContract(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.deleteBoxedContract(params)));
        return this;
      },
      /**
       * Add a optIn(pay,uint64)void method call against the AuctionFactory contract
       */
      optIn(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optIn(params)));
        return this;
      },
      /**
       * Add a optInCost(uint64)uint64 method call against the AuctionFactory contract
       */
      optInCost(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.optInCost(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAOEscrow((string,uint64))void method call against the AuctionFactory contract
       */
      updateAkitaDaoEscrow(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDaoEscrow(params)));
        return this;
      },
      /**
       * Add a updateAkitaDAO(uint64)void method call against the AuctionFactory contract
       */
      updateAkitaDao(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.updateAkitaDao(params)));
        return this;
      },
      /**
       * Add a opUp()void method call against the AuctionFactory contract
       */
      opUp(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.opUp(params)));
        return this;
      },
      /**
       * Add a mbr()(uint64,uint64,uint64,uint64) method call against the AuctionFactory contract
       */
      mbr(params) {
        promiseChain = promiseChain.then(async () => composer.addAppCallMethodCall(await client.params.mbr(params)));
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
}, _class4);

// src/auction/factory.ts
var AuctionFactorySDK = class extends _chunkA73G7K3Bjs.BaseSDK {
  constructor(params) {
    super({ factory: AuctionFactoryFactory, ...params }, _chunkYA4OODI3js.ENV_VAR_NAMES.AUCTION_FACTORY_APP_ID);
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
      const prizeBoxSDK = new (0, _chunkARDMWE2Yjs.PrizeBoxFactorySDK)({ algorand: this.algorand, factoryParams: {} }).get({ appId: BigInt(prizeBoxId) });
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
    await this.client.newGroup().optIn({
      ...sendParams,
      args: { payment, asset },
      maxFee: _algokitutils.microAlgo.call(void 0, 257e3)
    }).opUp({
      ...sendParams,
      args: {},
      maxFee: _algokitutils.microAlgo.call(void 0, 2e3)
    }).send({
      ...sendParams,
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
var AUCTION_ERROR_MESSAGES = {
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
  CNAF: "Creator is not the auction factory"
};
var translateAuctionError = _chunkGIGYZ6YCjs.makeErrorTranslator.call(void 0, AUCTION_ERROR_MESSAGES);

// src/auction/index.ts
var AuctionSDK = class extends _chunkA73G7K3Bjs.BaseSDK {
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







exports.AuctionFactorySDK = AuctionFactorySDK; exports.newAuction = newAuction; exports.AUCTION_ERROR_MESSAGES = AUCTION_ERROR_MESSAGES; exports.translateAuctionError = translateAuctionError; exports.AuctionSDK = AuctionSDK;
//# sourceMappingURL=chunk-2E3WIEKH.js.map